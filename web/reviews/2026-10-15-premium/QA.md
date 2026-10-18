# Premium catalogue and pricing — 15/10/2026

Request: web interfaces and Skill/Prompt products default to Premium downloads; rename Pro to Premium at USD 20/month; Ultra USD 200/year.

Scope: store pricing and product presentation, new-order checkout validation, account/download labels, profile access hints, email and vi/en/zh pricing terms, regeneration tooling and tests. Product source/ZIP/demo assets and existing Chronoform work remain unchanged by this task. No schema migration, membership/order rewrite or payment-dashboard change.

Policy: web/default and skill-prompt groups require a plan for new access. Agent/Tool retains individual sales. Both active monthly Premium and annual Ultra retain library access. Existing paid individual/bundle purchases retain their download entitlements, and pending historical payments reconcile at the amount stored on their orders. Free sample route remains free. Internal PRO identifier is retained for compatibility; public labels say Premium. Plans remain one-time term purchases without automatic renewal, matching the pre-existing billing implementation.

Implementation: product-policy.ts supplies the default tier used by UI, cart hydration and server checkout. Individual and mixed-cart requests containing Premium products return 403 before creating an order or calling Paddle. Downloads continue to validate paid membership expiry/refund/suspension on every server request, with paid historical ownership allowed. Profile returns read-only download IDs for button hints; it is not download authority. Active users get direct download actions; other visitors go to pricing. Web cards/detail no longer offer individual purchase/cart actions. Prices are 2000/20000 USD cents from the same membership policy used by checkout; Paddle non-catalog transaction amounts use those values.

Validation:

- node web/tools/check-memberships.cjs: PASS 330 offline assertions with mocked DB/mail/payment. Tests calendar expiry and renewal; exact Premium/Ultra checkout amounts; tampered client price rejection through server calculation; all current web individual/cart purchases blocked; mixed cart blocked; agent individual checkout retained; future skill-prompt default tier; active/expired/refunded/suspended access and profile hints; paid legacy individual/bundle access; historical USD 99 Pro order reconciliation; payment idempotency; mail and one-time Paddle payload.
- npm --prefix web run typecheck: PASS.
- npm --prefix web run build: PASS, with all 34 video recording manifests valid. No product preview was regenerated for this pricing task.
- web/tools/check-membership-ui.mjs: PASS 96 Chromium browser assertions with all API calls intercepted, vi/en/zh at 1440px and 390px. Pricing names/20/200 amounts; no horizontal overflow; anonymous login gate; signed-in plan checkout requests; Premium product individual/cart controls absent; nonmember CTA routes to pricing; simulated eligible account downloads without buying individually. No live account creation, email or payment.
- Desktop/mobile Vietnamese pricing screenshots inspected. Converter was run with output redirected to a review directory and checked for Premium cart conditions, detail CTA and price-unit fields; temporary generated source removed afterward. Existing generated storefront markup changed only at the relevant controls.

Not tested: actual card payment and paid live-account download. No production customer records were mutated by testing. Online deployment verification recorded below after release.


## Production

Deployment dpl_GmJTsrh9TcuoHbyRjEs4LQdYnZQV READY; https://forgezone.store, https://web-ndowp9crj-htmtslh-hubs-projects.vercel.app. Vercel build and recording manifest check PASS. Online UI repeated all 96 Chromium assertions on vi/en/zh desktop/mobile with intercepted APIs (no live payment/account writes), including final Premium/Ultra amounts and default Premium product controls. Screenshots in this folder now represent the production UI. Unmocked production API checks in online-api-checks.json confirm individual/mixed Premium checkout 403, guest plan checkout 401, guest download/profile 401. Rejections occur before order creation/payment calls. Real paid transaction and authenticated live downloads remain untested.
