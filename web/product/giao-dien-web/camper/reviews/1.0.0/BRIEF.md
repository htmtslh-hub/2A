# Brief — Camper — Overnight Camp (`camper` / `t75`)

- **Product Name:** Camper — Overnight Camp
- **Slug:** `camper`
- **Catalog ID:** `t75`
- **Category:** `commerce` (Thương mại điện tử / Outdoor & Overnight Camp Showcase)
- **Access Tier:** `free`
- **Version:** `1.0.0`
- **Stack:** Single standalone `index.html` (HTML5 + CSS custom properties + vanilla JS with Web Animations API and 3-mode layout engine)

## Prompt Specification Summary

1. **Single File Output (`index.html`):**
   - Title: `Camper — Overnight Camp`, `charset="utf-8"`, `viewport="width=device-width, initial-scale=1, viewport-fit=cover"`, `theme-color="#0b1a2b"`.
   - `html, body` height `100%`, `overflow: hidden`, background `#0b1a2b`, antialiased text.
   - Exact CloudFront video `<video id="bg">` (`1280×960`, `object-fit: cover`, `object-position: 50% 58%`):
     `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261005_115704_e1b28e05-aef1-477c-924b-0c1d4612f86f.mp4`
2. **Google Fonts (`display=block`):**
   - Headline (`h1`): `'Gelasio', Georgia, 'Times New Roman', serif`, weight `700`.
   - Everything else: `'Outfit', 'Century Gothic', 'Poppins', system-ui, sans-serif` (Logo `700`, nav `600`, Sign up `500`, body/Explore `400`).
3. **Design Tokens & Exact Markup:**
   - All tokens measured on a `1280×960` canvas and scaled by `calc(TOKEN * 1px * var(--u))`. Square corners (`border-radius: 0` except `2px` on burger bars), no `box-shadow`s.
   - Exact DOM tree: `#app[data-mode="exact"][data-menu="closed"]` -> `#stage > video#bg`, `#topscrim`, `#scrim`, `header#masthead` (`a.logo`, `.cluster#nav-panel > nav.links#links + a.signup`, `button#menu-btn`), `section#hero` (`h1` with two `<span class="ln"><span>WORD</span></span>` lines `Overnight` / `Camp`, `p`, `a.explore`).
4. **Three JS Layout Modes (`data-mode` on `#app`):**
   - `exact` (`uw >= 0.874`): cover-scales `1280×960` `#stage` (`--s`, `--tx`, `--ty`, `--u`, `--scrim`, `--hero-top`).
   - `tablet` (`vw >= 600` and `ut >= 0.873`): horizontal crop bias `0.22 * (1 - visW / DW)` so campfire + husky stay in frame, clamped `--hero-top`, `fitHero()` overflow scaling, and right frosted drawer.
   - `compact` (`vw < 600` or small height): two-row CSS Grid, `#bg` `object-position: 72% 50%`, fluid `clamp()` typography, and landscape phone adjustments (`max-height: 520px`).
5. **Web Animations API Entrance:**
   - Synchronously sets initial states before first paint, waits for `document.fonts.ready` + `#bg` `loadeddata` (raced with `1000ms` timeout), animates headline (`EXPO`), soft rise (`SOFT`), and `Explore` edge wipe (`EXPO`), then clears all inline styles (`<= 3500ms`).
