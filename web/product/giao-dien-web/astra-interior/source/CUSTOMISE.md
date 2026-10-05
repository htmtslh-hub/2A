# Astra Interior — customisation guide

This guide takes you from the downloaded ZIP to a website you can publish. Astra Interior is a code template, not a hosted no-code editor. Keep the original ZIP unchanged and work on a copy. Never give an AI tool passwords, API keys, payment details or private customer information.

## Step 1 - Extract and open the template

Extract the full ZIP. Open the folder until `index.html` sits beside `assets`, `CUSTOMISE.md`, `README.md` and `LICENCE.txt`. Double-click `index.html` and scroll from the cinematic opening through the contact section.

```text
astra-interior/
├── index.html
├── assets/css/style.css
├── assets/js/main.js
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
```

**Correct result:** the page opens at a `file:///` address, the image changes as you scroll, and all six files remain in place.

## Step 2 - Create a safe working copy

Keep the downloaded ZIP as the clean original. Duplicate the extracted folder and name it `astra-working-copy`. Edit only this copy. Before large edits, duplicate it again as `astra-backup-01`. Keep UTF-8 encoding and do not rename the three code files or their folders.

**Correct result:** you can return to a known-good version without undoing changes manually.

## Step 3 - Prepare verified business information

Collect your real brand name, public email, services, audience, project names, project locations, completion dates, studio location, preferred tone, legal image rights and the main action you want visitors to take. Decide whether the current fictional projects will be replaced by real work or clearly labelled concept work. Do not present fictional projects as commissions.

**Correct result:** every claim and contact detail can be supported before publication.

## Step 4 - Start a safe AI editing session

Attach all six files, or the complete working ZIP if your AI tool accepts ZIP files. Explain the CSS and JavaScript paths. A screenshot is useful for visual feedback but does not replace source files.

**Prompt 01 - Set up my editing assistant**

```text
I bought the Astra Interior static website template from Forge Zone. Read every
file I attach: index.html, assets/css/style.css, assets/js/main.js,
CUSTOMISE.md, README.md and LICENCE.txt. Tell me which files are present and
which are missing. Do not edit yet. Summarise the sections, working links,
fictional demo content and the 24-frame canvas sequence. Ask for my brand,
services, projects, public contact details, language and main goal in small
groups. Preserve plain HTML/CSS/JavaScript, relative paths, file:// support,
the embedded sprite, responsive layout, keyboard access and reduced-motion
mode. Do not add a framework, dependency, tracking, backend or invented facts.
If you cannot edit files directly, return complete replacement files with exact
paths and no ellipses. Do not publish anything. Begin by reading the files.
```

**Correct result:** the AI describes this template rather than guessing and asks for missing business information.

## Step 5 - Replace brand, content and destinations

Work in small, reviewable passes. Refresh `index.html` after each pass and search again for old demo names.

**Prompt 02 - Personalise all website content**

```text
Use the latest six Astra Interior files. If this is a new chat, ask me to send
all files and run Prompt 01 first. Ask for my verified brand, offer, audience,
main benefit, tone, studio location, public contact details, three projects and
main visitor action. Then update the title, description, navigation, hero,
studio copy, project copy, approach, services, contact section, footer, canvas
accessible labels and email links. Remove unsupported claims instead of
inventing them. Preserve the existing composition and frame sequence. Return
complete changed files with exact paths and list every demo item still present.
```

**Prompt 03 - Audit every link and action**

```text
Audit every anchor and button in the latest Astra Interior files. Make a table
with visible label, current destination, desired destination and test result.
Ask me for confirmed email, phone, booking URL or section destinations before
editing. Use mailto:, tel:, secure https URLs or real section IDs. Do not use
href="#", fake success states or a form without a submission service. Preserve
mobile-menu keyboard behaviour. Return complete changed files and a click-test
checklist for desktop and phone widths.
```

**Prompt 04 - Translate the whole website**

