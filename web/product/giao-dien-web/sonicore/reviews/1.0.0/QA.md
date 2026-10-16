# Sonicore 1.0.0: QA

Windows, 16/10/2026. WEB-STATIC-1 v1.2.1 with owner-approved W01/W03/W05/W06 exceptions: ten files (`index.html`, `style.css`, `main.js`, four local WebP product renders in `assets/img/`, `README.md`, `CUSTOMISE.md`, `LICENCE.txt`), finite interactive JavaScript and ZIP above 20 KiB. These exceptions apply only to Sonicore (`sonicore`). No shared standard, price, entitlement, database or checkout change.

Source acceptance: **96.392** under the fixed regional visual-review rubric, not pixel accuracy. See `ACCEPTANCE.md`, `acceptance.json`, `comparison-frozen/` and `source-manifest.json`. Frozen source SHA-256: `3705ea7b6711bec3e84c808abacf15d13b1b5da6b960e3974314ab0e34920349`. ZIP: **135431 bytes**, SHA-256 `d6a064db148d28666d1cde12bc1901cbe8a35b68efe7c8b4966eb3f9aaf6733f`.

| Check | Status and actual evidence |
|---|---|
| Q01 structure | PASS under approved exceptions. Six core files plus four local WebP renders in `assets/img/`; no framework, build step, secrets, font files or remote image requests. |
| Q02 responsive | PASS `source-checks.json`: `1440×900`, `820×1180`, `375×812`, `320×740`, `950/951px` breakpoint; all four browsers, zero document overflow and zero undersized visible controls. Full-page and open-menu screenshots in `screenshots/` and `evidence/`. |
| Q03 interactions | PASS `source-checks.json`: three spatial soundstage presets (`CINEMA`, `STUDIO`, `GAMING`), six exploded hardware callout buttons (`PROTEIN LEATHER`, `DYNAMIC DRIVER`, `HI-RES AUDIO CHIP`, `ACOUSTIC CHAMBER`, `NEODYMIUM MAGNET`, `SPATIAL PROCESSING`), four review highlight dots, next/previous, both wraps, rapid input, arrow keys, horizontal swipe, menu open/link/Escape, native specifications disclosure and explicit `mailto:` enquiry action. |
| Q04 keyboard | PASS visible skip link (`top: 12px`) and move into `main`; `Tab` skips hidden menu; `Escape` closes and restores trigger; arrow keys select spatial views and exploded parts; focus and breakpoint reset verified. |
| Q05 accessible structure | PASS one `h1`, semantic `header/nav/main/footer`, unique IDs and valid anchors, decorative SVGs hidden with `aria-hidden="true"`, named controls, zero WCAG 2 A/AA/2.1 AA axe findings in all four browsers. |
| Q06 contrast | PASS `supplement.json` and official checker pixel sampling: body on obsidian background `10.15:1`, muted copy `7.48:1`, heading `18.39:1`, accent lilac `10.92:1`, card quote `16.82:1`, focus outline `11.79:1`. |
| Q07 fallback | PASS no JS at `320px` retains navigation, content, `mailto:` action and native `<details id="specifications">`. Fresh offline `file://` loads local source. Missing WebP preserves headings and actions. OS reduce and old saved-off keep finite motion ON per owner policy; session pause works and reload resets it. 200% equivalent layout tested at `720×450` DPR 2. |
| Q08 browsers | PASS Chromium `153.0.8010.12`, Firefox `155.0`, Microsoft Edge `155.0.4283.60` and Cốc Cốc `152.0.7977.124`. Safari and physical iOS/Android NOT TESTED. |
| Q09 technical | PASS zero uncaught errors and zero missing local resources in `source-checks.json`. Finite RAF transitions, actual intermediate frames under OS reduce, CSS-disabled fallback and zero idle frames after settling. No tracking, background API calls, live inventory or order processing. |
| Q10 docs and rights | PASS ten customer steps, twelve complete prompts, zero unfilled technical prompt markers, counted literal map checked. Seven-part store licence preserved, system fonts only, generated-image provenance and prompt set in `ASSETS.md` and `PROMPTS.md`. |
| Q11 final ZIP | PASS `dong-goi.mjs sonicore --ngoai-le` reads all ten files back byte-for-byte; `sourceMatchesExtracted=true` in `checks.json`. |
| Q12 store | Product `t40` (`sonicore`), category `commerce`, three locales (`vi-VN`, `en-US`, `zh-CN`), local demo in `web/public/demos/sonicore/`, preview image `sonicore.webp` and recorded video `sonicore.mp4`. |
| Q13 design | PASS D01–D08 below; source visual review and remaining reconstruction differences documented openly. |

## D01–D08

- D01 PASS: hero identifies the Sonicore X1 spatial audio headphone concept, cycles spatial soundstage presets via `EXPERIENCE SOUND`, and links `PRE-ORDER NOW` to an explicitly labelled email enquiry section without placing an order.
- D02 PASS: obsidian/violet hero with floating 3D headphone on pedestal, horizontal 7-part exploded hardware view with 6 callout leaders, sculpted head in 360° sound sphere, macro headband/earcup close-up and floating `SPATIAL MODE` equalizer widget.
- D03 PASS: five reference bands plus bottom specifications/pre-order continuation complete the landing page flow.
- D04 PASS: shared obsidian/violet colour, typography, spacing and glowing pill tokens across all sections.
- D05 PASS: full-page visual review at four widths, open mobile menu and 200% equivalent zoom; zero global overflow hiding.
- D06 PASS: concrete English audio engineering copy and consistent concept demonstration, zero `lorem ipsum`.
- D07 PASS: clear illustrative disclosure for sample reviews (`Alex M.`, `Sophia R.`, `Daniel K.`), concept recognition badges (`reddot winner 2024`, `CES 2024`, `GOOD DESIGN`) and AI-generated product renders.
- D08 PASS: consistent Sonicore X1 model and acoustic component copy (`50mm titanium`, `24-bit / 192kHz`, `N52`), no pretend stock, price or checkout.
