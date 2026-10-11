## COD checkout quick start — 1.3.0

Read the **COD setup** section below before accepting orders. The package now includes assets/js/shop-config.js, assets/js/commerce.js and assets/css/commerce.css. Attach the whole current ZIP when asking AI to edit it.

# Velora 1.3.0 customisation guide

Velora is a fictional bicycle showroom with a working browser-local carousel,
product details and visual configuration. It includes a local bag and configurable
COD checkout. Connect your own receiver before accepting orders; preview mode
sends nothing. No inventory backend or merchant account is bundled.
All prices/specifications are illustrative and must be replaced.
Source has nine files and no build step or external runtime dependency.

## Edit map

Counts are literal in the final file named below, not across the whole folder.
Update static HTML and JS data together. Preserve unique SVG gradient IDs.

| File | Find | Count | Purpose |
|---|---|---|---|
| `index.html` | `Velora` | 6 | Metadata and initial enquiry |
| `index.html` | `velora` | 2 | Header/footer |
| `index.html` | `VELORA` | 6 | SVG bike wordmarks |
| `index.html` | `hello@example.com` | 2 | Static and initial email destinations |
| `assets/js/main.js` | `hello@example.com` | 1 | Configured enquiry destination |
| `assets/js/main.js` | `const models =` | 1 | Model names, sample prices and specifications |
| `assets/js/main.js` | `const finishes =` | 1 | Finish names and SVG paint colours |
| `assets/js/main.js` | `const labels =` | 1 | Configuration names in summaries and email |
| `assets/js/main.js` | `const duration = 850` | 1 | Product transition duration in milliseconds |
| `assets/js/main.js` | `progress(now, began, 950)` | 1 | Gallery/detail transition duration |
| `assets/css/style.css` | `--accent:` | 1 | Button colour |
| `assets/css/style.css` | `--accent-text:` | 1 | Accent text |
| `assets/css/style.css` | `--violet:` | 1 | Display panel |
| `assets/css/style.css` | `--font-display:` | 1 | Heading system-font stack |
| `assets/css/style.css` | `--font-body:` | 1 | Body system-font stack |

Model order: Metro, Onyx, Loop. Each bike keeps its own setup this visit;
reload resets defaults. Frame offers Chalk, Graphite, Lavender, Coral, Ocean
and Sage. Edit the HTML radios, CSS swatches and JS finishes together.
Price is per model without option surcharges. Static cards show default paint;
the hero reflects your choices. SVG illustrations are not engineering drawings.
Photos may require a different configurator. No fonts are redistributed.

Keep carousel/scene transforms separate, SVG identity and tab ARIA/inert state.
Finite motion defaults on despite OS reduce or saved off; Pause lasts this visit.

## Step 1 - Unzip and open

Extract the whole ZIP. Open index.html beside assets in your browser; read README and this guide. Keep CSS at assets/css/style.css and JS at assets/js/main.js. Result: the gallery works without installation.

## Step 2 - Make a working copy

Keep the original ZIP unchanged. Copy the extracted folder to website-working-copy and edit only it. Make dated full-folder backups outside it. Save UTF-8 with real extensions, never .html.txt. Result: a recoverable working copy.

## Step 3 - Prepare verified information

Collect verified brand, audience, models, descriptions, specifications, prices, email, language and assets you may use. Identify unknown facts; all demo data must be replaced. Result: usable business information without invented claims.

## Step 4 - Start a fresh AI conversation

Attach the complete current ZIP and use Prompt 01. Screenshots explain appearance but do not replace files. Start new chats by resending files and Prompt 01. Without file access, save complete returned files to their exact paths and refresh. Result: AI works from your current copy.

**Prompt 01 - Set up my Velora editing assistant**

```text
Read my current six Velora files: index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md and LICENCE.txt. Report missing files; do not guess or edit yet. Summarise working interactions and fictional data. Ask for my brand, bikes, contact, language and goal in small groups. Preserve plain HTML/CSS/JS, relative paths, keyboard access, offline operation and finite default-on motion. Never invent facts or add dependencies, tracking or checkout. Edit only my working copy, or return complete files with exact destinations and real verification. Do not publish.
```

## Step 5 - Replace copy and destinations

Use Prompts 02 and 03. Update HTML and the JS models array together; replace email in both. Open every model and Specifications, and test each Explore link. Result: metadata, prices, details and enquiry agree.

**Prompt 02 - Personalise all content**

```text
Read my latest Velora files. Ask for missing verified brand, bike descriptions, prices, specifications, public contact and language before changing dependent content. Update metadata, visible copy, accessible labels, collection cards and the JS models array consistently. Remove unsupported claims rather than inventing them. Keep layout and interaction behaviour. Return complete changed files with paths, remaining demo items and actual checks. Update documentation and literal edit counts. Do not publish.
```

**Prompt 03 - Connect the actions**

```text
Read the latest HTML/JS and list every action and destination. Ask for verified public email and real URLs, or whether to remove an action. Update both email locations and preserve the selected bike/configuration in its enquiry body. Keep internal anchors and model-specific Explore links. Never simulate sending mail, payment or order success. Return complete changed files with paths and a click checklist for all models. State untested destinations and do not publish.
```

## Step 6 - Change the visual system

Use Prompts 04–07 one change at a time. CSS :root has colours/fonts; JS finishes and SVG stops set bike paint. Adding models requires slide/card/data/setup and unique SVG IDs. Result: consistent visuals and working configurations.

**Prompt 04 - Apply colours and fonts**

