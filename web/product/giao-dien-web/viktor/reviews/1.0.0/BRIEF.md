# Brief — Viktor. (`viktor` / `t74`)

- **Product Name:** Viktor. — Creative Portfolio
- **Slug:** `viktor`
- **Catalog ID:** `t74`
- **Category:** `portfolio` (Blog/portfolio)
- **Access Tier:** `free`
- **Version:** `1.0.0`
- **Stack:** React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Lucide React (`package.json`) + Google Font `Figtree` (`400`, `500`, `600`)

## Prompt Specification Summary

1. **Setup:**
   - Font: `Figtree` (`400`, `500`, `600`) from Google Fonts loaded in `index.html`.
   - Custom Tailwind breakpoints (max-width based):
     - `mobile`: max `809.98px`
     - `md-tablet`: min `810px`, max `1199.98px`
   - CSS variable: `--ease-spring: cubic-bezier(0.16, 1, 0.3, 1)`.
2. **Video Background:**
   - Three full-screen looping videos (`muted`, `autoPlay`, `playsInline`, `loop`, `aria-hidden="true"`) stacked absolutely with crossfade switching (`opacity-100` vs `opacity-0`, `transition-opacity duration-[1200ms] ease-in-out`).
   - Exact CloudFront URLs:
     1. `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4` (`01 / WATER WAVE`)
     2. `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4` (`02 / GRIDWAVE`)
     3. `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4` (`03 / LIGHT TUNNEL`)
   - Preloading: On mount, fetch all videos as blobs and create object URLs (`URL.createObjectURL`) for instant playback, falling back to original URL on failure.
   - `bg-black/10` overlay sits above videos at `z-[1]`.
3. **Navbar (`src/components/Navbar.tsx`, absolute `z-10`):**
   - Centered container `max-w-[1340px]`, `py-9 px-[15px]` (`md-tablet:py-[30px] md-tablet:px-[18px]`, `mobile:py-6 mobile:px-[18px]`).
   - Left side: `01 / Works`, `02 / Services`, `03 / About`, `04 / Contact` (`text-[8px] leading-3 tracking-[-0.08px]` index, `text-xs leading-4 tracking-[-0.12px]` label, `.nav-link-underline` right-origin `scaleX` hover underline).
   - Right side: `Davies@gmail.com` and live 24h clock `CUP HH:MM:SS` via `Intl.DateTimeFormat('en-GB')`.
   - Mobile (`<810px`): Desktop nav hidden, replaced by `Menu`/`Close` toggle and CSS Grid `grid-rows-[0fr]` / `grid-rows-[1fr]` (`420ms` spring ease) panel with `text-[28px] leading-8 tracking-[-0.84px]` links.
4. **Hero Content (`src/components/Hero.tsx`, `z-[2]` relative):**
   - Container `max-w-[1340px]`, full height, flex column, `justify-end items-end gap-[150px] pt-[190px] px-[15px]` (`mobile:justify-end mobile:items-start mobile:gap-[72px] mobile:pt-[140px] mobile:px-[18px]`).
   - Upper row: `flex-[4]` left column with `01 / WATER WAVE`, `02 / GRIDWAVE`, `03 / LIGHT TUNNEL` switcher buttons (`.role-link` `translateX(4px)` on hover) and `flex-1` right column with pulsing `7px` dot (`dotPulse`, `#F598F2` pink glow on slide 1, white glow on slides 2–3) + `"Available for work"`.
   - Lower row (`pb-[60px]`): `flex-[2]` left column with `"Viktor."` (`text-[200px] leading-[81%] tracking-[-6px]` desktop, `129.6px` tablet, `clamp(68px,21vw,80px)` mobile) with `#F598F2` pink period on slide 1 and white on slides 2–3 (`revealUp`); `flex-1 pl-[50px]` right column with bio paragraph and `"start a project"` button (`.cta-fill-btn` `::before` `#F598F2` fill-up hover, `revealRight` with `0.08s` button delay), triggered once via `IntersectionObserver` at `0.35` threshold.
5. **Packaging Exception (`--ngoai-le`):**
   - React + TypeScript + Vite 6 + Tailwind CSS v4 source + prebuilt `built/` bundle (`16` files total in `viktor.zip`).
