# MotionSites 30-Day High-Craft Production Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sản xuất cuốn chiếu kho mẫu `motionsites-master-bank.json` trong lộ trình 30 ngày theo chuẩn `ForgeFrame` + `WEB-STATIC-1`, sáng tạo thêm 15–20% với hệ thống skill có sẵn trong máy, đảm bảo 0% trùng lặp giao diện, 0% ảo giác/bịa kết quả, và 100% có video preview 15s quay thật.

**Architecture:** Thay vì ép chạy 20 mẫu/ngày bằng một khung HTML chung (dẫn đến lỗi lặp giao diện và quá tải trình duyệt/Vercel), hệ thống chia kho **605 mẫu chưa dùng** thành các **Đợt (Batch) 3 mẫu/ca × 2 ca/ngày = 6 mẫu MotionSites/ngày (180 mẫu/tháng)** (hoặc tối đa **3 ca × 3 mẫu = 9 mẫu/ngày = 270 mẫu/tháng**). Mỗi mẫu đi qua cổng kiểm tra chống trùng cấu trúc DOM (`DOM-Structure Fingerprint Gate`) trước khi đóng gói `.zip`, quay `.mp4` 15 giây và deploy.

**Tech Stack:** HTML5, CSS3 (`@property`, CSS Grid/Flexbox, `clamp()`), Vanilla ES6+ JS (`requestAnimationFrame` hữu hạn, `IntersectionObserver`), Playwright Chromium/Firefox, FFmpeg H.264, `uiverse-galaxy` CLI (`search.py`), `forgeframe`, `skill-morge`, `neon-orbit-border`.

**Spec:** `E:\DONG_PHU\2A\web\product\giao-dien-web\AGENTS.md`, `E:\DONG_PHU\2A\web\product\giao-dien-web\docs\product-standards.md`, `E:\DONG_PHU\2A\web\tools\agent-motionsites\motionsites-master-bank.json`

## Global Constraints

