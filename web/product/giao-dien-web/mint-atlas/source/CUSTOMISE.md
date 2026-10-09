# Customise Mint Atlas

This guide takes you from the downloaded ZIP file to a website you can publish. Follow the steps in order the first time. Every AI prompt below is complete: copy it, attach the requested files, and let AI ask for any missing information.


Mint Atlas is a static, original character dossier. There is no login, search, messaging, game service, API, tracking or account storage. Native ability summaries open/close, navigation goes to real sections, artwork links open local full images and contact uses mailto. Mira Vale, her world, abilities and scores are fictional concept content. Replace sample email before publishing.

## Product edit map

Counts are literal matches in the named files.

| File | Literal text | Count | Change |
|---|---|---|---|
| `index.html` | `Mint Atlas` | 5 | Brand, metadata, accessible home name and footer |
| `index.html` | `hello@example.com` | 1 | Public contact email |
| `assets/css/style.css` | `--bg:` | 1 | Ice-blue page background |
| `assets/css/style.css` | `--accent:` | 1 | Deep teal accent |
| `assets/js/main.js` | `950px` | 1 | Mobile menu breakpoint, keep CSS aligned |

- Character: `#hero-title`, `.hero__intro`, `.hero__description`, `.traits`, `.story`, accessible labels and alt text. Replace Mira Vale consistently in these locations.
- Hero: `.hero__character` displays `assets/img/mira.webp`,800×1200 with alpha transparency. Keep alpha; its negative top offset creates the pop-out above the card. `.hero__canvas` contains CSS gradient, stars and circles; never bake the UI text into an image. At phone widths character sits above text with a short lower fade.
- Abilities: three `.ability` native details blocks. Update summaries and descriptions together. These work without JavaScript and are character concepts, not gameplay.
- Statistics: `.chart__bar` values80/92/68/75 are scores out of100. Update visible values, chart aria-label and CSS `nth-child` score percentages together. The chart is illustrative, not live data.
- Artwork: `glasshouse.webp` and `starlight.webp`,800×1200. Each `.art-card` image and its parent href must reference the same artwork. Update width/height/alt/accessible link labels and keep paths relative. Keep replacement images below300KB where practical. Artwork opens in the same tab; browser Back returns to the dossier.
- Fonts: CSS `--font` uses Trebuchet MS/Segoe UI/system sans; editorial book and story headings use Georgia. No font binaries or network service. Inspect layout after changing fonts.
- Menu: `.nav-toggle`, `#site-menu`,950px CSS/JS. Preserve Escape, focus return, closed-menu tab behavior and resize state. Without JS all navigation stays visible.
- Motion:300ms finite artwork hover zoom, enabled by default even with OS reduced preference per product brief. No autonomous animation or reveal, no background loops. The general prompts below mention reduced motion; preserve this product's finite default when customising unless you request another behavior.
- Files: six HTML/CSS/JS/document core files plus three WebPs in `assets/img/`. Include all images when attaching the ZIP to AI; otherwise attach them alongside the six files. Each generated artwork may be used on finished websites under LICENCE.txt; no standalone stock resale.

Follow the ten steps and twelve prompts below using this map. In Prompt05 identify the hero or gallery location; in Prompt08 also test native abilities and full artwork links. Keep original-world demo labels until replaced with verified content.
## Before you begin

Prepare a computer, a modern browser, a text editor, and the ZIP file from your Forge Zone account. Keep the original ZIP unchanged. Never send passwords, API keys, payment details, or private customer data to an AI tool.

Your template is a static website built with HTML, CSS, and JavaScript. It does not include a backend, payment processing, or a working form submission service unless the product page explicitly says so.

## Step 1 - Unzip and open the template

1. Download the ZIP file to a folder you can find easily.
2. Extract the whole ZIP. On Windows choose **Extract All**. On macOS double-click the ZIP.
3. Open the extracted folder until you see `index.html` beside the `assets` folder.
4. Double-click `index.html`. If it opens in a text editor, use **Open with** and choose your browser.
5. Scroll through the full page and try the menu and links before changing anything.
6. Open `README.md` and `CUSTOMISE.md` in a text editor.

Expected structure:

```text
mint-atlas/
├── index.html
├── assets/
│   ├── css/style.css
│   └── js/main.js
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
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
I bought Mint Atlas and am not a developer. First read all attached index.html, assets/css/style.css, assets/js/main.js, README.md, CUSTOMISE.md, LICENCE.txt and three assets/img WebPs. Name missing files; never guess or edit them. Summarise real sections, navigation, native abilities, local artwork links and fictional character/scores. Ask for brand, character information, permitted artwork, public contact, language and website goal in small groups. Preserve plain HTML/CSS/JS, relative paths, offline file opening, accessibility, responsive layout and finite motion. Never invent rights or facts, add tracking/backend/accounts/payments or fake success. Edit only the working copy or return complete files with exact destinations, no omissions. Report actual tests. Do not publish or change DNS.
```

**Correct result:** AI identifies the actual template files and asks for your information. If it suggests rebuilding with a framework, repeat the instruction to preserve the current structure.

## Step 5 - Replace the brand, copy, and contact actions

Give AI verified business information. If something is missing, ask it to remove the claim or mark it clearly for later review. Then use these prompts in the same conversation.

**Prompt 02 - Personalise all website content**

```text
Use the latest Mint Atlas files. Ask me for my brand, audience, character biography, abilities, verified scores or concept labels, public email, permitted images and language before editing. Replace sample copy, metadata, traits, story, chart labels/aria values, alt and footer consistently. Keep fictional disclosures until verified information replaces them. Do not invent claims or artwork rights. Preserve layout and behavior. Return every changed file in full, exact paths, remaining demo content and tests.
```

