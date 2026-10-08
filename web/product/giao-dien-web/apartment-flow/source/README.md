# Apartment Flow · Lumière Residence glass apartment presentation

Read CUSTOMISE.md before extending this draft. Open index.html directly or serve
this folder with any static HTTP server. No build, framework, external font,
tracking or API is used. All image paths are relative.

The background maps native page scrolling to 240 WebP frames sampled at 24fps.
Scroll down to enter the apartment and scroll up to reverse the camera journey.
The scene spans seven viewport heights with a sticky fullscreen canvas. The return
button moves to the entrance. Playback speed follows scrolling, not a 10-second
timer. Scroll World's exponential rAF damping and request coalescing are adapted
for this image sequence, with a camera speed cap. Each paint displays one actual
source frame, without cross-blending moving edges. The canvas uses device pixel
ratio up to 2 with high-quality resampling to retain clarity on dense displays.
All compressed frames are prefetched with four workers (~11MB); decoded images
remain in a small rolling window. There are no permanent animation loops.
Motion remains
enabled when the OS requests reduced motion, per project rules.
Without JavaScript/canvas, the first frame remains as a static poster.

The source was an AI-generated 10-second Google Flow Omni 1.1 Flash clip, upscaled
from 720p to 1080p by Flow. Extraction does not add source detail. Mobile uses cover
cropping; a horizontal scene cannot remain entirely visible in a portrait viewport.

Four glass panels introduce the apartment, open living/kitchen area, bedroom and
consultation. Navigation and chapter links scrub to the corresponding scene. The
latest reference style is translucent smoke glass with white type, floating
thumbnail cards, capsule buttons and a transparent header; the main hero has no box.
Thumbnails come from the existing apartment frames, not unrelated stock media.
The background scrim changes display contrast but does not edit the source images.
The
current panel follows the eased camera position; inactive panels are inert and
hidden from assistive technology. A native dialog supports Escape and returns focus.
Without JS all four sections remain in normal document flow with a static poster.

Lumière Residence is a fictional demo name. The apartment visuals are AI-generated;
no floor area, price, address, ownership or real contact channel is asserted.
The consultation dialog explains this and does not collect or submit personal data.
Replace this demo disclosure and connect confirmed contact information before release.

This is a working presentation, not an approved commercial release.
Legal distribution terms, full customer prompts, store integration and release QA
remain pending. No publishing or store catalog changes are included.
Actual test evidence and limitations live in ../reviews/0.1.0/QA.md.

Technique reference: https://github.com/oso95/scroll-world/blob/main/skills/scroll-world/references/scrub-engine.js
This is an adaptation for frames, not the original video scrub engine. No global
skill installation, paid generation or new mobile video chain was performed.
