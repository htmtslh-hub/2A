# Forge Zone customer guide — Chain Warden

This guide takes you from the downloaded `chain-warden.zip` file to a customised dark-fantasy champion or game character showcase website you can publish. Follow the 10 steps in order the first time. Every AI prompt below is complete and copy-ready.

## Where to edit what (Verified Edit Map)

All counts below are verified literal substring occurrences across `index.html`, `assets/css/style.css`, and `assets/js/main.js`.

| File | Literal string | Occurrences | Where it appears |
|---|---|---:|---|
| `index.html` | `Chain Warden` | 7 | Browser title, Open Graph metadata, and footer copyright notice |
| `index.html` | `THE CHAIN WARDEN` | 1 | Hero eyebrow label |
| `index.html` | `Thresh` | 17 | Hero h1 title, lore copy, abilities, skin titles, and biography modal |
| `index.html` | `LEAGUE` | 1 | Top-left stacked brand mark line 1 |
| `index.html` | `LEGENDS` | 1 | Top-left stacked brand mark line 2 |
| `index.html` | `PLAY NOW` | 1 | Top-right angled gold CTA button |
| `index.html` | `Death Sentence` | 4 | Default active Q ability title in hero and Ability Matrix card |
| `index.html` | `Shadow Isles: None Escape` | 4 | Bottom-right spotlight card caption, lore section heading, and spotlight modal title |
| `index.html` | `press@shadowwarden-studio.example` | 3 | Press kit enquiry mailto link in #play section and footer |
| `assets/css/style.css` | `--bg: #071014;` | 1 | Primary obsidian-teal background token in :root |
| `assets/css/style.css` | `--accent: #4fd1b5;` | 1 | Primary spectral emerald accent token in :root |
| `assets/css/style.css` | `--gold: #d6a856;` | 1 | Primary metallic gold button token in :root |
| `assets/js/main.js` | `warden-classic.webp` | 1 | Classic skin stage image path in SKINS array |
| `assets/js/main.js` | `warden-darkstar.webp` | 1 | Dark Star skin stage image path in SKINS array |
| `assets/js/main.js` | `warden-highnoon.webp` | 2 | High Noon and FPX skin stage image paths in SKINS array |

### Important traps to avoid
- **Keep `index.html` and `assets/js/main.js` ability/skin data in sync**: `index.html` renders the initial active ability (`Death Sentence (Q)`) and active skin (`Classic`) for immediate no-JS rendering, while `assets/js/main.js` stores the `ABILITIES` (5 items) and `SKINS` (4 items) arrays for interactive switching. Update both files when renaming abilities or skins.
- **Preserve contrast on dark surfaces**: `--accent-text` (`#5ee6c8`) and `--gold-text` (`#e6bc6e`) are tuned for small text on `#071014`, while `--gold` (`#d6a856`) uses dark `#071014` button label text. Do not darken text colours on dark backgrounds without checking a 4.5:1 contrast ratio.
- **Replace demo game trademarks before publishing**: Sample names (`LEAGUE OF LEGENDS`, `Thresh`, `Shadow Isles`, ability names, and skin titles) are illustrative placeholders for layout demonstration. Replace them with your own game intellectual property.

---

## Step 1 - Unzip and open the template

1. Download `chain-warden.zip` to a folder you can find easily.
2. Extract the complete ZIP archive (**Extract All** on Windows, double-click on macOS).
3. Open the extracted `chain-warden` folder and confirm `index.html` sits next to the `assets` folder.
4. Double-click `index.html` to open it in your browser.
5. Click through the 5 ability icons (`P / Q / W / E / R`), the 4 skin buttons (`Classic / Dark Star / High Noon / FPX`), the `Read more` button, and the `Shadow Isles: None Escape` spotlight card before editing.
6. Open `README.md` and `CUSTOMISE.md` in a text editor.

Expected structure:

```text
chain-warden/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/
│       ├── warden-classic.webp
│       ├── warden-darkstar.webp
│       ├── warden-highnoon.webp
│       └── warden-ui.webp
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
```

**Correct result:** the dark-fantasy champion stage, emerald typography, interactive ability bar, and skin switcher render cleanly via `file:///` or a local static server.

## Step 2 - Keep the original and make a working copy

1. Keep `chain-warden.zip` as your untouched backup archive.
2. Copy the extracted folder and name the copy `chain-warden-working-copy`.
3. Edit only inside `chain-warden-working-copy`. Keep the file names `index.html`, `assets/css/style.css`, and `assets/js/main.js` unchanged.
4. Before major structural changes, duplicate your working folder as `chain-warden-backup-01`.
5. Save all files in UTF-8 encoding with their original extensions.

**Correct result:** you have a clean original archive and a safe working copy you can refresh in your browser after every save.

## Step 3 - Prepare your character and studio information

Collect the details below before starting an AI editing session:

