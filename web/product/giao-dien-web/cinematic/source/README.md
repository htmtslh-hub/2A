# Cinematic — Movie & Streaming Hero (`v1.0.0`)

**Cinematic** is a full-viewport (`h-screen overflow-hidden`) movie and streaming showcase hero built with React 18, TypeScript, Vite 6, Tailwind CSS v4, and Lucide React icons. It pairs a looping fixed CloudFront background video (`z-0`) and a bottom-masked `backdrop-blur-xl` layer (`z-[1]`, `mask-image: linear-gradient(to top, black 0%, transparent 45%)`) with `.liquid-glass` UI pills, staggered `blurFadeUp` entrance animations (`0ms` to `900ms`), a responsive mobile dropdown menu, and interactive `Previous` / `Next` showcase switching.

---

## Quick Start

1. **Extract the entire archive** (`cinematic.zip`) into a project directory. Keep all files and subfolders intact.
2. **Option A — Run the prebuilt static bundle immediately (no Node build required):**
   Serve the `built/` directory with any static HTTP server (for example VS Code Live Server, `npx serve built`, or `python -m http.server 8080 --directory built`).
   > **Note:** Do not open `built/index.html` directly via `file://` because ES module scripts (`<script type="module">`) require HTTP/HTTPS.
3. **Option B — Full React + TypeScript + Vite development workflow:**
   ```bash
   npm install
   npm run dev
   ```
   To create a production build in `dist/`:
   ```bash
   npm run build
   ```

---

## Included Files

| File / Path | Purpose |
|---|---|
| `index.html` | Root HTML entry loading Google Fonts `Inter` (`300;400;500;600;700`) and mounting `/src/main.tsx` |
| `package.json` / `package-lock.json` | React 18, TypeScript, Vite 6, Tailwind CSS v4, and `lucide-react` dependencies |
| `vite.config.ts` / `tsconfig.json` | Vite bundler (`base: './'`) and strict TypeScript configuration |
| `src/main.tsx` | React DOM root entry |
| `src/index.css` | Tailwind CSS v4 entry, `.bottom-blur-mask`, `.liquid-glass` + `::before` border mask, and `@keyframes blurFadeUp` |
| `src/App.tsx` | Full-viewport video hero, `.liquid-glass` navbar, mobile dropdown, metadata row, title/description, `Watch Now` / `Learn More` CTAs, and `Previous` / `Next` controls |
| `built/` | Pre-compiled static production bundle (`built/index.html` + `built/assets/*`) ready for immediate static hosting |
| `CUSTOMISE.md` | 10 step-by-step customisation guides, 12 ready-to-copy AI prompts, and a verified literal edit map |
| `LICENCE.txt` | Commercial template licence terms |
| `THIRD-PARTY-LICENSES.txt` | Open-source package and remote asset attributions |

---

## Key Features

- **Fixed Video + Bottom Blur Mask (`#hero-video` & `#bottom-blur-overlay`):** Full-viewport `object-cover` video (`z-0`) overlaid by a pure `backdrop-blur-xl` layer (`z-[1]`) masked with `linear-gradient(to top, black 0%, transparent 45%)` — no dark gradient overlay.
- **Reusable `.liquid-glass` Buttons:** Uses `background: rgba(255, 255, 255, 0.01)`, `background-blend-mode: luminosity`, `backdrop-filter: blur(4px)`, `box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1)`, and a `1.4px` `::before` glowing border stroke via `mask-composite: exclude`.
- **Staggered `.animate-blur-fade-up` (`0ms`–`900ms`):** Smooth `1s ease-out forwards` entrance from `opacity: 0; filter: blur(20px); transform: translateY(40px)` across every navbar and hero element.
- **Responsive Mobile Dropdown (`#mobile-menu`):** Animated `Menu` ↔ `X` icon transition (`rotate-180`, `scale-50`, `duration-500 ease-out`) opening a frosted-glass dropdown at `top-[72px]` with staggered link reveals and `< sm` Search/Profile actions.
