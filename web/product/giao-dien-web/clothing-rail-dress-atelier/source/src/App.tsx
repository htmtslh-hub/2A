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
  GarmentPreview,
  type RailGarment,
} from "@/components/ui/product-rail-gallery";
import { RAIL_DEMO_ITEMS } from "@/components/ui/demo";

type GarmentSize = "XS" | "S" | "M" | "L";
type AngleView = "front" | "back" | "side";
type FilterCategory = "all" | "slip-midi" | "gown" | "pleated-wrap" | "blazer-dress";
type SortOrder = "rail" | "price-asc" | "price-desc";
type HangerMode = "none" | "wood" | "matte";

interface BagItem {
  id: string;
  garment: RailGarment;
  size: GarmentSize;
  quantity: number;
  unitPrice: number;
}

const SIZES: GarmentSize[] = ["XS", "S", "M", "L"];

function parsePrice(tag?: string): number {
  if (!tag) return 220;
  const num = Number(tag.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) && num > 0 ? num : 220;
}

const MATERIAL_CHAPTERS = [
  {
    id: "silk-charmeuse-duchesse",
    code: "TEX-01 · 19-MOMME SILK",
    title: "19-Momme Mulberry Silk Charmeuse & Duchesse Satin",
    subtitle: "45-degree bias cut · Liquid luster with French-seamed interior",
    description:
      "Woven in Como, Italy from Grade-6A long-strand Mulberry silk. Cut on a true 45-degree bias so the charmeuse and heavy satin mold fluidly to the silhouette without pulling, finished with hand-rolled hems and internal French seams.",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=80",
    metrics: [
      { label: "Silk Weight", value: "19–28 Momme" },
      { label: "Grain Cut", value: "45° True Bias" },
      { label: "Seam Finish", value: "Enclosed French Seam" },
    ],
    pieceIds: [
      "silk-slip-champagne",
      "slip-wisteria",
      "velvet-gown-noir",
      "gown-midnight",
    ],
  },
  {
    id: "sunray-plisse-georgette",
    code: "TEX-02 · 300-FOLD PLISSÉ",
    title: "300-Fold Sunray Plissé Georgette & Fluid Crepe de Chine",
    subtitle: "Steam-set radial accordion pleats · Weightless kinetic movement",
    description:
      "Each pleated dress is hand-placed into radial paper molds and steam-locked for three hours so the 300 micro-folds spring back with every step. Paired with high-twist silk crepe de chine for our surplice kimono-sleeve wrap dress.",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
    metrics: [
      { label: "Pleat Count", value: "300 Radial Folds" },
      { label: "Weave", value: "High-Twist Georgette" },
      { label: "Waist Construction", value: "Hand-Smocked / Sash" },
    ],
    pieceIds: ["pleated-marigold", "pleated-celadon", "wrap-emerald"],
  },
  {
    id: "poplin-linen-wool",
    code: "TEX-03 · ARCHITECTURAL TAILORING",
    title: "Boned Organic Poplin, European Flax & Virgin Wool Hopsack",
    subtitle: "Corseted princess seams · Peak lapels & turned natural horn buttons",
    description:
      "Structured day-to-evening tailoring engineered to hold sculptural volume on and off the wooden hanger. Features internal spiral boning in our dusty rose poplin midi, sun-washed Belgian flax linen, and double-breasted virgin wool hopsack.",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80",
    metrics: [
      { label: "Tailoring Cloth", value: "Virgin Wool & Flax" },
      { label: "Hardware", value: "6 Natural Horn Buttons" },
      { label: "Bodice Support", value: "Internal Spiral Boning" },
    ],
    pieceIds: ["corset-midi-rose", "midi-terracotta", "blazer-dress-ivory"],
  },
];

