# Customising ATRIUM MTL (`atrium-mtl`)

This guide takes you from the downloaded `atrium-mtl.zip` archive to a live, custom-branded architectural archive, museum, or exhibition website. Follow Steps 1 to 10 in order. Every AI prompt below is complete and self-contained: copy it, attach your files, and let your AI assistant ask you for your project details in plain language.

## Quick Reference — Exact Edit Map

Every occurrence count below has been verified against the shipped files:

| File | Exact string to find | Count | Where it appears & how to update |
|---|---|---|---|
| `index.html` | `ATRIUM MTL` | 6 | Browser `<title>`, meta description, logo `aria-label`, visible `.logo-mark`, hero `<main>` label, and hero `<p>` body copy. |
| `index.html` | `AN ARCHIVE OF LIGHT CAST IN STONE` | 1 | Header subtitle `.logo-sub` directly beneath the main wordmark. |
| `index.html` | `Annual Photography Retrospective` | 2 | Meta description and bold phrase inside the hero paragraph. |
| `index.html` | `House of Brutalism : 418` | 1 | First utility strip phone label (`tel:+14188386000`). |
| `index.html` | `Studio Exhibitions : 418` | 1 | Second utility strip phone label (`tel:+14188386001`). |
| `index.html` | `Tickets` | 6 | Header CTA `aria-label` and pill label, expandable menu link, and hero CTA `aria-label` and pill label. |
| `index.html` | `Installations` | 3 | Header navigation link, expandable menu link, and hero secondary CTA link. |
| `assets/css/style.css` | `--paper:` | 1 | Warm off-white background token (`#f5f4ef`). Also update `:root` inside `index.html`. |
| `assets/css/style.css` | `--red:` | 1 | Brutalist coral-red mosaic tile token (`#ef5d44`). Also update `:root` inside `index.html`. |
| `assets/css/style.css` | `--yellow:` | 1 | Warm ochre-yellow mosaic tile token (`#fcdd71`). Also update `:root` inside `index.html`. |
| `assets/css/style.css` | `--blue:` | 1 | Sky-blue mosaic tile token (`#9fd5f7`). Also update `:root` inside `index.html`. |

---

## Step 1 - Unzip and open the template

1. Save `atrium-mtl.zip` to a dedicated folder on your computer.
2. Extract the full ZIP archive (**Extract All** on Windows or double-click on macOS).
3. Open the extracted `atrium-mtl` folder and confirm `index.html` sits beside the `assets` folder.
4. Double-click `index.html` to open it in your browser, or use **Open with** and pick Chrome, Edge, Firefox, or Safari.
5. Watch the `2.1s` WAAPI entrance choreography transition smoothly into the `14.6s` opposing column marquee, and test the `Menu` toggle across desktop, tablet, and mobile widths.

## Step 2 - Keep the original and make a working copy

1. Keep `atrium-mtl.zip` untouched as your permanent master backup.
2. Duplicate the extracted folder and name the duplicate `atrium-mtl-working`.
3. Make all edits inside `atrium-mtl-working` only. Keep `index.html`, `assets/fonts/`, and `assets/img/` in their exact relative locations.
4. Before major milestones, duplicate `atrium-mtl-working` to a numbered snapshot such as `atrium-mtl-backup-01`.
5. Save edited files with UTF-8 encoding and preserve their exact file extensions.

## Step 3 - Prepare your institution or exhibition details

Gather the details below before starting your AI customisation session:

| Topic | What to prepare |
|---|---|
| Institution / Exhibition name | Your museum, gallery, archive, or studio title to replace `ATRIUM MTL` |
| Subtitle & 4-line headline | Your tagline and four short display lines to replace `An archive / of light / cast in / stone` |
| Exhibition summary | 1–2 sentences describing your exhibition, retrospective, or season |
| Utility phones & navigation | Verified phone numbers, ticketing URL, and exhibition section links |
| Mosaic photography | 4 high-contrast vertical or square WebP photographs (or keep the 4 included brutalist photos) |

## Step 4 - Start working with AI

Attach `index.html`, `CUSTOMISE.md`, `README.md`, and `LICENCE.txt` to your AI chat tool. Then copy and send Prompt 01:

**Prompt 01 - Set up my website editing assistant**

```text
I bought the ATRIUM MTL static website template from Forge Zone and want to
customise it for my museum, gallery, architectural archive, or exhibition. I am
not a developer. Guide me in clear, small steps.

First read index.html, CUSTOMISE.md, README.md, and LICENCE.txt. Tell me which
files you read, summarise the floating white header, the 4-line Archivo hero
headline, the 6-column opposing infinite mosaic, the 5 responsive modes, and all
sample strings I need to replace. Do not edit anything yet.

Ask me for my institution details in small groups: brand name, tagline, 4-line
headline, exhibition paragraph, phone numbers, and ticket/programme links.
```

