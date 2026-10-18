# Solaris Gate — 1.0.0

Read [CUSTOMISE.md](CUSTOMISE.md) first for the counted editing map, 10-step workflow, and 12 copy-ready AI prompts.

Solaris Gate is a single-page immersive space portal landing experience featuring a 0–100% preloader sequence, a docking floating monogram, a full-screen 2D canvas rounded-rectangle 3D-tilting portal window, a custom orbit cursor, an 8-planet sidebar indicator, and planetary transition sequences across Mars, Earth, and Venus (with Mercury previewed at the terminal state).

## Open

1. Extract the complete `solaris-gate.zip` archive.
2. Open `index.html` directly in a modern browser or serve the folder over a local static HTTP server.
3. No build step, package manager, or external CSS/JS library is required. Runtime file: `index.html`.

## What is included

- `index.html` — complete self-contained HTML, inline CSS, and inline JavaScript.
- `CUSTOMISE.md` — counted literal editing map, 10-step customer guide, and 12 AI prompts.
- `README.md` — technical overview, browser verification notes, and setup instructions.
- `LICENCE.txt` — 7-part commercial licence terms.

## Functional scope and demo limitations

- **Working interactions:**
  - Preloader sequence with 0–100% counter, docking logo animation, and automatic fallback if a browser blocks autoplay or lacks HEVC decoding.
  - Pointer-responsive 3D-tilting rounded-rectangle portal mask rendered on `#portal-canvas` with screen-locked cover media.
  - Custom orbit cursor (`.custom-cursor`) with 0.2 per-frame lerp and `"Enter"` hover state over `#portal`.
  - Interactive planetary travel chain: **Mars → Earth → Venus** (terminal state displaying the Mercury image inside the portal).
- **Demo-only elements:**
  - Header navigation links (`#about`, `#explore`, `#planets`) and the `Menu` button are visual hero chrome; no secondary pages, drawers, or backend services are connected.
- **Network & media notes:**
  - Remote video, image, and SVG assets load from the CloudFront URLs specified in the project brief and require an active internet connection.
  - `TO_EARTH` is encoded in H.264 (`yuv420p`), while `MARS_BG`, `TO_VENUS`, and `TO_MARS` are encoded in HEVC (`yuv420p10le`). On browsers without HEVC hardware/OS decoding, the experience automatically falls back so the preloader completes and the full **Mars → Earth → Venus** portal transition chain remains interactive.

## Fonts

Four local `@font-face` declarations (`SF Pro` 400/700, `SF Pro Thin` 100, and `Aalto` 400) use `local(...)` lookup with explicit fallback stacks (`Arial, sans-serif` and `'Arial Narrow', sans-serif`) so no missing-font network errors occur when those proprietary faces are not installed locally.

## Verification

Tested on Windows across headless Chromium, Firefox, Microsoft Edge, and Cốc Cốc at `1440×900`, `820×1180`, `768×1024`, `375×812`, and `320×740`. See `reviews/1.0.0/QA.md` and `reviews/1.0.0/checks.json` in the product repository for detailed measurements. Physical mobile devices and Safari have not been tested.

## Terms

See `LICENCE.txt`. Rights to remote third-party media and locally installed system/commercial fonts are separate from the template code licence.
