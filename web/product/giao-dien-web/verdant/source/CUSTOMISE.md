# Customise Verdant 1.0.0

Start with this guide. Keep all 8 files together. The café, menu and prices are illustrative. No orders or payments are submitted.

## Exact edit map

| File | Literal text to find | Occurrences |
|---|---|---|
| `index.html` | `Verdant` | 7 |
| `index.html` | `hello@verdant.example` | 2 |
| `index.html` | `$28.00` | 3 |
| `index.html` | `assets/img/drinks.webp` | 8 |
| `index.html` | `assets/img/bean.webp` | 6 |
| `assets/css/style.css` | `--accent:` | 1 |
| `assets/css/style.css` | `--font-display:` | 1 |
| `assets/js/main.js` | `Matcha Cream` | 2 |
| `assets/js/main.js` | `Mango Cloud` | 2 |
| `assets/js/main.js` | `Berry Blush` | 2 |

Update product names, descriptions and prices in both index.html and the products array in main.js. Hero initial state and the three collection cards remain available without JavaScript. Edit :root tokens for page colours. Per-product colours live in products; card palettes also live in CSS. Three cups share one transparent sprite, ordered matcha, mango, berry. Each equal third is shown with .drink and --offset. Replace the whole sprite with the same dimensions/order or ask AI to change all paths and crop wrappers together. Do not change only the large hero and leave thumbnails behind. The bean is decoration, repeated five times in the hero and once in the craft scene.

Choose a public contact email and replace every hello@verdant.example. The .example address cannot receive mail. The header bag icon goes to contact and is not a shopping cart. Size selection indicates a preference only; it does not change price or place an order. Product details disclose sample prices and dairy. Replace allergen information with verified facts.

## Step 1 — Extract and open
Extract the entire ZIP and open verdant/index.html beside assets/. Confirm that all three drinks appear and the next arrow changes the featured flavour. Read README and LICENCE. Expected: a working local café showcase, no install.

## Step 2 — Keep a backup
Keep the purchased ZIP unchanged. Copy the extracted folder to website-working-copy. Save UTF-8 with original extensions. Back up all eight files before each major change. Expected: original and working copy are separate.

## Step 3 — Prepare verified information
Collect your brand, menu, prices, ingredients, allergens, public email, logo and licensed imagery. Decide your primary action. Replace all demo content before publishing. Expected: facts and destinations are ready; missing facts are removed rather than invented.

## Step 4 — Work with AI
Attach the current ZIP, or all six core files and both images. Explain the actual paths assets/css/style.css, assets/js/main.js and assets/img/. A screenshot supplements source; it does not replace it. In a new chat resend the latest files and Prompt 01. Apply complete replacement files only to the working copy and refresh. Expected: AI reads the current files and asks for missing facts.

**Prompt 01 — Set up the assistant**

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

## Step 5 — Personalise copy and actions
Change brand, metadata, all menu details and contact destinations together. The carousel data must agree with static HTML and dialogs. Test every anchor and email link. Expected: one consistent business identity, no unsupported claims or pretend checkout.

**Prompt 02 — Personalise Verdant**

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

**Prompt 03 — Connect destinations**

```text
Audit every button, text link, menu item, email link, phone link, and form in
the latest files. Create a table with its visible label, current destination,
whether it works, and the destination it should use.

Use only these verified destinations:
Primary action: (ask me for this information before editing)
Secondary action: (ask me for this information before editing)
Social links: (ask me for this information before editing)

Then update the files. Use mailto: for email, tel: for phone, and secure https
URLs for external pages. Keep internal section links working. If a form has no
real submission service, label it as a demo or replace it with a working
contact link. Do not simulate success. Return complete changed files and a
short click-test checklist.
```

## Step 6 — Change visuals and sections
Change one visual choice at a time. Assets are local WebP. Preserve the sprite order and aspect ratio or update the crop wrappers together. Use only assets you may publish. No remote font is loaded; CSS has system fallbacks. Check both text and focus contrast after changing palettes. Expected: intact layout at phone, tablet and desktop widths.

**Prompt 04 — Change colours and fonts**

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

**Prompt 05 — Replace drink images**

```text
I will attach the latest website files and my image. The image is intended for
(ask me for this information before editing) and I have permission to use it.

Inspect the current image container before editing. Tell me the recommended
file name, format, dimensions, and exact folder. Then update the relevant HTML
and CSS using a relative path. Preserve aspect ratio, prevent layout shift,
write accurate alt text, and keep the result readable on desktop, tablet, and
mobile. Do not crop important content without telling me. Return complete
changed files and exact instructions for where I should place the image.
```

