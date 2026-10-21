# QA Report — Melli (`melli` · `t88` · `v1.0.0`)

- **Date:** 2026-10-21
- **Category:** `education`
- **Access Tier:** `free`
- **Format:** Single-file HTML5 / CSS3 / Three.js 0.160.0 (`index.html`) + `README.md` + `CUSTOMISE.md` + `LICENCE.txt`

## 1. Package & Checksum (`dong-goi.mjs melli --ngoai-le`)

- **Archive:** `web/product/giao-dien-web/melli/melli.zip`
- **Size:** `14,046` bytes (under the `20,480`-byte `W06` limit)
- **SHA-256:** `07d467ef75482808a29a402ee08dbeeb77342e7302b54daf007c4fdc8cdfb47c`
- **Files verified byte-for-byte:**
  - `melli/CUSTOMISE.md`
  - `melli/index.html`
  - `melli/LICENCE.txt`
  - `melli/README.md`

## 2. 4-Browser × 7-Viewport Verification (`check.cjs`)

Executed `node web/product/giao-dien-web/melli/reviews/1.0.0/check.cjs` across 4 real browser engines and 7 viewports (`1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360`, `375×812`, `320×740`):

| Browser | Version | Console Errors | Page Errors | Horizontal Overflow | WebGL / GLB Ready (`#bee.ready`, `body.loaded`) | Scroll-Driven Flight, Flower Parallax & `body.on-dark` Inversion |
| --- | --- | --- | --- | --- | --- | --- |
| Chromium | `153.0.8010.12` | `0` | `0` | `false` (all 7 viewports) | `PASS` | `PASS` |
| Firefox | `155.0` | `0` | `0` | `false` (all 7 viewports) | `PASS` | `PASS` |
| Microsoft Edge | `155.0.4283.62` | `0` | `0` | `false` (all 7 viewports) | `PASS` | `PASS` |
| Cốc Cốc | `152.0.7977.124` | `0` | `0` | `false` (all 7 viewports) | `PASS` | `PASS` |

## 3. Store Assets & 15s Video Recording (`quay-preview.mjs melli`)

- **Desktop Preview (`1280×800`):** `web/public/previews/melli.webp`
- **Tablet Preview (`820×1180`):** `web/public/previews/melli-tablet.webp`
- **Mobile Preview (`375×812`):** `web/public/previews/melli-mobile.webp`
- **Video Preview (`960×600`, 30fps):** `web/public/previews/melli.mp4`
  - **Size:** `740,950` bytes
  - **Duration:** `14.966667s`
  - **Revision:** `3fe482b3c1c4`
  - **SHA-256:** `3fe482b3c1c49dd9af287aba800c471d16e57db5289903e25a5c18cf0ef398c2`
  - **Demo HTML SHA-256:** `b6df9f1758afcb0d8faa616857c3ac77c2f41485e2eee3c201092d391ec125ae`
  - **Demo Directory SHA-256:** `cc6a6a5f91266ffa45bb266331c5d7d8f07794e75dd105a803a577ff069fc5cd`
