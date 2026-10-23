# Customisation Guide — Vaultra (Crypto Finance Ecosystem Hero)

This guide covers customising the **Vaultra** single-file crypto finance landing hero (`index.html`), including **10 step-by-step instructions**, **12 copy-paste AI prompts**, and a **literal string reference table**.

---

## 10 Customisation Steps

### Step 1 — Unzip and Preview Locally
Extract the ZIP archive and open `index.html` directly in any modern browser (`file://`) or serve the folder over a local static server:
```bash
npx serve .
```
No build step, framework, or package installation is required. Keep a backup copy of the original ZIP before making edits.

### Step 2 — Adjust the Proportional Scale & Dark Night Tokens (`:root`)
In the `<style>` block of `index.html`, `--u` scales all desktop dimensions proportionally against a `1440×900` reference viewport:
```css
--u: clamp(0.66px, min(calc(100vw / 1440), calc(100dvh / 900)), 2.2px);
```
Update `--pink-edge` (`#f59cd4`), `--lilac-edge` (`#deb6ff`), `--blue-glow` (`#3b5bff`), `--magenta-glow` (`#d926a9`), and `--red-glow` (`#ef3b5d`) in `:root` to re-theme the accent highlights.

### Step 3 — Replace the Dotted Particle Globe Still & Video (`.globe-plate`)
Inside `<div class="globe-plate" id="globePlate">`:
- Update `<img id="globeStill" class="globe-layer globe-still" src="...">` (`1672×941`).
- Update `<video id="globeVideo" class="globe-layer globe-video" src="...">` (`1280×720`, muted, loops). Both layers share identical geometry (`inset: 0; width: 100%; height: 100%; object-fit: fill;`) and `.globe-video` fades in (`0.85s`) via `.is-ready` once its first frame is ready.

### Step 4 — Tune the Ultra-Wide Side Feather & Phone Top Feather Masks
- On ultra-wide screens (`@media (min-aspect-ratio: 20/10), (min-width: 1850px)`), `.globe-plate` applies a horizontal `linear-gradient(90deg, ...)` mask so the left and right edges feather smoothly into `#000000`.
- On phones and portrait tablets (`@media (max-aspect-ratio: 11/10), (max-width: 820px)`), `.globe-plate` applies a vertical `linear-gradient(180deg, ...)` mask at the top.

### Step 5 — Customise the Double-Slash Brand Mark & Navigation Bar (`.nav-header`)
- Edit the double-slash SVG inside `<a href="#mainHero" class="brand" id="brandLogo">` and replace the `Vaultra` brand name.
- Update the six navigation items inside `#navLinks` and `#mobileDrawer`: `Home` (active with `.nav-link__round-icon`), `Invest`, `Communit`, `Blog`, `For business`, and `Membership`.

### Step 6 — Edit the `"EN ⌄"` Globe Selector & Currency Rates (`.lang-wrap`)
Inside `#langPopover`, edit or add `<button class="lang-option" data-lang="EN" data-rate="1" data-sym="$">` entries to support your target regions and currencies.

### Step 7 — Update the Centre Pill, `66px` Gradient Headline & Copy (`.hero-center`)
- Edit `<div class="hero-pill anim-pill" id="heroBadge">` (`⚡ Revolutionizing Crypto Finance`).
- Update the two `<span class="hero-headline__line">` lines inside `<h1 class="hero-headline" id="heroHeadline">` (`Inter Display 300`, pink-to-lilac edge gradient).
- Update the two `<span class="hero-copy__line">` lines inside `<p class="hero-copy anim-copy" id="heroCopy">` and the primary `<button class="btn-cta anim-cta" id="getStartedBtn">` (`Get Started →`).

### Step 8 — Reposition or Replace the Four Glass Coin Chips (`.chip-layer`)
Each `<button class="coin-chip">` (`₿`, `Ξ`, `₮`, and the hexagonal prism token) is positioned in percentage coordinates inside `.globe-stage`:
- `.coin-chip--btc`: `left: 6.82%; top: 33.58%`
- `.coin-chip--eth`: `left: 16.87%; top: 51.43%`
- `.coin-chip--usdt`: `left: 92.05%; top: 44.95%`
- `.coin-chip--hex`: `left: 93.42%; top: 81.62%`

### Step 9 — Customise the Bottom Mouse-Scroll Hint (`#scrollHintBtn`)
Inside `<footer class="scroll-footer">`, edit the curved `<textPath href="#usdtArc">USDT</textPath>` and `<textPath href="#ethArc">ETH</textPath>` labels or adjust the arc radii in `<svg class="scroll-hint__arcs">`.

### Step 10 — Connect the Ecosystem Modal & Auth Actions (`#vaultraModal`)
In the `<script>` block at the bottom of `index.html`, replace the `openModal(...)` and `#authForm` submit handlers with your live onboarding route, OAuth/passkey endpoint, or smart-contract dApp URL.

---

## 12 Copy-Paste AI Prompts

1. **Rebrand for a Layer-2 Institutional DeFi Protocol (`AETHERVAULT`):**
   > "Read `index.html` and rebrand `Vaultra` to `AetherVault`. Update the hero pill to `⚡ Institutional Layer-2 Treasury`, the headline lines to `Programmable Digital Asset Liquidity` / `For Global Institutional Treasuries`, and keep all responsive rules intact."
