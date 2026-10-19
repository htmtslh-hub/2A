# Customisation Guide — Camper (`v1.0.0`)

This guide walks you through customising **Camper — Overnight Camp** in 10 steps, followed by 12 copy-ready AI prompts and a counted literal edit map.

---

## 10-Step Customisation Walkthrough

1. **Change the Browser Title & Theme Color (`index.html`):**
   Update `<title>Camper — Overnight Camp</title>` and `<meta name="theme-color" content="#0b1a2b">` in `<head>`.
2. **Replace the Looping Camp Video (`#bg`):**
   In `<video id="bg">`, replace the `<source src="...">` URL with your own MP4 video and update the `aria-label` description.
3. **Update the Brand Wordmark (`a.logo`):**
   Change `<a class="logo" href="#">Camper</a>` inside `<header id="masthead">` to your camp, lodge, or outdoor expedition name.
4. **Edit Navigation Links (`nav.links#links`):**
   Update the four links (`Home`, `Travel`, `Location`, `Companions`) and their `href` attributes.
5. **Customise the `Sign up` Action (`a.signup`):**
   Change the label and `href` on `<a class="signup" href="#">Sign up</a>` to point to your registration page or booking portal.
6. **Update the Stacked Serif Headline (`#hero h1`):**
   Modify `<span class="ln"><span>Overnight</span></span>` and `<span class="ln"><span>Camp</span></span>` inside `#hero h1`.
7. **Rewrite the Camp Description (`#hero p`):**
   Replace the paragraph inside `<section id="hero">` with your program overview.
8. **Configure the Primary `Explore` CTA (`a.explore`):**
   Update `<a class="explore" href="#">Explore</a>` text and target URL.
9. **Adjust Brand Colors (`:root`):**
   In `:root`, change `--orange: #ec4f30`, `--orange-hi: #f15a3c`, `--underline: #7e80d7`, and `--night: #0b1a2b` to match your visual identity.
10. **Tune Canvas Proportions & Breakpoint Constants (`<script>`):**
    Adjust `DW = 1280`, `DH = 960`, `U_DESK = 0.874`, or `PHONE_W = 600` in the layout script if using a different video aspect ratio.

---

## 12 Copy-Ready AI Prompts

1. **Rebrand for an Alpine Ski Lodge:**
   > "In `index.html`, rebrand `Camper` to `Valdora`, change the stacked headline to `Alpine` / `Basecamp`, and update the paragraph to describe guided backcountry ski touring and heated timber chalets."
2. **Change Accent Palette to Forest Emerald & Gold:**
   > "In `index.html`, update `:root` so `--orange` is `#1f7a5c`, `--orange-hi` is `#289672`, `--underline` is `#e2b857`, and `--night` is `#071510`."
3. **Add a Registration Modal on `Sign up` Click:**
   > "In `index.html`, add an accessible modal dialog that opens when `a.signup` is clicked, containing Camper Name, Age Group, Cabin Preference, and Parent Email fields."
4. **Add a Program Schedule Drawer on `Explore` Click:**
   > "When `a.explore` is clicked in `index.html`, slide up a bottom sheet listing Evening Campfire, Stargazing Trek, Lake Canoeing, and Cabin Lights-Out times."
5. **Localise Copy into Vietnamese:**
   > "Translate the navigation links, headline, paragraph, and CTA buttons in `index.html` into Vietnamese while preserving all IDs, classes, and layout math."
6. **Add an Ambient Campfire Audio Toggle:**
   > "Add a minimal mute/unmute button in `header#masthead` that toggles audio on `#bg`."
7. **Adjust Mobile Focal Point for Vertical Video:**
   > "In `index.html`, change `#app[data-mode=\"compact\"] #bg` `object-position` from `72% 50%` to `50% 40%` to center a portrait-oriented video subject."
8. **Add a Season Switcher Pill (Winter / Summer):**
   > "Add a Winter/Summer toggle next to `a.logo` that swaps `#bg` `<source>` between two MP4 URLs and updates `--orange`."
9. **Increase Headline Size on Wide Monitors:**
   > "In `:root` of `index.html`, increase `--h1-size` from `104.64` to `116` and `--h1-lh` from `101` to `112`, adjusting `HERO_H` in JS accordingly."
10. **Add Keyboard Shortcut `M` for Tablet/Mobile Drawer:**
    > "In `index.html`, allow pressing `M` (when not focused in an input) to toggle `#menu-btn` in `tablet` and `compact` modes."
11. **Add Poster Image Attribute to `#bg`:**
    > "Add a `poster` attribute on `<video id=\"bg\">` in `index.html` so a still frame renders before video data arrives."
12. **Link Navigation Items to Section Hashes:**
    > "Update `nav.links` in `index.html` so `Home`, `Travel`, `Location`, and `Companions` link to `#home`, `#travel`, `#location`, and `#companions`."

---

## Counted Literal Edit Map

| File | Literal String | Count | Purpose |
| :--- | :--- | :---: | :--- |
| `index.html` | `Camper — Overnight Camp` | 1 | Document `<title>` |
| `index.html` | `Camper` | 2 | `<title>` prefix & `.logo` text |
| `index.html` | `Overnight` | 3 | `<title>`, `#hero` `aria-label`, and `h1` line 1 |
| `index.html` | `Companions` | 1 | 4th navigation item |
| `index.html` | `Sign up` | 1 | Header bordered CTA |
| `index.html` | `Explore` | 1 | Hero primary orange CTA |
| `index.html` | `#ec4f30` | 1 | `--orange` token in `:root` |
| `index.html` | `#7e80d7` | 1 | `--underline` token in `:root` |
