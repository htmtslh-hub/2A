# Production deployment — 2A / Forge Zone — 2026-10-08

Canonical product: https://forgezone.store/?mau=t18
Canonical demo: https://forgezone.store/demos/apartment-flow/index.html?v=0.1.0
Vercel project: web (prj_A0GxjvTQMu6x2bRXIi8XG6BLiIKs)
Production deployment: dpl_EL9c9hnnC8Ap6FP91YT1h7uhistV — READY
Deployment URL: https://web-r4xj3all6-htmtslh-hubs-projects.vercel.app
Deployed source commit: f527c1b (pushed to origin/master).

Deploy from the integrated web/ checkout linked to the existing Vercel web project:
`vercel deploy --prod --yes`
Do not publish this product through a separate Vercel project.

Verification:
- Local production build/TypeScript, scoped ESLint and cloud build: PASS.
- All 243 demo files, including 240 frames, match their online SHA-256 bytes.
- Store/detail/preview and Shirtline/NovaTrend/Crimson Folio demos: HTTP 200.
- In-app browser: product detail renders correctly with preview-only controls;
  demo scroll reaches frame 81/living, contact navigation reaches final chapter,
  information dialog opens, Escape closes with focus return, return reaches frame 1.
- Demo warning/error logs: empty.
- Other commercial checkout gates remain enabled; t18 checkout is rejected by
  templateExists and excluded from cart controls/storage and bundle downloads.
- No payment, order, account or database writes were performed for verification.
- Current mobile revision, Firefox and full commercial release QA: NOT TESTED.
- No commercial ZIP/licence is published; the catalog clearly labels a preview.

Evidence: forgezone-production.json and forgezone-product.png (local screenshot).

History: dpl_9WQUCrYRNvfStvczaM7CRm9NM3GG on apartment-flow.vercel.app was an
incorrect standalone publication destination. It is not the 2A release.