2. **Swap the Pink-to-Lilac Headline Gradient to Cyan-to-Emerald:**
   > "In `index.html`, update `.hero-headline__line` so its horizontal `linear-gradient(90deg, ...)` runs from `#5ef2d6` (`0%`) to `#9de8ff` (`16%`), `#ffffff` (`32%–68%`), `#9de8ff` (`84%`), and `#5ef2d6` (`100%`)."
3. **Replace the Four Coin Chips with Solana, Avalanche, USDC, and Arbitrum:**
   > "In `index.html`, update the four `.coin-chip` buttons in `.chip-layer` and the four `.asset-pill` buttons in `#panelInvest` to `SOL` (`6.8% APY`), `AVAX` (`7.4% APY`), `USDC` (`8.9% APY`), and `ARB` (`9.6% APY`)."
4. **Connect `"Get Started →"` and `"Sign up"` to an External dApp URL:**
   > "In `index.html`, update `#getStartedBtn`, `#navSignupBtn`, and `#mobileSignupBtn` so clicking them navigates to `https://app.example.com/onboarding` while keeping `#navLoginBtn` pointed to `https://app.example.com/login`."
5. **Add Japanese (`JP · JPY ¥`) and Swiss (`CH · CHF ₣`) to the `"EN ⌄"` Globe Selector:**
   > "In `index.html`, add two new `.lang-option` buttons inside `#langPopover` for `JP` (`data-rate='152'`, `data-sym='¥'`) and `CH` (`data-rate='0.88'`, `data-sym='CHF '`)."
6. **Add a Deposit Amount Slider to the Ecosystem Yield Modal:**
   > "In `index.html`, insert an `<input type='range' min='1000' max='250000' step='1000' value='25000'>` inside `#panelInvest` and wire its `input` event to `updateProjectedValue()` so visitors can interactively scale the 5-year projection."
7. **Adjust the 1.6s CSS Entrance Timing:**
   > "In `index.html`, scale all animation durations and delays on `.anim-nav`, `.anim-pill`, `.anim-h1-1`, `.anim-h1-2`, `.anim-copy`, `.anim-cta`, `.anim-chip-1..4`, and `.anim-scroll` by `0.75` for a faster `1.2s` entrance."
8. **Translate All Visitor-Facing Copy into Vietnamese or Spanish:**
   > "Translate all visible text in `index.html` (navigation links, hero pill, 2-line headline, 2-line body copy, buttons, and modal text) into [LANGUAGE] while preserving HTML structure, class names, and single-screen fit."
9. **Change the Bottom Curved Scroll Labels from `USDT` / `ETH` to `BTC` / `SOL`:**
   > "In `index.html`, inside `<svg class='scroll-hint__arcs'>`, change the two `<textPath>` labels from `USDT` and `ETH` to `BTC` and `SOL`, and update the `aria-label` on `#scrollHintBtn`."
10. **Add a Live Video Play/Pause Toggle Button in the Footer:**
    > "In `index.html`, add a compact glass pill button next to `#scrollHintBtn` that toggles `globeVideo.paused ? globeVideo.play() : globeVideo.pause()` and updates its `aria-pressed` state."
11. **Post the Auth Modal Form to a Real Webhook Endpoint:**
    > "In `index.html`, update the `#authForm` submit listener to send `{ email }` via `fetch('https://api.example.com/waitlist', { method: 'POST' })` and display the server response inside `#modalStatus`."
12. **Audit Pre-Publication Accessibility & Contrast:**
    > "Audit `index.html` for heading hierarchy, `aria-label` attributes, focus outlines, keyboard Escape handling, reduced-motion support, and single-screen overflow across `1440×900`, `820×1180`, `375×812`, and `320×740`."

---

## Literal String Reference Table (`index.html`)

| Literal String | Occurrences | Location / Role |
| :--- | :---: | :--- |
| `Vaultra` | 17 | `<title>`, `<meta>`, CSS comments, `#brandLogo`, coin chip `aria-label`, modal copy & JS status messages |
| `Revolutionizing Crypto Finance` | 2 | CSS comment & `.hero-pill` (`#heroBadge`) |
| `Innovative Crypto Financial Solutions` | 4 | `<title>`, `<meta property="og:title">`, `#heroHeadline` line 1 & JS modal title |
| `For Any Investment Challenge` | 2 | `<title>` & `#heroHeadline` line 2 |
| `We Don't Just Focus On Investments, We Cover Your Entire` | 2 | `<meta property="og:description">` & `#heroCopy` line 1 |
| `Financial Ecosystem, From Budgeting To Retirement.` | 2 | `<meta property="og:description">` & `#heroCopy` line 2 |
| `Get Started` | 2 | CSS comment & primary CTA `#getStartedBtn` |
| `Sign up` | 7 | CSS comments, `#navSignupBtn`, `#mobileSignupBtn`, modal tab & JS handlers |
| `Log In` | 8 | CSS comments, `#navLoginBtn`, `#mobileLoginBtn`, modal tab & JS handlers |
| `Communit` | 3 | Desktop nav `#navLinks`, `#mobileDrawer` & JS modal copy |
| `For business` | 2 | Desktop nav `#navLinks` & `#mobileDrawer` |
| `Membership` | 4 | Desktop nav `#navLinks`, `#mobileDrawer` & modal tab |
