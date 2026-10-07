# NovaTrend

Source: `source/` · Package: `novatrend.zip` · Version: `1.1.0`

User brief: Create an e-commerce storefront web interface matching the provided reference image ("NovaTrend"). Features lifestyle & fashion curated products, interactive cart drawer, wishlist drawer, live countdown promotional banner, and responsive design across desktop, tablet, and mobile.

Approved scope exceptions from WEB-STATIC-1:
- W01: Extra local image assets in `assets/img/` (16 WebP images, including two transparent cutouts adapted from owner-supplied screenshots).
- W03: High-quality generated photography for hero model, category tiles, product showcases, and promo banners.
- W05: Local interactive search modal, category filtering, persistent cart drawer with quantity adjustments, and wishlist explicitly required by e-commerce storefront brief.
- W06: Image-containing ZIP exceeds the static SVG limit of 20,480 bytes. Other quality & accessibility safeguards apply.

Assumptions: Fictional NovaTrend branding, USD currency pricing, free shipping on orders over $50.00 ($4.99 standard fee). Simulated checkout review step for presentation purposes.

## Production Deployment & Catalog Integration

- Production deployment: `dpl_8R5eKAySomFA3qxCbWLtaVjQm2Z8`
- Live Store: https://forgezone.store
- Catalog detail: https://forgezone.store/?mau=t12
- Live demo: https://forgezone.store/demos/novatrend/index.html
- Catalog preview: https://forgezone.store/previews/novatrend.webp
- Verified across Chromium, Firefox, Edge, and Cốc Cốc on 2026-10-06.

## 1.1.0 — transparent lookbooks
Owner request on 2026-10-07: extract only the characters from both supplied screenshots, remove all background/UI elements and replace the NovaTrend hero. Fashion look is the default; casual look is available through the second dot. Separate CSS orange scenery and existing product badges remain editable. On phones, badges sit below the portrait. Source, demo, preview and ZIP are synchronised. Scope and fresh verification: `reviews/1.1.0/QA.md`; original transparent PNGs and preparation script: `design/`.
