# Firepower 1.0.0: source acceptance

Gate PASS. Weighted visual rubric **96.170**, strict threshold >95.00. This is a documented visual-review score, not pixel accuracy or a manufacturer fidelity certification. Frozen source hash: 2afb7e7ab8d4b5f8fe7a89375f6102c618b3fcce246e583a418c0514a38e6b93.

Reference 534×1028, no crop. Render 1440×2772 at DPR 1 and zoom 1; fixed uniform scale 534/1440, one-pixel height rounding only. See reference-view.png, comparison-actual.png, comparison-frozen/side-by-side.png, overlay.png and difference.png. Region weights were fixed in BRIEF.md before implementation.

| Region | Weight | Geometry / type / surfaces / imagery / spacing | Region score |
|---|---:|---|---:|
| navigation | 8% | 98 / 96 / 97 / 95 / 98 | 96.700 |
| hero | 36% | 98 / 97 / 96 / 94 / 97 | 96.350 |
| make-your-play | 24% | 97 / 96 / 96 / 94 / 98 | 96.050 |
| detail-gallery | 20% | 98 / 97 / 95 / 92 / 97 | 95.700 |
| visible-product-section | 12% | 98 / 96 / 97 / 94 / 97 | 96.300 |

Full reasons are in acceptance.json. Remaining small differences: generated wheel/grip/component internals, system wordmark, social glyphs and texture grain. The reference is compressed and supplies no source fonts or official renders. Original poses, component order, heading hierarchy, section boundaries and cyan controls are retained. No screenshot is used to simulate a functioning page. Bottom continuation is completed below the reference's crop. Mobile visual comparison N/A because no reference mobile was supplied.

Pixel diagnostic: MAE 12.244, tolerance-16 pixel match 77.301%. These figures do NOT produce the design score or PASS.

Animation PASS: actual intermediate transforms/opacity in Chromium, Firefox, Edge and Cốc Cốc with OS reduce and old saved-off state; both wraps, rapid clicks, arrow keys/swipe, pause/reload, CSS-disabled fallback. Scroll PASS: actual trigger/mid/settled/reverse states and finite cleanup. Browser versions and evidence are in source-checks.json and evidence/.

Technical source PASS: four viewports and breakpoint, no overflow/small controls, keyboard/menu/skip, axe, no JS, native details, offline file://, missing artwork, no console/network failures; contrast and 200% equivalent layout in supplement.json. Fonts are local system fonts. Ten customer steps, twelve complete AI prompts and literal counts checked.

No input video: video coverage N/A. Store recording, ZIP roundtrip, build and online checks follow as release verification. Paid-account download and actual payment require an authorised account/transaction and are not included in source PASS. Safari and physical devices are not claimed as tested.

Official extracted checker: two raw external-HTTPS false positives preserved in checks.json. Actual target/new-tab behavior passes in external-links.json. No shared checker changes or artificial source changes were made to obtain a green result. See QA Q03.
