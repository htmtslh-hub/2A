# QA Report — OceanPulse (`oceanpulse` / `t82`, v1.0.0)

- **Date:** 2026-10-20
- **Product Slug:** `oceanpulse`
- **Catalog ID:** `t82`
- **Category:** `education` (Giáo dục - đào tạo / Bảo tồn đại dương)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Archive Path:** `web/product/giao-dien-web/oceanpulse/oceanpulse.zip`
- **Size:** `13,625` bytes (`13.3 KB`, under the `20,480`-byte `ZIP_LIMIT`) — Exception `--ngoai-le` approved for Single-File Self-Contained HTML architecture (`INLINE_PRODUCTS`).
- **SHA-256:** `727418e95b1cacd65e1076d28c2b6bda887da7ace6032505afdd3a339624136e`
- **File Count:** `4` files (byte-identical with `source/`):
  - `oceanpulse/CUSTOMISE.md`
  - `oceanpulse/index.html`
  - `oceanpulse/LICENCE.txt`
  - `oceanpulse/README.md`

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 7 viewports (`1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360` landscape, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal / Vertical Overflow | Console / Page Errors | DOM Order (`.hero__media` before `.hero__left`, `z-index: auto`) | Slide-in Nav Sheet & `syncBurgerContrast()` |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (7/7) | `false` / `false` (`scrollHeight === innerHeight`) | `0` / `0` | PASS (`.hero__media` child 0, `.hero__left` child 1, `zIndex: auto`) | PASS (`burger--on-panel: false` at `1440px`, `true` at `375px`; `Escape` & link close) |
| **Firefox** | `155.0` | PASS (7/7) | `false` / `false` (`scrollHeight === innerHeight`) | `0` / `0` | PASS (`.hero__media` child 0, `.hero__left` child 1, `zIndex: auto`) | PASS (`burger--on-panel: false` at `1440px`, `true` at `375px`; `Escape` & link close) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (7/7) | `false` / `false` (`scrollHeight === innerHeight`) | `0` / `0` | PASS (`.hero__media` child 0, `.hero__left` child 1, `zIndex: auto`) | PASS (`burger--on-panel: false` at `1440px`, `true` at `375px`; `Escape` & link close) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (7/7) | `false` / `false` (`scrollHeight === innerHeight`) | `0` / `0` | PASS (`.hero__media` child 0, `.hero__left` child 1, `zIndex: auto`) | PASS (`burger--on-panel: false` at `1440px`, `true` at `375px`; `Escape` & link close) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Static WebP Previews:**
  - `web/public/previews/oceanpulse.webp` (`1280×800`)
  - `web/public/previews/oceanpulse-tablet.webp` (`820×1180`)
  - `web/public/previews/oceanpulse-mobile.webp` (`375×812`)
- **Recorded Video Preview:**
  - **File:** `web/public/previews/oceanpulse.mp4`
  - **Size:** `511,895` bytes (`14.97s`, `960×600`, `30 fps`, H.264 `yuv420p`, audio `false`)
  - **Revision:** `06d7ea9a7169`
  - **SHA-256:** `06d7ea9a716950e339ad1d4ada86ca57be79e00bd8dd752551cb29636698db1d`
  - **Demo HTML SHA-256:** `42a5988cbe8794291d8bfd2bcf7024323d2e8b4554b4785f2031f5154f63f6c8`
  - **Demo Tree SHA-256:** `c6cbb55de160548816ebb5d859ae3a1ec7d894fe78be1653931774b751ccd918`
  - **Contact Sheet:** `web/product/giao-dien-web/reviews/video-previews/screenshots/oceanpulse-contact.jpg`
