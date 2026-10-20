# Customisation Guide — NeuralKinetics (`v1.0.0`)

This guide walks you through customising **NeuralKinetics** in 10 structured steps, followed by 12 copy-ready AI prompts and a counted literal edit map.

---

## 10-Step Customisation Walkthrough

1. **Extract & Prepare Your Working Copy:**
   Extract `neuralkinetics.zip` into a clean directory and keep the original archive as your untouched backup. You can preview the prebuilt static bundle immediately in `built/index.html` over any static HTTP server (`npx serve built`).
2. **Update Page Title, Meta Description & Google Font (`index.html`):**
   Open `index.html` and replace `NeuralKinetics — One Card, Zero Limits. Worldwide.` in `<title>` and `<meta property="og:title">` with your brand name and value proposition. The `Inter` font (`300;400;500;600`) is loaded from Google Fonts in `<head>`.
3. **Replace the Full-Viewport Background Video (`src/App.tsx`):**
   In `src/App.tsx`, update `VIDEO_URL` to point to your own hosted MP4 reel (`autoPlay`, `muted`, `playsInline`, `loop`, `object-fit: cover`).
4. **Customise the Logo SVG & Brand Text (`src/App.tsx`):**
   In `src/App.tsx`, edit the two rotated `<rect transform="rotate(-35 ...)" fill="#000000" />` elements inside `#nk-brand-logo` and update `#nk-brand-text` (`NeuralKinetics`).
5. **Update Navbar Domain Pills & Right Adaptive Pill (`src/App.tsx`):**
   Edit the two navbar domain labels (`Advanced Bionics` and `Cognitive AI`) in `#nk-nav-tags` and the right-hand pill label (`Adaptive Systems`) inside `#nk-adaptive-btn`.
6. **Personalise the Subtitle & Two-Line Hero Heading (`src/App.tsx`):**
   Update `#nk-subtitle` (`Best digital banking card 2026`) and the two lines inside `#nk-heading` (`One Card, Zero` / `Limits. Worldwide.`).
7. **Configure Primary & Secondary CTA Buttons (`src/App.tsx`):**
   Edit `#nk-see-features-btn` (`See Features`) and `#nk-how-it-works-btn` (`How It Works`) along with their interactive modal dialogs (`#nk-features-modal` and `#nk-how-modal`).
8. **Customise Footer Capability Tags & Live Telemetry (`src/App.tsx`):**
   Update `TELEMETRY_BY_TAG` and the three right-block tag pills (`Neuromorphic`, `AGI`, `Cybernetics`) to reflect your product architecture metrics.
9. **Tune Design Tokens, Video Framing & Responsive Breakpoint (`src/index.css`):**
   In `src/index.css`, adjust `:root` tokens (`--nk-bg`, `--nk-ink`, `--nk-ink-muted`, `--nk-pill-gray`), mobile video framing (`.nk-video-wrapper` `80% × 80%`), and the `@media (min-width: 768px)` desktop rules (`100% × 100%` video, `24px 32px` navbar padding, `32px` circle buttons).
10. **Rebuild & Sync Production Bundle (`built/`):**
    Run `npm install && npm run build` to typecheck (`tsc --noEmit`) and emit the updated production bundle into `built/`.

---

## 12 Copy-Ready AI Prompts

1. **Prompt 01 — Set Up My Website Editing Assistant:**
   > "I bought the NeuralKinetics React + Vite + Framer Motion (`motion/react`) template and want to customise it for my own brand. Read `index.html`, `src/App.tsx`, `src/index.css`, `CUSTOMISE.md`, `README.md`, and `LICENCE.txt`. Summarise the current navbar, background video, bottom gradient footer, and interactive modals, then ask me for my brand name, tagline, headline, CTA labels, and capability tags."
2. **Prompt 02 — Rebrand All Copy for an AI Wealth Card:**
   > "In `index.html` and `src/App.tsx`, replace `NeuralKinetics` with `[BRAND NAME]`, change the subtitle `Best digital banking card 2026` to `[NEW SUBTITLE]`, and update the two-line heading `One Card, Zero` / `Limits. Worldwide.` to `[LINE 1]` / `[LINE 2]`. Preserve all `motion/react` animations and plain CSS classes."
