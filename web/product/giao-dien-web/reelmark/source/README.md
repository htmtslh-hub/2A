# Reelmark — Short-Form Video Creator Marketplace Hero (`v1.0.0`)

**Reelmark** (*"Captivate Crowds with Snackable Reels"*) is a single-file, one-screen landing hero (`index.html`) for a short-form video creator marketplace built with plain HTML5, CSS3 custom properties (`--u = min(100vw/1440, 100vh/1080)`), and vanilla JavaScript with zero build step.

## Highlights
- **Soft Mint Studio Palette & 1440×1080 Contained Frame**: Warm off-white background (`#F5F8EF`), deep forest-green accents (`#08482D`), mint badge (`#DAE7C7`), `Inter Tight 700` headline (`88u / 92u`, `#101410`), `Inter 400/500` UI and subline (`#5E5E61`), and `Caveat 600` handwritten notes (`"Be seen / with clips"`, `"Zero cost"`) with self-drawing SVG arrows and `"//"` doodle strokes.
- **Curved Cylinder Video Carousel (10 Cards, 5×2 Shared Video Grid)**: Ten tall cards scroll continuously right → left at `50u/s` driven by a Web Animations clock (`duration: 1e9`), with 1:1 pointer/touch dragging and `95%/s` momentum decay. Each card computes its width (`170 + 48·d²`), inner/outer vertical edge heights (`280 + 92·q^2.6`), vertical centre (`687 − 12·d²`), and rounded-quad `clip-path: path(...)` (`15u` corners) every frame while displaying its own cover-fitted tile from a single synced `5×2` MP4 + WebP grid.
- **Phones (`<= 820px`)**: Compact top bar (logo + `Sign up` pill), stacked centred badge, `clamp(38px, 9.2vw, 56px)` headline and subline, the same draggable curved carousel scaled to `640` units in a `250px`-tall band, and the bottom `Make a Reel` pill + `Zero cost` note.

## Package Contents
- `index.html`: Self-contained HTML, CSS, and JavaScript.
- `CUSTOMISE.md`: 10-step customisation & deployment guide + 12 AI prompts.
- `README.md`: Product overview and quick start.
- `LICENCE.txt`: Commercial use licence.
