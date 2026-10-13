# Shopluxe Customisation Guide

This guide helps you customize the Shopluxe template step-by-step or with an AI coding assistant. Follow the 10 steps in sequence.

---

## Step 1 — Unpack and inspect the template
1. Extract the complete ZIP package into a local directory.
2. Verify the 6 core files and `assets/img/` directory exist:
   - `index.html` (main storefront layout)
   - `assets/css/style.css` (design tokens and responsive styling)
   - `assets/js/main.js` (carousel, mobile menu, search, in-session cart)
   - `assets/img/` (WebP product shots and category imagery)
   - `CUSTOMISE.md` (this guide)
   - `README.md` (overview and features)
   - `LICENCE.txt` (commercial usage license)
3. Double-click `index.html` to open it in your browser. Verify the layout and features before making any edits.

---

## Step 2 — Keep a backup copy
Always make a copy of the original template folder before modifying code (e.g. `shopluxe-working`). If any edit breaks layout or styles, you can easily compare with the clean original.

---

## Step 3 — Gather your store information
Prepare your real business data before customizing:
- Store name, slogan, logo mark
- Primary contact information: customer email, support phone, warehouse address
- Product catalog: titles, actual prices, descriptions, images
- Category names and icons
- Brand color palette (primary dark tone, background shade, accent highlights)

---

## Step 4 — Work with your AI assistant
If using an AI assistant to edit your files, provide `index.html`, `style.css`, and `main.js`. Use the prompts below in order.

**Prompt 01 — Initialize store customization**

```text
I bought the Shopluxe static e-commerce storefront template from Forge Zone and want to turn it into my own online shop. I am not a developer. Guide me in clear, small steps.

First read every file I provide: index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md, and LICENCE.txt. Tell me which files you read and which are missing. Do not guess the contents of a missing file and do not edit anything yet.

Summarise the current sections, working buttons, demo-only elements, and all sample information that I must replace. Then ask me for the missing business information in small groups: brand, products, contact details, language, and the website goal. Let me answer "not decided" when needed.

Throughout this task:
- Keep the current plain HTML, CSS, and JavaScript structure, relative paths, and the ability to open index.html directly. Do not introduce a framework, package manager, build process, or new dependency.
- Preserve the template style unless I request a change. Keep responsive behaviour, keyboard navigation, visible focus, readable text, and motion support.
- Never invent facts, statistics, reviews, certifications, prices, addresses, or business URLs.
- Do not add tracking, a backend, payments, or hidden form submission.
- If you can edit the folder, edit only the working copy. Otherwise return complete replacement files and state the exact destination of each file.
- After every edit, list what changed, how I can view it, and what you tested.
- Do not publish, overwrite a live site, or change domain settings.

Begin by reading the files and asking for the first group of information.
```

---

## Step 5 — Replace store branding, copy, and links

**Prompt 02 — Personalise store branding and copy**

```text
Use the latest website files in this conversation. Replace the demo brand and copy with the verified information that I will provide.

First ask me for:
1. Store brand name and tagline
2. Primary product categories and offerings
3. Target customer audience
4. Main value proposition (such as free shipping threshold, warranty)
5. Public support email, telephone number, and physical store address
6. Target storefront language

Before editing, list any information still missing and any demo claim that cannot be supported. Then update the page title, metadata, navigation, hero, sections, calls to action, contact details, footer, image alt text, and any accessible labels. Keep the existing layout and responsive behaviour. Remove unsupported statistics, testimonials, prices, certifications, and locations instead of inventing replacements. Return complete changed files.
```

**Prompt 03 — Connect buttons and links**

```text
Audit every button, text link, menu item, email link, phone link, and form in the latest files. Create a table with its visible label, current destination, whether it works, and the destination it should use.

Ask me for my verified destinations:
- Primary CTA action (e.g. catalog anchor or store URL)
- Support email address
- Customer phone number
- Social media profile links

Then update the files. Use mailto: for email, tel: for phone, and secure https URLs for external pages. Keep internal section links working. If a form has no real submission service, label it as a demo or replace it with a working contact link. Do not simulate success. Return complete changed files and a short click-test checklist.
```

---

## Step 6 — Adjust colors, typography, and imagery

**Prompt 04 — Change colors and fonts**

```text
Read the latest HTML and CSS first. Apply this brand system while preserving the template layout and responsive behaviour:

Primary dark tone: (ask me for this information before editing)
Warm accent tone: (ask me for this information before editing)
Background tone: (ask me for this information before editing)
Body text tone: (ask me for this information before editing)
Heading font: (ask me for this information before editing)
Body font: (ask me for this information before editing)

Reuse existing CSS variables where possible. Check text contrast, buttons, links, focus states, hover states, borders, dark sections, and mobile views. Ensure text contrast meets at least 4.5:1 for body copy. Use sensible fallback fonts and do not add a paid font unless I confirm a licence. Return the complete CSS file, any required HTML changes, and note any colour pair that still needs review.
```

**Prompt 05 — Replace product and hero imagery**

```text
I will attach the latest website files and my image. The image is intended for (ask me for this information before editing) and I have permission to use it.

Inspect the current image container before editing. Tell me the recommended file name, format, dimensions, and exact folder under assets/img/. Then update the relevant HTML and CSS using a relative path. Preserve aspect ratio, prevent layout shift, write accurate alt text, and keep the result readable on desktop, tablet, and mobile. Do not crop important content without telling me. Return complete changed files and exact instructions for where I should place the image.
```

**Prompt 06 — Translate the storefront**

