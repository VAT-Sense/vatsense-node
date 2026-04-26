// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import VatSense from 'vat-sense';

const client = new VatSense({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010',
});

describe('resource rates', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.rates.list();
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
    await expect(client.rates.list({
    country_code: 'GB',
    eu: true,
    ip_address: '86.27.166.97',
    period: '2019-12-27T18:11:19.117Z',
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(VatSense.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('calculatePrice: only required params', async () => {
    const responsePromise = client.rates.calculatePrice({ price: '20.00', tax_type: 'excl' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('calculatePrice: required and optional params', async () => {
    const response = await client.rates.calculatePrice({
    price: '20.00',
    tax_type: 'excl',
    country_code: 'GB',
    eu: true,
    ip_address: '86.27.166.97',
    province_code: 'ON',
    type: 'ebooks',
  });
  });

  // Mock server tests are disabled
  test.skip('details', async () => {
    const responsePromise = client.rates.details();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('details: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.rates.details({
    country_code: 'GB',
    eu: true,
    ip_address: '86.27.166.97',
    period: '2019-12-27T18:11:19.117Z',
    province_code: 'ON',
    type: 'ebooks',
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(VatSense.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('find', async () => {
    const responsePromise = client.rates.find();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('find: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.rates.find({
    country_code: 'GB',
    eu: true,
    ip_address: '86.27.166.97',
    period: '2019-12-27T18:11:19.117Z',
    province_code: 'ON',
    type: 'ebooks',
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(VatSense.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listTypes', async () => {
    const responsePromise = client.rates.listTypes();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
