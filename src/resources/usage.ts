// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * API usage statistics
 */
export class Usage extends APIResource {
  /**
   * Check your used and remaining API requests.
   */
  retrieve(options?: RequestOptions): APIPromise<UsageRetrieveResponse> {
    return this._client.get('/usage', options);
  }
}

export interface UsageRetrieveResponse {
  code?: number;

  data?: UsageRetrieveResponse.Data;

  success?: boolean;
}

export namespace UsageRetrieveResponse {
  export interface Data {
    requests?: Data.Requests;
  }

  export namespace Data {
    export interface Requests {
      /**
       * Requests remaining before the limit is reached.
       */
      remaining?: number;

      /**
       * Total requests allowed on your plan.
       */
      total?: number;

      /**
       * Requests used in the last 30 days.
       */
      used?: number;
    }
  }
}

export declare namespace Usage {
  export { type UsageRetrieveResponse as UsageRetrieveResponse };
}
