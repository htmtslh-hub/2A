# Photorealistic Dress Rail Gallery Prompt (`ClothingRailHero` + 30 Studio Cut-out `.webp` Assets)

````carousel
![Giao diện 3D Dress Rail thực tế (Light Mode) với 30 ảnh chụp váy tách nền .webp](C:/Users/Lenovo/.gemini/antigravity/brain/35b44108-bb6f-427c-8b79-934219fcc273/dress_rail_hero_light.png)
<!-- slide -->
![Giao diện 3D Dress Rail thực tế (Dark Mode) đã khử sạch viền trắng](C:/Users/Lenovo/.gemini/antigravity/brain/35b44108-bb6f-427c-8b79-934219fcc273/dress_rail_hero_dark.png)
<!-- slide -->
![Modal 3D Inspection xoay Mặt trước / Mặt sau với ảnh chụp studio thật](C:/Users/Lenovo/.gemini/antigravity/brain/35b44108-bb6f-427c-8b79-934219fcc273/dress_rail_detail_modal.png)
````

> [!IMPORTANT]
> **Tại sao bản prompt này hiển thị ảnh váy chụp thật 100% (Photorealistic) giống hệt bản áo gốc?**
> - Trong [`product-rail-gallery.tsx`](file:///d:/3.%20D%E1%BB%B1%20%C3%A1n/2A/clothing-rail-web/src/components/ui/product-rail-gallery.tsx), các đường nét vector `ART` (`<Fabric />` & `<SideArt />`) chỉ là **chế độ dự phòng (fallback)** khi một sản phẩm bị bỏ trống trường `image`, `backImage`, `sideImage`.
> - Để hiển thị **ảnh chụp studio thật** như bản gốc, mỗi mẫu váy trong [`RAIL_DEMO_ITEMS`](file:///d:/3.%20D%E1%BB%B1%20%C3%A1n/2A/clothing-rail-web/src/components/ui/demo.tsx) phải khai báo đủ **3 file ảnh chụp thật đã tách nền trong suốt (`.webp` tỉ lệ `200 × 310`, `HOOK_TOP = 4`)**:
>   - `image`: Ảnh chụp mặt trước chiếc váy treo trên móc gỗ (`/dresses/{id}-front.webp`)
>   - `backImage`: Ảnh chụp mặt sau chiếc váy treo trên móc gỗ (`/dresses/{id}-back.webp`)
>   - `sideImage`: Ảnh chụp góc nghiêng 90° khi chiếc váy nằm dọc trên thanh treo (`/dresses/{id}-side.webp`)
> - Đồng thời truyền `hanger="none"` vào `<ClothingRailHero />` vì móc gỗ thật và móc kim loại đã nằm sẵn trong ảnh chụp `.webp`.

---

## Prompt đầy đủ để Copy-Paste

\\markdown
You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
\	sx
product-rail-gallery.tsx
"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export type GarmentKind = "slip" | "midi" | "gown" | "wrap" | "blazer-dress" | "pleated";

export interface RailGarment {
  id: string;
  /** Accessible name, caption and detail title. */
  name: string;
  description?: string;
  /** Built-in dress silhouette illustration, used when no image is supplied. */
  kind?: GarmentKind;
  /** Fabric colour of the dress illustration (any CSS colour). */
  color?: string;
  /** Trim colour for waistbands, belts, straps, cords and buttons. */
  trim?: string;
  /** Front photo. Best as a transparent cut-out on a 200 × 310 portrait canvas. Front, back and side photos of one piece must share the same canvas and scale, or the piece changes size as it turns. */
  image?: string;
  /** Back photo; the front photo is reused when omitted. */
  backImage?: string;
  /** Side-on photo shown while the piece rests on the rail; omit to show the front photo turned away. */
  sideImage?: string;
  /** Short hang-tag text such as a price or a size. */
  tag?: string;
  /** Short facts listed in the detail view. */
  details?: string[];
}

export interface ClothingRailHeroLabels {
  front: string;
  back: string;
  close: string;
  show: string;
}

export interface ClothingRailHeroProps extends React.ComponentProps<"section"> {
  items: RailGarment[];
  eyebrow?: string;
  heading?: string;
  /** Shown under the rail while nothing is turned to the front. */
  caption?: string;
  /** Call to action rendered under the caption. */
  action?: React.ReactNode;
  /** Turns the pieces to the front one by one until the visitor interacts. */
  autoplay?: boolean;
  /** Milliseconds each piece faces the front during autoplay. */
  interval?: number;
  /** Drawn hanger. Use "none" when your photos already include a hanger with its hook at the top. */
  hanger?: "wood" | "matte" | "none";
  labels?: ClothingRailHeroLabels;
  onOpenChange?: (index: number | null) => void;
}

const VB_W = 200;
const VB_H = 310;
const ASPECT = VB_W / VB_H;
const HOOK_TOP = 4;
const RAIL_R = 4.6;
const REST = -70;
const PERSPECTIVE = 1100;
const GAP = 0.035;
const MAX_H = 400;
const MIN_WIDE_H = 200;
const CAROUSEL_H = 340;
const DEFAULT_LABELS: ClothingRailHeroLabels = { front: "Front", back: "Back", close: "Close", show: "Show" };

type Tone = { d: string; t: number };
type Art = {
  body: string;
  sleeves: string[];
  under?: string;
  hood?: string;
  ribs: string[];
  panels: Tone[];
  seams: string[];
  stitches: string[];
  folds: string[];
  cords?: string[];
  buttons?: number[][];
};

const ART = {
  slip: {
    front: {
      body: "M64,43 L68,43 L70,68 C82,82 118,82 130,68 L132,43 L136,43 L135,72 C134,94 130,114 133,136 C138,176 148,220 154,264 C124,271 76,271 46,264 C52,220 62,176 67,136 C70,114 66,94 65,72 Z",
      sleeves: [],
      under: "M68,66 C84,74 116,74 132,66 C120,82 80,82 68,66 Z",
      ribs: [],
      panels: [
        { d: "M67,70 C84,88 116,88 133,70 C124,96 76,96 67,70 Z", t: 0.06 },
        { d: "M46,256 C76,263 124,263 154,256 L154,264 C124,271 76,271 46,264 Z", t: -0.05 },
      ],
      seams: ["M68,128 C88,133 112,133 132,128"],
      stitches: ["M48,259 C78,266 122,266 152,259"],
      folds: [
        "M74,78 C88,92 112,92 126,78",
        "M72,132 C66,176 58,222 54,262",
        "M128,132 C134,176 142,222 146,262",
        "M92,136 C88,182 84,224 80,266",
        "M110,136 C114,182 118,224 122,266",
      ],
    },
    back: {
      body: "M64,43 L68,43 L70,76 C84,92 116,92 130,76 L132,43 L136,43 L135,74 C134,96 130,114 133,136 C138,176 148,220 154,264 C124,271 76,271 46,264 C52,220 62,176 67,136 C70,114 66,96 65,74 Z",
      sleeves: [],
      ribs: [],
      panels: [{ d: "M46,256 C76,263 124,263 154,256 L154,264 C124,271 76,271 46,264 Z", t: -0.05 }],
      seams: ["M100,88 L100,266"],
      stitches: ["M48,259 C78,266 122,266 152,259"],
      folds: [
        "M72,132 C66,176 58,222 54,262",
        "M128,132 C134,176 142,222 146,262",
        "M100,124 C98,176 102,222 100,266",
      ],
    },
  },
  midi: {
    front: {
      body: "M54,44 L70,44 L72,66 C86,70 114,70 128,66 L130,44 L146,44 L142,84 C139,102 134,114 132,124 L170,258 C134,268 66,268 30,258 L68,124 C66,114 61,102 58,84 Z",
      sleeves: [],
      under: "M70,64 C86,60 114,60 130,64 C116,70 84,70 70,64 Z",
      ribs: ["M68,120 L132,120 L133,127 L67,127 Z"],
      panels: [
        { d: "M68,124 L84,124 L68,262 L30,258 Z", t: -0.04 },
        { d: "M132,124 L116,124 L132,262 L170,258 Z", t: -0.04 },
        { d: "M84,68 L88,120 L112,120 L116,68 C106,71 94,71 84,68 Z", t: 0.03 },
      ],
      seams: [
        "M80,68 L85,120",
        "M120,68 L115,120",
        "M68,124 L132,124",
        "M84,127 L68,262",
        "M116,127 L132,262",
      ],
      stitches: ["M33,252 C68,262 132,262 167,252"],
      folds: [
        "M74,130 C64,174 52,218 44,256",
        "M126,130 C136,174 148,218 156,256",
        "M92,130 C88,176 84,220 82,262",
        "M108,130 C112,176 116,220 118,262",
        "M100,130 L100,263",
      ],
    },
    back: {
      body: "M54,44 L70,44 L72,72 L128,72 L130,44 L146,44 L142,84 C139,102 134,114 132,124 L170,258 C134,268 66,268 30,258 L68,124 C66,114 61,102 58,84 Z",
      sleeves: [],
      ribs: ["M68,120 L132,120 L133,127 L67,127 Z"],
      panels: [],
      seams: ["M100,72 L100,263", "M68,124 L132,124"],
      stitches: ["M33,252 C68,262 132,262 167,252"],
      folds: [
        "M74,130 C64,174 52,218 44,256",
        "M126,130 C136,174 148,218 156,256",
        "M90,130 C86,176 82,220 80,262",
        "M110,130 C114,176 118,220 120,262",
      ],
    },
  },
  gown: {
    front: {
      body: "M76,35 C88,44 112,44 124,35 L154,46 C158,52 158,60 154,70 C146,88 138,108 135,126 C138,154 144,186 154,224 L174,294 C136,303 64,303 26,294 L46,224 C56,186 62,154 65,126 C62,108 54,88 46,70 C42,60 42,52 46,46 Z",
      sleeves: [],
      under: "M76,35 C88,30 112,30 124,35 C112,44 88,44 76,35 Z",
      ribs: [],
      panels: [
        { d: "M76,35 C88,44 112,44 124,35 L138,62 C114,76 86,76 62,62 Z", t: 0.05 },
        { d: "M65,126 L100,134 L135,126 L144,182 C116,192 84,192 56,182 Z", t: -0.03 },
      ],
      seams: [
        "M65,126 C88,132 112,132 135,126",
        "M78,66 C80,92 78,110 76,128",
        "M122,66 C120,92 122,110 124,128",
      ],
      stitches: ["M29,289 C66,298 134,298 171,289"],
      folds: [
        "M62,64 C84,82 116,82 138,64",
        "M72,132 C64,184 50,242 38,294",
        "M128,132 C136,184 150,242 162,294",
        "M88,134 C82,190 74,244 68,296",
        "M112,134 C118,190 126,244 132,296",
        "M100,136 C99,192 101,246 100,298",
      ],
    },
    back: {
      body: "M76,35 C88,31 112,31 124,35 L154,46 C158,52 158,60 154,70 C146,88 138,108 135,126 C138,154 144,186 154,224 L174,294 C136,303 64,303 26,294 L46,224 C56,186 62,154 65,126 C62,108 54,88 46,70 C42,60 42,52 46,46 Z",
      sleeves: [],
      ribs: [],
      panels: [{ d: "M76,35 L100,112 L124,35 C112,31 88,31 76,35 Z", t: -0.08 }],
      seams: ["M100,112 L100,298", "M65,126 C88,132 112,132 135,126"],
      stitches: ["M29,289 C66,298 134,298 171,289"],
      folds: [
        "M72,132 C64,184 50,242 38,294",
        "M128,132 C136,184 150,242 162,294",
        "M88,134 C82,190 74,244 68,296",
        "M112,134 C118,190 126,244 132,296",
      ],
    },
  },
  wrap: {
    front: {
      body: "M78,35 L100,82 L122,35 L156,46 C160,52 160,60 156,72 L136,124 L162,254 C132,264 106,262 84,248 C68,258 52,258 38,252 L64,124 L44,72 C40,60 40,52 44,46 Z",
      sleeves: [
        "M44,46 C34,50 24,62 18,82 C24,90 34,96 44,98 L50,74 Z",
        "M156,46 C166,50 176,62 182,82 C176,90 166,96 156,98 L150,74 Z",
      ],
      under: "M78,35 C90,30 110,30 122,35 L100,82 Z",
      ribs: ["M63,121 L137,121 L138,131 L62,131 Z"],
      panels: [
        { d: "M122,35 L156,46 L136,121 L64,121 Z", t: 0.04 },
        { d: "M64,131 L136,131 L116,256 C86,258 58,256 38,252 Z", t: 0.03 },
      ],
      seams: [
        "M122,35 L64,121",
        "M78,35 L100,82",
        "M132,131 L106,254",
      ],
      stitches: ["M40,248 C72,256 128,258 160,249"],
      folds: [
        "M116,52 C100,76 84,98 70,120",
        "M74,134 C66,174 56,214 48,250",
        "M126,134 C136,174 146,214 152,250",
        "M100,134 C94,176 88,216 84,248",
      ],
      cords: ["M74,128 C70,152 66,174 68,196", "M82,128 C84,148 88,168 86,188"],
    },
    back: {
      body: "M78,35 C90,31 110,31 122,35 L156,46 C160,52 160,60 156,72 L136,124 L162,254 C128,264 72,264 38,254 L64,124 L44,72 C40,60 40,52 44,46 Z",
      sleeves: [
        "M44,46 C34,50 24,62 18,82 C24,90 34,96 44,98 L50,74 Z",
        "M156,46 C166,50 176,62 182,82 C176,90 166,96 156,98 L150,74 Z",
      ],
      ribs: ["M63,121 L137,121 L138,131 L62,131 Z"],
      panels: [],
      seams: ["M64,126 L136,126", "M100,34 L100,121"],
      stitches: ["M40,249 C74,258 126,258 160,249"],
      folds: [
        "M74,134 C66,174 56,214 48,250",
        "M126,134 C136,174 146,214 152,250",
        "M100,134 L100,256",
      ],
    },
  },
  "blazer-dress": {
    front: {
      body: "M78,34 L100,96 L122,34 L162,47 C166,53 166,62 162,74 L144,126 L156,228 C124,234 76,234 44,228 L56,126 L38,74 C34,62 34,53 38,47 Z",
      sleeves: [
        "M38,47 C28,53 23,64 22,80 L18,198 C25,202 35,202 42,199 L46,96 C45,78 42,62 38,47 Z",
        "M162,47 C172,53 177,64 178,80 L182,198 C175,202 165,202 158,199 L154,96 C155,78 158,62 162,47 Z",
      ],
      under: "M78,34 C90,29 110,29 122,34 L100,96 Z",
      ribs: [],
      panels: [
        { d: "M78,34 L60,66 L74,72 L66,86 L100,118 L100,96 Z", t: 0.05 },
        { d: "M122,34 L140,66 L126,72 L134,86 L100,118 L100,96 Z", t: 0.05 },
        { d: "M54,158 L82,158 L82,167 L54,167 Z", t: -0.06 },
        { d: "M118,158 L146,158 L146,167 L118,167 Z", t: -0.06 },
      ],
      seams: [
        "M100,118 L100,230",
        "M68,88 L74,228",
        "M132,88 L126,228",
      ],
      stitches: ["M46,223 C78,229 122,229 154,223"],
      folds: [
        "M62,130 C58,164 54,196 50,226",
        "M138,130 C142,164 146,196 150,226",
        "M30,88 C28,130 28,164 26,194",
        "M170,88 C172,130 172,164 174,194",
      ],
      buttons: [
        [88, 128],
        [112, 128],
        [88, 154],
        [112, 154],
        [88, 180],
        [112, 180],
      ],
    },
    back: {
      body: "M78,34 C90,30 110,30 122,34 L162,47 C166,53 166,62 162,74 L144,126 L156,228 C124,234 76,234 44,228 L56,126 L38,74 C34,62 34,53 38,47 Z",
      sleeves: [
        "M38,47 C28,53 23,64 22,80 L18,198 C25,202 35,202 42,199 L46,96 C45,78 42,62 38,47 Z",
        "M162,47 C172,53 177,64 178,80 L182,198 C175,202 165,202 158,199 L154,96 C155,78 158,62 162,47 Z",
      ],
      ribs: [],
      panels: [{ d: "M78,34 C90,30 110,30 122,34 L126,44 C110,38 90,38 74,44 Z", t: 0.04 }],
      seams: ["M100,42 L100,230", "M72,76 L76,228", "M128,76 L124,228"],
      stitches: ["M46,223 C78,229 122,229 154,223"],
      folds: [
        "M64,126 C60,164 56,196 52,226",
        "M136,126 C140,164 144,196 148,226",
      ],
    },
  },
  pleated: {
    front: {
      body: "M78,35 C90,39 110,39 122,35 L138,122 L174,282 C136,292 64,292 26,282 L62,122 Z",
      sleeves: [],
      under: "M78,35 C90,30 110,30 122,35 C110,39 90,39 78,35 Z",
      ribs: [
        "M78,35 C90,39 110,39 122,35 L125,43 C110,47 90,47 75,43 Z",
        "M62,120 L138,120 L139,129 L61,129 Z",
      ],
      panels: [
        { d: "M62,129 L76,129 L52,285 L26,282 Z", t: -0.04 },
        { d: "M90,129 L100,129 L96,288 L76,287 Z", t: 0.03 },
        { d: "M110,129 L124,129 L148,285 L124,287 Z", t: -0.04 },
      ],
      seams: [
        "M72,129 L46,284",
        "M84,129 L68,286",
        "M94,129 L88,288",
        "M106,129 L112,288",
        "M116,129 L132,286",
        "M128,129 L154,284",
      ],
      stitches: ["M28,278 C66,288 134,288 172,278"],
      folds: [
        "M84,48 C80,74 74,98 70,120",
        "M116,48 C120,74 126,98 130,120",
        "M100,48 L100,120",
        "M66,132 L36,282",
        "M78,132 L58,285",
        "M90,132 L78,287",
        "M100,132 L100,288",
        "M110,132 L122,287",
        "M122,132 L142,285",
        "M134,132 L164,282",
      ],
    },
    back: {
      body: "M78,35 C90,32 110,32 122,35 L138,122 L174,282 C136,292 64,292 26,282 L62,122 Z",
      sleeves: [],
      ribs: [
        "M78,35 C90,32 110,32 122,35 L124,42 C110,39 90,39 76,42 Z",
        "M62,120 L138,120 L139,129 L61,129 Z",
      ],
      panels: [],
      seams: [
        "M72,129 L46,284",
        "M86,129 L70,286",
        "M100,129 L100,288",
        "M114,129 L130,286",
        "M128,129 L154,284",
      ],
      stitches: ["M28,278 C66,288 134,288 172,278"],
      folds: [
        "M66,132 L36,282",
        "M82,132 L64,286",
        "M100,132 L100,288",
        "M118,132 L136,286",
        "M134,132 L164,282",
      ],
    },
  },
} as const;

const KINDS = ["slip", "midi", "gown", "wrap", "blazer-dress", "pleated"] as const;

const SIDE = {
  slip: { hem: 266, long: false, hood: false, width: 0.22 },
  midi: { hem: 262, long: false, hood: false, width: 0.26 },
  gown: { hem: 296, long: false, hood: false, width: 0.28 },
  wrap: { hem: 256, long: false, hood: false, width: 0.25 },
  "blazer-dress": { hem: 230, long: true, hood: false, width: 0.27 },
  pleated: { hem: 286, long: false, hood: false, width: 0.27 },
} as const;

function sideShapes(kind: GarmentKind) {
  const side = SIDE[kind];
  const hem = side.hem;
  const cuff = side.long ? 198 : 96;
  const body = `M86,58 C84,96 86,128 83,164 C80,204 78,${hem - 18} 79,${hem} C90,${hem + 6} 110,${hem + 6} 121,${hem} C122,${hem - 18} 120,204 117,164 C114,128 116,96 114,58 Z`;
  const sleeve = `M85,54 C85,46 91,42 100,42 C109,42 115,46 115,54 C116,${Math.round(cuff * 0.64)} 118,${cuff - 12} 118,${cuff} C118,${cuff + 5} 114,${cuff + 7} 109,${cuff + 7} C100,${cuff + 8} 91,${cuff + 6} 84,${cuff + 2} C82,${cuff - 2} 82,${cuff - 8} 83,${cuff - 14} C84,74 84,64 85,54 Z`;
  const hood = null;
  return { body, sleeve, hood, cuff };
}

function artFor(kind: GarmentKind, side: "front" | "back"): Art {
  const entry = ART[kind] as unknown as { front: Art; back: Art };
  return side === "front" ? entry.front : entry.back;
}

function silhouettePaths(art: Art) {
  return [art.body, ...art.sleeves, ...(art.hood ? [art.hood] : [])];
}

const maskCache = new Map();
function silhouetteMask(kind: GarmentKind, side: "front" | "back") {
  const key = `${kind}:${side}`;
  const cached = maskCache.get(key) as string | undefined;
  if (cached) return cached;
  const paths = silhouettePaths(artFor(kind, side)).map((d) => `<path d='${d}'/>`).join("");
  const url = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${VB_W} ${VB_H}' preserveAspectRatio='xMidYMin meet'>${paths}</svg>`)}")`;
  maskCache.set(key, url);
  return url;
}

function mix(color: string, amount: number) {
  if (amount === 0) return color;
  const keep = Math.round((1 - Math.min(1, Math.abs(amount))) * 1000) / 10;
  return `color-mix(in oklab, ${color} ${keep}%, ${amount > 0 ? "white" : "black"})`;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function lambert(angle: number) {
  const r = (angle * Math.PI) / 180;
  const diffuse = Math.max(0, Math.sin(r) * 0.42 + Math.cos(r) * 0.91);
  return 0.66 + 0.34 * diffuse;
}

function Defs({ uid }: { uid: string }) {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute" focusable="false">
      <defs>
        {KINDS.map((kind) => (["front", "back"] as const).map((side) => (
          <clipPath key={`${kind}-${side}`} id={`${uid}-clip-${kind}-${side}`}>
            {silhouettePaths(artFor(kind, side)).map((d) => <path key={d} d={d} />)}
          </clipPath>
        )))}
        <linearGradient id={`${uid}-volume`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="black" stopOpacity="0.32" />
          <stop offset="0.18" stopColor="black" stopOpacity="0.08" />
          <stop offset="0.44" stopColor="white" stopOpacity="0.14" />
          <stop offset="0.58" stopColor="white" stopOpacity="0.06" />
          <stop offset="0.84" stopColor="black" stopOpacity="0.12" />
          <stop offset="1" stopColor="black" stopOpacity="0.36" />
        </linearGradient>
        <linearGradient id={`${uid}-drape`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.18" />
          <stop offset="0.25" stopColor="white" stopOpacity="0" />
          <stop offset="0.75" stopColor="black" stopOpacity="0.04" />
          <stop offset="1" stopColor="black" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id={`${uid}-sidevol`} gradientUnits="userSpaceOnUse" x1="78" x2="122" y1="0" y2="0">
          <stop offset="0" stopColor="white" stopOpacity="0.16" />
          <stop offset="0.3" stopColor="white" stopOpacity="0.05" />
          <stop offset="0.7" stopColor="black" stopOpacity="0.08" />
          <stop offset="0.95" stopColor="black" stopOpacity="0.28" />
          <stop offset="1" stopColor="black" stopOpacity="0.18" />
        </linearGradient>
        <filter id={`${uid}-cloth`} x="-12%" y="-4%" width="124%" height="108%">
          <feTurbulence type="fractalNoise" baseFrequency="0.016 0.028" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {KINDS.map((kind) => (
          <React.Fragment key={`side-${kind}`}>
            <clipPath id={`${uid}-sb-${kind}`}><path d={sideShapes(kind).body} /></clipPath>
            <clipPath id={`${uid}-ss-${kind}`}><path d={sideShapes(kind).sleeve} /></clipPath>
          </React.Fragment>
        ))}
        <linearGradient id={`${uid}-wood`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="color-mix(in oklab, sienna 55%, white)" />
          <stop offset="0.45" stopColor="color-mix(in oklab, sienna 80%, black)" />
          <stop offset="1" stopColor="color-mix(in oklab, sienna 45%, black)" />
        </linearGradient>
        <linearGradient id={`${uid}-woodgrain`} gradientUnits="userSpaceOnUse" spreadMethod="repeat" x1="0" x2="11" y1="0" y2="0.6">
          <stop offset="0" stopColor="black" stopOpacity="0" />
          <stop offset="0.45" stopColor="black" stopOpacity="0.16" />
          <stop offset="0.6" stopColor="white" stopOpacity="0.08" />
          <stop offset="1" stopColor="black" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-chrome`} gradientUnits="userSpaceOnUse" x1="98.5" x2="101.7" y1="0" y2="0">
          <stop offset="0" stopColor="color-mix(in oklab, white 45%, gray)" />
          <stop offset="0.35" stopColor="white" />
          <stop offset="0.78" stopColor="color-mix(in oklab, gray 65%, black)" />
          <stop offset="1" stopColor="color-mix(in oklab, gray 75%, white)" />
        </linearGradient>
        <pattern id={`${uid}-rib`} width="2.6" height="8" patternUnits="userSpaceOnUse">
          <rect width="1.1" height="8" fill="black" fillOpacity="0.2" />
          <rect x="1.3" width="0.7" height="8" fill="white" fillOpacity="0.08" />
        </pattern>
        <pattern id={`${uid}-pleat`} width="4" height="8" patternUnits="userSpaceOnUse">
          <rect width="1.2" height="8" fill="black" fillOpacity="0.08" />
          <rect x="2" width="0.8" height="8" fill="white" fillOpacity="0.08" />
        </pattern>
        <filter id={`${uid}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
        </filter>
        <filter id={`${uid}-soft`} x="-20%" y="-5%" width="140%" height="110%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
    </svg>
  );
}

const HOOK = "M100,36 L100,-0.4 C100,-3.4 102.2,-4.2 103.9,-2.8 C104.9,-2 105.4,-1.2 105.6,-0.2";
const HOOK_HI = "M99.5,30 L99.5,-0.2 C99.5,-2.4 101,-3.2 102.4,-2.6";
const BAR = "M38,57 Q70,38 100,36 Q130,38 162,57";
const BAR_HI = "M40,54.5 Q71,35.5 100,33.5 Q129,35.5 160,54.5";

function Hook({ uid }: { uid: string }) {
  return (
    <>
      <path d={HOOK} fill="none" stroke="black" strokeOpacity="0.28" strokeWidth="3.4" strokeLinecap="round" transform="translate(0.9 1.1)" />
      <path d={HOOK} fill="none" stroke={`url(#${uid}-chrome)`} strokeWidth="2.6" strokeLinecap="round" />
      <path d={HOOK_HI} fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="0.6" strokeLinecap="round" />
      <ellipse cx="105.9" cy="0.6" rx="1.9" ry="0.9" fill="black" fillOpacity="0.4" />
      <rect x="96" y="27" width="8" height="9" rx="2" fill={`url(#${uid}-chrome)`} />
      <rect x="97.2" y="28.2" width="2" height="6.6" rx="1" fill="white" fillOpacity="0.5" />
    </>
  );
}

function Hanger({ uid, side, kind, material }: { uid: string; side: "front" | "back"; kind: GarmentKind | null; material: "wood" | "matte" | "none" }) {
  const art = kind ? artFor(kind, side) : null;
  const bar = material === "wood" ? `url(#${uid}-wood)` : "currentColor";
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMin meet" className={`absolute inset-0 size-full overflow-visible ${material === "matte" ? "text-foreground/85" : ""}`}>
      {art?.hood && <path d={art.hood} fill="var(--garment-color)" />}
      {art?.hood && <path d={art.hood} fill="black" fillOpacity="0.22" />}
      {art?.under && <path d={art.under} fill="var(--garment-under)" />}
      {material !== "none" && (
        <>
          <path d={BAR} fill="none" stroke="black" strokeOpacity="0.25" strokeWidth="9.5" strokeLinecap="round" transform="translate(0.6 1.6)" />
          <path d={BAR} fill="none" stroke={bar} strokeWidth="8.5" strokeLinecap="round" />
          {material === "wood" && <path d={BAR} fill="none" stroke={`url(#${uid}-woodgrain)`} strokeWidth="8.5" strokeLinecap="round" />}
          <path d={BAR_HI} fill="none" stroke="white" strokeOpacity={material === "wood" ? 0.3 : 0.14} strokeWidth="1.1" strokeLinecap="round" />
          <Hook uid={uid} />
        </>
      )}
    </svg>
  );
}

function SideHanger({ uid, material }: { uid: string; material: "wood" | "matte" | "none" }) {
  if (material === "none") return null;
  const bar = material === "wood" ? `url(#${uid}-wood)` : "currentColor";
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMin meet" className={`absolute inset-0 size-full overflow-visible ${material === "matte" ? "text-foreground/85" : ""}`}>
      <path d="M97.8,35 L102.2,35 L104.5,50 L95.5,50 Z" fill={bar} />
      <path d="M98.6,36 L100,36 L100,49 L97.3,49 Z" fill="white" fillOpacity="0.22" />
      <Hook uid={uid} />
    </svg>
  );
}

function Fabric({ uid, kind, side, color, trim }: { uid: string; kind: GarmentKind; side: "front" | "back"; color: string; trim: string }) {
  const art = artFor(kind, side);
  const clip = `url(#${uid}-clip-${kind}-${side})`;
  const isPleated = kind === "pleated";
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMin meet" className="absolute inset-0 size-full overflow-visible">
      <path d={art.body} fill={color} />
      {art.sleeves.map((d) => <path key={d} d={d} fill={color} />)}
      <g clipPath={clip}>
        {isPleated && <rect width={VB_W} height={VB_H} fill={`url(#${uid}-pleat)`} />}
        {art.panels.map((panel) => <path key={panel.d} d={panel.d} fill={mix(color, panel.t)} />)}
        {art.ribs.map((d) => <path key={d} d={d} fill={mix(trim, 0)} />)}
        {art.ribs.map((d) => <path key={`${d}-rib`} d={d} fill={`url(#${uid}-rib)`} />)}
        <g filter={`url(#${uid}-soft)`} fill="none" strokeLinecap="round">
          {art.folds.map((d) => <path key={d} d={d} stroke="black" strokeOpacity="0.2" strokeWidth="3.6" />)}
          {art.folds.map((d) => <path key={`${d}-hi`} d={d} stroke="white" strokeOpacity="0.12" strokeWidth="1.8" transform="translate(2 0)" />)}
          {art.sleeves.map((d) => <path key={`${d}-edge`} d={d} stroke="black" strokeOpacity="0.2" strokeWidth="3" />)}
        </g>
        <rect width={VB_W} height={VB_H} fill={`url(#${uid}-volume)`} />
        <rect width={VB_W} height={VB_H} fill={`url(#${uid}-drape)`} />
        <rect width={VB_W} height={VB_H} filter={`url(#${uid}-grain)`} opacity="0.14" style={{ mixBlendMode: "multiply" }} />
      </g>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {art.seams.map((d) => <path key={d} d={d} stroke="black" strokeOpacity="0.22" strokeWidth="0.8" />)}
        {art.stitches.map((d) => <path key={d} d={d} stroke={mix(color, 0.35)} strokeOpacity="0.5" strokeWidth="0.6" strokeDasharray="1.6 1.4" />)}
        {art.cords?.map((d) => <path key={d} d={d} stroke={trim} strokeWidth="2.2" />)}
      </g>
      {art.buttons?.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="2.6" fill={mix(trim, -0.15)} />
          <circle cx={(x ?? 0) - 0.6} cy={(y ?? 0) - 0.7} r="0.9" fill="white" fillOpacity="0.45" />
        </g>
      ))}
    </svg>
  );
}

