// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as RatesAPI from './rates';
import * as CurrencyAPI from './currency';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * VAT/GST rate lookups for countries worldwide
 */
export class Rates extends APIResource {
  /**
   * Returns a list of VAT/GST rates for all countries, sorted alphabetically by
   * country code. Each rate is returned as a rate object containing the standard
   * rate and any other applicable rates.
   *
   * You can optionally filter by country code, IP address, or EU membership.
   */
  list(query: RateListParams | null | undefined = {}, options?: RequestOptions): APIPromise<RateListResponse> {
    return this._client.get('/rates', { query, ...options });
  }

  /**
   * Combines the functionality of the "Find a tax rate" and "VAT price calculation"
   * endpoints to return the particular VAT price for an applicable VAT rate.
   * Requires both a location (country_code or ip_address) and a price to calculate.
   */
  calculatePrice(query: RateCalculatePriceParams, options?: RequestOptions): APIPromise<RateCalculatePriceResponse> {
    return this._client.get('/rates/price', { query, ...options });
  }

  /**
   * Get detailed tax rate information for a location, including all applicable rate
   * classes (standard, reduced, zero, etc.).
   */
  details(query: RateDetailsParams | null | undefined = {}, options?: RequestOptions): APIPromise<FindRate> {
    return this._client.get('/rates/tax_rate', { query, ...options });
  }

  /**
   * A handy endpoint for finding a rate that applies to a particular country and
   * optional product type, based on country code or IP address.
   *
   * If no type is provided, or no specific rate is applied to the given type, then
   * the standard rate will be returned if the country is subject to tax.
   *
   * If the country is not subject to VAT/GST then an error response will be
   * returned, indicating no tax applies.
   */
  find(query: RateFindParams | null | undefined = {}, options?: RequestOptions): APIPromise<FindRate> {
    return this._client.get('/rates/rate', { query, ...options });
  }

  /**
   * Returns a list of all available product types that can be used to filter tax
   * rates.
   */
  listTypes(options?: RequestOptions): APIPromise<RateListTypesResponse> {
    return this._client.get('/rates/types', options);
  }
}

export interface FindRate {
  code?: number;

  data?: RateWithTaxRate;

  success?: boolean;
}

export interface Rate {
  /**
   * 2-character ISO 3166-1 alpha-2 country code.
   */
  country_code?: string;

  country_name?: string;

  /**
   * Whether the country is an EU member.
   */
  eu?: boolean;

  object?: 'rate';

  /**
   * A list of other tax rates. Null if no additional rates exist.
   */
  other?: Array<Rate.Other> | null;

  standard?: TaxRate;
}

export namespace Rate {
  export interface Other extends RatesAPI.TaxRate {
    /**
     * The province this rate applies to, if applicable.
     */
    province?: string | null;
  }
}

export interface RateWithTaxRate {
  country_code?: string;

  country_name?: string;

  eu?: boolean;

  object?: 'rate';

  tax_rate?: TaxRate;
}

export interface TaxRate {
  /**
   * The rate class (e.g. "standard", "reduced", "zero").
   */
  class?: string;

  /**
   * A description of what goods/services this rate applies to.
   */
  description?: string;

  object?: 'tax_rate';

  /**
   * The tax rate percentage.
   */
  rate?: number;

  /**
   * Comma-separated list of product types this rate applies to, or false if it
   * applies generally.
   */
  types?: string | boolean;
}

export interface RateListResponse {
  code?: number;

  data?: Array<Rate>;

  success?: boolean;
}

export interface RateCalculatePriceResponse {
  code?: number;

  data?: RateCalculatePriceResponse.Data;

  success?: boolean;
}

export namespace RateCalculatePriceResponse {
  export interface Data {
    country_code?: string;

    country_name?: string;

    eu?: boolean;

    object?: 'rate';

    tax_rate?: RatesAPI.TaxRate;

    vat_price?: CurrencyAPI.VatPrice;
  }
}

export interface RateListTypesResponse {
  code?: number;

