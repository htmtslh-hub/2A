# Customisation Guide — Targo (Hero + About)

This guide covers customising the **Targo** single-file two-section website (`index.html`), including **10 step-by-step instructions**, **12 copy-paste AI prompts**, and a **literal string reference table**.

---

## 10 Customisation Steps

### Step 1 — Preview Locally
Open `index.html` directly in any modern browser or serve it over a local HTTP server:
```bash
npx serve .
```
No build step, framework, or package installation is required.

### Step 2 — Change the Accent & Background Palette (`index.html`)
In the `<style>` block of `index.html`, search and replace the core palette hex values:
- Page background: `#F2F1F0` (and `#F7F6F8` in the About section gradient)
- Cyan accent: `#15BCDF` (hover `#3fd0ef`, border `#0fa3c2`)
- Heading ink: `#2b3033`
- Nav link ink: `#3a3a3a`
- Body copy grey: `#6b6f72`

### Step 3 — Swap the Typography (`index.html`)
Replace the Google Fonts `<link>` for `Quantico` (`weights 400;700`) in `<head>` and update `font-family: 'Quantico', 'Arial Narrow', sans-serif;` on `body`.

### Step 4 — Replace the Hero Background Video (`#heroVideo`)
Locate `<video id="heroVideo">` inside `<section class="hero-section" id="home">` and replace its `src` attribute with your MP4 URL. The desktop positioning (`top: 0; right: -20%; width: 99%`) and mobile (`<= 700px`: `top: 0; left: -12%; width: 119%`) automatically keep the video uncropped (`object-fit: contain`).

### Step 5 — Customise the Logo & Navbar Links (`#topNavbar`)
- Adjust `.brand-circle` (`38px` `#111` circle) and `.brand-ellipse` (`20×8px` white ellipse rotated `-25deg`) or replace them with your own SVG mark.
- Change the lowercase brand word `<span class="brand-word">targo</span>`.
- Edit the three navigation links (`HOME`, `ABOUT`, `CONTACT US`) in both `.nav-links` (desktop) and `#mobileNavMenu` (mobile).

### Step 6 — Update the 6-Line Staircase Hero Headline (`#heroHeadline`)
Inside `<h1 class="hero-headline" id="heroHeadline">`, update the six `.hero-line` spans:
- Lines 1–3: `SCALING`, `THE`, `PLATFORM`
- Lines 4–5 (`.hero-line--indented`, indented by `min(238px, 28vw)`): `FOR`, `YOUR`
- Line 6 (`.hero-line--indented.hero-line--accent` in `#15BCDF`): `BUSINESS`

### Step 7 — Customise the Chamfered CTA Buttons (`.targo-cta`)
Both `"GET STARTED"` (`#heroGetStartedBtn`) and `"LEARN MORE"` (`#aboutLearnMoreBtn`) share the `.targo-cta` class with `clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))` and the trailing `22×1px` `.targo-cta-line`. Edit their labels or `href` / `data-open-modal` targets directly.

### Step 8 — Edit Section 2 — About Copy (`#about`)
Inside `<section class="about-section" id="about">`, update:
- `<h2 class="about-heading">`: `"ABOUT"` and indented `#15BCDF` `"BUSINESS"`.
- `<p class="about-copy">`: `"Targo builds the testing infrastructure modern teams rely on..."`.

### Step 9 — Replace the About Video & Hue Overlay (`#aboutVideo`)
Update the `src` of `<video id="aboutVideo">` in `.about-right`. The `.about-video-tint` overlay (`background: #15BCDF; mix-blend-mode: hue;`) automatically tints the video to match your accent colour.

### Step 10 — Customise the Interactive QA Pipeline & Audit Modal (`#targoModal`)
Edit the three test suite rows inside `[data-tab-pane="pipeline"]` and the audit request form fields inside `#auditForm` (`#auditRepoInput`, `#auditEmailInput`, `#auditTierSelect`).

