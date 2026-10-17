# Customising Beyond Voyages (`beyond-voyages`)

This guide takes you from the downloaded `beyond-voyages.zip` archive to a live, custom-branded travel showcase website. Follow Steps 1 to 10 in order. Every AI prompt below is complete and self-contained: copy it, attach your files, and let your AI assistant ask you for your business details in plain language.

## Quick Reference — Exact Edit Map

Every occurrence count below has been verified against the shipped files:

| File | Exact string to find | Count | Where it appears & how to update |
|---|---|---|---|
| `index.html` | `Logoipsum` | 3 | Header brand aria-label, visible header wordmark (`<span class="brand__name">`), and footer brand line. Replace with your agency name. |
| `index.html` | `Beyond Voyages` | 5 | Browser `<title>`, `og:title`, header brand `aria-label`, and footer copyright/brand lines. Replace with your brand name. |
| `index.html` | `Travel Beyond the Ordinary` | 3 | `<title>`, `og:title`, and the main hero `<h1>` headline. |
| `index.html` | `Travel Beyond Expectations` | 1 | Hero frosted pill badge text (`[data-hero-kicker]`). Update in `index.html` and in `scenes[2].kicker` inside `assets/js/main.js`. |
| `index.html` | `concierge@beyondvoyages.example` | 7 | Three package enquiry buttons, main contact button, and footer link. Replace all 7 occurrences with your real booking/concierge email. |
| `index.html` | `[YOUR PRICE]` | 3 | Illustrative package rates in `#packages`. Replace all 3 occurrences with verified pricing or "Custom quote". |
| `index.html` | `Cameo Island` | 8 | Hero orbital node 1, slide dot 1, and destination card 2. If changing destination 1, also update `scenes[0]` in `assets/js/main.js`. |
| `index.html` | `Koh Phi Phi Don` | 7 | Hero orbital node 2, slide dot 2, and destination card 3. If changing destination 2, also update `scenes[1]` in `assets/js/main.js`. |
| `index.html` | `Lago di Braies` | 9 | Default hero caption, orbital node 3, slide dot 3, destination card 1, and package 1. Also update `scenes[2]` in `assets/js/main.js`. |
| `index.html` | `Cinque Terre` | 7 | Hero orbital node 4, slide dot 4, destination card 4, and package 2. Also update `scenes[3]` in `assets/js/main.js`. |
| `index.html` | `Grand Canal` | 8 | Hero orbital node 5, slide dot 5, destination card 5, and package 1. Also update `scenes[4]` in `assets/js/main.js`. |
| `assets/css/style.css` | `--bg:` | 1 | Main dark background token (`#071118`) inside `:root`. Keep dark (`#071118`–`#10212e`) so white text keeps >= 4.5:1 contrast. |
| `assets/css/style.css` | `--accent:` | 1 | Warm gold accent token (`#f5b971`) inside `:root`. Used on dark surfaces only. |
| `assets/css/style.css` | `--font-display:` | 1 | Display script font stack (`"Lobster", "Georgia", "Times New Roman", serif`). |
| `assets/js/main.js` | `data-motion-toggle` | 1 | Session-only motion pause/resume button selector. |

### Important Customisation Traps to Avoid

1. **Synchronising Hero Destinations Between HTML and JavaScript:** Each of the 5 featured destinations appears in three places inside `index.html` (the `.hero-media__img` stack, the `.arc-node` button on the curved arc, and the `.dest-card` in `#destinations`) plus the `scenes` array at the top of `assets/js/main.js`. When replacing a destination, update both `index.html` and `assets/js/main.js` so clicking its circular thumbnail updates the hero text and photo together.
2. **Contrast Over Scenic Photographs:** The hero uses `.hero-media::after` and `.arc-node__meta` dark translucent backings (`rgba(7, 17, 24, 0.78)`) so white text remains readable even over bright clouds or water. Do not lower the opacity of `.hero-media::after` or `.arc-node__meta` below `0.68`.
3. **Backdrop Blur Performance:** Frosted glass (`backdrop-filter: blur(...)`) is used selectively on the header nav pill, hero badge, CTA button, and orbital labels. Avoid adding `backdrop-filter` to dozens of scrolling cards so low-power mobile devices stay smooth.

