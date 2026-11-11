/**
 * Batch 2026-11-11 (Part 3 of 3):
 *   5. building-atlas (t324, premium) — Plinth — Shared Interiors
 *   6. curved-reel    (t325, premium) — Norro. — Curved Cinema Showreel
 */

export function buildBatch20261111Part3(slug) {
  if (slug === 'building-atlas') {
    return `<!DOCTYPE html>
<html lang="en" data-theme="dark" data-motion="on">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Plinth — Shared Interiors</title>
  <meta name="description" content="Plinth is a quiet editorial atlas of invented buildings — thirty-five architectural field dossiers read through plan, daylight, and material.">
  <meta name="theme-color" content="#111111">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300..500&family=Geist:wght@300..600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #111111;
      --fg: #ededed;
      --fg-muted: color-mix(in srgb, var(--fg) 64%, var(--bg));
      --fg-subtle: color-mix(in srgb, var(--fg) 50%, var(--bg));
      --border: color-mix(in srgb, var(--fg) 12%, var(--bg));
      --border-strong: color-mix(in srgb, var(--fg) 22%, var(--bg));
      --bg-muted: color-mix(in srgb, var(--fg) 8%, var(--bg));
      --ink: #171614;
      --accent: #f0b0ae;
      --accent-text: #f3c2c0;
      --accent-strong: #d98c89;
      --on-accent: #171614;
      --serif: "Newsreader", Georgia, serif;
      --sans: "Geist", ui-sans-serif, system-ui, -apple-system, sans-serif;
      --mono: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
      --scene-h: clamp(640px, calc(80svh - 48px), 900px);
      --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
      --ease-shelf: cubic-bezier(0.22, 0.8, 0.25, 1);
      --shelf-book: #161618;
      --shelf-line: rgba(255, 255, 255, 0.08);
      --shelf-ink-grad: linear-gradient(125deg, #050506 5%, #29292c 24%, #8c8c92 33%, #202023 42%, #080809 58%, #68686f 78%, #0b0b0d 94%);
      --shelf-ink-shadow: 0 -0.5px 0 rgba(255, 255, 255, 0.16), 0 0.5px 0 rgba(0, 0, 0, 0.7);
      --shelf-img-filter: grayscale(1) brightness(0.36) contrast(1.15);
      --shelf-img-blend: screen;
      --shelf-p1: #222225;
      --shelf-p2: #0e0e10;
      --shelf-p3: #19191b;
      --shelf-contact: rgba(0, 0, 0, 0.65);
      --shelf-cast: rgba(0, 0, 0, 0.32);
      --sheen-a: rgba(255, 255, 255, 0.16);
      --sheen-b: rgba(255, 255, 255, 0.04);
      color-scheme: dark;
    }

    html[data-theme="light"] {
      --bg: #ffffff;
      --fg: #0a0a0a;
      --accent: #d98c89;
      --accent-text: #8f3d3a;
      --accent-strong: #732c29;
      --on-accent: #ffffff;
      --shelf-book: #ededea;
      --shelf-line: rgba(0, 0, 0, 0.075);
      --shelf-ink-grad: linear-gradient(125deg, #2b2b2e 5%, #5c5c63 24%, #151517 33%, #45454b 42%, #1e1e21 58%, #66666e 78%, #18181b 94%);
      --shelf-ink-shadow: 0 -0.5px 0 rgba(255, 255, 255, 0.92), 0 0.5px 0 rgba(0, 0, 0, 0.22);
      --shelf-img-filter: grayscale(1) contrast(1.12) brightness(0.88);
      --shelf-img-blend: multiply;
      --shelf-p1: #f8f8f6;
      --shelf-p2: #d9d9d6;
      --shelf-p3: #e7e7e4;
      --shelf-contact: rgba(17, 18, 22, 0.24);
      --shelf-cast: rgba(17, 18, 22, 0.12);
      --sheen-a: rgba(255, 255, 255, 0.68);
      --sheen-b: rgba(255, 255, 255, 0.2);
      color-scheme: light;
    }

    @media (max-width: 639px) {
      :root {
        --scene-h: 660px;
      }
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    ::selection {
      background: var(--accent);
      color: var(--ink);
    }

    :focus-visible {
      outline: 2px solid var(--accent-text);
      outline-offset: 3px;
    }

    .tabular-nums {
      font-variant-numeric: tabular-nums;
    }

    html, body {
      background: var(--bg);
      color: var(--fg);
      font-family: var(--sans);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: clip;
      transition: background-color 0.3s var(--ease-out), color 0.3s var(--ease-out);
    }

    body.pln-reading {
      background: var(--abg, var(--bg));
      color: var(--afg, var(--fg));
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      z-index: 1000;
      pointer-events: none;
      opacity: 0.06;
      mix-blend-mode: overlay;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    .skip-link {
      position: absolute;
      left: 16px;
      top: -64px;
      z-index: 2000;
      padding: 8px 14px;
      border-radius: 999px;
      background: var(--fg);
      color: var(--bg);
      font-size: 12px;
      font-weight: 500;
      text-decoration: none;
      transition: transform 0.2s var(--ease-out);
    }
    .skip-link:focus {
      transform: translateY(76px);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .wrap {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 24px;
    }

    button {
      font: inherit;
      color: inherit;
      background: none;
      border: 0;
      cursor: pointer;
    }
    button:active, .pln-tour-pill:active, .pln-sub-btn:active {
      transform: scale(0.96);
    }

    /* Navigation Bar */
    .pln-header {
      position: sticky;
      top: 0;
      z-index: 50;
      background: var(--bg);
      border-bottom: 1px solid transparent;
      transition: background-color 0.3s var(--ease-out), border-color 0.3s var(--ease-out);
    }
    body.pln-reading .pln-header {
      background: var(--abg, var(--bg));
    }

    .pln-nav {
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .pln-logo {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--serif);
      font-size: 22px;
      line-height: 1;
      letter-spacing: -0.01em;
      color: currentColor;
      text-decoration: none;
    }
    .pln-logo-ring {
      display: inline-block;
      width: 14px;
      height: 16px;
      border-style: solid;
      border-color: currentColor;
      border-top-width: 2.1px;
      border-bottom-width: 2.1px;
      border-left-width: 1.6px;
      border-right-width: 2.6px;
      border-radius: 50%;
      transform: translateY(1px);
    }

    .pln-nav-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .pln-theme-pill {
      position: relative;
      display: inline-grid;
      grid-template-columns: 1fr 1fr;
      padding: 2px;
      border: 1px solid var(--border-strong);
      border-radius: 999px;
      font-family: var(--sans);
      font-size: 12px;
    }
    .pln-theme-ind {
      position: absolute;
      top: 2px;
      bottom: 2px;
      left: 2px;
      width: calc(50% - 2px);
      border-radius: 999px;
      background: var(--fg);
      transform: translateX(100%);
      transition: transform 0.35s var(--ease-out), background-color 0.3s var(--ease-out);
      pointer-events: none;
    }
    html[data-theme="light"] .pln-theme-ind {
      transform: translateX(0%);
    }
    .pln-theme-btn {
      position: relative;
      z-index: 1;
      min-width: 54px;
      padding: 6px 12px;
      border-radius: 999px;
      color: var(--fg-muted);
      font-size: 12px;
      line-height: 1;
      text-align: center;
      transition: color 0.25s var(--ease-out), transform 0.16s var(--ease-out);
    }
    .pln-theme-btn[aria-pressed="true"] {
      color: var(--bg);
    }

    .pln-motion-btn {
      padding: 6px 11px;
      border-radius: 999px;
      border: 1px solid var(--border-strong);
      font-family: var(--mono);
      font-size: 11px;
      color: var(--fg-muted);
      transition: color 0.2s var(--ease-out), border-color 0.2s var(--ease-out), transform 0.16s var(--ease-out);
    }
    .pln-motion-btn:hover {
      color: var(--fg);
      border-color: var(--fg-muted);
    }

    .pln-back-btn {
      display: none;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      opacity: 0.72;
      transition: opacity 0.2s var(--ease-out), transform 0.16s var(--ease-out);
    }
    .pln-back-btn:hover {
      opacity: 1;
    }
    body.pln-reading .pln-home-controls {
      display: none;
    }
    body.pln-reading .pln-back-btn {
      display: inline-flex;
    }

    /* Hero Section */
    .pln-hero {
      position: relative;
      width: 100%;
      min-height: calc(var(--scene-h) + 160px);
      overflow-x: clip;
      overflow-y: visible;
      isolation: isolate;
    }

    #heroContent {
      position: absolute;
      z-index: 4;
      top: clamp(36px, 6.5svh, 82px);
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 48px);
      max-width: 450px;
      text-align: left;
      container-type: inline-size;
    }

    #heroContent h1 {
      font-family: var(--serif);
      font-weight: 400;
      font-optical-sizing: auto;
      font-size: clamp(64px, 26.2743cqi, 118px);
      line-height: 0.96;
      letter-spacing: -0.025em;
    }
    #heroContent h1 span {
      display: block;
      white-space: nowrap;
    }

    .pln-hero-lede {
      margin-top: 22px;
      font-size: clamp(15px, 1.2vw, 17px);
      line-height: 1.5;
      color: var(--fg-muted);
    }

    .pln-search-form {
      margin-top: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: 48px;
    }

    .pln-field {
      position: relative;
      flex: 1 1 auto;
      min-height: 48px;
      display: flex;
      align-items: center;
    }
    .pln-search-ico {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 14px;
      height: 14px;
      color: var(--fg-muted);
      pointer-events: none;
    }
    .pln-search-input {
      width: 100%;
      min-height: 48px;
      border: 0;
      border-bottom: 1px solid var(--border-strong);
      background: transparent;
      color: var(--fg);
      font: inherit;
      font-size: 16px;
      line-height: 1.5;
      padding: 12px 0 12px 26px;
      outline: none;
      transition: border-color 0.2s var(--ease-out);
    }
    .pln-search-input:focus {
      border-bottom-color: var(--fg-muted);
    }

    .pln-rot-ph {
      position: absolute;
      inset: 0 0 1px 26px;
      display: flex;
      align-items: center;
      color: var(--fg-muted);
      font-size: 16px;
      white-space: nowrap;
      pointer-events: none;
      transition: opacity 0.16s var(--ease-out);
    }
    .pln-rot-ph.is-hidden {
      opacity: 0;
    }
    .pln-rot-grid {
      display: inline-grid;
      perspective: 320px;
    }
    .pln-rot-item {
      grid-area: 1 / 1;
      transform-origin: 50% 50% -0.6em;
      backface-visibility: hidden;
      opacity: 0;
    }
    .pln-rot-item.is-init {
      opacity: 1;
    }
    .pln-rot-item.is-in {
      animation: nameIn 0.62s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    .pln-rot-item.is-out {
      animation: nameOut 0.62s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @keyframes nameOut {
      from {
        opacity: 1;
        filter: blur(0px);
        transform: translateY(0) rotateX(0deg);
      }
      to {
        opacity: 0;
        filter: blur(2px);
        transform: translateY(-0.9em) rotateX(80deg);
      }
    }
    @keyframes nameIn {
      from {
        opacity: 0;
        filter: blur(2px);
        transform: translateY(0.9em) rotateX(-80deg);
      }
      to {
        opacity: 1;
        filter: blur(0px);
        transform: none;
      }
    }

    .pln-sub-btn {
      width: 40px;
      height: 40px;
      flex: 0 0 40px;
      align-self: flex-end;
      margin-bottom: 4px;
      border-radius: 50%;
      border: 1px solid var(--border-strong);
      background: var(--bg);
      color: var(--fg);
      display: grid;
      place-items: center;
      transition: border-color 0.16s var(--ease-out), background-color 0.16s var(--ease-out), transform 0.16s var(--ease-out);
    }
    .pln-sub-btn:hover {
      border-color: var(--fg-muted);
      background: var(--bg-muted);
    }

    .pln-hero-meta {
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .pln-tour-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 11px;
      border-radius: 999px;
      border: 1px solid var(--border-strong);
      background: var(--bg-muted);
      color: var(--fg);
      font-family: var(--mono);
      font-size: 11px;
      transition: border-color 0.2s var(--ease-out), transform 0.16s var(--ease-out);
    }
    .pln-tour-pill:hover {
      border-color: var(--fg-muted);
    }
    .pln-count-hint {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--fg-subtle);
    }

    /* Gallery Stage & Ribbon */
    #gallery {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: var(--scene-h);
      z-index: 1;
      pointer-events: none;
    }
    .pln-layer {
      position: absolute;
      inset: 0;
      overflow: visible;
      animation: galleryEnter 0.6s var(--ease-out) both;
      transition: opacity 0.16s var(--ease-out), transform 0.16s var(--ease-out);
    }
    #gallery[data-filter="out"] .pln-layer {
      opacity: 0;
      transform: translateY(14px) scale(0.985);
    }
    #gallery[data-filter="in"] .pln-layer {
      animation: filterIn 0.52s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @keyframes galleryEnter {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes filterIn {
      from {
        opacity: 0;
        transform: translateY(18px) scale(0.985);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }

    .pln-empty {
      position: absolute;
      left: 50%;
      top: 64%;
      transform: translate(-50%, -50%);
      font-size: 15px;
      color: var(--fg-muted);
      pointer-events: none;
      display: none;
    }
    .pln-empty.is-visible {
      display: block;
    }

    .gcard {
      position: absolute;
      left: 0;
      top: 0;
      width: var(--A, 230px);
      height: var(--L, 310px);
      text-decoration: none;
      color: var(--ink);
      pointer-events: none;
      will-change: transform, filter;
      touch-action: pan-y;
    }
    .gcard.hot {
      pointer-events: auto;
      cursor: pointer;
    }
    .gcard.is-flying-hidden {
      visibility: hidden;
    }

    /* Shared 3D Book Volume (.vol) */
    .vol {
      position: absolute;
      width: var(--w, 230px);
      height: var(--h, 310px);
      transform-style: preserve-3d;
      transform-origin: 50% 50%;
    }
    .vol-face {
      position: absolute;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      overflow: hidden;
      background: var(--c, #f0b0ae);
    }
    .vol-front {
      width: var(--w);
      height: var(--h);
      transform: translateZ(calc(var(--t, 26px) * 0.5));
      display: flex;
      flex-direction: column;
    }
    .vol-back {
      width: var(--w);
      height: var(--h);
      transform: rotateY(180deg) translateZ(calc(var(--t, 26px) * 0.5));
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .vol-spine {
      width: var(--t, 26px);
      height: var(--h);
      left: calc(50% - var(--t, 26px) * 0.5);
      transform: rotateY(-90deg) translateZ(calc(var(--w) * 0.5));
      background: color-mix(in srgb, var(--c, #f0b0ae) 78%, #000000);
    }
    .vol-pages {
      width: var(--t, 26px);
      height: var(--h);
      left: calc(50% - var(--t, 26px) * 0.5);
      transform: rotateY(90deg) translateZ(calc(var(--w) * 0.5));
      background:
        linear-gradient(180deg, var(--c) 0 2px, transparent 2px calc(100% - 2px), var(--c) calc(100% - 2px)),
        repeating-linear-gradient(90deg, #f8f4ea 0 1px, #ded7c8 1px 2px, #eee8db 2px 3px);
      filter: brightness(0.9);
    }
    .vol-top {
      width: var(--w);
      height: var(--t, 26px);
      top: calc(50% - var(--t, 26px) * 0.5);
      transform: rotateX(90deg) translateZ(calc(var(--h) * 0.5));
      background:
        linear-gradient(90deg, var(--c) 0 2px, transparent 2px calc(100% - 2px), var(--c) calc(100% - 2px)),
        repeating-linear-gradient(0deg, #f8f4ea 0 1px, #ded7c8 1px 2px, #eee8db 2px 3px);
    }
    .vol-bottom {
      width: var(--w);
      height: var(--t, 26px);
      top: calc(50% - var(--t, 26px) * 0.5);
      transform: rotateX(-90deg) translateZ(calc(var(--h) * 0.5));
      background:
        linear-gradient(90deg, var(--c) 0 2px, transparent 2px calc(100% - 2px), var(--c) calc(100% - 2px)),
        repeating-linear-gradient(0deg, #f8f4ea 0 1px, #ded7c8 1px 2px, #eee8db 2px 3px);
      filter: brightness(0.82);
    }

    .vol-paper {
      position: absolute;
      inset: 0;
      z-index: 5;
      background: var(--paper, var(--c));
      opacity: calc(1 - var(--co, 1));
      pointer-events: none;
    }

    /* Ribbon Card Typography & Binding */
    .rc-bind {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 7px;
      z-index: 3;
      pointer-events: none;
      background: linear-gradient(90deg, rgba(23, 22, 20, 0.15) 0 2.5px, rgba(23, 22, 20, 0.07) 2.5px 5px, transparent 5px 6px, rgba(23, 22, 20, 0.1) 6px 7px);
    }
    .rc-head {
      height: 35.5px;
      padding: 12px 16px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--sans);
      font-size: 9px;
      color: var(--ink);
    }
    .rc-photo-box {
      position: relative;
      flex: 1 1 auto;
      overflow: hidden;
      background:
        linear-gradient(135deg, rgba(23, 22, 20, 0.08) 0%, transparent 55%),
        repeating-linear-gradient(90deg, rgba(23, 22, 20, 0.06) 0 1px, transparent 1px 18px);
    }
    .pln-photo {
      position: absolute;
      inset: 0;
      display: block;
      background-size: 200% 200%;
      background-repeat: no-repeat;
      filter: grayscale(1) contrast(1.08);
      mix-blend-mode: multiply;
    }
    .rc-body {
      padding: 12px 16px 10px;
      color: var(--ink);
    }
    .rc-kicker {
      font-size: 9px;
      margin-bottom: 10.5px;
      opacity: 0.84;
    }
    .rc-title {
      font-family: var(--serif);
      font-weight: 400;
      font-size: 25px;
      line-height: 1.04;
      letter-spacing: -0.01em;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .rc-foot {
      margin-top: 14px;
      padding-top: 8px;
      border-top: 1px solid rgba(23, 22, 20, 0.2);
      display: flex;
      justify-content: space-between;
      font-size: 9px;
    }

    .rc-back-top {
      color: var(--ink);
    }
    .rc-back-head {
      height: 57.5px;
      padding: 14px 20px 0;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
    }
    .rc-back-title {
      font-family: var(--serif);
      font-size: 27px;
      line-height: 1.08;
      padding: 0 20px;
    }
    .rc-back-sum {
      font-size: 12px;
      line-height: 18.6px;
      padding: 12px 20px 0;
      opacity: 0.88;
    }
    .rc-back-foot {
      padding: 0 20px 20px;
      font-size: 9px;
      line-height: 13.5px;
      color: var(--ink);
    }
    .rc-back-tag {
      margin-top: 12px;
      max-width: 150px;
      opacity: 0.78;
    }

    /* Shelf Section */
    .shelfsec {
      position: relative;
      z-index: 10;
      background: var(--bg);
      margin-top: 32px;
      padding-top: 28px;
      border-top: 1px solid var(--border);
      transition: background-color 0.3s var(--ease-out);
    }
    .pln-sec-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      padding-bottom: 8px;
    }
    .pln-sec-title {
      font-family: var(--serif);
      font-weight: 400;
      font-size: clamp(26px, 2.8vw, 36px);
      letter-spacing: -0.02em;
    }
    .pln-sec-sub {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--fg-muted);
    }

    .pln-shelf-scroll {
      overflow-x: auto;
      scrollbar-width: thin;
    }
    ul.shelf {
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 4px;
      width: max-content;
      min-width: 100%;
      padding: 64px 32px 28px;
    }
    @media (max-width: 639px) {
      ul.shelf {
        zoom: 0.6;
        padding: 40px 40px;
      }
    }

    li.slot {
      position: relative;
      --t: 38px;
      --w: 210px;
      width: 38px;
      height: var(--h, 318px);
      flex: 0 0 auto;
    }
    li.slot[data-open="true"] {
      z-index: 3;
    }

    a.sbook {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      perspective: 1200px;
      perspective-origin: 50% 100%;
      text-decoration: none;
      color: inherit;
    }
    a.sbook::before {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -6px;
      width: 52px;
      height: 12px;
      transform: translateX(-50%);
      background: radial-gradient(ellipse at 42% 20%, var(--shelf-cast), transparent 72%);
      pointer-events: none;
      transition: transform 0.8s var(--ease-shelf), opacity 0.8s var(--ease-shelf);
    }
    li.slot[data-open="true"] a.sbook::before {
      width: 224px;
      height: 18px;
      bottom: -14px;
      opacity: 0.75;
      transform: translateX(-50%) translateX(8px) skewX(-10deg);
    }
    a.sbook::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -2px;
      width: 210px;
      height: 3px;
      transform: translateX(-50%) scaleX(0.181);
      background: var(--shelf-contact);
      border-radius: 999px;
      pointer-events: none;
      transition: transform 0.8s var(--ease-shelf);
    }
    li.slot[data-open="true"] a.sbook::after {
      transform: translateX(-50%) scaleX(1);
    }

    a.sbook .vol {
      left: calc(50% - 105px);
      top: 0;
      width: 210px;
      height: 100%;
      --c: var(--shelf-book);
      transform-origin: 50% 100%;
      transform: translateZ(-105px) rotateY(90deg);
      transition: transform 0.8s var(--ease-shelf);
    }
    li.slot[data-open="true"] a.sbook .vol {
      transform: translateZ(24px) rotateY(-4deg);
    }

    a.sbook .vol-face {
      border: 1px solid var(--shelf-line);
      background-color: var(--shelf-book);
      background-image:
        repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.012) 0 1px, transparent 1px 3px),
        linear-gradient(115deg, rgba(255, 255, 255, 0.03), transparent 45%, rgba(0, 0, 0, 0.12));
    }
    a.sbook .vol-spine {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      padding: 16px 3px 12px;
      box-shadow: inset 1px 0 rgba(255, 255, 255, 0.05), inset -3px 0 5px rgba(0, 0, 0, 0.22);
    }
    a.sbook .vol-spine::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 5px;
      width: 1px;
      background: var(--shelf-line);
    }
    .sb-metal {
      background-image: var(--shelf-ink-grad);
      background-size: 160% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: var(--shelf-ink-shadow);
    }
    .sb-spine-no {
      font-family: var(--mono);
      font-size: 9px;
    }
    .sb-spine-title {
      font-family: var(--serif);
      font-size: 18px;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: calc(100% - 44px);
    }
    a.sbook .vol-front .pln-photo {
      filter: var(--shelf-img-filter);
      mix-blend-mode: var(--shelf-img-blend);
    }
    a.sbook .vol-pages {
      background:
        linear-gradient(180deg, var(--shelf-book) 0 3px, transparent 3px calc(100% - 3px), var(--shelf-book) calc(100% - 3px)),
        repeating-linear-gradient(90deg, var(--shelf-p1) 0 1px, var(--shelf-p2) 1px 2px, var(--shelf-p3) 2px 3px);
      filter: none;
    }
    a.sbook .vol-top, a.sbook .vol-bottom {
      background:
        linear-gradient(90deg, var(--shelf-book) 0 3px, transparent 3px calc(100% - 3px), var(--shelf-book) calc(100% - 3px)),
        repeating-linear-gradient(0deg, var(--shelf-p1) 0 1px, var(--shelf-p2) 1px 2px, var(--shelf-p3) 2px 3px);
      filter: none;
    }
    .sb-sheen {
      position: absolute;
      inset: 0;
      z-index: 4;
      pointer-events: none;
      opacity: 0;
      mix-blend-mode: screen;
      background: radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), var(--sheen-a) 0%, var(--sheen-b) 28%, transparent 55%);
      transition: opacity 0.25s var(--ease-out);
    }
    li.slot[data-open="true"] a.sbook:hover .sb-sheen {
      opacity: 1;
    }

    /* +20% Expansion: Structural Typology Matrix */
    .pln-typology {
      position: relative;
      z-index: 10;
      background: var(--bg);
      padding: 64px 0 84px;
      border-top: 1px solid var(--border);
    }
    .pln-typo-grid {
      margin-top: 28px;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
    }
    @media (max-width: 980px) {
      .pln-typo-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (max-width: 560px) {
      .pln-typo-grid {
        grid-template-columns: 1fr;
      }
    }
    .pln-typo-card {
      padding: 22px;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: var(--bg-muted);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 18px;
      transition: border-color 0.25s var(--ease-out), transform 0.25s var(--ease-out);
    }
    .pln-typo-card:hover {
      border-color: var(--border-strong);
      transform: translateY(-2px);
    }
    .pln-typo-no {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--fg-subtle);
    }
    .pln-typo-h3 {
      margin-top: 8px;
      font-family: var(--serif);
      font-weight: 400;
      font-size: 24px;
      line-height: 1.1;
    }
    .pln-typo-desc {
      margin-top: 10px;
      font-size: 13.5px;
      line-height: 1.55;
      color: var(--fg-muted);
    }
    .pln-typo-open {
      align-self: flex-start;
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid var(--border-strong);
      font-family: var(--mono);
      font-size: 11px;
      color: var(--fg);
      transition: background-color 0.2s var(--ease-out), transform 0.16s var(--ease-out);
    }
    .pln-typo-open:hover {
      background: var(--bg);
    }

    /* Reading View */
    #readingView {
      display: none;
      min-height: calc(100svh - 48px);
    }
    body.pln-reading #homeView {
      display: none;
    }
    body.pln-reading #readingView {
      display: block;
    }

    .pln-read-head {
      padding-top: 72px;
    }
    .pln-read-title {
      font-family: var(--serif);
      font-weight: 400;
      font-size: clamp(48px, 6.4vw, 84px);
      line-height: 1;
      letter-spacing: -0.025em;
    }
    .pln-read-pill {
      display: inline-block;
      margin-top: 22px;
      padding: 7px 14px;
      border-radius: 999px;
      border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
      font-size: 14px;
    }
    .pln-read-grid {
      padding: 40px 0 120px;
      display: grid;
      grid-template-columns: 152px minmax(0, 1fr) 264px;
      gap: 32px;
      align-items: start;
    }
    @media (max-width: 820px) {
      .pln-read-grid {
        grid-template-columns: 1fr;
      }
      .pln-read-toc {
        display: none;
      }
    }
    .pln-toc-lbl {
      font-size: 11px;
      opacity: 0.6;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .pln-toc-link {
      display: block;
      width: 100%;
      text-align: left;
      padding: 7px 10px;
      font-size: 13px;
      border-left: 2px solid transparent;
      opacity: 0.72;
      transition: opacity 0.2s var(--ease-out), background-color 0.2s var(--ease-out);
    }
    .pln-toc-link.is-active {
      opacity: 1;
      border-left-color: currentColor;
      background: color-mix(in srgb, currentColor 7%, transparent);
    }

    .pln-read-body h3 {
      font-family: var(--serif);
      font-weight: 400;
      font-size: 32px;
      line-height: 1.15;
      margin-bottom: 16px;
    }
    .pln-read-body h3 + p, .pln-read-body p + p {
      font-size: 18px;
      line-height: 1.65;
      max-width: 640px;
      margin-bottom: 20px;
    }
    .pln-read-subsec {
      margin-top: 36px;
      padding-top: 24px;
      border-top: 1px solid color-mix(in srgb, currentColor 18%, transparent);
    }

    .pln-plate {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      background: var(--abg, var(--bg-muted));
      border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
    }
    .pln-plate .pln-photo {
      filter: grayscale(1) contrast(1.08);
      mix-blend-mode: var(--plate-blend, multiply);
    }
    .pln-figcap {
      margin-top: 10px;
      padding-bottom: 12px;
      border-bottom: 1px solid color-mix(in srgb, currentColor 20%, transparent);
      font-family: var(--mono);
      font-size: 11px;
      opacity: 0.82;
    }
    .pln-qfacts {
      margin-top: 28px;
      padding-top: 22px;
      border-top: 1px solid color-mix(in srgb, currentColor 20%, transparent);
    }
    .pln-qfacts h4 {
      font-family: var(--serif);
      font-weight: 400;
      font-size: 26px;
      line-height: 1.1;
    }
    .pln-qfacts p {
      margin-top: 10px;
      font-size: 14px;
      line-height: 1.5;
      opacity: 0.85;
    }

    /* Flight Overlay */
    .pln-flight-ov {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      pointer-events: auto;
      overflow: hidden;
      transition: opacity 0.22s var(--ease-out), transform 0.22s var(--ease-out);
    }
    .pln-flight-ov.revealing {
      opacity: 0;
      transform: scale(1.02);
    }
    .flight {
      position: absolute;
      transform-style: preserve-3d;
      transform-origin: 50% 50%;
      will-change: transform;
    }

    /* Footer */
    footer.foot {
      position: relative;
      z-index: 10;
      background: var(--bg);
      border-top: 1px solid var(--border);
      overflow: hidden;
    }
    body.pln-reading footer.foot {
      background: var(--abg, var(--bg));
      border-top-color: color-mix(in srgb, currentColor 16%, transparent);
    }
    .pln-foot-row {
      padding-top: 20px;
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: var(--fg-muted);
    }
    body.pln-reading .pln-foot-row {
      color: currentColor;
      opacity: 0.72;
    }
    .pln-foot-word {
      display: block;
      width: calc(100% - 48px);
      max-width: 1360px;
      margin: 24px auto 0;
      color: var(--fg-subtle);
    }
    body.pln-reading .pln-foot-word {
      color: currentColor;
      opacity: 0.36;
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>

  <header class="pln-header">
    <nav class="wrap pln-nav" aria-label="Primary navigation">
      <a href="#/" class="pln-logo" id="plnLogo" aria-label="Plinth home">
        <span class="pln-logo-ring" aria-hidden="true"></span>
        <span>Plinth</span>
      </a>

      <div class="pln-nav-right pln-home-controls">
        <div class="pln-theme-pill" role="group" aria-label="Colour theme">
          <i class="pln-theme-ind" aria-hidden="true"></i>
          <button type="button" class="pln-theme-btn" data-t="light" aria-pressed="false">Paper</button>
          <button type="button" class="pln-theme-btn" data-t="dark" aria-pressed="true">Noir</button>
        </div>
        <button type="button" class="pln-motion-btn" id="motionToggleBtn" aria-pressed="false">Motion: ON</button>
      </div>

      <button type="button" class="pln-back-btn" id="plnBackBtn" data-next-preview="true" aria-label="Return to all buildings">
        <span>← All buildings</span>
      </button>
    </nav>
  </header>

  <main id="main">
    <div id="homeView">
      <section class="pln-hero" id="plnHero" aria-label="Featured architectural dossiers">
        <div id="heroContent">
          <h1>
            <span>Shared</span>
            <span>Interiors</span>
          </h1>
          <p class="pln-hero-lede">A quiet atlas of the buildings we love.</p>

          <form class="pln-search-form" id="plnSearchForm" role="search">
            <div class="pln-field">
              <svg class="pln-search-ico" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="4.75" stroke="currentColor" stroke-width="1.5"></circle>
                <path d="M10.6 10.6L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
              </svg>
              <label for="plnSearchInput" class="sr-only">Search buildings</label>
              <input id="plnSearchInput" class="pln-search-input" type="search" placeholder=" " autocomplete="off">
              <div class="pln-rot-ph" id="plnRotPh" aria-hidden="true">
                <span class="pln-rot-grid" id="plnRotGrid"></span>
              </div>
            </div>
            <button type="submit" class="pln-sub-btn" aria-label="Open matching building">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
          </form>

          <div class="pln-hero-meta">
            <button type="button" class="pln-tour-pill" id="plnTourBtn" data-next-preview="true">
              <span>Tour Nº 01 · Arches House ↗</span>
            </button>
            <span class="pln-count-hint tabular-nums" id="plnCountHint">35 field dossiers</span>
          </div>
        </div>

        <div id="gallery">
          <p class="sr-only">Newest entries. · Slowly moving · Scroll down the page to wander</p>
          <div class="pln-layer" id="plnLayer"></div>
          <p class="pln-empty" id="plnEmpty"></p>
        </div>
      </section>

      <section class="shelfsec" aria-label="Recommended reading shelf">
        <div class="wrap pln-sec-head">
          <h2 class="pln-sec-title">The Working Shelf</h2>
          <span class="pln-sec-sub tabular-nums">Nº 21 — Nº 35 · Hover any spine to inspect</span>
        </div>
        <div class="pln-shelf-scroll">
          <ul class="shelf" id="plnShelf"></ul>
        </div>
      </section>

      <section class="pln-typology" aria-label="Architectural typology index">
        <div class="wrap">
          <div class="pln-sec-head">
            <h2 class="pln-sec-title">Structural &amp; Daylight Typologies</h2>
            <span class="pln-sec-sub tabular-nums">Cross-referenced specimen index</span>
          </div>
          <div class="pln-typo-grid">
            <article class="pln-typo-card">
              <div>
                <span class="pln-typo-no tabular-nums">CLASS I · 09 ENTRIES</span>
                <h3 class="pln-typo-h3">Deep Arches &amp; Loggias</h3>
                <p class="pln-typo-desc">Thickened concrete and stone perimeters carved to hold summer sun outside the living rooms while framing low horizontal gardens.</p>
              </div>
              <button type="button" class="pln-typo-open" data-open-slug="arches-house">Inspect Arches House ↗</button>
            </article>
            <article class="pln-typo-card">
              <div>
                <span class="pln-typo-no tabular-nums">CLASS II · 08 ENTRIES</span>
                <h3 class="pln-typo-h3">Cantilevers &amp; Ridges</h3>
                <p class="pln-typo-desc">Raking concrete brackets and timber-glass boxes balanced above narrow cores, rock ledges, and steep coastal slopes.</p>
              </div>
              <button type="button" class="pln-typo-open" data-open-slug="cantilever-tower">Inspect Cantilever Tower ↗</button>
            </article>
            <article class="pln-typo-card">
              <div>
                <span class="pln-typo-no tabular-nums">CLASS III · 10 ENTRIES</span>
                <h3 class="pln-typo-h3">Quarry &amp; Monolith</h3>
                <p class="pln-typo-desc">Excavated chapels, board-marked libraries, and windowless volumes lit by single vertical slots at dusk.</p>
              </div>
              <button type="button" class="pln-typo-open" data-open-slug="quarry-chapel">Inspect Quarry Chapel ↗</button>
            </article>
            <article class="pln-typo-card">
              <div>
                <span class="pln-typo-no tabular-nums">CLASS IV · 08 ENTRIES</span>
                <h3 class="pln-typo-h3">Top-Lit Baths &amp; Sheds</h3>
                <p class="pln-typo-desc">Oculi, sawtooth north-light roofs, and reflecting pools calibrated for shadowless studio work and quiet civic assembly.</p>
              </div>
              <button type="button" class="pln-typo-open" data-open-slug="skylight-baths">Inspect Skylight Baths ↗</button>
            </article>
          </div>
        </div>
      </section>
    </div>

    <section id="readingView" aria-label="Building field dossier">
      <div class="wrap">
        <div class="pln-read-head">
          <h2 class="pln-read-title" id="rdTitle">Arches House</h2>
          <span class="pln-read-pill" id="rdKicker">Dossier</span>
        </div>

        <div class="pln-read-grid">
          <aside class="pln-read-toc" aria-label="Article sections">
            <div class="pln-toc-lbl">Sections</div>
            <button type="button" class="pln-toc-link is-active" data-sec="secSynopsis">Synopsis</button>
            <button type="button" class="pln-toc-link" data-sec="secPlan">Plan and light</button>
            <button type="button" class="pln-toc-link" data-sec="secMaterial">Material</button>
          </aside>

          <article class="pln-read-body">
            <div id="secSynopsis">
              <h3>Synopsis</h3>
              <p id="rdSum1"></p>
              <p id="rdSum2"></p>
            </div>
            <div class="pln-read-subsec" id="secPlan">
              <h3>Plan and light</h3>
              <p id="rdPlan">Rooms are arranged along a quiet threshold between direct aperture and deep reveal, letting daylight graze structural surfaces without glare from morning through late dusk.</p>
            </div>
            <div class="pln-read-subsec" id="secMaterial">
              <h3>Material</h3>
              <p id="rdMaterial">Board-formed concrete, honed aggregate, untreated timber, and lime plaster weather together so wear registers as patina rather than decay.</p>
            </div>
          </article>

          <aside aria-label="Study photograph and quick facts">
            <div class="pln-plate">
              <i class="pln-photo" id="rdPhoto"></i>
            </div>
            <div class="pln-figcap tabular-nums" id="rdFigcap">Fig. 01 · Study photograph · Nº 01</div>
            <div class="pln-qfacts">
              <h4>Quick facts</h4>
              <p class="tabular-nums" id="rdFacts">~2 min tour · Visited 12 Oct 2026</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>

  <footer class="foot">
    <div class="wrap pln-foot-row">
      <span>Built with ◆ Studio</span>
      <span class="tabular-nums">2026</span>
    </div>
    <svg class="pln-foot-word" viewBox="0 0 1000 250" aria-hidden="true">
      <defs>
        <pattern id="plnHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" stroke-width="1.1"></line>
        </pattern>
      </defs>
      <text x="500" y="318" text-anchor="middle" font-family="Newsreader, Georgia, serif" font-size="400" letter-spacing="-8" fill="url(#plnHatch)" stroke="currentColor" stroke-width="1.2">Plinth</text>
    </svg>
  </footer>

  <script>
    (function () {
      'use strict';

      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      var SHEETS = [
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_192006_dd6f50c5-96f1-4366-a0b9-0e4a09cf5b0d.png&w=1600&q=85',
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_192017_98626c26-3f57-4237-9f43-c2098c60f4d6.png&w=1600&q=85',
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_192017_5e2e7057-6f42-43b7-b901-d9a05410bfcf.png&w=1600&q=85',
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_192016_3cfaf615-9452-411f-82d8-efce7d4ac496.png&w=1600&q=85',
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_192005_ce70ee97-86d4-49ce-9eb5-dc2a3ca1cd00.png&w=1600&q=85'
      ];

      var PALETTE = ['#f0b0ae', '#edbb99', '#e8d194', '#d1da9a', '#a9d1b0', '#a4ced0', '#adc3e4', '#c1b6df', '#ddb0cc'];
      var CELL_POS = ['0% 0%', '100% 0%', '0% 100%', '100% 100%'];
      var TAGLINE = 'A field guide to buildings that last';

      function slugify(s) {
        return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }
      function pad2(n) {
        return n < 10 ? '0' + n : '' + n;
      }

      var HERO_RAW = [
        ['Arches House', 'Dossier', 2, 0, 0, 'A low concrete house fronted by five deep arches that keep its rooms in shade through the long summer afternoons.'],
        ['Cantilever Tower', 'Dossier', 3, 0, 1, 'A residential tower whose upper floors widen outward, carried on raking concrete brackets above a narrow shaft.'],
        ['Glass Pavilion', 'Notes', 2, 0, 2, 'A single glass room under a thin steel roof, set at the edge of a still reflecting pool.'],
        ['Steps Plaza', 'Deep dive', 3, 0, 3, 'A civic square cut into a slope as a run of broad, shallow terraces that double as seating.'],
        ['The Fold', 'Dossier', 1, 1, 0, 'A gallery wrapped in angled concrete planes that open and close like a creased sheet of paper.'],
        ['Ridge House', 'Dossier', 2, 1, 1, 'A timber and glass box cantilevered off a rock ledge, with the whole valley framed by one long window.'],
        ['Lakeside Studio', 'Notes', 2, 1, 2, 'A painter’s studio on a stone plinth, its glass wall facing north across open water.'],
        ['Crescent Hall', 'Deep dive', 4, 1, 3, 'A curved assembly hall carried on a ring of fluted columns, its roof rising toward the open side.'],
        ['Stone Terrace', 'Dossier', 3, 2, 0, 'Housing stepped down a hillside, each flat roof forming the garden of the home above it.'],
        ['Slender Tower', 'Notes', 1, 2, 1, 'A narrow apartment tower with a crenellated crown, built on a plot no wider than a townhouse.'],
        ['Spiral Stair', 'Deep dive', 2, 2, 2, 'A free-standing concrete stair that coils through a three-storey atrium without a central column.'],
        ['Board Library', 'Dossier', 3, 2, 3, 'A reading room beneath a deep board-marked overhang, glazed on every side for even daylight.'],
        ['Quarry Chapel', 'Notes', 2, 3, 0, 'A small chapel carved into the face of a worked-out quarry, lit by a single cut in the rock.'],
        ['Courtyard Block', 'Dossier', 3, 3, 1, 'A school arranged around a planted court, its facades a grid of deep square openings.'],
        ['Skylight Baths', 'Deep dive', 3, 3, 2, 'Public baths under a heavy roof pierced by round skylights that move pools of light across the water.'],
        ['North Atelier', 'Dossier', 2, 3, 3, 'Workshops under a sawtooth roof whose north-facing glass gives shadowless light all day.'],
        ['Monolith', 'Notes', 1, 4, 0, 'A windowless block broken by one full-height slot that turns into a blade of light at dusk.'],
        ['Fin Tower', 'Dossier', 3, 4, 1, 'An office tower sheathed in vertical concrete fins that shade the glass from the low western sun.'],
        ['Palisade House', 'Dossier', 2, 4, 2, 'A long single-storey house screened by a palisade of slender columns along its garden edge.'],
        ['Orchard Pavilion', 'Deep dive', 2, 4, 3, 'A timber pavilion set among old fruit trees, its roof a shallow gable on exposed rafters.']
      ];

      var HERO_BOOKS = HERO_RAW.map(function (r, i) {
        return {
          idx: i,
          no: 'Nº ' + pad2(i + 1),
          title: r[0],
          slug: slugify(r[0]),
          kicker: r[1],
          read: '~' + r[2] + ' min tour',
          sheet: r[3],
          cell: r[4],
          summary: r[5],
          color: PALETTE[i % 9],
          isShelf: false
        };
      });

      var SHELF_RAW = [
        ['Marrow House', 0, 0],
        ['Cistern Hall', 1, 3],
        ['Granary Loft', 2, 0],
        ['Weir Station', 3, 2],
        ['Kiln Studio', 4, 0],
        ['Saltern Court', 0, 3],
        ['Lantern Tower', 4, 1],
        ['Basalt Rooms', 2, 3],
        ['Tannery Lofts', 3, 1],
        ['Ferry Terminal', 1, 2],
        ['Belvedere', 0, 1],
        ['Sluice House', 3, 3],
        ['Aqueduct Rooms', 1, 0],
        ['Signal Box', 2, 1],
        ['Concrete Almanac', 0, 2]
      ];
      var KICKERS = ['Dossier', 'Notes', 'Deep dive'];
      var HEIGHTS = [310, 326, 300, 318];

      var SHELF_BOOKS = SHELF_RAW.map(function (r, i) {
        var mins = 1 + ((i * 7) % 4);
        return {
          idx: 20 + i,
          shelfIdx: i,
          no: 'Nº ' + pad2(21 + i),
          title: r[0],
          slug: slugify(r[0]),
          kicker: KICKERS[i % 3],
          read: '~' + mins + ' min tour',
          sheet: r[1],
          cell: r[2],
          height: HEIGHTS[i % 4],
          summary: r[0] + ' is one of the quieter entries in the atlas: a working building whose plan, light and material are read here as closely as any monument.',
          color: '',
          isShelf: true
        };
      });

      var ALL_BOOKS = HERO_BOOKS.concat(SHELF_BOOKS);
      var BY_SLUG = {};
      ALL_BOOKS.forEach(function (b) { BY_SLUG[b.slug] = b; });

      // Theme & Motion controls
      var htmlEl = document.documentElement;
      var themeBtns = Array.prototype.slice.call(document.querySelectorAll('.pln-theme-btn'));
      function applyTheme(t) {
        htmlEl.setAttribute('data-theme', t);
        themeBtns.forEach(function (btn) {
          btn.setAttribute('aria-pressed', btn.getAttribute('data-t') === t ? 'true' : 'false');
        });
        try { localStorage.setItem('plinth-theme', t); } catch (e) {}
      }
      try {
        var savedTheme = localStorage.getItem('plinth-theme');
        if (savedTheme === 'light' || savedTheme === 'dark') applyTheme(savedTheme);
      } catch (e) {}
      themeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          applyTheme(btn.getAttribute('data-t'));
        });
      });

      var motionPaused = false;
      var motionBtn = document.getElementById('motionToggleBtn');
      motionBtn.addEventListener('click', function () {
        motionPaused = !motionPaused;
        htmlEl.setAttribute('data-motion', motionPaused ? 'paused' : 'on');
        motionBtn.setAttribute('aria-pressed', motionPaused ? 'true' : 'false');
        motionBtn.textContent = motionPaused ? 'Motion: OFF' : 'Motion: ON';
      });

      // Rotating 35-title placeholder
      var rotGrid = document.getElementById('plnRotGrid');
      var rotPh = document.getElementById('plnRotPh');
      var searchInput = document.getElementById('plnSearchInput');
      var shuffledTitles = ALL_BOOKS.map(function (b) { return b.title; });
      for (var si = shuffledTitles.length - 1; si > 0; si--) {
        var sj = Math.floor(Math.random() * (si + 1));
        var tmp = shuffledTitles[si];
        shuffledTitles[si] = shuffledTitles[sj];
        shuffledTitles[sj] = tmp;
      }
      var rotNodes = shuffledTitles.map(function (t, idx) {
        var sp = document.createElement('span');
        sp.className = 'pln-rot-item' + (idx === 0 ? ' is-init' : '');
        sp.textContent = t;
        rotGrid.appendChild(sp);
        return sp;
      });
      var rotIdx = 0;
      setInterval(function () {
        if (motionPaused || document.hidden || document.body.classList.contains('pln-reading')) return;
        var prev = rotNodes[rotIdx];
        rotIdx = (rotIdx + 1) % rotNodes.length;
        var nxt = rotNodes[rotIdx];
        prev.className = 'pln-rot-item is-out';
        nxt.className = 'pln-rot-item is-in';
      }, 2400);

      function syncPlaceholderVis() {
        var hide = document.activeElement === searchInput || searchInput.value.trim().length > 0;
        rotPh.classList.toggle('is-hidden', hide);
      }
      searchInput.addEventListener('focus', syncPlaceholderVis);
      searchInput.addEventListener('blur', syncPlaceholderVis);

      // Build 6-face Book Volume HTML
      function photoStyle(book) {
        return 'background-image:url(' + SHEETS[book.sheet] + ');background-position:' + CELL_POS[book.cell] + ';';
      }

      function createRibbonVolume(book) {
        var v = document.createElement('div');
        v.className = 'vol';
        v.style.setProperty('--w', '230px');
        v.style.setProperty('--h', '310px');
        v.style.setProperty('--t', '26px');
        v.style.setProperty('--c', book.color);
        v.innerHTML =
          '<div class="vol-face vol-front">' +
            '<span class="rc-bind" aria-hidden="true"></span>' +
            '<div class="rc-head"><span>Plinth</span><span class="tabular-nums">' + book.no + '</span></div>' +
            '<div class="rc-photo-box"><i class="pln-photo" style="' + photoStyle(book) + '"></i></div>' +
            '<div class="rc-body">' +
              '<div class="rc-kicker">' + book.kicker + '</div>' +
              '<div class="rc-title">' + book.title + '</div>' +
              '<div class="rc-foot"><span class="tabular-nums">' + book.read + '</span><span>Open ↗</span></div>' +
            '</div>' +
            '<div class="vol-paper"></div>' +
          '</div>' +
          '<div class="vol-face vol-back">' +
            '<span class="rc-bind" aria-hidden="true"></span>' +
            '<div class="rc-back-top">' +
              '<div class="rc-back-head"><span>Plinth</span><span class="tabular-nums">' + book.no + '</span></div>' +
              '<div class="rc-back-title">' + book.title + '</div>' +
              '<div class="rc-back-sum">' + book.summary + '</div>' +
            '</div>' +
            '<div class="rc-back-foot">' +
              '<div class="tabular-nums">' + book.read + ' · Visited 12 Oct 2026</div>' +
              '<div class="rc-back-tag">' + TAGLINE + '</div>' +
            '</div>' +
            '<div class="vol-paper"></div>' +
          '</div>' +
          '<div class="vol-face vol-spine"><div class="vol-paper"></div></div>' +
          '<div class="vol-face vol-pages"></div>' +
          '<div class="vol-face vol-top"></div>' +
          '<div class="vol-face vol-bottom"></div>';
        return v;
      }

      // Build Shelf Section (15 books, Concrete Almanac open initially)
      var shelfUl = document.getElementById('plnShelf');
      var shelfSlots = [];
      var openShelfIdx = 14;
      var slotAnimReq = 0;

      function createShelfVolume(book) {
        var v = document.createElement('div');
        v.className = 'vol';
        v.style.setProperty('--w', '210px');
        v.style.setProperty('--h', book.height + 'px');
        v.style.setProperty('--t', '38px');
        v.innerHTML =
          '<div class="vol-face vol-front">' +
            '<span class="rc-bind" aria-hidden="true"></span>' +
            '<div class="sb-sheen" aria-hidden="true"></div>' +
            '<div class="rc-head"><span class="sb-metal">Plinth</span><span class="sb-metal tabular-nums">' + book.no + '</span></div>' +
            '<div class="rc-photo-box"><i class="pln-photo" style="' + photoStyle(book) + '"></i></div>' +
            '<div class="rc-body">' +
              '<div class="rc-kicker sb-metal">' + book.kicker + '</div>' +
              '<div class="rc-title sb-metal">' + book.title + '</div>' +
              '<div class="rc-foot"><span class="sb-metal tabular-nums">' + book.read + '</span><span class="sb-metal">Open ↗</span></div>' +
            '</div>' +
            '<div class="vol-paper"></div>' +
          '</div>' +
          '<div class="vol-face vol-back"><div class="vol-paper"></div></div>' +
          '<div class="vol-face vol-spine">' +
            '<span class="sb-spine-no sb-metal tabular-nums">' + pad2(21 + book.shelfIdx) + '</span>' +
            '<span class="sb-spine-title sb-metal">' + book.title + '</span>' +
            '<div class="vol-paper"></div>' +
          '</div>' +
          '<div class="vol-face vol-pages"></div>' +
          '<div class="vol-face vol-top"></div>' +
          '<div class="vol-face vol-bottom"></div>';
        return v;
      }

      // Animate shelf slot widths in JS rAF (composite-safe, zero CSS transition: width)
      var slotWidths = SHELF_BOOKS.map(function (_, idx) { return idx === openShelfIdx ? 234.7 : 38; });
      function animateShelfWidths() {
        var moving = false;
        for (var i = 0; i < shelfSlots.length; i++) {
          var target = i === openShelfIdx ? 234.7 : 38;
          var diff = target - slotWidths[i];
          if (Math.abs(diff) > 0.25) {
            slotWidths[i] += motionPaused ? diff : diff * 0.16;
            moving = true;
          } else {
            slotWidths[i] = target;
          }
          shelfSlots[i].style.width = slotWidths[i].toFixed(2) + 'px';
        }
        if (moving) {
          slotAnimReq = requestAnimationFrame(animateShelfWidths);
        } else {
          slotAnimReq = 0;
        }
      }

      function setOpenShelf(idx) {
        if (idx === openShelfIdx) return;
        openShelfIdx = idx;
        shelfSlots.forEach(function (li, i) {
          if (i === idx) li.setAttribute('data-open', 'true');
          else li.removeAttribute('data-open');
        });
        if (!slotAnimReq) slotAnimReq = requestAnimationFrame(animateShelfWidths);
      }

      var hoverTimer = 0;
      SHELF_BOOKS.forEach(function (book, i) {
        var li = document.createElement('li');
        li.className = 'slot';
        li.style.setProperty('--h', book.height + 'px');
        li.style.width = (i === openShelfIdx ? 234.7 : 38) + 'px';
        if (i === openShelfIdx) li.setAttribute('data-open', 'true');

        var a = document.createElement('a');
        a.className = 'sbook';
        a.href = '#/b/' + book.slug;
        a.setAttribute('aria-label', book.title + ', ' + book.kicker + ', ' + book.read);
        var vol = createShelfVolume(book);
        a.appendChild(vol);
        li.appendChild(a);
        shelfUl.appendChild(li);
        shelfSlots.push(li);

        var lastPx = -1, lastPy = -1;
        a.addEventListener('pointermove', function (e) {
          if (e.pointerType !== 'mouse') return;
          if (e.clientX === lastPx && e.clientY === lastPy) return;
          lastPx = e.clientX;
          lastPy = e.clientY;
          if (openShelfIdx === i) {
            var r = a.getBoundingClientRect();
            a.style.setProperty('--sx', (((e.clientX - r.left) / Math.max(1, r.width)) * 100).toFixed(1) + '%');
            a.style.setProperty('--sy', (((e.clientY - r.top) / Math.max(1, r.height)) * 100).toFixed(1) + '%');
          } else {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(function () { setOpenShelf(i); }, 100);
          }
        });
        a.addEventListener('pointerleave', function () {
          clearTimeout(hoverTimer);
        });
        a.addEventListener('focus', function () {
          setOpenShelf(i);
        });
        a.addEventListener('click', function (e) {
          e.preventDefault();
          launchShelfFlight(book, a, vol);
        });
      });

      // Exact Drifting Ribbon Math
      var galleryEl = document.getElementById('gallery');
      var layerEl = document.getElementById('plnLayer');
      var heroContentEl = document.getElementById('heroContent');
      var heroSectionEl = document.getElementById('plnHero');
      var emptyEl = document.getElementById('plnEmpty');
      var countHintEl = document.getElementById('plnCountHint');

      var activeBooks = HERO_BOOKS.slice();
      var slotMap = new Map();
      var stageU = 1440, stageD = 720, cardA = 230, cardL = 310;
      var marginL = 584, marginR = 96, spacingT = 97, baselineR = 460;
      var drift = 0, wheel = 0, wheelPending = 0, dragOffset = 0;
      var flyingActive = false, hiddenSlot = null, heroInView = true;

      function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }
      function ss(x) { var c = clamp(x, 0, 1); return c * c * (3 - 2 * c); }
      function posMod(a, m) { return ((a % m) + m) % m; }
      function lerp(a, b, t) { return a + (b - a) * t; }

      function alongDesktop(S) {
        var r = ss(S / stageU);
        var a = clamp(stageD / 1050, 0.85, 1.2);
        var scale = (0.34 + (2.4 - 0.34) * Math.pow(1 - r, 3)) * a;
        var rise = -0.8 * stageD * Math.pow(r - 0.4, 2);
        var order = (1 - r) * 100 + 1;
        var yaw = 0.35 - r * 0.24;
        var n = clamp(S / stageU, 0, 1);
        var lft = 1 - ss(n / 0.38);
        var rgt = 1 - ss((1 - n) / 0.035);
        var isLeft = lft > rgt;
        var v = isLeft ? lft : (rgt > 0 ? rgt : 0);
        var blur = Math.min(60, Math.round(v * (isLeft ? 60 : 3) * 10) / 10);
        return { scale: scale, rise: rise, order: order, yaw: yaw, pitch: -0.065, rot: 0, blur: blur };
      }

      function measureStage() {
        var gr = galleryEl.getBoundingClientRect();
        stageU = Math.max(320, gr.width || window.innerWidth);
        stageD = Math.max(520, gr.height || 680);
        var isPhone = stageU < 640;
        cardA = isPhone ? 200 : 230;
        cardL = isPhone ? 280 : 310;
        layerEl.style.setProperty('--A', cardA + 'px');
        layerEl.style.setProperty('--L', cardL + 'px');

        var cr = heroContentEl.getBoundingClientRect();
        var cbLeft = cr.left - gr.left;
        var cbRight = cr.right - gr.left;
        var cbBottom = cr.bottom - gr.top;

        var lFactor = isPhone ? 1.7 : 2.88;
        var oFactor = isPhone ? 0.45 : 0.408;
        function ext(w, h, deg) {
          var rad = deg * Math.PI / 180;
          return Math.abs(Math.cos(rad)) * w + Math.abs(Math.sin(rad)) * h;
        }
        marginL = Math.max(520, ext(cardA * lFactor / 2 + 193, 1.4 * cardA * lFactor / 2 + 193, 5.4));
        marginR = Math.max(96, ext(cardA * oFactor / 2 + 13.25, 1.4 * cardA * oFactor / 2 + 13.25, 14.2));
        spacingT = Math.max(cardA - 135, Math.ceil((stageU + marginL + marginR) / 22));

        if (!isPhone) {
          var R = cbBottom + 48;
          var pMin = -3 * cardA;
          var pMax = stageU + 3 * cardA;
          var step = (pMax - pMin) / 128;
          var dp = pMin;
          var fPrev = alongDesktop(dp);
          for (var s = 1; s <= 128; s++) {
            var p = pMin + s * step;
            var gCur = alongDesktop(p);
            if (fPrev.blur === 0 || gCur.blur === 0 || (dp <= stageU * 0.5 && p >= stageU * 0.5)) {
              var lx = cardA * fPrev.scale * 0.5 + 13;
              var oy = cardL * fPrev.scale * 0.5 + 13;
              var st = 26 * fPrev.scale * 0.5;
              var cx = lx * Math.cos(gCur.yaw) + st * Math.sin(fPrev.yaw);
              var hz = lx * Math.sin(fPrev.yaw) + st * Math.cos(gCur.yaw);
              var k = 1 / Math.max(0.1, 1 - (oy * 0.0649542 + 0.9978882 * hz) / 900);
              var hx = cx * k;
              var hy = (0.9978882 * oy + hz * 0.0649542) * k;
              if (p + hx >= cbLeft - 10 && dp - hx <= cbRight + 10) {
                R = Math.max(R, cbBottom + 24 + hy - Math.min(fPrev.rise, gCur.rise));
              }
            }
            dp = p;
            fPrev = gCur;
          }
          baselineR = R + 24;
        } else {
          var y0 = Math.min(1.15, (0.46 * stageU) / cardA);
          baselineR = cbBottom + 24 + (cardL * y0) * 0.5 + 24;
        }
      }

      function interpTable(tbl, n) {
        var c = clamp(n, 0, 3);
        var i = Math.min(2, Math.floor(c));
        var f = c - i;
        return tbl[i] + (tbl[i + 1] - tbl[i]) * f;
      }

      function smoother(e) {
        return e * e * e * (e * (6 * e - 15) + 10);
      }

      function getPhase() {
        return drift + wheel + dragOffset + 0.8 * window.scrollY;
      }

      function clearSlots() {
        slotMap.forEach(function (rec) { rec.el.remove(); });
        slotMap.clear();
      }

      function ensureSlotNode(slot, book) {
        var rec = slotMap.get(slot);
        if (rec && rec.book === book) return rec;
        if (rec) rec.el.remove();

        var a = document.createElement('a');
        a.className = 'gcard';
        a.href = '#/b/' + book.slug;
        a.setAttribute('aria-label', book.title + ', ' + book.kicker + ', ' + book.read);
        var vol = createRibbonVolume(book);
        a.appendChild(vol);
        layerEl.appendChild(a);

        var newRec = { slot: slot, book: book, el: a, vol: vol, state: null };
        bindCardPointer(newRec);
        slotMap.set(slot, newRec);
        return newRec;
      }

      function renderRibbon() {
        var N = activeBooks.length;
        if (N === 0) {
          clearSlots();
          return;
        }
        var phase = getPhase();
        var used = new Set();
        var paintList = [];

        if (stageU >= 640) {
          var B = posMod(phase, N * spacingT);
          var C = Math.ceil((B - cardA * 0.5 - marginL) / spacingT);
          var J = Math.min(C + 23, Math.floor((B - cardA * 0.5 + stageU + marginR) / spacingT));
          for (var n = C; n <= J; n++) {
            var bIdx = posMod(n, N);
            var book = activeBooks[bIdx];
            var S = n * spacingT + cardA * 0.5 - B;
            var al = alongDesktop(S);
            var y = baselineR + al.rise;
            var rec = ensureSlotNode(n, book);
            used.add(n);
            var P = Math.max(900, cardA * al.scale, cardL * al.scale);
            var hot = al.blur === 0;
            rec.state = { x: S, y: y, scale: al.scale, yaw: al.yaw, pitch: al.pitch, rot: 0, blur: al.blur, P: P, hot: hot };
            rec.depth = al.order + 0.7 + 0.25 * (book.idx % 3);
            paintList.push(rec);
          }
        } else {
          var g = posMod(phase, N * spacingT) / spacingT;
          var v = Math.floor(g);
          var b = v + smoother(smoother(g - v));
          var y0 = Math.min(1.15, (0.46 * stageU) / cardA);
          var TX = [0, 0.118, 0.22, 0.2];
          var TY = [0, 0.045, 0.105, 0.11];
          var TROT = [0, 6, 7, 7];
          var TSC = [1, 0.92, 0.86, 0.78];
          var TYAW = [0, 0.07, 0.12, 0.12];
          var centerSlot = Math.round(b);
          for (var e = centerSlot - 3; e <= centerSlot + 3; e++) {
            var t = e - b;
            var an = Math.abs(t);
            if (an > 3.1) continue;
            var sgn = t < 0 ? -1 : (t > 0 ? 1 : 0);
            var bIdxP = posMod(e, N);
            var bookP = activeBooks[bIdxP];
            var recP = ensureSlotNode(e, bookP);
            used.add(e);
            var sc = y0 * interpTable(TSC, an);
            var xP = stageU * 0.5 + sgn * interpTable(TX, an) * stageU;
            var yP = baselineR + interpTable(TY, an) * stageU;
            var yawP = -sgn * interpTable(TYAW, an);
            var rotDeg = sgn * interpTable(TROT, an);
            var PP = Math.max(900, cardA * sc, cardL * sc);
            var hotP = an < 0.5;
            recP.state = { x: xP, y: yP, scale: sc, yaw: yawP, pitch: -0.065, rot: rotDeg * Math.PI / 180, blur: 0, P: PP, hot: hotP };
            recP.depth = -an;
            paintList.push(recP);
          }
        }

        slotMap.forEach(function (rec, k) {
          if (!used.has(k)) {
            rec.el.remove();
            slotMap.delete(k);
          }
        });

        paintList.sort(function (a, b) {
          return a.depth !== b.depth ? a.depth - b.depth : a.slot - b.slot;
        });

        for (var pi = 0; pi < paintList.length; pi++) {
          var item = paintList[pi];
          var st = item.state;
          var el = item.el;
          el.style.zIndex = String(pi + 1);
          el.style.transform = 'translate3d(' + (st.x - cardA * 0.5).toFixed(2) + 'px,' + (st.y - cardL * 0.5).toFixed(2) + 'px,0) rotate(' + st.rot.toFixed(4) + 'rad)';
          el.style.filter = st.blur > 0.05 ? 'blur(' + st.blur + 'px)' : 'none';
          if (st.hot) {
            el.classList.add('hot');
            el.tabIndex = 0;
          } else {
            el.classList.remove('hot');
            el.tabIndex = -1;
          }
          el.classList.toggle('is-flying-hidden', hiddenSlot === item.slot);
          item.vol.style.setProperty('--w', cardA + 'px');
          item.vol.style.setProperty('--h', cardL + 'px');
          item.vol.style.transform = 'perspective(' + st.P.toFixed(1) + 'px) rotateX(' + st.pitch.toFixed(4) + 'rad) rotateY(' + st.yaw.toFixed(4) + 'rad) scale3d(' + st.scale.toFixed(4) + ',' + st.scale.toFixed(4) + ',' + st.scale.toFixed(4) + ')';
        }
      }

      // Pointer drag & click on sharp ribbon cards
      function bindCardPointer(rec) {
        var startX = 0, startY = 0, locked = '', pid = null;
        rec.el.addEventListener('pointerdown', function (e) {
          if (!rec.state || !rec.state.hot || flyingActive) return;
          startX = e.clientX;
          startY = e.clientY;
          locked = '';
          pid = e.pointerId;
        });
        rec.el.addEventListener('pointermove', function (e) {
          if (pid !== e.pointerId) return;
          var dx = e.clientX - startX;
          var dy = e.clientY - startY;
          if (!locked && Math.hypot(dx, dy) >= 6) {
            locked = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
            if (locked === 'x') {
              try { rec.el.setPointerCapture(e.pointerId); } catch (err) {}
            }
          }
          if (locked === 'x') {
            dragOffset = -dx;
          }
        });
        function finishDrag(e) {
          if (pid !== e.pointerId) return;
          if (locked === 'x') {
            drift += dragOffset;
            dragOffset = 0;
            rec.suppressClick = true;
            setTimeout(function () { rec.suppressClick = false; }, 60);
          }
          pid = null;
        }
        rec.el.addEventListener('pointerup', finishDrag);
        rec.el.addEventListener('pointercancel', finishDrag);
        rec.el.addEventListener('click', function (e) {
          e.preventDefault();
          if (rec.suppressClick || !rec.state || !rec.state.hot || flyingActive) return;
          launchRibbonFlight(rec);
        });
      }

      // Horizontal wheel / shift+wheel on hero
      heroSectionEl.addEventListener('wheel', function (e) {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
          e.preventDefault();
          var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
          var mult = e.deltaMode === 1 ? 16 : (e.deltaMode === 2 ? stageU : 1);
          wheelPending += d * mult;
        }
      }, { passive: false });

      // Visibility observer for hero loop
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { heroInView = en.isIntersecting; });
        }, { rootMargin: '200px 0px' });
        io.observe(heroSectionEl);
      }

      // Search Filter (180ms debounce)
      var filterTimer = 0;
      searchInput.addEventListener('input', function () {
        syncPlaceholderVis();
        clearTimeout(filterTimer);
        filterTimer = setTimeout(function () {
          var q = searchInput.value.trim().toLowerCase();
          galleryEl.setAttribute('data-filter', 'out');
          setTimeout(function () {
            activeBooks = !q ? HERO_BOOKS.slice() : HERO_BOOKS.filter(function (b) {
              return b.title.toLowerCase().indexOf(q) !== -1 || b.summary.toLowerCase().indexOf(q) !== -1;
            });
            clearSlots();
            emptyEl.textContent = 'No listings match “' + searchInput.value.trim() + '”.';
            emptyEl.classList.toggle('is-visible', activeBooks.length === 0);
            countHintEl.textContent = (activeBooks.length + SHELF_BOOKS.length) + ' field dossiers';
            renderRibbon();
            galleryEl.setAttribute('data-filter', 'in');
            setTimeout(function () { galleryEl.removeAttribute('data-filter'); }, 520);
          }, 160);
        }, 180);
      });

      document.getElementById('plnSearchForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var q = searchInput.value.trim().toLowerCase();
        var match = ALL_BOOKS.find(function (b) { return b.title.toLowerCase() === q; }) ||
                    ALL_BOOKS.find(function (b) { return b.title.toLowerCase().indexOf(q) !== -1; }) ||
                    HERO_BOOKS[0];
        if (match) {
          history.pushState({ slug: match.slug }, '', '#/b/' + match.slug);
          openReadingDirect(match);
        }
      });

      // Reading View Populate & Controls
      var lastOpenedState = null;
      function populateReadingView(book) {
        document.getElementById('rdTitle').textContent = book.title;
        document.getElementById('rdKicker').textContent = book.kicker;
        document.getElementById('rdSum1').textContent = book.summary;
        document.getElementById('rdSum2').textContent =
          'Like every entry in this atlas, ' + book.title + ' is an invented building, described the way a field guide would describe a specimen: what it is made of, how light reaches its rooms, and how it sits on its ground. The figure on the right is a study photograph made for this page.';
        var rdPhoto = document.getElementById('rdPhoto');
        rdPhoto.setAttribute('style', photoStyle(book));
        document.getElementById('rdFigcap').textContent = 'Fig. 01 · Study photograph · ' + book.no;
        document.getElementById('rdFacts').textContent = book.read + ' · Visited 12 Oct 2026';

        if (!book.isShelf && book.color) {
          document.body.style.setProperty('--abg', book.color);
          document.body.style.setProperty('--afg', '#171614');
          document.body.style.setProperty('--plate-blend', 'multiply');
        } else {
          document.body.style.removeProperty('--abg');
          document.body.style.removeProperty('--afg');
          document.body.style.setProperty('--plate-blend', 'normal');
        }
        document.title = book.title + ' — Plinth';
      }

      function openReadingDirect(book) {
        populateReadingView(book);
        document.body.classList.add('pln-reading');
        window.scrollTo(0, 0);
      }

      document.querySelectorAll('.pln-toc-link').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.pln-toc-link').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          var target = document.getElementById(btn.getAttribute('data-sec'));
          if (target) target.scrollIntoView({ behavior: motionPaused ? 'auto' : 'smooth', block: 'start' });
        });
      });

      // 3D Book Flight Engine (0-600ms spin to centre, 600-1060ms zoom, 220ms reveal)
      function buildFlightTransform(spec, tMs) {
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var f = ss(Math.min(1, tMs / 600));
        var h = ss(Math.max(0, (tMs - 600) / 460));
        var p = spec.originW / spec.n;
        var m = spec.originH / spec.o;
        var g = Math.min((0.46 * vw) / spec.originW, (0.58 * vh) / spec.originH, 340 / spec.originW);
        var x = lerp(spec.originX, vw * 0.5, f);
        var y = lerp(spec.originY, vh * 0.5, f);
        var K = (Math.floor(spec.yaw0 / (Math.PI * 2)) + 1) * Math.PI * 2;
        var yaw = lerp(spec.yaw0, K, f);
        var pitch = lerp(spec.pitch0, 0, f);
        var rot = lerp(spec.rot0, 0, f);
        var sx = p * lerp(1, g, f);
        var sy = m * lerp(1, g, f);
        var sz = spec.thickness / spec.a;
        var wCov = 1.08 * Math.max((vw + 8) / (spec.n * p * g), (vh + 8) / (spec.o * m * g));
        var zTarget = spec.Pp - spec.thickness * 0.5 - spec.Pp / wCov;
        var z = lerp(spec.tz * (1 - f), zTarget, h);
        var sig = 1 - f;
        var co = 1 - f;
        return {
          co: co,
          transform:
            'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) ' +
            'rotateZ(' + rot.toFixed(4) + 'rad) ' +
            'translate(' + (spec.camX * sig).toFixed(2) + 'px,' + (spec.camY * sig).toFixed(2) + 'px) ' +
            'perspective(' + spec.Pp.toFixed(1) + 'px) ' +
            'translate(' + (-spec.camX * sig).toFixed(2) + 'px,' + (-spec.camY * sig).toFixed(2) + 'px) ' +
            'translate3d(' + (spec.tx * sig).toFixed(2) + 'px,' + (spec.ty * sig).toFixed(2) + 'px,' + z.toFixed(2) + 'px) ' +
            'translate(' + (spec.pivX * sig).toFixed(2) + 'px,' + (spec.pivY * sig).toFixed(2) + 'px) ' +
            'rotateX(' + pitch.toFixed(4) + 'rad) ' +
            'rotateY(' + yaw.toFixed(4) + 'rad) ' +
            'scale3d(' + sx.toFixed(4) + ',' + sy.toFixed(4) + ',' + sz.toFixed(4) + ') ' +
            'translate(' + (-spec.pivX * sig).toFixed(2) + 'px,' + (-spec.pivY * sig).toFixed(2) + 'px)'
        };
      }

      function createFlightOverlay(book, spec) {
        var ov = document.createElement('div');
        ov.className = 'pln-flight-ov';
        ov.setAttribute('role', 'dialog');
        ov.setAttribute('aria-label', 'Opening ' + book.title);
        ov.tabIndex = -1;

        var fl = document.createElement('div');
        fl.className = 'flight';
        fl.style.width = spec.n + 'px';
        fl.style.height = spec.o + 'px';
        fl.style.left = (-spec.n * 0.5) + 'px';
        fl.style.top = (-spec.o * 0.5) + 'px';

        var vol = book.isShelf ? createShelfVolume(book) : createRibbonVolume(book);
        vol.style.setProperty('--w', spec.n + 'px');
        vol.style.setProperty('--h', spec.o + 'px');
        vol.style.setProperty('--t', spec.a + 'px');
        if (book.isShelf) {
          var bgCol = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#111111';
          vol.style.setProperty('--paper', bgCol);
        }
        fl.appendChild(vol);
        ov.appendChild(fl);
        document.body.appendChild(ov);
        return { ov: ov, fl: fl, vol: vol };
      }

      function runOpenFlight(book, spec) {
        history.pushState({ slug: book.slug }, '', '#/b/' + book.slug);
        if (motionPaused) {
          openReadingDirect(book);
          return;
        }
        flyingActive = true;
        var ui = createFlightOverlay(book, spec);
        var startTs = performance.now();

        function step(now) {
          var elapsed = Math.min(1060, now - startTs);
          var st = buildFlightTransform(spec, elapsed);
          ui.fl.style.transform = st.transform;
          ui.vol.style.setProperty('--co', st.co.toFixed(4));
          if (elapsed < 1060) {
            requestAnimationFrame(step);
          } else {
            openReadingDirect(book);
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                ui.ov.classList.add('revealing');
                setTimeout(function () {
                  ui.ov.remove();
                  flyingActive = false;
                }, 220);
              });
            });
          }
        }
        requestAnimationFrame(step);
      }

      function launchRibbonFlight(rec) {
        var gr = galleryEl.getBoundingClientRect();
        var st = rec.state;
        var originX = gr.left + st.x;
        var originY = gr.top + st.y;
        var spec = {
          n: 230, o: 310, a: 26,
          originX: originX,
          originY: originY,
          originW: cardA * st.scale,
          originH: cardL * st.scale,
          yaw0: st.yaw,
          pitch0: st.pitch,
          rot0: st.rot,
          thickness: 26 * st.scale,
          Pp: st.P,
          camX: 0, camY: 0, pivX: 0, pivY: 0, tx: 0, ty: 0, tz: 0
        };
        lastOpenedState = {
          book: rec.book,
          isShelf: false,
          savedScrollY: window.scrollY,
          xFrac: clamp(st.x / Math.max(1, stageU), 0.08, 0.92),
          slot: rec.slot
        };
        hiddenSlot = rec.slot;
        rec.el.classList.add('is-flying-hidden');
        runOpenFlight(rec.book, spec);
      }

      function launchShelfFlight(book, anchorEl, volEl) {
        var rect = anchorEl.getBoundingClientRect();
        var isOpen = openShelfIdx === book.shelfIdx;
        var spec = {
          n: 210, o: book.height, a: 38,
          originX: rect.left + rect.width * 0.5,
          originY: rect.top + rect.height * 0.5,
          originW: isOpen ? 210 : 38,
          originH: book.height,
          yaw0: isOpen ? (-4 * Math.PI / 180) : (Math.PI * 0.5),
          pitch0: 0,
          rot0: 0,
          thickness: 38,
          Pp: 1200,
          camX: 0, camY: book.height * 0.5,
          pivX: 0, pivY: book.height * 0.5,
          tx: 0, ty: 0, tz: isOpen ? 24 : -105
        };
        lastOpenedState = {
          book: book,
          isShelf: true,
          savedScrollY: window.scrollY,
          anchorEl: anchorEl
        };
        runOpenFlight(book, spec);
      }

      function returnToHome() {
        if (!document.body.classList.contains('pln-reading')) return;
        document.title = 'Plinth — Shared Interiors';
        document.body.style.removeProperty('--abg');
        document.body.style.removeProperty('--afg');

        if (motionPaused || !lastOpenedState) {
          document.body.classList.remove('pln-reading');
          hiddenSlot = null;
          if (lastOpenedState) window.scrollTo(0, lastOpenedState.savedScrollY);
          renderRibbon();
          return;
        }

        flyingActive = true;
        var saved = lastOpenedState;
        var book = saved.book;

        // Temporary spec to create zoomed t=1060 state
        var dummySpec = {
          n: book.isShelf ? 210 : 230,
          o: book.isShelf ? book.height : 310,
          a: book.isShelf ? 38 : 26,
          originX: window.innerWidth * 0.5,
          originY: window.innerHeight * 0.5,
          originW: 210,
          originH: 300,
          yaw0: 0.2, pitch0: -0.065, rot0: 0,
          thickness: 26, Pp: 1000,
          camX: 0, camY: 0, pivX: 0, pivY: 0, tx: 0, ty: 0, tz: 0
        };
        var ui = createFlightOverlay(book, dummySpec);
        ui.ov.style.opacity = '0';
        ui.ov.style.transition = 'opacity 0.2s linear';
        var z0 = buildFlightTransform(dummySpec, 1060);
        ui.fl.style.transform = z0.transform;
        ui.vol.style.setProperty('--co', '0');

        requestAnimationFrame(function () {
          ui.ov.style.opacity = '1';
        });

        setTimeout(function () {
          document.body.classList.remove('pln-reading');
          window.scrollTo(0, saved.savedScrollY);
          measureStage();

          var targetSpec;
          if (!saved.isShelf) {
            var N = activeBooks.length || 1;
            var targetX = clamp(saved.xFrac * stageU, 24, stageU - 24);
            var bIdx = Math.max(0, activeBooks.indexOf(book));
            var curPhase = getPhase();
            var baseSlot = Math.round((curPhase + targetX - cardA * 0.5) / spacingT);
            var slot = baseSlot + posMod(bIdx - baseSlot, N);
            var neededPhase = slot * spacingT + cardA * 0.5 - targetX;
            drift += (neededPhase - curPhase);
            hiddenSlot = slot;
            renderRibbon();
            var rec = slotMap.get(slot);
            var gr = galleryEl.getBoundingClientRect();
            var st = rec && rec.state ? rec.state : alongDesktop(targetX);
            targetSpec = {
              n: 230, o: 310, a: 26,
              originX: gr.left + (rec && rec.state ? rec.state.x : targetX),
              originY: gr.top + (rec && rec.state ? rec.state.y : baselineR + st.rise),
              originW: cardA * st.scale,
              originH: cardL * st.scale,
              yaw0: st.yaw,
              pitch0: -0.065,
              rot0: 0,
              thickness: 26 * st.scale,
              Pp: Math.max(900, cardA * st.scale, cardL * st.scale),
              camX: 0, camY: 0, pivX: 0, pivY: 0, tx: 0, ty: 0, tz: 0
            };
          } else {
            var r = saved.anchorEl.getBoundingClientRect();
            var isOpen = openShelfIdx === book.shelfIdx;
            targetSpec = {
              n: 210, o: book.height, a: 38,
              originX: r.left + r.width * 0.5,
              originY: r.top + r.height * 0.5,
              originW: isOpen ? 210 : 38,
              originH: book.height,
              yaw0: isOpen ? (-4 * Math.PI / 180) : (Math.PI * 0.5),
              pitch0: 0, rot0: 0,
              thickness: 38, Pp: 1200,
              camX: 0, camY: book.height * 0.5, pivX: 0, pivY: book.height * 0.5,
              tx: 0, ty: 0, tz: isOpen ? 24 : -105
            };
          }

          var tStart = performance.now();
          function revStep(now) {
            var rElapsed = Math.min(1060, now - tStart);
            var st = buildFlightTransform(targetSpec, 1060 - rElapsed);
            ui.fl.style.transform = st.transform;
            ui.vol.style.setProperty('--co', st.co.toFixed(4));
            if (rElapsed < 1060) {
              requestAnimationFrame(revStep);
            } else {
              ui.ov.remove();
              hiddenSlot = null;
              flyingActive = false;
              renderRibbon();
            }
          }
          requestAnimationFrame(revStep);
        }, 200);
      }

      // Quick Tour button (opens first visible hot card via 3D flight!)
      document.getElementById('plnTourBtn').addEventListener('click', function () {
        var best = null;
        slotMap.forEach(function (rec) {
          if (rec.state && rec.state.hot && (!best || Math.abs(rec.state.x - stageU * 0.55) < Math.abs(best.state.x - stageU * 0.55))) {
            best = rec;
          }
        });
        if (best) {
          launchRibbonFlight(best);
        } else {
          history.pushState({ slug: HERO_BOOKS[0].slug }, '', '#/b/' + HERO_BOOKS[0].slug);
          openReadingDirect(HERO_BOOKS[0]);
        }
      });

      document.querySelectorAll('[data-open-slug]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var b = BY_SLUG[btn.getAttribute('data-open-slug')];
          if (b) {
            history.pushState({ slug: b.slug }, '', '#/b/' + b.slug);
            openReadingDirect(b);
          }
        });
      });

      function handleBackClick(e) {
        if (document.body.classList.contains('pln-reading')) {
          e.preventDefault();
          if (location.hash.indexOf('#/b/') === 0) {
            history.pushState({}, '', '#/');
          }
          returnToHome();
        }
      }
      document.getElementById('plnBackBtn').addEventListener('click', handleBackClick);
      document.getElementById('plnLogo').addEventListener('click', handleBackClick);

      window.addEventListener('popstate', function () {
        var m = location.hash.match(/^#\\/b\\/([a-z0-9-]+)$/);
        if (m && BY_SLUG[m[1]]) {
          openReadingDirect(BY_SLUG[m[1]]);
        } else if (document.body.classList.contains('pln-reading')) {
          returnToHome();
        }
      });

      window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('pln-reading') && !flyingActive) {
          history.pushState({}, '', '#/');
          returnToHome();
        }
      });

      // Boot after fonts ready
      var lastTs = performance.now();
      function mainLoop(now) {
        var dt = Math.min(0.05, Math.max(0, (now - lastTs) / 1000));
        lastTs = now;

        if (!document.body.classList.contains('pln-reading') && heroInView) {
          if (!flyingActive && !motionPaused && !document.hidden) {
            drift += (spacingT * dt) / 10;
          }
          if (Math.abs(wheelPending) > 0.01) {
            var a = -Math.expm1(-12 * dt);
            var nextPending = wheelPending * (1 - a);
            if (Math.abs(nextPending) < 0.01) nextPending = 0;
            wheel += (wheelPending - nextPending);
            wheelPending = nextPending;
          }
          renderRibbon();
        }
        requestAnimationFrame(mainLoop);
      }

      window.addEventListener('resize', function () {
        measureStage();
        renderRibbon();
      });

      var fontReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
      fontReady.then(function () {
        measureStage();
        renderRibbon();
        var initMatch = location.hash.match(/^#\\/b\\/([a-z0-9-]+)$/);
        if (initMatch && BY_SLUG[initMatch[1]]) {
          openReadingDirect(BY_SLUG[initMatch[1]]);
        }
        lastTs = performance.now();
        requestAnimationFrame(mainLoop);
      });
    })();
  <\/script>
</body>
</html>`;
  }

  if (slug === 'curved-reel') {
    return `<!DOCTYPE html>
<html lang="en" data-motion="on">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Norro. — Nordic Film Studio &amp; Curved Showreel</title>
  <meta name="description" content="Norro. is an independent Nordic film production house directing documentary series, coastal portraits, live fjord concerts, and in-house cinema colour.">
  <meta name="theme-color" content="#000000">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #000000;
      --bg-elev: #0b0b0c;
      --fg: #f4f2ee;
      --mute: #6f6d69;
      --line: rgba(244, 242, 238, 0.16);
      --red: #ff2b2b;
      --accent: #ff2b2b;
      --accent-text: #ff5c5c;
      --accent-strong: #d91e1e;
      --on-accent: #ffffff;
      --font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;
      --font-display: "Anton", Impact, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, monospace;
      --ease: cubic-bezier(0.7, 0, 0.2, 1);
      --out: cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    body.light {
      --bg: #f3f2ef;
      --bg-elev: #e8e6e1;
      --fg: #0c0c0c;
      --mute: #76746f;
      --line: rgba(12, 12, 12, 0.14);
      --accent-text: #c91818;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    ::selection {
      background: var(--red);
      color: #ffffff;
    }

    :focus-visible {
      outline: 2px solid var(--red);
      outline-offset: 3px;
    }

    .tabular-nums {
      font-variant-numeric: tabular-nums;
    }

    html, body {
      background: var(--bg);
      color: var(--fg);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: clip;
      transition: background-color 0.6s var(--out), color 0.4s var(--out);
    }

    @media (hover: hover) and (pointer: fine) {
      body.in-stage, body.in-stage button, body.grab, body.grab * {
        cursor: none;
      }
    }

    button {
      font: inherit;
      color: inherit;
      background: transparent;
      border: 0;
      cursor: pointer;
    }
    button:active {
      transform: scale(0.96);
    }

    .skip-link {
      position: absolute;
      left: 16px;
      top: -64px;
      z-index: 200;
      padding: 8px 14px;
      border-radius: 999px;
      background: var(--fg);
      color: var(--bg);
      font-size: 11px;
      font-weight: 500;
      text-decoration: none;
      transition: transform 0.2s var(--out);
    }
    .skip-link:focus {
      transform: translateY(76px);
    }

    .ui {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .big {
      font-family: var(--font-display);
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: -0.005em;
      line-height: 0.9;
    }

    .dots {
      display: grid;
      grid-template-columns: 3px 3px;
      gap: 3px;
    }
    .dots i {
      display: block;
      width: 3px;
      height: 3px;
      background: currentColor;
      border-radius: 50%;
    }

    /* Top Bar */
    header#top {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      height: 54px;
      display: flex;
      align-items: center;
      padding: 0 1.6vw;
      z-index: 30;
      transition: opacity 0.4s var(--out), background-color 0.4s var(--out);
    }
    body.scrolled-past header#top {
      background: color-mix(in srgb, var(--bg) 86%, transparent);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--line);
    }

    .nrr-logo {
      font-family: var(--font-sans);
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.04em;
      margin-right: 4.2vw;
      text-transform: none;
      line-height: 1;
    }

    .nrr-nav {
      display: flex;
      align-items: center;
      gap: 22px;
    }
    .nrr-nav button {
      opacity: 0.45;
      transition: opacity 0.25s var(--out), transform 0.16s var(--out);
    }
    .nrr-nav button.on, .nrr-nav button:hover {
      opacity: 1;
    }

    .nrr-right {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .nrr-lang {
      display: flex;
      gap: 6px;
    }
    .nrr-lang b {
      font-weight: 500;
      opacity: 0.4;
    }
    .nrr-lang b.on {
      opacity: 1;
    }

    .nrr-motion-btn {
      padding: 4px 9px;
      border-radius: 999px;
      border: 1px solid var(--line);
      font-size: 9px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.8;
      transition: opacity 0.2s var(--out), transform 0.16s var(--out);
    }
    .nrr-motion-btn:hover {
      opacity: 1;
    }

    .ico {
      width: 24px;
      height: 24px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      border: 1px solid var(--line);
      transition: border-color 0.25s var(--out), transform 0.2s var(--out);
    }
    .ico:hover {
      border-color: var(--fg);
      transform: scale(1.08);
    }

    /* Curved Cinema Hero Stage */
    .nrr-stage {
      position: relative;
      width: 100%;
      height: 100svh;
      min-height: 620px;
      overflow: hidden;
      background: var(--bg);
      user-select: none;
      -webkit-user-select: none;
    }

    canvas#gl {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      touch-action: pan-y;
      display: block;
    }

    section#home {
      position: absolute;
      inset: 0;
      z-index: 5;
      pointer-events: none;
      transition: opacity 0.4s var(--out);
    }
    body.index section#home {
      opacity: 0;
    }

    #roll {
      position: absolute;
      left: 1.3vw;
      bottom: 2.2vh;
      height: clamp(38px, 7.9vw, 140px);
      overflow: hidden;
    }
    #roll .slide {
      transition: transform 0.55s var(--ease) 0.1s;
    }
    body.out #roll .slide {
      transform: translateY(clamp(42px, 8.4vw, 150px));
      transition: transform 0.5s var(--ease);
    }
    #roll .list {
      transition: transform 1s var(--ease);
      will-change: transform;
    }
    #roll .list span.big {
      display: block;
      font-size: clamp(42px, 8.6vw, 152px);
      height: clamp(38px, 7.9vw, 140px);
      line-height: clamp(38px, 7.9vw, 140px);
      white-space: nowrap;
    }
    body.out #roll .list span.big:not(.cur) {
      visibility: hidden;
    }

    #nx {
      position: absolute;
      right: 1.6vw;
      bottom: 2.4vh;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      transition: transform 0.55s var(--ease) 0.1s;
    }
    body.out #nx {
      transform: translateY(calc(100% + 4vh));
      transition: transform 0.5s var(--ease);
    }
    #nx .lab {
      text-align: right;
      line-height: 1.35;
    }
    #nx .lab > span {
      display: block;
      opacity: 0.5;
      font-size: 8px;
    }
    #nx .lab > b {
      display: block;
      font-weight: 500;
      height: 13px;
      overflow: hidden;
    }
    #nx .lab > b > i {
      display: block;
      font-style: normal;
      transition: transform 0.7s var(--ease);
    }

    .rb {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--fg);
      color: var(--bg);
      display: grid;
      place-items: center;
      pointer-events: auto;
      transition: transform 0.25s var(--out);
    }
    .rb:hover {
      transform: scale(1.15);
    }
    .rb:active {
      transform: scale(0.94);
    }

    /* Case View Overlay */
    section#case {
      position: fixed;
      inset: 0;
      z-index: 25;
      background: var(--bg);
      pointer-events: none;
      clip-path: inset(0 0 100% 0);
      transition: clip-path 0.8s var(--ease), background-color 0.6s var(--out);
    }
    body.case section#case {
      clip-path: inset(0 0 0 0);
      pointer-events: auto;
    }

    #back {
      position: absolute;
      left: 1.6vw;
      top: 19vh;
      opacity: 0;
      transition: opacity 0s linear 0.8s, transform 0.16s var(--out);
    }
    body.case #back {
      opacity: 0.6;
      transition: opacity 0.5s var(--out) 0.85s, transform 0.16s var(--out);
    }
    body.case #back:hover {
      opacity: 1;
    }

    #ctitle {
      position: absolute;
      left: 1.5vw;
      top: 50%;
      transform: translateY(-50%);
      font-size: clamp(24px, 3.4vw, 60px);
      width: 15vw;
    }
    #ctitle .ln {
      display: block;
      overflow: hidden;
    }
    #ctitle .ln > span {
      display: block;
      transform: translateY(105%);
      transition: transform 0s linear 0.8s;
    }
    body.case #ctitle .ln:nth-child(1) > span {
      transform: none;
      transition: transform 0.8s var(--out) 0.62s;
    }
    body.case #ctitle .ln:nth-child(2) > span {
      transform: none;
      transition: transform 0.8s var(--out) 0.72s;
    }

    #gal {
      position: absolute;
      left: 50%;
      top: 0;
      width: 46vw;
      height: 100%;
      margin-left: -23vw;
      transform: translateY(22vh);
      transition: transform 0s linear 0.8s;
    }
    body.case #gal {
      transform: none;
      transition: transform 1.25s var(--out) 0.1s;
    }

    .fr {
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      aspect-ratio: 16 / 9;
      background-size: cover;
      background-repeat: no-repeat;
      overflow: visible;
      transition: transform 1s var(--ease), filter 1s var(--ease), opacity 1s var(--ease);
    }
    .fr-clip {
      position: absolute;
      inset: 0;
      overflow: hidden;
      background-repeat: no-repeat;
    }
    .fr.off {
      filter: blur(16px) brightness(0.42);
      cursor: pointer;
    }
    body.light .fr.off {
      filter: blur(16px) brightness(1.05) saturate(0.6) opacity(0.55);
    }
    .fr video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    #player {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -30px;
      display: flex;
      align-items: center;
      gap: 8px;
      opacity: 0;
      transition: opacity 0s linear 0.8s;
    }
    body.case #player {
      transition: opacity 0.5s var(--out) 1s;
    }
    #player .bar {
      flex: 1 1 auto;
      height: 1px;
      background: var(--line);
      position: relative;
    }
    #player .bar i {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 34%;
      background: var(--fg);
    }

    #cnt {
      position: absolute;
      left: 88.6vw;
      top: 50%;
      transform: translateY(-55%);
      font-size: clamp(20px, 2.5vw, 44px);
      line-height: 1;
      clip-path: inset(100% 0 0 0);
      transition: clip-path 0s linear 0.8s;
    }
    body.case #cnt {
      clip-path: inset(0 0 0 0);
      transition: clip-path 0.8s var(--out) 0.7s;
    }
    #cnt .d {
      height: 1em;
      overflow: hidden;
    }
    #cnt .d-col {
      transition: transform 0.9s var(--ease);
    }
    #cnt .d-col span {
      display: block;
      height: 1em;
    }
    #cnt .tot {
      color: var(--mute);
      margin-top: 0.35vw;
    }

    #rail {
      position: absolute;
      right: -1.4vw;
      top: 50%;
      display: flex;
      flex-direction: column;
      gap: 6px;
      opacity: 0;
      transition: transform 0.9s var(--ease), opacity 0s linear 0.8s;
    }
    body.case #rail {
      opacity: 1;
      transition: transform 0.9s var(--ease), opacity 0.5s var(--out) 0.95s;
    }
    #rail i {
      display: block;
      width: 5.2vw;
      min-width: 54px;
      aspect-ratio: 16 / 9;
      background-repeat: no-repeat;
      filter: brightness(0.4);
      cursor: pointer;
      transition: filter 0.5s var(--out), transform 0.5s var(--out);
    }
    #rail i.on {
      filter: none;
      transform: translateX(-0.8vw);
    }

    #film {
      position: absolute;
      left: 1.6vw;
      bottom: 2.6vh;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 8px;
      opacity: 0;
      transition: opacity 0s linear 0.8s;
    }
    body.case #film {
      opacity: 1;
      transition: opacity 0.5s var(--out) 0.95s;
    }
    #film .rdot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--red);
    }

    #more {
      position: absolute;
      right: 1.6vw;
      bottom: 2.2vh;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0;
      pointer-events: auto;
      transition: opacity 0s linear 0.8s, transform 0.16s var(--out);
    }
    body.case #more {
      opacity: 1;
      transition: opacity 0.5s var(--out) 0.95s, transform 0.16s var(--out);
    }

    /* Read More Card */
    aside#card {
      position: absolute;
      right: 0.6vw;
      top: 13vh;
      bottom: 11vh;
      width: clamp(260px, 21.5vw, 380px);
      background: #ffffff;
      color: #0c0c0c;
      padding: 18px 18px 16px;
      display: flex;
      flex-direction: column;
      z-index: 4;
      transform: translateX(115%);
      transition: transform 0.8s var(--ease);
    }
    body.read aside#card {
      transform: none;
    }
    aside#card .tx {
      flex: 1 1 auto;
      overflow: auto;
      scrollbar-width: thin;
      padding-right: 6px;
    }
    aside#card .cat {
      font-size: 7px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.6;
    }
    aside#card h3.big {
      font-size: clamp(22px, 1.9vw, 34px);
      margin: 6px 0;
    }
    aside#card .redbar {
      width: 40%;
      height: 7px;
      background: var(--red);
      margin-bottom: 8px;
    }
    aside#card .meta {
      font-size: 8.5px;
      line-height: 1.5;
      opacity: 0.7;
      margin-bottom: 12px;
    }
    aside#card .lead {
      font-size: 12px;
      line-height: 1.38;
      margin-bottom: 16px;
    }
    aside#card h4 {
      font-size: 7px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 500;
      margin: 10px 0 6px;
      opacity: 0.7;
    }
    aside#card .tx p {
      font-size: 9px;
      line-height: 1.6;
      opacity: 0.82;
    }
    aside#card .stat {
      border-top: 1px solid #e3e3e3;
      padding-top: 10px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    aside#card .stat-lbl {
      display: block;
      font-size: 7px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.6;
      margin-bottom: 4px;
    }
    aside#card .stat b.big {
      font-size: clamp(24px, 2.3vw, 40px);
    }
    #cardX {
      padding: 6px;
      color: #0c0c0c;
    }

    /* Skewed Infinite Index Overlay */
    section#idx {
      position: fixed;
      inset: 0;
      z-index: 40;
      background: #121212;
      color: #f4f2ee;
      clip-path: inset(0 0 100% 0);
      pointer-events: none;
      transition: clip-path 0.9s var(--ease);
    }
    body.index section#idx {
      clip-path: inset(0 0 0 0);
      pointer-events: auto;
    }
    #xclose {
      position: absolute;
      left: 1.6vw;
      top: 20px;
      z-index: 2;
      padding: 8px;
      color: #f4f2ee;
    }
    #xclose .dots3 {
      display: grid;
      grid-template-columns: 3px 3px 3px;
      gap: 3px;
      transform: rotate(45deg);
    }
    #xclose .dots3 i {
      display: block;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: currentColor;
    }
    #hair {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: 1px;
      background: rgba(255, 43, 43, 0.55);
    }
    #ithumb {
      position: absolute;
      left: 1.6vw;
      top: 50%;
      width: 10.5vw;
      min-width: 110px;
      aspect-ratio: 16 / 9;
      transform: translateY(-50%);
      background-repeat: no-repeat;
    }
    #imeta {
      position: absolute;
      left: 29vw;
      top: 50%;
      transform: translateY(-120%);
      font-size: 7.5px;
      line-height: 1.4;
      opacity: 0.55;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    #ilist {
      position: absolute;
      left: 33vw;
      top: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
    }
    #ilist div[data-i] {
      position: absolute;
      left: 0;
      top: 0;
      font-size: clamp(26px, 4.3vw, 76px);
      line-height: 1;
      height: 4.6vw;
      white-space: nowrap;
      color: #3a3a3a;
      transform-origin: 0 50%;
      cursor: pointer;
      transition: color 0.35s var(--out);
    }
    #ilist div[data-i] > span {
      display: inline-block;
      transform: skewX(-11deg);
      transition: transform 0.5s var(--out);
    }
    #ilist div[data-i].on {
      color: #f4f2ee;
    }
    #ilist div[data-i].on > span {
      transform: skewX(-11deg) translateX(2.2vw);
    }

    /* Custom Red Dot Cursor */
    div#cur {
      position: fixed;
      left: 0;
      top: 0;
      width: 8px;
      height: 8px;
      margin: -4px 0 0 -4px;
      border-radius: 50%;
      background: var(--red);
      z-index: 100;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s var(--out);
    }
    @media (hover: hover) and (pointer: fine) {
      body.has-ptr div#cur {
        opacity: 1;
      }
    }
    div#cur b {
      position: absolute;
      left: 14px;
      top: -4px;
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.08em;
      color: var(--fg);
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.25s var(--out);
    }
    div#cur.lab b {
      opacity: 1;
    }

    /* +20% Below-the-Fold Nordic Studio Monograph & Grade Sections */
    .nrr-wrap {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 3.2vw;
    }
    .nrr-sec {
      padding: clamp(64px, 8vw, 112px) 0;
      border-top: 1px solid var(--line);
      background: var(--bg);
    }
    .nrr-sec-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }
    .nrr-kicker {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--mute);
      margin-bottom: 12px;
    }
    .nrr-kicker::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--red);
    }
    .nrr-h2 {
      font-size: clamp(36px, 5.2vw, 84px);
    }
    .nrr-lede {
      max-width: 440px;
      font-size: 14px;
      line-height: 1.6;
      color: var(--mute);
    }

    .nrr-roster-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }
    .nrr-work-card {
      border: 1px solid var(--line);
      background: var(--bg-elev);
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.6s var(--out), transform 0.6s var(--out), border-color 0.25s var(--out);
    }
    .nrr-work-card.is-in {
      opacity: 1;
      transform: none;
    }
    .nrr-work-card:hover {
      border-color: var(--fg);
    }
    .nrr-work-thumb {
      width: 100%;
      aspect-ratio: 16 / 9;
      background-repeat: no-repeat;
      border-bottom: 1px solid var(--line);
    }
    .nrr-work-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8px;
    }
    .nrr-work-title {
      font-size: clamp(24px, 2.2vw, 34px);
    }
    .nrr-work-stat {
      font-family: var(--font-display);
      font-size: 20px;
      color: var(--accent-text);
    }
    .nrr-work-desc {
      font-size: 13px;
      line-height: 1.55;
      color: var(--mute);
    }
    .nrr-work-foot {
      padding-top: 12px;
      border-top: 1px solid var(--line);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nrr-open-case-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border: 1px solid var(--line);
      transition: border-color 0.2s var(--out), transform 0.16s var(--out);
    }
    .nrr-open-case-btn:hover {
      border-color: var(--fg);
    }

    .nrr-grade-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }
    .nrr-spec-box {
      padding: 24px;
      border: 1px solid var(--line);
      background: var(--bg-elev);
    }
    .nrr-spec-val {
      font-size: clamp(32px, 3.6vw, 56px);
      margin: 10px 0 8px;
    }
    .nrr-spec-p {
      font-size: 13px;
      line-height: 1.6;
      color: var(--mute);
    }

    footer.nrr-foot {
      border-top: 1px solid var(--line);
      padding: 32px 0 44px;
      background: var(--bg);
    }
    .nrr-foot-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    @keyframes nrrPulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.45; transform: scale(0.82); }
    }
    #film .rdot {
      animation: nrrPulseDot 2.2s ease-in-out infinite;
    }

    @media (max-width: 960px) {
      .nrr-roster-grid, .nrr-grade-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      #gal {
        width: 64vw;
        margin-left: -32vw;
      }
      #ctitle {
        top: 12vh;
        transform: none;
        width: auto;
      }
      #cnt {
        left: auto;
        right: 8vw;
      }
    }

    @media (max-width: 640px) {
      .nrr-roster-grid, .nrr-grade-grid {
        grid-template-columns: 1fr;
      }
      .nrr-lang {
        display: none;
      }
      #gal {
        width: 84vw;
        margin-left: -42vw;
      }
      #rail {
        display: none;
      }
      #ilist {
        left: 6vw;
      }
      #ithumb, #imeta {
        display: none;
      }
    }
  </style>
</head>
<body class="in-stage">
  <a class="skip-link" href="#main">Skip to main content</a>

  <header id="top">
    <h1 class="nrr-logo">Norro.</h1>
    <nav class="nrr-nav ui" aria-label="Studio navigation">
      <button type="button" class="on" id="navHome">Home</button>
      <button type="button" id="navAbout">About</button>
      <button type="button" id="navWorks">Works</button>
    </nav>
    <div class="nrr-right ui">
      <span class="nrr-lang" aria-label="Language"><b class="on">EN</b><b>FI</b></span>
      <button type="button" class="nrr-motion-btn" id="motionToggleBtn" aria-pressed="false">Motion: ON</button>
      <button type="button" class="ico" id="btnTheme" aria-label="Theme">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3A9 9 0 0 0 12 21Z" fill="currentColor"></path>
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"></circle>
        </svg>
      </button>
      <button type="button" class="ico" id="btnIndex" aria-label="Index">
        <span class="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      </button>
    </div>
  </header>

  <main id="main">
    <section class="nrr-stage" id="reelStage" aria-label="Curved cinema showreel">
      <canvas id="gl" aria-label="Interactive curved 16:9 Nordic film reel"></canvas>

      <section id="home" aria-label="Active film controls">
        <div id="roll" aria-live="polite">
          <div class="slide">
            <div class="list" id="rollList"></div>
          </div>
        </div>

        <div id="nx" class="ui">
          <div class="lab">
            <span>Next</span>
            <b><i id="nextLabTxt">The Last Light</i></b>
          </div>
          <button type="button" class="rb" id="bNext" data-next-preview="true" aria-label="Next project">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 5L16 12L8 19" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
          <button type="button" class="rb" id="bPrev" aria-label="Previous project">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M16 5L8 12L16 19" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
        </div>
      </section>
    </section>

    <section class="nrr-sec" id="worksArchive" aria-label="Selected Nordic productions">
      <div class="nrr-wrap">
        <div class="nrr-sec-head">
          <div>
            <div class="nrr-kicker ui">Archive 2023 — 2025</div>
            <h2 class="nrr-h2 big">Six Northern Commissions</h2>
          </div>
          <p class="nrr-lede">Directed by Norro. Cinematography, location sound, edit, and cinema colour finished in house across Helsinki, Bergen, and Narvik.</p>
        </div>
        <div class="nrr-roster-grid" id="nrrRosterGrid"></div>
      </div>
    </section>

    <section class="nrr-sec" id="aboutMonograph" aria-label="Studio craft and colour pipeline">
      <div class="nrr-wrap">
        <div class="nrr-sec-head">
          <div>
            <div class="nrr-kicker ui">In-House Pipeline</div>
            <h2 class="nrr-h2 big">Norro. Grade &amp; Field Sound</h2>
          </div>
          <p class="nrr-lede">Every commission is shot with small winter-ready crews using practical harbour sodium, lighthouse Fresnel optics, and multi-track field arrays.</p>
        </div>
        <div class="nrr-grade-grid">
          <article class="nrr-spec-box">
            <span class="ui">Concave Projection</span>
            <div class="nrr-spec-val big tabular-nums">1.90 RAD</div>
            <p class="nrr-spec-p">Calibrated for curved screening rooms and wide-gamut DCP masters with zero artificial LUT clipping in night-shift sodium highlights.</p>
          </article>
          <article class="nrr-spec-box">
            <span class="ui">Acoustic Capture</span>
            <div class="nrr-spec-val big tabular-nums">40 CH</div>
            <p class="nrr-spec-p">Distributed deck-to-bridge microphone rigs engineered for live fjord crossings, shipyard hulls, and overnight Arctic rail carriages.</p>
          </article>
          <article class="nrr-spec-box">
            <span class="ui">Audience Reach</span>
            <div class="nrr-spec-val big tabular-nums">3.5M+</div>
            <p class="nrr-spec-p">Combined documentary streams, 31 international festival selections, and public heritage commissions across the Nordic coast.</p>
          </article>
        </div>
      </div>
    </section>
  </main>

  <section id="case" aria-label="Project case study">
    <button type="button" id="back" class="ui">Back</button>
    <h2 id="ctitle" class="big"></h2>
    <div id="gal"></div>
    <div id="cnt" class="big tabular-nums">
      <div class="d"><div class="d-col" id="cntCol"></div></div>
      <div class="tot">08</div>
    </div>
    <div id="rail"></div>
    <div id="film" class="ui"><span>Open film</span><i class="rdot" aria-hidden="true"></i></div>
    <button type="button" id="more">
      <span>Read more</span>
      <span class="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    </button>

    <aside id="card" aria-label="Project dossier">
      <div class="tx" id="cardTx"></div>
      <div class="stat">
        <div>
          <span class="stat-lbl" id="cardStatLbl">Views</span>
          <b class="big tabular-nums" id="cardStatVal">2.4M</b>
        </div>
        <button type="button" id="cardX" aria-label="Close">
          <span class="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        </button>
      </div>
    </aside>
  </section>

  <section id="idx" aria-label="All projects index">
    <button type="button" id="xclose" aria-label="Close index">
      <span class="dots3" aria-hidden="true">
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      </span>
    </button>
    <div id="hair" aria-hidden="true"></div>
    <div id="ithumb" aria-hidden="true"></div>
    <div id="imeta" class="tabular-nums"></div>
    <div id="ilist" class="big"></div>
  </section>

  <div id="cur" aria-hidden="true"><b id="curTxt"></b></div>

  <footer class="nrr-foot">
    <div class="nrr-wrap nrr-foot-row ui">
      <span>Norro. Nordic Film Studio — Helsinki · Bergen</span>
      <span class="tabular-nums">2023 — 2026 · Colour at Norro. Grade</span>
    </div>
  </footer>

  <script>
    (function () {
      'use strict';

      var SHEET = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_070809_9454266a-bcc7-474e-854a-bc5770e5ceb3.png&w=3840&q=88';
      var VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_070920_ba374cc6-355a-4d14-84c6-1d40d14db660.mp4';

      var SW = 3840, SH = 2160;
      var CX = [4, 972, 1932, 2891];
      var CW = [945, 937, 936, 945];
      var CY = [4, 551, 1088, 1617];
      var CH = [524, 514, 506, 539];

      function cellRect(k) {
        var col = k % 4;
        var row = Math.floor(k / 4);
        return [CX[col], CY[row], CW[col], CH[row]];
      }

      var PROJECTS = [
        {
          t: 'Night Harbour',
          c: [1, 0, 2, 3],
          cat: 'Documentary · Series · 6 episodes',
          year: '2025',
          client: 'Coastal Film Fund',
          stat: '2.4M',
          sl: 'Views',
          lead: 'Night Harbour follows the last night-shift fishing crews of a northern port for one winter, from the first frost to the spring thaw.',
          s1: 'We embedded with three crews for four months and shot only between dusk and dawn, letting the sodium lamps, neon and work lights set the palette of the whole series.',
          s2: 'Each episode is built around one object on the boat. A net, a rope, a radio, a lamp. Small things that carry a family history and a disappearing way of life.'
        },
        {
          t: 'The Last Light',
          c: [4, 5],
          cat: 'Short film · Commission',
          year: '2024',
          client: 'Northern Heritage Trust',
          stat: '31',
          sl: 'Festivals',
          lead: 'A portrait of the final lighthouse keeper on the coast, recorded during his last month before the tower went fully automatic.',
          s1: 'The film was lit almost entirely by the beam itself, timed to its eight-second rotation.',
          s2: 'One location, one voice, no score until the very last minute.'
        },
        {
          t: 'Salt & Iron',
          c: [6, 7],
          cat: 'Brand film · Campaign',
          year: '2024',
          client: 'Varvet Shipyards',
          stat: '+64%',
          sl: 'Applications',
          lead: 'A recruitment campaign for a century-old shipyard, made with the welders, riggers and painters who build its hulls.',
          s1: 'Every role in the film is played by the person who actually does the job.',
          s2: 'Shot on the night shift, when the dock is loudest and the sparks are brightest.'
        },
        {
          t: 'Northbound',
          c: [8, 9],
          cat: 'Documentary · Feature',
          year: '2023',
          client: 'Rail North',
          stat: '1.1M',
          sl: 'Streams',
          lead: 'Twelve passengers, one overnight train, eleven hundred kilometres of snow. A feature-length journey told from inside the carriages.',
          s1: 'We rode the line twenty-two times to cast the people on board.',
          s2: 'The edit follows the timetable minute by minute, station to station.'
        },
        {
          t: 'Quiet Machines',
          c: [10, 11],
          cat: 'Podcast · Video series',
          year: '2023',
          client: 'Tekno Archive',
          stat: '48',
          sl: 'Episodes',
          lead: 'Conversations with the engineers who keep old machines alive, from analog studios to the cold halls of the internet.',
          s1: 'Every episode is recorded on the machine it is about.',
          s2: 'Long takes, real sound, no music beds.'
        },
        {
          t: 'Ferry Songs',
          c: [12, 13, 14, 15],
          cat: 'Music film · Live',
          year: '2025',
          client: 'Fjord Line Arts',
          stat: '100 000€+',
          sl: 'Raised',
          lead: 'A youth choir, a cellist and a ferry crossing the fjord at night. A live concert filmed in one continuous voyage.',
          s1: 'The ferry kept its normal timetable. Passengers became the audience.',
          s2: 'Recorded with forty microphones spread from the car deck to the bridge.'
        }
      ];

      var CREDITS = 'Directed by Norro. Cinematography, sound and edit in house. Colour at Norro. Grade.';
      var PSTART = [0, 4, 6, 8, 10, 12];
      var TILES = [];
      var TILE_PROJ = [];
      PROJECTS.forEach(function (p, pi) {
        p.c.forEach(function (cellIdx) {
          TILES.push(cellIdx);
          TILE_PROJ.push(pi);
        });
      });

      function posMod(a, m) { return ((a % m) + m) % m; }
      function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }
      function wrapNear(c, ref) { return c + Math.round((ref - c) / 16) * 16; }

      // Crop helper for CSS backgrounds
      function applyCropBg(el, cellK, targetW) {
        var r = cellRect(cellK);
        var w = Math.max(80, targetW || window.innerWidth * 0.46);
        var h = w * 9 / 16;
        var sx = w / r[2];
        var sy = h / r[3];
        el.style.backgroundImage = 'url(' + SHEET + ')';
        el.style.backgroundSize = (SW * sx).toFixed(1) + 'px ' + (SH * sy).toFixed(1) + 'px';
        el.style.backgroundPosition = (-r[0] * sx).toFixed(1) + 'px ' + (-r[1] * sy).toFixed(1) + 'px';
      }

      // Build Procedural Atmospheric Nordic Cinema Contact Sheet (instant frame-0 fallback before remote 4K WebP decodes)
      function makeProceduralSheet() {
        var pc = document.createElement('canvas');
        pc.width = 1920;
        pc.height = 1080;
        var ctx = pc.getContext('2d');
        ctx.fillStyle = '#050608';
        ctx.fillRect(0, 0, 1920, 1080);
        var palettes = [
          ['#08131f', '#1c3b57', '#f59e0b'],
          ['#0b1520', '#274c6b', '#fbbf24'],
          ['#1a100c', '#432818', '#fb923c'],
          ['#0d1624', '#334e68', '#e2e8f0'],
          ['#111615', '#2a3b36', '#a3e635'],
          ['#0b1021', '#26355d', '#f43f5e']
        ];
        for (var k = 0; k < 16; k++) {
          var cr = cellRect(k);
          var x = cr[0] * 0.5, y = cr[1] * 0.5, w = cr[2] * 0.5, h = cr[3] * 0.5;
          var pIdx = TILE_PROJ[Math.max(0, TILES.indexOf(k))];
          var pal = palettes[pIdx % palettes.length];
          var g = ctx.createLinearGradient(x, y, x, y + h);
          g.addColorStop(0, pal[0]);
          g.addColorStop(0.62, pal[1]);
          g.addColorStop(1, '#060709');
          ctx.fillStyle = g;
          ctx.fillRect(x, y, w, h);

          // Horizon & sodium/lighthouse glow
          var rg = ctx.createRadialGradient(x + w * (0.32 + (k % 3) * 0.18), y + h * 0.56, 4, x + w * 0.5, y + h * 0.56, w * 0.48);
          rg.addColorStop(0, pal[2]);
          rg.addColorStop(0.28, pal[1]);
          rg.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.globalAlpha = 0.65;
          ctx.fillStyle = rg;
          ctx.fillRect(x, y, w, h);
          ctx.globalAlpha = 1;

          // Silhouette horizon + water reflections
          ctx.fillStyle = 'rgba(4,6,10,0.82)';
          ctx.fillRect(x, y + h * 0.64, w, h * 0.36);
          ctx.fillStyle = pal[2];
          for (var s = 0; s < 9; s++) {
            ctx.globalAlpha = 0.22 - s * 0.02;
            var rw = w * (0.16 - s * 0.012);
            ctx.fillRect(x + w * 0.42 - rw * 0.5 + ((k * 17 + s * 9) % 24), y + h * (0.66 + s * 0.032), rw, 2);
          }
          ctx.globalAlpha = 1;
        }
        return pc;
      }

      // Motion toggle & Theme toggle
      var motionPaused = false;
      var motionBtn = document.getElementById('motionToggleBtn');
      motionBtn.addEventListener('click', function () {
        motionPaused = !motionPaused;
        document.documentElement.setAttribute('data-motion', motionPaused ? 'paused' : 'on');
        motionBtn.setAttribute('aria-pressed', motionPaused ? 'true' : 'false');
        motionBtn.textContent = motionPaused ? 'Motion: OFF' : 'Motion: ON';
        if (motionPaused) {
          try { reelVid.pause(); } catch (e) {}
        } else {
          try { reelVid.play().catch(function () {}); } catch (e) {}
        }
      });

      document.getElementById('btnTheme').addEventListener('click', function () {
        document.body.classList.toggle('light');
      });

      // Build Title Roller (3 copies x 6 = 18 lines)
      var rollList = document.getElementById('rollList');
      var rollSpans = [];
      for (var copy = 0; copy < 3; copy++) {
        for (var pi = 0; pi < 6; pi++) {
          var sp = document.createElement('span');
          sp.className = 'big';
          sp.textContent = PROJECTS[pi].t;
          rollList.appendChild(sp);
          rollSpans.push(sp);
        }
      }

      var rollI = 6;
      var rollSnapTimer = 0;
      function applyRollTransform(idx, immediate) {
        if (immediate) {
          rollList.style.transition = 'none';
        } else {
          rollList.style.transition = '';
        }
        var stepH = rollSpans[0] ? rollSpans[0].getBoundingClientRect().height : (window.innerWidth * 0.079);
        rollList.style.transform = 'translateY(' + (-idx * stepH).toFixed(2) + 'px)';
        rollSpans.forEach(function (el, k) {
          el.classList.toggle('cur', k === idx);
        });
        if (immediate) {
          void rollList.offsetHeight;
          rollList.style.transition = '';
        }
      }

      function setRoll(i, dir) {
        var target = 6 + i;
        if (dir > 0 && target < rollI) target += 6;
        else if (dir < 0 && target > rollI) target -= 6;
        rollI = target;
        applyRollTransform(rollI, motionPaused);
        clearTimeout(rollSnapTimer);
        rollSnapTimer = setTimeout(function () {
          if (rollI !== 6 + i) {
            rollI = 6 + i;
            applyRollTransform(rollI, true);
          }
        }, 1050);
      }

      // Next label roll
      var nextLabTxt = document.getElementById('nextLabTxt');
      var nextSwapTimer = 0;
      function setNext(i) {
        var nextTitle = PROJECTS[(i + 1) % 6].t;
        if (motionPaused) {
          nextLabTxt.textContent = nextTitle;
          return;
        }
        nextLabTxt.style.transform = 'translateY(-110%)';
        clearTimeout(nextSwapTimer);
        nextSwapTimer = setTimeout(function () {
          nextLabTxt.textContent = nextTitle;
          nextLabTxt.style.transition = 'none';
          nextLabTxt.style.transform = 'translateY(110%)';
          void nextLabTxt.offsetHeight;
          nextLabTxt.style.transition = '';
          nextLabTxt.style.transform = 'none';
        }, 350);
      }

      // Build Below-the-Fold Roster Cards
      var rosterGrid = document.getElementById('nrrRosterGrid');
      PROJECTS.forEach(function (p, idx) {
        var art = document.createElement('article');
        art.className = 'nrr-work-card';
        var thumb = document.createElement('div');
        thumb.className = 'nrr-work-thumb';
        applyCropBg(thumb, p.c[0], 380);
        art.innerHTML =
          '<div class="nrr-work-top">' +
            '<h3 class="nrr-work-title big">' + p.t + '</h3>' +
            '<span class="nrr-work-stat tabular-nums">' + p.stat + '</span>' +
          '</div>' +
          '<p class="nrr-work-desc">' + p.lead + '</p>' +
          '<div class="nrr-work-foot ui">' +
            '<span class="tabular-nums">' + p.year + ' · ' + p.client + '</span>' +
            '<button type="button" class="nrr-open-case-btn ui" data-case-idx="' + idx + '">Case Study ↗</button>' +
          '</div>';
        art.insertBefore(thumb, art.firstChild);
        rosterGrid.appendChild(art);
      });

      if ('IntersectionObserver' in window) {
        var cardObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) en.target.classList.add('is-in');
          });
        }, { threshold: 0.12 });
        document.querySelectorAll('.nrr-work-card').forEach(function (c) { cardObserver.observe(c); });
      } else {
        document.querySelectorAll('.nrr-work-card').forEach(function (c) { c.classList.add('is-in'); });
      }

      // WebGL2 Concave Cylinder Setup
      var cv = document.getElementById('gl');
      var stageEl = document.getElementById('reelStage');
      var gl = cv.getContext('webgl2', { antialias: false, premultipliedAlpha: false });
      var fallback2d = !gl ? cv.getContext('2d') : null;
      var procCanvas = makeProceduralSheet();
      var sheetImgLoaded = null;

      var reelVid = document.createElement('video');
      reelVid.crossOrigin = 'anonymous';
      reelVid.muted = true;
      reelVid.loop = true;
      reelVid.playsInline = true;
      reelVid.src = VIDEO;
      try { reelVid.play().catch(function () {}); } catch (e) {}

      var prog = null, texSheet = null, texVid = null, uLocs = {};
      if (gl) {
        var vsSrc = ['#version 300 es', 'in vec2 aPos;', 'void main(){gl_Position=vec4(aPos,0.0,1.0);}'].join('\\n');
        var fsSrc = [
          '#version 300 es',
          'precision highp float;',
          'uniform vec2 uRes;',
          'uniform float uPos, uTheta, uH, uCy, uK, uTW, uVidOn;',
          'uniform vec3 uBg;',
          'uniform sampler2D uSheet;',
          'uniform sampler2D uVid;',
          'uniform vec4 uCell[16];',
          'uniform float uIsVid[16];',
          'out vec4 fragColor;',
          'vec3 sampleTile(float s, float v) {',
          '  float fl = floor(s);',
          '  float f = fract(s);',
          '  int id = int(mod(mod(fl, 16.0) + 16.0, 16.0));',
          '  if (uIsVid[id] > 0.5 && uVidOn > 0.5) {',
          '    return texture(uVid, vec2(f, clamp(v, 0.0, 1.0))).rgb;',
          '  }',
          '  vec4 c = uCell[id];',
          '  return texture(uSheet, c.xy + vec2(f, clamp(v, 0.0, 1.0)) * c.zw).rgb;',
          '}',
          'void main() {',
          '  vec2 fc = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);',
          '  float halfW = uRes.x * 0.5;',
          '  float x = (fc.x - halfW) / halfW;',
          '  float ax = abs(x);',
          '  float tT = tan(max(uTheta, 0.001));',
          '  float th = atan(x * tT);',
          '  float spx = (th / tT) * halfW;',
          '  float s = uPos + spx / uTW;',
          '  float hhPix = uH * mix(1.0, 1.0 / cos(th), uK);',
          '  float v = (fc.y - uCy) / (2.0 * hhPix) + 0.5;',
          '  float feather = 0.006 + ax * ax * 0.16;',
          '  float m = smoothstep(0.0, feather, v) * smoothstep(0.0, feather, 1.0 - v);',
          '  if (m <= 0.0001) {',
          '    fragColor = vec4(uBg, 1.0);',
          '    return;',
          '  }',
          '  float r = pow(ax, 2.4) * 0.06 * uK;',
          '  vec3 col = vec3(0.0);',
          '  for (int k = -4; k <= 4; k++) {',
          '    float o = float(k) * 0.25;',
          '    col += sampleTile(s + o * r, clamp(v + o * r * 0.6, 0.0, 1.0));',
          '  }',
          '  col /= 9.0;',
          '  col *= mix(1.0, 0.55, ax * ax * uK);',
          '  fragColor = vec4(mix(uBg, col, m), 1.0);',
          '}'
        ].join('\\n');

        function compileShader(type, src) {
          var sh = gl.createShader(type);
          gl.shaderSource(sh, src);
          gl.compileShader(sh);
          return sh;
        }
        prog = gl.createProgram();
        gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vsSrc));
        gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fsSrc));
        gl.linkProgram(prog);
        gl.useProgram(prog);

        var vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        var buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        var aPosLoc = gl.getAttribLocation(prog, 'aPos');
        gl.enableVertexAttribArray(aPosLoc);
        gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

        // Upload Procedural Sheet immediately into Texture 0 so frame 0 is vibrant
        texSheet = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texSheet);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, procCanvas);
        gl.generateMipmap(gl.TEXTURE_2D);

        // Texture 1 for live video
        texVid = gl.createTexture();
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texVid);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));

        // Static uniforms
        var cellData = new Float32Array(16 * 4);
        var vidFlags = new Float32Array(16);
        for (var ti = 0; ti < 16; ti++) {
          var cr = cellRect(TILES[ti]);
          cellData[ti * 4 + 0] = cr[0] / SW;
          cellData[ti * 4 + 1] = cr[1] / SH;
          cellData[ti * 4 + 2] = cr[2] / SW;
          cellData[ti * 4 + 3] = cr[3] / SH;
          vidFlags[ti] = ti === 0 ? 1.0 : 0.0;
        }
        gl.uniform4fv(gl.getUniformLocation(prog, 'uCell'), cellData);
        gl.uniform1fv(gl.getUniformLocation(prog, 'uIsVid'), vidFlags);
        gl.uniform1i(gl.getUniformLocation(prog, 'uSheet'), 0);
        gl.uniform1i(gl.getUniformLocation(prog, 'uVid'), 1);

        ['uRes', 'uPos', 'uTheta', 'uH', 'uCy', 'uK', 'uTW', 'uVidOn', 'uBg'].forEach(function (nm) {
          uLocs[nm] = gl.getUniformLocation(prog, nm);
        });
      }

      // Load high-res 3840x2160 SHEET
      var sheetImg = new Image();
      sheetImg.crossOrigin = 'anonymous';
      sheetImg.onload = function () {
        sheetImgLoaded = sheetImg;
        if (gl && texSheet) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texSheet);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sheetImg);
          gl.generateMipmap(gl.TEXTURE_2D);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        }
      };
      sheetImg.src = SHEET;

      var W = window.innerWidth, H = window.innerHeight, dpr = 1;
      function resizeStage() {
        var sr = stageEl.getBoundingClientRect();
        W = Math.max(320, sr.width || window.innerWidth);
        H = Math.max(520, sr.height || window.innerHeight);
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        cv.width = Math.round(W * dpr);
        cv.height = Math.round(H * dpr);
        if (gl) gl.viewport(0, 0, cv.width, cv.height);
        applyRollTransform(rollI, true);
        layoutCaseGallery();
      }
      window.addEventListener('resize', resizeStage);

      // Reel State & Physics
      var pos = 0.5, tgt = 0.5, cur = 0, mode = 'home', prevMode = 'home';
      var lastIn = 0, ref = null;
      var shaderBg = [0, 0, 0];

      function startGesture() {
        if (ref === null) ref = wrapNear(PSTART[cur] + 0.5, pos);
      }

      function settle(x) {
        var r = ref !== null ? ref : x;
        var d = x - r;
        if (Math.abs(d) < 0.18) return r;
        var best = null, bestDist = Infinity;
        for (var i = 0; i < 6; i++) {
          var c = wrapNear(PSTART[i] + 0.5, x);
          if ((c - r) * d > 0.01) {
            var dist = Math.abs(c - x);
            if (dist < bestDist) { bestDist = dist; best = c; }
          } else {
            var cShift = c + (d > 0 ? 16 : -16);
            if ((cShift - r) * d > 0.01) {
              var dist2 = Math.abs(cShift - x);
              if (dist2 < bestDist) { bestDist = dist2; best = cShift; }
            }
          }
        }
        return best !== null ? best : r;
      }

      function goP(i) {
        ref = null;
        var wrapped = posMod(i, 6);
        tgt = wrapNear(PSTART[wrapped] + 0.5, pos);
        if (motionPaused) pos = tgt;
      }

      document.getElementById('bNext').addEventListener('click', function () { goP(cur + 1); });
      document.getElementById('bPrev').addEventListener('click', function () { goP(cur - 1); });

      // Drag & Central Click on Canvas
      var dragging = false, dragStartX = 0, dragStartTgt = 0, dragMoved = 0, dragLastX = 0, dragLastT = 0, dragVel = 0;
      cv.addEventListener('pointerdown', function (e) {
        if (mode !== 'home') return;
        dragging = true;
        try { cv.setPointerCapture(e.pointerId); } catch (err) {}
        ref = null;
        startGesture();
        dragStartX = dragLastX = e.clientX;
        dragStartTgt = tgt;
        dragMoved = 0;
        dragLastT = performance.now();
        dragVel = 0;
        document.body.classList.add('grab');
      });
      cv.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var now = performance.now();
        var dx = e.clientX - dragStartX;
        dragMoved = Math.max(dragMoved, Math.abs(dx));
        var dtMs = Math.max(1, now - dragLastT);
        var inst = (e.clientX - dragLastX) / dtMs;
        dragVel = dragVel * 0.6 + inst * 0.4;
        dragLastX = e.clientX;
        dragLastT = now;
        var tilePx = H * 0.49 * (16 / 9);
        tgt = dragStartTgt - dx / tilePx;
        pos += (tgt - pos) * 0.65;
        lastIn = now;
      });
      function endDrag(e) {
        if (!dragging) return;
        dragging = false;
        document.body.classList.remove('grab');
        if (dragMoved < 6) {
          ref = null;
          var sr = stageEl.getBoundingClientRect();
          var lx = e.clientX - sr.left;
          var ly = e.clientY - sr.top;
          if (mode === 'home' && Math.abs(lx - W * 0.5) < 0.3 * W && ly > 0.18 * H && ly < 0.78 * H) {
            openCase(cur);
          }
        } else {
          var tilePx = H * 0.49 * (16 / 9);
          tgt -= (dragVel * 260) / tilePx;
          tgt = settle(tgt);
          ref = null;
          lastIn = 0;
        }
      }
      cv.addEventListener('pointerup', endDrag);
      cv.addEventListener('pointercancel', endDrag);

      // Custom Cursor
      var curEl = document.getElementById('cur');
      var curTxt = document.getElementById('curTxt');
      window.addEventListener('pointermove', function (e) {
        document.body.classList.add('has-ptr');
        curEl.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
        var sr = stageEl.getBoundingClientRect();
        var inStage = e.clientY >= sr.top && e.clientY <= sr.bottom;
        document.body.classList.toggle('in-stage', inStage || mode !== 'home');
        var lx = e.clientX - sr.left;
        var ly = e.clientY - sr.top;
        var inHit = mode === 'home' && inStage && Math.abs(lx - W * 0.5) < 0.3 * W && ly > 0.18 * H && ly < 0.78 * H;
        curEl.classList.toggle('lab', inHit);
        curTxt.textContent = inHit ? 'View project' : '';
      });

      window.addEventListener('scroll', function () {
        document.body.classList.toggle('scrolled-past', window.scrollY > 40);
      }, { passive: true });

      // Case View & Vertical Filmstrip
      var galEl = document.getElementById('gal');
      var railEl = document.getElementById('rail');
      var cntCol = document.getElementById('cntCol');
      var ctitleEl = document.getElementById('ctitle');
      var cardTx = document.getElementById('cardTx');
      var gi = 0, caseFrames = [], caseThumbs = [], playerEl = null, caseWheelLock = 0;

      for (var d = 1; d <= 8; d++) {
        var spD = document.createElement('span');
        spD.textContent = '0' + d;
        cntCol.appendChild(spD);
      }

      function buildCase(i) {
        var p = PROJECTS[i];
        gi = 0;
        var cells = p.c.slice();
        var pCursor = (i + 1) % 6;
        while (cells.length < 8) {
          var nextC = PROJECTS[pCursor].c;
          for (var nc = 0; nc < nextC.length && cells.length < 8; nc++) {
            cells.push(nextC[nc]);
          }
          pCursor = (pCursor + 1) % 6;
        }

        // Two-line split title
        var words = p.t.split(/\\s+/);
        var half = Math.ceil(words.length / 2);
        var l1 = words.slice(0, half).join(' ');
        var l2 = words.slice(half).join(' ');
        ctitleEl.innerHTML = '<span class="ln"><span>' + l1 + '</span></span>' +
          (l2 ? '<span class="ln"><span>' + l2 + '</span></span>' : '');

        galEl.innerHTML = '';
        railEl.innerHTML = '';
        caseFrames = [];
        caseThumbs = [];
        playerEl = null;

        cells.forEach(function (cIdx, j) {
          var fr = document.createElement('div');
          fr.className = 'fr' + (j === 0 ? '' : ' off');
          var clip = document.createElement('div');
          clip.className = 'fr-clip';
          applyCropBg(clip, cIdx, window.innerWidth * 0.46);
          fr.appendChild(clip);

          if (i === 0 && j === 0) {
            var cvid = document.createElement('video');
            cvid.crossOrigin = 'anonymous';
            cvid.muted = true;
            cvid.loop = true;
            cvid.playsInline = true;
            cvid.src = VIDEO;
            if (!motionPaused) {
              try { cvid.play().catch(function () {}); } catch (e) {}
            }
            clip.appendChild(cvid);

            var pl = document.createElement('div');
            pl.id = 'player';
            pl.className = 'ui';
            pl.innerHTML =
              '<svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">' +
                '<rect x="2" y="1.5" width="2.6" height="9" fill="currentColor"></rect>' +
                '<rect x="7.4" y="1.5" width="2.6" height="9" fill="currentColor"></rect>' +
              '</svg>' +
              '<span>Pause</span>' +
              '<span class="bar"><i></i></span>' +
              '<svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">' +
                '<path d="M7.5 1.5H10.5V4.5M4.5 10.5H1.5V7.5M10.5 1.5L6.8 5.2M1.5 10.5L5.2 6.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"></path>' +
              '</svg>';
            fr.appendChild(pl);
            playerEl = pl;
          }

          fr.addEventListener('click', function () {
            if (gi !== j) { gi = j; layoutCaseGallery(); }
          });
          galEl.appendChild(fr);
          caseFrames.push({ fr: fr, clip: clip, cell: cIdx });

          var th = document.createElement('i');
          if (j === 0) th.className = 'on';
          applyCropBg(th, cIdx, Math.max(54, window.innerWidth * 0.052));
          th.addEventListener('click', function () {
            gi = j;
            layoutCaseGallery();
          });
          railEl.appendChild(th);
          caseThumbs.push({ el: th, cell: cIdx });
        });

        cardTx.innerHTML =
          '<div class="cat">' + p.cat + '</div>' +
          '<h3 class="big">' + p.t + '</h3>' +
          '<div class="redbar"></div>' +
          '<div class="meta">Year ' + p.year + '<br>Client ' + p.client + '</div>' +
          '<p class="lead">' + p.lead + '</p>' +
          '<h4>Strategy</h4>' +
          '<p>' + p.s1 + ' ' + p.s1 + '</p>' +
          '<h4>Storytelling</h4>' +
          '<p>' + p.s2 + ' ' + p.s2 + '</p>' +
          '<h4>Credits</h4>' +
          '<p>' + CREDITS + '</p>';
        document.getElementById('cardStatLbl').textContent = p.sl;
        document.getElementById('cardStatVal').textContent = p.stat;

        layoutCaseGallery();
      }

      function layoutCaseGallery() {
        if (!caseFrames.length) return;
        var galW = galEl.getBoundingClientRect().width || (window.innerWidth * 0.46);
        var fh = galW * 9 / 16;
        var gap = window.innerHeight * 0.07;
        caseFrames.forEach(function (item, j) {
          applyCropBg(item.clip, item.cell, galW);
          item.fr.style.marginTop = (-fh * 0.5).toFixed(1) + 'px';
          item.fr.style.transform = 'translateY(' + ((j - gi) * (fh + gap)).toFixed(1) + 'px)';
          item.fr.classList.toggle('off', j !== gi);
        });
        if (playerEl) {
          playerEl.style.opacity = gi === 0 ? '1' : '0';
        }
        cntCol.style.transform = 'translateY(' + (-gi * 100 / 8).toFixed(4) + '%)';

        var thumbW = Math.max(54, window.innerWidth * 0.052);
        var thStep = thumbW * 9 / 16 + 6;
        railEl.style.transform = 'translateY(' + (-gi * thStep - thStep * 0.5).toFixed(1) + 'px)';
        caseThumbs.forEach(function (t, j) {
          applyCropBg(t.el, t.cell, thumbW);
          t.el.classList.toggle('on', j === gi);
        });
      }

      function caseStep(d) {
        var next = clamp(gi + d, 0, 7);
        if (next === gi) return;
        gi = next;
        layoutCaseGallery();
      }

      function openCase(i) {
        if (mode !== 'home') return;
        mode = 'opening';
        cur = posMod(i, 6);
        tgt = wrapNear(PSTART[cur] + 0.5, pos);
        buildCase(cur);
        document.body.classList.add('out');
        setTimeout(function () {
          document.body.classList.add('case');
        }, motionPaused ? 0 : 330);
        setTimeout(function () {
          mode = 'case';
        }, motionPaused ? 20 : 1250);
      }

      function closeCase() {
        if (mode !== 'case') return;
        document.body.classList.remove('read');
        mode = 'closing';
        document.body.classList.remove('case');
        setTimeout(function () {
          document.body.classList.remove('out');
        }, motionPaused ? 0 : 620);
        setTimeout(function () {
          mode = 'home';
        }, motionPaused ? 20 : 1150);
      }

      document.getElementById('back').addEventListener('click', closeCase);
      document.getElementById('more').addEventListener('click', function () {
        document.body.classList.add('read');
      });
      document.getElementById('cardX').addEventListener('click', function () {
        document.body.classList.remove('read');
      });

      document.querySelectorAll('[data-case-idx]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var idx = parseInt(btn.getAttribute('data-case-idx'), 10) || 0;
          window.scrollTo({ top: 0, behavior: motionPaused ? 'auto' : 'smooth' });
          goP(idx);
          setTimeout(function () {
            if (mode === 'home') openCase(idx);
          }, motionPaused ? 10 : 380);
        });
      });

      // Skewed Infinite Index Overlay
      var ilistEl = document.getElementById('ilist');
      var ithumbEl = document.getElementById('ithumb');
      var imetaEl = document.getElementById('imeta');
      var idxItems = [];
      var idxT = 0, idxV = 0, idxHigh = -1;

      for (var ic = 0; ic < 18; ic++) {
        (function (k) {
          var pIdx = k % 6;
          var d = document.createElement('div');
          d.setAttribute('data-i', String(pIdx));
          var sp = document.createElement('span');
          sp.textContent = PROJECTS[pIdx].t;
          d.appendChild(sp);
          d.addEventListener('pointermove', function () {
            var r = d.getBoundingClientRect();
            var cy = r.top + r.height * 0.5;
            idxT += ((cy - window.innerHeight * 0.5) / Math.max(24, window.innerHeight * 0.046)) * 0.08;
          });
          d.addEventListener('click', function () {
            selectFromIndex(pIdx);
          });
          ilistEl.appendChild(d);
          idxItems.push(d);
        })(ic);
      }

      function syncIndexHighlight(a) {
        if (a === idxHigh) return;
        idxHigh = a;
        var p = PROJECTS[a];
        applyCropBg(ithumbEl, p.c[0], Math.max(110, window.innerWidth * 0.105));
        imetaEl.innerHTML = p.cat.split(' · ')[0] + '<br>' + p.year;
      }

      function updateIndexLayout() {
        var lh = Math.max(32, window.innerWidth * 0.046);
        idxV += motionPaused ? (idxT - idxV) : (idxT - idxV) * 0.12;
        var a = posMod(Math.round(idxV), 6);
        syncIndexHighlight(a);
        var vh = window.innerHeight;
        for (var k = 0; k < 18; k++) {
          var raw = k - idxV - 6;
          var y = posMod(raw + 9, 18) - 9;
          var py = vh * 0.5 + y * lh - lh * 0.5;
          idxItems[k].style.transform = 'translateY(' + py.toFixed(2) + 'px)';
          var isOn = (k % 6 === a) && Math.abs(y * lh) < 0.6 * lh;
          idxItems[k].classList.toggle('on', isOn);
        }
      }

      function openIndex() {
        if (mode === 'index') return;
        document.body.classList.remove('read');
        prevMode = mode === 'case' ? 'case' : 'home';
        mode = 'index';
        idxT = cur;
        idxV = cur;
        idxHigh = -1;
        updateIndexLayout();
        document.body.classList.add('index');
      }

      function closeIndex() {
        if (mode !== 'index') return;
        document.body.classList.remove('index');
        mode = prevMode;
      }

      function selectFromIndex(selectedIdx) {
        document.body.classList.remove('index');
        if (prevMode === 'case') {
          document.body.classList.remove('case', 'out', 'read');
        }
        mode = 'home';
        goP(selectedIdx);
      }

      document.getElementById('btnIndex').addEventListener('click', openIndex);
      document.getElementById('navWorks').addEventListener('click', openIndex);
      document.getElementById('xclose').addEventListener('click', closeIndex);
      document.getElementById('navHome').addEventListener('click', function () {
        if (mode === 'index') closeIndex();
        if (mode === 'case') closeCase();
        window.scrollTo({ top: 0, behavior: motionPaused ? 'auto' : 'smooth' });
      });
      document.getElementById('navAbout').addEventListener('click', function () {
        if (mode === 'index') closeIndex();
        if (mode === 'case') closeCase();
        var ab = document.getElementById('aboutMonograph');
        if (ab) ab.scrollIntoView({ behavior: motionPaused ? 'auto' : 'smooth' });
      });

      // Wheel & Keyboard Routing
      window.addEventListener('wheel', function (e) {
        if (mode === 'case') {
          if (document.body.classList.contains('read')) return;
          if (Math.abs(e.deltaY) < 4) return;
          var now = performance.now();
          if (now - caseWheelLock < 750) return;
          caseWheelLock = now;
          caseStep(e.deltaY > 0 ? 1 : -1);
          return;
        }
        if (mode === 'index') {
          idxT += e.deltaY * 0.006;
          return;
        }
        if (mode === 'home' && (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey)) {
          startGesture();
          var dom = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
          tgt += dom * 0.0032;
          lastIn = performance.now();
        }
      }, { passive: true });

      window.addEventListener('keydown', function (e) {
        if (mode === 'home') {
          if (e.key === 'ArrowRight') { e.preventDefault(); goP(cur + 1); }
          else if (e.key === 'ArrowLeft') { e.preventDefault(); goP(cur - 1); }
          else if (e.key === 'Enter' && document.activeElement === document.body) { openCase(cur); }
        } else if (mode === 'case') {
          if (e.key === 'ArrowDown') { e.preventDefault(); caseStep(1); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); caseStep(-1); }
          else if (e.key === 'Escape') {
            if (document.body.classList.contains('read')) document.body.classList.remove('read');
            else closeCase();
          }
        } else if (mode === 'index') {
          if (e.key === 'ArrowDown') { e.preventDefault(); idxT += 1; }
          else if (e.key === 'ArrowUp') { e.preventDefault(); idxT -= 1; }
          else if (e.key === 'Escape') { closeIndex(); }
          else if (e.key === 'Enter') { selectFromIndex(posMod(Math.round(idxV), 6)); }
        }
      });

      // 2D Fallback Renderer (in case WebGL2 is unavailable)
      function drawFallback2d() {
        if (!fallback2d) return;
        var isLight = document.body.classList.contains('light');
        fallback2d.fillStyle = isLight ? '#f3f2ef' : '#000000';
        fallback2d.fillRect(0, 0, cv.width, cv.height);
        var src = sheetImgLoaded || procCanvas;
        var scaleSrc = sheetImgLoaded ? 1 : 0.5;
        var hh = 0.245 * cv.height;
        var cy = 0.455 * cv.height;
        var tw = 2 * hh * (16 / 9);
        for (var off = -2; off <= 2; off++) {
          var ti = Math.floor(pos) + off;
          var id = posMod(ti, 16);
          var cr = cellRect(TILES[id]);
          var xCenter = cv.width * 0.5 + (ti + 0.5 - pos) * tw;
          fallback2d.drawImage(
            src,
            cr[0] * scaleSrc, cr[1] * scaleSrc, cr[2] * scaleSrc, cr[3] * scaleSrc,
            xCenter - tw * 0.5, cy - hh, tw, hh * 2
          );
        }
      }

      // Main Render Loop
      var lastFrame = performance.now();
      function loop(now) {
        var dt = Math.min(0.05, Math.max(0.001, (now - lastFrame) / 1000));
        lastFrame = now;

        if (mode === 'home' && !dragging && ref !== null && now - lastIn > 380) {
          tgt = settle(tgt);
          ref = null;
        }

        if (motionPaused) {
          pos = tgt;
        } else {
          pos += (tgt - pos) * (1 - Math.exp(-5.5 * dt));
        }

        var activeTile = posMod(Math.floor(pos), 16);
        var aProj = TILE_PROJ[activeTile];
        if (aProj !== cur) {
          var diff = posMod(aProj - cur, 6);
          var dir = diff <= 3 ? 1 : -1;
          cur = aProj;
          setRoll(aProj, dir);
          setNext(aProj);
        }

        var targetBg = document.body.classList.contains('light') ? [0.953, 0.949, 0.937] : [0, 0, 0];
        var bgStep = Math.min(1, dt * 5);
        shaderBg[0] += (targetBg[0] - shaderBg[0]) * bgStep;
        shaderBg[1] += (targetBg[1] - shaderBg[1]) * bgStep;
        shaderBg[2] += (targetBg[2] - shaderBg[2]) * bgStep;

        if (gl && prog) {
          gl.useProgram(prog);
          var vidReady = reelVid.readyState >= 2 ? 1.0 : 0.0;
          if (vidReady > 0.5 && !motionPaused) {
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, texVid);
            try {
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, reelVid);
            } catch (e) {}
          }
          var ratio = cv.width / Math.max(1, W);
          var hh = 0.245 * H * ratio;
          var cy = 0.455 * H * ratio;
          var tw = 2 * hh * (16 / 9);

          gl.uniform2f(uLocs.uRes, cv.width, cv.height);
          gl.uniform1f(uLocs.uPos, pos);
          gl.uniform1f(uLocs.uTheta, 0.95);
          gl.uniform1f(uLocs.uH, hh);
          gl.uniform1f(uLocs.uCy, cy);
          gl.uniform1f(uLocs.uK, 1.0);
          gl.uniform1f(uLocs.uTW, tw);
          gl.uniform1f(uLocs.uVidOn, vidReady);
          gl.uniform3f(uLocs.uBg, shaderBg[0], shaderBg[1], shaderBg[2]);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        } else {
          drawFallback2d();
        }

        if (mode === 'index') {
          updateIndexLayout();
        }

        requestAnimationFrame(loop);
      }

      window.__nr = {
        goP: goP,
        openCase: openCase,
        closeCase: closeCase,
        openIndex: openIndex,
        closeIndex: closeIndex,
        caseStep: caseStep,
        more: function () { document.body.classList.add('read'); },
        get cur() { return cur; },
        get mode() { return mode; }
      };

      resizeStage();
      setRoll(0, 1);
      requestAnimationFrame(loop);
    })();
  <\/script>
</body>
</html>`;
  }

  return '';
}
