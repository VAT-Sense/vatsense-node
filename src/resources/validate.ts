// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * VAT and EORI number validation
 */
export class Validate extends APIResource {
  /**
   * Check whether a given VAT number or EORI number is valid against live government
   * records.
   *
   * **VAT validation** checks against UK (HMRC), EU (VIES), Australia, Norway,
   * Switzerland, South Africa, and Brazil records.
   *
   * **EORI validation** checks against UK and EU records only.
   *
   * If the external validation service is temporarily unavailable, the API returns a
   * `412` error and the request does not count against your usage quota.
   *
   * Provide either `vat_number` or `eori_number`, but not both.
   */
  check(query: ValidateCheckParams | null | undefined = {}, options?: RequestOptions): APIPromise<ValidateCheckResponse> {
    return this._client.get('/validate', { query, ...options });
  }
}

export interface ValidateCheckResponse {
  code?: number;

  data?: ValidateCheckResponse.Data;

  success?: boolean;
}

export namespace ValidateCheckResponse {
  export interface Data {
    company?: Data.ValidationCompany | Data.EoriValidationCompany;

    /**
     * Official consultation number (only returned when requester_vat_number is
     * provided).
     */
    consultation_number?: string | null;

    /**
     * Whether the VAT/EORI number is valid.
     */
    valid?: boolean;
  }

  export namespace Data {
    export interface ValidationCompany {
      company_address?: string;

      company_name?: string;

      country_code?: string;

      /**
       * The VAT number (without country code prefix).
       */
      vat_number?: string;
    }

    export interface EoriValidationCompany {
      company_address?: string;

      company_name?: string;

      country_code?: string;

      /**
       * The EORI number (without country code prefix).
       */
      eori_number?: string;
    }
  }
}

export interface ValidateCheckParams {
  /**
   * The EORI number to validate. Must include the leading 2-character country code
   * (e.g. "GB123456789123"). UK and EU only.
   */
  eori_number?: string;

  /**
   * Your own VAT number. If supplied, the response will include a unique
   * consultation number issued by the relevant authority (VIES or HMRC). Must
   * include the leading 2-character country code.
   *
   * Note: GB requester numbers only work for GB validations; EU requester numbers
   * only work for EU validations. Cross-region is not supported.
   */
  requester_vat_number?: string;

  /**
   * The VAT number to validate. Must include the leading 2-character country code
   * (e.g. "GB288305674", "FR12345678901").
   */
  vat_number?: string;
}

export declare namespace Validate {
  export {
    type ValidateCheckResponse as ValidateCheckResponse,
    type ValidateCheckParams as ValidateCheckParams
  };
}
