# Brief — Lauberhorn Ridge Trail Dashboard Hero (`lauberhorn-ridge` / `t95`)

## 1. Overview & Creative Direction
- **Product Name:** Lauberhorn Ridge (`lauberhorn-ridge`)
- **Catalog ID:** `t95`
- **Category:** `commerce` (Alpine Hiking Trail Guide Dashboard Hero & Travel App)
- **Format:** Single-file, one-screen self-contained HTML (`source/index.html`) using plain HTML5, CSS3, and vanilla JavaScript with zero build step and zero external frameworks.
- **Visual Persona:** Bright autumn Swiss alpine travel dashboard for a fictional trail, **Lauberhorn Ridge** (above Interlaken, Switzerland), viewed by signed-in hiker **Mira Holt**. Full-bleed golden larch valley and turquoise glacial lake photography overlaid by a seamless 10-second forward/reverse drone glide video and soft cream glass widgets (`rgba(244, 240, 233, 0.94)` with `14px` backdrop blur).

## 2. Scene Plate & Drone Glide Geometry
- **Background Plate (`1728×1080`, `16:10`):**
  `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4e84f7cd-8250-48e6-8dfa-746b13b73bfb.jpg`
- **Looping Drone Video (`1280×720`, `10s`, H.264 `yuv420p`, muted, loops seamlessly):**
  `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/48d4c209-86b6-4b1c-b972-4f57e3dafe89.mp4`
  - Placed at `width: 111.11%`, `left: -5.556%` inside `.scene-frame` so the `16:10` centre of the `16:9` mirror-padded video aligns pixel-for-pixel with the `1728×1080` plate.
  - Fades in over `0.8s` once its first frame is ready (`loadeddata` / `canplay` / `playing`).
- **Rule:** Nothing in the background scene is drawn or animated in code; only the UI animates.

## 3. 1440×900 Frame Coordinates & Typography
- **Typography:**
  - **Sans:** `Inter Tight` `300` / `400` (`96px` `Inter Tight 300` for `"Lauberhorn Ridge"`, tracking `-0.045em`).
  - **Mono:** `JetBrains Mono` `500`, uppercase, tracking `0.06em` for labels, chips, tabs, and telemetry values; card labels start with a tight `"::"` prefix.
- **Colour Tokens:**
  - Cream glass cards: `rgba(244, 240, 233, 0.94)` + `backdrop-filter: blur(14px)`
  - Inner panels: `#EAE6DE`
  - Ink: `#2E2D2A`
  - Amber: `#F6B733`, light amber: `#FBD06A`
  - Orange pin: `#F59E0B`, violet pin: `#7C6CF2`
  - Zero drop shadows on cards or photos (`box-shadow: none`).
- **Exact Widget Coordinates (`1440×900` frame):**
  1. **Logo tile:** `41×38` at `(15, 14)`, radius `12`, six-spoke asterisk glyph.
  2. **User pill:** `38` tall at `(62, 14)`, radius `12`: `"::"`, `"Mira Holt"` (`18px`), and orange status ring.
  3. **Breadcrumb:** white mono `12.6px` (not uppercase) at `(15, 73)`: `"Back to Explore  Switzerland / Interlaken / Jungfrau Region /"`.
  4. **Title:** `"Lauberhorn Ridge"` at `(20, 86)`, `96px` `Inter Tight 300`.
  5. **Chips:** `32` tall at `(15, 198)`, peach `rgba(248, 232, 205, 0.92)`, radius `9`, `14px` mono: `"4.7 (198 REVIEWS)"` and `"ALPINE LARCH FORESTS"`.
  6. **Search card:** `359×137` at `(15, 462)` (`"Hey, Mira!"` `25px`, `"Interlaken, Switzerland ˄"` `14.5px`, `37`-tall `"SEARCH BY ANYTHING"` field).
  7. **Points of interest card:** `358×215` at `(15, 612)` (`"::POINTS OF INTEREST"`, 16 wavy `#c9c5bc` contour lines, dark winding route, `#7C6CF2` start pin, `#F59E0B` summit pin).
  8. **Photo card:** `336×215` at `(383, 612)`, radius `16`, hiker photo (`8097efdf-745f-4a23-8b33-0bed6ee16bc7.jpg` at `72% 50%`), `38px` white play button (hover `scale(1.08)`), and `"211 Photos"` light amber chip.
  9. **Altitude card:** `387×215` at `(728, 612)` (`"::ALTITUDE"`, `"TOTAL GAIN"` with `"● HIKE"` / `"● DESCENT"`, line chart with `"0 km"`, `"1,25 km"`, `"2,800 m"`, and interactive `"SLOPES"` / `"ALTITUDE"` / `"SEASONS"` / `"TYPES"` tabs).
  10. **Weather card:** `303×380` at `(1126, 12)` (`"::WEATHER"`, `242`-tall gauge panel with `"ENTIRE TRAIL"` pill, `#E7E1D3 → #F8C44C → #F6B12A` semicircle arc, white knobs, white inner progress arc, `"19°"` `74px` centre readout, `"-3°"` / `"Sunny"` / `". 20°"`, and `"WIND"` `"14 km/h"` + `"SUNSET"` `"17:52"` tiles).
  11. **Trail info card:** `303×425` at `(1126, 402)` (`"::TRAIL INFO"`, three `118`-tall stacked panels: `"6.5 km"` `DISTANCE`, `"2.5-3 hr"` `DURATION`, `"350 m"` `ELEVATION GAIN`).
