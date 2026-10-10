# Customise Laila

Laila is a static creative developer portfolio with one original AI-generated portrait. There is no backend, form submission or PDF CV download. The résumé button opens the journey section. Contact opens an email app and never confirms delivery. Edit source files directly or with AI; this is not a no-code builder. Read LICENCE.txt for permitted finished-website use of the portrait.

## Edit map

Counts are exact literal occurrences in the stated file. Brand names use two cases. Replace both and edit all metadata and accessible text.

| File | Literal text | Count | Change |
|---|---|---|---|
| `index.html` | `Laila` | 3 | Title, sharing metadata and hero name |
| `index.html` | `LAILA` | 2 | Header and footer name |
| `index.html` | `hello@example.com` | 1 | Real public contact email |
| `index.html` | `assets/img/portrait.webp` | 1 | Portrait path |
| `index.html` | `Bloom journal` | 1 | First project concept |
| `index.html` | `Noon studio` | 1 | Second project concept |
| `index.html` | `Petal press` | 1 | Third project concept |
| `assets/css/style.css` | `--accent:` | 1 | Pink text token |
| `assets/css/style.css` | `--accent-button:` | 1 | Pink button token |
| `assets/css/style.css` | `--font-body:` | 1 | System font stack |
| `assets/css/style.css` | `950px` | 1 | Menu breakpoint |
| `assets/js/main.js` | `950px` | 1 | Matching menu breakpoint |
| `assets/js/main.js` | `620` | 1 | Finite reveal duration in milliseconds |

Other locations and traps:

- Content: sections `#about`, `#learning`, `#education`, `#projects`, `#skills`, `#contact` in index.html. Learning topics are examples, not certifications. Supply verified credential links and real résumé dates before making claims. Three project covers are typographic concept artwork, not screenshots of shipped products.
- Hero: `.hero__copy` and `.hero__portrait`. Keep the name short or remove `white-space: nowrap` from h1 and recheck narrow screens. Never place long text over the face.
- Image: `assets/img/portrait.webp`, recommended 800x1200 WebP with alpha. The image is cropped by object-fit; inspect the whole face and bun at four widths. Update `src`, `width`, `height`, `alt`, and version query together. Keep the image below 300 KB. Do not leave the file only on your own computer outside the folder.
- Palette: opening `:root` in assets/css/style.css. Accent text and button background are separate. Button text is dark; retain at least 4.5:1 contrast. Font uses Consolas, Courier New and operating-system fallbacks without downloads.
- Decorations: inline `.icon` SVG, `.fan` folding fan and `.blossom` branch in HTML/CSS. SVG is decorative with viewBox, aria-hidden and focusable=false. No emoji assets are needed.
- Native details: each learning topic and `.project` contains summary plus real expanded content. Keep a summary and don't remove accessible titles. This works without JS.
- Menu: `.nav-toggle`, `#navigation`, aria-controls and the 950px CSS/JS breakpoint must agree. No-JS navigation stays visible. Escape closes and returns focus.
- Reveal: `[data-reveal]` uses a finite 620ms requestAnimationFrame entrance. Motion starts enabled even when the OS requests reduced motion; it does not consult saved motion settings. There is no carousel, infinite loop or typewriter. CSS smooth scrolling respects the OS preference.
- Links: all navigation is internal. Email `hello@example.com` is a documented sample and must be replaced. No social destinations were invented.
- Publication: update the 1.0.0 query on the three CSS/JS/image references whenever replacing assets, to prevent stale cache. Keep all seven files, including the portrait, in the same relative structure.

## Step 1 - Extract and open

Extract the whole ZIP. Open the `laila` folder, then double-click `index.html`. Keep all portrait image and the CSS/JS folders with it. Scroll the page and try every link. Correct result: styled demo content and three portrait image appear.

## Step 2 - Keep a clean backup

Retain the original ZIP. Copy the extracted folder to `website-working-copy` and edit only that copy. Save as UTF-8 with real extensions, never `.html.txt`. Before each major change, make a dated backup. Correct result: the original can always be restored.

## Step 3 - Prepare your information

