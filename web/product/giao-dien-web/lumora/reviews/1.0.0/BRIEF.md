# Brief — Lumora (`lumora` / `t78`)

- **Product Name:** Lumora
- **Slug:** `lumora`
- **Catalog ID:** `t78`
- **Category:** `commerce` (Thương mại điện tử / Mindfulness & Focus App Showcase)
- **Access Tier:** `free`
- **Version:** `1.0.0`
- **Stack:** React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + `lucide-react` (`Menu`, `X`) + Google Font `Instrument Serif` (`ital@0;1`)

## Prompt Specification Summary

1. **Typography (`index.html` & `src/index.css`):**
   - `Instrument Serif` (`ital@0;1`) loaded from Google Fonts and applied to `html, body`.
   - `system-ui, sans-serif` (`.font-system`) used for body text (subtext, buttons, stats, video switcher labels, nav links).
2. **Background Video Layer (`z-0`):**
   - 4 fullscreen looping videos (`autoPlay`, `muted`, `loop`, `playsInline`) stacked absolutely with `transition-opacity duration-1000 ease-in-out` (`opacity-100` active, `opacity-0` inactive) and a `1000ms` cooldown guard (`isTransitioning`):
     1. `Golden Hour`: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4`
     2. `Still Water`: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4`
     3. `Deep Woods`: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4`
     4. `Quiet Dawn`: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4`
3. **Transparent PNG Overlay (`z-[1]`):**
   - URL: `https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png`
   - Continuous `train-bob` animation (`translateY` `0` ↔ `-6px` over `3s ease-in-out infinite`, constant `scale(1.03)`).
4. **Liquid Glass Surface (`.liquid-glass`):**
   - `background: rgba(255, 255, 255, 0.01)`, `background-blend-mode: luminosity`, `backdrop-filter: blur(4px)`, `box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1)`, with `1.4px` `::before` gradient border mask (`mask-composite: exclude`).
5. **Content Layer (`z-[2]`):**
   - **Top Navbar:** Left italic `"Lumora"` logo (`text-xl sm:text-2xl`); right desktop `.liquid-glass` pill with `"How It Works"`, `"Features"`, `"Pricing"`, `"Community"` and solid white `"Get Started"` button; right mobile `.liquid-glass` hamburger with `300ms` `Menu` (`rotate-90 scale-75`) ↔ `X` (`-rotate-90 scale-75` → `0`) crossfade and fullscreen `z-50` overlay (`bg-black/60 backdrop-blur-sm`, staggered `100ms`–`300ms` links, `cubic-bezier(0.4,0,0.2,1)`).
   - **Hero Content:** `.liquid-glass` badge (`"Over 10,000 minds already finding their clarity"`), two-line heading (`"Clarity in an Endlessly"` / `"Noisy Universe"`), subtext, `.liquid-glass` email input pill (`"Your Best Email"` + `"Get Early Access"`, `max-w-[320px] sm:max-w-sm`), and 4-scene video switcher.
   - **Dark Mode for `"Deep Woods"` (index 2):** Transitions hero badge, heading, subtext, input, and video switcher to `#182C41` over `700ms` while keeping navbar and bottom stats white.
   - **Bottom Stats:** `"60+ Deep Sessions"`, `"12,000+ Creators"`, `"4.8 User Satisfaction"`, `"Intentional-First Design"` separated by `|` on `sm+`.
6. **Approved Packaging Exception (`--ngoai-le`):**
   - React 18 + TypeScript + Vite 6 + Tailwind CSS v4 source + prebuilt `built/` bundle.
