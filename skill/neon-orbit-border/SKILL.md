---
name: neon-orbit-border
description: Create or adapt the rotating cyan, white, violet, and magenta neon outline used on Forge Zone pricing cards and saved-heart icons. Use when a web UI needs that specific animated border around a box or an icon path.
---

# Neon orbit border

Apply the effect to the **outline of the requested element**. Keep its content, fill, background, and behavior unchanged unless the user asks for another change. A saved heart, for example, keeps a transparent center; only its outline gains the animated gradient.

1. Inspect the element and the project's styling source. In Forge Zone, the pricing-card reference is in `_src/Agentic.dc.html`; `web/src/generated/design.css` is generated from it. The saved-heart outline is in `web/src/app/globals.css`. Edit the source of truth and regenerate derived files when needed.
2. Read [references/implementation.md](references/implementation.md) for the box-border or icon-path pattern that matches the target. Reuse an existing `@property` and keyframes if the project already has them. Preserve the pricing palette and 1.8-second orbit when matching Forge Zone; change tokens when the user requests another palette or speed.
3. Tie visibility to the requested state (`aria-pressed`, selected class, hover, or focus). Decorative layers must not intercept clicks or change layout. Keep an accessible name and a visible keyboard focus indicator on interactive elements.
4. Verify the ordinary and active states in a browser at desktop and narrow phone widths. Confirm that the gradient runs along the intended outline, the center stays unchanged, and no content is clipped. Follow the project's reduced-motion convention unless the user explicitly requests the pricing-card motion behavior.
