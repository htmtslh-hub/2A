# Customise Aeris

Static showcase for wireless over-ear headphones. There is no cart, stock service, checkout or payment. Keep all ten files together, including the four images in assets/images/. The brand, colours, prices and specifications are fictional concept data.

## Exact edit map

Counts are literal matches in the delivered files. Search with your editor's find box (match case).

| File | Literal text | Count | Action |
|---|---|---:|---|
| `index.html` | `Aeris` | 26 | Every brand mention (title, metadata, logo label, slider status, footer). Includes the product name below. |
| `index.html` | `Aeris One` | 17 | Product name in the title, metadata, slides, story image text and enquiry heading. |
| `index.html` | `>aeris<` | 2 | Lowercase wordmark in the header tile and footer. |
| `index.html` | `hello@aeris.example` | 4 | Three colour enquiries and the main email button. Replace with a working public address. |
| `index.html` | `$179` | 3 | Illustrative price on each collection card. Use a verified price or remove the line. |
| `index.html` | `Pearl White` | 6 | First colour: slide, colourway label, dot label and collection card. Rename together with main.js. |
| `index.html` | `Midnight Navy` | 5 | Second colour name. |
| `index.html` | `Blush Rose` | 5 | Third colour name. |
| `index.html` | `assets/images/aeris-pearl.webp` | 3 | Pearl render in the hero, story and collection. Update every matching alt text. |
| `index.html` | `assets/images/aeris-midnight.webp` | 3 | Midnight render in the hero, story and collection. |
| `index.html` | `assets/images/aeris-blush.webp` | 3 | Blush render in the hero, story and collection. |
| `index.html` | `assets/images/aeris-detail.webp` | 1 | Cushion close-up in the design section. |
| `index.html` | `40 mm` | 3 | Driver size in the story and specs. Edit all hardware claims together. |
| `index.html` | `?v=1.3.0` | 2 | Cache revision on the CSS and JS links. Raise it when you publish changes. |
| `index.html` | `League+Spartan` | 1 | Google Fonts request. Change it together with the two font tokens in style.css. |
| `assets/js/main.js` | `'Pearl White', 'Midnight Navy', 'Blush Rose'` | 1 | Colour names written under the slider and announced to screen readers, in hero order. |
| `assets/js/main.js` | `SLIDE_MS = 1150` | 1 | Clean-up delay after a colour change. Keep equal to --slide. |
| `assets/js/main.js` | `AUTO_MS = 6000` | 1 | Slideshow time on each colour, in milliseconds (includes the transition). |
| `assets/css/style.css` | `--slide:` | 1 | Length of the hero colour transition. |
| `assets/css/style.css` | `--ink:` | 1 | Navy used for headings, the brand tile and the previous button. |
| `assets/css/style.css` | `--accent:` | 1 | Periwinkle tile and button background. Navy text sits on it; keep it light. |
| `assets/css/style.css` | `--accent-text:` | 1 | Periwinkle for small text and eyebrows. Must stay at least 4.5:1 on --bg. |
| `assets/css/style.css` | `--wash-pearl-1:` | 1 | First of nine wash colours (pearl, night, blush) used behind products. |
| `assets/css/style.css` | `League Spartan` | 2 | The two font tokens. Fallbacks follow the name. |

## Page and animation map

