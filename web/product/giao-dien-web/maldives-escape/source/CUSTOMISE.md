# Customising Maldives Escape (`maldives-escape`)

This guide takes you from the downloaded `maldives-escape.zip` archive to a live, custom-branded resort and travel showcase website. Follow Steps 1 to 10 in order. Every AI prompt below is complete and self-contained: copy it, attach your files, and let your AI assistant ask you for your business details in plain language.

## Quick Reference — Exact Edit Map

Every occurrence count below has been verified against the shipped files:

| File | Exact string to find | Count | Where it appears & how to update |
|---|---|---|---|
| `index.html` | `Maldives Escape` | 6 | Browser `<title>`, `og:title`, header brand aria-label, visible header brand text, and footer brand/copyright lines. Replace with your resort or agency name. |
| `index.html` | `MALDIVES` | 2 | Hero `<h1>` display title and contact email subject line (`Maldives%20Villa`). |
| `index.html` | `The sunny side of life` | 1 | Hero subtitle (`[data-hero-sub]`). Also update `slides[0].sub` and `slides[3].sub` in `assets/js/main.js`. |
| `index.html` | `New Maldives Resort Comes With Water Slide` | 1 | Default primary vertical card caption (`[data-primary-card-caption]`). Also update `slides[0].cardCaption` in `assets/js/main.js`. |
| `index.html` | `Book Now` | 2 | Meta description and white pill CTA button below the primary vertical card in the hero carousel. |
| `index.html` | `concierge@maldivesescape.example` | 7 | Three offer enquiry buttons, main contact button, and footer link. Replace all 7 occurrences with your real booking/concierge email. |
| `index.html` | `[YOUR PRICE]` | 4 | Section description note and three illustrative package rates in `#offers`. Replace all 4 occurrences with verified pricing. |
| `assets/css/style.css` | `--bg:` | 1 | Main dark ocean-twilight background token (`#061019`) inside `:root`. Keep dark (`#061019`–`#0f2234`) so white text keeps >= 4.5:1 contrast. |
| `assets/css/style.css` | `--accent:` | 1 | Lagoon cyan accent token (`#5ce1e6`) inside `:root`. |
| `assets/css/style.css` | `--font-display:` | 1 | Display geometric sans-serif stack (`"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`). |
| `assets/js/main.js` | `data-motion-toggle` | 1 | Session-only motion pause/resume button selector. |

### Important Customisation Traps to Avoid

1. **Synchronising the 4 Hero Slides Between HTML and JavaScript:** Each of the 4 Maldives scenes appears in `index.html` (`.hero-media__img` stack, `.hero-dot` indicators, and `.atoll-card` in `#travel`) AND in the `slides` array at the top of `assets/js/main.js` (which drives the two vertical preview cards on the left of the hero). Always update both `index.html` and `assets/js/main.js` together.
2. **Keeping Vertical Cards Sharp:** The primary vertical card (`186×326 px`) uses `object-fit: cover`. Keep replacement images at least `1280×720 px` (`720 px` height > `326 px` card height) so images are never upscaled or blurry on retina screens.
3. **Preserving Text Contrast Over Sunset Photos:** Do not remove `.hero-media::after`, `.resort-card__scrim`, or the translucent dark backing on `.hero-headline`, as they guarantee WCAG AA readability across bright sunset clouds and turquoise water.

---

## Step 1 - Unzip and open the template

1. Save `maldives-escape.zip` to a dedicated folder on your computer.
2. Extract the full ZIP archive (**Extract All** on Windows or double-click on macOS).
3. Open the extracted `maldives-escape` folder and confirm `index.html` sits beside the `assets` folder.
4. Double-click `index.html` to open it in your browser, or use **Open with** and pick Chrome, Edge, Firefox, or Safari.
5. Test the `<` and `>` carousel arrows beside the vertical resort cards, click the 4 bottom pagination dots, test the category filter pills in `#travel`, and try the `Pause motion` button in the header.
6. Open `README.md` and `CUSTOMISE.md` in any text editor.

Expected folder structure:

```text
maldives-escape/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/
│       ├── aerial-pool-pavilion.webp
│       ├── lagoon-slide-villa.webp
│       ├── sunset-pergola-deck.webp
│       └── underwater-atoll-dining.webp
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
```

