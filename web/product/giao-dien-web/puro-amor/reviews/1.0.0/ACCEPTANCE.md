# Acceptance — Puro Amor 1.0.0
Gate FAIL, local review candidate only. Visual rubric 88.66/100, below strict >95. Not pixel accuracy. Each region/axis and reason is in acceptance.json; weights fixed in BRIEF.md. Reference and candidate 864×508 DPR1, no crop; viewer-expand overlay excluded. Comparison files in comparison/ show side-by-side, overlay and difference. Pixel match is only diagnostic.

Main deviations: generated coffee/lid poses and splash geometry, teal cup positions/light; approximate brand seal, generic profile silhouette, two social icons instead of three. System fonts and some spacing differ. Hero retains split, hierarchy and copy but not claimed exact.

Functional tests: Chromium 153.0.8010.12 / Firefox 155.0 Windows; four prescribed viewports plus reference, all no overflow, image loads, anchors exist, mobile menu open/Escape/focus pass. Intermediate and final reveal frames verified; finite motion remains ON under OS reduce. No-JS narrow file URL remains usable. Supplemental Chromium HTTP: axe 0 violations, skip to main, menu-link close, breakpoint reset, offline file URL and 720×450 equivalent layout pass. Native manifesto opened and screenshot saved. No supplied manifesto video. Full contrast/manual tap checks, actual 200% browser zoom, reverse/resize motion matrix, real Edge/Cốc Cốc/Safari and physical devices NOT TESTED.

No ZIP, catalogue, store preview video, push or deploy. Need final release-profile/rights resolution and gate PASS before commercial packaging.
