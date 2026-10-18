# Customise Solaris Gate

This guide helps you customise **Solaris Gate** — Either on your own in a text editor or by working with an AI coding assistant (ChatGPT, Claude, Gemini, Cursor, Windsurf, or Antigravity). Because the entire product lives inside a single self-contained `index.html` file with inline `<style>` and `<script>`, you only ever need to edit one runtime file.

---

## Editing Map (Verified Literal Counts in `index.html`)

Use the exact search strings below in your editor (`Ctrl+F` / `Cmd+F`) to jump directly to each customisable area:

| File | Exact Search Literal | Count | Line(s) | What It Controls |
|---|---|---:|---|---|
| `index.html` | `Solaris Gate` | 4 | 6, 7, 8, 584 | Browser `<title>`, `<meta name="description">`, `<meta property="og:title">`, and `#floating-logo` `alt` text |
| `index.html` | `<title>` | 1 | 6 | Browser tab title |
| `index.html` | `href="#` | 3 | 594 | Header navigation pill links (`#about`, `#explore`, `#planets`) |
| `index.html` | `<video` | 6 | 576, 577, 578, 581, 609, 619 | 3 planet background videos, 1 preloader video, 1 hidden portal video pixel source, 1 hidden transition video pixel source |
| `index.html` | `aria-label=` | 5 | 580, 593, 600, 603, 608 | Accessible region and control labels in HTML (`#portal` is also updated dynamically via `setAttribute('aria-label', ...)` on line 782) |
| `index.html` | `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P` | 9 | 11, 576, 577, 578, 581, 584, 609, 610, 629 | Base URL for the favicon, floating SVG logo, 4 MP4 videos, Mercury JPEG, and JS `BASE` constant |
| `index.html` | `const planets =` | 1 | 636 | Left sidebar list of 8 solar system planets |
| `index.html` | `const states =` | 1 | 638 | Planet state machine (`mars`, `earth`, `venus`), destination numbers (`[03]`, `[02]`, `[06]`), portal media URLs, and 4-row fact tables |
| `index.html` | `Preparing orbit…` | 1 | 620 | Loading status text displayed while a transition video buffers |
| `index.html` | `<span class="cursor-label">Enter</span>` | 1 | 622 | Custom cursor label shown when hovering over the central portal |

### Important Technical Notes Before Editing

- **Canvas-driven portal rendering**: `#portal-video` and `#portal-image` inside `<button id="portal">` are intentionally hidden (`visibility: hidden; width: 1px; height: 1px`). Their pixels are sampled every animation frame onto `#portal-canvas` (`z-index: 3`) inside a 3D perspective-projected rounded rectangle. Do not remove `#portal-video`, `#portal-image`, `#portal-canvas`, or `#scene-canvas`.
- **HTML & JS media URLs must match**: Initial media URLs appear in both the HTML markup (lines 576–610) and the JavaScript constants (`BASE`, `MARS_BG`, `TO_EARTH`, `TO_VENUS`, `TO_MARS`, `MERCURY` on lines 629–634). When swapping a video or image, update both the HTML attribute and the matching JS constant.
- **Video codecs**: In the default remote asset set, `MARS_BG`, `TO_VENUS`, and `TO_MARS` are encoded in HEVC (`hvc1` / H.265 10-bit), while `TO_EARTH` is H.264 (`avc1`). For universal playback across browsers or systems without hardware HEVC decoding, replace the video URLs with H.264 (`avc1`, `yuv420p`) MP4 files.
- **Local `@font-face` declarations**: The four `@font-face` rules (`SF Pro` 400/700, `SF Pro Thin` 100, and `Aalto` 400) look for locally installed fonts first and fall back cleanly to `Arial, sans-serif` and `'Arial Narrow', sans-serif`. No font files are bundled in the ZIP.

---

## 10-Step Customisation Workflow

### Step 1 — Unzip and open
Extract the entire `solaris-gate.zip` archive to a folder on your computer and open `index.html` in a modern desktop browser (Chrome, Edge, Firefox, or Safari) with an active internet connection so the remote CloudFront media can load. Confirm that the preloader counts to `100%`, the logo docks into the top-left corner, and clicking the central portal travels from **Mars** to **Earth** and then **Venus**.

### Step 2 — Make a backup
Keep the original `solaris-gate.zip` untouched. Before making any edits, duplicate the extracted `solaris-gate/` folder (for example, `solaris-gate-working/`) and perform all edits inside the working copy.

