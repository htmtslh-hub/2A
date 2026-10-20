# QA Report — securify (`securify` / `t79`, v1.0.0)

- **Date:** 2026-10-20
- **Product Slug:** `securify`
- **Catalog ID:** `t79`
- **Category:** `commerce` (Thương mại điện tử)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Archive Path:** `web/product/giao-dien-web/securify/securify.zip`
- **Size:** `65,176` bytes (`63.6 KB`) — Exception `--ngoai-le` approved for React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Google Font `Readex Pro` source + prebuilt `built/` bundle.
- **SHA-256:** `7c09e947138258f875974b06daaf8feabb941749c2f5732e87ea47343f4237d2`
- **File Count:** `14` files (byte-identical with `source/`):
  - `securify/built/assets/index-BFOVLUAA.css`
  - `securify/built/assets/index-BmQ0N5aI.js`
  - `securify/built/index.html`
  - `securify/CUSTOMISE.md`
  - `securify/index.html`
  - `securify/LICENCE.txt`
  - `securify/package.json`
  - `securify/README.md`
  - `securify/src/App.tsx`
  - `securify/src/index.css`
  - `securify/src/main.tsx`
  - `securify/THIRD-PARTY-LICENSES.txt`
  - `securify/tsconfig.json`
  - `securify/vite.config.ts`

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 4 viewports (`1440×900`, `820×1180`, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `820`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | Staggered Lowercase Words (`protect`, `your`, `data`) | Responsive Nav & Diagonal Dividers (`md+` Only) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`.hero-title` `14vw`/`13vw`, `-0.04em` tracking, `0.95` line-height) | PASS (Visible at `1440`/`820`, hidden at `375`/`320`) |
| **Firefox** | `155.0` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`.hero-title` `14vw`/`13vw`, `-0.04em` tracking, `0.95` line-height) | PASS (Visible at `1440`/`820`, hidden at `375`/`320`) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`.hero-title` `14vw`/`13vw`, `-0.04em` tracking, `0.95` line-height) | PASS (Visible at `1440`/`820`, hidden at `375`/`320`) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`.hero-title` `14vw`/`13vw`, `-0.04em` tracking, `0.95` line-height) | PASS (Visible at `1440`/`820`, hidden at `375`/`320`) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Desktop Preview:** `web/public/previews/securify.webp` (`698×524`)
- **Tablet Preview:** `web/public/previews/securify-tablet.webp` (`698×1004`)
- **Mobile Preview:** `web/public/previews/securify-mobile.webp` (`698×1511`)
- **Store Video Preview:** `web/public/previews/securify.mp4`
  - **Bytes:** `1,619,228` bytes
  - **Duration:** `14.966667s` (`960×600`, `30fps`, muted)
  - **Revision:** `0e99ff5ba39e`
  - **SHA-256:** `0e99ff5ba39e2fc9916a32cef2f46ae2ae4d6b659ca01683e936b7bf4008741a`
  - **Evidence JSON:** `web/product/giao-dien-web/reviews/video-previews/securify.json`
