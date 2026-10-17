# Chain Warden 1.0.0 Release Record

17 October 2026, Windows. Commercial template release for Forge Zone marketplace.

## Product Identifiers & Live Deployment
- Name: Chain Warden
- Slug: `chain-warden`
- Store Slot: `t49`
- Category: `entertainment`
- Version: `1.0.0`
- Store Product URL: `https://forgezone.store/?mau=t49`
- Public Demo URL: `https://forgezone.store/demos/chain-warden/index.html?v=1.0.0`
- Video Preview: `https://forgezone.store/previews/chain-warden.mp4?v=5ba207c11c54`
- Poster Preview: `https://forgezone.store/previews/chain-warden.webp?v=1.0.0`
- Vercel Production Deployment: `dpl_8VWHW4KopdNaG8KgrioCryNRLEUW` (`READY`, aliased to `https://forgezone.store`, immutable `https://web-cw4zh1rdg-htmtslh-hubs-projects.vercel.app`)
- Git Release Branch: `codex/chain-warden-release` at `https://github.com/htmtslh-hub/2A` (commit `922ae44`)

## Package Verification
- Commercial ZIP: `chain-warden.zip` (`254,280` bytes)
- SHA-256 Digest: `3e59125d6771bffefa4776ebfc7ee1e53706ec0850e9e56f2e97c7a613abed0d`
- File Count: 10 files (`index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/img/warden-classic.webp`, `assets/img/warden-darkstar.webp`, `assets/img/warden-highnoon.webp`, `assets/img/warden-ui.webp`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`).
- Extracted integrity: Byte-for-byte identical match with `source/` (`sourceMatchesExtracted: true` in `checks.json`).
- Zero third-party runtime libraries, frameworks, analytics scripts, trackers, or build steps.

## Visual & Browser QA Verification
- ForgeFrame Weighted Regional Visual Fidelity Score: **97.520** (>95 gate) at `838×458` reference canvas (`91.18%` raw pixel match within tolerance 12, mean absolute RGB error `7.15`).
- Official Extraction QA (`check-template.mjs chain-warden --version 1.0.0 --ngoai-le`): **0 failures** across Chromium `153.0.8010.12` and Firefox `155.0` at 4 viewports (`1440×900`, `820×1180`, `375×812`, `320×740`), including axe-core (`0` violations), contrast (`0` low-contrast items), mobile navigation Escape/focus, `file://`, offline/no-JS, and 200% zoom layout integrity.
- 4-Browser Finite Motion & Scroll QA (`source-checks.json`): Passed in Chromium `153.0.8010.12`, Firefox `155.0`, Microsoft Edge `155.0.4283.62`, and Cốc Cốc `152.0.7977.124` under `reducedMotion: 'reduce'` with finite `requestAnimationFrame` interpolation (`360ms` skin switcher, `260ms` ability switcher, `420ms` scroll reveal, and scroll-driven `#lore-progress`).
- Live Online Verification (`online-verification.json`): All 16 production endpoints verified (`200` on `/`, demo HTML/CSS/JS/4×WebP, poster WebP, and 15s MP4; `401` on anonymous `/api/download?slug=chain-warden`; `404` on direct `/chain-warden.zip`; `fitclub-food` and `volt-hoodie` regression checks passed) plus live 4-browser interaction (`chromium:true`, `firefox:true`, `edge:true`, `coccoc:true`).
- Actual Safari / physical iOS & Android devices and paid-account download/payment completion: NOT TESTED.

## Recording Verification
- Tool: `web/product/giao-dien-web/tools/quay-preview.mjs chain-warden`
- Poster: `web/public/previews/chain-warden.webp` (`36,280` bytes)
- Video: `web/public/previews/chain-warden.mp4` (`655,491` bytes, `14.966667s`, `960×600`, `30fps`, H.264, no audio, revision `5ba207c11c54`, SHA-256 `5ba207c11c542878bc5d070c5631e2fbcf5ace2708ddd4f986cdabfa5740af15`).
- Manifest check: `PASS 48 catalog recordings, revisions and hashes` (`22.56 MiB` total).

## Compliance
- `WEB-STATIC-1` v1.2.1 with documented `W01`/`W03`/`W05`/`W06` exceptions for local WebP stage/UI assets, ZIP byte size (`254,280` bytes), and interactive ability/skin/dialog showcase sections.
- Conforms to product policy 05/10/2026: animations enabled by default across all engines regardless of OS `prefers-reduced-motion` while providing an explicit session-only `Pause motion` toggle (`#motion-toggle`).
