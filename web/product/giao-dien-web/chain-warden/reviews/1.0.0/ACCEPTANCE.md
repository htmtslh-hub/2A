# Chain Warden source acceptance

Gate PASS. Visual-review rubric **97.520**; threshold strictly >95. Not pixel accuracy. Region weights fixed before implementation in `BRIEF.md` and `REFERENCE-MAP.md`. Full axis scores and concrete differences in `acceptance.json`.

Reference `838×458` (`SHA-256 2586e0cef408e918b9bd9bde1b887da00cc5dc692047a0c1f37964fd42345dee`). Candidate rendered at `838×458` (`screenshots/candidate-hero-838x458.png`) and `1440×900` (`screenshots/chromium-1440.png`), DPR 1, zoom 1, scroll 0. `screenshots/diff/side-by-side.png` and `screenshots/diff/diff.png` preserve the real rendered comparison. One external bottom-right viewer expand button (`x=775..837, y=384..457`) is excluded from the website and design scoring; raw pixel diagnostic (**91.18%** match within RGB tolerance 12, mean absolute RGB error **7.15**) compares against `design/reference-hero-clean.png`.

- `header-nav`: **97.300** (14%)
- `hero-copy-abilities-skins-left`: **97.500** (30%)
- `hero-warden-stage-center`: **97.800** (38%)
- `right-rail-and-spotlight-card`: **97.100** (18%)

Remaining differences: live HTML/CSS typography (`Syne` + `Plus Jakarta Sans`) replaces rasterized text in the header (`LEAGUE OF LEGENDS`, `GAMEPLAY`, `CHAMPIONS`, `NEWS`, `COLLECTION`, `ESPORTS`, `PLAY NOW`), left champion column (`THE CHAIN WARDEN`, `Thresh`, lore paragraph, `Read more`, `Abilities`, `Death Sentence (Q)`, `Skins`), right role rail (`Support`, `Moderate`, `Ranged`, `Bottom`), and bottom-right parallelogram spotlight caption (`Shadow Isles: None Escape`) while keeping the exact 1:1 spectral chain warden stage (`warden-classic.webp`) and UI sprite (`warden-ui.webp`). Below-the-fold sections (`#gameplay`, `#champions`, `#collection`, `#news`, `#play`) complete the interactive champion showcase.

Source technical/motion/scroll PASS: see `checks.json`, `source-checks.json`, and `screenshots/`. Verified across four actual desktop browsers (Chromium `153.0.8010.12`, Firefox `155.0`, Microsoft Edge `155.0.4283.62`, and Cốc Cốc `152.0.7977.124`) under OS `prefers-reduced-motion: reduce`; finite `requestAnimationFrame` intermediate frames, forward/backward skin wrap (`Classic`, `Dark Star`, `High Noon`, `FPX`), 5-ability switching (`P/Q/W/E/R`), keyboard arrows, pointer swipe, scroll-driven progress bar (`#lore-progress`), and session-only `Pause motion` all pass with zero idle animation loops. No-JS/no-font at `320×740`, `file://`, and equivalent 200% zoom (`720×450` DPR 2) verified.

Frozen ZIP SHA-256: `3e59125d6771bffefa4776ebfc7ee1e53706ec0850e9e56f2e97c7a613abed0d` (`254,280` bytes). Safari, physical mobile devices, live payment processing, and paid-account download are not claimed.
