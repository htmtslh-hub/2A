# Cyber Ronin · 1.0.0

Date: 2026-10-18. Scope: new single-file Cyber Ronin hero only. No changes to Vertex Shops, VEYRA, shared store files, configuration, public previews, database or deployments.

## Brief exceptions

The latest supplied prompt explicitly requests one HTML with inline CSS/JS, the exact remote background-image URLs, Inter/Orbitron font imports, SVG paths, interactive spotlight, small typography/control dimensions, no framework and reduced-motion handling. These override the incompatible six-file WEB-STATIC-1 package, local-only images, menu-only JS and older always-on-motion rules. The ZIP therefore contains only index.html. No store listing/video integration is included. No new media is generated and no third-party asset licence is asserted.

The specified three icon buttons and Reserve Now CTA are presentation elements. The prompt supplies no destinations, reservation endpoint or behaviour for those buttons; this implementation does not fabricate a reservation flow or successful order. Mouse/touch spotlight and entrance/reveal behaviour are implemented. The given copy, product claims and specs are fictional demo content.

## Actual checks

`checks.json`: Chromium 153.0.8010.12 on Windows, HTTP preview, 1440×900, 820×1180, 375×812, 320×740, 1024×768, 900×900, 768×1024, 720×900, 480×850, 360×800, 1920×1080. No horizontal overflow; specs fit the hero height. Three heading lines; continuous heading word stagger; responsive mask radius; mouse coordinates; touchmove mask; reduced motion; no-IntersectionObserver immediate fallback; no-JS visible copy. All three exact remote images loaded; no page errors or failed requests. Desktop and phone screenshots visually inspected. The initial harness incorrectly expected the literal word circle in browser-serialized CSS; Chromium canonicalizes the radial gradient to a pixel radius. The harness assertion was corrected without changing the product mask.

`browser-smoke.json`: actual installed Edge 155.0.4283.62, actual CocCoc 152.0.7977.124 and Chromium 153.0.8010.12. Sampled mid-entrance opacity/scale, phone mask, reduced-motion animation removal, and the Reserve Now 1px hover lift passed. The hover lift uses individual translate to compose with the fade animation's retained transform. This preserves the requested visual lift after entrance. No JavaScript errors in those runs.

`spotlight-pixels.json`: before/after screenshots show a real pixel change in the cursor spotlight region, in addition to the CSS mask coordinate checks. This confirms the alternate scene is painted, not just an updated CSS string.

`package.json`: ZIP has exactly one index.html. Extracted bytes match source. Package is checked separately through file://. No external application script, local image, build or framework dependency.

## Q01–Q13

| Check | Status | Notes |
|---|---|---|
| Q01 | PASS by latest brief exception | One-file HTML package. |
| Q02 | PASS | Eleven viewport sizes, no horizontal overflow, screenshots. |
| Q03 | PASS for requested effects | Mouse/touch spotlight and reveal observers. Buttons have no supplied business action. |
| Q04 | NOT TESTED in full | Named native buttons and focus-visible CSS present; complete keyboard audit not run. |
| Q05 | PASS, bounded | One h1, main landmark, named icon controls, decorative SVG/backgrounds; heading labels retain spoken word boundaries. |
| Q06 | NOT TESTED | Exact supplied translucent colours preserved; no full contrast audit. |
| Q07 | PASS, bounded | Reduced motion, no IntersectionObserver and no-JS text fallback tested. Offline/200% zoom not tested. |
| Q08 | NOT TESTED in full | Chromium, Edge and CocCoc tested. Firefox, Safari and real devices not tested. |
| Q09 | PASS, bounded | No page errors/failed requests; images loaded. No Lighthouse claim. |
| Q10 | NOT TESTED in full | No asset/font licence audit or standard six-file customer guide; latest brief requires only HTML. |
| Q11 | PASS by latest brief exception | One-file ZIP read back and extracted; package metadata retained. |
| Q12 | N/A | Store integration/deployment not requested. |
| Q13 | PASS against supplied composition | Exact orange/cream palette, large background scene with cursor reveal, anchored product card/specs and responsive layout. |

D01–D04/D08: PASS against explicit brief. D05: checked at the eleven dimensions, not 200% zoom. D06/D07: supplied fictional copy/specifications preserved; not factual engineering claims or third-party endorsements.

Status: implemented and checked against the supplied visual/effect brief; not certified for commercial release under the unmodified WEB-STATIC-1 standard. Network access is required for exact images/fonts. Static button actions require a separate destination/interaction brief.


## Product-store release 2026-10-18

The owner authorised all three products to be packaged, pushed and deployed. Current release evidence and package hashes are authoritative in `../../.. /reviews/2026-10-18-three-products/QA.md` (path without the space: `../../../reviews/2026-10-18-three-products/QA.md`). Four-engine release checks, package byte comparison, docs/counts, store checks and video manifests are recorded there. Earlier single-file-package metadata is historical; the current delivery includes customer documents. Original visual/runtime limitations remain documented.
