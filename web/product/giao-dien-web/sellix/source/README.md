# Sellix — Cross-border Finance Hero Template

A single-file, self-contained full-viewport cross-border fintech hero website built with semantic **HTML5**, proportional reference-pixel **CSS (`--u`)**, and vanilla **JavaScript** (zero build step, zero external CSS/JS libraries).

## Highlights

- **1280×800 Reference-Pixel Proportional Scaling (`--u`):**
  - Desktop measurements scale seamlessly via `--u: min(calc(100vw / 1280), calc(100dvh / 760))` with optical hero offsets (`--dx: 8.5`, `--dy: 13.1`).
  - Design-derived breakpoints at `1160px` (tablet with top-right glassmorphic menu), `552px` (mobile fluid measure with `min(74px, calc((100vw - 44px) / 6.9))` headline sizing so `Cross-border` never breaks at its hyphen), `353px` (narrow phones stacked CTAs), and `552px × 460px` (short landscape).
- **Seamless Dual-Video Loop Cross-Fade (`#bgVideoA` & `#bgVideoB`):**
  - Two stacked `<video>` elements cross-fade over `0.9s` (`FADE = 0.9`) before the 10.04-second loop point of the violet dot-matrix Earth render, eliminating any seam or jump.
- **Font-Gated One-Shot Entrance Sequence:**
  - Synchronously arms `html.anim` in `<head>`, waits on `document.fonts.ready` (with a `900ms` ceiling), triggers `html.anim.go` across four choreographed moves (`lineRise`, `subIn`, `pillIn`, `liftIn`/`logoIn`), and detaches all animation classes once `.btn-ghost` completes (`1.67s`).
  - Honours `prefers-reduced-motion: reduce` by holding a static first frame and bypassing all entrance animations and transitions.

## Quick Start

Open `index.html` directly in any modern browser or serve the directory over a local HTTP server:

```bash
npx serve .
```
