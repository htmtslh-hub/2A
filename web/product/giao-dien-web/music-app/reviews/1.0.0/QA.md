# Music App 1.0.0 — QA

11 October 2026. WEB-STATIC-1 v1.2 with explicitly approved W01/W03 (five generated WebP images and original WAV), W05 local interactions and W06 oversized ZIP. Scope: this product and its store entries only. Copyright entity Forge zone; owner approved personal/client website image use and prohibition of standalone resale/distribution.

| Check | Result | Evidence |
|---|---|---|
| Q01 Structure | PASS with approved exception | 12 files: six core, five WebP, one WAV; source-manifest.json |
| Q02 Responsive | PASS | Four required widths,699/701; candidate-checks.json, checks.json;44px hit areas including pill pseudoelements |
| Q03 Interaction | PASS | Search0/1 result, audio advances, pause/next/previous, seek5, volume.6, shuffle/repeat, follow/favourites, settings/Escape. Always-visible navigation; collapsed mobile menu N/A |
| Q04 Keyboard | PASS | Skip/focus and dialog focus return; candidate-checks.json; extracted checks.json |
| Q05 Accessibility structure | PASS | One h1, landmarks, unique IDs, labelled controls, valid SVG, axe0 |
| Q06 Contrast | PASS | Solid pairs supplemental-checks.json and extracted pixel checks.json; final demo note darkened on mint. H1 pixel test hides only measured element, preserving adjacent BETA badge |
| Q07 Fallback | PASS | file audio, offline, no JS/native audio, missing images, default-on OS reduce/saved-off, native browser200% zoom |
| Q08 Browsers | PASS scoped | Windows desktop: Chromium153.0.8010.12, Firefox155.0, Edge155.0.4283.45, Cốc Cốc152.0.7977.124. Physical devices and Safari NOT TESTED |
| Q09 Technical | PASS | No source console/network errors; finite reveal/cleanup; no external fonts/scripts; ZIP5,355,141 bytes |
| Q10 Docs/licence | PASS |10steps,12complete prompts, literal counted edit map; Forge zone and approved image terms. No claim of testing another AI assistant |
| Q11 Exact package | PASS |ZIP extracted and byte matched; file/HTTP/offline browsers checks.json. SHA2564b2fcb182116422583880c62c9aa580a6c2549552f0c75a804ce944d811f745a |
| Q12 Store | PASS local and public UI/assets/guards |t21, music-app, existing SaaS category; three-language copy/guide;24store checks. Local checkout intentionally has no production secrets, so auth/DB API checks unavailable locally. Public guards401/404, asset hashes and four-browser motion/playback PASS; download artifact included in Next tracing. See RELEASE.md. Paid purchase/download flow NOT TESTED; no entitlements or payments mutated |
| Q13 Design | PASS scoped |ACCEPTANCE.md and regional weighted manual rubric96.432; pixel diagnostics are not fidelity scores |

| Design check | Result | Explanation |
|---|---|---|
| D01 | PASS adapted brief | Music dashboard component board rather than marketing hero; player is principal action |
| D02 | PASS | Retro cream/cobalt/coral composition and rotated stickers; original illustrated album imagery |
| D03 | PASS | Playlist discovery, album selection, artist follow, playback, recent library and release notice |
| D04 | PASS |Shared tokens/system sans/type/control system |
| D05 | PASS |Required widths and native zoom; screenshot inspection |
| D06 | PASS |English music copy; all artists and durations openly fictional |
| D07 | PASS |No verified third-party claims; generated images and original synthesized audio disclosed |
| D08 | PASS |One189-second audio sketch across all selections, explicitly documented; list labels are fictional |

## Tool adaptation and scope

The required shared check-template command was attempted and timed out: its test server lacked HTTP Range support for the WAV. Product-local check-package.mjs retains its extraction, docs, browser and contrast checks, adds Range/audio MIME, measures expanded pill hit areas, marks nonexistent collapsed menu N/A and hides only the measured element for pixel comparison (the original global hide incorrectly treats neighbouring BETA lettering as H1 text). Shared tools were not modified. Its final checks.json contains zero failures. Native200% zoom additionally tested via isolated extension, not CSS zoom.

All labels/controls are local demo behaviour, not streaming or account claims. Same original recording for all tracks. Finite scroll reveals tested midframe/end/reverse; playback equalizer stops on pause/end/pagehide. See candidate-checks.json for individual interaction states.

Public asset hashes, UI/motion and unauthenticated download guards PASS. Paid post-purchase download, Safari and physical devices remain NOT TESTED; no payment or entitlement mutations were performed. See RELEASE.md.
