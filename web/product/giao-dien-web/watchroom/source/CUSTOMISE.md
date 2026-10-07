# Customise Watchroom

## Edit map

| Find exact text | Literal count | File |
|---|---:|---|
| `WATCHROOM` | 2 | `index.html` |
| `Watchroom` | 4 | `index.html` |
| `hello@watchroom.example` | 5 | `index.html` |
| `QUANTUM ADG` | 2 | `index.html` |
| `--accent:` | 3 | `assets/css/style.css` |
| `--bg:` | 1 | `assets/css/style.css` |

Change product names, prices and descriptions in both index.html and the products array in assets/js/main.js. The hero contains three photographs in .watch-stack, with data-watch indexes 0, 1 and 2. Only .is-active is visible. The same files appear in the three collection cards. Replace quantum-adg.webp, onyx-gmt.webp or solaris-38.webp in assets/img/ with a matching portrait image to change that model. Preserve a 2:3 aspect ratio, transparent background and a consistent upright camera view. Each supplied image is 1024 by 1536 pixels. Update image alt text when replacing it. The finite requestAnimationFrame carousel is 1250 ms with simultaneous outgoing/incoming photographs; pointer tilt and the introductory motion stop after five seconds. Motion starts enabled each visit, including reduced-motion environments, per the owner's request. The pause control affects the current session only. The stage lighting changes with the showroom data-tone attribute (blue, silver-purple, gold). The scroll-driven watch-stack gently scales and tilts using a finite tween. The central halo uses center-breathe (7s) and center-drift (12s) in style.css; adjust their opacity and radial colour stops to tune brightness. Three local images are included; no framework, remote image host, downloaded font or network service is required. If images are unavailable, product names, prices and enquiry links remain readable. Replace the fictional email before publishing. All enquiries open an email client, and Desired is a device-only shortlist, not an order.

For every prompt below, preserve Watchroom's scoped, plain HTML/CSS/JS implementation and its working filters, shortlist, two-way carousel and session-only pause. Do not add payment processing.

# Ten steps from ZIP to website

## Step 1 - Unzip and open
Extract the entire ZIP and open index.html in a browser. Keep assets next to it. The showroom must appear, including the illustrated watches.
## Step 2 - Make a working copy
Keep the original ZIP and copy the extracted folder to website-working-copy. Save UTF-8 files without changing their names. Back up before each major edit; refresh the browser after saving.
## Step 3 - Prepare verified information
Collect your brand, audience, products, verified prices, finishes, public contact email, intended action and permitted assets. Do not present the fictional watches as verified hardware.
## Step 4 - Start with AI
Attach the working ZIP, or all six core files plus the three WebP images. Identify CSS as assets/css/style.css and JS as assets/js/main.js. In a new chat, attach the current files again and use Prompt 01. A screenshot does not replace source files.
## Step 5 - Replace content and contacts
Use Prompts 02 and 03. Accept complete replacement files, save them to the stated paths, then refresh. If AI has folder access, restrict edits to the working copy. Check names in both initial HTML and JS model data.
## Step 6 - Adjust visuals and sections
Use Prompts 04-07, one change at a time. Keep matching image paths and aspect ratios, aspect ratios, responsive layout and the pause control. Expect the correct watch and copy to remain paired in both carousel directions.
## Step 7 - Test before publishing
Use Prompt 08. Test 320, 375, 820 and 1440 px, keyboard focus, search, category filters, shortlist, empty results, swipe, carousel wrap and pause. Disable JS and disconnect the network to confirm content and email links remain available.
## Step 8 - Publish the complete folder
Use Prompt 09 for a static host. Upload index.html and assets together with index.html at the public root. Confirm the public URL matches the local copy and loads over HTTPS.
## Step 9 - Connect an optional domain
Use Prompt 10 only after the temporary hosting URL works. Use the host's actual DNS values and preserve mail records. Verify root, www, HTTPS and redirects.
## Step 10 - Update and recover
Keep a known-good source backup for each publication. Use Prompt 11 for a narrow edit or Prompt 12 for a problem. Restore the last backup if needed, retest locally and then upload the corrected files.

## Twelve copy-ready AI prompts
For every editing prompt, return complete changed files with exact destination paths, a change summary and a manual test checklist. Ask for missing information rather than inventing it. Do not publish unless separately requested.

