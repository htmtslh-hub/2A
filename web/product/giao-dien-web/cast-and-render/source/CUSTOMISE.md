# Customising Cast & Render (`v1.0.0`)

This guide covers 10 practical customisation steps for `index.html`, followed by 12 copy-ready AI prompts.

---

## 10-Step Customisation Guide

### Step 1 — Update Studio Title & Header Wordmark
In `index.html`, edit `<title>Cast &amp; Render — 3D Object Studio</title>` and `.mark` inside `<header class="chrome">`.

### Step 2 — Adjust Editorial Palette & Custom Properties
Edit `:root` in the `<style>` block:
```css
:root {
  --fg: #0d0c0b;
  --fg-soft: rgba(13, 12, 11, .64);
  --fg-faint: rgba(13, 12, 11, .42);
  --shade: #f2f0ec;
  --rule: rgba(13, 12, 11, .16);
  --ease: cubic-bezier(.22, .61, .36, 1);
  --pill-bg: #0a0908;
  --pill-fg: #ffffff;
}
```

### Step 3 — Replace the All-Intra Background Video URL
In the `<script>` IIFE, update `VIDEO_URL`:
```js
var VIDEO_URL = "https://your-cdn.example.com/studio-reel-all-intra.mp4";
```
For instant frame-accurate scroll scrubbing, encode with `-g 1` (all-intra keyframes).

### Step 4 — Edit the Three Scroll-Scrubbed Panel Headlines & Sublines
Inside `<main class="panels">`, update the three `<section class="panel" data-panel>` blocks (`eyebrow`, `h1`, `.sub`, and `.cta .pill`).

### Step 5 — Tune Scroll Cue Windows & Dead Zones
Adjust `CUES` and `DRIFT` in `<script>`:
```js
var CUES = [
  [0.00, 0.00, 0.15, 0.23],
  [0.35, 0.43, 0.57, 0.65],
  [0.77, 0.85, 1.10, 1.20]
];
var DRIFT = 22;
```

### Step 6 — Adjust Scroll Track Length
Edit `.track` in `<style>` (`height: 560vh; min-height: 3200px;`) to make the full video scrub faster or slower.

### Step 7 — Tune Background Veil & SVG Turbulence Grain
Modify `.veil` gradient stops and `.grain` (`opacity: .13`) to match brighter or darker video footage.

### Step 8 — Customise the Footer Address & Hours
Edit `<footer class="foot">112 Render Lane &nbsp;&middot;&nbsp; Tue–Sun, 9am till sold out</footer>`.

### Step 9 — Edit the Chapter Scrubber Bar (`.scrub-hud`)
Update the frame counter total (`241`) in `paint()` and the three `[data-scrub-target]` buttons (`01 Queue`, `02 Mesh`, `03 Surface`).

### Step 10 — Customise the Studio Sheet Modal (`#studioModal`)
Update the three panes (`data-sheet-pane="board"`, `"visit"`, `"order"`) inside `#studioModal` with your own 3D deliverables, studio specs, and brief options.

---

## 12 AI Prompts for Rapid Customisation

1. **Switch to Dark Obsidian Editorial Theme:** "Invert `:root` variables and `.veil` gradients in `index.html` to a dark obsidian palette (`#0c0c0e` background, `#f4f2ed` ink) while keeping `.pill` high-contrast."
2. **Add a 4th Scroll Panel:** "Add a fourth `<section class='panel' data-panel>` for 'Lighting & Lookdev' and update `CUES` in `<script>` into 4 non-overlapping scroll windows across `0..1`."
3. **Connect Brief Form to a Webhook:** "Update `briefForm` submit handler in `index.html` to POST JSON (`topology`, `shader`, `format`, `email`) to a custom endpoint with loading and error states."
4. **Add Keyboard Left/Right Arrow Frame Stepping:** "Allow pressing `ArrowDown`/`ArrowRight` and `ArrowUp`/`ArrowLeft` when the modal is closed to step the page scroll by 1/241 of `.track`."
5. **Customise Preloader Bar & Typography:** "Widen `.bar` to `220px` and display both percentage and downloaded megabytes in `#bootPct` during `preload()`."
6. **Add Sound Design Toggle Pill:** "Add a muted-by-default ambient studio hum toggle button in `.chrome` using Web Audio API."
7. **Self-Host Video & Fonts for Offline Kiosk Mode:** "Update `VIDEO_URL` to `./assets/reel.mp4` and replace Google Fonts `Inter Tight` with local `@font-face` declarations."
8. **Expand Morning Board with 6 Mesh Cards:** "Add two more `.mesh-card` items (`05 Bronze Knot`, `06 Ceramic Arch`) to `[data-sheet-pane='board']` with custom `data-scrub-jump` ratios."
9. **Adjust Video Scrub Easing:** "Make the video scrub feel heavier or snappier by tuning `seekAt += gap * 0.115` in `frame()`."
10. **Localise into Vietnamese or Japanese:** "Translate the navigation links, 3 panel headlines, footer, scrubber bar, and modal sheets while preserving responsive `clamp()` sizing."
11. **Add Timecode HUD Overlay:** "Format `#scrubReadout` as `SMPTE 00:00:00:00` based on `seekAt` at 24fps."
12. **Add Wireframe Comparison Toggle:** "Add a button in `.scrub-hud` that toggles a subtle CSS high-contrast blueprint filter on `#clip`."