**Expected result:** The page opens with the sunset starlit pool & pergola deck hero, the left frosted dome containing the two vertical resort cards and `Book Now` pill, and the oversized `MALDIVES — The sunny side of life` headline.

## Step 2 - Keep the original and make a working copy

1. Keep `maldives-escape.zip` untouched as your permanent master backup.
2. Duplicate the extracted folder and name the duplicate `maldives-escape-working`.
3. Make all edits inside `maldives-escape-working` only. Keep `index.html`, `assets/css/style.css`, `assets/js/main.js`, and `assets/img/` in their exact relative locations.
4. Before major milestones, duplicate `maldives-escape-working` to a numbered snapshot such as `maldives-escape-backup-01`.
5. Save edited files with UTF-8 encoding and preserve their exact file extensions.

**Expected result:** You have a clean master archive and an isolated working folder you can refresh in the browser after every change.

## Step 3 - Prepare your business information

Gather the details below before starting your AI customisation session:

| Topic | What to prepare |
|---|---|
| Resort / Brand name | The brand name to replace `Maldives Escape` |
| Destination headline & tagline | Your main destination title (replacing `MALDIVES`) and subtitle (replacing `The sunny side of life`) |
| Four featured resort scenes | Titles, captions, tags, transfer times, and 16:9 photos (or keep the 4 included scenes) |
| Seasonal packages | 3 multi-night offer titles, durations, included highlights, and real rates to replace `[YOUR PRICE]` |
| Contact & booking action | Public concierge email, phone number, desk address, or external booking URL |
| Language | English, Vietnamese, Chinese, or another target language |

Do not publish unverified demo claims or leave `[YOUR PRICE]` placeholders on a live business site.

## Step 4 - Start working with AI

Attach `index.html`, `assets/css/style.css`, `assets/js/main.js`, `CUSTOMISE.md`, `README.md`, and `LICENCE.txt` to your AI chat tool (or grant your AI coding assistant access to `maldives-escape-working`). Then copy and send Prompt 01:

**Prompt 01 - Set up my website editing assistant**

```text
I bought the Maldives Escape static website template from Forge Zone and want
to turn it into my own resort or travel website. I am not a developer. Guide me
in clear, small steps.

First read every file I provide: index.html, assets/css/style.css,
assets/js/main.js, CUSTOMISE.md, README.md, and LICENCE.txt. Tell me which
files you read and whether any are missing. Do not guess missing files and do
not edit anything yet.

Summarise the current sections, the 4-slide hero and vertical card carousel,
the category filter buttons, and all sample strings that I must replace
(including Maldives Escape, concierge@maldivesescape.example, and the price
placeholders). Then ask me for my business details in small groups: brand name,
four featured villa/resort scenes, three seasonal offers, contact details, and
target language. Let me answer "not decided" when needed.

Throughout our work:
- Keep the plain HTML, CSS, and JavaScript structure, relative asset paths, and
  direct file:/// compatibility. Do not add a framework, bundler, or CDN script.
- Keep responsive layout, keyboard navigation, visible focus outlines, WCAG AA
  contrast, and the session-only Pause motion button working.
- Never invent prices, reviews, addresses, phone numbers, or booking URLs.
- Return complete replacement files and state the exact relative path for each
  file. Never use ellipses or placeholders inside code blocks.
```

**Expected result:** The AI confirms all files read, lists the sample items to replace, and asks for your first group of resort/travel business details.

## Step 5 - Replace the brand, copy, and contact actions

Once you have answered the AI's questions, use Prompt 02 and Prompt 03 in the same chat:

**Prompt 02 - Personalise all website content**

```text
Using the latest Maldives Escape files in this conversation, replace the demo
brand and resort copy with my verified business details. If you still need my
brand name, destination headline, four featured villa scenes, three offer
packages, public rates, contact email, phone number, or desk address, ask me
for them first before editing.

When updating the code:
1. Update the page <title>, meta description, Open Graph tags, header brand,
   hero vertical card captions, Book Now button, hero headline and subtitle,
   all 4 Atoll Collection cards, the 3 Seasonal Offers, the About Us pillars,
   the Contact Us section, and the footer.
2. Synchronise the 4 slide entries inside the slides array in assets/js/main.js
   so clicking the < / > arrows, vertical cards, or bottom dots displays the
   matching caption, subtitle, and image.
3. Remove or replace every sample price placeholder and unverified claim.
Return the complete updated index.html and assets/js/main.js files and list
every demo item you replaced.
```

