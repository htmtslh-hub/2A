# QA Report — OceanPulse (`oceanpulse` / `t82`, v1.0.0)

- **Date:** 2026-10-20
- **Product Slug:** `oceanpulse`
- **Catalog ID:** `t82`
- **Category:** `education` (Giáo dục - đào tạo / Bảo tồn đại dương)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Archive Path:** `web/product/giao-dien-web/oceanpulse/oceanpulse.zip`
- **Size:** `13,612` bytes (`13.3 KB`, under the `20,480`-byte `ZIP_LIMIT`) — Exception `--ngoai-le` approved for Single-File Self-Contained HTML architecture (`INLINE_PRODUCTS`).
- **SHA-256:** `53a65b44164053038c2297a921bcf423c16e333303fa60e50249794e41650113`
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
  - **Size:** `518,084` bytes (`14.97s`, `960×600`, `30 fps`, H.264 `yuv420p`, audio `false`)
  - **Revision:** `5b62f431fec2`
  - **SHA-256:** `5b62f431fec2574bbd3876175d577464b36389f1424f85fd12e1b8439fa2613f`
  - **Demo HTML SHA-256:** `63e5d6888da877932a4cedd8ef93d8cd098e285d96ad3d4f17d8357197541a36`
  - **Demo Tree SHA-256:** `00d6316d1bfdbc45a17fc09feb5ed90e83c54405faf2b43040c46961c457a466`
  - **Contact Sheet:** `web/product/giao-dien-web/reviews/video-previews/screenshots/oceanpulse-contact.jpg`