function SideArt({ uid, kind, color, trim }: { uid: string; kind: GarmentKind; color: string; trim: string }) {
  const { body, sleeve, cuff } = sideShapes(kind);
  const isPleated = kind === "pleated";
  const soft = `url(#${uid}-soft)`;
  const hem = SIDE[kind].hem;
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMin meet" className="absolute inset-0 size-full overflow-visible">
      <g filter={`url(#${uid}-cloth)`}>
        <path d={body} fill={color} />
        <g clipPath={`url(#${uid}-sb-${kind})`}>
          {isPleated && <rect width={VB_W} height={VB_H} fill={`url(#${uid}-pleat)`} />}
          <g filter={soft} fill="none" strokeLinecap="round">
            <path d={`M90,${cuff + 10} C87,150 92,190 86,${hem - 4}`} stroke="black" strokeOpacity="0.24" strokeWidth="2.6" />
            <path d={`M92,${cuff + 10} C89,150 94,190 88,${hem - 4}`} stroke="white" strokeOpacity="0.14" strokeWidth="1.2" />
            <path d={`M106,${cuff + 6} C109,140 104,186 110,${hem - 2}`} stroke="black" strokeOpacity="0.17" strokeWidth="2.2" />
            <path d={`M99,${cuff + 24} C97,170 101,210 98,${hem - 2}`} stroke="black" strokeOpacity="0.12" strokeWidth="2" />
            <path d={`M82,${hem + 1} C92,${hem + 6} 108,${hem + 6} 118,${hem + 1}`} stroke="black" strokeOpacity="0.32" strokeWidth="6" />
          </g>
          <rect width={VB_W} height={VB_H} fill={`url(#${uid}-sidevol)`} />
          <rect width={VB_W} height={VB_H} fill={`url(#${uid}-drape)`} />
          <rect width={VB_W} height={VB_H} filter={`url(#${uid}-grain)`} opacity="0.14" style={{ mixBlendMode: "multiply" }} />
        </g>
        <path d={sleeve} fill={color} />
        <g clipPath={`url(#${uid}-ss-${kind})`}>
          <g filter={soft} fill="none" strokeLinecap="round">
            <path d={`M91,60 C88,76 90,${cuff - 12} 91,${cuff}`} stroke="black" strokeOpacity="0.16" strokeWidth="2.4" />
            <path d={`M109,58 C112,74 110,${cuff - 12} 109,${cuff}`} stroke="black" strokeOpacity="0.2" strokeWidth="2.4" />
          </g>
          <rect width={VB_W} height={VB_H} fill={`url(#${uid}-sidevol)`} />
          <rect width={VB_W} height={VB_H} fill={`url(#${uid}-drape)`} />
        </g>
      </g>
      <ellipse cx="100" cy="46" rx="9.5" ry="3" fill={trim} />
      <ellipse cx="100" cy="46" rx="9.5" ry="3" fill="none" stroke="black" strokeOpacity="0.2" strokeWidth="0.6" />
    </svg>
  );
}

