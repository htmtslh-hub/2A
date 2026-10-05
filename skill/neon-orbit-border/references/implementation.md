# Implementation patterns

Forge Zone uses a rotating conic gradient with cyan `#62f4ff`, white `#fffaff`, violet `#a76bff`, and magenta `#ed60ff`. A sharp masked ring sits above a softer blurred copy. Both layers are decorative.

## Shared orbit

```css
@property --neon-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes neon-orbit {
  from { --neon-angle: 0deg; }
  to { --neon-angle: 360deg; }
}
```

If the host already defines `--pricing-neon-angle` and `pricingNeonOrbit`, use those instead of registering a second angle. The gradient and motion are:

```css
background: conic-gradient(
  from var(--neon-angle),
  #62f4ff 0deg, #fffaff 48deg, #a76bff 108deg,
  #ed60ff 158deg, #fffaff 205deg, #62f4ff 278deg,
  #62f4ff 360deg
);
animation: neon-orbit 1.8s linear infinite;
```

## Rounded card or button outline

Place decorative layers inside a positioned element. Mask the pseudo-element's center so the content remains untouched.

```html
<div class="neon-box" data-neon="active">
  <span class="neon-box__ring" aria-hidden="true"></span>
  <span class="neon-box__glow" aria-hidden="true"></span>
  <!-- existing content -->
</div>
```

```css
.neon-box { position: relative; isolation: isolate; }
.neon-box__ring, .neon-box__glow {
  position: absolute; inset: -1px; border-radius: inherit;
  pointer-events: none; opacity: 0;
}
.neon-box__ring::before, .neon-box__glow::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  padding: 1.7px;
  background: conic-gradient(from var(--neon-angle), #62f4ff 0deg,
    #fffaff 48deg, #a76bff 108deg, #ed60ff 158deg,
    #fffaff 205deg, #62f4ff 278deg, #62f4ff 360deg);
  -webkit-mask: linear-gradient(#000 0 0) content-box,
                linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
  mask-composite: exclude;
  animation: neon-orbit 1.8s linear infinite;
}
.neon-box__glow { filter: blur(2px); }
.neon-box__glow::before { padding: 2px; }
.neon-box[data-neon="active"] > .neon-box__ring { opacity: 1; }
.neon-box[data-neon="active"] > .neon-box__glow { opacity: .42; }
```

For the pricing-card interaction, activate on hover and `:focus-within` instead of `data-neon="active"`. Check whether an `overflow: hidden` ancestor clips the glow.

## Heart or another SVG outline

Keep the icon fill transparent. Use the same path for the visible SVG and the CSS mask; otherwise their edges will not line up. The saved state turns on only the gradient outline. This is the pattern used on Forge Zone product cards.

```html
<button class="save-button" type="button" aria-pressed="false" aria-label="Save product">
  <span class="neon-heart" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/></svg>
  </span>
</button>
```

```css
.neon-heart { position: relative; display: grid; place-items: center;
  width: 32px; height: 32px; isolation: isolate; }
.neon-heart svg { position: relative; z-index: 1; width: 30px; height: 30px;
  fill: transparent; stroke: currentColor; stroke-width: 1.8;
  stroke-linecap: round; stroke-linejoin: round; }
.neon-heart::before, .neon-heart::after {
  content: ''; position: absolute; inset: 0; opacity: 0;
  pointer-events: none;
  background: conic-gradient(from var(--neon-angle), #62f4ff 0deg,
    #fffaff 48deg, #a76bff 108deg, #ed60ff 158deg,
    #fffaff 205deg, #62f4ff 278deg, #62f4ff 360deg);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z' fill='none' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z' fill='none' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
  animation: neon-orbit 1.8s linear infinite;
}
.neon-heart::before { z-index: 0; filter: blur(3px); }
.neon-heart::after { z-index: 2; }
.save-button[aria-pressed="true"] .neon-heart::before { opacity: .72; }
.save-button[aria-pressed="true"] .neon-heart::after { opacity: 1; }
```

The ordinary SVG stroke remains underneath the gradient as a fallback. Do not add a red fill or change the button background merely because the icon is active. If the icon shape changes, update the mask path and SVG path together.