**Prompt 03 - Connect every button to the right destination**

```text
Audit every button, navigation link, carousel arrow, vertical resort card,
pagination dot, category filter pill, stage-jump button, Book Now button, email
link, and phone link in the latest files. Show me a table with the element
label, current target or behaviour, and the real destination it should use.

Ask me to confirm my real concierge email address, phone number, and any
external booking URLs before editing. Then update index.html so all mailto:
links, tel: links, and section anchors point to verified destinations. Keep
internal anchor links (#top, #travel, #offers, #about, #contact) and
interactive buttons working without href="#". Return the complete updated
index.html file and a short click-test checklist.
```

## Step 6 - Change colours, fonts, images, or sections when needed

Apply visual changes one step at a time and refresh your browser after each change.

**Prompt 04 - Apply my colours and fonts safely**

```text
Read the latest index.html and assets/css/style.css files. Ask me for my
preferred dark background colour, card surface colour, accent colour, heading
font, and body font (or ask if I want to keep the current ocean-twilight
palette and Outfit + Plus Jakarta Sans fonts).

Then update the :root variables in assets/css/style.css and the Google Fonts
link in index.html if needed. Verify that body text maintains at least 4.5:1
contrast, large headings maintain at least 3:1 contrast, focus outlines remain
clearly visible, and text over the hero photography and vertical cards stays
readable across all four scenes. Return the complete updated files and note
every colour pair you checked.
```

**Prompt 05 - Replace the logo or illustration with my image**

```text
I want to replace the header SVG mark or one or more of the four resort WebP
photographs in assets/img/ (sunset-pergola-deck.webp, lagoon-slide-villa.webp,
aerial-pool-pavilion.webp, underwater-atoll-dining.webp). First ask me which
image I am replacing, the file name of my new image, and what the image shows
so you can write accurate alt text.

Inspect how the image is used in the hero stage (.hero-media__img), the left
vertical resort cards (.resort-card__img), and the Atoll Collection cards
(.atoll-card__media). Tell me the ideal dimensions (1600x900 or 1280x720 WebP,
under 300 KB) and exact folder (assets/img/), then return the complete updated
index.html and assets/js/main.js files using clean relative paths.
```

**Prompt 06 - Translate the whole website**

```text
Translate every visitor-facing string in the latest index.html and
assets/js/main.js into the target language I specify. Ask me which language to
use and whether destination or atoll names should stay in their original
spelling or be translated.

Translate the <html lang="..."> attribute, page title, meta description,
navigation links, motion toggle labels ("Pause motion" / "Resume motion"),
vertical card captions, Book Now button, hero headline and subtitle,
aria-labels, atoll cards, offer cards, about section, contact section, and
footer. Preserve all HTML classes, IDs, data attributes, and layout structure,
and check that no text overflows at 320 px width. Return the complete updated
index.html and assets/js/main.js files.
```

**Prompt 07 - Add or remove a service or section**

```text
Using the latest website files, I want to add or remove an atoll card, a
seasonal offer card, or a content section. First ask me what I want to add or
remove and ask for the verified copy if we are adding an item.

Identify the exact HTML block in index.html and any matching rules in
assets/css/style.css or assets/js/main.js. Explain the smallest safe change,
then update the files without leaving broken anchor links, empty wrappers, or
uneven grid rows. Return the complete updated files and a desktop/mobile check
list.
```

## Step 7 - Test before publishing

Test your customised site at `1440×900` (desktop), `820×1180` (tablet), `375×812` (phone), and `320×740` (narrow phone), as well as `200%` browser zoom.

**Prompt 08 - Audit the final website**

