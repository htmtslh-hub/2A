# Atlas (`atlas` v1.0.0) — QA & Acceptance Report

- **Date / OS:** 24/10/2026 · Windows (`win32`)
- **Standard:** `WEB-STATIC-1 v1.2.1` with task-specific `--ngoai-le` (`W01`/`W03`/`W05`/`W06`) exceptions for 4 original WebP ocean log illustrations (`assets/img/hero-ocean-01.webp`, `hero-ocean-02.webp`, `hero-ocean-03.webp`, `depth-sonar-thumb.webp`), Scroll Word / `skill-morge` / `neon-orbit-border` interactions, and ZIP size above `20 KiB`.
- **Archive:** `atlas.zip` — `530,144` bytes (`10` files), SHA-256 `359f1d58bc4c70390df6d745b921633da0dd8ad3137e961bd90e9ee7152c46eb`.
- **Visual Fidelity Gate:** **`98.24%` (PASS, threshold `> 95.0%`)** by frozen regional rubric (`ACCEPTANCE.md` / `acceptance.json`).
- **Official Automated Checker (`check-template.mjs`):** **0 failures** in `checks.json` (`sourceMatchesExtracted = true`, `10` steps, `12` prompts, `0` count errors, `0` unfilled markers, `0` contrast failures, `0` axe violations).
- **4-Browser Motion & Interaction Suite (`source-checks.json`):** **PASS** across **Chromium `153.0.8010.12`**, **Firefox `155.0`**, **Microsoft Edge `156.0.4314.42`**, and **Cốc Cốc `154.0.8037.106`**.

---

## Q01–Q13 Verification Summary

| Check | Status & Evidence |
| --- | --- |
| **Q01 Structure** | **PASS (`--ngoai-le`)** — Contains the 6 mandatory core files (`index.html`, `assets/css/style.css`, `assets/js/main.js`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) plus 4 original WebP plates in `assets/img/`. Zero frameworks, build artefacts, or hidden files. |
| **Q02 Responsive** | **PASS** — Verified at `1440×900`, `940×530`, `820×1180`, `375×812`, and `320×740`. Zero horizontal overflow (`scrollWidth <= clientWidth`), no `overflow-x: hidden` on `html`/`body`, and all standalone controls `>= 44×44` CSS px. |
| **Q03 Interactions** | **PASS** — Mobile menu (`breakpoint: 860px`) opens/closes via click, link click, and `Escape`; 5-stop vertical depth ruler (`0 m` → `10,000 m`) syncs with `#journey` bathymetric strata; `skill-morge` 3-slide carousel wraps forward (`2 → 0`) and backward (`0 → 2`) and syncs Hero stage; `#stories` filters (`ALL`, `PEOPLE`, `PLACES`, `OCEANS`, `IDEAS`) + bookmark heart toggles + `neon-orbit-card` active dossier selection; `<dialog>` modals (`#map-dialog`, `#telemetry-dialog`) open/close cleanly. |
| **Q04 Keyboard** | **PASS** — Skip link (`.skip-link`) appears on `Tab` and moves focus into `<main id="main">`; closed mobile menu is skipped in tab order; `Shift+Tab` returns to toggle; `Escape` closes menu/dialogs and restores focus. |
| **Q05 Semantics & Axe** | **PASS** — `<html lang="en">`, single `<h1>`, logical heading hierarchy (`h1` → `h2` → `h3`), `<header>`, `<nav>`, `<main>`, `<footer>`, zero duplicate IDs, all SVGs carry `viewBox` and `aria-hidden="true"`, and **0 `@axe-core/playwright` (`wcag2a`, `wcag2aa`, `wcag21aa`) violations** in both Chromium and Firefox. |
| **Q06 Contrast** | **PASS** — `0` failing text/background pairs in `checks.json` (both CSS and pixel-sampled over images) and `0` hover contrast failures. Focus ring contrast is `>= 12.5:1` on both sky (`#141311` on `#d8d2c8`) and abyss (`#6ce5f5` on `#05161f`). |
| **Q07 Fallbacks** | **PASS** — `200%` zoom (`720×450 @ 2x`) has zero horizontal overflow; `file://` direct open renders fully styled; `no-JS + blocked fonts at 320×740` keeps navigation visible and all content readable; offline mode works with local WebP assets; animations settle before `5s` (`motionAfter5s: []`) and follow the 05/10/2026 default-ON motion policy with a session-only `Pause motion` toggle. |
| **Q08 Browsers** | **PASS** — Verified on real Windows browser binaries: **Chromium `153.0.8010.12`**, **Firefox `155.0`**, **Microsoft Edge `156.0.4314.42`**, and **Cốc Cốc `154.0.8037.106`**. Safari and physical mobile devices were **NOT TESTED**. |
| **Q09 Technical** | **PASS** — `0` console errors, `0` uncaught page exceptions, and `0` failed network requests. All `requestAnimationFrame` tweens are finite and cancelled on re-trigger or pause. |
| **Q10 Docs & Rights** | **PASS** — `CUSTOMISE.md` has `10` steps, `12` self-contained AI prompts (`0` unfilled bracket placeholders), and `23` programmatically verified literal string counts (`0` count errors). `ASSETS.md` documents all 4 self-generated WebP assets. |
| **Q11 Final ZIP** | **PASS** — Extracted `atlas.zip` matches `source/` byte-for-byte (`sourceMatchesExtracted = true`) and passes all HTTP and `file://` checks. |
| **Q12 Store & Preview** | **PASS** — Integrated as `t96` (`slug: 'atlas'`, category: `education`) across `vi`/`en`/`zh` locales with static WebP posters (`atlas.webp`, `atlas-tablet.webp`, `atlas-mobile.webp`), public demo (`web/public/demos/atlas/`), and recorded live browser video preview (`atlas.mp4` + `atlas.webm`). |
| **Q13 Visual & Design** | **PASS** — Meets `D01`–`D08` below and achieves `98.24%` regional visual fidelity against the reference image while cleanly omitting foreign screenshot viewer overlays. |

