# QA Report — Cast & Render (`cast-and-render` / `t90`, v1.0.0)

- **Date:** 2026-10-22
- **Product Slug:** `cast-and-render`
- **Catalog ID:** `t90`
- **Category:** `portfolio` (3D Object Studio)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs cast-and-render --ngoai-le`
- **Archive Path:** `web/product/giao-dien-web/cast-and-render/cast-and-render.zip`
- **Byte Size:** `13,217` bytes (under the `20,480`-byte `W06` limit) — Exception `--ngoai-le` approved for Single-File Self-Contained HTML architecture (`INLINE_PRODUCTS`).
- **SHA-256:** `391d50997a2f8f0fa3231b268e2999130319c49b289364b6ffb7d3080899f272`
- **File Count:** `4` files (byte-identical with `source/`):
  - `cast-and-render/CUSTOMISE.md`
  - `cast-and-render/index.html`
  - `cast-and-render/LICENCE.txt`
  - `cast-and-render/README.md`
- **Synced Public Demo:** `web/public/demos/cast-and-render/index.html` (byte-identical with `source/index.html`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 7 viewports (`1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360` landscape, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | Full-Blob Video Scrubbing & `CUES` Dead Zones | Creative 15% HUD (`FRM 001 / 241`) & 3-Tab `#studioModal` |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (7/7) | `false` | `0` / `0` | PASS (8 direct body children, `#boot.done`, `blob:` MP4, deadZones `[0.29, 0.71]`, cues `[0, 0.49, 0.92]`) | PASS (Chapter jump `01–03`, `#board` / `#visit` / `#order` tabs, `#briefForm` submit & `Escape` close) |
| **Firefox** | `155.0` | PASS (7/7) | `false` | `0` / `0` | PASS (8 direct body children, `#boot.done`, `blob:` MP4, deadZones `[0.29, 0.71]`, cues `[0, 0.49, 0.92]`) | PASS (Chapter jump `01–03`, `#board` / `#visit` / `#order` tabs, `#briefForm` submit & `Escape` close) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (7/7) | `false` | `0` / `0` | PASS (8 direct body children, `#boot.done`, `blob:` MP4, deadZones `[0.29, 0.71]`, cues `[0, 0.49, 0.92]`) | PASS (Chapter jump `01–03`, `#board` / `#visit` / `#order` tabs, `#briefForm` submit & `Escape` close) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (7/7) | `false` | `0` / `0` | PASS (8 direct body children, `#boot.done`, `blob:` MP4, deadZones `[0.29, 0.71]`, cues `[0, 0.49, 0.92]`) | PASS (Chapter jump `01–03`, `#board` / `#visit` / `#order` tabs, `#briefForm` submit & `Escape` close) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Static WebP Previews:**
  - `web/public/previews/cast-and-render.webp` (`1280×800`)
  - `web/public/previews/cast-and-render-tablet.webp` (`820×1180`)
  - `web/public/previews/cast-and-render-mobile.webp` (`375×812`)
- **Recorded Video Preview:**
  - **File:** `web/public/previews/cast-and-render.mp4`
  - **Size:** `680,679` bytes (`14.966667s`, `960×600`, `30 fps`, H.264 `yuv420p`, audio `false`)
  - **Revision:** `408895ca2f91`
  - **SHA-256:** `408895ca2f91efa13c450887aeb167a9fdef2a2b959f2579fcc1ff2dc4670945`
  - **Demo HTML SHA-256:** `79546decc37d4730e2dfaa9960dabac03313ea90d5dec6db526158f0ccd6b4aa`
  - **Demo Tree SHA-256:** `68f81f1042a9d102c1a39f85bda62d0e453f99c7b467e3ca0889a31b5366f216`
  - **Contact Sheet:** `web/product/giao-dien-web/reviews/video-previews/screenshots/cast-and-render-contact.jpg`
