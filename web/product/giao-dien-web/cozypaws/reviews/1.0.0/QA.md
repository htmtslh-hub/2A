# QA Report — CozyPaws (`cozypaws` / `t80`, v1.0.0)

- **Date:** 2026-10-20
- **Product Slug:** `cozypaws`
- **Catalog ID:** `t80`
- **Category:** `commerce` (Thương mại điện tử)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Archive Path:** `web/product/giao-dien-web/cozypaws/cozypaws.zip`
- **Size:** `69,822` bytes (`68.2 KB`) — Exception `--ngoai-le` approved for React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + `lucide-react` + Google Fonts (`DM Serif Display` & `Inter`) source + prebuilt `built/` bundle.
- **SHA-256:** `f475c6c4f082e505ed435b08cae1749e564a429f2c1c52e4b3c6c49a2ee6bb46`
- **File Count:** `14` files (byte-identical with `source/`):
  - `cozypaws/built/assets/index-BD2UO-2j.js`
  - `cozypaws/built/assets/index-BDzrrbGe.css`
  - `cozypaws/built/index.html`
  - `cozypaws/CUSTOMISE.md`
  - `cozypaws/index.html`
  - `cozypaws/LICENCE.txt`
  - `cozypaws/package.json`
  - `cozypaws/README.md`
  - `cozypaws/src/App.tsx`
  - `cozypaws/src/index.css`
  - `cozypaws/src/main.tsx`
  - `cozypaws/THIRD-PARTY-LICENSES.txt`
  - `cozypaws/tsconfig.json`
  - `cozypaws/vite.config.ts`

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 4 viewports (`1440×900`, `820×1180`, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `820`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | 3-Tier Responsive Layouts (`lg+`, `md`, `<md`) | Interactive Modals, Cart (`1→2`) & Favorites (`4→5`) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (Desktop @ `1440`, Tablet @ `820`, Mobile @ `375`/`320`) | PASS (Favorites `5`, Cart `2`, Product & Video modals + `Escape`) |
| **Firefox** | `155.0` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (Desktop @ `1440`, Tablet @ `820`, Mobile @ `375`/`320`) | PASS (Favorites `5`, Cart `2`, Product & Video modals + `Escape`) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (Desktop @ `1440`, Tablet @ `820`, Mobile @ `375`/`320`) | PASS (Favorites `5`, Cart `2`, Product & Video modals + `Escape`) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (Desktop @ `1440`, Tablet @ `820`, Mobile @ `375`/`320`) | PASS (Favorites `5`, Cart `2`, Product & Video modals + `Escape`) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Desktop Preview:** `web/public/previews/cozypaws.webp` (`698×524`)
- **Tablet Preview:** `web/public/previews/cozypaws-tablet.webp` (`698×1004`)
- **Mobile Preview:** `web/public/previews/cozypaws-mobile.webp` (`698×1511`)
- **Store Video Preview:** `web/public/previews/cozypaws.mp4`
  - **Bytes:** `247,663` bytes
  - **Duration:** `14.966667s` (`960×600`, `30fps`, muted)
  - **Revision:** `ca797f3efdde`
  - **SHA-256:** `ca797f3efddeeda05f5f7eaf0d165290f6431fe584801b325675a30773eb9c5f`
  - **Evidence JSON:** `web/product/giao-dien-web/reviews/video-previews/cozypaws.json`
