# Biên bản QA — `venture-fund` v1.0.0 (t322 · PREMIUM)

- **Sản phẩm:** Hale Moor — Frontier Venture Fund (`venture-fund`)
- **Ngày kiểm định:** 2026-11-11
- **Hồ sơ kỹ thuật:** `WEB-CRAFT-2` (Single-file self-contained bundle trong `INLINE_PRODUCTS`, được duyệt ngoại lệ `W06` qua `--ngoai-le`)
- **Gói khách tải (`venture-fund.zip`):** `18,111 B` — SHA-256 `a0e1ae5b40715d3ec4a32181650c58200daee4e4f2d206e2a858fdc31561b007`
- **ForgeScore v2.0:** Mục tiêu `100 / 100 [FORGEFRAME_GOLD]` (`0` Hard Fail, `0` điểm trừ)

## 1. Kiểm thử 4 Viewport trên Chromium (Playwright Headless + Giả lập `prefers-reduced-motion: reduce`)

| Khổ màn hình | `scrollWidth / clientWidth` | `scrollHeight` | Tràn ngang (`overflowX`) | `data-motion` mặc định | `pageerror` / `console.error` | Kết quả |
|---|---|---|---|---|---|---|
| Desktop `1440×900` | `1440 / 1440` | `7467px` | `false` | `on` | `0 / 0` | **PASS** |
| Tablet `820×1180` | `820 / 820` | `9654px` | `false` | `on` | `0 / 0` | **PASS** |
| Mobile `375×812` | `375 / 375` | `8118px` | `false` | `on` | `0 / 0` | **PASS** |
| Compact `320×740` | `320 / 320` | `7677px` | `false` | `on` | `0 / 0` | **PASS** |

## 2. Danh mục Kiểm định Chất lượng (`Q01–Q13` & `D01–D08`)

- **Q01–Q04 (Cấu trúc ngữ nghĩa & A11y):** Đạt chuẩn `<header>`, `<nav>`, `<main id="main">`, `<footer>`, liên kết bỏ qua điều hướng `.skip-link`, đúng `1` thẻ `<h1>`, đầy đủ `viewBox` và `aria-hidden="true"` trên toàn bộ `<svg>`.
- **Q05–Q08 (Tokens, Bề mặt & Chống AI-Slop):** Hơn 15 biến CSS `:root` tách biệt `--accent` / `--accent-text` / `--on-accent`, có `::selection`, `:focus-visible`, `tabular-nums`, `clamp()`, không icon Emoji, không `transition: all`, không `100vw`, dùng `overflow-x: clip`.
- **Q09–Q11 (Quy tắc Animation Chủ sản phẩm 05/10/2026):** Hoạt cảnh mặc định **BẬT** (`data-motion="on"`) ngay cả khi hệ điều hành bật `prefers-reduced-motion: reduce`; nút `#motionToggleBtn` tạm dừng (`data-motion="paused"`) và bật lại tức thì trong phiên.
- **Q12–Q13 (Tương tác `[data-next-preview]` & Độ bền Offline):** Chuỗi kích hoạt `[data-next-preview]` hoạt động mượt 2 nhịp liên tiếp không lỗi JS; không phụ thuộc `<script src>` hoặc `<img src>` ngoài.
- **D01–D08 (Tài liệu & Đóng gói):** `CUSTOMISE.md` đủ 10 bước + 12 AI prompts + bảng Edit Map khớp chính xác số lần xuất hiện chuỗi trong `source/index.html`; `README.md` & `LICENCE.txt` đầy đủ; giải nén gói `.zip` khớp từng byte với `source/`.

## 3. Phạm vi Đã thử & Chưa thử

- **Đã thử:** Playwright Headless Chromium trên 4 khổ màn hình (`1440×900`, `820×1180`, `375×812`, `320×740`), `evaluate-forgescore.mjs`, `dong-goi.mjs --ngoai-le`.
- **Chưa thử:** Safari/WebKit thực tế trên macOS/iOS, thiết bị cảm ứng vật lý ngoài đời thực và luồng thanh toán live trên cổng ngân hàng.
