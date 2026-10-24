# Brief — Aetheris Voyage (`aetheris-voyage` / `t97`)

## 1. Overview & Creative Direction
- **Product Name:** Aetheris Voyage (`aetheris-voyage`)
- **Catalog ID:** `t97`
- **Category:** `portfolio` (Deep-Space Expedition & AI Production Studio Landing Page)
- **Format:** Single-file self-contained HTML (`source/index.html`) using plain HTML5, CSS3, and vanilla JavaScript with zero build step and zero external frameworks.
- **Typography & Palette:**
  - Heading font: `'Instrument Serif'` (`400` italic, tight tracking `-0.03em` to `-3px`).
  - Body/UI font: `'Barlow'` (`300`, `400`, `500`, `600`).
  - True `#000000` canvas with pure `#ffffff` typography and custom `.liquid-glass` / `.liquid-glass-strong` surfaces (`background-blend-mode: luminosity` + `1.4px` vertical gradient border mask).

## 2. Core Architecture & Creative Enhancements (+15–20%)
1. **Fixed Liquid-Glass Navbar:** `48×48` circular italic `"a"` brand logo, center `.liquid-glass` navigation pill (`Home`, `Voyages`, `Worlds`, `Innovation`, `Plan Launch`, and white `"Claim a Spot"` button), plus an interactive `ORBIT LIVE` wave-bar motion toggle and mobile navigation drawer.
2. **Section 1 — Deep-Space Hero Stage:**
   - `FadingVideo` (`#heroVideo`, `120%` width/height, top-aligned) with `requestAnimationFrame` crossfading (`500ms` fade duration, `0.55s` pre-end fade-out).
   - Announcement badge (`New` + `"Maiden Crewed Voyage to Mars Arrives 2026"`), word-by-word `BlurText` headline (`"Venture Past Our Sky Across the Universe"`), `"Start Your Voyage"` `.liquid-glass-strong` button, `"View Liftoff"` link, two `.liquid-glass` telemetry cards (`34.5 Min`, `2.8B+`), and partner strip (`Aeon`, `Vela`, `Apex`, `Orbit`, `Zeno`).
3. **Section 2 — Capabilities Stage:**
   - Full-viewport `FadingVideo` (`#capVideo`), `"// Capabilities"` kicker, `"Production evolved"` italic heading, and 3 `.liquid-glass` capability cards (`AI Scenery`, `Batch Production`, `Smart Lighting`) with 4 pill tags each.
4. **Section 3 — Interactive Destination Telemetry & Flight Manifest Modal (+15–20% Creative Enhancement):**
   - Interactive orbital sector switcher (`Mars Chryse Planitia`, `Lunar Shackleton`, `Europa Clipper Relay`) updating live Delta-V, Flight Duration, and Open Berths readouts.
   - Accessible 2-tab Flight Manifest & Berth Reservation modal (`#claimModal`) with `Escape` key and backdrop close.