const CURATED_LOOKS = [
  {
    id: "look-01",
    number: "EDIT 01",
    title: "The Candlelight Gala & Opera Edit",
    mood: "Sculpted evening silhouettes · Velvet, duchesse satin & bias charmeuse",
    note: "Pairs our floor-length obsidian silk-rayon velvet column gown and midnight duchesse satin opera gown with the champagne 19-momme bias slip for after-hours receptions.",
    itemIds: ["silk-slip-champagne", "velvet-gown-noir", "gown-midnight"],
  },
  {
    id: "look-02",
    number: "EDIT 02",
    title: "Sunlit Vernissage & Garden Plissé",
    mood: "Kinetic pleats & corseted poplin · Marigold, celadon, rose & terracotta",
    note: "Combines the 300-fold marigold and celadon plissé halter dresses with our boned dusty rose poplin midi and European flax terracotta sundress.",
    itemIds: [
      "corset-midi-rose",
      "pleated-marigold",
      "midi-terracotta",
      "pleated-celadon",
    ],
  },
  {
    id: "look-03",
    number: "EDIT 03",
    title: "Architectural Salon & Cocktail",
    mood: "Sharp peak lapels & fluid drape · Ivory virgin wool, emerald crepe & wisteria",
    note: "Balances the double-breasted ivory blazer dress with the emerald crepe de chine wrap dress and low cowl-back wisteria satin slip.",
    itemIds: ["blazer-dress-ivory", "wrap-emerald", "slip-wisteria"],
  },
];

const SIZING_MATRIX = [
  {
    silhouette: "Bias-Cut Silk & Satin Slips",
    fit: "Fluid 45° Bias Skimming Fit",
    bustCm: [82, 86, 91, 96],
    waistCm: [64, 68, 73, 78],
    lengthCm: [118, 120, 122, 124],
  },
  {
    silhouette: "Corset Poplin & Flax Linen Midis",
    fit: "Fitted Bodice / A-Line Skirt",
    bustCm: [80, 84, 89, 94],
    waistCm: [62, 66, 71, 76],
    lengthCm: [122, 124, 126, 128],
  },
  {
    silhouette: "Sunray Pleated & Surplice Wrap",
    fit: "Adjustable Smocked / Self-Tie Waist",
    bustCm: [84, 88, 93, 98],
    waistCm: [64, 68, 74, 80],
    lengthCm: [134, 136, 138, 140],
  },
  {
    silhouette: "Column Evening Gowns & Blazer Dress",
    fit: "Sculpted Architectural Tailoring",
    bustCm: [83, 87, 92, 97],
    waistCm: [65, 69, 74, 79],
    lengthCm: [148, 150, 152, 154],
  },
];

