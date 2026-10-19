# Customise NexLayer — The Next Layer of Intelligence

1. Extract all 4 files (`index.html`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) from `nexlayer.zip`. Keep the original ZIP archive as a backup and edit a working copy.
2. Open `index.html` in a modern browser (or serve the folder with any static HTTP server such as `npx serve .`). No build step, bundler, or Node.js installation is required.
3. Gather your real brand SVG mark, headline, subcopy, navigation links, primary/secondary CTA URLs, partner logos, and licensed background MP4 video (`H.264 yuv420p` for universal playback). Do not publish placeholder `logoipsum` marks as real endorsements.
4. When working with an AI coding assistant (ChatGPT, Claude, Gemini), upload `index.html` and `CUSTOMISE.md` and state your requested changes clearly. Never share private credentials or API keys. Ask the AI to preserve the single-file structure, `--u` / `--h` / `--m` responsive coordinate system, and return the complete updated `index.html`.
5. Update `<title>` and `<meta name="description">` in `<head>`, then update the two `.headline` `<span>` lines (`The Next Layer` / `of Intelligence`) and the two `.sub` `<span>` lines in `main.hero`. Keep line lengths balanced so they do not clip on desktop (`white-space: nowrap`).
6. Update the navigation links (`About`, `Features`, `FAQ`, `Contact`) in both `nav.links` (desktop header) and `ul.menu-list` (mobile overlay `#menu`), and update the CTA links (`Get Started` and `View Architecture`) in `header.topbar`, `nav.menu`, and `main.hero`.
7. Replace the four `.lg` partner items inside `.logos` with your real partner SVG icons and wordmarks, or remove `.logos` if you do not display partner marks.
8. To replace the full-bleed background video, update the `<source src="...">` inside `video.plate-video`. Keep the `.plate::after` bottom and side letterbox gradients on `#050505` so left-aligned typography and bottom partner logos remain legible.
9. Test across desktop (`1487×1058`, `1440×900`), tablet portrait (`820×1180`), and mobile portrait (`375×812`, `320×740`). Verify the frosted-glass `#burger` button toggle, staggered `.menu` item reveal, `Escape` key closing, and zero horizontal overflow.
10. Upload `index.html` (and any local video/font assets you added) to any static hosting provider (Vercel, Netlify, Cloudflare Pages, GitHub Pages, or S3/CloudFront) and keep a versioned backup of each release.

## Editing prompts

Copy one prompt below and attach `index.html` and `CUSTOMISE.md`. Every prompt preserves the single-file architecture, the `1487 × 1058` `--u`/`--h` desktop coordinate system, the `max-aspect-ratio: 11/10` portrait layout, and unrelated behavior.

