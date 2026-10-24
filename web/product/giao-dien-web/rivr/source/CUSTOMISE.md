# Customisation Guide — RIVR (`rivr`, v1.0.0)

Adapt **RIVR** (`index.html`) for your own DeFi liquid staking protocol, smart vault yield aggregator, or institutional NFT liquidity dashboard.

## Verified Literal Edit Map (`index.html`)

| Literal String | Count | Location & Role |
| :--- | :---: | :--- |
| `Fluid Asset Streams` | `4` | `<title>`, OpenGraph title, ARIA label, and `#heroHeadline` (`80px`, `#5E6470`) |
| `Fluid Staking` | `4` | Meta description, OpenGraph description, `#heroBadge`, and modal header |
| `Book Demo` | `1` | Right navbar pill button (`#bookDemoBtn`, `rgba(30, 50, 90, 0.8)`) |
| `5.2K` | `2` | Bottom-left glass card `#yieldersCount` and `VAULTS.strivr.yielders` |
| `Active Yielders` | `1` | Bottom-left glass card uppercase subtitle (`.yielders-label`) |
| `Join Discord` | `1` | Bottom-left card white pill CTA (`#joinDiscordBtn`) |
| `Documentation` | `2` | `#docCircleBtn` ARIA label and `.doc-title` inside `#bottomRightCorner` |
| `Library` | `3` | `#docLibraryBtn` ID and label inside `#bottomRightCorner` |
| `stRIVR Liquid Vault` | `1` | First interactive smart vault strategy tab |
| `NFT Floor Stream` | `1` | Second interactive smart vault strategy tab |
| `Delta-Neutral Treasury` | `1` | Third interactive smart vault strategy tab |
| `14.8%` | `3` | `#vaultApy`, modal `<option>`, and `VAULTS.strivr.apy` |
| `$184.2M` | `2` | `#vaultTvl` readout and `VAULTS.strivr.tvl` |
| `4286c423-2fd9-4efd-92bd-91a939453fc1.mp4` | `1` | Full-bleed looping background video (`#rivrVideo`) |
| `protocol@rivr.example` | `2` | Modal sandbox contact link (`href` and text) |

## 10-Step Customisation Walkthrough

1. **Protocol Title & Metadata:** Replace all `4` occurrences of `Fluid Asset Streams` and `4` occurrences of `Fluid Staking` in `index.html`.
2. **Hero Video Stream:** Replace `4286c423-2fd9-4efd-92bd-91a939453fc1.mp4` (`1` occurrence) on `#rivrVideo`.
3. **Top Navigation & CTA:** Edit the 4 `.nav-menu-item` buttons (`Ecosystem`, `Economics`, `Developers`, `Governance`) and `Book Demo` (`1`).
4. **Hero Badge & Subtitle:** Update `#heroBadge` (`Fluid Staking`) and `.hero-subtitle` (`Access Smart Vaults, stake RIVR, NFTs, transform rigid holdings into liquid cash instantly.`).
5. **Interactive Smart Vault Strategy Pills:** Edit `.vault-pill` buttons (`stRIVR Liquid Vault`, `NFT Floor Stream`, `Delta-Neutral Treasury`) and the `VAULTS` object in `<script>`.
6. **Live Vault Readout Bar:** Customise `14.8%` (`3`), `$184.2M` (`2`), and `< 1.2s` in `#vaultReadoutBar`.
7. **Bottom-Left Yielders Card:** Replace `5.2K` (`2`), `Active Yielders` (`1`), and `Join Discord` (`1`) inside `#bottomLeftCard`.
8. **Bottom-Right Faux-Cutout Corner:** Edit `Documentation` (`2`) and `Library` (`3`) inside `#bottomRightCorner`. Keep the two `56×56` `<svg>` mask paths (`fill="#f0f0f0"`) matching `--bg-canvas`.
9. **Canvas & Navy Color Tokens:** Update `--bg-canvas` (`#f0f0f0`), `--ink-slate` (`#5E6470`), and `--ink-navy-90` (`rgba(30, 50, 90, 0.9)`).
10. **Institutional Demo Modal:** Customise `#rivrModal`, `#rivrDemoForm`, and replace `protocol@rivr.example` (`2`).

## 12 AI Prompts

1. **Rebrand to Restaking Protocol:** `"Replace all 4 occurrences of Fluid Asset Streams with Eigen Liquid Restaking and replace RIVR with AETH across index.html."`
2. **Update Yield & TVL Telemetry:** `"Change 14.8% to 18.4%, $184.2M to $640.8M, and 5.2K to 19.4K across index.html."`
3. **Add Fourth Smart Vault Tab:** `"Add a 4th .vault-pill button for RWA T-Bill Stream and add an rwa key to VAULTS with apy 5.4%, tvl $410M, and yielders 12.1K."`
4. **Change Canvas Background & Cutout Masks:** `"Change --bg-canvas and the two 56x56 SVG path fills in #bottomRightCorner from #f0f0f0 to #eaeef5."`
5. **Connect Join Discord Button to External URL:** `"Change #joinDiscordBtn to open https://discord.gg/example in a new tab instead of opening #rivrModal."`
6. **Customise Navbar Menu Items:** `"Replace Ecosystem, Economics, Developers, Governance in .nav-menu with Vaults, Tokenomics, Audits, and DAO."`
7. **Connect Demo Form to Webhook:** `"Update #rivrDemoForm submit handler to POST JSON { fund, email, vault } to https://api.example.com/demo-request."`
8. **Increase Glass Blur Intensity:** `"Update .bottom-left-card and .vault-switcher backdrop-filter to blur(28px) and background to rgba(255, 255, 255, 0.42)."`
9. **Add APY Calculator Input in Modal:** `"Add a Stake Amount ($USD) numeric input inside #rivrModal that calculates projected annual yield based on #rivrVaultSelect."`
10. **Adjust Hero Border Radius:** `"Change .hero-card border-radius on desktop from 3rem to 2.25rem and match .bottom-right-cutout border-top-left-radius."`
11. **Switch Font to Inter:** `"Load Inter:wght@400;500 from Google Fonts and update --font-helvetica to prioritize Inter."`
12. **Translate UI to Japanese:** `"Translate all visible navigation links, hero copy, vault pills, and modal labels in index.html to Japanese."`
