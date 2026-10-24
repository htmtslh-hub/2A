# Aetheris Voyage — Deep-Space Expedition & AI Production Landing Page

**Aetheris Voyage** (`aetheris-voyage`, v1.0.0) is a single-file, dark-mode cinematic aerospace and AI production landing experience built with plain HTML5, CSS3, and vanilla JavaScript — zero frameworks and zero build steps required.

## Quick Start

1. Extract all 4 files (`index.html`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) into a folder.
2. Open `index.html` directly in any modern browser or serve it via a local static HTTP server (e.g., `npx serve .`).
3. Follow `CUSTOMISE.md` for the 10-step customisation guide, 12 AI prompts, and verified literal string counts.

## Key Features

- **Dual rAF-Crossfading Video Stages (`FadingVideo`):** Smooth `requestAnimationFrame` opacity crossfade (`500ms` fade-in, `0.55s` pre-end fade-out, `100ms` reset delay) across both full-viewport stages (`#heroVideo` at `120%` top-centered and `#capVideo` at `100%` cover).
- **Authentic Liquid Glass Surface System:** `.liquid-glass` (`blur(4px)`) and `.liquid-glass-strong` (`blur(50px)`) with `background-blend-mode: luminosity` and a `1.4px` `180deg` specular gradient border mask (`mask-composite: exclude`).
- **Word-by-Word `BlurText` Hero Entrance:** Staggered `Instrument Serif` italic words (`Venture Past Our Sky Across the Universe`) animating from `blur(10px)` + `translateY(36px)` through `blur(5px)` + `translateY(-4px)` to crisp focus.
- **Interactive Destination Telemetry & Flight Manifest Modal (+15–20% Creative Enhancements):** Live orbital sector switcher (`Mars Chryse Planitia`, `Lunar Shackleton`, `Europa Clipper Relay`), session motion pause/resume HUD (`ORBIT LIVE`), and a 2-tab reservation/telemetry modal (`#claimModal`).
