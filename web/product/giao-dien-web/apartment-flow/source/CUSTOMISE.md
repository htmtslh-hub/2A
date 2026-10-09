# Apartment Flow 1.0.0 — customise and publish

This guide takes you from the downloaded ZIP file to a website you can publish. Follow the steps in order the first time. Every AI prompt below is complete: copy it, attach the requested files, and replace the information in square brackets.

## Before you begin

Prepare a computer, a modern browser, a text editor, and the ZIP file from your Forge Zone account. Keep the original ZIP unchanged. Never send passwords, API keys, payment details, or private customer data to an AI tool.

Apartment Flow is a Vietnamese glass apartment presentation with four chapters and 240 local AI-generated camera frames. Your template is a static website built with HTML, CSS, and JavaScript. It does not include a backend, payment processing, or a working form submission service unless the product page explicitly says so.

## Step 1 - Unzip and open the template

1. Download the ZIP file to a folder you can find easily.
2. Extract the whole ZIP. On Windows choose **Extract All**. On macOS double-click the ZIP.
3. Open the extracted folder until you see `index.html` beside the `assets` folder.
4. Double-click `index.html`. If it opens in a text editor, use **Open with** and choose your browser.
5. Scroll through the full page and try the menu and links before changing anything.
6. Open `README.md` and `CUSTOMISE.md` in a text editor.

Expected structure:

```text
template-folder/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── frames/frame-0001.webp through frame-0240.webp
├── CUSTOMISE.md
├── README.md
├── LICENCE.txt
└── THIRD-PARTY-NOTICES.txt
```

**Correct result:** the demo layout, colours, and sample content are visible. A `file:///` address is normal because the page is opening on your computer.

If you only see plain text or a broken page, confirm that you extracted the complete ZIP and that `assets` is still next to `index.html`.

## Step 2 - Keep the original and make a working copy

1. Keep the downloaded ZIP as your clean original.
2. Copy the extracted template folder and name the copy `website-working-copy`.
3. Edit only the working copy. Do not rename `index.html`, `assets/css/style.css`, or `assets/js/main.js`.
4. Before a major change, copy the working folder to a separate folder such as `website-backup-01`.
5. Save files as UTF-8 and keep their real extension. Avoid names such as `index.html.txt`.

**Correct result:** you have an untouched original and a separate working copy. Save each change, then refresh the browser to see it.

## Step 3 - Prepare your business information

Collect the information below. You may give it directly to AI in plain language.

| Information | What to prepare |
|---|---|
| Brand name | The name shown in the header and browser tab |
| Main activity | What you sell or provide |
| Audience | The people you want to reach |
| Main benefit | A specific reason to choose your business |
| Products or services | Names, descriptions, and public prices if applicable |
| Contact details | Public email, phone number, and address |
| Main action | Email, phone call, booking page, or another real URL |
| Language | English, Vietnamese, Chinese, or another language |
| Brand assets | Logo, brand colours, and images you may legally use |
| Evidence | Real statistics, testimonials, and certifications only |

It is fine to leave an item undecided while editing, but resolve it before publication. Do not present demo statistics or testimonials as your own.

## Step 4 - Start working with AI

### Send the files

In a chat tool, attach the working ZIP if the tool can read ZIP files. Otherwise attach `index.html`, `style.css`, `main.js`, `CUSTOMISE.md`, `README.md`, and `LICENCE.txt`. Explain that CSS is at `assets/css/style.css` and JavaScript is at `assets/js/main.js`.

If the AI works directly in a folder, open or grant access to `website-working-copy`. Ask it to read the files before editing. A screenshot helps explain a visual problem, but it does not replace the source files.

**Prompt 01 - Set up my website editing assistant**

```text
Set up my Apartment Flow editing assistant. Read index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md, LICENCE.txt and THIRD-PARTY-NOTICES.txt. Report missing files without guessing. Summarise four chapters, 240 local frames, navigation, pause/resume, return and demo information dialog. Ask for brand, property facts, audience, language and real contact channel in small groups. Do not edit yet. Work only on my working copy. Preserve plain HTML/CSS/JS, relative paths, file opening, responsive layout, visible focus and finite scroll animation. Motion defaults on; keep the manual pause control. Do not add tracking, backend or dependencies. Return complete changed files with exact destinations and checks after any later edit. Never publish without my instruction.
```

**Correct result:** AI identifies the actual template files and asks for your information. If it suggests rebuilding with a framework, repeat the instruction to preserve the current structure.

## Step 5 - Replace the brand, copy, and contact actions

Give AI verified business information. If something is missing, ask it to remove the claim or mark it clearly for later review. Then use these prompts in the same conversation.

**Prompt 02 - Personalise all website content**

```text
Personalise the latest Apartment Flow files with my verified brand and property information. First ask me for brand, audience, tone, language, apartment description and public contact details that I have not supplied. Remove unsupported prices, size, address, ownership and testimonials instead of inventing them. Update title, description, Open Graph, wordmark, headings, paragraphs, dialog and accessible labels consistently. Preserve the four-chapter camera journey and glass layout. Return complete changed files, a replacement checklist and all unresolved facts.
```