### Step 3 — Prepare your verified content and assets
Gather your real project or brand name, navigation links, destination names, 4-row fact pairs (`dt` label + `dd` description) for each stop, SVG logo, and replacement H.264 `.mp4` videos or `.jpg`/`.webp` images. Mark any undecided details clearly so neither you nor an AI assistant invents placeholder facts.

### Step 4 — Set up your AI assistant
Open a new chat with your preferred AI coding assistant. Attach your current `index.html`, `README.md`, `CUSTOMISE.md`, and `LICENCE.txt`, then paste **Prompt 01** below. Wait for the assistant to confirm the file structure and ask clarifying questions before it edits any code.

### Step 5 — Replace brand copy, planet facts, and links
Use **Prompt 02** to update the brand name, metadata, planet titles, and `states` fact tables, and **Prompt 03** to wire the header navigation (`About`, `Explore`, `Planets`) and `Menu` button to real destinations or modal drawers. Reload the browser after each change and test every link.

### Step 6 — Customise colours, typography, or media assets
Use **Prompts 04–07** to adjust the dark space backdrop (`#090807` / `#0a0908`), link web fonts (`woff2`), swap the floating SVG logo and planet videos/images, translate the interface, or add a fourth destination state to the portal chain. Always keep the HTML `<video>`/`<img>` tags and JS constants in sync.

### Step 7 — Audit and test before publishing
Use **Prompt 08** to verify desktop (`1440×900`), tablet (`820×1180`, `768×1024`), and mobile (`375×812`, `320×740`) viewports, keyboard focus (`Tab` / `Enter` on `#portal`), `prefers-reduced-motion`, browser console/network cleanliness, and full travel transitions (`Mars -> Earth -> Venus`). Record what was tested in a real browser versus what remains untested.

### Step 8 — Publish to a static host when authorised
Use **Prompt 09** when you are ready to deploy to Cloudflare Pages, Vercel, Netlify, GitHub Pages, or S3/CloudFront. Upload only `index.html` (plus your local `assets/` folder if you switched from remote URLs to self-hosted media). Never upload backup ZIPs or private notes.

### Step 9 — Connect a custom domain (optional)
Use **Prompt 10** along with the exact DNS instructions shown in your hosting dashboard. Back up your existing DNS zone first, never delete `MX` or `TXT` email records, and verify both root (`example.com`) and `www` over HTTPS.

### Step 10 — Maintain, update, and recover
Use **Prompts 11 and 12** for future single-feature updates or troubleshooting. Always send your latest `index.html` when starting a new AI chat, test locally before redeploying, and roll back to your Step 2 backup if an edit introduces regressions.

---

## 12 Ready-to-Use AI Prompts

Copy and paste the relevant prompt into your AI coding assistant alongside your current `index.html`.

### Prompt 01 — Set up my editing assistant

