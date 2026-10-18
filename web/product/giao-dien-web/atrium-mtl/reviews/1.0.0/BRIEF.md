# Brief — ATRIUM MTL (`atrium-mtl`, v1.0.0)

## 1. Product Identity & Positioning

- **Product ID / Slug:** `t53` / `atrium-mtl`
- **Category:** `portfolio` (Editorial Museum & Brutalist Architecture Archive)
- **Version:** `1.0.0`
- **Target Buyer:** Architectural museums, brutalist archives, photography retrospectives, cultural foundations, and contemporary art galleries seeking a single-viewport editorial showcase with an infinite opposing mosaic and WAAPI entrance choreography.

## 2. Visual & Interactive Specification

1. **Floating White Header Card (`.hdr`):**
   - Rounded bottom corners (`22px`), subtle border (`rgba(15,15,14,.08)`) and elevation shadow.
   - Utility strip (`40px`) with two direct `tel:` links (`House of Brutalism : 418 / 838-6000` and `Studio Exhibitions : 418 / 838-6001`), vertical rule, five Useful links (`Programmes`, `Events`, `Photo-prints`, `Visits`, `Help preserve`), and a `39×39` `#e8e7e2` search button.
   - Main row with `ATRIUM MTL` (`Archivo` 900, `31px`, `85%` stretch) + `AN ARCHIVE OF LIGHT CAST IN STONE` subtitle, main navigation (`Installations` + `24px` circle arrow, `Interviews`, `Photographs`, `Menu` burger), and black pill `Tickets` (`116×63`, radius `22px`) + `64×64` circle ticket icon.
2. **Left Editorial Hero (`.hero`):**
   - Four-line `Archivo` 900 uppercase headline (`80px`, `75.3px` line-height, `-0.06em` tracking, `1.1px` stroke): `An archive / of light / cast in / stone`.
   - Body copy highlighting `Annual Photography Retrospective, autumn 2026`.
   - Dual CTAs: `Tickets` pill + circle icon and `Installations` link with `32px` circle arrow.
3. **Right 3-to-6-Column Infinite Mosaic (`.grid`) & WAAPI Load Entrance:**
   - 6 columns (`x3`, `x2`, `x1`, `c1`, `c2`, `c3`), 5 cells per column cloned once in JS for a seamless `-50%` loop over `14.6s` (`colDown` / `colUp`).
   - Four CloudFront monochrome brutalist WEBP photographs with exact numeric crops (`.f-sculpt`, `.f-man`, `.f-visit`, `.f-sil`) + solid primary color blocks (`#ef5d44`, `#fcdd71`, `#9fd5f7`, `#f9f6f1`, `#151515`) overlaid with SVG fractal-noise grain.
   - 2.10s WAAPI entrance choreography handing off seamlessly to the CSS marquee at `T0 + 2100ms`.
