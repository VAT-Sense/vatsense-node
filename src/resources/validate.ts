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
   * `412` error and the request does not count against your usage quota. It also
   * returns the `412`, uncounted, when a check takes longer than 55 seconds for a
   * number checked with VIES or the EU EORI service, or 25 seconds for any other.
   * With a webhook endpoint taking `validation.completed`, a number that got the
   * `412` keeps being checked and the answer is sent by webhook
   * (https://vatsense.com/documentation#webhooks).
   *
   * Provide either `vat_number` or `eori_number`, but not both.
   */
  check(
    query: ValidateCheckParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ValidateCheckResponse> {
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
     * Only when a `match_` parameter was sent.
     */
    match?: Data.Match;

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

    /**
     * Only when a `match_` parameter was sent.
     */
    export interface Match {
      /**
       * One entry for each detail sent (company_name, address, street, postcode,
       * city).
       */
      fields?: { [key: string]: Match.Fields };

      /**
       * likely (a score of 80 or more, and the name, if sent, is not a no_match),
       * possible (50 to 79), unlikely (under 50), or not_applicable when nothing
       * could be compared.
       */
      result?: 'likely' | 'possible' | 'unlikely' | 'not_applicable';

      /**
       * The average of the details sent, with the name counting twice. null when
       * not_applicable.
       */
      score?: number | null;
    }

    export namespace Match {
      export interface Fields {
        result?: 'match' | 'partial' | 'no_match' | 'not_applicable';

        score?: number | null;

        /**
         * VIES's own answer for that detail on a live EU check; null when VIES said
         * nothing.
         */
        vies?: 'valid' | 'invalid' | 'not_processed' | null;
      }
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
   * The whole address you hold, as one line, matched against the registered
   * address.
   */
  match_address?: string;

  /**
   * The town or city you hold, looked for in the registered address.
   */
  match_city?: string;

  /**
   * The company name you hold, matched against the registered name. Legal forms
   * such as Ltd or GmbH, accents, punctuation and word order are ignored. Sending
   * any `match_` parameter adds `match` to the response; matching costs nothing
   * extra.
   */
  match_company_name?: string;

  /**
   * The postcode you hold, looked for in the registered address. Spaces are
   * ignored.
   */
  match_postcode?: string;

  /**
   * The street line you hold, looked for in the registered address.
   */
  match_street?: string;

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
    type ValidateCheckParams as ValidateCheckParams,
  };
}
