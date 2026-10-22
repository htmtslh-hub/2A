# VANGUARD — World-Class Digital Collective

A fullscreen hero landing page for the creative agency **VANGUARD**, built with **React 18**, **TypeScript**, **Tailwind CSS**, **Vite 6**, and **Lucide React**.

## Quick Start

### 1. Run the Prebuilt Static Bundle Immediately
The `built/` directory contains a production-ready static bundle compiled with relative asset paths (`base: './'`). Serve `built/` using any static HTTP server:
```bash
npx serve built
```

### 2. Develop & Rebuild from Source
```bash
npm install
npm run dev
```

To type-check and build the production bundle into `built/`:
```bash
npm run build
```

## Key Features
- **Fullscreen Looping Video Background:** Cover-fitted CloudFront MP4 (`autoPlay`, `muted`, `loop`, `playsInline`) with a subtle directional contrast veil.
- **Display & UI Typography:** `"FSP DEMO - PODIUM Sharp 4.11"` (`font-podium`) for the brand mark, mobile overlay links, and three-line `clamp(2.8rem,8vw,7rem)` hero headline (`Design. / Disrupt. / Conquer.`), paired with **Inter** (`font-inter`) for body copy, navigation, CTAs, and telemetry stats.
- **Staggered Entrance Animations:** `@keyframes fade-up`, `fade-in`, and `scale-in` utility classes under `@layer utilities` with `0.2s` delay increments (`.animate-fade-up` through `.animate-fade-up-delay-4`).
- **Responsive Mobile Menu Overlay:** Fullscreen `bg-black/95 backdrop-blur-sm` mobile menu (`md:hidden`) controlled via React `useState`, featuring staggered inline `transitionDelay` (`i * 80 + 100ms`) and `translateY(20px)` entrance transitions.
- **Interactive Agency Dossier & Brief Modal (15% Creative Boost):** Clicking `SEE OUR WORK`, `GET IN TOUCH`, or any desktop navigation link opens an interactive Selected Works & Project Brief modal with scope selection and live confirmation.

See `CUSTOMISE.md` for 10 step-by-step customisation instructions and 12 copy-paste AI prompts.
