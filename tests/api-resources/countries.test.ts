// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import VatSense from 'vatsense';

const client = new VatSense({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource countries', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.countries.list();
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
      client.countries.list(
        { country_code: 'GB', ip_address: '86.27.166.97' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(VatSense.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listProvinces: only required params', async () => {
    const responsePromise = client.countries.listProvinces({ country_code: 'CA' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listProvinces: required and optional params', async () => {
    const response = await client.countries.listProvinces({ country_code: 'CA' });
  });
});
