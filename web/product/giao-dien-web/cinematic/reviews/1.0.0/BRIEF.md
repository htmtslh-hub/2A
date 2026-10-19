# Cinematic (`cinematic`) — Hồ sơ Thiết kế & Ngoại lệ Kỹ thuật (v1.0.0)

- **Ngày lập:** 2026-10-19
- **Tên sản phẩm:** Cinematic (`cinematic`)
- **Mã danh mục cửa hàng:** `t73`
- **Ngách danh mục (`template-categories.ts`):** `entertainment` (`Giải trí` / `Entertainment` / `娱乐`)
- **Phân quyền truy cập:** `free`
- **Phiên bản:** `1.0.0`

## 1. Mục tiêu & Kiến trúc Giao diện

Trang Hero điện ảnh/streaming toàn màn hình (`h-screen overflow-hidden`, không cuộn trang) dựng bằng React 18, TypeScript, Vite 6, Tailwind CSS v4 và Lucide React với kiểu chữ `Inter` từ Google Fonts:
1. **Nền Video (`#hero-video`):** `fixed inset-0 w-full h-full object-cover z-0`, `autoPlay`, `loop`, `muted`, `playsInline`, nguồn MP4 từ CloudFront:
   `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4`
2. **Lớp phủ làm mờ đáy (`#bottom-blur-overlay`):** `fixed inset-0 z-[1] pointer-events-none backdrop-blur-xl` kết hợp mặt nạ `mask-image: linear-gradient(to top, black 0%, transparent 45%)` (kèm `-webkit-mask-image`), không dùng lớp phủ làm tối màu.
3. **Hiệu ứng kính lỏng (`.liquid-glass`):** `background: rgba(255, 255, 255, 0.01)`, `background-blend-mode: luminosity`, `backdrop-filter: blur(4px)`, `box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1)`, kèm `::before` viền sáng `1.4px` dùng `mask-composite: exclude` / `-webkit-mask-composite: xor`.
4. **Hoạt ảnh `.animate-blur-fade-up`:** `@keyframes blurFadeUp` (`opacity: 0; filter: blur(20px); transform: translateY(40px)` → `opacity: 1; filter: blur(0); transform: translateY(0)` trong `1s ease-out forwards`) với độ trễ phân tầng chính xác từ `0ms` đến `900ms`.
5. **Thanh điều hướng (`z-50`):**
   - Trái: Logo chữ `"CINEMATIC"` (`0ms`).
   - Giữa (`lg+`): 5 liên kết `"Movies"` (`100ms`), `"TV Series"` (`150ms`), `"Editor's Pick"` (`200ms`), `"Interviews"` (`250ms`), `"User Reviews"` (`300ms`).
   - Phải: Nút `"Search"` `.liquid-glass` (`350ms`) và nút hồ sơ tròn `User` `.liquid-glass` (`400ms`) trên `sm+`; nút hamburger `.liquid-glass` (`350ms`) trên `< lg` với chuyển cảnh xoay `rotate-180` + `scale-50` (`duration-500 ease-out`) giữa icon `Menu` và `X`, mở menu thả xuống tại `top-[72px]` (`z-40`).
6. **Nội dung Hero ở đáy khung nhìn (`z-10`):**
   - Dải thông số (`300ms`): `Star` (`fill-white`) + `"8.7/10 IMDB"`, `Clock` + `"132 min"`, `Calendar` + `"April, 2025"`.
   - Tiêu đề chính (`400ms`): `"Step Through. Work Smarter."` (`tracking-[-0.04em]`).
   - Mô tả (`500ms`): `"A voyage through forgotten realms, where past and future intertwine."` (`text-gray-400`).
   - Cụm nút CTA: `"Watch Now"` (`600ms`, nền trắng chữ đen kèm icon `Play` `fill-black`) và `"Learn More"` (`700ms`, `.liquid-glass`).
   - Cụm nút điều hướng bên phải: `"Previous"` (`800ms`, `.liquid-glass` kèm `ChevronLeft`) và `"Next"` (`900ms`, `.liquid-glass` kèm `ChevronRight`) hỗ trợ chuyển đổi qua các tác phẩm tiêu biểu.

## 2. Ngoại lệ Kỹ thuật theo Yêu cầu Chủ Sản phẩm (`--ngoai-le`)

1. **Stack công nghệ (`W01` / `W06`):** Sử dụng `React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + lucide-react` theo đúng yêu cầu kỹ thuật của prompt; đóng gói kèm bản dựng tĩnh trong `source/built/` để chạy trực tiếp qua HTTP server.
2. **Tài nguyên mạng (`W03`):**
   - Google Fonts: `Inter` (`weights 300;400;500;600;700`).
   - CloudFront MP4 Video: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4`.