**Prompt 06 — Translate the website**

```text
Translate every visitor-facing string in the latest website into (ask me for this information before editing).
This includes metadata, navigation, headings, paragraphs, buttons, labels,
form messages, image alt text, accessibility labels, and footer text.

Keep brand names, registered product names, email addresses, phone numbers,
and URLs unchanged unless I provide replacements. Preserve HTML structure,
class names, IDs, paths, and JavaScript behaviour. Adapt wording naturally
rather than translating word by word. After editing, check for text overflow
at 320 px, 375 px, 820 px and 1440 px and on desktop. Return complete changed files and list any phrase
whose meaning needs my confirmation.
```

**Prompt 07 — Add or remove a section**

```text
Use the latest website files. I want to (ask me for this information before editing) this item or section:
(ask me for this information before editing).

First identify the complete HTML block and any matching CSS or JavaScript.
Explain the smallest safe change. Then edit without leaving empty wrappers,
broken anchors, unused navigation links, or JavaScript errors. Keep spacing,
visual hierarchy, responsive behaviour, keyboard access, and the visible Pause motion control.
If adding an item would make the layout uneven, adjust the existing grid
rules instead of duplicating arbitrary styles. Return complete changed files
and a checklist for desktop and mobile.
```

## Step 7 — Test the final folder
Try 1440×900, 820×1180, 375×812 and 320×740, 200% zoom, Tab/Shift+Tab, arrows, Escape, swipe, every menu link and all three product dialogs. Cycle first-to-last and last-to-first. Scroll through the craft scene then back up. Pause motion; reload restores motion ON. No OS/saved preference automatically disables it by template policy. Disable JS: all collection content and anchors remain. Disconnect the network: local images still load. Confirm no overflow, cut text, console error or missing file. Expected: the same complete content and functional links in each fallback.

**Prompt 08 — Audit the final website**

```text
Audit the latest website files as a final pre-publication review. Do not make
changes until you report the findings.

Check: missing files and broken relative paths; leftover demo names, sample
text, placeholder prices, fake reviews, and placeholder URLs; page title and
description; heading order; alt text; labels; keyboard navigation and visible
focus; colour contrast; menu and button behaviour; horizontal overflow at
320 px, 375 px, 820 px and 1440 px; tablet and desktop layout; the visible Pause motion control; console errors; external
links; mailto and tel links; and whether any form only pretends to submit.

Group findings as Blocker, Should fix, or Optional. For each finding name the
file and exact text or selector. After I approve the list, fix the Blocker and
Should fix items, return complete changed files, and provide a manual test
checklist. Do not publish the website.
```

## Step 8 — Publish
Create website-publish outside the working copy with index.html and the complete assets folder. Keep backup ZIPs, private notes and credentials out. Upload the folder contents to your chosen static host so index.html is at the root. Use current official host instructions. Publishing does not add payments or order handling. Expected: a public HTTPS URL showing the tested source and images.

**Prompt 09 — Publish the folder**

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

## Step 9 — Optional custom domain
Publish on the host URL first. Use only DNS values shown by your real provider; preserve unrelated email records. Never share login codes or secrets with AI. Verify root, www, HTTPS and any email service after changes. Expected: your domain points to the same working site.

**Prompt 10 — Connect your domain**

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

## Step 10 — Update or recover
Back up the current live source; edit the latest working files, test, then republish to the same project. If something breaks, restore the complete last changed file group from a known-good backup. Do not mix new HTML with old CSS/JS. Expected: a recoverable update with matching assets.

**Prompt 11 — Update one part**

```text
Read the latest published-source files I attach. Change only this item:
(ask me for this information before editing).

Preserve all other approved copy, links, layout, colours, responsive rules,
accessibility behaviour, and file paths. Before editing, name the file and the
smallest block that needs to change. After editing, return complete changed
files, summarise the exact difference, and tell me how to test it locally.
Do not publish or alter domain settings.
```

**Prompt 12 — Fix a problem**

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

## Before publishing
Check all demo branding, prices, email and allergy statements; readable focus; carousel/dialog/menu; local assets; phone layout; final HTTPS URL. Keep your original and a tested backup. For help send source, expected/actual behaviour, browser, viewport and a screenshot with secrets removed.
