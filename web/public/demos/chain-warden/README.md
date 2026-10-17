# Chain Warden — Dark-Fantasy Champion Showcase Template

Start with **[CUSTOMISE.md](./CUSTOMISE.md)** for the complete 10-step setup workflow, exact edit-map table with literal string counts, and 12 copy-ready AI prompts.

## Overview

**Chain Warden** (`chain-warden`, v1.0.0) is a plain HTML, CSS, and JavaScript static website template designed for dark-fantasy game studios, MOBA/RPG character reveals, and interactive skin showcases.

### What works out of the box
- **Hero Champion Stage**: Full-bleed obsidian-and-emerald spectral stage featuring the central character cutout, role attribute rail (`Support`, `Moderate`, `Ranged`, `Bottom`), and angled spotlight preview trigger.
- **Interactive 5-Ability Selector (`P / Q / W / E / R`)**: Clicking any ability icon in the hero or any card in the Tactical Ability Matrix updates the active ability title, damage/shield scaling, cooldown values, and description with a finite `requestAnimationFrame` reveal.
- **Interactive 4-Skin Stage Switcher (`Classic / Dark Star / High Noon / FPX`)**: Switch skins via the four pedestal buttons, Prev/Next stage controls, keyboard Left/Right arrow keys, or horizontal touch swipe.
- **Scroll-Linked Lore Scene & Modals**: Includes a scroll-linked Black Mist resonance progress bar in the `#news` section and accessible `<dialog>` modals for full biography (`Read more`) and spotlight inspection (`Shadow Isles: None Escape`).
- **Session Motion Control**: Animations are enabled by default across all browsers; visitors can pause motion for the current session using the `Pause motion` button.

### What is demo-only
- No live game client installer, account login, matchmaking server, or payment checkout is included.
- The `PLAY NOW` button scrolls to the `#play` press-kit section, which uses a real `mailto:` link (`press@shadowwarden-studio.example`).
- Sample game titles, character names (`Thresh`, `LEAGUE OF LEGENDS`), lore, and stage renders are illustrative demonstration data; replace them with your own game intellectual property before publishing.

## Package contents

```text
chain-warden/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/
│       ├── warden-classic.webp
│       ├── warden-darkstar.webp
│       ├── warden-highnoon.webp
│       └── warden-ui.webp
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
```

## How to open locally

1. Extract `chain-warden.zip` into a folder on your computer.
2. Double-click `index.html` to open via `file://`, or run a local static server (`npx serve .`) for testing.

## Quick customisation pointers

- **Colours & Typography**: Edit `:root` variables at the top of `assets/css/style.css` (`--bg`, `--surface`, `--accent`, `--accent-text`, `--gold`, `--font-display`, `--font-body`).
- **Abilities & Skins Data**: Edit the `ABILITIES` and `SKINS` arrays at the top of `assets/js/main.js` and the default HTML in `index.html`.
- **Stage Artwork**: Replace `assets/img/warden-classic.webp`, `warden-darkstar.webp`, `warden-highnoon.webp` (`838 × 458` WebP) and `warden-ui.webp` (`280 × 200` WebP sprite sheet).

## Tested browser & accessibility scope

- Verified on headless **Chromium** and **Firefox** across `1440×900`, `820×1180`, `375×812`, and `320×740` viewports, plus **Microsoft Edge** and **Cốc Cốc** for interactive motion and scroll behaviour.
- Includes skip link, landmark regions (`header`, `nav`, `main`, `footer`), single `h1`, visible `:focus-visible` outlines, keyboard Escape handling for mobile menu and `<dialog>` modals, 200% zoom reflow, no-JS fallback, and offline fallback font stacks.
- Physical iOS/Android devices and Safari on macOS were not tested in this environment.
