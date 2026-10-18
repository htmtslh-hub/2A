# Motion map — Motora 1.0.0

Image-only input: motion inferred conservatively. JavaScript requestAnimationFrame timelines operate independently of CSS animation / Web Animations support. Default ON including OS reduce and stale saved-off values, as required by project rules.

| Effect | Trigger / timing | Ownership, cleanup and fallback |
|---|---|---|
| Vehicle introduction | Initialisation, 850ms, opacity .25→1 and x45→0 | .vehicle-motion wrapper only; finite Map entry removed on completion; colour action cancels intro. Static full car without JS. |
| Finish transition | Swatch, arrow, keyboard or select; 680ms; directional exit/enter, change at42% | Cancels prior RAF; wrapper transform/opacity separate from image filter; forward/backward wrap; no idle loop. Pause resolves latest selected finish immediately. |
| Category note | Category click, 320ms fade .4→1 | Cancels previous note frame. Actual text/pressed state updated immediately. |
| Editorial reveal | IntersectionObserver threshold .12, 620ms | Each section observed once; finite easing then cleanup. Static visible without JS; session pause forces visible. |
| Cabin offset | Scroll/resize event, clamped 0–1 scene progress; y -3%→-12% | One scheduled frame per event, reverse and resize recompute; no self-scheduling loop. Pause neutralises offset to -3%. |
| Feedback | Save/category action, 3.2s message | Replaces prior timeout; no fake network delivery. |

No automatic carousel or endless ambient motion. Session-only Pause motion is a real user control, reload starts ON. Native dialog traps focus; Escape closes and restores opener. Menu closes on link, Escape or resize. Neither colour filters nor wheel preference claim a live 3D or factory configurator.
