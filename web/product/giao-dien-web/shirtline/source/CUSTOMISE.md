## COD checkout quick start — 1.2.0

Read the **COD setup** section below before accepting orders. The package now includes assets/js/shop-config.js, assets/js/commerce.js and assets/css/commerce.css. Attach the whole current ZIP when asking AI to edit it.

# Customise Shirtline

1. Replace the five WebP files in `assets/img/` with same-size transparent product images.
2. Update the names, prices and descriptions in `index.html` and the `looks` array in `assets/js/main.js`.
3. Adjust per-product palettes in `assets/css/theme.css` and `assets/css/controls.css`. The page surround follows the selected product theme.
4. Replace `hello@example.com` in the order link and navigation.
5. Open `index.html` in a browser and test the carousel, add buttons, bag drawer, keyboard focus and mobile layout.

Carousel settings: `ROTATION_MS = 1600` in `assets/js/main.js` controls one rotation step; `AUTO_MS = 5600` is the resting time before automatic advance. The `paint()` function maps five images onto one oval using sine/cosine, with a smaller size at the back. Keep all image nodes in place and animate the shared position; do not replace the central image or add a fade transition. Orbit layout and control spacing are in `assets/css/motion.css`.

Test last-to-first and first-to-last, rapid arrow clicks, the next-product preview, keyboard arrows and the pause button after changing motion. Keep names/prices in the `looks` array matched to collection cards. Restore a backup if any edit breaks those checks.

Rear-shirt size: `scale = .12 + .88 * Math.pow(depth, 5)` in `paint()` keeps the front at full size and makes the side/rear shirts much smaller. The minimum rear scale is 12%; increasing the exponent reduces side shirts without shrinking the selected shirt.

Product palettes are overridden by `html:root[data-look]` in `assets/css/theme.css`. The glow is deliberately subtle to preserve clear product colours. Rear-shirt opacity stays between 78% and 100% in `paint()`; size and placement communicate depth instead of a heavy grey fade.

The showroom uses light product-tinted backgrounds and dark text. Each shirt has a separate elliptical floor shadow (`.shirt-ground-shadow` in `motion.css`) that follows its orbit position and size in `paint()`. Adjust `.43` there to move the shadow below the hem; adjust the gradient/blur in CSS for softness. Keep it separate from the image's contour drop-shadow.


## Ten-step customisation route

## Step 1 — Back up and open

Extract the complete ZIP to a new folder; keep the original ZIP. Open index.html locally. No build is needed. Read README.md and LICENCE.txt.

## Step 2 — Ask AI with the whole package

Attach the complete ZIP, including all CSS, JS and images. Give your real shop name and products in ordinary language. If data is missing, ask AI to list questions before inventing it. Use the prompts below.

## Step 3 — Brand and contact

Edit visible brand, page title, description, footer and public email in index.html. Set the receipt shop name in shop-config.js. Keep fictional claims until you can replace them with verified copy.

## Step 4 — Products and prices

Keep collection card data-price/name, visible prices, the looks array, and shop-config.js products consistent. The first two use dollar amounts/text; shop-config prices use integer USD cents. Keep product IDs stable.

## Step 5 — Size options

Edit each products entry’s variants in shop-config.js. These populate the original collection’s size select. Confirm every offered size is available. Distinct sizes are separate bag lines. Do not imply live stock checks.

## Step 6 — Replace imagery

Replace the five WebP assets with authorised transparent images at the same paths and aspect ratio. Update alt text. Do not sell or distribute assets separately. Keep the generated nature of demo imagery clear.

## Step 7 — Palette and motion

Edit product palettes in theme.css and controls.css. Keep the permanent five-image oval and finite paint/rotateTo motion. ROTATION_MS=1600 and AUTO_MS=5600 are current defaults; test both wrap directions and rapid actions after changes.

## Step 8 — Configure COD

Read COD setup below. Configure shipping and your own public receiver URL, then publish on HTTPS. Keep secrets out of these files. A blank receiver means preview only. Confirm a labelled test reaches your inbox.

## Step 9 — Verify the complete buyer journey

Test 1440×900, 820×1180, 375×812 and 320×740, keyboard, menu, bag sizes/quantities, delivery details, failure and success acknowledgements. Confirm no false success offline and no address/contact data in localStorage.

## Step 10 — Publish and keep a recoverable copy

Publish the whole folder, check actual asset revision on the live URL and repeat a labelled inbox test. Keep your previous version and restore it if anything fails. Connect online payments only through your own validated server as described below.

## Counted edit map

| File | Exact search | Count | Purpose |
|---|---|---|---|
| `assets/js/shop-config.js` | `"orderEndpoint":` | 1 | Public COD receiver |
| `assets/js/shop-config.js` | `"shippingCents":` | 1 | Delivery fee in USD cents |
| `assets/js/shop-config.js` | `"freeShippingAt":` | 1 | Free-delivery threshold |

## Twelve copyable AI prompts

**Prompt 1**

```text
Read the complete attached Shirtline ZIP, including README.md, CUSTOMISE.md, LICENCE.txt and assets, before editing. Replace branding and contact information using the details I provide; keep all product motion and layout. If I have not provided required data, ask for it first; do not invent products, policies or credentials. Preserve unrelated files and the existing visual design. Return the complete revised files and ZIP, list changes, and state what was actually tested and what remains untested.
```

