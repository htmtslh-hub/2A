# Auralis 1.2.4

Read CUSTOMISE.md first: it includes the exact edit map, ten setup steps and twelve complete AI prompts.

A static wireless-earbud showcase for audio brands and launch campaigns. Extract the whole ZIP, then open index.html. No installation, build, JS library, CDN, network font, backend or account is required.

## Included

Ten files: index.html, assets/css/style.css, assets/js/main.js, four local WebP assets in assets/images/, CUSTOMISE.md, README.md and LICENCE.txt. The four original local AI-generated images are included, not hotlinked.

## Working interactions

Three-model product carousel with centered arrow buttons and counter across desktop, tablet and mobile, left/right arrow keys and horizontal touch swipe. The selected product stays sharp while neighboring products shrink and blur. Next brings the new product from the right and sends the old product left; Previous reverses both directions. The last-to-first wrap selects the destination directly, without passing through the middle product. A scroll-pinned hero moves the same selected object from right to left and reveals its synchronized detail panel. The same pinned stage then slides the whole detail scene away, brings in the earbuds with their charging case, and lifts into the white AirBuds scene. Section links, email enquiry, mobile menu (including Escape and resize), reveal, and a sticky product story with three scroll-controlled chapters with distinct violet, graphite and charging-kit product scenes. Movement uses transforms, frame-based scene navigation and brief interpolation after wheel/key input. Animation frames stop once the movement settles. Scene navigation does not depend on native smooth scrolling. Reduced motion defaults to a static expanded story, with an explicit Enable transitions / Pause transitions control. Short viewports from 420 px high use a compact animated composition. Very short viewports, enlarged text and no JavaScript receive the static expanded story. No cart, checkout, payment processing, product configuration, stock service or form submission.

## Demo data

Auralis, EvoBuds One, StudioBuds Pro and AirBuds Lite are fictional. All carousel model claims are illustrative. $149, 11 mm driver, ANC, 8/32-hour battery, Bluetooth 5.3 and IPX4 are illustrative claims, not tested hardware specifications. The enquiry uses hello@auralis.example, which cannot receive real enquiries. Replace all data before publishing a real business.

## Editing

Content and links: index.html. Tokens and breakpoints: assets/css/style.css. Motion and menu: assets/js/main.js. Art: four local assets in assets/images/. Model names and illustrative specifications for EvoBuds One, StudioBuds Pro and AirBuds Lite are centralized in main.js. System fonts use Segoe UI / Helvetica Neue / sans-serif; appearance varies by operating system.

## Validation

See the release QA for actual browser evidence. Edge and Coc Coc installed browser engines are checked in isolated headless sessions, including reduced motion and explicit opt-in. Everyday browser profiles, Safari and physical devices are not independently verified. The included source supports keyboard focus and a skip link. No external accessibility certification is claimed.

The transitions control is visible whenever JavaScript runs. Your explicit on/off choice is remembered in this browser when local storage is available. Reduced motion defaults to static until you opt in. A demo URL with ?motion=on explicitly enables and remembers transitions; ?motion=off pauses them. HTML references CSS and JS with a release revision so a browser does not reuse an older asset after an update. Very small viewports display a reason for the static view. Enlarged default text uses the static view automatically, but an explicit motion choice can enable the compact animated layout. Wheel, touch and navigation keys interrupt an in-progress scene navigation without blocking normal scrolling.

## Licence

See LICENCE.txt for the established Forge Zone commercial terms. The referenced Sandhill video was inspiration only; no footage or reference brand assets are included.
