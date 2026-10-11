# Solenne 2.1.0

Start with CUSTOMISE.md → **COD setup**. This update adds delivery details, editable order summary and cash-on-delivery checkout. The original visual design, cart and motion remain.

Extract the whole ZIP and open index.html. No build or framework is needed. Checkout uses three additional local files: assets/js/shop-config.js (public settings), assets/js/commerce.js, assets/css/commerce.css.

**Before setup:** checkout previews an order only, makes no request and leaves the bag intact. **After setup:** POST to your configured order service on explicit submission; clear the bag only after JSON {"ok":true}. Failed/timeout requests preserve the bag. Delivery fields are not persisted in browser storage. Order confirmation and inventory checks are the shop's responsibility. No online gateway account, hosting subscription or stock backend is bundled.

Products, prices and delivery fees are illustrative. New sample prices for skincare are demonstration data. Keep source pricing, HTML copy and your order-service catalogue in sync. The template download price is separate from the sample goods' prices.

Online payment is an optional documented integration using the merchant's own account and a server that validates product IDs/prices, creates checkout and verifies signed webhooks. No secret keys belong in the browser. Read LICENCE.txt; its existing terms are unchanged.

Current checkout checks are recorded in ../reviews/2.1.0/QA.md. Earlier compatibility claims below refer to the original design, not live COD delivery or online payments.

## Original design documentation (before the COD update)

# Solenne — static website template

Version 2.0.1 · Forge Zone · image-led skincare revision

Start with **CUSTOMISE.md**. It contains ten practical steps, twelve copy-ready AI prompts, and a counted search table specific to this template. Editing code or applying complete files returned by your AI tool is required; this is not a hosted no-code editor.

## Open

Extract the complete ZIP and open solenne/index.html in a browser. Keep assets/css/style.css and assets/js/main.js in their original relative paths. No installation or build is required. Upload the contents of the solenne folder to the root of any static host. Keep LICENCE.txt and an untouched original backup.

## Included

One English HTML page, one CSS file, one JavaScript file, CUSTOMISE.md, README.md and LICENCE.txt. Three local WebP images were generated with built-in ImageGen for this revision. Mobile navigation and short reveal transitions are the only JavaScript behaviours. Every CTA is a section anchor or an email link. Email links open the visitor’s email app; they do not send a message automatically.

## Not included

No backend, booking, checkout, cart, login, live search, inventory, form submission, analytics or data collection. The contact action is an enquiry, not an automated reservation or quote. The storefront preview video is not embedded in the downloadable template.

## Demo data

Solenne is a fictional skincare brand. Glow Serum and Daily Cream are fictional products. The beauty portrait is generated imagery, not a customer or a treatment result. Replace branding, product copy and email destinations before publication. No clinical outcomes, reviews or third-party endorsements are supplied.

Replace every hello@example.com destination and all demo branding before publishing. Read the exact edit map near the end of CUSTOMISE.md.

## Fonts and offline use

Manrope is optionally loaded from Google Fonts with display=swap. System fallbacks are declared in CSS. With no network, the page remains readable and usable but typography can differ. No external image or script is required. Font licences and official source links are in LICENCE.txt.

## Verified compatibility

The release checks run on Windows with actual Chromium and Firefox, at desktop, tablet and phone widths, over HTTP and file:// after ZIP extraction. Safari, Edge and physical mobile devices have not been separately tested; no claim of verified support for them is made. Reduced motion, disabled JavaScript, blocked fonts and keyboard navigation are included in the release checks. This is an internal checklist, not an external accessibility certification.

See LICENCE.txt for commercial use and redistribution restrictions.

## Artwork and profile exception

Local assets: assets/img/hero.webp, skin.webp and gift.webp. The user requested generated photography and a complete cream/rose skincare redesign. This revision has nine files and exceeds the original six-file SVG-only / 20,480-byte profile. No online checkout or newsletter submission has been added.
