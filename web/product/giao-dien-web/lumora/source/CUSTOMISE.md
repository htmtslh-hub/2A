# Customisation Guide — Lumora (`v1.0.0`)

This guide walks you through customising **Lumora** in 10 structured steps, followed by 12 copy-ready AI prompts and a counted literal edit map.

---

## 10-Step Customisation Walkthrough

1. **Extract & Prepare Your Working Copy:**
   Extract `lumora.zip` into a clean directory and keep the original archive as your untouched backup. You can preview the prebuilt static bundle immediately in `built/index.html` over any static HTTP server (`npx serve built`).
2. **Update Page Title, Meta Description & Google Font (`index.html`):**
   Open `index.html` and replace `Lumora — Clarity in an Endlessly Noisy Universe` in `<title>` and `<meta property="og:title">` with your brand name and value proposition. The `Instrument Serif` (`ital@0;1`) font is loaded from Google Fonts in `<head>`.
3. **Replace the Four Background Videos (`src/App.tsx`):**
   In `src/App.tsx`, locate `VIDEOS` and update the `url` and `label` fields for `Golden Hour`, `Still Water`, `Deep Woods`, and `Quiet Dawn` with your own hosted MP4 loops.
4. **Update or Remove the Transparent PNG Overlay (`src/App.tsx` & `src/index.css`):**
   In `src/App.tsx`, change `OVERLAY_PNG_URL` to your own transparent frame PNG (or remove `<img id="lumora-png-overlay" />` if your videos require an unobstructed view). Adjust the `train-bob` keyframe amplitude in `src/index.css`.
5. **Customise the Brand Logo & Navigation Links (`src/App.tsx`):**
   Edit `#lumora-logo` (`Lumora`) and `NAV_LINKS` (`How It Works`, `Features`, `Pricing`, `Community`) in `src/App.tsx`.
6. **Personalise the Badge, Two-Line Heading & Subtext (`src/App.tsx`):**
   Update `#lumora-badge` (`Over 10,000 minds already finding their clarity`), `#lumora-heading` (`Clarity in an Endlessly` / `Noisy Universe`), and `#lumora-subtext`.
7. **Configure the Email Input Pill & Early Access CTA (`src/App.tsx`):**
   Update `#lumora-email-form`, placeholder `Your Best Email`, button text `Get Early Access`, and `handleEarlyAccessSubmit` to connect to your waitlist endpoint.
8. **Tune Scene-Specific Text Contrast (`#182C41` on Scene 3, `src/App.tsx`):**
   In `src/App.tsx`, `isDeepWoods = activeVideo === 2` transitions hero text to `#182C41` over `700ms` for bright daylight scenes. Adjust the index or hex color to match your video brightness.
9. **Edit the Bottom Stats Bar (`src/App.tsx`):**
   Update `STATS` (`60+ Deep Sessions`, `12,000+ Creators`, `4.8 User Satisfaction`, `Intentional-First Design`) at the top of `src/App.tsx`.
10. **Rebuild & Sync Production Bundle (`built/`):**
    Run `npm install && npm run build` to typecheck (`tsc --noEmit`) and emit the updated production bundle into `built/`.

---

## 12 Copy-Ready AI Prompts

1. **Prompt 01 — Set Up My Website Editing Assistant:**
   > "I bought the Lumora React + Tailwind CSS + Lucide React template and want to customise it for my mindfulness or focus brand. Read `index.html`, `src/App.tsx`, `src/index.css`, `CUSTOMISE.md`, `README.md`, and `LICENCE.txt`. Summarise the 4-video crossfading background, `train-bob` PNG overlay, `.liquid-glass` surfaces, `#182C41` Deep Woods contrast mode, and mobile menu, then ask me for my brand details."
2. **Prompt 02 — Rebrand Copy for a Deep-Work Audio App:**
   > "In `index.html` and `src/App.tsx`, replace `Lumora` with `[BRAND NAME]`, change the badge to `[NEW BADGE]`, update the heading to `[LINE 1]` / `[LINE 2]`, and replace `STATS` with our verified metrics."