- **Hero (index.html, .hero).** Three colourways share one stage. Each colour has one `.slide` (copy), one `.product` (image), one `.wash` (background), one `.hero__ghost` number and one dot button, all in the same order. main.js moves `.is-active` between them. To add or remove a colour, change every one of these lists, the COLOURS list in main.js and the three progress bars, and keep the `data-index` and `data-goto` numbers continuous from 0.
- **Transitions.** Changing colour moves the outgoing product out one side with a short blur while the next one enters from the other with a slight overshoot, rolls the outline number across, crossfades the wash, wipes the model name and copy in line by line and wipes the headline. Speed: `--slide` in style.css and `SLIDE_MS` in main.js (keep them equal). Direction values: `--enter-x`, `--enter-r`, `--leave-x`, `--leave-r` on `.hero[data-dir="-1"]` and the defaults in `.product`.
- **Scene effects.** On each colour change main.js adds `.is-switching` to the hero (removed and re-added so it replays): a light band (`.hero__sweep`) sweeps across in the slide direction and three sound-wave rings (`.hero__waves`) pulse out behind the product. On each story chapter change the same class on `.story` kicks the ring and pulses `.story__waves`. Both take their colour from `--tone` and `--tone-soft` ("SCENE EFFECTS" block in style.css, one pair per colour). Each plays once. To remove them, delete the `.hero__sweep` and `.waves` spans in index.html; nothing else depends on them.
- **Sound story (#sound).** The section is 330vh tall while pinned; scrolling sets `--p` from 0 to 1 and switches the three chapters, frames and washes at thirds. Keep three `.chapter`, three `.story__frame` and three wash spans, or change all of them together. While the hero scrolls away its copy lifts and fades and the washes open up (`--exit`).
- **Page progress line.** The thin line along the top edge (`.scroll-progress`) shows how far down the page you are, from `--page` set by main.js. Delete the div after the skip link to remove it.
- **Reveal.** Add `data-reveal` to fade a block in; `data-reveal="clip"` opens an image with a rounded clip; `data-reveal="mask"` raises each direct child (eyebrow, heading, text) one after another. Collection cards, spec rows and the enquiry panel have their own staggered entrance in the Reveal block of style.css.
- **Slideshow.** The hero changes colour on its own every 6 seconds; the active progress bar fills as it counts down. The round Pause button next to the bars stops it and Play restarts it. It also holds while the mouse is over the slider controls, while keyboard focus is inside the hero, while the hero is scrolled off screen and while the tab is hidden. Change the time with `AUTO_MS` in main.js. To remove it, set `var autoOn = false;` (the button then starts as Play) or delete the `.hero__play` button together with section 3b of main.js and the `restartCycle();` call in `show()`. Everything else starts from a click, key, swipe, mouse movement or scroll and settles within about 1.5 seconds.
- **Fallbacks.** Reduced motion: the slideshow starts paused (Play still works), colour changes are instant, no sweep or wave rings, no reveal, story as a list. Screens shorter than 560 px: story as a list. No JavaScript: all copy, navigation and email links stay visible; slider controls and the Pause button are hidden because they need JavaScript.
- **Email.** Each "Enquire" link opens an email application with a subject line. It does not send anything by itself and .example addresses cannot receive mail.

## Images

The four WebP files are AI-generated renders of imaginary headphones on a pure white background. They use `mix-blend-mode: multiply` so the white disappears into the pastel washes.

- A replacement product photo should be square (1024 × 1024 works well), show the whole product with some margin, and have a **pure white (#ffffff)** background. Off-white leaves a visible box.
- With a transparent PNG or WebP instead, remove `mix-blend-mode: multiply` from `.product`, `.story__frame`, `.card__media img` and `.design__media img`.
- Blending only works when no parent between the image and its background has transform, opacity, filter or z-index. Comments in style.css mark the two places this matters (`.hero__visual` and `.story__sticky`).
- Keep `width` and `height` attributes in step with the real file so the layout does not jump.
- The washes use radial gradients. Many large gradients and blurs are heavy on older phones; avoid adding backdrop-filter to the hero.

## Ten steps and twelve AI prompts

Attach the latest ten files, including all four local WebP images, in a new conversation. Preserve plain HTML/CSS/JS and local paths. The following complete guide is adapted for this product.

## Step 1 - Unzip and open the template

1. Download the ZIP file to a folder you can find easily.
2. Extract the whole ZIP. On Windows choose **Extract All**. On macOS double-click the ZIP.
3. Open the extracted folder until you see `index.html` beside the `assets` folder.
4. Double-click `index.html`. If it opens in a text editor, use **Open with** and choose your browser.
5. Scroll through the full page and try the menu and links before changing anything.
6. Open `README.md` and `CUSTOMISE.md` in a text editor.

Expected structure:

```text
aeris/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
│       ├── aeris-pearl.webp
│       ├── aeris-midnight.webp
│       ├── aeris-blush.webp
│       └── aeris-detail.webp
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

In a chat tool, attach the working ZIP if the tool can read ZIP files. Otherwise attach `index.html`, `style.css`, `main.js`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt` and the four WebP images. Explain that CSS is at `assets/css/style.css`, JavaScript is at `assets/js/main.js` and images are in `assets/images/`.

If the AI works directly in a folder, open or grant access to `website-working-copy`. Ask it to read the files before editing. A screenshot helps explain a visual problem, but it does not replace the source files.

**Prompt 01 - Set up my website editing assistant**

```text
I bought a static website template from Forge Zone and want to turn it into
my own website. I am not a developer. Guide me in clear, small steps.

First read every file I provide: index.html, assets/css/style.css,
assets/js/main.js, CUSTOMISE.md, README.md, LICENCE.txt, and all four local WebP images in assets/images/. If I send CSS or
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
Use the latest website files in this conversation. Replace the demo brand and
copy with the verified information below:

Brand: ask me for this information before editing
What we offer: [PRODUCTS OR SERVICES]
Audience: [TARGET AUDIENCE]
Main benefit: [VERIFIED BENEFIT]
Tone: [FOR EXAMPLE: CLEAR, WARM, PROFESSIONAL]
Public contact details: [EMAIL, PHONE, ADDRESS OR "NOT PUBLIC"]
Main action: [WHAT THE VISITOR SHOULD DO]
Required language: ask me for this information before editing

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
Audit every button, text link, menu item, email link, phone link, and form in
the latest files. Create a table with its visible label, current destination,
whether it works, and the destination it should use.

Use only these verified destinations:
Primary action: [EMAIL, PHONE, BOOKING URL OR OTHER REAL URL]
Secondary action: [REAL URL OR "REMOVE"]
Social links: [REAL URLS OR "REMOVE"]

Then update the files. Use mailto: for email, tel: for phone, and secure https
URLs for external pages. Keep internal section links working. If a form has no
real submission service, label it as a demo or replace it with a working
contact link. Do not simulate success. Return complete changed files and a
short click-test checklist.
```

## Step 6 - Change colours, fonts, images, or sections when needed

Make one type of visual change at a time and refresh the page after each one. Attach the latest files every time you start a new AI chat.

**Prompt 04 - Apply my colours and fonts safely**

```text
Read the latest HTML and CSS first. Apply this brand system while preserving
the template layout and responsive behaviour:

Primary colour: ask me for this information before editing
Accent colour: ask me for this information before editing
Background colour: ask me for this information before editing
Text colour: ask me for this information before editing
Heading font: ask me for this information before editing
Body font: ask me for this information before editing

Reuse existing CSS variables where possible. Check text contrast, buttons,
links, focus states, hover states, borders, dark sections, and mobile views.
Use sensible fallback fonts and do not add a paid font unless I confirm a
licence. Return the complete CSS file, any required HTML changes, and note any
colour pair that still needs review.
```

**Prompt 05 - Replace the logo or illustration with my image**

```text
I will attach the latest website files and my image. The image is intended for
[LOGO / HERO / SECTION NAME] and I have permission to use it.

Inspect the current image container before editing. Tell me the recommended
file name, format, dimensions, and exact folder. Then update the relevant HTML
and CSS using a relative path. Preserve aspect ratio, prevent layout shift,
write accurate alt text, and keep the result readable on desktop, tablet, and
mobile. Do not crop important content without telling me. Return complete
changed files and exact instructions for where I should place the image.
```

**Prompt 06 - Translate the whole website**

```text
Translate every visitor-facing string in the latest website into ask me for this information before editing.
This includes metadata, navigation, headings, paragraphs, buttons, labels,
form messages, image alt text, accessibility labels, and footer text.

Keep brand names, registered product names, email addresses, phone numbers,
and URLs unchanged unless I provide replacements. Preserve HTML structure,
class names, IDs, paths, and JavaScript behaviour. Adapt wording naturally
rather than translating word by word. After editing, check for text overflow
at 360 px and on desktop. Return complete changed files and list any phrase
whose meaning needs my confirmation.
```

**Prompt 07 - Add or remove a service or section**

```text
Use the latest website files. I want to [ADD / REMOVE] this item or section:
ask me for this information before editing.

First identify the complete HTML block and any matching CSS or JavaScript.
Explain the smallest safe change. Then edit without leaving empty wrappers,
broken anchors, unused navigation links, or JavaScript errors. Keep spacing,
visual hierarchy, responsive behaviour, keyboard access, and reduced motion.
If adding an item would make the layout uneven, adjust the existing grid
rules instead of duplicating arbitrary styles. Return complete changed files
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
360 px; tablet and desktop layout; reduced motion; console errors; external
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
Guide me through publishing this static HTML/CSS/JavaScript website on
ask me for this information before editing. I am not a developer. Use the provider's current screen
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
ask me for this information before editing. My domain is managed at [DOMAIN OR DNS PROVIDER].

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
ask me for this information before editing.

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
- What I expected: [EXPECTED RESULT]
- What happened: [ACTUAL RESULT]
- Where it happens: [PAGE, SECTION, DEVICE, BROWSER]
- When it started: [LAST CHANGE]
- Any browser error: [EXACT ERROR OR "NONE SEEN"]

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
| No scroll animation | Reduced motion in your system settings, or a window shorter than 560 px, shows the sound story as a plain list on purpose |
| White box around a product | The image background is not pure white, or a parent of the image gained transform, opacity, filter or z-index (see "Images" above) |
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
