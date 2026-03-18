// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ItemAPI from './item';
import {
  InvoiceItem,
  InvoiceItemInput,
  Item,
  ItemAddParams,
  ItemDeleteParams,
  ItemRetrieveParams,
  ItemRetrieveResponse,
  ItemUpdateParams,
} from './item';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * VAT-compliant invoice management
 */
export class InvoiceResource extends APIResource {
  item: ItemAPI.Item = new ItemAPI.Item(this._client);

  /**
   * Create a new VAT-compliant invoice. VAT Sense will automatically calculate the
   * totals based on the items provided.
   *
   * Not available with sandbox API keys.
   *
   * @example
   * ```ts
   * const invoiceResponse = await client.invoice.create({
   *   business: {
   *     address:
   *       '123 Example Street\nLondon\nSW3 1GL\nUnited Kingdom',
   *     name: 'VAT Sense',
   *     vat_number: 'GB12345678',
   *   },
   *   currency_code: 'USD',
   *   date: '2018-06-03 14:02:00',
   *   items: [
   *     {
   *       item: 'Standard payment plan',
   *       price_each: 19.99,
   *       quantity: 1,
   *       vat_rate: 20,
   *     },
   *   ],
   *   tax_point: '2018-06-03 14:02:00',
   * });
   * ```
   */
  create(body: InvoiceCreateParams, options?: RequestOptions): APIPromise<InvoiceResponse> {
    return this._client.post('/invoice', { body, ...options });
  }

  /**
   * Retrieve a specific invoice by its ID.
   *
   * @example
   * ```ts
   * const invoiceResponse = await client.invoice.retrieve(
   *   'in5aeae457cda2a',
   * );
   * ```
   */
  retrieve(invoiceID: string, options?: RequestOptions): APIPromise<InvoiceResponse> {
    return this._client.get(path`/invoice/${invoiceID}`, options);
  }

  /**
   * Update an existing invoice. Only the fields provided will be updated.
   *
   * @example
   * ```ts
   * const invoiceResponse = await client.invoice.update(
   *   'in5aeae457cda2a',
   *   {
   *     business: {
   *       address:
   *         '123 Example Street\nLondon\nSW3 1GL\nUnited Kingdom',
   *       name: 'VAT Sense',
   *       vat_number: 'GB12345678',
   *     },
   *     currency_code: 'USD',
   *     date: '2018-06-03 14:02:00',
   *     items: [
   *       {
   *         item: 'Standard payment plan',
   *         price_each: 19.99,
   *         quantity: 1,
   *         vat_rate: 20,
   *       },
   *     ],
   *     tax_point: '2018-06-03 14:02:00',
   *   },
   * );
   * ```
   */
  update(
    invoiceID: string,
    body: InvoiceUpdateParams,
    options?: RequestOptions,
  ): APIPromise<InvoiceResponse> {
    return this._client.patch(path`/invoice/${invoiceID}`, { body, ...options });
  }

  /**
   * Retrieve a paginated list of all invoices.
   *
   * @example
   * ```ts
   * const invoices = await client.invoice.list();
   * ```
   */
  list(
    query: InvoiceListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InvoiceListResponse> {
    return this._client.get('/invoice', { query, ...options });
  }

  /**
   * Permanently delete an invoice.
   *
   * @example
   * ```ts
   * const invoice = await client.invoice.delete(
   *   'in5aeae457cda2a',
   * );
   * ```
   */
  delete(invoiceID: string, options?: RequestOptions): APIPromise<InvoiceDeleteResponse> {
    return this._client.delete(path`/invoice/${invoiceID}`, options);
  }
}

export interface CreateInvoice {
  business: InvoiceBusinessInput;

  /**
   * The 3-character currency code the invoice is billed in.
   */
  currency_code: string;

  /**
   * The date the invoice was issued (YYYY-MM-DD or YYYY-MM-DD HH:MM:SS).
   */
  date: string;

  items: Array<ItemAPI.InvoiceItemInput>;

  /**
   * The tax point or "time of supply" (YYYY-MM-DD or YYYY-MM-DD HH:MM:SS).
   */
  tax_point: string;

  conversion?: InvoiceConversionInput;

  customer?: InvoiceCustomerInput;

  /**
   * Whether the invoice is subject to VAT.
   */
  has_vat?: boolean;

