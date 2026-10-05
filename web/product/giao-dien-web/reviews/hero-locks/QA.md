# Restore locked hero cards 04–05

Date: 2026-09-28.

User request: show both original hero cards again, still locked.

Implemented: restored the two original coming-soon records in vi/en/zh in `_src/Agentic.dc.html`, regenerated data using `web/tools/extract-data.mjs`, and set zero-based locked indices to `[3, 4]` in `web/src/lib/view.ts`. Existing lock overlays, poster mapping, layout and animation remain unchanged. Selection handlers reject locked cards, and previous/next controls skip them. Product ZIPs, prices, checkout and account data were not changed.

Validation:

- Typecheck, lint, local production build and Vercel build: PASS.
- Chromium on deployed site: 12 cases, vi/en/zh at widths 1440, 820, 375 and 320; zero assertion failures and page errors. Evidence: `deployment-chromium-checks.json`.
- Firefox against local production build: same 12 cases; zero assertion failures and page errors. Evidence: `local-firefox-checks.json`.
- Checks cover five rendered cards, two lock icons, original posters HTTP 200, correct localized coming-soon text, click/hover/programmatic selection blocked, locked videos not loaded or played, arrows skip both locks, mobile cards reachable and no document horizontal overflow.
- Desktop/mobile screenshots inspected. The browser test compares copy case-insensitively because innerText may apply the existing uppercase CSS; earlier case-sensitive runs are superseded by the named reports above.

Deployment: https://web-cv6wv05s4-htmtslh-hubs-projects.vercel.app/

ID: dpl_8WpqZHBagwsQdHyUbM4Tqk2rrXdC. READY, production environment, `--skip-domain`.

Read-only Vercel inspect verified forgezone.store still resolves to dpl_DRK3Qpz3TJD1zm51Kq7iBwwovsTS. Domain promotion remains pending the previously documented authorized-download check or an explicit release exception. This hero restoration does not satisfy that outstanding product-release check.