1. **Initial audit & brand interview:** Read the attached `index.html` and `CUSTOMISE.md`. Summarize how the `--u` / `--h` / `--m` unit system, `.plate-video` fade overlays, and `#burger` / `#menu` mobile overlay work, then ask me in small groups for my brand mark, two-line headline, two-line subcopy, navigation links, CTA URLs, and partner logos. Do not edit code yet.
2. **Headline, subcopy & metadata replacement:** Replace `<title>`, `<meta name="description">`, the two `<span>` lines inside `h1.headline`, and the two `<span>` lines inside `p.sub` in `index.html` with my verified copy. Preserve the `<span>` line breaks and `--h` typography sizing, and return the complete updated `index.html`.
3. **Navigation & CTA link wiring:** Inspect `nav.links`, `a.pill-nav`, `nav.menu#menu`, and `.actions` in `index.html`. Ask me for my final navigation labels and destination URLs for `Get Started` and `View Architecture`, then update both desktop and mobile markup consistently so every link points to its real destination.
4. **Brand SVG & partner strip update:** Inspect `a.brand svg` (`viewBox="0 0 31.5 48.5"`) and `.logos` (`.lg1`–`.lg4`) in `index.html`. Ask me for my new brand SVG markup and partner logos, then update `a.brand` and `.logos` while preserving `--u` sizing on desktop and the `2×2` / `4-column` grid in portrait mode.
5. **Background video & gradient overlay tuning:** Inspect `.plate`, `video.plate-video`, and `.plate::after` in `index.html`. Ask for my new video URL/path and whether the focal point (`object-position: 43% center` on phone, `44% center` on tablet) or `#050505` fade stops need adjustment. Return the updated `index.html` and an `ffmpeg` command to encode an H.264 `yuv420p` MP4.
6. **Color tokens & typography customization:** Read `:root` (`--ink`, `--muted`, `--nav`, `--strip`, `--pill`, `--pill-ink`) and the `Manrope` / `IpsumMark` font declarations in `index.html`. Ask for my preferred color palette and font family, then update the CSS variables and `<link>` tags while keeping high contrast against the dark stage.
7. **Multilingual translation:** Ask which target language I want (e.g., Vietnamese, Japanese, German, French). Translate all visible text and `aria-label` attributes in `index.html` (`About`, `Features`, `FAQ`, `Contact`, `Menu`, `Get Started`, `View Architecture`, `.headline`, `.sub`) while ensuring the desktop `nowrap` lines fit within the `1487 × 1058` stage without colliding with the portal video.
8. **Adding an interactive modal for "Get Started" or "View Architecture":** Ask what interactive dialog (e.g., early-access request form or architecture diagram viewer) should open when clicking `.pill-cta` / `.pill-nav` or `.ghost`. Implement it inline in `index.html` matching the `#050505` frosted-glass aesthetic with keyboard `Escape` support.
9. **Pre-launch QA & accessibility audit:** Audit my edited `index.html` before launch. Check for leftover `logoipsum` placeholders, `#` dummy links, missing `aria-*` attributes, keyboard focus visibility, desktop line clipping, and `320px` mobile layout fit. Group findings into Blockers, Improvements, and Not Tested items.
10. **Static hosting deployment guide:** Ask which static host I use (Vercel, Netlify, Cloudflare Pages, GitHub Pages, or S3/CloudFront). Walk me step by step through deploying `index.html`, setting cache headers for video assets, and verifying HTTPS playback. Never ask for secret tokens.
11. **Custom domain & DNS setup:** Ask for my domain registrar and hosting provider, plus the `A` / `CNAME` records shown in my host's dashboard. Explain how to point `@` and `www` safely without breaking existing `MX` or `TXT` email records.
12. **Surgical layout or animation tweak:** Ask for the single specific adjustment I want (e.g., tweaking `--h` scaling, adjusting `.headline` top offset `230.5u`, or changing the `rise` animation timing). Modify only the necessary rules in `index.html` and return the complete file.

## Literal edit map

| Find | Count | File / effect |
|---|---:|---|
| `The Next Layer of Intelligence` | 1 | `index.html` `<title>` tag |
| `<span>The Next Layer</span>` | 1 | `index.html` `h1.headline` line 1 |
| `<span>of Intelligence</span>` | 1 | `index.html` `h1.headline` line 2 |
| `A unified infrastructure platform to help teams build,` | 2 | `index.html` `<meta name="description">` and `p.sub` line 1 |
| `ship, and scale AI systems with confidence.` | 2 | `index.html` `<meta name="description">` and `p.sub` line 2 |
| `<span>Get Started</span>` | 3 | `index.html` `.pill-nav`, `.menu-foot .pill`, and `.pill-cta` |
| `View Architecture` | 2 | `index.html` `.menu-foot .ghost` and `.actions .ghost` |
| `<span class="word">logoipsum` | 4 | `index.html` 4 partner wordmarks in `.logos` (`.lg1`–`.lg4`) |
| `hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4` | 1 | `index.html` `<video class="plate-video">` MP4 source URL |
| `--ink: #fafafa;` | 1 | `index.html` `:root` primary text color token |
