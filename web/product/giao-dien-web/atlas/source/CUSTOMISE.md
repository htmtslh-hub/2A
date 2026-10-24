# Customising Atlas — Small Stories, Vast Oceans (`atlas`, v1.0.0)

This guide covers two complete ways to customise **Atlas (`01 / OCEAN LOG`)**:

1. **Method 1 — Manual Step-by-Step Guide (Steps 1–10):** Edit `index.html`, `assets/css/style.css`, and `assets/js/main.js` directly in any code editor (`VS Code`, `Cursor`, `Sublime Text`, or `Notepad`).
2. **Method 2 — AI-Assisted Prompts (Prompts 01–12):** Copy ready-to-paste prompts into `Claude`, `ChatGPT`, `Gemini`, or `Cursor`. Every prompt is written so the AI inspects the real source files and asks you for any missing project details first instead of guessing.

---

## Verified Literal String Map

Every row in the table below is programmatically verified against the shipped source files (`index.html`, `assets/css/style.css`, `assets/js/main.js`):

| File | Exact Literal String | Occurrences | Purpose |
| --- | --- | --- | --- |
| `index.html` | `ATLAS` | 9 | Brand wordmark in top header, page title, meta tags, about section, and footer |
| `index.html` | `Small Stories` | 3 | Hero display headline line 1, page title, and social meta description |
| `index.html` | `Vast Oceans` | 3 | Hero display headline line 2, page title, and social meta description |
| `index.html` | `01 / OCEAN LOG` | 3 | Hero eyebrow kicker, archive log badge, and telemetry reference |
| `index.html` | `25.2048° N` | 8 | Primary latitude coordinate in top bar, sonar card, archive slide, and map dialog |
| `index.html` | `55.2708° E` | 8 | Primary longitude coordinate in top bar, sonar card, archive slide, and map dialog |
| `index.html` | `BEGIN JOURNEY` | 1 | Primary dark rectangular CTA button in the upper-left hero column |
| `index.html` | `EXPLORE MAP` | 1 | Secondary ghost CTA button next to the primary hero button |
| `index.html` | `DEPTH UNKNOWN` | 2 | Lower-left underwater sonar telemetry depth status readout |
| `index.html` | `LIFE EVERYWHERE` | 2 | Lower-left underwater sonar telemetry biological readout |
| `index.html` | `assets/img/hero-ocean-01.webp` | 2 | Primary split-waterline crimson whale and sailboat hero/archive plate |
| `index.html` | `assets/img/hero-ocean-02.webp` | 1 | Log 02 twilight ochre finback and lantern skiff archive plate |
| `index.html` | `assets/img/hero-ocean-03.webp` | 1 | Log 03 abyssal pelagic whale and research yawl archive plate |
| `index.html` | `assets/img/depth-sonar-thumb.webp` | 1 | Lower-left framed underwater cross-section sonar thumbnail |
| `index.html` | `Demo only` | 2 | Explicit static demonstration notices on the field note form and acoustic dispatch |
| `assets/css/style.css` | `--bg-sky: #d8d2c8;` | 1 | Warm overcast parchment sky surface token above the waterline |
| `assets/css/style.css` | `--bg-abyss: #05161f;` | 1 | Primary deep bathyal teal-black background token below the fold |
| `assets/css/style.css` | `--accent-crimson: #b8251e;` | 1 | Crimson whale / red sail editorial accent colour token |
| `assets/css/style.css` | `--accent-cyan: #6ce5f5;` | 1 | Bioluminescent sonar cyan highlight and focus ring token |
| `assets/css/style.css` | `--font-display:` | 1 | Editorial high-contrast serif font stack (`Cormorant Garamond`) |
| `assets/css/style.css` | `--font-mono:` | 1 | Technical monospace telemetry font stack (`JetBrains Mono`) |
| `assets/js/main.js` | `const LOG_SCENES = [` | 1 | Synchronised hero & archive expedition log dataset array |
| `assets/js/main.js` | `25.2048° N` | 4 | JavaScript coordinate entries for Log 01 and waypoint lookup |

---

## Method 1 — 10-Step Manual Customisation Guide

## Step 1: Extract and Open the Project Locally

