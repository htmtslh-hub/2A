# AIS Folio 1.0.0 — released 14/10/2026

- Product: https://forgezone.store/?mau=t33
- Demo: https://forgezone.store/demos/ais-folio/index.html
- Guide: https://forgezone.store/huong-dan?template=ais-folio&view=template
- Source commit: 7602233, pushed to configured origin/master without force.
- Vercel production deployment: dpl_D2Nkj2xLhresRbQBCm33rAoCtgb3, READY; https://web-mkxxmyd2j-htmtslh-hubs-projects.vercel.app, aliased forgezone.store.
- Released from a separate managed checkout. Only tracked files of the checkpoint were copied with their validated original line endings; unrelated untracked files were excluded. All 33 existing/new demo HTML hashes were verified before upload. Remote production build and preview manifest gate PASS.

## Online validation

store-online.json: 36 views, zero failures. Product detail at 1440/820/375/320px plus library and guide in vi/en/zh on Chromium and Firefox. Correct 8-file specs and price policy preserved. Anonymous download returns 401; direct commercial ZIP path 404.

online-assets.json: HTML, CSS, JS, character, poster sheet, store poster and MP4 all HTTP200 and byte/hash equal local validated assets.

online-motion-checks.json: finite intermediate/end frames PASS on Chromium, Firefox, Edge and Cốc Cốc; OS reduce, saved motion off, resize and missing-image fallback checked.

online-video-checks.json: 8 checks PASS on those four actual browsers at desktop1440 and phone375 widths. New card autoplay muted/looping with advancing currentTime; pauses when offscreen. No card playback button introduced. Viewer's reference overlays are not part of the product.

Commercial ZIP: 515770 bytes, SHA-256 08edc44c423f3dc554def227f2166d150d2fdceab1ffd0cc50fc15675985f4b5. Local production route tracing includes it. No actual order, purchase entitlement or post-payment download was created/tested. Safari and physical devices remain untested. No numeric exact-reference fidelity claim.

Only new product files, its catalog/guide/recording entries and the one custom-spec allowlist addition changed. Original untracked Dualplay/Leaflit/design work remains untouched.
