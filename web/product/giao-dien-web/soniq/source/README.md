# Soniq

Version 1.0.0. Static wireless headphone storefront by Forge Zone.

Start with CUSTOMISE.md: ten steps, twelve copy-ready prompts and the counted edit map.

Extract the whole ZIP and open index.html. No build, framework, server or account is required. System font Segoe UI with sans-serif fallback. Three original transparent product images are local in assets/img/.

Works: a three-colour directional carousel, automatic browsing every 6500ms, arrows, colour picks, keyboard arrows on the focused hero, horizontal swipe, pointer tilt, pause/resume, mobile navigation, local device bag, quantities and totals, email enquiry and native FAQ disclosures. Motion starts enabled on every visit, including reduced-motion settings; pause only applies to this visit. No JS keeps navigation, all product information and email contact readable. Bag falls back to memory when storage is blocked.

Soniq, all product names, prices and hardware specifications are fictional demonstration content, not verified product claims. There are no real customer reviews, endorsements or JBL assets. Replace hello@soniq.example in HTML and JS before publishing; it is a non-operational example address. Email opens a draft for the visitor to review and send; it does not pay or place an order. No backend, payments, inventory, account, analytics or network dependency is included.

Declared exceptions to WEB-STATIC-1: three original raster images beyond the six standard files, expanded interaction JS and a larger ZIP. The reference image and request to follow the other products authorise these exceptions. Source, demo, preview and ZIP are synchronised for catalog slot t10. Actual QA is in ../reviews/1.0.0/QA.md; Safari and physical devices are not implied by viewport emulation.

Edit palette and system font in :root in assets/css/style.css. Preserve image alpha and the full headset. Update model colour names and prices in HTML together with colours, keys and catalogue in assets/js/main.js. LICENCE.txt contains the commercial policy; owner must confirm rights for the generated imagery before commercial release.


On desktop the hero headset projects above the main showcase edge into the outer background. Adjust .hero__visual top, height and width, plus body top padding in CSS. The main frame stays behind the headset; navigation and controls remain in front. Tablet and mobile return to the inline visual layout. Pointer tilt uses finite RAF and returns to rest on leave or pause. No small decorative frames are used.
