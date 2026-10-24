# Release & Online Verification Report — `atlas` (`t96`, `v1.0.0`)

- **Product Slug / Slot:** `atlas` / `t96` (`education`)
- **Version:** `1.0.0`
- **Git Commit (`master`):** `c03790ded0e6538cc650cffaa515347634b022cd` (`Add Atlas Ocean Log (t96) web template`)
- **Customer Archive:** `web/product/giao-dien-web/atlas/atlas.zip` (`530,144` bytes, SHA-256 `359f1d58bc4c70390df6d745b921633da0dd8ad3137e961bd90e9ee7152c46eb`)
- **Vercel Deployment ID:** `dpl_Dm7hoHTp62nqbiZ8WdnRa3AZAaN6`
- **Production URL:** `https://web-a5o2kyrkf-htmtslh-hubs-projects.vercel.app`
- **Production Alias:** `https://forgezone.store`
- **Deployment Pruning (`prune-vercel-deployments.mjs`):** Executed; only the single latest `READY` deployment is retained on Vercel.

---

## Online Asset Verification (`online-store.json`)

Every public demo and preview file on `https://forgezone.store` returned `HTTP 200` and matched local bytes and SHA-256 hashes 100% (`allAssetsMatchByteForByte: true`):

- `/demos/atlas/index.html` (`HTTP 200`, byte/SHA-256 match)
- `/demos/atlas/assets/css/style.css` (`HTTP 200`, byte/SHA-256 match)
- `/demos/atlas/assets/js/main.js` (`HTTP 200`, byte/SHA-256 match)
- `/demos/atlas/assets/img/hero-ocean-01.webp` (`HTTP 200`, byte/SHA-256 match)
- `/demos/atlas/assets/img/hero-ocean-02.webp` (`HTTP 200`, byte/SHA-256 match)
- `/demos/atlas/assets/img/hero-ocean-03.webp` (`HTTP 200`, byte/SHA-256 match)
- `/demos/atlas/assets/img/depth-sonar-thumb.webp` (`HTTP 200`, byte/SHA-256 match)
- `/previews/atlas.webp?v=1.0.0` (`HTTP 200`, byte/SHA-256 match)
- `/previews/atlas-tablet.webp?v=1.0.0` (`HTTP 200`, byte/SHA-256 match)
- `/previews/atlas-mobile.webp?v=1.0.0` (`HTTP 200`, byte/SHA-256 match)
- `/previews/atlas.mp4?v=1.0.0` (`HTTP 200`, byte/SHA-256 match)

---

## Security & Entitlement Guards (`allGuardsBlocked: true`)

- `/demos/atlas/CUSTOMISE.md` → `HTTP 404` (commercial documentation is not exposed in public demo)
- `/product/giao-dien-web/atlas/atlas.zip` → `HTTP 404` (commercial ZIP archive is not directly accessible via static path)
- `/api/download?templateId=t96` (unauthenticated request) → blocked (`HTTP 400/401/403`)
- Paid-account checkout/webhook completion: **NOT TESTED** (no synthetic orders, database mutations, or entitlement writes were created).