- **Chống trùng tuyệt đối (`Strict Deduplication`):** Không bao giờ dùng lại `id`, `slug`, `promptHash`, `videoPreviewUrl` đã có trong `state.json` hoặc trong 110 mẫu hiện có của `web/product/giao-dien-web/`.
- **Chống lặp khung giao diện (`Anti-Clone DOM Gate`):** Hai mẫu liên tiếp không được dùng chung một bộ khung HTML/CSS. Trước khi đóng gói, so khớp tập class CSS và cấu trúc thẻ `<section>` với các mẫu đã tạo; nếu độ tương đồng cấu trúc DOM `> 45%` thì từ chối xuất bản và bắt buộc dựng lại theo đúng kiến trúc riêng của prompt.
- **Quy tắc Animation ngày 05/10/2026:** Toàn bộ animation mặc định **BẬT** trên mọi trình duyệt (kể cả khi OS bật `prefers-reduced-motion`). Có nút `Pause/Play Motion` cho phiên hiện tại và dùng `requestAnimationFrame` hữu hạn có hủy lượt cũ khi thao tác mới tới.
- **Quy tắc Sáng tạo +15–20% & Ma trận Phối hợp 6 Skill Tạo Web trong máy:**
  1. **`hallmark` (`E:\DONG_PHU\2A\skill\hallmark\SKILL.md` — Anti-AI-Slop & 21 Macrostructures / 48 Themes):**
     - Dùng `node E:\DONG_PHU\2A\skill\hallmark\scripts\theme.mjs deal` & `theme.mjs draw` để xoay vòng **21 Macrostructures** (`Bento Grid`, `Workbench`, `Manifesto`, `Photographic`, `Specimen`, `Catalogue`, `Narrative Workflow`, `Split Studio`, `Feature Stack`, `Portfolio Grid`, `Component Playground`...) và **6 trục Fingerprint** (`Heading placement | Body composition | Divider language | Button voice | Image treatment | Reveal pattern`) nhằm triệt tiêu 100% hiện tượng các trang web có bố cục lặp lại.
     - Áp dụng kỷ luật **The Floor của Hallmark**: Mọi màu/font đi qua `:root` token; cấm `transition: all`; cấm animate `width/height/top/left` (chỉ dùng `transform` và `opacity`); `overflow-x: clip` trên cả `html` và `body`; lưới chứa ảnh luôn dùng `minmax(0, 1fr)`; mọi nút có `:focus-visible` hiện tức thì.
     - *Lưu ý ưu tiên quy chuẩn dự án:* Theo quy tắc chủ sản phẩm ngày `05/10/2026`, animation trong Forge Zone vẫn **mặc định BẬT trên mọi trình duyệt** (kể cả khi OS bật `prefers-reduced-motion`) kèm nút `Pause/Play Motion`.
  2. **`forgeframe` (`E:\DONG_PHU\2A\skill\forgeframe\SKILL.md` — Reference Fidelity >95%):**
     - Giữ vai trò chủ đạo khi dựng phần gốc từ Prompt/Video của MotionSites hoặc ảnh Pinterest: bám sát bố cục, bảng màu, font chữ và video/ảnh gốc của mẫu tham chiếu trước khi mở rộng thêm 15–20% bằng `hallmark`.
  3. **`skill-morge` (`E:\DONG_PHU\2A\skill\skill-morge\SKILL.md` — Finite RAF & Scroll Choreography):**
     - Phối hợp cùng `hallmark/references/scroll-choreography.md` (`Pinned chapter`, `Scrub-linked headline`, `Progress spine`, `Sticky diptych`) và dùng `requestAnimationFrame` hữu hạn (tự hủy lượt cũ khi có thao tác mới) cho các chuyển cảnh phức tạp và carousel 2 chiều wrap trực tiếp.
  4. **`neon-orbit-border` (`E:\DONG_PHU\2A\skill\neon-orbit-border\SKILL.md` — Conic-Gradient `@property`):**
     - Tạo viền xoay `1.8s–2.4s` cho thẻ tiêu điểm, gói Pricing hoặc trạng thái đang chọn.
  5. **`uiverse-galaxy` (`C:\Users\htmts\.gemini\config\plugins\uiverse-galaxy\skills\uiverse-galaxy\SKILL.md` — 3.800+ Components):**
     - Tra cứu bằng `search.py` để lấy ý tưởng nút bấm, công tắc, thẻ tương tác cho phần +15–20% sáng tạo, sau đó chuẩn hóa toàn bộ màu/font về `:root` token theo chuẩn `hallmark`.
  6. **`hyperframes-animation` & `a11y-debugging` (`C:\Users\htmts\.gemini\skills\hyperframes-animation\SKILL.md`):**
     - Kiểm soát thời lượng (`--dur-micro: 120ms`, `--dur-short: 220ms`, `--dur-long: 420ms`), đường cong easing và kiểm thử tương phản / bàn phím trên 4 viewport.

## Review Focus

