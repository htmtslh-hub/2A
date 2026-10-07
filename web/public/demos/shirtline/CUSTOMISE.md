# Customise Shirtline

1. Replace the five WebP files in `assets/img/` with same-size transparent product images.
2. Update the names, prices and descriptions in `index.html` and the `looks` array in `assets/js/main.js`.
3. Adjust per-product palettes in `assets/css/theme.css` and `assets/css/controls.css`. The page surround follows the selected product theme.
4. Replace `hello@example.com` in the order link and navigation.
5. Open `index.html` in a browser and test the carousel, add buttons, bag drawer, keyboard focus and mobile layout.

Carousel settings: `ROTATION_MS = 1600` in `assets/js/main.js` controls one rotation step; `AUTO_MS = 5600` is the resting time before automatic advance. The `paint()` function maps five images onto one oval using sine/cosine, with a smaller size at the back. Keep all image nodes in place and animate the shared position; do not replace the central image or add a fade transition. Orbit layout and control spacing are in `assets/css/motion.css`.

Test last-to-first and first-to-last, rapid arrow clicks, the next-product preview, keyboard arrows and the pause button after changing motion. Keep names/prices in the `looks` array matched to collection cards. Restore a backup if any edit breaks those checks.

Rear-shirt size: `scale = .12 + .88 * Math.pow(depth, 5)` in `paint()` keeps the front at full size and makes the side/rear shirts much smaller. The minimum rear scale is 12%; increasing the exponent reduces side shirts without shrinking the selected shirt.

Product palettes are overridden by `html:root[data-look]` in `assets/css/theme.css`. The glow is deliberately subtle to preserve clear product colours. Rear-shirt opacity stays between 78% and 100% in `paint()`; size and placement communicate depth instead of a heavy grey fade.

The showroom uses light product-tinted backgrounds and dark text. Each shirt has a separate elliptical floor shadow (`.shirt-ground-shadow` in `motion.css`) that follows its orbit position and size in `paint()`. Adjust `.43` there to move the shadow below the hem; adjust the gradient/blur in CSS for softness. Keep it separate from the image's contour drop-shadow.
