import { createHmac } from 'node:crypto';
import VatSense, { WebhookSignatureError, constructEvent, verifySignature } from 'vat-sense';

const batch = {
  object: 'batch',
  id: '01JM0000000000000000000000',
  number: 4,
  status: 'processing',
  livemode: true,
  rows: { total: 2, to_check: 2, done: 1 },
};

function capturingClient(answer: (url: string) => Response) {
  const calls: { url: string; method: string; headers: Headers; body: string | undefined }[] = [];
  const client = new VatSense({
    username: 'user',
    password: 'My Password',
    baseURL: 'http://localhost:5000/',
    fetch: async (url: string | URL | Request, init?: RequestInit): Promise<Response> => {
      calls.push({
        url: String(url),
        method: init?.method ?? 'GET',
        headers: new Headers(init?.headers),
        body: init?.body as string | undefined,
      });
      return answer(String(url));
    },
  });
  return { client, calls };
}

const json = (data: unknown, code = 200) =>
  new Response(JSON.stringify({ success: true, code, data }), {
    status: code,
    headers: { 'Content-Type': 'application/json' },
  });

describe('batches', () => {
  test('create sends the body and the Idempotency-Key header', async () => {
    const { client, calls } = capturingClient(() => json(batch, 201));
    const created = await client.batches.create({
      numbers: ['GB288305674', 'DE100000040'],
      shortfall: 'pause',
      'Idempotency-Key': 'nov-1',
    });
    expect(calls[0]!.url).toBe('http://localhost:5000/batches');
    expect(calls[0]!.method).toBe('POST');
    expect(calls[0]!.headers.get('Idempotency-Key')).toBe('nov-1');
    expect(JSON.parse(calls[0]!.body!)).toEqual({
      numbers: ['GB288305674', 'DE100000040'],
      shortfall: 'pause',
    });
    expect(created.data.id).toBe(batch.id);
  });

  test('every action calls its path', async () => {
    const { client, calls } = capturingClient(() => json(batch));
    await client.batches.list({ page: 2, limit: 10 });
    await client.batches.retrieve(batch.id);
    await client.batches.start(batch.id, { shortfall: 'overage' });
    await client.batches.pause(batch.id);
    await client.batches.continue(batch.id, { shortfall: 'overage' });
    await client.batches.complete(batch.id);
    await client.batches.delete(batch.id);
    await client.batches.results(batch.id, { after: 100, limit: 50 });
    expect(calls.map((call) => `${call.method} ${call.url.replace('http://localhost:5000', '')}`)).toEqual([
      'GET /batches?page=2&limit=10',
      `GET /batches/${batch.id}`,
      `POST /batches/${batch.id}/start`,
      `POST /batches/${batch.id}/pause`,
      `POST /batches/${batch.id}/continue`,
      `POST /batches/${batch.id}/complete`,
      `DELETE /batches/${batch.id}`,
      `GET /batches/${batch.id}/results?after=100&limit=50`,
    ]);
    expect(JSON.parse(calls[2]!.body!)).toEqual({ shortfall: 'overage' });
  });

  test('the CSV report comes back as text', async () => {
    const { client } = capturingClient(
      () => new Response('row,vat_number\n1,GB288305674\n', { headers: { 'Content-Type': 'text/csv' } }),
    );
    const csv = await client.batches.resultsCsv(batch.id);
    expect(csv.startsWith('row,vat_number')).toBe(true);
  });
});

describe('validate additions', () => {
  test('consultation_optional is sent and confirmation_number is read', async () => {
    const { client, calls } = capturingClient(() => json({ valid: true, confirmation_number: 'VSC-ABC' }));
    const result = await client.validate.check({
      vat_number: 'FR40303265045',
      requester_vat_number: 'GB288305674',
      consultation_optional: true,
    });
    expect(new URL(calls[0]!.url).searchParams.get('consultation_optional')).toBe('true');
    expect(result.data?.confirmation_number).toBe('VSC-ABC');
  });
});

describe('webhook signatures', () => {
  const secret = 'whsec_test_secret';
  const payload =
    '{"id":"evt_1","type":"batch.completed","created":1793365200,"livemode":true,"data":{"object":{"object":"batch"}}}';
  const sign = (t: number, body: string, key = secret) =>
    createHmac('sha256', key).update(`${t}.${body}`).digest('hex');

  test('a good event verifies and parses', async () => {
    const event = await constructEvent(payload, `t=1793365200,v1=${sign(1793365200, payload)}`, secret, {
      now: 1793365260,
    });
    expect(event.type).toBe('batch.completed');
    await verifySignature(
      new TextEncoder().encode(payload),
      `t=1793365200,v1=${sign(1793365200, payload)}`,
      secret,
      {
        now: 1793365200,
      },
    );
  });

  test('the old secret is accepted during a roll', async () => {
    const header = `t=1793365200,v1=${sign(1793365200, payload, 'whsec_new')},v1=${sign(
      1793365200,
      payload,
    )}`;
    await expect(verifySignature(payload, header, secret, { now: 1793365200 })).resolves.toBeUndefined();
  });

  test.each([
    [null, 1793365200],
    ['', 1793365200],
    ['v1=abc', 1793365200],
    ['t=1793365200', 1793365200],
    ['t=soon,v1=abc', 1793365200],
    [`t=1793365200,v1=${sign(1793365200, payload, 'whsec_other')}`, 1793365200],
    [`t=1793365200,v1=${sign(1793365200, payload)}`, 1793365200 + 301],
  ])('refuses %s', async (header, now) => {
    await expect(verifySignature(payload, header, secret, { now })).rejects.toBeInstanceOf(
      WebhookSignatureError,
    );
  });

  test('a changed body is refused', async () => {
    const header = `t=1793365200,v1=${sign(1793365200, payload)}`;
    await expect(
      verifySignature(payload.replace('true', 'false'), header, secret, { now: 1793365200 }),
    ).rejects.toBeInstanceOf(WebhookSignatureError);
  });
});