```text
Translate every visitor-facing string in the latest website into (ask me for this information before editing). This includes metadata, navigation, headings, paragraphs, buttons, labels, form messages, image alt text, accessibility labels, and footer text.

Keep brand names, registered product names, email addresses, phone numbers, and URLs unchanged unless I provide replacements. Preserve HTML structure, class names, IDs, paths, and JavaScript behaviour. Adapt wording naturally rather than translating word by word. After editing, check for text overflow at 320 px, 375 px, 820 px and 1440 px and on desktop. Return complete changed files and list any phrase whose meaning needs my confirmation.
```

**Prompt 07 — Add or remove product cards or sections**

```text
Use the latest website files. I want to (ask me for this information before editing) this item or section:
(ask me for this information before editing).

First identify the complete HTML block and any matching CSS or JavaScript. Explain the smallest safe change. Then edit without leaving empty wrappers, broken anchors, unused navigation links, or JavaScript errors. Keep spacing, visual hierarchy, responsive behaviour, keyboard access, and smooth motion. If adding an item would make the layout uneven, adjust the existing grid rules instead of duplicating arbitrary styles. Return complete changed files and a checklist for desktop and mobile.
```

---

## Step 7 — Test the storefront thoroughly

**Prompt 08 — Pre-publication audit**

```text
Audit the latest website files as a final pre-publication review. Do not make changes until you report the findings.

Check: missing files and broken relative paths; leftover demo names, sample text, placeholder prices, fake reviews, and placeholder URLs; page title and description; heading order; alt text; labels; keyboard navigation and visible focus; colour contrast; menu and button behaviour; horizontal overflow at 320 px, 375 px, 820 px and 1440 px; tablet and desktop layout; motion; console errors; external links; mailto and tel links; and whether any form only pretends to submit.

Group findings as Blocker, Should fix, or Optional. For each finding name the file and exact text or selector. After I approve the list, fix the Blocker and Should fix items, return complete changed files, and provide a manual test checklist. Do not publish the website.
```

---

## Step 8 — Publish to static hosting

**Prompt 09 — Static hosting deployment**

```text
Guide me through publishing this static HTML/CSS/JavaScript website on (ask me for this information before editing). I am not a developer. Use the provider's current screen labels only when you are sure of them; otherwise tell me what concept to look for instead of guessing.

My website folder contains index.html and an assets folder. First ask what I can see in my hosting dashboard and whether I am uploading manually, using a Git repository, or using the provider's command line. Then give one small step at a time. Explain exactly which folder contents to upload, how to recognise a successful deployment, and how to find the public URL. Do not ask for my password, API key, recovery code, or payment details. Do not change domain settings until I request it. Finish with checks for the home page, CSS, JavaScript, images, links, mobile layout, and HTTPS.
```

---

## Step 9 — Connect a custom domain

**Prompt 10 — Custom domain configuration**

```text
Help me connect my custom domain to the static website already published on (ask me for this information before editing). My domain is managed at (ask me for this information before editing).

Do not invent DNS values. First ask me to copy the exact domain instructions shown by my hosting provider, including record type, name/host, target/value, and whether a www record is required. Ask me to hide account IDs or private tokens. Compare those instructions with the records I can see and explain one change at a time. Warn me before replacing an existing record and do not tell me to remove email-related MX or TXT records. After the change, show me how to verify the root domain, www version, HTTPS certificate, and redirect behaviour.
```

---

## Step 10 — Maintenance and troubleshooting

**Prompt 11 — Incremental updates**

```text
Read the latest published-source files I attach. Change only this item:
(ask me for this information before editing).

Preserve all other approved copy, links, layout, colours, responsive rules, accessibility behaviour, and file paths. Before editing, name the file and the smallest block that needs to change. After editing, return complete changed files, summarise the exact difference, and tell me how to test it locally. Do not publish or alter domain settings.
```

**Prompt 12 — Problem resolution**

```text
Help me diagnose a problem in my static website. I will attach the latest files and provide:
- What I expected: (ask me for this information before editing)
- What happened: (ask me for this information before editing)
- Where it happens: (ask me for this information before editing)
- When it started: (ask me for this information before editing)
- Any browser error: (ask me for this information before editing)

Read the files before suggesting a fix. Identify the most likely cause and show the evidence in the code. Prefer the smallest fix and do not rewrite the site or add dependencies. Preserve the current design and responsive rules. Return complete changed files and give me a short test to confirm the problem is fixed. If the evidence is insufficient, ask for one specific screenshot, console message, or file instead of guessing.
```

---

## Exact Edit Map

The table below lists exact strings in the source code for direct manual editing.

| File | Search String | Occurrences | Description |
|---|---|---|---|
| `index.html` | `SHOPLUXE` | 3 | Store logo in header, footer, and announcement |
| `index.html` | `EVERYTHING YOU NEED` | 2 | Brand slogan under logo in header and footer |
| `index.html` | `support@shopluxe.example` | 2 | Customer support email in footer and mailto link |
| `index.html` | `+1 234 567 8900` | 1 | Customer phone number in footer |
| `index.html` | `123 Commerce St, New York, NY 10001, USA` | 1 | Store physical location in footer |
| `index.html` | `Smart Watch Series 9` | 3 | Product name in card heading, button data attributes |
| `index.html` | `Travel Backpack` | 2 | Product name in card heading and add button |
| `assets/css/style.css` | `--bg:` | 1 | Page background tone variable |
| `assets/css/style.css` | `--accent:` | 1 | Primary dark button & accent variable |
| `assets/css/style.css` | `--font-sans:` | 1 | Main typography family declaration |
| `assets/js/main.js` | `var cartCount = 1;` | 1 | Initial in-session cart item count variable |

---

## Pre-Publication Verification
- Check all prices, currency signs, and product specifications.
- Verify that support email and telephone link directly to your real communication channels.
- Inspect responsive rendering on phone (320px and 375px), tablet (820px), and desktop (1440px).
- Verify all images load properly without network latency.
