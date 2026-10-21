# Melli — Master 3D Artistry (`v1.0.0`)

Single-file scroll-driven 3D landing page (`index.html`) for **Melli_Motion**, a 3D motion academy. Built with plain HTML, CSS, and **Three.js 0.160.0** via ES module importmap — featuring a photoreal 3D bumblebee (`BEE_GLB`) with procedurally attached iridescent flapping wings (`WING_TEX` with motion-blur copies) that dives and flies across five full-viewport floral sections (`Hero`, `01`, `02`, `03`, `Footer`).

## Included Files

- `index.html` — Complete self-contained 5-section landing page (inline CSS + one `<script type="module">`)
- `CUSTOMISE.md` — 10-step customisation guide + 12 copy-ready AI prompts
- `README.md` — Quick-start instructions and technical overview
- `LICENCE.txt` — Commercial and client website usage licence

## Quick Start

1. Extract `melli.zip`.
2. Serve the folder over any local HTTP server (for example `npx serve .` or `python -m http.server 8080`) or open `index.html` in a modern browser with internet access (for Google Fonts `Poppins`, Three.js `0.160.0` on `cdn.jsdelivr.net`, and the CloudFront assets).
3. Scroll through the five sections and move your cursor to watch the 3D honeybee dive, bank into turns, beat its glassy wings faster in flight, and settle beside each floral macro element.

## Key Technical Highlights

- **Typography & Palette:** Google Font `Poppins` (`300, 400, 500, 600, 700, 800`), lilac base `#e7e3fb`, deep ink `#0d0b1a`, violet accent `#5b3bd1`, and automatic dark-theme navbar/badge inversion (`body.on-dark`) over Section `02` (`#3a1f8c`).
- **Procedural Iridescent Wings with Motion Blur:** Extracts luminance alpha from `WING_TEX` on a `1024×576` canvas (`alpha = clamp((l - .035) * 4.2, 0, 1) * 255`), brightens RGB channels, and builds mirrored forewings (`span 0.72`) and hindwings (`span 0.52`), each with three phase-offset flap groups (`0` at `0.95` opacity, `±0.55` at `0.28` opacity) beating at `17–22 Hz`.
- **Scroll-Driven Flight Path & Aerodynamic Banking:** Interpolates across 5 desktop or mobile (`< 760px`) keyframes with cubic ease-in-out hold zones (`(f - .12) / .76`), mid-transition dive arcs (`sin(t * PI) * -0.22`), exponential lag (`1 - exp(-dt * 3.2)`), velocity-coupled pitch/roll banking (`YZX` Euler order), and cursor parallax.
