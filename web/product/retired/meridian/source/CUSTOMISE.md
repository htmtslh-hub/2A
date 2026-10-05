# Meridian — your website, step by step

This guide takes you from the downloaded ZIP file to a website you can publish. Follow the steps in order the first time. Every AI prompt below is complete: copy it, attach the requested files, and answer the AI’s questions in plain language. You do not need to fill in code, selectors or technical settings.

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
meridian/
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
I bought the Meridian static website template from Forge Zone and want to turn it into
my own website. I am not a developer. Guide me in clear, small steps.

First read every file I provide: index.html, assets/css/style.css,
assets/js/main.js, CUSTOMISE.md, README.md, and LICENCE.txt. If I send CSS or
JavaScript as separate files, use the paths above. Tell me which files you
read and which are missing. Do not guess the contents of a missing file and
do not edit anything yet.

Summarise the current sections, working buttons, demo-only elements, and all
sample information that I must replace. Then ask me for the missing business
information in small groups: brand, services, contact details, language, and
the website goal. Let me answer "not decided" when needed.

Throughout this task:
- Keep the current plain HTML, CSS, and JavaScript structure, relative paths,
  and the ability to open index.html directly. Do not introduce a framework,
  package manager, build process, or new dependency.
- Preserve the template style unless I request a change. Keep responsive
  behaviour, keyboard navigation, visible focus, readable text, and reduced
  motion support.
- Never invent facts, statistics, reviews, certifications, prices, addresses,
  or business URLs.
- Do not add tracking, a backend, payments, or hidden form submission.
- If you can edit the folder, edit only the working copy. Otherwise return
  complete replacement files and state the exact destination of each file.
  Never use ellipses or say "keep the rest unchanged" inside file contents.
- After every edit, list what changed, how I can view it, and what you tested.
- Do not publish, overwrite a live site, or change domain settings.

Begin by reading the files and asking for the first group of information.
```

**Correct result:** AI identifies the actual template files and asks for your information. If it suggests rebuilding with a framework, repeat the instruction to preserve the current structure.

## Step 5 - Replace the brand, copy, and contact actions

Give AI verified business information. If something is missing, ask it to remove the claim or mark it clearly for later review. Then use these prompts in the same conversation.

**Prompt 02 - Personalise all website content**

```text
Use the latest website files I attach. If this is a new chat, ask me to attach all six current files and run Prompt 01 first. Replace the demo brand and
copy with verified information. Before editing, ask me for these details; do not treat this list as business data:

Brand: ask me for my real brand name
What we offer: ask for verified products or services
Audience: ask who I want to reach
Main benefit: ask for a benefit I can support
Tone: ask what tone I want
Public contact details: ask which contact details may be public
Main action: ask for the intended visitor action
Required language: ask for the required language

Before editing, list any information still missing and any demo claim that
cannot be supported. Then update the page title, metadata, navigation, hero,
sections, calls to action, contact details, footer, image alt text, and any
accessible labels. Keep the existing layout and responsive behaviour. Remove
unsupported statistics, testimonials, prices, certifications, and locations
instead of inventing replacements. Ask for any missing input before editing. Return complete changed files with their exact relative destination paths and a list
of every demo item you removed or still need me to confirm.
```

**Prompt 03 - Connect every button to the right destination**

```text
Audit every button, text link, menu item, email link, phone link, and form in
the latest files. Create a table with its visible label, current destination,
whether it works, and the destination it should use.

Ask me for the verified destinations below before editing. Use only destinations I confirm:
Primary action: ask for my confirmed primary destination
Secondary action: ask for a real destination or permission to remove it
Social links: ask for my public URLs or permission to remove them

Then update the files. Use mailto: for email, tel: for phone, and secure https
URLs for external pages. Keep internal section links working. If a form has no
real submission service, label it as a demo or replace it with a working
contact link. Do not simulate success. Ask for any missing input before editing. Return complete changed files with their exact relative destination paths and a
short click-test checklist.
```

## Step 6 - Change colours, fonts, images, or sections when needed

Make one type of visual change at a time and refresh the page after each one. Attach the latest files every time you start a new AI chat.

**Prompt 04 - Apply my colours and fonts safely**

```text
Read the latest HTML and CSS first. Ask me for the brand system below, allow "keep current", then apply my answers while preserving
the template layout and responsive behaviour:

Primary colour: ask for my brand colour, or keep the current colour
Accent colour: ask for my brand colour, or keep the current colour
Background colour: ask for my brand colour, or keep the current colour
Text colour: ask for my brand colour, or keep the current colour
Heading font: ask for my font choice, or keep the current font
Body font: ask for my font choice, or keep the current font

Reuse existing CSS variables where possible. Check text contrast, buttons,
links, focus states, hover states, borders, dark sections, and mobile views.
Use sensible fallback fonts and do not add a paid font unless I confirm a
licence. Return the complete CSS file, any required HTML changes, and note any
colour pair that still needs review.
```

**Prompt 05 - Replace the logo or illustration with my image**

```text
I will attach the latest website files and my image. Ask which section should use the image and confirm my permission to publish it before editing.