---

## 12 Copy-Paste AI Prompts

1. **Rebrand for a Cloud Observability Platform (`VECTRA`):**
   > "In `index.html`, rebrand `targo` to `vectra`, change the 6-line hero headline to `OBSERVING / EVERY / WORKLOAD / ACROSS / YOUR / CLUSTERS`, and update the About paragraph to describe real-time OpenTelemetry tracing and zero-latency alerting."
2. **Switch the Cyan `#15BCDF` Accent to Electric Lime `#84CC16`:**
   > "In `index.html`, replace `#15BCDF` with `#84CC16`, `#3fd0ef` with `#a3e635`, and `#0fa3c2` with `#65a30d`, including the `.about-video-tint` hue overlay and `.targo-cta` glow shadows."
3. **Add Poster Images to Both Videos:**
   > "In `index.html`, add `poster='assets/hero-poster.webp'` to `#heroVideo` and `poster='assets/about-poster.webp'` to `#aboutVideo`."
4. **Connect the QA Audit Form to a Webhook:**
   > "In `index.html`, update the `submit` listener on `#auditForm` to `fetch('https://api.example.com/qa-audit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ org: repo, email, tier }) })` and display the response in `#auditStatus`."
5. **Adjust the Mobile Breakpoint from `700px` to `768px`:**
   > "In `index.html`, change `@media (max-width: 700px)` to `@media (max-width: 768px)` and update `window.innerWidth <= 700` in `syncViewportMode()` to `window.innerWidth <= 768`."
6. **Add `prefers-reduced-motion` Support for Autoplay Videos:**
   > "In `index.html`, check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` inside `tryPlayAll()` and pause `#heroVideo` and `#aboutVideo` when reduced motion is enabled."
7. **Increase the Chamfer Angle on CTA Buttons:**
   > "In `index.html`, update `.targo-cta` `clip-path` from `16px` chamfers to `22px` chamfers (`polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))`)."
8. **Add a 4th Navigation Link (`DOCS`):**
   > "In `index.html`, add a `DOCS` link to `.nav-links` and `#mobileNavMenu` that opens `#targoModal` on the `pipeline` tab."
9. **Customise the Live Telemetry Pill Counter:**
   > "In `index.html`, add a 5-second interval that increments the passed test count in `#telemetryReadout` (`SUITE #804 · 1,420 PASSED · 0 FLAKES`) by 12 specs per cycle."
10. **Convert to Dark Mode Studio Theme:**
    > "In `index.html`, invert the `#F2F1F0` / `#F7F6F8` backgrounds to `#0e1113` / `#14181b`, change `.hero-scrim` to `#0e1113` stops, and update `#2b3033` headings to `#f3f5f7`."
11. **Add Scroll-Triggered Entrance Transitions on Section 2:**
    > "In `index.html`, use an `IntersectionObserver` on `#about` to fade and slide `.about-left` and `.about-right` into view when scrolled past 20% visibility."
12. **Add a Downloadable PDF QA Checklist Link in the Modal:**
    > "In `index.html`, add a secondary link next to `#runSuiteBtn` inside `#targoModal` allowing users to download `targo-qa-benchmark.pdf`."

---

## Literal String Reference Table (`index.html`)

| Literal String | Occurrences | Location / Role |
| :--- | :---: | :--- |
| `targo` | 2 | Navbar `.brand-word` and `aria-label` |
| `SCALING` | 1 | Hero `h1` line 1 |
| `PLATFORM` | 1 | Hero `h1` line 3 |
| `BUSINESS` | 2 | Hero `h1` line 6 (`#15BCDF`) & About `h2` line 2 (`#15BCDF`) |
| `GET STARTED` | 1 | Hero `.targo-cta` button |
| `LEARN MORE` | 1 | About `.targo-cta` button |
| `Targo builds the testing infrastructure modern teams rely on.` | 1 | About section verbatim paragraph |
