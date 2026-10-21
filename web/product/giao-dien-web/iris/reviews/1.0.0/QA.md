# QA Report — Iris (`iris` · `t87` · `v1.0.0`)

- **Date:** 2026-10-21
- **Category:** `commerce`
- **Access Tier:** `free`
- **Format:** Single-file HTML5 / CSS3 / Three.js r169 (`index.html`) + `README.md` + `CUSTOMISE.md` + `LICENCE.txt`

## 1. Package & Checksum (`dong-goi.mjs iris --ngoai-le`)

- **Archive:** `web/product/giao-dien-web/iris/iris.zip`
- **Size:** `16,454` bytes (under the `20,480`-byte `W06` limit)
- **SHA-256:** `e5132fe4231479dcaa2e05bfb819a39561c53f3c8c78d0ba25e52098eeaf6e22`
- **Files verified byte-for-byte:**
  - `iris/CUSTOMISE.md`
  - `iris/index.html`
  - `iris/LICENCE.txt`
  - `iris/README.md`

## 2. 4-Browser × 7-Viewport Verification (`check.cjs`)

Executed `node web/product/giao-dien-web/iris/reviews/1.0.0/check.cjs` across 4 real browser engines and 7 viewports (`1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360`, `375×812`, `320×740`):

| Browser | Version | Console Errors | Page Errors | Horizontal Overflow | WebGL / GLB Ready (`#stage[data-ready="true"]`) | Responsive `<=860px` & Mobile Menu |
| --- | --- | --- | --- | --- | --- | --- |
| Chromium | `153.0.8010.12` | `0` | `0` | `false` (all 7 viewports) | `PASS` | `PASS` |
| Firefox | `155.0` | `0` | `0` | `false` (all 7 viewports) | `PASS` | `PASS` |
| Microsoft Edge | `155.0.4283.62` | `0` | `0` | `false` (all 7 viewports) | `PASS` | `PASS` |
| Cốc Cốc | `152.0.7977.124` | `0` | `0` | `false` (all 7 viewports) | `PASS` | `PASS` |

## 3. Store Assets & 15s Video Recording (`quay-preview.mjs iris`)

- **Desktop Preview (`1280×800`):** `web/public/previews/iris.webp`
- **Tablet Preview (`820×1180`):** `web/public/previews/iris-tablet.webp`
- **Mobile Preview (`375×812`):** `web/public/previews/iris-mobile.webp`
- **Video Preview (`960×600`, 30fps):** `web/public/previews/iris.mp4`
  - **Size:** `337,721` bytes
  - **Duration:** `14.966667s`
  - **Revision:** `046000b00bb3`
  - **SHA-256:** `046000b00bb3899b9dfd3e890460b99fd3e803e2c4d0b17cd33e1d87680f004e`
  - **Demo HTML SHA-256:** `0f0f9ac680b087286a96d94baf7018d7e4475580fb673b9afb56c6942545f1ed`
  - **Demo Directory SHA-256:** `b44c77b90cdaad8966a8194a752b07e5b80d31e8f055a7d05267fb2abb99c212`