---

## Step 1 - Unzip and open the template

1. Save `beyond-voyages.zip` to a dedicated folder on your computer.
2. Extract the full ZIP archive (**Extract All** on Windows or double-click on macOS).
3. Open the extracted `beyond-voyages` folder and confirm `index.html` sits beside the `assets` folder.
4. Double-click `index.html` to open it in your browser, or use **Open with** and pick Chrome, Edge, Firefox, or Safari.
5. Click each circular destination thumbnail on the right-hand curved arc, test the region filter pills in `#destinations`, and try the `Pause motion` button in the header.
6. Open `README.md` and `CUSTOMISE.md` in any text editor.

Expected folder structure:

```text
beyond-voyages/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/
│       ├── boathouse-lake.webp
│       ├── cameo-island.webp
│       ├── cinque-terre.webp
│       ├── grand-canal.webp
│       └── koh-phi-phi.webp
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
```

**Expected result:** The page opens with the Lago di Braies alpine boathouse scene, the "Travel Beyond the Ordinary" script headline, and the 5 circular destination nodes along the right arc.

## Step 2 - Keep the original and make a working copy

1. Keep `beyond-voyages.zip` untouched as your permanent master backup.
2. Duplicate the extracted folder and name the duplicate `beyond-voyages-working`.
3. Make all edits inside `beyond-voyages-working` only. Keep `index.html`, `assets/css/style.css`, `assets/js/main.js`, and `assets/img/` in their exact relative locations.
4. Before major milestones, duplicate `beyond-voyages-working` to a numbered snapshot such as `beyond-voyages-backup-01`.
5. Save edited files with UTF-8 encoding and preserve their exact file extensions.

**Expected result:** You have a clean master archive and an isolated working folder you can refresh in the browser after every change.

## Step 3 - Prepare your business information

Gather the details below before starting your AI customisation session:

| Topic | What to prepare |
|---|---|
| Agency / Brand name | The brand name to replace `Logoipsum` and `Beyond Voyages` |
| Travel speciality | Luxury tailor-made tours, yacht charters, alpine treks, or regional guides |
| Target travellers | Couples, private groups, photographers, or expedition travellers |
| Five featured destinations | Names, locations, short descriptions, and 16:9 photos (or keep the 5 included scenes) |
| Travel packages | 3 multi-day package titles, routes, included highlights, and real rates to replace `[YOUR PRICE]` |
| Contact & booking action | Public concierge email, phone number, studio address, or external booking link |
| Language | English, Vietnamese, Chinese, or another target language |

Do not publish unverified demo claims or leave `[YOUR PRICE]` placeholders on a live business site.

## Step 4 - Start working with AI

Attach `index.html`, `assets/css/style.css`, `assets/js/main.js`, `CUSTOMISE.md`, `README.md`, and `LICENCE.txt` to your AI chat tool (or grant your AI coding assistant access to `beyond-voyages-working`). Then copy and send Prompt 01:

**Prompt 01 - Set up my website editing assistant**

```text
I bought the Beyond Voyages static website template from Forge Zone and want to
turn it into my own travel website. I am not a developer. Guide me in clear,
small steps.

First read every file I provide: index.html, assets/css/style.css,
assets/js/main.js, CUSTOMISE.md, README.md, and LICENCE.txt. Tell me which
files you read and whether any are missing. Do not guess missing files and do
not edit anything yet.

Summarise the current sections, the 5-destination orbital hero switcher, the
region filter buttons, and all sample strings that I must replace (including
Logoipsum, Beyond Voyages, concierge@beyondvoyages.example, and the three price
placeholders). Then ask me for my business details in small groups: brand name,
five featured destinations, three travel packages, contact details, and target
language. Let me answer "not decided" when needed.

Throughout our work:
- Keep the plain HTML, CSS, and JavaScript structure, relative asset paths, and
  direct file:/// compatibility. Do not add a framework, bundler, or CDN script.
- Keep responsive layout, keyboard navigation, visible focus outlines, WCAG AA
  contrast, and the session-only Pause motion button working.
- Never invent prices, reviews, addresses, phone numbers, or booking URLs.
- Return complete replacement files and state the exact relative path for each
  file. Never use ellipses or placeholders inside code blocks.
```

