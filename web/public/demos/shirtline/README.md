# Shirtline 1.2.0

Start with CUSTOMISE.md → **COD setup**. This update adds delivery details, editable order summary and cash-on-delivery checkout. The original visual design, cart and motion remain.

Extract the whole ZIP and open index.html. No build or framework is needed. Checkout uses three additional local files: assets/js/shop-config.js (public settings), assets/js/commerce.js, assets/css/commerce.css.

**Before setup:** checkout previews an order only, makes no request and leaves the bag intact. **After setup:** POST to your configured order service on explicit submission; clear the bag only after JSON {"ok":true}. Failed/timeout requests preserve the bag. Delivery fields are not persisted in browser storage. Order confirmation and inventory checks are the shop's responsibility. No online gateway account, hosting subscription or stock backend is bundled.

Products, prices and delivery fees are illustrative. New sample prices for skincare are demonstration data. Keep source pricing, HTML copy and your order-service catalogue in sync. The template download price is separate from the sample goods' prices.

Online payment is an optional documented integration using the merchant's own account and a server that validates product IDs/prices, creates checkout and verifies signed webhooks. No secret keys belong in the browser. Read LICENCE.txt; its existing terms are unchanged.

Current checkout checks are recorded in ../reviews/1.2.0/QA.md. Earlier compatibility claims below refer to the original design, not live COD delivery or online payments.

## Original design documentation (before the COD update)

# Shirtline

Shirtline is a static editorial shirt showroom inspired by the supplied jacket-showroom reference. Five permanent product images rotate around a shared oval: the front shirt is largest, and the rear shirts recede. It includes automatic rotation, a live next-product preview, previous/next controls, keyboard arrows, horizontal swipe, a pause button, collection cards, responsive navigation and a local bag drawer with an email enquiry CTA.

Open `index.html` directly. No build step, framework, backend or checkout is included. Product images are original generated assets stored in `assets/img/`.

See `CUSTOMISE.md` for editing. Rotation starts enabled on each new visit, including when the system requests reduced motion; use the pause button to stop it. Hover or keyboard focus temporarily pauses automatic advance. Manual navigation remains available. Product motion uses finite JavaScript animation frames, so it works independently of CSS animations.
