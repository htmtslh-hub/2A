# Apartment Flow 1.0.0 — Forge Zone publication

Published 9 October 2026 to the existing 2A Vercel project `web`.
Product: https://forgezone.store/?mau=t18
Demo: https://forgezone.store/demos/apartment-flow/index.html?v=1.0.0
Source commit: c5be44a, pushed to origin/master and codex/apartment-flow.
Deployment: dpl_5eoacyhqHpnNP1eYM6dDrY4bGoJ2 — READY.
Deployment URL: https://web-nlkqff4h1-htmtslh-hubs-projects.vercel.app
Command: `vercel deploy --prod --yes`, run from the integrated web directory.

Cloud build and TypeScript pass. All 243 public demo files match local bytes.
Product, Shirtline, NovaTrend and Crimson Folio routes return HTTP 200.
In-app browser confirms purchase/cart controls, package specification and guides.
Evidence: production.json and local production.png screenshot.

Vercel deployment file listing confirms the private ZIP is uploaded at
src/product/giao-dien-web/apartment-flow/apartment-flow.zip. Its content UID
7970e54c09f845abfb469b5e6d35bcba4d600cfd matches the local ZIP SHA1.
Final ZIP SHA256: 824a6d421d10f1274de42c64ef98a42b0f9b6926581f4455b72ba86e677eda60.
Download route file tracing includes this ZIP. Anonymous live download returns
401; direct public product-file URL returns 404. Local real-handler fixtures
verify 401/403/200 and the exact final ZIP stream.

Real paid checkout and live entitled download remain NOT TESTED. No account,
purchase, payment or database mutation was performed for verification.
This publication enables t18 using the existing commerce and access controls.
The earlier preview and standalone deployment are historical, not this release.
