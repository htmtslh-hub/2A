# NexLayer (`nexlayer`) — Brief & Authorized Exceptions (v1.0.0)

## 1. Product Identity & Scope
- **Product Name:** NexLayer (`The Next Layer of Intelligence`)
- **Slug:** `nexlayer`
- **Catalog ID:** `t67`
- **Category:** `commerce` (AI Infrastructure Platform Landing Page)
- **Scope:** Local product directory `web/product/giao-dien-web/nexlayer/` (`source/`, `nexlayer.zip`, `README.md`, `reviews/1.0.0/`), live demo mirror `web/public/demos/nexlayer/`, and storefront registration (`t67`).

## 2. Authorized Exceptions from Default `WEB-STATIC-1` Profile
The product owner's prompt explicitly specifies:
1. **Single-File Self-Contained HTML (`index.html`):**
   - One self-contained `index.html` with inline CSS and JavaScript, no build step.
   - Deliverable `nexlayer.zip` (`12,204` bytes, `< 20,480` bytes) contains `index.html`, `CUSTOMISE.md`, `README.md`, and `LICENCE.txt`.
2. **Typography (`Manrope` & `IpsumMark`):**
   - Primary UI type: `Manrope` (weights `200..800`) loaded via Google Fonts, with fallback stack `'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif`.
   - Partner logo wordmark type: `'IpsumMark', 'Manrope', sans-serif`, weight `700`, mapped via `@font-face` to geometric bold proportions.
3. **Responsive Coordinate System (`1487 × 1058` Reference Canvas):**
   - Desktop uses `--u: calc(100vh / 1058)` (`100dvh / 1058` when supported), `--uw: calc(100vw / 1487)`, and `--h: clamp(var(--u), calc(var(--u) * .65 + var(--uw) * .35), calc(var(--u) * 1.16))`.
   - Portrait / narrow (`max-aspect-ratio: 11/10`) switches to a flex-column flow layout with `--m: min(calc(100vw / 430), 1.34px)` on phones and `--m: min(calc(100vw / 860), calc(100vh / 760), 1.25px)` on tablets (`≥600px`).
4. **Full-Bleed Looping CloudFront Video & Dual Fade Overlays:**
   - Remote MP4 URL (`h264`, `yuv420p`, `1664×1248`, `10.042s`): `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4`.
   - Framed on `.plate::after` with the exact measured bottom fade and side letterbox gradients on desktop (`#050505`), and portrait/tablet directional fades on narrow viewports.
5. **Exact Measured Composition & SVG Geometry:**
   - Brand SVG (`viewBox="0 0 31.5 48.5"`) with 10-stop linear gradient `bg1` and two `#fdfdfd` rectangular notches.
   - Centered desktop nav (`About`, `Features`, `FAQ`, `Contact`) with `24.5u`, `23.5u`, `26.0u` link spacing and right-aligned `Get Started` white pill (`175u × 49u`).
   - Left-anchored hero copy (`left: 75.5u`, `top: 230.5u`): two-line `71.6h` headline (`The Next Layer` / `of Intelligence`), two-line `20.7h` subcopy, `Get Started` pill CTA (`175.6h × 50h`), and `View Architecture` ghost link.
   - Bottom 4-mark `logoipsum` partner strip (`lg1`–`lg4` at `994.7u–998.7u`, with raised `.dot` on `lg2`).
   - Portrait frosted-glass `#burger` and full-screen staggered `#menu` overlay with `Escape`, link-click, and landscape-resize (`aspect > 1.1`) auto-close.