---

## D01–D08 Design & Content Audit

- **D01 Hero Clarity:** **PASS** — Immediate split-waterline focal point (`Small Stories / Vast Oceans`, crimson whale & red sloop, and `BEGIN JOURNEY →` / `EXPLORE MAP ○` CTAs).
- **D02 Visual Signature:** **PASS** — Split-world horizon (`#d8d2c8` atmospheric parchment sky above `#05161f` bathyal abyss) with custom high-resolution editorial ocean artwork.
- **D03 Narrative Rhythm:** **PASS** — Cohesive progression from `01 / Ocean Log` Hero → `02 / Scroll Word Manifesto & Bathymetric Log` → `03 / Expedition Archive Carousel` → `04 / Compass Index Stories` → `05 / About & Dispatch`.
- **D04 Token Discipline:** **PASS** — Unified `:root` palette, typography (`Cormorant Garamond` + `JetBrains Mono`), and spacing tokens.
- **D05 Viewport Balance:** **PASS** — Reviewed full-page screenshots across `1440px`, `820px`, `375px`, and `320px`; cards, badges, and buttons wrap cleanly without clipping.
- **D06 Domain Copy:** **PASS** — Authentic oceanographic and maritime field-log prose throughout; zero `lorem ipsum` or generic filler.
- **D07 Honesty & Demo Labelling:** **PASS** — Interactive dispatch and telemetry forms are explicitly labelled `Demo only` (`2` occurrences in `index.html`).
- **D08 Internal Consistency:** **PASS** — Coordinates (`25.2048° N`, `55.2708° E`), depth stops (`0 m` .. `10,000 m`), and companion logs (`01` .. `03`) remain synchronised across the Hero, Archive, and About ledger.

---

## Known Scope Boundaries & Untested Environments

- Static front-end template (`Demo only` for form/email dispatch; no server database or live satellite telemetry feed).
- Session state (active log, depth stratum, bookmarked stories, and `Pause motion` toggle) resets on page reload by design.
- **Untested environments:** Apple Safari (`macOS`/`iOS`) and physical mobile/tablet hardware were not tested on this Windows workstation.
