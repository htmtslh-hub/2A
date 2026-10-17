# FitClub Food 1.0.0 QA

17 October 2026, Windows. `WEB-STATIC-1` v1.2.1 with session-authorised `W01`/`W03`/`W05`/`W06` exceptions: nine files, three local WebP food platter cutouts (`platter-club.webp`, `platter-protein.webp`, `platter-berry.webp`), finite `requestAnimationFrame` platter/scroll/dialog controls, and ZIP size above 20 KiB (`331,299` bytes). No shared standard, pricing, payment, database, or entitlement changes. Optional Google Fonts (`Plus Jakarta Sans`) under `W04` with system sans-serif fallbacks.

Source visual-review score **97.198** (strictly >95 threshold, not pixel accuracy); frozen source manifest `7fde3234980436b5ec2dddd48f6ef9e1243c7af76ddaa0a5b2ec0cd78dd75c8e`. Final ZIP `331,299` bytes, SHA-256 `02ce936a94e636ef567e55ec956511a1eb83be74541fa6449a6bb45e2ec6eec7`. Nine extracted files match `source/` byte-for-byte. Official extraction verification `checks.json`: **zero failures**.

| Check | Status and evidence |
|---|---|
| Q01 structure | PASS with approved exceptions: six standard files + three WebP cutouts (`assets/img/platter-club.webp`, `platter-protein.webp`, `platter-berry.webp`), no framework/build/runtime library/secrets. |
| Q02 responsive | PASS `checks.json`: Chromium `153.0.8010.12` and Firefox `155.0` at `1440×900`, `820×1180`, `375×812`, `320×740`, and `620px` menu breakpoint; zero horizontal overflow and zero tap targets below `44×44` px. Full-page screenshots visually reviewed in `screenshots/`. |
| Q03 interaction | PASS three platter states (`Club Harvest Platter`, `Protein Macro Platter`, `Berry Vitality Platter`), forward/backward wrap, rapid clicks, keyboard Left/Right arrows, horizontal pointer swipe; three portion tier buttons updating `#order` summary and `mailto:` link; native `<dialog>` modals (`#club-dialog`, `#macro-dialog`), Escape/backdrop close, mobile menu open/close/Escape/resize reset, and native `<details>` ingredient disclosures. |
| Q04 keyboard | PASS visible skip link landing in `<main>`, logical tab order, hidden mobile menu skipped when closed, Escape returns focus to `.menu-toggle`, arrow key platter switching on `.hero__stage`, and high-contrast `:focus-visible` outlines (`>= 3:1`) across dark plum surfaces. |
| Q05 structure/a11y | PASS single `<h1>`, semantic landmarks (`header`, `nav`, `main`, `footer`), unique IDs, valid internal anchors, accessible SVG labels/`aria-hidden`, and **0 axe-core WCAG 2/2.1 A/AA violations** in both Chromium and Firefox. |
| Q06 contrast | PASS `checks.json` CSS and pixel contrast verification across all text pairs, hover states, and focus outlines (`ratio >= 4.5` for normal text, `>= 3.0` for large text and focus outlines). |
| Q07 fallback | PASS no-JS/no-font at `320×740` (`navLinksVisible: true`, `scrollWidth: 320`), offline `file://` direct open, OS `prefers-reduced-motion: reduce` default finite motion policy, session-only `Pause motion` button, and equivalent 200% zoom (`720×450` DPR 2) with zero overflow. |
| Q08 browsers | PASS Chromium `153.0.8010.12`, Firefox `155.0`, Microsoft Edge `155.0.4283.62`, and Cốc Cốc `152.0.7977.124` (`checks.json` + `source-checks.json`). Safari and physical mobile devices **NOT TESTED**. |
| Q09 technical/motion | PASS finite `requestAnimationFrame` intermediate frames (`midTransformAnimated: true`), rapid input cancellation, scroll-reveal intermediate frames (`scrollMidAnimated: true`), and zero running animations after 5s; zero console errors, zero uncaught page errors, and zero failed local requests. |
| Q10 docs/assets | PASS ten steps, twelve complete AI prompts, zero unfilled markers, and exact literal edit counts in `CUSTOMISE.md` (`checks.json`). Seven-part commercial licence in `LICENCE.txt` with verified Plus Jakarta Sans OFL-1.1 source. Platter artwork provenance documented in `ASSETS.md` and `PROMPTS.md`. |
| Q11 final ZIP | PASS `checks.json` `sourceMatchesExtracted: true`, 9 files with forward-slash paths under `fitclub-food/`, SHA-256 `02ce936a94e636ef567e55ec956511a1eb83be74541fa6449a6bb45e2ec6eec7`, stored outside `web/public/`. |
| Q12 store | PASS within authorised scope: catalog integration (`fitclub-food`), demo under `web/public/demos/fitclub-food/`, poster image, and real 15s recorded preview video (`quay-preview.mjs`). Paid-account download and live payment completion **NOT TESTED**. |
| Q13 design | PASS weighted visual rubric **97.198** (>95 gate) documented in `ACCEPTANCE.md` and `acceptance.json`. |

- **D01** PASS: Hero immediately establishes the FitClub Food healthy bowl kitchen showcase with interactive platter switching, portion tiers, and `VIEW MENU` / `ORDER` anchors.
- **D02** PASS: Deep-plum stage (`#341e3c` / `#27142e`), concentric purple backdrop rings, pink diamond lattice, and overhead ceramic salad/nut/pomegranate platter stage.
- **D03** PASS: Hero stage, `#bowls` 3-platter cards, `#nutrition` ingredient disclosures, `#plans` portion rhythm selector, and `#order` enquiry desk each answer a distinct customer question.
- **D04** PASS: Consistent CSS custom properties (`--bg-plum`, `--accent-pink`, `--font-sans`) and typographic hierarchy across all sections.
- **D05** PASS: Full-page screenshots reviewed at `1440`, `820`, `375`, `320`, `menu-open`, and `zoom200`; no `overflow-x: hidden` on `html` or `body`.
- **D06** PASS: Illegible synthetic strings in the reference are replaced with real English fitness nutrition copy while preserving `FFIFEET CTUB`, `Fitreess &`, and `ENIISKE` documented in `CUSTOMISE.md`.
- **D07** PASS: All calorie/macro figures (`520 kcal`, `640 kcal`, `460 kcal`), `[YOUR STUDIO ADDRESS]`, and prices (`$14`–`$16 / bowl`) are clearly disclosed as illustrative demo content with zero fake reviews or invented certifications.
- **D08** PASS: `Send Kitchen Enquiry via Email` uses a real `mailto:` link synchronized with the active platter and portion tier, while delivery and macro buttons open explicit `Demo only` dialogs.
