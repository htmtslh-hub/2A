# Customisation & Deployment Guide — Meadowbell (`v1.0.0`)

This guide walks you step-by-step through customising the **Meadowbell** (*"Hollyoak's Plucky Sprout Squad"*) landing hero, replacing the 9:8 background plate, square loop video, and 3 chapter cards, and deploying the single-file template.

---

## 10 Customisation & Deployment Steps

### Step 1: Open `index.html` Directly or via Static Server
**Meadowbell** is packaged in a single self-contained `index.html` file (inline `<style>` and `<script>`, no framework or build step). Double-click `index.html` or run `npx serve .` to preview.

### Step 2: Update Page Metadata & Fonts (`Grandstander` + `Inter`)
In the `<head>` of `index.html`, locate:
```html
<title>Meadowbell — Hollyoak's Plucky Sprout Squad</title>
<link href="https://fonts.googleapis.com/css2?family=Grandstander:wght@900&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```
Both `@font-face` rules for `Grandstander` (900) and `Inter` (400/500) Latin `.woff2` files and the Google Fonts stylesheet are included at the top of `<style>`.

### Step 3: Adjust Global Frame & Colour Tokens (`:root`)
At the top of `<style>`, `:root` defines the `1440×1280` frame unit `--u` and colour palette:
```css
:root {
  --u: calc(100vw / 1440);
  --white: #ffffff;
  --green: #5b875c;
  --sage-pill: rgba(173, 196, 174, .45);
  --mint-pill: rgba(204, 218, 173, .6);
}
```

### Step 4: Replace the 9:8 Background Plate & Mirror-Padded Loop Video
Inside `<div class="scene__stage">`, update the still image (`2160×1920`) and the looping video (`960×960` rendered with 120/1920 mirror padding top and bottom):
```html
<img class="scene__plate" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/3ca5d10d-ea2f-4907-876f-33bde169469e.jpg" alt="">
<video class="scene__video" id="sceneVideo" autoplay muted loop playsinline preload="auto" poster="...">
  <source src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d2cb5bef-f92b-4e91-ae93-8dc6555e56ac.mp4" type="video/mp4">
</video>
```
If your replacement video has a `9:8` aspect ratio without mirror padding, change `.scene__video` in CSS from `top: -6.25%; height: 112.5%;` to `top: 0; height: 100%;`.

### Step 5: Customise Top Navigation (`Meadowbell`, Sage Pill & `Join us`)
In `<header class="hero__nav">`:
- Update the sprout SVG and studio name inside `<a href="#main-content" class="logo" id="navLogo">` (`(31, 23)`).
- Edit the 4 navigation links (`Farm`, `Gear`, `Chapters`, `Our Crew`) inside `<ul class="nav-pill" id="navPill">` (`546×50` at `(443, 13)`).
- Edit `<button type="button" class="nav-join" id="navJoin">Join us</button>` (`105×45` at `(1311, 14)`).

### Step 6: Edit Kicker, Two-Line Headline & Three-Line Subline
In `<section class="hero__copy">`:
- Kicker (`y = 203`): `<p class="kicker" id="heroKicker">HOLLYOAK'S</p>`
- Headline (`143.5px` on `118px` pitch, `y = 261`): `<span class="headline__line" id="headlineLine1">PLUCKY</span>` and `<span class="headline__line" id="headlineLine2">SPROUT SQUAD</span>`
- Subline (`21.2px / 27px`): update the 3 `<span class="subline__line">` rows inside `#heroSubline`.

### Step 7: Customise Hero CTA Buttons (`Join us` & `Watch preview`)
In `<div class="hero__actions">`:
- `#heroJoin` sits at `(550, 617)` (`144×59`, `#ffffff` pill, `#5b875c` text).
- `#heroPreview` sits at `(707, 619)` (`184×58`, `rgba(204,218,173,.6)` blur pill with rounded play triangle).

### Step 8: Update the Three Chapter Cards (`378×273` at `y = 913`)
In `<div class="chapters__track" id="chaptersTrack">`, update the three `.chapter-card` buttons (`x = 133, 531, 929`) and synchronise their titles, descriptions, and image URLs in the `CHAPTERS` array in `<script>`.

