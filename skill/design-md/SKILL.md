---
name: design-md
description: Use when creating, reading, locking, or auditing a DESIGN.md file or brand design system (google-labs-code/design.md spec + VoltAgent/awesome-design-md 80+ brand references). Defines structured YAML design tokens and 8 canonical design system sections for consistent multi-agent UI generation.
---

# DESIGN.md & Awesome Brand Design Systems

Combines **google-labs-code/design.md** (official DESIGN.md format specification) and **VoltAgent/awesome-design-md** (curated brand DESIGN.md library: Linear, Stripe, Vercel, Apple, Raycast, Framer, etc.).

## When to Use
- When locking a visual identity into a portable DESIGN.md file before or after building a web template.
- When translating a brand mood or reference (Linear, Stripe, Vercel, Apple, Raycast, Framer) into concrete :root CSS tokens and component rules.
- When auditing whether a template's :root tokens and components match its declared DESIGN.md.

## Canonical 8-Section Structure (eferences/spec.md)
1. ## Overview (Brand personality, target audience, surface mode, emotional register)
2. ## Colors (Prose rationale + YAML tokens: primary, secondary, 	ertiary/ccent, ccent-text, 
eutral/g, surface, line)
3. ## Typography (display, h1–h4, ody, caption, mono with ontFamily, ontSize, ontWeight, lineHeight, letterSpacing)
4. ## Layout (Container width, grid columns, spacing scale, section rhythm, responsive breakpoints)
5. ## Elevation & Depth (Shadow vs 1px border discipline, surface hierarchy, glass/blur rules)
6. ## Shapes (Border-radius scale per nesting level: R2 = R1 - B - S6)
7. ## Components (Buttons, Cards, Inputs, Navigation, Interactive states)
8. ## Do's and Don'ts (Explicit anti-patterns and project constraints)

## References
- Full specification: [eferences/spec.md](references/spec.md)
- Philosophy: [eferences/PHILOSOPHY.md](references/PHILOSOPHY.md)
- 80+ Brand Systems Index: [eferences/awesome-brands-index.md](references/awesome-brands-index.md)
- Sample Brand DESIGN.md files: eferences/brands/ (linear.app, stripe, ercel, pple, aycast, ramer)
