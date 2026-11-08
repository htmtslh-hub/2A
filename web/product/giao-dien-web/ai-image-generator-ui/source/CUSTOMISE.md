# Customisation Guide — AI Image Generator UI (`ai-image-generator-ui`)

This guide covers every editable token, copy block, media asset, and interactive module in `index.html`, verified against the **ForgeScore v2.0** product standard.

## Literal Edit Map (Verified Occurrence Counts)

| File | Literal String | Count | Purpose |
| :--- | :--- | :---: | :--- |
| `index.html` | `AI` | 3 | Primary brand name & title across header, hero, and footer |
| `index.html` | `--bg:` | 1 | Primary canvas background token in :root |
| `index.html` | `--accent:` | 1 | Primary interactive accent token in :root |
| `index.html` | `--font-display:` | 1 | Display heading font family token in :root |
| `index.html` | `<section` | 2 | Semantic content sections inside main |
| `index.html` | `role="dialog"` | 1 | Interactive specification modal / drawer dialog |

---

## 10-Step Customisation Walkthrough

### Step 1: Update Brand Name, Page Title & Meta Tags
Open `index.html` and search for the brand name inside the `<title>`, `<meta name="description">`, `<header>` wordmark, and `<footer>` copyright notice to replace them with your brand identity.

### Step 2: Configure the 3-Layer CSS Design Tokens
Locate the `:root` block inside `<style>` and adjust `--bg`, `--surface`, `--fg`, `--muted`, `--accent`, `--accent-text`, and `--on-accent` to re-skin the entire interface in one place.

### Step 3: Change Display & Body Typography
Update the Google Fonts `<link>` in `<head>` and modify `--font-display`, `--font-sans`, and `--font-mono` in `:root`. Fluid `clamp()` sizing automatically adapts across Desktop (1440px), Laptop (1024px), Tablet (768px), and Mobile (375px/320px).

### Step 4: Customise the Hero Headline & Value Proposition
Edit the single `<h1>` element and the lead paragraph directly beneath it. Keep the headline concise (2 to 6 words) so the display scale preserves its visual hierarchy.

### Step 5: Swap Primary Visuals, Cutouts & Background Media
Replace the WebP artwork inside `assets/` or inline SVG illustrations with your own high-resolution photography. Ensure `alt` text and `width`/`height` attributes remain intact.

### Step 6: Edit Interactive Live Telemetry & Filter Modules
Locate the interactive live component section (tabs, calculator, live filter, or variant switcher) in `<main>` and update its `data-*` attributes in the inline `<script>` block.

### Step 7: Update Bento Grid Specifications & Metrics
Search for `data-counter` on the metric readout elements. Change both the `data-counter` numeric attribute and `data-suffix` so the `IntersectionObserver` counter animates to your real numbers.

### Step 8: Configure Case Studies, Cards & CTAs
Update the card titles, tags, and action buttons inside the showcase sections. Any modal trigger button opens the interactive detail modal.

### Step 9: Customise the Interactive Modal / Drawer Dialog
Locate the `role="dialog" aria-modal="true"` element near the bottom of `index.html`. Customise the default specification copy, action button label, and keyboard `Escape` close behaviour.

### Step 10: Adjust Motion Physics & In-Session Pause Controls
All animations run smoothly by default using hardware-accelerated `transform` and `opacity` with `cubic-bezier(0.22, 1, 0.36, 1)`. Users can pause or resume motion at any time via `#motionToggleBtn`.

---

## 12 Copy-Ready AI Customisation Prompts

### Prompt 1: Complete Brand & Palette Re-Skin
```text
Update index.html for "AI Image Generator UI" (ai-image-generator-ui) to rebrand it for [YOUR BRAND NAME]. Change the :root CSS tokens (--bg, --surface, --fg, --accent, --accent-text, --on-accent) to a [DARK/LIGHT] palette using [PRIMARY HEX] and [ACCENT HEX], while keeping WCAG AA contrast on all buttons and badges.
```

### Prompt 2: Hero Headline & Subheadline Rewrite
```text
Rewrite the <title>, <meta name="description">, <h1>, and hero lead paragraph in index.html for a [YOUR INDUSTRY] product that helps [TARGET AUDIENCE] achieve [KEY OUTCOME]. Do not use generic AI clichés.
```

### Prompt 3: Interactive Live Component Customisation
```text
In index.html, update the interactive live widget / filter / calculator so its options, presets, and real-time output metrics reflect [YOUR PRODUCT FEATURES AND PRICING]. Keep all ARIA attributes and keyboard handlers working.
```

### Prompt 4: Metric Counter & Telemetry Data Update
```text
Locate all [data-counter] elements in index.html and update their target numbers, suffixes, and labels to showcase our real KPIs: [KPI 1], [KPI 2], and [KPI 3]. Keep font-variant-numeric: tabular-nums enabled.
```

### Prompt 5: Bento Grid Architecture & Feature Cards
```text
Replace the feature cards inside index.html with our 3 core capabilities: [CAPABILITY 1], [CAPABILITY 2], and [CAPABILITY 3], including custom inline SVG icons with viewBox="0 0 24 24" and aria-hidden="true".
```

### Prompt 6: Showcase / Case Study Cards Update
```text
Update the project/case-study cards in index.html with our latest launches: [PROJECT 1], [PROJECT 2], and [PROJECT 3]. Update each card's modal trigger so clicking opens the detail modal.
```

### Prompt 7: Typography Pairing Swap
```text
Replace the Google Fonts import and :root font tokens (--font-display, --font-sans, --font-mono) in index.html with [DISPLAY FONT] for headings and [BODY FONT] for body copy, maintaining fluid clamp() font sizes.
```

### Prompt 8: Custom Inline SVG Hero Artwork
```text
Add or update an inline <svg viewBox="0 0 24 24" aria-hidden="true"> icon set inside index.html depicting [YOUR PRODUCT OR CONCEPT] using the current :root --accent colors.
```

### Prompt 9: Interactive Modal / Booking Drawer Conversion
```text
Convert the role="dialog" modal in index.html into an interactive [BOOKING / DEMO REQUEST / SPECIFICATION] dialog with accessible form fields (label + input), validation feedback, and Escape key handling.
```

### Prompt 10: Pricing / Tier Matrix Customisation
```text
Update the tier or route comparison section in index.html to display clear options ([OPTION 1], [OPTION 2], [OPTION 3]) with interactive selection toggles and tabular-nums pricing.
```

### Prompt 11: Navigation & Footer Sitemap Links
```text
Update the <header>, <nav>, and <footer> links in index.html to match our site architecture: [LINK 1], [LINK 2], [LINK 3], and [LINK 4], ensuring the .skip-link targets #main-content.
```

### Prompt 12: Performance & Accessibility Audit Check
```text
Audit index.html against ForgeScore v2.0: verify zero Emoji icons, zero transition: all, overflow-x: clip, <= 4 backdrop-filter declarations, visible :focus-visible outlines, and active #motionToggleBtn support.
```
