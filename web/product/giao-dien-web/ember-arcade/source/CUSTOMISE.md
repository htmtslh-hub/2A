# Customise Ember Arcade

This is an editable static gaming dashboard, not a game launcher service. The five artwork files may be used on your finished websites under LICENCE.txt. All games, profiles and statistics are fictional. Keep HTML/CSS/JS and relative paths; no build or framework is required.

## Edit map

Counts below refer to literal text in the named file. Replace all matching brand and contact occurrences, including metadata and accessible labels. Other game-title occurrences are listed by component below; update them consistently.

| File | Literal text | Count | Change |
|---|---|---|---|
| `index.html` | `Ember Arcade` | 6 | Brand, metadata, home label and footer |
| `index.html` | `hello@example.com` | 1 | Public contact email |
| `index.html` | `32.5` | 1 | Total sample hours |
| `assets/css/style.css` | `--bg:` | 1 | Burgundy page background |
| `assets/css/style.css` | `--accent:` | 1 | Coral accent |
| `assets/js/main.js` | `950px` | 1 | Mobile breakpoint |

- Brand and metadata: `title`, description, Open Graph, `.logo` accessible name and footer in HTML.
- Profile and friends: `.greeting`, `.profile-avatar`, `.friends-rail`. Initials and presence dots are fictional; they do not connect accounts. Remove the rail or label it accurately if you add a real service.
- Main feature: two-line title over cinematic artwork, with three image quick picks. `.hero__copy`, `.hero__art` and `#game-rift`. Replace Rift Runner consistently in quick picks, activity, stats and notes.
- Discovery cards: `.game-card`, `data-name`, `data-tags`, headings, `data-save` IDs and notes. Search reads titles/tags from HTML, not a remote catalogue. Keep IDs unique and matching section links. If you add another favourite ID, update the allowed ID list in JS as well.
- Layered hero: `.hero__backdrop` uses `rift-background.webp`; `.hero__figure` uses alpha-transparent `rift-character.webp` (both 1440×960). Keep real alpha transparency; adjust its negative top offset for the pop-out effect. The complete `rift.webp` remains for thumbnails.
- Artwork: `assets/img/rift.webp` is 1440×960; `moon.webp` and `ash.webp` are 800×1200. Preserve proportions, update width/height and alt text, and inspect every crop. Keep each replacement below 300KB where practical. Text overlays need verified contrast.
- Playtime: `.stats-total`, `.stats-legend` and `.activity-row`. Keep total equal to the three legend values; session time is separate. These are static values, not measurements from users.
- Colours/fonts: opening `:root` in CSS. Dark panels and cream text are a pair; verify 4.5:1 ordinary-text contrast and focus after changing them. System fonts require no network.
- Menu: `.nav-toggle`, `#site-menu` and 950px in CSS/JS must remain linked. Finite 280ms reveal and 350ms hover start enabled; do not introduce perpetual motion.
- Favourites: `ember-arcade-favourites` in JS stores only game IDs on the device. Change this key if another site on the same origin uses the same template. To clear it, use your browser's site storage controls; do not clear unrelated data.

## Step 1 - Extract and open

Extract the entire ZIP and open `ember-arcade/index.html`. Keep the five images and CSS/JS folders together. Scroll, open game notes and try navigation. Correct result: the dashboard and artwork render without installation.

## Step 2 - Keep a working copy

Retain the original ZIP. Copy the extracted folder to `website-working-copy`. Edit only that copy, save as UTF-8 with real extensions, and make a dated backup before major edits. Correct result: a clean original is available for recovery.

## Step 3 - Prepare verified content

Collect your brand, licensed game catalogue, audience, descriptions, permitted artwork, contact address and real destination URLs. Decide whether the dashboard remains a demonstration or will connect services later. Do not present fictional friends, activity or playtime as live data. Correct result: a list of verified information and missing items.

## Step 4 - Start with AI

Attach the current ZIP, or six code/document files and all five images. Explain the relative paths. In a new chat resend current files and Prompt 01. If tools edit a folder, grant access only to the working copy; otherwise copy complete returned files to their exact destinations.

**Prompt 01 - Set up my Ember Arcade assistant**

```text
I bought Ember Arcade and am not a developer. Read my attached index.html,
assets/css/style.css, assets/js/main.js, README.md, CUSTOMISE.md, LICENCE.txt
and five assets/img artwork files. Name files missing; do not guess or edit yet.
Summarise sections, functional search, device favourites, navigation, notes,
fictional games and static statistics. Ask for brand, audience, licensed game
information, public contact, language and website goal in small groups.
Preserve plain HTML/CSS/JS, relative paths, direct file opening, keyboard use,
focus, responsive layout and finite motion. Never invent rights or live data.
Do not add tracking, backend, payments, game installs or fake success messages.
Edit only the working copy, or return complete files with exact destinations,
without omissions. Report changes and actual tests. Do not publish or change DNS.
Begin by reading and asking for missing information.
```

## Step 5 - Personalise content and links

Supply verified information. Replace fictional copy intentionally, including metadata and accessibility labels. Keep the device-only and static-data disclosures where applicable. Save returned files to the matching paths and refresh. Correct result: consistent content and real destinations.

**Prompt 02 - Personalise my dashboard**

```text
Use the latest Ember Arcade files. Ask for my brand, audience, catalogue,
descriptions, permitted artwork, profile display, public email and language
when missing. Replace sample content only with supplied facts. Update metadata,
greeting, feature, cards, notes, rail labels, alt text and footer consistently.
Keep demo statistics labelled unless I supply verified data; never simulate
online friends. Return complete changed files, remaining demo items and tests.
```

**Prompt 03 - Connect real destinations**