- **Nguy cơ 1 — Lặp giao diện giữa các mẫu (`Template Cloning`):** Khi chạy tự động nhiều mẫu, nếu bộ dựng chỉ thay chữ/màu trên cùng 1 khung HTML thì giao diện sẽ giống nhau. Giải pháp: Bắt buộc phân nhánh theo **12 Kiểu Kiến Trúc Giao Diện (12 Distinct Layout Archetypes)** + kiểm tra `DOM-Similarity < 45%` trước khi cho qua QA.
- **Nguy cơ 2 — Ảo giác / Bịa kết quả kiểm thử (`Hallucinated QA`):** Báo PASS khi chưa chạy trình duyệt thật hoặc khi video `.mp4` bị đen/trắng khung hình. Giải pháp: Mọi mẫu phải có file ảnh chụp thật ở 4 viewport (`1440×900`, `1024×768`, `768×1024`, `375×812`) và file `.mp4` `> 100 KB` được kiểm tra bằng `npm --prefix web run previews:check`.
- **Nguy cơ 3 — Quá tải tài nguyên máy & Giới hạn Deploy Vercel:** Nếu nhồi 20 mẫu/ngày trong 1 lần chạy, quá trình quay 20 video FFmpeg + build Next.js sẽ treo RAM/CPU hoặc chạm ngưỡng giới hạn deploy miễn phí/ngày của Vercel. Giải pháp: Chia thành các **Ca nhỏ (3 mẫu/ca)**, mỗi ca chạy trọn vẹn trong ~18–22 phút.
- **Nguy cơ 4 — Tràn ngang trên Mobile (`375px` / `320px`):** Font chữ `clamp()` quá lớn hoặc thanh điều hướng nhiều mục gây `scrollWidth > innerWidth`. Giải pháp: Kiểm tra tự động `overflowX === false` trên cả 4 viewport.
- **Nguy cơ 5 — Xung đột Git với file người dùng đang làm dở:** Luôn kiểm tra `git status` và chỉ `git add` đúng các file của mẫu vừa tạo theo `E:\DONG_PHU\2A\AGENTS.md`.

---

## Phân tích Năng lực Thực tế & Định mức Mỗi Ngày (Trung thực 100%)

### 1. Thời gian thực tế để làm 01 mẫu đạt chuẩn (Không làm ẩu, không rập khuôn)

| Bước công việc | Thời gian thực tế / 1 mẫu | Lý do kỹ thuật không thể cắt bớt |
| :--- | :--- | :--- |
| **1. Đọc Prompt + Phân tích Video/Poster + Tra cứu `uiverse-galaxy`** | `2.0 – 3.0 phút` | Phải đọc kỹ từng section trong `prompt_text`, lấy mã màu/font/video URL và chọn component phù hợp. |
| **2. Dựng mã nguồn độc bản (`index.html`, `styles.css`, `script.js`, docs) + Sáng tạo 15–20%** | `3.5 – 5.0 phút` | Viết cấu trúc DOM riêng biệt theo prompt, thêm hiệu ứng scroll/hover/RAF hữu hạn, viết `README.md` & `CUSTOMISE.md`. |
| **3. Kiểm tra chống trùng DOM + QA 4 Viewport bằng Playwright** | `1.0 – 1.5 phút` | Mở trình duyệt thật kiểm tra `1440px`, `1024px`, `768px`, `375px`, kiểm tra console/pageerror/overflow. |
| **4. Đóng gói `.zip` + Quay Video Preview `.mp4` 15 giây (FFmpeg 30fps)** | `1.5 – 2.0 phút` | Riêng việc quay thật 15 giây trên trình duyệt + encode H.264 `.mp4` + xuất `.webp` mất tối thiểu 60–90 giây/mẫu. |
| **Tổng thời gian thực cho 01 mẫu chất lượng thật** | **`8.0 – 11.5 phút / mẫu`** | **1 Ca 3 mẫu mất khoảng `25 – 35 phút` (tính cả `next build` + `git push` + `vercel deploy`).** |

### 2. Tại sao KHÔNG NÊN ép chạy 20 mẫu/ngày (605 mẫu / 30 ngày)?

- Nếu ép chạy **20 mẫu MotionSites/ngày** + **5 mẫu Pinterest/ngày** = **25 mẫu/ngày**:
  1. **Rủi ro lặp giao diện 100%:** Không thể thiết kế tỉ mỉ 20 cấu trúc DOM hoàn toàn khác nhau mỗi ngày trong một lượt chạy tự động mà không rơi vào công thức lặp lại.
  2. **Quá tải dung lượng Git & Vercel:** 25 mẫu/ngày × 30 ngày = **750 video `.mp4`** (~1.2 GB dữ liệu nhị phân đẩy thẳng vào Git repo `2A`), khiến `git push` và `vercel deploy` bị nghẽn hoặc vượt quota.
  3. **Dễ sinh lỗi ảo giác:** Khi ngữ cảnh (context window) phải gánh cùng lúc 20 mẫu, AI sẽ cắt bớt chi tiết trong prompt và sinh code sơ sài.

