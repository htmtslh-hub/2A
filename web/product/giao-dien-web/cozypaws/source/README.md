# CozyPaws — Pet Store Fullscreen Hero Template

A viewport-height (`h-screen`, no scroll) pet store hero section built with **React 18**, **TypeScript**, **Vite 6**, **Tailwind CSS v4**, **Lucide React**, and Google Fonts **DM Serif Display** + **Inter**.

## Highlights

- **Three Dedicated Responsive Layouts**:
  - **Desktop (`lg+`)**: Centered `clamp(60px,7.5vw,110px)` `.font-serif-display` heading (`Everything / Your Pets Love`) with staggered `.animate-word-pop` word entrances, left floating `Cozy Cat House ($49.99)` product card, right floating `Watch Product Reviews on TikTok and YouTube` video card, and a 3-column bottom pet showcase (`flex-1` / `flex-[1.265]` / `flex-1`) with `98K+`, `Explore Products`, and `4.6★` overlays.
  - **Tablet (`md` to `lg`)**: `text-7xl` display heading, `160px` / `120px` side cards at `top-[80px]`, and `60vh` / `75vh` / `60vh` bottom pet gallery.
  - **Mobile (below `md`)**: Compact `36px` centered heading, subtitle, `Explore Products` CTA pill, side-by-side product & video cards, `98K+ | 4.6★` stat strip, and 3-column bottom pet trio.
- **Color Palette**:
  - Mint background: `#EFFDF0`
  - Primary dark green: `#1a3d1a` (hover `#2a5a2a`)
  - Orange accent: `#E86A10` (hover `#d45e0d`)

## Quick Start

### 1. View the Prebuilt Bundle Immediately

```bash
npx serve built
```

### 2. Local Development & Rebuild

```bash
npm install
npm run dev
```

To build a fresh static bundle into `built/`:

```bash
npm run build
```

## Customisation

See [CUSTOMISE.md](./CUSTOMISE.md) for instructions on updating the 7 external asset URLs, editing product prices/titles, or modifying the custom CSS keyframe animations.
