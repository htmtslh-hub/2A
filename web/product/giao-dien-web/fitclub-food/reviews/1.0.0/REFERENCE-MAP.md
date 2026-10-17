# Reference Map — FitClub Food 1.0.0

## 1. Chuẩn hóa ảnh tham chiếu
- **File gốc**: `media_1792199311495_de83b151.jpg`
- **SHA-256**: `b98b677cd5d5bf340c54c29876ccbb3ce40fec4764cb866836c3f24ffad643f2`
- **Kích thước thật**: `856 × 740` px (tỷ lệ ~1.157:1)
- **Viewport đối chiếu chuẩn**: `856 × 740` CSS px (DPR 1, scroll = 0) và `1440 × 900` CSS px (responsive desktop).
- **Lớp phủ ứng dụng ngoài bị loại trừ**: Nút vuông bo góc màu xám nhạt ở góc dưới bên phải (`x: 791..855, y: 633..719`) chứa mũi tên phóng to 2 chiều (`↗↙`) là UI của trình xem ảnh / Pinterest, không thuộc giao diện web nên được loại bỏ khỏi mã nguồn và vùng chấm điểm tương đồng.

## 2. Bản đồ ánh xạ từng vùng (Reference → Thành phần HTML/CSS/JS)

| Vùng tham chiếu | Tọa độ trên ảnh 856×740 | Thành phần Web (`index.html` / `style.css`) | Hành vi / Đích đến |
|---|---|---|---|
| Dải tím lavender mép trên cùng | `x: 0..627, y: 0..6`, màu `#9c6fb2` vát chéo ở `x=621..627` | `.top-ribbon` (`clip-path: polygon(0 0, 73.2% 0, 72.3% 100%, 0 100%)`) | Thanh trang trí đầu trang đúng tọa độ ảnh gốc |
| Thương hiệu góc trái trên | `x: 38..158, y: 49..63` (`FFIFEET CTUB`) | `.brand` (`<a class="brand" href="#home">FFIFEET CTUB</a>`) | Giữ nguyên chữ tham chiếu, cuộn về `#home`, có hướng dẫn đổi trong `CUSTOMISE.md` |
| 4 liên kết điều hướng | `x: 428..462`, `493..542`, `576..614`, `650..706`, `y: 52..59` | `<nav id="navigation" class="site-nav">` với 4 liên kết `<a>` (`PROGRAMS`, `NUTRITION`, `BOWLS`, `CHEF NOTES`) | Dẫn tới 4 khu vực nội dung thật: `#features`, `#nutrition`, `#bowls`, `#plans` |
| Nút viền trắng góc phải trên | `x: 735..812, y: 39..69` (77×30 px, bo tròn, viền trắng 2px) | `<a class="header-pill" href="#order">JOIN</a>` + nút `.menu-toggle` trên màn hình hẹp | Dẫn thẳng tới khu vực đăng ký / đặt phần ăn `#order` |
| Dòng phụ màu hồng phấn | `x: 39..201, y: 191..221` (`Fitreess &`, màu `#ea93e4`) | `<p class="hero__eyebrow">Fitreess &amp;</p>` | Giữ nguyên chữ và sắc hồng `#ea93e4` của ảnh tham chiếu |
| Tiêu đề chính 2 dòng | `Healthy Club` (`x: 41..408, y: 236..294`), `Food` (`x: 42..177, y: 294..341`) | `<h1 id="hero-title">Healthy Club<br><span>Food</span></h1>` | Tiêu đề chính duy nhất (`<h1>`) của trang |
| Đoạn mô tả 3 dòng dưới tiêu đề | `x: 40..317, y: 378..418` (277×40 px) | `<p class="hero__lead" data-hero-desc>` | Nội dung tiếng Anh rõ nghĩa về thực đơn bowl dinh dưỡng thể hình (thay thế chữ mẫu lấp chỗ theo D06) |
| Nút CTA gradient hồng-tím | `x: 39..194, y: 450..486` (155×36 px, `#dc64bb → #9958d0`) | `<a class="hero__cta" href="#order">ORDER NOW</a>` | Dẫn tới bảng đặt khay dinh dưỡng `#order` |
| Lưới chấm thoi hồng dưới trái | `x: 0..81, y: 507..622` | `.hero__diamonds` (inline SVG `aria-hidden="true"`) | Họa tiết lưới chấm hình thoi màu hồng tím `#b83c92` |
| Hai vòng cung đồng tâm bên phải | Tâm `(785, 350)`, bán kính ngoài `~418px`, vòng trong `~345px` | `.hero__rings` (inline SVG `aria-hidden="true"`) | Vòng cung đồng tâm tím trầm phía sau bàn thức ăn, dịch chuyển nhẹ theo cuộn |
| Đường đứt nét chéo góc phải trên | `x: 745..850, y: 65..194` | `.hero__dashes` (inline SVG `aria-hidden="true"`) | Hai hàng đường đứt nét chéo màu trắng tím |
| Bàn tiệc 3 tô thực phẩm tươi | `x: 426..856, y: 150..600` (430×450 px) | `.hero__stage` + `<img class="hero__platter" data-hero-image src="assets/img/platter-club.webp">` + bộ nút chuyển 3 khay `.platter-switcher` | Hiển thị khay `Club Harvest` khớp 1:1 ảnh gốc, hỗ trợ chuyển 2 chiều sang `Protein Macro` và `Berry Vitality` bằng nút, phím mũi tên hoặc vuốt |
| Thanh 4 huy hiệu tính năng đáy | 4 vòng tròn tâm `(149,652)`, `(333,652)`, `(515,650)`, `(703,652)` (`r=35px`, nền `#432c4c`), chữ ở `y=690..711`, 3 vạch chia ở `x=240, 424, 615` | `<section class="feature-strip" id="features">` với 4 thẻ `<article class="feature-item">` có nút chọn/xem chi tiết từng trụ cột | Mỗi huy hiệu có icon SVG nét trắng đúng hình dáng tham chiếu và 2 dòng mô tả tiếng Anh rõ nghĩa |
