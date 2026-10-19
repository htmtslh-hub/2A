# Three-product release: Vertex Shops, VEYRA, Cyber Ronin

Owner authorisation: 2026-10-18, package, push and deploy all three products into the existing Forge Zone repository/store. Catalog IDs: t63 Vertex Shops, t64 VEYRA, t65 Cyber Ronin. Existing product code and unrelated local changes are preserved.

## Packaging and ownership

The two exact-brief HTML runtimes remain single-file implementations, now accompanied by README.md, CUSTOMISE.md and LICENCE.txt (four customer files). Their original single-file/remote-media/motion/demo-action instructions are recorded exceptions to WEB-STATIC-1. The standard six-file-only check-template command was invoked for both; it stops on its unconditional assets/css/style.css read. Logs are retained. Product-specific extracted-package, four-engine and storefront checks below cover the actual briefs; the generic script is not falsely reported PASS.

VEYRA is a separate framework-product exception: editable pinned v1.0.0 source, all 18 byte-exact original media and built/ are included, without node_modules, Git history or secrets. LICENSE/THIRD_PARTY_NOTICES and Amir Mušić attribution are retained. The runtime/source licence is original MIT, not a newly restrictive Forge Zone claim. The original root clone remains unchanged and is not staged. Public demo adaptation rewrites only generated bundle media/asset/overview paths for /demos/veyra/; original source, prebuilt root-hosted delivery and media remain unchanged. Reference verification in packaged source still passes all 32 approved files.

Google Fonts upstream OFL sources for Poppins, Playfair Display, Inter and Orbitron were consulted. No font binaries are bundled. The particular OnlineWebFonts Orbitron host provenance and supplied remote-image redistribution rights are not certified; source terms expressly do not grant those separate rights. Catalog/README describe supplied references, network needs and demo controls without fabricating working reservations/shops/checkouts.

## Concrete package results

- vertex-shops: 20478 bytes, 4 files, SHA-256 `7de252e3b104850c9badf8bd5bb370ccb6e03aec108a7cf41567515cf8d112b0`. Extracted bytes match current source; ten steps/twelve copyable prompts; all documented literal edit counts verified.
- veyra: 47420678 bytes, 81 files, SHA-256 `53cf98712930105fb24d2fc20234243de225eb1dc5c44c662d6c5e3d58de403b`. Extracted bytes match current source; ten steps/twelve copyable prompts; all documented literal edit counts verified.
- cyber-ronin: 12414 bytes, 4 files, SHA-256 `f13b4821c278ede8b2678bffe759beee05eb136e088e591562fb2973ff285413`. Extracted bytes match current source; ten steps/twelve copyable prompts; all documented literal edit counts verified.

## Verification completed

- Existing VEYRA upstream tests passed (hover lifecycle, appearance state, four mocked generation-helper tests), reference verification 32/32 and production build passed. No generation API, upload or charge was used.
- Product release demo checks: Chromium 153.0.8010.12, Firefox 155.0, Edge 155.0.4283.62, CocCoc 152.0.7977.124. Each product at 1440×900, 820×1180, 375×812 and 320×740: one h1, no horizontal overflow, no page errors or local HTTP failures. Specific checks: Vertex 37 cards/menu/Escape/reduced-motion freeze; Cyber pointer mask/reduced-motion; VEYRA paint selection, closing, drive entry/list toggle/Escape/reduced-motion. Broader original per-product evidence remains in each product's reviews.
- Viewed framed cover screenshots and actual 15-second video contact sheets. Videos show the live shipped demos: Cyber spotlight sweeps, Vertex moving ring/CTA hover, VEYRA paint choice/drive detail/return. Each is H.264, 960×600, 30fps, 14.966667s, no audio, below 3MiB. Three cover variants per product (desktop/tablet/phone). Shared recorder adds isolated slug branches and remote-host allowances for only the applicable supplied briefs.
- Full preview catalog check passed: 62 current real product recordings, matching demo/video hashes and revisions. No unrelated recordings regenerated.
- Store TypeScript check and production build passed. Build trace contains all three protected ZIP files.
- Local production-store checks: three product pages, poster and demo HTTP 200; correct versioned video; autoplay/pause/resume working. Anonymous download attempts return 401 for all three. No paid purchase, webhook or ownership-grant manipulation was performed.

## Q01–Q13 / D01–D08 release assessment

Q01 PASS under explicit runtime/package exceptions; Q02 PASS at tested sizes; Q03 PASS for supplied interactions, demo CTA/business actions deliberately not fabricated; Q04 PASS for sampled menu/Escape/focus and annotation keyboard flows, not an exhaustive assistive-technology audit; Q05 PASS for the supplied structure and engine checks, not a WCAG certificate; Q06 NOT TESTED as a formal pixel-sampled contrast audit, exact supplied colours/type are preserved; Q07 PASS for measured reduced-motion/fallback samples, full zoom/offline behaviour differs by the original brief and is documented; Q08 PASS for four named desktop engines, physical iOS/Safari not tested; Q09 PASS for observed build/console/network checks, no Lighthouse claim; Q10 PASS for current docs/counts/upstream notices, independent remote asset/host rights not certified; Q11 PASS, packages read back byte-for-byte; Q12 PASS for local listing/demo/preview and anonymous access protection, paid download flow NOT TESTED; Q13 PASS against approved visual briefs. D01–D04/D08 match the explicit briefs; D05 sampled across sizes; D06/D07 use clearly described fictional/demo content and retained third-party attribution.

This is a functional release with documented original-brief exceptions and testing limits; it is not labelled an unmodified WEB-STATIC-1 or accessibility certification.

## Preserved limitations

VEYRA retains the original appearance-close focus race and the observed phone detail-copy box intercepting image annotation taps; list/keyboard alternatives work. Vertex CTA/nav anchors and skincare mock have no shop backend; Cyber icon/Reserve Now controls are presentation-only. Remote image/font services remain runtime dependencies for both HTML products. No real touch hardware, Safari/iPhone or paid checkout/download was tested.

## Scope and publication

Changes are limited to the three product folders, their public demos/posters/videos, three catalog/category/manifest additions and isolated packaging/recording support. No application checkout, database, auth, pricing or account configuration was changed. Unrelated untracked work remains unstaged. GitHub and Vercel production results are recorded after publication.
