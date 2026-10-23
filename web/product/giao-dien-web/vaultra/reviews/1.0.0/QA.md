# QA Report — Vaultra (`vaultra` / `t94`, v1.0.0)

- **Date:** 2026-10-23
- **Product Slug:** `vaultra`
- **Catalog ID:** `t94`
- **Category:** `commerce` (Crypto Finance Platform & One-Screen Landing Hero)
- **Access Tier:** `premium`
- **Version:** `1.0.0`

## 1. Package & Checksum Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs vaultra --ngoai-le`
- **Archive Path:** `web/product/giao-dien-web/vaultra/vaultra.zip`
- **Byte Size:** `20,275` bytes (`< 20,480` bytes) — Exception `--ngoai-le` approved for Single-File Self-Contained HTML (`INLINE_PRODUCTS`).
- **SHA-256:** `ce1c863b6a567fae52cf83031903507160f7ec251a9cda8687f8a7c78ae96c69`
- **File Count:** `4` files (byte-identical with `source/`):
  - `vaultra/CUSTOMISE.md`
  - `vaultra/index.html`
  - `vaultra/LICENCE.txt`
  - `vaultra/README.md`
- **Synced Public Demo:** `web/public/demos/vaultra/index.html` (byte-identical with `source/index.html`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs` / `checks.json`)

Tested against local HTTP server across 4 browsers and 8 viewports (`1440×960` acceptance check, `1440×900`, `1024×768`, `820×1180` tablet portrait, `768×1024`, `740×360` landscape, `375×812` phone, `320×740` narrow phone):

| Browser | Version | Viewports (`1440x960`, `1440`, `1024`, `820`, `768`, `740x360`, `375`, `320`) | Horizontal / Vertical Overflow | Console / Page Errors | Globe Still (`1672×941`) + Seamless `4s` Video (`1280×720`) + Feather Masks | `Inter Display 300` Gradient Headline + `Poppins 400/500` UI + 4 Edge Coin Chips (`₿`, `Ξ`, `₮`, Hex) + Curved `USDT`/`ETH` Scroll Hint + Modal |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Chromium** | `153.0.8010.12` | PASS (8/8) | `false` / `false` | `0` / `0` | PASS (`videoReady = true`, `videoFadedIn = true`, identical geometry in `.globe-plate`, zero canvas/WebGL background drawing) | PASS (`Vaultra` brand, `Sign up` pill fixed, 4 coin chips on diagonal lines, `EN ⌄` currency selector, 3-mode `#vaultraModal` open/close) |
| **Firefox** | `155.0` | PASS (8/8) | `false` / `false` | `0` / `0` | PASS (`videoReady = true`, `videoFadedIn = true`, identical geometry in `.globe-plate`, zero canvas/WebGL background drawing) | PASS (`Vaultra` brand, `Sign up` pill fixed, 4 coin chips on diagonal lines, `EN ⌄` currency selector, 3-mode `#vaultraModal` open/close) |
| **Microsoft Edge** | `155.0.4283.62` | PASS (8/8) | `false` / `false` | `0` / `0` | PASS (`videoReady = true`, `videoFadedIn = true`, identical geometry in `.globe-plate`, zero canvas/WebGL background drawing) | PASS (`Vaultra` brand, `Sign up` pill fixed, 4 coin chips on diagonal lines, `EN ⌄` currency selector, 3-mode `#vaultraModal` open/close) |
| **Cốc Cốc** | `152.0.7977.124` | PASS (8/8) | `false` / `false` | `0` / `0` | PASS (`videoReady = true`, `videoFadedIn = true`, identical geometry in `.globe-plate`, zero canvas/WebGL background drawing) | PASS (`Vaultra` brand, `Sign up` pill fixed, 4 coin chips on diagonal lines, `EN ⌄` currency selector, 3-mode `#vaultraModal` open/close) |

## 3. Store Previews & Video Recording (`quay-preview.mjs`)

- **Static Previews:**
  - `web/public/previews/vaultra.webp` (`1280×800`)
  - `web/public/previews/vaultra-tablet.webp` (`820×1180`)
  - `web/public/previews/vaultra-mobile.webp` (`375×812`)
- **Video Preview:**
  - `web/public/previews/vaultra.mp4` (`1,357,061` bytes, `14.966667s`, `960×600` @ `30fps`)
  - **Revision:** `0888da5de7ef`
  - **Video SHA-256:** `0888da5de7ef204a39169666c46bcf54fdb47d39974a31fbf68f00a64a752cbf`
  - **Demo HTML SHA-256:** `2ea918ffe4093372c4a4c35e749bc60831c45f81bd318b3d79c45c5d6eaa7438`
  - **Demo Bundle SHA-256:** `7fbe3507d61f0b20ed8c6c25e338c79e178772d41498f31c483aec8c5be8ad20`
  - **Recorded Actions:** `hover hero` (`1.0s`), `vaultra-switch-eur-and-inspect-eth` (`3.101s`), `vaultra-switch-auth-and-close` (`5.394s`), `scroll` (`6.7s`), `vaultra-hover-get-started` (`10.186s`), `errors = 0`, `missing = 0`.
