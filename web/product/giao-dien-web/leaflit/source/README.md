# Leaflit 1.0.0

A browser-local personal book-library interface for designers and developers. Version 1.0.0 is a static local-library template, not an ebook reader.

## Open
Extract the entire folder and double-click `index.html`. No build, installation, network connection or account is required. Preserve the relative asset paths.

## Included
Read `CUSTOMISE.md` for the template-specific edit map, ten setup steps and twelve AI prompts. Six core source files plus eight local WebP cover images in assets/img/: index.html, assets/css/style.css, assets/js/main.js, CUSTOMISE.md, README.md and LICENCE.txt.

## Behaviour
Search by title or author, filter by genre, view saved books, save/remove any of the eight books, and edit the local display name. Book descriptions expand with native details controls. The mobile menu closes on link selection or Escape. Finite reveal effects run once.

Saved IDs and display name use the `leaflit.library.v1` localStorage key on the current origin. Storage is per browser and origin, not shared between file:// and HTTP addresses. Private browsing or browser policies may prevent persistence; the page displays a message and keeps changes in memory for that session. Multiple tabs on the same origin synchronise via the storage event. Clearing browser site data clears this library's settings. No account, server, analytics or cloud sync is included. All full ebook content, payments and downloads are outside scope.

Without JavaScript, the search/save/profile controls are hidden and all book links and expandable descriptions remain usable. Local features do not need network access.

## Artwork and fonts
Eight book covers are original AI-generated realistic illustrations, stored as local WebP files in assets/img/. Portraits remain original inline SVG illustrations. All book titles, authors, reading counts and profile information are fictional. This independent sample is not associated with Kindle or Amazon. Font stack uses fonts installed on the viewer's operating system; there are no external fonts or image requests. Change colours in CSS :root, cover images in assets/img/ and their img src/alt in index.html. Preserve the 2:3 cover aspect ratio. Do not delete the image folder when copying the site. Portrait SVG viewBox proportions should remain unchanged.

## Verification
Tested on Windows with Chromium 153.0.8010.12 and Firefox 155.0 at 1440x900, 820x1180, 375x812 and 320x740. Search, filters, save/remove, reload persistence, cross-tab sync, blocked/corrupt storage, profile escaping and empty results passed. No axe violations or page errors in these checks. The store product description reports the tested scope. Internal QA reports are not part of the customer package. Do not assume Safari or physical devices have been tested. The owner approved this design for release; no claim of greater than 95% similarity to the original screenshot is made. Motion runs by default including OS reduced motion under the product owner's policy; finite effects do not loop.

## Licence
Read LICENCE.txt. Replace fictional content before publishing a real library.

## Owner-approved asset scope
The owner requested replacement of all SVG book covers with generated images on 14 October 2026. W01/W03/W06 are therefore recorded as Leaflit-specific asset/package exceptions; the six-file and 20 KiB limits are not claimed. Source images are included locally, not hotlinked. The package includes its generated covers under LICENCE.txt. These are owner-approved Leaflit-specific exceptions to the baseline file-count and size limits; they do not change the licence resale or warranty policy.
