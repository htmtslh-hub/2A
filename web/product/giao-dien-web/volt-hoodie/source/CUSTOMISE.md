# Volt Hoodie customisation guide

This guide takes you from the downloaded ZIP file to a website you can publish. Follow the steps in order the first time. Every AI prompt below is complete: copy it, attach the requested files, and let the AI ask for any missing information.

## Before you begin

Prepare a computer, a modern browser, a text editor, and the ZIP file from your Forge Zone account. Keep the original ZIP unchanged. Never send passwords, API keys, payment details, or private customer data to an AI tool.

Volt Hoodie is a fictional streetwear and athletic hoodie showcase concept. Attach all three garment images when asking an AI to change artwork. The 420 GSM fabric specifications, sizing matrix, prices (`Rs. 1559/-`) and care notes are demonstration material. Your template is a static website built with HTML, CSS, and JavaScript. It does not include a backend, payment processing, or a working form submission service unless the product page explicitly says so.

## Step 1 - Unzip and open the template

1. Download the ZIP file to a folder you can find easily.
2. Extract the whole ZIP. On Windows choose **Extract All**. On macOS double-click the ZIP.
3. Open the extracted folder until you see `index.html` beside the `assets` folder.
4. Double-click `index.html`. If it opens in a text editor, use **Open with** and choose your browser.
5. Scroll through the full page and try the colourway swatches, size buttons, menu, and links before changing anything.
6. Open `README.md` and `CUSTOMISE.md` in a text editor.

Expected structure:

```text
template-folder/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/hoodie-volt.webp, hoodie-mint.webp, hoodie-arctic.webp
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
```

**Correct result:** the demo layout, volt-yellow and matte-carbon diagonal split, and sample content are visible. A `file:///` address is normal because the page is opening on your computer.

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
| Main activity | What apparel or product line you sell or showcase |
| Audience | The buyers or community you want to reach |
| Main benefit | A specific reason to choose your garments |
| Products or services | Colourway names, fabric descriptions, sizes, and public prices |
| Contact details | Public email, phone number, and studio address |
| Main action | Email order link, phone call, external store page, or another real URL |
| Language | English, Vietnamese, Chinese, or another language |
| Brand assets | Logo, brand colours, and garment images you may legally use |
| Evidence | Verified fabric weights, sizing measurements, and real policies only |

It is fine to leave an item undecided while editing, but resolve it before publication. Do not present demo specifications or sample prices as your own without verification.

## Step 4 - Start working with AI

### Send the files

In a chat tool, attach the working ZIP if the tool can read ZIP files. Otherwise attach `index.html`, `style.css`, `main.js`, `CUSTOMISE.md`, `README.md`, and `LICENCE.txt`. Explain that CSS is at `assets/css/style.css` and JavaScript is at `assets/js/main.js`.

If the AI works directly in a folder, open or grant access to `website-working-copy`. Ask it to read the files before editing. A screenshot helps explain a visual problem, but it does not replace the source files.

**Prompt 01 - Set up my website editing assistant**

```text
I bought a static website template from Forge Zone and want to turn it into
my own website. I am not a developer. Guide me in clear, small steps.

First read every file I provide: index.html, assets/css/style.css,
assets/js/main.js, CUSTOMISE.md, README.md, and LICENCE.txt. If I send CSS or
JavaScript as separate files, use the paths above. Tell me which files you
read and which are missing. Do not guess the contents of a missing file and
do not edit anything yet.

Summarise the current sections, working buttons, demo-only elements, and all
sample information that I must replace. Then ask me for the missing business
information in small groups: brand, products, contact details, language, and
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
Use the latest website files in this conversation. Replace the demo brand and
copy with the verified information below:

Brand: (ask me for this information before editing)
What we offer: (ask me for this information before editing)
Audience: (ask me for this information before editing)
Main benefit: (ask me for this information before editing)
Tone: (ask me for this information before editing)
Public contact details: (ask me for this information before editing)
Main action: (ask me for this information before editing)
Required language: (ask me for this information before editing)

Before editing, list any information still missing and any demo claim that
cannot be supported. Then update the page title, metadata, navigation, hero,
sections, calls to action, contact details, footer, image alt text, and any
accessible labels. Keep the existing layout and responsive behaviour. Remove
unsupported statistics, testimonials, prices, certifications, and locations
instead of inventing replacements. Return complete changed files and a list
of every demo item you removed or still need me to confirm.
```

**Prompt 03 - Connect every button to the right destination**

