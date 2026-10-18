# Customise Jack

1. Extract the complete ZIP. Keep the original ZIP and make a separate working copy before editing. Read README.md and LICENCE.txt.
2. Install Node.js20.19+ or22.12+. In the working copy run `npm ci`, then `npm run dev`; open the printed HTTP URL. The hero should show a portrait. Direct file:// opening is unsupported.
3. Prepare your real name, biography, five services, three projects, contact destination and licensed images. Do not invent prices, clients or project results.
4. Give your AI assistant the working source files, package.json, CUSTOMISE.md and a description of the change. Never send passwords or API keys. Ask it to read first, preserve the React stack and return complete changed files at the same paths.
5. Replace the metadata in index.html and brand/hero/biography in src/main.tsx. Save, refresh and check the browser title and all visible copy.
6. Replace portrait, four decorative images and21GIF references in src/assets.json. Each marquee row is rendered three times from one array: edit the array once. The Celestia GIF currently returns404; replace that URL with your own working asset. Keep portrait transparency and image proportions.
7. Edit five service entries and three project records, each with three images. Connect Contact Me and Live Project to your real destinations instead of the labelled demo dialogs. No email or message is sent by the original demo.
8. Test1440×900,820×1180,375×812,320×740, keyboard Tab/Escape, image loading, marquee motion, project stacking and contact URLs. Font and media need internet; test fallback fonts separately. Motion defaults on, including when the operating system requests reduced motion.
9. Run `npm run build`, then `npm run preview`. Publish the resulting dist/ contents with index.html at the host root. built/ is the original prebuilt snapshot and does not update when you edit source. Verify the public URL, HTTPS, media and mobile layout before connecting a domain; use only the DNS values your host supplies.
10. Save the exact source and build for each published version. For a new change work in a copy and rebuild. If something breaks, restore the last known-good files/build and reverse the last edit; do not delete unrelated files or rewrite the project.

## Editing prompts

Copy one prompt and attach the current source. Every request below preserves React18, TypeScript, Tailwind, Framer Motion, the current design, file paths and unrelated behavior. Ask for missing information rather than guessing. Return complete changed files, explain their destinations and report actual tests. Do not publish without my explicit instruction.

1. Read the attached Jack source, README, CUSTOMISE and LICENCE first. Tell me which files you read, identify sections, working actions and demo content, then ask for my name, activity, audience and goal in small groups. Do not edit yet.
2. Replace Jack and the hero/biography copy with my supplied brand information. Ask for missing verified details. Update metadata, labels and alt text too; remove unsupported claims. Keep the layout and show me all remaining demo content.
3. Audit all nav, Contact Me and Live Project actions. Ask for real email, booking and project URLs where absent, then connect only those confirmed destinations. Keep internal anchors. Never simulate a successful form submission. Return a click-test checklist.
4. Ask for my brand colors and font choices. Read src/styles.css and Tailwind classes before changing them. Preserve the composition; check gradients, text contrast, focus states and mobile. Do not add a paid font or new dependency without approval.
5. Inspect the portrait container and ask for my transparent image and usage permission. Recommend dimensions and a relative file path, replace the source, preserve aspect ratio and update alt text. Test magnetic pointer motion and touch behavior without cropping the face.
6. Ask which language I want, then translate all visible text, metadata, accessible labels and demo dialogs. Preserve URLs, identifiers and names unless I provide replacements. Test long text at320/375/820/1440px and flag uncertain translations.
7. Ask which service, project or section I want added or removed and for its verified content. Update only the relevant arrays, layout and navigation dependencies; keep the project scale/count math correct. Do not invent pricing or add a backend.
8. Audit the current source and build before publication: missing media, placeholder destinations, focus, headings, contrast,320px overflow, console/network errors, motion, dialogs and unsupported claims. Report blockers, optional issues and NOT TESTED items. Do not silently change content or claim tests you did not run.
9. Ask which static host and upload method I use. Guide me through npm ci, npm run build and publishing dist/ with index.html at the root. Distinguish editable source from built output. Verify HTTPS, JS/CSS, media and mobile using the real public URL; never request secrets or invent dashboard labels.
10. Ask for my host, domain provider and the exact DNS records supplied by the host. Explain each required change and preserve existing email MX/TXT records. Do not guess IPs or change DNS yourself. Check root/www/HTTPS once I complete the setup.
11. Read my latest source and ask for the exact small change I want if unclear. Change only that part and necessary dependencies. Preserve approved copy, media, motion, responsive layout and file paths. Provide complete changed files, build/test commands and rollback steps; do not publish.
12. Ask for expected behavior, actual result, browser/device, recent edit, local/online context and exact error. Read the real files and inspect paths, media responses and build output. Fix the smallest evidenced cause; distinguish evidence from guesses and give a repeatable confirmation test.

## Literal edit map

| Find | Count | File / effect |
|---|---:|---|
| `Hi, i` | 1 | src/main.tsx hero heading |
| `Contact Me` | 1 | src/main.tsx shared button, rendered twice |
| `Live Project` | 1 | src/main.tsx shared card, rendered three times |
| `const biography=` | 1 | src/main.tsx biography |
| `const services=` | 1 | src/main.tsx five entries |
| `"portrait"` | 1 | src/assets.json |
| `"gifs"` | 1 | src/assets.json21URLs, rows cloned3times |
| `"projects"` | 1 | src/assets.json3records |

Before publication: verify your content and destinations, all media, keyboard focus, narrow layouts, production build and separate media rights. Keep a backup of source and dist/. The dialog backdrop uses blur; avoid duplicating it across many elements on low-power devices.
