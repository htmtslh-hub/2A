# Dualplay 1.0.0

A static controller showroom inspired by the supplied three-state reference. Open index.html directly, or serve the complete folder on any static host. No build, framework, API, external fonts or network services are required.

## Included
Three locally stored AI-created WebP controller images, a manual 1.3-second looping carousel, edition thumbnails, touch swipe, details dialog, a session-only demo bag with quantities and removal, collection links, FAQ, hover and finite scroll reveals. See CUSTOMISE.md for the 10-step guide and 12 AI prompts.

## Demo content
Game names and marks belong to their owners. This independent design concept is not affiliated with Sony or the named games. $79.99, 12 hr and 1 ms are illustrative, unverified sample values. There is no checkout, payment, account system, gameplay video player, inventory or order submission. The bag is cleared on reload and never sends data.

## Files
index.html, assets/css/style.css, assets/js/main.js, assets/img/gold-v3.webp, assets/img/jade-v3.webp, assets/img/crimson-v3.webp, README.md, CUSTOMISE.md, LICENCE.txt. Keep relative paths intact.

## Motion and fallback
Carousel runs only on input; no autoplay. Finite requestAnimationFrame transitions remain enabled under OS reduced-motion settings, following the project owner's explicit requirement. Without JavaScript, the initial hero, collection, navigation and FAQ remain available; JavaScript controls are hidden.

## Verification
Tested on Chromium 153.0.8010.12, Firefox 155.0, Edge 155.0.4283.45 and Coc Coc 152.0.7977.124 at 1440, 820, 375 and 320 px. Carousel wrap, rapid input, bag removal and dialogs passed; Chromium/Firefox also received offline, file://, no-JS, axe and contrast checks. See the accompanying product review for evidence and limitations. No Safari or payment-flow certification is claimed. The generated artwork preserves the three reference colourways and camera direction, with original ornamental details. A side-by-side comparison is included in the product review; no measured 95% fidelity claim is made.

## Reference refinement
The current artwork was recreated using the supplied screenshot as an imagegen reference. The promo tile opens a real, finite six-second product motion preview in the details dialog; it is not a game trailer. Close the dialog to cancel it. The angled next-edition image is a CSS projection, not a separate 3D camera view.

## Upcoming products and scene transition
The two right-hand cards show the next and following edition in circular order, never the selected hero. Clicking either jumps directly to it. The 1.3-second circular transition moves all three controller images between the hero and upcoming slots on complementary arcs, with changing scale and perspective. Text fades in sequence, the previous background fades and accent colours interpolate. Rapid input retains the latest destination and finishes the active transition without resetting the visible image. No autoplay.

## Circular movement
Next and Previous rotate the three product positions in opposite directions. The incoming model follows the upper arc and grows into the hero; the outgoing model follows the lower arc and shrinks into its upcoming slot. All motion uses finite GPU transforms and runs only on input. After each move, temporary decorative layers are removed and the normal images become visible again.

## Edition order
1. Genshin Impact (initial hero and first collection item)
2. God of War
3. 007 First Light
The same numbering is used by the manual circular carousel, upcoming cards, collection links and counter.