**Expected result:** The AI confirms all files read, lists the sample items to replace, and asks for your first group of travel business details.

## Step 5 - Replace the brand, copy, and contact actions

Once you have answered the AI's questions, use Prompt 02 and Prompt 03 in the same chat:

**Prompt 02 - Personalise all website content**

```text
Using the latest Beyond Voyages files in this conversation, replace the demo
brand and travel copy with my verified business details. If you still need my
agency name, five featured destinations, three package descriptions, public
rates, contact email, phone number, or studio address, ask me for them first
before editing.

When updating the code:
1. Update the page <title>, meta description, Open Graph tags, header brand
   (replacing Logoipsum), hero badge, hero headline, hero lede, all 5 orbital
   destination nodes, the 5 Destination Atlas cards, the 3 Travel Packages,
   the About Us pillars, the Contact section, and the footer.
2. Synchronise the 5 destination captions, kickers, and ledes inside the scenes
   array in assets/js/main.js so clicking any circular thumbnail on the hero
   arc displays the matching destination text.
3. Remove or replace every sample price placeholder and unverified claim.
Return the complete updated index.html and assets/js/main.js files and list
every demo item you replaced.
```

**Prompt 03 - Connect every button to the right destination**

```text
Audit every button, navigation link, orbital destination button, pagination dot,
region filter pill, stage-jump button, email link, and phone link in the latest
files. Show me a table with the element label, current target or behaviour, and
the real destination it should use.

Ask me to confirm my real concierge email address, phone number, and any
external booking URLs before editing. Then update index.html so all mailto:
links, tel: links, and section anchors point to verified destinations. Keep
internal anchor links (#top, #destinations, #packages, #about, #contact) and
interactive buttons working without href="#". Return the complete updated
index.html file and a short click-test checklist.
```

## Step 6 - Change colours, fonts, images, or sections when needed

Apply visual changes one step at a time and refresh your browser after each change.

**Prompt 04 - Apply my colours and fonts safely**

```text
Read the latest index.html and assets/css/style.css files. Ask me for my
preferred dark background colour, card surface colour, accent colour, heading
font, and body font (or ask if I want to keep the current dark alpine-emerald
palette and Lobster + Plus Jakarta Sans fonts).

Then update the :root variables in assets/css/style.css and the Google Fonts
link in index.html if needed. Verify that body text maintains at least 4.5:1
contrast, large headings maintain at least 3:1 contrast, focus outlines remain
clearly visible, and text over the hero photography stays readable across all
five scenes. Return the complete updated files and note every colour pair you
checked.
```

**Prompt 05 - Replace the logo or illustration with my image**

```text
I want to replace the header shield-and-star SVG logo or one or more of the
five destination WebP photographs in assets/img/ (boathouse-lake.webp,
cameo-island.webp, koh-phi-phi.webp, cinque-terre.webp, grand-canal.webp).
First ask me which image I am replacing, the file name of my new image, and
what the image shows so you can write accurate alt text.

Inspect how the image is used in the hero stage (.hero-media__img), the curved
orbital thumbnails (.arc-node__thumb), and the Destination Atlas cards
(.dest-card__media). Tell me the ideal dimensions (1600x900 or 1280x720 WebP,
under 300 KB) and exact folder (assets/img/), then return the complete updated
index.html and assets/js/main.js files using clean relative paths.
```

**Prompt 06 - Translate the whole website**

```text
Translate every visitor-facing string in the latest index.html and
assets/js/main.js into the target language I specify. Ask me which language to
use and whether destination place names should stay in their local spelling or
be translated.

Translate the <html lang="..."> attribute, page title, meta description,
navigation links, motion toggle labels ("Pause motion" / "Resume motion"), hero
badge, headline, lede, orbital node labels, aria-labels, destination cards,
package cards, about section, contact section, and footer. Preserve all HTML
classes, IDs, data attributes, and layout structure, and check that no text
overflows at 320 px width. Return the complete updated index.html and
assets/js/main.js files.
```