## Step 5 - Replace the brand, copy, and contact actions

Once you have answered the AI's questions, use Prompt 02 and Prompt 03 in the same chat:

**Prompt 02 - Personalise all website content**

```text
Using the latest ATRIUM MTL index.html file in this conversation, replace the
demo museum copy with my verified institution details. Ask me first if any
detail is still missing.

Update the <title>, meta description, header wordmark and subtitle, utility
phone numbers and labels, main navigation labels, 4-line h1 headline, hero
description paragraph, and CTA labels. Preserve the inline CSS, SVG icons, and
WAAPI entrance script intact, and return the complete updated index.html file.
```

**Prompt 03 - Connect every button and link to the right destination**

```text
Audit every link and button in the latest index.html file: the two tel: phone
links, the 5 Useful links, the Search button, the logo link, the Main navigation
links, the Menu drawer links, and both Tickets and Installations CTAs.

Show me a table of each control and its current href, ask me to confirm my real
destinations, and then return the complete updated index.html file with no
broken links or href="#".
```

## Step 6 - Change colours, fonts, or mosaic photos when needed

Apply visual changes one step at a time and refresh your browser after each change.

**Prompt 04 - Apply my colours and fonts safely**

```text
Read the inline <style> block in index.html and assets/css/style.css. Ask me
whether I want to adjust the paper background (--paper), ink text (--ink), or
the five solid mosaic tile colours (--red, --yellow, --blue, --card-cream,
--card-dark).

Check that text contrast on the header and hero stays WCAG AA compliant, update
both index.html and assets/css/style.css, and return the complete files.
```

**Prompt 05 - Replace the four mosaic photographs**

```text
Inspect the :root image variables (--img-sculpt, --img-man, --img-visit,
--img-sil) and numeric crop rules (.f-sculpt, .f-man, .f-visit, .f-sil) in
index.html. Explain the dimensions and aspect ratios of the four mosaic photos,
ask me for my replacement image paths or URLs, and update index.html while
keeping the 14.6s infinite column loop smooth.
```

**Prompt 06 - Adjust the mosaic columns or header links**

```text
Read index.html and ask me whether I want to change the tile order inside the
columns (.c1, .c2, .c3, .x1, .x2, .x3) or add/remove navigation links in the
floating header and mobile drawer. Apply the requested change cleanly while
keeping the 5-cell-per-column cloning logic intact.
```

## Step 7 - Check the website before publishing

Use Prompt 07 and Prompt 08 to run a complete pre-launch audit:

**Prompt 07 - Run a full quality check on my website**

```text
Perform a complete audit of my latest index.html file:
1. Confirm all demo strings (ATRIUM MTL, 418-838-6000, 418-838-6001) are
   replaced if requested.
2. Verify valid HTML5 landmarks, single <h1>, accessible SVG attributes, and
   focus-visible outlines.
3. Verify all 5 responsive modes (desk, tab-l, tab-p, mob-l, mob) and reduced
   motion support.
Report any issues and provide the complete corrected file if needed.
```

**Prompt 08 - Optimise page title, description, and sharing tags**

```text
Review the <head> section of index.html. Ask me for my final public website URL
and preferred social sharing summary, then update the <title> and meta
description cleanly without inventing unverified claims.
```

## Step 8 - Publish to a free or custom host

Upload the contents of `atrium-mtl-working` (`index.html` and `assets/`) to Netlify Drop, Cloudflare Pages, Vercel, or GitHub Pages.

**Prompt 09 - Help me publish my website step by step**

```text
Guide me step by step through publishing my static ATRIUM MTL website folder
(index.html and the assets/ directory) to my hosting provider. Ask me which
provider I use, explain one small step at a time, and give me a quick checklist
to verify fonts, mosaic images, and responsive scaling over HTTPS.
```

## Step 9 - Connect a custom domain if needed

Once your temporary hosting URL is live, connect your custom domain in your hosting dashboard.

**Prompt 10 - Connect my domain using the real configuration**

```text
Help me connect my custom domain to my published static website. Ask me which
hosting provider and DNS registrar I use, ask me to paste the DNS records shown
in my hosting dashboard, and explain one DNS change at a time without touching
existing MX email records.
```

## Step 10 - Update and recover safely

Keep a dated backup of every published version before making seasonal exhibition updates.

**Prompt 11 - Update one part and preserve everything else**

```text
Read the latest index.html file I attach. Ask me what single update I want to
make (for example, updating the exhibition season, changing a ticket URL, or
swapping one mosaic photo), apply the smallest safe edit, and return the
complete updated index.html file.
```

**Prompt 12 - Find and fix a website problem**

```text
Help me diagnose and fix an issue on my ATRIUM MTL website. Ask me what I
expected to happen, what actually happened, and which device/browser I used.
Inspect index.html, explain the root cause clearly, and return the complete
corrected file.
```
