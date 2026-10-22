# Customisation Guide — Gridwork Co (Create-Account Onboarding Hero)

This guide covers customising the **Gridwork Co** single-file create-account onboarding hero (`index.html`), including **10 step-by-step instructions**, **12 copy-paste AI prompts**, and a **literal string reference table**.

---

## 10 Customisation Steps

### Step 1 — Preview Locally
Open `index.html` directly in any modern browser (`file://`) or serve the directory over a local HTTP server:
```bash
npx serve .
```
No build step, framework, or package installation is required.

### Step 2 — Adjust the Artboard Scale & Grid Columns (`:root` & `.onboarding-shell`)
In the `<style>` block of `index.html`, `--u` scales all reference dimensions against the `1447×1087` artboard:
```css
--u: clamp(0.7px, min(calc(100vw / 1447), calc(100vh / 1087)), 2.4px);
```
The main `.onboarding-shell` uses `grid-template-columns: minmax(0, 1fr) max(calc(508.7 * var(--u)), 45%)` with `11.5u` top, `15.7u` bottom, and `15.6u` left padding.

### Step 3 — Customise the Botanical & Sage Colour Palette (`:root`)
Update the CSS custom properties in `:root` to re-theme the page:
- `--bg-page: #FDFEFD` (off-white page & cut-out background)
- `--ink: #101A20` (primary heading & tool name ink)
- `--text-secondary: #6E767C` and `--text-muted: #8A9196`
- `--line: #DCE0DD` (unselected `1u` card border)
- `--forest: #1F4D37` (wordmark & log-in link) and `--forest-selected: #1D4A35` (selected `2u` border & checkbox)
- `--btn-bg: #20513A` and `--btn-hover: #2A6247` (`Create account` pill button)
- `--sage-tint: #ECF2EC` (selected tool card background)

### Step 4 — Swap the Font Family (`Inter`)
Replace the Google Fonts `<link>` for `Inter` (`weights 400;500;600;700`) in `<head>` and update `font-family` on `html, body` if your brand uses a different typeface.

### Step 5 — Replace the Greenhouse Photo & Motion Video (`.photo-card`)
Inside `<section class="photo-card">`:
- Update `<img class="photo-media" src="...">` (`1356×1528`, `object-fit: cover; object-position: 50% 22%`).
- Update `<video id="greenhouseVideo" class="photo-media photo-video" src="...">` (`1020×1150`). The script automatically fades the video in (`0.8s`) via `.is-ready` once its first frame loads, and hides it when `prefers-reduced-motion: reduce` is enabled.

### Step 6 — Customise the Top-Left `61u` 4×4 Tile Pattern (`.tile-pattern`)
The corner cutout and frosted glass tiles live inside `<div class="tile-pattern">`:
- `.tile-cutout-origin` punches cell `(0,0)` in `#FDFEFD` with a `15u` bottom-right radius, paired with `.tile-notch` concave corner fillets along the top and left card edges.
- Six `.tile-frosted` cells (`61u × 61u`, `15u` radius, `rgba(255,255,255,0.5)`, `8u` blur) are positioned at `(2,0)`, `(3,1)`, `(0,2)`, `(2,2)`, `(1,3)`, and `(3,3)`.

### Step 7 — Edit the Bottom Glass & Freelancer Testimonial (`.testimonial`)
- Update the default quote inside `<blockquote class="testimonial-quote" id="testimonialQuote">`, the author `<div class="testimonial-name" id="testimonialName">Sofia Hernández</div>`, and the role `<div class="testimonial-role" id="testimonialRole">Garden Designer, Portland, OR</div>`.
- Edit the `testimonials` array in `<script>` to customise the additional slides cycled by `#prevTestimonialBtn` and `#nextTestimonialBtn`.

### Step 8 — Replace the Two-Leaf Wordmark & Form Heading (`#brandWordmark` & `#formHeading`)
- Edit the two-leaf SVG inside `<a href="#onboardingShell" class="wordmark" id="brandWordmark">` and the `<span class="wordmark-text">Gridwork Co</span>` label.
- Update `<h1 class="form-heading" id="formHeading">What tools do you use?</h1>` and `<p class="form-subline" id="formSubline">We’ll connect you with the best jobs.</p>`.

### Step 9 — Edit the `2×3` Tool Selection Cards (`#toolGrid`)
Each `<button class="tool-card" role="checkbox">` inside `#toolGrid` contains:
- A `41u` `.tool-icon` inline SVG (`Figma`, `Framer`, `Adobe XD`, `Webflow`, `Relume`, `Canva`).
- A `20u` `.tool-check` round checkbox at the top right.
- `.tool-name` and `.tool-domain` with an external-link arrow icon.
Add or remove `is-selected` and `aria-checked="true"` to change which tools start pre-selected.

