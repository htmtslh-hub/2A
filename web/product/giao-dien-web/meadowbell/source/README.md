# Meadowbell — Hollyoak's Plucky Sprout Squad Hero (`v1.0.0`)

**Meadowbell** is a single-file landing hero (`index.html`) for the animated kids' farming series *"Hollyoak's Plucky Sprout Squad"* from fictional studio **Meadowbell**, built with plain HTML5, CSS3 custom properties (`--u = calc(100vw / 1440)`), and vanilla JavaScript with zero build step.

## Highlights
- **1440×1280 (9:8) Frame Architecture**: Scales proportionally with viewport width (`--u: calc(100vw / 1440)`, `height: calc(1280 * var(--u))`), placing the hand-painted hillside scene, centered headline, pills, and boy + beagle above the fold on `1440×900` screens with the `CHAPTERS` row right below.
- **Exact Plate + Square Loop Video Alignment**: Layers the `960×960` mirror-padded video (`width: 100%`, `height: 112.5%`, `top: -6.25%`) directly over the `2160×1920` (9:8) hillside plate so the rippling grass, nodding daisies, fluttering hair/shirt, beagle ears, and drifting cumulus clouds align seamlessly with the still.
- **Grandstander 900 & Inter 400/500 Typography**: Rounded white `Grandstander 900` display type for the `Meadowbell` logo, `HOLLYOAK'S` kicker, `PLUCKY / SPROUT SQUAD` headline, and `CHAPTERS` heading, paired with `Inter` 400/500 and `#5b875c` button green.
- **Web Animations Entrance & Interactive Chapter / Join Modals**: One-shot Web Animations timeline, hover card lift (`-8u` + `1.05` art zoom), pill lift (`-2u`), interactive 3-chapter preview modal (`#chapterModal`), and Sprout Squad dispatch modal (`#joinModal`).
- **Phones (`<= 820px`)**: Compact top bar (`Meadowbell` + `Join us`), stacked centered copy (`51px` headline), swipeable chapter card row, and a `9:8` scene stage shifted (`left: 18%; transform: translateX(-18%)`) so the boy and dog stay in view.

## Package Contents
- `index.html`: Self-contained HTML, CSS, and JavaScript.
- `CUSTOMISE.md`: 10-step customisation & deployment guide + 12 AI prompts.
- `README.md`: Product overview and quick start.
- `LICENCE.txt`: Commercial use licence.