```text
Read current HTML/CSS/JS. Ask for missing brand colours and desired fonts. Reuse :root and finishes data; preserve layout and interaction. Check text, controls, hover and focus contrast, including the violet panel. Keep fallback fonts; request licence confirmation before using paid fonts. Return complete changed files, paths, measured contrast where possible and desktop/mobile checks. Update the edit map. Do not add dependencies or publish.
```

**Prompt 05 - Replace a visual asset**

```text
Read current files and my supplied image; ask which placement I intend and confirm permission if unclear. Inspect the existing wrapper, then specify relative filename, folder, dimensions and aspect ratio. Keep the same selected visual through gallery/detail, responsive sizing, reserved space and alt text. Explain configuration features that a flat photo cannot retain before changing them. Return complete changed files, placement instructions and visual checks. No hotlinks or dependencies.
```

**Prompt 06 - Translate every visitor string**

```text
Read my latest files and ask for the target language if missing. Translate all visitor strings in HTML and JS, including metadata, accessible names, tabs, choices, specifications, summaries and enquiry body. Keep verified names, contacts, URLs, IDs and paths unless I request replacements. Preserve carousel behaviour and update html lang. Check text at 320, 375, 820 and 1440 pixels. Return complete changed files and wording needing confirmation; state actual tests and update the guide.
```

**Prompt 07 - Add or remove a model or section**

```text
Read current files and ask which model/section I want added or removed, with missing verified content. Update slide/card/model/setup data and matching links together. Preserve unique SVG IDs, modulo direction, same-bike scene continuity, keyboard/touch controls and static fallback. Remove empty blocks and broken links. Return complete changed files, paths and updated counts. Test both wraps, rapid clicks and every model's detail data. No libraries, backend or publication.
```

## Step 7 - Test the final folder

Use Prompt 08. Test four reference sizes, menu, keyboard, wrap both ways, rapid clicks, every model/configuration, zoom 200%, no JS and offline opening. Pause stops motion; reload starts on. Result: record actual passes and untested cases.

**Prompt 08 - Audit the final website**

```text
Audit the complete current ZIP. Check carousel directions, direct wrap, rapid input, scene continuity, matching model/price/specs, all configuration tabs, per-bike state, bag variants and COD setup. Check menu, focus, tabs, Escape, swipe, contrast, IDs and console/network. Test 1440×900, 820×1180, 375×812, 320×740, zoom 200%, no JS, offline, default-on motion with OS reduce/old off settings, and pause/resume. Fix confirmed small faults within scope. Return complete files and PASS/FAIL/NOT TESTED evidence; name actual browsers/devices. Do not publish.
```

## Step 8 - Publish a clean website folder

Copy index.html and assets into website-publish, with HTML at its root; exclude ZIP, backups and private notes. Preserve required licence notices. Open locally, then use Prompt 09 for current host instructions. Result: a clean folder; publish only on your explicit request.

**Prompt 09 - Guide me through publishing**

```text
Read my website folder. Ask which host, account and upload workflow/screen I use. Use current official documentation and link it; do not guess labels. Guide small steps for website-publish containing index.html and assets. Exclude backups, private notes and the purchase ZIP. I handle credentials and payments. Publish only after my explicit request. Verify the returned URL, CSS/JS, configuration, mobile layout, enquiry and HTTPS; report checks you could not run.
```

## Step 9 - Connect a domain if needed

Verify the temporary hosted URL first. If you own a domain, use Prompt 10 with exact host records. Back up DNS and preserve email records. Result: verify root/www, redirects and HTTPS after propagation; this step is optional.

**Prompt 10 - Connect my domain**

```text
Ask for host, DNS provider, domain, existing website/email use and the host's exact record instructions. Read current official documents and my records; invent no IPs or targets. Explain necessary changes and how to verify them. Preserve unrelated records, especially email MX/TXT. I handle login and DNS changes; request no secrets. Verify root/www, redirects, HTTPS and email after propagation, reporting unavailable checks. Do not change a live domain without my explicit request.
```

## Step 10 - Update and recover

Back up the known-good folder. Use Prompt 11 for a bounded update or Prompt 12 for a fault. Test and update the same host project. Restore related files together, not mixed versions. Result: recoverable source and published files.

**Prompt 11 - Update one part safely**

```text
Read my latest six published-source files. Ask which bounded change I want if unclear. Identify its files/dependencies and preserve other approved content, setup, layout, interactions and paths. Return complete changed files with destinations, exact differences, updated guide/counts and a local verification checklist. Explain rebuilding website-publish for the same host project. Never restore demo data over my content, publish or alter DNS without a request.
```

**Prompt 12 - Find and fix a fault**

```text
Read my current files. Ask for expected/actual behaviour, action, browser/device, last edit and file/HTTP context if missing. Diagnose from code/runtime evidence; request one specific missing file, screenshot or console message when needed. Check paths, IDs, hidden/inert state, cached assets and cancelled rAF. Prefer the smallest repair preserving design/data/interactions. Return complete changed files, exact paths, cause, reproducible verification and untested items. Explain restoring a known-good backup. Do not publish.
```

## Final checklist

- Keep the original ZIP and a known-good backup outside the publish folder.
- Replace every demo name, specification, price and example.com email.
- Check both wrap directions, every model detail and configuration group.
- Verify active image, text, counter, selected tab and enquiry body agree.
- Test keyboard focus, Escape, menu, no JS/offline and all four viewport sizes.
- Read the licence and validate rights to assets or fonts you add.
- Verify published assets and HTTPS only after explicitly requesting publication.

If CSS disappears, check assets/css/style.css beside index.html. If switching
fails, check assets/js/main.js and console errors. If changes do not appear,
save the correct working copy and reload. Restore the complete backup before
trying unrelated fixes. A file:/// path works only on your own computer; share a
hosted URL when publication has been requested and completed.


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
