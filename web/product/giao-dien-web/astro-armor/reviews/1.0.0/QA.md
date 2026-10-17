# ASTRO Armor 1.0.0 — QA

17/10/2026, Windows. Profile WEB-STATIC-1 v1.2.1 with explicit user-approved W01/W03/W05/W06 exceptions: nine files, local JPEG/WebP, ZIP above 20 KB, and size/colour/session-bag interactions. User answer: “Đồng ý, ưu tiên bám ảnh mẫu”. No shared standard, database, payment, price or unrelated product changes.

| Check | Result and evidence |
|---|---|
| Q01 structure | PASS nine files; six required files plus three local images; relative paths; canonical ZIP extraction in package/checks.json. |
| Q02 responsive | PASS 1440×900, 820×1180, 375×812, 320×740 on Chromium/Firefox, no horizontal overflow and no undersized independent targets; nine additional reference/breakpoint checks in responsive.json. Tablet becomes stacked at 950px. Photographs retain square crop regions. |
| Q03 interaction | PASS size/colour pressed states, rapid switching, favourite, bag add/remove/subtotal, size table, single-item search, account information and native details. Menu Escape/link/resize verified. No order or payment simulated. |
| Q04 keyboard | PASS canonical skip/focus/Tab/Shift+Tab/menu checks; native dialog Escape returns focus; scrollable construction region is keyboard focusable. |
| Q05 semantics | PASS one h1, landmarks, labelled controls, native table and dialog names, zero axe violations in Chromium/Firefox. |
| Q06 contrast | PASS chromium: 23 pairs, 0 failures; firefox: 27 pairs, 0 failures; original photographic crops contain no overlaid UI text. Focus outline and hover pairs recorded in package/checks.json. |
| Q07 fallback | PASS no-JS/no-font, file://, offline, equivalent 200% zoom, OS reduce, saved-off keys ignored, missing-image title/bag, and missing IntersectionObserver. Main finite RAF motion works with CSS animation and transition disabled. |
| Q08 browsers | PASS chromium 153.0.8010.12; firefox 155.0; desktop interactions and intermediate motion also tested on Edge 155.0.4283.62 and Cốc Cốc 152.0.7977.124. Actual Safari and physical devices: NOT TESTED. |
| Q09 technical | PASS zero canonical console/network errors; finite motion with no idle animation loop; package size 415024 bytes under approved size exception. No remote runtime/font dependency. |
| Q10 docs/assets | PASS 10 steps, 12 complete prompts, literal edit counts verified, no required prompt fields left unfilled. System fonts only, no font redistribution. User-supplied reference and built-in ImageGen provenance in ASSETS.md; no trademark endorsement claimed. No claim of testing prompts in another AI. |
| Q11 final ZIP | PASS 415024 bytes; SHA-256 bd2e95c79ba3023adac2dac076b3368e041e3243879dc9f1a95f26bb1ed6a846; nine extracted files byte-identical to source. file:// and HTTP tested from the official extracted ZIP. |
| Q12 store | PASS local store; online verification pending. Premium membership policy inherited; no price override or entitlement changes. Real paid-account download and real payment completion: NOT TESTED, no test entitlement fabricated. |
| Q13 design | PASS D01–D08 and weighted visual rubric 96.164; rubric is not pixel accuracy. See ACCEPTANCE.md and comparison diagnostics. |

## Design checks

- D01 PASS: product name, jacket, $560 display price and bag CTA identify the concept immediately.
- D02 PASS: three-column editorial product layout and beige/orange technical garment with original detail strip are specific to the reference.
- D03 PASS: product information answers what/fit; construction explains detail; story supplies context; footer supplies a clearly replaceable contact.
- D04 PASS: shared colour/font tokens, readable source body/caption sizes, consistent controls.
- D05 PASS: manually reviewed desktop, tablet/phone, 950/951 and 1100/1101 breakpoints; no clipped text or page overflow. Jacket and detail image ratios verified.
- D06 PASS: English concept copy; useful materials/shipping labels replace lorem headings.
- D07 PASS: no invented testimonials, certifications or customer proof. Specifications, locations, price and brand use are explicitly concept/demo material.
- D08 PASS: $560 unit price and bag arithmetic match; sizes S/M/L/XL and four colour previews remain consistent.

## Motion and actions

- chromium 153.0.8010.12: mid-colour opacity 0.738028, settled opacity 1; scroll middle matrix(1, 0, 0, 1, 0, -11.4286), end matrix(1, 0, 0, 1, 0, -20), reverse matrix(1, 0, 0, 1, 0, 0); add/remove/favourite/size/search/dialog checks passed.
- firefox 155.0: mid-colour opacity 0.816953, settled opacity 1; scroll middle matrix(1, 0, 0, 1, 0, -11.4286), end matrix(1, 0, 0, 1, 0, -20), reverse matrix(1, 0, 0, 1, 0, 0); add/remove/favourite/size/search/dialog checks passed.
- edge 155.0.4283.62: mid-colour opacity 0.73608, settled opacity 1; scroll middle matrix(1, 0, 0, 1, 0, -11.4286), end matrix(1, 0, 0, 1, 0, -20), reverse matrix(1, 0, 0, 1, 0, 0); add/remove/favourite/size/search/dialog checks passed.
- coccoc 152.0.7977.124: mid-colour opacity 0.780204, settled opacity 1; scroll middle matrix(1, 0, 0, 1, 0, -11.4286), end matrix(1, 0, 0, 1, 0, -20), reverse matrix(1, 0, 0, 1, 0, 0); add/remove/favourite/size/search/dialog checks passed.

## Package assets

- assets/img/armor-beige.webp: 152818 bytes, SHA-256 f6ad8ec063937b0392d45a234ba08179a512566cceac94fad4b00f664a759ec5
- assets/img/armor-red.webp: 144412 bytes, SHA-256 26be80dbafac93101bc31ea9a5730f074f96ce00d18f5e46b40ba5da8464c3df
- assets/img/armor-reference.jpg: 96321 bytes, SHA-256 fe005bd5bbd2c50a793cb7e6b9146e529a1875c215f1a5d08c5bdded09e32301

## Limits and scope

The default garment and model/detail thumbnails are local CSS crops of the original 820×746 reference; their resolution is limited to that supplied image. Red is reconstructed; black/white use filtered previews. No high-resolution product photography, stock, authentication or real checkout is promised. The native picture crop is not a screenshot-as-website implementation: headings, body copy, controls, sizing and bag are editable code.

Production release started from commit 81d4ddbdd6b3e716d57a03a59670fd6854e2a52d and was synchronized with newer production commit 922ae44c6876baec628ef8518327da2a1d8b8f21 (FitClub Food and Chain Warden) through merge eb68ace. All 49 catalog demo/video hashes now pass. Existing production HTML/CSS/JS for both new products matched live bytes (current-production-baseline.json). Windows checkout line-ending conversion was corrected back to existing recorded bytes; all 46 pre-existing demo/video hashes passed before adding ASTRO. This preserves deployed products without taking unrelated dirty workspace changes. New scope: product source/ZIP/reviews; ASTRO public demo/preview; additive catalog/guide/recording entries and one product-specific specs whitelist addition.
