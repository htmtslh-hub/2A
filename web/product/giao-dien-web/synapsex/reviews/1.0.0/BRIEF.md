# Design Brief — SynapseX (`synapsex` / `t81`, v1.0.0)

## 1. Product Overview

**SynapseX** is a multi-section futuristic neural-AI interface landing page built with React 18, TypeScript, Vite 6, Tailwind CSS v4, and Framer Motion. It combines a mouse-scrubbed hero video (`seeked`-chained delta scrubbing with `0.8` sensitivity), four additional looping video sections, `Space Mono` monospace typography across all elements, an `Anton SC` radial-gradient `"TRANSCENDENCE"` watermark, character-decoding `ScrambleIn` / `ScrambleText` animations, a 4-fold symmetric `SynapseXLogo`, and a spring-expanding `SquashHamburger` capsule navbar.

## 2. Sections & Technical Specifications

1. **Navbar (`fixed z-50 h-20`)**:
   - Desktop: `SynapseXLogo` pill + spring-expanding menu pill (`48px → 290px`, `stiffness: 350, damping: 28`) containing `SquashHamburger` and `ScrambleText` links (`About`, `Metrics`) + right `Download` pill with `bi bi-apple`.
   - Mobile: `h-9` pills where the logo pill collapses to `width: 0` when the menu capsule expands to `100%`.
2. **Section 1 — Hero (`h-screen h-[100dvh]`)**:
   - Mouse-scrubbed Video #1, 24×24px radial dot grid (`opacity-5`), `"TRANSCENDENCE"` watermark (`Anton SC`, `clamp(120px, 30vw, 521px)`), and bottom `ScrambleIn` headlines (`Brain / And Body`, `One / Network`).
3. **Section 2 — Cinematic Text (`h-screen h-[100dvh]`)**:
   - Looping Video #2, 180px top `#010103` gradient, and 3D perspective paragraph (`rotateX(24deg) translateY(...) translateZ(15px)`).
4. **Section 3 — Metrics (`min-h-screen`)**:
   - Looping Video #3 with `2.4ms` (`Synaptic Latency`), `99.7%` (`Signal Accuracy`), and `140B` (`Neural Parameters`).
5. **Section 4 — Technology / Adaptive Intelligence (`h-screen h-[100dvh]`)**:
   - Looping Video #4 with `Adaptive / Intelligence` header and 4-column neural feature grid.
6. **Section 5 — Architecture (`min-h-screen`, pure black)**:
   - `"Three layers. Zero friction."` heading and 3 stacked cards (`Layer 1 / Capture`, `Layer 2 / Process`, `Layer 3 / Interface`).
7. **Footer**:
   - Two-column layout with Looping Video #5 on the left and `SynapseX` brand summary + copyright on the right.
