# Motora 1.0.0 — QA

15/10/2026, Windows. WEB-STATIC-1 v1.2.1 with W01/W03/W05/W06 exceptions for the explicitly requested photographic, interactive reference reconstruction. Eight files rather than six, two original raster assets, finish/detail/configuration interactions and ZIP453580 bytes. No shared standard changed. Acceptance rubric96.506, source manifest in acceptance.json; this is a visual rubric, not pixel accuracy.

## Browser evidence

Chromium153.0.8010.12, Firefox155.0, Edge155.0.4283.45 and Cốc Cốc152.0.7977.124, actual installed executables. source-checks.json has zero failures after refinement. Tested1440×900,820×1180,375×812,320×740 and950/951px. Official extracted-package checker: checks.json; sourceMatchesExtracted=true, eight correct files, SHA-256867aa9a423387e1a8f81dec13c8e041bcd1f929f4370abc461eb98acfe049438.

The official generic checker reports two legacy Q07 failures (Chromium/Firefox allVisible=false under OS reduce). That expectation conflicts with the newer owner rule in AGENTS.md dated05/10/2026: motion must default ON, including OS reduce. Offscreen reveal sections remain waiting until actually scrolled into view. They reveal correctly on scroll, including under reduce, and Pause motion explicitly reveals all. source-checks.json measures this required ON behaviour, middle frames, forward/reverse scroll and cancellation. The checker and its raw failures are preserved; no shared script or result was weakened. This is policy reconciliation, not an unresolved render defect.

| Item | Status / evidence |
|---|---|
| Q01 structure | PASS under documented exceptions; six core files + coupe/interior WebP. No framework, secrets or temporary files in ZIP. |
| Q02 responsive | PASS four sizes and breakpoint, no document overflow.44px controls. Full-page screenshots captured after real reveal scrolling in evidence/complete-*.png; extracted-package screenshots also reviewed. |
| Q03 interaction | PASS categories,5 finishes, directional arrows, both wraps, rapid cancellation, keyboard,4 hotspots,5 spec dialogs, configuration, wheel summary, local save, one-model search and empty result, native accordions, email URL, menu close/link/resize/Escape. No fake delivery/order. |
| Q04 keyboard | PASS skip link, Tab/Shift+Tab, hidden menu skipped, Escape restores opener; checks.json and supplement.json. |
| Q05 structure | PASS one h1, headings/landmarks, labelled SVG/control, no duplicate IDs; axe no violations in four browsers. |
| Q06 contrast | PASS extracted-package measured pairs; no failed pairs. Text-soft606468 onf6f6f4=5.51:1. Hotspot24272a on conservativeababab translucent-white worst case=6.54:1. Focus9b471b/light,3px; dark Experience usesb6602b/191b1b=3.87:1. Visually checked labels on the vehicle and seat-card crop; readable solid/translucent surfaces preserve contrast. |
| Q07 fallback | PASS per current owner motion policy; see explicit reconciliation above. NoJS static5 cards/nav/contact/accordions, fresh offline file, blocked images, OS reduce, stale-off, session pause/reload,200% equivalent720×450@2. No external font dependency. |
| Q08 browsers | PASS four named browsers via HTTP and file://; no claim about Safari or physical devices. |
| Q09 technical | PASS no page exceptions/local404, finite timelines, no idle RAF, actual scroll progress reverse/mobile/resize, CSS-animation disabled fallback. ZIP453580 bytes. |
| Q10 documents/rights | PASS10 steps,12 complete prompts, zero count errors/unfilled markers. Artwork provenance ASSETS.md, system fonts, established7-section licence. Readability/content accuracy reviewed; prompts have not been run through a separate AI account. |
| Q11 final package | PASS official ZIP roundtrip byte equality plus extracted file/HTTP/offline/noJS/zoom/menu tests. |
| Q12 store | Release verification recorded separately in local-store.json / online-store.json and RELEASE.md. Premium default, catalogt35, commerce;3 locales, poster + actual browser video. Paid-account download is NOT TESTED; no authorised test account supplied, no entitlement writes performed. Anonymous/direct-path guards and traced ZIP are checked. |
| Q13 design | PASS D01–D08 below; remaining differences in acceptance.json. |

## D01–D08

D01 PASS: vehicle identity, explore/configure and email actions. D02 PASS: full-width side-profile configurator with glass hotspots plus compact technical card strip; original cabin scroll scene. D03 PASS: hero explores, Experience shows materials, detail accordions explain, configuration prepares an enquiry, footer contacts. D04 PASS: one system font family, shared colour/type/spacing/button tokens. D05 PASS after real scroll and responsive review; local feature overflow is intentional and reachable. D06 PASS concrete English copy with all example content disclosed. D07 PASS original AI assets, no fabricated customer/verification claims; trademark affiliation disclaimed. D08 PASS consistent four seats/V8/503hp/9G;3.7s is0–60mph while4.0s is0–100km/h, clearly illustrative.

## Limits

One generated car with CSS filters, not3D or factory paint simulation. Wheel selection changes summary only. Saved state lasts the page visit, email opens an app, no order/backend. Screenshot microcopy and the original font are not fully recoverable at390×284; typography/details reconstructed by role and reported in the visual rubric. Safari, physical devices, real email delivery and payment/paid-account download NOT TESTED. No unresolved source/UI blocker under the stated scope and exceptions; store completion is evidenced by release verification.
