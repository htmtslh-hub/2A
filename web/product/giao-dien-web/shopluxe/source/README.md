# Shopluxe 1.0.0

A modern, high-converting e-commerce storefront template built with pure HTML5, CSS3, and JavaScript.

Start with `CUSTOMISE.md` for the complete 10-step customization roadmap, 12 ready-to-use AI prompts, and the literal Edit Map.

## Included in Package
- `index.html`: Complete e-commerce homepage layout featuring Announcement Bar, Sticky Navigation with dropdowns, Hero section with high-converting typography & product composition, Trust Badges, Browse By Category (8 categories), Trending Products (5 cards with live Add To Cart), Special Value Cards (3 proposition blocks), Social Proof stats with customer avatar cluster, Newsletter signup with feedback state, and full 5-column Footer with accepted payment badges.
- `assets/css/style.css`: Design tokens declared in `:root`, responsive layout across four standard viewport tiers (1100px, 950px, 650px, 400px), accessible focus indicators (`outline-offset: 3px`), and high contrast ratios. Complies with the 05/10/2026 animation rule (always enabled by default across all browsers).
- `assets/js/main.js`: Lightweight, vanilla JavaScript engine handling mobile drawer navigation, quick search drawer toggle, hero carousel with directional buttons and indicators, in-session cart pill additions, newsletter feedback, and scroll reveal.
- `assets/img/`: Optimized local WebP images for hero product composition, category cards, trending product thumbnails, and customer review avatars.
- `CUSTOMISE.md`: 10-step customization guide with 12 AI prompts and product-specific literal edit map.
- `README.md`: Technical overview, features, and setup instructions.
- `LICENCE.txt`: Commercial usage terms and font licensing information.

## How to Open
1. Unzip the downloaded ZIP file.
2. Double click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Cốc Cốc, Safari).
3. No build step, Node.js, framework, CDN, or backend server are required. It opens cleanly from local disk via `file:///` protocol or any static web host.

## Working Features
- **In-Session Cart**: Clicking "ADD TO CART" on any product dynamically updates the header cart item badge count and cumulative total price in real time, accompanied by a toast notification.
- **Hero Carousel**: Interactive `#hero-prev` and `#hero-next` controls alongside pagination dots to cycle featured collections.
- **Search Drawer**: Quick search toggle button in the header that slides down a search input and supports keyboard `Escape` closing.
- **Mobile Navigation**: Accessible hamburger drawer button with `aria-expanded` synchronization, click-outside/link auto-close, and keyboard `Escape` closure.
- **Offline & Fallback Ready**: Complete offline support with native system typography stack (`system-ui`, `Georgia`) if network or Google Fonts are inaccessible. Works with JavaScript disabled for all core content and purchasing links.

## Demo Scope
Live ordering, external payment gateways, and backend inventory databases are not included. The template is designed as a clean, production-ready static storefront ready to connect to Shopify, WooCommerce, Snipcart, Stripe, or custom APIs.
