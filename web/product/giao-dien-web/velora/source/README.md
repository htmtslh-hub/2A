# Velora 1.3.0

Start with CUSTOMISE.md → **COD setup**. This update adds delivery details, editable order summary and cash-on-delivery checkout. The original visual design, cart and motion remain.

Extract the whole ZIP and open index.html. No build or framework is needed. Checkout uses three additional local files: assets/js/shop-config.js (public settings), assets/js/commerce.js, assets/css/commerce.css.

**Before setup:** checkout previews an order only, makes no request and leaves the bag intact. **After setup:** POST to your configured order service on explicit submission; clear the bag only after JSON {"ok":true}. Failed/timeout requests preserve the bag. Delivery fields are not persisted in browser storage. Order confirmation and inventory checks are the shop's responsibility. No online gateway account, hosting subscription or stock backend is bundled.

Products, prices and delivery fees are illustrative. New sample prices for skincare are demonstration data. Keep source pricing, HTML copy and your order-service catalogue in sync. The template download price is separate from the sample goods' prices.

Online payment is an optional documented integration using the merchant's own account and a server that validates product IDs/prices, creates checkout and verifies signed webhooks. No secret keys belong in the browser. Read LICENCE.txt; its existing terms are unchanged.

Current checkout checks are recorded in ../reviews/1.3.0/QA.md. Earlier compatibility claims below refer to the original design, not live COD delivery or online payments.

## Original design documentation (before the COD update)

# Velora 1.2.1

A folding-bike showroom with violet cards, coral actions and original inline SVG.

## Start
Read CUSTOMISE.md for the edit map, 10 steps and 12 complete AI prompts.
Extract six files and open index.html. No build, dependencies or network needed.
Keep assets/css/style.css and assets/js/main.js at their relative paths.

## Working interactions
Previous/next and direct wraps, arrow keys, swipe and clickable bike previews.
View bike moves the same SVG into details; Back/Escape returns. Explore opens
its own model. Overview/Specifications show selected-model data. Wheels, Frame,
Saddle and Handlebar radio choices alter the SVG. Frame offers six finishes:
Chalk, Graphite, Lavender, Coral, Ocean and Sage. Per-bike setup lasts this visit;
reload resets it. Price is model-specific with no option surcharge. Enquiry
opens an email client containing the current configuration; it sends nothing.

No cart, checkout, backend, order service or tracking. No-JS shows all models
and contact links, with interactive controls unavailable. System fonts work offline.

## Demo data and customisation
Names, prices and specifications are fictional; replace them and hello@example.com.
SVG is illustrative; the reference video is excluded.
JS models/finishes/labels and HTML cards must agree. CSS :root contains colours
and font stacks; preserve SVG IDs/viewBox. No font files are distributed.

Motion defaults on despite OS reduce/old off settings, per owner instructions.
Pause stops it for this visit; reload starts on. Finite rAF works without CSS
transitions/WAAPI.

## Verification and licence
See QA for exact browser scope; emulated touch is not a physical-device test.
See LICENCE.txt for the commercial licence. Copyright holder: Forge Zone.
