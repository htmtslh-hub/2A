# Semaan 1.0.0 — released 14/10/2026

- Product: https://forgezone.store/?mau=t34
- Demo: https://forgezone.store/demos/semaan/index.html
- Guide: https://forgezone.store/huong-dan?template=semaan&view=template
- Source commit: f44e5c2bde555ed91ef1773a8ad6db26929ab564, pushed to origin/master without force.
- Production deployment: dpl_GYnivGSa5LPe8oEskTATizzxv2Ch, READY. https://web-9c33b0cq4-htmtslh-hubs-projects.vercel.app, aliased forgezone.store.
- A separate managed release checkout contained only tracked files from the validated checkpoint, with original validated line endings. Unrelated untracked Dualplay/Leaflit/design work excluded; existing AIS Folio preserved. Remote production build and all34 preview recordings passed their hash/version gate.

## Online verification

store-online.json:36 views,0fail. Detail four viewports, library and guide in vi/en/zh on Chromium/Firefox. Package9files/specs/category/price policy correct. Anonymous download401, direct commercial ZIP URL404. Local production trace includes the private ZIP.

online-assets.json: all8 public assets (HTML/CSS/JS,portrait/work/people,poster,MP4) HTTP200 and byte-for-byte equal validated local files. Video revision cb7605369efd; MP4 SHA-256 cb7605369efd296d6b000598ce31916a3d7c771da9b6f133da6efc88fb2d4099.

online-motion-checks.json: finite middle/end frames, resize, missing images, OS reduce and saved-off defaults checked on actual Chromium153/Firefox155/Edge155/Cốc Cốc152; allPASS.

online-video-checks.json:8 checksPASS on those four browsers at1440/375px. Muted native autoplay/loop, progressing currentTime, pause when offscreen. The initial fixed1second sample had one buffering frame at time0; online-video-initial.json records it. Harness now waits for actual media readiness and advancing time, without calling play or forcing success.

Local demo View Work click retained /demos/semaan/index.html#work and landed20px from viewport top. Sample testimonial disclosure and fictional-client label remain visible. Screenshot and video contact sheet reviewed.

Customer ZIP391926bytes, SHA-256 a12a9a30ef301ce355bdc243ccb12e12ad049971ffb4a720f8e3da3fc05705c4. approved/checks.json verifies extracted source matches and all automatic checks pass. Three original generated images/prompt set documented in ASSETS.md and image-prompts.json.

No actual purchase, payment transaction or entitled download was tested/created. Safari and physical devices remain untested. No pixel-accuracy/fidelity percentage is claimed. Only new product files, its catalog/guide/recording entries and the custom-spec allowlist addition changed.
