# Customise the glass apartment presentation

1. Open index.html; keep the assets folder alongside it.
2. Back up the whole product folder before extending it.
3. Four `.story-panel` sections inside `#content-layer` hold the apartment overview,
   living/kitchen, bedroom and contact content. Edit their headings/body in index.html.
   The demo brand is Lumière Residence; replace brand name, title, metadata and dialog
   consistently. Do not invent property prices, size, address or ownership.
4. Add component styles to assets/css/style.css. Use the existing `.apartment`
   root to scope styles. Change `--content-width` (one definition) for content width.
5. The sequence settings are in assets/js/main.js: `COUNT = 240`, `RADIUS = 10`
   (one definition each). Change `--scene-height: 700vh` in CSS to adjust scroll
   travel length. Keep filenames consecutive, starting
   at frame-0001.webp; change COUNT if the sequence length changes.
   `DAMPING_MS = 140` controls easing delay; `MAX_FRAMES_PER_SECOND = 96` caps
   camera speed during large scroll jumps (one definition each).
6. Change the cover positioning in draw() and poster object-position together if
   a different mobile crop is needed. Do not stretch the 16:9 source.
7. Keep the return-to-entrance button accessible if text or navigation is added.
   Add contrast protection under future text and check it across all scene frames.
8. Keep native scrolling in both directions, the no-JS poster and return button working.
9. Test 1440×900, 820×1180, 375×812 and 320×740 before publishing.
10. Publish only after the remaining components and release checks are complete.

Glass appearance: `--glass`, `--ink`, `--ink-soft`, `--line` in style.css. Keep
enough surface opacity to preserve text contrast over the darkest/lightest frames.
The latest reference direction uses smoke-tinted translucent glass, thin bright
edges, white text and white capsule buttons. The hero is unboxed; its small
feature card and the right-hand card use stills from the same apartment sequence.
The header is transparent. A local background scrim supports white text without
blurring or blending the camera frames. Reference overrides are grouped at the
end of style.css; update that block when tuning this version.
Blur is limited to the header, current story panel and journey bar; avoid adding
many full-screen filters. Display text uses local Cambria/Times New Roman, the
wordmark uses Georgia, and body text uses Segoe UI/system sans-serif; no CDN.

Navigation uses the four `.chapter-anchor` elements with `data-progress` values
0 / .30 / .64 / 1. `story()` switches panels at .22 / .58 / .90. Keep these values
aligned if you change scene timing; source remains the same 240-frame sequence.

Contact action currently opens an honest demo-information dialog. Supply the
actual owner-approved contact information before replacing it with mailto/tel
or a real booking URL. No submitted form or appointment system is present.

Literal edit map checked against index.html on 08/10/2026:

| Find | Count | Meaning |
|---|---:|---|
| `Lumière Residence` | 4 | Page title, Open Graph title, home-link label, dialog brand |
| `data-scene=` | 4 | The four narrative sections |
| `data-progress=` | 4 | Chapter destinations |
| `data-open-contact` | 1 | Consultation button |

Also replace the lowercase wordmark `lumière` and uppercase `RESIDENCE` separately.

Frame manifest and provenance are in ../reviews/0.1.0/frames.json. The 240 images
cover timestamps 0 through 239/24 seconds. Scroll-driven display speed varies;
one actual source frame is shown per paint, with no adjacent-frame blending.
Do not rename or remove individual images. This draft intentionally contains more
than six files and exceeds the old 20KB commercial package profile.
