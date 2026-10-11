# Ember Arcade — QA 1.2.0

2026-10-09. Scope: dimensional hero with separate alpha foreground and scenery. Character extends52px above rounded card on desktop,40px on phones. Background stays locally clipped; text and CTA remain above imagery. No JavaScript or lower dashboard changes. Source, product-only demo and preview, ZIP/docs/reviews updated; no shared catalog/backend/config/deploy changes.

W01/W03/W05/W06 exceptions from approved image dashboard retained and expanded for requested layers. Six core files + five local WebPs =11 files. ZIP898381 bytes (<1MiB), SHA-256 `da3fc9a374c5f338d225267e120ecc050eeb6abb9a8b4fa0313abeb62436bc42`. Character1440×960162510 bytes; background1440×960148504 bytes. Character alpha verified: transparent pixels exist, preserved through WebP conversion. Original PNGs and prompts in design/; generated with builtin imagegen. No external font/network dependencies.

Licence seven-section policy and owner remain unchanged; asset inventory corrected to five artwork files, same website-use rights. CUSTOMISE updated for two layers and five images; ten steps and twelve prompts retained.

## Checks

| Item | Status | Evidence |
|---|---|---|
| Q01 Structure | PASS exception | Eleven intended ZIP files; package reread matches source. |
| Q02 Responsive | PASS | Edge1440/1024/820/768/375/320, images decode and scrollWidth=width; Chromium/Firefox four standard sizes. |
| Q03 Interactions | PASS | Search/empty/Escape/slash; favourites persistence/remove/blocked storage; menu and native/hash notes. interactions.json. |
| Q04 Keyboard | PASS | Skip, focus, menu Escape and focus return, native summaries. |
| Q05 Accessibility | PASS internal | Checker structure/labels/SVG/axe. Not an external certification. |
| Q06 Contrast | PASS internal | Pixel pairs and hover checks in browser reports; desktop/mobile screenshots reviewed. |
| Q07 Fallback | PASS | 200% zoom, offline/file/noJS, missing images, reduced preference retains finite motion per owner rules. |
| Q08 Browsers | PASS tested scope | Chromium153.0.8010.12, Firefox155.0, Edge155.0.4283.45 Windows headless. Safari/Cốc Cốc NOT TESTED. |
| Q09 Technical | PASS | No Edge runtime errors, full checker console/network. No load benchmark performed. |
| Q10 Documentation | PASS | Inventory and layer edit map, ten steps/twelve prompts and literal counts checked. Licence policy preserved. |
| Q11 ZIP | PASS | Packaging reads each entry back; release checker tests extracted final ZIP. |
| Q12 Store/live | N/A | Local demo/preview only; no store purchase or deployment. |
| Q13 Design | PASS internal | Existing dashboard kept; layered hero meets requested protrusion. |

D01–D08: PASS internal. CTA opens real native notes; two rails and pop-out character provide specific visual identity; section order unchanged; palette/type/actions consistent; no clipped text at tested sizes; English fictional-world copy remains coherent; no unsupported franchise/online claims; sample playtime totals unchanged. Character retains identity/pose; lower silhouette is cut locally to card corners. At phone widths the fox is partly outside the crop, prioritising courier and readable title. Background removal images are additional layers; original complete scene stays for thumbnail/activity usage.

Edge screenshot review: preview1396×1047 and375×812 full-page viewed; preceding1024/320 checks and automated geometry cover narrower layouts. No whole-page overflow suppression introduced. Preview698×524 regenerated from final rendered code. CSS/JS/assets copied from source, demo HTML differs only by its base URL.

final/ report is pre-document wording correction; release/ records final package hash above. No known outstanding failure within tested scope.