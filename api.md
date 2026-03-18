# Rates

Types:

- <code><a href="./src/resources/rates.ts">FindRate</a></code>
- <code><a href="./src/resources/rates.ts">Rate</a></code>
- <code><a href="./src/resources/rates.ts">RateWithTaxRate</a></code>
- <code><a href="./src/resources/rates.ts">TaxRate</a></code>
- <code><a href="./src/resources/rates.ts">RateListResponse</a></code>
- <code><a href="./src/resources/rates.ts">RateCalculatePriceResponse</a></code>
- <code><a href="./src/resources/rates.ts">RateListTypesResponse</a></code>

Methods:

- <code title="get /rates">client.rates.<a href="./src/resources/rates.ts">list</a>({ ...params }) -> RateListResponse</code>
- <code title="get /rates/price">client.rates.<a href="./src/resources/rates.ts">calculatePrice</a>({ ...params }) -> RateCalculatePriceResponse</code>
- <code title="get /rates/tax_rate">client.rates.<a href="./src/resources/rates.ts">details</a>({ ...params }) -> FindRate</code>
- <code title="get /rates/rate">client.rates.<a href="./src/resources/rates.ts">find</a>({ ...params }) -> FindRate</code>
- <code title="get /rates/types">client.rates.<a href="./src/resources/rates.ts">listTypes</a>() -> RateListTypesResponse</code>

# Countries

Types:

- <code><a href="./src/resources/countries.ts">Country</a></code>
- <code><a href="./src/resources/countries.ts">CountryListResponse</a></code>
- <code><a href="./src/resources/countries.ts">CountryListProvincesResponse</a></code>

Methods:

- <code title="get /countries">client.countries.<a href="./src/resources/countries.ts">list</a>({ ...params }) -> CountryListResponse</code>
- <code title="get /countries/provinces">client.countries.<a href="./src/resources/countries.ts">listProvinces</a>({ ...params }) -> CountryListProvincesResponse</code>

# Validate

Types:

- <code><a href="./src/resources/validate.ts">ValidateCheckResponse</a></code>

Methods:

- <code title="get /validate">client.validate.<a href="./src/resources/validate.ts">check</a>({ ...params }) -> ValidateCheckResponse</code>

# Currency

Types:

- <code><a href="./src/resources/currency.ts">VatPrice</a></code>
- <code><a href="./src/resources/currency.ts">CurrencyListResponse</a></code>
- <code><a href="./src/resources/currency.ts">CurrencyCalculateVatPriceResponse</a></code>
- <code><a href="./src/resources/currency.ts">CurrencyConvertResponse</a></code>

Methods:

- <code title="get /currency">client.currency.<a href="./src/resources/currency.ts">list</a>({ ...params }) -> CurrencyListResponse</code>
- <code title="get /currency/price">client.currency.<a href="./src/resources/currency.ts">calculateVatPrice</a>({ ...params }) -> CurrencyCalculateVatPriceResponse</code>
- <code title="get /currency/convert">client.currency.<a href="./src/resources/currency.ts">convert</a>({ ...params }) -> CurrencyConvertResponse</code>

# Invoice

Types:

- <code><a href="./src/resources/invoice/invoice.ts">CreateInvoice</a></code>
- <code><a href="./src/resources/invoice/invoice.ts">Invoice</a></code>
- <code><a href="./src/resources/invoice/invoice.ts">InvoiceBusinessInput</a></code>
- <code><a href="./src/resources/invoice/invoice.ts">InvoiceConversionInput</a></code>
- <code><a href="./src/resources/invoice/invoice.ts">InvoiceCustomerInput</a></code>
- <code><a href="./src/resources/invoice/invoice.ts">InvoiceResponse</a></code>
- <code><a href="./src/resources/invoice/invoice.ts">InvoiceListResponse</a></code>
- <code><a href="./src/resources/invoice/invoice.ts">InvoiceDeleteResponse</a></code>

Methods:

- <code title="post /invoice">client.invoice.<a href="./src/resources/invoice/invoice.ts">create</a>({ ...params }) -> InvoiceResponse</code>
- <code title="get /invoice/{invoice_id}">client.invoice.<a href="./src/resources/invoice/invoice.ts">retrieve</a>(invoiceID) -> InvoiceResponse</code>
- <code title="patch /invoice/{invoice_id}">client.invoice.<a href="./src/resources/invoice/invoice.ts">update</a>(invoiceID, { ...params }) -> InvoiceResponse</code>
- <code title="get /invoice">client.invoice.<a href="./src/resources/invoice/invoice.ts">list</a>({ ...params }) -> InvoiceListResponse</code>
- <code title="delete /invoice/{invoice_id}">client.invoice.<a href="./src/resources/invoice/invoice.ts">delete</a>(invoiceID) -> InvoiceDeleteResponse</code>

## Item

Types:

- <code><a href="./src/resources/invoice/item.ts">InvoiceItem</a></code>
- <code><a href="./src/resources/invoice/item.ts">InvoiceItemInput</a></code>
- <code><a href="./src/resources/invoice/item.ts">ItemRetrieveResponse</a></code>

Methods:

- <code title="get /invoice/{invoice_id}/item/{item_id}">client.invoice.item.<a href="./src/resources/invoice/item.ts">retrieve</a>(itemID, { ...params }) -> ItemRetrieveResponse</code>
- <code title="patch /invoice/{invoice_id}/item/{item_id}">client.invoice.item.<a href="./src/resources/invoice/item.ts">update</a>(itemID, { ...params }) -> InvoiceResponse</code>
- <code title="delete /invoice/{invoice_id}/item/{item_id}">client.invoice.item.<a href="./src/resources/invoice/item.ts">delete</a>(itemID, { ...params }) -> InvoiceResponse</code>
- <code title="post /invoice/{invoice_id}/item">client.invoice.item.<a href="./src/resources/invoice/item.ts">add</a>(invoiceID, { ...params }) -> InvoiceResponse</code>

# Usage

Types:

- <code><a href="./src/resources/usage.ts">UsageRetrieveResponse</a></code>

Methods:

- <code title="get /usage">client.usage.<a href="./src/resources/usage.ts">retrieve</a>() -> UsageRetrieveResponse</code>

# Sandbox

Types:

- <code><a href="./src/resources/sandbox.ts">SandboxGenerateKeyResponse</a></code>

Methods:

- <code title="post /sandbox/key">client.sandbox.<a href="./src/resources/sandbox.ts">generateKey</a>() -> SandboxGenerateKeyResponse</code>
