# Brief — RIVR (`rivr` / `t99`)

## 1. Overview & Creative Direction
- **Product Name:** RIVR (`rivr`)
- **Catalog ID:** `t99`
- **Category:** `commerce` (DeFi Fluid Staking & Smart Vaults Dashboard Hero)
- **Format:** Single-file self-contained HTML (`source/index.html`) using plain HTML5, CSS3, and vanilla JavaScript with zero build step and zero external frameworks.
- **Typography & Palette:**
  - Font: `'Helvetica Regular'` (`db.onlinewebfonts.com/t/a64ff11d2c24584c767f6257e880dc65.woff2` + system sans fallback).
  - Outer canvas `#f0f0f0`, headline slate `#5E6470`, deep navy accents `rgba(30, 50, 90, 0.9)`, frosted glass cards (`rgba(255, 255, 255, 0.3)`–`0.6` with `backdrop-filter: blur(12px–24px)`).

## 2. Core Architecture & Creative Enhancements (+15–20%)
1. **3rem Rounded Video Stage & Navbar:**
   - `1536px` max-width rounded container over `#f0f0f0` canvas with full-bleed looping video (`4286c423-2fd9-4efd-92bd-91a939453fc1.mp4`).
   - Top navbar with `RIVR · STREAM LIVE` motion toggle, center menu (`Ecosystem`, `Economics ›`, `Developers`, `Governance ›`), and `"Book Demo ↗"` pill button.
2. **Hero Badge & Headline:**
   - Frosted `"✦ Fluid Staking"` badge, `80px` `"Fluid Asset Streams"` headline (`#5E6470`), and subtitle (`"Access Smart Vaults, stake RIVR, NFTs, transform rigid holdings into liquid cash instantly."`).
3. **Bottom-Left Yielders Card & Bottom-Right Faux-Cutout Corner:**
   - Bottom-left frosted card (`5.2K` `Active Yielders` + `"Join Discord"` button).
   - Bottom-right `#f0f0f0` faux-cutout (`rounded-tl-[3.5rem]`) with two `56×56` concave SVG masks (`M56 56V0C56 30.9279 30.9279 56 0 56H56Z` and `M56 56H0C30.9279 56 56 30.9279 56 0V56Z`), circular arrow button, `"Documentation"`, and `"Library ›"`.
4. **Interactive Smart Vault Strategy Simulator & Institutional Modal (+15–20% Creative Enhancement):**
   - Live vault strategy switcher (`stRIVR Liquid Vault`, `NFT Floor Stream`, `Delta-Neutral Treasury`) updating Net APY, Vault TVL, Unstake Latency, and Active Yielders count, plus an institutional sandbox request dialog (`#rivrModal`).