```text
Translate all visitor-facing Astra Interior copy into the language I name.
Ask for the language, regional style, formal or informal tone and any words that
must remain unchanged. Update html lang, title, metadata, navigation, headings,
body copy, buttons, footer, canvas labels and menu text. Keep code identifiers,
paths and the embedded base64 sprite unchanged. Check long headings at 320px,
375px, 820px and 1440px. Return complete changed files and flag phrases that
need native-speaker or legal review.
```

**Prompt 05 - Replace project information safely**

```text
Replace Casa Lume, Rua Nova and Maré House with my real projects or clearly
labelled concept studies. Ask for each project name, type, location, year,
one-sentence description and publication permission. Do not imply a client
commission without confirmation. Update the sequence chapters, project cards,
canvas labels and metadata consistently. Keep the three canvas still frames
unless I provide legally usable replacement imagery. Return complete changed
files and a project-by-project verification list.
```

## Step 6 - Adjust the visual system and motion

Most visual tokens are at the top of `assets/css/style.css`. Keep strong text contrast. The 24-frame sprite is embedded inside the `src` of `#sequence-source` in `index.html`; do not format, truncate or partially copy that data URL.

**Prompt 06 - Apply my brand colours**

```text
Apply my verified brand palette to Astra Interior. Ask for background, text,
accent and supporting colours, or derive an accessible proposal from my logo.
Edit only the colour tokens and necessary state styles in
assets/css/style.css. Measure normal text, large text, focus outlines, buttons,
header over the darkest and lightest frames, and link hover states. Keep the
image sequence readable under the overlay. Return the complete CSS file, a
token table and contrast ratios with any unresolved risk clearly stated.
```

**Prompt 07 - Change typography**

```text
Change Astra Interior typography using at most two font families. Ask whether I
need free web fonts, system fonts or supplied licensed files. Keep readable
fallbacks and font-display swap. Update the Google Fonts request and CSS tokens,
then check hero, project names, navigation and email at 320px, 200% zoom and
offline fallback. Do not claim a font licence without an official source.
Return complete changed files and the official licence links I must keep.
```

**Prompt 08 - Replace the 24-frame sequence**

```text
Help me replace Astra Interior's embedded sequence with 24 images I am allowed
to use. First inspect assets/js/main.js and report the required 6-column by
4-row sprite layout, frame order and current 640x360 cell size. Ask me to attach
all 24 ordered frames and confirm image rights. Build one WebP sprite with the
same grid, replace only the complete data URL in #sequence-source, and preserve
the alt labels, scroll mapping, reduced-motion still and file:// support. Never
return a truncated index.html. If the tool cannot safely return the complete
large HTML file, stop and give me a local, reversible replacement procedure
instead. Report final sprite dimensions, byte size and visual checks.
```

**Prompt 09 - Tune or reduce the scroll motion**

```text
Tune the Astra Interior sequence without adding a library. Ask whether I want
slower, faster, shorter, longer or fully static behaviour. Preserve 24 discrete
frames, IntersectionObserver activation, requestAnimationFrame rendering and
prefers-reduced-motion. Do not add a scroll event listener. Check that chapter
copy stays readable and does not overlap the header at 320px, 375px, 820px and
1440px. Return complete changed files and explain the new progress ranges in
plain language.
```

**Prompt 10 - Add, remove or reorder a section**

```text
Modify the section structure of the latest Astra Interior files. Ask which
section I want to add, remove or reorder, its purpose, verified copy and desired
navigation link. Keep one h1, logical heading levels, unique IDs, working skip
link, mobile menu, reveal fallback and consistent spacing. Do not create fake
forms, reviews, metrics or buttons. Return complete changed files and a new
section order with every navigation destination checked.
```

## Step 7 - Test before publishing

Test the working copy in a fresh browser window at 1440×900, 820×1180, 375×812 and 320×740. Check the full scroll sequence, all links, menu open/close, Escape, Tab and Shift+Tab, visible focus, horizontal overflow, 200% zoom, reduced motion, blocked fonts and disabled JavaScript. With JavaScript disabled the imagery may be absent, but text, navigation, sections and contact links must remain usable.

