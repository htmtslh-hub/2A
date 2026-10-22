# QA Report — Targo (`targo` / `t92`, v1.0.0)

- **Date:** 2026-10-22
- **Product Slug:** `targo`
- **Catalog ID:** `t92`
- **Category:** `commerce` (Testing Infrastructure & Automated QA Platform)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs targo --ngoai-le`
- **Archive Path:** `web/product/giao-dien-web/targo/targo.zip`
- **Byte Size:** `3,237,616` bytes — Exception `--ngoai-le` approved for Single-File Self-Contained HTML (`INLINE_PRODUCTS`) plus universal H.264 (`avc1`, `yuv420p`) transcodes (`assets/hero-h264.mp4` and `assets/about-h264.mp4`) backing the 10-bit HEVC CloudFront streams for Q07 cross-browser compatibility.
- **SHA-256:** `0621848c93786c88d765e088034546959eb90ce2183f63233c43ba970e846dd8`
- **File Count:** `6` files (byte-identical with `source/`):
  - `targo/assets/about-h264.mp4`
  - `targo/assets/hero-h264.mp4`
  - `targo/CUSTOMISE.md`
  - `targo/index.html`
  - `targo/LICENCE.txt`
  - `targo/README.md`
- **Synced Public Demo:** `web/public/demos/targo/` (byte-identical with `source/`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 7 viewports (`1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360` landscape, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | 2 Sections Only (`#home` + `#about`), Flush-Right Video & `mix-blend-mode: hue` | Mobile `<= 700px` Menu & Creative 15% `#targoModal` |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (7/7) | `false` | `0` / `0` | PASS (2 sections, 0 footers, `object-fit: contain`, `mix-blend-mode: hue`, right-edge gap `0px`) | PASS (`#mobileNavMenu` open/close, `#runSuiteBtn` suite `#805` & `#auditForm` lock) |
| **Firefox** | `155.0` | PASS (7/7) | `false` | `0` / `0` | PASS (2 sections, 0 footers, `object-fit: contain`, `mix-blend-mode: hue`, right-edge gap `0px`) | PASS (`#mobileNavMenu` open/close, `#runSuiteBtn` suite `#805` & `#auditForm` lock) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (7/7) | `false` | `0` / `0` | PASS (2 sections, 0 footers, `object-fit: contain`, `mix-blend-mode: hue`, right-edge gap `0px`) | PASS (`#mobileNavMenu` open/close, `#runSuiteBtn` suite `#805` & `#auditForm` lock) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (7/7) | `false` | `0` / `0` | PASS (2 sections, 0 footers, `object-fit: contain`, `mix-blend-mode: hue`, right-edge gap `0px`) | PASS (`#mobileNavMenu` open/close, `#runSuiteBtn` suite `#805` & `#auditForm` lock) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Static WebP Previews:**
  - `web/public/previews/targo.webp` (`1280×800`)
  - `web/public/previews/targo-tablet.webp` (`820×1180`)
  - `web/public/previews/targo-mobile.webp` (`375×812`)
- **Recorded Video Preview:**
  - **File:** `web/public/previews/targo.mp4`
  - **Size:** `776,265` bytes (`14.966667s`, `960×600`, `30 fps`, H.264 `yuv420p`, audio `false`)
  - **Revision:** `3ef959bd79b4`
  - **SHA-256:** `3ef959bd79b44d7cc681a2196ffa876286ae413c0eb1dae6b664cc5a92881b74`
  - **Demo HTML SHA-256:** `7303613d5b10e76f6f1635bdf257a9cb62a5864bd22809e937160414741da2ac`
  - **Demo Tree SHA-256:** `ed14f847c90098e9337be6d724316c87d8ea99c2b671d1905debff3933427bde`
  - **Contact Sheet:** `web/product/giao-dien-web/reviews/video-previews/screenshots/targo-contact.jpg`
