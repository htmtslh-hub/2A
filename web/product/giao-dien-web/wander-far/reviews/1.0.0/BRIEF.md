# Brief — Wander Far (`wander-far`, v1.0.0)

## Summary

Single-file, one-screen travel-booking landing hero for a fictional travel site (*"Wander far. Rest easy."*), built with plain HTML, CSS, and vanilla JS with no framework and no build step.

## Key Requirements

- **Type & Colour:**
  - `Inter Display 700` for the headline (tight tracking `-0.035em`), `Inter 400/500/600` for UI, and mono (`IBM Plex Mono`) for the coordinate.
  - Base `#FEFEFE`, headline ink `#0B0E0C`, text `#222223`, labels `#111313`, muted `#6E7070`, lede `#727274`, hairlines `#E6E6E7`.
  - Fjord navy `#00286E` for the search button; `#0A2A72` for field icons and the active-tab underline.
- **Scaling:**
  - Authored at `1446×1088` with `--u = min(100vw/1446, max(100dvh/1088, .78px))`.
  - Page is one viewport tall on desktop; the photo panel absorbs the spare height.
- **Layout (Desktop):**
  1. **Header row:** Left two-line headline `"Wander far. / Rest easy."` (~`90u`); Right two-line right-aligned grey lede `"Find quiet fjords, cozy cabins, and the slow, wild / mornings you came for, all here in one place."`
  2. **Tabs:** `Stays` (active: semibold + `#0A2A72` underline) · `Flights` · `Experiences`, each with a thin line icon.
  3. **Search bar:** One hairline-bordered panel split into four cells: `Where to? · Molde` | `Dates · Jun 18 – Jun 24` | `Travelers · 3 travelers` | navy `"Search"` button with magnifier icon.
  4. **Photo panel:** Full content width, filling the rest of the screen, square corners, `object-fit: cover`, centred `16:9` still (`https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/bd8d16a6-ac46-4cb8-bf0b-fb8e732ed31a.webp`) + 5s muted looping video (`https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b7e754-022b-4512-9b96-513173cb2e14.mp4`, fades in when ready) + bottom-left white location chip `"Geirangerfjord, Norge"` (semibold) and `"62.10° N"` (mono grey).
- **Motion & Smaller Screens:**
  - One-time CSS entrance (headline lines `0.14s` apart, lede fades up, tabs appear, search panel slides in, button pops last); photo never animates in code; reduced motion disables entrance and video.
  - Smaller screens (`<= 820px`): stacked header/lede/tabs, vertically stacked search cells + full-width navy button, photo panel at least `240px` tall with `object-position: 74%`.
- **Packaging Exception (`--ngoai-le`):**
  - Single-file architecture (`index.html` + `CUSTOMISE.md` + `README.md` + `LICENCE.txt`), registered in `INLINE_PRODUCTS` in `dong-goi.mjs`.
