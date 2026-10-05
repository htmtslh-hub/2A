# Mellow Coffee

Version 2.0.3. Static café and bakery storefront template by Forge Zone.

Start with CUSTOMISE.md: ten steps, twelve copy-ready prompts and a counted edit map.

Extract the complete ZIP and open index.html. No build, framework, account or server is required. All styles, scripts and three original generated WebP product cutouts are included locally. System font Segoe UI with sans-serif fallback; no network font dependency.

Works: three-scene directional hero, automatic browsing, numbered/arrow controls, keyboard arrows on the hero, touch swipe, pointer tilt, pause/resume, mobile navigation, menu filters, local device bag, quantities, total, and mailto enquiry. Default motion is always enabled; pause is for this visit only. Bag storage falls back to memory if localStorage is unavailable. No JS shows all menu items and contact/navigation links.

Not included: payment, inventory, online order submission, backend, hosting or deployment. Mellow Coffee, menu copy and USD prices are fictional demonstration content. hello@mellow.example is deliberately non-operational. Replace it in HTML and JS before publishing. An email enquiry opens a configured email application and does not automatically place or send an order.

Declared exceptions to WEB-STATIC-1: three local raster images in addition to six required files, expanded interaction/motion JS and a larger ZIP. Requested reference and replacement brief authorise the visual/interaction scope. No third-party JS, hotlink, base64, tracking or secret. Commercial policy remains in LICENCE.txt; the inherited licence has historical Astra wording and must be reviewed by the owner before commercial release of the replacement imagery.

Actual browser results are recorded in ../reviews/2.0.3/QA.md. Do not infer Safari or physical mobile testing from desktop emulation.

Hover motion: move the mouse over the hero to shift and rotate the product, beans and seal at different depths. Menu product images and the story pastry lift, tilt and gently zoom with the pointer; leaving returns them smoothly to rest. Pause motion resets these effects. Touch retains swipe without pointer tilt. Tune depth, turn and zoom in hoverItem() calls in assets/js/main.js. Finite RAF easing works without CSS transitions.

Antigravity-inspired hover: a dense field of small coloured dashes repels and curls around the mouse, then springs back to its resting positions. The palette combines amber, cream, blue, violet and soft coral. A subtle aura follows the pointer. The finite render loop stops after 1500ms without input; pause and hidden tabs reset the field. Touch does not trigger particles. Decorative layers are local and pointer-transparent. Tune particleColours, the 34px spacing, 230px influence radius and spring/damping in assets/js/main.js.
