# QA Report — Digital Epoch (`digital-epoch` / `t98`, v1.0.0)

- **Date:** 2026-10-24
- **Product Slug:** `digital-epoch`
- **Catalog ID:** `t98`
- **Category:** `commerce` (Decentralized Web Foundation & Enterprise Ecosystem Landing Page)
- **Access Tier:** `premium`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs digital-epoch --ngoai-le`
- **Archive Path:** `web/product/giao-dien-web/digital-epoch/digital-epoch.zip`
- **Byte Size:** `12,608` bytes (`< 20,480` bytes) — Exception `--ngoai-le` approved for Single-File Self-Contained HTML (`INLINE_PRODUCTS`).
- **SHA-256:** `c16cc740fc20a1e219ce511f49ad182fc085d4d71f2afcb99d3100747e71280f`
- **File Count:** `4` files (byte-identical with `source/`):
  - `digital-epoch/CUSTOMISE.md`
  - `digital-epoch/index.html`
  - `digital-epoch/LICENCE.txt`
  - `digital-epoch/README.md`
- **Synced Public Demo:** `web/public/demos/digital-epoch/index.html` (byte-identical with `source/index.html`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 7 viewports (`1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360`, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | `16` Dual-Set Marquee Cards + `3` Architecture Inspector Tabs + `#epochModal` |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (7/7) | `false` | `0` / `0` | PASS (`marqueeCards = 16`, `archTabs = 3`, SDK switch & modal verified) |
| **Firefox** | `155.0` | PASS (7/7) | `false` | `0` / `0` | PASS (`marqueeCards = 16`, `archTabs = 3`, SDK switch & modal verified) |
| **Microsoft Edge** | `155.0` | PASS (7/7) | `false` | `0` / `0` | PASS (`marqueeCards = 16`, `archTabs = 3`, SDK switch & modal verified) |
| **Cốc Cốc** | `152.0` | PASS (7/7) | `false` | `0` / `0` | PASS (`marqueeCards = 16`, `archTabs = 3`, SDK switch & modal verified) |

## 3. Store Previews & Video Recording (`quay-preview.mjs`)

- **Static Previews:**
  - `web/public/previews/digital-epoch.webp` (`1280×800`)
  - `web/public/previews/digital-epoch-tablet.webp` (`820×1180`)
  - `web/public/previews/digital-epoch-mobile.webp` (`375×812`)
- **Video Preview:**
  - `web/public/previews/digital-epoch.mp4` (`656,217` bytes, `14.966667s`, `960×600` @ `30fps`)
  - **Revision:** `f29c9a7f675c`
  - **Video SHA-256:** `f29c9a7f675c481bebdea73d0e09000f0a300e5125d7f4282fe485181f7d22f6`
  - **Demo HTML SHA-256:** `fd2f36ae38a0cd69d6886c4a0f369c9377f0eecf1e33554de7dd03f20373cd68`
  - **Demo Bundle SHA-256:** `1a48bd9d42ced4f1f405d7fd252e440c61f631a7fa32a6de38a912ac57fce0d9`
