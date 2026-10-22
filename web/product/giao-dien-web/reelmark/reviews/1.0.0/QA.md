# QA Report — Reelmark (`reelmark` / `t89`, v1.0.0)

- **Date:** 2026-10-22
- **Product Slug:** `reelmark`
- **Catalog ID:** `t89`
- **Category:** `commerce` (Short-form video creator marketplace)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs reelmark --ngoai-le`
- **Archive Path:** `web/product/giao-dien-web/reelmark/reelmark.zip`
- **Byte Size:** `19,464` bytes (under the `20,480`-byte `W06` limit) — Exception `--ngoai-le` approved for Single-File Self-Contained HTML architecture (`INLINE_PRODUCTS`).
- **SHA-256:** `2e75b96f756b60696cce6a6f14723ed3cf97ef29d0568ba14a6d356d9482d717`
- **File Count:** `4` files (byte-identical with `source/`):
  - `reelmark/CUSTOMISE.md`
  - `reelmark/index.html`
  - `reelmark/LICENCE.txt`
  - `reelmark/README.md`
- **Synced Public Demo:** `web/public/demos/reelmark/index.html` (byte-identical with `source/index.html`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 8 viewports (`1440×1080` reference frame, `1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360` landscape, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440x1080`, `1440`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | 1440×1080 Frame Coordinates & Curved Cylinder Carousel | Interactive Reel Spotlight & Brief Modals |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (8/8) | `false` | `0` / `0` | PASS (Exact match on logo, nav, pills, badge, headline, subline, doodles, CTA ring & 10-card curve) | PASS (`#reelModal` clip switch, `#briefModal` submit & `Escape` close) |
| **Firefox** | `155.0` | PASS (8/8) | `false` | `0` / `0` | PASS (Exact match on logo, nav, pills, badge, headline, subline, doodles, CTA ring & 10-card curve) | PASS (`#reelModal` clip switch, `#briefModal` submit & `Escape` close) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (8/8) | `false` | `0` / `0` | PASS (Exact match on logo, nav, pills, badge, headline, subline, doodles, CTA ring & 10-card curve) | PASS (`#reelModal` clip switch, `#briefModal` submit & `Escape` close) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (8/8) | `false` | `0` / `0` | PASS (Exact match on logo, nav, pills, badge, headline, subline, doodles, CTA ring & 10-card curve) | PASS (`#reelModal` clip switch, `#briefModal` submit & `Escape` close) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Static WebP Previews:**
  - `web/public/previews/reelmark.webp` (`1280×800`)
  - `web/public/previews/reelmark-tablet.webp` (`820×1180`)
  - `web/public/previews/reelmark-mobile.webp` (`375×812`)
- **Recorded Video Preview:**
  - **File:** `web/public/previews/reelmark.mp4`
  - **Size:** `1,026,652` bytes (`14.966667s`, `960×600`, `30 fps`, H.264 `yuv420p`, audio `false`)
  - **Revision:** `a7c3c0408760`
  - **SHA-256:** `a7c3c040876000dbd4d613358099f83f6974ee2c83949c1cf84f67de4d1f8df9`
  - **Demo HTML SHA-256:** `3adbe9f9f3358990202b868b2e673a81d5d975359a799aab392eb479a5cc7082`
  - **Demo Tree SHA-256:** `53394205e8c52916496028fbdb35d95afe4cbdc93607e3d86a47a44b4aba7830`
  - **Contact Sheet:** `web/product/giao-dien-web/reviews/video-previews/screenshots/reelmark-contact.jpg`
