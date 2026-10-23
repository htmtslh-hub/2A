# Lauberhorn Ridge — Alpine Trail Guide Dashboard Hero

**Lauberhorn Ridge** (`lauberhorn-ridge`, v1.0.0) is a single-file, one-screen hiking trail guide dashboard hero for a fictional Swiss alpine trail above Interlaken, viewed by signed-in hiker **Mira Holt**. Built with plain HTML5, CSS3, and vanilla JavaScript — zero frameworks and zero build steps required.

## Quick Start

1. Extract all 4 files (`index.html`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) into a folder.
2. Open `index.html` directly in any modern browser or serve it via a local static HTTP server (e.g., `npx serve .`).
3. Follow `CUSTOMISE.md` for the 10-step customisation guide, 12 AI prompts, and verified literal string counts.

## Key Features

- **16:10 Valley Scene & Seamless Drone Video Loop:** Full-bleed `1728×1080` golden larch valley photograph overlaid by a `1280×720` (`10s`, H.264 `yuv420p`) forward/reverse drone glide video positioned at `width: 111.11%`, `left: -5.556%` so its centre aligns with the still plate and fades in over `0.8s`.
- **1440×900 Frame Coordinate System (`--u`):** Every widget sits at its exact frame coordinate on desktop (`Logo tile` at `15, 14`, `User pill` at `62, 14`, `Breadcrumb` at `15, 73`, `Title` at `20, 86`, `Chips` at `15, 198`, `Search` at `15, 462`, `Points of Interest` at `15, 612`, `Photo` at `383, 612`, `Altitude` at `728, 612`, `Weather` at `1126, 12`, and `Trail Info` at `1126, 402`).
- **Interactive Telemetry & Trail Modal:** Switch between `SLOPES`, `ALTITUDE`, `SEASONS`, and `TYPES` tabs on the elevation card, click the topographic map pins or location toggle, or open the interactive trail briefing & photo reel dialog (`#trailModalBackdrop`).
- **2.8s Web Animations Entrance & Reduced-Motion Support:** Coordinated entrance timeline with stroke-drawing SVG paths and a `0° → 19°` temperature count-up; under `prefers-reduced-motion: reduce`, the video and entrance animations are disabled cleanly.