```text
Audit the latest index.html, assets/css/style.css, and assets/js/main.js files
as a pre-publication quality review. Do not edit the files until you report
your findings.

Check for:
1. Any leftover demo strings (Maldives Escape,
   concierge@maldivesescape.example, Boduthakurufaanu Magu, or unreplaced price
   markers).
2. Broken relative paths or missing images in assets/img/.
3. Synchronization between the 4 hero scenes in index.html and the slides array
   in assets/js/main.js.
4. Heading hierarchy (single h1, logical h2/h3 order), SVG aria-hidden/viewBox
   attributes, button accessible names, and >= 44x44 px touch targets.
5. Colour contrast and horizontal overflow down to 320 px width.

Group your findings into Blocker, Should Fix, and Optional. After I approve the
report, fix all Blocker and Should Fix items and return complete updated files.
```

## Step 8 - Publish by uploading the website folder

Upload the contents of your `maldives-escape-working` folder (`index.html` and the entire `assets/` directory) to any static hosting provider (Cloudflare Pages, Netlify, Vercel, GitHub Pages, or traditional web hosting).

**Prompt 09 - Guide me through publishing**

```text
Guide me step by step through publishing my static Maldives Escape website
folder (which contains index.html and the assets/ folder) to my hosting
provider. I am not a developer.

First ask me which hosting provider I am using and whether I want to upload the
folder directly in the browser dashboard or connect a Git repository. Then give
me one small step at a time, explain how to verify that index.html and
assets/img/*.webp uploaded in the right folder structure, and give me a quick
post-upload checklist for desktop, mobile, and HTTPS. Never ask for passwords,
API keys, or payment details.
```

**Expected result:** Your public URL loads the complete layout, fonts, and all 4 resort scenes over HTTPS.

## Step 9 - Connect a custom domain if needed

Once the temporary hosting URL works, connect your custom domain in your hosting dashboard and DNS provider.

**Prompt 10 - Connect my domain using the real configuration**

```text
Help me connect my custom domain to my published static website. First ask me
which hosting provider and which DNS/domain registrar I use, and ask me to
paste the exact DNS records shown by my hosting dashboard (with any private
account IDs hidden).

Compare those instructions with my current DNS settings and explain one record
change at a time. Warn me before modifying existing records and never instruct
me to delete MX or TXT records used for business email. Finish by showing me
how to verify the root domain, www subdomain, and HTTPS certificate.
```

## Step 10 - Update and recover safely

Keep a dated backup of every published version before making seasonal updates.

**Prompt 11 - Update one part and preserve everything else**

```text
Read the latest published files I attach. Ask me what single update I want to
make (for example, swapping one seasonal offer rate, updating a transfer window,
or changing the contact phone number).

Identify the smallest code block that needs to change, preserve all other
approved content, styles, and scripts, and return the complete updated file
along with a two-step local verification check.
```

**Prompt 12 - Find and fix a website problem**

```text
Help me diagnose and fix an issue on my static Maldives Escape website. First
ask me to describe what I expected to happen, what actually happened, which
device/browser I used, and what I changed most recently, and ask me to attach
the current files.

Inspect the code to find the root cause, explain the evidence clearly, and
apply the smallest safe fix without rewriting unrelated sections or adding
external libraries. Return the complete corrected file and tell me how to
verify the fix in my browser.
```

---

## Quick Troubleshooting & Rollback

| Symptom | Cause & Fix |
|---|---|
| Clicking `<` or `>` changes the photo but shows old card text | Update the corresponding entry (`slides[0]`..`slides[3]`) at the top of `assets/js/main.js`. |
| Resort image is missing (`404`) | Confirm the `.webp` file exists in `assets/img/` and matches the exact lowercase filename in `index.html` and `assets/js/main.js`. |
| Page opens unstyled | Ensure `assets/css/style.css` is inside the `assets/css/` subfolder next to `index.html`. |
| Layout breaks after an edit | Undo the last change in your editor (`Ctrl+Z` / `Cmd+Z`) or restore `index.html` / `style.css` from `maldives-escape-backup-01`. |

## Final Pre-Launch Checklist

- [ ] Master `maldives-escape.zip` and latest working backup are saved safely.
- [ ] All occurrences of `Maldives Escape`, `concierge@maldivesescape.example`, and `[YOUR PRICE]` are replaced.
- [ ] All 4 hero scenes match the 4 `slides` entries in `assets/js/main.js`.
- [ ] Every `mailto:`, `tel:`, and section link works as expected.
- [ ] Checked at `1440×900`, `820×1180`, `375×812`, `320×740`, and `200%` zoom with zero horizontal overflow.