  /**
   * A unique invoice number. If not provided, defaults to an auto-incremented
   * number.
   */
  invoice_number?: string;

  /**
   * Whether the invoice is a copy of a primary invoice.
   */
  is_copy?: boolean;

  /**
   * Whether the invoice is zero-rated due to reverse charge.
   */
  is_reverse_charge?: boolean;

  /**
   * Any additional notes for the invoice.
   */
  notes?: string;

  /**
   * Pad the auto-generated invoice number with leading zeros to this length.
   */
  pad_invoice_number?: number;

  /**
   * A serial prepended to the auto-generated invoice number. Each unique serial has
   * its own auto-increment range.
   */
  serial?: string;

  /**
   * Whether item prices include or exclude VAT.
   */
  tax_type?: 'incl' | 'excl';

  /**
   * The type of invoice.
   */
  type?: 'sale' | 'refund';

  /**
   * Whether the invoice has been zero-rated.
   */
  zero_rated?: boolean;
}

export interface Invoice {
  id?: string;

  business?: Invoice.Business;

  conversion?: InvoiceConversionInput | null;

  created?: string;

  currency_code?: string;

  customer?: Invoice.Customer | null;

  date?: string;

  has_vat?: boolean;

  invoice_number?: string;

  /**
   * Unique URL to view the invoice. Append "/pdf" to download a PDF copy.
   */
  invoice_url?: string;

  is_copy?: boolean;

  is_reverse_charge?: boolean;

  items?: Array<ItemAPI.InvoiceItem>;

  notes?: string | null;

  num_items?: number;

  object?: 'invoice';

  tax_point?: string;

  tax_type?: 'incl' | 'excl';

  totals?: Invoice.Totals;

  type?: 'sale' | 'refund';

  updated?: string;

  zero_rated?: boolean;
}

export namespace Invoice {
  export interface Business {
    address?: string;

    company_number?: string;

    logo?: string | null;

    name?: string;

    vat_number?: string;
  }

  export interface Customer {
    address?: string;

    company_number?: string;

    logo?: string | null;

    name?: string;

    vat_number?: string;
  }

  export interface Totals {
    /**
     * Total discount amount.
     */
    discount?: number;

    /**
     * Total before VAT.
     */
    subtotal?: number;

    /**
     * Grand total.
     */
    total?: number;

    /**
     * Total VAT amount.
     */
    vat?: number;
  }
}

export interface InvoiceBusinessInput {
  /**
   * Your business trading address.
   */
  address: string;

  /**
   * Your business trading name.
   */
  name: string;

  /**
   * Your business VAT number.
   */
  vat_number: string;

  bank_account?: string;

  /**
   * Your business company number.
   */
  company_number?: string;

  email?: string;

  /**
   * URL to your company logo (HTTPS only, .svg/.jpg/.png). Recommended 240px by
   * 60px.
   */
  logo?: string;

  phone?: string;

  website?: string;
}

export interface InvoiceConversionInput {
  /**
   * The 3-character currency code for the conversion.
   */
  currency_code: string;

  /**
   * The rate of conversion.
   */
  rate: number;
}

export interface InvoiceCustomerInput {
  /**
   * The customer's trading name.
   */
  name: string;

  address?: string;

  company_number?: string;

  country_code?: string;

  email?: string;

  /**
   * URL to the customer logo (HTTPS only, .jpg/.png).
   */
  logo?: string;

  vat_number?: string;
}

export interface InvoiceResponse {
  code?: number;

  data?: Invoice;

  success?: boolean;
}

export interface InvoiceListResponse {
  code?: number;

  data?: Array<Invoice>;

  success?: boolean;
}

export interface InvoiceDeleteResponse {
  code: number;

  success: boolean;
}

export interface InvoiceCreateParams {
  business: InvoiceBusinessInput;

  /**
   * The 3-character currency code the invoice is billed in.
   */
  currency_code: string;

  /**
   * The date the invoice was issued (YYYY-MM-DD or YYYY-MM-DD HH:MM:SS).
   */
  date: string;

  items: Array<ItemAPI.InvoiceItemInput>;

  /**
   * The tax point or "time of supply" (YYYY-MM-DD or YYYY-MM-DD HH:MM:SS).
   */
  tax_point: string;

