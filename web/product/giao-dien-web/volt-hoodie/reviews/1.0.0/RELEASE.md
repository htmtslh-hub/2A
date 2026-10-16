# Volt Hoodie 1.0.0 Release Record

16 October 2026, Windows. Commercial template release for Forge Zone marketplace.

## Product Identifiers
- Name: Volt Hoodie
- Slug: `volt-hoodie`
- Store Slot: `t46`
- Category: `commerce`
- Version: `1.0.0`
- Store Product URL: `https://forgezone.store/?mau=t46`
- Public Demo URL: `https://forgezone.store/demos/volt-hoodie/index.html?v=1.0.0`
- Video Preview: `https://forgezone.store/previews/volt-hoodie.mp4?v=d684815da027`
- Poster Preview: `https://forgezone.store/previews/volt-hoodie.webp?v=1.0.0`

## Package Verification
- Commercial ZIP: `volt-hoodie.zip` (`257,466` bytes)
- SHA-256 Digest: `55313cd5abff343fdb98c5d4e982432bb8116a1a1757d3578b1fa04a186a939b`
- Frozen Source Manifest SHA-256: `ecaf0c8956922aaee6da7dd417dc3aa93195835710acc7d1440b1245f89f44ec`
- File Count: 9 files (`index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/img/hoodie-volt.webp`, `assets/img/hoodie-mint.webp`, `assets/img/hoodie-arctic.webp`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`).
- Extracted integrity: Byte-for-byte identical match with `source/` (`sourceMatchesExtracted: true` in `checks.json`).
- Zero third-party runtime libraries, frameworks, analytics scripts, trackers, or build steps.

## Visual & Browser QA Verification
- ForgeFrame Weighted Regional Visual Fidelity Score: **96.483** (>95 gate) at `930×602` reference canvas (`79.16%` raw pixel match within tolerance 16, mean absolute RGB error `13.56`).
- Official Extraction QA (`check-template.mjs volt-hoodie --version 1.0.0 --ngoai-le`): **0 failures** across Chromium `153.0.8010.12` and Firefox `155.0` at 4 viewports (`1440×900`, `1024×768`, `768×900`, `375×812`), including axe-core (`0` violations), contrast, mobile navigation Escape/focus, `file://`, offline/no-JS, and 200% zoom layout integrity.
- 4-Browser Finite Motion & Scroll QA (`source-checks.json`): Passed in Chromium `153.0.8010.12`, Firefox `155.0`, Microsoft Edge `155.0.4283.60`, and Cốc Cốc `152.0.7977.124` under `reducedMotion: 'reduce'` with finite `requestAnimationFrame` interpolation (`320ms` switcher, `360ms` scroll reveal).
- Actual Safari / physical iOS & Android devices and paid-account download/payment completion: NOT TESTED.

## Recording Verification
- Tool: `web/product/giao-dien-web/tools/quay-preview.mjs volt-hoodie`
- Poster: `web/public/previews/volt-hoodie.webp` (`16,256` bytes)
- Video: `web/public/previews/volt-hoodie.mp4` (`470,902` bytes, `14.966667s`, `960×600`, `30fps`, H.264, no audio, revision `d684815da027`, SHA-256 `d684815da027e90801d05ffa4eda33e052227c5cad85a2dbe3fcf6371bea30c8`).
- Manifest check: `PASS 46 catalog recordings, revisions and hashes` (`21.31 MiB` total).

## Compliance
- WEB-STATIC-1 v1.2.1 with documented W01/W03/W05/W06 exceptions for local transparent WebP hoodie studio renders, `CUSTOMISE.md` byte size (`26,282` bytes), and interactive colorway/scroll showcase sections.
- Conforms to product policy 05/10/2026: animations enabled by default across all engines regardless of OS `prefers-reduced-motion` while providing an explicit top-bar Motion toggle (`data-motion-toggle`).
