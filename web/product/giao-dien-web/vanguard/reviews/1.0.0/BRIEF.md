# BRIEF — VANGUARD (`vanguard` / `t91`, v1.0.0)

## Mục tiêu sản phẩm
Xây dựng mẫu giao diện Hero một màn hình (`h-screen`) cho creative agency **VANGUARD** (*"World-Class Digital Collective — Design. Disrupt. Conquer."*) sử dụng **React 18**, **TypeScript**, **Tailwind CSS**, **Vite 6** và **Lucide React** (`ArrowUpRight`, `Award`, `Crown`, `X`), với video nền toàn màn hình lặp liên tục (`object-cover`), phông chữ trưng bày `"FSP DEMO - PODIUM Sharp 4.11"` (`.font-podium` / `fontFamily.podium`) kết hợp `"Inter"` (`fontFamily.inter`), chuỗi hoạt ảnh xuất hiện phân tầng `.animate-fade-up` (`0s` → `0.8s`), lớp phủ menu di động toàn màn hình (`bg-black/95 backdrop-blur-sm`) và hộp thoại **Selected Works & Start a Brief** tương tác (15% sáng tạo).

## Lý do sử dụng cờ `--ngoai-le` khi đóng gói
- Đề bài yêu cầu kiến trúc **React + Tailwind CSS (`tailwind.config.js`) + Vite + `lucide-react`**, nên gói `source/` bao gồm trọn bộ mã nguồn dự án Vite/React/Tailwind cùng bản dựng tĩnh `built/` (tổng cộng 16 file, `69,410` byte) để khách hàng có thể chạy ngay hoặc biên dịch lại từ nguồn.

## Nguồn tài nguyên bên ngoài theo đặc tả
- **OnlineWebFonts (`FSP DEMO - PODIUM Sharp 4.11`):** `https://db.onlinewebfonts.com/c/8b75d9dcff6a48c35a46656192adf019?family=FSP+DEMO+-+PODIUM+Sharp+4.11`
- **Google Fonts (`Inter` 400, 500, 600, 700):** `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`
- **CloudFront Looping Hero Video (`MP4`):** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4`
