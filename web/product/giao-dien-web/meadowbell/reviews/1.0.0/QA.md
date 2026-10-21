# QA Report — Meadowbell (`meadowbell` / `t83`, v1.0.0)

- **Date:** 2026-10-21
- **Product Slug:** `meadowbell`
- **Catalog ID:** `t83`
- **Category:** `entertainment` (Giải trí / Phim hoạt hình nông trại thiếu nhi)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Archive Path:** `web/product/giao-dien-web/meadowbell/meadowbell.zip`
- **Size:** `14,874` bytes (`14.5 KB`, under the `20,480`-byte `ZIP_LIMIT`) — Exception `--ngoai-le` approved for Single-File Self-Contained HTML architecture (`INLINE_PRODUCTS`).
- **SHA-256:** `ac2c5ccbc1effb42fb81bed7ad97a0fabc61363c22ef68d1fee0bae10524c65e`
- **File Count:** `4` files (byte-identical with `source/`):
  - `meadowbell/CUSTOMISE.md`
  - `meadowbell/index.html`
  - `meadowbell/LICENCE.txt`
  - `meadowbell/README.md`

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 8 viewports (`1440×1280` reference frame, `1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360` landscape, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440x1280`, `1440`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | 1440×1280 Frame Coordinates & Video Alignment (`112.5%` / `-6.25%`) | Interactive Chapter & Join Modals |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (8/8) | `false` | `0` / `0` | PASS (Exact match on all nav, copy, CTA & 3 card rects) | PASS (`#chapterModal` tab switch, `#joinModal` submit & `Escape` close) |
| **Firefox** | `155.0` | PASS (8/8) | `false` | `0` / `0` | PASS (Exact match on all nav, copy, CTA & 3 card rects) | PASS (`#chapterModal` tab switch, `#joinModal` submit & `Escape` close) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (8/8) | `false` | `0` / `0` | PASS (Exact match on all nav, copy, CTA & 3 card rects) | PASS (`#chapterModal` tab switch, `#joinModal` submit & `Escape` close) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (8/8) | `false` | `0` / `0` | PASS (Exact match on all nav, copy, CTA & 3 card rects) | PASS (`#chapterModal` tab switch, `#joinModal` submit & `Escape` close) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Static WebP Previews:**
  - `web/public/previews/meadowbell.webp` (`1280×800`)
  - `web/public/previews/meadowbell-tablet.webp` (`820×1180`)
  - `web/public/previews/meadowbell-mobile.webp` (`375×812`)
- **Recorded Video Preview:**
  - **File:** `web/public/previews/meadowbell.mp4`
  - **Size:** `1,564,284` bytes (`14.97s`, `960×600`, `30 fps`, H.264 `yuv420p`, audio `false`)
  - **Revision:** `04d6f2aa1089`
  - **SHA-256:** `04d6f2aa1089310b868bf5a560bc1827faf475bd5822dc2c872c394fba10f6b4`
  - **Demo HTML SHA-256:** `a03f100b93f7a00bbbe14862fcce704ba28ba110cffd6bceceefd77d7f7ffb83`
  - **Demo Tree SHA-256:** `ac501fb48d03f4ea04e864e994fa0e9549ae48b67c48db12950dc1b1c1a28f32`
  - **Contact Sheet:** `web/product/giao-dien-web/reviews/video-previews/screenshots/meadowbell-contact.jpg`
