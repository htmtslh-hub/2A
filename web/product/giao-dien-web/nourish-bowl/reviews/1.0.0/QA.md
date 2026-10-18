# QA — Nourish Bowl 1.0.0
16/10/2026. WEB-STATIC-1 standards 1.2.1 used as baseline; raster/size candidate, not a conforming commercial release. Scope: new nourish-bowl source/reviews only.

| Check | Status | Evidence/limitations |
|---|---|---|
| Q01 | FAIL | Eight files: required six plus two raster images, not six-file SVG profile |
| Q02 | PASS | Chromium/Firefox 1440×900, 820×1180, 375×812, 320×740 plus ref868×874; scrollWidth=clientWidth, image loads |
| Q03 | PASS | All internal anchors exist; mobile toggle/Escape/focus, select-link close and breakpoint reset; native bowl details open |
| Q04 | NOT TESTED | Skip to main and Escape focus PASS; full Tab/Shift+Tab sequence not completed |
| Q05 | PASS | One h1, landmarks/labels, inline decorative SVG hidden; axe 0 Chromium violations |
| Q06 | NOT TESTED | axe has no findings, but full manual contrast/gradient/hover audit pending |
| Q07 | NOT TESTED | No-JS 320 navigation, offline file, OS reduce still animates; zoom-equivalent720×450 only, not actual browser200% |
| Q08 | PASS | Chromium153.0.8010.12/Firefox155.0 Windows file URL, Chromium HTTP supplemental. No other browser claims |
| Q09 | NOT TESTED | No pageerrors, local assets/no fonts/API; full network/performance/package bytes pending |
| Q10 | FAIL | Ten-step/twelve-prompt guide and measured literal map written; copyright holder and commercial raster terms unresolved |
| Q11 | N/A | No ZIP: release gate FAIL |
| Q12 | N/A | No store/catalogue/deployment scope |
| Q13 | FAIL | Similar visual direction but below strict >95 rubric; see ACCEPTANCE.md |

D01 PASS fresh food/bowl purpose and CTA; D02 PASS navy/cyan and two oversized overhead food compositions; D03 PASS benefits/ingredients/bowls/preparation each distinct; D04 PASS token/type consistency; D05 PASS at inspected desktop/mobile screenshots, intentional decorative clipping; D06 PASS original English demo text replacing illegible reference; D07 PASS no fake verified clients/health claims; D08 PASS no conflicting prices/nutrition metrics.

Interactions: nav→real sections; main CTA→#bowls; ingredients CTA→#recipes; native details expand ingredient suggestions without JS; mailto uses example address (replace before publication). No backend/order/checkout/account/form submission or false success. Recipe content illustrative, not medical guidance.

Assets: blue-fruit-bowl.png 2,448,151 bytes; fruit-serving-platter.png 2,696,742 bytes; both imagegen RGBA1254×1254 alpha0–255, copied unchanged. Exact prompts in IMAGE-PROMPTS.txt; metadata/hash in assets.json/source-manifest.json. Original screenshot is not in source. W01/W03/W06 departures are not shared-rule changes or claims of approved commercial exceptions. No fonts distributed, system stacks only. ZIP bytes/hash N/A.

Candidate-checks midReveal on nested h2 is not a valid measurement; see motion-checks.json for actual wrapper intermediate/end motion. Technical/release gaps kept explicit. No changes outside new product folder; existing coffee sites preserved.
