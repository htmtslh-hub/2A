# Account upgrade pricing — 2026-10-11

Scope: Forge Zone storefront pricing, account, checkout, paid-order fulfilment, refunds and authenticated downloads. Existing pricing-card styling is retained. No template sources, demo packages or production data were changed in this membership task.

## Behaviour

- Pro: USD 99, unlimited available-product downloads for one calendar month.
- Ultra: USD 299, unlimited available-product downloads for one calendar year.
- One payment; Paddle price payload has no recurring billing cycle. Only a confirmed paid webhook activates access.
- Account login is required; client-provided amounts cannot override server pricing. Individual products remain USD 20.
- Terms begin on fulfilment, use UTC calendar months/years and clamp month-end/leap-day dates. Same-plan renewal starts after the latest paid period. Different plans begin on payment without prorating or transferring remaining time; this is disclosed in the account page and purchase terms.
- Access is checked on each download request, including payment status, exact expiry and suspended-account status. Refunds remove the entitlement for that order. Separately paid renewal intervals retain their original dates after a refund.
- Expiry stops account-plan downloads, including re-downloads. Downloaded files remain usable under the licence. Historical individual/full-library purchases retain their permanent rights.
- Account shows current/expired/scheduled plan dates. Orders page exposes a download and setup-guide link for every available product while a plan is active.
- Pricing, account messages, licence, FAQ and email copy updated in Vietnamese, English and simplified Chinese. Existing payment-result page continues to use Vietnamese.

## Checks

- `node tools/check-memberships.cjs`: 182 offline checks of calendar boundaries, price/currency, authenticated checkout, duplicate webhook delivery, same-plan renewal, annual duration, refund/replay, legacy permanent purchases, access expiry/suspension, account/orders rendering, download route and one-time Paddle payload. Database/payment/mail dependencies are mocked; no real charge or email is sent.
- `node tools/check-membership-ui.mjs`: 66 Chromium checks at 1440px and 390px in vi-VN, en-US and zh-CN, with all browser API requests intercepted. Validates two plan cards, prices, overflow, guest login gate and signed-in Pro/Ultra checkout request bodies. Screenshots are stored beside this report.
- `npm run build`: passed, including TypeScript and route generation.
- `npx prisma validate`: passed. `npx prisma generate`: passed.

## Release requirement and limits

Prepared additive migration: `prisma/migrations/20261011090000_account_memberships/migration.sql`. Apply with `npx prisma migrate deploy` against the intended deployment database before the new application handles account/download requests. Never use `db push` as a substitute for the tracked migration. Existing enum values and purchase records are preserved.

The migration has not been applied to a live database. Real PostgreSQL locking/rollback, live Paddle transactions and live email delivery have not been tested. No deployment was performed in this membership task. Browser coverage is Chromium only; the task changes no animation code.
