# Customise The Yellow Beast

## Edit Map

| Find exact text | Literal count | File |
|---|---:|---|
| `YELLOW BEAST` | 1 | `index.html` |
| `The Yellow Beast` | 4 | `index.html` |
| `PRE ORDER` | 1 | `index.html` |
| `607` | 7 | `index.html` |
| `--gold: #f5b300;` | 1 | `assets/css/style.css` |
| `--bg-dark: #0a0b0e;` | 1 | `assets/css/style.css` |

To change the car model and showcase:
1. Replace text in `index.html` (model names, performance specs, story copy).
2. Replace corresponding WebP images in `assets/img/` (`view-side.webp`, `view-front.webp`, `view-inside.webp`, `hero-stage.webp`).
3. Adjust CSS root tokens in `assets/css/style.css` (`--gold`, `--gold-bright`, `--bg-dark`).
4. Update spec matrix values and counter targets (`data-target="2.9"`, `data-target="607"`, etc.).

---

# Ten Steps from ZIP to Website

## Step 1 — Unzip and open
Extract the entire ZIP archive onto your computer and double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox. The showroom must render completely with all images, layout, and animations intact.

## Step 2 — Make a working copy
Keep your original ZIP file untouched as a golden backup. Duplicate the folder to `yellow-beast-custom/` before making any modifications.

## Step 3 — Prepare verified information
Collect your verified vehicle model details, horsepower, acceleration metrics, high-resolution photography, dealership contact email, and branding color codes.

## Step 4 — Start with AI
Attach your working copy files (`index.html`, `assets/css/style.css`, `assets/js/main.js`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) to your AI coding assistant and initiate with **Prompt 01**.

## Step 5 — Replace content and vehicle details
Use **Prompt 02** to systematically update headlines, car model name, lede descriptions, and factory specifications.

## Step 6 — Replace contact actions and forms
Use **Prompt 03** to point the reservation form or email enquiry CTA to your actual sales concierge email address or CRM webhook.

## Step 7 — Apply bespoke colours and typography
Use **Prompt 04** to adjust `--gold`, background tones, or font pairings in `assets/css/style.css`.

## Step 8 — Test across viewports and browsers
Use **Prompt 08** to test responsiveness at 1440×900, 820×1180, 375×812, and 320×740, checking camera view switching, counter animations, and accessibility.

## Step 9 — Publish the complete folder
Deploy your folder to any static hosting provider (Vercel, Netlify, Cloudflare Pages, GitHub Pages, or S3/CloudFront).

## Step 10 — Connect an optional domain
Link your custom domain using standard DNS A/CNAME records as guided by **Prompt 10**.

---

# Twelve Copy-Ready AI Prompts

### Prompt 01 — Start my editing assistant
```text
I purchased The Yellow Beast static automotive template. Read the attached files: index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md, and LICENCE.txt. Do not invent missing files. Summarise the current showroom structure, working interactions, and editable vehicle specs. Ask me for my vehicle brand, model name, performance figures, dealership contact, and primary website goal in small groups. Keep plain HTML/CSS/JS, relative paths, file:// operation, responsive behaviour, visible focus, and motion enabled by default. Do not introduce node dependencies or external trackers. Return complete replacement files with exact paths.
```

### Prompt 02 — Personalise showroom content
```text
Read the latest attached index.html and assets/js/main.js. Ask me for my verified vehicle model, horsepower, torque, top speed, acceleration, and brand backstory. Replace all fictional Porsche 911 Turbo S copy throughout metadata, hero headlines, telemetry counters, craftsmanship cards, and spec table. Update counter data-target attributes to match new metrics. Return complete changed files and a checklist of updated content.
```

### Prompt 03 — Replace contact & test drive actions
```text
Read the attached index.html and assets/js/main.js. Ask for my authorized sales email and test drive booking destination. Update the VIP enquiry form and header CTA buttons to route submissions to my verified email or concierge endpoint. Preserve semantic form tags, labels, and accessible error handling. Return complete replacement files.
```

### Prompt 04 — Apply bespoke colors and typography
```text
Read the attached assets/css/style.css and index.html. Ask for my brand's primary accent color and dark mode surface palette. Update the :root CSS variables (--gold, --gold-bright, --gold-glow, --bg-dark, --bg-card) consistently. Verify contrast ratios for body text and interactive button states against WCAG AA guidelines. Return complete replacement files.
```

### Prompt 05 — Replace vehicle perspectives & gallery imagery
```text
Read the attached index.html and assets/js/main.js. I want to replace the current vehicle photography with my own model images. Guide me on the recommended dimensions, aspect ratios, and filenames for assets/img/ (view-side.webp, view-front.webp, view-inside.webp, hero-stage.webp). Update image alt descriptions and thumbnail mappings in index.html and main.js. Return complete updated files.
```

### Prompt 06 — Adjust performance telemetry & statistics
```text
Read the attached index.html and assets/js/main.js. I have new performance metrics: [PROVIDE 0-100 TIME, POWER, TOP SPEED, TORQUE]. Update the stat-counter data-target and data-decimals attributes, metric titles, and explanatory captions in the telemetry section. Ensure the count-up animation runs smoothly upon scrolling into view. Return complete replacement files.
```

### Prompt 07 — Tune animations and interaction speeds
```text
Read the attached assets/css/style.css and assets/js/main.js. I want to adjust the transition timing of the camera angle crossfade and scroll reveals. Review the easing curves and transition durations, ensuring all animations remain smooth and performant across Edge, Cốc Cốc, Chrome, and Firefox. Keep the motion pause control functional. Return complete replacement files.
```

### Prompt 08 — Pre-publication accessibility & responsiveness checklist
```text
Review the attached index.html, assets/css/style.css, and assets/js/main.js. Conduct an audit across 320px, 375px, 820px, and 1440px viewports. Verify keyboard navigation (Tab/Shift+Tab, Enter on buttons, Escape to close mobile menu), ARIA attributes, skip link, contrast ratios, and offline functionality. Report all verified items and provide any necessary code fixes.
```

### Prompt 09 — Prepare static production deployment
```text
Review my current template folder structure. Provide concise instructions to deploy this static website to Vercel, Netlify, or Cloudflare Pages. Ensure all asset links remain relative, robots/meta headers are properly configured, and the site functions cleanly over HTTPS.
```

### Prompt 10 — Configure custom domain & SSL
```text
I am ready to connect my custom domain to my deployed showroom website. Guide me step-by-step through configuring apex and www DNS records (A and CNAME), ensuring automatic SSL certification and zero downtime.
```

### Prompt 11 — Minor copy or spec update
```text
Read the attached index.html. I need to make a quick update to the following text: [PROVIDE OLD TEXT AND NEW TEXT]. Update only the targeted lines, maintaining exact formatting, encoding, and attribute integrity. Return the updated file.
```

### Prompt 12 — Troubleshoot & recover layout
```text
I made an edit to my template and [DESCRIBE ISSUE, e.g., the car image does not change when clicking thumbnails / layout breaks on mobile]. Review the attached files, diagnose the exact cause, and provide the complete fixed file with an explanation of what went wrong.
```
