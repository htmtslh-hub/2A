# Velora 1.2.1 customisation guide

Velora is a fictional bicycle showroom with a working browser-local carousel,
product details and visual configuration. It has no cart, checkout, inventory,
login, order service or tracking. Enquiry opens an email client; it sends nothing
automatically. All prices/specifications are illustrative and must be replaced.
Source has six files and no build step or external runtime dependency.

## Edit map

Counts are literal in the final file named below, not across the whole folder.
Update static HTML and JS data together. Preserve unique SVG gradient IDs.

| File | Find | Count | Purpose |
|---|---|---|---|
| `index.html` | `Velora` | 6 | Metadata and initial enquiry |
| `index.html` | `velora` | 2 | Header/footer |
| `index.html` | `VELORA` | 6 | SVG bike wordmarks |
| `index.html` | `hello@example.com` | 2 | Static and initial email destinations |
| `assets/js/main.js` | `hello@example.com` | 1 | Configured enquiry destination |
| `assets/js/main.js` | `const models =` | 1 | Model names, sample prices and specifications |
| `assets/js/main.js` | `const finishes =` | 1 | Finish names and SVG paint colours |
| `assets/js/main.js` | `const labels =` | 1 | Configuration names in summaries and email |
| `assets/js/main.js` | `const duration = 850` | 1 | Product transition duration in milliseconds |
| `assets/js/main.js` | `progress(now, began, 950)` | 1 | Gallery/detail transition duration |
| `assets/css/style.css` | `--accent:` | 1 | Button colour |
| `assets/css/style.css` | `--accent-text:` | 1 | Accent text |
| `assets/css/style.css` | `--violet:` | 1 | Display panel |
| `assets/css/style.css` | `--font-display:` | 1 | Heading system-font stack |
| `assets/css/style.css` | `--font-body:` | 1 | Body system-font stack |

Model order: Metro, Onyx, Loop. Each bike keeps its own setup this visit;
reload resets defaults. Frame offers Chalk, Graphite, Lavender, Coral, Ocean
and Sage. Edit the HTML radios, CSS swatches and JS finishes together.
Price is per model without option surcharges. Static cards show default paint;
the hero reflects your choices. SVG illustrations are not engineering drawings.
Photos may require a different configurator. No fonts are redistributed.

Keep carousel/scene transforms separate, SVG identity and tab ARIA/inert state.
Finite motion defaults on despite OS reduce or saved off; Pause lasts this visit.

## Step 1 - Unzip and open

Extract the whole ZIP. Open index.html beside assets in your browser; read README and this guide. Keep CSS at assets/css/style.css and JS at assets/js/main.js. Result: the gallery works without installation.

## Step 2 - Make a working copy

Keep the original ZIP unchanged. Copy the extracted folder to website-working-copy and edit only it. Make dated full-folder backups outside it. Save UTF-8 with real extensions, never .html.txt. Result: a recoverable working copy.

## Step 3 - Prepare verified information

Collect verified brand, audience, models, descriptions, specifications, prices, email, language and assets you may use. Identify unknown facts; all demo data must be replaced. Result: usable business information without invented claims.

## Step 4 - Start a fresh AI conversation

Attach the current six files or ZIP and use Prompt 01. Screenshots explain appearance but do not replace files. Start new chats by resending files and Prompt 01. Without file access, save complete returned files to their exact paths and refresh. Result: AI works from your current copy.

**Prompt 01 - Set up my Velora editing assistant**

```text
Read my current six Velora files: index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md and LICENCE.txt. Report missing files; do not guess or edit yet. Summarise working interactions and fictional data. Ask for my brand, bikes, contact, language and goal in small groups. Preserve plain HTML/CSS/JS, relative paths, keyboard access, offline operation and finite default-on motion. Never invent facts or add dependencies, tracking or checkout. Edit only my working copy, or return complete files with exact destinations and real verification. Do not publish.
```

## Step 5 - Replace copy and destinations

Use Prompts 02 and 03. Update HTML and the JS models array together; replace email in both. Open every model and Specifications, and test each Explore link. Result: metadata, prices, details and enquiry agree.

**Prompt 02 - Personalise all content**

```text
Read my latest Velora files. Ask for missing verified brand, bike descriptions, prices, specifications, public contact and language before changing dependent content. Update metadata, visible copy, accessible labels, collection cards and the JS models array consistently. Remove unsupported claims rather than inventing them. Keep layout and interaction behaviour. Return complete changed files with paths, remaining demo items and actual checks. Update documentation and literal edit counts. Do not publish.
```

**Prompt 03 - Connect the actions**

```text
Read the latest HTML/JS and list every action and destination. Ask for verified public email and real URLs, or whether to remove an action. Update both email locations and preserve the selected bike/configuration in its enquiry body. Keep internal anchors and model-specific Explore links. Never simulate sending mail, payment or order success. Return complete changed files with paths and a click checklist for all models. State untested destinations and do not publish.
```

## Step 6 - Change the visual system

Use Prompts 04–07 one change at a time. CSS :root has colours/fonts; JS finishes and SVG stops set bike paint. Adding models requires slide/card/data/setup and unique SVG IDs. Result: consistent visuals and working configurations.

**Prompt 04 - Apply colours and fonts**

```text
Read current HTML/CSS/JS. Ask for missing brand colours and desired fonts. Reuse :root and finishes data; preserve layout and interaction. Check text, controls, hover and focus contrast, including the violet panel. Keep fallback fonts; request licence confirmation before using paid fonts. Return complete changed files, paths, measured contrast where possible and desktop/mobile checks. Update the edit map. Do not add dependencies or publish.
```

