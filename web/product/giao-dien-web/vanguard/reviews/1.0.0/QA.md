# QA Report — VANGUARD (`vanguard` / `t91`, v1.0.0)

- **Date:** 2026-10-22
- **Product Slug:** `vanguard`
- **Catalog ID:** `t91`
- **Category:** `portfolio` (Creative Agency & Brand Studio)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs vanguard --ngoai-le`
- **Archive Path:** `web/product/giao-dien-web/vanguard/vanguard.zip`
- **Byte Size:** `69,719` bytes — Exception `--ngoai-le` approved for React 18 + TypeScript + Tailwind CSS (`tailwind.config.js`) + Vite 6 + `lucide-react` source + prebuilt `built/` static bundle.
- **SHA-256:** `43d03d0535df98303ac868a0ea62fc89029abcc1608ac4c1ad3c1cc51c7c9908`
- **File Count:** `16` files (byte-identical with `source/`):
  - `vanguard/built/assets/index-BnuDEgAr.css`
  - `vanguard/built/assets/index-OSX26gHv.js`
  - `vanguard/built/index.html`
  - `vanguard/CUSTOMISE.md`
  - `vanguard/index.html`
  - `vanguard/LICENCE.txt`
  - `vanguard/package.json`
  - `vanguard/postcss.config.js`
  - `vanguard/README.md`
  - `vanguard/src/App.tsx`
  - `vanguard/src/index.css`
  - `vanguard/src/main.tsx`
  - `vanguard/tailwind.config.js`
  - `vanguard/THIRD-PARTY-LICENSES.txt`
  - `vanguard/tsconfig.json`
  - `vanguard/vite.config.ts`
- **Synced Public Demo:** `web/public/demos/vanguard/` (byte-identical with `source/built/`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 7 viewports (`1440×900`, `1024×768`, `820×1180`, `768×1024`, `740×360` landscape, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | Fullscreen Video (`object-cover`), `font-podium` & `animate-fade-up` (`0s–0.8s`) | Mobile Menu Overlay (`<md`) & Dossier Modal (`#vanguard-dossier-modal`) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (7/7) | `false` | `0` / `0` | PASS (`readyState >= 2`, `h1` opacity `1`, 3 stats, `md` responsive nav) | PASS (`#mobile-menu-overlay` open/close, `#vanguard-dossier-modal` + brief submit & `Escape`) |
| **Firefox** | `155.0` | PASS (7/7) | `false` | `0` / `0` | PASS (`readyState >= 2`, `h1` opacity `1`, 3 stats, `md` responsive nav) | PASS (`#mobile-menu-overlay` open/close, `#vanguard-dossier-modal` + brief submit & `Escape`) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (7/7) | `false` | `0` / `0` | PASS (`readyState >= 2`, `h1` opacity `1`, 3 stats, `md` responsive nav) | PASS (`#mobile-menu-overlay` open/close, `#vanguard-dossier-modal` + brief submit & `Escape`) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (7/7) | `false` | `0` / `0` | PASS (`readyState >= 2`, `h1` opacity `1`, 3 stats, `md` responsive nav) | PASS (`#mobile-menu-overlay` open/close, `#vanguard-dossier-modal` + brief submit & `Escape`) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Static WebP Previews:**
  - `web/public/previews/vanguard.webp` (`1280×800`)
  - `web/public/previews/vanguard-tablet.webp` (`820×1180`)
  - `web/public/previews/vanguard-mobile.webp` (`375×812`)
- **Recorded Video Preview:**
  - **File:** `web/public/previews/vanguard.mp4`
  - **Size:** `812,822` bytes (`14.966667s`, `960×600`, `30 fps`, H.264 `yuv420p`, audio `false`)
  - **Revision:** `c0bea34507e2`
  - **SHA-256:** `c0bea34507e2835525b19bb9790e1e77bc19888fe9c4705def1fb2541a03eb1a`
  - **Demo HTML SHA-256:** `6a8fb5639fe8b015d63fd8feacb7de2a4461b36aa63228faa8de1e6794b13065`
  - **Demo Tree SHA-256:** `aaeb017edef64813a9b154a69ba5968f99cc75ec22b77a48ce2343e30b52b9b4`
  - **Contact Sheet:** `web/product/giao-dien-web/reviews/video-previews/screenshots/vanguard-contact.jpg`
