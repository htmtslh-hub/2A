# Brief — Sellix — Cross-border finance (`sellix` / `t76`)

- **Product Name:** Sellix — Cross-border finance
- **Slug:** `sellix`
- **Catalog ID:** `t76`
- **Category:** `commerce` (Thương mại điện tử / Cross-border Finance & Crypto-Fiat Payments)
- **Access Tier:** `free`
- **Version:** `1.0.0`
- **Stack:** Single self-contained `index.html` (HTML5 + single `<style>` block with `--u` proportional reference unit + three inline `<script>` blocks, no build step, no external CSS/JS libraries)

## Prompt Specification & Approved Exceptions

1. **Single File Architecture (`index.html`):**
   - Document title: `Sellix — Cross-border finance`, `lang="en"`, `viewport="width=device-width, initial-scale=1, viewport-fit=cover"`.
   - `html, body` height `100%`, `overflow: hidden`, background `#000`.
   - Approved single-file inline exception (`--ngoai-le` in `dong-goi.mjs`): all CSS resides in a single `<style>` block in `<head>` and all JS resides in three inline `<script>` blocks in exact order (Entrance in `<head>`, Burger before video script, Background Video as last element in `<body>`).
2. **Typography (`Plus Jakarta Sans` aliased to `'PJS'`):**
   - Loaded from Google Fonts (`fonts.gstatic.com`) via `@font-face` with `font-family: 'PJS'`, `font-weight: 300 800`, and `font-display: block` so the entrance animation never plays against invisible text.
3. **Proportional Design System (`--u`):**
   - Desktop authored against a `1280×800` reference render using `--u: min(calc(100vw / 1280), calc(100dvh / 760))` and optical offsets `--dx: 8.5`, `--dy: 13.1`.
   - Design-derived breakpoints at `max-width: 1160px` (tablet burger + top-right frosted menu), `max-width: 552px` (mobile fluid subtitle + width-derived `h1` `min(74px, calc((100vw - 44px) / 6.9))` so `Cross-border` never breaks at its hyphen), `max-width: 353px` (stacked CTAs), and `(max-width: 552px) and (max-height: 460px)` (short landscape).
4. **Dual-Video Seamless Loop Background (`#bgVideoA` & `#bgVideoB`):**
   - Exact CloudFront video (`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4`) and WebP poster (`https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp`).
   - Two stacked `<video>` elements (`object-position: 51% 8%`) inside `.bg` (`1280:800` bleed box) cross-fading `0.9s` (`FADE = 0.9`) before the loop point.
5. **One-Shot Self-Detaching Entrance Sequence:**
   - Synchronously adds `html.anim` in `<head>`, waits for `document.fonts.ready` (or `900ms` ceiling), triggers `html.anim.go` (`lineRise`, `logoIn`, `liftIn`, `subIn`/`subInFlat`, `pillIn`), and removes `anim` + `go` when `.btn-ghost`'s `pillIn` animation finishes (`1.67s`, with `2600ms` safety timer).
   - Honours `prefers-reduced-motion: reduce` by skipping `anim`/`go` and pausing `#bgVideoA`/`#bgVideoB` at `currentTime = 0`.
