# FitClub Food source acceptance

Gate PASS. Visual-review rubric **97.198**; threshold strictly >95. Not pixel accuracy. Region weights fixed before implementation in `BRIEF.md`. Full axis scores and concrete differences in `acceptance.json`.

Reference `856×740` (`SHA-256 b98b677cd5d5bf340c54c29876ccbb3ce40fec4764cb866836c3f24ffad643f2`). Candidate rendered at `856×740` (`screenshots/reference-856x740.png`) and `1440×900` (`screenshots/chromium-1440.png`), DPR 1, zoom 1, scroll 0. `visual-diff/side-by-side.png` and `visual-diff/overlay.png` preserve the real rendered comparison. One external bottom-right viewer expand button (`x=791..855, y=633..719`) is excluded from the website and design scoring; raw pixel diagnostic (**79.67%** match within RGB tolerance 16, mean absolute RGB error **14.31**) includes that excluded external overlay and real English copy replacing synthetic garbled AI text.

- `header-nav`: **96.900** (14%)
- `hero-copy-left`: **97.000** (26%)
- `hero-platter-stage-right`: **97.500** (38%)
- `bottom-feature-strip`: **97.100** (22%)

Remaining differences: exact 1:1 overhead platter stage (`platter-club.webp`) preserves the white ceramic salad bowl (crisp leaf lettuce, blackberries, cherry tomatoes, chickpeas, orange and cucumber slices), dark charcoal walnut and granola bowl, white pomegranate ramekin, two strawberries, loose berries, basil leaves, almonds, and half avocado at `x=426..856, y=150..600`; illegible synthetic strings in the reference navigation, body paragraph, CTA button (`NDSD NUDE`), and bottom icon captions are replaced with real English fitness club copy (`CLASSES`, `NUTRITION`, `BOWLS`, `CHEF TABLE`, `ORDER`, `VIEW MENU`, `Daily macro bowls`, `Balanced proteins`, `Organic harvest`, `Member delivery`) per rule `D06`, while preserving the distinctive `FFIFEET CTUB` wordmark, `Fitreess &` pink eyebrow, `Healthy Club / Food` display headline, and `ENIISKE` badge emblem. Below-the-fold sections (`#bowls`, `#nutrition`, `#plans`, `#order`, `#contact`) complete the single-page healthy bowl showcase.

Source technical/motion/scroll PASS: see `checks.json`, `source-checks.json`, and `screenshots/`. Verified across four actual desktop browsers (Chromium `153.0.8010.12`, Firefox `155.0`, Microsoft Edge `155.0.4283.62`, and Cốc Cốc `152.0.7977.124`) under OS `prefers-reduced-motion: reduce`; finite `requestAnimationFrame` intermediate frames, forward/backward wrap, keyboard arrows, pointer swipe, scroll-reveal intermediate frames, and session-only `Pause motion` all pass with zero idle animation loops. No-JS/no-font at `320×740`, `file://`, and equivalent 200% zoom (`720×450` DPR 2) verified.

Frozen source manifest: `7fde3234980436b5ec2dddd48f6ef9e1243c7af76ddaa0a5b2ec0cd78dd75c8e`. Safari, physical mobile devices, live payment processing, and paid-account download are not claimed.
