# Tidal — your website, step by step

This guide takes you from the downloaded ZIP to a website you can publish. Follow the steps in order the first time. Every prompt below is complete: copy it, attach the files it asks for, and answer the AI's questions in plain language. You never need to fill in code, selectors or technical settings.

## Before you begin

You need a computer, a modern browser, a text editor (VS Code or Sublime Text are easier than Notepad) and the ZIP from your Forge Zone account. Keep the original ZIP unchanged. Never send passwords, API keys, payment details or private donor data to an AI tool.

Tidal is a static HTML, CSS and JavaScript page. It has **no backend, no donation system, no payments and no live data**. The buttons open an email app. The temperature card and all figures are sample content.

Two blanks ship on purpose so you cannot publish a made-up figure by accident: the sponsorship price in the call to action and the registration number in the footer (see the edit map at the end).

## Step 1 - Unzip and open the template

1. Extract the whole ZIP (Windows: **Extract All**; macOS: double-click).
2. Open the `tidal` folder until you see `index.html` beside `assets`.
3. Double-click `index.html`. If it opens as text, use **Open with** and pick your browser.
4. Scroll the whole page and try the menu and links before changing anything.

```text
tidal/
├── index.html
├── assets/css/style.css
├── assets/js/main.js
├── assets/img/hero-ocean.webp
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
```

**Correct result:** the dark ocean background with the turtle, the glass panels and the sample content appear. A `file:///` address is normal. If the page looks unstyled or the ocean image is missing, extract the full ZIP again and keep `assets` next to `index.html`.

## Step 2 - Keep the original and make a working copy

Copy the extracted folder and name it `website-working-copy`. Edit only the copy and never rename `index.html`, `assets/css/style.css`, `assets/js/main.js` or `assets/img/hero-ocean.webp`. Before a big change, copy the working folder again (for example `website-backup-01`). Save files as UTF-8 with their real extension, not `index.html.txt`.

**Correct result:** an untouched original plus a working copy. Save, then refresh the browser to see each change.

## Step 3 - Prepare your organisation's information

Collect, in plain language: organisation name; what you do; who you want to reach; your programmes; figures you can prove (sites, people, results) and where they come from; your lowest sponsorship or donation amount; your charity or company registration number, if any; public email, phone and address; the main action (email, phone or a real donation page URL); language; logo, colours and images you may legally use. Undecided items are fine while editing but must be resolved before publishing.

## Step 4 - Start working with AI

In a chat tool, attach the working ZIP, or all seven files and say CSS is at `assets/css/style.css`, JavaScript at `assets/js/main.js` and the hero image at `assets/img/hero-ocean.webp`. If the AI works directly in a folder, give it `website-working-copy` only. A screenshot helps with visual problems but never replaces the files. **In every new chat, attach the latest files again and start with Prompt 01.**

**Prompt 01 - Set up my website editing assistant**

```text
I bought the Tidal static website template from Forge Zone and want to turn
it into my own website. I am not a developer; guide me in small steps.

First read every file I provide: index.html, assets/css/style.css,
assets/js/main.js, CUSTOMISE.md, README.md and LICENCE.txt. The hero image is
assets/img/hero-ocean.webp. Tell me which files you read and which are
missing. Do not guess missing files and do not edit anything yet.

Summarise the sections, working links, sample-only parts, the two blanks that
must be filled (sponsorship price and registration number) and every sample
item I must replace. Then ask for my information in small groups:
organisation, programmes, figures, contact details, language and website goal.
Let me answer "not decided".

Throughout this task:
- Keep plain HTML, CSS and JavaScript, relative paths, and index.html opening
  directly. No framework, package manager, build step or new dependency.
- Keep the style unless I ask otherwise, plus responsive layout, keyboard
  navigation, visible focus, readable text and reduced-motion support.
- Never invent facts, statistics, prices, registration numbers, addresses or
  URLs.
- Do not add tracking, a backend, payments or hidden form submission.
- Edit only my working copy, or return complete files with their exact
  relative paths. Never write "rest unchanged" inside a file.
- After each edit, list what changed, how to view it and what you tested.
- Do not publish, overwrite a live site or change domain settings.
```

**Correct result:** the AI names the real files and asks for your information. If it proposes a framework, repeat that the structure must stay.

## Step 5 - Replace the name, copy and contact actions

**Prompt 02 - Personalise all website content**

