# Customisation & Deployment Guide — Reelmark (`v1.0.0`)

This guide walks you step-by-step through customising the **Reelmark** (*"Captivate Crowds with Snackable Reels"*) single-file landing hero, updating the `1440×1080` soft-mint studio frame, replacing the `5×2` video and poster grid, and deploying the template.

---

## 10 Customisation & Deployment Steps

### Step 1: Open `index.html` Directly or via Static Server
**Reelmark** is packaged in a single self-contained `index.html` file (inline `<style>` and `<script>`, zero framework or build step). Double-click `index.html` or run `npx serve .` to preview.

### Step 2: Update Page Metadata & Google Fonts (`Inter Tight`, `Inter`, `Caveat`)
In the `<head>` of `index.html`, locate:
```html
<title>Reelmark — Captivate Crowds with Snackable Reels</title>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Inter+Tight:wght@700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```
Update the `<title>`, `<meta name="description">`, and Open Graph tags to match your brand.

### Step 3: Adjust Global Frame & Soft Mint Palette Tokens (`:root`)
At the top of `<style>`, `:root` defines the `1440×1080` frame unit `--u` (`min(100vw/1440, 100vh/1080)`) and soft-mint studio palette:
```css
:root {
  --u: min(calc(100vw / 1440), calc(100vh / 1080));
  --bg: #F5F8EF;
  --surface: #FFFFFF;
  --mint: #DAE7C7;
  --green: #08482D;
  --ink: #101410;
  --sub: #5E5E61;
}
```

### Step 4: Customise the Top Bar (`Reelmark`, Nav Links & Auth Pills)
In `<header class="topbar" id="topBar">`:
- Update the leaf SVG mark and wordmark inside `<a href="#main-content" class="logo" id="navLogo">` at `(37, 36)`.
- Edit the 5 navigation links (`Brands`, `Creators`, `Pricing`, `Use Cases`, `Contact`) inside `<ul class="nav" id="navList">` starting at `x = 505` with a `31u` gap (`Inter 16.4u`).
- Edit `#loginBtn` (`92×40` white pill at `(1211, 29)`) and `#signupBtn` (`97×40` forest-green pill at `(1304, 29)`).

### Step 5: Edit the Mint Badge, Two-Line Headline & Three-Line Subline
In `<section class="hero-copy">`:
- Badge (`292×37` at `(575, 115)`): `<div class="badge" id="heroBadge">Trusted by 120,000+ indie makers</div>` (`#DAE7C7` background, `#08482D` text, `16.6u`).
- Headline (`top = 176`, `Inter Tight 700`, `88u / 92u`, `#101410`): `#headlineLine1` (`-0.035em`) and `#headlineLine2` (`-0.022em`).
- Subline (`top = 394`, `Inter 400`, `20.8u / 32u`, `#5E5E61`): update the three `<span class="subline__line">` rows inside `#heroSubline`.

### Step 6: Adjust the Hand-Drawn Doodles & Notes (`Caveat 600`)
- `#doodleSlash` sits at `(263, 377)` with two hand-drawn `#08482D` strokes.
- `#noteBeSeen` (`"Be seen / with clips"`, rotated `16°`) sits at `(1212, 310)` with its curving arrow starting below the text and curling down to the cards.
- `#noteZeroCost` (`"Zero cost"`, rotated `24°`) sits at `(521, 937)` with a small arrow pointing to the CTA button.

### Step 7: Replace the 5×2 Video & Still Poster Grid
In `<script>`, locate `POSTER_URL`, `VIDEO_URL`, and `CLIPS`:
- `POSTER_URL`: `16:9` WebP sheet containing 10 tiles arranged in a `5×2` grid (`384×540` ratio per tile).
- `VIDEO_URL`: `1280×720` (16:9) 5-second muted looping MP4 containing the same `5×2` grid.
- Update the 10 entries in `CLIPS` (row-major order: sneaker, skincare splash, latte pour, headphones, plant shop, florist bouquet, pottery wheel, serum splash, latte top-down, headphones on a stand).

### Step 8: Tune the Curved Cylinder Carousel Geometry & Speed
In `<script>`, `layoutCards()` computes each card's cylinder geometry from its centre offset `t`:
- `PITCH = 196`, `COUNT = 10`, `AUTO_SPEED = 50` (`50u/s` right → left).
- `x = 720 + t * (1 + 0.083 * (t / 706)^2)`, `d = |x - 720| / 706`, `cardW = 170 + 48 * d^2`.
- Edge height `h = 280 + 92 * q^2.6`, vertical centre `687 - 12 * d^2`, rounded quad `clip-path: path(...)` with `15u` corners.

