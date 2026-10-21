# QA Report — Eclipsio (`eclipsio`, v1.0.0)

## 1. Package & Integrity Verification (`dong-goi.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/dong-goi.mjs eclipsio --ngoai-le`
- **Output Archive:** `web/product/giao-dien-web/eclipsio/eclipsio.zip`
- **Byte Size:** `15,672` bytes (passes W06 `< 20,480` byte limit)
- **SHA-256:** `2245647695e305ca001c033a0ebdcc5eaa2cfdc04129cbce7092cec13b5b794a`
- **Files Verified (4 files, byte-identical to `source/`):**
  - `eclipsio/CUSTOMISE.md`
  - `eclipsio/index.html`
  - `eclipsio/LICENCE.txt`
  - `eclipsio/README.md`
- **Synced Demo:** `web/public/demos/eclipsio/index.html` (byte-identical to `source/index.html`)

## 2. Multi-Browser & Multi-Viewport Verification (`check.cjs`)

- **Harness:** `web/product/giao-dien-web/eclipsio/reviews/1.0.0/check.cjs`
- **Evidence JSON:** `web/product/giao-dien-web/eclipsio/reviews/1.0.0/checks.json`
- **Browsers Tested (4):**
  - **Chromium:** `153.0.8010.12` — **PASS** (`0` console errors, `0` page errors)
  - **Firefox:** `155.0` — **PASS** (`0` console errors, `0` page errors)
  - **Microsoft Edge:** `155.0.4283.62` — **PASS** (`0` console errors, `0` page errors)
  - **Cốc Cốc:** `152.0.7977.124` — **PASS** (`0` console errors, `0` page errors)
- **Viewports Tested (8):**
  - `1448×1086` (reference frame: `1u = 1px`, verified exact reference dimensions: `nav-zone` `125px`, `nav-bar` `y=34, h=38`, `brand` `x=68`, `navCta` `right=1386`, `badge` `h=44`, `buttons` `h=55`, `logo-strip` `892×56`, `plate` `1448×1086`, `video` `1930×1086`)
  - `1440×900` (desktop acceptance check: bottom-anchored eclipse plate `h=900` and mirror-padded `1930/1086` video `h=900` aligned and playing, zero horizontal/vertical overflow)
  - `1024×768` (landscape tablet/laptop, zero overflow)
  - `820×1180` (mobile/tablet breakpoint `<= 820px`: compact nav with round menu button, 4-line headline wrap, side-by-side full-width CTA buttons, plain full-width soft-edged marquee)
  - `768×1024` (portrait tablet, zero overflow)
  - `740×360` (compact landscape, zero overflow)
  - `375×812` (mobile portrait, zero overflow)
  - `320×740` (small mobile portrait, zero overflow)
- **Interactive Flows Verified in All 4 Browsers:**
  - Clicking `#heroSamplesBtn` (`View Samples`) opens `#samplesModal`, switching tabs (`[data-select-sample="1"]`) updates the portfolio showcase to `"Mireia Valls — Real-Time Shader & WebGL Studio"`, and pressing `Escape` closes the modal and restores focus.
  - Clicking `#heroCreateBtn` (`Start Creating`) opens `#createModal`, submitting a handle (`eclipsio.site/soren`) displays confirmation in `#createStatus`, and pressing `Escape` closes the modal.
  - At `375×812`, clicking `#menuBtn` opens `#mobileDropdown` (`is-open = true`) and pressing `Escape` closes it cleanly.

## 3. Store Previews & 15s Video Recording

- **WebP Previews Generated:**
  - `web/public/previews/eclipsio.webp` (`1280×800`)
  - `web/public/previews/eclipsio-tablet.webp` (`820×1180`)
  - `web/public/previews/eclipsio-mobile.webp` (`375×812`)
- **Live Video Recording (`quay-preview.mjs`):**
  - `web/public/previews/eclipsio.mp4` (`620,533` bytes, `14.966667s`, `errors=0`, `missing=0`)
  - Contact sheet verified at `web/product/giao-dien-web/tools/preview-evidence/eclipsio-contact.jpg`
