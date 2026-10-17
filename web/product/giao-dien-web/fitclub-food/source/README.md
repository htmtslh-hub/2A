# FitClub Food 1.0.0

Read CUSTOMISE.md first: ten steps, twelve complete AI prompts and a counted edit map. Extract all nine files and open index.html beside assets/. Plain HTML/CSS/JavaScript, three local WebP food platter cutouts, no framework, install or build.

## Working behaviour
Three healthy club platter views: Club Harvest Platter (default), Protein Macro Platter, and Berry Vitality Platter. The first three bottom feature circle buttons, the three platter card `Preview on Stage` buttons, keyboard Left/Right arrows on `.hero__stage`, and horizontal pointer swipes switch the active overhead platter image, hero description, macro breakdown, and live kitchen order summary. Three portion buttons (`Standard Club`, `Athlete Cut`, `Weekly 5-Bowl Pass`) update the active portion tier, indicative rate, and pre-filled `mailto:` order enquiry link. Native `<dialog>` modals power the Member Locker & Chilled Box Delivery guide and the Sample Macro & Allergen Reference table, restoring focus when closed. Mobile navigation (`<= 620px`) closes on link click or Escape.

Scroll reveals, backdrop ring parallax, and platter transitions use finite `requestAnimationFrame` interpolation with no idle loop. Motion defaults ON across browsers (including OS reduced-motion settings) per the product policy. The footer `Pause motion` button pauses transitions for the current page visit; reloading restores ON. Without JavaScript, all sections, macro pills, `<details>` ingredient accordions, and email links remain functional. Relative paths work from `file://` and static hosting.

## Artwork, fonts and demonstration scope
FitClub Food is an independent fictional fitness bowl and healthy club kitchen concept. The three overhead platter renders (`platter-club.webp`, `platter-protein.webp`, `platter-berry.webp`), calorie and macro numbers (`520 kcal`, `640 kcal`, `460 kcal`), prices (`$14`–`$16 / bowl`, `$65 / 5 bowls`), `[YOUR STUDIO ADDRESS]` placeholder, and `kitchen@fitclubfood.example` email address are illustrative demo data, not a live meal-delivery business. No payment gateway, subscription database, or courier dispatch backend is included.

Each platter cutout is a `688×720` transparent WebP overhead studio image. Preserve alpha transparency and aspect ratio when replacing food images. Optional Google Fonts load Plus Jakarta Sans (`400`–`800`) with `display=swap` and system sans-serif fallbacks offline. Font licence details are in `LICENCE.txt`.

## Editing
Adjust colour tokens at the top of `assets/css/style.css`, page copy and sections in `index.html`, and the `PLATTERS` array in `assets/js/main.js`. The counted literal replacement map, image dimensions and troubleshooting checklist are in `CUSTOMISE.md`. Browser verification and scope limits are documented in the store QA report. Read `LICENCE.txt`.
