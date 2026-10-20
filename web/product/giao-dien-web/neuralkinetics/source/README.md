# NeuralKinetics — Minimal Black-and-White Video Hero (`v1.0.0`)

**NeuralKinetics** is a full-screen (`min-height: 100vh`) minimal black-and-white hero section landing page built with **React 19**, **TypeScript**, **Vite 6**, **Framer Motion** (`motion/react`), **Lucide React** (`Plus` icon), **plain CSS** (no Tailwind), and the **Inter** typeface (`300`, `400`, `500`, `600`) from Google Fonts.

---

## Quick Start

1. **Extract the entire archive** (`neuralkinetics.zip`) into a project directory. Keep all files and subfolders intact.
2. **Option A — Run the prebuilt static bundle immediately (no Node build required):**
   Serve the `built/` directory with any static HTTP server (for example VS Code Live Server, `npx serve built`, or `python -m http.server 8080 --directory built`).
   > **Note:** Do not open `built/index.html` directly via `file://` because ES module scripts (`<script type="module">`) require HTTP/HTTPS.
3. **Option B — Full React 19 + TypeScript + Vite development workflow:**
   ```bash
   npm install
   npm run dev
   ```
   To create a production build in `built/`:
   ```bash
   npm run build
   ```

---

## Included Files

| File / Path | Purpose |
|---|---|
| `index.html` | Root HTML entry loading Google Fonts `Inter` (`300;400;500;600`) and mounting `/src/main.tsx` |
| `package.json` | React 19, TypeScript, Vite 6, `motion` (`motion/react`), and `lucide-react` dependencies |
| `vite.config.ts` / `tsconfig.json` | Vite bundler (`base: './'`, `outDir: 'built'`) and strict TypeScript configuration |
| `src/main.tsx` | React 19 DOM root entry |
| `src/index.css` | Plain CSS design system, mobile-first layout, `768px` desktop breakpoint, and modal/drawer styles |
| `src/App.tsx` | Full-viewport video hero, fixed navbar, bottom gradient footer, staggered `motion/react` animations, and interactive drawers/modals |
| `built/` | Pre-compiled static production bundle (`built/index.html` + `built/assets/*`) ready for immediate static hosting |
| `CUSTOMISE.md` | 10 step-by-step customisation guides, 12 ready-to-copy AI prompts, and a verified literal edit map |
| `LICENCE.txt` | Commercial template licence terms |
| `THIRD-PARTY-LICENSES.txt` | Open-source package and remote asset attributions |

---

## Key Features

- **Minimal Black-and-White Layout with Full-Viewport Background Video:** White canvas (`#ffffff`), flex column with `justify-content: space-between`, fixed navbar (`z-index: 50`, `pointer-events: none` on nav, `auto` on children), centered `80% × 80%` mobile / `100% × 100%` desktop (`768px+`) background video (`z-index: 0`), and bottom footer (`z-index: 30`) over a white fade-up gradient (`linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.8) 50%, transparent 100%)`).
- **Precision Navbar (`#nk-navbar`):** Custom SVG logo (two rotated rounded rectangles at `-35deg`, black fill) + `"NeuralKinetics"` brand text, black pill `"Menu"` button with white circle containing a `Plus` icon (`size={12}`, `strokeWidth={3}`), light gray (`#F4F4F6`) `"Advanced Bionics"` / `"Cognitive AI"` tags pill, and right-side `"Adaptive Systems"` pill with a 4-dot grid SVG icon.
- **Choreographed `motion/react` Entrance (`[0.16, 1, 0.3, 1]`):** Navbar slides down (`y: -16 -> 0`, `0.8s`), video scales and fades in (`scale: 1.05 -> 1`, `1.8s`), and footer wrapper (`delay: 0.5s`), subtitle (`delay: 0.6s`), two-line heading (`delay: 0.8s`), and CTA buttons (`delay: 1.0s`) rise into place.
- **Interactive Drawers, Telemetry Readout & Modals (+15% Enhancement):** Includes an expandable `"Menu"` directory drawer, `"Adaptive Systems"` live telemetry & video pause/resume popover, live architecture readout pill synced to `"Neuromorphic"`, `"AGI"`, and `"Cybernetics"`, plus interactive `"See Features"` (with multi-currency spot calculator) and `"How It Works"` (3-stage walkthrough + card reservation) dialogs.
