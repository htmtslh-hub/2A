# Motion map
Hero copy: load, translateY 24→0, opacity .2→1, 700ms.
Cups: load, translateY 40→0, opacity .2→1, 1100ms.
Section content: IntersectionObserver threshold .15, translateY 30→0, opacity .2→1, 750ms; unobserve after reveal.
Finite RAF is primary animation and CSS/WAAPI-independent fallback. No ongoing loop; pagehide cancels and clears styles. Without JS all contents remain visible. No OS/saved-off suppression; owner policy applies. Anchor smooth scroll is additional, not the only scroll effect.
