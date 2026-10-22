# QA Report — Targo (`targo` / `t92`, v1.0.0)

- **Date:** 2026-10-22
- **Product Slug:** `targo`
- **Catalog ID:** `t92`
- **Category:** `commerce` (Testing Infrastructure & Automated QA Platform)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs targo --ngoai-le`
- **Archive Path:** `web/product/giao-dien-web/targo/targo.zip`
- **Byte Size:** `3,234,983` bytes — Exception `--ngoai-le` approved for Single-File Self-Contained HTML (`INLINE_PRODUCTS`) plus universal H.264 (`avc1`, `yuv420p`) transcodes (`assets/hero-h264.mp4` and `assets/about-h264.mp4`) backing the 10-bit HEVC CloudFront streams for Q07 cross-browser compatibility.
- **SHA-256:** `6d4b2952b823200f82106a226ccf898cf3f63d46e02d939a8faa52fd3078a41b`
- **File Count:** `6` files (byte-identical with `source/`):
  - `targo/assets/about-h264.mp4`
  - `targo/assets/hero-h264.mp4`
  - `targo/CUSTOMISE.md`
  - `targo/index.html`
  - `targo/LICENCE.txt`
  - `targo/README.md`
- **Synced Public Demo:** `web/public/demos/targo/` (byte-identical with `source/`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 7 viewports (`1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360` landscape, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | 2 Sections Only (`#home` + `#about`), Flush-Right Video & `mix-blend-mode: hue` | Mobile `<= 700px` Menu & CTA Scroll Navigation |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (7/7) | `false` | `0` / `0` | PASS (2 sections, 0 footers, `object-fit: contain`, `mix-blend-mode: hue`, right-edge gap `0px`) | PASS (`#mobileNavMenu` open/close, `#heroGetStartedBtn` hover & scroll to `#about`) |
| **Firefox** | `155.0` | PASS (7/7) | `false` | `0` / `0` | PASS (2 sections, 0 footers, `object-fit: contain`, `mix-blend-mode: hue`, right-edge gap `0px`) | PASS (`#mobileNavMenu` open/close, `#heroGetStartedBtn` hover & scroll to `#about`) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (7/7) | `false` | `0` / `0` | PASS (2 sections, 0 footers, `object-fit: contain`, `mix-blend-mode: hue`, right-edge gap `0px`) | PASS (`#mobileNavMenu` open/close, `#heroGetStartedBtn` hover & scroll to `#about`) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (7/7) | `false` | `0` / `0` | PASS (2 sections, 0 footers, `object-fit: contain`, `mix-blend-mode: hue`, right-edge gap `0px`) | PASS (`#mobileNavMenu` open/close, `#heroGetStartedBtn` hover & scroll to `#about`) |

## 3. Store Previews & Video Recording (`quay-preview.mjs`)

- **Static Previews:**
  - `web/public/previews/targo.webp` (`1280×800`)
  - `web/public/previews/targo-tablet.webp` (`820×1180`)
  - `web/public/previews/targo-mobile.webp` (`375×812`)
- **Video Preview:**
  - `web/public/previews/targo.mp4` (`659,800` bytes, `14.966667s`, `960×600` @ `30fps`)
  - **Revision:** `808a68228836`
  - **Video SHA-256:** `808a68228836c0b5cc0985014295abd45c5e7ab357c4c95c127fecca9a469ed9`
  - **Demo HTML SHA-256:** `199b988dd447ed4add01df9f83f8c0e0576ed65da561d47ed6ba846504464e36`
  - **Demo Bundle SHA-256:** `c5a7cfc3f471ac1b7240077bba90b71357abb30a0588bec9d0cc40f16fe9615a`
  - **Recorded Actions:** `hover hero` (`1.0s`), `targo-hover-hero-cta-and-contact` (`2.893s`), `targo-scroll-about-and-hover-learn-more` (`5.293s`), `scroll` (`6.7s`), `errors = 0`, `missing = 0`.