**Prompt 01 - Start my editing assistant**
```text
I bought the Watchroom static template. Read the six core files and three WebP images I attach: index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md and LICENCE.txt. Identify any missing file and do not guess its contents. Summarise sections, working actions and fictional content before editing. Ask for my brand, audience, products, contacts, language and website goal in small groups. Keep plain HTML/CSS/JS, relative paths, file:// operation, image paths, responsive behaviour, visible focus and the session-only pause control. Preserve motion enabled by default unless I explicitly change that requirement. Do not introduce dependencies, tracking, backend, fake orders or payment processing. Work only in my working copy; if you cannot edit it, return complete replacement files with exact paths. Never omit code. Report what changed and what you actually tested after each edit. Do not publish or change domain settings.
```
**Prompt 02 - Personalise content**
```text
Read the latest Watchroom files I attach. Ask me for verified brand, products, prices, finishes, audience, language and benefit. Replace fictional content throughout metadata, header, hero, all three cards, JS products data, enquiries, saved-watch messages and footer. Keep initial HTML and carousel data consistent. Remove unsupported claims rather than inventing them. Preserve layout and all working interactions. Return complete changed files with their paths and a content-check checklist.
```
**Prompt 03 - Replace contact actions**
```text
Read the latest attached HTML and JS. Ask for my public email and any verified external contact URLs. Replace every enquiry link including links generated by JS and saved-watch links. Use mailto, tel or HTTPS appropriately. Preserve existing section anchors. Do not simulate ordering or submission. Return complete changed files and a checklist to click every contact action.
```
**Prompt 04 - Apply colours and fonts**
```text
Read the attached Watchroom HTML, CSS and JS. Ask for my page palette, three watch palettes and heading/body font preferences. Update existing root tokens, image assets and any matching JS product data consistently. Check contrast on navy and peach, focus, hover and mobile. Use system fallbacks; ask before adding a paid font. Return complete changed files and list any contrast pair still needing review.
```
**Prompt 05 - Replace artwork**
```text
Read the current attached source and the image I provide with permission to use. Ask where it belongs. Inspect the image container and tell me an exact relative file name, format, dimensions and folder. Replace the correct artwork while preserving aspect ratio, layout stability, meaningful alt text and responsive sizing. Do not crop important details without explaining it. Preserve the other watches and motion. Return complete changed files and asset placement instructions.
```
**Prompt 06 - Translate**
```text
Read all current attached files and ask for my target language. Translate metadata, navigation, copy, labels, aria labels, JS product strings, status messages, dialog, search empty state and footer naturally. Preserve brand/product names, contact URLs, selectors, IDs and behaviour unless I request otherwise. Check narrow-screen overflow. Return complete changed files and any ambiguous phrase for my review.
```
**Prompt 07 - Add or remove a section**
```text
Read the current Watchroom files. Ask which section or product I want added or removed and collect verified content. Identify the complete HTML block and dependent CSS/JS before editing. Make the smallest safe change; leave no empty wrappers, broken anchors, duplicated image paths or incorrect model indexes. Keep category filters, shortlist and carousel correct. Return complete changed files and desktop/mobile tests.
```
**Prompt 08 - Audit before publication**
```text
Audit the latest files I attach without editing first. Check missing assets, relative paths, fictional content, metadata, heading order, image alt text, focus, keyboard, contrast, overflow, filters, empty search, saved items, both carousel wrap directions, rapid input, pause, offline, no JS, email links and console errors. Group findings as Blocker, Should fix and Optional with exact selectors/files. After I approve findings, fix the required items and return complete changed files and tests. Do not publish.
```
**Prompt 09 - Guide publishing**
```text
Help me publish the current attached static Watchroom files. Ask which host I use, what its dashboard shows and whether I upload manually, use Git or a CLI. Give one small step at a time using verified screen labels. Explain uploading the complete folder with index.html at the root and assets beside it. Do not ask for passwords or private keys. Do not alter domains yet. Finish by checking the public URL, CSS, JS, images, links, mobile and HTTPS.
```
**Prompt 10 - Connect my domain**
```text
Help connect my domain to my already-working static website. Ask for my host, DNS provider and the host's exact record instructions: type, name, value and www requirement. Ask me to hide private identifiers. Compare existing records and explain one change at a time. Never invent DNS values; warn before replacing a record and preserve MX and mail TXT records. Verify root, www, HTTPS and redirects.
```
**Prompt 11 - Make a narrow update**
```text
Read my latest attached published-source files. Ask exactly what I want changed. Identify the smallest file/block before editing and preserve every other approved part, including palette, copy, contacts, image paths, layout, carousel, filters and shortlist. Return complete changed files, exact differences and a local verification checklist. Do not publish or alter DNS.
```
**Prompt 12 - Diagnose a problem**
```text
Read the latest attached Watchroom files. Ask what I expected, what happened, where and when it happens, last change and exact console error if present. Identify the likely cause using source evidence and make the smallest fix while preserving the design and other interactions. If evidence is insufficient, ask for one specific screenshot, error or file. Return complete changed files and a test confirming the fix. Do not add dependencies or publish.
```

## Final checklist and recovery
Replace the fictional brand, prices, product data and .example email. Verify metadata, all contacts, local storage fallback, both carousel wraps, 320px layout and visible focus. Keep the original ZIP, current source and a known-good backup. If styling is missing, check assets/css/style.css; if motion fails, check assets/js/main.js and console. Save the correct file and refresh. Restore your last backup if a change breaks the page.