```text
Use the latest files I attach. If this is a new chat, ask for all files and
run Prompt 01 first. Before editing, ask me for: organisation name, what we
do, audience, programmes, tone, public contact details, the main visitor
action, the language, my lowest sponsorship amount and my registration
number (or permission to remove that line).

List missing information and every sample figure I cannot support (reefs
under care, sites, corals replanted, survival rate, payroll, the temperature
card, "audited annually"). Then update title, metadata, navigation, hero,
promises, programmes, impact figures, call to action, footer, alt text and
accessible labels. Fill both blanks only with what I confirm. Keep the
layout. Remove unsupported claims instead of inventing new ones. Return
complete changed files with exact relative paths and a list of sample items
removed or still to confirm.
```

**Prompt 03 - Connect every button to the right destination**

```text
Audit every button, link, menu item and email link in the latest files. Make
a table: visible label, current destination, works or not, destination it
should use. Ask me for my primary action (for example a real donation page),
any secondary action and social links, or permission to remove them; use only
what I confirm. Use mailto: for email, tel: for phone and https for external
pages. Keep section links working. Never simulate a donation, payment or
sign-up. Return complete changed files with exact paths and a click-test
checklist.
```

## Step 6 - Change colours, fonts, images or sections

Make one kind of change at a time and refresh after each one.

**Prompt 04 - Apply my colours and fonts safely**

```text
Read the latest HTML and CSS first. Ask me for my two accent colours, the
darkest background colour, text colours and heading and body fonts; allow
"keep current". Apply my answers through the existing :root variables and
the body background gradients, keeping layout and responsive rules. Check
contrast of body text, dark text on the gradient buttons, accent text on the
dark background, links, focus and hover states, text over the hero image and
mobile views. Keep fallback fonts and add no paid font unless I confirm a
licence. Return the complete CSS, any HTML changes, and any colour pair that
still needs review.
```

**Prompt 05 - Replace the hero image, logo or an illustration**

```text
I will attach the latest files and my image. Ask where it should go (hero
ocean background, logo, a programme icon) and confirm I may publish it.
Inspect the current container first, then tell me the file name, format,
size and folder. For the hero, keep the file at assets/img/hero-ocean.webp or
update both places in the CSS that use it, keep a dark overlay so the text
stays readable, and keep the hero__figure wrapper so the data cards stay in
place. Use relative paths, keep the aspect ratio, avoid layout shift and write
accurate alt text for meaningful images. Return complete changed files and
where to put the image.
```

**Prompt 06 - Translate the whole website**

```text
Ask which language I want, then translate every visitor-facing string in the
latest files: metadata, navigation, headings, text, buttons, card labels, alt
text, accessible labels and footer. Update the html lang attribute. Keep
names, emails, phone numbers and URLs unless I give new ones. Keep HTML
structure, classes, IDs, paths and JavaScript. Check for text overflow at
320, 375, 820 and 1440 px. Return complete changed files with exact paths and
list phrases I should confirm.
```

**Prompt 07 - Add or remove a programme, figure or section**

```text
Use the latest files. Ask whether I want to add or remove a promise,
programme card, impact figure, hero data card or section, and for its
verified content. Do not edit until I answer. Find the complete HTML block
and related CSS, explain the smallest safe change, then edit without empty
wrappers, broken anchors, unused menu links or JavaScript errors. Do not add
many new frosted-glass panels, because they slow older phones. Keep spacing,
responsive layout, keyboard access and reduced motion. Return complete
changed files with exact paths and a desktop and mobile checklist.
```

## Step 7 - Test before publishing

Check a narrow phone, a tablet and a wide desktop: menu, every link, readable text over the ocean image, images, keyboard focus and reduced motion.

**Prompt 08 - Audit the final website**

```text
Review the latest files before publication. Report first; change nothing yet.
Check: missing files and broken paths; leftover Tidal names, sample text,
figures, the sponsorship price and registration blanks, and example.com
addresses; title and description; heading order; alt text and labels;
keyboard navigation and focus; contrast, including text over the hero image;
menu and buttons; horizontal overflow at 320 px; tablet and desktop layout;
reduced motion; console errors; external, mailto and tel links; and anything
that pretends to donate, pay or submit. Group findings as Blocker, Should fix
or Optional with file and exact text. After I approve, fix Blocker and Should
fix items, return complete files and a manual test list. Do not publish.
```

## Step 8 - Publish by uploading the website folder

Use a host that supports static sites. Upload the folder contents so `index.html` is at the root, together with `assets` (including the `img` folder).

**Prompt 09 - Guide me through publishing**

```text
Guide me through publishing this static HTML/CSS/JavaScript website. Ask
which hosting provider I use and whether I upload manually, use Git or a
command line. Use screen labels only when sure; otherwise describe what to look
for. Give one small step at a time: which folder contents to upload, how to
recognise success and where to find the public URL. Never ask for passwords,
API keys, recovery codes or payment details, and do not change domain
settings. Finish with checks for home page, CSS, JavaScript, the hero image,
links, mobile layout and HTTPS.
```

