# Customising DesignPro (`v1.0.0`)

This guide walks you through customising **DesignPro** in 10 clear steps, provides a verified literal string map for fast search-and-replace, and includes 12 ready-to-copy AI prompts.

---

## Verified Literal Edit Map

Every string below has been counted against the source files so you can locate and replace values with confidence:

| Target Element | File | Exact Literal String | Occurrences in File |
|---|---|---|---|
| Page Title & OpenGraph Title | `index.html` | `DesignPro — Become Product Leader.` | `2` |
| Brand Name in Navbar & Modal | `src/App.tsx` | `DesignPro` | `2` |
| Video Background URL Constant | `src/App.tsx` | `VIDEO_URL` | `2` |
| Left Sub-Header Mission Copy | `src/App.tsx` | `We deliver transformative programs that empower emerging product designers with` | `1` |
| Right Sub-Header Stat Copy | `src/App.tsx` | `8000+ Talented Designers Launched !` | `1` |
| Eyebrow Uppercase Label | `src/App.tsx` | `Seats for Next Program Opening Soon` | `2` |
| Main Heading Line 1 | `src/App.tsx` | `Become` | `1` |
| Main Heading Line 2 (`ShinyText`) | `src/App.tsx` | `Product Leader.` | `1` |
| Primary CTA Button & Modal Heading | `src/App.tsx` | `Apply for Next Enrollment` | `2` |
| Default `ShinyText` Base Color | `src/components/ShinyText.tsx` | `#64CEFB` | `1` |
| Default `ShinyText` Shine Color | `src/components/ShinyText.tsx` | `#ffffff` | `1` |

---

## 10-Step Customisation Walkthrough

### Step 1 — Install Dependencies and Start the Local Dev Server
Open a terminal in the extracted folder and run:
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (typically `http://localhost:5173`) to preview your edits with instant Hot Module Replacement.

### Step 2 — Change the Brand Name and Circular Logo
Open `src/App.tsx` and locate `#brand-logo`. Replace `DesignPro` with your academy or platform name. You can also adjust the outer circle (`w-7 h-7 rounded-full border-2 border-white`) or inner dot (`w-2.5 h-2.5 rounded-full bg-white`), or replace them with your own `<svg>` mark. Remember to update `<title>` and `og:title` in `index.html`.

### Step 3 — Replace the Looping Background Video
In `src/App.tsx`, update `VIDEO_URL` at the top of the file:
```ts
export const VIDEO_URL = 'https://your-cdn.example.com/your-hero-loop.mp4';
```
Use an H.264 MP4 encoded with `-movflags +faststart` and no audio track so browsers autoplay it immediately.

### Step 4 — Update the Pill Navigation Links
In `src/App.tsx`, edit the `NAV_ITEMS` array:
```ts
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about-us' },
  { label: 'Courses', href: '#courses' },
  { label: 'Instructors', href: '#instructors' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact us', href: '#contact-us', hasArrow: true },
];
```
Both the desktop pill navigation (`#desktop-nav`) and the mobile dropdown (`#mobile-nav-drawer`) read from `NAV_ITEMS` automatically.

### Step 5 — Edit the Two-Column Sub-Header Copy
In `src/App.tsx`, find `#top-info-section` (`#top-left-copy` and `#top-right-stat`). Replace the left mission statement and the right-aligned milestone text (`8000+ Talented Designers Launched !`) with your own program metrics.

### Step 6 — Customise the Eyebrow and Main Two-Line Headline
In `src/App.tsx`, locate `#hero-eyebrow` (`Seats for Next Program Opening Soon`) and `#hero-heading`. Update Line 1 (`Become`) and the `text` prop passed to `<ShinyText text="Product Leader." />`.

### Step 7 — Tune the `ShinyText` Gradient Colors, Angle, and Speed
In `src/App.tsx` (or defaults in `src/components/ShinyText.tsx`), adjust the props on `<ShinyText />`:
- `baseColor="#64CEFB"` — base text colour
- `shineColor="#ffffff"` — moving highlight colour
- `speed={3}` — sweep duration in seconds (lower = faster)
- `spread={100}` — linear gradient angle in degrees

