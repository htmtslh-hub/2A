# Sonicore 1.0.0: source acceptance

Gate PASS. Weighted visual rubric **96.392**, strict threshold >95.00. This is a documented visual-review score, not pixel accuracy or a manufacturer fidelity certification. Frozen source hash: `3705ea7b6711bec3e84c808abacf15d13b1b5da6b960e3974314ab0e34920349`.

Reference `663×1024`, no crop. Render `1440×2224` at DPR 1 and zoom 1; fixed uniform scale `663/1440`. See `reference-view.png`, `comparison-actual.png`, `comparison-frozen/side-by-side.png`, `comparison-frozen/overlay.png` and `comparison-frozen/difference.png`. Region weights were fixed in `BRIEF.md` before implementation.

| Region | Weight | Geometry / type / surfaces / imagery / spacing | Region score |
|---|---:|---|---:|
| navigation | 8% | 98 / 96 / 97 / 96 / 98 | 97.000 |
| hero | 32% | 97 / 97 / 96 / 95 / 97 | 96.350 |
| engineered-exploded | 24% | 97 / 96 / 97 / 95 / 97 | 96.300 |
| spatial-audio | 16% | 97 / 96 / 97 / 95 / 97 | 96.300 |
| designed-future | 12% | 97 / 96 / 97 / 95 / 97 | 96.300 |
| reviews-and-widget | 8% | 97 / 96 / 97 / 96 / 97 | 96.550 |

Full reasons are in `acceptance.json`. Remaining small differences: generated 3D product microgeometry, particle distribution and reconstructed vector icons. Two external viewer pills (`"↗ Truy cập trang"` and `"Tìm kiếm hình ảnh 🔍"`) at the bottom of `reference.png` are host UI artifacts and were excluded so the underlying review cards and floating `SPATIAL MODE` widget remain clean. Bottom continuation (`#support` specifications and `#preorder` email enquiry + footer) is completed below `y = 2224`. Mobile visual comparison N/A because no reference mobile screenshot was supplied.

Pixel diagnostic: MAE `24.085`, tolerance-16 pixel match `66.787%` (reflecting the two excluded viewer pills in `reference.png` and generated 3D particle textures). These figures do NOT produce the design score or PASS.

Animation PASS: actual intermediate transforms/opacity in Chromium, Firefox, Edge and Cốc Cốc with OS reduce and old saved-off state; both wraps, rapid clicks, arrow keys/swipe, pause/reload, CSS-disabled fallback. Scroll PASS: actual trigger/mid/settled/reverse states and finite cleanup (`0` idle RAF frames). Browser versions and evidence are in `source-checks.json` and `evidence/`.

Technical source PASS: six viewports (`1440`, `951`, `950`, `820`, `375`, `320`), zero overflow or undersized controls, keyboard/menu/skip, axe-core (`0` violations), no JS at `320px`, native details, offline `file://`, missing artwork resilience, zero console/network failures; contrast and 200% equivalent layout in `supplement.json`. Fonts are local system fonts. Ten customer steps, twelve complete AI prompts and literal counts checked.
