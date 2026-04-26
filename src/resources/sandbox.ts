// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Temporary sandbox API keys for testing
 */
export class Sandbox extends APIResource {
  /**
   * Generate a temporary sandbox API key for testing. Sandbox keys have limited
   * request allowances and restricted endpoint access (no invoice endpoints). Rate
   * limited to 1 key per IP address per 6 hours.
   */
  generateKey(options?: RequestOptions): APIPromise<SandboxGenerateKeyResponse> {
    return this._client.post('/sandbox/key', { ...options, __security: {  } });
  }
}

export interface SandboxGenerateKeyResponse {
  code?: number;

  data?: SandboxGenerateKeyResponse.Data;

  success?: boolean;
}

export namespace SandboxGenerateKeyResponse {
  export interface Data {
    allowed_endpoints?: Array<string>;

    expires_at?: string;

    /**
     * The temporary sandbox API key.
     */
    key?: string;

    requests_remaining?: number;

    signup_url?: string;
  }
}

export declare namespace Sandbox {
  export {
    type SandboxGenerateKeyResponse as SandboxGenerateKeyResponse
  };
}
