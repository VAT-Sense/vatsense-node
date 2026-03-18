// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import VatSense from 'vatsense';

const client = new VatSense({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource item', () => {
  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.invoice.item.retrieve('ii5aeae457ce201', {
      invoice_id: 'in5aeae457cda2a',
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
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.invoice.item.retrieve('ii5aeae457ce201', { invoice_id: 'in5aeae457cda2a' });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.invoice.item.update('ii5aeae457ce201', {
      invoice_id: 'in5aeae457cda2a',
      item: 'Standard payment plan',
      price_each: 19.99,
      quantity: 1,
      vat_rate: 20,
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
  test.skip('update: required and optional params', async () => {
    const response = await client.invoice.item.update('ii5aeae457ce201', {
      invoice_id: 'in5aeae457cda2a',
      item: 'Standard payment plan',
      price_each: 19.99,
      quantity: 1,
      vat_rate: 20,
      discount_rate: 40,
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.invoice.item.delete('ii5aeae457ce201', { invoice_id: 'in5aeae457cda2a' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.invoice.item.delete('ii5aeae457ce201', { invoice_id: 'in5aeae457cda2a' });
  });

  // Mock server tests are disabled
  test.skip('add: only required params', async () => {
    const responsePromise = client.invoice.item.add('in5aeae457cda2a', {
      items: [
        {
          item: 'Standard payment plan',
          price_each: 19.99,
          quantity: 1,
          vat_rate: 20,
        },
      ],
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
  test.skip('add: required and optional params', async () => {
    const response = await client.invoice.item.add('in5aeae457cda2a', {
      items: [
        {
          item: 'Standard payment plan',
          price_each: 19.99,
          quantity: 1,
          vat_rate: 20,
          discount_rate: 40,
        },
      ],
    });
  });
});