**Correct result:** the public URL shows the same page as your working copy, including the ocean image.

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

Keep a known-good backup of every published version. Change a fresh copy, test locally, then publish.

**Prompt 11 - Update one part and preserve everything else**

```text
Read the latest published-source files I attach. Ask for the exact update,
then change only that item. Keep all other copy, links, layout, colours,
responsive rules, accessibility and paths. Before editing, name the file and
smallest block to change. Return complete changed files, the exact
difference and a local test. Do not publish or change domain settings.
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

## Tidal — exact edit map

Counts are literal, case-sensitive matches in version 1.1.1. Search the text in your editor; keep surrounding markup unless told to replace the whole block.

| File | Search literally | Count | What to do |
|---|---|---:|---|
| `index.html` | `Tidal` | 6 | Name in title, share title, logo label, logos and copyright. Replace all. |
| `index.html` | `Tidal Reef Trust` | 1 | Copyright line at the very bottom. |
| `index.html` | `Coral monitoring and restoration` | 3 | Title, share title and footer tagline. |
| `index.html` | `twenty-six` | 3 | Description, share description and hero text. Use your real number or remove it. |
| `index.html` | `[YOUR PRICE]` | 1 | **Blank to fill:** your lowest sponsorship amount, in the call to action. |
| `index.html` | `[YOUR NUMBER]` | 1 | **Blank to fill:** your registration number. Delete the whole "Registered charity" sentence if you have none. |
| `index.html` | `Dive in.` | 1 | Hero headline. |
| `index.html` | `class="grad-text"` | 1 | The headline line that fades from cyan to violet. Move the span, or remove it for plain white. |
| `index.html` | `1,204` | 2 | Sample figure in the hero pill and the impact panel. |
| `index.html` | `3,908` | 2 | Sample figure in a hero card and the impact panel. |
| `index.html` | `71%` | 2 | Sample survival rate in a programme card and the impact panel. |
| `index.html` | `class="float-card` | 2 | Hero data cards (sample temperature, corals replanted). Delete a whole block to remove one. |
| `index.html` | `hero__figure` | 1 | Wrapper that positions the data cards. Keep it. |
| `index.html` | `promise glass` | 3 | The three promise bars under the hero. Delete one and the rest spread out. |
| `index.html` | `programme glass` | 3 | Programme cards: icon, title, text and figure (`num--cyan` or `num--violet`). |
| `index.html` | `impact glass` | 1 | Panel with four sample figures. Two or three also work. |
| `index.html` | `mailto:hello@example.com` | 3 | Two call-to-action buttons and the footer link. They open an email app only. |
| `index.html` | `hello@example.com` | 4 | The three links above plus the visible footer address. |
| `index.html` | `class="logo__mark"` | 2 | Header and footer logo SVG. |
| `index.html` | `class="rays"` | 1 | Faint light rays behind the page. Delete the block for a plain background. |
| `index.html` | `stop-opacity=".22"` | 1 | Strength of the light rays. |
| `index.html` | `Space+Grotesk` | 1 | Google Fonts link. Replace it if you change fonts. |
| `assets/css/style.css` | `:root {` | 1 | All colour, font and spacing tokens. |
| `assets/css/style.css` | `--cyan:` | 1 | Main accent. Dark text sits on it, and it is used as text on the dark background. |
| `assets/css/style.css` | `--violet:` | 1 | Second accent and end of every gradient. Also adjust `--violet-text` next to it. |
| `assets/css/style.css` | `--deep:` | 1 | Darkest background colour. The full background is the gradient stack on `body`. |
| `assets/css/style.css` | `--font-display:` | 1 | Heading and figure font; `--font-body` is on the next line. |
| `assets/css/style.css` | `hero-ocean.webp` | 2 | Hero image (desktop backdrop and the tablet/phone artwork area). |
| `assets/css/style.css` | `.hero::before` | 2 | Dark overlay and image position. Keep text readable on every screen size. |
| `assets/css/style.css` | `@media (max-width: 960px)` | 1 | Menu breakpoint. |

### Template notes

Tidal, Tidal Reef Trust, the reefs, programmes, figures, the temperature reading and "audited annually" are fictional sample content (see `LICENCE.txt`). Footer menu items such as "Methodology" and "Volunteer" link to page sections until you add real pages. Google Fonts is the only network dependency; offline, the fallback fonts are used.

Every `glass` panel uses `backdrop-filter` (frosted glass), which is costly to draw: avoid adding many more, and do not add `background-attachment: fixed`, which makes scrolling stutter on phones.

After each change, also check both sides of the 960 px menu breakpoint and 200% zoom. Prompts are tasks for a chat tool, not a promise it can edit your computer.
