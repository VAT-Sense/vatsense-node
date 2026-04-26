// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Country and province information
 */
export class Countries extends APIResource {
  /**
   * Returns a list of all countries, including whether they are subject to VAT/GST
   * and whether they are subject to EU VAT. Each country is returned as a country
   * object.
   *
   * You can optionally filter by country code or IP address.
   */
  list(query: CountryListParams | null | undefined = {}, options?: RequestOptions): APIPromise<CountryListResponse> {
    return this._client.get('/countries', { query, ...options });
  }

  /**
   * Retrieve a list of all provinces within a given country.
   */
  listProvinces(query: CountryListProvincesParams, options?: RequestOptions): APIPromise<CountryListProvincesResponse> {
    return this._client.get('/countries/provinces', { query, ...options });
  }
}

export interface Country {
  /**
   * 2-character ISO 3166-1 alpha-2 country code.
   */
  country_code?: string;

  country_name?: string;

  /**
   * Whether the country is subject to EU VAT.
   */
  eu?: boolean;

  latitude?: number;

  longitude?: number;

  object?: 'country';

  /**
   * Whether the country is subject to VAT/GST.
   */
  vat?: boolean;
}

export interface CountryListResponse {
  code?: number;

  data?: Array<Country>;

  success?: boolean;
}

export interface CountryListProvincesResponse {
  code?: number;

  data?: Array<CountryListProvincesResponse.Data>;

  success?: boolean;
}

export namespace CountryListProvincesResponse {
  export interface Data {
    country_code?: string;

    object?: 'province';

    province_code?: string;

    province_name?: string;
  }
}

export interface CountryListParams {
  /**
   * A 2-character ISO 3166-1 alpha-2 country code (e.g. "GB", "FR").
   */
  country_code?: string;

  /**
   * An IPv4 or IPv6 address. If provided, the country will be determined from the IP
   * address.
   */
  ip_address?: string;
}

export interface CountryListProvincesParams {
  /**
   * A 2-character ISO 3166-1 alpha-2 country code (e.g. "CA").
   */
  country_code: string;
}

export declare namespace Countries {
  export {
    type Country as Country,
    type CountryListResponse as CountryListResponse,
    type CountryListProvincesResponse as CountryListProvincesResponse,
    type CountryListParams as CountryListParams,
    type CountryListProvincesParams as CountryListProvincesParams
  };
}
