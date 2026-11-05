import * as React from "react";
import {
  ShoppingBag,
  Sparkles,
  Layers,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  Trash2,
  X,
  Sun,
  Moon,
  Rotate3d,
  Ruler,
  ShieldCheck,
  Eye,
  Play,
  Pause,
  Menu,
  Search,
} from "lucide-react";
import ClothingRailHero, {
  type RailGarment,
} from "@/components/ui/product-rail-gallery";
import { RAIL_DEMO_ITEMS } from "@/components/ui/demo";

type GarmentSize = "S" | "M" | "L" | "XL";
type AngleView = "front" | "back" | "side";
type FilterCategory = "all" | "tee" | "knit-hoodie" | "shirt";
type SortOrder = "rail" | "price-asc" | "price-desc";
type VisualMode = "photo" | "vector-wood";

interface BagItem {
  id: string;
  garment: RailGarment;
  size: GarmentSize;
  quantity: number;
  unitPrice: number;
}

const SIZES: GarmentSize[] = ["S", "M", "L", "XL"];

function parsePrice(tag?: string): number {
  if (!tag) return 60;
  const num = Number(tag.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) && num > 0 ? num : 60;
}

const MATERIAL_CHAPTERS = [
  {
    id: "organic-jersey",
    code: "TEX-01 · 240 GSM",
    title: "240 GSM Compact Organic Combed Jersey",
    subtitle: "Ring-spun long-staple cotton · Enzyme washed for a dry, structured handfeel",
    description:
      "Knitted tightly on 20-gauge circular machines in Barcelos, Portugal. The 240 gsm density holds a clean boxy drape off the shoulder without clinging, finished with a 1×1 ribbed collar that resists torque after repeated washes.",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=80",
    metrics: [
      { label: "Fabric Weight", value: "240 g/m²" },
      { label: "Yarn Count", value: "24/1 Carded Organic" },
      { label: "Shrinkage", value: "< 1.5% Pre-shrunk" },
    ],
    pieceIds: ["bone-tee", "cc-graphic", "oversized-ochre", "breton"],
  },
  {
    id: "brushed-fleece",
    code: "TEX-02 · 400 GSM",
    title: "400 GSM Three-End Brushed Loopback Fleece",
    subtitle: "Heavyweight diagonal-weave cotton · High-loft brushed interior",
    description:
      "Engineered for architectural volume. A dense 100% cotton face yarn shields against wind while the triple-brushed fleece backing traps warmth. Paired with high-density 480 gsm coverstitched rib cuffs and raised puff-ink wordmarks.",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
    metrics: [
      { label: "Fabric Weight", value: "400 g/m²" },
      { label: "Rib Trim", value: "480 g/m² 2×2 Lycra" },
      { label: "Construction", value: "Flatlock Double Seam" },
    ],
    pieceIds: ["hoodie-heather", "sweat-lilac"],
  },
  {
    id: "lambswool-oxford",
    code: "TEX-03 · HERITAGE WEAVE",
    title: "Scottish 5-Gauge Lambswool & Basketweave Oxford",
    subtitle: "Mulesing-free Geelong wool · Turned olive-wood buttons & 2-ply pinpoint cotton",
    description:
      "Our knitwear and shirting balance tactile warmth with crisp tailoring. The olive cardigan is fully fashioned from two-ply lambswool with natural turned wooden buttons, designed to layer effortlessly over our pale sky button-down Oxford.",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80",
    metrics: [
      { label: "Wool Gauge", value: "5GG 2-Ply Lambswool" },
      { label: "Hardware", value: "Natural Olive Wood" },
      { label: "Shirting Weave", value: "165 g/m² Pinpoint Oxford" },
    ],
    pieceIds: ["cardigan-olive", "oxford-sky", "polo-forest", "henley-brick"],
  },
];

const CURATED_LOOKS = [
  {
    id: "look-01",
    number: "LOOK 01",
    title: "The Studio Layering Uniform",
    mood: "Tactile neutrals · Morning studio to late gallery opening",
    note: "Layer the chunky olive lambswool cardigan over the crisp sky Oxford shirt, keeping the 240 gsm bone heavyweight tee as a breathable base.",
    itemIds: ["bone-tee", "oxford-sky", "cardigan-olive"],
  },
  {
    id: "look-02",
    number: "LOOK 02",
    title: "Monolith & Heather Archive",
    mood: "Relaxed proportions · High-density screen & puff typography",
    note: "Pair the 400 gsm Maestiq heather hoodie with the CCgather black graphic tee and muted lilac fleece crewneck for tonal contrast.",
    itemIds: ["cc-graphic", "hoodie-heather", "sweat-lilac"],
  },
  {
    id: "look-03",
    number: "LOOK 03",
    title: "Coastal Texture & Earth Tones",
    mood: "Sun-washed pigments · Slub jersey, piqué knit & boat-neck stripes",
    note: "Combines the ink-and-bone Breton stripe long sleeve with our forest piqué polo, dusty brick slub-cotton henley, and boxy ochre tee.",
    itemIds: ["breton", "polo-forest", "henley-brick", "oversized-ochre"],
  },
];

