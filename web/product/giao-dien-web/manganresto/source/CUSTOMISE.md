# Manganresto customisation guide

This guide takes you from the downloaded ZIP file to a fully customized website you can publish. Follow the steps in order the first time. Every AI prompt below is complete: copy it, attach the requested files, and let the AI ask for any missing details.

## Before you begin

Prepare a computer, a modern browser, a text editor, and the ZIP file from your Forge Zone account. Keep the original ZIP unchanged. Never send passwords, API keys, payment details, or private customer data to an AI tool.

Manganresto is a fine-dining culinary showcase template. Attach all image files when asking an AI to change artwork. Dish names, prices, and booking forms are demonstration material. Your template is a static website built with pure HTML, CSS, and JavaScript. It does not include a database or payment gateway backend.

## Step 1 - Unzip and open the template

1. Download the ZIP file to a folder you can find easily.
2. Extract the whole ZIP. On Windows choose **Extract All**. On macOS double-click the ZIP.
3. Open the extracted folder until you see `index.html` beside the `assets` folder.
4. Double-click `index.html`. If it opens in a text editor, use **Open with** and choose your browser.
5. Scroll through the full page and try the menu, search, category filter, and links before changing anything.
6. Open `README.md` and `CUSTOMISE.md` in a text editor.

Expected structure:

```text
template-folder/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/hero-plate.webp, dish-breakfast.webp, dish-appetizer.webp
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
```

**Correct result:** the demo layout, colours, and sample culinary content are visible. A `file:///` address is normal because the page is opening locally on your computer.

## Step 2 - Keep the original and make a working copy

1. Keep the downloaded ZIP as your clean original.
2. Copy the extracted template folder and name the copy `website-working-copy`.
3. Edit only the working copy. Do not rename `index.html`, `assets/css/style.css`, or `assets/js/main.js`.
4. Before a major change, copy the working folder to a separate folder such as `website-backup-01`.
5. Save files as UTF-8 and keep their real extension. Avoid names such as `index.html.txt`.

**Correct result:** you have an untouched original and a separate working copy. Save each change, then refresh the browser to inspect it.

## Step 3 - Prepare your business information

Collect the information below. You may give it directly to AI in plain language:

| Information | What to prepare |
|---|---|
| Brand name | The restaurant name shown in header and browser tab |
| Culinary style | Italian, French, Mediterranean, Asian fusion, or contemporary bistro |
| Headline & Tagline | Your main inviting motto and opening statement |
| Menu categories | Breakfast, Lunch, Dinner, Tasting Menu, Cocktails |
| Signature dishes | Dish names, detailed descriptions, prices, and dietary tags |
| Master chefs | Chef names, positions, credentials, and brief culinary bios |
| Address & Hours | Physical street address, opening hours by day of week |
| Reservation details | Public phone number, inquiry email, and table booking rules |

## Step 4 - Choose your customization method

### Option A: Edit directly in a text editor
Open `assets/css/style.css` to update CSS tokens (`--accent-gold`, `--bg-dark`, `--font-sans`). Open `index.html` to modify text and sections. Open `assets/js/main.js` to update the `menuData` array.

### Option B: Use an AI assistant
Use the 12 complete prompts below. Attach `index.html`, `assets/css/style.css`, and `assets/js/main.js` along with your instructions.

---

## Step 5 - Complete AI prompts library

**Prompt 01 - Update business identity and branding**

```text
I am customizing the Manganresto website template for my dining enterprise.
Here is my restaurant brand information:
- Restaurant Name: (ask me for this information before editing)
- Tagline & Motto: (ask me for this information before editing)
- Culinary Style: (ask me for this information before editing)
- Primary Accent Color: (ask me for this information before editing)

Please update index.html and assets/css/style.css. Update all brand occurrences, meta tags, titles, and color tokens. Preserve the layout structure, accessibility attributes, and responsive rules. Return the complete modified files.
```

**Prompt 02 - Update hero section and value proposition**

```text
Use the latest website files. I want to update the hero section with my restaurant's unique dining proposition:
- Headline: (ask me for this information before editing)
- Subtitle & Invitation: (ask me for this information before editing)
- Call-to-action buttons: (ask me for this information before editing)
- Key statistics / metrics: (ask me for this information before editing)

Update the hero section in index.html while maintaining the organic dual-tone backdrop and centerpiece layout. Return the complete changed files.
```

