# Music App

Read **CUSTOMISE.md** for the editing map, ten setup steps and twelve complete AI prompts.

A static indie music interface in plain HTML, CSS and JavaScript. Open `index.html` directly or serve the complete folder on any static host. No build or installation is needed. Keep `assets` beside `index.html`.

Included: playlist, album and artist cards; current-track player; recently played library; release alert; section navigation; local search, favourites, follow, shuffle, repeat, seek and volume controls. Favourites and following last only in this page session. No account, streaming API, backend, tracking or purchase system is included.

All artist names, titles and list durations are fictional interface content. Every playback selection previews the same original 189-second synthesized audio sketch in `assets/audio/demo.wav`. The displayed track names do not represent separate recordings. Replace the audio and track data before presenting a real music catalogue.

Five images were newly generated with the built-in Imagegen tool. The supplied reference was used to analyse composition, not as a bitmap website. Their use in personal and client websites is permitted; standalone resale or redistribution is prohibited. See LICENCE.txt.

Files: index.html, assets/css/style.css, assets/js/main.js, five assets/img/*.webp files, assets/audio/demo.wav, this README, CUSTOMISE.md and LICENCE.txt. There are no network font dependencies; the system sans-serif stack approximates the supplied reference.

Change colour tokens at the beginning of style.css. Edit HTML copy in index.html and playback titles in the `tracks` array in main.js. Preserve image dimensions and descriptive alt text. Replace local audio with your licensed recording and update its path.

Keyboard: Tab through controls, Enter/Space activate buttons, arrow keys adjust range inputs, Escape closes the settings dialog. A visible skip link leads to the main content. Without JavaScript, content and section links remain visible and the native audio player is shown. Scroll reveal uses finite requestAnimationFrame; motion defaults on according to this product brief.

Browser evidence and outstanding checks are in the accompanying review, not in this customer source folder. Version 1.0.0 has been tested in Chromium, Firefox, Microsoft Edge and Cốc Cốc. Safari and physical devices have not been tested.
