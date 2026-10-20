# securify — Data Security SaaS Fullscreen Hero Template

A fullscreen data-security SaaS landing page hero section built with **React 18**, **TypeScript**, **Vite 6**, **Tailwind CSS v4**, and Google Font **Readex Pro** (weights 300, 400, 500, 600, 700).

## Highlights

- **Fullscreen Looping Background Video**: High-contrast monochrome security visual (`object-cover`, `autoPlay`, `loop`, `muted`, `playsInline`) with a bottom black fade gradient (`h-48 bg-gradient-to-b from-transparent to-black`).
- **Floating Pill-Shaped Navbar**:
  - **Left Pill (`bg-neutral-900/90 backdrop-blur`)**: Custom geometric 4-quadrant white SVG mark (`256×256` viewBox) and lowercase brand label `securify`.
  - **Center Pill (`hidden md:flex bg-neutral-900/90 backdrop-blur`)**: Four lowercase navigation links (`platform`, `solutions`, `company`, `support`) with `hover:text-white` transitions and interactive monochrome architecture drawers.
  - **Right Action Pill**: Solid white `get started` button (`bg-white text-black hover:bg-neutral-200`) launching an interactive zero-knowledge vault provisioning dialog.
- **Giant Staggered Lowercase Typography (`.hero-title`)**:
  - `protect` (`left-4 md:left-10 top-[18%]`)
  - `your` (`right-4 md:right-10 top-[38%]`)
  - `data` (`left-[18%] md:left-[28%] top-[58%]`)
  - Scaled at `text-[14vw] md:text-[13vw]` with `letter-spacing: -0.04em` and `line-height: 0.95`.
- **Three Diagonal-Accent Stat Blocks**:
  - Top-right: `rotate-[20deg]` divider + `+65k` / `startups use`
  - Bottom-left: `+1.5b` + `rotate-[-20deg]` divider / `gb data was protected`
  - Bottom-right: `rotate-[-20deg]` divider + `+300k` / `downloads`

## Quick Start

### 1. View the Prebuilt Bundle Immediately

The `built/` directory contains the compiled static production bundle:

```bash
npx serve built
```

### 2. Local Development & Rebuild

```bash
npm install
npm run dev
```

To create a fresh production bundle in `built/`:

```bash
npm run build
```

## Customisation

See [CUSTOMISE.md](./CUSTOMISE.md) for step-by-step instructions on replacing the background video, editing the staggered headline words, updating the three stat counters, or connecting the `get started` form to your backend.