**Prompt 07 - Add or remove a service or section**

```text
Using the latest website files, I want to add or remove a destination card, a
travel package card, or a content section. First ask me what I want to add or
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
1. Any leftover demo strings (Logoipsum, Beyond Voyages,
   concierge@beyondvoyages.example, Talstrasse 82, or unreplaced price markers).
2. Broken relative paths or missing images in assets/img/.
3. Synchronization between the 5 hero orbital buttons in index.html and the
   scenes array in assets/js/main.js.
4. Heading hierarchy (single h1, logical h2/h3 order), SVG aria-hidden/viewBox
   attributes, button accessible names, and >= 44x44 px touch targets.
5. Colour contrast and horizontal overflow down to 320 px viewport width.

Group your findings into Blocker, Should Fix, and Optional. After I approve the
report, fix all Blocker and Should Fix items and return complete updated files.
```

## Step 8 - Publish by uploading the website folder

Upload the contents of your `beyond-voyages-working` folder (`index.html` and the entire `assets/` directory) to any static hosting provider (Cloudflare Pages, Netlify, Vercel, GitHub Pages, or traditional web hosting).

**Prompt 09 - Guide me through publishing**

```text
Guide me step by step through publishing my static Beyond Voyages website
folder (which contains index.html and the assets/ folder) to my hosting
provider. I am not a developer.

First ask me which hosting provider I am using and whether I want to upload the
folder directly in the browser dashboard or connect a Git repository. Then give
me one small step at a time, explain how to verify that index.html and
assets/img/*.webp uploaded in the right folder structure, and give me a quick
post-upload checklist for desktop, mobile, and HTTPS. Never ask for passwords,
API keys, or payment details.
```

**Expected result:** Your public URL loads the complete layout, fonts, and all 5 destination scenes over HTTPS.

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
make (for example, swapping one seasonal package rate, updating a destination
window, or changing the contact phone number).

Identify the smallest code block that needs to change, preserve all other
approved content, styles, and scripts, and return the complete updated file
along with a two-step local verification check.
```

**Prompt 12 - Find and fix a website problem**

```text
Help me diagnose and fix an issue on my static Beyond Voyages website. First
ask me to describe what I expected to happen, what actually happened, which
device/browser I used, and what I changed most recently, and ask me to attach
the current files.

Inspect the code to find the root cause, explain the evidence clearly, and
apply the smallest safe fix without rewriting unrelated sections or adding external
libraries. Return the complete corrected file and tell me how to verify the fix
in my browser.
```

---

## Quick Troubleshooting & Rollback

| Symptom | Cause & Fix |
|---|---|
| Clicking an orbital circle changes the photo but shows old text | Update the corresponding entry (`scenes[0]`..`scenes[4]`) at the top of `assets/js/main.js`. |
| Destination image is missing (`404`) | Confirm the `.webp` file exists in `assets/img/` and matches the exact lowercase filename in `index.html`. |
| Page opens unstyled | Ensure `assets/css/style.css` is inside the `assets/css/` subfolder next to `index.html`. |
| Layout breaks after an edit | Undo the last change in your editor (`Ctrl+Z` / `Cmd+Z`) or restore `index.html` / `style.css` from `beyond-voyages-backup-01`. |

## Final Pre-Launch Checklist

- [ ] Master `beyond-voyages.zip` and latest working backup are saved safely.
- [ ] All occurrences of `Logoipsum`, `Beyond Voyages`, `concierge@beyondvoyages.example`, and `[YOUR PRICE]` are replaced.
- [ ] All 5 orbital destination buttons match the 5 `scenes` entries in `assets/js/main.js`.
- [ ] Every `mailto:`, `tel:`, and section link works as expected.
- [ ] Checked at `1440×900`, `820×1180`, `375×812`, `320×740`, and `200%` zoom with zero horizontal overflow.
