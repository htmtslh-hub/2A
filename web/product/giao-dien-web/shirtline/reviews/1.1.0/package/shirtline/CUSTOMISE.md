# Customise Shirtline

1. Replace the five WebP files in `assets/img/` with same-size transparent product images.
2. Update the names, prices and descriptions in `index.html` and the `looks` array in `assets/js/main.js`.
3. Adjust per-product palettes in `assets/css/theme.css` and `assets/css/controls.css`. The page surround follows the selected product theme.
4. Replace `hello@example.com` in the order link and navigation.
5. Open `index.html` in a browser and test the carousel, add buttons, bag drawer, keyboard focus and mobile layout.

Carousel settings: `ROTATION_MS = 1600` in `assets/js/main.js` controls one rotation step; `AUTO_MS = 5600` is the resting time before automatic advance. The `paint()` function maps five images onto one oval using sine/cosine, with a smaller size at the back. Keep all image nodes in place and animate the shared position; do not replace the central image or add a fade transition. Orbit layout and control spacing are in `assets/css/motion.css`.

Test last-to-first and first-to-last, rapid arrow clicks, the next-product preview, keyboard arrows and the pause button after changing motion. Keep names/prices in the `looks` array matched to collection cards. Restore a backup if any edit breaks those checks.
