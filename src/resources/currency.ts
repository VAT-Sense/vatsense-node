// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Currency exchange rates and conversion
 */
export class Currency extends APIResource {
  /**
   * Returns a list of all currency conversion rates sourced from HMRC (GBP) and the
   * European Central Bank (EUR).
   *
   * You can optionally filter by source and target currency.
   */
  list(query: CurrencyListParams | null | undefined = {}, options?: RequestOptions): APIPromise<CurrencyListResponse> {
    return this._client.get('/currency', { query, ...options });
  }

  /**
   * Calculate the inclusive and exclusive VAT price on a given amount and VAT rate.
   * This is a standalone calculation that does not look up rates by country.
   */
  calculateVatPrice(query: CurrencyCalculateVatPriceParams, options?: RequestOptions): APIPromise<CurrencyCalculateVatPriceResponse> {
    return this._client.get('/currency/price', { query, ...options });
  }

  /**
   * Convert a foreign currency amount to either GBP or EUR using official exchange
   * rates.
   *
   * GBP rates are from HMRC (updated on the 1st of every month). EUR rates are from
   * the European Central Bank (updated around 16:00 CET on working days).
   */
  convert(query: CurrencyConvertParams, options?: RequestOptions): APIPromise<CurrencyConvertResponse> {
    return this._client.get('/currency/convert', { query, ...options });
  }
}

export interface VatPrice {
  object?: 'vat_price';

  /**
   * The price provided.
   */
  price?: number;

  /**
   * The calculated price exclusive of VAT.
   */
  price_excl_vat?: number;

  /**
   * The calculated price inclusive of VAT.
   */
  price_incl_vat?: number;

  /**
   * Whether the price is inclusive or exclusive of VAT.
   */
  tax_type?: 'incl' | 'excl';

  /**
   * The total VAT amount.
   */
  vat?: number;

  /**
   * The VAT rate percentage.
   */
  vat_rate?: number;
}

export interface CurrencyListResponse {
  code?: number;

  data?: Array<CurrencyListResponse.Data>;

  success?: boolean;
}

export namespace CurrencyListResponse {
  export interface Data {
    /**
     * The 3-character source currency code.
     */
    from?: string;

    object?: 'convert_rate';

    /**
     * The exchange rate.
     */
    rate?: number;

    /**
     * The 3-character target currency code (GBP or EUR).
     */
    to?: string;
  }
}

export interface CurrencyCalculateVatPriceResponse {
  code?: number;

  data?: VatPrice;

  success?: boolean;
}

export interface CurrencyConvertResponse {
  code?: number;

  data?: CurrencyConvertResponse.Data;

  success?: boolean;
}

export namespace CurrencyConvertResponse {
  export interface Data {
    /**
     * The original amount.
     */
    amount?: number;

    /**
     * The converted amount.
     */
    converted?: number;

    from?: string;

    object?: 'conversion';

    /**
     * The exchange rate used.
     */
    rate?: number;

    to?: string;
  }
}

export interface CurrencyListParams {
  /**
   * The 3-character currency code(s) to convert from (e.g. "USD", "CAD"). Can be a
   * comma-separated list without spaces (e.g. "USD,CAD,AUD").
   */
  from?: string;

  /**
   * The 3-character target currency code. Must be either "GBP" or "EUR".
   */
  to?: 'GBP' | 'EUR';
}

export interface CurrencyCalculateVatPriceParams {
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
   * A percentage VAT rate to use for the calculation.
   */
  vat_rate: number;
}

export interface CurrencyConvertParams {
  /**
   * The amount to convert. Must be a string with exactly 2 decimal places (e.g.
   * "39.99").
   */
  amount: string;

  /**
   * The 3-character source currency code (e.g. "USD", "CAD").
   */
  from: string;

  /**
   * The 3-character target currency code. Must be either "GBP" or "EUR".
   */
  to: 'GBP' | 'EUR';
}

export declare namespace Currency {
  export {
    type VatPrice as VatPrice,
    type CurrencyListResponse as CurrencyListResponse,
    type CurrencyCalculateVatPriceResponse as CurrencyCalculateVatPriceResponse,
    type CurrencyConvertResponse as CurrencyConvertResponse,
    type CurrencyListParams as CurrencyListParams,
    type CurrencyCalculateVatPriceParams as CurrencyCalculateVatPriceParams,
    type CurrencyConvertParams as CurrencyConvertParams
  };
}
