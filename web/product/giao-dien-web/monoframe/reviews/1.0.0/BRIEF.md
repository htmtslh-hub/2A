# Monoframe (`monoframe`) — Brief & Authorized Exceptions (v1.0.0)

## 1. Product Identity & Scope
- **Product Name:** Monoframe (`Monoframe®`) — renamed from the prompt's original `"Mainframe"` / `"Mainframe®"` / `"hello@mainframe.co"` per the product owner's standing instruction.
- **Slug:** `monoframe`
- **Category:** `agency` (Creative Agency & Adaptive Interface Studio Hero)
- **Scope:** Local product directory `web/product/giao-dien-web/monoframe/` (`source/`, `monoframe.zip`, `README.md`, `reviews/1.0.0/`).

## 2. Authorized Exceptions from Default `WEB-STATIC-1` Profile
The product owner's prompt explicitly specifies:
1. **React + TypeScript + Vite + Tailwind CSS Stack:** Built with React 18, TypeScript, Vite (`base: './'`), and Tailwind CSS. To ensure customers can both edit source and deploy immediately without a build step if desired, `monoframe.zip` includes all editable source files (`index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `src/App.tsx`, `src/main.tsx`, `src/index.css`, `public/assets/hero-h264.mp4`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`, `THIRD-PARTY-LICENSES.txt`) plus a prebuilt `built/` directory generated from `dist/` (`node_modules` and `dist` excluded).
2. **External Font Stylesheets (`db.onlinewebfonts.com`):**
   - Heading (`--font-heading`): `https://db.onlinewebfonts.com/c/5ac3fe7c6abd2f62067f266d89671492?family=HelveticaNowDisplay-Medium` with fallback `'Helvetica Neue', Arial, sans-serif`.
   - Body (`--font-body`): `https://db.onlinewebfonts.com/c/1aa3377e489837a26d019bba501e779d?family=HelveticaNowDisplayW01-Rg` with fallback `'Helvetica Neue', Arial, sans-serif`.
3. **Background Video (`d8j0ntlcm91z4.cloudfront.net` + Local H.264 Scrubbing Copy):**
   - Primary JSX `<video src>` retains the exact CloudFront URL from the prompt: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4`.
   - Because the remote stream is encoded in 10-bit HEVC (`hevc`, `yuv420p10le`, `1920×1080`, `4.04s`), a local 8-bit H.264 (`avc1`, `yuv420p`, keyframe interval `6`) copy is provided at `public/assets/hero-h264.mp4` (`1,046,340` bytes) and automatically used on browsers without 10-bit HEVC hardware decode so frame-accurate horizontal mouse scrubbing works across Chromium, Firefox, Edge, and Cốc Cốc.
4. **Full-Viewport Single-Screen Hero Architecture:**
   - Fixed `<video>` (`position: fixed; inset: 0; z-index: 0; object-fit: cover; object-position: 70% center;`, `muted`, `playsInline`, `preload="auto"`, no `autoplay`), scrubbed horizontally via `window` `mousemove` (`SENSITIVITY = 0.8`) with queued `onSeeked` seeks.
   - Fixed navbar (`z-index: 10`) with left `"Monoframe®"` + `"✳︎"`, center desktop links (`Labs, Studio, Openings, Shop`), right `"Get in touch"`, mobile 3-bar-to-X hamburger, and `z-index: 9` `bg-black/90 backdrop-blur-md` mobile overlay.
   - Hero section (`z-index: 1`, `h-screen`) containing the `blur(4px)` two-line `A.R.I.A` intro label, the `useTypewriter` paragraph (`speed = 38ms`, `startDelay = 600ms`) with blinking cursor that disappears when `done` is true, and 5 action pills (`4` white pills + `1` outline clipboard-copy pill for `hello@monoframe.co`) fading/sliding up at `400ms`.