Inspect the current image container before editing. Tell me the recommended
file name, format, dimensions, and exact folder. Then update the relevant HTML
and CSS using a relative path. Preserve aspect ratio, prevent layout shift,
write accurate alt text, and keep the result readable on desktop, tablet, and
mobile. Do not crop important content without telling me. Return complete
changed files and exact instructions for where I should place the image.
```

**Prompt 06 - Translate the whole website**

```text
Translate every visitor-facing string in the latest website into the language I choose. Ask for the target language before editing; also update the HTML lang attribute.
This includes metadata, navigation, headings, paragraphs, buttons, labels,
form messages, image alt text, accessibility labels, and footer text.

Keep brand names, registered product names, email addresses, phone numbers,
and URLs unchanged unless I provide replacements. Preserve HTML structure,
class names, IDs, paths, and JavaScript behaviour. Adapt wording naturally
rather than translating word by word. After editing, check for text overflow
at 320, 375, 820 and 1440 CSS pixels. Ask for any missing input before editing. Return complete changed files with their exact relative destination paths and list any phrase
whose meaning needs my confirmation.
```

**Prompt 07 - Add or remove a service or section**

```text
Use the latest website files. Ask whether I want to add or remove a section or item, which one, and its verified content. Do not edit until I answer.

First identify the complete HTML block and any matching CSS or JavaScript.
Explain the smallest safe change. Then edit without leaving empty wrappers,
broken anchors, unused navigation links, or JavaScript errors. Keep spacing,
visual hierarchy, responsive behaviour, keyboard access, and reduced motion.
If adding an item would make the layout uneven, adjust the existing grid
rules instead of duplicating arbitrary styles. Ask for any missing input before editing. Return complete changed files with their exact relative destination paths
and a checklist for desktop and mobile.
```

## Step 7 - Test before publishing

Test the website at a narrow phone width, a tablet width, and a wide desktop. Check navigation, all links, readable text, image loading, keyboard focus, and reduced motion.

**Prompt 08 - Audit the final website**

```text
Audit the latest website files as a final pre-publication review. Do not make
changes until you report the findings.

Check: missing files and broken relative paths; leftover demo names, sample
text, placeholder prices, fake reviews, and placeholder URLs; page title and
description; heading order; alt text; labels; keyboard navigation and visible
focus; colour contrast; menu and button behaviour; horizontal overflow at
320 px; tablet and desktop layout; reduced motion; console errors; external
links; mailto and tel links; and whether any form only pretends to submit.

Group findings as Blocker, Should fix, or Optional. For each finding name the
file and exact text or selector. After I approve the list, fix the Blocker and
Should fix items, return complete changed files, and provide a manual test
checklist. Do not publish the website.
```

## Step 8 - Publish by uploading the website folder

Choose a host that supports static websites. Upload the contents of the working folder so `index.html` is at the published root. Do not upload only the HTML file; the `assets` folder must travel with it.

**Prompt 09 - Guide me through publishing**

```text
Guide me through publishing this static HTML/CSS/JavaScript website on a hosting provider I choose. Ask which provider I am using before giving provider-specific steps. I am not a developer. Use the provider's current screen
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

**Correct result:** the public URL opens the same page as your local working copy, including CSS, JavaScript, and images.

## Step 9 - Connect a custom domain if needed

Publish successfully on the host's temporary URL first. Then connect your domain. DNS changes may take time, so keep the working deployment available while waiting.

**Prompt 10 - Connect my domain using the real configuration**

```text
Help me connect my custom domain to the static website already published on my hosting provider. Ask which host and domain/DNS provider I use before continuing.

Do not invent DNS values. First ask me to copy the exact domain instructions
shown by my hosting provider, including record type, name/host, target/value,
and whether a www record is required. Ask me to hide account IDs or private
tokens. Compare those instructions with the records I can see and explain one
change at a time. Warn me before replacing an existing record and do not tell
me to remove email-related MX or TXT records. After the change, show me how to
verify the root domain, www version, HTTPS certificate, and redirect behaviour.
```

## Step 10 - Update and recover safely

Keep one known-good backup for every published version. Make changes in a fresh working copy, test locally, and publish only the changed website files.

**Prompt 11 - Update one part and preserve everything else**

```text
Read the latest published-source files I attach. Ask for the exact update I need, then change only that approved item.

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
- Ask what I expected to happen.
- Ask what actually happened.
- Ask which section, device and browser are affected.
- Ask when it started and what last changed.
- Ask for any exact browser error, or let me answer "none seen".

Read the files before suggesting a fix. Identify the most likely cause and
show the evidence in the code. Prefer the smallest fix and do not rewrite the
site or add dependencies. Preserve the current design and responsive rules.
Ask for any missing input before editing. Return complete changed files with their exact relative destination paths and give me a short test to confirm the problem
is fixed. If the evidence is insufficient, ask for one specific screenshot,
console message, or file instead of guessing.
```

## Quick troubleshooting

