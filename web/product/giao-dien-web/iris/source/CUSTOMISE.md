# Customising Iris (`v1.0.0`)

This guide walks through 10 practical customisation steps for `index.html`, followed by 12 copy-ready AI prompts.

---

## 10-Step Customisation Guide

### Step 1 — Update the Page Title & Brand Name
In `index.html`, locate `<title>Iris — Smart AI Assistant</title>` and `.brand` inside `<header class="nav" id="nav">` to replace `Iris` with your own AI product name.

### Step 2 — Customise the Brand Orb Gradient
In the `<style>` block, edit `.brand-orb`:
```css
.brand-orb {
  background: radial-gradient(circle at 32% 28%, #c9b8ff 0%, #8b6cff 38%, #5b3df0 72%, #3a24b8 100%);
  box-shadow: 0 0 14px rgba(124,77,255,.55), inset -2px -3px 6px rgba(20,8,70,.55);
}
```

### Step 3 — Edit Navigation Links & Action Buttons
Update the four links (`Overview`, `Ecosystem`, `Socials`, `Help`) in both `.nav-links` and `.mobile-panel`, and set the `href` targets on `.btn-open` (`Get Iris`) and `.btn-try` (`Start free`).

### Step 4 — Change the Hero Headline & Subtitle Copy
Inside `<div class="copy">`, edit the two-line `<h1>` (`Introducing a / Smart AI Assistant`) and `.sub` paragraph (`Easy to start. Effortless to explore. / Capable in every conversation.`).

### Step 5 — Adjust the Colour Tokens
Modify `:root` CSS variables at the top of `<style>`:
```css
:root {
  --bg: #0b0b11;
  --nav: #12131a;
  --line: rgba(255,255,255,0.06);
  --text: #fff;
  --muted: #a3a3b2;
  --link: #c8c8d4;
  --violet: #7c4dff;
  --violet-2: #8f66ff;
  --nav-h: 62px;
}
```

### Step 6 — Swap the 3D Head & Arm GLB Models
In `<script type="module">`, update `HEAD_GLB` and `ARM_GLB` to point to your own `.glb` assets:
```js
const HEAD_GLB = "https://your-cdn.example.com/models/robot-head.glb";
const ARM_GLB  = "https://your-cdn.example.com/models/robot-arm.glb";
```

### Step 7 — Tune the Robot Material Finish & Fresnel Rim Light
In `Promise.allSettled(...)`, adjust `tint: "#4a4a56"` and `rim: { color: 0x8a5cff, power: 4.5, strength: 0.32 }` on the head, or `tint: "#1d1d23"` and `rim: { color: 0x8a5cff, power: 2.6, strength: 1.05 }` on the arms.

### Step 8 — Customise Eye Colour & Glow
In `addEyes(R)`, edit the `irisTex` radial gradient stops (`#d7c9ff`, `#a07bff`, `#7646f2`, `#5c2fe0`) and `ring` colour (`new THREE.Color(1.1, 0.88, 2.0)`), or adjust `UnrealBloomPass` parameters (`0.55, 0.4, 0.92`).

### Step 9 — Adjust Desktop & Mobile Robot Placement
In `layout()`, tweak `robotPx` and `anchor`:
- Desktop (`> 860px`): `robotPx = Math.min(H * 0.62, W * 0.4, 640); anchor.x = W * 0.695; anchor.y = H * 0.5 + 8;`
- Mobile (`<= 860px`): `robotPx = Math.min(room * 0.92, W * 0.82); anchor.x = W * 0.5; anchor.y = 62 + room * 0.5;`

### Step 10 — Tune Head Tracking & Idle Gaze Speed
In `tick(nowMs)`, adjust `head.rotation.y = look.x * 0.5`, `head.rotation.x = look.y * 0.42`, `body.rotation.y = look.x * 0.28`, or the 3.5-second idle sinusoidal gaze (`Math.sin(t * 0.45) * 0.45`).

---

## 12 AI Prompts for Rapid Customisation

1. **Rebrand to Cyan/Teal AI Copilot:** "Update `index.html` so all violet accents (`#7c4dff`, `#8f66ff`, `0x8a5cff`, `0x9a6bff`) become electric cyan (`#00d2ff`, `#38e4ff`) across `.brand-orb`, `.btn-try`, softboxes, Fresnel rim shaders, eyes, antenna balls, and floor glow."
2. **Add an Interactive Chat Prompt Bar:** "Add a pill-shaped prompt input bar inside `.copy` that triggers `openIrisModal('Overview')` and a nod animation on `head.rotation.x`."
3. **Customise Robot HUD Pill (`.robot-hud`):** "Update `#robotHudText` and `triggerEmote('wave')` to cycle through status messages every 4 seconds."
4. **Tune Click-to-Wave Arm Emote:** "Adjust `waveLift` and `waveOsc` in `tick(nowMs)` to customize the right-arm wave amplitude and duration."
5. **Tune Happy Squint Eye Expression on CTA Hover:** "Modify `ctaHover ? 0.78 : 1` in `tick(nowMs)` to change how much `eyeGroups` squint when hovering `.btn-try` or `.btn-open`."
6. **Self-Host Three.js & GLB Assets:** "Update `<script type='importmap'>` and `HEAD_GLB` / `ARM_GLB` to load from `./assets/vendor/three/` and `./assets/models/` for offline deployment."
7. **Switch Typography to Plus Jakarta Sans:** "Replace the Google Fonts `Figtree` link and `font-family` in `index.html` with `Plus Jakarta Sans` (weights 400–800)."
8. **Add Keyboard Shortcut (`⌘K` / `Ctrl+K`) for Iris Modal:** "Bind `Cmd/Ctrl + K` in `keydown` to call `openIrisModal('Overview')`."
9. **Adjust Studio Lighting for Brushed Titanium Finish:** "Update `envScene` softboxes and `prepareModel` head material (`tint`, `metalness`, `roughness`) for warm titanium reflections."
10. **Add Subtle Starfield Particle Layer:** "Add a `THREE.Points` starfield of 120 soft violet particles behind the robot (`z = -4` to `-8`)."
11. **Localise Copy into Vietnamese or Japanese:** "Translate navbar links, headline, subtitle, modal tabs, and button labels while keeping responsive `clamp()` sizing."
12. **Export Clean Embeddable Web Component:** "Wrap the Iris Three.js canvas and robot rig into a reusable `<iris-mascot>` custom element."
