# Customer guide implementation

Public route: `/huong-dan`. Optional query parameters: `template=kinetiq|tidal|keystead` and `view=steps|prompts|template`. Unknown templates fall back to general instructions with a visible message. No authentication or purchase is required to read documentation; downloads retain their existing authentication checks.

## Content and maintenance

- The full guides and 12 prompts come from the `customer-guide*.md` files in this folder (Vietnamese, English, and Simplified Chinese). Run `npm run guide:sync` in `web` after changing any source. Commit the resulting `src/content/customer-guide.json` with the source change. Production imports this snapshot, not files outside the deployment.
- The sync tool also includes the English CUSTOMISE documents for the six supported templates. It does not copy paid HTML/CSS/JS, private ZIPs or internal production standards.
- Template-specific notes live in `src/lib/template-guides.ts` in vi/en/zh. Review all three versions against the real template when changing its structure.
- The server uses the same `agentic-lang` cookie as the storefront and falls back to the browser language. A visible VI/EN/中 switcher updates the cookie and refreshes the route. Page metadata, interface text, guide content, prompt search, template names, and prompt context change together. The original English CUSTOMISE document remains available in a disclosure.
- Product detail integration is maintained in `tools/convert.mjs`, not by manually editing generated markup. `src/lib/view.ts` supplies guide data and the footer link. Running the converter preserves these additions and fails if the expected slot is missing.
- Order links handle both individual purchases and each actual template in a bundle. No new download endpoint or payment behaviour was added.

## Design

Preserve the existing Forge Zone dark background, warm red accent and Unbounded/Be Vietnam Pro fonts. Use CSS Modules and native semantic controls; no new dependency. This is a reading and help interface, not a marketing landing page: design variance 3, motion intensity 1, visual density 4. Sidebar on desktop, collapsible contents on mobile, readable document column, prompt text collapsed until requested, persistent visible copy action and explicit copy feedback.

## Verification, 21 September 2026

- `npm run typecheck`: passed.
- Targeted ESLint for new guide code, modified order/view code and generation scripts: passed.
- `npm run build`: passed after allowing network access to download the existing Google Fonts. The first restricted-network attempt failed only at font fetching.
- Each of vi/en/zh: 13 sections, 10 steps, 12 complete prompts, with stable anchors across languages.
- Language switch verified in the browser from English to Simplified Chinese and back to Vietnamese while preserving `template=tidal&view=prompts`; titles, navigation, template selector, all 12 prompt titles, prompt body, and status text changed together.
- Browser width/scrollWidth/clientWidth: 1440/1425/1425, 820/805/805, 375/360/360, 320/305/305; no page overflow at these widths. The 15px difference is the browser scrollbar.
- Rechecked the Simplified Chinese prompt view at 375 px: document clientWidth and scrollWidth were both 360 px, with no horizontal page overflow.
- Checked desktop and mobile screenshots, mobile contents disclosure, anchor navigation, selected-template links and product-detail/footer integration.
- Prompt search matches unaccented Vietnamese (`doi mau`), and has an empty-result state.
- Copy/paste verified for the full first prompt with Kinetiq context (1,887 characters), including its final sentence.
- Clipboard failure has a manual selection textarea; this failure branch has not been forced in the browser.
- No browser warnings/errors observed on the tested guide route. No production deployment performed.
- Signed-in purchase list needs a real authenticated test account for end-to-end verification. Its individual and bundle guide links are implemented and typechecked; no customer account or order was changed during testing.
