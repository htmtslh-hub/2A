# QA Report — Lauberhorn Ridge (`lauberhorn-ridge` / `t95`, v1.0.0)

- **Date:** 2026-10-23
- **Product Slug:** `lauberhorn-ridge`
- **Catalog ID:** `t95`
- **Category:** `commerce` (Alpine Hiking Trail Guide Dashboard Hero & Travel App)
- **Access Tier:** `premium`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs lauberhorn-ridge --ngoai-le`
- **Archive Path:** `web/product/giao-dien-web/lauberhorn-ridge/lauberhorn-ridge.zip`
- **Byte Size:** `20,363` bytes (`< 20,480` bytes) — Exception `--ngoai-le` approved for Single-File Self-Contained HTML (`INLINE_PRODUCTS`).
- **SHA-256:** `bfa3aed1c41f81037e3c907fab9f9c8f38d6861f86675286f29b210b30d75421`
- **File Count:** `4` files (byte-identical with `source/`):
  - `lauberhorn-ridge/CUSTOMISE.md`
  - `lauberhorn-ridge/index.html`
  - `lauberhorn-ridge/LICENCE.txt`
  - `lauberhorn-ridge/README.md`
- **Synced Public Demo:** `web/public/demos/lauberhorn-ridge/index.html` (byte-identical with `source/index.html`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 8 viewports (`1440×900` frame coordinate check, `1440×960`, `1024×768`, `820×1180` tablet portrait, `768×1024`, `740×360` landscape, `375×812` phone, `320×740` narrow phone):

| Browser | Version | Viewports (`1440`, `1440x960`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal / Vertical Overflow | Console / Page Errors | `16:10` Valley Plate (`1728×1080`) + `10s` Drone Video (`111.11%` width, `-5.556%` left) + Zero Card Shadows | Exact `1440×900` Widget Coordinates + 16 Contours + 4 Interactive Tabs (`SLOPES`, `ALTITUDE`, `SEASONS`, `TYPES`) + `19°` Gauge & Modal |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (8/8) | `false` / `false` | `0` / `0` | PASS (`videoReady = true`, `cardShadowsNone = true`, zero background drawing in code) | PASS (all 11 widgets at exact `(x, y, w, h)` in `1440×900`, `contours = 16`, `tempText = "19°"`, tab switch & modal verified) |
| **Firefox** | `155.0` | PASS (8/8) | `false` / `false` | `0` / `0` | PASS (`videoReady = true`, `cardShadowsNone = true`, zero background drawing in code) | PASS (all 11 widgets at exact `(x, y, w, h)` in `1440×900`, `contours = 16`, `tempText = "19°"`, tab switch & modal verified) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (8/8) | `false` / `false` | `0` / `0` | PASS (`videoReady = true`, `cardShadowsNone = true`, zero background drawing in code) | PASS (all 11 widgets at exact `(x, y, w, h)` in `1440×900`, `contours = 16`, `tempText = "19°"`, tab switch & modal verified) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (8/8) | `false` / `false` | `0` / `0` | PASS (`videoReady = true`, `cardShadowsNone = true`, zero background drawing in code) | PASS (all 11 widgets at exact `(x, y, w, h)` in `1440×900`, `contours = 16`, `tempText = "19°"`, tab switch & modal verified) |

## 3. Store Previews & Video Recording (`quay-preview.mjs`)

- **Static Previews:**
  - `web/public/previews/lauberhorn-ridge.webp` (`1280×800`)
  - `web/public/previews/lauberhorn-ridge-tablet.webp` (`820×1180`)
  - `web/public/previews/lauberhorn-ridge-mobile.webp` (`375×812`)
- **Video Preview:**
  - `web/public/previews/lauberhorn-ridge.mp4` (`2,033,145` bytes, `14.966667s`, `960×600` @ `30fps`)
  - **Revision:** `d1f8e81379dc`
  - **Video SHA-256:** `d1f8e81379dcf02bf3d03e79a630f66b48f57e8bc5ff179f82e55590f57e9d96`
  - **Demo HTML SHA-256:** `002f9fda8bace8a9e6e2a4e3707375c1015f59c08d4ff10b3db2f212ff95f4f7`
  - **Demo Bundle SHA-256:** `416b56f3d6911a1facc1c818a025bba2a2fc71ed131968863bec671d89325f80`
  - **Recorded Actions:** `hover hero` (`1.0s`), `lauberhorn-ridge-switch-seasons-and-open-reel` (`2.835s`), `lauberhorn-ridge-close-modal-and-switch-slopes` (`5.188s`), `scroll` (`6.7s`), `lauberhorn-ridge-restore-altitude-and-hover-play` (`10.155s`), `errors = 0`, `missing = 0`.
