# Apartment Flow 1.0.0 — Lumière Residence

A static glass apartment presentation with a scroll-driven, continuous camera journey.
Read CUSTOMISE.md first: 10 setup steps, 12 complete AI prompts and exact edit locations.

## What is included

Read CUSTOMISE.md for the editing workflow. The package contains index.html,
assets/css/style.css, assets/js/main.js, README.md, CUSTOMISE.md, LICENCE.txt,
THIRD-PARTY-NOTICES.txt and 240 local WebP frames (247 files total).
Extract the complete apartment-flow folder and open index.html. You may instead
serve that folder using any static host. No framework, build, API key, backend,
external script/font, analytics or runtime dependency is required.

## Working behavior

Native scrolling controls four chapters: entrance, living/kitchen, bedroom and
contact. Scrolling back reverses the camera. Navigation jumps to the chapters.
The pause/resume control freezes camera/content and resumes towards the current
scroll position. Pause is temporary; reopening defaults to motion enabled,
including under OS reduced-motion settings. The return button resets the journey.
The information dialog supports Escape and returns focus to its opener.
Inactive panels are inert and hidden from assistive technology. Without JavaScript,
the first frame is a static poster and all four sections remain in document flow.

## Customisation

Edit copy and verified contact links in index.html. Edit the final smoke-glass
reference block in style.css for colours, borders and blur; earlier variables may
be overridden. System fonts are Segoe UI, system-ui, Cambria, Times New Roman and
Georgia; no font binaries are supplied. Update COUNT, chapter thresholds and
poster together when replacing the sequence. See the literal edit map in CUSTOMISE.

## Media and demo limitations

240 frames at 1920x1080 were sampled at 24fps from an AI-generated 10-second Flow
clip upscaled from 720p. Display speed follows scrolling; this is not fixed-time
video playback. Each paint uses one actual source frame; source softness cannot
be restored by extraction. Cover cropping keeps the scene proportional on phones.
Compressed prefetch is about 11.3MB; only a rolling decoded window is retained.
Blur layers may cost performance on lower-powered devices; keep them limited.

Lumière Residence is fictional. Interior images are AI illustrations, not actual
property evidence. Replace demo identity and verified property information before
publishing for a real business. There is no booking, contact submission, checkout
or property database. The dialog openly explains the demo and collects no data.

## Compatibility and testing

Designed for current browsers supporting canvas, ResizeObserver, inert and dialog.
Glass has a solid-background fallback when backdrop-filter is unavailable.
The source uses relative paths and an image-path fallback for file:// (no fetch).
Verified on Windows: Chromium 153.0.8010.12 and Firefox 155.0 at 1440x900,
820x1180, 375x812 and 320x740; Edge 154.0.4258.62 and Coc Coc 152.0.7977.124
for chapter navigation, reverse motion, pause/resume, rapid input and dialog at
1440x900 and 375x812. Chromium/Firefox also passed keyboard, axe, contrast,
zoom 200%, file://, no-JavaScript and offline checks. No Safari or real iPhone
test is claimed. Test your customised website before publishing.

## Licence and provenance

Read LICENCE.txt for the standard Forge Zone commercial usage policy, including
included frames. Retain THIRD-PARTY-NOTICES.txt for the adapted MIT Scroll World
technique. Original video, extraction tools, secrets and internal QA are excluded.
Copyright owner: Văn Triển. Licence permits websites, not template/asset resale.