function Photo({ src, alt, full }: { src: string; alt: string; full: boolean }) {
  return <img src={src} alt={alt} draggable={false} className={`pointer-events-none absolute inset-x-0 bottom-0 size-auto w-full select-none object-contain object-top ${full ? "top-0 h-full" : "top-[8%] h-[92%]"}`} />;
}

export function GarmentPreview({
  item,
  view = "front",
  hanger = "wood",
  className = "",
}: {
  item: RailGarment;
  view?: "front" | "back" | "side";
  hanger?: "wood" | "matte" | "none";
  className?: string;
}) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const kind = item.kind ?? "slip";
  const color = item.color ?? "var(--color-muted-foreground)";
  const trim = item.trim ?? mix(color, -0.14);
  const src =
    view === "back"
      ? item.backImage ?? item.image
      : view === "side"
      ? item.sideImage ?? item.image
      : item.image;

  return (
    <div
      className={`relative aspect-[200/310] select-none ${className}`}
      style={{
        ["--garment-color" as string]: color,
        ["--garment-under" as string]: mix(color, -0.42),
      }}
    >
      <Defs uid={uid} />
      {view === "side" ? (
        <>
          <SideHanger uid={uid} material={hanger} />
          {src ? (
            <Photo src={src} alt={item.name} full={hanger === "none"} />
          ) : (
            <SideArt uid={uid} kind={kind} color={color} trim={trim} />
          )}
        </>
      ) : (
        <>
          <Hanger uid={uid} side={view} kind={src ? null : kind} material={hanger} />
          {src ? (
            <Photo src={src} alt={item.name} full={hanger === "none"} />
          ) : (
            <Fabric uid={uid} kind={kind} side={view} color={color} trim={trim} />
          )}
        </>
      )}
    </div>
  );
}