3. **Prompt 03 — Replace the 4 Ambient Video Scenes:**
   > "Update `VIDEOS` in `src/App.tsx` with four new scene labels and MP4 URLs, keeping the `1000ms` crossfade and `isTransitioning` cooldown logic intact."
4. **Prompt 04 — Customize Which Scenes Trigger Dark Hero Text (`#182C41`):**
   > "In `src/App.tsx`, update `isDeepWoods` so that both scene index `1` and scene index `2` transition the hero badge, heading, subtext, input, and switcher to `#182C41`."
5. **Prompt 05 — Connect the Early Access Email Form to an API:**
   > "Update `handleEarlyAccessSubmit` in `src/App.tsx` to send `{ email }` via `fetch` to `[WAITLIST ENDPOINT URL]` with loading, success, and error states inside the `.liquid-glass` email pill."
6. **Prompt 06 — Add an Ambient Audio Toggle Button in the Navbar:**
   > "Add a `.liquid-glass` sound toggle button next to `#lumora-desktop-nav` in `src/App.tsx` using Lucide `Volume2` and `VolumeX` icons to mute/unmute the active background video."
7. **Prompt 07 — Adjust the `train-bob` Motion Amplitude:**
   > "In `src/index.css`, change `@keyframes train-bob` to oscillate gently between `translateY(0) scale(1.04)` and `translateY(-4px) scale(1.04)` over `4s ease-in-out infinite`."
8. **Prompt 08 — Translate the Entire Interface:**
   > "Translate all visitor-facing strings in `index.html` and `src/App.tsx` into `[LANGUAGE]` while preserving the `Instrument Serif` heading aesthetic and `.liquid-glass` pills."
9. **Prompt 09 — Add Auto-Cycle Scene Timer:**
   > "In `src/App.tsx`, add an optional 12-second auto-advance timer that cycles `activeVideo` through `0..3` when the user is idle."
10. **Prompt 10 — Audit Accessibility, Contrast & Responsive Viewports:**
    > "Audit `index.html`, `src/App.tsx`, and `src/index.css` across `1440×900`, `820×1180`, `375×812`, and `320×740`. Verify keyboard focus, mobile overlay `Escape` handling, and zero horizontal overflow."
11. **Prompt 11 — Guide Me Through Deploying the Built Folder:**
    > "Explain step by step how to run `npm run build` and deploy the generated `built/` directory of Lumora to `[HOSTING PROVIDER]` with HTTPS."
12. **Prompt 12 — Diagnose and Fix a Layout or Transition Issue:**
    > "Inspect `src/App.tsx` and `src/index.css` to diagnose `[DESCRIBE ISSUE]`. Provide the minimal safe fix and return the complete updated file."

---

## Counted Literal Edit Map

| File | Literal String | Count | Purpose |
| :--- | :--- | :---: | :--- |
| `index.html` | `Lumora — Clarity in an Endlessly Noisy Universe` | 2 | Document `<title>` & `og:title` |
| `src/App.tsx` | `Lumora` | 1 | Top-left italic brand logo text |
| `src/App.tsx` | `Over 10,000 minds already finding their clarity` | 1 | `.liquid-glass` hero badge text |
| `src/App.tsx` | `Clarity in an Endlessly` | 1 | Hero heading line 1 |
| `src/App.tsx` | `Noisy Universe` | 1 | Hero heading line 2 |
| `src/App.tsx` | `Get Early Access` | 1 | Email pill submit button label |
| `src/App.tsx` | `Golden Hour` | 1 | Scene 1 switcher label |
| `src/App.tsx` | `Still Water` | 1 | Scene 2 switcher label |
| `src/App.tsx` | `Deep Woods` | 1 | Scene 3 switcher label (triggers `#182C41` dark mode) |
| `src/App.tsx` | `Quiet Dawn` | 1 | Scene 4 switcher label |
| `src/App.tsx` | `#182C41` | 8 | Dark text color classes for `Deep Woods` (scene index 2) |
| `src/index.css` | `train-bob` | 3 | Keyframe animation name & `.animate-train-bob` utility |
