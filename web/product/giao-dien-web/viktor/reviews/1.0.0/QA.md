# QA Report — Viktor. (`viktor` / `t74`, v1.0.0)

- **Date:** 2026-10-19
- **Product Slug:** `viktor`
- **Catalog ID:** `t74`
- **Category:** `portfolio` (Blog/portfolio)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Archive Path:** `web/product/giao-dien-web/viktor/viktor.zip`
- **Size:** `68,712` bytes (`67.1 KB`) — Exception `--ngoai-le` approved for React + TypeScript + Vite 6 + Tailwind CSS v4 source + prebuilt `built/` bundle.
- **SHA-256:** `ff22b28b364161c7d16b418bc43882060856da2d01de709a0f0399900e73295f`
- **File Count:** `16` files (byte-identical with `source/`):
  - `viktor/built/assets/index-CuhGu7Aq.css`
  - `viktor/built/assets/index-DyU_X9t3.js`
  - `viktor/built/index.html`
  - `viktor/CUSTOMISE.md`
  - `viktor/index.html`
  - `viktor/LICENCE.txt`
  - `viktor/package.json`
  - `viktor/README.md`
  - `viktor/src/App.tsx`
  - `viktor/src/components/Hero.tsx`
  - `viktor/src/components/Navbar.tsx`
  - `viktor/src/index.css`
  - `viktor/src/main.tsx`
  - `viktor/THIRD-PARTY-LICENSES.txt`
  - `viktor/tsconfig.json`
  - `viktor/vite.config.ts`

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 4 viewports (`1440×900`, `820×1180`, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `820`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | 3-Video Switcher & Accent Sync | Mobile Grid Menu (`0fr`/`1fr`) | `prefers-reduced-motion` |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`01`, `02`, `03` + `#F598F2` / `#FFF`) | PASS (`Menu` ↔ `Close` + `Escape`) | PASS (`animationName: none`) |
| **Firefox** | `155.0` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`01`, `02`, `03` + `#F598F2` / `#FFF`) | PASS (`Menu` ↔ `Close` + `Escape`) | PASS (`animationName: none`) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`01`, `02`, `03` + `#F598F2` / `#FFF`) | PASS (`Menu` ↔ `Close` + `Escape`) | PASS (`animationName: none`) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`01`, `02`, `03` + `#F598F2` / `#FFF`) | PASS (`Menu` ↔ `Close` + `Escape`) | PASS (`animationName: none`) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Desktop Preview:** `web/public/previews/viktor.webp` (`698×524`)
- **Tablet Preview:** `web/public/previews/viktor-tablet.webp` (`698×1004`)
- **Mobile Preview:** `web/public/previews/viktor-mobile.webp` (`698×1511`)
- **Store Video Preview:** `web/public/previews/viktor.mp4`
  - **Bytes:** `2,291,827` bytes
  - **Duration:** `14.966667s` (`960×600`, `30fps`, muted)
  - **Revision:** `5f94c664d378`
  - **SHA-256:** `5f94c664d37803ccef62cd80061fbab67184d23838e596b816fd8e84e649b6e9`
  - **Evidence JSON:** `web/product/giao-dien-web/reviews/video-previews/viktor.json`
