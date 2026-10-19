# Vertex Shops 1.0.0 · QA

Date: 2026-10-18. Scope: new standalone template only. No shared source, catalog, public demo, preview manifest, database or deployment changed.

## Brief and accepted exceptions

The user's supplied 14-section brief is retained in `brief.txt`. It explicitly requires one self-contained HTML, remote CloudFront PNGs, Google Fonts, fixed-canvas scaling, fitted type, continuous 37-card 3D rotation, `href="#"` CTAs and reduced-motion handling. These latest requirements override incompatible WEB-STATIC-1 rules and older animation defaults. The customer ZIP therefore contains exactly one `index.html`, not the usual six-file product. Documentation stays outside source/ZIP. No store integration was requested, so store cover/video generation is out of scope.

The brief contradicts itself on hover: its sample uses a 22px outer blur while its explicit DO-NOT contract limits blur to 8px and calls the earlier shadow list final. Implementation preserves that final shadow list on hover and applies only its brightness/lift. The full label `translate(2px,-1px)` fitter specification is preserved despite the later shorthand label-edge arithmetic.

## Actual environment and evidence

Windows, Playwright automation using Chromium 153.0.8010.12, installed Edge 155.0.4283.62 and installed CocCoc 152.0.7977.124 (headless). No Firefox, Safari, physical mobile device or WebKit test was performed. Edge/CocCoc are real installed executables, not user-agent emulation.

`checks.json` records first-pass file:// rendering at 1440×900, 820×1180, 375×812, 320×740, 1080×800, 1081×800 and 2560×1440. Screenshots were visually inspected at desktop, tablet and phone sizes. `interaction-checks.json` contains successful Chromium/Edge runs and an initial CocCoc navigation timeout; the successful CocCoc retry is in `coccoc-checks.json`. The earlier test harness pseudo-element lookup failure was fixed in the test harness, not the product. The first outside-click test targeted a headline covered by the open panel; its retry correctly clicks outside the panel. These were harness failures.

Successful interaction runs used HTTP, added 700/701 breakpoint checks, and recorded zero page errors and zero failed network requests. All supplied images loaded. Checked Escape and focus return, link-close, outside-close, repeated menu opening, 1080/1081 scale continuity, clearing fitter transforms after desktop-to-phone resize, rotation over time, reduced-motion freeze/entrance bypass/pulse removal, and image-error fallback. Desktop badge measured exactly 250×39 / 12px radius. 37 cards exist; 8–9 are visible. Two-column phone product grid and three-line visual heading were confirmed. Browser mock visually paints over the carousel.

Final ZIP was read back byte-for-byte against source, extracted, and opened through file:// in Chromium. `final-package-check.json` confirms 37 cards, no missing images, zero video elements and zero external scripts. `final-desktop.png`, `final-phone.png`, `final-menu.png` are from that extracted artifact.

## Repository checklist

| Check | Status | Evidence / limit |
|---|---|---|
| Q01 Structure | PASS by brief exception | Single-file source and ZIP; no local assets or frameworks. |
| Q02 Responsive | PASS | Tested nine widths from 320 to 2560; document scroll width equals viewport. Screenshots retained. |
| Q03 Interaction | PASS | Mobile menu, outside click, link click, Escape, resize, rotation and reduced motion in three installed engines. CTA destinations intentionally remain demo anchors. |
| Q04 Keyboard | PASS, limited | Escape returns focus; burger activation/focus ring checked. Full Tab/Shift+Tab and screen-reader audit not performed. |
| Q05 Semantics | PASS, limited | One accessible h1, main/nav landmarks, named burger/WhatsApp, decorative image alts, descriptive storefront alts. No external a11y certification. |
| Q06 Contrast | NOT TESTED | No formal pixel-sampled gradient contrast audit. Visual inspection only. |
| Q07 Fallbacks | NOT TESTED in full | Reduced motion and image-error handling tested. Full offline, disabled JS, font-failure and zoom 200% not tested. Ring/menu/type fitting require JS. |
| Q08 Browsers | NOT TESTED in full | Chromium, Edge, CocCoc passed; repository-required Firefox and physical mobile not tested. |
| Q09 Technical | PASS, bounded | No page errors / failed requests in successful runs; responsive UI and animation tested. No Lighthouse or performance certification. |
| Q10 Documentation / rights | NOT TESTED in full | Root README accurately describes scope and editing. Single-file exception replaces six-file guide package. Asset rights and official font licences not audited. |
| Q11 Final package | PASS by brief exception | Extracted one-file ZIP re-opened; bytes matched source. Hash below. |
| Q12 Store | N/A | Not requested; catalog, public demos, previews and deployments untouched. |
| Q13 Design | PASS against brief | Symmetric fixed hero and true cylindrical perspective ring with foreground overlap are the two key composition choices. |

D01–D04 and D08: PASS against explicit brief. D05: PASS at inspected sizes, zoom/font-failure not tested. D06: exact supplied English copy retained, including unconventional phrasing. D07: fictional Vertex/Glow demonstration only; ownership of remote assets not established.

Status: implemented and browser-checked against the supplied interface brief; not certified for commercial release under the unmodified repository standard. Live pricing, shop onboarding, WhatsApp business recipient and checkout are not implemented or fabricated.

## Package

- HTML bytes: 45789
- ZIP bytes: 14243
- SHA-256: `85453085209d164f814800a2b120944d2234fe588e93f516b7879897f348e0db`
- Archive entries: `index.html`


## Product-store release 2026-10-18

The owner authorised all three products to be packaged, pushed and deployed. Current release evidence and package hashes are authoritative in `../../.. /reviews/2026-10-18-three-products/QA.md` (path without the space: `../../../reviews/2026-10-18-three-products/QA.md`). Four-engine release checks, package byte comparison, docs/counts, store checks and video manifests are recorded there. Earlier single-file-package metadata is historical; the current delivery includes customer documents. Original visual/runtime limitations remain documented.
