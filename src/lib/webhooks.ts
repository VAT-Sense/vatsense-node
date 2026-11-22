// Checking the signature of VAT Sense webhook events.

import { VatSenseError } from '../core/error';

/**
 * The name of the header that carries the signature.
 */
export const SIGNATURE_HEADER = 'VatSense-Signature';

/**
 * Events whose timestamp is more than this many seconds from now are refused.
 */
export const DEFAULT_TOLERANCE = 300;

/**
 * The event's signature is missing, malformed, too old or does not match.
 */
export class WebhookSignatureError extends VatSenseError {}

export interface VerifyOptions {
  /**
   * Refuse events signed more than this many seconds ago (default 300). `null`
   * skips the check.
   */
  tolerance?: number | null;

  /**
   * The current Unix time in seconds, for tests.
   */
  now?: number;
}

/**
 * A webhook event, as VAT Sense sends it.
 */
export interface WebhookEvent {
  /**
   * Starts `evt_`; the same on every retry, so a repeat can be ignored.
   */
  id: string;

  /**
   * Such as `validation.completed`, `vies.country.unavailable` or
   * `batch.completed`.
   */
  type: string;

  /**
   * When the event happened, in Unix seconds.
   */
  created: number;

  /**
   * False for test mode events.
   */
  livemode: boolean;

  data: { object: { [key: string]: unknown } };
}

const encoder = new TextEncoder();

function parseHeader(header: string): { timestamp: number; signatures: string[] } {
  let timestamp: number | undefined;
  const signatures: string[] = [];
  for (const part of header.split(',')) {
    const index = part.indexOf('=');
    if (index < 0) continue;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (key === 't') {
      if (!/^\d+$/.test(value)) {
        throw new WebhookSignatureError("The signature header's timestamp is not a number.");
      }
      timestamp = Number(value);
    } else if (key === 'v1' && value) {
      signatures.push(value);
    }
  }
  if (timestamp === undefined) throw new WebhookSignatureError('The signature header has no timestamp.');
  if (signatures.length === 0) throw new WebhookSignatureError('The signature header has no v1 signature.');
  return { timestamp, signatures };
}

function toBytes(payload: string | Uint8Array): Uint8Array {
  return typeof payload === 'string' ? encoder.encode(payload) : payload;
}

async function hmacHex(secret: string, message: Uint8Array): Promise<string> {
  const subtle = (globalThis as any).crypto?.subtle;
  if (!subtle) {
    throw new VatSenseError(
      'Checking webhook signatures needs the Web Crypto API (globalThis.crypto.subtle).',
    );
  }
  const key = await subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = new Uint8Array(await subtle.sign('HMAC', key, message));
  return Array.from(signature, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return difference === 0;
}

/**
 * Check an event's `VatSense-Signature` header against its raw body, as received
 * (not parsed and re-encoded), with the endpoint's signing secret (`whsec_...`).
 * Throws `WebhookSignatureError` when it does not verify.
 */
export async function verifySignature(
  payload: string | Uint8Array,
  header: string | null | undefined,
  secret: string,
  options: VerifyOptions = {},
): Promise<void> {
  if (!header) throw new WebhookSignatureError('The VatSense-Signature header is missing.');
  if (!secret) throw new WebhookSignatureError('No signing secret was given.');
  const { timestamp, signatures } = parseHeader(header);

  const tolerance = options.tolerance === undefined ? DEFAULT_TOLERANCE : options.tolerance;
  const now = options.now ?? Math.floor(Date.now() / 1000);
  if (tolerance !== null && Math.abs(now - timestamp) > tolerance) {
    throw new WebhookSignatureError("The event's timestamp is outside the tolerance.");
  }

  const body = toBytes(payload);
  const prefix = encoder.encode(`${timestamp}.`);
  const message = new Uint8Array(prefix.length + body.length);
  message.set(prefix);
  message.set(body, prefix.length);

  const expected = await hmacHex(secret, message);
  if (!signatures.some((signature) => constantTimeEqual(expected, signature))) {
    throw new WebhookSignatureError('No signature matches the payload.');
  }
}

/**
 * Check the signature, then return the parsed event.
 *
 * @example
 * ```ts
 * import { constructEvent } from 'vat-sense';
 *
 * const event = await constructEvent(rawBody, req.headers['vatsense-signature'], 'whsec_...');
 * ```
 */
export async function constructEvent(
  payload: string | Uint8Array,
  header: string | null | undefined,
  secret: string,
  options: VerifyOptions = {},
): Promise<WebhookEvent> {
  await verifySignature(payload, header, secret, options);
  const text = typeof payload === 'string' ? payload : new TextDecoder().decode(payload);
  const event = JSON.parse(text);
  if (event === null || typeof event !== 'object' || Array.isArray(event)) {
    throw new WebhookSignatureError('The payload is not a JSON object.');
  }
  return event as WebhookEvent;
}