  conversion?: InvoiceConversionInput;

  customer?: InvoiceCustomerInput;

  /**
   * Whether the invoice is subject to VAT.
   */
  has_vat?: boolean;

  /**
   * A unique invoice number. If not provided, defaults to an auto-incremented
   * number.
   */
  invoice_number?: string;

  /**
   * Whether the invoice is a copy of a primary invoice.
   */
  is_copy?: boolean;

  /**
   * Whether the invoice is zero-rated due to reverse charge.
   */
  is_reverse_charge?: boolean;

  /**
   * Any additional notes for the invoice.
   */
  notes?: string;

  /**
   * Pad the auto-generated invoice number with leading zeros to this length.
   */
  pad_invoice_number?: number;

  /**
   * A serial prepended to the auto-generated invoice number. Each unique serial has
   * its own auto-increment range.
   */
  serial?: string;

  /**
   * Whether item prices include or exclude VAT.
   */
  tax_type?: 'incl' | 'excl';

  /**
   * The type of invoice.
   */
  type?: 'sale' | 'refund';

  /**
   * Whether the invoice has been zero-rated.
   */
  zero_rated?: boolean;
}

export interface InvoiceUpdateParams {
  business: InvoiceBusinessInput;

  /**
   * The 3-character currency code the invoice is billed in.
   */
  currency_code: string;

  /**
   * The date the invoice was issued (YYYY-MM-DD or YYYY-MM-DD HH:MM:SS).
   */
  date: string;

  items: Array<ItemAPI.InvoiceItemInput>;

  /**
   * The tax point or "time of supply" (YYYY-MM-DD or YYYY-MM-DD HH:MM:SS).
   */
  tax_point: string;

  conversion?: InvoiceConversionInput;

  customer?: InvoiceCustomerInput;

  /**
   * Whether the invoice is subject to VAT.
   */
  has_vat?: boolean;

  /**
   * A unique invoice number. If not provided, defaults to an auto-incremented
   * number.
   */
  invoice_number?: string;

  /**
   * Whether the invoice is a copy of a primary invoice.
   */
  is_copy?: boolean;

  /**
   * Whether the invoice is zero-rated due to reverse charge.
   */
  is_reverse_charge?: boolean;

  /**
   * Any additional notes for the invoice.
   */
  notes?: string;

  /**
   * Pad the auto-generated invoice number with leading zeros to this length.
   */
  pad_invoice_number?: number;

  /**
   * A serial prepended to the auto-generated invoice number. Each unique serial has
   * its own auto-increment range.
   */
  serial?: string;

  /**
   * Whether item prices include or exclude VAT.
   */
  tax_type?: 'incl' | 'excl';

  /**
   * The type of invoice.
   */
  type?: 'sale' | 'refund';

  /**
   * Whether the invoice has been zero-rated.
   */
  zero_rated?: boolean;
}

export interface InvoiceListParams {
  /**
   * Number of invoices to return (default 10, max 100).
   */
  limit?: number;

  /**
   * Number of invoices to skip (default 0).
   */
  offset?: number;

  /**
   * Search query to filter invoices.
   */
  search?: string;
}

InvoiceResource.Item = Item;

export declare namespace InvoiceResource {
  export {
    type CreateInvoice as CreateInvoice,
    type Invoice as Invoice,
    type InvoiceBusinessInput as InvoiceBusinessInput,
    type InvoiceConversionInput as InvoiceConversionInput,
    type InvoiceCustomerInput as InvoiceCustomerInput,
    type InvoiceResponse as InvoiceResponse,
    type InvoiceListResponse as InvoiceListResponse,
    type InvoiceDeleteResponse as InvoiceDeleteResponse,
    type InvoiceCreateParams as InvoiceCreateParams,
    type InvoiceUpdateParams as InvoiceUpdateParams,
    type InvoiceListParams as InvoiceListParams,
  };

  export {
    Item as Item,
    type InvoiceItem as InvoiceItem,
    type InvoiceItemInput as InvoiceItemInput,
    type ItemRetrieveResponse as ItemRetrieveResponse,
    type ItemRetrieveParams as ItemRetrieveParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemDeleteParams as ItemDeleteParams,
    type ItemAddParams as ItemAddParams,
  };
}
