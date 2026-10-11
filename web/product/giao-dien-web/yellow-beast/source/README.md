# The Yellow Beast 1.0.0

A high-octane, bespoke luxury automotive showroom landing page inspired by the 2018 Porsche 911 Turbo S Exclusive Series.

## Open
Extract the ZIP archive and open `index.html` in any web browser. It runs natively through `file://` and static HTTP without build tools, packages, or backend dependencies.

## Included
- Core files: `index.html`, `assets/css/style.css`, `assets/js/main.js`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`.
- High-resolution WebP imagery in `assets/img/`:
  - `hero-stage.webp`: Dynamic hero composition matching the concept design.
  - `view-side.webp`: Sleek aerodynamic side profile.
  - `view-front.webp`: Aggressive front fascia with twin carbon racing stripes.
  - `view-inside.webp`: Bespoke GT sports cockpit with golden stitching and tachometer.
  - `thumb-side.webp`, `thumb-front.webp`, `thumb-inside.webp`: Perspective selector thumbnails.
  - `detail-engine.webp`: 3.8L VTG twin-turbo flat-six engine.
  - `detail-wheel.webp`: PCCB ceramic brakes with center-lock wheel.
  - `crest.webp`: Stuttgart heritage crest emblem.

## Working Interactions
- **3-Angle Perspective Switcher**: Switch between Side profile, Front view, and Cockpit interior with smooth directional transitions and thumbnail active borders.
- **Scroll-Triggered Telemetry & Counter Animations**: Performance stats (0-100 km/h in 2.9s, 607 HP, 330 km/h, 750 Nm) count up as the user scrolls into view.
- **Interactive Tachometer**: Click "REV ENGINE" to rev the analog instrument needle up to 7,200 RPM with dynamic throttle acoustics.
- **Synthetic Flat-6 Exhaust Simulator**: Uses the Web Audio API to synthesize boxer engine rumble and throttle blips in-browser with zero external audio assets.
- **Bespoke Colorway Configurator**: Preview Golden Yellow Metallic, Guards Red, GT Silver, and Jet Black with dynamic ambient glow response.
- **Motion Toggle**: Motion starts enabled by default across all browsers (including Edge and Cốc Cốc) per product owner requirements, with an explicit user pause control for the active session.
- **VIP Pre-Order Form**: Interactive reservation form with input validation and instant chassis confirmation reference generator.

## Customisation
Read `CUSTOMISE.md` for the exact edit map, step-by-step workflow, and 12 copy-ready AI prompts.
Modify root color tokens in `assets/css/style.css` (`--gold`, `--bg-dark`) to change the showroom branding. Replace WebP images in `assets/img/` to showcase different supercar models.

## Licence
Commercial licence terms are provided in `LICENCE.txt`.
