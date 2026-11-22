// Batches: bulk validation through `/batches` (November 2026).

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Bulk validation: check many VAT numbers in one batch
 */
export class Batches extends APIResource {
  /**
   * Create a batch of VAT numbers and, by default, start checking it. Send exactly
   * one of `numbers` or `rows`. Batch calls are free and work even when your
   * requests are used up; each number the batch checks counts as one request. With
   * a test key the batch is answered from the test numbers, is free and holds at
   * most 1,000 numbers.
   *
   * @example
   * ```ts
   * const { data: batch } = await client.batches.create({
   *   numbers: ['GB288305674', 'FR12345678901'],
   *   'Idempotency-Key': 'november-customers',
   * });
   * ```
   */
  create(params: BatchCreateParams, options?: RequestOptions): APIPromise<BatchResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/batches', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * The account's batches, newest first.
   */
  list(
    query: BatchListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BatchListResponse> {
    return this._client.get('/batches', { query, ...options });
  }

  /**
   * A batch and its progress. Poll until `status` is `complete`, or take the
   * `batch.completed` webhook.
   */
  retrieve(batchID: string, options?: RequestOptions): APIPromise<BatchResponse> {
    return this._client.get(path`/batches/${batchID}`, options);
  }

  /**
   * Delete a draft. A batch that has started cannot be deleted (409).
   */
  delete(batchID: string, options?: RequestOptions): APIPromise<BatchDeleteResponse> {
    return this._client.delete(path`/batches/${batchID}`, options);
  }

  /**
   * Start a draft, with the same options as `create`.
   */
  start(
    batchID: string,
    body: BatchStartParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BatchResponse> {
    return this._client.post(path`/batches/${batchID}/start`, { body, ...options });
  }

  /**
   * Pause a running batch.
   */
  pause(batchID: string, options?: RequestOptions): APIPromise<BatchResponse> {
    return this._client.post(path`/batches/${batchID}/pause`, options);
  }

  /**
   * Continue a paused batch. Send `shortfall: 'overage'` to run into overage.
   */
  continue(
    batchID: string,
    body: BatchContinueParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BatchResponse> {
    return this._client.post(path`/batches/${batchID}/continue`, { body, ...options });
  }

  /**
   * Mark a paused batch complete, leaving the rest unchecked.
   */
  complete(batchID: string, options?: RequestOptions): APIPromise<BatchResponse> {
    return this._client.post(path`/batches/${batchID}/complete`, options);
  }

  /**
   * The batch's checked rows as JSON, in row order. Follow `next_after` while
   * `has_more` is true.
   */
  results(
    batchID: string,
    query: BatchResultsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BatchResultsResponse> {
    return this._client.get(path`/batches/${batchID}/results`, { query, ...options });
  }

  /**
   * The batch's CSV report, the same file the dashboard gives.
   */
  resultsCsv(batchID: string, options?: RequestOptions): APIPromise<string> {
    return this._client.get(path`/batches/${batchID}/results.csv`, {
      ...options,
      headers: buildHeaders([{ Accept: 'text/csv' }, options?.headers]),
    });
  }
}

/**
 * A batch. Times are UTC, ISO 8601.
 */
export interface Batch {
  /**
   * The batch's 26-character id.
   */
  id: string;

  /**
   * Always `batch`.
   */
  object?: string;

  auto_continue?: boolean;

  consultation?: boolean;

  created_at?: string | null;

  /**
   * The batch's page in the dashboard; null for a test batch.
   */
  dashboard_url?: string | null;

  estimated_finish_at?: string | null;

  expires_at?: string | null;

  finished_at?: string | null;

  /**
   * False for a test batch, made with a test key.
   */
  livemode?: boolean;

  number?: number;

  pause_reason?: string | null;

  /**
   * For drafts and paused batches.
   */
  quote?: Batch.Quote | null;

  reference?: string | null;

  requests_used?: number;

  results?: Batch.Results;

  rows?: Batch.Rows;

  source?: string;

  started_at?: string | null;

  /**
   * `draft`, `queued`, `processing`, `paused`, `complete` or `expired`.
   */
  status?: string;

  trial?: boolean;

  uses_overage?: boolean;
}

export namespace Batch {
  export interface Quote {
    covered?: boolean;

    overage_on?: boolean;

    renews_at?: string | null;

    requests_left?: number;

    requests_needed?: number;

    shortfall?: number;
  }

  export interface Results {
    duplicate?: number;

    invalid?: number;

    not_checked?: number;

    repaired?: number;

    retrying?: number;

    unsupported?: number;

    valid?: number;
  }

  export interface Rows {
    done?: number;

    to_check?: number;

    total?: number;
  }
}

/**
 * One row of a batch, as the CSV report lists it.
 */
export interface BatchResult {
  row: number;

  authority?: string | null;

  checked_at?: string | null;

  company_address?: string | null;

  company_name?: string | null;

  confirmation_number?: string | null;

  consultation_number?: string | null;

  country_code?: string | null;

  country_uploaded?: string | null;

  duplicate_of_row?: number | null;

  match?: BatchResult.Match | null;

  reason?: string | null;

  repaired?: boolean;

  /**
   * Such as `valid` or `invalid`; `pending` while the row is being checked.
   */
  result?: string;

  vat_number?: string | null;

  vat_number_uploaded?: string | null;
}

export namespace BatchResult {
  export interface Match {
    fields?: { [key: string]: Match.Fields };

    result?: string;

    score?: number | null;
  }

  export namespace Match {
    export interface Fields {
      result?: string | null;

      score?: number | null;

      sent?: string | null;

      vies?: string | null;
    }
  }
}

export interface BatchResponse {
  code: number;

  data: Batch;

  success: boolean;
}

export interface BatchListResponse {
  code: number;

  data: BatchListResponse.Data;

  success: boolean;
}

export namespace BatchListResponse {
  export interface Data {
    data: Array<Batch>;

    has_more: boolean;

    limit?: number;

    page?: number;

    total?: number;
  }
}

export interface BatchResultsResponse {
  code: number;

  data: BatchResultsResponse.Data;

  success: boolean;
}

export namespace BatchResultsResponse {
  export interface Data {
    data: Array<BatchResult>;

    has_more: boolean;

    /**
     * Pass as `after` for the next page while `has_more` is true.
     */
    next_after?: number | null;
  }
}

export interface BatchDeleteResponse {
  code: number;

  data: BatchDeleteResponse.Data;

  success: boolean;
}

export namespace BatchDeleteResponse {
  export interface Data {
    id: string;

    deleted: boolean;

    object?: string;
  }
}

export interface BatchCreateParams {
  /**
   * Body param: the VAT numbers to check, each with its 2-character country code.
   */
  numbers?: Array<string>;

  /**
   * Body param: rows with `vat_number` and, for company matching, any of the other
   * fields. Send this or `numbers`.
   */
  rows?: Array<BatchCreateParams.Row>;

  /**
   * Body param: your own label for the batch, at most 255 characters.
   */
  reference?: string;

  /**
   * Body param: defaults to true. False keeps a draft for 24 hours, to start with
   * `start`.
   */
  start?: boolean;

  /**
   * Body param: what to do when your requests do not cover the batch: `wait` (the
   * default) starts nothing and returns the `quote`, `pause` checks what is covered
   * and pauses the rest, `overage` runs into overage (it must already be on).
   */
  shortfall?: 'wait' | 'pause' | 'overage';

  /**
   * Body param: defaults to true. With `pause`, continue when your requests renew.
   */
  auto_continue?: boolean;

  /**
   * Body param: defaults to false. Send the requester VAT number from your account
   * settings with each check.
   */
  consultation?: boolean;

  /**
   * Header param: at most 64 characters. The same key again returns the batch
   * already made.
   */
  'Idempotency-Key'?: string;
}

export namespace BatchCreateParams {
  export interface Row {
    vat_number: string;

    address?: string;

    address_line_2?: string;

    city?: string;

    company_name?: string;

    country_code?: string;

    postcode?: string;

    street?: string;
  }
}

export interface BatchListParams {
  /**
   * Batches a page, 1 to 100 (default 25).
   */
  limit?: number;

  /**
   * The page, from 1.
   */
  page?: number;

  /**
   * `draft` lists the drafts not yet started instead.
   */
  status?: 'draft';
}

export interface BatchStartParams {
  shortfall?: 'wait' | 'pause' | 'overage';

  auto_continue?: boolean;

  consultation?: boolean;
}

export interface BatchContinueParams {
  shortfall?: 'wait' | 'pause' | 'overage';
}

export interface BatchResultsParams {
  /**
   * Return rows after this row number (default 0).
   */
  after?: number;

  /**
   * Rows a page, 1 to 1,000 (default 100).
   */
  limit?: number;
}

export declare namespace Batches {
  export {
    type Batch as Batch,
    type BatchResult as BatchResult,
    type BatchResponse as BatchResponse,
    type BatchListResponse as BatchListResponse,
    type BatchResultsResponse as BatchResultsResponse,
    type BatchDeleteResponse as BatchDeleteResponse,
    type BatchCreateParams as BatchCreateParams,
    type BatchListParams as BatchListParams,
    type BatchStartParams as BatchStartParams,
    type BatchContinueParams as BatchContinueParams,
    type BatchResultsParams as BatchResultsParams,
  };
}