**Prompt 2**

```text
Read the complete attached Shirtline ZIP, including README.md, CUSTOMISE.md, LICENCE.txt and assets, before editing. Update product names, descriptions and USD prices consistently across HTML, looks and shop-config products. If I have not provided required data, ask for it first; do not invent products, policies or credentials. Preserve unrelated files and the existing visual design. Return the complete revised files and ZIP, list changes, and state what was actually tested and what remains untested.
```

**Prompt 3**

```text
Read the complete attached Shirtline ZIP, including README.md, CUSTOMISE.md, LICENCE.txt and assets, before editing. Update offered sizes from my supplied list, preserve stable product IDs and verify distinct sizes remain separate bag lines. If I have not provided required data, ask for it first; do not invent products, policies or credentials. Preserve unrelated files and the existing visual design. Return the complete revised files and ZIP, list changes, and state what was actually tested and what remains untested.
```

**Prompt 4**

```text
Read the complete attached Shirtline ZIP, including README.md, CUSTOMISE.md, LICENCE.txt and assets, before editing. Replace product imagery with my authorised assets, keep the five-image oval and update alt text. If I have not provided required data, ask for it first; do not invent products, policies or credentials. Preserve unrelated files and the existing visual design. Return the complete revised files and ZIP, list changes, and state what was actually tested and what remains untested.
```

**Prompt 5**

```text
Read the complete attached Shirtline ZIP, including README.md, CUSTOMISE.md, LICENCE.txt and assets, before editing. Adjust the five product palettes to my supplied brand colours and verify text contrast on each background. If I have not provided required data, ask for it first; do not invent products, policies or credentials. Preserve unrelated files and the existing visual design. Return the complete revised files and ZIP, list changes, and state what was actually tested and what remains untested.
```

**Prompt 6**

```text
Read the complete attached Shirtline ZIP, including README.md, CUSTOMISE.md, LICENCE.txt and assets, before editing. Adjust automatic carousel timing to the timing I provide; preserve pause, swipe, keyboard and both wrap directions. If I have not provided required data, ask for it first; do not invent products, policies or credentials. Preserve unrelated files and the existing visual design. Return the complete revised files and ZIP, list changes, and state what was actually tested and what remains untested.
```

**Prompt 7**

```text
Read the complete attached Shirtline ZIP, including README.md, CUSTOMISE.md, LICENCE.txt and assets, before editing. Help configure shipping fees and free-delivery threshold in integer USD cents; calculate examples below, at and above the threshold. If I have not provided required data, ask for it first; do not invent products, policies or credentials. Preserve unrelated files and the existing visual design. Return the complete revised files and ZIP, list changes, and state what was actually tested and what remains untested.
```

**Prompt 8**

```text
Read the complete attached Shirtline ZIP, including README.md, CUSTOMISE.md, LICENCE.txt and assets, before editing. Help connect my own public Formspree endpoint for COD; keep preview mode until I supply it and explain the inbox test. If I have not provided required data, ask for it first; do not invent products, policies or credentials. Preserve unrelated files and the existing visual design. Return the complete revised files and ZIP, list changes, and state what was actually tested and what remains untested.
```

**Prompt 9**

```text
Read the complete attached Shirtline ZIP, including README.md, CUSTOMISE.md, LICENCE.txt and assets, before editing. Review the cart and delivery form with keyboard and narrow viewports; fix only problems in those flows. If I have not provided required data, ask for it first; do not invent products, policies or credentials. Preserve unrelated files and the existing visual design. Return the complete revised files and ZIP, list changes, and state what was actually tested and what remains untested.
```

**Prompt 10**

```text
Read the complete attached Shirtline ZIP, including README.md, CUSTOMISE.md, LICENCE.txt and assets, before editing. Help prepare an online-payment server contract using my own merchant account; validate prices and signed webhooks, keep secrets off the browser. If I have not provided required data, ask for it first; do not invent products, policies or credentials. Preserve unrelated files and the existing visual design. Return the complete revised files and ZIP, list changes, and state what was actually tested and what remains untested.
```

**Prompt 11**

```text
Read the complete attached Shirtline ZIP, including README.md, CUSTOMISE.md, LICENCE.txt and assets, before editing. Audit failed requests, timeouts and repeated submits; preserve the bag and stable retry reference without claiming verified payment. If I have not provided required data, ask for it first; do not invent products, policies or credentials. Preserve unrelated files and the existing visual design. Return the complete revised files and ZIP, list changes, and state what was actually tested and what remains untested.
```

**Prompt 12**

```text
Read the complete attached Shirtline ZIP, including README.md, CUSTOMISE.md, LICENCE.txt and assets, before editing. Check the final package for missing files, mismatched prices, placeholders and broken paths; return the full corrected package and an honest test report. If I have not provided required data, ask for it first; do not invent products, policies or credentials. Preserve unrelated files and the existing visual design. Return the complete revised files and ZIP, list changes, and state what was actually tested and what remains untested.
```

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