| Problem | First check |
|---|---|
| Page has no styling | Confirm `assets/css/style.css` exists and the HTML path is unchanged |
| Images do not appear | Check file name, extension, letter case, and relative path |
| A button does nothing | Inspect its real `href` or JavaScript and remove demo behaviour |
| Mobile layout is too wide | Look for fixed widths and test at 320 px |
| Changes are not visible | Save the correct file and hard refresh the browser |
| Published site shows 404 | Put `index.html` at the publish root and check host settings |
| AI changed too much | Restore the backup and use Prompt 11 with a narrower request |

## Final checklist

- [ ] The original ZIP and a known-good backup are stored safely.
- [ ] All demo brands, copy, statistics, testimonials, prices, and URLs are replaced or removed.
- [ ] The page title, description, contact details, links, and calls to action are correct.
- [ ] Every image loads and has suitable alt text.
- [ ] The site works at 320 px, tablet size, and desktop size without horizontal overflow.
- [ ] Menu, buttons, keyboard focus, and reduced motion work correctly.
- [ ] No form pretends to submit and no unsupported feature is promised.
- [ ] The public URL loads HTML, CSS, JavaScript, images, and HTTPS correctly.
- [ ] The latest published source is backed up before the next change.


## Meridian — exact edit map

Counts below are literal, case-sensitive occurrences in the named file of the supplied 1.0.0 version. They are not line numbers or regex matches. After customising, your counts may change. Search the literal string in a text editor. Preserve the surrounding markup unless the instruction says to replace the complete block.

| File | Search literally | Count | What to do |
|---|---|---:|---|
| `index.html` | `Meridian` | 5 | Mixed-case brand in metadata, accessible name and footer notice. |
| `index.html` | `meridian.` | 1 | Visible footer wordmark. |
| `index.html` | `meridian<span` | 1 | Header wordmark: replace its text only; retain the decorative dot span. |
| `index.html` | `FROM YOUR BRIEF.` | 1 | Hero first line. Keep replacement concise and check phone widths. |
| `index.html` | `RIGHT` | 1 | Accent part of the main heading; review the whole h1 block. |
| `index.html` | `class="expertise-list"` | 1 | Three service li blocks; replace headings and descriptions together. |
| `index.html` | `class="product"` | 3 | Complete product-focus article blocks; these are not purchasable products. |
| `index.html` | `class="cargo-art"` | 1 | Hero cargo SVG; keep the responsive hero__figure wrapper. |
| `index.html` | `Home &amp; living` | 1 | HTML-escaped category name; keep valid HTML when editing. |
| `index.html` | `class="process-list"` | 1 | Three ordered process steps; update complete li blocks. |
| `index.html` | `hello@example.com` | 3 | Replace every visible email and mailto destination with the verified public email. |
| `index.html` | `mailto:hello@example.com` | 2 | Working email links only; they open an email app, never send automatically. |
| `index.html` | `<title>` | 1 | Browser title; also update og:title and both description metadata values. |
| `index.html` | `id="contact"` | 1 | Real contact anchor. Keep IDs matched to nav links if renaming. |
| `index.html` | `data-reveal` | 13 | Optional reveal hooks; content remains available with JS disabled. |
| `assets/css/style.css` | `:root {` | 1 | Colour, font and spacing tokens are at the start of the file. |
| `assets/css/style.css` | `--accent:` | 1 | Main brand accent. Check text, button and focus contrast after changing. |
| `assets/css/style.css` | `--font-display:` | 1 | Heading family; change the HTML Google Fonts request if necessary. |
| `assets/css/style.css` | `--font-body:` | 1 | Body family and fallbacks; keep readable offline fonts. |
| `assets/js/main.js` | `(max-width: 950px)` | 1 | Menu breakpoint; keep matched with the CSS breakpoint. |

### Template-specific checks

Product focus is not an inventory system or live catalogue. Check sourcing, production and export wording against your actual responsibilities. Keep the contact disclaimer; enquiry does not create a quote or delivery commitment. The header wordmark has a separate decorative dot span.

Meridian is a fictional sourcing and export-coordination business. The home and living, packaging and textile categories are sample focus areas, not stock listings. Services and process steps are demonstration copy, not logistics commitments. No certifications, delivery guarantees, supplier endorsements, addresses or prices are supplied.

There is no repeated marquee content in this template. Each list item is a separate editable item. Update accessible labels and SVG titles whenever their visible names change. Google Fonts is the only optional network dependency. To go fully offline, remove its three link elements and use the declared fallback fonts.

Open the local page after each change, then check desktop (1440 × 900), tablet (820 × 1180), phone (375 × 812) and narrow phone (320 × 740), both sides of the 950 px menu breakpoint and 200% browser zoom. Test Tab, Shift+Tab, Escape, every section link and email destination. Enable reduced motion and disable JavaScript once. If you replace the illustration with a photograph, put it in a local assets folder: that is your customised copy, not an extra file in this original six-file product.

All prompts are self-contained tasks, not promises that a chat tool can edit your computer. Attach the latest files to each new chat, start with Prompt 01, and apply complete returned files to the named relative paths. No prompt should require you to identify a selector or fill a technical configuration. Before publishing, verify the email address: example.com is a demo destination, not the studio’s inbox.
