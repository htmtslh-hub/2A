# Keystead — your website, step by step

This guide takes you from the downloaded ZIP to a website you can publish. Follow the steps in order the first time. Every prompt below is complete: copy it, attach the files it asks for, and answer the AI's questions in plain language. You never need to fill in code, selectors or technical settings.

## Before you begin

You need a computer, a modern browser, a text editor (VS Code or Sublime Text are easier than Notepad) and the ZIP from your Forge Zone account. Keep the original ZIP unchanged. Never send passwords, API keys, payment details or tenants' private data to an AI tool.

Keystead is a static HTML, CSS and JavaScript page. It has **no backend, no live search, no listings database, no booking calendar and no forms**. The browse bar under the hero is a row of links to sections on the page; it does not search or filter. Every "Ask about this home", "Book a viewing" and landlord button opens the visitor's email app. All homes, prices, dates, the address and the opening hours are sample content.

## Step 1 - Unzip and open the template

1. Extract the whole ZIP (Windows: **Extract All**; macOS: double-click).
2. Open the `keystead` folder until you see `index.html` beside `assets`.
3. Double-click `index.html`. If it opens as text, use **Open with** and pick your browser.
4. Scroll the whole page and try the menu, the browse bar and the buttons before changing anything.

```text
keystead/
├── index.html
├── assets/css/style.css
├── assets/js/main.js
├── assets/img/        (7 WebP photos)
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
```

**Correct result:** the street photo with the white headline, the white browse bar and six listing cards with photos appear. A `file:///` address is normal. If the page looks unstyled or photos are missing, extract the full ZIP again and keep `assets` next to `index.html`.

## Step 2 - Keep the original and make a working copy

Copy the extracted folder and name it `website-working-copy`. Edit only the copy and never rename `index.html`, `assets/css/style.css`, `assets/js/main.js` or the `assets/img` folder. Before a big change, copy the working folder again (for example `website-backup-01`). Save files as UTF-8 with their real extension, not `index.html.txt`.

**Correct result:** an untouched original plus a working copy. Save, then refresh the browser to see each change.

## Step 3 - Prepare your business information

Collect, in plain language: agency name; the city and neighbourhoods you cover; the homes you want to show (name, area, bedrooms, bathrooms, size, monthly rent, availability date) and a photo of each that you may legally use; your lease terms; how viewings work; public email, phone and office address; opening hours; whether you take landlord enquiries; the language of the site; logo and colours. Undecided items are fine while editing but must be resolved before publishing.

## Step 4 - Start working with AI

In a chat tool, attach the working ZIP, or all files and say CSS is at `assets/css/style.css`, JavaScript at `assets/js/main.js` and photos in `assets/img/`. If the AI works directly in a folder, give it `website-working-copy` only. A screenshot helps with visual problems but never replaces the files. **In every new chat, attach the latest files again and start with Prompt 01.**

**Prompt 01 - Set up my website editing assistant**

```text
I bought the Keystead static website template from Forge Zone and want to
turn it into my own website. I am not a developer; guide me in small steps.

First read every file I provide: index.html, assets/css/style.css,
assets/js/main.js, CUSTOMISE.md, README.md and LICENCE.txt. Photos are in
assets/img/. Tell me which files you read and which are missing. Do not guess
missing files and do not edit anything yet.

Summarise the sections, working links, sample-only parts (homes, prices,
dates, address, opening hours, neighbourhoods) and every item I must replace.
Explain that the browse bar only links to sections. Then ask for my
information in small groups: agency, areas, homes, lease terms, contact
details, language and website goal. Let me answer "not decided".

Throughout this task:
- Keep plain HTML, CSS and JavaScript, relative paths, and index.html opening
  directly. No framework, package manager, build step or new dependency.
- Keep the style unless I ask otherwise, plus responsive layout, keyboard
  navigation, visible focus, readable text and reduced-motion support.
- Never invent homes, prices, sizes, dates, fees, addresses, reviews or URLs.
- Do not add tracking, a backend, a fake search or hidden form submission.
- Edit only my working copy, or return complete files with their exact
  relative paths. Never write "rest unchanged" inside a file.
- After each edit, list what changed, how to view it and what you tested.
- Do not publish, overwrite a live site or change domain settings.
```