### Step 9: Review Mobile Layout (`<= 820px`)
Verify the mobile breakpoint (`@media (max-width: 820px)`): the `9:8` `.scene__stage` shifts via `left: 18%; transform: translateX(-18%)` to keep the boy and beagle framed, the headline sizes to `51px`, and `.chapters__track` becomes a horizontal touch carousel.

### Step 10: Deploy to Static Hosting
Upload `index.html` to Cloudflare Pages, Vercel, Netlify, GitHub Pages, or any static web server.

---

## 12 AI Prompts for Customer Customisation

1. **Embed Trailer Video Inside the Chapter Preview Modal (`#chapterModal`):**
   > "In `index.html`, replace `<img id=\"modalImage\">` inside `#chapterModal` with an HTML5 `<video controls playsinline>` player that loads each chapter's MP4 preview URL and automatically pauses when `#chapterModal` closes."
2. **Add Chapter Titles & Duration Badges onto the 3 Chapter Cards:**
   > "In `.chapter-card` inside `index.html`, add a bottom-right glass pill displaying `Ch. 01 · 11m`, `Ch. 02 · 12m`, and `Ch. 03 · 11m` in `Inter 500` while keeping the white play triangle `20u` from the bottom-left."
3. **Add a 4th Chapter Card with Horizontal Carousel Controls:**
   > "In `index.html`, add a 4th chapter card (`Chapter 04: Honeycomb Harvest at Orchard Brook`) and add subtle left/right arrow pills next to `browse all chapters ›` to scroll `.chapters__track` smoothly."
4. **Create a Character Bios Drawer for `Our Crew` (`Toby`, `Barnaby`, `Pippa`):**
   > "In `index.html`, when the user clicks `Our Crew` in `#navPill`, open a glassmorphic character sheet showcasing illustrated cards for `Toby`, `Barnaby the Beagle`, and `Pippa` with their favourite farm chores."
5. **Switch Assets to Local `./assets/` Files for Offline Packaging:**
   > "In `index.html`, replace the CloudFront URLs for `.scene__plate`, `#sceneVideo`, and the three `.chapter-card__img` elements with relative paths under `./assets/img/` and `./assets/video/`."
6. **Add Ambient Meadow Audio Toggle in the Top Navigation:**
   > "In `<header class=\"hero__nav\">` of `index.html`, add a translucent pill button beside `Join us` that toggles a gentle looping meadow breeze and birdsong audio track with an animated soundwave SVG icon."
7. **Localise All Copy into Vietnamese or Japanese:**
   > "In `index.html`, add a compact `EN | VI` language switch that translates the navigation links, kicker, headline, subline, buttons, and chapter modal descriptions without reloading the page."
8. **Add Interactive Farm Map Hotspots Over the Hillside Scene:**
   > "In `.hero` of `index.html`, add three subtle pulsing sprout markers over the hillside and valley (`Hollyoak Cottage`, `Clover Ridge`, `Shepherd's Path`) that open the corresponding chapter preview when clicked."
9. **Connect the `#joinForm` Dispatch Form to a Live Webhook / Formspree Endpoint:**
   > "In `index.html`, update the `#joinForm` submit handler to send a `POST` request with the email address in JSON to `https://formspree.io/f/YOUR_FORM_ID`, showing a loading state and error/success feedback in `#joinStatus`."
10. **Add a Seasonal Golden-Hour Sunset Theme Switcher:**
    > "In `index.html`, add a subtle sun/sunset toggle in the header that applies a warm golden-hour colour filter to `.scene__stage` and updates `--green` and `--sage-pill` to autumn harvest tones."
11. **Add Printable Kids' Activity Sheet Download Links to Each Chapter Modal:**
    > "In `.modal-body` of `#chapterModal` in `index.html`, add a secondary pill button `Download Sprout Activity Sheet (PDF)` next to the chapter tabs that links to each episode's printable colouring & gardening guide."
12. **Expand Below the 1440×1280 Hero Frame with a Full Episode Guide Grid:**
    > "Keep the `1440×1280` `.hero` frame intact in `index.html` and add a `#season-1` section below it with a 12-episode filterable grid, character gear showcase, and studio footer."
