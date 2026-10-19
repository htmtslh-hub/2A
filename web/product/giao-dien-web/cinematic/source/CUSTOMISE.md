# Customising Cinematic (`v1.0.0`)

This guide walks you through customising **Cinematic** in 10 clear steps, provides a verified literal string map for fast search-and-replace, and includes 12 ready-to-copy AI prompts.

---

## Verified Literal Edit Map

Every string below has been counted against the source files so you can locate and replace values with confidence:

| Target Element | File | Exact Literal String | Occurrences in File |
|---|---|---|---|
| Brand Logo Text | `src/App.tsx` | `CINEMATIC` | `1` |
| Page Title & OpenGraph Title | `index.html` | `CINEMATIC — Step Through. Work Smarter.` | `2` |
| Video Background URL Constant | `src/App.tsx` | `VIDEO_URL` | `2` |
| Default IMDB Rating | `src/App.tsx` | `8.7/10 IMDB` | `1` |
| Default Runtime | `src/App.tsx` | `132 min` | `1` |
| Default Release Date | `src/App.tsx` | `April, 2025` | `1` |
| Default Hero Title | `src/App.tsx` | `Step Through. Work Smarter.` | `1` |
| Default Hero Description | `src/App.tsx` | `A voyage through forgotten realms, where past and future intertwine.` | `1` |
| Primary Solid CTA Label | `src/App.tsx` | `Watch Now` | `1` |
| Secondary Liquid-Glass CTA Label | `src/App.tsx` | `Learn More` | `1` |
| Previous Pill Button Label | `src/App.tsx` | `Previous` | `1` |
| Next Pill Button Label | `src/App.tsx` | `Next` | `1` |

---

## 10-Step Customisation Walkthrough

### Step 1 — Install Dependencies and Start the Local Dev Server
Open a terminal in the extracted folder and run:
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (typically `http://localhost:5173`) to preview your edits with Hot Module Replacement.

### Step 2 — Change the Brand Logo Text
Open `src/App.tsx` and locate `#brand-logo`. Replace `CINEMATIC` with your streaming platform or studio name, and update `<title>` and `og:title` in `index.html`.

### Step 3 — Replace the Background Video
In `src/App.tsx`, update `VIDEO_URL` at the top of the file:
```ts
export const VIDEO_URL = 'https://your-cdn.example.com/your-trailer-loop.mp4';
```
Use an H.264 MP4 encoded with `-movflags +faststart` so it begins playing immediately across all browsers.

### Step 4 — Update the Navigation Links and Stagger Delays
In `src/App.tsx`, edit the `NAV_LINKS` array:
```ts
export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Movies', href: '#movies', delay: '100ms' },
  { label: 'TV Series', href: '#tv-series', delay: '150ms' },
  { label: "Editor's Pick", href: '#editors-pick', delay: '200ms' },
  { label: 'Interviews', href: '#interviews', delay: '250ms' },
  { label: 'User Reviews', href: '#user-reviews', delay: '300ms' },
];
```
Both the desktop navigation bar (`#desktop-nav`) and the mobile dropdown (`#mobile-menu`) render from `NAV_LINKS`.

### Step 5 — Edit the Featured Movie Metadata, Title, and Description
In `src/App.tsx`, update `FEATURED_SLIDES[0]` (and any additional slides in `FEATURED_SLIDES`):
```ts
{
  rating: '8.7/10 IMDB',
  duration: '132 min',
  releaseDate: 'April, 2025',
  title: 'Step Through. Work Smarter.',
  description: 'A voyage through forgotten realms, where past and future intertwine.',
}
```

### Step 6 — Customise the `Watch Now` and `Learn More` CTA Buttons
In `src/App.tsx`, locate `#watch-now-btn` and `#learn-more-btn`. Update their labels or attach `onClick` handlers / `<a href="...">` routes to launch your video player or film detail page.

### Step 7 — Adjust the Bottom Blur Overlay Height
Open `src/index.css` and inspect `.bottom-blur-mask`:
```css
.bottom-blur-mask {
  -webkit-mask-image: linear-gradient(to top, black 0%, transparent 45%);
  mask-image: linear-gradient(to top, black 0%, transparent 45%);
}
```
Increase or decrease `45%` to control how far up the viewport the `backdrop-blur-xl` effect reaches.

