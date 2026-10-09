# Mint Atlas — commercial release

2026-10-09. Owner explicitly requested a commercial store product before push and production deploy. Product source/ZIP hash remain approved1.0.0. Registered free catalog slot t16, portfolio category, editable source + three original images, ten-step/twelve-prompt customer instructions, commercial licence. Existing standard store price retained; no new price override. Added product-specific vi/en/zh specs, copy and guide; English original customer guide included publicly as documentation, code/ZIP remain private.

Isolated managed checkout from latest origin/master0c1adda; only Mint Atlas product/demo/preview, its catalog/guide entries and one necessary build-scope correction. No original workspace dirty files included. Existing remote products and catalog entries preserved.

Build initially failed because root TypeScript wildcard included standalone LingoGlass React/Vite source with its separate dependencies/types. Store tsconfig now excludes product/**: this keeps independent product code out of the storefront TypeScript project while retaining store type checking. No ignoreBuildErrors or product source changes. npm ci, npm run typecheck, npm run build PASS. Download route trace includes exact mint-atlas.zip;518669 bytes, SHA256aa2a31eebf390dfd50f4f44ea8d1134793f85bce8738e6e9ca5760558e7df9f5.

Local production-store tests: Edge155.0.4283.45, vi-VN/en-US/zh-CN detail, product-specific guide, real preview, no horizontal overflow; demo and six other assets returned200 and exact local SHA hashes. Buy entry opens authentication form, no order submitted. Unauthenticated download?id=t16 returns401; direct commercial ZIP URL404. Mobile demo details work. store-checks.json errors[]/failures[]. Screenshot visually reviewed. Transaction/payment/email delivery with a real paid account NOT TESTED; no charge or purchase was performed.

Deployment result and live checks are appended after release. Production environment pulled to ignored .env.local for build, never committed/uploaded. Source package documentation/licence policy unchanged.
## Production result
Release commit4b28aa9 pushed to origin/master. Vercel deploymentdpl_FUTMVQcPufNASRjpVUoyWxWt1ndR READY, aliased forgezone.store. URL https://forgezone.store/?mau=t16; demo https://forgezone.store/demos/mint-atlas/index.html?v=1.0.0.
Edge155.0.4283.45 live three-language detail/guide and mobile demo checks PASS, errors[]/failures[]. Seven deployed assets match local SHA-256 byte-for-byte, download unauth401/direct ZIP404, sign-in purchase gate works. No real transaction was submitted. Existing17 catalog entries deep-equal baseline0c1adda; live Melt Muse/LingoGlass demo and Apartment Flow preview200.

