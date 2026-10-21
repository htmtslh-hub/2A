# Customisation & Deployment Guide — Eclipsio (`v1.0.0`)

This guide walks you step-by-step through customising the **Eclipsio** (*"Launch a Personal Brand That Outshines Every Résumé"*) one-screen landing hero, updating the eclipse background plate and video, editing the partner logo marquee, and deploying the single-file site.

---

## 10 Customisation & Deployment Steps

### Step 1: Open `index.html` Directly or via Static Server
**Eclipsio** is packaged in a single self-contained `index.html` file (inline `<style>` and `<script>`, no framework or build step). Open `index.html` in any modern browser or run `npx serve .` to preview.

### Step 2: Update Page Title & Google Fonts (`Inter` + `Poppins`)
In the `<head>` of `index.html`, locate:
```html
<title>Eclipsio — Launch a Personal Brand That Outshines Every Résumé</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:wght@600&display=swap" rel="stylesheet">
```
`Inter` (variable `100..900`, including `750` for the headline) is used across the UI, while `Poppins 600` styles the partner-logo names inside `.logo-strip`.

### Step 3: Tune Reference Unit `--u` & Solar-Orange Palette (`:root`)
At the top of `<style>`, `:root` controls the `1448×1086` scaling unit and colour tokens:
```css
:root {
  --u: min(calc(100vw / 1448), calc(100dvh / 1086));
  --black: #000000;
  --white: #ffffff;
  --sub: #bcbcbe;
  --peach: #f7c69b;
  --orange: #ee7f20;
  --orange-top: #f28a2a;
  --orange-bot: #ec7a1c;
}
```

### Step 4: Replace the Eclipse Background Plate & Mirror-Padded Video
Inside `<div class="eclipse-layer">`, update the `1448×1086` still WebP plate and `1280×720` looping MP4 video:
```html
<img class="eclipse-plate" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b4b7e033-b082-4f09-8ec4-2fabca30c4b4.webp" alt="">
<video class="eclipse-video" id="eclipseVideo" autoplay muted loop playsinline preload="auto" poster="...">
  <source src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/48106c12-33c9-4cea-9780-4a080477405e.mp4" type="video/mp4">
</video>
```
Because the video was mirror-padded `241/1448` on each side (`1448 + 482 = 1930`), `.eclipse-video` uses `aspect-ratio: 1930 / 1086` at the same height (`calc(1086 * var(--u))`) as `.eclipse-plate` (`aspect-ratio: 1448 / 1086`).

### Step 5: Edit the Top Navigation (`Eclipsio`, 4 Links & `Start Creating`)
In `<header class="nav-zone anim-nav">`:
- Update the rounded `"U-n"` stroke SVG mark and `"Eclipsio"` brand text (`27.8u`, `left: 68u`).
- Edit `Work`, `Showcase`, `Members`, and `Journal` (`16.25u`, `42.6u` apart) in both `#navLinks` and `#mobileDropdown`.
- Update the white `Start Creating` button (`right: 62u`).

### Step 6: Customise the Warm-Glass Badge (`43.9u`)
In `<div class="badge anim-badge" id="heroBadge">`, edit `"Shine Your Name Brighter Tonight"`. The lower-left orange rim and top hairline sheen are defined on `.badge` and `.badge::before`.

### Step 7: Update the Two-Line Headline & Subline
In `<section class="hero-copy">`:
- Headline (`78.8u / 81u`, weight `750`): edit the two `.headline__line` spans (`"Launch a Personal Brand That "` and `"Outshines Every Résumé"`).
- Subline (`22.6u / 36u`, `.031em` tracking, `#bcbcbe`): edit the two `.subline__line` spans.

### Step 8: Customise the Hero Buttons (`55.4u` tall, `14u` apart)
In `<div class="cta-row">`:
- `#heroCreateBtn`: filled orange gradient pill (`#f28a2a → #ec7a1c`) with a hairline white border.
- `#heroSamplesBtn`: `#050507` pill with a grey-to-burnt-orange gradient border (`::before`).