### Step 8 — Tune the `.liquid-glass` Border Glow and Blur
In `src/index.css`, inspect `.liquid-glass` and `.liquid-glass::before`. You can adjust `backdrop-filter: blur(4px)`, the `padding: 1.4px` border thickness, or the `linear-gradient(180deg, ...)` stop opacities.

### Step 9 — Adjust the `blurFadeUp` Entrance Keyframes or Stagger Timing
In `src/index.css`, `@keyframes blurFadeUp` controls the initial blur (`blur(20px)`), vertical offset (`translateY(40px)`), and duration (`1s ease-out`). Inline `style={{ animationDelay: '...' }}` attributes in `src/App.tsx` control the `0ms`–`900ms` sequence.

### Step 10 — Build and Deploy
Run the production build:
```bash
npm run build
```
Deploy the generated `dist/` folder to Vercel, Netlify, Cloudflare Pages, AWS S3 + CloudFront, or any static host.

---

## 12 Ready-to-Copy AI Prompts

1. **Add Per-Slide Background Video URLs:**
   > "In `src/App.tsx`, add a `videoUrl` field to `FeaturedSlide` in `FEATURED_SLIDES` so clicking `#prev-btn` or `#next-btn` crossfades `#hero-video` to a different trailer stream."
2. **Open a Fullscreen Trailer Player Modal on 'Watch Now':**
   > "In `src/App.tsx`, add a `playerOpen` state so clicking `#watch-now-btn` opens a `z-50` fullscreen video player modal with playback controls and `Escape` key dismissal."
3. **Add an Interactive Search Overlay on Clicking 'Search':**
   > "In `src/App.tsx`, wire `#desktop-search-btn` and the mobile search button to open a `.liquid-glass` search bar overlay that filters `FEATURED_SLIDES` by title and description."
4. **Open a Film Synopsis Drawer on 'Learn More':**
   > "In `src/App.tsx`, make clicking `#learn-more-btn` slide out a right-hand `.liquid-glass` drawer displaying cast, director, audio formats (Dolby Atmos, 4K HDR), and critic quotes."
5. **Add an Audio Mute / Unmute Liquid-Glass Toggle:**
   > "In `src/App.tsx`, add a `.liquid-glass` circular button with Lucide `VolumeX` / `Volume2` icons next to `#desktop-user-btn` that toggles `muted` on `#hero-video`."
6. **Add Auto-Advance Progress Dots Above 'Previous' / 'Next':**
   > "In `src/App.tsx`, add a 10-second auto-advance timer with pill progress indicators above `#prev-btn` and `#next-btn` that pauses when the user hovers `#hero-content`."
7. **Respect `prefers-reduced-motion` for Video and Blur-Fade-Up:**
   > "In `src/index.css` and `src/App.tsx`, add a `@media (prefers-reduced-motion: reduce)` rule that disables `.animate-blur-fade-up` blur/translation and pauses `#hero-video`."
8. **Add Genre Badges Next to the Metadata Row:**
   > "In `src/App.tsx`, add a `genres: string[]` property to `FeaturedSlide` and render `.liquid-glass` mini-pills (`Sci-Fi`, `Chronicle`, `IMAX`) inside `#metadata-row`."
9. **Add a Watchlist Bookmark Button Next to 'Learn More':**
   > "In `src/App.tsx`, add a `.liquid-glass` rounded-full button with Lucide `Bookmark` / `Check` icons next to `#learn-more-btn` that persists saved titles in `localStorage`."
10. **Switch Headline Font to Syne or Cinzel:**
    > "In `index.html` and `src/App.tsx`, load `Cinzel` from Google Fonts and apply it to `#hero-title` and `#brand-logo` while keeping `Inter` for navigation and metadata."
11. **Add Keyboard Shortcut Hints (`←` / `→`) on Navigation Buttons:**
    > "In `src/App.tsx`, add subtle `kbd` badges (`←` and `→`) inside `#prev-btn` and `#next-btn` on desktop (`hidden lg:inline-block`) to highlight keyboard arrow support."
12. **Auto-Sync `built/` Snapshot After `npm run build`:**
    > "In `package.json`, add a `postbuild` script that copies `dist/*` into `built/` so the prebuilt static snapshot always stays updated."
