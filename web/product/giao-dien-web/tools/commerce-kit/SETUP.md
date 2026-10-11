## COD setup

The checkout is ready to configure; it does not come with a merchant account or a live order inbox. Use the original design documentation for visual edits and this section for the current checkout.

### The shortest path to accepting COD

1. Open `assets/js/shop-config.js`. Change `name` to your shop name. Keep `slug` stable so existing bags remain accessible.
2. Replace fictional products and prices in HTML and the original `assets/js/main.js` catalogue. Showcase templates use `products` in `shop-config.js` for their new bag; update the original visual prices to match. Prices and delivery amounts use integer USD cents in checkout: 3800 means $38.00. Do not change only the currency symbol.
3. Set `shippingCents` and `freeShippingAt`. A zero delivery fee is free delivery. A zero free-delivery threshold means all orders qualify for free delivery; use a high threshold if every order must pay the configured fee. Publish your shipping areas, taxes, returns and COD conditions in the page copy. Tax is not calculated by this static kit; confirm the final amount before fulfilment.
4. Create an order form in your own [Formspree account](https://formspree.io/). Verify the receiving email and enable the service's spam protection. Copy its public form URL into `orderEndpoint`, for example the URL supplied by your dashboard under `https://formspree.io/f/`. No password or API secret is needed in this file. A form-service subscription and its submission limits are separate from this template.
5. Publish the full website folder to an HTTPS static host. Test from the published URL, not only file://. Allow that domain in your service if domain restrictions are enabled.
6. Submit one clearly labelled test order using your own details. Confirm the exact product, selected size/finish, quantities, delivery fee, total, customer details and order reference appear in your order inbox. Confirm the bag clears only after a real service acknowledgement. Check spam/junk. Do not launch if your inbox does not receive the test.
7. Review each COD request manually, confirm stock, delivery area and price, then contact the customer before shipping. The form service stores order submissions, not inventory or verified payments. An order reference is a traceable request reference; it is not a payment receipt.

Official Formspree documentation: [JavaScript submission](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/), [domain restriction](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain). Dashboard labels can change; use the actual endpoint your account provides. The bundled implementation uses native fetch, with no CDN/library.

If `orderEndpoint` is blank, visitors see **Preview COD order**. This produces a local summary; it never sends an order or clears their bag. A failed request or timeout keeps the bag and asks the customer to check with your shop using the reference before retrying, because a timed-out request may have arrived. Delivery fields are held only in the open form and receipt; closing/reloading does not save them. No analytics or tracking has been added.

### Public settings edit map

Search the quoted setting including its colon in `assets/js/shop-config.js`. Each setting below has one definition:

| Search | Purpose |
|---|---|
| `"orderEndpoint":` | Public HTTPS order-form endpoint; blank means preview |
| `"shippingCents":` | Flat delivery fee in USD cents |
| `"freeShippingAt":` | Free-delivery threshold in USD cents |
| `"onlineCheckoutEndpoint":` | Optional merchant-owned server endpoint; blank disables online payment |
| `"checkoutHosts":` | Exact trusted hostnames for the server's payment redirect |

`products` is present only in showcase templates. Every product has a unique `id`, a name and integer-cent price. Keep IDs stable; changing prices recalculates the current local bag from the catalogue, never from a stored customer-supplied price. Velora also records the current bike configuration as the variant. The other storefronts retain their existing size/colour/cart controls, storage and animations.

### Optional online checkout

Use the gateway available to your business and country. You need your own merchant account. For a cart with multiple products, [Stripe Checkout](https://docs.stripe.com/payments/checkout/how-checkout-works) is one integration option where supported. [Payment Links](https://docs.stripe.com/payment-links) are useful for a fixed offering, but a single fixed-price link does not replace a cart that contains arbitrary products and quantities.

The server, hosted separately from this static template, must:

- Receive the selected product IDs, variants and quantities; look up prices, delivery rules and stock itself. Never trust prices or totals from the browser.
- Validate customer details, restrict allowed origins and rate-limit requests. Store the order reference and prevent duplicate creation on retries.
- Create the checkout session with secret keys on the server only. Return `{"ok":true,"checkoutUrl":"https://trusted-payment-host/..."}`.
- Verify the gateway's signed webhook before marking an order paid. A redirect, query parameter or screenshot is not payment confirmation. Arrange fulfilment and notifications from verified server records.

Then fill `onlineCheckoutEndpoint` with that server's HTTPS URL and `checkoutHosts` with the gateway's exact checkout hostnames. The online button appears only when an endpoint is configured. The bag stays intact while redirecting; the gateway/server manages paid status. Do not connect the template's physical-goods checkout to Forge Zone's digital-template purchase endpoint or reuse Forge Zone's payment credentials.

A custom COD receiver may use the same JSON order contract. Return `{"ok":true}` only after reliably accepting/storing the order. JSON amounts are integer USD cents. Include the reference in replies and staff notifications. Formspree receives a readable `message`, public customer contact fields and `orderId` instead of the nested JSON contract. Manual stock/price confirmation is required for that simple route.

### Checkout checklist

- Add two different products; confirm separate sizes/finishes stay separate. Increase, decrease and remove quantities. Reload the bag.
- Test delivery just below, at and above the free-delivery threshold.
- Verify blank/invalid delivery fields cannot submit. Phone accepts common international number formatting.
- Try blocked storage, malformed cart data, offline mode, rejected/invalid responses and slow requests. No false success; bag stays intact.
- Confirm the loading button prevents a second submission. Confirm Escape, Tab, Shift+Tab and Close behave correctly on desktop and at 320px.
- Replace every fictional claim and placeholder contact. Confirm the receiving service stores the test order before accepting real customers.
- Keep the complete working folder and original ZIP. Change the asset version query when publishing a new revision.

### AI prompt for COD configuration

Attach the complete latest ZIP. Copy this prompt:

```text
Read my template's README.md, CUSTOMISE.md, index.html and all files in assets
before editing. Help me configure the existing COD checkout without changing
the visual design, animations or framework-free structure. Ask for my real shop
name, public order-form endpoint, products, USD prices, delivery fee, delivery
areas and free-delivery threshold. Do not request passwords or secret keys.
Update shop-config.js and matching HTML/main.js product data consistently.
Do not simulate success, add tracking or publish the site. Return complete
changed files with their relative paths, then guide me through one test order
and confirming it in my own order inbox. Keep preview mode until I provide a
real endpoint. Preserve the licence and unrelated features.
```

### AI prompt for online payment integration

```text
Read the complete latest template ZIP and the COD setup section first. Ask
which payment gateway is available to my business, where my server is hosted,
and whether I already have a merchant account. Do not ask me to paste secrets
into chat or browser code. Propose a server integration that validates product
IDs/prices/variants/quantities, delivery and stock, uses idempotent order
creation, creates a hosted checkout and verifies signed payment webhooks.
The static frontend already supports onlineCheckoutEndpoint and checkoutHosts.
Explain the required server files, private environment variables and tests.
Keep online payment disabled until the server exists. Do not claim a payment
succeeded from its redirect. Return complete changed files and setup steps;
do not deploy or change my merchant settings without my explicit instruction.
```
