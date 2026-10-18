# QA — Puro Amor 1.0.0
16/10/2026. WEB-STATIC-1 standards 1.2.1 reference, candidate has unapproved raster/size exceptions; CHƯA ĐẠT PHÁT HÀNH. Local-only scope. No shared files or Fresh & Reddy changes.

| Check | Status | Evidence/limitations |
|---|---|---|
| Q01 | FAIL | Seven files including 1,342,859-byte generated PNG; not six-file SVG profile |
| Q02 | PASS | Chromium/Firefox 1440×900, 820×1180, 375×812, 320×740; no overflow, image loaded |
| Q03 | PASS | Internal anchors, mobile toggle, Escape/focus; menu link close and breakpoint reset; native popover opens/closes |
| Q04 | NOT TESTED | Skip focus/main target and Escape focus PASS; full Tab/Shift+Tab chain not completed |
| Q05 | PASS | One h1/landmarks/labels; axe 0 Chromium violations |
| Q06 | NOT TESTED | No automated axe findings; manual gradient/hover text contrast not completed |
| Q07 | NOT TESTED | No-JS at 320, offline file URL, OS reduce motion PASS; zoom-equivalent 720×450 only, not real browser zoom |
| Q08 | PASS | Chromium 153.0.8010.12, Firefox 155.0 Windows/file; Chromium HTTP supplemental. No other browser claims |
| Q09 | NOT TESTED | Pageerror list empty. Runtime uses no external fonts/API. Full network/performance audit and package bytes not tested |
| Q10 | FAIL | Guide ten steps/twelve prompts and literal map written. Brand/image commercial rights and copyright holder not settled |
| Q11 | N/A | Gate FAIL; no ZIP created or extracted |
| Q12 | N/A | No store/catalog/deploy scope |
| Q13 | FAIL | Below >95 visual criterion; see ACCEPTANCE.md |

D01 PASS coffee intent/CTA; D02 PASS white/teal split and coffee splash composition; D03 PASS distinct cafe/menu/card/story purposes; D04 PASS CSS tokens and font hierarchy; D05 PASS screenshots no overflow/clipped text, intentional artwork clipping at hero bottom; D06 adapted to Portuguese reference rather than default English, additional text explicitly illustrative; D07 FAIL commercial identity rights unverified; D08 PASS no invented price/loyalty success.

Interaction map: header links and search pill → real sections; account → illustrative Card section; main CTA → cafe; manifesto → native popover with text and unavailable-video note; hero arrows → #sobre/#cafe; menu items → sample mailto contact; social links → named brand profiles, no claim of account ownership. No account/database/cart/order/video backend.

Asset source: built-in imagegen, prompt in IMAGE-PROMPT.txt, generated image copied unchanged; RGBA 1210×1300 alpha 0–255. Original reference screenshot not embedded in source. W01/W03/W06 exceptions not silently granted; do not package as conforming WEB-STATIC-1 or claim commercial rights. Brand seal approximate SVG. System fonts referenced only, no distributed files. Manifest source-manifest.json. ZIP bytes/hash N/A.
