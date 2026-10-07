# Watchroom 1.2.1 — concentric depth rings

User request: add multiple circles around the watch to restore visual depth.
Scope: Watchroom stage markup/CSS, finite light fallback, generator, docs,
demo/preview and ZIP. No admin/database/catalog changes. Existing image and
motion exceptions and commercial licensing limitations from 1.2.0 still apply.

Four decorative rings sit behind the watch, with different diameter, opacity,
rim highlights, shadows and 16–28 second transform animations. They inherit the
model lighting colour. Pointer events are disabled and aria-hidden is on their
container. Session Pause stops ring animations. The existing finite 4.8s light
fallback also pulses the ring container if CSS animations are disabled.

check-rings.mjs / rings.json: actual installed Edge and Cốc Cốc, headless Windows,
reduced-motion enabled. PASS four ring count, intermediate transform changes,
Pause stability, fallback pulse, carousel label pairing, no pageerrors and no
horizontal overflow at 1440×900, 820×1180, 375×812 and 320×740. CSS pseudo-element
animations were explicitly disabled in the fallback test. Desktop screenshot
was visually inspected. Earlier broad 1.2.0 tests remain historical evidence;
this scoped test does not recertify Safari, contrast/axe or checkout.

ZIP 476346 bytes, nine files, SHA-256
`cb9b79fadf9845f320f809b0e5c257e3fc2988b8ada7965602dfbc88ef3cc3d2`.
Packaging reads back all source bytes. Public demo uses hosted asset paths;
source/ZIP remains portable. Preview regenerated.
