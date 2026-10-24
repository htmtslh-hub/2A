# Customisation Guide — Digital Epoch (`digital-epoch`, v1.0.0)

Adapt **Digital Epoch** (`index.html`) for your own decentralized protocol, enterprise Web3 foundation, or developer SDK platform.

## Verified Literal Edit Map (`index.html`)

| Literal String | Count | Location & Role |
| :--- | :---: | :--- |
| `Digital Epoch` | `7` | `<title>`, OpenGraph title, ARIA label, footer copyright, and modal header |
| `Foundation of the` | `3` | `<title>`, OpenGraph title, and first line of `#heroHeadline` |
| `new digital epoch` | `1` | Second line of `#heroHeadline` (`56px` `Outfit` medium, `#0a1b33`) |
| `Contact Us` | `1` | Primary dark hero button (`#contactHeroBtn`, `#0a152d`) |
| `Get in touch` | `1` | Floating bottom navbar pill CTA (`#navTouchBtn`) |
| `Procure` | `5` | First marquee partner card (`data-partner` + label × 2) and modal placeholder |
| `Shopify` | `4` | Second marquee partner card (`data-partner` + label × 2) |
| `Blender` | `4` | Third marquee partner card (`data-partner` + label × 2) |
| `Figma` | `4` | Fourth marquee partner card (`data-partner` + label × 2) |
| `Spotify` | `4` | Fifth marquee partner card (`data-partner` + label × 2) |
| `Lottielab` | `4` | Sixth marquee partner card (`data-partner` + label × 2) |
| `Google Cloud` | `4` | Seventh marquee partner card (`data-partner` + label × 2) |
| `Bing` | `4` | Eighth marquee partner card (`data-partner` + label × 2) |
| `148,000 TPS` | `2` | Default throughput readout (`#archTps`) and `LAYERS.protocol.tps` |
| `340 ms` | `2` | Default block finality readout (`#archFinality`) and `LAYERS.protocol.finality` |
| `4,820` | `2` | Default active validator nodes readout (`#archNodes`) and `LAYERS.protocol.nodes` |
| `74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4` | `1` | Hero container looping background video (`#heroVideo`) |
| `ecosystem@digital-epoch.example` | `4` | Footer and modal contact email links |

## 10-Step Customisation Walkthrough

1. **Brand Name & Metadata:** Replace all `7` occurrences of `Digital Epoch` and update `<meta name="description">`.
2. **Hero Container & Video Background:** Replace `74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4` (`1` occurrence) on `#heroVideo`. Adjust `.hero-shell` (`max-width: 1400px; height: 600px; border-radius: 48px;`) if desired.
3. **Hero Display Headline & Copy:** Edit `Foundation of the` (`3`) and `new digital epoch` (`1`) inside `#heroHeadline`, plus `.hero-subheadline`.
4. **Hero CTA Button:** Update `Contact Us` (`1`) and `--ink-dark-btn` (`#0a152d`).
5. **Floating Bottom Navbar:** Edit `.floating-nav` items (`✦` motion toggle, `Products`, `Docs`, and `Get in touch` `#navTouchBtn`).
6. **Seamless Partner Marquee Cards:** Replace the `8` partner names (`Procure`, `Shopify`, `Blender`, `Figma`, `Spotify`, `Lottielab`, `Google Cloud`, `Bing`) in both Set 1 and Set 2 inside `#marqueeTrack` so the `-50%` loop stays seamless.
7. **Marquee Hover Gradients:** Customise the inline `linear-gradient(...)` styles on `.marquee-card__gradient` for each of the 8 brand cards.
8. **Modular Architecture Inspector Tabs:** Edit `.arch-tab` buttons (`01 Core Protocol`, `02 Builder SDK`, `03 Enterprise Mesh`) and the `LAYERS` object in `<script>`.
9. **Protocol Telemetry & Code Preview:** Update `148,000 TPS` (`2`), `340 ms` (`2`), `4,820` (`2`), and `#archCodeContent`.
10. **Partner Inquiry Modal & Footer:** Update `#epochModal`, `#epochContactForm`, and replace all `4` occurrences of `ecosystem@digital-epoch.example`.

## 12 AI Prompts

1. **Rebrand to AI Cloud Fabric:** `"Replace all 7 occurrences of Digital Epoch with Aether Cloud Fabric and change #heroHeadline to Foundation of the autonomous AI cloud."`
2. **Update Hero Subheadline & CTA:** `"Change .hero-subheadline to describe a distributed GPU inference network and change Contact Us to Deploy Cluster."`
3. **Swap Marquee Partner Names:** `"Replace Shopify, Blender, Figma, and Spotify in both marquee sets with Stripe, Linear, Vercel, and Raycast."`
4. **Speed Up Marquee Loop:** `"Change .marquee-track animation duration from 32s to 22s."`
5. **Customise Architecture Telemetry:** `"Change 148,000 TPS to 420,000 IOPS, 340 ms to 18 ms, and 4,820 to 12,400 across index.html."`
6. **Add Fourth Architecture Layer Tab:** `"Add a 04 ZK Rollup Bridge tab to .arch-tabs and a bridge entry in LAYERS with 1.2M TPS throughput."`
7. **Change Accent & Button Palette:** `"Update --ink-heading to #0f172a and --ink-dark-btn to #1e293b."`
8. **Connect Contact Form to API:** `"Update #epochContactForm submit listener to POST JSON { orgName, orgEmail, orgTrack } to https://api.example.com/leads."`
9. **Increase Hero Height on Desktop:** `"Change .hero-shell height from 600px to 680px on viewports wider than 1024px."`
10. **Switch Display Font to Plus Jakarta Sans:** `"Replace Outfit with Plus+Jakarta+Sans:wght@500;600;700 in Google Fonts and update --font-display."`
11. **Add Copy Button to SDK Code Block:** `"Add a Copy Snippet button in .arch-code-header that copies #archCodeContent text to navigator.clipboard."`
12. **Translate UI to German:** `"Translate all visible headings, buttons, architecture tabs, and modal labels in index.html to German."`
