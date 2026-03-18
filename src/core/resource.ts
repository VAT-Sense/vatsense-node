// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { VatSense } from '../client';

export abstract class APIResource {
  protected _client: VatSense;

  constructor(client: VatSense) {
    this._client = client;
  }
}