### 3. Định mức Chuẩn Năng Lực (Khuyến nghị áp dụng cho Kế hoạch 30 Ngày)

| Phương án | Số mẫu MotionSites / ngày | Số ca / ngày | Tổng sản lượng 30 ngày | Đánh giá chất lượng & độ ổn định |
| :--- | :--- | :--- | :--- | :--- |
| **Phương án A (Khuyên dùng — Chất lượng Cao Nhất)** | **06 mẫu / ngày** (`2 Free + 4 Premium`) | **2 ca / ngày** (`06:00 sáng`: 3 mẫu, `15:00 chiều`: 3 mẫu) | **180 mẫu / tháng** *(Làm hết sạch 100% các mẫu xuất sắc nhất, hoàn tất toàn bộ 605 mẫu trong ~3 tháng)* | **Tuyệt đối an toàn:** Mỗi mẫu có cấu trúc riêng biệt, sáng tạo +15–20% rõ nét, 0% ảo giác, máy chạy nhẹ nhàng. |
| **Phương án B (Tăng tốc — Tối đa năng lực)** | **09 mẫu / ngày** (`3 Free + 6 Premium`) | **3 ca / ngày** (`06:00`, `14:00`, `21:00` — mỗi ca 3 mẫu) | **270 mẫu / tháng** *(Hoàn tất toàn bộ 605 mẫu trong ~2 tháng)* | **Tải cao nhưng kiểm soát được:** Nhờ tách thành 3 ca độc lập (mỗi ca chỉ làm 3 mẫu nên không bị tràn context). |
| **Phương án C (Duy trì nhịp hiện tại)** | **03 mẫu / ngày** (`1 Free + 2 Premium`) | **1 ca / ngày** (`06:00 sáng`: 3 mẫu) | **90 mẫu / tháng** *(Cộng với 5 mẫu Pinterest lúc 09:00 sáng = 8 mẫu/ngày = 240 mẫu/tháng)* | **Ổn định nhất** khi kết hợp song song với Agent Pinterest 09:00 sáng. |

---

## Lộ trình Thực thi 30 Ngày (Chia theo 12 Kiểu Kiến Trúc Giao Diện để Không Trùng Nhau)

### Task 1: Nâng cấp Cổng Chống Trùng Giao Diện (`DOM-Similarity Gate`) & Kết nối Skill (`uiverse-galaxy`, `neon-orbit-border`, `skill-morge`)

**Files:**
- Modify: `web/tools/agent-motionsites/auto-compiler.mjs`
- Modify: `web/tools/agent-motionsites/qa-verifier.mjs`
- Test: `node web/tools/agent-motionsites/qa-verifier.mjs --self-test`

**Interfaces:**
- Consumes: `motionsites-master-bank.json` (`items[].prompt_text`, `items[].videoPreviewUrl`, `items[].imagePreviewUrl`, `items[].category`, `items[].type`)
- Produces: `compileTemplateFromPrompt(item, pricing)` với **12 Archetypes riêng biệt** và `verifyTemplateDomUniqueness(slug)` đảm bảo độ trùng lặp cấu trúc DOM `< 45%`.