**Prompt 03 - Update menu categories and dishes**

```text
Use the latest website files. I want to replace the demo dishes with our actual dining menu:
- Menu Categories: (ask me for this information before editing)
- Dishes list with name, description, price, category tag, and dietary notes: (ask me for this information before editing)

Update index.html and the menuData array in assets/js/main.js so both the on-page grid and interactive search modal reflect our dishes. Keep all tab filtering logic intact.
```

**Prompt 04 - Update chef biographies and kitchen story**

```text
Use the latest website files. Update the About and Chefs sections with our actual team:
- Kitchen Story & Sourcing Philosophy: (ask me for this information before editing)
- Featured Chefs (Name, Role, Bio, Initials): (ask me for this information before editing)

Update the corresponding sections in index.html. Ensure all headings, text contrast, and avatar frames remain polished and accessible.
```

**Prompt 05 - Update location, hours, and reservation details**

```text
Use the latest website files. Update the location and contact section:
- Physical Address: (ask me for this information before editing)
- Operating Hours: (ask me for this information before editing)
- Reservation Phone & Inquiries Email: (ask me for this information before editing)

Update index.html, footer information, and reservation booking placeholders. Return complete changed files.
```

**Prompt 06 - Translate website into another language**

```text
Translate every visitor-facing string in the latest website into (ask me for this information before editing).
This includes metadata, navigation, headings, paragraphs, buttons, labels,
form messages, image alt text, accessibility labels, and footer text.

Keep brand names, registered product names, email addresses, phone numbers,
and URLs unchanged unless I provide replacements. Preserve HTML structure,
class names, IDs, paths, and JavaScript behaviour. Adapt wording naturally
rather than translating word by word. After editing, check for text overflow
at 360 px and on desktop. Return complete changed files and list any phrase
whose meaning needs my confirmation.
```

**Prompt 07 - Add or remove a section or feature**

```text
Use the latest website files. I want to (ask me for this information before editing) this item or section:
(ask me for this information before editing).

First identify the complete HTML block and any matching CSS or JavaScript.
Explain the smallest safe change. Then edit without leaving empty wrappers,
broken anchors, unused navigation links, or JavaScript errors. Keep spacing,
visual hierarchy, responsive behaviour, and keyboard accessibility. Return complete changed files.
```

## Step 6 - Image replacement guidance

- `hero-plate.webp`: 1024×1024 circular cutout plate, transparent background. Centerpiece dish on desktop and mobile.
- `dish-breakfast.webp`: 800×800 circular cutout plate, transparent background. Used in mini cards and menu cards.
- `dish-appetizer.webp`: 800×800 circular cutout plate, transparent background. Used in mini cards and menu cards.

**Prompt 08 - Audit the final website**

```text
Audit the latest website files as a final pre-publication review. Do not make
changes until you report the findings.

Check: missing files and broken relative paths; leftover demo names, sample
text, placeholder prices, fake reviews, and placeholder URLs; page title and
description; heading order; alt text; labels; keyboard navigation and visible
focus; colour contrast; menu and button behaviour; horizontal overflow at
360 px; tablet and desktop layout; console errors; external links; mailto and
tel links; and whether any form only pretends to submit.

Group findings as Blocker, Should fix, or Optional. For each finding name the
file and exact text or selector. After I approve the list, fix the Blocker and
Should fix items, return complete changed files, and provide a manual test
checklist. Do not publish the website.
```

## Step 7 - Test before publishing

Test the website at a narrow phone width (320px, 375px), a tablet width (820px), and a wide desktop (1440px). Verify that navigation, modal dialogs, search filter, and forms behave correctly without horizontal scrolling.

**Prompt 09 - Guide me through publishing**

```text
Guide me through publishing this static HTML/CSS/JavaScript website on
(ask me for this information before editing). I am not a developer. Use the provider's current screen
labels only when you are sure of them; otherwise tell me what concept to look
for instead of guessing.

My website folder contains index.html and an assets folder. First ask what I
can see in my hosting dashboard and whether I am uploading manually, using a
Git repository, or using the provider's command line. Then give one small step
at a time. Explain exactly which folder contents to upload, how to recognise a
successful deployment, and how to find the public URL. Do not ask for my
password, API key, recovery code, or payment details. Do not change domain
settings until I request it. Finish with checks for the home page, CSS,
JavaScript, images, links, mobile layout, and HTTPS.
```

**Prompt 10 - SEO and social sharing optimization**

