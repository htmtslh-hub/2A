# QA Report — Aetheris Voyage (`aetheris-voyage` / `t97`, v1.0.0)

- **Date:** 2026-10-24
- **Product Slug:** `aetheris-voyage`
- **Catalog ID:** `t97`
- **Category:** `portfolio` (Deep-Space Expedition & AI Production Studio Landing Page)
- **Access Tier:** `premium`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs aetheris-voyage --ngoai-le`
- **Archive Path:** `web/product/giao-dien-web/aetheris-voyage/aetheris-voyage.zip`
- **Byte Size:** `15,563` bytes (`< 20,480` bytes) — Exception `--ngoai-le` approved for Single-File Self-Contained HTML (`INLINE_PRODUCTS`).
- **SHA-256:** `8cccdc676418b4493d4e699425ce2c3acea0112d00f35ef6611953113d84c8f1`
- **File Count:** `4` files (byte-identical with `source/`):
  - `aetheris-voyage/CUSTOMISE.md`
  - `aetheris-voyage/index.html`
  - `aetheris-voyage/LICENCE.txt`
  - `aetheris-voyage/README.md`
- **Synced Public Demo:** `web/public/demos/aetheris-voyage/index.html` (byte-identical with `source/index.html`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 7 viewports (`1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360`, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | `BlurText` (`7` words) + `3` `.cap-card` Glass Cards + `3` Orbital Sector Tabs + `#claimModal` |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (7/7) | `false` | `0` / `0` | PASS (`blurWords = 7`, `capCards = 3`, `worldTabs = 3`, modal & sector switch verified) |
| **Firefox** | `155.0` | PASS (7/7) | `false` | `0` / `0` | PASS (`blurWords = 7`, `capCards = 3`, `worldTabs = 3`, modal & sector switch verified) |
| **Microsoft Edge** | `155.0` | PASS (7/7) | `false` | `0` / `0` | PASS (`blurWords = 7`, `capCards = 3`, `worldTabs = 3`, modal & sector switch verified) |
| **Cốc Cốc** | `152.0` | PASS (7/7) | `false` | `0` / `0` | PASS (`blurWords = 7`, `capCards = 3`, `worldTabs = 3`, modal & sector switch verified) |

## 3. Store Previews & Video Recording (`quay-preview.mjs`)

- **Static Previews:**
  - `web/public/previews/aetheris-voyage.webp` (`1280×800`)
  - `web/public/previews/aetheris-voyage-tablet.webp` (`820×1180`)
  - `web/public/previews/aetheris-voyage-mobile.webp` (`375×812`)
- **Video Preview:**
  - `web/public/previews/aetheris-voyage.mp4` (`1,124,271` bytes, `14.966667s`, `960×600` @ `30fps`)
  - **Revision:** `c775bc14e2c4`
  - **Video SHA-256:** `c775bc14e2c4e71d3b2ea00343c55bd39d93e32d61e532f703db78a6165ac462`
  - **Demo HTML SHA-256:** `7e11becaf7159a8cf1d9c0acf5dbccc48aa80d6c7d3690ca554d0c4cb792ae83`
  - **Demo Bundle SHA-256:** `25fec6a5874843468b0dc0e4754b542d6a80a35c2af027e7fd6689d438db3581`