const SIZING_MATRIX = [
  {
    silhouette: "Heavyweight & Oversized Tees",
    fit: "Boxy / Dropped Shoulder",
    chestCm: [54, 57, 60, 63],
    lengthCm: [70, 72, 74, 76],
    shoulderCm: [50, 52, 54, 56],
  },
  {
    silhouette: "Oxford Shirt & Piqué Polo",
    fit: "Tailored Regular Fit",
    chestCm: [53, 56, 59, 62],
    lengthCm: [73, 75, 77, 79],
    shoulderCm: [46, 48, 50, 52],
  },
  {
    silhouette: "Lambswool Cardigan & Henley",
    fit: "Relaxed Layering Cut",
    chestCm: [56, 59, 62, 65],
    lengthCm: [68, 70, 72, 74],
    shoulderCm: [49, 51, 53, 55],
  },
  {
    silhouette: "400 GSM Hoodie & Crewneck",
    fit: "Architectural Oversized",
    chestCm: [59, 62, 65, 68],
    lengthCm: [69, 71, 73, 75],
    shoulderCm: [55, 57, 59, 61],
  },
];

export default function App() {
  const [dark, setDark] = React.useState(false);
  const [visualMode, setVisualMode] = React.useState<VisualMode>("photo");
  const [autoplay, setAutoplay] = React.useState(true);
  const [motionPaused, setMotionPaused] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  // Filter & Grid state
  const [category, setCategory] = React.useState<FilterCategory>("all");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("rail");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [cardAngles, setCardAngles] = React.useState<Record<string, AngleView>>({});
  const [cardSizes, setCardSizes] = React.useState<Record<string, GarmentSize>>({});
  const [justAddedId, setJustAddedId] = React.useState<string | null>(null);

  // Materiality & Sizing state
  const [activeChapterIdx, setActiveChapterIdx] = React.useState(0);
  const [unit, setUnit] = React.useState<"cm" | "in">("cm");

  // Bag state
  const [bagOpen, setBagOpen] = React.useState(false);
  const [bag, setBag] = React.useState<BagItem[]>(() => [
    {
      id: "bone-tee:M",
      garment: RAIL_DEMO_ITEMS[0],
      size: "M",
      quantity: 1,
      unitPrice: parsePrice(RAIL_DEMO_ITEMS[0].tag),
    },
    {
      id: "cardigan-olive:L",
      garment: RAIL_DEMO_ITEMS[3],
      size: "L",
      quantity: 1,
      unitPrice: parsePrice(RAIL_DEMO_ITEMS[3].tag),
    },
  ]);
  const [checkoutDone, setCheckoutDone] = React.useState(false);
  const [newsletterEmail, setNewsletterEmail] = React.useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = React.useState(false);
  const [selectedRailIndex, setSelectedRailIndex] = React.useState<number>(0);

  const railWrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  React.useEffect(() => {
    if (motionPaused) {
      document.documentElement.dataset.motion = "paused";
      setAutoplay(false);
    } else {
      delete document.documentElement.dataset.motion;
    }
  }, [motionPaused]);

  // Items passed to ClothingRailHero based on visualMode
  const railItems = React.useMemo<RailGarment[]>(() => {
    if (visualMode === "photo") return RAIL_DEMO_ITEMS;
    return RAIL_DEMO_ITEMS.map(({ image, backImage, sideImage, ...rest }) => ({
      ...rest,
    }));
  }, [visualMode]);

  // Focus or open a specific hanger on the 3D rail
  const focusPieceOnRail = React.useCallback((index: number, openModal = false) => {
    setSelectedRailIndex(index);
    const wrapper = railWrapperRef.current;
    if (!wrapper) return;
    wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      const btn = wrapper.querySelector<HTMLButtonElement>(`button[data-garment="${index}"]`);
      if (btn) {
        btn.focus({ preventScroll: true });
        if (openModal) {
          btn.click();
        }
      }
    }, 260);
  }, []);

  const addToBag = React.useCallback(
    (garment: RailGarment, size: GarmentSize = "M") => {
      const key = `${garment.id}:${size}`;
      const unitPrice = parsePrice(garment.tag);
      setCheckoutDone(false);
      setBag((prev) => {
        const existing = prev.find((item) => item.id === key);
        if (existing) {
          return prev.map((item) =>
            item.id === key ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { id: key, garment, size, quantity: 1, unitPrice }];
      });
      setJustAddedId(garment.id);
      window.setTimeout(() => {
        setJustAddedId((curr) => (curr === garment.id ? null : curr));
      }, 1500);
    },
    []
  );

  const addLookToBag = React.useCallback((itemIds: string[]) => {
    setCheckoutDone(false);
    setBag((prev) => {
      let next = [...prev];
      for (const id of itemIds) {
        const garment = RAIL_DEMO_ITEMS.find((g) => g.id === id);
        if (!garment) continue;
        const size: GarmentSize = "M";
        const key = `${garment.id}:${size}`;
        const unitPrice = parsePrice(garment.tag);
        const existing = next.find((item) => item.id === key);
        if (existing) {
          next = next.map((item) =>
            item.id === key ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          next.push({ id: key, garment, size, quantity: 1, unitPrice });
        }
      }
      return next;
    });
    setBagOpen(true);
  }, []);

  const updateBagQty = React.useCallback((id: string, delta: number) => {
    setBag((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const totalBagCount = React.useMemo(
    () => bag.reduce((sum, item) => sum + item.quantity, 0),
    [bag]
  );

  const totalBagPrice = React.useMemo(
    () => bag.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    [bag]
  );

  const filteredItems = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = RAIL_DEMO_ITEMS.map((item, railIndex) => ({ item, railIndex })).filter(
      ({ item }) => {
        if (category === "tee" && item.kind !== "tee") return false;
        if (
          category === "knit-hoodie" &&
          item.kind !== "knit" &&
          item.kind !== "hoodie"
        )
          return false;
        if (category === "shirt" && item.kind !== "shirt") return false;
        if (!q) return true;
        return (
          item.name.toLowerCase().includes(q) ||
          (item.description?.toLowerCase().includes(q) ?? false) ||
          (item.details?.some((d) => d.toLowerCase().includes(q)) ?? false)
        );
      }
    );

    if (sortOrder === "price-asc") {
      list.sort((a, b) => parsePrice(a.item.tag) - parsePrice(b.item.tag));
    } else if (sortOrder === "price-desc") {
      list.sort((a, b) => parsePrice(b.item.tag) - parsePrice(a.item.tag));
    }
    return list;
  }, [category, sortOrder, searchQuery]);

  const activeChapter = MATERIAL_CHAPTERS[activeChapterIdx] ?? MATERIAL_CHAPTERS[0];
  const currentRailItem = RAIL_DEMO_ITEMS[selectedRailIndex] ?? RAIL_DEMO_ITEMS[0];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Top Announcement Strip */}
      <div className="border-b border-border bg-muted/60 px-4 py-2 text-center font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        <span>AUTUMN / WINTER ARCHIVE · 10 PIECES ON THE INTERACTIVE 3D RAIL</span>
        <span className="mx-3 hidden sm:inline">·</span>
        <span className="hidden sm:inline">COMPLIMENTARY EXPRESS COURIER OVER $150</span>
      </div>

      {/* Sticky Editorial Navbar */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4 xl:gap-6">
            <a
              href="#rail"
              className="group flex shrink-0 items-center gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-foreground font-mono text-xs font-semibold tracking-tighter text-background transition-transform group-hover:scale-105">
                MQ
              </span>
              <div>
                <span className="block text-xs font-semibold tracking-[0.14em] uppercase sm:text-sm">
                  MAESTIQ
                </span>
                <span className="hidden font-mono text-[10px] tracking-[0.2em] text-muted-foreground sm:block">
                  ATELIER RAIL · 01
                </span>
              </div>
            </a>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-5 pl-2 text-xs font-medium tracking-wide text-muted-foreground lg:flex xl:gap-6"
            >
              <a
                href="#rail"
                className="transition-colors hover:text-foreground"
              >
                3D Rail
              </a>
              <a
                href="#collection"
                className="transition-colors hover:text-foreground"
              >
                The Edit (10)
              </a>
              <a
                href="#materiality"
                className="transition-colors hover:text-foreground"
              >
                Materiality
              </a>
              <a
                href="#lookbook"
                className="transition-colors hover:text-foreground"
              >
                Lookbook
              </a>
              <a
                href="#sizing"
                className="transition-colors hover:text-foreground"
              >
                Sizing & Care
              </a>
            </nav>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Render Mode Toggle: 30 Cutout Photos vs Procedural Vector + Wood Hanger */}
            <div
              role="group"
              aria-label="Garment render mode"
              className="hidden items-center rounded-full border border-border bg-muted/50 p-0.5 text-[11px] font-medium md:inline-flex"
            >
              <button
                type="button"
                onClick={() => setVisualMode("photo")}
                aria-pressed={visualMode === "photo"}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  visualMode === "photo"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                3D Photos
              </button>
              <button
                type="button"
                onClick={() => setVisualMode("vector-wood")}
                aria-pressed={visualMode === "vector-wood"}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  visualMode === "vector-wood"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Vector + Wood
              </button>
            </div>

            {/* Motion Play/Pause Button */}
            <button
              type="button"
              onClick={() => setMotionPaused((p) => !p)}
              aria-pressed={motionPaused}
              title={motionPaused ? "Resume 3D physics motion" : "Pause 3D physics motion"}
              aria-label={motionPaused ? "Resume 3D physics motion" : "Pause 3D physics motion"}
              className="inline-flex size-8 items-center justify-center gap-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:h-9 sm:w-auto sm:px-3"
            >
              {motionPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
              <span className="hidden xl:inline">
                {motionPaused ? "Motion Paused" : "Physics Active"}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? "Switch to light atelier theme" : "Switch to dark obsidian theme"}
              className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground sm:size-9"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              type="button"
              onClick={() => setBagOpen(true)}
              aria-label={`Open shopping bag (${totalBagCount} items)`}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-foreground px-2.5 text-xs font-medium text-background shadow-xs transition-transform hover:-translate-y-px sm:h-9 sm:gap-2 sm:px-3.5"
            >
              <ShoppingBag className="size-3.5" />
              <span className="hidden sm:inline">Bag</span>
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-background/20 px-1.5 py-0.5 font-mono text-[11px]">
                {totalBagCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileNavOpen((o) => !o)}
              aria-expanded={mobileNavOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-card text-foreground sm:size-9 lg:hidden"
            >
              {mobileNavOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileNavOpen && (
          <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium">
              <a
                href="#rail"
                onClick={() => setMobileNavOpen(false)}
                className="py-1"
              >
                01 · Interactive 3D Rail
              </a>
              <a
                href="#collection"
                onClick={() => setMobileNavOpen(false)}
                className="py-1"
              >
                02 · The Ten-Piece Edit
              </a>
              <a
                href="#materiality"
                onClick={() => setMobileNavOpen(false)}
                className="py-1"
              >
                03 · Materiality & GSM Specs
              </a>
              <a
                href="#lookbook"
                onClick={() => setMobileNavOpen(false)}
                className="py-1"
              >
                04 · Seasonal Lookbook
              </a>
              <a
                href="#sizing"
                onClick={() => setMobileNavOpen(false)}
                className="py-1"
              >
                05 · Sizing Matrix & Care
              </a>
            </nav>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="font-mono text-xs text-muted-foreground">HANGER RENDER</span>
              <div className="inline-flex rounded-full border border-border bg-muted/50 p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setVisualMode("photo")}
                  className={`rounded-full px-3 py-1 ${
                    visualMode === "photo" ? "bg-card font-medium" : "text-muted-foreground"
                  }`}
                >
                  3D Photos
                </button>
                <button
                  type="button"
                  onClick={() => setVisualMode("vector-wood")}
                  className={`rounded-full px-3 py-1 ${
                    visualMode === "vector-wood" ? "bg-card font-medium" : "text-muted-foreground"
                  }`}
                >
                  Vector + Wood
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="main">
        {/* =================================================================
            SECTION 1: INTERACTIVE 3D CLOTHING RAIL HERO
           ================================================================= */}
        <div
          id="rail"
          ref={railWrapperRef}
          className="relative border-b border-border"
        >
          <ClothingRailHero
            items={railItems}
            hanger={visualMode === "photo" ? "none" : "wood"}
            eyebrow="New season · Ten pieces on the rail"
            heading="A clothing rail you can handle, right on the page."
            caption="Brush along the rail, slide a hanger, lift a piece to see the back."
            autoplay={autoplay}
            onOpenChange={(idx) => {
              if (idx !== null) setSelectedRailIndex(idx);
            }}
            action={
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#collection"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span>Shop the edit</span>
                  <ArrowUpRight className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => focusPieceOnRail(selectedRailIndex, true)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-2xs transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Rotate3d className="size-4 text-muted-foreground" />
                  <span>Inspect #{String(selectedRailIndex + 1).padStart(2, "0")} in 3D</span>
                </button>
                <button
                  type="button"
                  onClick={() => addToBag(currentRailItem, "M")}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/70"
                >
                  <Plus className="size-4" />
                  <span>
                    Quick Add {currentRailItem.name.split("·")[0].trim()} ({currentRailItem.tag})
                  </span>
                </button>
              </div>
            }
          />

          {/* Interactive Rail Index Strip (01 .. 10) */}
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-border bg-card/80 p-3 shadow-2xs backdrop-blur-xs sm:p-4">
              <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-emerald-600" />
                  <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    RAIL INDEX · CLICK TO TURN HANGER OR DOUBLE-CLICK TO LIFT
                  </span>
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">
                  Active:{" "}
                  <strong className="font-medium text-foreground">
                    {String(selectedRailIndex + 1).padStart(2, "0")} / 10 —{" "}
                    {currentRailItem.name} ({currentRailItem.tag})
                  </strong>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
                {RAIL_DEMO_ITEMS.map((item, idx) => {
                  const isSelected = idx === selectedRailIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => focusPieceOnRail(idx, false)}
                      onDoubleClick={() => focusPieceOnRail(idx, true)}
                      className={`group flex min-w-0 items-center justify-between gap-1.5 rounded-xl border px-2.5 py-2 text-left text-xs transition-all ${
                        isSelected
                          ? "border-foreground bg-foreground text-background shadow-xs"
                          : "border-border bg-background/60 text-foreground hover:border-foreground/40 hover:bg-muted/50"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-1.5">
                        <span
                          className="size-2.5 shrink-0 rounded-full border border-black/15"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-mono text-[10px] opacity-70">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate font-medium">
                          {item.name.split("·")[0].trim()}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 font-mono text-[10px] ${
                          isSelected ? "text-background/80" : "text-muted-foreground"
                        }`}
                      >
                        {item.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            SECTION 2: THE TEN-PIECE EDIT (CATALOG GRID WITH 3-ANGLE VIEWER)
           ================================================================= */}
        <section
          id="collection"
          aria-labelledby="collection-heading"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.24em] text-muted-foreground uppercase">
                02 / THE TEN-PIECE EDIT
              </p>
              <h1
                id="collection-heading"
                className="mt-2 font-serif text-3xl font-medium tracking-tight sm:text-5xl"
              >
                Every garment on the rail, examined angle by angle.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Switch between Front, Back, and Side-on rail silhouettes for all ten pieces,
                focus any hanger directly on the 3D rail above, or open its interactive 360°
                portal.
              </p>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by fabric, gsm, name..."
                  aria-label="Filter garments by fabric, gsm, or name"
                  className="h-9 w-56 rounded-full border border-border bg-card pr-3 pl-8 text-xs text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                />
              </div>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                aria-label="Sort garments"
                className="h-9 rounded-full border border-border bg-card px-3.5 text-xs font-medium text-foreground focus:border-foreground focus:outline-none"
              >
                <option value="rail">Sort: Rail Order (01–10)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by garment type">
              {[
                { id: "all", label: "All Pieces (10)" },
                { id: "tee", label: "Tees & Polos (4)" },
                { id: "knit-hoodie", label: "Knitwear & Fleece (5)" },
                { id: "shirt", label: "Oxford Shirting (1)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id as FilterCategory)}
                  aria-pressed={category === tab.id}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    category === tab.id
                      ? "bg-foreground text-background"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p className="font-mono text-xs text-muted-foreground">
              Showing {filteredItems.length} of {RAIL_DEMO_ITEMS.length} archival pieces
            </p>
          </div>

          {/* Product Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map(({ item, railIndex }) => {
              const angle = cardAngles[item.id] ?? "front";
              const selectedSize = cardSizes[item.id] ?? "M";
              const activeSrc =
                angle === "back"
                  ? item.backImage ?? item.image
                  : angle === "side"
                  ? item.sideImage ?? item.image
                  : item.image;
              const isAdded = justAddedId === item.id;

              return (
                <article
                  key={item.id}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md"
                >
                  <div>
                    {/* Top Card Meta */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
                        RAIL #{String(railIndex + 1).padStart(2, "0")} ·{" "}
                        {(item.kind ?? "tee").toUpperCase()}
                      </span>
                      <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-xs font-semibold text-foreground">
                        {item.tag}
                      </span>
                    </div>

                    {/* Garment Transparent Cutout Stage */}
                    <div className="relative mt-3 flex aspect-[200/265] w-full items-center justify-center overflow-hidden rounded-xl bg-muted/45 p-4">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-25"
                        style={{
                          background: `radial-gradient(circle at 50% 38%, ${
                            item.color ?? "#888"
                          }, transparent 72%)`,
                        }}
                      />

                      {activeSrc && (
                        <img
                          src={activeSrc}
                          alt={`${item.name} (${angle} view)`}
                          loading="lazy"
                          className="relative z-10 h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}

                      {/* Angle Switcher Pill (Front / Back / Side) */}
                      <div
                        role="group"
                        aria-label={`Select angle for ${item.name}`}
                        className="absolute bottom-2.5 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-border/80 bg-background/90 p-0.5 text-[10px] font-medium shadow-xs backdrop-blur-xs"
                      >
                        {(["front", "back", "side"] as const).map((view) => (
                          <button
                            key={view}
                            type="button"
                            onClick={() =>
                              setCardAngles((prev) => ({ ...prev, [item.id]: view }))
                            }
                            aria-pressed={angle === view}
                            className={`rounded-full px-2.5 py-1 capitalize transition-colors ${
                              angle === view
                                ? "bg-foreground text-background"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {view}
                          </button>
                        ))}
                      </div>

                      {/* Quick 3D Modal Lift Button */}
                      <button
                        type="button"
                        onClick={() => focusPieceOnRail(railIndex, true)}
                        title="Lift and spin in 3D modal"
                        aria-label={`Inspect ${item.name} in 3D modal`}
                        className="absolute top-2.5 right-2.5 z-20 inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/85 text-muted-foreground backdrop-blur-xs transition-colors hover:bg-foreground hover:text-background"
                      >
                        <Rotate3d className="size-3.5" />
                      </button>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="size-3.5 shrink-0 rounded-full border border-black/20"
                          style={{ backgroundColor: item.color }}
                          title={`Swatch: ${item.color}`}
                        />
                        <h3 className="text-base font-semibold tracking-tight">
                          {item.name}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    {/* Spec Badges */}
                    {item.details && item.details.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {item.details.map((detail) => (
                          <li
                            key={detail}
                            className="rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Size Selector & Action Buttons */}
                  <div className="mt-4 border-t border-border pt-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                        SIZE
                      </span>
                      <div className="inline-flex gap-1" role="group" aria-label={`Select size for ${item.name}`}>
                        {SIZES.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() =>
                              setCardSizes((prev) => ({ ...prev, [item.id]: sz }))
                            }
                            aria-pressed={selectedSize === sz}
                            className={`size-6 rounded-md font-mono text-[11px] font-medium transition-colors ${
                              selectedSize === sz
                                ? "bg-foreground text-background"
                                : "border border-border bg-background text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                      <button
                        type="button"
                        onClick={() => addToBag(item, selectedSize)}
                        className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                          isAdded
                            ? "bg-emerald-700 text-white"
                            : "bg-foreground text-background hover:opacity-90"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="size-3.5" />
                            <span>Added ({selectedSize})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="size-3.5" />
                            <span>
                              Add to Bag · {item.tag}
                            </span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => focusPieceOnRail(railIndex, false)}
                        title="Turn this hanger to the front on the 3D rail"
                        className="inline-flex items-center justify-center gap-1 rounded-xl border border-border bg-background px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                      >
                        <Eye className="size-3.5" />
                        <span>On Rail</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =================================================================
            SECTION 3: MATERIALITY & TEXTILE ENGINEERING
           ================================================================= */}
        <section
          id="materiality"
          aria-labelledby="materiality-heading"
          className="border-y border-border bg-muted/35 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-[0.24em] text-muted-foreground uppercase">
                03 / MATERIALITY & TEXTILE ARCHITECTURE
              </p>
              <h2
                id="materiality-heading"
                className="mt-2 font-serif text-3xl font-medium tracking-tight sm:text-5xl"
              >
                Weight you can feel before lifting the hanger.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every garment in the ten-piece rail edit is calibrated by gram-per-square-metre
                density, yarn twist, and natural trim hardware.
              </p>
            </div>

            {/* Chapter Tabs */}
            <div
              className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3"
              role="tablist"
              aria-label="Material chapters"
            >
              {MATERIAL_CHAPTERS.map((chap, idx) => {
                const active = idx === activeChapterIdx;
                return (
                  <button
                    key={chap.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveChapterIdx(idx)}
                    className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-all ${
                      active
                        ? "border-foreground bg-card shadow-sm"
                        : "border-border bg-card/50 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                    }`}
                  >
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase">
                      {chap.code}
                    </span>
                    <span className="mt-2 text-base font-semibold text-foreground">
                      {chap.title}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {chap.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Material Showcase Panel */}
            <div className="mt-6 grid grid-cols-1 items-center gap-8 rounded-3xl border border-border bg-card p-6 shadow-xs lg:grid-cols-12 lg:p-8">
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-muted lg:col-span-6">
                <img
                  src={activeChapter.image}
                  alt={activeChapter.title}
                  loading="lazy"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between text-white">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-80">
                      ATELIER MILL ARCHIVE
                    </span>
                    <p className="text-lg font-medium">{activeChapter.code}</p>
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 font-mono text-xs backdrop-blur-md">
                    {activeChapter.pieceIds.length} Rail Pieces
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:col-span-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                    <Layers className="size-3.5" />
                    {activeChapter.code}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-medium sm:text-3xl">
                    {activeChapter.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {activeChapter.description}
                  </p>
                </div>

                {/* Technical Metrics */}
                <dl className="grid grid-cols-3 gap-3 border-y border-border py-4">
                  {activeChapter.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                        {m.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold">{m.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Matching Pieces from the Rail */}
                <div>
                  <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    GARMENTS CRAFTED WITH THIS TEXTILE
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeChapter.pieceIds.map((pid) => {
                      const railIdx = RAIL_DEMO_ITEMS.findIndex((g) => g.id === pid);
                      const garment = RAIL_DEMO_ITEMS[railIdx];
                      if (!garment) return null;
                      return (
                        <button
                          key={pid}
                          type="button"
                          onClick={() => focusPieceOnRail(railIdx, false)}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-foreground"
                        >
                          <span
                            className="size-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: garment.color }}
                          />
                          <span>{garment.name}</span>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {garment.tag}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION 4: SEASONAL LOOKBOOK & CURATED OUTFIT PAIRINGS
           ================================================================= */}
        <section
          id="lookbook"
          aria-labelledby="lookbook-heading"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.24em] text-muted-foreground uppercase">
                04 / MODULAR WARDROBE LOOKBOOK
              </p>
              <h2
                id="lookbook-heading"
                className="mt-2 font-serif text-3xl font-medium tracking-tight sm:text-5xl"
              >
                Three tonal pairings pulled straight from the rail.
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              Each look combines pieces across jersey, Oxford shirting, and heavyweight fleece.
              Inspect individual hangers on the 3D rail or add the complete look to your bag.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {CURATED_LOOKS.map((look) => {
              const pieces = look.itemIds
                .map((id) => {
                  const idx = RAIL_DEMO_ITEMS.findIndex((g) => g.id === id);
                  return { garment: RAIL_DEMO_ITEMS[idx], idx };
                })
                .filter((entry) => Boolean(entry.garment));

              const lookTotal = pieces.reduce(
                (sum, entry) => sum + parsePrice(entry.garment.tag),
                0
              );

              return (
                <article
                  key={look.id}
                  className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-muted px-3 py-1 font-mono text-[11px] font-medium">
                        {look.number}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {pieces.length} Pieces · ${lookTotal}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-2xl font-medium">
                      {look.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                      {look.mood}
                    </p>

                    {/* Overlapping Cutout Collage */}
                    <div className="mt-5 flex h-52 items-center justify-center gap-2 rounded-2xl bg-muted/45 px-4 py-3">
                      {pieces.map(({ garment, idx }) => (
                        <button
                          key={garment.id}
                          type="button"
                          onClick={() => focusPieceOnRail(idx, true)}
                          title={`Inspect ${garment.name} in 3D`}
                          className="group relative flex h-full flex-1 items-center justify-center transition-transform hover:-translate-y-1.5"
                        >
                          {garment.image && (
                            <img
                              src={garment.image}
                              alt={garment.name}
                              loading="lazy"
                              className="max-h-full w-auto object-contain drop-shadow-sm"
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                      {look.note}
                    </p>

                    {/* Piece List */}
                    <ul className="mt-4 divide-y divide-border border-y border-border text-xs">
                      {pieces.map(({ garment, idx }) => (
                        <li
                          key={garment.id}
                          className="flex items-center justify-between py-2.5"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="size-2.5 rounded-full border border-black/20"
                              style={{ backgroundColor: garment.color }}
                            />
                            <span className="font-medium">{garment.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-muted-foreground">
                              {garment.tag}
                            </span>
                            <button
                              type="button"
                              onClick={() => focusPieceOnRail(idx, false)}
                              className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground hover:border-foreground hover:text-foreground"
                            >
                              Rail #{String(idx + 1).padStart(2, "0")}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => addLookToBag(look.itemIds)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-xs font-medium text-background transition-opacity hover:opacity-90"
                  >
                    <Sparkles className="size-3.5" />
                    <span>
                      Add Complete Look ({pieces.length} Pieces · ${lookTotal})
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* =================================================================
            SECTION 5: GARMENT MEASUREMENT MATRIX & CARE PROTOCOL
           ================================================================= */}
        <section
          id="sizing"
          aria-labelledby="sizing-heading"
          className="border-t border-border bg-muted/25 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs tracking-[0.24em] text-muted-foreground uppercase">
                  05 / ATELIER SIZING & GARMENT CARE
                </p>
                <h2
                  id="sizing-heading"
                  className="mt-2 font-serif text-3xl font-medium tracking-tight sm:text-4xl"
                >
                  Flat-lay garment measurements.
                </h2>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card p-1 text-xs">
                <Ruler className="ml-2.5 size-3.5 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setUnit("cm")}
                  aria-pressed={unit === "cm"}
                  className={`rounded-full px-3 py-1 font-mono text-[11px] ${
                    unit === "cm"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground"
                  }`}
                >
                  Centimetres (cm)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("in")}
                  aria-pressed={unit === "in"}
                  className={`rounded-full px-3 py-1 font-mono text-[11px] ${
                    unit === "in"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground"
                  }`}
                >
                  Inches (in)
                </button>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-2xs">
              <table className="w-full min-w-[640px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/50 font-mono text-[11px] text-muted-foreground uppercase">
                    <th className="py-3.5 pr-4 pl-6">Silhouette Group</th>
                    <th className="px-4 py-3.5">Cut & Profile</th>
                    <th className="px-4 py-3.5">Half-Chest (S / M / L / XL)</th>
                    <th className="px-4 py-3.5">Back Length (S / M / L / XL)</th>
                    <th className="py-3.5 pr-6 pl-4">Shoulder (S / M / L / XL)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {SIZING_MATRIX.map((row) => {
                    const fmt = (arr: number[]) =>
                      arr
                        .map((v) =>
                          unit === "cm" ? `${v}` : (v / 2.54).toFixed(1)
                        )
                        .join(" / ") + ` ${unit}`;
                    return (
                      <tr key={row.silhouette} className="hover:bg-muted/30">
                        <td className="py-4 pr-4 pl-6 font-medium text-foreground">
                          {row.silhouette}
                        </td>
                        <td className="px-4 py-4 text-muted-foreground">
                          {row.fit}
                        </td>
                        <td className="px-4 py-4 font-mono">{fmt(row.chestCm)}</td>
                        <td className="px-4 py-4 font-mono">{fmt(row.lengthCm)}</td>
                        <td className="py-4 pr-6 pl-4 font-mono">
                          {fmt(row.shoulderCm)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Care & Provenance Guarantees */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Cold Wash & Flat Dry",
                  text: "Machine wash cold at 30°C inside-out on a gentle cycle. Reshape and dry flat away from direct heat to preserve 240–400 gsm fabric density.",
                },
                {
                  title: "200 × 310 Multi-Angle Cutouts",
                  text: "Every piece on the rail is photographed on a calibrated portrait canvas across Front, Back, and Side angles for zero-jump 3D rotation.",
                },
                {
                  title: "Traceable European Mills",
                  text: "Organic cotton knitted in Portugal and 5-gauge Geelong lambswool spun in Scotland with natural olive-wood and horn buttons.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <ShieldCheck className="size-4 text-muted-foreground" />
                    <span>{card.title}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* =================================================================
          FOOTER
         ================================================================= */}
      <footer className="border-t border-border bg-card py-14 text-xs text-muted-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 text-foreground">
              <span className="flex size-7 items-center justify-center rounded-md bg-foreground font-mono text-[11px] font-bold text-background">
                MQ
              </span>
              <span className="text-sm font-semibold tracking-[0.16em] uppercase">
                MAESTIQ ATELIER
              </span>
            </div>
            <p className="mt-3 max-w-sm leading-relaxed">
              Interactive 3D clothing rail showroom & modular wardrobe archive. Built with
              shadcn/ui architecture, Tailwind CSS, TypeScript, and spring-physics hanger
              simulation.
            </p>
            <p className="mt-4 font-mono text-[11px]">
              SHOWROOMS: PARIS (RUE DE TURENNE) · TOKYO (AOYAMA) · SEOUL (HANNAM)
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] font-semibold tracking-[0.18em] text-foreground uppercase">
              NAVIGATION
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a href="#rail" className="hover:text-foreground">
                  Interactive 3D Clothing Rail
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-foreground">
                  The Ten-Piece Edit (01–10)
                </a>
              </li>
              <li>
                <a href="#materiality" className="hover:text-foreground">
                  Materiality & GSM Specs
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-foreground">
                  Curated Seasonal Lookbook
                </a>
              </li>
              <li>
                <a href="#sizing" className="hover:text-foreground">
                  Flat-Lay Sizing Matrix
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[11px] font-semibold tracking-[0.18em] text-foreground uppercase">
              ARCHIVE DISPATCH
            </p>
            <p className="mt-3 leading-relaxed">
              Receive private access when new numbered rail editions and textile studies drop.
            </p>
            {newsletterSubscribed ? (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-600/30 bg-emerald-500/10 px-3.5 py-2.5 text-emerald-700 dark:text-emerald-300">
                <Check className="size-4 shrink-0" />
                <span>Added to the Maestiq Atelier private dispatch list.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.trim()) setNewsletterSubscribed(true);
                }}
                className="mt-3 flex gap-2"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="atelier@domain.com"
                  aria-label="Email address for archive dispatch"
                  className="h-9 min-w-0 flex-1 rounded-full border border-border bg-background px-3.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-border px-4 pt-6 font-mono text-[11px] sm:flex-row sm:px-6 lg:px-8">
          <span>© 2026 MAESTIQ ATELIER · ALL 10 RAIL PIECES AVAILABLE</span>
          <span>COMPONENT: /src/components/ui/product-rail-gallery.tsx</span>
        </div>
      </footer>

      {/* =================================================================
          SLIDE-OVER SHOPPING BAG DRAWER
         ================================================================= */}
      {bagOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag"
          className="fixed inset-0 z-50 flex justify-end"
        >
          <div
            aria-hidden="true"
            onClick={() => setBagOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          <div className="relative z-10 flex h-full w-full max-w-md flex-col justify-between border-l border-border bg-card p-6 text-card-foreground shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="size-4" />
                  <h2 className="text-base font-semibold">
                    Atelier Bag ({totalBagCount})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setBagOpen(false)}
                  aria-label="Close shopping bag"
                  className="inline-flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Free Express Shipping Progress */}
              <div className="mt-4 rounded-xl bg-muted/60 p-3 text-xs">
                <div className="flex justify-between font-mono text-[11px]">
                  <span>
                    {totalBagPrice >= 150
                      ? "Complimentary Express Courier Unlocked"
                      : `$${150 - totalBagPrice} away from Free Express Courier`}
                  </span>
                  <span>${totalBagPrice} / $150</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full bg-foreground transition-all duration-300"
                    style={{
                      width: `${Math.min(100, Math.round((totalBagPrice / 150) * 100))}%`,
                    }}
                  />
                </div>
              </div>

              {/* Bag Items List */}
              <div className="mt-4 max-h-[54vh] divide-y divide-border overflow-y-auto pr-1">
                {bag.length === 0 ? (
                  <div className="py-16 text-center text-sm text-muted-foreground">
                    Your atelier bag is empty. Brush along the 3D rail or select a piece from
                    the edit.
                  </div>
                ) : (
                  bag.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between gap-3 py-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-muted/50 p-1.5">
                          {entry.garment.image && (
                            <img
                              src={entry.garment.image}
                              alt={entry.garment.name}
                              className="max-h-full w-auto object-contain"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold">
                            {entry.garment.name}
                          </h3>
                          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                            Size: {entry.size} · ${entry.unitPrice} each
                          </p>
                          <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-border px-2 py-0.5">
                            <button
                              type="button"
                              onClick={() => updateBagQty(entry.id, -1)}
                              aria-label={`Decrease quantity of ${entry.garment.name}`}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="font-mono text-xs">
                              {entry.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateBagQty(entry.id, 1)}
                              aria-label={`Increase quantity of ${entry.garment.name}`}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="font-mono text-xs font-semibold">
                          ${entry.unitPrice * entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateBagQty(entry.id, -entry.quantity)}
                          aria-label={`Remove ${entry.garment.name} from bag`}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bag Footer */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono text-base font-semibold">
                  ${totalBagPrice} USD
                </span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Taxes and duties calculated at dispatch.
              </p>

              {checkoutDone ? (
                <div className="mt-4 rounded-xl border border-emerald-600/30 bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-emerald-300">
                  <div className="flex items-center gap-2 font-semibold">
                    <Check className="size-4" />
                    <span>Atelier Reservation Confirmed</span>
                  </div>
                  <p className="mt-1">
                    Your {totalBagCount} selected pieces have been reserved for dispatch.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={bag.length === 0}
                  onClick={() => setCheckoutDone(true)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  <span>Proceed to Atelier Checkout · ${totalBagPrice}</span>
                  <ArrowUpRight className="size-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
