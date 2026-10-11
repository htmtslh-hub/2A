# Music App — ForgeFrame acceptance

11/10/2026 · Candidate 1.0.0 · Source candidate gate: **PASS**.

Source manifest SHA-256: 353f3ae8dda52842f7128729e19d044a88bdefc61679a8c931e8ada0142f9786. No ZIP, commit, push, store entry or deployment has been created.

Reference:920×1288, DPR1, zoom100%, no crop. Viewer back/expand/image-search overlays are excluded from scoring, not reconstructed. Candidate is a genuine browser render. Mobile-reference fidelity N/A: none supplied.

Self-created artwork is an approved change; matching subject, pose, palette and composition still scored. Dark text on coral/lavender is a visible accessibility-driven departure, explicitly penalised. The comparison screenshot shows genuine local audio playing at01:45, with the pause control and PLAYING badge. On normal page load audio begins paused.

## Regional visual rubric

Scores are design assessments, not objective pixel accuracy or a user approval. Weights were locked in REFERENCE-MAP.md before scoring. Each axis: geometry25%, typography20%, colour15%, imagery25%, spacing15%.

| Region | Weight | Geometry | Type | Colour | Image | Spacing | Score |
|---|---|---|---|---|---|---|---|
| header | 12% | 98 | 96 | 98 | 95 | 97 | 96.70 |
| playlist | 14% | 99 | 95 | 90 | 95 | 97 | 95.55 |
| album | 14% | 99 | 97 | 97 | 93 | 98 | 96.65 |
| artist | 12% | 98 | 97 | 96 | 94 | 98 | 96.50 |
| player | 25% | 99 | 97 | 98 | 92 | 98 | 96.55 |
| library | 13% | 99 | 94 | 96 | 97 | 97 | 96.75 |
| notification-footer | 10% | 99 | 96 | 96 | 94 | 96 | 96.25 |

View score **96.43**, each region >95.00. Axis reasons and remaining deviations are in acceptance.json. Fidelity PASS under this disclosed rubric, with the generated-artwork instruction applied; no claim of perfect reproduction.

[Side-by-side](comparison-release-final/side-by-side.png), [overlay](comparison-release-final/overlay.png), [diff](comparison-release-final/difference.png). Pixel diagnostics include excluded viewer overlays and newly generated art; they are diagnostic only and do not grant PASS.

## Browser and motion evidence

- chromium 153.0.8010.12: no overflow at1440/820/375/320 and699/701; local playback advances, seek=5s; no console/network errors; axe violations=0. Middle reveal opacity=0.616288, final=1, reverse=1; reduced-motion system middle=0.604861. file:// audio=true.
- firefox 155.0: no overflow at1440/820/375/320 and699/701; local playback advances, seek=5s; no console/network errors; axe violations=0. Middle reveal opacity=0.88187, final=1, reverse=1; reduced-motion system middle=0.906188. file:// audio=true.
- edge 155.0.4283.45: no overflow at1440/820/375/320 and699/701; local playback advances, seek=5s; no console/network errors; axe violations=0. Middle reveal opacity=0.676566, final=1, reverse=1; reduced-motion system middle=0.731961. file:// audio=true.
- coccoc 152.0.7977.124: no overflow at1440/820/375/320 and699/701; local playback advances, seek=5s; no console/network errors; axe violations=0. Middle reveal opacity=0.67791, final=1, reverse=1; reduced-motion system middle=0.731367. file:// audio=true.

Native Chromium browser zoom: 200%, innerWidth=720, DPR=2, scrollWidth/clientWidth=720/720, CSS zoom=1; dialog and playback functional. Test-only extension in isolated profile; browser.tabs.setZoom reference: https://developer.chrome.com/docs/extensions/reference/api/tabs#method-setZoom. No user's browser profile was used.

Supplemental Chromium/Firefox: no duplicate IDs; one h1; four landmarks; all SVGs named/hidden correctly; all labels present; four-width hit targets44px (pill uses transparent expanded hit area). Local saved-off values do not suppress animation. Missing WebP assets retain title and follow interaction. No external assets or network fonts.

Safari, physical devices, streaming, backend/accounts and post-purchase downloads NOT TESTED / outside this candidate's implementation. No online deployment exists.

## Outstanding release conditions

Owner supplied Forge zone and approved image use in personal/client websites, prohibiting standalone resale/distribution. Source gate PASS. ZIP extraction, store integration and online verification are subsequent release checks, recorded separately. Do not deploy unrelated local changes.
