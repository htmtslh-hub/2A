# QA Report — RIVR (`rivr` / `t99`, v1.0.0)

- **Date:** 2026-10-24
- **Product Slug:** `rivr`
- **Catalog ID:** `t99`
- **Category:** `commerce` (DeFi Fluid Staking & Smart Vaults Dashboard Hero)
- **Access Tier:** `premium`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs rivr --ngoai-le`
- **Archive Path:** `web/product/giao-dien-web/rivr/rivr.zip`
- **Byte Size:** `11,269` bytes (`< 20,480` bytes) — Exception `--ngoai-le` approved for Single-File Self-Contained HTML (`INLINE_PRODUCTS`).
- **SHA-256:** `59035175b87e33523d54389b24b01b99ccdda41196263b436cd114c6d2554463`
- **File Count:** `4` files (byte-identical with `source/`):
  - `rivr/CUSTOMISE.md`
  - `rivr/index.html`
  - `rivr/LICENCE.txt`
  - `rivr/README.md`
- **Synced Public Demo:** `web/public/demos/rivr/index.html` (byte-identical with `source/index.html`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 7 viewports (`1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360`, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | `2` Concave `56×56` SVG Cutout Masks + `3` Smart Vault Strategy Pills + `#rivrModal` |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (7/7) | `false` | `0` / `0` | PASS (`cutoutMasks = 2`, `vaultPills = 3`, APY switch & modal verified) |
| **Firefox** | `155.0` | PASS (7/7) | `false` | `0` / `0` | PASS (`cutoutMasks = 2`, `vaultPills = 3`, APY switch & modal verified) |
| **Microsoft Edge** | `155.0` | PASS (7/7) | `false` | `0` / `0` | PASS (`cutoutMasks = 2`, `vaultPills = 3`, APY switch & modal verified) |
| **Cốc Cốc** | `152.0` | PASS (7/7) | `false` | `0` / `0` | PASS (`cutoutMasks = 2`, `vaultPills = 3`, APY switch & modal verified) |

## 3. Store Previews & Video Recording (`quay-preview.mjs`)

- **Static Previews:**
  - `web/public/previews/rivr.webp` (`1280×800`)
  - `web/public/previews/rivr-tablet.webp` (`820×1180`)
  - `web/public/previews/rivr-mobile.webp` (`375×812`)
- **Video Preview:**
  - `web/public/previews/rivr.mp4` (`783,549` bytes, `14.966667s`, `960×600` @ `30fps`)
  - **Revision:** `669f653a9d93`
  - **Video SHA-256:** `669f653a9d935382a0e2754126876423b73efb44555a3120e9732f38e6816538`
  - **Demo HTML SHA-256:** `3a0dfdf56fd3d7c272015fa849d71776ed9a673990fab79d3efdd14e12896f4e`
  - **Demo Bundle SHA-256:** `6e9f1ac737589b7931d632e99c0148648a8a7ad566a3a6d35b69c5f5319f7e0d`
