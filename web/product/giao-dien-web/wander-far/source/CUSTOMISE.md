# Customisation Guide — Wander Far ("Wander far. Rest easy.")

This template is delivered as a single self-contained file (`index.html`) with plain HTML, CSS, and vanilla JavaScript. No bundler or build step is required.

---

## 10-Step Customisation Checklist

1. **Update Page Metadata (`<head>`):**
   Edit `<title>` and `<meta name="description">` in `index.html` (lines 7–8) for your travel brand or boutique lodge collection.
2. **Adjust Color Tokens (`:root`):**
   Modify `--bg` (`#FEFEFE`), `--ink` (`#0B0E0C`), `--text` (`#222223`), `--label` (`#111313`), `--muted` (`#6E7070`), `--lede` (`#727274`), `--hairline` (`#E6E6E7`), `--navy-btn` (`#00286E`), and `--navy-accent` (`#0A2A72`).
3. **Swap Typography (`<head>` & `:root`):**
   Update the `Inter` (`opsz 14..32`, weights `400–700`) and `IBM Plex Mono` font links or point `--font-display`, `--font-sans`, and `--font-mono` to local `.woff2` files.
4. **Edit Header Row (`#heroHeadline` & `#heroLede`):**
   Replace `"Wander far. / Rest easy."` and the two-line right-aligned grey lede inside `.header-row`.
5. **Customise Booking Tabs (`#tabsRow`):**
   Edit the tab labels (`Stays`, `Flights`, `Experiences`), thin-line SVG icons, and `TAB_META` descriptions in `index.html`.
6. **Update Search Bar Defaults (`#searchBar`):**
   Change the default values in `#valueWhere` (`Molde`), `#valueDates` (`Jun 18 – Jun 24`), and `#valueTravelers` (`3 travelers`).
7. **Replace Fjord Still Image & Looping Video (`#photoPanel`):**
   Update the `src` of `#fjordImage` (`16:9` still) and `#fjordVideo` (`1280×720` 5s looping MP4).
8. **Adjust Mobile Crop Focal Point (`@media (max-width: 820px)`):**
   Tune `.photo-panel__img, .photo-panel__video { object-position: 74% center; }` so the key subject of your landscape stays framed on narrow screens.
9. **Edit Location Chip (`#locationChip`):**
   Update `"Geirangerfjord, Norge"` and `"62.10° N"` in the bottom-left chip of `#photoPanel`.
10. **Connect Live Search Endpoint (`#searchModal` & `applySearchBtn`):**
    Wire `applySearchBtn` or `#searchSubmitBtn` to redirect to your booking engine with `?where=...&dates=...&travelers=...` query parameters.

---

## 12 AI Prompts for Rapid Customisation

1. **Retheme for Alpine Ski Chalets:**
   > "In `index.html`, change the headline to `Climb high. / Sleep warm.`, update the default search fields to `Zermatt`, `Dec 14 – Dec 21`, and `4 travelers`, and change the location chip to `Matterhorn Tal, Schweiz` · `46.02° N`."
2. **Swap Fjord Navy Accent to Deep Forest Pine:**
   > "Update `--navy-btn` and `--navy-accent` in `:root` of `index.html` from `#00286E` / `#0A2A72` to deep Nordic pine `#123C2B` / `#184D38` across the search button, field icons, and active-tab underline."
3. **Connect Search Button to Live Booking URL:**
   > "Modify `#searchSubmitBtn` in `index.html` so clicking it builds a URL `https://booking.example.com/search?tab=...&where=...&dates=...&travelers=...` from the current state and navigates to it."
4. **Swap to Self-Hosted WOFF2 `@font-face` Rules:**
   > "Replace the Google Fonts `<link>` in `index.html` with `@font-face` blocks pointing to `./fonts/InterDisplay-Bold.woff2`, `./fonts/Inter-Regular.woff2`, `./fonts/Inter-Medium.woff2`, `./fonts/Inter-SemiBold.woff2`, and `./fonts/IBMPlexMono-Regular.woff2`."
5. **Add Tab-Specific Search Fields:**
   > "In `index.html`, update the tab click handler so switching to `Flights` changes `#labelWhere` to `From / To` (`Oslo → Molde`) and `#labelTravelers` to `Passengers` (`3 passengers`), and switching to `Experiences` changes `#labelWhere` to `Region` (`Geirangerfjord`)."
6. **Add Interactive Date Range Picker in Modal:**
   > "Replace `#selectDates` inside `#searchModal` in `index.html` with two `<input type="date">` fields for Check-in and Check-out that format into `Jun 18 – Jun 24` when applied."
7. **Add Guest Counter Stepper (`+` / `−`):**
   > "Replace `#selectTravelers` in `#searchModal` with interactive `+` and `−` stepper buttons for Adults and Children, updating `#valueTravelers` automatically."
8. **Add Destination Switcher Chips on the Photo Panel:**
   > "Add three subtle bottom-right chips on `#photoPanel` in `index.html` allowing visitors to switch between Geirangerfjord (`62.10° N`), Reinebringen (`67.93° N`), and Aurlandsfjord (`60.90° N`)."
9. **Localise into Norwegian or Vietnamese:**
   > "Translate the headline, two-line lede, tab labels, search field labels/values, and modal copy in `index.html` into Vietnamese while keeping the exact 1446×1088 `--u` layout."
10. **Add Currency & Unit Toggle (`NOK` / `USD` / `EUR`):**
    > "Add a compact currency toggle inside `#searchModal` in `index.html` that converts the cabin nightly rates between USD (`$290`), EUR (`€270`), and NOK (`3,150 kr`)."
11. **Add Keyboard Navigation Between Tabs (`ArrowLeft` / `ArrowRight`):**
    > "Enhance `#tabsRow` in `index.html` with WAI-ARIA tablist keyboard navigation so pressing `ArrowLeft` and `ArrowRight` moves focus and activates the adjacent booking tab."
12. **Export Static Dark-Mode Variant:**
    > "Create a blue-hour dark mode toggle in `:root` of `index.html` using `#080D16` background, `#F4F6FA` headline ink, `#1C2638` hairlines, and `#3B76F6` accent."
