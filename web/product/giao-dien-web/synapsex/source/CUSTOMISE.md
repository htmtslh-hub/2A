# Customising SynapseX

All styles and components live in two primary files:
- `src/index.css` — `Space Mono` font overrides (`--font-sans`, `--font-serif`, `--font-mono`), black canvas reset, and Lenis smooth-scroll helper classes.
- `src/App.tsx` — `VIDEOS` dictionary, `ScrambleIn` / `ScrambleText` components, `SynapseXLogo`, `SquashHamburger`, and the 5 landing sections + footer.

---

## 1. Replacing the 5 Video Streams

Update the `VIDEOS` object at the top of `src/App.tsx`:

```tsx
const VIDEOS = {
  hero: 'https://your-cdn.example.com/hero-scrub.mp4',
  second: 'https://your-cdn.example.com/cinematic.mp4',
  metrics: 'https://your-cdn.example.com/metrics.mp4',
  technology: 'https://your-cdn.example.com/technology.mp4',
  footer: 'https://your-cdn.example.com/footer.mp4',
} as const;
```

## 2. Adjusting Hero Mouse-Scrub Sensitivity

In `handleHeroMouseMove` inside `src/App.tsx`, adjust the `0.8` multiplier:

```tsx
const timeDelta = (deltaX / viewportWidth) * video.duration * 0.8;
```

## 3. Editing Metrics, Capabilities & Architecture Layers

Modify the `METRICS_DATA`, `TECH_ITEMS`, and `ARCHITECTURE_LAYERS` arrays in `src/App.tsx` to update the numbers, labels, and descriptions.
