# QA Report — Iris (`iris` · `t87` · `v1.0.0`)

- **Date:** 2026-10-21
- **Category:** `commerce`
- **Access Tier:** `free`
- **Format:** Single-file HTML5 / CSS3 / Three.js r169 (`index.html`) + `README.md` + `CUSTOMISE.md` + `LICENCE.txt`

## 1. Package & Checksum (`dong-goi.mjs iris --ngoai-le`)

- **Archive:** `web/product/giao-dien-web/iris/iris.zip`
- **Size:** `20,243` bytes (under the `20,480`-byte `W06` limit)
- **SHA-256:** `8944703d5cbe2f0746c2c6693f2718c5548791b12fe376ec77d48e3f86603685`
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
  - **Size:** `345,389` bytes
  - **Duration:** `14.966667s`
  - **Revision:** `d8dbcb522022`
  - **SHA-256:** `d8dbcb52202278f29e35367d416200bf4093ab2c53a14cb43eec43cd700beb87`
  - **Demo HTML SHA-256:** `0dc5ea247fa061da8adb46d915906f9b584f1f9d9d7c59fc2d9ab6cd996587d7`
  - **Demo Directory SHA-256:** `873bb8506626402cd52ff142818e80c3e78367e3cfe7cdd62db5fa3e2ceeeed7`
