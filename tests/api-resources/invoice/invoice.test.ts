// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import VatSense from 'vatsense';

const client = new VatSense({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource invoice', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.invoice.create({
      business: {
        address: '123 Example Street\nLondon\nSW3 1GL\nUnited Kingdom',
        name: 'VAT Sense',
        vat_number: 'GB12345678',
      },
      currency_code: 'USD',
      date: '2018-06-03 14:02:00',
      items: [
        {
          item: 'Standard payment plan',
          price_each: 19.99,
          quantity: 1,
          vat_rate: 20,
        },
      ],
      tax_point: '2018-06-03 14:02:00',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.invoice.create({
      business: {
        address: '123 Example Street\nLondon\nSW3 1GL\nUnited Kingdom',
        name: 'VAT Sense',
        vat_number: 'GB12345678',
        bank_account: 'bank_account',
        company_number: '9839222',
        email: 'dev@stainless.com',
        logo: 'https://example.com',
        phone: 'phone',
        website: 'https://example.com',
      },
      currency_code: 'USD',
      date: '2018-06-03 14:02:00',
      items: [
        {
          item: 'Standard payment plan',
          price_each: 19.99,
          quantity: 1,
          vat_rate: 20,
          discount_rate: 40,
        },
      ],
      tax_point: '2018-06-03 14:02:00',
      conversion: { currency_code: 'GBP', rate: 1.523 },
      customer: {
        name: 'Demo Co.',
        address: '65 Demo Road\nLondon\nSW1 3DE\nUnited Kingdom',
        company_number: '5584922',
        country_code: 'country_code',
        email: 'dev@stainless.com',
        logo: 'https://example.com',
        vat_number: 'GB912343332',
      },
      has_vat: true,
      invoice_number: '203',
      is_copy: true,
      is_reverse_charge: true,
      notes: 'notes',
      pad_invoice_number: 2,
      serial: 'serial',
      tax_type: 'incl',
      type: 'sale',
      zero_rated: true,
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.invoice.retrieve('in5aeae457cda2a');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.invoice.update('in5aeae457cda2a', {
      business: {
        address: '123 Example Street\nLondon\nSW3 1GL\nUnited Kingdom',
        name: 'VAT Sense',
        vat_number: 'GB12345678',
      },
      currency_code: 'USD',
      date: '2018-06-03 14:02:00',
      items: [
        {
          item: 'Standard payment plan',
          price_each: 19.99,
          quantity: 1,
          vat_rate: 20,
        },
      ],
      tax_point: '2018-06-03 14:02:00',
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
    const response = await client.invoice.update('in5aeae457cda2a', {
      business: {
        address: '123 Example Street\nLondon\nSW3 1GL\nUnited Kingdom',
        name: 'VAT Sense',
        vat_number: 'GB12345678',
        bank_account: 'bank_account',
        company_number: '9839222',
        email: 'dev@stainless.com',
        logo: 'https://example.com',
        phone: 'phone',
        website: 'https://example.com',
      },
      currency_code: 'USD',
      date: '2018-06-03 14:02:00',
      items: [
        {
          item: 'Standard payment plan',
          price_each: 19.99,
          quantity: 1,
          vat_rate: 20,
          discount_rate: 40,
        },
      ],
      tax_point: '2018-06-03 14:02:00',
      conversion: { currency_code: 'GBP', rate: 1.523 },
      customer: {
        name: 'Demo Co.',
        address: '65 Demo Road\nLondon\nSW1 3DE\nUnited Kingdom',
        company_number: '5584922',
        country_code: 'country_code',
        email: 'dev@stainless.com',
        logo: 'https://example.com',
        vat_number: 'GB912343332',
      },
      has_vat: true,
      invoice_number: '203',
      is_copy: true,
      is_reverse_charge: true,
      notes: 'notes',
      pad_invoice_number: 2,
      serial: 'serial',
      tax_type: 'incl',
      type: 'sale',
      zero_rated: true,
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.invoice.list();
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
      client.invoice.list(
        {
          limit: 1,
          offset: 0,
          search: 'search',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(VatSense.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.invoice.delete('in5aeae457cda2a');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
