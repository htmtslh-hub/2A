# Shirtline

Shirtline is a static editorial shirt showroom inspired by the supplied jacket-showroom reference. Five permanent product images rotate around a shared oval: the front shirt is largest, and the rear shirts recede. It includes automatic rotation, a live next-product preview, previous/next controls, keyboard arrows, horizontal swipe, a pause button, collection cards, responsive navigation and a local bag drawer with an email enquiry CTA.

Open `index.html` directly. No build step, framework, backend or checkout is included. Product images are original generated assets stored in `assets/img/`.

See `CUSTOMISE.md` for editing. Rotation starts enabled on each new visit, including when the system requests reduced motion; use the pause button to stop it. Hover or keyboard focus temporarily pauses automatic advance. Manual navigation remains available. Product motion uses finite JavaScript animation frames, so it works independently of CSS animations.
