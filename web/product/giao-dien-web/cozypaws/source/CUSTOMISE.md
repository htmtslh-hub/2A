# Customising CozyPaws

All styles and components live in two primary files:
- `src/index.css` — Font family definitions (`.font-serif-display`, `Inter`), mint `#EFFDF0` canvas, 9 custom keyframe animation classes, and `.delay-100`–`.delay-1200` stagger utilities.
- `src/App.tsx` — Header navigation, `ASSETS` dictionary, three responsive hero layouts (Desktop `lg+`, Tablet `md–lg`, Mobile `<md`), and interactive quick-shop/review modals.

---

## 1. Updating Image & Logo URLs

In `src/App.tsx`, update the `ASSETS` object at the top of the file:

```tsx
const ASSETS = {
  logo: 'https://your-cdn.example.com/logo.svg',
  avatar: 'https://your-cdn.example.com/avatar.png',
  productCard: 'https://your-cdn.example.com/cat-house.png',
  videoCard: 'https://your-cdn.example.com/review-card.png',
  bottomLeft: 'https://your-cdn.example.com/pet-left.png',
  bottomCenter: 'https://your-cdn.example.com/pet-center.png',
  bottomRight: 'https://your-cdn.example.com/pet-right.png',
} as const;
```

## 2. Changing Colours

Search and replace the palette hex codes in `src/App.tsx` and `src/index.css`:
- `#EFFDF0` — Light mint green background
- `#1a3d1a` / `#2a5a2a` — Primary dark green & hover green
- `#E86A10` / `#d45e0d` — Orange accent & hover orange

## 3. Adjusting Stagger Timings & Keyframes

In `src/index.css`, modify the keyframe definitions (`wordPop`, `photoReveal`, `slideInLeft`, `slideInRight`, `scaleIn`, `fadeUp`) or change the `.delay-100` through `.delay-1200` classes attached to elements in `src/App.tsx`.
