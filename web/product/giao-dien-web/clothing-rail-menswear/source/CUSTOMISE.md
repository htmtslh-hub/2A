# Customisation Guide — Maestiq Menswear Rail (`v1.0.0`)

This guide covers customising **Maestiq Menswear Rail** (`clothing-rail-menswear`) in 10 structured steps, 12 copy-ready AI prompts, and a counted literal edit map.

---

## 10-Step Customisation Walkthrough

1. **Update Brand Title & Meta Description (`index.html`):**
   Open `index.html` and replace `MAESTIQ ATELIER - Interactive 3D Clothing Rail & Seasonal Edit` with your fashion house or showroom title.
2. **Edit Garment Catalog & 3-Angle Cutouts (`src/components/ui/demo.tsx`):**
   Update `RAIL_DEMO_ITEMS` with your own product IDs, names, prices (`tag`), fabric descriptions, and 3-angle cutout WebP URLs (`image`, `backImage`, `sideImage`).
3. **Configure Hanger Material (`src/components/ui/demo.tsx` & `src/App.tsx`):**
   Set the `hanger` prop on `<ClothingRailHero />` to `"wood"`, `"matte"`, or `"none"` (when garment cutouts already include a hanger hook).
4. **Tune 3D Rail Physics & Dimensions (`src/components/ui/product-rail-gallery.tsx`):**
   Adjust `PERSPECTIVE` (`1100`), `REST` angle (`-70`), `MAX_H` (`400`), or spring damping parameters inside `product-rail-gallery.tsx`.
5. **Customise Material Chapters (`src/App.tsx`):**
   Edit `MATERIAL_CHAPTERS` (`TEX-01`, `TEX-02`, `TEX-03`) with your mill origins, GSM/momme weights, and linked `pieceIds`.
6. **Adjust Sizing Matrix & Category Filters (`src/App.tsx`):**
   Update `SIZES` and `FilterCategory` tabs in `src/App.tsx` to match your seasonal collection.
7. **Update Typography & Theme Tokens (`src/index.css`):**
   Customise `--background`, `--foreground`, `--card`, and font families (`Cormorant Garamond`, `Inter`, `JetBrains Mono`) in `src/index.css`.
8. **Connect Shopping Bag Checkout (`src/App.tsx`):**
   Wire the shopping bag drawer CTA in `src/App.tsx` to your Shopify Storefront API, Stripe Checkout, or order webhook.
9. **Toggle Autoplay & Interval Speed (`src/components/ui/demo.tsx`):**
   Pass `autoplay={true}` and `interval={3200}` to `<ClothingRailHero />` to control automatic front-facing garment rotation.
10. **Rebuild Production Bundle (`dist/`):**
    Run `npm install && npm run build` to type-check with TypeScript and emit the production bundle into `dist/`.

---

## 12 Copy-Ready AI Prompts

1. **Replace Rail Items with a Capsule Collection:**
   > "Update `RAIL_DEMO_ITEMS` in `src/components/ui/demo.tsx` with our 10 new autumn capsule garments, keeping 3-angle front/back/side WebP paths and price tags."
2. **Connect Shopping Bag to Stripe Checkout:**
   > "In `src/App.tsx`, connect the bag checkout button to POST `BagItem[]` to `/api/checkout` and redirect to the returned Stripe session URL."
3. **Add Currency Switcher (USD / EUR / VND):**
   > "Add a currency selector in the top navbar of `src/App.tsx` that converts garment hang-tag prices and bag subtotals between USD, EUR, and VND."
4. **Add Color Swatch Picker Inside 3D Detail Modal:**
   > "Extend `RailGarment` in `src/components/ui/product-rail-gallery.tsx` with a `variants` array so visitors can switch colorways while inspecting a lifted garment."
5. **Change Editorial Display Font to Playfair Display:**
   > "Update `index.html` and `src/index.css` to load Google Font `Playfair Display` for editorial headings while keeping `Inter` and `JetBrains Mono` for specs."
6. **Localise Storefront UI into Vietnamese:**
   > "Translate navigation links, rail instructions, filter tabs, material chapters, and bag drawer labels in `src/App.tsx` and `src/components/ui/demo.tsx` into Vietnamese."
7. **Add Size Guide Measurement Table Modal:**
   > "In `src/App.tsx`, add a tabbed chest/waist/length measurement chart inside the Size Guide modal with cm/inch conversion."
8. **Persist Shopping Bag in localStorage:**
   > "Sync `bagItems` state in `src/App.tsx` with `localStorage.getItem('maestiq_bag_v1')` so selected garments persist across page reloads."
9. **Add Keyboard Shortcut Hints to Rail Stage:**
   > "Render a subtle keyboard hint pill under `[data-stage]` showing `← / →` to browse hangers and `Enter` to lift the active garment."
10. **Enable Default Dark Atelier Theme:**
    > "Initialize the theme state in `src/App.tsx` to `'dark'` so the showroom opens in obsidian evening mode by default."
11. **Add Fabric Zoom Loupe on Material Cards:**
    > "Add a 2x hover/tap magnifier loupe on the macro textile images inside the `MATERIAL_CHAPTERS` section of `src/App.tsx`."
12. **Export Standalone Embeddable Rail Widget:**
    > "Create a secondary Vite build entry that exports `ClothingRailHero` as a standalone web component `<maestiq-clothing-rail>`."

---

## Counted Literal Edit Map

| File | Literal String | Count | Purpose |
| :--- | :--- | :---: | :--- |
| `index.html` | `MAESTIQ ATELIER - Interactive 3D Clothing Rail & Seasonal Edit` | 0 | Document title in index.html |
