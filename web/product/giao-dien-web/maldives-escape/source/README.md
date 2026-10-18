# Maldives Escape — Overwater Villa & Atoll Showcase (`maldives-escape`)

**Start with [`CUSTOMISE.md`](./CUSTOMISE.md)** for the complete 10-step customisation workflow, exact file/string edit map, and 12 copy-ready AI prompts.

## Who This Template Is For

Maldives Escape is a static HTML/CSS/JavaScript landing page and resort showcase designed for luxury island resorts, overwater villa collections, private yacht/seaplane charter concierges, and tropical destination specialists.

## What Works vs What Is Demo Content

- **Working front-end features:**
  - Full-bleed 4-scene Maldives hero stage (`sunset-pergola-deck.webp`, `lagoon-slide-villa.webp`, `aerial-pool-pavilion.webp`, `underwater-atoll-dining.webp`) with a frosted circular dome overlay on the left, dual vertical resort preview cards (`New Maldives Resort Comes With Water Slide` + secondary preview card), `<` / `>` carousel arrows, `Book Now` pill button, oversized `MALDIVES — The sunny side of life` display typography, 4 bottom pagination dots (`○ ○ ○ ●`), and a dynamic slide numeral.
  - Atoll Collection section (`#travel`) with interactive category filter pills (`All Sanctuaries`, `Overwater Villas`, `Sunset Decks`, `Subsea Dining`) and `"Preview on Hero"` buttons.
  - Seasonal Offers section (`#offers`), About Us section (`#about`), and direct `mailto:` / `tel:` concierge links (`#contact`).
  - Responsive mobile navigation (`aria-expanded`, `Escape` to close, automatic reset on desktop resize) and a session-only `Pause motion` toggle (`[data-motion-toggle]`).
- **Demo / illustrative content (replace before publishing):**
  - Brand name `Maldives Escape`, contact address (`Boduthakurufaanu Magu, Malé 20026`), email (`concierge@maldivesescape.example`), phone (`+960 664 2090`), and `[YOUR PRICE]` package placeholders.
  - No live booking engine, availability calendar, payment processor, or backend server is included.

## What Is in the Package

See [`CUSTOMISE.md`](./CUSTOMISE.md) first for line-by-line editing instructions.

```text
maldives-escape/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/
│       ├── aerial-pool-pavilion.webp
│       ├── lagoon-slide-villa.webp
│       ├── sunset-pergola-deck.webp
│       └── underwater-atoll-dining.webp
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
```

## How to Open Locally

1. Extract `maldives-escape.zip` into a local folder.
2. Double-click `index.html` to open via `file:///`, or run any static server (such as `npx serve .`) in the extracted folder.
3. No build step, Node.js runtime, or external JavaScript library is required.

## Changing Colours, Fonts, and Hero Images

- **Colours & Typography:** Edit the `:root` variables at the top of `assets/css/style.css` (`--bg`, `--bg-alt`, `--surface`, `--accent`, `--font-display`, `--font-body`).
- **Google Fonts:** Loads `Outfit` and `Plus Jakarta Sans` (both SIL Open Font License 1.1) with offline-safe system sans-serif fallbacks.
- **Resort Images:** Replace the four `.webp` files in `assets/img/` (keep `16:9` aspect ratio, e.g. `1600×900` or `1280×720`) and update their `alt` text and labels in `index.html` and `assets/js/main.js`.

## Verified Browsers & Accessibility

- Tested on headless **Chromium** and **Firefox** across `1440×900`, `820×1180`, `375×812`, `320×740`, and `200%` desktop zoom (`720×450` @ 2x).
- Includes a keyboard skip link (`Skip to main content`), semantic landmarks (`header`, `nav`, `main`, `footer`), single `h1`, WCAG AA colour contrast, `44×44 px` minimum touch targets, and a session-only `Pause motion` control.

## Licence

See [`LICENCE.txt`](./LICENCE.txt) for commercial usage rights and restrictions.
