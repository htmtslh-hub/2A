# Auralis 1.2.3

Center previous / count / next on all layouts. Source CSS grid uses equal side tracks and a centered control. At <=950px the control has a dedicated row; at <=650px arrows48x48px and the duplicate bottom model label is hidden. Short phones hide the duplicate scroll hint and use5:3 contain-fit carousel, preserving image ratio and leaving space above controls. JS/LICENCE unchanged. Docs, ZIP, public demo/previews/video/catalog version synced. Previous cache/redirect delivery fix updated to1.2.3.

Existing authorized W01/W03/W05/W06 exceptions: ten files, four original generated WebP, expanded product/scene interaction, ZIP over20KiB. Final ZIP347344 bytes, SHA25680205ec973080595e87856085aee21b476b7df5655609d4ce4b191f53e49247e. Root checks.json is preliminary347272-byte package; release/checks.json is the final package evidence: all automated checks PASS and sourceMatchesExtracted true.

## Verification

- layout.json: Cốc Cốc152 isolated headless engine;1440x900,820x1180,1180x820,768x1024,1024x768,375x812,320x740,414x582, motion on/off. Center offset0 in16 cases; no overflow; tap targets46px desktop/tablet,48px phone; no overlap with scroll link; next/previous switches02/03 then01/03. PASS.
- Manual image inspection:375x812,820x1180,414x582 pinned hero, plus desktop initial frame. On short phone, image and controls have space, no duplicate scroll link.
- scroll-validation.json: Cốc Cốc152, font24, Edge154 with reduced motion+explicit opt-in+disabled native smooth. Intermediate frames and all three scene destinations, wheel settling and same-document pause fallback PASS. Desktop motion script unchanged; short mobile CSS changes are validated in final layout run.
- Public video rebuilt from actual isolated Cốc Cốc recording; screenshots regenerated from final source. No synthetic animation video.
- npm run build PASS, including typechecking. Final release/checks.json PASS: Chromium153 / Firefox155, four required sizes, menu, focus, contrast, axe, noJS, file/offline, reduced, reflow and docs.

## Q01–Q13

| Code | Status | Evidence / limit |
|---|---|---|
| Q01 | PASS with existing exceptions |10 files, plain HTML/CSS/JS and four local generated images.|
| Q02 | PASS |16 viewport/motion cases, center0, no horizontal overflow.|
| Q03 | PASS |Carousel next/previous and scene motion; final general checker PASS.|
| Q04 | PASS |Final checker keyboard/focus/menu.|
| Q05 | PASS internally |Final checker Axe/structure.|
| Q06 | PASS internally |Final checker contrast; source design unchanged.|
| Q07 | PASS in scope |Static/motion layouts; final noJS/offline/reflow checker PASS.|
| Q08 | PASS in scope |Isolated installed Cốc Cốc152/Edge154; Chromium153/Firefox155 final checker PASS. Daily browser profile, Safari/physical devices NOT TESTED.|
| Q09 | PASS |No pageerrors in native motion/layout, JS unchanged.|
| Q10 | PASS |Final checker docs/counts; docs updated for centered grid, mobile touch targets and short viewport layout.|
| Q11 | PASS |ZIP readback equals source; final SHA/bytes above.|
| Q12 | PASS in scope |production-checks.json: t9 visible,11 assets200,unauthorized download401,ZIP in trace. No actual purchase/authenticated download.|
| Q13 | PASS local/online |Preview/video regenerated; production-layout.json and production-video.json PASS, mobile/tablet screenshots inspected.|

D01–D08 retained in scope; targeted responsive control placement only. No new product claims or visual concept.

Production deployment dpl_7qRTtgc6U4BoAH1BRCHjNaQGTnt4 READY, alias https://forgezone.store. Demo https://forgezone.store/demos/auralis/index.html?v=1.2.3&motion=on. Vercel production build PASS.

production-layout.json: same16 viewport/motion cases PASS online; exact center0 and no overflow. production-cache.json: old bookmarks redirect to1.2.3, motion on/off preserved, assets no-store, new revision loaded, CTA detail and reload PASS in Cốc Cốc. production-video.json: Edge/Cốc Cốc preview play/pause/offscreen/return/manual pause,11.68s clip and popup1.2.3 PASS. production-checks.json: all11 assets200 and t9 appears, unauthorized401, ZIP included in local build trace. Actual customer purchase is NOT TESTED.

IAB opened1.2.3 and Next/Previous changed counter02/03→01/03. User's everyday Cốc Cốc profile remains inaccessible through native UI policy; engine sessions are isolated test profiles. Final online375/820/414 screenshots are saved alongside the report.
