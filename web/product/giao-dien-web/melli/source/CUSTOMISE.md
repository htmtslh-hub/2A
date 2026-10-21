# Customising Melli (`v1.0.0`)

This guide walks through 10 practical customisation steps for `index.html`, followed by 12 copy-ready AI prompts.

---

## 10-Step Customisation Guide

### Step 1 — Update Page Title & Academy Brand Name
In `index.html`, update `<title>Melli — Master 3D Artistry</title>`, `.foot .brand` (`Melli_Motion` / `A 3D motion academy`), and `.badge` (`Made by <b>Melli</b>`).

### Step 2 — Customise Colour Tokens in `:root`
At the top of `<style>`, edit the palette variables:
```css
:root {
  --ink: #0d0b1a;
  --muted: #4a4568;
  --lilac: #e7e3fb;
  --num: #cfc6f6;
  --num-dark: rgba(214,203,255,.55);
  --violet: #5b3bd1;
  --pad: clamp(18px, 3.2vw, 46px);
}
```

### Step 3 — Update Navigation Links & CTAs
In `<nav class="nav">`, update `.nav__links` (`Inside the class`, `Ping us`) and `.nav__cta` (`Buzz in!`), as well as the `.join` buttons in `.hero__side` and `.foot .cta`.

### Step 4 — Edit Hero & Section Copy (`01`, `02`, `03`, `Footer`)
Update the two-line hero `<h1>` (`Imagine your next site / built just like this`), the three numbered sections (`01 Explore this Universe of 3D Motion`, `02 Claim Early Invite`, `03 Study and Build with Us!`), and the footer social links (`YouTube`, `LinkedIn`, `Instagram`, `Facebook`, `Dribbble`).

### Step 5 — Swap the Floral PNG Cutouts & Bokeh Backdrops
Replace the background URLs in `.hero` (`HERO_BG`) and `.s2` (`S2_BG`), and the `src` attributes on `.flower--cosmos`, `.flower--hang`, `.flower--iris`, and `.flower--passion`.

### Step 6 — Tune Flower Scroll Parallax & Rotation Speeds
Adjust `data-speed` and `data-rot` attributes directly on the `<h1>` and `<img class="flower ...">` elements:
- Hero `<h1>`: `data-speed="0.55"`
- `.flower--cosmos`: `data-speed="-0.25" data-rot="8"`
- `.flower--hang`: `data-speed="0.35" data-rot="-6"`
- `.flower--iris`: `data-speed="-0.3" data-rot="10"`
- `.flower--passion`: `data-speed="-0.2" data-rot="-10"`

### Step 7 — Replace the 3D Model (`BEE_GLB`) & Wing Texture (`WING_TEX`)
In `<script type="module">`, update `BEE_GLB` and `WING_TEX` to point to your own CORS-enabled `.glb` and wing image URLs.

### Step 8 — Customise Desktop & Mobile Flight Keyframes
In `DESKTOP_KEYS` and `MOBILE_KEYS`, edit `x` (`-1..1`), `y` (`-1..1`), `s` (scale multiplier), `yaw` (degrees), `pitch`, and `roll` for each of the 5 sections.

### Step 9 — Adjust Wing Beat Frequency & Motion-Blur Copies
In `buildWingsAt(anchor)` and `animate()`, tweak `wingSpecs` (`span: 0.72` / `0.52`), `copies` (`offset: ±0.55, opacity: 0.28`), or `freq = 2 * Math.PI * (17 + tgt.moving * 5)`.

### Step 10 — Tune Lighting & Tone Mapping Exposure
In section `5c`, adjust `renderer.toneMappingExposure = 1.15`, `HemisphereLight(0xf2eeff, 0x7a62c9, 1.3)`, `keyLight` (`0xfff1d6, 2.6`), and `rimLight` (`0xc8b8ff, 2.2`).

---

## 12 AI Prompts for Rapid Customisation

1. **Rebrand to Golden Honey & Warm Cream Palette:**
   > "Update `:root`, `.hero`, `.s1`, `.s2`, `.s3`, and `.foot` in `index.html` from lilac/violet (`#e7e3fb`, `#3a1f8c`) to a warm botanical amber and honey-gold palette (`#fbf6ec`, `#2d1c08`, `#d48817`) while preserving `body.on-dark` contrast on Section 02."
2. **Add an Interactive Early-Invite Waitlist Modal on `#access`:**
   > "When the user clicks any `Buzz in!` link (`.nav__cta`, `.join`), open a frosted-glass modal with name, email, and skill-level inputs plus instant confirmation and `Escape` dismissal."
3. **Add Golden Pollen Trail Particles Behind the Bee:**
   > "Create a lightweight `THREE.Points` particle emitter attached to `flight.position` that spawns 40 glowing golden pollen motes when `tgt.moving > 0.2`, drifting gently downward and fading out over 1.4 seconds."
4. **Add Curriculum Accordion Drawer in Section 01:**
   > "Below `.s1 .copy`, add a compact 3-day syllabus pill toggle (`Day 01: Sculpt & Rig`, `Day 02: Shaders & Wings`, `Day 03: Scroll Choreography`) that expands a clean glass card when clicked."
5. **Self-Host Three.js 0.160.0 & All CloudFront Assets:**
   > "Update the importmap, CSS background URLs, `<img>` sources, `BEE_GLB`, and `WING_TEX` in `index.html` to load from local `./assets/` folders for offline hosting."
6. **Add Subtle Audio Wing-Hum Synthesizer Toggle:**
   > "Add a minimal mute/unmute pill next to `.badge` that uses Web Audio API (`OscillatorNode` + bandpass filter modulated by `tgt.moving`) to synthesize a soft ambient wing hum when enabled by the user."
7. **Respect `prefers-reduced-motion: reduce`:**
   > "Add a `prefers-reduced-motion: reduce` check that disables flower scroll rotation, reduces wing flap amplitude by 75%, and snaps the bee smoothly between keyframes without mid-transition diving."
8. **Add Interactive Click-Loop Barrel Roll on the Bee:**
   > "Listen for `dblclick` on `window` and trigger a smooth 0.8-second `360°` barrel roll offset on `beeRoot.rotation.x`."
9. **Switch Typography to Syne + Plus Jakarta Sans:**
   > "Load `Syne:wght@700;800` for `.hero h1`, `.num`, and `.title`, paired with `Plus Jakarta Sans:wght@400;500;600` for body copy and navigation links."
10. **Add Section Progress Indicator Dots on the Left Edge:**
    > "Add a fixed vertical 5-dot indicator on the left edge (`left: var(--pad), top: 50%`) that highlights the active section (`top`, `about`, `access`, `s3`, `contact`) and scrolls smoothly on click."
11. **Localise All Copy into Vietnamese or French:**
    > "Translate the navigation links, hero headline, three numbered sections, and footer CTA in `index.html` while keeping the exact `<br>` line structure and `clamp()` typography."
12. **Add Student Showcase Reel Lightbox in Section 03:**
    > "Add a `'Watch student reel'` link inside `.s3 .text` that opens a responsive video lightbox modal over the page."
