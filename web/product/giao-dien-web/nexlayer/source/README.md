# NexLayer — The Next Layer of Intelligence

Single-file dark cinematic AI-infrastructure landing page (`index.html` with inline CSS and JavaScript, no build step). Engineered to a `1487 × 1058` reference canvas using height-locked `--u` (`calc(100vh / 1058)`) and `--h` proportional units on desktop, and a responsive `--m` flow layout on portrait/narrow viewports (`max-aspect-ratio: 11/10`). Features an angular S-bolt SVG brand mark (`31.5 × 48.5` with `bg1` metallic gradient), `Manrope` variable typography, a full-bleed looping CloudFront H.264 video framed by bottom and side letterbox fades on `#050505`, white pill CTAs (`Get Started`), a ghost link (`View Architecture`), a 4-mark `logoipsum` partner strip, and a frosted-glass mobile menu drawer (`#burger` / `#menu`).

## Run

Open `index.html` directly in any modern browser with an active internet connection (for the Google Fonts `Manrope` stylesheet and the remote CloudFront MP4 video), or serve the folder over a local HTTP server (`npx serve .` or `python -m http.server`). No Node.js build step or bundler is required.

## Edit map

- `index.html`:
  - `<head>`: `<title>The Next Layer of Intelligence</title>`, `<meta name="description">`, and Google Fonts `Manrope` stylesheet link.
  - `<style>`: `:root` color tokens (`--ink`, `--muted`, `--nav`, `--strip`, `--pill`, `--pill-ink`), responsive unit math (`--u`, `--uw`, `--h`, `--m`), `.plate-video` and `.plate::after` dual gradients, desktop absolute coordinate layout (`1487 × 1058`), `rise` / `riseNav` / `fade` entrance keyframes, and `@media (max-aspect-ratio: 11/10)` portrait/tablet rules.
  - `<body>`: `.plate > video.plate-video`, `header.topbar` (`.brand` SVG, `.links`, `.pill-nav`, `#burger`), `nav.menu#menu` mobile overlay, `main.hero` (`.headline`, `.sub`, `.actions`), `.logos` (`lg1`–`lg4` partner marks), and minimal menu/video JavaScript.

## Package

Start with `CUSTOMISE.md`. The deliverable `nexlayer.zip` contains 4 files: `index.html`, `CUSTOMISE.md`, `README.md`, and `LICENCE.txt`.

## QA & Known Limits

Verified across Playwright Chromium, Firefox, Microsoft Edge, and Cốc Cốc at `1487×1058`, `1440×900`, `820×1180`, `375×812`, and `320×740`. Zero console/page errors, zero horizontal overflow, verified desktop coordinate alignment (`1487×1058`), verified portrait/mobile frosted-glass `#burger` toggle (`.stage.is-open`), `Escape` key closing, link click closing, and landscape resize auto-close (`aspect > 1.1`). Navigation and CTA links (`#about`, `#features`, `#faq`, `#contact`, `#get-started`, `#architecture`) are single-page anchor placeholders ready to connect to your real routes.
