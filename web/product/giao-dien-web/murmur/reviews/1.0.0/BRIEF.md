# Brief — murmur (`murmur`, v1.0.0)

## Summary

Single-file, one-screen landing hero for a daily podcast from a fictional show, **murmur** ("Daily Murmur Podcast"), built with plain HTML, CSS, and vanilla JS with no framework and no build step.

## Key Requirements

- **Scene:**
  - **Plate:** 16:10 background image (`https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7a7598ba-a6f8-42b4-ac39-98279dac4192.jpg`).
  - **Motion:** 5s muted looping 16:9 video (`https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d41b8c1d-f175-43b3-af22-7081133aa8de.mp4`, `1280×720`) mirror-padded `96/1728` on each side, placed at `111.11%` width, `left -5.556%`.
  - **Lighting layers (screen-blended):**
    - **Bloom:** three soft radial glows over the city lights (pink, amber, periwinkle) breathing `35% ↔ 100%` over `5.2s`.
    - **Sweep:** pale diagonal light band sweeping across the room every `7s`.
- **Frame & Scaling:** `1440×900` frame covering the viewport (`--u = max(100vw/1440, 100vh/900)`), centred.
- **Typography & Colour:**
  - `Newsreader 500` (`139px`, tracking `+.05em`, white with soft navy shadow) for `"murmur"`.
  - `Inter 400/500` (`#dfe3fb` lavender subtitle at `33px`; white episode title at `20.6px / 25.5px`).
  - `IBM Plex Mono 400` (`#b9c4ea` label, `#7583bd` date line, About text, and platform row).
  - Card: deep navy glass `rgba(8,21,62,.84)` with `18px` blur and `1px` periwinkle border `rgba(132,146,255,.38)`.
- **Layout (`1440×900` frame):**
  - Wordmark `"murmur"` centred, x-height top at `y = 133`.
  - Subtitle `"Daily Murmur Podcast"`, `33px`, centred at `y = 225`.
  - Label `"LISTEN TO THE LATEST EPISODE"`, `12.6px` mono, centred `10px` right of centre at `y = 319`.
  - Player card `623.5×190` at `(412.5, 350)`, radius `16`:
    - Cover `158×156` at `(18.5, 16)` inside card, radius `7`, with lower-left white serif `"murmur"`.
    - Title `"Why Cities Are Planting Forests / on Rooftops"` at `(202.5, 33)`.
    - Date line `"Apr 25 · Daily Murmur Podcast"` at `y = 99.5`.
    - Waveform: `62` bars (`1.9px`) across `335×34` at `(203, 138)`, `#5560FF → #86A2FF → #A083FF`.
    - Play button: `37px` off-white circle with navy play triangle at `(566.5, 136.5)`.
  - About: `"ABOUT"`, `13px` mono at `(414, 595)` + 4 mono lines (`13.72px / 19.3px`).
  - Platform row: `"LISTEN ON YOUR FAVORITE PODCAST PLATFORM"`, `11.4px` mono at `(414, 760)` + four `21.5px` round white generic icons starting at `x = 710` with `11.7px` gap.
- **Packaging Exception (`--ngoai-le`):**
  - Single-file architecture (`index.html` + `CUSTOMISE.md` + `README.md` + `LICENCE.txt`), registered in `INLINE_PRODUCTS` in `dong-goi.mjs`.