```text
Audit every button, text link, menu item, email link, phone link, and dialog in
the latest files. Create a table with its visible label, current destination,
whether it works, and the destination it should use.

Use only these verified destinations:
Primary action: (ask me for this information before editing)
Secondary action: (ask me for this information before editing)
Social links: (ask me for this information before editing)

Then update the files. Use mailto: for email, tel: for phone, and secure https
URLs for external pages. Keep internal section links working. If a dialog or
button is a demo notice, connect it to a real page or label it clearly as demo
only. Do not simulate checkout or login success. Return complete changed files
and a short click-test checklist.
```

## Step 6 - Change colours, fonts, images, or sections when needed

Make one type of visual change at a time and refresh the page after each one. Attach the latest files every time you start a new AI chat.

**Prompt 04 - Apply my colours and fonts safely**

```text
Read the latest HTML and CSS first. Apply this brand system while preserving
the template layout and responsive behaviour:

Primary colour: (ask me for this information before editing)
Accent colour: (ask me for this information before editing)
Background colour: (ask me for this information before editing)
Text colour: (ask me for this information before editing)
Heading font: (ask me for this information before editing)
Body font: (ask me for this information before editing)

Reuse existing CSS variables where possible. Check text contrast, buttons,
links, focus states, hover states, borders, dark sections, and mobile views.
Use sensible fallback fonts and do not add a paid font unless I confirm a
licence. Return the complete CSS file, any required HTML changes, and note any
colour pair that still needs review.
```

**Prompt 05 - Replace the logo or illustration with my image**

```text
I will attach the latest website files and my image. The image is intended for
(ask me for this information before editing) and I have permission to use it.

Inspect the current image container before editing. Tell me the recommended
file name, format, dimensions, and exact folder. Then update the relevant HTML,
CSS, and JavaScript slide records using a relative path. Preserve aspect ratio,
prevent layout shift, write accurate alt text, and keep the result readable on
desktop, tablet, and mobile. Do not crop important content without telling me.
Return complete changed files and exact instructions for where I should place
the image.
```

**Prompt 06 - Translate the whole website**

```text
Translate every visitor-facing string in the latest website into (ask me for this information before editing).
This includes metadata, navigation, headings, paragraphs, buttons, labels,
dialog messages, image alt text, accessibility labels, and footer text.

Keep brand names, registered product names, email addresses, phone numbers,
and URLs unchanged unless I provide replacements. Preserve HTML structure,
class names, IDs, paths, and JavaScript behaviour. Adapt wording naturally
rather than translating word by word. After editing, check for text overflow
at 320 px and on desktop. Return complete changed files and list any phrase
whose meaning needs my confirmation.
```

**Prompt 07 - Add or remove a service or section**

```text
Use the latest website files. I want to (ask me for this information before editing) this item or section:
(ask me for this information before editing).

First identify the complete HTML block and any matching CSS or JavaScript.
Explain the smallest safe change. Then edit without leaving empty wrappers,
broken anchors, unused navigation links, or JavaScript errors. Keep spacing,
visual hierarchy, responsive behaviour, keyboard access, and the session-only Pause motion control.
If adding an item would make the layout uneven, adjust the existing grid
rules instead of duplicating arbitrary styles. Return complete changed files
and a checklist for desktop and mobile.
```

## Step 7 - Test before publishing

Test the website at a narrow phone width, a tablet width, and a wide desktop. Check navigation, all links, readable text, image loading, keyboard focus, and the session-only Pause motion control.

**Prompt 08 - Audit the final website**

```text
Audit the latest website files as a final pre-publication review. Do not make
changes until you report the findings.

Check: missing files and broken relative paths; leftover demo names, sample
text, placeholder prices, fake reviews, and placeholder URLs; page title and
description; heading order; alt text; labels; keyboard navigation and visible
focus; colour contrast; menu and button behaviour; horizontal overflow at
320 px; tablet and desktop layout; the session-only Pause motion control; console errors; external
links; mailto and tel links; and whether any dialog or button pretends to submit an order.

Group findings as Blocker, Should fix, or Optional. For each finding name the
file and exact text or selector. After I approve the list, fix the Blocker and
Should fix items, return complete changed files, and provide a manual test
checklist. Do not publish the website.
```

## Step 8 - Publish by uploading the website folder

Choose a host that supports static websites. Upload the contents of the working folder so `index.html` is at the published root. Do not upload only the HTML file; the `assets` folder must travel with it.

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