  data?: Array<string>;

  success?: boolean;
}

export interface RateListParams {
  /**
   * A 2-character ISO 3166-1 alpha-2 country code (e.g. "GB", "FR").
   */
  country_code?: string;

  /**
   * Filter results by EU membership. Use 1 for EU countries only, 0 for non-EU only.
   */
  eu?: boolean;

  /**
   * An IPv4 or IPv6 address. If provided, the country will be determined from the IP
   * address.
   */
  ip_address?: string;

  /**
   * A historical date to retrieve rates for (format "YYYY-MM-DD HH:MM:SS"). Must be
   * a past date.
   */
  period?: string;
}

export interface RateCalculatePriceParams {
  /**
   * The price to calculate on. Must be a string with exactly 2 decimal places (e.g.
   * "30.00", "59.95").
   */
  price: string;

  /**
   * Whether the provided price is inclusive or exclusive of VAT.
   */
  tax_type: 'incl' | 'excl';

  /**
   * A 2-character ISO 3166-1 alpha-2 country code (e.g. "GB", "FR").
   */
  country_code?: string;

  /**
   * Filter results by EU membership. Use 1 for EU countries only, 0 for non-EU only.
   */
  eu?: boolean;

  /**
   * An IPv4 or IPv6 address. If provided, the country will be determined from the IP
   * address.
   */
  ip_address?: string;

  /**
   * A 2-character province code (e.g. "NU", "NT"). If providing a province code, you
   * must also provide the relevant country_code.
   */
  province_code?: string;

  /**
   * The product type to find the applicable rate for. See the /rates/types endpoint
   * for a full list of valid values.
   */
  type?: string;
}

export interface RateDetailsParams {
  /**
   * A 2-character ISO 3166-1 alpha-2 country code (e.g. "GB", "FR").
   */
  country_code?: string;

  /**
   * Filter results by EU membership. Use 1 for EU countries only, 0 for non-EU only.
   */
  eu?: boolean;

  /**
   * An IPv4 or IPv6 address. If provided, the country will be determined from the IP
   * address.
   */
  ip_address?: string;

  /**
   * A historical date to retrieve rates for (format "YYYY-MM-DD HH:MM:SS"). Must be
   * a past date.
   */
  period?: string;

  /**
   * A 2-character province code (e.g. "NU", "NT"). If providing a province code, you
   * must also provide the relevant country_code.
   */
  province_code?: string;

  /**
   * The product type to find the applicable rate for. See the /rates/types endpoint
   * for a full list of valid values.
   */
  type?: string;
}

export interface RateFindParams {
  /**
   * A 2-character ISO 3166-1 alpha-2 country code (e.g. "GB", "FR").
   */
  country_code?: string;

  /**
   * Filter results by EU membership. Use 1 for EU countries only, 0 for non-EU only.
   */
  eu?: boolean;

  /**
   * An IPv4 or IPv6 address. If provided, the country will be determined from the IP
   * address.
   */
  ip_address?: string;

  /**
   * A historical date to retrieve rates for (format "YYYY-MM-DD HH:MM:SS"). Must be
   * a past date.
   */
  period?: string;

  /**
   * A 2-character province code (e.g. "NU", "NT"). If providing a province code, you
   * must also provide the relevant country_code.
   */
  province_code?: string;

  /**
   * The product type to find the applicable rate for. See the /rates/types endpoint
   * for a full list of valid values.
   */
  type?: string;
}

export declare namespace Rates {
  export {
    type FindRate as FindRate,
    type Rate as Rate,
    type RateWithTaxRate as RateWithTaxRate,
    type TaxRate as TaxRate,
    type RateListResponse as RateListResponse,
    type RateCalculatePriceResponse as RateCalculatePriceResponse,
    type RateListTypesResponse as RateListTypesResponse,
    type RateListParams as RateListParams,
    type RateCalculatePriceParams as RateCalculatePriceParams,
    type RateDetailsParams as RateDetailsParams,
    type RateFindParams as RateFindParams
  };
}
