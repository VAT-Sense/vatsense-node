// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import VatSense from 'vat-sense';

const client = new VatSense({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource currency', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.currency.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.currency.list({ from: 'USD,CAD,AUD', to: 'GBP' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(VatSense.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('calculateVatPrice: only required params', async () => {
    const responsePromise = client.currency.calculateVatPrice({
      price: '20.00',
      tax_type: 'excl',
      vat_rate: 5,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('calculateVatPrice: required and optional params', async () => {
    const response = await client.currency.calculateVatPrice({
      price: '20.00',
      tax_type: 'excl',
      vat_rate: 5,
    });
  });

  // Mock server tests are disabled
  test.skip('convert: only required params', async () => {
    const responsePromise = client.currency.convert({
      amount: '39.99',
      from: 'USD',
      to: 'GBP',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('convert: required and optional params', async () => {
    const response = await client.currency.convert({
      amount: '39.99',
      from: 'USD',
      to: 'GBP',
    });
  });
});
