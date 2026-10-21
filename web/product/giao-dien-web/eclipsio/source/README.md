# Eclipsio — Personal-Website Builder Hero (`v1.0.0`)

**Eclipsio** (*"Launch a Personal Brand That Outshines Every Résumé"*) is a single-file, one-screen landing hero (`index.html`) for a personal-website builder, crafted with plain HTML5, CSS3 custom properties (`--u = min(100vw/1448, 100dvh/1086)`), and vanilla JavaScript with zero build step.

## Highlights
- **1448×1086 Reference Scaling (`--u`) & One-Screen Stack**: Authored in a `1448×1086` reference frame (`nav 124.5u` · `hero copy` · `logo strip` · `eclipse zone`) so the entire composition fits cleanly inside a single viewport (`100dvh`) with zero horizontal or vertical scroll.
- **Total Solar Eclipse Plate + Mirror-Padded 16:9 Video Alignment**: Anchors the `1448×1086` eclipse plate (`b4b7e033...webp`) to the bottom center at reference height (`1086u`) and layers the `1280×720` mirror-padded video (`aspect-ratio: 1930 / 1086`, `1448 + 2×241 = 1930`) at the exact same height and center, fading in smoothly once playing.
- **Warm-Glass Badge & Solar-Orange CTA System**: Features a `43.9u` warm-glass badge with a lower-left `#ee7f20` lit rim and glowing `#f7c69b` peach dot, a two-line `Inter 750` headline (`78.8u / 81u`), `#bcbcbe` subline (`22.6u / 36u`, `.031em` tracking), a filled orange `Start Creating` pill (`#f28a2a → #ec7a1c`), and a gradient-bordered `View Samples` pill.
- **Frosted-Glass Logo Strip (`892×56u`)**: Infinite `46s` marquee of five fictional partner marks (`Layers`, `Circooles`, `Quotient`, `Hourglass`, `Catalog`) with `34u` grey SVG icons and `Poppins 600` wordmarks, soft black edge fades, and pause-on-hover.
- **Phones (`<= 820px`)**: Collapses navigation links into a round menu button (`#menuBtn`) with an accessible dropdown (`#mobileDropdown`), wraps the headline to four lines, places the two CTA buttons side-by-side at full width, and turns the logo strip into a full-width soft-edged marquee.

## Package Contents
- `index.html`: Self-contained HTML, CSS, and JavaScript.
- `CUSTOMISE.md`: 10-step customisation & deployment guide + 12 AI prompts.
- `README.md`: Product overview and quick start.
- `LICENCE.txt`: Commercial use licence.
