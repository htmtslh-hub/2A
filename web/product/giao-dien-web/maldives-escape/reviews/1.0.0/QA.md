# QA Report — Maldives Escape (`maldives-escape`, v1.0.0)

## 1. Automated Gate Summary (`check-template.mjs`)

- **Command:** `node web/product/giao-dien-web/tools/check-template.mjs maldives-escape --version 1.0.0 --ngoai-le`
- **Status:** `PASS` (0 failures)
- **Evidence JSON:** `reviews/1.0.0/checks.json`
- **Package File:** `maldives-escape.zip` (`610,321` bytes)
- **SHA-256:** `88e5b152fff4f4851cf323226ceb0cb5fcf9ddc3b6901a7a24c92626e038648c`
- **Browsers Verified:** Chromium `153.0.8010.12`, Firefox `155.0`

## 2. Visual & Responsive Inspection (`reviews/1.0.0/screenshots/`)

- **`chromium-1440.png` (Desktop `1440×900`):**
  - Full-bleed sunset overwater villa sundeck hero with glowing blue-teal starlit infinity pool on the left, two loungers with champagne flutes in the foreground, and candlelit four-poster timber pergola on the right.
  - Top header bar with bottom border line, brand logo (`Maldives Escape`), `Pause motion` button, and right-aligned `Home` (underlined), `Travel`, `Offers`, `About us`, `Contact us` links.
  - Left circular frosted dome overlay (`.hero-dome`) framing the `<` and `>` carousel arrows, the primary vertical card (`New Maldives Resort Comes With Water Slide`) with the white pill `Book Now` button directly below it, and the secondary vertical card (`Reef Pavilion`).
  - Right-center oversized thin geometric uppercase `MALDIVES` headline and `The sunny side of life` subtitle.
  - Bottom-center 4 circular pagination dots (`○ ○ ○ ●`, 4th dot active) and bottom-right slide numeral `4`.
- **`chromium-820.png` (Tablet `820×1180`) & `chromium-375.png` / `chromium-320.png` (Mobile `375×812`, `320×740`):**
  - Zero horizontal overflow (`scrollWidth <= clientWidth`), collapsible mobile navigation menu (`[data-menu-toggle]`), and clean stacking of hero headline, vertical resort cards, and below-the-fold sections.
- **`chromium-zoom200.png` & `chromium-reduced-motion.png`:**
  - Clean layout reflow at `200%` zoom and full respect for `prefers-reduced-motion: reduce` plus session-only `[data-motion-toggle]`.
