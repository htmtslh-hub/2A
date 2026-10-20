# QA Report — NeuralKinetics (`neuralkinetics` / `t77`, v1.0.0)

- **Date:** 2026-10-20
- **Product Slug:** `neuralkinetics`
- **Catalog ID:** `t77`
- **Category:** `commerce` (Thương mại điện tử)
- **Access Tier:** `free`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Archive Path:** `web/product/giao-dien-web/neuralkinetics/neuralkinetics.zip`
- **Size:** `139,099` bytes (`135.8 KB`) — Exception `--ngoai-le` approved for React 19 + TypeScript + Vite 6 + Framer Motion (`motion/react`) + `lucide-react` + Plain CSS source + prebuilt `built/` bundle.
- **SHA-256:** `ce25da02be57fd4f05d9d589b4077ae2735cd40232ffd6fb1625fd59bff90605`
- **File Count:** `14` files (byte-identical with `source/`):
  - `neuralkinetics/built/assets/index-CBlIekSo.css`
  - `neuralkinetics/built/assets/index-DsdCmfUC.js`
  - `neuralkinetics/built/index.html`
  - `neuralkinetics/CUSTOMISE.md`
  - `neuralkinetics/index.html`
  - `neuralkinetics/LICENCE.txt`
  - `neuralkinetics/package.json`
  - `neuralkinetics/README.md`
  - `neuralkinetics/src/App.tsx`
  - `neuralkinetics/src/index.css`
  - `neuralkinetics/src/main.tsx`
  - `neuralkinetics/THIRD-PARTY-LICENSES.txt`
  - `neuralkinetics/tsconfig.json`
  - `neuralkinetics/vite.config.ts`

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 4 viewports (`1440×900`, `820×1180`, `375×812`, `320×740`):

| Browser | Version | Viewports (`1440`, `820`, `375`, `320`) | Horizontal Overflow | Console / Page Errors | Video Framing (`100%` Desktop / `80%` Mobile) | Interactive Drawers, Telemetry & Modals |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`100%` @ `>=768px`, `80%` @ `<768px`) | PASS (`Menu`, `Adaptive Systems`, `AGI-02`/`CYB-03`, `See Features`, `How It Works`) |
| **Firefox** | `155.0` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`100%` @ `>=768px`, `80%` @ `<768px`) | PASS (`Menu`, `Adaptive Systems`, `AGI-02`/`CYB-03`, `See Features`, `How It Works`) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`100%` @ `>=768px`, `80%` @ `<768px`) | PASS (`Menu`, `Adaptive Systems`, `AGI-02`/`CYB-03`, `See Features`, `How It Works`) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (4/4) | `false` (`scrollWidth === clientWidth`) | `0` / `0` | PASS (`100%` @ `>=768px`, `80%` @ `<768px`) | PASS (`Menu`, `Adaptive Systems`, `AGI-02`/`CYB-03`, `See Features`, `How It Works`) |

## 3. Store Previews & 15s Video Recording (`quay-preview.mjs`)

- **Desktop Preview:** `web/public/previews/neuralkinetics.webp` (`698×524`)
- **Tablet Preview:** `web/public/previews/neuralkinetics-tablet.webp` (`698×1004`)
- **Mobile Preview:** `web/public/previews/neuralkinetics-mobile.webp` (`698×1511`)
- **Store Video Preview:** `web/public/previews/neuralkinetics.mp4`
  - **Bytes:** `404,065` bytes
  - **Duration:** `14.966667s` (`960×600`, `30fps`, muted)
  - **Revision:** `f09c627ea916`
  - **SHA-256:** `f09c627ea916c407cb8fdcaaf2269b05aef1fbb40e2281ade8d4b60bd5072938`
  - **Evidence JSON:** `web/product/giao-dien-web/reviews/video-previews/neuralkinetics.json`
