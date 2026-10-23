# Customisation Guide — Lauberhorn Ridge (`lauberhorn-ridge`, v1.0.0)

Adapt **Lauberhorn Ridge** (`index.html`) for your own alpine hiking trail, mountain resort, or outdoor telemetry dashboard.

## Verified Literal Edit Map (`index.html`)

| Literal String | Count | Location & Role |
| :--- | :---: | :--- |
| `Lauberhorn Ridge` | `12` | `<title>`, meta description, `#trailTitle` (`96px`), ARIA labels, modal headings |
| `Mira Holt` | `7` | Meta description, `#userPill`, modal eyebrow, hiker logbook |
| `Hey, Mira!` | `1` | Greeting inside `#searchCard` (`25px`) |
| `Interlaken, Switzerland` | `3` | Meta description, `#locationLabelText`, `LOCATIONS` array |
| `4.7 (198 REVIEWS)` | `1` | First peach chip in `#heroChips` |
| `ALPINE LARCH FORESTS` | `3` | Second peach chip in `#heroChips` and modal copy |
| `SEARCH BY ANYTHING` | `2` | `#trailSearchInput` placeholder and CSS comment |
| `211 Photos` | `2` | `#photoGalleryBtn` chip label and CSS comment |
| `14 km/h` | `5` | Weather `WIND` tile value, CSS comment, modal copy |
| `17:52` | `5` | Weather `SUNSET` tile value, CSS comment, modal copy |
| `6.5 km` | `5` | Trail Info `DISTANCE` value and modal copy |
| `2.5-3 hr` | `2` | Trail Info `DURATION` value |
| `350 m` | `5` | Trail Info `ELEVATION GAIN` value and modal copy |
| `4e84f7cd-8250-48e6-8dfa-746b13b73bfb.jpg` | `2` | `1728×1080` (`16:10`) valley background plate (`#scenePlate` + `#sceneVideo` poster) |
| `48d4c209-86b6-4b1c-b972-4f57e3dafe89.mp4` | `1` | `1280×720` (`10s`) looping drone glide video (`#sceneVideo`) |
| `8097efdf-745f-4a23-8b33-0bed6ee16bc7.jpg` | `2` | Hiker photo card (`.photo-card__img`) and modal preview image |

## 10-Step Customisation Walkthrough

1. **Trail Name & Metadata:** Replace all `12` occurrences of `Lauberhorn Ridge` in `index.html`.
2. **Hiker Profile & Greeting:** Replace `Mira Holt` (`7` occurrences) and `Hey, Mira!` (`1` occurrence).
3. **Scene Plate & Drone Video:** Replace `4e84f7cd-8250-48e6-8dfa-746b13b73bfb.jpg` (`2`) and `48d4c209-86b6-4b1c-b972-4f57e3dafe89.mp4` (`1`). For native `16:10` video, set `.scene-video { left: 0; width: 100%; }`.
4. **Breadcrumb & Locations:** Edit `#breadcrumb` (`Back to Explore  Switzerland / Interlaken / Jungfrau Region /`) and the `LOCATIONS` array.
5. **Rating & Habitat Chips:** Edit `4.7 (198 REVIEWS)` (`1`) and `ALPINE LARCH FORESTS` (`3`) in `#heroChips`.
6. **Topographic Map & Pins:** Edit `#poiRoutePath` (`d` attribute) and reposition `.poi-pin--start` (`#7C6CF2`) and `.poi-pin--summit` (`#F59E0B`).
7. **Photo Card & Gallery Chip:** Replace `8097efdf-745f-4a23-8b33-0bed6ee16bc7.jpg` (`2`) and `211 Photos` (`2`).
8. **Altitude Chart & Tabs:** Update `TAB_CONFIG` (`slopes`, `altitude`, `seasons`, `types`) paths, waypoints, and axis labels (`0 km`, `1,25 km`, `2,800 m`).
9. **Weather Gauge & Tiles:** Change the target degree in `tickTemp` (`19`), bounds (`-3°`, `Sunny`, `. 20°`), `14 km/h` (`5`), and `17:52` (`5`).
10. **Trail Info & Palette Tokens:** Update `6.5 km` (`5`), `2.5-3 hr` (`2`), `350 m` (`5`) in `#trailInfoCard` and `:root` colour variables.

## 12 AI Prompts

1. **Rebrand to Dolomites:** `"Replace all 12 occurrences of Lauberhorn Ridge with Seceda Odle Ridge and update Interlaken, Switzerland to Ortisei, South Tyrol."`
2. **Change Hiker Persona:** `"Replace all 7 occurrences of Mira Holt with Lukas Weber and change Hey, Mira! to Hey, Lukas!."`
3. **Update Trail Stats:** `"Change 6.5 km to 11.4 km, 2.5-3 hr to 4.0-4.5 hr, and 350 m to 680 m across index.html."`
4. **Winter Ski-Touring Mode:** `"Change the weather gauge target from 19° to -4°, bounds to -14° / . 2°, Sunny to Powder Snow, and 14 km/h to 22 km/h."`
5. **Native 16:10 Video:** `"Set .scene-video left: 0 and width: 100% for a native 16:10 MP4 background loop."`
6. **Waypoint Search Suggestions:** `"Filter a 4-item waypoint list when typing in #trailSearchInput and update #poiReadout on selection."`
7. **Custom Altitude Profile:** `"Update TAB_CONFIG.altitude hikeD and descentD for a twin-peak ridge and set axis labels to 0 km, 3,40 km, 3,120 m."`
8. **Live Open-Meteo Weather:** `"Fetch current temperature and wind speed from Open-Meteo on load and update #weatherTempValue and the WIND tile."`
9. **Modal Photo Carousel:** `"Add Previous/Next buttons inside #trailModalBackdrop to cycle through 4 geotagged trail photographs."`
10. **Frostier Glass Surface:** `"Change --card-cream to rgba(248, 245, 239, 0.88) and .glass-card backdrop-filter to blur(18px)."`
11. **Metric / Imperial Toggle:** `"Toggle distance, elevation, temperature, and wind between Metric (km, m, °C, km/h) and Imperial (mi, ft, °F, mph) when clicking #logoTile."`
12. **German UI Translation:** `"Translate UI headings and labels in index.html to German while preserving the 1440×900 coordinate layout."`
