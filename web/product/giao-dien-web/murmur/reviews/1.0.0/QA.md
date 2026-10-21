# QA Report — murmur (`murmur`, v1.0.0)

## 1. Package & Integrity Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs murmur --ngoai-le`
- **Output Archive:** `web/product/giao-dien-web/murmur/murmur.zip`
- **Byte Size:** `15,565` bytes (passes W06 `< 20,480` byte limit)
- **SHA-256:** `20fd586c3c58c004e8933afb29cac679299fa4a40a250ec71360a2b4d875d2b9`
- **Files Verified (4 files, byte-identical to `source/`):**
  - `murmur/CUSTOMISE.md`
  - `murmur/index.html`
  - `murmur/LICENCE.txt`
  - `murmur/README.md`
- **Synced Demo:** `web/public/demos/murmur/index.html` (byte-identical to `source/index.html`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs`)

- **Harness:** `web/product/giao-dien-web/murmur/reviews/1.0.0/check.cjs`
- **Evidence JSON:** `web/product/giao-dien-web/murmur/reviews/1.0.0/checks.json`
- **Browsers Tested (4):**
  - **Chromium:** `153.0.8010.12` — **PASS** (`0` console errors, `0` page errors)
  - **Firefox:** `155.0` — **PASS** (`0` console errors, `0` page errors)
  - **Microsoft Edge:** `155.0.4283.62` — **PASS** (`0` console errors, `0` page errors)
  - **Cốc Cốc:** `152.0.7977.124` — **PASS** (`0` console errors, `0` page errors)
- **Viewports Tested (7):**
  - `1440×900` (desktop reference frame: `1u = 1px`, verified exact frame coordinates: `plate` `1440×900`, mirror-padded `video` `1600×900` at `x = -80` (`111.11%` width, `left -5.556%`), screen-blended `bloom` and `sweep` layers, `wordmark` `y = 133`, `subtitle` `y = 225`, `episodeLabel` `y = 319` centred `10px` right of centre at `x_center = 730`, `playerCard` `624×190` at `(413, 350)`, `cardCover` `158×156` at `(431, 366)`, `cardTitle` at `(615, 383)`, `cardDate` at `(615, 450)`, `waveform` `335×34` at `(616, 488)` with `62` bars, `playBtn` `37×37` at `(979, 487)`, `aboutTitle` at `(414, 595)`, `platformLabel` at `(414, 760)`, and `platformIcons` at `x = 710` with `4` generic round white icons)
  - `1024×768` (landscape tablet/laptop, zero horizontal overflow)
  - `820×1180` (mobile/tablet breakpoint `<= 820px`: stacked centred wordmark/subtitle/label, compact grid player card with full-width bottom waveform and bottom-right play button, left-aligned About block and platform row)
  - `768×1024` (portrait tablet, zero horizontal overflow)
  - `740×360` (compact landscape, zero horizontal overflow)
  - `375×812` (mobile portrait, zero horizontal overflow)
  - `320×740` (small mobile portrait, zero horizontal overflow)
- **Interactive Flows Verified in All 4 Browsers:**
  - Clicking `#playBtn` toggles `aria-pressed="true"` / `"false"` and activates the waveform glow + Web Audio ambient chord preview.
  - Clicking `[data-platform="0"]` opens `#platformModal`, switching episodes (`[data-episode="1"]`) updates the episode title to `"The Quiet Physics of Rain-Streaked Glass"`, and pressing `Escape` closes the modal and restores focus.

## 3. Store Previews & 15s Video Recording

- **WebP Previews Generated:**
  - `web/public/previews/murmur.webp` (`1280×800`)
  - `web/public/previews/murmur-tablet.webp` (`820×1180`)
  - `web/public/previews/murmur-mobile.webp` (`375×812`)
- **Live Video Recording (`quay-preview.mjs`):**
  - `web/public/previews/murmur.mp4` (`464,319` bytes, `14.966667s`, `errors=0`, `missing=0`)