Collect your brand, portfolio activity, audience, story text, public contact email, permitted images, desired language and actual destination URLs. Do not invent credentials, clients or testimonials. Replace fictional portfolio copy before publishing. Correct result: a list of verified information and any items still undecided.

## Step 4 - Start with AI

Attach the current ZIP, or all six code/document files plus images. Explain the CSS and JS paths. In a new chat, resend current files and Prompt 01; past conversation is not available automatically. If the assistant can edit folders, grant access only to the working copy. Otherwise copy its complete replacement files to the exact stated paths.

**Prompt 01 - Set up my Laila editing assistant**

```text
I bought Laila, a static creative portfolio, and am not a developer.
Read the attached index.html, assets/css/style.css, assets/js/main.js,
CUSTOMISE.md, README.md, LICENCE.txt and the assets/img/portrait.webp.
Name missing files and do not guess their contents. Do not edit yet.
Summarise the sections, real links, menu, motion and fictional demo information.
Ask me for brand, activity, audience, contact, language and website goal in
small groups. Ask for image rights and real business evidence; never invent them.
Throughout our work keep plain HTML/CSS/JS, relative paths and file opening.
Preserve responsive layout, visible focus, keyboard access and readable text.
Do not add dependencies, tracking, backend, payments or simulated form success.
Respect the documented motion default and use only finite effects.
Edit only the working copy if tools allow; otherwise return complete changed
files with their exact destination paths. No omissions inside file contents.
After edits list changes, viewing instructions and actual tests. Do not publish
or change domains. Begin by reading and asking for missing business information.
```

## Step 5 - Replace content and contact actions

Give the assistant verified copy in plain language. Review missing information before accepting replacement files. Save each file to the correct location and refresh the browser. Correct result: metadata, hero, portfolio, contact and footer describe your activity consistently.

**Prompt 02 - Personalise my portfolio**

```text
Use the latest Laila files. Ask for my brand, portfolio activity, audience,
benefit, tone, language and public contact details if they are missing.
Replace fictional content only with information I supply. Update metadata,
the LAILA header/footer and Laila hero name, navigation, personal story, learning topics, résumé, project concepts and skills, contact, footer, alt text and accessible names.
Keep the composition responsive. Remove unsupported claims instead of making
up clients, statistics or testimonials. Return complete changed files and a
list of remaining demo items and tests performed.
```

**Prompt 03 - Connect the links**

```text
Audit all links and buttons in the current files. Make a table of label,
destination and actual behavior. Ask me for the real public email and any
external portfolio destinations. Update only with verified destinations.
Preserve internal section links, use mailto for email, and secure URLs for
external pages. Do not pretend to send enquiries or add a form backend.
Return complete changed files and a click checklist, including mobile menu.
```

## Step 6 - Change the visual details

Change one kind of visual detail at a time. Recheck the hero overlap, portrait crop and section grid after changing a font or image. Supply images you are permitted to publish. Correct result: the composition remains readable with your content at desktop, tablet and phone sizes.

**Prompt 04 - Apply colors and fonts**

```text
Read the current HTML and CSS. Ask me for brand colors and font preferences.
Reuse the root variables and preserve the layout. Keep accent background and
accent text distinct. Check body text, hover, buttons and focus contrast.
Retain sensible font fallbacks and verify licences before adding any font.
Return complete CSS and required HTML with actual tests and unresolved issues.
```

**Prompt 05 - Replace portrait image or logo**

```text
I will provide the latest files and permitted images. Ask which image replaces
the hero portrait or brand logo. Inspect the
container and recommend dimensions, format, filename and relative folder.
Preserve aspect ratio and layout stability, update alt text and width/height,
and explain cropping. Check faces and important details at 320, 375, 820 and
1440px. Keep lazy loading below the first screen. Return complete changed
HTML/CSS and the exact asset placement instructions. Never claim image rights
were verified if I have not provided evidence.
```

**Prompt 06 - Translate my portfolio**

```text
Ask for my desired language, then translate all visitor-facing text in the
latest files including metadata, navigation, captions, CTA, footer, alt text
and accessible labels. Change html lang correctly. Preserve names, URLs,
classes, IDs, relative paths and behavior unless I supply replacements.
Check the hero text and mobile menu for long text. Return complete changed
files and phrases that need my confirmation.
```

