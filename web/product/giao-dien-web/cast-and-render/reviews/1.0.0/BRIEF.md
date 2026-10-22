# BRIEF — Cast & Render — 3D Object Studio (`cast-and-render` / `t90`, v1.0.0)

## Mục tiêu sản phẩm
Xây dựng mẫu giao diện Landing Page cuộn tua khung hình video tự chứa trong một file HTML duy nhất (`index.html`) cho studio đối tượng 3D **Cast & Render** (*"3D Object Studio — Antwerp"*), với màu thạch cao ấm `#d8d5cf` và mực than `#0d0c0b`, cuộn trang 420vh (`360vh` trên mobile) để tua mượt từng khung hình video nền toàn màn hình (`45567745-d826-44a2-a5ce-7ef670944e60.mp4`, 241 khung hình all-intra) kết hợp ba tấm nội dung chuyển cảnh có khoảng dừng hình tự nhiên (`CUES`), thanh HUD nhảy chương & hiển thị khung hình trực tiếp (`FRM 001 / 241`) và bảng thông tin Studio Sheet 3 tab tương tác (`#board` Morning Board, `#visit` Studio & Farm, `#order` Start a Brief).

## Lý do sử dụng cờ `--ngoai-le` khi đóng gói
- Đề bài yêu cầu kiến trúc **Single-File HTML** (gồm một khối `<style>` trong `<head>` và một khối IIFE `<script>` ở cuối `<body>`, không dùng framework và không có bước build) nên gói `source/` gồm đúng 4 file (`index.html`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) thuộc danh sách `INLINE_PRODUCTS` trong `dong-goi.mjs`.

## Nguồn tài nguyên bên ngoài theo đặc tả
- **Google Fonts:** `Inter Tight` (`400;500`).
- **All-Intra 241-Frame Studio Video (`MP4` trên CloudFront, nạp nguyên khối qua `fetch()` + `URL.createObjectURL`):** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/45567745-d826-44a2-a5ce-7ef670944e60.mp4`
