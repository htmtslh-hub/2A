# Admin dashboard — local verification

## Release recovery — 7 October 2026

The Watchroom-only deployment omitted the uncommitted admin implementation.
The owner requested finishing and pushing all remaining related work. The
release checkout starts from current origin/master, preserving Watchroom and
the newer Crimson Folio catalog changes. All pending admin/auth/schema/traffic/
privacy documentation changes are included together, with no secret files.

Reran production build/TypeScript, scoped ESLint, the isolated functionality,
live synchronization and four-browser motion suites successfully. Reviewed
the refreshed overview screenshot. Read-only database readiness confirms the
admin migration was already applied and the configured owner account is active;
no migration or account/order mutations were performed on production. The
Vercel CLI pull redacts all production environment values, so blank values in
that pulled file do not prove missing configuration. Reapplied the existing
owner allowlist and analytics switch through Vercel, without adding an identity.
Production deployment `dpl_3ErqUgGJtRZoG6k2RDPLPFM3bvtK` is READY and aliased
to https://forgezone.store, with source commit `2e3da24`. Cloud build/TypeScript
passed. Updated `production-checks.json` confirms installed Edge 154.0.4258.62
at 1440px and Cốc Cốc 152.0.7977.124 at 375px: authorized admin/page/API reads,
anonymous denial, profile access, automatic live pageview updates, modal/Escape,
responsive layout and zero client runtime errors. The short-lived owner test
session was server-signed; live Google OAuth was not exercised. No production
account/order mutations or fixture imports were performed. The runtime confirms
administrator configuration and tracking are active.

Watchroom production regression was also rerun against this release checkout's
exact deployed bytes (Git uses CRLF in this checkout): asset SHA-256 checks,
carousel intermediate frames, Pause, model pairing and mobile on Chromium,
Edge and Cốc Cốc. Its text matches the prior source after line ending
normalization. Other product demo URLs and the storefront remain HTTP 200.

Verified 6 October 2026. The complete production Next.js build was exercised
against an in-memory, isolated PostgreSQL-compatible PGlite database using all
repository migration SQL. All accounts, orders and traffic in captures are
fictional fixtures. No production database, payment provider or email was used.

Automated results: `checks.json`. Runner: `web/tools/check-admin.mjs`.

## Reference redesign and motion verification

The admin interface now uses a plum workspace, black rounded navigation and
panels, pink accents, three-column overview and a responsive full-width chart.
The redesign changes only admin UI and its verification tools; existing admin
authorization, mutations and traffic data behavior are preserved.

`motion-checks.json` records real midframes on Chromium, Firefox, installed Edge
and installed Cốc Cốc. CSS animation/transition and WAAPI were disabled, reduced
motion was enabled and legacy motion-off storage was seeded. Finite RAF still
draws the chart, counts values, moves the navigation pill and animates dialog
entry, exit and backdrop. Rapid navigation cancels stale work; the tracked RAF
queue returns to zero. Pause finishes current work and a fresh visit enables
motion again. There is no carousel wrap in this admin interface.

The production build, scoped ESLint, full isolated functionality suite and
motion suite passed after the redesign. Desktop and settled mobile captures
were reviewed; the chart uses a smaller viewBox on narrow screens.

## Production synchronization — 6 October 2026

- Before applying migration, the local production connection was verified
  against the live owner's authorized account. A consistent repeatable-read
  logical row/column snapshot was saved under ignored `.vercel/admin-backups/`;
  this is a local logical backup, not a managed point-in-time snapshot.
- `prisma migrate deploy` applied `20261006180000_admin_dashboard` successfully.
  Counts remained 1 user, 7 orders, 2 order items, 1 purchase and 1 saved product.
- Server-only administrator allowlist was configured to the owner's provided
  existing account; anonymous pageview collection was enabled. No fixture data
  was imported into production, and no production order/account was edited.
- Deployment `dpl_AJYCJyQ53f5Y9xwxNASgzPZS4bnm` is ready and aliased to
  `https://forgezone.store`. `.vercel/` is explicitly excluded from deployment
  uploads, including the backup and pulled sensitive environment metadata.
- `production-checks.json`: installed Edge 154.0.4258.62 at 1440px and Cốc Cốc
  152.0.7977.124 at 375px passed live authorized page/API reads, anonymous
  denial, database counts, profile access, public pageview collection appearing
  automatically in admin, modal/Escape, layout and no client runtime errors.
  The check used a short-lived server-signed verification session for the
  owner-authorized account. It did not exercise a live Google login flow.
- `live-checks.json`: isolated tests cover near-real-time polling, transient
  failures, offline/hidden-tab/edit-dialog pause, reconnect, retained filters
  and access revocation. The interval is five seconds after a request completes,
  with backoff on failures, rather than an instantaneous push stream.

## Verified behavior

- Anonymous and ordinary users cannot read or write admin endpoints. Responses
  are private/no-store. The page denies normal accounts even after login.
- Account search, pagination, names, lock/unlock and mutation audit transaction.
  Lock blocks an already logged-in JWT and an email download link. Unlock does
  not revive that JWT; a new login restores profile access and the existing
  purchased DigiNest ZIP download. Orders and purchases stay intact.
- Admin/self-lock rejected. Invalid input and cross-origin writes rejected.
- Order status/provider filtering and details, notes persisted, provider payment
  status untouched. BigInt gateway references serialized as exact strings.
- Revenue independently summed for VND and USD from PAID orders, chart totals
  match SQL data and every day is filled. Empty and loading UI use explicit text.
- Traffic deduplication, redaction of tokens/query parameters/referrers, exclusion
  of private routes, client and server DNT, per-session burst limit, real public
  storefront tracker integration, failure/retry UI, no client runtime errors.
- Native dialog Escape/focus restoration, navigation, date filtering, no page
  horizontal overflow. Wide tables remain inside a keyboard-focusable scroller.
- Axe found zero violations on desktop overview and each browser's traffic page.

Browsers actually tested (headless, using installed executables for Edge/Cốc Cốc):

| Browser | Version | Viewport width |
| --- | --- | --- |
| Chromium | 153.0.8010.12 | 1440 and 375 |
| Firefox | 155.0 | 820 |
| Edge | 154.0.4258.62 | 1440 |
| Cốc Cốc | 152.0.7977.124 | 320 |

Visual captures: `overview-desktop.png`, `chromium-375.png`, `firefox-820.png`,
`edge-1440.png`, `coccoc-320.png`. Desktop/mobile captures were visually reviewed.
Captures are intentionally ignored by Git and contain test data only.

## Implementation checks and boundaries

- `npm run build`: PASS (includes TypeScript).
- ESLint for changed application modules and test tools: PASS.
- `git diff --check`: PASS.
- Runtime dependencies and template product/demo/ZIP files unchanged.
- Shared Prisma client is reused in production and development, preventing a new
  connection pool on each lazy Proxy property read. Account/profile/download
  regression checks use that same production client.

Not tested: Safari, live Google OAuth (provider unavailable in the isolated
environment), live payment or refund transactions, load/stress at production scale,
screen-reader manual sessions. There is no claim of end-to-end live commerce
verification. Admin requires JavaScript, with an explicit noscript notice;
credential forms use POST so a native submit cannot put passwords in the URL.

Production enablement instructions and data boundaries: `web/docs/admin.md`.
Administrator identity was explicitly provided by the owner and configured on
the server. No address was inferred or automatically promoted.