**Prompt 11 - Run a release audit**

```text
Audit my latest Astra Interior working copy without publishing it. Test the
extracted files through file:// and a local static server in the browsers you
actually have. Check 1440x900, 820x1180, 375x812 and 320x740; menu behaviour;
Escape focus return; all links; one h1; heading order; unique IDs; console and
network errors; horizontal overflow; reduced motion; JavaScript disabled;
blocked web fonts; 200% zoom; canvas rendering; and all 24 scroll frames. Report
PASS, FAIL or NOT TESTED for each item. Include browser versions and exact
evidence. Fix only failures I authorise and return complete changed files.
```

**Correct result:** there are no hidden failures, and untested items are labelled honestly instead of being assumed to pass.

## Step 8 - Publish the complete folder

Choose a static host, upload the contents of the working folder so `index.html` is at the site root, then open the public URL in a private browser window. Do not upload the untouched purchase ZIP publicly. Email links need no backend, but visitors must have an email application configured.

**Prompt 12 - Prepare a publishing handoff**

```text
Prepare my tested Astra Interior working copy for a static host, but do not log
in, publish, change DNS or spend money. Confirm the six-file structure, relative
paths, metadata, public contact destinations, licence notices and absence of
secrets. Explain how to upload the folder to the host I name and how to verify
the live URL, mobile menu, email links, fonts and 24-frame sequence. Return a
deployment checklist, rollback steps and a list of anything still NOT TESTED.
```

## Step 9 - Connect a domain only when ready

Buy or use a domain through a provider you trust. Follow that provider's current DNS instructions, save existing records before changing them and wait for propagation. Do not send registrar passwords to AI. Keep the temporary hosting URL until the custom domain works with HTTPS.

**Correct result:** both the live URL and custom domain load the same tested files securely.

## Step 10 - Update and recover safely

For every update, download or copy the current live files, create a dated working copy, make one group of changes, rerun Step 7 and keep the previous release. If an update breaks the site, restore the previous complete folder. Never replace only half of a coordinated HTML/CSS/JS change.

**Correct result:** each published version can be rolled back without rebuilding from memory.

## Exact edit map for Astra Interior 1.0.0

Counts below are literal counts in the original release and must be recounted after any code edit.

| Find | File | Original count | Replace with |
|---|---|---:|---|
| `Astra Atelier` | `index.html` | 7 | Your verified brand name |
| `hello@astraatelier.example` | `index.html` | 4 | Your public email in visible text and mailto links |
| `Spaces shaped` | `index.html` | 1 | Your concise hero promise |
| `Casa Lume` | `index.html` | 3 | Project one name |
| `Rua Nova` | `index.html` | 2 | Project two name |
| `Maré House` | `index.html` | 2 | Project three name |
| `Lisbon` | `index.html` | 3 | Your relevant studio or project location |
| `2026` | `index.html` | 2 | Verified project years where appropriate |
| `2025` | `index.html` | 1 | Verified project year where appropriate |
| `--clay: #8b4d32;` | `assets/css/style.css` | 1 | Your accessible primary accent token |
| `--sage: #5f6755;` | `assets/css/style.css` | 1 | Your accessible supporting colour token |
| `data-stage="` | `index.html` | 4 | Do not change unless retuning sequence chapters |
| `data-still="` | `index.html` | 3 | Frame indexes from 0 to 23 for project canvases |

Do not use find-and-replace inside the long `data:image/webp;base64,` value. Replace that value only as one complete generated asset through Prompt 08.

## Final checklist

- All fictional names, locations, dates and email details are removed or clearly disclosed.
- Every visible action leads to a real section, email address, phone number or confirmed URL.
- The page has no horizontal overflow at all four test sizes.
- Keyboard focus is visible and the mobile menu closes with Escape and restores focus.
- Reduced motion shows one still hero; disabled JavaScript leaves content usable.
- The 24 frames play in order and three project canvases render.
- You own or license every replacement image, font, logo and piece of copy.
- You kept the original ZIP, a tested working copy and a rollback copy.
