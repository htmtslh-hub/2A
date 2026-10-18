# Vesper.ai customisation guide

This guide takes you from the downloaded ZIP file to a website you can publish. Follow the steps in order the first time. Every AI prompt below is complete: copy it, attach the requested files, and let the AI ask you for any missing information.

## Before you begin

Prepare a computer, a modern browser, a text editor, and the ZIP file from your Forge Zone account. Keep the original ZIP unchanged. Never send passwords, API keys, payment details, or private customer data to an AI tool.

Vesper.ai is a single-viewport operational AI infrastructure landing page built in a single `index.html` with inline CSS and a compact JavaScript IIFE, accompanied by self-hosted `inter.woff2`, `instrument-serif-italic.woff2`, and the looping hero background video `hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4`. Reference copies of the CSS tokens and JavaScript helper are also provided in `assets/css/style.css` and `assets/js/main.js`. Replace sample brand copy, metrics and anchor URLs before publishing.

## Step 1 - Unzip and open the template

1. Download the ZIP file to a folder you can find easily.
2. Extract the whole ZIP. On Windows choose **Extract All**. On macOS double-click the ZIP.
3. Open the extracted folder until you see `index.html` beside `inter.woff2`, `instrument-serif-italic.woff2` and `hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4`.
4. Double-click `index.html`.
5. Try the navigation pills, action buttons, mobile menu (at narrow width) and `Pause motion` toggle before changing anything.
6. Open `README.md` and `CUSTOMISE.md` in a text editor.

## Step 2 - Keep the original and make a working copy

1. Keep the downloaded ZIP as your clean original.
2. Copy the extracted template folder and name the copy `website-working-copy`.
3. Edit only the working copy.
4. Save files as UTF-8 and keep their real extension.

## Step 3 - Prepare your business information

| Information | What to prepare |
|---|---|
| Brand name | The name shown in the header and browser tab |
| Main activity | What your AI product or platform provides |
| Audience | Teams or enterprises you serve |
| Main benefit | Headline promise and supporting lede |
| Key metrics | Three verified stats for the bottom bar |
| Main action | Sign-up URL, demo link, or contact destination |

## Step 4 - Start working with AI

**Prompt 01 - Set up my website editing assistant**

```text
I bought the Vesper.ai static website template from Forge Zone and want to turn
it into my own landing page. Read index.html, CUSTOMISE.md, README.md, and
LICENCE.txt first. Summarise the header, hero copy, action buttons, and bottom
stats bar, then ask me for my brand details in small steps before editing.
```

## Step 5 - Replace the brand, copy, and contact actions

**Prompt 02 - Personalise all website content**

```text
Replace the Vesper.ai demo brand, badge, two-line masked H1, lede paragraph,
and three bottom statistics in index.html with my verified business copy.
Preserve the .line-mask / .line-inner structure and all .appear animation
classes.
```

**Prompt 03 - Connect every button to the right destination**

```text
Update the href attributes for the four navigation pills (#benefits,
#how-it-works, #faqs, #pricing) and the three action buttons (#start, #access,
#demo) in index.html to point to my real URLs or sections.
```

## Step 6 - Change colours, fonts, video, or layout when needed

**Prompt 04 - Apply my colours and tokens safely**

```text
Update the CSS custom properties in :root inside index.html (--bg, --text,
--muted, --stat, --border, --border-soft) while preserving the liquid-metal
navigation pills and liquid-glass button shine effects.
```

**Prompt 05 - Replace the hero background video**

```text
Help me replace hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4
with my own looping H.264 MP4 background video while keeping autoplay, muted,
loop, playsinline, and the Pause motion control working.
```

**Prompt 06 - Translate the landing page**

```text
Translate all visible text and aria-labels in index.html into my target
language while keeping the two-line H1 mask layout and responsive breakpoints
intact.
```

**Prompt 07 - Add a modal or target section**

```text
Add a clean modal or section for my primary CTA in index.html using the same
liquid-glass border and dark aesthetic without breaking the 100dvh hero grid.
```

## Step 7 - Test before publishing

**Prompt 08 - Audit the final website**

```text
Audit index.html for leftover demo copy, broken links, responsive behaviour at
320 px, 375 px, 820 px and 1440 px, keyboard navigation, and the session-only
Pause motion button.
```

## Step 8 - Publish by uploading the website folder

**Prompt 09 - Guide me through publishing**

```text
Guide me step by step to deploy index.html, the two .woff2 font files, and the
.mp4 hero video to a static hosting provider (Vercel, Netlify, or Cloudflare
Pages).
```

## Step 9 - Connect a custom domain if needed

**Prompt 10 - Connect my domain**

```text
Help me connect my custom domain and verify HTTPS using the exact DNS records
provided by my static host.
```

## Step 10 - Update and recover safely

**Prompt 11 - Update one part safely**

```text
Change only the requested text or link in index.html while preserving all CSS
keyframes, SVG noise overlay, and JavaScript fallback logic.
```

**Prompt 12 - Diagnose a display or video issue**

```text
Help me troubleshoot any video playback, font loading, or mobile menu issue in
index.html without adding external libraries.
```

## Vesper.ai editing map

| File | Literal text or selector | Count | Edit |
|---|---|---:|---|
| `index.html` | `Vesper.ai — Operational AI Infrastructure` | 1 | Document `<title>` |
| `index.html` | `Operational AI Infrastructure` | 2 | Title and hero `.badge` text |
| `index.html` | `AI agents` | 1 | Italic `Instrument Serif` `<em>` inside H1 line 1 |
| `index.html` | `Start for Free` | 1 | Header solid CTA button |
| `index.html` | `Get Early Access` | 1 | Hero primary solid CTA button |
| `index.html` | `Watch Demo` | 1 | Hero ghost CTA button |
| `index.html` | `hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4` | 1 | Hero background MP4 video source |
| `index.html` | `.stat` | 3 | Three bottom performance statistics |
