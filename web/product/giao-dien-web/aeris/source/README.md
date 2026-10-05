# Aeris 1.0.0

Read CUSTOMISE.md first: it contains the exact edit map, ten setup steps and twelve complete AI prompts.

A static showcase for wireless over-ear headphones, suited to audio brands, product launches and retailers presenting one model in several colours. Extract the whole ZIP, then open index.html. No installation, build step, JS library, backend or account is required.

## Included

Ten files: index.html, assets/css/style.css, assets/js/main.js, four local WebP images in assets/images/ (aeris-pearl.webp, aeris-midnight.webp, aeris-blush.webp, aeris-detail.webp), CUSTOMISE.md, README.md and LICENCE.txt. The images are original AI-generated renders bundled with the template, not hotlinked.

## What works

- Hero colourway slider with three products. It advances on its own every 6 seconds; the round Pause button next to the progress bars stops it (Play restarts it), and it also holds while the mouse is over the slider controls, while keyboard focus is inside the hero or while the hero is off screen. Previous/next buttons, the 01–03 numbers, left/right arrow keys (while a slider control has focus) and horizontal swipe on touch screens all change the colour. The product, background wash, outline number, model copy and headline move together in one direction-aware transition, with a light band sweeping across and sound-wave rings pulsing behind the product in the new colour.
- Mouse parallax on the hero product (desktop pointer only) and a gentle scroll exit as the hero leaves the screen.
- A pinned "sound" story: while you scroll, three chapters replace each other, the headphones rotate and change colour, the ring pulses at each chapter change, and a progress line fills.
- Reveal on scroll for the design, collection, specs and enquiry sections (headings rise line by line, cards and spec rows enter in turn), plus a thin page progress line along the top edge.
- Section links, mobile menu (Escape and choosing a link close it), email enquiry links.

Not included: cart, checkout, payment, stock levels, product configurator, newsletter or form submission. The enquiry buttons open the visitor's email application.

## Motion and fallbacks

Each scene-change effect plays once and settles within about 1.5 seconds. With "reduce motion" switched on in the operating system, the slideshow starts paused (Play still works), colour changes are instant, the sweep and wave rings are not shown, reveals are skipped and the story becomes a normal list. Screens shorter than 560 px also get the list layout. Without JavaScript all content, navigation links and email links stay usable; the slider controls and Pause button are hidden because they need JavaScript, and the three colours remain available in the collection section.

## Demo data

Aeris, Aeris One, the colour names, $179, 40 mm drivers, hybrid ANC with six microphones, 40/30-hour battery, 10-minute fast charge, Bluetooth 5.3, 238 g and the box contents are fictional and illustrative, not tested hardware specifications. hello@aeris.example cannot receive email. Replace all of it before publishing.

## Editing

Content and links: index.html. Colours, washes, fonts and breakpoints: the :root block at the top of assets/css/style.css. Colour names shown under the slider: the COLOURS list near the top of assets/js/main.js. Images: assets/images/ (square 1024 × 1024 product renders on a pure white background; see CUSTOMISE.md before replacing them).

The product images use mix-blend-mode: multiply so their white background disappears into the pastel wash. A replacement image therefore needs a pure white background, or a transparent PNG/WebP with the blend mode removed.

## Fonts

League Spartan is loaded from Google Fonts (SIL Open Font License 1.1). Offline, the page falls back to Segoe UI, Helvetica Neue, Arial or another system sans-serif; the layout keeps working but looks different.

## Browsers and accessibility

Checked in Chromium and Firefox on Windows at 1440×900, 820×1180, 375×812 and 320×740, over file:// and HTTP, with keyboard, reduced motion, no JavaScript, offline and a 200% zoom layout. Safari, Edge and physical phones were not separately tested. The page has a skip link, visible focus outlines, landmarks and labelled controls. No external accessibility certification is claimed.

## Licence

See LICENCE.txt.
