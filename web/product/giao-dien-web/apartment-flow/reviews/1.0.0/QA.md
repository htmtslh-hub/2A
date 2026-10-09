# Apartment Flow 1.0.0 — release QA

Technical QA: 8 October 2026. Publication: 9 October 2026. Product standard 1.2.
Scope: Apartment Flow/t18, its demo, preview, package and catalog entry only.

## Required checks

| Check | Result and evidence |
|---|---|
| Q01 Structure | PASS with accepted W01/W03/W05/W06 exceptions for local frames, renderer, extra notice and size. |
| Q02 Responsive | PASS at 1440×900, 820×1180, 375×812 and 320×740; no horizontal overflow, touch targets checked. |
| Q03 Navigation | PASS: persistent four-chapter rail; collapsible hamburger requirement is not applicable. |
| Q04 Keyboard | PASS: visible focus, dialog Escape and focus return, inactive panels inert. |
| Q05 Semantics | PASS: structure and axe checks in release/checks.json. |
| Q06 Contrast | PASS: settled-scene pixel checks, two-color focus ring and screenshot review. |
| Q07 Fallbacks | PASS: no-JS, file/offline and missing-font checks in release report. |
| Q08 Browsers | PASS in tested Chromium, Firefox, Edge and Cốc Cốc versions below; Safari and physical iPhone NOT TESTED. |
| Q09 Runtime | PASS: syntax, network/error checks, forward/reverse/rapid chapter transitions and finite animation. No Lighthouse or CPU benchmark claim. |
| Q10 Instructions | PASS: 10 steps, 12 customized AI prompts, seven-section licence, retained MIT notice; no unfilled prompt markers. Other AI models NOT TESTED. |
| Q11 Package | PASS: 247 files, CRC, safe paths and byte-for-byte source comparison; package.json. |
| Q12 Delivery | PASS for local authorized handler fixtures (401/403/200) and build file tracing. Real paid checkout and live entitled download NOT TESTED. |
| Q13 Design | PASS for D01–D08 assessment below, with the explicitly requested Vietnamese presentation. |

Chromium 153.0.8010.12 and Firefox 155.0: all four viewports.
Edge 154.0.4258.62 and Cốc Cốc 152.0.7977.124: desktop 1440 and mobile 375.
Evidence: release/checks.json and features/checks.json. The product-scoped
check-release.mjs adapts the shared checker for the permanent chapter rail and
waits for the camera to settle before contrast sampling. Initial checks.json and
final/checks.json retain earlier failures as diagnostic history, not qualification.

## Design assessment

| Criterion | Assessment |
|---|---|
| D01 Hierarchy | Clear apartment introduction, explore CTA and visible chapter navigation. |
| D02 Composition | Continuous full-screen camera with floating glass cards and room typography. |
| D03 Narrative | Introduction, living/kitchen, bedroom and next action form four chapters. |
| D04 System | Consistent smoke glass, capsule controls, serif headings and sans body text. |
| D05 Visual QA | Desktop and narrow mobile screenshots inspected; all chapter/viewport captures saved by feature checks. Full-page blank runway belongs to the pinned scroll scene. |
| D06 Language | Vietnamese UI explicitly requested; English customer instructions provided. |
| D07 Disclosure | AI demo disclosure visible in information dialog. |
| D08 Claims | Fictional Lumière Residence; no invented address, pricing, dimensions or real contact details. |

## Interaction and release details

Forward chapters settle at frames 1/73/154/240; reverse and rapid navigation
settle correctly. Pause freezes the camera while native scrolling remains usable;
resume follows current scroll. Motion starts enabled with OS reduced-motion and
an old motion-off preference. Reload restores the current chapter with pause off.
Dialog opens, closes with Escape and restores trigger focus. Console errors empty.
No claim is made about a forced CSS/Web Animations disable test.

Release fixes: 44px brand/pause controls, explicit pause/resume, stronger smoke
overlay and text contrast, two-color focus ring and no-JS mobile footer overflow.
Source and public demo are synchronized. Scoped ESLint and Next production build
pass. Existing products remain enabled; no database mutation or real transaction.

Final ZIP: 11,353,075 bytes, 247 files.
SHA256: `824a6d421d10f1274de42c64ef98a42b0f9b6926581f4455b72ba86e677eda60`.
Browser QA used the preceding ZIP; only the customer README compatibility paragraph
changed afterward. HTML/CSS/JS and all frame bytes are unchanged, and the final
ZIP was independently reverified. Local download handler streams this final hash.
Frames are from the owner's AI video, originally 720p and upscaled to 1080p;
this release does not claim recovery of lost source detail.

Publication is authorized by the owner's delivery request. Technical checks pass
within the recorded scope; real payment qualification remains untested.