**Prompt 03 - Connect every button to the right destination**

```text
Audit the latest Apartment Flow buttons and links, including chapter navigation, pause/resume, return, skip link and information dialog. Ask for real email, phone or booking URL if absent. Make a table of visible label, current function and verified destination. Replace the demo contact dialog only when I provide a real channel; use mailto:, tel: or https as appropriate. Do not simulate a submitted enquiry or booking. Preserve internal navigation and focus return. Return complete changed files and a click-test checklist.
```

## Step 6 - Change colours, fonts, images, or sections when needed

Make one type of visual change at a time and refresh the page after each one. Attach the latest files every time you start a new AI chat.

**Prompt 04 - Apply my colours and fonts safely**

```text
Apply my brand colours and fonts to the latest Apartment Flow HTML/CSS. Ask for palette and font preferences if not supplied. Locate the final reference override block at the end of style.css, since it overrides earlier root variables. Preserve smoke glass, the open hero, capsule buttons and text contrast across bright/dark frames. Retain system fallbacks and do not bundle unlicensed fonts. Check focus, hover, 320px and desktop. Return complete changed files, actual checks and any contrast issue needing review.
```

**Prompt 05 - Replace the logo or illustration with my image**

```text
Help replace my Apartment Flow logo or camera sequence using assets I provide and have permission to use. Ask whether the asset is a logo, thumbnail or full sequence. Explain exact file names, relative paths and dimensions. For a new sequence keep 16:9 frames consecutively named frame-0001.webp onward, update COUNT and the poster together, and align chapter timing with the actual journey. Never invent extra source detail or silently stretch the frames. Preserve aspect ratio and decorative alt attributes. Return complete changed files and exact asset placement instructions.
```

**Prompt 06 - Translate the whole website**

```text
Translate all visitor-facing strings in the latest Apartment Flow files into my preferred language. Ask for that language if missing. Include metadata, wordmark suffix if appropriate, headings, nav, dialog, pause labels, live status and chapterNames in main.js. Keep business URLs and confirmed proper names unchanged. Preserve IDs, class names, chapter destinations and all code behavior. Check text wrapping at 320px and desktop. Return complete changed files and phrases whose meaning needs my confirmation.
```

**Prompt 07 - Add or remove a service or section**

```text
Add or remove the Apartment Flow section I describe using only verified content I provide. Ask for missing content before editing. First identify the matching story panel, data-scene, chapter-anchor, chapter link and story() thresholds. Preserve exactly one active accessible panel, inert inactive panels, contiguous frame names and the finite camera loop. Explain how navigation and frame timing must change together. Return complete changed files and a desktop/mobile checklist; do not leave broken anchors or false property claims.
```

## Step 7 - Test before publishing

Test the website at a narrow phone width, a tablet width, and a wide desktop. Check navigation, all links, readable text, image loading, keyboard focus, and manual pause/resume (motion defaults on, including under OS reduced-motion settings).

**Prompt 08 - Audit the final website**

```text
Audit my latest Apartment Flow files before publication. First report findings without editing: missing frames, path case, title/meta, leftover demo identity, unsupported property facts, all contact actions, four chapters, 320px/tablet/desktop overflow, keyboard/focus, dialog Escape/focus return, pause/resume, reverse scrolling, no-JS poster, file opening, offline behavior, zoom and contrast over the entire journey. Separate blockers from improvements and record checks you could not run. After I approve fixes, return complete changed files and a manual checklist. Do not publish.
```

## Step 8 - Publish by uploading the website folder

Choose a host that supports static websites. Upload the contents of the working folder so `index.html` is at the published root. Do not upload only the HTML file; the `assets` folder must travel with it.

**Prompt 09 - Guide me through publishing**

```text
Guide me through publishing my static Apartment Flow website. Ask which host I use and whether I upload files, use Git or a CLI. The website needs index.html and the entire assets folder with 240 frames; upload their contents to the published root. Do not upload only HTML or replace the whole Forge Zone store. Give one step at a time using verified host instructions, never guessed UI labels. Do not request secrets or alter a domain. Finish with HTTPS, CSS/JS/frame loading, navigation and mobile checks, and explain how to retain licence/notices privately with my source backup.
```

**Correct result:** the public URL opens the same page as your local working copy, including CSS, JavaScript, and images.

## Step 9 - Connect a custom domain if needed

Publish successfully on the host's temporary URL first. Then connect your domain. DNS changes may take time, so keep the working deployment available while waiting.

**Prompt 10 - Connect my domain using the real configuration**

```text
Help connect my domain to the Apartment Flow website already published on my chosen host. Ask for the provider, DNS manager and exact current DNS instructions with private tokens hidden. Do not invent record targets or remove MX/TXT mail records. Explain required changes and warn before replacing an existing record. Wait for my explicit instruction before making changes. Verify root/www, HTTPS and redirects using actual results. Return the steps and unresolved issues; do not claim propagation is complete without evidence.
```