- [ ] **Step 1: Mở rộng `auto-compiler.mjs` lên 12 Archetypes riêng biệt + Tích hợp `uiverse-galaxy`, `neon-orbit-border`, `skill-morge`**
  1. `archetype-01-glow-bento`: Thẻ viền phát sáng `conic-gradient` + bộ điều chỉnh blur/palette trực tiếp.
  2. `archetype-02-interactive-calculator`: Bố cục 2 cột với bộ tính giá/ROI thời gian thực + 3 thẻ so sánh động.
  3. `archetype-03-architectural-footer-hub`: Bố cục Dual-Card sáng/tối tương phản + khối 3D nổi + chữ SVG co giãn toàn khung.
  4. `archetype-04-cinematic-inset-frame`: Khung video bo góc `rounded-[2rem]` lọt lòng + thanh nav treo đỉnh (`hanging pill`) + chữ kéo lên theo từng từ (`WordsPullUp`).
  5. `archetype-05-editorial-split-showcase`: Bố cục tạp chí 50/50 cố định cột trái (`sticky`), cuộn từng chương cột phải (`skill-morge` progress).
  6. `archetype-06-floating-saas-command`: Giao diện điều khiển SaaS với bảng phím tắt `Cmd+K` tương tác thật, chuyển tab live telemetry và biểu đồ SVG động.
  7. `archetype-07-kinetic-swiss-grid`: Lưới Brutalist/Swiss có đường kẻ mảnh `1px`, bộ lọc danh mục tức thời và hiệu ứng nghiêng 3D khi rê chuột (`3D perspective tilt`).
  8. `archetype-08-horizontal-product-carousel`: Carousel chuyển sản phẩm 2 chiều wrap trực tiếp theo đúng `skill-morge` (`morge.js` / `requestAnimationFrame` hữu hạn).
  9. `archetype-09-webgl-canvas-particles`: Nền hạt tương tác chuột bằng HTML5 `<canvas>` 2D/3D nhẹ + thẻ kính mờ (`glassmorphism`) và viền `neon-orbit-border`.
  10. `archetype-10-minimal-portfolio-case-study`: Hồ sơ năng lực nghệ sĩ/studio với hiệu ứng rèm mở ảnh theo vị trí cuộn (`scroll-linked reveal`) và xem nhanh dự án.
  11. `archetype-11-web3-tokenomics-terminal`: Bảng điều khiển tài chính/Web3 với bộ quy đổi tỷ giá trực tiếp, thanh tiến độ chu kỳ và bảng thông số `tabular-nums`.
  12. `archetype-12-interactive-pricing-comparison`: Bảng giá đa tầng chuyển đổi Tháng/Năm + bảng so sánh tính năng đóng/mở (`accordion`) + viền `neon-orbit-border` ở gói khuyên dùng.

- [ ] **Step 2: Thêm kiểm tra chống trùng cấu trúc DOM trong `qa-verifier.mjs`**
  So sánh tập thẻ/class của mẫu mới với 15 mẫu gần nhất; báo FAIL ngay nếu trùng khung giao diện.

---

### Task 2: Lịch trình Sản xuất Cuốn chiếu 30 Ngày (Theo Thứ tự Ưu tiên Chất lượng)

- [ ] **Tuần 1 (Ngày 1 – Ngày 7):** Làm lần lượt các mẫu `[FREE-001]` đến `[FREE-021]` kết hợp `[PREMIUM-001]` đến `[PREMIUM-021]` (Ưu tiên nhóm Creative Studio, AI SaaS, Interactive Pricing/Sections: *Prisma Creative Studio, Wealth Builder, NeuralKinetics, Ethereal Minimalist, Cybernetic Grid, Lumina AI, Aura Studio...*).
- [ ] **Tuần 2 (Ngày 8 – Ngày 14):** Làm tiếp `[FREE-022]` đến `[FREE-042]` và `[PREMIUM-022]` đến `[PREMIUM-042]` (Nhóm Web3, Fintech, Developer Tools, Product Showcases).
- [ ] **Tuần 3 (Ngày 15 – Ngày 21):** Làm tiếp `[FREE-043]` đến `[FREE-063]` và `[PREMIUM-043]` đến `[PREMIUM-063]` (Nhóm Editorial, Fashion, Architecture, Luxury Agency).
- [ ] **Tuần 4 (Ngày 22 – Ngày 30):** Làm tiếp `[FREE-064]` đến `[FREE-090]` và `[PREMIUM-064]` đến `[PREMIUM-090]` + Tổng rà soát toàn bộ Catalog, kiểm tra toàn bộ `.mp4` và `.zip` trên `https://forgezone.store`.
