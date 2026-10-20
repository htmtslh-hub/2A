# Design Brief — CozyPaws (`cozypaws` / `t80`, v1.0.0)

## 1. Product Overview

**CozyPaws** is a single-page viewport-height (`h-screen`, no scroll) pet store hero section built with React 18, TypeScript, Vite 6, Tailwind CSS v4, and Lucide React icons. It features three responsive breakpoint layouts (`mobile <md`, `tablet md–lg`, `desktop lg+`) controlled via Tailwind visibility classes (`hidden lg:flex`, `hidden md:flex lg:hidden`, `flex md:hidden`), fluid `clamp()` sizing, and a choreographed 100ms–1200ms CSS keyframe stagger sequence.

## 2. Visual & Technical Specifications

- **Fonts**:
  - `Inter` (`400, 500, 600`) for body and UI text.
  - `DM Serif Display` (`400`) via `.font-serif-display` for hero headings (`Everything / Your Pets Love`).
- **Color Palette**:
  - Background: `#EFFDF0` (light mint green)
  - Primary dark green: `#1a3d1a` (hover `#2a5a2a`)
  - Orange accent: `#E86A10` (hover `#d45e0d`)
- **External Assets (`polo-pecan-73837341.figma.site`)**:
  - Logo SVG, Customer Avatar, Cozy Cat House card, TikTok/YouTube Video card, and 3 bottom pet portraits (left, center tallest, right).
- **Responsive Breakpoints**:
  - **Desktop (`lg+`)**: Centered `clamp(60px,7.5vw,110px)` heading, `top-[50px]` left product card (`clamp(160px,14vw,260px)`) and right video card (`clamp(120px,10vw,177px)`), bottom 3-panel flex (`flex-1` / `flex-[1.265]` / `flex-1`) with `98K+`, `Best Products for Your Pet` + `Explore Products`, and `4.6★` overlays.
  - **Tablet (`md–lg`)**: `text-7xl` heading, `160px` / `120px` side cards at `top-[80px]`, and `60vh` / `75vh` / `60vh` bottom images.
  - **Mobile (`<md`)**: `36px` title, subtitle, `Explore Products` button, side-by-side product & video cards, `98K+ | 4.6★` stats row, and 3-panel bottom pet images.
