# Brief — Maldives Escape (`maldives-escape`, v1.0.0)

## 1. Product Identity & Positioning

- **Product ID / Slug:** `t52` / `maldives-escape`
- **Category:** `commerce` (Travel / Luxury Island Resort Showcase)
- **Version:** `1.0.0`
- **Price:** `$35`
- **Target Buyer:** Luxury island resorts, overwater villa collections, seaplane charter operators, and bespoke honeymoon/travel agencies seeking a cinematic dark-ocean showcase with a circular frosted dome card overlay, oversized geometric destination typography, and interactive atoll villa filtering.

## 2. Visual & Interactive Reference Architecture

1. **Full-Bleed Sunset Overwater Villa Hero (`100dvh` desktop stage):**
   - Top horizontal header bar with subtle bottom border, brand mark (`Maldives Escape`), session-only `Pause motion` toggle (`[data-motion-toggle]`), and right-aligned navigation links (`Home` active underline, `Travel`, `Offers`, `About us`, `Contact us`) plus responsive mobile toggle.
   - Left circular frosted glass dome overlay (`.hero-dome`) framing the `<` and `>` carousel arrows, two vertical rounded-rectangle resort preview cards (`New Maldives Resort Comes With Water Slide` and `Reef Pavilion`), and a white pill `Book Now` button positioned directly beneath the primary vertical card.
   - Right-center oversized thin geometric uppercase `MALDIVES` display headline with `The sunny side of life` subtitle and location kicker (`BAA & NORTH MALÉ ATOLLS · SUNSET PERGOLA RESERVE`).
   - Bottom-center 4 circular pagination dots (`○ ○ ○ ●`, 4th dot active on initial load matching the reference) and bottom-right slide numeral `4`.
2. **Below-the-Fold Resort & Seaplane Sections:**
   - **Atoll Collection (`#travel`):** 4 filterable resort sanctuary cards (`All Sanctuaries (4)`, `Overwater Villas`, `Sunset Decks`, `Subsea Dining`) with `Preview on Hero` buttons that sync directly with the hero stage.
   - **Seasonal Offers (`#offers`):** 3 curated seaplane and overwater villa packages with `[YOUR PRICE]` placeholders and pre-filled `mailto:` enquiry actions.
   - **About Us (`#about`) & Contact Us (`#contact`):** 3 operational pillars (`Seaplane & Yacht Sync`, `Verified Villa Privacy`, `Living Reef Stewardship`) and a direct Malé concierge desk callout (`mailto:` + `tel:`).

## 3. Approved Exception (`--ngoai-le`)

- **Reason:** The visual reference requires 4 photographic Maldives scenes (sunset pergola deck with starlit pool, overwater bungalow water slide, twin-pool reef pavilion, and subsea coral dining dome) that cannot be faithfully represented by vector illustrations alone.
- **Asset Budget:** 4 local WebP images (`sunset-pergola-deck.webp`, `lagoon-slide-villa.webp`, `aerial-pool-pavilion.webp`, `underwater-atoll-dining.webp`) totalling `585,348` bytes (`571.6 KB`).