```text
Audit every link, button and input. Make a table of label, destination and
behavior. Ask for my verified email and game-page URLs. Preserve internal
notes/navigation, use mailto for email and HTTPS for supplied external links.
Search must remain device-local unless I explicitly request integration.
Do not add fake play/download/chat success. Return complete files and a click
checklist covering navigation, Escape, search, favourites and game notes.
```

## Step 6 - Change appearance or catalogue

Make one type of change at a time and refresh. Send the latest files whenever starting a new AI conversation. Correct result: a coherent dashboard at desktop, tablet and phone widths.

**Prompt 04 - Apply my colours and fonts**

```text
Read my latest HTML/CSS. Ask for my colours and font preferences in plain
language. Reuse root variables, preserve burgundy dashboard structure and
contrast on panels, over artwork, buttons and focus. Use licensed fonts with
fallbacks; do not add paid fonts without permission. Return complete changed
files and actual contrast checks, with any unresolved pair identified.
```

**Prompt 05 - Replace artwork safely**

```text
Read my latest files and attached permitted artwork. Ask which feature/card
it belongs to and verify dimensions, format and crop before editing. Give
the exact relative destination, preserve aspect ratio and prevent layout
shift. Update src, width, height and accurate alt. Protect text contrast and
inspect crops at 320,375,820,1440px. Return complete changed files and placement
instructions. Never invent asset rights or crop out important details silently.
```

**Prompt 06 - Translate everything**

```text
Ask my desired language, then translate all visitor text, metadata, labels,
alt, accessible names, search result messages, storage notices and demo
disclosures in the latest files. Preserve game titles, IDs, paths, storage
keys and URLs unless I request replacements. Keep structure and behavior.
Check long labels at 320px. Return complete files and ambiguous phrases.
```

**Prompt 07 - Add or remove a game**

```text
Ask which game I want to add/remove and collect its verified title, tags,
description, permitted artwork and destination. Read the entire current
template. Identify matching cards, quick picks, notes, IDs, favourites allowed
IDs and sample statistics before making the smallest safe update. Remove
broken links, update search and preserve layout/keyboard behavior. Return
complete changed files and a catalogue consistency test. Do not add services.
```

## Step 7 - Test the final site

Open the working copy at 320,375,820 and1440px. Try Tab/Shift+Tab, menu/Escape, search with results/no results, saved state after reload, notes, missing images and no JavaScript. Correct result: readable content, working navigation and honest demo behavior.

**Prompt 08 - Audit before publishing**

```text
Audit the latest files before edits. Check missing assets, relative paths,
fictional copy, labels, metadata, heading order, keyboard/focus, contrast,
artwork crops, overflow at320/375/820/1440px, menu, search, Escape, favourites,
blocked storage, no JS, offline, finite motion and console errors. Separate
Blocker/Should fix/Optional findings with file and selector evidence. After
I approve fixes, return complete changed files and a manual checklist.
Do not publish or claim backend/game services exist.
```

## Step 8 - Publish the working folder

Choose a static host. Upload the contents with `index.html` at the public root and `assets/` beside it. Verify licence rights for replacement art and all live destinations. Correct result: HTTPS URL matches the locally tested copy. A website host does not supply game services.

**Prompt 09 - Guide publishing**

```text
Ask which static hosting provider I use and what I see in its dashboard.
Guide one small step at a time for uploading index.html plus the whole assets
folder. Do not guess current UI labels, request secrets, or change domains.
Explain how to verify HTTPS, images, CSS/JS, mobile layout, search and storage.
Keep game services out of scope. Ask for missing setup information and finish
with a verified public URL checklist, not a claim of deploying without tools.
```

## Step 9 - Connect a domain optionally

Publish on the host URL first. Use the provider's actual DNS records; preserve email records. Correct result: the requested domain opens the same HTTPS site after propagation.

**Prompt 10 - Connect a real domain**

```text
Ask for my domain provider and the exact DNS instructions from my host,
with private details hidden. Do not invent DNS values. Compare records and
explain one change at a time; warn before replacing an existing record and
preserve MX/TXT email records. Verify root/www, HTTPS and redirects. Do not
ask for passwords, tokens or recovery codes. Wait for actual setup details.
```

## Step 10 - Update and recover

Keep a known-good version. Make changes in a fresh working copy, test locally and publish only approved files. If anything breaks, restore the last backup, then investigate the smallest change. Correct result: recoverable edits and an untouched original ZIP.

**Prompt 11 - Update one part**

```text
Ask what exact part of my latest dashboard should change. Read current files
and identify the smallest affected block. Preserve approved content, links,
IDs, paths, palette, responsiveness, access and local behavior elsewhere.
Return complete changed files, exact differences and tests. Do not publish,
clear unrelated browser data or change domain settings.
```

**Prompt 12 - Diagnose a problem**

```text
Read the latest files. Ask what I expected, what happened, browser/device,
when it started, last change and exact error or screenshot. Diagnose from
code evidence, do not rebuild or guess missing files. Fix the smallest cause
while preserving style and behavior. Return complete changed files, recovery
steps and a confirmation test. Never ask for secrets or private player data.
```

## Final checklist and recovery

- Keep the original ZIP and a known-good backup.
- Replace brand, fictional content and contact or retain explicit demo labels.
- Verify rights for added images/fonts and read LICENCE.txt.
- Check search, favourites, notes, mobile menu, keyboard, focus and asset paths.
- Verify no overflow or unreadable overlay text at all four widths.
- Confirm no fake backend, chat, installation or payment behavior is presented.
- Check published HTML/CSS/JS/artwork over HTTPS and store source backups.
- If a change breaks the page, undo only that change or restore its complete backup; resend current files and Prompt12 to diagnose.
