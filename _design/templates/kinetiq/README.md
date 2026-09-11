# Kinetiq

An editorial landing page for hardware and engineering companies. Plain HTML, CSS
and JavaScript — no build step, no framework, no package to install.

## Getting started

Open `index.html` in a browser. That is the whole setup.

To work on it with live reload, any static server will do:

```
npx serve .
```

## What is in the box

```
index.html              the page
assets/css/style.css    all styling
assets/js/main.js       mobile menu + reveal on scroll
```

## Changing the colours

Everything lives at the top of `assets/css/style.css`, in the `:root` block.
Change `--accent` and the buttons, highlights and details follow:

```css
:root {
  --accent: #cf4b19;   /* your brand colour */
  --ink:    #131312;   /* main text */
  --bg:     #f0efec;   /* page background */
}
```

## Changing the fonts

The page loads Archivo and Archivo Black from Google Fonts. To use your own,
replace the `<link>` in `index.html` and update these two lines:

```css
--font-display: 'Your Display Font', sans-serif;
--font-body:    'Your Body Font', sans-serif;
```

## Changing the text

All copy is plain text in `index.html`. Search for the words you see on the page
and type over them. Nothing is generated.

## Replacing the hero illustration

The mechanical drawing in the hero is inline SVG, marked with a comment in
`index.html`. Swap it for a photo or a 3D render:

```html
<div class="hero__figure">
  <img src="assets/img/product.jpg" alt="Describe the product here">
  ...
</div>
```

Keep the `hero__figure` wrapper so the layout holds.

## Contact form

The two buttons in the call-to-action open a `mailto:` link. Replace
`hello@example.com` in `index.html` with your address, or point the buttons at
your own form.

## Browsers

Works in current Chrome, Firefox, Safari and Edge. Layout uses CSS grid,
flexbox and `clamp()`.

## Accessibility

This template ships with a visible keyboard focus ring, landmark regions, a skip
link, and text contrast at WCAG AA. `prefers-reduced-motion` is respected — the
marquee stops and the reveal animation is skipped.

If you edit the CSS, the one rule worth keeping is the `:focus-visible` block.
Removing it makes the page unusable for anyone navigating by keyboard.

## Licence

See `LICENCE.txt`.
