# Customisation Guide — murmur ("Daily Murmur Podcast")

This template is delivered as a single self-contained file (`index.html`) with plain HTML, CSS, and vanilla JavaScript. No bundler or build step is required.

---

## 10-Step Customisation Checklist

1. **Update Page Metadata (`<head>`):**
   Edit `<title>` and `<meta name="description">` in `index.html` (lines 7–8) to match your podcast show name and daily format.
2. **Adjust Color Tokens (`:root`):**
   Modify `--lavender` (`#dfe3fb`), `--label` (`#b9c4ea`), `--date` (`#7583bd`), `--navy-card` (`rgba(8, 21, 62, .84)`), `--card-border` (`rgba(132, 146, 255, .38)`), and the waveform stops (`#5560FF`, `#86A2FF`, `#A083FF`).
3. **Swap Typography (`<head>` & `:root`):**
   Update the Google Fonts stylesheet for `Newsreader` (`500`), `Inter` (`400/500`), and `IBM Plex Mono` (`400`), or point `--font-serif`, `--font-sans`, and `--font-mono` to self-hosted `.woff2` files.
4. **Replace Rainy-Window Background Plate & Mirror-Padded Video (`.scene`):**
   In `<div class="scene">`, update the `src` of `.scene__plate` (`16:10` image) and `.scene__video` (`16:9` mirror-padded video at `width: 111.1111%; left: -5.5556%`). If your replacement video is already `16:10`, set `.scene__video { left: 0; width: 100%; object-fit: cover; }`.
5. **Tune Screen-Blended Lighting Layers (`.scene__bloom` & `.scene__sweep`):**
   Adjust the radial-gradient positions and colors on `.scene__bloom` (`5.2s` breathing between `0.35` and `1.0`) and the diagonal gradient band on `.scene__sweep` (`7s` sweep).
6. **Edit Wordmark, Subtitle & Episode Label:**
   Update `#wordmark` (`"murmur"`), `#subtitle` (`"Daily Murmur Podcast"`), and `#episodeLabel` (`"LISTEN TO THE LATEST EPISODE"`).
7. **Update Featured Episode Card (`#playerCard`):**
   Change the cover image `#cardCoverImg` (`158×156`), `#cardTitle` (`"Why Cities Are Planting Forests / on Rooftops"`), and `#cardDate` (`"Apr 25 · Daily Murmur Podcast"`).
8. **Customise the 62-Bar Waveform (`#waveform`):**
   In the inline `<script>`, edit `BAR_COUNT` (`62`), `barColor(norm)` (`#5560FF → #86A2FF → #A083FF`), or `barHeightPercent(i)` (burst at `25%`, bumps at `33%` and `68%`).
9. **Edit the About Block & Generic Platform Icons (`#aboutBlock` & `#platformGroup`):**
   Update the four mono lines inside `#aboutLines` and the four generic SVG glyphs inside `#platformIcons`.
10. **Connect Real Episode Audio & RSS Feed (`#platformModal` & `togglePlayback`):**
    Replace the synthesized Web Audio chord preview in `togglePlayback()` with an `<audio src="episode.mp3">` element, and set `#rssUrl` to your live podcast RSS URL.

---

## 12 AI Prompts for Rapid Customisation

1. **Replace Show Identity & Tagline:**
   > "In `index.html`, change the podcast wordmark `#wordmark` from `murmur` to `nocturne`, update `#subtitle` to `Nightly Urban Field Notes`, and update the 4 mono lines in `#aboutLines` while keeping the exact 1440×900 frame coordinates."
2. **Connect Real MP3 Audio Playback:**
   > "In `index.html`, add an `<audio id="episodeAudio" src="/assets/episodes/ep-142.mp3" preload="metadata"></audio>` element and wire `#playBtn` and `#waveform` so clicking seeks or plays/pauses the real MP3 file."
3. **Swap to Self-Hosted WOFF2 Fonts:**
   > "Replace the Google Fonts `<link>` in `index.html` with `@font-face` declarations for local `Newsreader-Medium.woff2`, `Inter-Regular.woff2`, `Inter-Medium.woff2`, and `IBMPlexMono-Regular.woff2` in `./fonts/`."
4. **Change Colour Theme to Warm Amber Dusk:**
   > "Update `:root` and `barColor()` in `index.html` from periwinkle/violet (`#5560FF → #86A2FF → #A083FF`) to warm amber/terracotta (`#ff7b39 → #ffa652 → #ffd285`) and adjust `--navy-card` to deep espresso glass."
5. **Load Waveform Peak Data from JSON:**
   > "Modify the waveform builder in `index.html` to accept an array of 62 normalized peak values (`0.15` to `1.0`) from a `data-peaks` attribute on `#waveform`."
6. **Add Episode Duration & Elapsed Time Counter:**
   > "Add a live elapsed/duration timestamp (`04:58 / 20:12`) to `#cardDate` in `index.html` that increments while the episode is playing."
7. **Expand Episode Archive Drawer:**
   > "Extend `EPISODES` in `index.html` to 6 weekday episodes with individual cover art URLs, durations, and show-note summaries inside `#platformModal`."
8. **Add Keyboard Shortcut (`Space` to Play/Pause, `M` to Mute):**
   > "Add global keyboard shortcuts in `index.html` so pressing `Space` (when not focused on a button) toggles episode playback and `ArrowLeft`/`ArrowRight` scrubs the waveform by 5%."
9. **Add Chapter Markers to the 62-Bar Waveform:**
   > "Add 4 subtle tooltip markers above bars 1, 16, 34, and 48 of `#waveform` in `index.html` representing the four daily stories mentioned in the About text."
10. **Localise into Vietnamese or Japanese:**
    > "Translate the subtitle, episode label, card title, date line, 4-line About text, and platform label in `index.html` into Vietnamese while preserving the 1440×900 coordinates."
11. **Adjust Screen-Blended Rain Window Lighting:**
    > "Retune `.scene__bloom` and `.scene__sweep` in `index.html` for a golden-hour thunderstorm aesthetic with warm gold and cyan bokeh glows."
12. **Add Newsletter / Morning Dispatch Form to Modal:**
    > "Add a compact email input field inside `#platformModal` in `index.html` so listeners can subscribe to the weekday morning companion notes."
