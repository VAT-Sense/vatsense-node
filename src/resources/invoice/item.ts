// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InvoiceAPI from './invoice';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * VAT-compliant invoice management
 */
export class Item extends APIResource {
  /**
   * Retrieve a specific line item from an invoice.
   *
   * @example
   * ```ts
   * const item = await client.invoice.item.retrieve(
   *   'ii5aeae457ce201',
   *   { invoice_id: 'in5aeae457cda2a' },
   * );
   * ```
   */
  retrieve(
    itemID: string,
    params: ItemRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ItemRetrieveResponse> {
    const { invoice_id } = params;
    return this._client.get(path`/invoice/${invoice_id}/item/${itemID}`, options);
  }

  /**
   * Update a specific line item on an invoice.
   *
   * @example
   * ```ts
   * const invoiceResponse = await client.invoice.item.update(
   *   'ii5aeae457ce201',
   *   {
   *     invoice_id: 'in5aeae457cda2a',
   *     item: 'Standard payment plan',
   *     price_each: 19.99,
   *     quantity: 1,
   *     vat_rate: 20,
   *   },
   * );
   * ```
   */
  update(
    itemID: string,
    params: ItemUpdateParams,
    options?: RequestOptions,
  ): APIPromise<InvoiceAPI.InvoiceResponse> {
    const { invoice_id, ...body } = params;
    return this._client.patch(path`/invoice/${invoice_id}/item/${itemID}`, { body, ...options });
  }

  /**
   * Remove a specific line item from an invoice.
   *
   * @example
   * ```ts
   * const invoiceResponse = await client.invoice.item.delete(
   *   'ii5aeae457ce201',
   *   { invoice_id: 'in5aeae457cda2a' },
   * );
   * ```
   */
  delete(
    itemID: string,
    params: ItemDeleteParams,
    options?: RequestOptions,
  ): APIPromise<InvoiceAPI.InvoiceResponse> {
    const { invoice_id } = params;
    return this._client.delete(path`/invoice/${invoice_id}/item/${itemID}`, options);
  }

  /**
   * Add one or more line items to an existing invoice.
   *
   * @example
   * ```ts
   * const invoiceResponse = await client.invoice.item.add(
   *   'in5aeae457cda2a',
   *   {
   *     items: [
   *       {
   *         item: 'Standard payment plan',
   *         price_each: 19.99,
   *         quantity: 1,
   *         vat_rate: 20,
   *       },
   *     ],
   *   },
   * );
   * ```
   */
  add(
    invoiceID: string,
    body: ItemAddParams,
    options?: RequestOptions,
  ): APIPromise<InvoiceAPI.InvoiceResponse> {
    return this._client.post(path`/invoice/${invoiceID}/item`, { body, ...options });
  }
}

export interface InvoiceItem {
  id?: string;

  discount_rate?: number | null;

  item?: string;

  object?: 'item';

  price_each?: number;

  price_total?: number;

  quantity?: number;

  vat_rate?: number;
}

export interface InvoiceItemInput {
  /**
   * The description of the line item.
   */
  item: string;

  /**
   * The price per item. Must be a decimal with 2 decimal places.
   */
  price_each: number;

  /**
   * The quantity of the item.
   */
  quantity: number;

  /**
   * A percentage VAT rate for this item.
   */
  vat_rate: number;

  /**
   * A percentage discount to apply to the price.
   */
  discount_rate?: number;
}

export interface ItemRetrieveResponse {
  code?: number;

  data?: InvoiceItem;

  success?: boolean;
}

export interface ItemRetrieveParams {
  /**
   * The unique identifier of the invoice.
   */
  invoice_id: string;
}

export interface ItemUpdateParams {
  /**
   * Path param: The unique identifier of the invoice.
   */
  invoice_id: string;

  /**
   * Body param: The description of the line item.
   */
  item: string;

  /**
   * Body param: The price per item. Must be a decimal with 2 decimal places.
   */
  price_each: number;

  /**
   * Body param: The quantity of the item.
   */
  quantity: number;

  /**
   * Body param: A percentage VAT rate for this item.
   */
  vat_rate: number;

  /**
   * Body param: A percentage discount to apply to the price.
   */
  discount_rate?: number;
}

export interface ItemDeleteParams {
  /**
   * The unique identifier of the invoice.
   */
  invoice_id: string;
}

export interface ItemAddParams {
  items: Array<InvoiceItemInput>;
}

export declare namespace Item {
  export {
    type InvoiceItem as InvoiceItem,
    type InvoiceItemInput as InvoiceItemInput,
    type ItemRetrieveResponse as ItemRetrieveResponse,
    type ItemRetrieveParams as ItemRetrieveParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemDeleteParams as ItemDeleteParams,
    type ItemAddParams as ItemAddParams,
  };
}
