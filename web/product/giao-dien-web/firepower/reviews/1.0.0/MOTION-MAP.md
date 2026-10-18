# Motion map

- Hero entry: finite 720ms transform/opacity sequence establishes heading then mouse hierarchy. Default ON under OS reduce and old stored off settings; no storage read.
- Hero and gallery view change: finite 520ms directional slide/fade, cancellation when replaced, five-state wrap in both directions, arrow keys and touch swipe. State/alt/counter updated together. Buttons hidden until JS initializes; no-JS shows static main and gallery views.
- Scroll: IntersectionObserver reveals section content once; finite requestAnimationFrame fallback drives opacity and transform without CSS animations. Observe only unrevealed elements and unobserve after completion. No perpetual RAF.
- Session motion toggle: stops/finishes current animations; reloading restores default ON. Menu, links, native details and all content remain functional.
- Menu: expands inline on mobile, Escape closes/restores trigger, link closes, crossing breakpoint resets state. No modal role.

Test frames before/mid/after, both wraps, rapid clicks, scroll forward/back/resize and actual Edge/Cốc Cốc plus Chromium/Firefox. Missing images preserve navigation/copy/CTA.
