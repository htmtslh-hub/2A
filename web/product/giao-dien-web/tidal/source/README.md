# Tidal

A dark, frosted-glass landing page for conservation groups, research projects
and cause-led organisations. Plain HTML, CSS and JavaScript — no build step,
no framework, no package to install.

## Getting started

Open `index.html` in a browser. That is the whole setup.

To work on it with live reload, any static server will do:

```
npx serve .
```

## What is in the box

```
index.html                  the page
assets/css/style.css        all styling
assets/js/main.js           mobile menu + reveal on scroll
assets/img/hero-ocean.webp  ocean and turtle hero background
CUSTOMISE.md                step-by-step guide, AI prompts and exact edit map
README.md                   this file
LICENCE.txt                 what you may and may not do
```

**If you only read one file, read `CUSTOMISE.md`.** It walks you from the ZIP
to a published site, and its edit map says exactly where every piece of text,
colour and image lives. The rest of this file is background.

## What works and what is sample only

Works: the layout on phone, tablet and desktop, the mobile menu, section links,
keyboard navigation, the skip link, reduced motion, and the email buttons
(`mailto:` links that open the visitor's email app).

Sample only: every name, figure and the "today" temperature card. There is no
donation system, payment, live data or backend. Two blanks ship on purpose and
must be filled before publishing: `[YOUR PRICE]` in the call to action and
`[YOUR NUMBER]` in the footer.

## Changing the colours

Everything lives at the top of `assets/css/style.css`, in the `:root` block:

```css
:root {
  --cyan:   #35e0f0;   /* main accent */
  --violet: #8a72ff;   /* second accent, end of every gradient */
  --deep:   #050a1e;   /* darkest background colour */
}
```

The full background is a stack of gradients on `body`. Both accents carry dark
text on buttons and are also used as text on the dark background, so making
them lighter is safe; making them darker breaks contrast.

## Changing the fonts

The page loads Space Grotesk and Manrope from Google Fonts. To use your own,
replace the `<link>` in `index.html` and update these two lines:

```css
--font-display: 'Your Display Font', sans-serif;
--font-body:    'Your Body Font', sans-serif;
```

## Replacing the hero image

The turtle and ocean are one local image, `assets/img/hero-ocean.webp`
(about 232 KB). Replace that file to change the artwork. It is decorative and
applied by `.hero::before` in `assets/css/style.css`: desktop uses it as a full
backdrop with a dark overlay; tablet and phone show it in an artwork area below
the copy. Keep the `hero__figure` wrapper for the two data cards.

Because of this image, Tidal is larger than the 20 KB, six-file profile of the
other Forge Zone templates.

## Contact buttons

The two call-to-action buttons and the footer address open a `mailto:` link.
Replace `hello@example.com` in `index.html` with your address, or point the
buttons at your own donation or contact page.

## Browsers

Tested for this release in current Chromium and Firefox on Windows. Layout uses
CSS grid, flexbox, `clamp()` and `backdrop-filter`; where `backdrop-filter` is
not supported the panels fall back to a plain translucent background.

## Accessibility

Visible keyboard focus ring, landmark regions, a skip link, and text contrast
at WCAG AA. Without JavaScript all content and navigation stay visible.
`prefers-reduced-motion` is respected — the floating cards settle and the
reveal animation is skipped.

If you edit the CSS, keep the `:focus-visible` block. Removing it makes the page
unusable for anyone navigating by keyboard.

## Licence

See `LICENCE.txt`.