**Correct result:** the public URL opens the same page as your local working copy, including CSS, JavaScript, and images.

## Step 9 - Connect a custom domain if needed

Publish successfully on the host's temporary URL first. Then connect your domain. DNS changes may take time, so keep the working deployment available while waiting.

**Prompt 10 - Connect my domain using the real configuration**

```text
Help me connect my custom domain to the static website already published on
(ask me for this information before editing). My domain is managed at (ask me for this information before editing).

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
- [ ] All demo brands, copy, specifications, prices, and URLs are replaced or removed.
- [ ] The page title, description, contact details, links, and calls to action are correct.
- [ ] Every image loads and has suitable alt text.
- [ ] The site works at 320 px, tablet size, and desktop size without horizontal overflow.
- [ ] Menu, colourway swatches, size buttons, keyboard focus, and the session-only Pause motion control work correctly.
- [ ] No dialog or link pretends to complete a live payment or authentication.
- [ ] The public URL loads HTML, CSS, JavaScript, images, and HTTPS correctly.
- [ ] The latest published source is backed up before the next change.


## Volt Hoodie editing map

Counts are literal, including metadata, attributes, and accessible labels. Keep anchors and selectors synchronised across HTML, CSS, and JavaScript.

| File | Literal text or selector | Count | Edit |
|---|---|---:|---|
| `index.html` | `Volt Hoodie` | 9 | Brand, metadata, headings, order enquiry subject, and footer |
| `index.html` | `orders@volthoodie.example` | 4 | Replace demo order and support email address |
| `index.html` | `Rs. 1559/-` | 9 | Illustrative unit price in hero, colourway cards, order summary, and lookup dialog |
| `index.html` | `Buy Now` | 1 | Hero CTA anchor jumping to the direct order enquiry section |
| `index.html` | `Sing Up` | 4 | Reference-authentic header button label (`Sing Up` spelling preserved from reference) |
| `index.html` | `data-view=` | 9 | Three colourway swatches, three bottom pagination dots, and three card preview buttons |
| `index.html` | `hoodie-volt.webp` | 2 | Default hero stage image and first colourway card image |
| `index.html` | `fonts.googleapis.com` | 2 | Optional Google Fonts preconnect and Poppins stylesheet link |
| `assets/css/style.css` | `--bg-volt:` | 1 | Primary volt-yellow showcase background token (`#ffd507`) |
| `assets/css/style.css` | `--bg-carbon:` | 1 | Primary matte-carbon diagonal split and dark section background token (`#272727`) |
| `assets/css/style.css` | `--font-sans:` | 1 | Primary Poppins and offline system sans-serif fallback stack |
| `assets/js/main.js` | `const SLIDES =` | 1 | Three colourway slide records (`image`, `alt`, `desc`, `price`, `railTop`) |
| `assets/js/main.js` | `const SIZE_INFO =` | 1 | Three garment size descriptions (`S`, `M`, `L`) for the live order summary |

### Images, typography and illustrative claims
All three local WebP files (`hoodie-volt.webp`, `hoodie-mint.webp`, `hoodie-arctic.webp`) are `660×1056` px (`5:8` aspect ratio) transparent studio cutouts. Preserve exterior alpha transparency and centered garment proportions when replacing them. Note that the header button label `Sing Up` intentionally preserves the exact lettering from the visual reference design; change `Sing Up` to `Sign Up` in `index.html` and `assets/css/style.css` (`[data-auth-mode="Sing Up"]`) if you prefer standard spelling for your live store.

The template loads Poppins from Google Fonts with `display=swap` and falls back to clean system sans-serif fonts offline. Replace the 420 GSM fleece specifications, Kid's and Sport's sizing charts, `Rs. 1559/-` price, `+91 98765 43210` phone number, and `orders@volthoodie.example` email address with verified business information before publishing. Neither `Buy Now` nor the `Log In` / `Sing Up` dialogs process payments or authenticate users.

### Motion and controls
Hero colourway transitions (540ms), initial hero entrance (580–640ms), and scroll reveals (620ms) use finite `requestAnimationFrame` animations that cancel prior in-flight animations on rapid input and run zero idle loops. Keep `data-view`, `data-size`, `aria-pressed`, image `alt`, and the `#order` summary synchronised. Mobile navigation activates at `<= 860px`. Native `<dialog>` modals close via their Close button, backdrop click, or Escape key. `Pause motion` is session-only for the current page visit; OS reduced-motion settings do not disable default finite animations under the product policy.
