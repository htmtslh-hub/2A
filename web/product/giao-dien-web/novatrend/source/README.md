# NovaTrend 1.2.0

Start with CUSTOMISE.md → **COD setup**. This update adds delivery details, editable order summary and cash-on-delivery checkout. The original visual design, cart and motion remain.

Extract the whole ZIP and open index.html. No build or framework is needed. Checkout uses three additional local files: assets/js/shop-config.js (public settings), assets/js/commerce.js, assets/css/commerce.css.

**Before setup:** checkout previews an order only, makes no request and leaves the bag intact. **After setup:** POST to your configured order service on explicit submission; clear the bag only after JSON {"ok":true}. Failed/timeout requests preserve the bag. Delivery fields are not persisted in browser storage. Order confirmation and inventory checks are the shop's responsibility. No online gateway account, hosting subscription or stock backend is bundled.

Products, prices and delivery fees are illustrative. New sample prices for skincare are demonstration data. Keep source pricing, HTML copy and your order-service catalogue in sync. The template download price is separate from the sample goods' prices.

Online payment is an optional documented integration using the merchant's own account and a server that validates product IDs/prices, creates checkout and verifies signed webhooks. No secret keys belong in the browser. Read LICENCE.txt; its existing terms are unchanged.

Current checkout checks are recorded in ../reviews/1.2.0/QA.md. Earlier compatibility claims below refer to the original design, not live COD delivery or online payments.

## Original design documentation (before the COD update)

# NovaTrend 1.1.0

A modern, high-converting lifestyle & e-commerce storefront template built with pure HTML5, CSS3, and JavaScript.

## Included
- `index.html`: Complete, accessible e-commerce layout featuring Announcement Bar, Sticky Navigation with dropdown, Hero with 3D model visual & interactive floating product badges, Guarantees Trust Bar, Shop by Categories, New Arrivals with product slider and instant category filtering, Best Sellers feature cards, Flash Sale with live countdown timer, Summer Collection promotion banner, Bottom Guarantees, and Comprehensive Footer.
- `assets/css/style.css`: Modern CSS styling with design tokens in `:root`, responsive layout across desktop, tablet, and mobile, accessible focus indicators, and smooth animations that comply with the 05/10/2026 animation rule (always enabled by default across all browsers).
- `assets/js/main.js`: Interactive storefront engine featuring interactive cart drawer with quantity adjustments, free shipping progress bar ($50 threshold), checkout review demo, wishlist drawer with saved items management, live search modal with auto-filter tags, category filtering, and requestAnimationFrame fallbacks.
- `assets/img/`: 16 optimized WebP image assets covering two transparent hero models, 6 category covers, 6 product shots, and 2 promotional campaign banners.
- `CUSTOMISE.md`: 10-step customisation guide with 12 AI prompts and product-specific literal edit map.
- `LICENCE.txt`: Standard commercial usage license.

## How to Open
1. Unzip the downloaded file.
2. Double click `index.html` to open it directly in any web browser (Chrome, Edge, Firefox, Safari, Cốc Cốc).
3. No build steps, Node.js, framework, CDN, or backend server are required.

## Working Features
- Interactive Cart Drawer with `localStorage` persistence (`novatrend-cart-v1`).
- Interactive Wishlist with real-time badge count and `localStorage` persistence (`novatrend-wishlist-v1`).
- Live Category Filtering (Fashion, Electronics, Beauty, Fitness, Home Decor, Accessories).
- Product Slider navigation (Prev / Next buttons).
- Live Flash Sale Countdown Timer (Days : Hours : Mins : Secs).
- Live Search Dialog with instant product filtering and keyword suggestions.
- Mobile Navigation Drawer with accessible toggle and smooth transitions.
- Hero Interactive Floating Badges that allow direct adding to cart.

## Demo Scope
Checkout is a simulated accessible review step for demonstration; no real payment gateway or order processing is attached. Newsletter subscription provides instant client feedback.

## Transparent lookbooks (1.1.0)
The hero now contains two local transparent WebP cutouts, adapted with the built-in image tool from the owner's supplied screenshots. Screenshot UI, text, product cards and scenery have been removed from the images. The orange shape and product badges are independent HTML/CSS layers. Two buttons actually switch between the fashion and casual looks; keyboard Left/Right/Home/End also works. The 620ms finite requestAnimationFrame transition runs even when CSS animation is unavailable or the system requests reduced motion. Repeated clicks cancel the previous frame loop. Without JavaScript the fashion look remains visible.

Keep alpha transparency when replacing `hero-fashion.webp` or `hero-casual.webp`; both canvases are 900×1350. The supplied portraits end above the feet, and that original crop is preserved. On phones, product badges move below the portraits to keep faces unobstructed. See `CUSTOMISE.md` for editing steps. Asset licensing remains subject to the owner-confirmation terms in `LICENCE.txt`.