```text
Review the metadata in index.html for search engine optimization and social graph sharing:
- Restaurant Name: (ask me for this information before editing)
- City / Neighborhood: (ask me for this information before editing)
- Primary Cuisine: (ask me for this information before editing)

Update title, description, Open Graph tags, and canonical links. Ensure tags conform to standards without external dependencies. Return the modified head block.
```

**Prompt 11 - Perform a surgical single-item edit**

```text
Read the latest published-source files I attach. Change only this item:
(ask me for this information before editing).

Preserve all other approved copy, links, layout, colours, responsive rules,
accessibility behaviour, and file paths. Before editing, name the file and the
smallest block that needs to change. After editing, return complete changed
files, summarise the exact difference, and tell me how to test it locally.
Do not publish or alter domain settings.
```

**Prompt 12 - Find and fix a website problem**

```text
Help me diagnose a problem in my static website. I will attach the latest
files and provide:
- What I expected: (ask me for this information before editing)
- What happened: (ask me for this information before editing)
- Where it happens: (ask me for this information before editing)
- When it started: (ask me for this information before editing)
- Any browser error: (ask me for this information before editing)

Read the files before suggesting a fix. Identify the most likely cause and
show the evidence in the code. Prefer the smallest fix and do not rewrite the
site or add dependencies. Preserve the current design and responsive rules.
Return complete changed files and give me a short test to confirm the problem
is fixed. If the evidence is insufficient, ask for one specific screenshot,
console message, or file instead of guessing.
```

## Step 8 - Quick troubleshooting

| Problem | First check |
|---|---|
| Page has no styling | Confirm `assets/css/style.css` exists and the HTML path is unchanged |
| Images do not appear | Check file name, extension, letter case, and relative path |
| A button does nothing | Inspect its real `href` or JavaScript listener |
| Mobile layout is too wide | Look for fixed pixel widths and test at 320 px |
| Changes are not visible | Save the correct file and hard refresh the browser (Ctrl+F5) |
| Published site shows 404 | Put `index.html` at the publish root and check host directory settings |

## Step 9 - Final pre-launch checklist

- [ ] The original ZIP and a known-good backup are stored safely.
- [ ] All demo brands, copy, statistics, prices, and URLs are replaced with verified facts.
- [ ] The page title, description, contact details, links, and calls to action are correct.
- [ ] Every dish image loads cleanly and has descriptive alt text.
- [ ] The site works at 320 px, 375 px, 820 px, and 1440 px without horizontal overflow.
- [ ] Menu navigation, category tabs, search modal, and reservation form operate smoothly.
- [ ] All forms provide immediate, accessible feedback.

---

## Step 10 - Manganresto editing map

Counts are literal, including metadata and accessible labels. Keep anchors and selectors synchronised.

| File | Literal text or selector | Count | Edit |
|---|---|---:|---|
| `index.html` | `Manganresto` | 15 | Brand, metadata, descriptions and headings |
| `index.html` | `reservations@manganresto.demo` | 2 | Replace demo email |
| `index.html` | `hero-plate.webp` | 4 | Hero centerpiece and menu pasta previews |
| `index.html` | `dish-breakfast.webp` | 3 | Mini card and breakfast menu items |
| `index.html` | `dish-appetizer.webp` | 3 | Mini card and appetizer menu items |
| `index.html` | `Best Cheff` | 1 | Chef counter headline |
| `index.html` | `Best Menu` | 2 | Menu counter headline |
| `index.html` | `fonts.googleapis.com` | 2 | Optional font service links |
| `assets/css/style.css` | `--accent-gold:` | 1 | Primary warm amber gold accent token |
| `assets/css/style.css` | `--bg-dark:` | 1 | Primary dark slate background token |
| `assets/css/style.css` | `--font-sans:` | 1 | Primary body and heading font family |
| `assets/css/style.css` | `--font-serif:` | 1 | Accent serif font family |
| `assets/js/main.js` | `menuData` | 4 | Search modal data array and references |
| `assets/js/main.js` | `hero-plate` | 2 | Hero plate element selectors |

### Images, typography and illustrative claims
All three local WebP files are square transparent cutouts. Preserve exterior alpha and generous margins. Optional Google Fonts: Plus Jakarta Sans and Playfair Display; system fallbacks intentionally differ offline while preserving layout stability. Replace sample dishes, prices, and chef bios with your genuine restaurant offerings.
