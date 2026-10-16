# Volt Hoodie 1.0.0 QA

16 October 2026, Windows. `WEB-STATIC-1` v1.2.1 with session-authorised `W01`/`W03`/`W05`/`W06` exceptions: nine files, three original local WebP garment cutouts (`hoodie-volt.webp`, `hoodie-mint.webp`, `hoodie-arctic.webp`), finite `requestAnimationFrame` colourway/scroll/dialog controls, and ZIP size above 20 KiB (`240,129` bytes). No shared standard, pricing, payment, database, or entitlement changes. Optional Google Fonts (`Poppins`) under `W04` with system sans-serif fallbacks.

Source visual-review score **96.823** (strictly >95 threshold, not pixel accuracy); frozen source manifest `db927213f62dfe746e0ebc9f535e56a5d28f76c7daa43b1a896cc17a93b8d0de`. Final ZIP `240,129` bytes, SHA-256 `939efa6de7e88734492a339c44b1cb133f6805f65e150e98a66b84bbc0042757`. Nine extracted files match `source/` byte-for-byte. Official extraction verification `checks.json`: **zero failures**.

| Check | Status and evidence |
|---|---|
| Q01 structure | PASS with approved exceptions: six standard files + three WebP cutouts (`assets/img/hoodie-volt.webp`, `hoodie-mint.webp`, `hoodie-arctic.webp`), no framework/build/runtime library/secrets. |
| Q02 responsive | PASS `checks.json`: Chromium `153.0.8010.12` and Firefox `155.0` at `1440×900`, `820×1180`, `375×812`, `320×740`, and `860px` menu breakpoint; zero horizontal overflow and zero tap targets below `44×44` px. Full-page screenshots visually reviewed in `screenshots/`. |
| Q03 interaction | PASS three colourway states (`Volt Yellow / Carbon`, `Cyber Mint / Carbon`, `Arctic White / Carbon`), forward/backward wrap, rapid clicks, keyboard Left/Right arrows, horizontal pointer swipe; `S`/`M`/`L` size selector updating `#order` summary and `mailto:` link; native `<dialog>` modals (`#search-dialog`, `#account-dialog`, `#guide-dialog`), Escape/backdrop close, mobile menu open/close/Escape/resize reset, and native `<details>` FAQ disclosures. |
| Q04 keyboard | PASS visible skip link landing in `<main>`, logical tab order, hidden mobile menu skipped when closed, Escape returns focus to `.menu-toggle`, arrow key slide switching on `.hero__stage`, and high-contrast `:focus-visible` outlines (`>= 3:1`) on both dark carbon and volt yellow surfaces. |
| Q05 structure/a11y | PASS single `<h1>`, semantic landmarks (`header`, `nav`, `main`, `footer`), unique IDs, valid internal anchors, accessible SVG labels/`aria-hidden`, and **0 axe-core WCAG 2/2.1 A/AA violations** in both Chromium and Firefox. |
| Q06 contrast | PASS `checks.json` CSS and pixel contrast verification across all text pairs, hover states, and focus outlines (`ratio >= 4.5` for normal text, `>= 3.0` for large text and focus outlines). |
| Q07 fallback | PASS no-JS/no-font at `320×740` (`navLinksVisible: true`, `scrollWidth: 320`), offline `file://` direct open, OS `prefers-reduced-motion: reduce` default finite motion policy, session-only `Pause motion` button, and equivalent 200% zoom (`720×450` DPR 2) with zero overflow. |
| Q08 browsers | PASS Chromium `153.0.8010.12`, Firefox `155.0`, Microsoft Edge `155.0.4283.60`, and Cốc Cốc `152.0.7977.124` (`checks.json` + `source-checks.json`). Safari and physical mobile devices **NOT TESTED**. |
| Q09 technical/motion | PASS finite `requestAnimationFrame` intermediate frames (`midTransformAnimated: true`), rapid input cancellation, scroll-reveal intermediate frames (`scrollMidAnimated: true`), and zero running animations after 5s; zero console errors, zero uncaught page errors, and zero failed local requests. |
| Q10 docs/assets | PASS ten steps, twelve complete AI prompts, zero unfilled markers, and exact literal edit counts in `CUSTOMISE.md` (`checks.json`). Seven-part commercial licence in `LICENCE.txt` with verified Poppins OFL-1.1 source. Original AI garment artwork provenance documented in `ASSETS.md` and `PROMPTS.md`. |
| Q11 final ZIP | PASS `checks.json` `sourceMatchesExtracted: true`, 9 files with forward-slash paths under `volt-hoodie/`, SHA-256 `939efa6de7e88734492a339c44b1cb133f6805f65e150e98a66b84bbc0042757`, stored outside `web/public/`. |
| Q12 store | PASS within authorised scope: catalog slot `t46` (`volt-hoodie`), demo under `web/public/demos/volt-hoodie/`, poster image, and real 15s recorded preview video (`quay-preview.mjs`). Paid-account download and live payment completion **NOT TESTED**. |
| Q13 design | PASS weighted visual rubric **96.823** (>95 gate) documented in `ACCEPTANCE.md` and `acceptance.json`. |

- **D01** PASS: Hero immediately establishes the 2024 Volt Hoodie athletic streetwear showcase with interactive colourways, sizes, price (`Rs. 1559/-`), and `Buy Now` anchor to the order enquiry desk.
- **D02** PASS: High-contrast `#272727` matte carbon and `#FFD507` volt yellow diagonal split, studio hoodie cutout straddling the seam, and giant italic `HOODIE` watermark.
- **D03** PASS: Hero stage, `#shop` 3-colourway comparison cards, `#kids` youth division specs, `#sports` measurement matrix, and `#order` / `#support` enquiry desk each serve a distinct buyer question.
- **D04** PASS: Consistent CSS custom properties (`--bg-volt`, `--bg-carbon`, `--font-sans`) and typographic scale across all sections.
- **D05** PASS: Full-page screenshots reviewed at `1440`, `820`, `375`, `320`, `menu-open`, and `zoom200`; no `overflow-x: hidden` on `html` or `body`.
- **D06** PASS: Reference `Lorem ipsum` replaced with specific English technical fleece copy; reference `Sing Up` header button spelling intentionally preserved and documented in `CUSTOMISE.md`.
- **D07** PASS: All fabric weights (`420 GSM`), measurements, and prices (`Rs. 1559/-`) are clearly disclosed as illustrative demo content with zero fake reviews or invented certifications.
- **D08** PASS: `Buy Now` and `Send Order Enquiry via Email` use real `mailto:` links synchronized with the active colourway and size, while `Log In` and `Sing Up` open an explicit `Demo only` dialog.
