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
