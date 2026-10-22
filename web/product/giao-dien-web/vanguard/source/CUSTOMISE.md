# Customisation Guide — VANGUARD Creative Agency Hero

This guide walks you through customising **VANGUARD** (`React 18 + TypeScript + Tailwind CSS + Vite 6 + Lucide React`), followed by **12 copy-paste AI prompts** and a **literal string reference table**.

---

## 10 Customisation Steps

### Step 1 — Install Dependencies & Start the Dev Server
Open a terminal inside the extracted template folder and run:
```bash
npm install
npm run dev
```
If you only want to preview the pre-compiled production bundle without installing Node packages, serve the `built/` directory directly:
```bash
npx serve built
```

### Step 2 — Replace the Background Video (`src/App.tsx`)
Open `src/App.tsx` and update the `VIDEO_URL` constant at the top of the file:
```ts
const VIDEO_URL =
  'https://your-cdn.example.com/agency-showreel-loop.mp4';
```
Keep the `<video>` attributes (`autoPlay`, `muted`, `loop`, `playsInline`, `className="absolute inset-0 w-full h-full object-cover"`) intact so mobile and desktop browsers autoplay the loop seamlessly.

### Step 3 — Update Display & Body Fonts (`index.html`, `tailwind.config.js`, `src/index.css`)
- In `index.html`, replace the OnlineWebFonts stylesheet (`FSP DEMO - PODIUM Sharp 4.11`) or Google Fonts (`Inter`) links with your custom font URLs.
- In `tailwind.config.js`, update `theme.extend.fontFamily.podium` and `theme.extend.fontFamily.inter`.
- In `src/index.css`, update the `.font-podium` utility class to match your new display font family.

### Step 4 — Customise the Brand Name & Navigation Links (`src/App.tsx`)
- Replace `"VANGUARD"` in both the desktop `<header>` and the mobile menu overlay header.
- Edit the `NAV_LINKS` tuple (`['Projects', 'Studio', 'Offerings', 'Inquire']`) to rename your navigation items. Both the desktop bar (`hidden md:flex`) and the mobile fullscreen overlay (`md:hidden`) read directly from `NAV_LINKS`.

### Step 5 — Edit the Hero Tagline, 3-Line Headline & Subtext (`src/App.tsx`)
Inside `<main>`, update:
1. Tagline text next to `<Crown className="w-4 h-4 text-white/70 shrink-0" />`: `"World-Class Digital Collective"`.
2. Three stacked `<h1>` lines (`text-[clamp(2.8rem,8vw,7rem)] leading-[0.92] tracking-tight font-podium`): `"Design."`, `"Disrupt."`, `"Conquer."`.
3. Subtext paragraph (`max-w-md`): `"We build fierce brand identities"` / `"that don't just turn heads -- "` + `<span className="font-bold text-white">they lead.</span>`.

### Step 6 — Customise the CTA Row & Award Badge (`src/App.tsx`)
- Update the primary button label (`"SEE OUR WORK"`) and its click handler or `href`.
- Update the two-line `<Award />` badge beside it (`hidden sm:flex`): `"Top-Rated"` / `"Brand Studio"`.

### Step 7 — Update the Telemetry Stats Row (`src/App.tsx`)
Modify the three stat blocks in `.animate-fade-up-delay-4`:
- `"250+"` / `"Brands Transformed"`
- `"95%"` / `"Client Retention"`
- `"10+"` / `"Years in the Game"`

### Step 8 — Tune Staggered Entrance Animations (`src/index.css`)
Open `src/index.css` under `@layer utilities` to adjust `@keyframes fade-up`, `@keyframes fade-in`, `@keyframes scale-in`, or the `0.2s` delay increments on `.animate-fade-up-delay-1` through `.animate-fade-up-delay-4`.

### Step 9 — Customise the Selected Works & Brief Dossier Modal (`src/App.tsx`)
Edit the `CASE_STUDIES` array at the top of `src/App.tsx` (`KINETIC LABS`, `OBSIDIAN AUDIO`, `AETHER CAPITAL`) and the discipline scope options (`Brand Identity & Strategy`, `Disruptive WebGL Flagship`, `Full-Scale Product Launch`) inside `#vanguard-dossier-modal`.

### Step 10 — Build for Production (`built/`)
Run the type-checker and Vite production bundler:
```bash
npm run build
```
Deploy the contents of `built/` to Vercel, Netlify, Cloudflare Pages, or any static host.

---

## 12 Copy-Paste AI Prompts

