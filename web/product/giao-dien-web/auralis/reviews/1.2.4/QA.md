# Auralis1.2.4 — directional product carousel

2026-10-05, Asia/Bangkok.

User requests that the departing product moves opposite the incoming product, including3→1 without moving back through product2. Existing modulo-only positioning sent the old selected model right on Next. New showProduct tracks direction: Next sends old left/new from right; Previous reverses. The unrelated third image is repositioned with transitions disabled; after1.05s, settleCarousel recycles background previews without crossing the center. A finite1100ms timer/one RAF can be cancelled for rapid input. Incoming/outgoing classes and ARIA select the destination directly. Pausing cancels the carousel and places the selected model immediately. Scene-scroll choreography and centered controls CSS unchanged.

Existing W01/W03/W05/W06 exceptions remain;10 files and four generated WebP assets. No new dependency, claims or licence changes. Final ZIP348170 bytes, SHA25654ba3c91ba69e8c003543b53ae648cc7fbd248ebe7a1943d374a29730ec8335b. Source/docs/demo/previews/catalog/hosting revision1.2.4.

## Evidence

- release/checks.json PASS from final ZIP, sourceMatchesExtracted true. Chromium153/Firefox155, four required viewport sizes, menu/keyboard/focus/axe/contrast/noJS/file/offline/reduced/reflow/docs.
- carousel.json PASS: installed Cốc Cốc152 isolated profiles desktop1440x900,tablet820x1180,mobile375x812; Edge154 desktop1440x900. Reduced motion+explicit opt-in. Six directional changes each:1→2→3→1→3→2→1. Intermediate outgoing translation has opposite sign; incoming starts on requested side; third model opacity<=.47 throughout; selected model/counter match. Keyboard reverse/forward wraps, rapid-click final model+copy, immediate paused selection PASS. Mobile touch handler checked by constructed TouchEvents, not physical touch hardware.
- layout.json PASS:16 motion-on/off cases across1440x900,820x1180,1180x820,768x1024,1024x768,375x812,320x740,414x582. Center offset0, no overflow or overlap with scroll link, phone arrows48px. Centered layout retained.
- Cốc Cốc browser recording coccoc-carousel.webm includes forward/backward wraps and three scene transitions (latest online test recording). Public preview18.6s was encoded from the successful local recording of the same final code; separate8.4s proof clip shows carousel sequence. The first test attempt stopped at incomplete TouchInit in the QA harness; fixed TouchEvent construction and reran all four cases successfully. No product-code error was involved in that harness failure.
- npm run build PASS, including TypeScript. Syntax check PASS. Vercel production build PASS; online deployment checks PASS.

## Q01–Q13

| Code | Status | Evidence / limit |
|---|---|---|
| Q01 | PASS with existing exceptions |10 files/plain HTML CSS JS/four local generated images.|
| Q02 | PASS |Required package checks and16 layout cases.|
| Q03 | PASS |24 directional transitions, wraps/keyboard/rapid clicks/simulated touch/pause; scene CTAs exercised in recording.|
| Q04 | PASS |Final package keyboard/focus/menu.|
| Q05 | PASS internally |Final package axe/structure.|
| Q06 | PASS internally |Final package contrast; colors/type unchanged.|
| Q07 | PASS in scope |Final noJS/offline/reduced/reflow; paused model selection immediate.|
| Q08 | PASS in scope |Chromium153/Firefox155 and installed Edge154/Cốc Cốc152 isolated headless. Daily user profile/Safari/physical devices NOT TESTED.|
| Q09 | PASS |No errors in final carousel/layout; finite RAF/timer, no auto-advance.|
| Q10 | PASS |Docs updated for direction and reset timing; final counts PASS; licence unchanged.|
| Q11 | PASS |ZIP final hash/bytes/readback above.|
| Q12 | PASS in scope |production-checks.json: t9 visible,11 assets200,protected anonymous401,ZIP in build trace. No real purchase/authenticated download.|
| Q13 | PASS local/online |Previews/video from final source; production-carousel/cache/video/checks all PASS.|

D01–D08 retained: only carousel motion behavior corrected, no visual redesign. Production deployment dpl_3HUW77NXc1xpX8EhUYkqi9QPxNaL READY; alias https://forgezone.store. Demo https://forgezone.store/demos/auralis/index.html?v=1.2.4&motion=on.

production-carousel.json PASS: all four native engine/viewport cases,24 directed transitions including both wrap directions, keyboard, rapid input, simulated mobile touch and immediate paused selection. No errors/failures. production-cache.json PASS: old links→1.2.4 preserving motion choice; new CSS/JS revisions and no-store; scene CTA/reload/pause retained. production-video.json PASS on Edge/Cốc Cốc: actual currentTime advances, offscreen pause/return, manual pause persists,18.6s revision1.2.4 and correct demo link. production-checks.json confirms t9 visible, all11 assets200, anonymous download401 and ZIP in build trace.

IAB existing tab opened1.2.4 and shows enabled motion and first product. Actual user's everyday Cốc Cốc profile remains inaccessible through native UI policy; no alternate method accessed that profile. Native engines here run in separate development test profiles.
