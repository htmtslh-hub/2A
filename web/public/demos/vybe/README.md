# VYBE 1.1.0

Start with CUSTOMISE.md → **COD setup**. This update adds delivery details, editable order summary and cash-on-delivery checkout. The original visual design, cart and motion remain.

Extract the whole ZIP and open index.html. No build or framework is needed. Checkout uses three additional local files: assets/js/shop-config.js (public settings), assets/js/commerce.js, assets/css/commerce.css.

**Before setup:** checkout previews an order only, makes no request and leaves the bag intact. **After setup:** POST to your configured order service on explicit submission; clear the bag only after JSON {"ok":true}. Failed/timeout requests preserve the bag. Delivery fields are not persisted in browser storage. Order confirmation and inventory checks are the shop's responsibility. No online gateway account, hosting subscription or stock backend is bundled.

Products, prices and delivery fees are illustrative. New sample prices for skincare are demonstration data. Keep source pricing, HTML copy and your order-service catalogue in sync. The template download price is separate from the sample goods' prices.

Online payment is an optional documented integration using the merchant's own account and a server that validates product IDs/prices, creates checkout and verifies signed webhooks. No secret keys belong in the browser. Read LICENCE.txt; its existing terms are unchanged.

Current checkout checks are recorded in ../reviews/1.1.0/QA.md. Earlier compatibility claims below refer to the original design, not live COD delivery or online payments.

## Original design documentation (before the COD update)

# VYBE

Start with CUSTOMISE.md for the ten-step guide and twelve AI prompts.

A plain HTML/CSS/JavaScript streetwear template with five original generated model images, a directional product carousel, size selection and a local demonstration bag. Open index.html directly. No build, fonts, CDN or network dependency. Email enquiry opens a mail app; no order, payment, stock or fulfilment system is included. Prices, products and brand are fictional.

Edit colours in assets/css/style.css, product data in assets/js/main.js and cards in index.html together. Replace assets/img/*.webp with your own transparent cutouts, preserving the file names or updating paths. No-JS visitors can browse all cards and use email links. Motion defaults to enabled in every browser, including with OS reduced motion and old saved off values. A finite requestAnimationFrame timeline controls the model transforms without CSS/WAAPI animation. The pause button stops it immediately for this visit.

Browser verification is recorded in reviews outside the customer package. See LICENCE.txt for the existing commercial terms; generated raster assets have their provenance recorded in the delivery report.
