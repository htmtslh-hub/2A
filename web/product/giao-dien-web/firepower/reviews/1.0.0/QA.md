# Firepower 1.0.0: QA

Windows, 16/10/2026. WEB-STATIC-1 v1.2.1 with owner-approved W01/W03/W05/W06 exceptions: seven files, local generated product sheet, finite view-switching JavaScript and ZIP above 20 KiB. These exceptions apply only to Firepower. No shared standard, price, entitlement, database or checkout change.

Source acceptance: **96.170** under the fixed regional visual-review rubric, not pixel accuracy. See ACCEPTANCE.md, acceptance.json, comparison-frozen/ and source-manifest.json. Frozen source SHA-256: `2afb7e7ab8d4b5f8fe7a89375f6102c618b3fcce246e583a418c0514a38e6b93`. ZIP: **150663 bytes**, SHA-256 `4d38b84a50d74547ef333991782e8beb98f351bacff328fff76344890b7f5f0c`.

| Check | Status and actual evidence |
|---|---|
| Q01 structure | PASS under approved exceptions. Six core files plus assets/img/mouse-views.webp; no framework, build step, secrets, font files or remote image requests. |
| Q02 responsive | PASS source-checks.json: 1440×900, 820×1180, 375×812, 320×740, 950/951px breakpoint; all four browsers, no document overflow or undersized visible independent controls. Full-page and open-menu screenshots in evidence/. |
| Q03 interactions | PASS source-checks.json: five hero states, five gallery states, next/previous, both wraps, rapid input, arrow keys, horizontal swipe, menu open/link/Escape, native specifications, real internal CTA and email link. External targets/new-tab labels/rel verified in Chromium/Firefox by external-links.json. Official checker records two Q03 false positives: it unconditionally rejects external HTTPS links with ok=null without requesting them (check-template.mjs lines 157, 298–300). Raw checks.json is retained; no shared checker was changed. Third-party authenticated channel availability is NOT TESTED. |
| Q04 keyboard | PASS visible skip link and move into main; Tab skips hidden menu; Escape closes and restores trigger; arrow keys select views; focus and breakpoint reset verified. |
| Q05 accessible structure | PASS one h1, semantic header/nav/main/footer, unique IDs and valid anchors, labelled decorative SVG, named controls, zero WCAG 2 A/AA/2.1 AA axe findings in all four browsers. |
| Q06 contrast | PASS supplement.json and official checker pixel sampling: body on brightest stage 6.828:1, muted copy 6.785:1, large heading 10.629:1, accent text 7.720:1, hover CTA 10.304:1. No paragraph lies on product imagery. Desktop/mobile images and annotation positions visually reviewed. |
| Q07 fallback | PASS no JS at 320px retains nav/content/email/native specifications. Fresh offline file:// loads local source. Missing WebP preserves headings and actions. OS reduce and old saved-off keep finite motion ON per owner policy; session pause works and reload resets it. 200% equivalent layout tested at 720×450 DPR2; this is not claimed as a physical zoom command. |
| Q08 browsers | PASS Chromium 153.0.8010.12, Firefox 155.0, actual Edge 155.0.4283.60 and Cốc Cốc 152.0.7977.124. Earlier intermediate Edge run was 155.0.4283.45; final source-checks records .60. Safari and physical iOS/Android NOT TESTED. |
| Q09 technical | PASS zero uncaught errors/missing local resources in source checks. Finite RAF transitions, actual intermediate frames under OS reduce, CSS-disabled fallback and zero idle frames after settling. No tracking, background API calls, live inventory or order processing. |
| Q10 docs and rights | PASS ten customer steps, twelve complete prompts, no unfilled technical prompt markers, counted literal map checked. Seven-part store licence preserved, system fonts only, generated-image provenance and prompt set in ASSETS.md/PROMPTS.md. Third-party trademarks are not licensed or endorsed. Prompt text reviewed, not tested with another AI. |
| Q11 final ZIP | PASS official packaging reads all seven files back byte-for-byte; sourceMatchesExtracted=true in checks.json. Official extracted file://, offline, no-JS, browser, contrast and accessibility checks completed. The two raw external-link false positives are reconciled in Q03; no source or ZIP alteration was used to hide them. |
| Q12 store | PASS within authorised scope: product t39, commerce, three locales, existing Premium policy, own demo/WebP/recorded MP4. Final local and Vercel build, six locale/viewports, four browsers' autoplay/pause, exact online hashes, demo/guide/card navigation, 401 anonymous download, 404 direct ZIP and two existing free-download regressions. See RELEASE.md, local-store.json, online-store.json, online-motion.json and detail-video.json. Paid-account download/payment completion NOT TESTED; no synthetic rights or transactions created. |
| Q13 design | PASS D01–D08 below; source visual review and remaining reconstruction differences documented openly. |

## D01–D08

- D01 PASS: hero identifies a gaming mouse and links PLAY ADVANCED to product details; BUY leads to an explicitly labelled email enquiry without placing an order.
- D02 PASS: charcoal/cyan hero with two product views and callout leaders; distinct five-component stage and cyan feature rail. Original generated assets follow the reference's poses.
- D03 PASS: four sections answer product identity, use, component detail and specifications; enquiry continuation completes the cropped reference.
- D04 PASS: shared colour, type, spacing and outlined-button tokens; no inverted light section.
- D05 PASS: full-page visual review at four widths, open mobile menu and equivalent zoom; no global overflow hiding.
- D06 PASS: concrete English copy and consistent concept demonstration, no lorem ipsum.
- D07 PASS: no fabricated testimonials or customer proof; clear independent-study, illustrative specification and generated-image disclosure. External links imply no affiliation.
- D08 PASS: one model and matching controls/sensor/wheel copy, no pretend stock, price or checkout. Demo email and third-party references are listed for replacement.

## Release boundaries

Commercial ZIP stays outside public/ behind the existing download guard. The public demo uses absolute demo asset paths so Vercel slash handling does not break resources; source ZIP retains relative paths. Preview video is outside the ZIP and records real clicks/scroll. Release checkout is based on published BackBest 800 commit b26193b and includes only Firepower additions. Existing runtime newline differences are restored only when their exact published preview-manifest digest matches; semantic differences are never imported from the dirty primary workspace. This normalization creates no semantic Git diff.
