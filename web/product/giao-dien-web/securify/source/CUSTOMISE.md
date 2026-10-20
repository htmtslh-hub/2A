# Customising securify

All styles and components live in two primary files:
- `src/index.css` — Global font (`Readex Pro`), black canvas background, and `.hero-title` typography metric rules.
- `src/App.tsx` — Background video, floating pill navbar, staggered lowercase `<h1>` headlines, diagonal stat counters, and interactive monochrome modals.

---

## 1. Changing the Background Video

In `src/App.tsx`, update the `src` attribute on the `<video>` element:

```tsx
<video
  className="absolute inset-0 w-full h-full object-cover"
  autoPlay
  loop
  muted
  playsInline
  src="https://your-cdn.example.com/your-security-loop.mp4"
/>
```

## 2. Editing the Staggered Hero Words & Description

Locate the three `<h1 className="hero-title ...">` elements and the `<p>` description inside `src/App.tsx`:

```tsx
<h1 className="hero-title absolute left-4 md:left-10 top-[18%] text-white font-medium text-[14vw] md:text-[13vw]">
  protect
</h1>
<h1 className="hero-title absolute right-4 md:right-10 top-[38%] text-white font-medium text-[14vw] md:text-[13vw]">
  your
</h1>
<h1 className="hero-title absolute left-[18%] md:left-[28%] top-[58%] text-white font-medium text-[14vw] md:text-[13vw]">
  data
</h1>
```

## 3. Updating the Stat Blocks

The three stat blocks (`+65k / startups use`, `+1.5b / gb data was protected`, `+300k / downloads`) are positioned at the top-right, bottom-left, and bottom-right of the foreground container in `src/App.tsx`. Edit the numbers and sublabels directly in JSX.

## 4. Customising Navigation & Modal Content

Edit the `NAV_ITEMS` array at the top of `src/App.tsx` to change the copy, metrics, and bullet points displayed when clicking `platform`, `solutions`, `company`, or `support`.
