# Motion and interaction map

All motion is finite and starts enabled, including OS reduce; it does not read a saved off state. Explicit Pause motion affects only the current page. CSS and WAAPI availability are not required for the main effects.

| Effect | Trigger | Duration / progress | Cleanup and fallback |
|---|---|---|---|
| Jacket entrance | JS initialization | 650ms, opacity .35→1 and translateY 20→0 | Finite RAF, cancelled by later garment animation or pause; no-JS leaves visible static image |
| Colour selection | Four swatch buttons | 380ms, opacity .45→1, 14px offset and .97→1 scale | Cancel earlier jacket RAF; last selection wins; alt and aria-pressed update immediately |
| Construction/story reveal | Real intersection from scrolling | 460ms, opacity .3→1, 24px offset→0 | Unobserve after first reveal; missing Observer leaves content visible; explicit pause settles all elements |
| Jacket scroll offset | Actual scroll event | 0–700px scroll maps to 0…−20px | One scheduled RAF per event burst, none at idle, clamped; resize repaints; reverse scroll returns to zero |

Native dialogs use browser modality with Close/backdrop/Escape and focus restoration. Explicit Escape handling prevents the search input's native clear action from swallowing the first Escape. Menu Escape returns focus to Menu. Bag and favourites are page-session demo state, not storage or backend. Search filters the one concept item only. No checkout or submission is simulated.

Evidence: interactions.json and browser colour-mid/scroll-mid screenshots. Supplemental four-engine runs use actual installed Edge and Cốc Cốc executables, not renamed Chromium.
