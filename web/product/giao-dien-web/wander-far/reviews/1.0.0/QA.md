# QA Report — Wander Far (`wander-far` · `t86` · `v1.0.0`)

- **Date:** 2026-10-21
- **Category:** `commerce`
- **Access Tier:** `free`
- **Format:** Single-file HTML5 / CSS3 / Vanilla JS (`index.html`) + `README.md` + `CUSTOMISE.md` + `LICENCE.txt`

## 1. Package & Checksum (`dong-goi.mjs wander-far --ngoai-le`)

- **Archive:** `web/product/giao-dien-web/wander-far/wander-far.zip`
- **Size:** `12,665` bytes (under the `20,480`-byte `W06` limit)
- **SHA-256:** `424f320f03261e9e0e532c0782483c3727fd3546b029a451d9b10272f547c932`
- **Files verified byte-for-byte:**
  - `wander-far/CUSTOMISE.md`
  - `wander-far/index.html`
  - `wander-far/LICENCE.txt`
  - `wander-far/README.md`

## 2. 4-Browser × 7-Viewport Verification (`check.cjs`)

Executed `node web/product/giao-dien-web/wander-far/reviews/1.0.0/check.cjs` across 4 real browser engines and 7 viewports (`1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360`, `375×812`, `320×740`):

| Browser | Version | Console Errors | Page Errors | Horizontal Overflow | Desktop 100dvh Lock | Responsive `<=820px` Crop (`74% 50%`) | Interactions |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Chromium | `153.0.8010.12` | `0` | `0` | `false` (all 7 viewports) | `PASS` | `PASS` | `PASS` |
| Firefox | `155.0` | `0` | `0` | `false` (all 7 viewports) | `PASS` | `PASS` | `PASS` |
| Microsoft Edge | `155.0.4283.62` | `0` | `0` | `false` (all 7 viewports) | `PASS` | `PASS` | `PASS` |
| Cốc Cốc | `152.0.7977.124` | `0` | `0` | `false` (all 7 viewports) | `PASS` | `PASS` | `PASS` |

## 3. Store Assets & 15s Video Recording (`quay-preview.mjs wander-far`)

- **Desktop Preview (`1280×800`):** `web/public/previews/wander-far.webp`
- **Tablet Preview (`820×1180`):** `web/public/previews/wander-far-tablet.webp`
- **Mobile Preview (`375×812`):** `web/public/previews/wander-far-mobile.webp`
- **Video Preview (`960×600`, 30fps):** `web/public/previews/wander-far.mp4`
  - **Size:** `793,347` bytes
  - **Duration:** `14.966667s`
  - **Revision:** `6c2618d9cd6d`
  - **SHA-256:** `6c2618d9cd6d0b192f7ab72017041fba55782a2425b1a18186679cf812fe990c`
  - **Demo HTML SHA-256:** `288306d4e166bfec61bc9d6969bda681f45b84070f96896a144106dab0d8b706`
  - **Demo Directory SHA-256:** `da94b323f95e2551f2bc18a904f58ecbf283709174342dbd67fe523b6a0bf745`
