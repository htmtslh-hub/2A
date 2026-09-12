# Starter

A one-screen coming-soon page. Plain HTML and CSS — no build step, no
framework, nothing to install.

This is the free sample from the **Agentic** template library. Use it however
you like, including commercially.

## Getting started

Open `index.html` in a browser. That is the whole setup.

## What to change

| Search for | How many | Where |
|---|---|---|
| `Northbound` | 3 | logo, footer, browser tab |
| `hello@example.com` | 1 | the contact link |
| `Launching spring 2026` | 1 | the note in the top right |

The headline is three separate lines in `index.html`, so you control exactly
where each one breaks:

```html
<span>We are</span>
<span>building</span>
<span class="title__accent">something good</span>
```

Colours are in the `:root` block at the top of `assets/css/style.css`:

```css
--accent: #c84616;   /* the coloured line, the button */
--ink:    #131312;   /* main text */
--bg:     #f0efec;   /* page background */
```

If you make `--accent` lighter than `#c84616`, white button text stops being
readable.

## Connecting the email form

The form does not go anywhere yet. Point it at whatever you already use:

```html
<form class="signup" action="https://your-list-provider.com/subscribe" method="post">
```

Then delete `assets/js/main.js` and the `<script>` tag at the bottom of
`index.html` — that script only exists to stop the unconnected form from
silently doing nothing.

## Licence

Use it on anything, commercial or personal, no attribution needed. The one
thing you cannot do is resell the file itself or bundle it into another
template pack.

## The rest of the library

The paid templates are full landing pages — several sections, responsive
layouts, and a checklist naming every piece of text you might want to change.
See [forgezone.store](https://forgezone.store).
