# USD pricing and portable COD — 11/10/2026

Individual template download price: $20 USD in vi/en/zh; new checkout accepts Paddle/USD only. Bundle keeps its separate price. Existing VND order/webhook reconciliation is retained. check-pricing.cjs verifies every catalogue template, a two-template $40 cart, rejects PAYOS as new checkout input and checks mocked Paddle USD 2000/item payload. npm run typecheck and npm run build PASS. No real transaction or database mutation.

176/176 COD journeys PASS on actual Chromium, Firefox, Edge and Cốc Cốc at four viewport sizes. 19/19 deeper checks PASS. 48 final initial-control/menu/no-JS/configuration checks PASS. Requests mocked; no live inbox or gateway tested.

| Product | Version | COD journeys | ZIP bytes |
|---|---|---|---|
| shirtline | 1.2.0 | 16/16 | 526919 |
| novatrend | 1.2.0 | 16/16 | 583873 |
| diginest | 1.3.0 | 16/16 | 452138 |
| soniq | 1.1.0 | 16/16 | 820675 |
| astra-interior | 2.1.0 | 16/16 | 841805 |
| vybe | 1.1.0 | 16/16 | 760635 |
| solenne | 2.1.0 | 16/16 | 392860 |
| auralis | 1.3.0 | 16/16 | 360841 |
| aeris | 1.4.0 | 16/16 | 182485 |
| watchroom | 1.3.0 | 16/16 | 489103 |
| velora | 1.3.0 | 16/16 | 33169 |

Each product’s reviews/<version>/QA.md records browser versions, evidence, final ZIP SHA-256, Q01–Q13/D01–D08 limitations and preliminary generic findings. New checkout passes scoped accessibility/overflow checks. Existing full-page contrast/layout/motion-checker findings remain qualified; this is not a certification of all eleven templates against the full standard.

Buyer setup: source/CUSTOMISE.md → COD setup. Set the merchant’s public receiver and shipping, publish to HTTPS, confirm a labelled test reaches their inbox before launch. Blank endpoint clearly previews only. Online connection instructions require the buyer’s own merchant account and server.

Source, demos, previews, marketplace copy and final ZIPs are synchronised; sync-checks.json checks ten steps/twelve prompts/edit counts. No production deploy performed. Earlier hover reduction/deployment belongs to the preceding task.
