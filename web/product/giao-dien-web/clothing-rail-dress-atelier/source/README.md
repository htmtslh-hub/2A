# MAESTIQ DRESS ATELIER — Interactive 3D Dress Rail Web Storefront

A standalone **React + TypeScript + Tailwind CSS v4 + shadcn/ui** web application built around the interactive 3D `ClothingRailHero` component (`src/components/ui/product-rail-gallery.tsx`) and `DressRailHeroDemo` (`src/components/ui/demo.tsx`).

## Project Structure (shadcn/ui Convention)

```text
clothing-rail-web/
├── components.json                          # shadcn CLI configuration
├── index.html                               # Entry HTML with Cormorant Garamond, Inter & JetBrains Mono
├── package.json                             # Dependencies (react, lucide-react, tailwindcss v4, clsx, tailwind-merge)
├── tsconfig.json                            # TypeScript config with @/* -> ./src/* path alias
├── vite.config.ts                           # Vite + @tailwindcss/vite + @ path alias
└── src/
    ├── index.css                            # Tailwind CSS v4 + shadcn theme variables (:root & .dark)
    ├── main.tsx                             # React DOM root
    ├── App.tsx                              # Multi-section dress atelier storefront integrating ClothingRailHero
    ├── lib/
    │   └── utils.ts                         # cn() class merging helper
    └── components/
        └── ui/
            ├── product-rail-gallery.tsx     # ClothingRailHero 3D spring-physics dress rail component
            └── demo.tsx                     # RAIL_DEMO_ITEMS (10 atelier dresses) & DressRailHeroDemo
```

### Why `/components/ui` is Important
In a **shadcn/ui** codebase, placing reusable UI primitives and interactive blocks inside `src/components/ui` (aliased to `@/components/ui`) keeps atomic UI components cleanly separated from page-level layouts and business logic, and allows the `shadcn` CLI (`npx shadcn@latest add ...`) to resolve imports consistently via `components.json`.

## Quick Start

```bash
cd clothing-rail-web
npm install
npm run dev
```

To type-check and build the production bundle:

```bash
npm run build
```