### Step 10 — Connect the "Create account" & "Log in" Actions (`#createAccountBtn` & `#loginLink`)
In the `<script>` block, replace the `openModal('create')` and `openModal('login')` handlers with your real onboarding API endpoint, form submission, or authentication route.

---

## 12 Copy-Paste AI Prompts

1. **Rebrand for an Architectural & Interior Freelance Network (`ATELIER CO`):**
   > "In `index.html`, rebrand `Gridwork Co` to `Atelier Co`, update the six tools in `#toolGrid` to `Rhino 3D` (`rhino3d.com`), `AutoCAD` (`autodesk.com`), `Revit` (`autodesk.com`), `Blender` (`blender.org`), `V-Ray` (`chaos.com`), and `SketchUp` (`sketchup.com`), and change the testimonial author role to `Architectural Visualizer, Zurich`."
2. **Switch the Forest & Sage Palette to Deep Indigo & Lavender:**
   > "In `index.html`, update `:root` so `--forest` is `#232B6B`, `--forest-selected` is `#1E255E`, `--btn-bg` is `#252E72`, `--btn-hover` is `#313C8F`, `--sage-tint` is `#EEF0FA`, and update the `.photo-bottom-glass` gradient stops to `rgba(35, 43, 107, ...)`."
3. **Add a Tool Counter Badge Inside the Create Account Button:**
   > "In `index.html`, update the `.tool-card` click handler so `#createAccountBtn` dynamically shows the number of selected tools, e.g., `Create account (3 tools)`."
4. **Require at Least One Selected Tool Before Continuing:**
   > "In `index.html`, disable `#createAccountBtn` (`disabled` attribute and `opacity: 0.5`) whenever zero `.tool-card.is-selected` elements are active."
5. **Post Selected Tools to a Webhook or Onboarding API:**
   > "In `index.html`, update the `#createAccountBtn` click listener to send `{ tools: selected }` via `fetch('https://example.com/api/onboarding', { method: 'POST' })` before opening `#onboardingModal`."
6. **Add a Search / Filter Input Above the Tool Grid:**
   > "In `index.html`, insert a compact search input above `#toolGrid` that filters the six `.tool-card` buttons in real time by `data-tool` or `.tool-domain` text."
7. **Adjust the Default Selected Tools:**
   > "In `index.html`, make `Figma`, `Framer`, and `Webflow` the three initially selected cards (`class='tool-card is-selected'` and `aria-checked='true'`)."
8. **Auto-Advance the Testimonial Carousel Every 6 Seconds:**
   > "In `index.html`, add a `setInterval` in `<script>` that calls `renderTestimonial(currentTestimonial + 1)` every `6000ms` unless `reduceMotion` is true or the user hovers over `.testimonial`."
9. **Add a Step Progress Indicator Above the Heading:**
   > "In `index.html`, add a 3-dot onboarding step pill (`Step 2 of 3 · Workspace Stack`) between `#brandWordmark` and `.heading-wrap`."
10. **Convert the Right Form Panel to Dark Mode:**
    > "In `index.html`, change `--bg-page` to `#0D1512`, `--ink` to `#F2F6F4`, `--text-secondary` to `#9BA8A1`, `--line` to `#22332B`, and `--sage-tint` to `#162920` while keeping the `.tile-cutout-origin` and `.tile-notch` matched to `var(--bg-page)`."
11. **Make the Domain Label Open the Tool's Official Website in a New Tab:**
    > "In `index.html`, allow clicking `.tool-domain` to open `https://` + domain in a new tab (`window.open`) with `event.stopPropagation()` so clicking the domain link does not toggle the card selection."
12. **Adjust the Web Animations Entrance Speed:**
    > "In `index.html`, inside `runEntranceTimeline()`, scale all animation `duration` and `delay` values by `0.75` for a snappier `1.38s` onboarding reveal."

---

## Literal String Reference Table (`index.html`)

| Literal String | Occurrences | Location / Role |
| :--- | :---: | :--- |
| `Gridwork Co` | 10 | `<title>`, `<meta name="description">`, comments, `#brandWordmark`, `#modalBadge`, and JS modal copy |
| `What tools do you use?` | 1 | Form heading `#formHeading` (`h1`) |
| `We’ll connect you with the best jobs.` | 1 | Form subline `#formSubline` (`p`) |
| `I landed multiple paid projects within a couple of days–way more traction than I ever got elsewhere. Definitely my go-to freelance platform now!` | 2 | `#testimonialQuote` (`blockquote`) & initial `testimonials[0].quote` in JS |
| `Sofia Hernández` | 2 | `#testimonialName` & initial `testimonials[0].name` in JS |
| `Garden Designer, Portland, OR` | 2 | `#testimonialRole` & initial `testimonials[0].role` in JS |
| `Create account` | 2 | CSS comment & primary pill button `#createAccountBtn` |
| `Already have an account?` | 2 | CSS comment & secondary prompt `#loginPrompt` |
