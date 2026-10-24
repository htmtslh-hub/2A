# Customisation Guide — Aetheris Voyage (`aetheris-voyage`, v1.0.0)

Adapt **Aetheris Voyage** (`index.html`) for your own aerospace venture, deep-space tourism charter, or AI-powered 3D optical production studio.

## Verified Literal Edit Map (`index.html`)

| Literal String | Count | Location & Role |
| :--- | :---: | :--- |
| `Aetheris Voyage` | `4` | `<title>`, OpenGraph title, `#brandLogo` ARIA label, and footer copyright |
| `Maiden Crewed Voyage to Mars Arrives 2026` | `2` | Meta description and `#heroBadge` announcement banner |
| `Start Your Voyage` | `1` | Primary `.liquid-glass-strong` hero CTA button (`#startVoyageBtn`) |
| `Claim a Spot` | `2` | Desktop navbar CTA (`#navClaimBtn`) and mobile drawer CTA (`#mobileClaimBtn`) |
| `View Liftoff` | `1` | Secondary hero link (`#viewLiftoffLink`) |
| `34.5 Min` | `1` | First hero telemetry stat card value (`Average Videos Watch Time`) |
| `2.8B+` | `1` | Second hero telemetry stat card value (`Users Across the Globe`) |
| `AI Scenery` | `3` | First capability card comment, `<h3>` heading, and modal specs |
| `Batch Production` | `3` | Second capability card comment, `<h3>` heading, and modal specs |
| `Smart Lighting` | `2` | Third capability card comment and `<h3>` heading |
| `Mars Chryse Planitia` | `4` | Active destination tab, `#worldTitle`, `#sectorSelect`, and `WORLDS.mars` |
| `Lunar Shackleton` | `3` | Second destination tab, `#sectorSelect`, and `WORLDS.luna` |
| `Europa Clipper Relay` | `2` | Third destination tab and `WORLDS.europa` |
| `d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4` | `1` | Section 1 (`#heroVideo`) rAF crossfading background video (`120%` top-aligned) |
| `d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4` | `1` | Section 2 (`#capVideo`) rAF crossfading capabilities background video |
| `flightdeck@aetheris-voyage.example` | `4` | Footer and modal contact links |

## 10-Step Customisation Walkthrough

1. **Brand Name & Metadata:** Replace all `4` occurrences of `Aetheris Voyage` and update `<meta name="description">` in `index.html`.
2. **Hero Announcement Badge:** Replace `Maiden Crewed Voyage to Mars Arrives 2026` (`2` occurrences) and the `.hero-badge__chip` (`New`) label.
3. **Word-by-Word Blur Headline:** Edit the `7` `.blur-word` spans inside `#heroHeadline` (`Venture Past Our Sky Across the Universe`) and adjust `animation-delay` in `0.08s` increments.
4. **Hero Background Video:** Replace `d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4` (`1` occurrence) on `#heroVideo`. Adjust `.hero-video` `width: 120%` / `height: 120%` if using a standard `16:9` crop.
5. **Hero CTAs & Links:** Update `Start Your Voyage` (`1`), `View Liftoff` (`1`), and `Claim a Spot` (`2`).
6. **Hero Telemetry Cards & Partners:** Update `34.5 Min` (`1`), `2.8B+` (`1`), and the `5` `.partners-list` items (`Aeon`, `Vela`, `Apex`, `Orbit`, `Zeno`).
7. **Capabilities Video & Section Heading:** Replace `d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4` (`1`) on `#capVideo`, `.cap-kicker` (`// Capabilities`), and `.cap-heading` (`Production evolved`).
8. **Three Capability Glass Cards:** Update `AI Scenery` (`3`), `Batch Production` (`3`), and `Smart Lighting` (`2`), along with their `4` `.cap-tag` pills per card.
9. **Destination Telemetry Switcher:** Edit `.world-tab` buttons and the `WORLDS` object (`mars`, `luna`, `europa`) to customize `title`, `desc`, `deltaV`, `duration`, and `berths`.
10. **Flight Manifest Modal & Contact:** Customise `#claimModal`, `#claimForm`, and replace all `4` occurrences of `flightdeck@aetheris-voyage.example`.

## 12 AI Prompts

1. **Rebrand to Orbital Cinema Studio:** `"Replace all 4 occurrences of Aetheris Voyage with Helios Orbital Studio and update the hero badge to Gen-4 Space Cinematography Engine Live."`
2. **Change Blur Headline Words:** `"Update #heroHeadline .blur-word spans to read Render Worlds Beyond Human Imagination with 0.08s staggered delays."`
3. **Update Hero Stat Cards:** `"Change 34.5 Min to 12.4 PFLOPS (Orbital Compute Throughput) and 2.8B+ to 99.994% (Downlink Frame Integrity)."`
4. **Swap Partner Logos:** `"Replace the 5 partner names Aeon, Vela, Apex, Orbit, Zeno in .partners-list with Kestrel, Apogee, Navier, Solis, and Chronos."`
5. **Customise Capability Cards:** `"Update the 3 .cap-card blocks to feature Neural Terrain Synthesis, Multi-Angle Orbital Rigs, and Spectral Atmosphere Grading."`
6. **Add Fourth Destination Sector:** `"Add a 4th .world-tab button for Titan Kraken Mare and add a titan entry to the WORLDS object with deltaV 18.6 km/s and duration 1,140 Days."`
7. **Adjust Crossfade Lead Time:** `"Change FADE_MS to 700 and FADE_OUT_LEAD to 0.75 in setupFadingVideo for a slower cinematic loop transition."`
8. **Increase Liquid Glass Frosting:** `"Update .liquid-glass backdrop-filter to blur(10px) and background to rgba(255, 255, 255, 0.035)."`
9. **Connect Reservation Form to Webhook:** `"Update the #claimForm submit handler to POST JSON { name, email, sector } to https://api.example.com/v1/reservations."`
10. **Switch Heading Font to Playfair Display:** `"Replace Instrument+Serif with Playfair+Display:ital,wght@0,400;1,400 in the Google Fonts stylesheet and update --font-heading."`
11. **Default Hero Video to Full Bleed 100%:** `"Change .hero-video width and height from 120% to 100% and object-position to center."`
12. **Translate UI to French:** `"Translate all visible navigation items, hero copy, capability cards, and modal labels in index.html to French while keeping class names intact."`