### Step 9: Edit the Frosted-Glass Logo Strip (`892×56u`, `46s` Marquee)
In `<section class="logo-strip anim-strip" id="logoStrip">`, update the five fictional partner logos (`Layers`, `Circooles`, `Quotient`, `Hourglass`, `Catalog`). Always keep both `.marquee-group` blocks identical so the `46s` `-50%` loop has no seam.

### Step 10: Deploy to Static Hosting
Upload `index.html` to Cloudflare Pages, Vercel, Netlify, GitHub Pages, or any static host.

---

## 12 AI Prompts for Customer Customisation

1. **Add Live Domain Availability Checker Inside `#createModal`:**
   > "In `index.html`, enhance `#createForm` inside `#createModal` with a real-time domain badge (`eclipsio.site/your-name` + `.com` custom domain toggle) and instant visual availability pills as the user types."
2. **Add Interactive Portfolio Preview Cards Inside `#samplesModal`:**
   > "In `#samplesModal` of `index.html`, expand `.sample-box` into a 2-card visual preview grid with live theme badges, lighthouse score pills (`100 Performance`), and a `Clone This Layout` button."
3. **Add a Pricing Tier Comparison Drawer (`Creator Free` vs `Solar Pro`):**
   > "In `index.html`, add a `Pricing` link to `#navLinks` and `#mobileDropdown` that opens a dark warm-glass modal comparing `Creator Free ($0)` and `Solar Pro ($12/mo)` with monthly/annual billing switch."
4. **Replace Partner Marks in `.logo-strip` with Custom SVG Studio Badges:**
   > "In `index.html`, update both `.marquee-group` lists inside `#marqueeTrack` with five new fictional design-collective icons and `Poppins 600` names while keeping the `46s` seamless loop."
5. **Convert CloudFront Eclipse Plate & Video to Local `./assets/` Paths:**
   > "In `index.html`, replace the CloudFront URLs on `.eclipse-plate` and `#eclipseVideo` with `./assets/eclipse-plate.webp` and `./assets/eclipse-loop.mp4`."
6. **Add a Subtle Interactive Cursor Corona Spotlight on Desktop:**
   > "In `index.html`, add a subtle radial amber glow (`rgba(238,127,32,.08)`) that follows the mouse cursor across `.hero` on desktop pointers and disables automatically under `prefers-reduced-motion: reduce`."
7. **Add a Language Switcher (`EN / VI / FR`) in the Top Navigation:**
   > "In `.nav-bar` of `index.html`, add a compact glass pill language toggle next to `Start Creating` that switches all navigation labels, badge copy, headline, subline, and modals between English and Vietnamese."
8. **Connect `#createForm` to a Live Waitlist Webhook / Formspree Endpoint:**
   > "In `index.html`, update the `#createForm` submit listener to send the requested handle and email via `fetch` POST to `https://formspree.io/f/YOUR_ENDPOINT` with loading and success states."
9. **Add Keyboard Shortcut (`Press C to Start Creating`) Hint to the Badge:**
   > "In `index.html`, add a subtle `<kbd>C</kbd>` keycap badge inside `#heroBadge` and a global `keydown` listener (when no input or modal is focused) that opens `#createModal` when `c` is pressed."
10. **Add a Blue-Corona ('Lunar Cyan') Theme Variant Toggle:**
    > "In `index.html`, add a theme switcher in the header that shifts `--orange`, `--peach`, and the `.eclipse-layer` hue-rotate filter between `Solar Amber` and `Lunar Cyan`."
11. **Add Sound Design Toggle for Subtle Solar Ambience:**
    > "In `index.html`, add a mute/unmute icon pill in `.nav-bar` that plays a gentle ambient space drone using the Web Audio API when enabled by the visitor."
12. **Extend Below the One-Screen Hero into a Multi-Section Landing Page:**
    > "Allow vertical scrolling in `index.html` while keeping `.hero` at `100dvh`, and add three dark warm-glass sections below (`#work`, `#showcase`, `#journal`) with scroll-triggered reveal animations."
