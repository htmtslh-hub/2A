# QA Report — SynapseX (`synapsex` / `t81`, v1.0.0)

- **Date:** 2026-10-20
- **Product Slug:** `synapsex`
- **Catalog ID:** `t81`
- **Category:** `commerce` (Thương mại điện tử)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Archive Path:** `web/product/giao-dien-web/synapsex/synapsex.zip`
- **Size:** `117,157` bytes (`114.4 KB`) — Exception `--ngoai-le` approved for React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Framer Motion + Google Fonts (`Space Mono` & `Anton SC`) + Bootstrap Icons source + prebuilt `built/` bundle.
- **SHA-256:** `ea9780a2c91eb85061b19208800c75f8e4fa8cfd82bcda2098053e1f2080b46d`
- **File Count:** `14` files (byte-identical with `source/`):
  - `synapsex/built/assets/index-B_6t3glp.js`
  - `synapsex/built/assets/index-DgV_16uO.css`
  - `synapsex/built/index.html`
  - `synapsex/CUSTOMISE.md`
  - `synapsex/index.html`
  - `synapsex/LICENCE.txt`
  - `synapsex/package.json`
  - `synapsex/README.md`
  - `synapsex/src/App.tsx`
  - `synapsex/src/index.css`
  - `synapsex/src/main.tsx`
  - `synapsex/THIRD-PARTY-LICENSES.txt`
  - `synapsex/tsconfig.json`
  - `synapsex/vite.config.ts`

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 4 viewports (`1440×900`, `820×1180`, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `820`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | 5 Videos + `TRANSCENDENCE` Watermark + `ScrambleIn` | Mouse-Scrub Hero Seeking & Expanding Menu Pill (`290px`) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (5 videos, `Anton SC` watermark, `Brain / And Body`, `One / Network`) | PASS (Hero video scrubbed forward, menu pill expanded to `290px`) |
| **Firefox** | `155.0` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (5 videos, `Anton SC` watermark, `Brain / And Body`, `One / Network`) | PASS (Hero video scrubbed forward, menu pill expanded to `290px`) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (5 videos, `Anton SC` watermark, `Brain / And Body`, `One / Network`) | PASS (Hero video scrubbed forward, menu pill expanded to `290px`) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (5 videos, `Anton SC` watermark, `Brain / And Body`, `One / Network`) | PASS (Hero video scrubbed forward, menu pill expanded to `290px`) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Desktop Preview:** `web/public/previews/synapsex.webp` (`698×524`)
- **Tablet Preview:** `web/public/previews/synapsex-tablet.webp` (`698×1004`)
- **Mobile Preview:** `web/public/previews/synapsex-mobile.webp` (`698×1511`)
- **Store Video Preview:** `web/public/previews/synapsex.mp4`
  - **Bytes:** `809,041` bytes
  - **Duration:** `14.966667s` (`960×600`, `30fps`, muted)
  - **Revision:** `2ee0aaac2d5e`
  - **SHA-256:** `2ee0aaac2d5e61756bce932ddcda63d944ef5378523fce423fadba844c761160`
  - **Evidence JSON:** `web/product/giao-dien-web/reviews/video-previews/synapsex.json`
