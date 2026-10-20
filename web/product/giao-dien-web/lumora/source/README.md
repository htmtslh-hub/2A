# Lumora — Mindfulness & Focus Cinematic Hero (`v1.0.0`)

**Lumora** is a fullscreen (`h-screen overflow-hidden bg-black`) cinematic hero section for a mindfulness and focus sanctuary built with **React 18**, **TypeScript**, **Vite 6**, **Tailwind CSS v4**, **Lucide React** (`Menu` / `X`), and the **Instrument Serif** (`ital@0;1`) Google Font.

---

## Quick Start

1. **Extract the entire archive** (`lumora.zip`) into a project directory. Keep all files and subfolders intact.
2. **Option A — Run the prebuilt static bundle immediately (no Node build required):**
   Serve the `built/` directory with any static HTTP server (for example VS Code Live Server, `npx serve built`, or `python -m http.server 8080 --directory built`).
   > **Note:** Do not open `built/index.html` directly via `file://` because ES module scripts (`<script type="module">`) require HTTP/HTTPS.
3. **Option B — Full React + TypeScript + Vite development workflow:**
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
| `index.html` | Root HTML entry loading Google Fonts `Instrument Serif` (`ital@0;1`) and mounting `/src/main.tsx` |
| `package.json` | React 18, TypeScript, Vite 6, Tailwind CSS v4, and `lucide-react` dependencies |
| `vite.config.ts` / `tsconfig.json` | Vite bundler (`base: './'`, `outDir: 'built'`) and strict TypeScript configuration |
| `src/main.tsx` | React DOM root entry |
| `src/index.css` | Tailwind CSS v4 entry, `Instrument Serif` typography defaults, `.liquid-glass` + `::before` border mask, and `@keyframes train-bob` |
| `src/App.tsx` | 4-video crossfading background (`z-0`), continuous `train-bob` PNG overlay (`z-[1]`), `.liquid-glass` navbar & mobile menu, `#182C41` Deep Woods dark text transition, email pill, scene switcher, and bottom stats (`z-[2]`) |
| `built/` | Pre-compiled static production bundle (`built/index.html` + `built/assets/*`) ready for immediate static hosting |
| `CUSTOMISE.md` | 10 step-by-step customisation guides, 12 ready-to-copy AI prompts, and a verified literal edit map |
| `LICENCE.txt` | Commercial template licence terms |
| `THIRD-PARTY-LICENSES.txt` | Open-source package and remote asset attributions |

---

## Key Features

- **Four-Video Crossfading Background (`z-0`):** Stacks four fullscreen looping ambient reels (`Golden Hour`, `Still Water`, `Deep Woods`, `Quiet Dawn`) with a `1000ms ease-in-out` opacity crossfade and a `1000ms` transition cooldown guard.
- **Continuous `train-bob` PNG Overlay (`z-[1]`):** Full-viewport transparent foreground frame (`scale(1.03)`) gently oscillating between `translateY(0)` and `translateY(-6px)` over `3s ease-in-out infinite`.
- **Reusable `.liquid-glass` Surfaces:** Uses `background: rgba(255, 255, 255, 0.01)`, `background-blend-mode: luminosity`, `backdrop-filter: blur(4px)`, `box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1)`, and a `1.4px` `::before` gradient border mask (`mask-composite: exclude`).
- **Scene-Synced `#182C41` Dark Text Mode on "Deep Woods" (Index 2):** Selecting the third scene (`Deep Woods`) smoothly transitions the hero badge, heading, subtext, email input, and scene switcher to `#182C41` over `700ms` while keeping the top navbar and bottom stats bar crisp white.
