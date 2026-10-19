# Aethera® — Cinematic Hero Section with Looping Video Background

Full-screen cinematic single-page hero template built with React 18, TypeScript, Vite, and Tailwind CSS. Features an editorial `Instrument Serif` + `Inter` typographic hierarchy, a top-anchored layout (`paddingTop: calc(8rem - 75px)`) over a lower-positioned looping video canvas (`top: 300px`, `inset: auto 0 0 0`) with a custom `requestAnimationFrame` fade-in/fade-out loop (`0.5s` start fade, `0.5s` end fade, `100ms` reset on `ended`), vertical white gradient overlays (`from-background via-transparent to-background`), staggered `fade-rise` entrance animations (`0s`, `0.2s`, `0.4s`), and an interactive glassmorphic inquiry modal triggered from `"Begin Journey"`.

## Run

Install Node.js 20.19+ or 22.12+. In this folder run `npm ci`, then `npm run dev` and open the printed local HTTP URL. Run `npm run build` (`tsc --noEmit && vite build`) for production and `npm run preview` to inspect the production bundle. Publish the generated `dist/` folder to a static web host. Because this is an ES module React + Vite project, serve over HTTP/HTTPS (`file://` direct opening is unsupported).

## Edit map

- `src/App.tsx`: background video URL (`VIDEO_URL`), `requestAnimationFrame` fade-in/fade-out manual loop logic, navigation items (`NAV_ITEMS`), `"Aethera®"` superscript logo, `"Beyond silence, we build the eternal."` headline with italic `#6F6F6F` spans, description copy, `"Begin Journey"` CTA buttons, and interactive glassmorphic inquiry dialog.
- `src/styles/fonts.css`: Google Fonts `@import` for `Instrument Serif` (normal + italic) and `Inter`, plus `--font-display` and `--font-body` CSS variables.
- `src/styles/theme.css`: color custom properties and `@keyframes fade-rise` classes (`.animate-fade-rise`, `.animate-fade-rise-delay`, `.animate-fade-rise-delay-2`).
- `src/index.css`: stylesheet entrypoint importing `fonts.css`, `theme.css`, and Tailwind CSS layers.
- `tailwind.config.js`: Tailwind theme extension (`background: #FFFFFF`, `foreground: #000000`, `muted: #6F6F6F`, `serif` and `sans` font families).
- `index.html`: document `<title>`, meta description, and Open Graph tags.

## Package

Start with `CUSTOMISE.md`. The deliverable ZIP contains the editable React/TypeScript/Tailwind source files, `package-lock.json`, `LICENCE.txt`, `THIRD-PARTY-LICENSES.txt`, and `built/` (a prebuilt static snapshot from `dist/` ready to serve over HTTP). After editing `src/`, run `npm run build` and publish `dist/`. `node_modules` is excluded from the ZIP.

## QA & Known Limits

Verified with `tsc --noEmit`, `vite build`, and automated Playwright checks across Chromium, Firefox, Microsoft Edge, and Cốc Cốc at `1440×900`, `820×1180`, `375×812`, and `320×740`. Zero console/page errors, zero horizontal overflow, verified `Instrument Serif` (`-2.46px` tracking, `0.95` line-height) and `Inter` typography, verified staggered `fade-rise` entrance completion, verified `requestAnimationFrame` video opacity transitions and `ended` loop restart, and verified interactive `"Begin Journey"` modal open/submit/Escape close. The remote CloudFront MP4 (`h264`, `yuv420p`) and Google Fonts stylesheets load over HTTPS.