**Correct result:** the AI names the real files and asks for your information. If it proposes a framework, repeat that the structure must stay.

## Step 5 - Replace the name, listings and contact actions

**Prompt 02 - Personalise all website content**

```text
Use the latest files I attach. If this is a new chat, ask for all files and
run Prompt 01 first. Before editing, ask me for: agency name, city and
neighbourhoods, tone, the homes to show (name, area, bedrooms, bathrooms,
size, monthly rent, availability), lease terms, how viewings work, public
contact details, opening hours and the language.

List missing information and every sample claim I cannot support (for
example "6 homes open for viewing this month", "Every home visited",
"Same-week viewings", "reply within one working day"). Then update title,
metadata, navigation, hero, browse bar counts, promises, all listing cards,
neighbourhoods, steps, landlord section, contact details, footer, alt text
and accessible labels (each listing link has an aria-label with the home's
name). Keep counts consistent across the page. Keep the layout. Remove
unsupported claims instead of inventing new ones. Return complete changed
files with exact relative paths and a list of items still to confirm.
```

**Prompt 03 - Connect every button to the right destination**

```text
Audit every button, link, menu item, browse-bar link and email link in the
latest files. Make a table: visible label, current destination, works or
not, destination it should use. Ask me for my primary action (for example a
real booking page or phone number), any secondary action and social links,
or permission to remove them; use only what I confirm. Use mailto: for
email, tel: for phone and https for external pages. Keep the email subject
line for each home. Keep section links working. Never simulate a search,
booking or form. Return complete changed files with exact paths and a
click-test checklist.
```

## Step 6 - Change colours, fonts, photos or sections

Make one kind of change at a time and refresh after each one.

**Prompt 04 - Apply my colours and fonts safely**

```text
Read the latest HTML and CSS first. Ask me for my main dark colour, accent
colour (used for prices and badges), page background, text colours and the
font; allow "keep current". Apply my answers through the existing :root
variables, keeping layout and responsive rules. Check contrast of body text,
prices and the "Available" badge, white text on dark buttons, the landlord
band and footer, links, focus and hover states, text over the hero photo and
mobile views. Keep fallback fonts and add no paid font unless I confirm a
licence. Return the complete CSS, any HTML changes, and any colour pair that
still needs review.
```

**Prompt 05 - Replace the hero photo, a listing photo or the logo**

```text
I will attach the latest files and my photo. Ask where it should go (hero
street photo, which listing card, or the logo) and confirm I may publish it
and that it shows the real home. Inspect the current image first, then tell
me the file name, format (WebP preferred), pixel size and folder: hero about
1400 x 780 px, listing photos 800 x 600 px (4:3), each under 300 KB. Keep
relative paths, the width and height attributes, loading="lazy" on listing
photos and the dark overlay on the hero so the text stays readable. Write
accurate alt text for listing photos; the hero photo stays alt="". Return
complete changed files and where to put each image.
```

**Prompt 06 - Translate the whole website**

```text
Ask which language I want, then translate every visitor-facing string in the
latest files: metadata, navigation, headings, text, buttons, listing details,
badges, alt text, aria-labels, email subject lines and footer. Update the
html lang attribute. Keep names, emails, phone numbers, prices and URLs
unless I give new ones. Keep HTML structure, classes, IDs, paths and
JavaScript. Check for text overflow at 320, 375, 820 and 1440 px, especially
the browse bar and listing titles. Return complete changed files with exact
paths and list phrases I should confirm.
```

**Prompt 07 - Add or remove a listing, neighbourhood or section**

