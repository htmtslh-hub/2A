"use client";

import ClothingRailHero from "@/components/ui/product-rail-gallery";
import type { RailGarment } from "@/components/ui/product-rail-gallery";

export const RAIL_DEMO_ITEMS: RailGarment[] = [
  {
    id: "silk-slip-champagne",
    name: "Bias-cut silk slip · Champagne",
    kind: "slip",
    color: "#F3E5D8",
    trim: "#D9C3B0",
    image: "./dresses/silk-slip-champagne-front.webp",
    backImage: "./dresses/silk-slip-champagne-back.webp",
    sideImage: "./dresses/silk-slip-champagne-side.webp",
    tag: "$180",
    description: "19-momme Mulberry silk charmeuse cut on a 45-degree bias with a soft cowl neckline.",
    details: ["19-momme silk", "Bias cut", "Adjustable straps"],
  },
  {
    id: "velvet-gown-noir",
    name: "Column evening gown · Obsidian",
    kind: "gown",
    color: "#1B1A1E",
    trim: "#0E0D10",
    image: "./dresses/velvet-gown-noir-front.webp",
    backImage: "./dresses/velvet-gown-noir-back.webp",
    sideImage: "./dresses/velvet-gown-noir-side.webp",
    tag: "$340",
    description: "Floor-length sculpted column gown with an off-shoulder bateau neckline and sweeping train.",
    details: ["Silk-rayon velvet", "Bateau neck", "Floor-length train"],
  },
  {
    id: "corset-midi-rose",
    name: "Corset A-line midi · Dusty Rose",
    kind: "midi",
    color: "#D8A1A6",
    trim: "#B87D83",
    image: "./dresses/corset-midi-rose-front.webp",
    backImage: "./dresses/corset-midi-rose-back.webp",
    sideImage: "./dresses/corset-midi-rose-side.webp",
    tag: "$220",
    description: "Princess-seamed bodice with internal boning and a full box-pleated poplin midi skirt.",
    details: ["Organic poplin", "Boned bodice", "Side seam pockets"],
  },
  {
    id: "wrap-emerald",
    name: "Surplice wrap dress · Emerald",
    kind: "wrap",
    color: "#1C5C47",
    trim: "#134232",
    image: "./dresses/wrap-emerald-front.webp",
    backImage: "./dresses/wrap-emerald-back.webp",
    sideImage: "./dresses/wrap-emerald-side.webp",
    tag: "$210",
    description: "Fluid crepe de chine wrap silhouette with flutter kimono sleeves and a self-tie waist ribbon.",
    details: ["Crepe de chine", "Self-tie sash", "Tulip hem"],
  },
  {
    id: "pleated-marigold",
    name: "Sunray pleated maxi · Marigold",
    kind: "pleated",
    color: "#DF9A3B",
    trim: "#B87822",
    image: "./dresses/pleated-marigold-front.webp",
    backImage: "./dresses/pleated-marigold-back.webp",
    sideImage: "./dresses/pleated-marigold-side.webp",
    tag: "$260",
    description: "Hand-set accordion sunray pleats radiating from a high halter neckline down to the ankle.",
    details: ["300-fold plissé", "Halter neck", "Smocked waist"],
  },
  {
    id: "blazer-dress-ivory",
    name: "Double-breasted blazer dress · Ivory",
    kind: "blazer-dress",
    color: "#EFECE4",
    trim: "#C4B9A5",
    image: "./dresses/blazer-dress-ivory-front.webp",
    backImage: "./dresses/blazer-dress-ivory-back.webp",
    sideImage: "./dresses/blazer-dress-ivory-side.webp",
    tag: "$290",
    description: "Architectural peak-lapel tailored blazer dress in virgin wool hopsack with horn buttons.",
    details: ["Virgin wool", "6 horn buttons", "Peak lapels"],
  },
  {
    id: "slip-wisteria",
    name: "Cowl-back midi slip · Wisteria",
    kind: "slip",
    color: "#B9A6D4",
    trim: "#9A84B8",
    image: "./dresses/slip-wisteria-front.webp",
    backImage: "./dresses/slip-wisteria-back.webp",
    sideImage: "./dresses/slip-wisteria-side.webp",
    tag: "$195",
    description: "Liquid satin midi dress in muted wisteria with a low draped back and French seams.",
    details: ["Heavy satin", "Low cowl back", "French seams"],
  },
  {
    id: "midi-terracotta",
    name: "Structured sundress · Terracotta",
    kind: "midi",
    color: "#B85A43",
    trim: "#93422E",
    image: "./dresses/midi-terracotta-front.webp",
    backImage: "./dresses/midi-terracotta-back.webp",
    sideImage: "./dresses/midi-terracotta-side.webp",
    tag: "$175",
    description: "Sun-washed European flax linen midi dress with wide shoulder straps and a cinched waist.",
    details: ["100% European linen", "Square neck", "A-line flare"],
  },
  {
    id: "gown-midnight",
    name: "Draped opera gown · Midnight",
    kind: "gown",
    color: "#1D2C48",
    trim: "#111B2E",
    image: "./dresses/gown-midnight-front.webp",
    backImage: "./dresses/gown-midnight-back.webp",
    sideImage: "./dresses/gown-midnight-side.webp",
    tag: "$380",
    description: "Deep midnight duchesse satin evening gown with sculpted hip draping and an open V-back.",
    details: ["Duchesse satin", "Open V-back", "Hand-rolled hem"],
  },
  {
    id: "pleated-celadon",
    name: "Plissé halter dress · Celadon",
    kind: "pleated",
    color: "#8FA893",
    trim: "#6E8772",
    image: "./dresses/pleated-celadon-front.webp",
    backImage: "./dresses/pleated-celadon-back.webp",
    sideImage: "./dresses/pleated-celadon-side.webp",
    tag: "$240",
    description: "Weightless celadon georgette with micro-pleated tiers that move like water with every step.",
    details: ["Silk georgette", "Micro-plissé", "Keyhole back"],
  },
];

export default function DressRailHeroDemo({ autoplay = true }: { autoplay?: boolean }) {
  return (
    <div data-rail-demo className="flex min-h-svh w-full items-center justify-center bg-background text-foreground">
      <ClothingRailHero
        items={RAIL_DEMO_ITEMS}
        hanger="none"
        eyebrow="Atelier Evening & Daywear · Ten dresses on the rail"
        heading="An atelier dress rail you can browse, right on the page."
        caption="Brush along the rail, slide a wooden hanger, lift a dress to inspect the back drape."
        autoplay={autoplay}
        action={
          <button type="button" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none">
            Explore the dress edit
          </button>
        }
      />
    </div>
  );
}
