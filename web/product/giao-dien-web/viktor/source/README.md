# Viktor. — Creative Portfolio Hero Template

A full-screen creative portfolio hero section built with **React 18**, **TypeScript**, **Vite 6**, **Tailwind CSS v4**, and the **Figtree** Google Font.

## Features

- **Stacked Three-Video Crossfade Background:** Renders three full-screen looping background videos simultaneously (`01 / WATER WAVE`, `02 / GRIDWAVE`, `03 / LIGHT TUNNEL`) with a `1200ms` ease-in-out crossfade, blob preloading via `URL.createObjectURL()`, and a `bg-black/10` overlay at `z-[1]`.
- **Editorial Navbar (`src/components/Navbar.tsx`):** Centered `max-w-[1340px]` navigation with indexed links (`01 / Works`, `02 / Services`, `03 / About`, `04 / Contact`), right-origin `scaleX` hover underline (`.nav-link-underline`), email link (`Davies@gmail.com`), live 24-hour clock (`CUP HH:MM:SS` formatted with `Intl.DateTimeFormat('en-GB')`), and a `420ms` spring-eased CSS Grid (`grid-rows-[0fr]` / `grid-rows-[1fr]`) mobile menu.
- **Interactive Hero Stage (`src/components/Hero.tsx`):**
  - Upper row: Three scene switcher buttons with `.role-link` (`translateX(4px)` on hover) and a pulsing availability badge (`7px` dot with `dotPulse` keyframe, pink `#F598F2` glow on slide 1 and white glow on slides 2–3).
  - Lower row: Monumental `Viktor.` heading (`200px` desktop, `129.6px` tablet, `clamp(68px,21vw,80px)` mobile) with dynamic accent period (`#F598F2` on slide 1, white on slides 2–3), studio statement, and lowercase `start a project` button with a bottom-up `#F598F2` fill hover effect (`.cta-fill-btn`).
- **Scroll-Triggered Spring Reveals & Accessibility:** Triggers `revealUp` and staggered `revealRight` once via `IntersectionObserver` at `0.35` threshold, with full `prefers-reduced-motion: reduce` support and semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`).

## Quick Start

1. **View the Prebuilt Demo Immediately:**
   Open `built/index.html` over any static HTTP server (e.g., `npx serve built`).
2. **Run the Development Server:**
   ```bash
   npm install
   npm run dev
   ```
3. **Build for Production:**
   ```bash
   npm run build
   ```
   The compiled static bundle is emitted to `built/`.
