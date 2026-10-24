# Brief — Digital Epoch (`digital-epoch` / `t98`)

## 1. Overview & Creative Direction
- **Product Name:** Digital Epoch (`digital-epoch`)
- **Catalog ID:** `t98`
- **Category:** `commerce` (Decentralized Web Foundation & Enterprise Ecosystem Landing Page)
- **Format:** Single-file self-contained HTML (`source/index.html`) using plain HTML5, CSS3, and vanilla JavaScript with zero build step and zero external frameworks.
- **Typography & Palette:**
  - Display font: `'Outfit'` (`400`, `500`, `600`).
  - Sans font: `'Inter'` (`400`, `500`, `600`, `700`).
  - Page canvas `#f9fafb`, white hero shell (`#ffffff`), deep navy ink `#0a1b33`, dark CTA pill `#0a152d`, slate muted `#64748b`.

## 2. Core Architecture & Creative Enhancements (+15–20%)
1. **Main Hero Container & Video Background:**
   - `1400px` max-width, `48px` border radius, `600px` height, subtle border and shadow (`0 40px 100px -20px rgba(0,0,0,0.03)`), underlying `scale(1.05)` looping video (`74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4`).
   - Headline `"Foundation of the / new digital epoch"`, subheadline, and `"Contact Us"` pill button.
2. **Floating Bottom Navbar:**
   - Centered `bottom: 40px` frosted glass pill (`rgba(255,255,255,0.9)` + `blur(24px)`) with circular `"✦"` motion toggle, `"Products"`, `"Docs"`, and `"Get in touch ›"` pill button.
3. **Seamless Marquee Logo Scroller:**
   - Infinite CSS `@keyframes marqueeScroll` (`0 → -50%`), pausing on hover, with left/right edge mask and `8` partner cards (`Procure`, `Shopify`, `Blender`, `Figma`, `Spotify`, `Lottielab`, `Google Cloud`, `Bing`) rendered twice inline with hover gradient fills and inverted white logos.
4. **Interactive Ecosystem Architecture Inspector & Partner Modal (+15–20% Creative Enhancement):**
   - 3-tab infrastructure switcher (`01 Core Protocol`, `02 Builder SDK`, `03 Enterprise Mesh`) updating live TPS, block finality, validator count, and SDK configuration snippet, plus an interactive partner inquiry dialog (`#epochModal`).
