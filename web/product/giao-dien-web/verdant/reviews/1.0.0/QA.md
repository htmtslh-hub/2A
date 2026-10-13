# Verdant 1.0.0 — QA

13/10/2026, Windows, WEB-STATIC-1 v1.2.1 with per-product W01/W03/W05/W06 exceptions authorised by the latest request for generated similar images, product transitions, scroll and store packaging. Eight files (six core + two local WebP), custom vanilla JS, ZIP 787117 bytes, SHA-256 7bdaa4022c83b997ff24678eddeec2cbe0a9bf2e12522cded9586a7e4fd3809d. These exceptions do not change shared standards. No DB/payment/price-policy changes.

## Product and design
Verdant is an original illustrative café concept, not a licensed third-party café site. The reference establishes cream/green palette, left two-line heading, price/copy/actions, three coloured drink selectors, large right cup/circle and floating beans. Generated drinks and a botanical emblem intentionally supply the similar original image requested. Extra sections: complete collection, craft scroll scene, concept story, email enquiry. No literal >95% fidelity certification is claimed; latest request is for a similar product and store delivery. No fake pixel/rubric score.

D01 PASS hero clearly introduces cream drinks and menu CTA. D02 PASS large circle/cup composition plus protruding mini-cup selectors and individual arch product images. D03 PASS collection explains flavours, craft explains layers, story explains concept, contact supplies enquiry. D04 PASS consistent tokens/system fonts and palettes. D05 PASS four viewport screenshots inspected, no cut text or horizontal overflow. D06 PASS specific English copy. D07 PASS fictitious concept disclosed, no reviews/certifications or third-party brand/logo. D08 PASS prices/brand/menu agree in initial HTML, data and cards. Size preference does not change price.

## Verification
| ID | Status | Evidence |
|---|---|---|
| Q01 | PASS with exceptions | Package/source byte roundtrip: 8 relative-path files, no hidden/temp/dependency files. |
| Q02 | PASS | release/checks.json: 1440×900, 820×1180, 375×812, 320×740, breakpoint and 44px targets; final-supplemental.json resize. |
| Q03 | PASS | candidate-checks.json carousel both wraps/rapid input, menu, details; final-supplemental.json keyboard and actual pointer swipe. Escape closes dialogs/menu, restores focus. |
| Q04 | PASS | release/checks.json skip link, focus, Tab/Shift+Tab, hidden menu skipped; native dialog close/focus. |
| Q05 | PASS | Single h1, landmarks, names, heading order and IDs; Chromium/Firefox axe no violations. |
| Q06 | PASS | release/checks.json contrast pairs and hover/focus; screenshot review. Text is on solid surfaces, product words are decorative and aria-hidden. |
| Q07 | PASS under current motion policy | file://, offline, no-JS/font fallback and zoom 200% in release/checks.json. Four-browser reduced-motion/saved-off defaults and visible pause tested in final-supplemental.json. Missing image fallback retained text/links. |
| Q08 | PASS | Chromium 153.0.8010.12, Firefox 155.0, installed Edge 155.0.4283.45 and Cốc Cốc 152.0.7977.124. Headless browsers on Windows; no Safari or physical-device claim. |
| Q09 | PASS | Local assets, no network dependency/analytics, no browser errors in template checks, finite RAF carousel and single-event scroll scheduling. No Lighthouse score claimed. |
| Q10 | PASS | 10 steps, 12 complete prompts, exact edit counts in CUSTOMISE verified by checker; six-file core paths preserved. System fonts, existing seven-clause commercial policy, generated asset provenance in ASSETS.md. No separate-AI user test claimed. |
| Q11 | PASS | Packaging tool re-read every ZIP entry and matched source bytes. release/checks.json tests extracted ZIP via HTTP and file://. |
| Q12 | Local PASS; online verification pending | local-store.json: vi/en/zh detail, guide, library, video play/pause, no card playback buttons, offscreen pause and three small widths. Existing 27 catalog entries unchanged; t28 only added. Anonymous download 401; direct private ZIP path 404. Actual paid purchase/download NOT TESTED, no entitlement fixtures or transactions created. |
| Q13 | PASS | D01–D08 and visual review above. |

### Old checker policy flags
The standard script exits 1 for precisely two historical Q07 checks: it expects all below-fold reveal nodes visible immediately under prefers-reduced-motion. Both engines correctly report allVisible=false/runningAnimations=0. The project's newer 05/10/2026 rule explicitly requires animation default ON even under that OS preference. These two flags are manually resolved against the current mandatory policy; no source change disables motion or edits the shared checker. Supplementary evidence tests actual midframes, both wraps, saved-off ignored, scroll/resize, pause and reload under reduce. No untested item was converted into a tested PASS.

## Interactions
Home/navigation/menu/browse link and menu CTA: true section links. Header bag: contact anchor, no cart. Size buttons: explicit preference status. Thumbnails/arrows/arrow keys/swipe: three drinks with image, colour, copy, price and selected-state update. Discover: native detail dialog, Escape and close. Email: mailto demo .example address requiring replacement. Pause: this page only, new load ON. No form submission, orders or payment functionality is simulated.

## Preview and scope
verdant.webp is a screenshot from the runtime. verdant.mp4 is a 14.97s native browser recording with two real flavour clicks, real scroll and return; H.264/yuv420p, 960×600/30fps, no audio, faststart. Frame contact sheet visually inspected. Manifest generated by recording tool; all 28 product recordings pass checksum checks. Local typecheck and production build pass. Shared view change only allows this product's own eight-file specs. Product source, private ZIP, public runtime/preview and these three-language entries are the only implementation scope. Existing untracked dualplay review work was preserved.

## Limitations
Safari, physical touch devices and actual purchase/paid download are NOT TESTED. Pointer swipe is exercised through browser input, not a physical touchscreen. Email is a demo reserved .example address. Menu prices/ingredients are illustrative and must be verified before customer publication. Online checks are appended after deployment.