### Step 9: Customise the Primary CTA (`Make a Reel` Pill & Dashed Ring)
In `<div class="cta-ring" id="ctaRing">` at `(626, 901)` (`190×74` dashed `#08482D` outline ring):
- Update `#makeReelBtn` (`172×58` `#08482D` pill) and the interactive `#briefModal` form fields.

### Step 10: Verify Phone Breakpoint (`<= 820px`) & Deploy
Check `@media (max-width: 820px)` (top bar with logo + `Sign up` pill, stacked centred badge, `clamp(38px, 9.2vw, 56px)` headline, subline, `250px`-tall `640`-unit curved carousel band, and bottom `Make a Reel` button + `Zero cost` note), then upload `index.html` to any static host.

---

## 12 AI Prompts for Customer Customisation

1. **Swap the 5×2 Video Sheet for Individual Per-Card MP4 Files:**
   > "In `index.html`, update `CLIPS` to include a dedicated `videoUrl` and `posterUrl` per card, and change `.reel-card__media` inside `layoutCards()` to cover-fit each single `9:16` clip instead of offsetting a `5×2` sheet."
2. **Add an Audio Mute/Unmute Toggle Inside the Reel Spotlight Modal (`#reelModal`):**
   > "In `#reelModal` of `index.html`, add a floating pill button over `.spotlight-viewport` that toggles `spotlightVideo.muted` and updates a speaker SVG icon."
3. **Add Creator Avatar Chips & Star Ratings to Each Carousel Card on Hover:**
   > "In `index.html`, add a top-left frosted pill inside each `.reel-card` showing the creator's name and `★ 5.0` rating from `CLIPS` when hovering the card."
4. **Add a Category Filter Bar Above the Curved Carousel:**
   > "In `index.html`, add compact mint filter pills (`All`, `Skincare`, `Footwear`, `Coffee`, `Tech`, `Craft`) that highlight matching cards in `#carouselStage` and open the corresponding clip in `#reelModal`."
5. **Connect the `#briefForm` Creator Brief Form to Formspree or a Webhook:**
   > "In `index.html`, update the `#briefForm` submit handler to send a JSON `POST` request with `brand`, `style`, and `email` to `https://formspree.io/f/YOUR_FORM_ID` with loading and error states in `#briefStatus`."
6. **Add a Dark Forest Studio Theme Toggle (`#082418` Background):**
   > "In `index.html`, add a theme switch button in `.topbar` that toggles `body.dark-studio`, swapping `--bg` to `#071F14`, `--ink` to `#F5F8EF`, `--mint` to `#133E29`, and `--green` to `#BCE09E`."
7. **Localise All Copy into Vietnamese, Japanese, or French:**
   > "In `index.html`, translate the top navigation, badge, two-line headline, three-line subline, hand-drawn notes, CTA button, and modal text into `[LANGUAGE]` while preserving all `1440×1080` frame coordinates."
8. **Add Keyboard Left/Right Arrow Stepping to the Curved Carousel:**
   > "In `index.html`, add a `keydown` listener on `#carouselBand` so pressing `ArrowLeft` or `ArrowRight` smoothly impulses `velocityU` by `±380` units per second to step one card left or right."
9. **Switch Remote CloudFront Media to Local `./assets/` Files:**
   > "In `index.html`, replace `POSTER_URL` and `VIDEO_URL` with `./assets/media/reels-grid.webp` and `./assets/media/reels-grid.mp4` for offline self-hosted deployment."
10. **Add a Pricing Tier Drawer for `Pricing` in the Top Navigation:**
    > "In `index.html`, create a `#pricingModal` dialog displaying three creator bundle tiers (`Starter Reel · $0 Brief`, `Launch Pack · 3 Clips`, `Studio Retainer · 10 Clips/mo`) and wire the `Pricing` nav link to open it."
11. **Adjust the Cylinder Arch Curvature and Edge Height:**
    > "In `layoutCards()` inside `index.html`, adjust the edge height formula from `280 + 92 * Math.pow(q, 2.6)` to `280 + 120 * Math.pow(q, 2.4)` and increase the vertical arch lift from `12 * d * d` to `20 * d * d`."
12. **Expand Below the 1440×1080 Hero Frame with a How-It-Works Section & Footer:**
    > "Allow vertical scrolling in `index.html` below `#heroFrame` and add a 3-step `How Reelmark Works` section (`1. Post a 60-Second Brief`, `2. Ship or Share Your Product`, `3. Receive Ad-Ready Reels in 48h`) and a forest-green studio footer."