1. Unzip `atlas.zip` into your working directory. Confirm that the `atlas/` folder contains `index.html`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`, and the `assets/` directory (`assets/css/style.css`, `assets/js/main.js`, and `assets/img/*.webp`).
2. Double-click `index.html` to preview the template via `file://`, or start a local static server from the extracted `atlas/` folder:
   ```bash
   npx serve .
   ```
3. Open your browser DevTools (`F12`) to verify zero console errors and inspect responsive breakpoints (`1440×900`, `820×1180`, `375×812`, `320×740`).

## Step 2: Update the Brand Identity, Page Title, and Meta Tags

1. Open `index.html` and locate the `<head>` block (`lines 6–18`).
2. Update `<title>`, `<meta name="description">`, and `<meta property="og:*">` to match your publication, research vessel, ocean conservation initiative, or studio name.
3. In the `<header class="site-header">` (`lines 25–30`), replace `ATLAS` (`9` occurrences across `index.html`) with your brand wordmark. Keep the leading `<span class="brand__dot" aria-hidden="true"></span>` if you want the signature circular beacon mark.

## Step 3: Customise the Palette and Typography Tokens

1. Open `assets/css/style.css` and locate the `:root` custom properties block (`lines 7–33`).
2. Edit the split-world surface and abyssal tokens:
   - `--bg-sky: #d8d2c8;` — Upper atmospheric sky backdrop.
   - `--bg-abyss: #05161f;` and `--bg-deep: #071d28;` — Underwater bathyal sections.
   - `--accent-crimson: #b8251e;` — Crimson highlight matching the whale and sail.
   - `--accent-cyan: #6ce5f5;` — Sonar cyan indicator for depth stops, focus rings, and orbit borders.
3. To change fonts, update the Google Fonts `<link>` in `index.html` (`lines 20–21`) and edit `--font-display:` and `--font-mono:` in `assets/css/style.css` (`lines 28–29`). Always keep the system serif (`Georgia, "Times New Roman", serif`) and monospace (`Consolas, monospace`) fallbacks so the layout remains stable offline.

## Step 4: Edit the Hero Stage Copy (`01 / OCEAN LOG`)

1. In `index.html`, locate `.hero__editorial` (`lines 87–107`).
2. Edit the eyebrow `<p class="hero__eyebrow" data-hero-eyebrow>01 / OCEAN LOG</p>`, the two-line display heading (`Small Stories` / `Vast Oceans`), and the four-line monospace stanza (`A tiny boat.` .. `The same curiosity.`).
3. Also update the matching Log 01 entry inside `const LOG_SCENES = [` in `assets/js/main.js` (`lines 6–27`) so switching back to Log 01 from the Archive carousel restores your updated hero copy.

## Step 5: Replace the Split-Waterline Ocean Illustrations and Sonar Thumbnail

1. Prepare your replacement WebP images at matching aspect ratios:
   - `assets/img/hero-ocean-01.webp`, `hero-ocean-02.webp`, `hero-ocean-03.webp` (`1880×1060` px, `940:530` aspect ratio, waterline positioned around `53%` from the top).
   - `assets/img/depth-sonar-thumb.webp` (`352×252` px miniature underwater plate).
2. Save the new files over the existing filenames in `assets/img/`, or update the file paths in `index.html` (`lines 79, 137, 297, 319, 341`) and in `const LOG_SCENES = [` inside `assets/js/main.js`.
3. Update the `alt` attributes in both `index.html` and `assets/js/main.js` so screen readers accurately describe your artwork.

## Step 6: Customise the Vertical Depth Ruler (`0 m` → `10,000 m`) and Bathymetric Strata

1. In `index.html`, locate `<aside class="depth-ruler">` (`lines 159–185`) and the `#journey` bathymetric strata tabs (`.strata-tabs` and `.strata-panels`, `lines 222–268`).
2. Each depth stop uses a `data-depth-stop` attribute (`0`, `200`, `1000`, `4000`, `10000`) linked to the corresponding `data-stratum-tab` and `data-stratum-panel` in `#journey`.
3. To change the depth readouts (`DEPTH UNKNOWN`, `LIFE EVERYWHERE`, pressure in `atm`, or species notes), edit the HTML panels in `index.html` and the `DEPTH_INFO` lookup table in `assets/js/main.js`.

## Step 7: Edit the Scroll Word Manifesto (`#journey`)

1. In `index.html`, locate `<p class="scroll-word-passage" data-scroll-words>` (`lines 200–208`).
2. Each word inside the passage is wrapped in `<span class="scroll-word">...</span>`. Words gradually illuminate from muted mist (`opacity: 0.28`) to crisp ivory (`opacity: 1`) as the reader scrolls through `#journey` or clicks the depth presets (`Surface 18%`, `Twilight 58%`, `Abyss 100%`).
3. You can add or remove `<span class="scroll-word">Word</span>` elements freely; `assets/js/main.js` automatically recalculates the word count and illumination thresholds.

## Step 8: Update the Expedition Archive Carousel (`#archive`)

1. In `index.html`, locate `#archive` (`lines 274–384`). The `skill-morge` carousel contains three `<article class="morge-slide">` cards (`data-slide-index="0"` .. `"2"`).
2. Update each slide's title, coordinate badge, scale ratio, narrative paragraph, and image in `index.html`.
3. Mirror the same metadata inside `const LOG_SCENES = [` in `assets/js/main.js` (`lines 6–70`) so the live detail panel (`[data-archive-title]`, `[data-archive-desc]`, `[data-archive-coords]`) and the Hero stage stay synchronised when users click `Prev`, `Next`, or wrap between `03 ↔ 01`.

## Step 9: Edit the Compass Stories & Neon Orbit Cards (`#stories`)

1. In `index.html`, locate `#stories` (`lines 389–495`).
2. Each story card (`<article class="story-card neon-orbit-card">`) has a `data-story-topic` attribute (`people`, `places`, `oceans`, `ideas`) that connects to both the filter pills in `#stories` and the upper-right Hero compass index (`PEOPLE / PLACES / OCEANS / IDEAS`).
3. Clicking any card or filter updates `.is-active`, triggering a smooth 2-turn conic-gradient neon orbit border (`@property --orbit-angle` in `assets/css/style.css`).

## Step 10: Connect the Field Note Form and Deploy

1. In `index.html`, locate the field note `<form>` inside `#field-note-dialog` (`lines 636–676`). By default, it runs in static preview mode (`Demo only — static preview`) and displays a client-side confirmation banner without sending network requests.
2. To connect a live form endpoint (such as Formspree, Basin, or your own API), replace the submit handler in `assets/js/main.js` with a `fetch()` POST call and remove the `Demo only` notice once live submission is verified.
3. Deploy the folder directly to **Cloudflare Pages**, **Vercel**, **Netlify**, **GitHub Pages**, or any S3/Nginx static host. No build command is required; set the publish directory to `.` (the root folder containing `index.html`).

---

## Method 2 — 12 AI-Assisted Customisation Prompts

Copy any prompt below into your AI coding assistant alongside `index.html`, `assets/css/style.css`, and `assets/js/main.js`.

**Prompt 01 — Full Brand & Expedition Re-Theming**
```text
I am customising the Atlas (01 / OCEAN LOG) website template (`index.html`, `assets/css/style.css`, `assets/js/main.js`). Before editing any code, ask me for:
1. My organisation or publication name (to replace `ATLAS`).
2. My primary two-line hero headline (to replace `Small Stories` / `Vast Oceans`).
3. My primary coordinates (to replace `25.2048° N` and `55.2708° E`).
4. My four-line hero stanza and four-line underwater verse.
Once I reply, update every matching occurrence across `index.html` and `assets/js/main.js` while preserving all HTML landmarks, ARIA attributes, and responsive styles.
```

**Prompt 02 — Colour Palette & Split-Waterline Atmosphere**
```text
Inspect the `:root` CSS custom properties in `assets/css/style.css` of my Atlas template. Before making changes, ask me what mood or colour palette I want for:
1. The upper sky/parchment zone (`--bg-sky`, `--bg-sky-soft`, `--ink-sky`).
2. The underwater abyssal sections (`--bg-abyss`, `--bg-deep`, `--bg-card`, `--text-ivory`).
3. The two primary accents (`--accent-crimson` and `--accent-cyan`).
Verify that every updated text/background pair maintains WCAG AA contrast (at least 4.5:1 for body text and 3:1 for large display headings and focus outlines) before writing the updated CSS.
```

**Prompt 03 — Editorial Display & Monospace Telemetry Fonts**
```text
I want to change the typography of my Atlas template (`index.html` and `assets/css/style.css`). First ask me which serif/display font I want for `--font-display` and which monospace or technical sans font I want for `--font-mono`, and whether I want to load them from Google Fonts or local self-hosted `.woff2` files. Then update the `<link>` tags in `index.html` and the font stacks in `assets/css/style.css`, keeping offline system fallbacks intact and ensuring the `Small Stories / Vast Oceans` hero title does not overflow at 1440px, 940px, or 320px viewports.
```

**Prompt 04 — Replacing the 3 Split-Level Hero & Archive Ocean Logs**
```text
Look at `const LOG_SCENES = [` in `assets/js/main.js` and the `#archive` section in `index.html`. Ask me for the titles, coordinates, scale ratios, descriptions, four-line stanzas, and image paths for my 3 expedition logs. Then update both `index.html` and `assets/js/main.js` in sync so the hero stage swapper, archive carousel slides, and live detail panel all display my new logs accurately.
```

**Prompt 05 — Customising the Scroll Word Manifesto (`#journey`)**
```text
Inspect the `#journey` section (`[data-scroll-words]`) in `index.html` and its scroll-linked word illumination logic in `assets/js/main.js`. Ask me for the new manifesto paragraph (around 28 to 45 words) that I want revealed word-by-word on scroll, plus any labels I want for the three preset buttons (`Surface 18%`, `Twilight 58%`, `Abyss 100%`). Then wrap each word of my passage in `<span class="scroll-word">` inside `index.html` and verify that the progress bar and presets work smoothly.
```

**Prompt 06 — Updating the 5 Depth Strata (`0 m` to `10,000 m`)**
```text
Review the vertical depth ruler (`.depth-ruler`) and the 5 bathymetric strata tabs/panels (`0 m`, `200 m`, `1,000 m`, `4,000 m`, `10,000 m`) in `index.html` and `assets/js/main.js`. Ask me whether I want to keep ocean depth stops or adapt the 5 stops to another vertical scale (such as altitude, geological epochs, or project phases), and ask for the metrics for each stop. Then update the ruler buttons, strata tabs, panels, and `assets/js/main.js` depth lookup data in sync.
```

**Prompt 07 — Updating the Compass Stories & Neon Orbit Cards (`#stories`)**
```text
Inspect the `#stories` section and the `.hero__index` (`PEOPLE`, `PLACES`, `OCEANS`, `IDEAS`) in `index.html`, plus the topic filter logic in `assets/js/main.js`. Ask me for the 4 category names and the details of my 4 featured story cards (title, category tag, coordinate/depth metadata, summary, and modal briefing text). Update `index.html` and `assets/js/main.js` while keeping the `neon-orbit-card` rotating border effect on the active card.
```

**Prompt 08 — Customising the Interactive Coordinate Map Dialog (`#map-dialog`)**
```text
Examine `<dialog class="modal" id="map-dialog">` in `index.html` and the waypoint selection handlers in `assets/js/main.js`. Ask me for the 3 waypoint locations (station code, title, coordinates, and depth/status note) that I want featured when visitors click `EXPLORE MAP` or the top-bar coordinate pill. Then update the waypoint buttons in `index.html` and their synchronised log indices in `assets/js/main.js`.
```

**Prompt 09 — Connecting the Field Note Form to a Live Backend**
```text
Inspect `<dialog class="modal" id="field-note-dialog">` in `index.html` and the form submission listener in `assets/js/main.js`. Ask me which form service or API endpoint I want to use (e.g., Formspree, Basin, Web3Forms, or a custom JSON webhook) and what fields I need. Then replace the static demo handler with a real `fetch()` submission, add loading and error states, and remove the `Demo only` disclaimer once live delivery is configured.
```

**Prompt 10 — Adding a Language Switcher or Translating All UI Copy**
```text
I want to translate or localise my Atlas template (`index.html` and `assets/js/main.js`). First ask me which target language (or bilingual switcher) I need and whether technical maritime codes (`01 / OCEAN LOG`, coordinates, and `m` depth units) should remain in international format. Then translate all visible headings, stanzas, buttons, ARIA labels, and JavaScript data structures while maintaining the `lang` attribute on `<html>` and verifying no text overflows on 320px screens.
```

**Prompt 11 — Tuning Motion Timing, Carousel Speed, and Pause Controls**
```text
Inspect the motion systems in `assets/js/main.js` and `assets/css/style.css` (hero entrance, scroll-word illumination, `skill-morge` directional carousel transitions, depth ruler marker tweening, and the `neon-orbit-card` conic border). Ask me which animations I want faster, slower, or more subtle. Ensure that all animations remain finite (settling cleanly with zero infinite background loops after 5 seconds), default to active on initial load, and pause immediately when the user clicks the `Pause motion` / soundwave toggle.
```

**Prompt 12 — Pre-Launch Accessibility, SEO & Deployment Audit**
```text
Perform a pre-launch audit of my customised Atlas template (`index.html`, `assets/css/style.css`, `assets/js/main.js`). First ask me for my production domain URL and canonical social preview image URL. Then:
1. Update canonical, Open Graph, and Twitter tags in `index.html`.
2. Verify there is exactly one `<h1>`, no skipped heading levels (`h1` -> `h2` -> `h3`), no `href="#"` placeholders, and all standalone interactive controls are at least `44x44` CSS pixels.
3. Give me the exact deployment steps for my chosen static hosting provider.
```
