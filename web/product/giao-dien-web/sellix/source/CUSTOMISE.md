# Customisation Guide — Sellix (`v1.0.0`)

This guide walks you through customising **Sellix — Cross-border finance** in 10 steps, followed by 12 copy-ready AI prompts and a counted literal edit map.

---

## 10-Step Customisation Walkthrough

1. **Change the Document Title (`index.html`):**
   Update `<title>Sellix — Cross-border finance</title>` inside `<head>` to your fintech or payments brand title.
2. **Replace the Dual-Video Crossfade Background (`#bgVideoA` & `#bgVideoB`):**
   Update the `<source src="...">` URL and `poster="..."` attribute on **both** `#bgVideoA` and `#bgVideoB` inside `.bg`, and revise the `.bg` `aria-label` description.
3. **Update the Brand Wordmark (`.logo`):**
   Edit `<a class="logo" href="#">Sellix</a>` inside `<header class="nav">` to display your company name.
4. **Edit Primary & Mobile Navigation Links (`.nav-links` & `#menu`):**
   Update the five navigation anchors (`Products`, `Pricing`, `Developers`, `Resources`, `Contact Sales`) and their `href` targets in both `<nav class="nav-links">` and `<nav class="menu" id="menu">`.
5. **Customise the `Login` Action (`.btn-login` & `#menu`):**
   Update the `href` and label on `<a class="btn btn-login" href="#login">Login</a>` and the matching `<a href="#login">Login</a>` inside `#menu`.
6. **Configure `Get Started` CTAs (`.btn-nav-start`, `.m-start`, `.ctas .btn-primary`):**
   Update the `href` and label across all three `Get Started` buttons (desktop navbar, mobile menu, and hero primary button).
7. **Update the Two-Line Masked Headline (`h1`):**
   Edit `<span class="ln"><span class="ln-i">Cross-border</span></span>` and `<span class="ln"><span class="ln-i">finance</span></span>` inside `.hero-inner h1`. Keep the two `.ln > .ln-i` wrappers intact so the `lineRise` entrance mask works as designed.
8. **Rewrite the Subtitle Copy (`.sub`):**
   Replace the three lines separated by `<br>` inside `<p class="sub">`. On desktop and tablet, `<br>` preserves the 3-line editorial measure; below `552px`, `.sub br { display: none }` automatically flows the copy cleanly.
9. **Adjust Color & Surface Tokens (`:root`):**
   In `:root`, customize `--ink`, `--ink-muted`, `--panel`, `--white-btn`, `--btn-ink`, `--glass-fill`, and `--glass-line`, or change the focus-ring color `#a78bfa` on `a:focus-visible, button:focus-visible`.
10. **Tune Crossfade Duration or Optical Offset (`:root` & Video Script):**
    Adjust `--dx: 8.5` and `--dy: 13.1` in `:root` to nudge the optical center of `.hero-inner`, or modify `var FADE = 0.9;` in the third inline `<script>` to change the loop crossfade window between `#bgVideoA` and `#bgVideoB`.

---

## 12 Copy-Ready AI Prompts

1. **Rebrand for a Global Treasury & FX Platform:**
   > "In `index.html`, rebrand `Sellix` to `Kinetix Pay`, change the two-line `h1` to `Programmable` / `treasury`, and update `.sub` to describe multi-currency IBAN accounts, instant stablecoin settlement, and automated FX hedging."
2. **Change Glass CTA & Focus Accent to Emerald:**
   > "In `index.html`, update `:root` so `--glass-fill` is `rgba(4, 24, 18, .78)` and `--glass-line` is `rgba(52, 211, 153, .22)`, and change the `:focus-visible` outline color from `#a78bfa` to `#34d399`."
3. **Add a Contact Sales Modal Dialog:**
   > "In `index.html`, add an accessible glassmorphic modal dialog that opens when `.btn-ghost` or any `Contact Sales` link is clicked, with fields for Work Email, Company Name, Monthly Volume, and Message."
4. **Add a Live Currency & Settlement Ticker Pill Above `h1`:**
   > "Insert a compact glass badge above `h1` in `.hero-inner` displaying `USDC · EURC · USD · EUR · GBP — Instant T+0 Settlement` scaled with `--u`, and animate it with `pillIn` at `0.08s`."
5. **Localise All Visible Copy into Vietnamese:**
   > "Translate the navigation links, `h1` lines, `.sub` copy, and CTA buttons in `index.html` into Vietnamese while keeping all classes, IDs, and `--u` proportional sizing intact."
6. **Switch Headline Font to Space Grotesk:**
   > "In `index.html`, load `Space Grotesk` (`500`, `700`, `font-display: block`) from Google Fonts and apply it to `h1` and `.logo` while keeping `'PJS'` for navigation, `.sub`, and buttons."
7. **Adjust Video Framing Focal Point:**
   > "In `index.html`, change `.bg-video` `object-position` from `51% 8%` to `50% 50%` so a centered 16:9 background video aligns symmetrically at all aspect ratios."
8. **Add an Interactive API Code Preview Drawer:**
   > "When `Developers` is clicked in `.nav-links` or `#menu`, open a slide-over code panel showing a sample `POST /v1/payouts` cURL and Node.js snippet with a copy-to-clipboard button."
9. **Increase Crossfade Overlap for Longer Ambient Videos:**
   > "In `index.html`, change `.bg-video` transition from `opacity .9s linear` to `opacity 1.5s linear` and update `var FADE = 0.9;` to `var FADE = 1.5;` in the third `<script>` block."
10. **Add Keyboard Shortcut `M` to Toggle Mobile Menu:**
    > "In the second `<script>` block of `index.html`, allow pressing `m` or `M` (when no input is focused and viewport width is `<= 1160px`) to toggle `#menu`."
11. **Add Subtle Hover Lift on Primary Hero CTA:**
    > "In `index.html`, update `.btn-primary:hover` to `background: #fff; transform: translateY(calc(-1.5 * var(--u)));` so the primary CTA lifts gently on pointer hover."
12. **Connect All Navigation & CTA Links to Production Routes:**
    > "Update the `href` attributes in `index.html` so `Products`, `Pricing`, `Developers`, `Resources`, `Contact Sales`, `Login`, and `Get Started` point to `/products`, `/pricing`, `/docs`, `/resources`, `/contact`, `/login`, and `/signup`."

---

## Counted Literal Edit Map

| File | Literal String | Count | Purpose |
| :--- | :--- | :---: | :--- |
| `index.html` | `Sellix — Cross-border finance` | 1 | Document `<title>` |
| `index.html` | `Sellix` | 2 | `<title>` brand prefix & `.logo` text |
| `index.html` | `Cross-border` | 2 | `<title>` & `h1` first masked line |
| `index.html` | `Accept payments, manage and custody your assets with ease,` | 1 | Opening line of `.sub` paragraph |
| `index.html` | `Get Started` | 3 | `.btn-nav-start`, `.m-start`, and `.ctas .btn-primary` |
| `index.html` | `Contact Sales` | 3 | `.nav-links`, `#menu`, and `.ctas .btn-ghost` |
| `index.html` | `Login` | 2 | `.btn-login` and `#menu` login link |
| `index.html` | `#a78bfa` | 1 | `:focus-visible` outline color |
| `index.html` | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4` | 2 | `#bgVideoA` and `#bgVideoB` `<source>` URLs |
| `index.html` | `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp` | 2 | `#bgVideoA` and `#bgVideoB` `poster` URLs |
