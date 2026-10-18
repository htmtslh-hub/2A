# Manganresto 1.0.0 QA

16 October 2026, Windows. WEB-STATIC-1 v1.2.1 with session-authorized W01/W03/W05/W06 exceptions: nine files, three original local transparent WebP food images, finite dialog/filter controls, and ZIP above 20KiB. Optional Google Fonts under W04 with offline system fallbacks.

Final ZIP: 431,938 bytes, SHA-256 `0f2bea0cdd9cc6fa2e2da5f918429420a87260293f4ca3be39e0db593dff8dda`.
Nine extracted files match source byte-for-byte.
Official automated check report `reviews/1.0.0/checks.json`: 0 failures, 100% PASS.

| Check | Status and evidence |
|---|---|
| Q01 structure | PASS: Nine files (six core text files + three original local WebP food assets), no framework/build/runtime library/secrets. |
| Q02 responsive | PASS checks.json: All viewports at 1440×900, 820×1180, 375×812, 320×740; zero document overflow; all interactive touch targets ≥ 44×44px. |
| Q03 interaction | PASS: Category filter tabs, live menu search modal with keyboard navigation, table reservation form (Demo only), Escape dismissal, focus restoration, on-page anchor navigation, and toast notifications. |
| Q04 keyboard | PASS: Visible skip link, complete sequential focus traversal, mobile menu focus trap and Escape return to toggle trigger, accessible dialog focus handling. |
| Q05 structure/a11y | PASS: Exactly one h1, semantic landmarks (header, nav, main, section, footer), unique element IDs, valid anchors, all SVGs have aria-hidden/viewBox, zero axe WCAG 2.1 A/AA violations. |
| Q06 contrast | PASS: Pixel contrast verified across all backgrounds. Text on dark slate meets ≥ 10:1; text on amber gold badge meets 11.2:1; badges meet ≥ 6:1. |
| Q07 fallback | PASS: No-JS navigation links remain visible and accessible via .js-ready pattern; offline file:/// fully functional; animations finish within finite 3.5s window and pause under prefers-reduced-motion; session-only Pause motion toggle provided. |
| Q08 browsers | PASS: Chromium 153.0.8010.12 and Firefox 155.0 tested in automated test suite with zero errors. Safari / physical devices NOT TESTED. |
| Q09 technical/motion | PASS: Finite RAF micro-motion on plate tilt, finite 3.5s CSS animations, no infinite runaway loops; zero uncaught JavaScript errors or missing resources. |
| Q10 docs/assets | PASS: 10 steps, 12 complete AI prompts, no unfilled placeholders, and exact literal edit counts verified in CUSTOMISE.md. Commercial license included. |
| Q11 final ZIP | PASS: checks.json sourceMatchesExtracted=true, 0 failures, both browser engines verified. ZIP stored outside public/. |
| Q12 store | PASS: Integrated into Forge Zone catalog as slot t42, category commerce, video recording preview verified via quay-preview.mjs --check. |
| Q13 design | PASS: High aesthetic fidelity matching the reference image: organic dark & amber gold dual-tone split background, centerpiece gourmet squid ink prawn pasta plate with concentric halo orbits, floating category cards, chef accolades, and vertical social dock. |

### Design Quality Standards (D01–D08)
- **D01 Hero Value**: Clear fine-dining dining proposition, subtitle, and distinct CTAs ("Check Out Menu" leading to #menu, "Book A Table" leading to #reservation).
- **D02 Visual Direction**: Bold asymmetrical organic fluid wave dividing graphite dark and vibrant warm yellow, high-key white porcelain food photography, Plus Jakarta Sans + Playfair Display typography.
- **D03 Purposeful Sections**: Hero, Signature Menu with tab filters, Kitchen Heritage & Organic Sourcing, 8 Master Chefs team spotlight, Table Booking Inquiry, and comprehensive Footer.
- **D04 Design Tokens**: Centralized `:root` CSS custom properties for colors, typography, border radii, and spacing.
- **D05 Layout Integrity**: No clipping, no unexpected overflow, clean multi-column to single-column wrapping across all 4 responsive test viewports.
- **D06 Authentic Copy**: Professional fine-dining culinary descriptions, specific ingredients (San Marzano tomatoes, bronze-drawn semolina, Umbrian truffles, Haas avocado, Valrhona chocolate), no lorem ipsum.
- **D07 Truth in Presentation**: Fictional concept clearly marked in README, LICENCE, and reservation form ("Demo only"). No fabricated customer endorsements.
- **D08 Numerical Consistency**: 8 master chefs and 38 signature menu items consistent throughout hero badges, about section, search modal, and copy.
