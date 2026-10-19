# Aethera (`aethera`) — Brief & Authorized Exceptions (v1.0.0)

## 1. Product Identity & Scope
- **Product Name:** Aethera (`Aethera®`)
- **Slug:** `aethera`
- **Catalog ID:** `t66`
- **Category:** `commerce` (Digital Studio & Platform Showcase)
- **Scope:** Local product directory `web/product/giao-dien-web/aethera/` (`source/`, `aethera.zip`, `README.md`, `reviews/1.0.0/`), live demo mirror `web/public/demos/aethera/`, and storefront registration (`t66`).

## 2. Authorized Exceptions from Default `WEB-STATIC-1` Profile
The product owner's prompt explicitly specifies:
1. **React + Vite + Tailwind CSS + TypeScript Stack:**
   - Built with React 18, TypeScript 5, Vite (`base: './'`), and Tailwind CSS 3.
   - Deliverable `aethera.zip` contains all editable source files (`index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/styles/fonts.css`, `src/styles/theme.css`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`, `THIRD-PARTY-LICENSES.txt`) plus a prebuilt `built/` directory generated from `dist/` (`node_modules` and `dist` excluded).
2. **Typography (`src/styles/fonts.css`):**
   - Display text (headings, logo): `Instrument Serif` (normal + italic) via Google Fonts `@import`.
   - Body text (navigation, descriptions): `Inter` via Google Fonts `@import`.
3. **Animations (`src/styles/theme.css`):**
   - `fade-rise`: `opacity` `0` to `1`, `translateY(20px)` to `0`, duration `0.8s`, `ease-out`.
   - `fade-rise-delay`: `0.2s` delay.
   - `fade-rise-delay-2`: `0.4s` delay.
   - Default-enabled across all browsers (including under OS `prefers-reduced-motion: reduce`), with a `1400ms` finite settlement guard (`data-motion-settled="true"`) so entrance elements never stay hidden.
4. **Looping Video Background (`src/App.tsx`):**
   - Remote MP4 URL (`h264`, `yuv420p`, `1928×1072`, `14.042s`): `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4`.
   - Positioned at `top: '300px'` with `inset: 'auto 0 0 0'` (`z-0`) and vertical gradient overlay `absolute inset-0 bg-gradient-to-b from-background via-transparent to-background`.
   - Custom `requestAnimationFrame` fade-in (`0.5s` at start, `opacity` `0` to `1`), fade-out (`0.5s` before end, `opacity` `1` to `0`), and `ended` event handler (`opacity = 0`, wait `100ms`, `currentTime = 0`, `play()`).
5. **Navigation Bar & Hero Section (`src/App.tsx`):**
   - Logo `"Aethera®"` (`®` as superscript), `text-3xl tracking-tight font-serif text-[#000000]`.
   - Menu items: `Home` (`#000000`), `Studio`, `About`, `Journal`, `Reach Us` (`#6F6F6F`), `text-sm transition-colors`.
   - Navbar CTA: `"Begin Journey"`, `rounded-full px-6 py-2.5 text-sm bg-[#000000] text-[#FFFFFF] hover:scale-[1.03]`.
   - Hero section: `paddingTop: 'calc(8rem - 75px)'`, `pb-40`, centered (`flex flex-col items-center justify-center text-center px-6`).
   - Headline: `"Beyond silence, we build the eternal."` (`text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal font-serif`, `lineHeight: 0.95`, `letterSpacing: '-2.46px'`, `#000000` main text with `#6F6F6F` italic `"silence,"` and `"the eternal."`, `.animate-fade-rise`).
   - Description: `"Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft digital havens for deep work and pure flows."` (`text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#6F6F6F] animate-fade-rise-delay`).
   - Hero CTA: `"Begin Journey"` (`rounded-full px-14 py-5 text-base mt-12 bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] animate-fade-rise-delay-2`), opening a glassmorphic studio inquiry modal on click.
