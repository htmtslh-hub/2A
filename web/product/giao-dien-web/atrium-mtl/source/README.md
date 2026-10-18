# ATRIUM MTL — An Archive of Light Cast in Stone (`atrium-mtl`)

**ATRIUM MTL** is an editorial museum and brutalist architectural photography archive landing page built as a single-viewport composition on warm off-white paper (`#f5f4ef`). It combines a floating white header card, oversized uppercase `Archivo` display typography (`An archive / of light / cast in / stone`), a 3-to-6-column opposing infinite mosaic (`14.6s` loop) of cropped monochrome photography and grain-textured primary color tiles (`#ef5d44`, `#fcdd71`, `#9fd5f7`, `#f9f6f1`, `#151515`), a coordinated Web Animations API (WAAPI) load entrance with seamless marquee handoff, and five responsive layout modes (`desk`, `tab-l`, `tab-p`, `mob-l`, `mob`).

## Key Highlights

- **Self-Contained `index.html` Architecture:** Inline `<style>`, inline SVG icons, and vanilla JavaScript with zero build tools or external frameworks.
- **Self-Hosted Variable Fonts:** Includes `assets/fonts/archivo.woff2` (`weight 100–900`, `font-stretch 62%–125%`) and `assets/fonts/inter.woff2` (`weight 100–900`).
- **Dual-Source Mosaic Assets:** Uses the exact CloudFront WEBP + SVG grain URLs in `:root` alongside byte-identical local copies in `assets/img/` for offline resilience.
- **Seamless WAAPI-to-CSS Marquee Handoff:** Orchestrates header drop, line-masked `h1` reveal, and column entrance drift over `2.10s` before handing off to the continuous `14.6s` CSS `@keyframes` marquee (`colDown` / `colUp`), while respecting `prefers-reduced-motion: reduce`.

## Included Files

- `index.html` — Complete self-contained markup, CSS, SVG icons, and JavaScript
- `assets/fonts/archivo.woff2` & `assets/fonts/inter.woff2` — Self-hosted variable fonts
- `assets/img/` — 4 monochrome brutalist WEBP photographs + 1 SVG grain texture
- `assets/css/style.css` & `assets/js/main.js` — Companion token and script reference files
- `CUSTOMISE.md` — 10-step customisation guide with 12 AI prompts and verified edit counts
- `README.md` — Quick-start overview
- `LICENCE.txt` — Commercial and client website usage licence
