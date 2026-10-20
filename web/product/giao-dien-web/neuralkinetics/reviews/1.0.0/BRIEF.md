# Brief — NeuralKinetics (`neuralkinetics` / `t77`)

- **Product Name:** NeuralKinetics
- **Slug:** `neuralkinetics`
- **Catalog ID:** `t77`
- **Category:** `commerce` (Thương mại điện tử / Digital Banking Card & Adaptive Bionics)
- **Access Tier:** `free`
- **Version:** `1.0.0`
- **Stack:** React 19 + TypeScript + Vite 6 + Framer Motion (`motion/react`) + `lucide-react` (`Plus` icon) + Plain CSS (`src/index.css`, no Tailwind) + Google Font `Inter` (`300`, `400`, `500`, `600`)

## 1. Prompt Specification Summary

1. **Layout:**
   - Full viewport height (`min-height: 100vh`), white background (`#ffffff`), flex column with `justify-content: space-between`.
   - Fixed navbar at top (`z-index: 50`, `pointer-events: none` on the nav itself, `pointer-events: auto` on children).
   - Absolutely positioned full-screen video behind everything (`z-index: 0`).
   - Footer content pinned to bottom (`z-index: 30`) with a white gradient fade-up background (`linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)`).
2. **Navbar (fixed, top):**
   - Left side:
     1. Custom SVG logo (two rotated rounded rectangles at `-35deg`, `#000000` fill) + brand text `"NeuralKinetics"` (hidden on mobile, shown on desktop `768px+`).
     2. Menu button: black pill with white circle (`28px` mobile, `32px` desktop) containing a `Plus` icon (`lucide-react`, `size={12}`, `strokeWidth={3}`) + `"Menu"` text (`11px`, white).
     3. Tags pill: light gray (`#F4F4F6`) rounded-full container with `"Advanced Bionics"` and `"Cognitive AI"` (hidden on mobile, shown on desktop `768px+`).
   - Right side:
     - Light gray (`#F4F4F6`) pill with a black circle (`28px` mobile, `32px` desktop, containing a 4-dot grid SVG icon) + label `"Adaptive Systems"` (hidden on mobile, shown on desktop `768px+`).
3. **Background Video:**
   - URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4`
   - `autoPlay`, `muted`, `playsInline`, `loop`, `object-fit: cover`.
   - Mobile (`< 768px`): video wrapper is `80%` width and `80%` height (centered).
   - Desktop (`768px+`): video wrapper is `100%` width and `100%` height.
4. **Footer Content (bottom, over gradient):**
   - Left block:
     1. Subtitle line: `8px` black circle dot + `"Best digital banking card 2026"` (`13px`, `rgba(0, 0, 0, 0.55)`).
     2. Two-line heading: `"One Card, Zero"` / `"Limits. Worldwide."` (`font-weight: 300`, `clamp(2rem, 8vw, 4.5rem)` on mobile, `clamp(2.5rem, 5.5vw, 4.5rem)` on desktop `768px+`, `letter-spacing: -0.03em`, `line-height: 1`).
     3. Two buttons: `"See Features"` (black pill, white text, `13px`) and `"How It Works"` (transparent with dark border `rgba(0, 0, 0, 0.35)`, `13px`).
   - Right block:
     - Three tag pills: `"Neuromorphic"`, `"AGI"`, `"Cybernetics"` (white bg, light border `rgba(0, 0, 0, 0.12)`, `11px`, `rounded-full`).
5. **Animations (`motion` from `'motion/react'`, `ease: [0.16, 1, 0.3, 1]`):**
   - Navbar: `y: -16, opacity: 0` → visible (`duration: 0.8s`).
   - Video wrapper: `opacity: 0, scale: 1.05` → `opacity: 1, scale: 1` (`duration: 1.8s`).
   - Footer wrapper: `y: 20, opacity: 0` → visible (`delay: 0.5s, duration: 1s`).
   - Subtitle: `y: 16, opacity: 0` → visible (`delay: 0.6s, duration: 0.8s`).
   - Heading: `y: 20, opacity: 0` → visible (`delay: 0.8s, duration: 0.8s`).
   - Buttons: `y: 16, opacity: 0` → visible (`delay: 1.0s, duration: 0.8s`).

## 2. +15% Creative Interactive Enhancements

- **Interactive Menu Directory Drawer (`#nk-menu-panel`):** Clicking `"Menu"` rotates the `Plus` icon `45deg` and reveals an indexed 4-item quick navigation drawer (`01`–`04`).
- **Interactive Adaptive Systems Matrix (`#nk-systems-panel`):** Clicking `"Adaptive Systems"` opens a live telemetry HUD with a session-level background video pause/resume toggle (`#nk-motion-toggle`).
- **Synced Architecture Telemetry Pill (`#nk-telemetry-readout`):** Selecting `"Neuromorphic"`, `"AGI"`, or `"Cybernetics"` (or the navbar domain tags) updates the live specification readout pill (`NRM-01`, `AGI-02`, `CYB-03`).
- **Interactive `"See Features"` & `"How It Works"` Modals (`#nk-features-modal`, `#nk-how-modal`):** Includes an interactive `$10,000 USD` zero-markup multi-currency spot calculator (`EUR`, `GBP`, `JPY`, `SGD`), a 3-stage onboarding switcher, and a priority titanium card reservation form.

## 3. Approved Packaging Exception (`--ngoai-le`)

- React 19 + TypeScript + Vite 6 + `motion` + `lucide-react` source + prebuilt `built/` bundle.
