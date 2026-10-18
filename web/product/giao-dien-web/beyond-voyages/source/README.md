# Beyond Voyages — Travel & Destination Discovery Showcase (`beyond-voyages`)

**Start with [`CUSTOMISE.md`](./CUSTOMISE.md)** for the complete 10-step customisation workflow, exact file/string edit map, and 12 copy-ready AI prompts.

## Who This Template Is For

Beyond Voyages is a static HTML/CSS/JavaScript landing page and destination showcase designed for boutique travel agencies, private tour operators, yacht/boat charter concierges, and editorial destination guides.

## What Works vs What Is Demo Content

- **Working front-end features:**
  - Full-bleed scenic hero stage with a 5-destination curved orbital selector (`Cameo Island`, `Koh Phi Phi Don`, `Lago di Braies`, `Cinque Terre`, `Grand Canal`), synchronized right-edge pagination dots, keyboard arrow support (`ArrowUp`/`ArrowDown`/`ArrowLeft`/`ArrowRight`), and touch swipe support.
  - Destination Atlas section (`#destinations`) with interactive regional filter pills (`All Regions`, `Alpine & Lakes`, `Mediterranean Coast`, `Southeast Asia`) and "View on Hero Stage" buttons.
  - Curated Travel Packages section (`#packages`), editorial About Us section (`#about`), and direct `mailto:` / `tel:` concierge links (`#contact`).
  - Responsive mobile navigation (`aria-expanded`, `Escape` to close, automatic reset on desktop resize) and a session-only `Pause motion` toggle (`[data-motion-toggle]`).
- **Demo / illustrative content (replace before publishing):**
  - The header wordmark `Logoipsum`, company name `Beyond Voyages`, contact address (`Talstrasse 82, 8001 Zürich`), email (`concierge@beyondvoyages.example`), phone (`+41 44 580 24 90`), and `[YOUR PRICE]` package placeholders.
  - No live booking engine, availability calendar, payment processor, or backend server is included.

## What Is in the Package

See [`CUSTOMISE.md`](./CUSTOMISE.md) first for line-by-line editing instructions.

```text
beyond-voyages/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/
│       ├── boathouse-lake.webp
│       ├── cameo-island.webp
│       ├── cinque-terre.webp
│       ├── grand-canal.webp
│       └── koh-phi-phi.webp
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
```

## How to Open Locally

1. Extract `beyond-voyages.zip` into a local folder.
2. Double-click `index.html` to open via `file:///`, or run any static server (such as `npx serve .`) in the extracted folder.
3. No build step, Node.js runtime, or external JavaScript library is required.

## Changing Colours, Fonts, and Hero Images

- **Colours & Typography:** Edit the `:root` variables at the top of `assets/css/style.css` (`--bg`, `--bg-alt`, `--surface`, `--accent`, `--font-display`, `--font-body`).
- **Google Fonts:** Loads `Lobster` and `Plus Jakarta Sans` (both SIL Open Font License 1.1) with offline-safe serif and sans-serif fallbacks.
- **Destination Images:** Replace the five `.webp` files in `assets/img/` (keep `16:9` aspect ratio, e.g. `1600×900` or `1280×720`) and update their `alt` text and labels in `index.html` and `assets/js/main.js`.

## Verified Browsers & Accessibility

- Tested on headless **Chromium** and **Firefox** across `1440×900`, `820×1180`, `375×812`, `320×740`, and `200%` desktop zoom (`720×450` @ 2x).
- Includes a keyboard skip link (`Skip to main content`), semantic landmarks (`header`, `nav`, `main`, `footer`), single `h1`, WCAG AA colour contrast, `44×44 px` minimum touch targets, and a session-only `Pause motion` control.

## Licence

See [`LICENCE.txt`](./LICENCE.txt) for commercial usage rights and restrictions.
