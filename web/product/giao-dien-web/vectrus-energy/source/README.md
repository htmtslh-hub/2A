# Vectrus Energy — Scroll-Tied WebCodecs Video Section (`v1.0.0`)

**Vectrus Energy** là mẫu giao diện landing page điện ảnh điều khiển video theo vị trí cuộn trang (`500vh` scroll track, khung `sticky` `100vh`) dành cho tập đoàn năng lượng sạch, hạ tầng công nghiệp, hàng không vũ trụ hoặc báo cáo phát triển bền vững. Giao diện được xây dựng bằng **Vite + React 18 + TypeScript + Tailwind CSS 3**, kết hợp **`mp4box` (`^0.5.2`)**, **WebCodecs (`VideoDecoder`)** và **`lucide-react`**, kèm sẵn bản dựng tĩnh tại `built/` để chạy ngay không cần biên dịch.

## Điểm nổi bật

- **Giải mã khung hình bằng WebCodecs + `MP4Box.js` (`src/useVideoScrub.ts`):**
  - Tải luồng MP4 dưới dạng `ArrayBuffer`, tách mẫu bằng `MP4Box.createFile()`, giải mã qua `VideoDecoder` (tự động thử lại với `hardwareAcceleration: 'prefer-software'` nếu phần cứng từ chối) có điều tiết hàng đợi (`LEAD = 24`), đóng gói từng khung hình thành `Blob` WebP (`0.82`) kèm mốc thời gian micro-giây (`ts`).
  - Tìm kiếm nhị phân (`nearestIndex`) và bộ nhớ đệm `LRU` (`LRU_MAX = 24` `ImageBitmap`) vẽ trực tiếp lên `<canvas width="1920" height="1080">`, nội suy mượt theo hằng số `LERP_TAU = 8` và `SNAP = 0.002`.
  - Cơ chế dự phòng kép: khi đang giải mã hoặc trên trình duyệt không hỗ trợ `VideoDecoder` (hoặc sau `WATCHDOG = 60000ms`), tự động dùng `<video>` (`video.currentTime = current`) bên dưới mà không bao giờ tự phát (`play()`).
- **3 phân cảnh chữ tuần tự (`Sequential Text Sections`):**
  - **Phân cảnh 1 (`p < 0.20` → mờ dần tới `0.28`):** Tiêu đề `"Advancing resources for a cleaner future"` và phụ đề `"Sustainable power with purpose"` màu xanh navy `#1D3045` trên nền mây sáng, kèm nút tròn `48px` (`ArrowRight`).
  - **Phân cảnh 2 (`p: 0.32 → 0.40 → 0.55 → 0.63`):** Thông điệp trung tâm `"We build lasting partnerships with vision and precision across every frontier"` với 3 sắc độ `#1D3045` (`100%`, `80%`, `50%`) và cụm điều hướng dọc (`ArrowDown`, 3 chấm tiến độ, `ChevronUp`).
  - **Phân cảnh 3 (`p: 0.67 → 0.75 → 1.00`):** Nhãn `"Halder | Nordvik"`, tiêu đề `"Fueling ambition, shaping tomorrow."` và cụm `"Contact Nordvik"` chữ trắng nổi bật trên khung cảnh núi tối.
- **Thanh điều hướng tự đảo màu tại `p > 0.55` & Menu di động toàn màn hình:**
  - Chuyển màu mượt (`duration-500`) từ `#1D3045` sang `#FFFFFF` khi video bay vào vùng tối.
  - Menu overlay `#1D3045` trên màn hình `<lg` với hiệu ứng trượt bậc thang (`i * 60ms`), khóa cuộn `body` và đóng bằng phím `Escape`.

## Cấu trúc thư mục

```text
source/
├── built/                      # Bản dựng tĩnh đã biên dịch sẵn (chạy trực tiếp qua HTTP server)
├── src/
│   ├── App.tsx                 # Giao diện chính: Navbar, Mobile Overlay, 3 phân cảnh tuần tự + Stagger
│   ├── useVideoScrub.ts        # Hook giải mã MP4Box + WebCodecs + LRU ImageBitmap + LERP cuộn
│   ├── mp4box.d.ts             # Khai báo kiểu TypeScript cho mp4box
│   ├── main.tsx                # Điểm khởi chạy React 18
│   └── index.css               # Tailwind directives + Helvetica Neue ME + smooth scroll
├── index.html                  # Khai báo font Helvetica Neue ME & #root
├── package.json                # Cấu hình dependencies (react, lucide-react, mp4box, tailwindcss, vite)
├── tsconfig.json               # Cấu hình TypeScript kèm alias @/* -> ./src/*
├── vite.config.ts              # Cấu hình Vite (alias @ -> ./src, base: './')
├── CUSTOMISE.md                # Hướng dẫn tùy biến 10 bước + 12 prompt AI + bảng chuỗi literal
├── LICENCE.txt                 # Giấy phép sử dụng thương mại
└── THIRD-PARTY-LICENSES.txt    # Giấy phép phần mềm bên thứ ba
```

## Cách chạy nhanh

### 1. Xem ngay bản dựng sẵn (`built/`)
```bash
npx serve built
```

### 2. Chạy môi trường phát triển & biên dịch lại
```bash
npm install
npm run dev      # Chạy máy chủ phát triển Vite
npm run build    # Kiểm tra TypeScript (tsc --noEmit) và xuất bản dựng vào dist/
```