```text
Use the latest files. Ask whether I want to add or remove a listing card,
neighbourhood, promise, step or whole section, and for its real content and
photo. Do not edit until I answer. Find the complete HTML block and related
CSS, explain the smallest safe change, then edit without empty wrappers,
broken anchors, unused menu or browse-bar links, wrong counts ("3 listed",
"2 homes listed", the hero pill) or JavaScript errors. Keep spacing,
responsive layout, keyboard access and reduced motion. Return complete
changed files with exact paths and a desktop and mobile checklist.
```

## Step 7 - Test before publishing

Check a narrow phone, a tablet and a wide desktop: menu, browse bar, every email link, readable text over the hero photo, all photos, keyboard focus and reduced motion.

**Prompt 08 - Audit the final website**

```text
Review the latest files before publication. Report first; change nothing yet.
Check: missing files, photos and broken paths; leftover Keystead names,
Northbank, sample homes, prices, dates, the 14 Quay Street address, opening
hours and example.com addresses; counts that disagree between sections;
title and description; heading order; alt text and aria-labels; keyboard
navigation and focus; contrast, including text over the hero photo; menu,
browse bar and buttons; horizontal overflow at 320 px; tablet and desktop
layout; reduced motion; image sizes; console errors; external, mailto and
tel links; and anything that pretends to search, book or submit. Group
findings as Blocker, Should fix or Optional with file and exact text. After
I approve, fix Blocker and Should fix items, return complete files and a
manual test list. Do not publish.
```

## Step 8 - Publish by uploading the website folder

Use a host that supports static sites. Upload the folder contents so `index.html` is at the root, together with `assets` (including the `img` folder).

**Prompt 09 - Guide me through publishing**

```text
Guide me through publishing this static HTML/CSS/JavaScript website. Ask
which hosting provider I use and whether I upload manually, use Git or a
command line. Use screen labels only when sure; otherwise describe what to
look for. Give one small step at a time: which folder contents to upload, how
to recognise success and where to find the public URL. Never ask for
passwords, API keys, recovery codes or payment details, and do not change
domain settings. Finish with checks for home page, CSS, JavaScript, every
photo, links, mobile layout and HTTPS.
```

**Correct result:** the public URL shows the same page as your working copy, including all photos.

## Step 9 - Connect a custom domain if needed

Publish on the host's temporary URL first, then connect your domain. DNS changes can take time.

**Prompt 10 - Connect my domain using the real configuration**

```text
Help me connect my domain to my published static site. Ask which host and
which domain/DNS provider I use. Do not invent DNS values: ask me to copy the
exact records my host shows (type, name, value, whether www is needed) and to
hide account IDs or tokens. Compare them with my current records and explain
one change at a time. Warn before replacing a record and never remove email
MX or TXT records. Then show me how to check the root domain, www, HTTPS and
redirects.
```

## Step 10 - Update and recover safely

Keep a known-good backup of every published version. When a home is let, update or remove its card in a fresh copy, test locally, then publish.

**Prompt 11 - Update one part and preserve everything else**

```text
Read the latest published-source files I attach. Ask for the exact update
(for example a new price, a home that has been let, new opening hours), then
change only that item and any count that depends on it. Keep all other copy,
links, layout, colours, responsive rules, accessibility and paths. Before
editing, name the file and smallest block to change. Return complete changed
files, the exact difference and a local test. Do not publish or change
domain settings.
```

**Prompt 12 - Find and fix a website problem**

```text
Help me fix a problem in my static website. I will attach the latest files.
Ask what I expected, what happened, which section, device and browser, what
changed last, and any exact browser error ("none seen" is fine). Read the
files first, find the most likely cause and show the evidence in the code.
Prefer the smallest fix; no rewrite, no new dependencies. Return complete
changed files with exact paths and a short test. If evidence is missing, ask
for one specific screenshot, console message or file instead of guessing.
```

## Keystead — exact edit map

Counts are literal, case-sensitive matches in version 1.0.0. Search the text in your editor; keep surrounding markup unless told to replace the whole block.