export default function App() {
  const [dark, setDark] = React.useState(false);
  const [hangerMode, setHangerMode] = React.useState<HangerMode>("none");
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
      id: "silk-slip-champagne:S",
      garment: RAIL_DEMO_ITEMS[0],
      size: "S",
      quantity: 1,
      unitPrice: parsePrice(RAIL_DEMO_ITEMS[0].tag),
    },
    {
      id: "velvet-gown-noir:M",
      garment: RAIL_DEMO_ITEMS[1],
      size: "M",
      quantity: 1,
      unitPrice: parsePrice(RAIL_DEMO_ITEMS[1].tag),
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
    (garment: RailGarment, size: GarmentSize = "S") => {
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
        const size: GarmentSize = "S";
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
        if (
          category === "slip-midi" &&
          item.kind !== "slip" &&
          item.kind !== "midi"
        )
          return false;
        if (category === "gown" && item.kind !== "gown") return false;
        if (
          category === "pleated-wrap" &&
          item.kind !== "pleated" &&
          item.kind !== "wrap"
        )
          return false;
        if (category === "blazer-dress" && item.kind !== "blazer-dress")
          return false;
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
        <span>ATELIER EVENING & DAYWEAR · 10 DRESSES ON THE INTERACTIVE 3D RAIL</span>
        <span className="mx-3 hidden sm:inline">·</span>
        <span className="hidden sm:inline">COMPLIMENTARY GARMENT BAG & EXPRESS COURIER OVER $300</span>
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
                  DRESS ATELIER · 01
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
                3D Dress Rail
              </a>
              <a
                href="#collection"
                className="transition-colors hover:text-foreground"
              >
                The Dress Edit (10)
              </a>
              <a
                href="#materiality"
                className="transition-colors hover:text-foreground"
              >
                Silk & Plissé
              </a>
              <a
                href="#lookbook"
                className="transition-colors hover:text-foreground"
              >
                Curated Edits
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
            {/* Hanger Material Toggle: Studio Photo vs Wood vs Matte */}
            <div
              role="group"
              aria-label="Hanger material"
              className="hidden items-center rounded-full border border-border bg-muted/50 p-0.5 text-[11px] font-medium md:inline-flex"
            >
              <button
                type="button"
                onClick={() => setHangerMode("none")}
                aria-pressed={hangerMode === "none"}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  hangerMode === "none"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Studio Cut-out
              </button>
              <button
                type="button"
                onClick={() => setHangerMode("wood")}
                aria-pressed={hangerMode === "wood"}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  hangerMode === "wood"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Wood
              </button>
              <button
                type="button"
                onClick={() => setHangerMode("matte")}
                aria-pressed={hangerMode === "matte"}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  hangerMode === "matte"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Matte
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
                01 · Interactive 3D Dress Rail
              </a>
              <a
                href="#collection"
                onClick={() => setMobileNavOpen(false)}
                className="py-1"
              >
                02 · The Ten-Dress Edit
              </a>
              <a
                href="#materiality"
                onClick={() => setMobileNavOpen(false)}
                className="py-1"
              >
                03 · Silk, Plissé & Tailoring Specs
              </a>
              <a
                href="#lookbook"
                onClick={() => setMobileNavOpen(false)}
                className="py-1"
              >
                04 · Curated Evening & Daywear Edits
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
              <span className="font-mono text-xs text-muted-foreground">HANGER FINISH</span>
              <div className="inline-flex rounded-full border border-border bg-muted/50 p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setHangerMode("none")}
                  className={`rounded-full px-2.5 py-1 ${
                    hangerMode === "none" ? "bg-card font-medium" : "text-muted-foreground"
                  }`}
                >
                  Studio
                </button>
                <button
                  type="button"
                  onClick={() => setHangerMode("wood")}
                  className={`rounded-full px-2.5 py-1 ${
                    hangerMode === "wood" ? "bg-card font-medium" : "text-muted-foreground"
                  }`}
                >
                  Wood
                </button>
                <button
                  type="button"
                  onClick={() => setHangerMode("matte")}
                  className={`rounded-full px-2.5 py-1 ${
                    hangerMode === "matte" ? "bg-card font-medium" : "text-muted-foreground"
                  }`}
                >
                  Matte
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
            items={RAIL_DEMO_ITEMS}
            hanger={hangerMode}
            eyebrow="Atelier Evening & Daywear · Ten dresses on the rail"
            heading="An atelier dress rail you can browse, right on the page."
            caption="Brush along the rail, slide a wooden hanger, lift a dress to inspect the back drape."
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
                  <span>Explore the dress edit</span>
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
                  onClick={() => addToBag(currentRailItem, "S")}
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
                    DRESS RAIL INDEX · CLICK TO TURN HANGER OR DOUBLE-CLICK TO LIFT
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
            SECTION 2: THE TEN-DRESS EDIT (CATALOG GRID WITH 3-ANGLE VIEWER)
           ================================================================= */}
        <section
          id="collection"
          aria-labelledby="collection-heading"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.24em] text-muted-foreground uppercase">
                02 / THE TEN-DRESS EDIT
              </p>
              <h1
                id="collection-heading"
                className="mt-2 font-serif text-3xl font-medium tracking-tight sm:text-5xl"
              >
                Every dress on the rail, examined angle by angle.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Switch between Front drape, Back cowl/pleat construction, and Side-on rail
                profiles for all ten dresses, focus any wooden hanger on the 3D rail above,
                or lift it into the 360° inspection portal.
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
                  placeholder="Filter by silk, plissé, gown..."
                  aria-label="Filter dresses by fabric, silhouette, or name"
                  className="h-9 w-56 rounded-full border border-border bg-card pr-3 pl-8 text-xs text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                />
              </div>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                aria-label="Sort dresses"
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
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by dress silhouette">
              {[
                { id: "all", label: "All Dresses (10)" },
                { id: "slip-midi", label: "Silk Slips & Midis (4)" },
                { id: "gown", label: "Evening Gowns (2)" },
                { id: "pleated-wrap", label: "Plissé & Wrap (3)" },
                { id: "blazer-dress", label: "Tailored Blazer Dress (1)" },
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
              Showing {filteredItems.length} of {RAIL_DEMO_ITEMS.length} atelier dresses
            </p>
          </div>

          {/* Product Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map(({ item, railIndex }) => {
              const angle = cardAngles[item.id] ?? "front";
              const selectedSize = cardSizes[item.id] ?? "S";
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
                        {(item.kind ?? "slip").toUpperCase()}
                      </span>
                      <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-xs font-semibold text-foreground">
                        {item.tag}
                      </span>
                    </div>

                    {/* Garment Silhouette Stage */}
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

                      <GarmentPreview
                        item={item}
                        view={angle}
                        hanger={hangerMode}
                        className="relative z-10 h-full w-auto transition-transform duration-500 group-hover:scale-[1.03]"
                      />

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
                Drape and pleat memory you can feel before lifting the hanger.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every dress on the ten-piece rail is calibrated by momme silk weight,
                steam-locked sunray pleat count, and internal corset or tailoring structure.
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
              <div className="relative flex aspect-[16/11] items-center justify-center gap-3 overflow-hidden rounded-2xl bg-muted/55 p-6 lg:col-span-6">
                {activeChapter.pieceIds.map((pid) => {
                  const garment = RAIL_DEMO_ITEMS.find((g) => g.id === pid);
                  if (!garment) return null;
                  return (
                    <div key={pid} className="flex h-full min-w-0 flex-1 items-center justify-center">
                      <GarmentPreview
                        item={garment}
                        view="front"
                        hanger={hangerMode}
                        className="max-h-full w-auto drop-shadow-md"
                      />
                    </div>
                  );
                })}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between text-white">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-80">
                      ATELIER MILL ARCHIVE
                    </span>
                    <p className="text-sm font-medium sm:text-lg">{activeChapter.code}</p>
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 font-mono text-xs backdrop-blur-md">
                    {activeChapter.pieceIds.length} Rail Dresses
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
                    DRESSES CRAFTED WITH THIS TEXTILE
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
            SECTION 4: SEASONAL LOOKBOOK & CURATED DRESS EDITS
           ================================================================= */}
        <section
          id="lookbook"
          aria-labelledby="lookbook-heading"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.24em] text-muted-foreground uppercase">
                04 / ATELIER CAPSULE LOOKBOOK
              </p>
              <h2
                id="lookbook-heading"
                className="mt-2 font-serif text-3xl font-medium tracking-tight sm:text-5xl"
              >
                Three curated dress capsules pulled straight from the rail.
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              Each capsule groups complementary evening and daywear silhouettes. Click any
              dress to lift and spin it in 3D, or reserve the complete capsule in one click.
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
                        {pieces.length} Dresses · ${lookTotal}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-2xl font-medium">
                      {look.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                      {look.mood}
                    </p>

                    {/* Dress Silhouette Collage */}
                    <div className="mt-5 flex h-48 items-center justify-center gap-1.5 overflow-hidden rounded-2xl bg-muted/45 px-3 py-3 sm:h-52 sm:gap-2 sm:px-4">
                      {pieces.map(({ garment, idx }) => (
                        <button
                          key={garment.id}
                          type="button"
                          onClick={() => focusPieceOnRail(idx, true)}
                          title={`Inspect ${garment.name} in 3D`}
                          className="group relative flex h-full min-w-0 flex-1 items-center justify-center transition-transform hover:-translate-y-1.5"
                        >
                          <GarmentPreview
                            item={garment}
                            view="front"
                            hanger={hangerMode}
                            className="max-h-full w-auto max-w-full drop-shadow-sm"
                          />
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
                      Add Complete Capsule ({pieces.length} Dresses · ${lookTotal})
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* =================================================================
            SECTION 5: DRESS MEASUREMENT MATRIX & CARE PROTOCOL
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
                  Atelier dress measurements.
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
                    <th className="py-3.5 pr-4 pl-6">Dress Silhouette Group</th>
                    <th className="px-4 py-3.5">Cut & Profile</th>
                    <th className="px-4 py-3.5">Bust (XS / S / M / L)</th>
                    <th className="px-4 py-3.5">Waist (XS / S / M / L)</th>
                    <th className="py-3.5 pr-6 pl-4">Shoulder-to-Hem (XS / S / M / L)</th>
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
                        <td className="px-4 py-4 font-mono">{fmt(row.bustCm)}</td>
                        <td className="px-4 py-4 font-mono">{fmt(row.waistCm)}</td>
                        <td className="py-4 pr-6 pl-4 font-mono">
                          {fmt(row.lengthCm)}
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
                  title: "Specialist Silk & Plissé Care",
                  text: "Dry clean only for 19-momme bias silk, velvet, and duchesse satin. Store sunray-pleated georgette hanging vertically on wooden hangers to preserve fold memory.",
                },
                {
                  title: "200 × 310 3D Silhouette Engine",
                  text: "Each dress on the rail is rendered across Front, Back, and Side-on perspectives with Lambertian fabric shading, drape lag, and spring-physics hanger collisions.",
                },
                {
                  title: "European Atelier Provenance",
                  text: "Mulberry silk charmeuse woven in Como, European flax linen spun in Belgium, and virgin wool hopsack tailored with natural horn buttons.",
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
                MAESTIQ DRESS ATELIER
              </span>
            </div>
            <p className="mt-3 max-w-sm leading-relaxed">
              Interactive 3D dress rail showroom & eveningwear archive. Built with
              shadcn/ui architecture, Tailwind CSS, TypeScript, and spring-physics wooden
              hanger simulation.
            </p>
            <p className="mt-4 font-mono text-[11px]">
              SALONS: PARIS (PLACE VENDÔME) · MILAN (VIA MONTENAPOLEONE) · TOKYO (AOYAMA)
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] font-semibold tracking-[0.18em] text-foreground uppercase">
              NAVIGATION
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a href="#rail" className="hover:text-foreground">
                  Interactive 3D Dress Rail
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-foreground">
                  The Ten-Dress Edit (01–10)
                </a>
              </li>
              <li>
                <a href="#materiality" className="hover:text-foreground">
                  Silk, Plissé & Tailoring Specs
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-foreground">
                  Curated Evening & Daywear Edits
                </a>
              </li>
              <li>
                <a href="#sizing" className="hover:text-foreground">
                  Atelier Dress Sizing Matrix
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[11px] font-semibold tracking-[0.18em] text-foreground uppercase">
              ATELIER SALON DISPATCH
            </p>
            <p className="mt-3 leading-relaxed">
              Receive private invitations when new numbered evening gowns and bias-cut silk
              editions arrive on the rail.
            </p>
            {newsletterSubscribed ? (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-600/30 bg-emerald-500/10 px-3.5 py-2.5 text-emerald-700 dark:text-emerald-300">
                <Check className="size-4 shrink-0" />
                <span>Added to the Maestiq Dress Atelier private salon list.</span>
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
                  placeholder="salon@domain.com"
                  aria-label="Email address for salon dispatch"
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
          <span>© 2026 MAESTIQ DRESS ATELIER · ALL 10 RAIL DRESSES AVAILABLE</span>
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
                    {totalBagPrice >= 300
                      ? "Complimentary Garment Bag & Express Courier Unlocked"
                      : `$${300 - totalBagPrice} away from Free Express Courier`}
                  </span>
                  <span>${totalBagPrice} / $300</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full bg-foreground transition-all duration-300"
                    style={{
                      width: `${Math.min(100, Math.round((totalBagPrice / 300) * 100))}%`,
                    }}
                  />
                </div>
              </div>

              {/* Bag Items List */}
              <div className="mt-4 max-h-[54vh] divide-y divide-border overflow-y-auto pr-1">
                {bag.length === 0 ? (
                  <div className="py-16 text-center text-sm text-muted-foreground">
                    Your atelier bag is empty. Brush along the 3D dress rail or select a
                    piece from the edit.
                  </div>
                ) : (
                  bag.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between gap-3 py-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-muted/50 p-1.5">
                          <GarmentPreview
                            item={entry.garment}
                            view="front"
                            hanger={hangerMode}
                            className="h-full w-auto"
                          />
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
                Complimentary breathable cotton garment bag included with every dress.
              </p>

              {checkoutDone ? (
                <div className="mt-4 rounded-xl border border-emerald-600/30 bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-emerald-300">
                  <div className="flex items-center gap-2 font-semibold">
                    <Check className="size-4" />
                    <span>Atelier Dress Reservation Confirmed</span>
                  </div>
                  <p className="mt-1">
                    Your {totalBagCount} selected pieces have been reserved for salon dispatch.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={bag.length === 0}
                  onClick={() => setCheckoutDone(true)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
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
