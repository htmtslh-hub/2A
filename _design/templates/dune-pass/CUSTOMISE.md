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
| `Dune Pass` | 6 | browser tab, logo, footer, share preview |
| `Dune Pass Travel` | 1 | copyright line at the very bottom |
| `Swakopmund, Namibia` | 1 | footer address |
| `Small-group desert travel` | 2 | footer, description tag |

Use "replace all" for `Dune Pass` so you do not leave one behind.

The logo is the small circle mark next to the name. To use your own, replace
the `<svg class="logo__mark">` block with `<img src="assets/img/logo.svg" alt="">`.
It appears **twice** — header and footer.

---

## 2. The headline

Around line 76:

```html
<h1 class="hero__title">Land of endless <em>horizons</em></h1>
```

The word inside `<em>` is the one that turns terracotta. Move it to whichever
word you want coloured.

---

## 3. The search bar

Around line 84. It is a real `<form>` but it does not go anywhere yet — it
submits to the routes section. Point `action="#routes"` at your booking system,
or replace the whole form with an embed from whoever handles your bookings.

The route names in the dropdown are three `<option>` lines. Add or remove as
many as you like.

---

## 4. The three route cards

Each card starts around line 200 with `<li class="route">`. Change the name,
the description, the price, and the coloured header:

```html
<div class="route__media route__media--sand">
```

Three colour options ship with the template: `--sand`, `--sage`, `--clay`.
They are defined near the bottom of `style.css` under ROUTES.

The "Most booked" label is `<span class="badge">` — delete the line to remove it,
or move it into another card.

Want more than three cards? Copy a whole `<li class="route"> … </li>` and paste
it after the last one; the grid handles the rest.

---

## 5. When to go

Four small cards around line 295. The dark one is dark because of
`season__card--dark` in its class. Move that word to highlight a different
period.

---

## 6. The numbers

Around line 310. Four of them; two or three work fine as well — delete the
ones you do not need.

---

## 7. Your email address

Search for `hello@example.com` — **2 places**, both in the buttons at the
bottom. Replace with your address, or point `href` at your booking form.

---

## 8. Colours

Open `assets/css/style.css`. The first block is all you need:

```css
:root {
  --accent: #bf4d26;   /* buttons, highlights, the coloured headline word */
  --ink:    #38241b;   /* main text */
  --bg:     #faf3ec;   /* page background */
  --sand:   #f2dfcb;   /* the chip and the "when to go" panel */
}
```

One warning: if you make `--accent` lighter, white button text stops being
readable. `#bf4d26` is as light as it goes while staying legible.

---

## 9. Fonts

Two lines in the same `:root` block:

```css
--font-display: 'Instrument Serif', Georgia, serif;   /* the big serif */
--font-body:    'Outfit', 'Segoe UI', sans-serif;     /* everything else */
```

If you pick fonts from Google Fonts, also swap the `<link>` tag near the top
of `index.html` for the one Google gives you.

---

## 10. The desert illustration

The isometric scene is a drawing in code, not an image file. It is marked with
a comment in `index.html`:

```html
<!-- Replace this SVG with a photograph if you have one. -->
```

To use a photograph: make a folder `assets/img/`, put your file in it, and
replace the whole `<svg class="diorama"> … </svg>` block with:

```html
<img class="diorama" src="assets/img/desert.jpg" alt="Describe the scene">
```

Keep the `hero__figure` wrapper — the three floating cards are positioned
against it.

Always write something real in `alt=""`. It is what a blind visitor hears and
what shows if the image fails to load.

---

## 11. The three floating cards

Weather, ticket and route list. They sit on top of the illustration on desktop
and become a normal row on narrow screens — that is handled for you.

To remove one, delete its whole `<div class="float-card …"> … </div>`.

---

## Before you publish

- [ ] Searched for `Dune Pass` and `example.com` — nothing left over
- [ ] Prices and dates are yours, not the sample ones
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
