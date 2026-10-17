# ASTRO Armor acceptance — PASS

17/10/2026. WEB-STATIC-1 v1.2.1 with user-approved W01/W03/W05/W06 exceptions.

Weighted visual rubric: **96.164**; strict threshold >95, each region >95. This is a design assessment, not pixel accuracy. Actual source render: comparison-candidate.png; original reference, crop/scale inference, region weights and per-axis reasons in REFERENCE-MAP.md and acceptance.json.

| Region | Weight | Geometry | Type | Surface | Imagery | Spacing | Score |
|---|---:|---:|---:|---:|---:|---:|---:|
| navigation | 10 | 97 | 96 | 94 | 96 | 96 | 95.95 |
| information | 18 | 96 | 96 | 94 | 98 | 96 | 96.2 |
| product-stage | 45 | 97 | 96 | 94 | 97 | 97 | 96.35 |
| options | 17 | 96 | 95 | 95 | 98 | 96 | 96.15 |
| construction | 10 | 96 | 94 | 94 | 98 | 94 | 95.5 |

Residual differences: clean ivory instead of full photographic grain, system-font metrics, slightly larger readable captions/body copy, small CSS contour deviations and construction-card gap drift. All four reference photographs and default jacket are actual user-supplied pixels, used only as product/detail image crops; all UI is editable HTML/CSS/JS. No screenshot-as-website layer. Lorem headings were replaced with meaningful materials/shipping labels to meet the content standard.

Animation/scroll: PASS/PASS. Four actual browsers and intermediate frames in interactions.json. Chromium/Firefox four-view responsive, menu, focus, axe, contrast, offline/no-JS/file and zoom checks: PASS in package/checks.json. No mobile reference supplied. No input video. Safari/physical devices and real purchase-download: NOT TESTED, outside this static candidate verification.

Source manifest: 202fdc0331a20e657d514a4748d29c7d755d265fe0409d2735c86eee82207fae. The official customer ZIP has passed canonical checks and matches all source bytes. The detail-image aspect correction was also revalidated at nine viewport/breakpoint combinations (responsive.json). Source changes invalidate this gate. Commercial package/demo/store/online verification follow only after PASS.
