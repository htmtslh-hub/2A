# QA Report — Lumora (`lumora` / `t78`, v1.0.0)

- **Date:** 2026-10-20
- **Product Slug:** `lumora`
- **Catalog ID:** `t78`
- **Category:** `saas` (SaaS & AI)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Archive Path:** `web/product/giao-dien-web/lumora/lumora.zip`
- **Size:** `68,481` bytes (`66.9 KB`) — Exception `--ngoai-le` approved for React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + `lucide-react` source + prebuilt `built/` bundle.
- **SHA-256:** `49551ed767638b2855f124b8080838b9ad6d36cadc9f8533c94f5b0591c7db2b`
- **File Count:** `14` files (byte-identical with `source/`):
  - `lumora/built/assets/index-Cpokc1ww.js`
  - `lumora/built/assets/index-DLiw8XRu.css`
  - `lumora/built/index.html`
  - `lumora/CUSTOMISE.md`
  - `lumora/index.html`
  - `lumora/LICENCE.txt`
  - `lumora/package.json`
  - `lumora/README.md`
  - `lumora/src/App.tsx`
  - `lumora/src/index.css`
  - `lumora/src/main.tsx`
  - `lumora/THIRD-PARTY-LICENSES.txt`
  - `lumora/tsconfig.json`
  - `lumora/vite.config.ts`

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 4 viewports (`1440×900`, `820×1180`, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `820`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | Video Layer + `train-bob` PNG Overlay | `Deep Woods` `#182C41` Dark Mode & Cooldown (`1000ms`) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (4 stacked looping videos + `train-bob` animation) | PASS (`rgb(24, 44, 65)` hero text, white navbar/stats, cooldown enforced) |
| **Firefox** | `155.0` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (4 stacked looping videos + `train-bob` animation) | PASS (`rgb(24, 44, 65)` hero text, white navbar/stats, cooldown enforced) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (4 stacked looping videos + `train-bob` animation) | PASS (`rgb(24, 44, 65)` hero text, white navbar/stats, cooldown enforced) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (4 stacked looping videos + `train-bob` animation) | PASS (`rgb(24, 44, 65)` hero text, white navbar/stats, cooldown enforced) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Desktop Preview:** `web/public/previews/lumora.webp` (`698×524`)
- **Tablet Preview:** `web/public/previews/lumora-tablet.webp` (`698×1004`)
- **Mobile Preview:** `web/public/previews/lumora-mobile.webp` (`698×1511`)
- **Store Video Preview:** `web/public/previews/lumora.mp4`
  - **Bytes:** `1,821,569` bytes
  - **Duration:** `14.966667s` (`960×600`, `30fps`, muted)
  - **Revision:** `1255e40b1112`
  - **SHA-256:** `1255e40b11123e117d46fbf1c2d048906b601c812b19ddd182c497dee8faef72`
  - **Evidence JSON:** `web/product/giao-dien-web/reviews/video-previews/lumora.json`