| Information | What to prepare |
|---|---|
| Game & studio name | Title shown in the top-left brand mark, browser tab, and footer |
| Character name & title | Main `<h1>` champion name and uppercase eyebrow title |
| Role & attributes | Role, difficulty tier, attack range type, and primary lane/mode |
| Five abilities | Names, key bindings, damage/shield stats, cooldowns, and short descriptions |
| Four skins / outfits | Skin names, lore blurbs, and stage artwork files |
| Lore & spotlight | Short 3-line intro, full biography modal text, and spotlight summary |
| Contact & CTA | Public press/support email or real external URL for the primary button |

## Step 4 - Start working with AI

Attach `index.html`, `assets/css/style.css`, `assets/js/main.js`, `CUSTOMISE.md`, `README.md`, and `LICENCE.txt` to your AI assistant, then copy the prompt below.

**Prompt 01 - Set up my website editing assistant**

```text
I bought a static website template from Forge Zone (Chain Warden) and want to
turn it into my own game character showcase website. I am not a developer.
Guide me in clear, small steps.

First read every file I provide: index.html, assets/css/style.css,
assets/js/main.js, CUSTOMISE.md, README.md, and LICENCE.txt. Tell me which
files you read and which are missing. Do not guess the contents of a missing
file and do not edit anything yet.

Summarise the current sections, working buttons (5 abilities, 4 skins, modals,
and motion toggle), demo-only elements, and all sample names that I must
replace. Then ask me for my game and character details in small groups:
brand/game title, character name and lore, 5 abilities, 4 skins, and contact
or CTA destination. Let me answer "not decided" when needed.

Throughout this task:
- Keep the plain HTML, CSS, and JavaScript structure, relative paths, and the
  ability to open index.html directly. Do not introduce a framework or build
  step.
- Preserve responsive behaviour, keyboard navigation, visible focus, readable
  contrast, and the session motion toggle.
- Never invent facts, reviews, prices, or business URLs.
- Return complete replacement files and state the exact destination path of
  each file.
```

**Correct result:** the AI confirms the files it read, summarises the Chain Warden layout, and asks for your first group of character details.

## Step 5 - Replace the brand, character copy, abilities, and contact actions

Provide your character sheet and studio contact details to the AI, then use Prompts 02 and 03.

**Prompt 02 - Personalise all website content**

```text
Use the latest Chain Warden website files in this conversation. Ask me for any
missing details regarding my game title, character name, role attributes, five
abilities, four skins, lore biography, and public contact email if I have not
already provided them.

Once confirmed, update index.html and assets/js/main.js so the page title,
Open Graph metadata, top brand mark, hero eyebrow, h1 character name, lore
paragraph, biography modal, 5 abilities (in both HTML and the ABILITIES array
in main.js), 4 skins (in both HTML and the SKINS array in main.js), role
telemetry cards, and footer reflect my verified information. Keep the existing
layout and responsive rules intact. Return complete changed files and list
every demo item you replaced.
```

**Prompt 03 - Connect every button to the right destination**

```text
Audit every button, navigation link, role rail link, modal trigger, and email
link in the latest Chain Warden files. Create a table with its visible label,
current destination or behaviour, whether it works, and the destination it
should use.

Ask me for my verified primary CTA URL (for the PLAY NOW button), press/support
email address, and any external community links if I have not provided them
yet. Then update the files using mailto: for email links and https:// for
external URLs while keeping internal section anchors (#gameplay, #champions,
#news, #collection, #esports, #play) and dialog modals working. Return
complete changed files and a short click-test checklist.
```

## Step 6 - Change colours, fonts, artwork, or sections when needed

Apply one visual change at a time and refresh the browser after each update.

**Prompt 04 - Apply my colours and fonts safely**

```text
Read the latest index.html and assets/css/style.css first. Ask me for my
preferred background colour, surface colour, primary accent colour, secondary
metallic/highlight colour, and display/body font names if I have not shared
them yet.

Update the :root CSS variables in assets/css/style.css while preserving a
minimum 4.5:1 contrast ratio for normal text and 3:1 for large text and focus
outlines. Keep fallback font stacks and do not add paid fonts unless I confirm
a licence. Return the complete updated CSS file and any required HTML font
link updates.
```

**Prompt 05 - Replace the character stage artwork or sprite sheet**

```text
I want to replace the character stage artwork in assets/img/ (warden-classic.webp,
warden-darkstar.webp, warden-highnoon.webp, or warden-ui.webp) with my own
licensed artwork.

Inspect how index.html, assets/css/style.css, and assets/js/main.js reference
these images. Tell me the recommended dimensions (838x458 for stage renders,
280x200 for the UI sprite sheet), WebP format tips, and exact folder path
(assets/img/). Then update the alt text, image paths, and SKINS array in
index.html and assets/js/main.js to match my new files. Return complete
changed files and step-by-step placement instructions.
```

**Prompt 06 - Translate the whole website**

```text
Translate every visitor-facing string in the latest Chain Warden website files
into the target language I specify (ask me which language if I have not named
it yet). Include metadata, navigation links, hero headings, lore, ability
names and descriptions in both index.html and assets/js/main.js, skin labels,
role telemetry cards, modals, button aria-labels, and footer copy.

Preserve HTML structure, class names, IDs, relative file paths, and JavaScript
logic. Check that translated labels do not overflow at 320 px mobile width or
desktop width. Return complete changed files.
```

