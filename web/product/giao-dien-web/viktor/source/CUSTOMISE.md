# Customisation Guide — Viktor. (`v1.0.0`)

This guide walks you through customising **Viktor.** in 10 structured steps, followed by 12 copy-ready AI prompts and a counted literal edit map.

---

## 10-Step Customisation Walkthrough

1. **Update Page Title & Font Weights (`index.html`):**
   Open `index.html` and change `<title>Viktor. — Creative Portfolio</title>` to your name or studio title. The `Figtree` font (`400`, `500`, `600`) is loaded from Google Fonts in `<head>`.
2. **Replace the Three Background Videos (`src/components/Hero.tsx`):**
   In `src/components/Hero.tsx`, locate the `VIDEOS` array and replace the `url` and `label` fields for `01 / WATER WAVE`, `02 / GRIDWAVE`, and `03 / LIGHT TUNNEL` with your own hosted MP4 reels.
3. **Customise the Giant Portfolio Name (`src/components/Hero.tsx`):**
   Update the `<h1>` text inside `src/components/Hero.tsx` from `Viktor` to your own first name or studio moniker while keeping the `<span id="hero-period">.</span>` accent period intact.
4. **Edit the Bio & Value Proposition (`src/components/Hero.tsx`):**
   Update the `<p id="hero-description">` copy (`"I craft bold brands and modern websites with purpose..."`) to describe your creative discipline.
5. **Change the Contact Email & CTA Target (`src/components/Navbar.tsx` & `src/components/Hero.tsx`):**
   Replace `Davies@gmail.com` in both `src/components/Navbar.tsx` and `src/components/Hero.tsx` with your studio email or booking link.
6. **Configure Navigation Links (`src/components/Navbar.tsx`):**
   Edit `NAV_ITEMS` in `src/components/Navbar.tsx` (`01 / Works`, `02 / Services`, `03 / About`, `04 / Contact`) and point each `href` to your section anchors or routes.
7. **Adjust the Timezone Prefix & Clock Format (`src/components/Navbar.tsx`):**
   In `src/components/Navbar.tsx`, change the `CUP` prefix in `CUP {time}` to your city code (e.g., `LDN`, `NYC`, `TYO`) and optionally pass a `timeZone` option to `Intl.DateTimeFormat('en-GB', { ... })`.
8. **Tune Accent Color (`src/index.css` & `src/components/Hero.tsx`):**
   Replace `#F598F2` (orchid pink) in `src/index.css` (`.cta-fill-btn::before`, `.cta-fill-btn:hover`) and `src/components/Hero.tsx` (availability dot and period color on slide 1) with your signature brand accent.
9. **Adjust Custom Breakpoints & Spring Curve (`src/index.css`):**
   In `src/index.css`, modify `@custom-variant mobile (@media (max-width: 809.98px))`, `@custom-variant md-tablet (@media (min-width: 810px) and (max-width: 1199.98px))`, or `--ease-spring: cubic-bezier(0.16, 1, 0.3, 1)`.
10. **Rebuild & Verify (`built/`):**
    Run `npm run build` to typecheck and regenerate the production bundle in `built/`.

---

## 12 Copy-Ready AI Prompts

1. **Rebrand for a 3D Motion Director:**
   > "Update `src/components/Hero.tsx` and `src/components/Navbar.tsx` for a 3D Motion Director named 'Soren.' based in Copenhagen (`CPH`), changing the three scene labels to `01 / KINETIC TYPE`, `02 / CLOTH SIM`, and `03 / SHADER LAB`."
2. **Change Accent Color to Electric Lime:**
   > "Replace all occurrences of `#F598F2` and `rgba(245,152,242,0.75)` across `src/index.css`, `src/components/Hero.tsx`, `src/components/Navbar.tsx`, and `index.html` with `#C4FF4D` and `rgba(196,255,77,0.75)`."
3. **Add Auto-Advance Timer for Background Videos:**
   > "In `src/components/Hero.tsx`, add an 8-second auto-advance interval that cycles `activeIndex` through the 3 videos unless the user has `prefers-reduced-motion: reduce` enabled."
4. **Add a Project Inquiry Drawer on CTA Click:**
   > "When the user clicks `#start-project-btn` in `src/components/Hero.tsx`, open a slide-over project brief drawer with Name, Email, Budget range, and Project summary fields."
5. **Lock Clock to a Specific Timezone:**
   > "In `src/components/Navbar.tsx`, configure `Intl.DateTimeFormat('en-GB', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })` so the `CUP` clock always displays Cupertino time."
6. **Add a Fourth Video Reel:**
   > "Extend `VIDEOS` in `src/components/Hero.tsx` with a fourth entry `{ index: '04', label: 'NEURAL FLUX', url: '...' }` and assign custom accent colors per slide."
7. **Enable Real Anchor Scrolling for Nav Items:**
   > "Remove `e.preventDefault()` on the navigation links in `src/components/Navbar.tsx` and add smooth scrolling to `#works`, `#services`, `#about`, and `#contact` sections below the hero."
8. **Add Sound Mute/Unmute Toggle:**
   > "Add a minimal `SOUND OFF / SOUND ON` toggle button next to the live clock in `src/components/Navbar.tsx` that toggles `muted` on the currently active video."
9. **Localise Into Vietnamese:**
   > "Translate the UI copy in `src/components/Navbar.tsx` and `src/components/Hero.tsx` into Vietnamese while preserving the `Figtree` typography and layout proportions."
10. **Switch Display Font to Syne or Clash Display:**
    > "Update `index.html` and `src/index.css` to use Google Font `Syne` for `#hero-title` while keeping `Figtree` for navigation and body text."
11. **Add Poster Fallbacks to Video Elements:**
    > "Add a `poster` attribute to each `<video>` in `src/components/Hero.tsx` pointing to local WebP keyframes in `public/posters/`."
12. **Export Static Portfolio Configuration JSON:**
    > "Extract `NAV_ITEMS`, `VIDEOS`, email, and hero copy into `src/data/portfolio.json` and import it into `Navbar.tsx` and `Hero.tsx`."

---

## Counted Literal Edit Map

| File | Literal String | Count | Purpose |
| :--- | :--- | :---: | :--- |
| `index.html` | `Viktor. — Creative Portfolio` | 1 | Browser tab title |
| `src/components/Navbar.tsx` | `Davies@gmail.com` | 2 | Contact email href & label |
| `src/components/Navbar.tsx` | `CUP ` | 2 | Clock timezone label & ARIA label |
| `src/components/Hero.tsx` | `WATER WAVE` | 1 | Video scene 01 label |
| `src/components/Hero.tsx` | `GRIDWAVE` | 1 | Video scene 02 label |
| `src/components/Hero.tsx` | `LIGHT TUNNEL` | 1 | Video scene 03 label |
| `src/components/Hero.tsx` | `Available for work` | 2 | Status badge label & ARIA label |
| `src/components/Hero.tsx` | `start a project` | 1 | Primary CTA button text |
| `src/index.css` | `#F598F2` | 2 | Pink accent fill & border on CTA hover |
