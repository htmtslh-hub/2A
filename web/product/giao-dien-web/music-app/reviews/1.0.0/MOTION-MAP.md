# Motion map

Image-only input: video coverage N/A.

Scroll reveal: lower sections, opacity/translateY from 12px to zero over 420ms, only when entering viewport. Finite RAF fallback, cancel previous frame on new trigger, unobserve after completion. No-JS content visible.

Badge hover: rotation settles over 180ms through CSS transition; decorative only.

Default motion ON per AGENTS.md dated 05/10/2026, including OS reduce and old saved-off values. No persistent motion preference.

W05 approved. Equalizer updates only during actual playback and stops on pause/end/pagehide; no decorative infinite RAF.

Evidence required: middle/end reveal frame, scroll start/middle/end, reverse scroll, resize and mobile, actual Chromium/Firefox and Edge/Cốc Cốc where required. PASS: candidate-checks.json and supplemental-checks.json record four-browser middle/end frames, reverse scroll, responsive and fallback evidence.
