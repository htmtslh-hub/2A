# Where to change what

Work down this list and the whole page becomes yours. Nothing here needs
programming — you are searching for words and typing over them.

Open `index.html` and `assets/css/style.css` in any text editor. VS Code or
Sublime Text are nicer than Notepad because they can search and replace
across a whole file.

---

## 1. Your name and brand

| Search for | How many | Where |
|---|---|---|
| `Tidal` | 6 | browser tab, logo, footer, share preview |
| `Tidal Reef Trust` | 1 | copyright line at the very bottom |
| `Coral monitoring and restoration` | 2 | footer, description tag |

Use "replace all" for `Tidal` so you do not leave one behind.

The logo is the small circle mark next to the name. To use your own, replace
the `<svg class="logo__mark">` block with `<img src="assets/img/logo.svg" alt="">`.
It appears **twice** — header and footer.

---

## 2. Two placeholders you must fill

The template ships with two blanks on purpose, so you cannot publish a made-up
figure by accident:

| Search for | What to put there |
|---|---|
| `[YOUR PRICE]` | your lowest sponsorship amount |
| `[YOUR NUMBER]` | your charity or company registration number |

---

## 3. The headline

Around line 88:

```html
<h1 class="hero__title">
  Dive in.<br>Look closer.<br><span class="grad-text">Leave it better.</span>
</h1>
```

The line inside `grad-text` is the one that fades from cyan to violet. Move
that span to whichever line you want coloured — or delete it for plain white.

---

## 4. The three promises

The row of small glass bars under the hero, around line 232. Each one is a
`<li class="promise">` with an icon, a bold line and a quiet line. Delete one
and the remaining two spread out.

---

## 5. The three programmes

Larger cards, around line 250. Change the title, the paragraph and the figure
at the bottom:

```html
<p class="programme__stat"><b class="num num--cyan">26</b> sites on the schedule</p>
```

`num--cyan` and `num--violet` are the two accent colours. Mix them however
you like.

---

## 6. The impact numbers

Around line 300, four figures in one glass panel. Two or three work fine as
well — delete the ones you do not need.

---

## 7. Your email address

Search for `hello@example.com` — **2 places**, both in the buttons near the
bottom. Replace with your address, or point `href` at a donation page.

---

## 8. Colours

Open `assets/css/style.css`. The first block is all you need:

```css
:root {
  --cyan:   #35e0f0;   /* the main accent */
  --violet: #8a72ff;   /* the second accent, and the end of every gradient */
  --deep:   #050a1e;   /* the darkest part of the background */
}
```

The full background is four stacked gradients on `body`, a few lines below.
Change the hex values there to move the whole page to another colour family —
green for a forest charity, amber for a desert one.

One warning: both accents are chosen so that dark text stays readable on
them **and** they stay readable as text on the dark background. Making them
lighter is safe. Making them darker breaks both.

---

## 9. Fonts

Two lines in the same `:root` block:

```css
--font-display: 'Space Grotesk', Arial, sans-serif;   /* headings and figures */
--font-body:    'Manrope', 'Segoe UI', sans-serif;    /* everything else */
```

If you pick fonts from Google Fonts, also swap the `<link>` tag near the top
of `index.html` for the one Google gives you.

---

## 10. The turtle

It is a drawing in code, not an image file. It is marked with a comment in
`index.html`:

```html
<!-- Replace this SVG with a photograph if you have one. -->
```

To use a photograph: make a folder `assets/img/`, put your file in it, and
replace the whole `<svg class="turtle"> … </svg>` block with:

```html
<img class="turtle" src="assets/img/reef.jpg" alt="Describe the photograph">
```

Keep the `hero__figure` wrapper — the two floating cards are positioned
against it.

Always write something real in `alt=""`. It is what a blind visitor hears and
what shows if the image fails to load.

---

## 11. The light rays

The faint diagonal shafts behind everything are the `<svg class="rays">` near
the top of `index.html`. Delete the whole block for a plain background, or
change `stop-opacity=".22"` to make them stronger or fainter.

---

## A note on the frosted-glass effect

Every panel with `class="glass"` uses `backdrop-filter`, which is what makes it
look like frosted glass. It is beautiful and it is expensive to draw. If you add
many more glass panels the page can start to feel sluggish on older phones.

For the same reason the page background is **not** fixed while scrolling. Do not
add `background-attachment: fixed` — combined with the glass panels it makes
scrolling stutter, and iOS Safari ignores it anyway.

---

## Before you publish

- [ ] Searched for `Tidal` and `example.com` — nothing left over
- [ ] Both `[YOUR PRICE]` and `[YOUR NUMBER]` filled in
- [ ] Every figure on the page is a real one
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