**Prompt 07 - Add or remove a card or section**

```text
Use the latest Chain Warden website files. Ask me which ability card, skin
card, or page section I want to add or remove and what verified content to
include.

Identify the matching HTML block in index.html, CSS rules in
assets/css/style.css, and any array entry in assets/js/main.js. Explain the
smallest safe change, then update the files without leaving broken anchor
links, empty containers, or JavaScript errors. Return complete changed files
and a desktop/mobile verification checklist.
```

## Step 7 - Test before publishing

Test the site at desktop (`1440×900`), tablet (`820×1180`), and phone (`375×812` and `320×740`) widths.

**Prompt 08 - Audit the final website**

```text
Audit the latest Chain Warden website files as a final pre-publication review.
Do not make changes until you report the findings.

Check: broken relative paths; leftover demo names (Thresh, LEAGUE OF LEGENDS,
Shadow Isles, press@shadowwarden-studio.example); heading hierarchy (single
h1, no skipped levels); image alt attributes; button and link accessible
labels; 44x44 px touch targets on standalone controls; colour contrast;
horizontal overflow at 320 px; keyboard Tab, Shift+Tab, Escape on mobile menu
and dialogs; and synchronization between index.html and assets/js/main.js.

Group findings as Blocker, Should fix, or Optional with exact file and
selector references. After I approve the list, fix the Blocker and Should fix
items and return complete changed files.
```

## Step 8 - Publish by uploading the website folder

Upload the contents of your working folder so `index.html` sits at the published root alongside the `assets/` folder.

**Prompt 09 - Guide me through publishing**

```text
Guide me through publishing this static HTML/CSS/JavaScript website. First ask
me which hosting provider I am using (for example Vercel, Netlify, Cloudflare
Pages, or GitHub Pages) and whether I am uploading a folder manually or
connecting a Git repository.

Then give me one clear step at a time. Explain exactly which folder contents
to upload so index.html and assets/ (css, js, img) stay together, how to
verify a successful deployment, and how to test the public URL on desktop and
mobile. Never ask for passwords, private keys, or payment credentials.
```

**Correct result:** the live HTTPS URL loads the exact same layout, styles, WebP stage images, and interactive controls as your local copy.

## Step 9 - Connect a custom domain if needed

Verify the temporary hosting URL first, then connect your custom domain.

**Prompt 10 - Connect my domain using the real configuration**

```text
Help me connect my custom domain to my published static website. First ask me
which hosting provider and DNS registrar I use, and ask me to paste the exact
DNS records requested by the host (hiding any private account tokens).

Compare those instructions with my current DNS records and explain one change
at a time. Warn me before modifying existing records and never remove MX or
TXT records used for email. Show me how to verify the root domain, www
subdomain, and HTTPS certificate once DNS propagates.
```

## Step 10 - Update and recover safely

Keep a dated backup of every published version and make future edits in a fresh working copy.

**Prompt 11 - Update one part and preserve everything else**

```text
Read the latest published files I attach. Ask me for the exact single update I
want to make (such as a new skin, balance patch numbers on an ability, or a
new CTA link) if I have not stated it yet.

Name the exact file and smallest code block that needs to change, apply only
that update while preserving all other approved copy, styles, and accessibility
behaviour, and return complete changed files with a quick local test guide.
```

**Prompt 12 - Find and fix a website problem**

```text
Help me diagnose an issue in my static website. Ask me to describe what I
expected, what actually happened, which browser/device width shows the issue,
what changed recently, and any browser console message if I have not provided
them yet.

Inspect the attached files, identify the root cause with code evidence, apply
the smallest safe fix without adding external dependencies, and return
complete changed files along with a short verification test.
```

## Quick troubleshooting

| Problem | First check |
|---|---|
| Page opens without dark styling | Confirm `assets/css/style.css` is next to `index.html` inside `assets/css/` |
| Character stage image is blank | Confirm `assets/img/warden-classic.webp` and `warden-ui.webp` exist and match case |
| Clicking an ability does not update stats | Check that `assets/js/main.js` is loaded and `ABILITIES` has 5 valid entries |
| Mobile layout scrolls sideways | Remove any fixed pixel widths wider than `320px` outside the `838x458` media query |
| AI replaced only part of a file | Restore your backup folder and ask the AI to return the complete file without ellipses |

## Final checklist

- [ ] Original `chain-warden.zip` and a dated working backup are stored safely.
- [ ] All sample names (`LEAGUE OF LEGENDS`, `Thresh`, `Shadow Isles`) and demo emails are replaced.
- [ ] `index.html` and `assets/js/main.js` ability and skin arrays match each other.
- [ ] Every WebP image in `assets/img/` loads and has appropriate `alt` text.
- [ ] No horizontal overflow occurs at `1440×900`, `820×1180`, `375×812`, or `320×740`.
- [ ] Mobile menu, ability buttons, skin switcher, modals, and keyboard focus all work.
