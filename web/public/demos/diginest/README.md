# DigiNest 1.3.0

Start with CUSTOMISE.md → **COD setup**. This update adds delivery details, editable order summary and cash-on-delivery checkout. The original visual design, cart and motion remain.

Extract the whole ZIP and open index.html. No build or framework is needed. Checkout uses three additional local files: assets/js/shop-config.js (public settings), assets/js/commerce.js, assets/css/commerce.css.

**Before setup:** checkout previews an order only, makes no request and leaves the bag intact. **After setup:** POST to your configured order service on explicit submission; clear the bag only after JSON {"ok":true}. Failed/timeout requests preserve the bag. Delivery fields are not persisted in browser storage. Order confirmation and inventory checks are the shop's responsibility. No online gateway account, hosting subscription or stock backend is bundled.

Products, prices and delivery fees are illustrative. New sample prices for skincare are demonstration data. Keep source pricing, HTML copy and your order-service catalogue in sync. The template download price is separate from the sample goods' prices.

Online payment is an optional documented integration using the merchant's own account and a server that validates product IDs/prices, creates checkout and verifies signed webhooks. No secret keys belong in the browser. Read LICENCE.txt; its existing terms are unchanged.

Current checkout checks are recorded in ../reviews/1.3.0/QA.md. Earlier compatibility claims below refer to the original design, not live COD delivery or online payments.

## Original design documentation (before the COD update)

# DigiNest 1.2.0

A standalone technology ecommerce concept in plain HTML, CSS and JavaScript.

## Included
Read CUSTOMISE.md first for ten setup steps, twelve AI prompts and the product-specific edit map. The six core files are accompanied by three local WebP images. No framework, build process, external script, tracking, network font or API is required.

## Open
Extract the entire ZIP and open index.html. You may also serve the folder with any static server. Keep assets beside index.html.

## Working features
Search and category filters, mobile navigation, a keyboard-accessible cart dialog, add/remove, quantities 1–99, exact integer-cent USD totals and sample shipping calculation. Cart is saved in localStorage when available. Storage failures do not stop the cart.

Adding a product or audio duo sends a miniature product card along a curved path to the header cart, which pulses on arrival. The header stays visible while scrolling. Motion uses a finite requestAnimationFrame sequence, is enabled by default, and cancels the previous visual flight on rapid clicks without losing cart additions. Opening the cart clears the flight.

The cart drawer slides in and out over 340ms while its backdrop fades. Product filtering repositions surviving cards and fades in newly visible cards over 320ms. Hover or keyboard focus lifts a product by 5px and enlarges its image by 4.5% over 200ms. All use finite rAF motion without CSS animation or WAAPI dependencies; rapid interactions cancel the previous visual sequence. Escape closes the drawer after its exit motion and returns focus.

## Demo boundaries
Checkout only reviews the selection; no order or payment is submitted. Newsletter controls are visibly disabled. No accounts, backend, stock verification, taxes, payment gateway or fulfilment. All six product names, images, prices, delivery and returns policies are illustrative. The audio bundle has no discount.

## Customise
Copy text and product metadata in index.html, palette and system font in assets/css/style.css, shipping/storage rules in assets/js/main.js. All assets are relative and work offline. Without JavaScript all products remain visible, anchors and policy details work, and cart/search cannot operate.

## Testing
See the product review folder for recorded browser tests. Supported implementation targets modern Chromium and Firefox with native dialog. Safari has not been tested.

## Licence
Read LICENCE.txt. Copyright owner and final raster-image commercial terms require the product owner's confirmation before commercial release.
