# Volt Hoodie source acceptance

Gate PASS. Visual-review rubric **96.483**; threshold strictly >95. Not pixel accuracy. Region weights fixed before implementation in `BRIEF.md`. Full axis scores and concrete differences in `acceptance.json`.

Reference `930×602` (`SHA-256 2686fcb29be1012ad6b1b8cfcb7ebb6061c1cd9e52b898a5b76836b5a3066338`). Candidate rendered at `930×602` (`candidate-930x602.png`) and `1440×900` (`candidate-1440x900.png`), DPR 1, zoom 1, scroll 0. `visual-diff/side-by-side.png` preserves the real rendered side-by-side comparison. Two external viewer overlay buttons in the bottom-right corner (`x=825..922, y=390..590`) are excluded from the website and design scoring; raw pixel diagnostic (`79.16%` match within RGB tolerance 16, mean absolute RGB error `13.56`) includes those external overlays and generated garment folds.

- `header-nav`: **96.650** (14%)
- `left-dark-panel`: **97.150** (18%)
- `center-product-stage`: **95.850** (34%)
- `right-hero-copy`: **96.650** (24%)
- `watermark-and-pagination`: **96.800** (10%)

Remaining differences: original AI-generated hoodie studio cutout has slightly different fabric fold shading and low-poly sleeve linework density than the reference photograph; the 3-line `Lorem ipsum` placeholder paragraph in the reference is replaced with real English garment copy (`Engineered brushed fleece hoodie...`) per rule `D06`. All reference proportions, diagonal `#272727` / `#FFD507` geometry, rotated `2 0 2 4` year, `Color` swatches, `Size S/M/L` column, upright bold `Hoodie` title, `Rs. 1559/-` price, rounded-rectangle `Buy Now` button, right vertical progress rail, giant italic `HOODIE` watermark, social icons, and `○ ● ●` pagination dots are preserved. Below-the-fold sections (`#shop`, `#kids`, `#sports`, `#order`, `#support`) complete the single-page product showroom.

Source technical/motion/scroll PASS: see `checks.json`, `source-checks.json`, and `screenshots/`. Verified across four actual desktop browsers (Chromium `153.0.8010.12`, Firefox `155.0`, Microsoft Edge `155.0.4283.60`, and Cốc Cốc `152.0.7977.124`) under OS `prefers-reduced-motion: reduce`; finite `requestAnimationFrame` intermediate frames, forward/backward wrap, keyboard arrows, pointer swipe, scroll-reveal intermediate frames, and session-only `Pause motion` all pass with zero idle animation loops. No-JS/no-font at `320×740`, `file://`, and equivalent 200% zoom (`720×450` DPR 2) verified.

Frozen source manifest: `ecaf0c8956922aaee6da7dd417dc3aa93195835710acc7d1440b1245f89f44ec`. Safari, physical mobile devices, live payment processing, and paid-account download are not claimed.
