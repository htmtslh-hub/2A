# Watchroom 1.2.0

An immersive, static watch showroom for independent watch brands and studios.

## Open
Extract the ZIP and open index.html. It works through file:// and static HTTP without a build or dependencies.

## Included
Read CUSTOMISE.md for the edit map, 10 steps and 12 complete prompts. The six core files are index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md and LICENCE.txt. Three original AI-generated transparent WebP photographs are included in assets/img/. Nine files are delivered in total. No remote image service is needed. Only system fonts are used; Segoe UI/Helvetica Neue display and Segoe UI body may vary by platform.

## Working interactions
Three-model directional carousel, mouse parallax, interactive detail points, category filters, local text search, device shortlist, native dialog, real mailto enquiry links, reveal and a session-only motion pause. Motion starts enabled each visit, including reduced-motion systems, by the product owner's explicit requirement. Introductory product movement stops after five seconds. The brighter central halo breathes and drifts continuously using CSS animations; Pause motion stops both layers. If CSS animation is unavailable, a finite 4.8-second light pulse runs on open, model changes and resume. No backend, checkout, automatic order submission, inventory or tracking. Storage may be unavailable in private or local-file contexts; the shortlist then works in memory for the session.

## Customise
Use CSS root tokens for page colours and fonts. Replace the matching WebP files in assets/img/ to change watch imagery. Three eager-loaded hero images share one frame; the carousel crossfades and tilts two preloaded images together, then settles the selected image without fetching. Update both the initial HTML and products array when changing model content. All prices, specifications and the Watchroom brand are fictional. Email addresses use the reserved .example domain and must be replaced.

## Testing and release
See the external reviews/1.2.0/QA.md for exact tested engines and remaining checks. A rendered browser screenshot does not certify all browsers. No third-party font files or network fonts are supplied.

## Licence
See LICENCE.txt. Preserve its commercial terms. Its reference to original SVG artwork describes the earlier version. The image source and commercial licensing review are recorded in reviews/1.2.0/QA.md; the commercial terms have not been revised by this upgrade.
