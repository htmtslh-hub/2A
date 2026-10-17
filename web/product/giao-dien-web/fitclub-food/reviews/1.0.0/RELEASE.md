# FitClub Food 1.0.0 Release Record

17 October 2026, Windows. Commercial template release for Forge Zone marketplace.

## Product Identifiers & Live Deployment
- Name: FitClub Food
- Slug: `fitclub-food`
- Store Slot: `t48`
- Category: `commerce`
- Version: `1.0.0`
- Store Product URL: `https://forgezone.store/?mau=t48`
- Public Demo URL: `https://forgezone.store/demos/fitclub-food/index.html?v=1.0.0`
- Video Preview: `https://forgezone.store/previews/fitclub-food.mp4?v=20089483d646`
- Poster Preview: `https://forgezone.store/previews/fitclub-food.webp?v=1.0.0`
- Vercel Production Deployment: `dpl_DXwGARbgZY8h1scHKJfkQbQfkLMy` (`READY`, aliased to `https://forgezone.store`, immutable `https://web-rm6kaihjj-htmtslh-hubs-projects.vercel.app`)
- Git Release Branch: `codex/fitclub-food-release` at `https://github.com/htmtslh-hub/2A` (commit `93e7a89`)

## Package Verification
- Commercial ZIP: `fitclub-food.zip` (`331,299` bytes)
- SHA-256 Digest: `02ce936a94e636ef567e55ec956511a1eb83be74541fa6449a6bb45e2ec6eec7`
- Frozen Source Manifest SHA-256: `7fde3234980436b5ec2dddd48f6ef9e1243c7af76ddaa0a5b2ec0cd78dd75c8e`
- File Count: 9 files (`index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/img/platter-club.webp`, `assets/img/platter-protein.webp`, `assets/img/platter-berry.webp`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`).
- Extracted integrity: Byte-for-byte identical match with `source/` (`sourceMatchesExtracted: true` in `checks.json`).
- Zero third-party runtime libraries, frameworks, analytics scripts, trackers, or build steps.

## Visual & Browser QA Verification
- ForgeFrame Weighted Regional Visual Fidelity Score: **97.198** (>95 gate) at `856×740` reference canvas (`79.67%` raw pixel match within tolerance 16, mean absolute RGB error `14.31`).
- Official Extraction QA (`check-template.mjs fitclub-food --version 1.0.0 --ngoai-le`): **0 failures** across Chromium `153.0.8010.12` and Firefox `155.0` at 4 viewports (`1440×900`, `820×1180`, `375×812`, `320×740`), including axe-core (`0` violations), contrast, mobile navigation Escape/focus, `file://`, offline/no-JS, and 200% zoom layout integrity.
- 4-Browser Finite Motion & Scroll QA (`source-checks.json`): Passed in Chromium `153.0.8010.12`, Firefox `155.0`, Microsoft Edge `155.0.4283.62`, and Cốc Cốc `152.0.7977.124` under `reducedMotion: 'reduce'` with finite `requestAnimationFrame` interpolation (`360ms` platter switcher, `420ms` scroll reveal).
- Live Online Verification (`online-verification.json`): All 13 production endpoints verified (`200` on `?mau=t48`, demo HTML/CSS/JS/3×WebP, poster WebP, and 15s MP4 with exact byte & SHA-256 match; `401` on anonymous `/api/download?id=t48`; `404` on direct `/fitclub-food.zip`; existing catalog demos preserved).
- Actual Safari / physical iOS & Android devices and paid-account download/payment completion: NOT TESTED.

## Recording Verification
- Tool: `web/product/giao-dien-web/tools/quay-preview.mjs fitclub-food`
- Poster: `web/public/previews/fitclub-food.webp` (`25,400` bytes)
- Video: `web/public/previews/fitclub-food.mp4` (`653,791` bytes, `14.966667s`, `960×600`, `30fps`, H.264, no audio, revision `20089483d646`, SHA-256 `20089483d646110628689939e954763628fa05385f9017cc069b7a20cd187c02`).
- Manifest check: `PASS 47 catalog recordings, revisions and hashes` (`21.94 MiB` total).

## Compliance
- `WEB-STATIC-1` v1.2.1 with documented `W01`/`W03`/`W05`/`W06` exceptions for local transparent WebP food platter cutouts, ZIP byte size (`331,299` bytes), and interactive platter/portion/dialog showcase sections.
- Conforms to product policy 05/10/2026: animations enabled by default across all engines regardless of OS `prefers-reduced-motion` while providing an explicit session-only `Pause motion` toggle (`data-motion-toggle`).
