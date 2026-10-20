# SynapseX — Neural-AI Interface Multi-Section Landing Page

A futuristic single-page landing site for **SynapseX** built with **React 18**, **TypeScript**, **Vite 6**, **Tailwind CSS v4**, **Framer Motion**, and Google Fonts **Space Mono** + **Anton SC**.

## Highlights

- **Mouse-Scrubbed Hero Video + 4 Looping Video Stages**:
  - **Section 1 (Hero)**: Paused on load and scrubbed horizontally via delta-based mouse movement (`sensitivity = 0.8`) chained through the `seeked` event, overlaid with a 24×24 radial dot grid, an `Anton SC` `"TRANSCENDENCE"` watermark, and `ScrambleIn` character-decoding headlines (`Brain / And Body`, `One / Network`).
  - **Section 2 (Cinematic Text)**: Scroll-driven 3D perspective paragraph (`rotateX(24deg) translateY(...) translateZ(15px)`) powered by Framer Motion `useScroll` + `useSpring`.
  - **Section 3 (Performance Metrics)**: Full-bleed video backdrop with staggered `2.4ms` (`Synaptic Latency`), `99.7%` (`Signal Accuracy`), and `140B` (`Neural Parameters`) readouts.
  - **Section 4 (Adaptive Intelligence)**: 4-column neural capability grid (`Cortical Mapping`, `Signal Isolation`, `State Prediction`, `Loop Feedback`).
  - **Section 5 (Architecture) & Footer**: 3-layer stack (`Capture`, `Process`, `Interface`) and split-screen video footer.
- **Interactive Capsule Navbar**:
  - Custom 4-fold rotational SVG mark (`SynapseXLogo`), spring-animated `SquashHamburger` expanding pill (`48px → 290px` desktop, `100%` mobile), `ScrambleText` hover links (`About`, `Metrics`), and an Apple-badged `Download` pill.

## Quick Start

### 1. View the Prebuilt Bundle Immediately

```bash
npx serve built
```

### 2. Local Development & Rebuild

```bash
npm install
npm run dev
```

To create a fresh production bundle in `built/`:

```bash
npm run build
```

## Customisation

See [CUSTOMISE.md](./CUSTOMISE.md) for instructions on replacing the 5 CloudFront video URLs, tuning the `ScrambleIn` / `ScrambleText` speed, or editing the metrics and architecture sections.
