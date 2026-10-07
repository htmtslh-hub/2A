# Forge Zone administration

The application lives at `/admin`. It reads the existing PostgreSQL accounts and
orders, and new anonymous pageviews. There is no fixture data in application code.

## Enable on a server

1. Apply migrations before serving this application version. Authentication now
   reads `User.suspendedAt` and `User.sessionVersion`, so deploying code first
   would break authentication against the old schema.
2. Run `npx prisma migrate deploy` from `web/` with the target database's direct
   `DATABASE_URL_UNPOOLED` connection configured. The additive migration is
   `20261006180000_admin_dashboard`; it does not alter existing orders, prices,
   entitlements or payment providers. Back up the target before production work.
3. Configure server-only `ADMIN_EMAILS` as comma-separated **existing account**
   emails. Matching is exact and case-insensitive. Empty denies all accounts.
   Never make this a NEXT_PUBLIC variable. No account receives admin privileges
   because it was the first to register. Removing an email revokes its access on
   the next request. The UI does not grant administrator roles.
4. Set `ANALYTICS_ENABLED=true` if traffic collection should run. Default is off.
5. Deploy/restart with these settings. Sign in at `/admin` using existing email
   credentials or the existing Google provider. Admins also see an Admin link on
   their account page. Check both an admin and a normal account after deployment.

Production enablement is recorded in `reviews/admin/QA.md`. Administrator
addresses remain server-only environment configuration, never a public role.

## Operations

- Accounts: server search by email/name, active/locked filter, pagination, counts
  of orders/download entitlements/saved products, change display name, lock/unlock.
- Locking increments the session generation, blocks credential/Google sign-in,
  invalidates existing JWTs, removes DB sessions and expires existing email
  download links. Unlocking requires a new login; old JWTs remain invalid.
  Ownership, purchases and orders are preserved. Admin accounts cannot be locked
  through this UI/API, including by another admin.
- Orders: date/status/provider/email/ID filters, line-item names and prices,
  payment provider reference, entitlement count, and private operational notes.
  Payment/refund status remains provider/webhook controlled. The dashboard does
  not create payments, refund money, fake PAID statuses or delete orders.
- Revenue: amounts from currently PAID orders using paidAt in the selected
  period, VND and USD shown separately. Not profit, net settlements or a historic
  refund ledger. Pending count is global, explicitly labelled.
- Audit: every account edit/lock/unlock and order note produces an immutable log
  in the same transaction. No audit delete/edit API. Actor IDs are stored rather
  than names so later profile changes do not change the event identity.
- Pageview windows: 7/30/90 calendar days including today, grouped in UTC. Other
  timestamps display in Asia/Ho_Chi_Minh. Data requests are private/no-store.
- Live synchronization: the active section re-reads the database every five
  seconds after the preceding request finishes. This is near-real-time polling,
  not a WebSocket stream. Unchanged results keep the current DOM; filters and
  pagination remain selected, and background refreshes do not show skeletons.
  Hidden tabs, offline browsers and open edit dialogs pause polling. Returning
  online/to the tab refreshes immediately. Transient errors keep the last data
  and retry with backoff up to 30 seconds; requests time out after 15 seconds.
  Revoked/expired access clears displayed data and stops synchronization.

## Traffic boundaries

Pageviews begin when enabled; this is not historical hosting analytics.
JavaScript-disabled visitors and blocked tracking are not counted. Each tab has
an anonymous sessionStorage UUID (not a unique person, and not a session timeout
metric). Reloading a tab keeps that UUID; reopening can create a new one. No
fingerprinting, cookie ID, account linkage, IP or email is stored. Referrers are
reduced to hostnames before transmission and again on the server. Query strings
are stripped except whitelisted catalog `mau=tN` / tab values. Sensitive routes
are excluded. DNT and GPC suppress collection; common bots are excluded.

The endpoint enforces origin and JSON validation, UUID event deduplication and a
per-session burst limit. Public client events are inherently forgeable; this is
operational traffic reporting, not an authoritative fraud/audit system. At high
traffic, add platform/WAF rate limits and dedicated analytics aggregation.

Raw pageviews currently remain in the database until deliberately pruned. The
UI reads at most 90 days. If the operator adopts a 90-day retention policy, run
the following through their database maintenance system (no job was created):

```sql
DELETE FROM "PageView" WHERE "createdAt" < CURRENT_TIMESTAMP - INTERVAL '90 days';
```

## Isolated verification

Test tools only connect to local PGlite's PostgreSQL protocol. They do not load
production secrets or write to Neon. Example PowerShell from `web/`:

```powershell
npm install --prefix "$env:TEMP/forge-admin-test-runtime" @electric-sql/pglite@0.5.8 @electric-sql/pglite-socket@0.2.11
npm run build
$env:ADMIN_TEST_RUNTIME = "$env:TEMP/forge-admin-test-runtime"
node tools/admin-test-server.mjs
# In another terminal, with repository Playwright/browser tooling installed:
node tools/check-admin.mjs
```

Fixture accounts (`example.test`) and their fixed test password exist only in
the memory database of that process. The test server binds to loopback; stop it
with Ctrl+C. It loads all migration SQL, seeds fictional accounts/orders/events,
and starts the production build at port 4360. `checks.json` and screenshots are
written under `reviews/admin/`. Test-only dependencies live outside the project;
runtime application dependencies are unchanged.
