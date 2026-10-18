# AeroSix motion map

Image-only reference. Modest inferred motion preserves initial composition. Owner policy: ON in all browsers, including OS reduce/old saved-off; session-only Pause motion, reload ON. No idle RAF loop.

| Motion | Trigger/timing | Fallback/cleanup |
|---|---|---|
| Bicycle introduction | Initialisation900ms,opacity.15→1,x60→0 | Finite RAF Map entry removed; finish action cancels introduction. Static bike without JS. |
| Finish |720ms directional exit/swap at44%/enter;select/arrows/keyboard/swipe | Dedicated wrapper transform/opacity; actual image changes. Cancels prior frame, wraps both directions, rapid input resolves final selection. No CSS/WAAPI dependency. |
| Design sequence | Action dialog,4200ms,three actual finish images and progress | Explicit animated design sequence, not footage. Finite RAF stops on close,hidden document,pause; replay cancels old frame. |
| Editorial reveal | IntersectionObserver.1,650ms | Once per element,finite,cancelled on pause. NoJS content visible. |
| Engineering image/rule | Real scroll/resize,clamped0–1 | One scheduled RAF per event; reversible x-4%→4%,rule progress; mobile/resize recompute. Pause neutralises offset. |
| Toast | Action,3200ms | Cancels previous timeout; genuine local state feedback only. |

Menu is a compact hamburger at every width, as in reference; Escape returns focus,hidden links leave Tab order,resize closes it. Native modal dialogs/Escape restore opener. Native accordions work without JS. No auto-rotation/looping canvas. Store video separately records this real browser implementation.
