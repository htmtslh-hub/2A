# Keystead — static website template

Version 1.0.0 · Forge Zone · homes and rentals listing page

**Start with `CUSTOMISE.md`.** It has ten practical steps, twelve copy-ready AI prompts and an exact edit map for this template. You edit the files yourself or with an AI chat tool; this is not a hosted no-code editor.

## Open

Extract the whole ZIP and double-click `keystead/index.html`. Keep `assets/css/style.css`, `assets/js/main.js` and the `assets/img` folder in their relative paths. No installation or build step is needed. To publish, upload the contents of the `keystead` folder to any static host.

## What works

- One English page: header, photo hero, a browse bar, four promises, six listing cards (three apartments, three houses), neighbourhoods, how renting works, a landlord section, contact details and footer.
- The browse bar and every menu item are **links to sections on the page**. The browse bar is not a search form and does not filter anything.
- "Ask about this home", "Book a viewing" and the landlord button are `mailto:` links. They open the visitor's email app with a subject line; nothing is sent automatically.
- JavaScript only opens and closes the mobile menu and fades sections in on scroll. Without JavaScript every section and link still works.

## Not included

No backend, live search, filters, property database, booking calendar, map, login, payments, forms, analytics or cookies. If you need a real search or listings feed, a developer has to add it to your copy.

## Sample content

Keystead, Northbank, the four neighbourhoods, the six homes, prices, sizes, availability dates, the office address and opening hours are fictional. The seven photographs in `assets/img` were generated with AI for this template and show imagined places, not real properties. Replace the copy, prices and photos with your own before publishing (see the edit map in `CUSTOMISE.md`).

## Fonts and offline use

Plus Jakarta Sans is loaded from Google Fonts (SIL Open Font License 1.1) with `display=swap`. Without a network connection the page uses system fonts and stays readable; spacing can differ slightly.

## Images and file size

This template ships seven WebP photos (about 396 KB in total), so the ZIP is larger than Forge Zone's SVG-only templates. Each photo has a fixed width and height, the listing photos load lazily, and the hero has a dark fallback colour so its text stays readable even if the photo is missing.

## Tested

Checked on Windows in Chromium and Firefox at 1440, 820, 375 and 320 px wide, from the extracted ZIP over `file://` and a local web server, including keyboard use, reduced motion, disabled JavaScript, blocked fonts and 200% zoom. Safari, Edge and physical phones have not been tested. This is an internal checklist, not an accessibility certification.

See `LICENCE.txt` for permitted use.