```text
I am editing Solaris Gate (`index.html`). Use the exact files I provide in this chat, not a remembered version. First, read `index.html`, `README.md`, `CUSTOMISE.md`, and `LICENCE.txt` completely. Confirm that all required files are present and name any missing files without guessing. Summarise how the preloader, canvas 3D portal (`#portal-canvas` and `#scene-canvas`), `states` data model (`mars -> earth -> venus`), and demo-only header controls (`About`, `Explore`, `Planets`, `Menu`) currently work. Then ask me in small, clear groups for my brand name, target audience, replacement destinations/facts, navigation URLs, and preferred language. Do not edit any code yet. When we do make edits later, always return the complete updated `index.html` with exact file paths, no ellipses or omitted blocks, state honestly what you tested versus did not test, preserve the single-file plain HTML/CSS/JS architecture, and never publish or deploy without my explicit instruction.
```

### Prompt 02 — Personalise brand metadata, destinations, and facts

```text
I am editing Solaris Gate (`index.html`). Use the current file I provide and only my verified project information below. If any fact, label, or description is missing, ask me before editing. Update:
1. `<title>`, `<meta name="description">`, `<meta property="og:title">`, `<meta property="og:description">`, and `#floating-logo[alt]`.
2. The `planets` sidebar array (`const planets = [...]`) and the `states` object (`name`, `next`, `number`, and the 4 `[key, value]` rows in `facts` for each state).
3. The initial HTML text inside `#planet-title`, `#next-number`, `#next-name`, and `#portal[aria-label]` so the initial markup matches the starting state in JS.
Do not invent statistics, prices, testimonials, or URLs. Keep the layout, CSS animations, and `--tx` responsive title offset intact. Return the complete updated `index.html` with no placeholders or ellipses, update the Editing Map counts if changed, and state clearly what you tested and did not test.
```

### Prompt 03 — Connect header navigation links and Menu button

```text
I am editing Solaris Gate (`index.html`). Use the current file I provide. Audit every link and button in the file (`nav.nav a` for About, Explore, Planets; `button.menu`; and `button#portal`) and list its current destination or behaviour. Ask me for the real URLs, `mailto:`, `tel:`, or modal/drawer content I want for the header links and `Menu` button. Connect only the real destinations I provide while preserving the `#portal` travel interaction (`travel()`) and custom cursor behaviour (`cursor: none` on desktop mouse pointers). Do not add fake newsletter forms, fake booking flows, or simulated checkout alerts. Return a click-test verification table and the complete updated `index.html` with no ellipses, and state what you did and did not test.
```

### Prompt 04 — Customise colours, glassmorphism, and typography

```text
I am editing Solaris Gate (`index.html`). Use the current file I provide. Ask for my colour palette and font preferences if I have not specified them yet. Inspect `:root`, `.experience`, `.shade`, `.nav`, `.menu`, `.planet-content h1`, and the canvas fill/gradient values inside `draw()` and `drawShade()`. Update the palette and `@font-face` / web font links while preserving:
- High text contrast over both bright and dark video frames (`4.5:1` for body facts, `3:1` for display headings)
- Responsive `clamp()` sizing and `--tx` horizontal title alignment at desktop (`>900px`), tablet (`<=900px`), and mobile (`<=640px`)
- Zero external CSS/JS framework dependencies
Document any font licensing requirements, return the complete updated `index.html` with no ellipses, and state what you tested and did not test.
```

### Prompt 05 — Replace remote videos, portal images, and floating SVG logo

```text
I am editing Solaris Gate (`index.html`). Use the current file I provide. I want to replace one or more of the remote media assets (`MARS_BG`, `TO_EARTH`, `TO_VENUS`, `TO_MARS`, `MERCURY`, or `LOGO`). Ask me for the exact local relative paths (e.g. `./assets/...`) or CDN URLs and alt text if anything is unclear. Update BOTH:
1. The HTML attributes on `<link rel="icon">`, `#mars-background`, `#earth-background`, `#venus-background`, `#preloader-video`, `#floating-logo`, `#portal-video`, and `#portal-image`.
2. The JavaScript constants (`BASE`, `MARS_BG`, `TO_EARTH`, `TO_VENUS`, `TO_MARS`, `MERCURY`) so `render()` and `travel()` stay 100% synchronised with the DOM.
Ensure all `<video>` elements keep `muted playsinline preload="auto"` without `controls` or `autoplay`, and preserve the hidden `1px` pixel-source styling on `.portal video, .portal img`. Return the complete updated `index.html` with no ellipses and state what you tested and did not test.
```

### Prompt 06 — Translate the interface into another language

```text
I am editing Solaris Gate (`index.html`). Use the current file I provide. Ask which target language I want if I have not specified it. Translate all visible copy, `<html lang="...">`, `<title>`, meta descriptions, header navigation labels, loading status (`Preparing orbit…`), custom cursor label (`Enter`), `aria-label` attributes (both static HTML and dynamic `Travel to ${state.next}` in `render()`), and the `planets` / `states` fact tables into natural, idiomatic copy. Keep proper asset URLs and numeric figures accurate. Check that translated planet titles in `.planet-content h1` do not clip or overflow at `1440px`, `820px`, `375px`, and `320px`. Return the complete updated `index.html` with no ellipses and state what you tested and did not test.
```

### Prompt 07 — Add or remove a destination state in the portal travel chain

```text
I am editing Solaris Gate (`index.html`). Use the current file I provide. Ask me which planet/destination state I want to add, reorder, or remove, along with its background video/image, portal preview media, destination number (`[01]`–`[08]`), and 4 fact rows. Update:
1. `<div class="backgrounds">` so every state has its matching `.background` element.
2. `const planets` and `const states` in JavaScript.
3. The state transition chain inside `travel()` (including the terminal state guard or optional loop-back to the first state if I request looping).
Preserve the canvas freeze-frame handoff (`#scene-canvas`), staggered CSS animations, and error/timeout fallbacks. Return the complete updated `index.html` with no ellipses and state what you tested and did not test.
```

### Prompt 08 — Run a pre-publish quality audit

```text
I am editing Solaris Gate (`index.html`). Use the current file I provide. Audit the file and run real browser checks if Playwright or a browser tool is available. Check:
1. Viewports `1440x900`, `820x1180`, `768x1024`, `375x812`, and `320x740` for horizontal/vertical overflow and title clipping.
2. Preloader completion (`0%` to `100%`), logo docking into top-left, and initial Mars content reveal.
3. Portal travel sequence (`Mars -> Earth -> Venus`) and terminal click guard on Venus.
4. Keyboard accessibility (`Tab` to `#portal`, `Enter`/`Space` activation, visible focus indicator if added), `prefers-reduced-motion: reduce`, and fallback behaviour when a video codec cannot decode.
5. Console errors, uncaught page errors, failed network requests, and remaining demo `#` links.
Report `PASS`, `FAIL`, or `NOT TESTED` with concrete evidence for each check—never claim a static code reading was a real browser test.
```

### Prompt 09 — Publish the static site

```text
I am editing Solaris Gate (`index.html`). Use the current file I provide. Ask me which hosting platform I am using (Cloudflare Pages, Vercel, Netlify, GitHub Pages, or AWS S3/CloudFront) and whether I prefer browser drag-and-drop or CLI deployment. Give me step-by-step instructions to deploy only the runtime files (`index.html` and any local media folder), excluding backup ZIPs and internal review notes. Remind me never to paste passwords, API keys, or session tokens into chat. Tell me how to verify HTTPS, video streaming/CORS headers, and mobile rendering on the live URL.
```

### Prompt 10 — Connect a custom domain safely

```text
I am editing Solaris Gate (`index.html`). I want to connect a custom domain to my deployed site. Ask me for my domain registrar, DNS provider, hosting platform, whether I have existing email (`MX`/`TXT`) or subdomains on this domain, and the exact DNS records shown in my host's dashboard. Never invent IP addresses or CNAME targets. Walk me through exporting a DNS backup first, adding only the required `A`/`AAAA`/`CNAME` records without touching email records, and verifying root domain, `www` redirect, and SSL certificate provisioning.
```

### Prompt 11 — Update one specific part safely

```text
I am editing Solaris Gate (`index.html`). Use the current file I provide. Read the entire file first and ask me to confirm the exact scope of the small change I want if anything is ambiguous. Modify only that targeted part and its direct HTML/CSS/JS dependencies while keeping all other approved copy, animations, canvas math, and responsive rules untouched. Return the complete updated `index.html` with no ellipses, provide a quick local verification checklist, and explain how to roll back to my backup if needed.
```

### Prompt 12 — Diagnose and fix a visual or playback bug

```text
I am editing Solaris Gate (`index.html`). Use the current file I provide. Ask me what symptom I am seeing, what I expected instead, which browser/OS/device I used, and whether I opened the file via `file://` or `http://localhost`. Inspect the actual code for video codec compatibility (HEVC vs H.264), CORS/`drawImage` canvas tainting, timeout guards in `runPreloader()` and `travel()`, and responsive CSS media queries. Clearly separate verified root causes from hypotheses, apply the smallest safe fix without redesigning the page, return the complete updated `index.html` with no ellipses, and give me a step-by-step test to confirm the fix.
```

---

## Final Pre-Publish Checklist

- [ ] Original `solaris-gate.zip` and a clean working backup folder are saved safely.
- [ ] `<title>`, meta descriptions, and `#floating-logo[alt]` reflect your real brand name.
- [ ] Header links (`#about`, `#explore`, `#planets`) and the `Menu` button are either connected to real destinations or intentionally removed/disabled if not needed.
- [ ] All videos are encoded in universally supported H.264 (`avc1`, `yuv420p`) if you need playback on browsers/OSes without HEVC hardware decoding.
- [ ] You hold valid commercial licences for any local fonts (`SF Pro`, `Aalto`) or custom media assets you distribute publicly.
- [ ] Tested on desktop (`1440×900`), tablet (`820×1180`), and mobile (`375×812`) viewports with zero console errors.
- [ ] Never share hosting passwords, DNS tokens, or private API keys in an AI chat.
