# Where to change what

Work down this list and the whole page becomes yours. Nothing here needs
programming — you are searching for words and typing over them.

Open `index.html` and `assets/css/style.css` in any text editor. On Windows,
Notepad works; VS Code or Sublime Text are nicer because they can search and
replace across a file.

---

## 1. Your name and brand

| Search for | How many | Where |
|---|---|---|
| `Kinetiq` | 6 | browser tab, logo, footer, share preview |
| `Kinetiq Systems GmbH` | 1 | copyright line at the very bottom |
| `Precision actuation systems` | 3 | description tags, footer address |
| `Bremen, Germany` | 1 | footer address |

Use "replace all" for `Kinetiq` so you do not leave one behind.

The logo is a small circle mark next to the name. To use your own, replace
the `<svg class="logo__mark">` block with `<img src="assets/img/logo.svg" alt="">`.

---

## 2. The big headline

Around line 68 in `index.html`:

```html
<span class="hero__line">Motion</span>
<span class="hero__line">Engineered</span>
<span class="hero__line hero__line--with-mark">To Last
```

Three separate lines so you control where each one breaks. Keep them short —
one or two words each — or the type gets small on phones.

---

## 3. The scrolling strip

**This one has a catch.** The strip that slides across the page repeats its
text **four times** so the loop has no visible seam. Lines 147 to 150:

```html
<span>Precision in motion</span><span>Tested to 10,000 cycles</span><span>Built in Bremen</span>
```

Change all four identical lines, not just the first. If you change only one,
the strip will visibly jump when it loops.

---

## 4. The four product cards

Each card is one block in `index.html`, starting around line 172. Change the
title, the paragraph, and the button label:

```html
<h3 class="card__title">Harmonic drives</h3>
<p class="card__text">Zero-backlash reduction gearing …</p>
<a class="btn btn--ghost btn--sm" href="#contact">Specifications</a>
```

The last card is the dark one. It stays dark because of `card--dark` in its
`class`. Remove that word to make it light, or move it to another card.

Want fewer than four cards? Delete a whole `<li class="card"> … </li>` block.
Want more? Copy one and paste it after the last.

---

## 5. The numbers

Around line 236. Four of them; the layout handles two or three as well —
just delete the ones you do not need.

```html
<span class="stat__num">10,000</span>
<span class="stat__label">Cycles per unit, tested</span>
```

---

## 6. Your email address

Search for `hello@example.com` — **2 places**, both in the call-to-action
buttons near the bottom. Replace with your address.

To use a real contact form instead, change `href="mailto:…"` to your form's
URL, or drop a form embed in place of the two buttons.

---

## 7. Colours

Open `assets/css/style.css`. The first block is all you need:

```css
:root {
  --accent: #c84616;   /* buttons, highlights, details */
  --ink:    #131312;   /* main text */
  --bg:     #f0efec;   /* page background */
}
```

One warning: if you make `--accent` lighter, white button text stops being
readable. `#c84616` is as light as it goes while staying legible. Lighter
shades are fine for decoration but not behind white text.

---

## 8. Fonts

Two lines in the same `:root` block:

```css
--font-display: 'Archivo Black', 'Arial Black', sans-serif;
--font-body:    'Archivo', 'Helvetica Neue', Arial, sans-serif;
```

If you pick fonts from Google Fonts, also swap the `<link>` tag near the top
of `index.html` for the one Google gives you.

---

## 9. The hero illustration

The mechanical drawing is a drawing in code, not an image file. It is marked
with a comment in `index.html`:

```html
<!-- Replace this SVG with a product photo or 3D render if you have one. -->
```

To use a photograph: make a folder `assets/img/`, put your file in it, and
replace the whole `<svg class="assembly"> … </svg>` block with:

```html
<img class="assembly" src="assets/img/product.jpg" alt="Describe your product">
```

The three small dark squares beside it are the `thumbs` list — same idea, or
delete the whole `<ul class="thumbs"> … </ul>` if you do not want them.

Always write something real in `alt=""`. It is what a blind visitor hears and
what shows if the image fails to load.

---

## 10. Menu links

The top menu is around line 40, the footer links around line 298. Both are
plain lists — change the words, and change `href="#systems"` to wherever each
one should go.

---

## Before you publish

- [ ] Searched for `Kinetiq` and `example.com` — nothing left over
- [ ] All four copies of the scrolling strip say the same thing
- [ ] Every image has a real `alt`
- [ ] Looked at the page on a phone
- [ ] Changed the `<title>` and the two `description` tags at the top —
      these are what Google and social media show

---

## If something breaks

Undo your last change. HTML is unforgiving about one missing `<` or `"`, and
that is almost always the cause.

Keep a copy of the original folder before you start. Then you can always
compare, or start over.


---

## Twelve copy-ready AI prompts

**Prompt 01 - Start my editing assistant**
```text
Read the attached Kinetiq source files (index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md). Keep plain HTML/CSS/JS, file:// compatibility, and default-on motion with session pause. Help me complete task 01: Start my editing assistant.
```

**Prompt 02 - Replace brand and copy**
```text
Read the attached Kinetiq source files (index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md). Keep plain HTML/CSS/JS, file:// compatibility, and default-on motion with session pause. Help me complete task 02: Replace brand and copy.
```

**Prompt 03 - Update contact links**
```text
Read the attached Kinetiq source files (index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md). Keep plain HTML/CSS/JS, file:// compatibility, and default-on motion with session pause. Help me complete task 03: Update contact links.
```

**Prompt 04 - Apply colours and fonts**
```text
Read the attached Kinetiq source files (index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md). Keep plain HTML/CSS/JS, file:// compatibility, and default-on motion with session pause. Help me complete task 04: Apply colours and fonts.
```

**Prompt 05 - Replace SVG hero artwork**
```text
Read the attached Kinetiq source files (index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md). Keep plain HTML/CSS/JS, file:// compatibility, and default-on motion with session pause. Help me complete task 05: Replace SVG hero artwork.
```

**Prompt 06 - Translate page language**
```text
Read the attached Kinetiq source files (index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md). Keep plain HTML/CSS/JS, file:// compatibility, and default-on motion with session pause. Help me complete task 06: Translate page language.
```

**Prompt 07 - Add or remove a product card**
```text
Read the attached Kinetiq source files (index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md). Keep plain HTML/CSS/JS, file:// compatibility, and default-on motion with session pause. Help me complete task 07: Add or remove a product card.
```

**Prompt 08 - Update engineering metrics**
```text
Read the attached Kinetiq source files (index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md). Keep plain HTML/CSS/JS, file:// compatibility, and default-on motion with session pause. Help me complete task 08: Update engineering metrics.
```

**Prompt 09 - Audit before publishing**
```text
Read the attached Kinetiq source files (index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md). Keep plain HTML/CSS/JS, file:// compatibility, and default-on motion with session pause. Help me complete task 09: Audit before publishing.
```

**Prompt 10 - Publish to static hosting**
```text
Read the attached Kinetiq source files (index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md). Keep plain HTML/CSS/JS, file:// compatibility, and default-on motion with session pause. Help me complete task 10: Publish to static hosting.
```

**Prompt 11 - Connect custom domain**
```text
Read the attached Kinetiq source files (index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md). Keep plain HTML/CSS/JS, file:// compatibility, and default-on motion with session pause. Help me complete task 11: Connect custom domain.
```

**Prompt 12 - Diagnose a layout issue**
```text
Read the attached Kinetiq source files (index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md). Keep plain HTML/CSS/JS, file:// compatibility, and default-on motion with session pause. Help me complete task 12: Diagnose a layout issue.
```
