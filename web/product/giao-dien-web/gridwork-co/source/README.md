# Gridwork Co — Create-Account Onboarding Hero

A single-file, one-screen **create-account onboarding hero** (`index.html`) for the fictional botanical & creative freelance marketplace **Gridwork Co**, built with plain HTML, CSS, and vanilla JavaScript with zero framework or build step.

## Highlights
- **Artboard-Proportional Scale (`1447×1087`):** Fluid `--u = clamp(0.7px, min(100vw/1447, 100vh/1087), 2.4px)` unit system pairing a `55%` sunlit greenhouse photo card on the left with a centred `432u` form column on the right.
- **Greenhouse Photo & Seamless Loop Video:** High-resolution greenhouse photo (`1356×1528`) overlaid by a muted `10s` forward-and-reverse camera orbit loop (`1020×1150`) that fades in (`0.8s`) once its first frame is ready.
- **Top-Left `61u` 4×4 Corner Tile Pattern:** Page-coloured (`#FDFEFD`) cut-out at `(0,0)` with rounded edge notches and six frosted glass tiles (`rgba(255,255,255,0.5)`, `8u` blur) at `(2,0)`, `(3,1)`, `(0,2)`, `(2,2)`, `(1,3)`, and `(3,3)`.
- **Interactive `2×3` Tool Selection Grid:** Six real app icons (**Figma**, **Framer**, **Adobe XD**, **Webflow**, **Relume**, and **Canva**) with sage `#ECF2EC` fill, `2u` `#1D4A35` border, and round checkbox toggle (`Figma`, `Webflow`, and `Relume` pre-selected).
- **2s Web Animations Entrance & Responsive Single-Screen Layouts:** Started after `document.fonts.ready` (disabled under `prefers-reduced-motion: reduce`), with single-screen layouts for desktop (`1440×960`), tablet portrait (`820×1180` 3-column grid), and phone (`375×812` / `320×740` 3-line clamped quote + compact horizontal 2-column tool cards).

## Quick Start
Open `index.html` directly in any modern browser or serve the folder over HTTP:
```bash
npx serve .
```
See `CUSTOMISE.md` for 10 customisation steps, 12 AI prompts, and the literal string reference table.
