# Camper — Overnight Camp Hero Template

A single-file, full-viewport outdoor & overnight camp hero website built with semantic **HTML5**, proportional **CSS custom properties (`--u`)**, and vanilla **JavaScript** (Web Animations API + three-mode layout engine).

## Highlights

- **1280×960 Proportional Stage Engine (`exact`, `tablet`, `compact`):**
  - `exact` mode (`uw >= 0.874`): cover-scales the `1280×960` moonlit winter camp video background (`#stage`) without letterboxing while scaling all UI tokens proportionally via `--u`.
  - `tablet` mode (`vw >= 600` and `ut >= 0.873`): applies a horizontal crop bias (`0.22 * (1 - visW / DW)`) so the campfire and husky remain framed beside the typography, collapses navigation into a frosted right drawer (`backdrop-filter: blur(16px) saturate(140%)`), and runs `fitHero()` when vertical space is tight.
  - `compact` mode (`vw < 600` or small viewport height): switches to a two-row CSS Grid with `object-position: 72% 50%` and fluid `clamp()` typography, including dedicated landscape-phone rules (`@media (max-height: 520px)`).
- **Google Fonts (`display=block`):**
  - Stacked serif headline (`Overnight` / `Camp`) in **Gelasio 700**.
  - Logo (`700`), navigation (`600`), `Sign up` (`500`), body copy (`400`), and `Explore` CTA (`400`) in **Outfit**.
- **One-Shot Web Animations API Entrance:**
  - Synchronously sets initial states before first paint, waits for `document.fonts.ready` + `#bg` `loadeddata` (raced with a `1000ms` timeout), runs the masked headline reveal (`EXPO`), soft navigation/paragraph rise (`SOFT`), and `Explore` edge wipe (`clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)`), and cleans up all inline styles upon completion (`<= 3500ms`).

## Quick Start

Open `index.html` directly in any modern browser or serve the directory over a static HTTP server:

```bash
npx serve .
```
