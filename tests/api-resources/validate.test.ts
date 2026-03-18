// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import VatSense from 'vatsense';

const client = new VatSense({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource validate', () => {
  // Mock server tests are disabled
  test.skip('check', async () => {
    const responsePromise = client.validate.check();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('check: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.validate.check(
        {
          eori_number: 'GB123456789123',
          requester_vat_number: 'GB288305674',
          vat_number: 'GB288305674',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(VatSense.NotFoundError);
  });
});
