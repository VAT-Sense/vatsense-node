# VAT Sense Node/TypeScript SDK

[![NPM version](<https://img.shields.io/npm/v/vat-sense.svg?label=npm%20(stable)>)](https://npmjs.org/package/vat-sense) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/vat-sense)

The official Node.js and TypeScript library for the [VAT Sense](https://vatsense.com) REST API. Validate VAT/EORI numbers, look up VAT/GST rates, calculate prices, convert currencies, and generate VAT-compliant invoices.

## Installation

```sh
npm install vat-sense
```

## Quick start

Create a client using your API key from the [VAT Sense dashboard](https://vatsense.com/dashboard). The API uses HTTP Basic Auth with `user` as the username and your API key as the password.

```js
import VatSense from 'vat-sense';

const client = new VatSense({
  username: 'user',
  password: 'your_api_key',
});
```

You can also set the `VAT_SENSE_USERNAME` and `VAT_SENSE_PASSWORD` environment variables and the client will pick them up automatically.

### Validate a VAT number

```js
const response = await client.validate.check({ vat_number: 'GB288305674' });

if (response.data.valid) {
  console.log(response.data.company.company_name); // "BRITISH BROADCASTING CORPORATION"
  console.log(response.data.company.company_address);
  console.log(response.data.company.country_code); // "GB"
}
```

VAT validation works for the UK, EU, Australia, Norway, Switzerland, South Africa, and Brazil.

### Validate an EORI number

```js
const response = await client.validate.check({ eori_number: 'GB123456789000' });

if (response.data.valid) {
  console.log(response.data.company.company_name);
}
```

EORI validation is available for UK and EU numbers only.

### Get a consultation number

If you need an official consultation number from VIES (EU) or HMRC (UK), provide your own VAT number as the requester:

```js
const response = await client.validate.check({
  vat_number: 'FR12345678901',
  requester_vat_number: 'FR98765432101',
});

console.log(response.data.consultation_number);
```

> **Note:** GB requester numbers only work for GB validations, and EU requester numbers only work for EU validations. Cross-region requests are not supported.

### Find the VAT rate for a country

```js
const rate = await client.rates.find({ country_code: 'DE' });

console.log(rate.data.country_name); // "Germany"
console.log(rate.data.tax_rate.rate); // 19
console.log(rate.data.tax_rate.class); // "standard"
```

### Find a rate for a specific product type

```js
const rate = await client.rates.find({ country_code: 'DE', type: 'ebooks' });

console.log(rate.data.tax_rate.rate); // 7
console.log(rate.data.tax_rate.class); // "reduced"
```

### Find a rate by IP address

Useful for determining the correct rate based on your customer's location:

```js
const rate = await client.rates.find({ ip_address: '185.86.151.11' });

console.log(rate.data.country_code); // "GB"
console.log(rate.data.tax_rate.rate); // 20
```

### Calculate a VAT-inclusive price

```js
const result = await client.rates.calculatePrice({
  price: '100.00',
  tax_type: 'excl',
  country_code: 'FR',
});

console.log(result.data.vat_price.price_incl_vat); // Price including VAT
console.log(result.data.vat_price.price_excl_vat); // Price excluding VAT
console.log(result.data.vat_price.vat_rate); // VAT rate applied
console.log(result.data.vat_price.vat); // VAT amount
```

### List all VAT rates

```js
const rates = await client.rates.list();

for (const rate of rates.data) {
  console.log(`${rate.country_code}: ${rate.country_name}`);
}

// Filter to EU countries only
const euRates = await client.rates.list({ eu: true });
```

### TypeScript types

This library includes full TypeScript definitions for all request params and response fields:

```ts
import VatSense from 'vat-sense';

const client = new VatSense({
  username: 'user',
  password: 'your_api_key',
});

const response: VatSense.ValidateCheckResponse = await client.validate.check({
  vat_number: 'GB288305674',
});
```

## Handling errors

When the API returns an error, the library throws a typed exception:

```ts
try {
  const response = await client.validate.check({ vat_number: 'GB288305674' });
} catch (err) {
  if (err instanceof VatSense.APIError) {
    console.log(err.status); // e.g. 400
    console.log(err.name); // e.g. "BadRequestError"
    console.log(err.message);
  }
}
```

A `412` error means the upstream validation service (VIES, HMRC, etc.) is temporarily unavailable. These requests do not count against your usage quota.

| Status Code | Error Type            |
| ----------- | --------------------- |
| 400         | `BadRequestError`     |
| 401         | `AuthenticationError` |
| 404         | `NotFoundError`       |
| 409         | `ConflictError`       |
| 429         | `RateLimitError`      |
| >= 500      | `InternalServerError` |
| N/A         | `APIConnectionError`  |

## Retries

Failed requests are automatically retried up to 2 times with exponential backoff. This includes connection errors, timeouts, 429, and 5xx responses.

```js
// Disable retries
const client = new VatSense({
  username: 'user',
  password: 'your_api_key',
  maxRetries: 0,
});

// Or configure per request
const response = await client.validate.check({ vat_number: 'GB288305674' }, { maxRetries: 5 });
```

### Timeouts

Requests time out after 1 minute by default. You can configure this with a `timeout` option:

```js
const client = new VatSense({
  timeout: 20 * 1000, // 20 seconds (default is 1 minute)
});

// Override per request
await client.validate.check({ vat_number: 'GB288305674' }, { timeout: 5 * 1000 });
```

## Available services

| Service            | Description                              |
| ------------------ | ---------------------------------------- |
| `client.validate`  | Validate VAT and EORI numbers            |
| `client.rates`     | VAT/GST rate lookups, price calculations |
| `client.countries` | Country data and province lookups        |
| `client.currency`  | Exchange rates and currency conversion   |
| `client.invoice`   | Create and manage VAT-compliant invoices |
| `client.usage`     | Check your API usage                     |

## Documentation

Full API documentation is available at [vatsense.com/documentation](https://vatsense.com/documentation).

## Requirements

TypeScript >= 4.9 is supported.

The following runtimes are supported:

- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.

## Versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use.

## Contributing

See [the contributing documentation](./CONTRIBUTING.md).