1. **Rebrand for an Architectural Visualization Studio:**
   > "Update `src/App.tsx` and `index.html` to rebrand `VANGUARD` as `MONOLITH`, an architectural visualization collective. Change the tagline to `Spatial & Architectural Visualization`, the 3-line heading to `Form. / Light. / Permanence.`, and the three stats to `180+ / Towers Visualized`, `42 / Global Awards`, and `14+ / Years of Craft`."
2. **Swap Background Video & Contrast Veil:**
   > "In `src/App.tsx`, replace `VIDEO_URL` with `/assets/studio-reel.mp4`, add a `poster='/assets/studio-poster.webp'` attribute to `#vanguard-bg-video`, and darken the left gradient veil to `from-black/75 via-black/45 to-black/15`."
3. **Connect the Project Brief Form to an API Endpoint:**
   > "In `src/App.tsx`, update `handleBriefSubmit` to send `{ scope: selectedScope, email: clientEmail }` via `fetch('https://api.example.com/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(...) })` with loading and error states."
4. **Add a Sound Mute/Unmute Toggle Button:**
   > "In `src/App.tsx`, add a `useRef<HTMLVideoElement>(null)` for `#vanguard-bg-video` and a `muted` state toggle button in the bottom-right corner of the hero so visitors can toggle ambient audio on and off."
5. **Replace OnlineWebFonts Display Font with Google Fonts `Bebas Neue`:**
   > "In `index.html`, `tailwind.config.js`, and `src/index.css`, replace `FSP DEMO - PODIUM Sharp 4.11` with `Bebas Neue` from Google Fonts while keeping `.font-podium` and `fontFamily.podium` working across all headings."
6. **Add a Fourth Stat Column:**
   > "In `src/App.tsx`, add a fourth stat block (`18 / Design Cannes Lions`) to the `.animate-fade-up-delay-4` stats row while keeping `flex-wrap` so mobile screens never overflow horizontally."
7. **Add `prefers-reduced-motion` Support:**
   > "In `src/index.css`, add a `@media (prefers-reduced-motion: reduce)` rule that sets `.animate-fade-up` and `.animate-fade-up-delay-1` through `.animate-fade-up-delay-4` to `animation: none; opacity: 1; transform: none;`."
8. **Expand Case Studies with External Live Links:**
   > "In `src/App.tsx`, add a `url` field to each object in `CASE_STUDIES` and render an `ArrowUpRight` link on each card in `#vanguard-dossier-modal` that opens the live project in a new tab."
9. **Add Budget Tier Selector to the Inquiry Form:**
   > "In `src/App.tsx`, add a budget selector row (`$25k–$50k`, `$50k–$100k`, `$100k+`) inside the `inquire` form in `#vanguard-dossier-modal` and include the selected budget in `#vanguard-brief-confirmation`."
10. **Lock Body Scroll While Mobile Menu is Open:**
    > "In `src/App.tsx`, add a `useEffect` that sets `document.body.style.overflow = menuOpen ? 'hidden' : ''` whenever `menuOpen` changes."
11. **Add Keyboard Focus Trapping in the Mobile Menu:**
    > "In `src/App.tsx`, move focus to `#mobile-menu-close` when `menuOpen` becomes `true` and return focus to `#mobile-menu-trigger` when `menuOpen` becomes `false`."
12. **Switch CTA Button to High-Contrast White on Hover:**
    > "In `src/App.tsx`, update `#see-our-work-btn` so hovering transitions it from `bg-black text-white` to `hover:bg-white hover:text-black` with a `border border-white/20`."

---

## Literal String Reference Table (`src/App.tsx` & `index.html`)

| Literal String | File | Occurrences | Purpose |
| :--- | :--- | :---: | :--- |
| `VANGUARD` | `src/App.tsx`, `index.html` | 3 | Brand mark in desktop nav, mobile overlay, and `<title>` |
| `World-Class Digital Collective` | `src/App.tsx`, `index.html` | 3 | Hero tagline, mobile overlay footer, and `<title>` |
| `Design.` | `src/App.tsx` | 1 | Main heading line 1 |
| `Disrupt.` | `src/App.tsx` | 1 | Main heading line 2 |
| `Conquer.` | `src/App.tsx` | 1 | Main heading line 3 |
| `SEE OUR WORK` | `src/App.tsx` | 1 | Primary black CTA button |
| `GET IN TOUCH` | `src/App.tsx` | 2 | Desktop & mobile bordered CTA buttons |
| `250+` | `src/App.tsx` | 1 | Stat 1 value (`Brands Transformed`) |
| `95%` | `src/App.tsx` | 1 | Stat 2 value (`Client Retention`) |
| `10+` | `src/App.tsx` | 1 | Stat 3 value (`Years in the Game`) |