type Sim = {
  x: number[]; vx: number[]; tx: number[]; px: number[];
  turn: number[]; vturn: number[]; tturn: number[];
  swing: number[]; vswing: number[];
  tag: number[]; vtag: number[];
  drag: number; grab: number; free: number; last: number; raf: number;
};

function emptySim(): Sim {
  return { x: [], vx: [], tx: [], px: [], turn: [], vturn: [], tturn: [], swing: [], vswing: [], tag: [], vtag: [], drag: -1, grab: 0, free: 0, last: 0, raf: 0 };
}

function footprint(h: number, angle: number, sideW = 0.4) {
  const e = clamp(1 - angle / REST, 0, 1);
  const ease = e * e * (3 - 2 * e);
  return h * ASPECT * (sideW + (0.94 - sideW) * ease);
}

export function ClothingRailHero({
  items,
  eyebrow,
  heading,
  caption,
  action,
  autoplay = false,
  interval = 2600,
  hanger = "wood",
  labels = DEFAULT_LABELS,
  onOpenChange,
  className,
  ...rest
}: ClothingRailHeroProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const count = items.length;
  const stageRef = React.useRef(null as HTMLDivElement | null);
  const slots = React.useRef([] as (HTMLButtonElement | null)[]);
  const swings = React.useRef([] as (HTMLSpanElement | null)[]);
  const turns = React.useRef([] as (HTMLSpanElement | null)[]);
  const sides = React.useRef([] as (HTMLSpanElement | null)[]);
  const drapes = React.useRef([] as (HTMLSpanElement | null)[]);
  const shades = React.useRef([] as (HTMLSpanElement | null)[]);
  const shadows = React.useRef([] as (HTMLSpanElement | null)[]);
  const tags = React.useRef([] as (HTMLSpanElement | null)[]);
  const sim = React.useRef(emptySim());
  const [size, setSize] = React.useState({ width: 0, h: 300, carousel: false });
  const [active, setActive] = React.useState(null as number | null);
  const [focusIndex, setFocusIndex] = React.useState(0);
  const [openIndex, setOpenIndex] = React.useState(null as number | null);
  const [reduced, setReduced] = React.useState(false);
  const [playing, setPlaying] = React.useState(autoplay);
  const [lifted, setLifted] = React.useState(null as number | null);
  const returnFocus = React.useRef(null as number | null);
  const pendingOpen = React.useRef(-1);
  const pointer = React.useRef({ id: -1, index: -1, x: 0, y: 0, t: 0, moved: false, kind: "", swipe: 0, lastX: 0, lastT: 0, v: 0 });
  const sideWidths = React.useMemo(() => items.map((item) => (item.image ? (item.sideImage ? 0.3 : 0.4) : SIDE[item.kind ?? "slip"].width)), [items]);
  const live = React.useRef({ active: null as number | null, size, reduced, count, openIndex: null as number | null, carouselIndex: 0, sideWidths });
  live.current = { ...live.current, active, size, reduced, count, openIndex, sideWidths };

  const carouselIndex = size.carousel ? (active ?? live.current.carouselIndex) : null;

  React.useEffect(() => {
    const update = () => setReduced(document.documentElement.dataset.motion === "paused");
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => { setPlaying(autoplay); }, [autoplay]);

  React.useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = (width: number) => {
      const sideW = live.current.sideWidths.reduce((sum, w) => sum + w, 0) / Math.max(1, live.current.sideWidths.length);
      const restK = footprint(1, REST, sideW) + GAP;
      const activeK = footprint(1, 0, sideW) + GAP;
      const fit = (width - 24) / (count * restK + (activeK - restK));
      const carousel = fit < MIN_WIDE_H;
      const h = carousel ? Math.min(CAROUSEL_H, Math.max(220, width * 0.86)) : Math.min(MAX_H, fit);
      setSize((old) => (Math.abs(old.width - width) < 0.5 && old.carousel === carousel && Math.abs(old.h - h) < 0.5 ? old : { width, h: Math.round(h), carousel }));
    };
    measure(stage.clientWidth);
    const observer = new ResizeObserver((entries) => { const box = entries[0]; if (box) measure(box.contentRect.width); });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [count]);

  const targets = React.useCallback((h: number, width: number, carousel: boolean, front: number | null) => {
    const feet = items.map((_, i) => footprint(h, i === front ? 0 : REST, sideWidths[i]) + h * GAP);
    if (carousel) {
      const centre = front ?? 0;
      const xs = feet.map(() => 0);
      xs[centre] = width / 2;
      for (let i = centre + 1; i < feet.length; i++) xs[i] = (xs[i - 1] ?? 0) + ((feet[i - 1] ?? 0) + (feet[i] ?? 0)) / 2;
      for (let i = centre - 1; i >= 0; i--) xs[i] = (xs[i + 1] ?? 0) - ((feet[i + 1] ?? 0) + (feet[i] ?? 0)) / 2;
      return xs;
    }
    const total = feet.reduce((sum, f) => sum + f, 0);
    let cursor = (width - total) / 2;
    return feet.map((f) => { const x = cursor + f / 2; cursor += f; return x; });
  }, [items, sideWidths]);

  const paint = React.useCallback((i: number) => {
    const s = sim.current;
    const { h } = live.current.size;
    const w = h * ASPECT;
    const slot = slots.current[i];
    if (!slot) return;
    const angle = s.turn[i] ?? REST;
    const swing = s.swing[i] ?? 0;
    slot.style.transform = `translate3d(${((s.x[i] ?? 0) - w / 2).toFixed(2)}px,0,0)`;
    const sw = swings.current[i];
    if (sw) sw.style.transform = `rotate(${swing.toFixed(3)}deg)`;
    const e = clamp(1 - angle / REST, 0, 1);
    const tu = turns.current[i];
    const sd = sides.current[i];
    if (tu) {
      tu.style.transform = `perspective(${PERSPECTIVE}px) rotateY(${angle.toFixed(2)}deg)`;
      tu.style.opacity = sd ? clamp((e - 0.44) / 0.12, 0, 1).toFixed(3) : "1";
    }
    if (sd) {
      sd.style.opacity = clamp((0.56 - e) / 0.12, 0, 1).toFixed(3);
      sd.style.transform = `perspective(${PERSPECTIVE}px) rotateY(${(Math.min(1, e * 2) * -84).toFixed(2)}deg)`;
    }
    const lag = clamp(-(s.vswing[i] ?? 0) * 0.018, -5, 5);
    const dr = drapes.current[i];
    if (dr) dr.style.setProperty("--drape", `${lag.toFixed(3)}deg`);
    const sh = shades.current[i];
    if (sh) sh.style.setProperty("--shade", (1 - lambert(angle)).toFixed(3));
    const shadow = shadows.current[i];
    if (shadow) shadow.style.transform = `translate3d(${(w * 0.05).toFixed(1)}px, ${(h * 0.035).toFixed(1)}px, 0) scaleX(${Math.max(0.12, Math.abs(Math.cos((angle * Math.PI) / 180))).toFixed(3)})`;
    const tag = tags.current[i];
    if (tag) tag.style.transform = `rotate(${(-12 + (s.tag[i] ?? 0)).toFixed(2)}deg)`;
  }, []);

  const step = React.useCallback((now: number) => {
    const s = sim.current;
    const n = live.current.count;
    const dt = s.last ? Math.min(0.034, (now - s.last) / 1000) : 1 / 60;
    s.last = now;
    const { h, width, carousel } = live.current.size;
    let busy = false;
    const sub = 2;
    const sdt = dt / sub;
    for (let k = 0; k < sub; k++) {
      for (let i = 0; i < n; i++) {
        const before = s.vx[i] ?? 0;
        if (i !== s.drag) {
          const restoring = now > s.free;
          const stiff = restoring ? 130 : 0;
          const damp = restoring ? 2 * Math.sqrt(130) * 0.86 : 3.2;
          const ax = -stiff * ((s.x[i] ?? 0) - (s.tx[i] ?? 0)) - damp * before;
          s.vx[i] = before + ax * sdt;
          s.x[i] = (s.x[i] ?? 0) + (s.vx[i] ?? 0) * sdt;
        }
        const accel = ((s.vx[i] ?? 0) - before) / sdt;
        const ta = -150 * ((s.turn[i] ?? 0) - (s.tturn[i] ?? 0)) - 2 * Math.sqrt(150) * 0.78 * (s.vturn[i] ?? 0);
        s.vturn[i] = (s.vturn[i] ?? 0) + ta * sdt;
        s.turn[i] = (s.turn[i] ?? 0) + (s.vturn[i] ?? 0) * sdt;
        const sa = -24 * (s.swing[i] ?? 0) - 2.1 * (s.vswing[i] ?? 0) - clamp(accel, -6000, 6000) * 0.0045;
        s.vswing[i] = (s.vswing[i] ?? 0) + sa * sdt;
        s.swing[i] = clamp((s.swing[i] ?? 0) + (s.vswing[i] ?? 0) * sdt, -12, 12);
        const tagA = -46 * ((s.tag[i] ?? 0) - (s.swing[i] ?? 0) * 0.6) - 3.4 * (s.vtag[i] ?? 0) - (s.vswing[i] ?? 0) * 0.9;
        s.vtag[i] = (s.vtag[i] ?? 0) + tagA * sdt;
        s.tag[i] = clamp((s.tag[i] ?? 0) + (s.vtag[i] ?? 0) * sdt, -30, 30);
      }
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < n - 1; i++) {
          const a = s.x[i] ?? 0;
          const b = s.x[i + 1] ?? 0;
          const minGap = (footprint(h, s.turn[i] ?? REST, live.current.sideWidths[i]) + footprint(h, s.turn[i + 1] ?? REST, live.current.sideWidths[i + 1])) / 2 + h * 0.012;
          const overlap = minGap - (b - a);
          if (overlap <= 0) continue;
          if (i === s.drag) s.x[i + 1] = b + overlap;
          else if (i + 1 === s.drag) s.x[i] = a - overlap;
          else { s.x[i] = a - overlap / 2; s.x[i + 1] = b + overlap / 2; }
          const va = s.vx[i] ?? 0;
          const vb = s.vx[i + 1] ?? 0;
          if (va > vb) {
            const shared = (va + vb) / 2;
            if (i !== s.drag) s.vx[i] = shared;
            if (i + 1 !== s.drag) s.vx[i + 1] = shared;
          }
        }
      }
      if (!carousel && n > 0) {
        const edge = h * 0.06;
        const first = edge + footprint(h, s.turn[0] ?? REST, live.current.sideWidths[0]) / 2;
        const last = width - edge - footprint(h, s.turn[n - 1] ?? REST, live.current.sideWidths[n - 1]) / 2;
        if ((s.x[0] ?? 0) < first) { s.x[0] = first; s.vx[0] = Math.abs(s.vx[0] ?? 0) * 0.3; }
        if ((s.x[n - 1] ?? 0) > last) { s.x[n - 1] = last; s.vx[n - 1] = -Math.abs(s.vx[n - 1] ?? 0) * 0.3; }
      }
    }
    for (let i = 0; i < n; i++) {
      paint(i);
      if (Math.abs((s.vx[i] ?? 0)) > 0.4 || (now > s.free && Math.abs((s.x[i] ?? 0) - (s.tx[i] ?? 0)) > 0.25) || Math.abs((s.turn[i] ?? 0) - (s.tturn[i] ?? 0)) > 0.05 || Math.abs(s.vturn[i] ?? 0) > 0.05 || Math.abs(s.swing[i] ?? 0) > 0.02 || Math.abs(s.vswing[i] ?? 0) > 0.05 || Math.abs((s.tag[i] ?? 0)) > 0.05 || Math.abs(s.vtag[i] ?? 0) > 0.08) busy = true;
    }
    if (s.drag >= 0 || now < s.free) busy = true;
    if (busy) s.raf = requestAnimationFrame(step);
    else {
      s.raf = 0; s.last = 0;
      for (let i = 0; i < n; i++) { if (now > s.free) s.x[i] = s.tx[i] ?? 0; s.swing[i] = 0; s.vswing[i] = 0; s.tag[i] = 0; s.vtag[i] = 0; paint(i); }
    }
  }, [paint]);

  const kick = React.useCallback(() => {
    const s = sim.current;
    if (live.current.reduced) {
      for (let i = 0; i < live.current.count; i++) { s.x[i] = s.tx[i] ?? 0; s.turn[i] = s.tturn[i] ?? REST; s.vx[i] = 0; s.vturn[i] = 0; s.swing[i] = 0; s.vswing[i] = 0; paint(i); }
      return;
    }
    if (!s.raf) { s.last = 0; s.raf = requestAnimationFrame(step); }
  }, [paint, step]);

  const impulse = React.useCallback((i: number, amount: number) => {
    const s = sim.current;
    if (live.current.reduced || i < 0 || i >= live.current.count) return;
    s.vswing[i] = (s.vswing[i] ?? 0) + amount;
    kick();
  }, [kick]);

  React.useLayoutEffect(() => {
    if (!size.width) return;
    const s = sim.current;
    const front = size.carousel ? (active ?? live.current.carouselIndex) : active;
    const xs = targets(size.h, size.width, size.carousel, front);
    const fresh = s.x.length !== count;
    for (let i = 0; i < count; i++) {
      s.tx[i] = (xs[i] ?? 0) + (size.carousel ? pointer.current.swipe : 0);
      s.tturn[i] = i === front ? 0 : REST;
      if (fresh || reduced) {
        s.x[i] = s.tx[i] ?? 0; s.vx[i] = 0; s.px[i] = 0;
        s.turn[i] = s.tturn[i] ?? REST; s.vturn[i] = 0;
        s.swing[i] = s.swing[i] ?? 0; s.vswing[i] = s.vswing[i] ?? 0; s.tag[i] = 0; s.vtag[i] = 0;
      }
    }
    if (fresh) { s.x.length = count; for (let i = 0; i < count; i++) paint(i); }
    kick();
  }, [size, active, count, reduced, targets, paint, kick]);

  const brushed = React.useRef(false);
  React.useEffect(() => {
    if (!size.width || brushed.current || reduced) return;
    brushed.current = true;
    const timers = items.map((_, i) => window.setTimeout(() => impulse(i, 46 - i * 2.5), 120 + i * 55));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [size.width, reduced, items, impulse]);

  React.useEffect(() => () => { cancelAnimationFrame(sim.current.raf); sim.current.raf = 0; }, []);

  React.useLayoutEffect(() => {
    if (openIndex !== null || lifted !== null || returnFocus.current === null) return;
    const index = returnFocus.current;
    returnFocus.current = null;
    slots.current[index]?.focus({ preventScroll: true });
  }, [openIndex, lifted]);

  const choose = React.useCallback((index: number | null) => {
    setActive((old) => {
      if (old === index) return old;
      if (index !== null) { impulse(index - 1, -30); impulse(index + 1, 30); }
      if (old !== null && old !== index) { impulse(old - 1, 14); impulse(old + 1, -14); }
      if (index !== null) live.current.carouselIndex = index;
      return index;
    });
  }, [impulse]);

  const stop = React.useCallback(() => setPlaying(false), []);

  React.useEffect(() => {
    if (!playing || reduced || openIndex !== null || count === 0 || !size.width) return;
    const first = window.setTimeout(function advance() {
      const current = live.current.active;
      choose(current === null ? 0 : (current + 1) % live.current.count);
      timer = window.setTimeout(advance, interval);
    }, active === null ? 1100 : interval);
    let timer = first;
    return () => window.clearTimeout(timer);
  }, [playing, reduced, openIndex, count, interval, size.width, choose, active]);

  const open = React.useCallback((index: number) => {
    stop();
    setActive(index);
    setOpenIndex(index);
    onOpenChange?.(index);
  }, [onOpenChange, stop]);

  const close = React.useCallback(() => {
    setOpenIndex(null);
    onOpenChange?.(null);
  }, [onOpenChange]);

  function nearest(clientX: number, clientY: number) {
    const stage = stageRef.current;
    if (!stage) return null;
    const box = stage.getBoundingClientRect();
    const x = clientX - box.left;
    const y = clientY - box.top;
    const { h } = live.current.size;
    if (y < 0 || y > h + 46) return null;
    const s = sim.current;
    let best = null as number | null;
    let distance = Infinity;
    for (let i = 0; i < live.current.count; i++) {
      const half = footprint(h, s.turn[i] ?? REST, live.current.sideWidths[i]) / 2 + 4;
      const d = Math.abs(x - (s.x[i] ?? 0));
      if (d < half && d < distance) { best = i; distance = d; }
    }
    return best;
  }

  const onPointerMove = (event: React.PointerEvent) => {
    const p = pointer.current;
    const s = sim.current;
    const stage = stageRef.current;
    if (p.id === event.pointerId && stage) {
      const dx = event.clientX - p.x;
      const now = performance.now();
      if (!p.moved && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(event.clientY - p.y)) {
        p.moved = true;
        stop();
        if (stage.isConnected) stage.setPointerCapture(event.pointerId);
        if (!live.current.size.carousel && p.index >= 0) {
          s.drag = p.index;
          s.grab = (event.clientX - stage.getBoundingClientRect().left) - (s.x[p.index] ?? 0);
        }
      }
      if (p.moved) {
        const v = (event.clientX - p.lastX) / Math.max(1, now - p.lastT);
        p.v = p.v * 0.6 + v * 0.4;
        p.lastX = event.clientX; p.lastT = now;
        if (s.drag >= 0) {
          const x = event.clientX - stage.getBoundingClientRect().left - s.grab;
          s.vx[s.drag] = p.v * 1000;
          s.x[s.drag] = x;
          s.free = now + 900;
          kick();
        } else if (live.current.size.carousel) {
          p.swipe = dx;
          const xs = targets(live.current.size.h, live.current.size.width, true, live.current.active ?? live.current.carouselIndex);
          for (let i = 0; i < live.current.count; i++) s.tx[i] = (xs[i] ?? 0) + dx;
          kick();
        }
      }
      return;
    }
    if (event.pointerType !== "mouse" || live.current.size.carousel || live.current.openIndex !== null) return;
    const hit = nearest(event.clientX, event.clientY);
    const current = live.current.active;
    if (current !== null && hit !== current) {
      const box = stage?.getBoundingClientRect();
      const keep = box ? Math.abs(event.clientX - box.left - (s.x[current] ?? 0)) < footprint(live.current.size.h, 0) / 2 + 14 : false;
      if (keep && (hit === null || Math.abs(event.clientY - (box?.top ?? 0)) < live.current.size.h + 40)) return;
    }
    if (hit !== null) { stop(); choose(hit); }
  };

  const onPointerDown = (event: React.PointerEvent) => {
    if (event.button !== 0) return;
    const hit = nearest(event.clientX, event.clientY);
    const now = performance.now();
    pendingOpen.current = -1;
    pointer.current = { id: event.pointerId, index: hit ?? -1, x: event.clientX, y: event.clientY, t: now, moved: false, kind: event.pointerType, swipe: 0, lastX: event.clientX, lastT: now, v: 0 };
  };

  const finishPointer = (event: React.PointerEvent, cancelled: boolean) => {
    const p = pointer.current;
    if (p.id !== event.pointerId) return;
    const s = sim.current;
    const stage = stageRef.current;
    if (stage?.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    pointer.current = { ...p, id: -1 };
    if (s.drag >= 0) {
      s.drag = -1;
      s.free = performance.now() + 700;
      kick();
      return;
    }
    if (p.moved && live.current.size.carousel) {
      const dx = event.clientX - p.x;
      const current = live.current.active ?? live.current.carouselIndex;
      const step = Math.abs(dx) > 40 || Math.abs(p.v) > 0.45 ? (dx < 0 ? 1 : -1) : 0;
      pointer.current.swipe = 0;
      choose(clamp(current + step, 0, live.current.count - 1));
      for (let i = 0; i < live.current.count; i++) impulse(i, clamp(-p.v * 22, -30, 30));
      return;
    }
    if (cancelled || p.moved || p.index < 0) return;
    stop();
    const touch = p.kind !== "mouse";
    if (touch && live.current.active !== p.index) choose(p.index);
    else pendingOpen.current = p.index;
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    stop();
    const from = active ?? focusIndex;
    const next = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : clamp(from + (event.key === "ArrowRight" ? 1 : -1), 0, count - 1);
    setFocusIndex(next);
    choose(next);
    slots.current[next]?.focus({ preventScroll: true });
  };

  const current = active === null ? null : items[active];
  const h = size.h;
  const boxW = h * ASPECT;
  const railY = Math.round(h * 0.07) + 10;
  const railR = Math.max(3, Math.round((RAIL_R / VB_H) * h * 10) / 10);
  const bottom = count ? Math.max(...items.map((item) => (item.image ? VB_H : SIDE[item.kind ?? "slip"].hem + 8))) / VB_H : 1;

  return (
    <section
      {...rest}
      data-slot="clothing-rail-hero"
      data-mode={size.carousel ? "carousel" : "rail"}
      data-active={active ?? ""}
      aria-roledescription="clothing rail"
      className={`relative isolate w-full overflow-hidden bg-background text-foreground ${className ?? ""}`}
    >
      <Defs uid={uid} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(120% 70% at 18% 0%, color-mix(in oklab, var(--color-foreground) 7%, transparent), transparent 62%), linear-gradient(to bottom, transparent 55%, color-mix(in oklab, var(--color-foreground) 5%, transparent))" }} />
      {(eyebrow || heading) && (
        <header className="relative z-10 flex flex-col items-center gap-2 px-6 pt-8 text-center">
          {eyebrow && <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">{eyebrow}</p>}
          {heading && <h2 className="text-balance text-2xl font-medium tracking-tight sm:text-3xl">{heading}</h2>}
        </header>
      )}

      <div
        ref={stageRef}
        data-stage
        role="group"
        aria-label={heading ?? "Dress rail"}
        className="relative mt-5 w-full touch-pan-y select-none"
        style={{ height: Math.round(railY + h * bottom + h * 0.05 + 12), overflowX: "clip" }}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={(event) => finishPointer(event, false)}
        onPointerCancel={(event) => finishPointer(event, true)}
        onPointerLeave={(event) => { if (event.pointerType === "mouse" && pointer.current.id < 0 && !size.carousel && !document.activeElement?.matches("[data-garment]:focus-visible")) choose(null); }}
        onKeyDown={onKeyDown}
      >
        <div aria-hidden="true" data-rail className="pointer-events-none absolute inset-x-0 z-0" style={{ top: railY - railR, height: railR * 2 }}>
          <div className="absolute inset-x-0 h-3 rounded-full bg-foreground/10 blur-[5px]" style={{ top: railR * 2 + 1 }} />
          <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(to bottom, color-mix(in oklab, var(--color-muted-foreground) 35%, white) 0%, white 18%, color-mix(in oklab, var(--color-muted-foreground) 70%, white) 38%, var(--color-muted-foreground) 62%, color-mix(in oklab, var(--color-muted-foreground) 55%, black) 100%)", boxShadow: "0 1px 0 color-mix(in oklab, var(--color-foreground) 18%, transparent)" }} />
          <div className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay" style={{ background: "repeating-linear-gradient(90deg, transparent 0 2px, color-mix(in oklab, white 40%, transparent) 2px 3px, transparent 3px 7px)" }} />
          {[0, 1].map((side) => (
            <div key={side} className="absolute top-1/2 h-7 w-4 -translate-y-1/2 rounded-[3px]" style={{ [side ? "right" : "left"]: 6, background: "linear-gradient(to right, color-mix(in oklab, var(--color-muted-foreground) 60%, white), var(--color-muted-foreground) 55%, color-mix(in oklab, var(--color-muted-foreground) 60%, black))", boxShadow: "0 3px 6px color-mix(in oklab, var(--color-foreground) 18%, transparent)" }}>
              <span className="absolute left-1/2 top-1 size-1 -translate-x-1/2 rounded-full bg-foreground/35" />
              <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-foreground/35" />
            </div>
          ))}
        </div>

        {items.map((item, i) => {
          const kind = item.kind ?? "slip";
          const color = item.color ?? "var(--color-muted-foreground)";
          const trim = item.trim ?? mix(color, -0.14);
          const turned = active === i;
          const mask = item.image ? `url("${item.image}")` : silhouetteMask(kind, "front");
          const photoBox = hanger === "none" ? "inset-0" : "inset-x-0 bottom-0 top-[8%]";
          return (
            <button
              key={item.id}
              ref={(node) => { slots.current[i] = node; }}
              type="button"
              data-garment={i}
              data-front={turned || undefined}
              tabIndex={i === (active ?? focusIndex) ? 0 : -1}
              aria-label={item.name}
              aria-describedby={`${uid}-caption`}
              aria-pressed={turned}
              className="absolute left-0 cursor-pointer rounded-xl outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              style={{ top: railY - (HOOK_TOP / VB_H) * h, width: boxW, height: h, zIndex: turned ? 30 : 10 + i, visibility: lifted === i ? "hidden" : undefined, transform: `translate3d(${((sim.current.x[i] ?? 0) - boxW / 2).toFixed(2)}px,0,0)` }}
              onFocus={() => { setFocusIndex(i); if (pointer.current.id < 0) { stop(); choose(i); } }}
              onClick={(event) => { const pending = pendingOpen.current; pendingOpen.current = -1; if (event.detail === 0 || pending === i) open(i); }}
            >
              <span ref={(node) => { swings.current[i] = node; }} className="absolute inset-0" style={{ transformOrigin: `50% ${(HOOK_TOP / VB_H) * 100}%` }}>
                <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ filter: `blur(${Math.max(3, h * 0.022).toFixed(1)}px)` }}>
                  <span ref={(node) => { shadows.current[i] = node; }} className={`absolute block bg-black opacity-[0.16] dark:opacity-60 ${item.image ? photoBox : "inset-0"}`} style={{ WebkitMask: `${mask} top center / contain no-repeat`, mask: `${mask} top center / contain no-repeat` }} />
                </span>
                {(item.sideImage || !item.image) && (
                  <span ref={(node) => { sides.current[i] = node; }} data-face="side" className="absolute inset-0" style={{ transform: `perspective(${PERSPECTIVE}px) rotateY(0deg)` }}>
                    <SideHanger uid={uid} material={hanger} />
                    {item.sideImage ? <Photo src={item.sideImage} alt="" full={hanger === "none"} /> : <SideArt uid={uid} kind={kind} color={color} trim={trim} />}
                  </span>
                )}
                <span ref={(node) => { turns.current[i] = node; }} data-turn className="absolute inset-0 rounded-lg [transform-style:preserve-3d]" style={{ transform: `perspective(${PERSPECTIVE}px) rotateY(${REST}deg)`, opacity: item.image && !item.sideImage ? 1 : 0 }}>
                  {(["front", "back"] as const).map((side) => (
                    <span key={side} data-face={side} className="absolute inset-0 [backface-visibility:hidden]" style={{ transform: side === "back" ? "rotateY(180deg)" : undefined, ["--garment-color" as string]: color, ["--garment-under" as string]: mix(color, -0.42) }}>
                      <Hanger uid={uid} side={side} kind={item.image ? null : kind} material={hanger} />
                      <span ref={side === "front" ? (node) => { drapes.current[i] = node; } : undefined} data-drape className="absolute inset-0 origin-top [transform:skewX(var(--drape,0deg))]" style={side === "back" ? { transform: "skewX(calc(var(--drape, 0deg) * -1))" } : undefined}>
                        {item.image
                          ? <Photo src={(side === "back" ? item.backImage : undefined) ?? item.image} alt="" full={hanger === "none"} />
                          : <Fabric uid={uid} kind={kind} side={side} color={color} trim={trim} />}
                        <span ref={side === "front" ? (node) => { shades.current[i] = node; } : undefined} className={`pointer-events-none absolute bg-black ${item.image ? photoBox : "inset-0"}`} style={{ opacity: "var(--shade, 0.2)", WebkitMask: `${item.image ? `url("${(side === "back" ? item.backImage : undefined) ?? item.image}")` : silhouetteMask(kind, side)} top center / contain no-repeat`, mask: `${item.image ? `url("${(side === "back" ? item.backImage : undefined) ?? item.image}")` : silhouetteMask(kind, side)} top center / contain no-repeat` }} />
                      </span>
                    </span>
                  ))}
                </span>
                {item.tag && (
                  <span ref={(node) => { tags.current[i] = node; }} aria-hidden="true" className="pointer-events-none absolute left-1/2 origin-top" style={{ top: (32 / VB_H) * h, transform: "rotate(-12deg)" }}>
                    <span className="block h-[14px] w-px translate-x-[3px] bg-foreground/35" />
                    <span className="block -translate-x-1/2 translate-x-[3px] whitespace-nowrap rounded-[3px] border border-foreground/10 bg-card px-1.5 pb-1 pt-2 text-[9px] font-semibold leading-none tracking-wide text-card-foreground shadow-[0_2px_6px_color-mix(in_oklab,var(--color-foreground)_18%,transparent)]">
                      <span className="absolute left-1/2 top-[3px] size-[3px] -translate-x-1/2 rounded-full bg-foreground/30" />
                      {item.tag}
                    </span>
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {size.carousel && count > 1 && (
        <div className="relative z-10 mt-1 flex justify-center gap-1.5" role="group" aria-label={labels.show}>
          {items.map((item, i) => (
            <button key={item.id} type="button" aria-label={`${labels.show} ${item.name}`} aria-current={carouselIndex === i} onClick={() => { stop(); choose(i); }} className={`h-1.5 rounded-full outline-none transition-[width,background-color] duration-300 focus-visible:ring-2 focus-visible:ring-ring ${carouselIndex === i ? "w-6 bg-foreground" : "w-1.5 bg-foreground/25 hover:bg-foreground/45"}`} />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center gap-4 px-6 pb-8 pt-4 text-center">
        <div id={`${uid}-caption`} aria-live="polite" className="min-h-[3.25rem]">
          <p key={current?.id ?? "caption"} className="animate-in fade-in text-sm font-medium [animation-duration:300ms]">{current ? current.name : caption}</p>
          {current?.description && <p key={`${current.id}-d`} className="mx-auto mt-1 max-w-[42ch] text-[13px] leading-relaxed text-muted-foreground">{current.description}</p>}
        </div>
        {action}
      </div>

      {openIndex !== null && items[openIndex] && (
        <Detail
          uid={uid}
          item={items[openIndex]}
          index={openIndex}
          total={count}
          hanger={hanger}
          labels={labels}
          reduced={reduced}
          source={() => turns.current[openIndex]?.getBoundingClientRect() ?? null}
          onLift={(lift) => setLifted(lift ? openIndex : null)}
          onClose={() => { const index = openIndex; returnFocus.current = index; close(); impulse(index, (index % 2 ? 1 : -1) * 44); }}
        />
      )}
    </section>
  );
}

function Detail({ uid, item, index, total, hanger, labels, reduced, source, onLift, onClose }: {
  uid: string;
  item: RailGarment;
  index: number;
  total: number;
  hanger: "wood" | "matte" | "none";
  labels: ClothingRailHeroLabels;
  reduced: boolean;
  source: () => DOMRect | null;
  onLift: (lifted: boolean) => void;
  onClose: () => void;
}) {
  const dialogRef = React.useRef(null as HTMLDivElement | null);
  const figureRef = React.useRef(null as HTMLDivElement | null);
  const spinRef = React.useRef(null as HTMLDivElement | null);
  const closeRef = React.useRef(null as HTMLButtonElement | null);
  const [side, setSide] = React.useState("front" as "front" | "back");
  const [shown, setShown] = React.useState(false);
  const angle = React.useRef({ value: 0, target: 0, velocity: 0, raf: 0, last: 0, dragging: false, startX: 0, startAngle: 0 });
  const closing = React.useRef(false);
  const kind = item.kind ?? "slip";
  const color = item.color ?? "var(--color-muted-foreground)";
  const trim = item.trim ?? mix(color, -0.14);
  const titleId = `${uid}-detail-title`;

  const spin = React.useCallback(() => {
    const a = angle.current;
    const node = spinRef.current;
    const loop = (now: number) => {
      const dt = a.last ? Math.min(0.034, (now - a.last) / 1000) : 1 / 60;
      a.last = now;
      const accel = -90 * (a.value - a.target) - 2 * Math.sqrt(90) * 0.82 * a.velocity;
      a.velocity += accel * dt;
      a.value += a.velocity * dt;
      if (node) node.style.transform = `rotateY(${a.value.toFixed(2)}deg)`;
      if (Math.abs(a.value - a.target) < 0.05 && Math.abs(a.velocity) < 0.05) { a.value = a.target; if (node) node.style.transform = `rotateY(${a.value}deg)`; a.raf = 0; a.last = 0; return; }
      a.raf = requestAnimationFrame(loop);
    };
    if (reduced) { a.value = a.target; if (node) node.style.transform = `rotateY(${a.value}deg)`; return; }
    if (!a.raf) a.raf = requestAnimationFrame(loop);
  }, [reduced]);

  const turnTo = React.useCallback((next: "front" | "back") => {
    const a = angle.current;
    const base = Math.round(a.value / 360) * 360;
    a.target = base + (next === "back" ? 180 : 0);
    if (Math.abs(a.target - a.value) > 180) a.target -= 360 * Math.sign(a.target - a.value);
    setSide(next);
    spin();
  }, [spin]);

  React.useLayoutEffect(() => {
    const figure = figureRef.current;
    const from = source();
    closeRef.current?.focus({ preventScroll: true });
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let animation = null as Animation | null;
    if (figure && from && !reduced && from.width > 0) {
      const to = figure.getBoundingClientRect();
      const scale = from.height / to.height;
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top - to.top;
      const lift = Math.min(90, Math.abs(dy) * 0.25 + 30);
      onLift(true);
      animation = figure.animate([
        { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
        { transform: `translate(${dx * 0.4}px, ${dy * 0.4 - lift}px) scale(${(scale + 1) / 2 * 1.03}) rotate(${dx > 0 ? -2.5 : 2.5}deg)`, offset: 0.5 },
        { transform: "none" },
      ], { duration: 680, easing: "cubic-bezier(.22,.85,.3,1)" });
    }
    const raf = requestAnimationFrame(() => setShown(true));
    return () => { cancelAnimationFrame(raf); animation?.cancel(); document.body.style.overflow = overflow; cancelAnimationFrame(angle.current.raf); onLift(false); };
  }, [source, reduced, onLift]);

  const dismiss = React.useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setShown(false);
    const figure = figureRef.current;
    const to = source();
    if (!figure || !to || reduced || to.width === 0) { onClose(); return; }
    const from = figure.getBoundingClientRect();
    const scale = to.height / from.height;
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top - from.top;
    const animation = figure.animate([
      { transform: spinRef.current ? "none" : "none" },
      { transform: `translate(${dx * 0.6}px, ${dy * 0.6 - 30}px) scale(${(scale + 1) / 2})`, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
    ], { duration: 560, easing: "cubic-bezier(.45,0,.55,1)", fill: "forwards" });
    animation.onfinish = () => onClose();
  }, [source, reduced, onClose]);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.contains(event.target as Node)) return;
      if (event.key === "Escape") { event.preventDefault(); dismiss(); }
      else if (event.key === "ArrowLeft" || event.key === "ArrowRight") turnTo(side === "front" ? "back" : "front");
      else if (event.key === "Tab") { const first = dialog.querySelector("button"); if (first) { event.preventDefault(); first.focus(); } }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dismiss, turnTo, side]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") { event.preventDefault(); dismiss(); return; }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { turnTo(side === "front" ? "back" : "front"); return; }
    if (event.key !== "Tab") return;
    const controls = [...(dialogRef.current?.querySelectorAll("button") ?? [])].filter((node) => !node.disabled);
    const first = controls[0];
    const last = controls.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };

  const stage = (
    <div ref={figureRef} className="relative mx-auto aspect-[200/310] h-[min(62vh,560px)] max-h-full origin-top">
      <div aria-hidden="true" className="absolute left-1/2 top-[-40vh] h-[40vh] w-[3px] -translate-x-1/2 rounded-full" style={{ background: "linear-gradient(to right, color-mix(in oklab, var(--color-muted-foreground) 50%, white), var(--color-muted-foreground), color-mix(in oklab, var(--color-muted-foreground) 50%, black))", top: `calc(-40vh + ${(HOOK_TOP / VB_H) * 100}%)` }} />
      <div
        className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
        style={{ perspective: "1400px" }}
        onPointerDown={(event) => { const a = angle.current; a.dragging = true; a.startX = event.clientX; a.startAngle = a.value; cancelAnimationFrame(a.raf); a.raf = 0; a.last = 0; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={(event) => { const a = angle.current; if (!a.dragging) return; a.value = clamp(a.startAngle + (event.clientX - a.startX) * 0.45, a.startAngle - 220, a.startAngle + 220); if (spinRef.current) spinRef.current.style.transform = `rotateY(${a.value.toFixed(2)}deg)`; }}
        onPointerUp={() => { const a = angle.current; if (!a.dragging) return; a.dragging = false; const facing = (((a.value % 360) + 360) % 360); turnTo(facing > 90 && facing < 270 ? "back" : "front"); }}
        onPointerCancel={() => { angle.current.dragging = false; turnTo(side); }}
      >
        <div ref={spinRef} className="absolute inset-0 [transform-style:preserve-3d]">
          {(["front", "back"] as const).map((face) => (
            <div key={face} className="absolute inset-0 [backface-visibility:hidden]" style={{ transform: face === "back" ? "rotateY(180deg)" : undefined, ["--garment-color" as string]: color, ["--garment-under" as string]: mix(color, -0.42) }}>
              <Hanger uid={uid} side={face} kind={item.image ? null : kind} material={hanger} />
              {item.image
                ? <Photo src={(face === "back" ? item.backImage : undefined) ?? item.image} alt={face === "front" ? item.name : ""} full={hanger === "none"} />
                : <Fabric uid={uid} kind={kind} side={face} color={color} trim={trim} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-6 text-foreground" onKeyDown={onKeyDown}>
      <div aria-hidden="true" className={`absolute inset-0 bg-background/90 backdrop-blur-xl transition-opacity duration-300 ${shown ? "opacity-100" : "opacity-0"}`} onClick={dismiss} />
      <button ref={closeRef} type="button" onClick={dismiss} className={`absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium tracking-wide text-muted-foreground outline-none transition-[opacity,color] duration-300 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring ${shown ? "opacity-100" : "opacity-0"}`}>
        {labels.close}
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 3l10 10M13 3L3 13" /></svg>
      </button>
      <div className="relative grid w-full max-w-5xl items-center gap-10 pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        {stage}
        <div className={`flex flex-col gap-4 text-center transition-[opacity,transform] delay-150 duration-500 md:text-left ${shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</p>
          <h3 id={titleId} className="text-2xl font-medium tracking-tight sm:text-3xl">{item.name}</h3>
          {item.description && <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>}
          {item.details && item.details.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-2 md:justify-start">
              {item.details.map((detail) => <li key={detail} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{detail}</li>)}
            </ul>
          )}
          <div role="group" aria-label={`${labels.front} / ${labels.back}`} className="mt-2 inline-flex justify-center gap-6 md:justify-start">
            {(["front", "back"] as const).map((face) => (
              <button key={face} type="button" aria-pressed={side === face} onClick={() => turnTo(face)} className={`relative pb-1.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring ${side === face ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {face === "front" ? labels.front : labels.back}
                <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-px origin-left bg-foreground transition-transform duration-300 ${side === face ? "scale-x-100" : "scale-x-0"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ClothingRailHero;
\\n
\	sx
demo.tsx
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
    image: "/dresses/silk-slip-champagne-front.webp",
    backImage: "/dresses/silk-slip-champagne-back.webp",
    sideImage: "/dresses/silk-slip-champagne-side.webp",
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
    image: "/dresses/velvet-gown-noir-front.webp",
    backImage: "/dresses/velvet-gown-noir-back.webp",
    sideImage: "/dresses/velvet-gown-noir-side.webp",
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
    image: "/dresses/corset-midi-rose-front.webp",
    backImage: "/dresses/corset-midi-rose-back.webp",
    sideImage: "/dresses/corset-midi-rose-side.webp",
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
    image: "/dresses/wrap-emerald-front.webp",
    backImage: "/dresses/wrap-emerald-back.webp",
    sideImage: "/dresses/wrap-emerald-side.webp",
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
    image: "/dresses/pleated-marigold-front.webp",
    backImage: "/dresses/pleated-marigold-back.webp",
    sideImage: "/dresses/pleated-marigold-side.webp",
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
    image: "/dresses/blazer-dress-ivory-front.webp",
    backImage: "/dresses/blazer-dress-ivory-back.webp",
    sideImage: "/dresses/blazer-dress-ivory-side.webp",
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
    image: "/dresses/slip-wisteria-front.webp",
    backImage: "/dresses/slip-wisteria-back.webp",
    sideImage: "/dresses/slip-wisteria-side.webp",
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
    image: "/dresses/midi-terracotta-front.webp",
    backImage: "/dresses/midi-terracotta-back.webp",
    sideImage: "/dresses/midi-terracotta-side.webp",
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
    image: "/dresses/gown-midnight-front.webp",
    backImage: "/dresses/gown-midnight-back.webp",
    sideImage: "/dresses/gown-midnight-side.webp",
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
    image: "/dresses/pleated-celadon-front.webp",
    backImage: "/dresses/pleated-celadon-back.webp",
    sideImage: "/dresses/pleated-celadon-side.webp",
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
\\n\\