**Prompt 07 - Add or remove a section**

```text
Use the latest files and ask what section I want added or removed, with its
verified content. Identify the whole HTML block and related CSS/JS first.
Make the smallest change without broken anchors, unused links, empty wrappers
or orphaned selectors. Preserve heading order, whitespace, responsive layout,
keyboard access and finite motion. Return complete changed files and tests.
```

## Step 7 - Test locally

Open the current folder at 1440, 820, 375 and 320px. Check all images, links, menu, Escape, focus and the hero overlap. Test without JS, without fonts and offline. Confirm there is no horizontal scroll, including at 200% zoom. Motion defaults on and stops after each finite entrance. Correct result: the source is usable before publication.

**Prompt 08 - Audit my final website**

```text
Audit the latest files before publication and report findings before editing.
Check relative paths, images, demo names, placeholders, email destination,
metadata, headings, alt text, labels, keyboard focus, contrast, menu, overflow,
portrait crop and text overlap at 320/375/820/1440px. Check offline, missing
fonts, no-JS, zoom and the documented motion default. Check console and
network errors if tools are available. Separate blockers from optional
changes, state exact selectors, and distinguish tested facts from assumptions.
After I approve fixes return complete changed files and a manual checklist.
Do not publish.
```

## Step 8 - Publish the whole folder

Choose a static host. Upload the working folder contents, with `index.html` at the public root and `assets/` beside it. Never upload just HTML. Read LICENCE.txt and verify rights for any replacement images before publication. Correct result: the public URL matches your locally checked page, with HTTPS and all assets.

**Prompt 09 - Guide me through hosting**

```text
Ask which static hosting provider I use and what I see in its dashboard.
Guide me one step at a time through publishing the current index.html and
complete assets folder. Ask whether I upload manually, use Git or a CLI.
Use current provider documentation; do not invent screen labels or values.
Do not request passwords, keys or payment details. Do not publish on my
behalf without instruction. Finish with the actual URL, HTTPS, asset, mobile
and link checks. Keep DNS changes separate until requested.
```

## Step 9 - Add a domain if wanted

First test the host's temporary URL. Copy the host's exact required DNS records and keep existing email records. Correct result: root domain, www and HTTPS resolve to the checked deployment without breaking email.

**Prompt 10 - Connect my domain**

```text
Ask for my hosting and DNS providers, and the exact record type, name and
target supplied by the host. Never invent DNS values. Compare with current
records I provide and explain one change at a time. Warn before replacing
existing records and preserve MX and mail-related TXT records. Ask me to
hide private tokens. Verify root domain, www, HTTPS and redirects after
the instructed changes. Do not change anything without my request.
```

## Step 10 - Update and recover

Back up each known-good release. Edit a new working copy, retest and then upload changed website files. If a change breaks the page, restore the last backup and make a narrower edit. Correct result: every published version has a recoverable source copy.

**Prompt 11 - Update one detail**

```text
Read the current files and ask which exact detail I want changed. Name the
smallest file/block needed. Preserve all other approved copy, links, styling,
layout, relative paths, accessibility and motion behavior. Return complete
changed files, exact differences and local tests. Do not publish or change DNS.
```

**Prompt 12 - Diagnose a problem**

```text
Read the latest files. Ask what I expected, what happened, device/browser,
affected section, last change and any console error. Find evidence before
proposing the smallest fix. Preserve design and plain HTML/CSS/JS; add no
dependencies. If evidence is insufficient ask for one relevant file,
screenshot or error. Return complete changed files and a confirmation test.
Do not publish.
```

## Final checklist

- Keep original ZIP and known-good backups.
- Replace demo persona, copy and email; remove unsupported claims.
- Confirm commercial image terms and copyright owner before release.
- Check the portrait, their cropping and descriptive alt text.
- Test 320px through desktop, zoom, menu, Escape, keyboard and focus.
- Test without JS/fonts and offline. No fake submission or backend claims.
- Recheck the deployed assets, links and HTTPS; archive the exact source.
