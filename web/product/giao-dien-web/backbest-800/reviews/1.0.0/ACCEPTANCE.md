# Backbest 800 1.0.0 — source gate PASS

Weighted regional visual rubric **97.063**, strictly above 95. Not a pixel-accuracy percentage. Diagnostic full-image pixel match 70.79% within tolerance 16 and MAE 16.78; includes low-resolution reference compression (760×434 upscaled to 1440×822), original generated headphone surface highlights, interactive configurator pills/hotspots and excluded host viewer overlay, not used to set PASS.

- Left architectural spine, navigation and social rail: 97.2; weight 14%.
- Top-right utility controls (search & glowing bag): 97.55; weight 10%.
- Center headphone stage, concentric red rings, orbs and badges: 96.95; weight 38%.
- Right product detail column (brand, title, copy, color, price, CTA): 96.8; weight 28%.
- Far-right slide indicator and directional controls: 97.55; weight 10%.

Fixed axes and detailed reasons in acceptance.json. Whole reference retained at uniform 1440/760 scale (1440×822); only the foreign rounded viewer expand overlay at bottom-right is excluded from assessment. See visual/side-by-side.png, overlay.png, difference.png and REFERENCE-MAP.md. Remaining differences: original generated headphone leather/shell micro-highlights, system Arial glyph metrics and added interactive Sound Preview / finish-fit select controls. No important region or control omitted. Mobile/lower-page/alternate-finish reference N/A.

Animation PASS, scroll PASS, technical source PASS. Four actual browsers: Chromium, Firefox, Edge and Cốc Cốc on Windows. Responsive viewports plus 860/861 mobile-menu breakpoint, OS reduce/savedOff default ON, middle frames, wrap/rapid/keyboard/swipe, Sound Preview sequence/replay/close, menu/focus/Escape, bag/fit validation/remove/email/search, scroll reverse/mobile/resize, zero idle RAF loop, noJS, offline file and 200% equivalent zoom. Zero source-check failures. supplement.json covers 14px minimum labels, viewports, axe, missing-image controls and measured contrast.

Nine-file candidate manifest **569ee3c2d03beee4a6f1432693c62a5fce2356e8b6c3e8cc206fc71c8f6506c1**. Package and official extraction checks follow this gate and must preserve source bytes. W01/W03/W05/W06 exceptions documented in BRIEF.md. No shared standard or storefront file changed. Safari/physical devices/storefront deployment not claimed as tested.