3. **Prompt 03 — Swap Background Video & Add a Poster Frame:**
   > "In `src/App.tsx`, update `VIDEO_URL` to `[MY MP4 URL]` and add a `poster` attribute on `#nk-bg-video` pointing to `[MY WEBP POSTER]`. Keep `autoPlay`, `muted`, `playsInline`, `loop`, and the `80%` mobile / `100%` desktop wrapper sizing."
4. **Prompt 04 — Customise Currency Simulator Rates in the Features Modal:**
   > "In `src/App.tsx`, update `CURRENCY_RATES` inside `#nk-features-modal` to support `CHF`, `AED`, `JPY`, and `GBP` with custom settlement rail descriptions."
5. **Prompt 05 — Connect CTA Buttons to External Routes:**
   > "Update `#nk-see-features-btn` and `#nk-how-it-works-btn` in `src/App.tsx` so they navigate to `[PRIMARY URL]` and `[SECONDARY URL]` or open the built-in interactive modals based on a configuration flag."
6. **Prompt 06 — Invert Palette to Obsidian Dark Mode:**
   > "In `src/index.css`, invert the colour tokens in `:root` and the `.nk-footer` bottom gradient from white (`#ffffff`) to obsidian black (`#08080a`) with crisp white typography, while keeping contrast above WCAG AA."
7. **Prompt 07 — Translate the Entire Interface:**
   > "Translate all visitor-facing strings in `index.html` and `src/App.tsx` into `[LANGUAGE]` (including navbar pills, hero subtitle, two-line heading, CTA buttons, footer tags, and modal content) while keeping layout and `clamp()` typography intact."
8. **Prompt 08 — Customise the 3-Stage How It Works Pipeline:**
   > "In `src/App.tsx`, update `HOW_IT_WORKS_STEPS` (`01`, `02`, `03`) with our verified onboarding workflow and metrics."
9. **Prompt 09 — Add a Fourth Footer Capability Pill:**
   > "Extend `FooterTag` and `TELEMETRY_BY_TAG` in `src/App.tsx` with a fourth tag pill named `'Quantum Safe'` and its corresponding telemetry readout."
10. **Prompt 10 — Audit Accessibility, Contrast & Responsive Viewports:**
    > "Audit `index.html`, `src/App.tsx`, and `src/index.css` across `1440×900`, `820×1180`, `375×812`, and `320×740`. Verify keyboard focus outlines, `Escape` handling for drawers/modals, and zero horizontal overflow."
11. **Prompt 11 — Guide Me Through Deploying the Built Folder:**
    > "Explain step by step how to run `npm run build` and deploy the generated `built/` directory of NeuralKinetics to `[HOSTING PROVIDER]` with HTTPS and a custom domain."
12. **Prompt 12 — Diagnose and Fix a Layout or Animation Issue:**
    > "Inspect `src/App.tsx` and `src/index.css` to diagnose `[DESCRIBE ISSUE]`. Provide the minimal safe fix without adding Tailwind or external UI libraries, and return the complete updated file."

---

## Counted Literal Edit Map

| File | Literal String | Count | Purpose |
| :--- | :--- | :---: | :--- |
| `index.html` | `NeuralKinetics — One Card, Zero Limits. Worldwide.` | 2 | Document `<title>` & `og:title` |
| `src/App.tsx` | `NeuralKinetics` | 8 | Brand text, ARIA labels, menu header & modal titles |
| `src/App.tsx` | `Best digital banking card 2026` | 1 | Hero subtitle text next to 8px black dot |
| `src/App.tsx` | `One Card, Zero` | 1 | Hero heading line 1 |
| `src/App.tsx` | `Limits. Worldwide.` | 1 | Hero heading line 2 |
| `src/App.tsx` | `See Features` | 2 | Primary black pill CTA button & comment |
| `src/App.tsx` | `How It Works` | 3 | Secondary bordered pill CTA button & comments |
| `src/App.tsx` | `Adaptive Systems` | 6 | Right navbar pill label, ARIA labels & HUD header |
| `src/App.tsx` | `Advanced Bionics` | 5 | Navbar domain tag 1 & state logic |
| `src/App.tsx` | `Cognitive AI` | 3 | Navbar domain tag 2 & type definition |
| `src/index.css` | `#F4F4F6` | 2 | `--nk-pill-gray` token & comment |
| `src/index.css` | `rgba(0, 0, 0, 0.55)` | 1 | `--nk-ink-muted` subtitle opacity token |
