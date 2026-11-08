---
name: react-bits-canvas
description: Use when selecting or implementing high-craft animated text effects, interactive micro-components, shader/canvas backgrounds, or WebGL/HTML-in-canvas effects from DavidHDev/react-bits and DavidHDev/canvas-ui (adapted for React/Next.js or zero-dependency Vanilla HTML/CSS/JS).
---

# React Bits & Canvas UI Arsenal

Combines **DavidHDev/react-bits** (110+ animated text, cursor, card, and background components) and **DavidHDev/canvas-ui** (35 HTML-in-canvas / WebGL / 2D Canvas fluid, glass, and shader components).

## Core Discipline
1. **Budget per Page:** Choose at most **1 signature hero effect** + **1 interactive component** per template. Never stack multiple heavy canvas/shader loops in the same viewport.
2. **Forge Zone Static Profile (WEB-STATIC-1):**
   - When building for WEB-STATIC-1 (6 files, zero external JS libraries, < 20 KiB ZIP), adapt the component's visual mechanics into **pure Vanilla ES6 (equestAnimationFrame finite loop) + CSS @property / SVG filters**, keeping DOM < 60–120 lines of JS.
   - Always wire to the Forge Zone **Pause/Play Motion** control and cancel stale equestAnimationFrame IDs on new interaction.
3. **Store / Next.js Profile (web/src/):**
   - Can use the full React + Tailwind / CSS variant via 
px shadcn@latest add https://reactbits.dev/r/<Component>-TS-TW or @canvas-ui/<component>-react.

## High-Value Effects Catalog
- **Text Animations (eferences/react-bits-catalog.md):** SplitText, BlurText, DecryptedText, ScrollVelocity, VariableProximity, ShinyText, CountUp, RotatingText, TrueFocus.
- **Interactive Cards & Nav (eferences/react-bits-catalog.md):** MagicBento, ChromaGrid, BorderGlow, GlareHover, Magnet, TiltCard, Dock, PillNav, CardSwap, AccordionGallery.
- **Canvas & Optics (eferences/canvas-ui-catalog.md):** Liquid, Ripple, Glass, Frost, Laser, ForceField, DitherVeil, Noise.
