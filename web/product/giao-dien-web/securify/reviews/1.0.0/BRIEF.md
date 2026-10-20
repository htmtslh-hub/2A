# Design Brief — securify (`securify` / `t79`, v1.0.0)

## 1. Product Overview

**securify** is a fullscreen data-security SaaS landing page hero section built with React 18, TypeScript, Vite 6, and Tailwind CSS v4. It pairs a looping fullscreen monochrome background video with floating translucent `bg-neutral-900/90 backdrop-blur` navbar pills, giant staggered lowercase `Readex Pro` display words (`protect`, `your`, `data`), and three diagonal-divider telemetry stat blocks (`+65k startups use`, `+1.5b gb data was protected`, `+300k downloads`).

## 2. Visual & Technical Specifications

- **Typography**:
  - Google Font `Readex Pro` (weights `300, 400, 500, 600, 700`).
  - `body`: `font-family: 'Readex Pro', system-ui, -apple-system, sans-serif; background: #000; color: #fff; antialiased`.
  - `.hero-title`: `letter-spacing: -0.04em; line-height: 0.95;`.
  - All copy strictly lowercase.
- **Color Palette**:
  - Pure black (`#000000`), pure white (`#ffffff`), `neutral-900/90` (`rgba(23, 23, 23, 0.9)`), and white opacity variants (`white/40`, `white/70`, `white/90`, `neutral-300`, `neutral-200`). Zero purple or indigo.
- **Layout & Components**:
  - `<section className="relative h-screen w-full overflow-hidden bg-black">`
  - Fullscreen `<video>` (`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4`, `autoPlay loop muted playsInline`).
  - Top `<nav>` (`absolute z-20 px-6 md:px-10 pt-6 top-0 left-0 right-0 flex items-center justify-between gap-4`):
    - Left brand pill (`bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3`) with custom `256×256` SVG mark + `securify`.
    - Center nav pill (`hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2`) with `platform`, `solutions`, `company`, `support`.
    - Right CTA button (`bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors`) labeled `get started`.
  - Foreground wrapper (`relative h-full w-full`):
    - Staggered `<h1>` words (`text-[14vw] md:text-[13vw] font-medium`):
      - `protect` at `left-4 md:left-10 top-[18%]`
      - `your` at `right-4 md:right-10 top-[38%]`
      - `data` at `left-[18%] md:left-[28%] top-[58%]`
    - Description paragraph (`left-6 md:left-10 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90`): `"we can guarding your data with utmost care, empowering you with privacy everywhere"`
    - Top-right stat block (`right-6 md:right-24 top-[14%]`): `rotate-[20deg]` divider + `+65k` / `startups use`
    - Bottom gradient overlay (`h-48 bg-gradient-to-b from-transparent to-black`)
    - Bottom-left stat block (`left-6 md:left-20 bottom-20 md:bottom-24`): `+1.5b` + `rotate-[-20deg]` divider / `gb data was protected`
    - Bottom-right stat block (`right-6 md:right-20 bottom-16 md:bottom-20`): `rotate-[-20deg]` divider + `+300k` / `downloads`