**Prompt 05 - Replace a visual asset**

```text
Read current files and my supplied image; ask which placement I intend and confirm permission if unclear. Inspect the existing wrapper, then specify relative filename, folder, dimensions and aspect ratio. Keep the same selected visual through gallery/detail, responsive sizing, reserved space and alt text. Explain configuration features that a flat photo cannot retain before changing them. Return complete changed files, placement instructions and visual checks. No hotlinks or dependencies.
```

**Prompt 06 - Translate every visitor string**

```text
Read my latest files and ask for the target language if missing. Translate all visitor strings in HTML and JS, including metadata, accessible names, tabs, choices, specifications, summaries and enquiry body. Keep verified names, contacts, URLs, IDs and paths unless I request replacements. Preserve carousel behaviour and update html lang. Check text at 320, 375, 820 and 1440 pixels. Return complete changed files and wording needing confirmation; state actual tests and update the guide.
```

**Prompt 07 - Add or remove a model or section**

```text
Read current files and ask which model/section I want added or removed, with missing verified content. Update slide/card/model/setup data and matching links together. Preserve unique SVG IDs, modulo direction, same-bike scene continuity, keyboard/touch controls and static fallback. Remove empty blocks and broken links. Return complete changed files, paths and updated counts. Test both wraps, rapid clicks and every model's detail data. No libraries, backend or publication.
```

## Step 7 - Test the final folder

Use Prompt 08. Test four reference sizes, menu, keyboard, wrap both ways, rapid clicks, every model/configuration, zoom 200%, no JS and offline opening. Pause stops motion; reload starts on. Result: record actual passes and untested cases.

**Prompt 08 - Audit the final website**

```text
Audit the current six files. Check carousel directions, direct wrap, rapid input, scene continuity, matching model/price/specs, all configuration tabs, per-bike state and enquiry text. Check menu, focus, tabs, Escape, swipe, contrast, IDs and console/network. Test 1440×900, 820×1180, 375×812, 320×740, zoom 200%, no JS, offline, default-on motion with OS reduce/old off settings, and pause/resume. Fix confirmed small faults within scope. Return complete files and PASS/FAIL/NOT TESTED evidence; name actual browsers/devices. Do not publish.
```

## Step 8 - Publish a clean website folder

Copy index.html and assets into website-publish, with HTML at its root; exclude ZIP, backups and private notes. Preserve required licence notices. Open locally, then use Prompt 09 for current host instructions. Result: a clean folder; publish only on your explicit request.

**Prompt 09 - Guide me through publishing**

```text
Read my website folder. Ask which host, account and upload workflow/screen I use. Use current official documentation and link it; do not guess labels. Guide small steps for website-publish containing index.html and assets. Exclude backups, private notes and the purchase ZIP. I handle credentials and payments. Publish only after my explicit request. Verify the returned URL, CSS/JS, configuration, mobile layout, enquiry and HTTPS; report checks you could not run.
```

## Step 9 - Connect a domain if needed

Verify the temporary hosted URL first. If you own a domain, use Prompt 10 with exact host records. Back up DNS and preserve email records. Result: verify root/www, redirects and HTTPS after propagation; this step is optional.

**Prompt 10 - Connect my domain**

```text
Ask for host, DNS provider, domain, existing website/email use and the host's exact record instructions. Read current official documents and my records; invent no IPs or targets. Explain necessary changes and how to verify them. Preserve unrelated records, especially email MX/TXT. I handle login and DNS changes; request no secrets. Verify root/www, redirects, HTTPS and email after propagation, reporting unavailable checks. Do not change a live domain without my explicit request.
```

## Step 10 - Update and recover

Back up the known-good folder. Use Prompt 11 for a bounded update or Prompt 12 for a fault. Test and update the same host project. Restore related files together, not mixed versions. Result: recoverable source and published files.

**Prompt 11 - Update one part safely**

```text
Read my latest six published-source files. Ask which bounded change I want if unclear. Identify its files/dependencies and preserve other approved content, setup, layout, interactions and paths. Return complete changed files with destinations, exact differences, updated guide/counts and a local verification checklist. Explain rebuilding website-publish for the same host project. Never restore demo data over my content, publish or alter DNS without a request.
```

**Prompt 12 - Find and fix a fault**

```text
Read my current files. Ask for expected/actual behaviour, action, browser/device, last edit and file/HTTP context if missing. Diagnose from code/runtime evidence; request one specific missing file, screenshot or console message when needed. Check paths, IDs, hidden/inert state, cached assets and cancelled rAF. Prefer the smallest repair preserving design/data/interactions. Return complete changed files, exact paths, cause, reproducible verification and untested items. Explain restoring a known-good backup. Do not publish.
```

## Final checklist

- Keep the original ZIP and a known-good backup outside the publish folder.
- Replace every demo name, specification, price and example.com email.
- Check both wrap directions, every model detail and configuration group.
- Verify active image, text, counter, selected tab and enquiry body agree.
- Test keyboard focus, Escape, menu, no JS/offline and all four viewport sizes.
- Read the licence and validate rights to assets or fonts you add.
- Verify published assets and HTTPS only after explicitly requesting publication.

If CSS disappears, check assets/css/style.css beside index.html. If switching
fails, check assets/js/main.js and console errors. If changes do not appear,
save the correct working copy and reload. Restore the complete backup before
trying unrelated fixes. A file:/// path works only on your own computer; share a
hosted URL when publication has been requested and completed.