## Step 10 - Update and recover safely

Keep one known-good backup for every published version. Make changes in a fresh working copy, test locally, and publish only the changed website files.

**Prompt 11 - Update one part and preserve everything else**

```text
Change only the Apartment Flow item I describe in my attached latest source. Ask for the exact update if missing. Identify the smallest HTML/CSS/JS block before editing. Preserve all other approved copy, chapter timing, paths, frames, glass styling, responsive layout, keyboard access and pause/resume. Keep a backup and return complete changed files, exact destinations, a difference summary and local checks. Do not publish or change licence/domain settings.
```

**Prompt 12 - Find and fix a website problem**

```text
Diagnose my Apartment Flow problem using the attached latest files. Ask for expected/actual result, chapter, device/browser, last change and exact error if missing. Read the files first and show evidence for the likely cause. Check frame names/COUNT, relative paths, active-panel state, scroll mapping, pause state and missing-image fallback before rewriting anything. Prefer the smallest fix without dependencies. Return complete changed files and a reproduction/confirmation test. If evidence is insufficient ask for one precise screenshot, message or missing file; do not guess.
```

## Quick troubleshooting

| Problem | First check |
|---|---|
| Page has no styling | Confirm `assets/css/style.css` exists and the HTML path is unchanged |
| Images do not appear | Check file name, extension, letter case, and relative path |
| A button does nothing | Inspect its real `href` or JavaScript and remove demo behaviour |
| Mobile layout is too wide | Look for fixed widths and test at 360 px |
| Changes are not visible | Save the correct file and hard refresh the browser |
| Published site shows 404 | Put `index.html` at the publish root and check host settings |
| AI changed too much | Restore the backup and use Prompt 11 with a narrower request |

## Final checklist

- [ ] The original ZIP and a known-good backup are stored safely.
- [ ] All demo brands, copy, statistics, testimonials, prices, and URLs are replaced or removed.
- [ ] The page title, description, contact details, links, and calls to action are correct.
- [ ] Every image loads and has suitable alt text.
- [ ] The site works at 360 px, tablet size, and desktop size without horizontal overflow.
- [ ] Menu, buttons, keyboard focus, and manual pause/resume (motion defaults on, including under OS reduced-motion settings) work correctly.
- [ ] No form pretends to submit and no unsupported feature is promised.
- [ ] The public URL loads HTML, CSS, JavaScript, images, and HTTPS correctly.
- [ ] The latest published source is backed up before the next change.


## Apartment Flow edit map

Counts below are literal. Edit the final CSS reference overrides when a variable appears twice.

| File | Find | Count | Purpose |
|---|---|---:|---|
| `index.html` | `Lumière Residence` | 4 | Brand / chapters / appearance / sequence setting |
| `index.html` | `data-scene=` | 4 | Brand / chapters / appearance / sequence setting |
| `index.html` | `data-progress=` | 4 | Brand / chapters / appearance / sequence setting |
| `index.html` | `data-open-contact` | 1 | Brand / chapters / appearance / sequence setting |
| `index.html` | `apartment__pause` | 1 | Brand / chapters / appearance / sequence setting |
| `assets/js/main.js` | `const COUNT = 240` | 1 | Brand / chapters / appearance / sequence setting |
| `assets/js/main.js` | `const RADIUS = 10` | 1 | Brand / chapters / appearance / sequence setting |
| `assets/js/main.js` | `const DAMPING_MS = 140` | 1 | Brand / chapters / appearance / sequence setting |
| `assets/js/main.js` | `const MAX_FRAMES_PER_SECOND = 96` | 1 | Brand / chapters / appearance / sequence setting |
| `assets/js/main.js` | `const chapterNames =` | 1 | Brand / chapters / appearance / sequence setting |
| `assets/css/style.css` | `--scene-height: 700vh` | 1 | Brand / chapters / appearance / sequence setting |
| `assets/css/style.css` | `--glass:` | 2 | Brand / chapters / appearance / sequence setting |
| `assets/css/style.css` | `--ink:` | 2 | Brand / chapters / appearance / sequence setting |

Replace the lowercase wordmark lumière and uppercase RESIDENCE separately. Four chapter destinations are 0, .30, .64 and 1; story thresholds are .22, .58 and .90. Change these together when replacing the journey. No verified property price, area, address or booking channel is supplied. The contact dialog explains the AI demo.

240 WebP frames at 1920×1080 were sampled at 24fps from a 10-second Flow clip upscaled from 720p. Extraction does not recover missing source detail. Mobile uses cover cropping. Prefetching downloads about 11.3MB with four workers; decoded images stay in a rolling window. Avoid extra full-screen blur layers or unlimited decoded caches. Keep LICENCE.txt and THIRD-PARTY-NOTICES.txt with redistributed code. Original video, tools and internal reviews are not included. Runtime needs no Python, Node, API key or build.
