# QA Report — Camper — Overnight Camp (`camper` / `t75`, v1.0.0)

- **Date:** 2026-10-19
- **Product Slug:** `camper`
- **Catalog ID:** `t75`
- **Category:** `commerce`
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Archive Path:** `web/product/giao-dien-web/camper/camper.zip`
- **Size:** `11,287` bytes (`11.0 KB`, under the `20,480` byte W06 limit) — Exception `--ngoai-le` approved for single-file inline HTML/CSS/JS architecture (`INLINE_PRODUCTS`).
- **SHA-256:** `274ce8699295bba33d8826c7bba57a7e30630591c52a2446a84704bcf8b00afe`
- **File Count:** `4` files (byte-identical with `source/`):
  - `camper/CUSTOMISE.md`
  - `camper/index.html`
  - `camper/LICENCE.txt`
  - `camper/README.md`

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 4 viewports (`1440×900` = `exact`, `820×1180` = `tablet`, `375×812` = `compact`, `320×740` = `compact`):

| Browser | Version | Viewports (`1440`, `820`, `375`, `320`) | Layout Modes (`exact`/`tablet`/`compact`) | Horizontal Overflow | Console / Page Errors | Nav Active Underline & Tablet Drawer | `prefers-reduced-motion` |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (4/4) | `exact` / `tablet` / `compact` | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`#menu-btn` + `Escape`) | PASS (`0.01ms`) |
| **Firefox** | `155.0` | PASS (4/4) | `exact` / `tablet` / `compact` | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`#menu-btn` + `Escape`) | PASS (`0.01ms`) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (4/4) | `exact` / `tablet` / `compact` | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`#menu-btn` + `Escape`) | PASS (`0.01ms`) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (4/4) | `exact` / `tablet` / `compact` | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`#menu-btn` + `Escape`) | PASS (`0.01ms`) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Desktop Preview:** `web/public/previews/camper.webp` (`698×524`)
- **Tablet Preview:** `web/public/previews/camper-tablet.webp` (`698×1004`)
- **Mobile Preview:** `web/public/previews/camper-mobile.webp` (`698×1511`)
- **Store Video Preview:** `web/public/previews/camper.mp4`
  - **Bytes:** `1,246,487` bytes
  - **Duration:** `14.966667s` (`960×600`, `30fps`, muted)
  - **Revision:** `79ad5224041c`
  - **SHA-256:** `79ad5224041c4564ac1f3a9cab69ccc0021efa51eb1623c26170086938780e9b`
  - **Evidence JSON:** `web/product/giao-dien-web/reviews/video-previews/camper.json`