### Step 8 — Customise the CTA Button and Enrollment Modal Tracks
In `src/App.tsx`, update `COHORT_TRACKS` to list your real courses or cohorts, and edit the button label inside `#hero-cta` (`Apply for Next Enrollment`).

### Step 9 — Connect the Enrollment Form to Your Backend or CRM
In `src/App.tsx`, locate `handleEnrollSubmit`. Replace the client-side `setSubmitted(true)` call with a `fetch()` POST request to your admissions webhook, Formspree endpoint, or CRM API.

### Step 10 — Build and Deploy
Run the production build:
```bash
npm run build
```
Upload the generated `dist/` directory to Vercel, Netlify, Cloudflare Pages, AWS S3 + CloudFront, or any static web host.

---

## 12 Ready-to-Copy AI Prompts

1. **Rebrand for an AI Engineering Bootcamp:**
   > "In `src/App.tsx` and `index.html`, rebrand `DesignPro` to `NeuralForge`, change the headline to `Become` / `AI Systems Architect.`, update the stat to `12,400+ Engineers Graduated !`, and update `COHORT_TRACKS` for LLM engineering cohorts."
2. **Swap `ShinyText` Palette to Gold & Champagne:**
   > "In `src/App.tsx`, update `<ShinyText />` so `baseColor` is `#E5B869`, `shineColor` is `#FFFDF7`, `speed` is `2.5`, and `spread` is `110`, and update the modal accent colour to match."
3. **Add a Video Poster and Dark Scrim Toggle:**
   > "In `src/App.tsx`, add a `poster` attribute to `#hero-video` and an optional `bg-black/30` overlay div between the video and the `z-10` content container."
4. **Connect Navigation Links to Multi-Section Scroll Targets:**
   > "In `src/App.tsx`, update `handleNavClick` so non-modal links smoothly scroll to matching section IDs (`document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })`) while keeping `Contact us` opening the modal."
5. **Connect the Enrollment Form to Formspree:**
   > "In `src/App.tsx`, update `handleEnrollSubmit` to send `{ name: applicantName, email: applicantEmail, track: selectedTrack }` via `fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: ... })` with loading and error states."
6. **Add a Portfolio URL Field to the Enrollment Modal:**
   > "In `src/App.tsx`, add an optional `Portfolio or LinkedIn URL` input field (`type='url'`) to `#enrollment-modal` and include it in the submission state."
7. **Respect `prefers-reduced-motion` in `ShinyText` and Video:**
   > "Update `src/components/ShinyText.tsx` and `src/App.tsx` to detect `window.matchMedia('(prefers-reduced-motion: reduce)')` and pause the `useAnimationFrame` sweep and background video when enabled."
8. **Add a Cohort Countdown Badge Next to the Eyebrow:**
   > "In `src/App.tsx`, add a live countdown pill above `#hero-eyebrow` showing days and hours until the next cohort deadline (`Nov 15, 2026`)."
9. **Add a Secondary 'Download Syllabus' Button:**
   > "In `src/App.tsx`, place a secondary glassmorphic pill button (`Download Syllabus PDF`) next to `#hero-cta` in a responsive flex row."
10. **Switch Heading Font to Plus Jakarta Sans:**
    > "In `index.html` and `src/index.css`, load `Plus Jakarta Sans` from Google Fonts and apply it to `#hero-heading` while keeping `Inter` for body and navigation text."
11. **Add Language Switcher (EN / VI):**
    > "In `src/App.tsx`, extract all UI copy into a dictionary (`en` and `vi`) and add a compact `EN | VI` pill toggle in the header next to the navigation bar."
12. **Export Prebuilt Static Bundle to `built/` Automatically:**
    > "In `package.json`, add a `postbuild` script that copies `dist/*` into `built/` so the prebuilt static snapshot always stays in sync after `npm run build`."