**Prompt 03 - Connect every button to the right destination**

```text
Audit every link and control in my current Mint Atlas files. Make a table of label, destination and real behavior. Ask for verified public email and any external artwork/profile URLs. Preserve internal anchors and native ability details; full artwork links must match each local image. Do not simulate login/search/messages. Use mailto for supplied email and HTTPS for external destinations. Return complete changed files and a click checklist including artwork and browser Back.
```

## Step 6 - Change colours, fonts, images, or sections when needed

Make one type of visual change at a time and refresh the page after each one. Attach the latest files every time you start a new AI chat.

**Prompt 04 - Apply my colours and fonts safely**

```text
Read current HTML/CSS. Ask for my colours and font preferences in plain language. Reuse root variables and preserve the mint character layout. Check panels, text over gradient, icon controls, hover and visible focus for actual contrast. Use permitted fonts and local fallbacks; ask before adding paid/network fonts. Return complete changed files and tested colour pairs, identifying any unresolved contrast.
```

**Prompt 05 - Replace the logo or illustration with my image**

```text
Read latest files and my attached permitted artwork. Ask which location it belongs to: transparent hero, Glasshouse or Starlight portrait. Recommend exact format/dimensions/relative folder before editing. Keep genuine alpha on hero, preserve aspect ratio and stable layout, update src/href/width/height/alt and accessible labels consistently. Inspect top-edge protrusion and portrait crops at320/375/820/1440px. Return complete changed files and placement instructions; report any important crop.
```

**Prompt 06 - Translate the whole website**

```text
Ask my desired language. Translate every visitor-facing string in latest HTML/JS, including metadata, labels, alt, chart description, ability details, footer and demo disclosure. Preserve character/brand names, IDs, relative paths and URLs unless I request replacement. Keep menu and native interactions working and check long text at320px. Return complete files and ambiguous translations needing my answer.
```

**Prompt 07 - Add or remove a service or section**

```text
Ask which ability, artwork or section I want added or removed, and collect its verified copy, permitted image and real destination. Identify complete matching HTML, CSS and any JS before the smallest safe update. Preserve character identity, navigation, native details, chart description and responsive layout. Remove orphaned links or unused selectors. Return complete changed files and consistency tests without adding services.
```

## Step 7 - Test before publishing

Test the website at a narrow phone width, a tablet width, and a wide desktop. Check navigation, all links, readable text, image loading, keyboard focus, and reduced motion.

**Prompt 08 - Audit the final website**

```text
Audit my latest files before editing. Check assets, relative paths, metadata, demo copy, labels, chart score consistency, headings, keyboard/focus, text contrast, hero protrusion, overflow at320/375/820/1440px, menu Escape/resize, ability details, full-artwork links/Back, noJS/offline, finite hover and console errors. Report Blocker/Should fix/Optional with file/selector evidence. After I approve fixes return complete changed files and a manual checklist. Do not publish or claim game services.
```

## Step 8 - Publish by uploading the website folder

Choose a host that supports static websites. Upload the contents of the working folder so `index.html` is at the published root. Do not upload only the HTML file; the `assets` folder must travel with it.

**Prompt 09 - Guide me through publishing**

```text
Ask which static hosting provider I use and what I see in its dashboard. Guide one small step at a time for uploading index.html and the entire assets folder with relative paths preserved. Do not guess UI labels or request passwords/keys. Explain verification of HTTPS, CSS/JS/images, mobile menu, native abilities and full-artwork links. Do not change domains yet. Return a public-site checklist and only claim actions actually performed.
```

**Correct result:** the public URL opens the same page as your local working copy, including CSS, JavaScript, and images.

## Step 9 - Connect a custom domain if needed

Publish successfully on the host's temporary URL first. Then connect your domain. DNS changes may take time, so keep the working deployment available while waiting.

**Prompt 10 - Connect my domain using the real configuration**

```text
Ask for my domain provider and the exact DNS instructions displayed by my hosting service, hiding private values. Do not invent DNS records. Compare current records and explain one change at a time, warn before overwriting, preserve email MX/TXT. Verify root/www, HTTPS and redirects. Never request secrets or recovery codes; wait for actual configuration.
```

## Step 10 - Update and recover safely

Keep one known-good backup for every published version. Make changes in a fresh working copy, test locally, and publish only the changed website files.

**Prompt 11 - Update one part and preserve everything else**

```text
Ask what exact part of my current Mint Atlas website should change. Read current files and identify the smallest affected block. Preserve approved copy, paths, IDs, artwork transparency, palette, keyboard/responsive behavior and all unrelated content. Edit only my working copy or return complete changed files with exact destinations and tests. Do not publish or change domain settings.
```

**Prompt 12 - Find and fix a website problem**

```text
Read latest files. Ask what I expected, what happened, device/browser, when it began, last change and exact error or screenshot. Diagnose from actual code evidence and request any missing file instead of guessing. Apply the smallest fix without rebuilding or adding dependencies; preserve style, assets, native controls and relative paths. Return complete changed files, recovery instructions and a confirmation test. Never ask for secrets.
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
- [ ] Menu, buttons, keyboard focus, and reduced motion work correctly.
- [ ] No form pretends to submit and no unsupported feature is promised.
- [ ] The public URL loads HTML, CSS, JavaScript, images, and HTTPS correctly.
- [ ] The latest published source is backed up before the next change.
