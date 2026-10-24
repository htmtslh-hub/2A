# Atlas — Small Stories, Vast Oceans (`01 / OCEAN LOG`)

**Atlas** (`atlas`, v1.0.0) is an editorial maritime expedition and oceanographic storytelling template inspired by split-waterline field journals. Built with semantic HTML5, modular CSS3 (`assets/css/style.css`), and vanilla JavaScript (`assets/js/main.js`) — zero frameworks and zero build steps required.

## Quick Start

1. Extract all files (`index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/img/*.webp`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) into a folder, preserving the `assets/` directory structure.
2. Open `index.html` directly in any modern browser or serve it via a local static HTTP server (e.g., `npx serve .`).
3. Follow `CUSTOMISE.md` for the 10-step customisation guide, 12 AI prompts, and verified literal string counts.

## Key Features

- **Split-Waterline Ocean Stage (`01 / OCEAN LOG`):** Full-viewport editorial hero (`940:530` proportional geometry) featuring custom split-level crimson whale & sailboat illustrations (`hero-ocean-01.webp` .. `hero-ocean-03.webp`), top-bar telemetry (`25.2048° N  55.2708° E | ONLINE`), right-hand compass index (`PEOPLE`, `PLACES`, `OCEANS`, `IDEAS`), lower-left bathyal sonar plate (`depth-sonar-thumb.webp`), and interactive vertical depth ruler (`0 m` → `10,000 m`).
- **Scroll Word Illumination (`#journey`):** Word-by-word scroll-linked opacity and vertical lift choreography across a 36-word oceanographic manifesto, paired with interactive depth preset controls (`Surface 18%`, `Twilight 58%`, `Abyss 100%`) and 5 bathymetric strata tabs (`0 m`, `200 m`, `1,000 m`, `4,000 m`, `10,000 m`).
- **Directional Archive Carousel (`#archive`):** Synchronised 3-slide expedition log carousel with wrap-around directional choreography (`2 → 0` forward and `0 → 2` backward), keyboard arrow support, and live hero stage plate switching.
- **Compass Stories with Neon Orbit Border (`#stories`) & Coordinate Modals (`#about`):** Topic-filtered field dispatches (`ALL`, `PEOPLE`, `PLACES`, `OCEANS`, `IDEAS`) with a rotating conic-gradient orbit border on the active card, plus accessible `<dialog>` modals for the coordinate map and field note submission.
