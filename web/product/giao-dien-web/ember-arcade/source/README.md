# Ember Arcade 1.2.0

A burgundy gaming dashboard template for game communities, catalogue concepts and launcher UI demonstrations. Original sci-fi art, a compact navigation rail, discovery cards, a playtime graphic and a friends rail.

## Start and included files

Read **CUSTOMISE.md** first: it contains the edit map, ten setup steps and twelve complete AI prompts. Extract the entire ZIP, open the `ember-arcade` folder and double-click `index.html`. Keep `assets/` beside the HTML. No installation or build is required.

Six core files (HTML, CSS, JavaScript, README, CUSTOMISE and LICENCE) plus five local WebP artwork files in `assets/img/`. Original PNG art, design references and internal QA are not part of the customer ZIP.

## Working interactions

- Section navigation and accessible mobile menu with Escape, focus return and resize handling.
- Search by title or tags in the two discovery cards; `/` focuses search and Escape clears it.
- Favourites saved on this device under `ember-arcade-favourites`. If storage is blocked, they work for the current visit with a notice. Device-local favourites are not account data.
- Native expandable game notes. Hash links open their notes when JavaScript is available.
- Finite entrance and hover motion. No continuously running animation, background timer or tracking.

## Demo boundaries

All games, characters, profile initials, friends and playtime values are fictional. The sample total is 32.5 hours: Ashfall 18.0, Moonbound 9.5, Rift Runner 5.0. Search covers Moonbound and Ashfall only. The recent session is sample content, not a live download or installation. Friends do not have online accounts or chat. Replace fictional copy and `hello@example.com` before publishing. No real games, backend, authentication, payment, downloads, chat, telemetry or form submission are included.

Without JavaScript, all core content, section links and native notes remain usable; search is disabled and favourite buttons are hidden. There are no network dependencies: typography uses Trebuchet MS, Segoe UI or system sans-serif supplied by the visitor's OS. Appearance can vary slightly by system.

## Editing and licence

Change colours and font stacks in the opening `:root` block in `assets/css/style.css`. Replace artwork at its relative path and update alt text and dimensions. Artwork may be used on your finished websites under LICENCE.txt, not sold as standalone stock or redistributed as a competing template.

The licence permits unlimited personal, commercial and client websites. No game franchise assets are included. The design reference was used for layout and colour, not copied game art.

## Motion and compatibility

Entrances last 280ms and hover transitions finish within 350ms. Motion defaults on at each visit, including OS reduced-motion preferences, per the product brief. Content stays visible when transitions or observers are unavailable.

Target modern browsers and review the supplied QA record for versions actually tested. This README does not claim Safari, Cốc Cốc or device certification. Check the final template locally before publishing your customised version.

The hero uses a separate scenery plate and alpha-transparent character layer. Her hair extends above the rounded card; lower edges remain clipped locally. Keep both rift-background.webp and rift-character.webp when editing the hero.
