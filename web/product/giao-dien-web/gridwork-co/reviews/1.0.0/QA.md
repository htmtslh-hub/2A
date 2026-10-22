# QA Report — Gridwork Co (`gridwork-co` / `t93`, v1.0.0)

- **Date:** 2026-10-22
- **Product Slug:** `gridwork-co`
- **Catalog ID:** `t93`
- **Category:** `commerce` (Freelance Marketplace & Create-Account Onboarding Hero)
- **Access Tier:** `premium`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs gridwork-co --ngoai-le`
- **Archive Path:** `web/product/giao-dien-web/gridwork-co/gridwork-co.zip`
- **Byte Size:** `17,393` bytes (`< 20,480` bytes) — Exception `--ngoai-le` approved for Single-File Self-Contained HTML (`INLINE_PRODUCTS`).
- **SHA-256:** `a6630b0aeac1e09d9ba16f4e1c7dc39778bc6662ace75d65c7e49b42a971fee1`
- **File Count:** `4` files (byte-identical with `source/`):
  - `gridwork-co/CUSTOMISE.md`
  - `gridwork-co/index.html`
  - `gridwork-co/LICENCE.txt`
  - `gridwork-co/README.md`
- **Synced Public Demo:** `web/public/demos/gridwork-co/index.html` (byte-identical with `source/index.html`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 8 viewports (`1440×960` acceptance check, `1440×900`, `1024×768`, `820×1180` tablet portrait, `768×1024`, `740×360` landscape, `375×812` phone, `320×740` narrow phone):

| Browser | Version | Viewports (`1440x960`, `1440`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal / Vertical Overflow | Console / Page Errors | Left `55%` Photo Card + `61u` 4×4 Tile Pattern + `0.8s` Video Loop | Right `432u` Form + 6 Real Tool Icons (`Figma`, `Webflow`, `Relume` Selected) + Arrows & Modal |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (8/8) | `false` / `false` | `0` / `0` | PASS (6 frosted tiles, `(0,0)` cutout, `photoWidthRatio = 0.55`, `videoReady = true`, `videoFadedIn = true`) | PASS (`['Figma', 'Webflow', 'Relume']` pre-selected, card toggle, arrow carousel, modal open/close) |
| **Firefox** | `155.0` | PASS (8/8) | `false` / `false` | `0` / `0` | PASS (6 frosted tiles, `(0,0)` cutout, `photoWidthRatio = 0.55`, `videoReady = true`, `videoFadedIn = true`) | PASS (`['Figma', 'Webflow', 'Relume']` pre-selected, card toggle, arrow carousel, modal open/close) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (8/8) | `false` / `false` | `0` / `0` | PASS (6 frosted tiles, `(0,0)` cutout, `photoWidthRatio = 0.55`, `videoReady = true`, `videoFadedIn = true`) | PASS (`['Figma', 'Webflow', 'Relume']` pre-selected, card toggle, arrow carousel, modal open/close) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (8/8) | `false` / `false` | `0` / `0` | PASS (6 frosted tiles, `(0,0)` cutout, `photoWidthRatio = 0.55`, `videoReady = true`, `videoFadedIn = true`) | PASS (`['Figma', 'Webflow', 'Relume']` pre-selected, card toggle, arrow carousel, modal open/close) |

## 3. Store Previews & Video Recording (`quay-preview.mjs`)

- **Static Previews:**
  - `web/public/previews/gridwork-co.webp` (`1280×800`)
  - `web/public/previews/gridwork-co-tablet.webp` (`820×1180`)
  - `web/public/previews/gridwork-co-mobile.webp` (`375×812`)
- **Video Preview:**
  - `web/public/previews/gridwork-co.mp4` (`2,031,443` bytes, `14.966667s`, `960×600` @ `30fps`)
  - **Revision:** `ba07922a0246`
  - **Video SHA-256:** `ba07922a02469c238be357c285e43032cd9be18e93f4840003a0aaf04e2fbb58`
  - **Demo HTML SHA-256:** `d225349c8205fe16501b33b995f8b91dcbb5cdcfbccf2b2d6480c01a03aff7f9`
  - **Demo Bundle SHA-256:** `f497f7a9c4fcd17eb9706cdc41172959ca3d9d7eb1e46e4bf59a6be854b9cf63`
  - **Recorded Actions:** `hover hero` (`1.0s`), `gridwork-co-toggle-framer-and-next-testimonial` (`2.899s`), `gridwork-co-prev-testimonial-and-hover-create` (`5.309s`), `scroll` (`6.7s`), `errors = 0`, `missing = 0`.
