# solenne 2.1.0 — cart and COD QA

11/10/2026 · Windows · WEB-STATIC-1 v1.2. Scope: this product’s source cart/COD, customer setup documentation, public demo/preview, download ZIP and marketplace copy. Explicit owner request authorises COD and three extra portable assets (W01/W05/W06), retaining existing imagery/file-size exceptions. Shirtline README was reconstructed with separate explicit owner permission. LICENCE.txt is unchanged. No production deployment, database change or live external order/payment was performed.

## New checkout evidence

16/16 viewport/browser journeys PASS. chromium 153.0.8010.12; firefox 155.0; edge 155.0.4283.45; coccoc 152.0.7977.124. Each tests the actual native add control, required delivery fields, preview/no order, rejected request, stable retry reference, canonical USD total and acknowledged request clearing the bag. HTTP on isolated local ports; remote requests intercepted and mocked. See commerce-*.json. Viewports: 1440×900, 820×1180, 375×812, 320×740.

Shared detail checks: 19/19 PASS in tools/commerce-kit/detail-results.json: malformed/forged carts, blocked storage, file:// offline preview, quantities/focus/removal, shipping thresholds, separate persistent shirt sizes, mobile menu, failed/invalid requests, duplicate submits, 15-second timeout, no contact/address storage and rejected untrusted online redirect. Only those explicitly listed were exercised.

Final initial aria-controls check on all four browsers, exact Velora bike configuration and Shirtline menu/skip/no-JS navigation: tools/commerce-kit/final-ui-results.json. Checkout-only axe and horizontal overflow checks at all four sizes on Chromium: detail-results.json. Screenshots from source in screenshots/checkout-*.png; preview-source.png. Manual image inspection included Shirtline 320 and Solenne 1440 checkout; this is not a full manual review of every screenshot or text-on-image contrast.

## Required standards status

| Check | Status | Evidence / limits |
|---|---|---|
| Q01 | PASS with exceptions | Complete portable source; three COD assets; no credentials/backend added. Source images/CSS exceptions retained. |
| Q02 | PASS checkout; original layout PARTIAL | Four viewport journeys + no checkout horizontal overflow. Generic checker records older layout/touch-target findings below. |
| Q03 | PASS new flow; original interactions PARTIAL | Actual add, delivery, preview, failure, retry, success, clear. Original motion unchanged; no claim of renewed frame-by-frame motion audit. |
| Q04 | PASS checkout; broader NOT TESTED | Native modal keyboard/close/Escape, quantity focus and restored focus. Full page keyboard order not comprehensively audited. |
| Q05 | PASS checkout; broader PARTIAL | Checkout axe; initial control targets on four browsers. Earlier missing dialog target fixed by eager creation; broader page audit remains limited. |
| Q06 | PASS checkout axe; full-page PARTIAL | Checkout axe found no colour-contrast violation. Full pixel/manual image contrast not certified; historical findings below. |
| Q07 | PASS stated checkout fallbacks; broader PARTIAL | Blocked storage, malformed data, offline file preview, network/timeout. Existing default-on motion follows explicit project owner rule, superseding generic reduced-motion stop expectation. |
| Q08 | PASS listed browsers | Actual headless Chromium, Firefox, Edge, Cốc Cốc versions above. Safari and physical devices NOT TESTED. |
| Q09 | PASS new checkout | No pageerror during all listed COD journeys, scoped CSS/JS, no automatic order request. Full site profiling NOT TESTED. |
| Q10 | PASS structural audit; rights unchanged | sync-checks.json verifies 10 steps, 12 prompts, all counted edit-map entries. Read setup and prompts; not tested with another AI. Earlier count errors are superseded by final source audit. Existing asset-rights conditions retained. |
| Q11 | PASS final byte verification | Final dong-goi.mjs --ngoai-le reads each ZIP member and matches source bytes, package.log. Earlier checks.json hashes represent preliminary packages. |
| Q12 | PASS local synchronisation; live NOT TESTED | sync-checks.json compares source and demos; previews regenerated from source, metadata vi/en/zh updated. Paid download entitlement and production/live inbox/gateway NOT TESTED. |
| Q13 | PARTIAL | Original design/motion retained; scope adds usable checkout. D statuses below; no claim of complete design release gate. |

## Design status

D01–D04: NOT TESTED as a complete new design audit; original branding/hierarchy/composition retained. D05: PASS checkout interaction clarity, motion retained without reauthoring. D06: PASS new checkout responsive checks, original page PARTIAL. D07: PARTIAL, original fonts/licence unchanged, no rights invented. D08: PARTIAL, new state/receipt screenshots and preview updated; not all images manually reviewed.

Two choices: isolate checkout under fz-commerce classes so storefront motion/layout retain their existing selectors; use explicit preview mode and only acknowledge COD after receiver confirmation, preserving customer bags on failures.

## Assumptions and live setup

Template downloads cost $20 USD, separately from illustrative goods in these storefronts. COD receiver blank by default. The merchant must configure/test their own public order service and confirm stock/delivery manually. No shipping-area enforcement, tax calculation, verified payment or inventory is included. Online integration needs the merchant’s own server/account; mock redirect rejection is not a real gateway transaction test.

## Preliminary generic checker findings (retained, not hidden)

The full check-template.mjs run is preserved in checks.json and check.log where available. It ran before final targeted corrections; Q10 counts, Q11 preliminary-package/source mismatch and initial missing aria-controls targets were corrected and checked separately. Its motion-stop expectations conflict with the explicit owner default-on motion rule. Other existing layout/menu/contrast/fallback findings are not certified fixed by this COD task.

```text
Q11: bản giải nén khác source
Q05/chromium: axe [{"id":"aria-valid-attr-value","impact":"critical","nodes":[[".fz-commerce-fab"]]}]
Q05/firefox: axe [{"id":"aria-valid-attr-value","impact":"critical","nodes":[[".fz-commerce-fab"]]}]
```

## Final package

392860 bytes · SHA-256 b764d9726bb25ce992eee2d571c7f44e168bd5741b847ccad9232d6bd340e349

New cart/COD scope verified; full WEB-STATIC-1 product release NOT certified. No deployment performed.