| File | Search literally | Count | What to do |
|---|---|---:|---|
| `index.html` | `Keystead` | 11 | Name in title, share title, description, logos, hero text, sections and footer. Replace all. |
| `index.html` | `Keystead Lettings` | 1 | Company name in the copyright line. |
| `index.html` | `Northbank` | 8 | Sample city name in metadata, hero, listings, neighbourhoods and landlord section. |
| `index.html` | `6 homes open for viewing` | 1 | Hero pill. Keep it equal to the number of listing cards, or delete the line. |
| `index.html` | `Browse homes, apartments` | 1 | Hero headline. |
| `index.html` | `class="browse__item"` | 4 | Browse-bar links. Each one points to a section; update its label and count ("3 listed"). |
| `index.html` | `class="promise"` | 4 | The four promise cards under the browse bar. Delete a whole block to remove one. |
| `index.html` | `class="listing"` | 6 | Listing cards: photo, title, price, details, badge and email link. Copy or delete a whole `<article>` block. |
| `index.html` | `class="listing__price"` | 6 | Monthly rent of each home. |
| `index.html` | `class="listing__badge"` | 6 | Availability date of each home. |
| `index.html` | `Ask about this home` | 12 | Visible link text plus the matching `aria-label` on each card. Keep the home's name in each `aria-label`. |
| `index.html` | `assets/img/` | 7 | The seven photo paths (one hero, six listings). |
| `index.html` | `hero-street.webp` | 1 | Hero photo. Keep `alt=""`; it is decorative. |
| `index.html` | `class="area"` | 4 | Neighbourhood cards with their "homes listed" counts. |
| `index.html` | `class="step"` | 3 | How renting works. |
| `index.html` | `mailto:hello@example.com` | 9 | Six listing links, the landlord button, the booking button and the footer email. They open an email app only. |
| `index.html` | `hello@example.com` | 10 | The nine links above plus the visible address in the contact details. |
| `index.html` | `14 Quay Street` | 1 | Sample office address. |
| `index.html` | `9:00–18:00` | 1 | Sample opening hours. |
| `index.html` | `sample content` | 1 | Footer note. Delete it once every sample item is replaced. |
| `index.html` | `class="logo__mark"` | 2 | Header and footer logo SVG. |
| `index.html` | `Plus+Jakarta+Sans` | 1 | Google Fonts link. Replace it if you change the font. |
| `assets/css/style.css` | `:root {` | 1 | All colour, font and spacing tokens. |
| `assets/css/style.css` | `--ink:` | 1 | Dark colour for headings, dark buttons, the landlord band and footer. |
| `assets/css/style.css` | `--accent:` | 1 | Prices, badges and step numbers. Must stay readable on white and on `--accent-soft`. |
| `assets/css/style.css` | `--accent-soft:` | 1 | Background of the "Available" badge. |
| `assets/css/style.css` | `--bg:` | 1 | Page background. |
| `assets/css/style.css` | `--font:` | 1 | Font stack with system fallbacks. |
| `assets/css/style.css` | `--hero-fallback:` | 1 | Dark colour behind the hero text if the photo is missing. |
| `assets/css/style.css` | `.hero::before` | 1 | Dark overlay on the hero photo. Keep it so the white text stays readable. |
| `assets/css/style.css` | `object-position: center 40%` | 1 | Which part of the hero photo stays visible when it is cropped. |
| `assets/css/style.css` | `@media (max-width: 1080px)` | 1 | Browse bar switches to two columns. |
| `assets/css/style.css` | `@media (max-width: 960px)` | 1 | Menu breakpoint (the same number is in `main.js`). |

### Template notes

Keystead, Northbank, the neighbourhoods, homes, prices, sizes, dates, address and opening hours are fictional sample content, and the photos are AI-generated images of imagined places (see `LICENCE.txt`). Replace every listing photo with a real photo of the home before publishing. Google Fonts is the only network dependency; offline, the fallback fonts are used.

After each change, also check both sides of the 960 px menu breakpoint, the 1080 px browse-bar breakpoint and 200% zoom. Prompts are tasks for a chat tool, not a promise it can edit your computer.
