# Monoframe® — Creative Agency & Adaptive Response Interface Hero

Full-screen hero landing page built with React 18, TypeScript, Vite and Tailwind CSS. Features a fixed horizontal mouse-scrubbed background video (`SENSITIVITY = 0.8` with queued `onSeeked` seeks to prevent seek-flooding), fixed navbar with desktop comma-separated navigation and animated mobile hamburger overlay, a blurred `A.R.I.A` intro label, a custom `useTypewriter` hook (`38ms` per character after a `600ms` delay) with blinking cursor, and a 5-button action pill group (`4` solid white pills + `1` outline clipboard-copy pill) that fades and slides in `400ms` after page load.

## Run

Install Node.js 20.19+ or 22.12+. In this folder run `npm ci`, then `npm run dev` and open the printed local HTTP URL. Run `npm run build` (`tsc --noEmit && vite build`) for production and `npm run preview` to inspect the production bundle. Publish the generated `dist/` folder to a static web host. Because this is an ES module React + Vite project, serve over HTTP/HTTPS (`file://` direct opening is unsupported).

## Edit map

- `src/App.tsx`: video URLs (`VIDEO_SRC`, `FALLBACK_H264_SRC`), scrub sensitivity (`SENSITIVITY`), navigation items (`NAV_LINKS`), action pills (`ACTION_PILLS`), typewriter prompt (`TYPEWRITER_TEXT`), `useTypewriter` hook, blurred intro label and clipboard copy handler (`handleCopyEmail`).
- `src/index.css`: Tailwind directives, `--font-heading` (`HelveticaNowDisplay-Medium`), `--font-body` (`HelveticaNowDisplayW01-Rg`), and `@keyframes blink`.
- `index.html`: document title, meta description, and external font stylesheet links.
- `public/assets/hero-h264.mp4`: local H.264 (`avc1`, `yuv420p`) transcode of the background video for browsers without 10-bit HEVC hardware decoding.

## Package

Start with `CUSTOMISE.md`. The deliverable ZIP contains the editable React/TypeScript/Tailwind source files, `package-lock.json`, `LICENCE.txt`, `THIRD-PARTY-LICENSES.txt`, and `built/` (a prebuilt static snapshot from `dist/` ready to serve over HTTP). After editing `src/`, run `npm run build` and publish `dist/`. `node_modules` is excluded from the ZIP.

## QA & Known Limits

Verified with `tsc --noEmit`, `vite build`, and automated Playwright checks across Chromium 153, Firefox 155, Microsoft Edge 155 and Cốc Cốc 152 at `1440×900`, `820×1180`, `768×1024`, `375×812` and `320×740`. Zero console/page errors, zero horizontal overflow, verified `useTypewriter` completion and cursor removal, `400ms` pill reveal, horizontal mouse-scrub video seeking (`currentTime > 0`), mobile menu toggle/Escape, and clipboard copy (`hello@monoframe.co`). Font stylesheets load from `db.onlinewebfonts.com` with `Helvetica Neue, Arial, sans-serif` fallbacks. Remote CloudFront video (`hevc` Main 10) is preserved on `<video src>` with automatic H.264 fallback (`./assets/hero-h264.mp4`).
