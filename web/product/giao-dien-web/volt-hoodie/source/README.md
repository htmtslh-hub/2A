# Volt Hoodie 1.0.0

Read CUSTOMISE.md first: ten steps, twelve complete AI prompts and a counted edit map. Extract all nine files and open index.html beside assets/. Plain HTML/CSS/JavaScript, three local WebP garment cutouts, no framework, install or build.

## Working behaviour
Three hero colourway slides: Volt Yellow / Carbon (default), Cyber Mint / Carbon, and Arctic White / Carbon. Left colour swatches, bottom pagination dots, colourway cards, search dialog quick-jump buttons, keyboard Left/Right arrows on the product stage, and horizontal pointer swipes switch the active hoodie render, description, vertical rail thumb position and live order enquiry summary. Three garment size buttons (S, M, L) in the hero and in the Sport's size matrix update the selected size and pre-filled `mailto:` order link. Native `<dialog>` modals power the search lookup, member access demo notice (`Log In` / `Sing Up`), and quick capsule guide, restoring focus when closed. Mobile menu closes on link click, Escape key and desktop breakpoint resize.

Scroll reveals and hero slide transitions use finite `requestAnimationFrame` with no idle loop. Motion defaults ON across browsers (including OS reduced-motion settings) per the product policy. The footer `Pause motion` button pauses transitions for the current page visit; reloading restores ON. Without JavaScript, all sections, garment details, FAQ `<details>` disclosures and email/phone links remain functional. Relative paths work from `file://` and static hosting.

## Artwork, fonts and demonstration scope
Volt Hoodie is an independent fictional streetwear interface study. The three hoodie renders (`hoodie-volt.webp`, `hoodie-mint.webp`, `hoodie-arctic.webp`), 420 GSM fleece specifications, Kid's and Sport's sizing charts, `Rs. 1559/-` price, `+91 98765 43210` phone number, and `orders@volthoodie.example` email address are illustrative demo data, not an active online store. No payment processor, shopping cart database, live inventory or authentication backend is included.

Each hoodie cutout is a `660×1056` transparent WebP studio render. Preserve transparency and the `5:8` vertical aspect ratio when replacing garment images. Optional Google Fonts load Poppins (`400`–`800`, `800 italic`) with `display=swap` and clean system sans-serif fallbacks offline. Font licence details are in `LICENCE.txt`.

## Editing
Adjust colour tokens at the top of `assets/css/style.css`, page copy and sections in `index.html`, and the `SLIDES` / `SIZE_INFO` objects in `assets/js/main.js`. The counted literal replacement map, image dimensions and troubleshooting checklist are in `CUSTOMISE.md`. Browser verification and scope limits are documented in the store QA report. Read `LICENCE.txt`.
