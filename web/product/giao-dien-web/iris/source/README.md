# Iris — Smart AI Assistant Hero (`v1.0.0`)

Single-file dark-mode landing hero (`index.html`) for **Iris**, a smart AI assistant featuring an interactive 3D robot mascot rendered with **Three.js r169**. The robot's spherical head and body turn toward the cursor, its pupils track pointer movement, its eyes blink naturally every 2.5–6 seconds, and its two floating arms bob up and down.

## Included Files

- `index.html` — Complete self-contained hero page (inline CSS + one `<script type="module">` using Three.js r169 via importmap)
- `CUSTOMISE.md` — 10-step customisation guide + 12 copy-ready AI prompts
- `README.md` — Quick-start instructions and technical overview
- `LICENCE.txt` — Commercial and client website usage licence

## Quick Start

1. Extract `iris.zip`.
2. Serve the folder over any local HTTP server (for example `npx serve .` or `python -m http.server 8080`) or open `index.html` in a modern browser with internet access (for Google Fonts `Figtree`, Three.js r169 on `cdn.jsdelivr.net`, and the two CloudFront `.glb` models).
3. Move your cursor or touch-drag across the hero to watch Iris turn its head, shift its pupils, and bob its floating arms.

## Key Technical Highlights

- **Typography & Palette:** Google Font `Figtree` (`400, 500, 600, 700, 800`), near-black canvas `#0b0b11`, translucent fixed navbar `rgba(18,19,26,0.86)` with `blur(14px)`, `#7c4dff` / `#8f66ff` violet accents, and faint vertical grid lines + top radial vignette overlay (`.hero::after`).
- **Custom Dark Studio PMREM Environment:** Six spherical emissive softboxes (`SphereGeometry(0.5, 32, 16)`) compiled via `PMREMGenerator.fromScene(envScene, 0.02)` for smooth curved reflections with zero square bloom artifacts.
- **3D Robot Mascot (`HEAD_GLB` + 2× `ARM_GLB`):**
  - Normalised head mesh with smoothed spherical vertex normals (`sphereNormals`), custom Fresnel lavender rim shells (`rimMaterial`), procedural tessellated spherical visor (`bezel` + `glass`), procedural depth-independent tracking eyes (`halo`, `ring`, `iris`, `pupil`, `glint`), and glowing violet antenna balls.
  - Built-in procedural geometry fallback (`buildFallbackHead` / `buildFallbackArm`) if either remote GLB is unreachable.
- **Camera View-Offset Layout:** Uses `camera.setViewOffset(...)` inside a `ResizeObserver` to anchor the robot on the right half on desktop (`W * 0.695, H * 0.5 + 8`) and centred above the copy on `<= 860px` mobile screens without distorting perspective.
