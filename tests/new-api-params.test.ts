import VatSense from 'vat-sense';

function capturingClient() {
  const calls: { url: string; headers: Headers; body: string | undefined }[] = [];
  const client = new VatSense({
    username: 'user',
    password: 'My Password',
    baseURL: 'http://localhost:5000/',
    fetch: async (url: string | URL | Request, init?: RequestInit): Promise<Response> => {
      calls.push({
        url: String(url),
        headers: new Headers(init?.headers),
        body: init?.body as string | undefined,
      });
      return new Response(JSON.stringify({ success: true, code: 200, data: {} }), {
        headers: { 'Content-Type': 'application/json' },
      });
    },
  });
  return { client, calls };
}

describe('API additions from November 2026', () => {
  test('invoice create sends Idempotency-Key as a header, not in the body', async () => {
    const { client, calls } = capturingClient();
    await client.invoice.create({
      business: { name: 'VAT Sense', address: 'London', vat_number: 'GB12345678' },
      currency_code: 'GBP',
      date: '2026-11-05',
      tax_point: '2026-11-05',
      items: [{ item: 'Plan', price_each: 10, quantity: 1, vat_rate: 20 }],
      type: 'refund',
      original_invoice_id: 'in5aeae457cda2a',
      'Idempotency-Key': 'order-203',
    });
    expect(calls[0]!.headers.get('Idempotency-Key')).toBe('order-203');
    const body = JSON.parse(calls[0]!.body!);
    expect(body['Idempotency-Key']).toBeUndefined();
    expect(body.original_invoice_id).toBe('in5aeae457cda2a');
  });

  test('invoice create without a key sends no Idempotency-Key header', async () => {
    const { client, calls } = capturingClient();
    await client.invoice.create({
      business: { name: 'VAT Sense', address: 'London', vat_number: 'GB12345678' },
      currency_code: 'GBP',
      date: '2026-11-05',
      tax_point: '2026-11-05',
      items: [{ item: 'Plan', price_each: 10, quantity: 1, vat_rate: 20 }],
    });
    expect(calls[0]!.headers.get('Idempotency-Key')).toBeNull();
  });

  test('validate sends the match_ parameters', async () => {
    const { client, calls } = capturingClient();
    await client.validate.check({
      vat_number: 'GB288305674',
      match_company_name: 'Weio Ltd',
      match_postcode: 'SW3 1GL',
    });
    const url = new URL(calls[0]!.url);
    expect(url.searchParams.get('match_company_name')).toBe('Weio Ltd');
    expect(url.searchParams.get('match_postcode')).toBe('SW3 1GL');
  });

  test('rates list sends the provinces filter', async () => {
    const { client, calls } = capturingClient();
    await client.rates.list({ provinces: false });
    expect(new URL(calls[0]!.url).searchParams.get('provinces')).toBe('false');
  });
});
