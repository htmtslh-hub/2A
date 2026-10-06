# NovaTrend 1.0.0 — Hồ sơ nghiệm thu

- Quy chuẩn: `WEB-STATIC-1`, `docs/product-standards.md` v1.2. **Ngoại lệ được chủ sản phẩm chấp nhận** trong yêu cầu ("tạo sản phẩm giao diện web tương tự ảnh này cho anh, ảnh em tự tạo nhé"): 15 ảnh WebP cục bộ sinh bằng AI → 21 file và ZIP > 20.480 byte (thay W01/W03/W06).
- Ngày kiểm tra: 06/10/2026. Người kiểm tra: Trợ lý AI (Antigravity).
- Môi trường kiểm tra: Windows; Chromium 153.0.8010.12 và Firefox 155.0 (Playwright, headless). Kiểm tra trực tiếp trên **bản giải nén từ ZIP**, qua HTTP cục bộ và `file://`.
- Công cụ kiểm tra: `node web/product/giao-dien-web/tools/check-template.mjs novatrend --version 1.0.0 --ngoai-le` → [`checks.json`](checks.json), [`screenshots/`](screenshots/). Đã chụp và đối chiếu đầy đủ ảnh 1440, 820, 375, 320, menu mở, zoom 200%, không JS + không font 320.

---

## Gói cuối

| Mục | Giá trị |
|---|---|
| Tên ZIP | `novatrend.zip` |
| Dung lượng ZIP | **390.703 byte** (~381 KB, < 1 MiB) |
| SHA-256 | `5e5f00dbf966529c323ca7d00d6460008e881694a8174055c24338af3723b497` |
| Cấu trúc nội dung | Thư mục gốc `novatrend/` chứa đủ 6 file chuẩn (`index.html`, `assets/css/style.css`, `assets/js/main.js`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) + 15 ảnh trong `assets/img/`. Mọi đường dẫn dùng dấu gạch chéo `/`, giải nén đọc lại khớp byte 100% với `source/`. |
| Lệnh đóng gói | `node web/product/giao-dien-web/tools/dong-goi.mjs novatrend --ngoai-le` |

### Danh mục ảnh WebP (nguồn: tự tạo bằng AI generate_image và tối ưu WebP qua sharp)

| File | Kích thước | Dung lượng (byte) | Vai trò trong giao diện |
|---|---|---:|---|
| `hero-model.webp` | 900×1125 | 60.106 | Người mẫu áo nỉ trắng, ánh hào quang cam pastel, điểm nhấn Hero storefront |
| `cat-fashion.webp` | 600×600 | 18.258 | Danh mục: Lifestyle & Streetwear Fashion |
| `cat-electronics.webp` | 600×600 | 18.420 | Danh mục: Modern Audio & Wearables |
| `cat-beauty.webp` | 600×600 | 20.316 | Danh mục: Organic Skincare & Wellness |
| `cat-fitness.webp` | 600×600 | 19.864 | Danh mục: Smart Workout & Yoga Gear |
| `cat-home-decor.webp` | 600×600 | 19.340 | Danh mục: Scandinavian Aesthetic Decor |
| `cat-accessories.webp` | 600×600 | 19.112 | Danh mục: Everyday Bags & Urban Essentials |
| `prod-hoodie.webp` | 600×600 | 16.482 | Sản phẩm: Minimalist Heavyweight Fleece Hoodie |
| `prod-sneaker.webp` | 600×600 | 20.144 | Sản phẩm: CloudStep Cushion Running Sneakers |
| `prod-headphones.webp` | 600×600 | 17.828 | Sản phẩm: Spatial Audio Wireless Over-Ear Headphones |
| `prod-smartwatch.webp` | 600×600 | 18.910 | Sản phẩm: Pulse Ultra Titanium Smartwatch |
| `prod-bottle.webp` | 600×600 | 15.932 | Sản phẩm: Thermal Hydro Pure Insulated Flask |
| `prod-sunglasses.webp` | 600×600 | 18.468 | Sản phẩm: Polarized Retro Horizon Sunglasses |
| `banner-flash-sale.webp` | 1200×675 | 45.312 | Banner Flash Sale: Đếm ngược, ưu đãi lên tới 50% |
| `banner-summer.webp` | 1200×675 | 42.846 | Banner Summer Collection: Bộ sưu tập thời trang mùa hè |

*Mọi ảnh đều có thuộc tính `width`, `height`, thẻ `alt` mô tả trực quan và sử dụng định dạng WebP nén hiệu quả.*

---

## Tiêu chí chất lượng (Q01–Q13)

| Tiêu chuẩn | Kết quả | Chi tiết thẩm định / Bằng chứng |
|---|---|---|
| **Q01 Cấu trúc** | **PASS** (theo ngoại lệ) | Đúng cấu trúc sáu file bắt buộc + 15 ảnh WebP nội bộ theo chỉ định của chủ sản phẩm; không chứa file ẩn `.DS_Store`, `Thumbs.db` hay thư viện ngoài. |
| **Q02 Responsive** | **PASS** | Kiểm tra trên cả Chromium và Firefox ở 4 kích thước chuẩn: 1440×900, 820×1180, 375×812, 320×740. `scrollWidth <= clientWidth` tuyệt đối (không tràn ngang). Tất cả 39 phần tử tương tác (link, nút) đều có vùng chạm độc lập đạt tối thiểu 44×44px (0 lỗi touch target). |
| **Q03 Tương tác** | **PASS** | Toàn bộ 41 link có tên nhãn rõ ràng và neo/đích hợp lệ; không có liên kết `href="#"`. Menu điều hướng di động (breakpoint 820px) tích hợp thuộc tính ARIA đầy đủ (`aria-controls="main-nav"`, `aria-expanded`), mở không gây tràn ngang, bấm phím Escape đóng và trả focus về nút toggle, bấm vào liên kết tự đóng menu, resize về desktop tự hoàn nguyên. Form nhận bản tin đăng ký ghi rõ "Demo only" theo chuẩn §7. |
| **Q04 Bàn phím** | **PASS** | Skip-link đầu trang hiển thị rõ nét khi focus và điều hướng thẳng vào vùng `#main`; khi menu di động đang đóng, các liên kết bên trong không nhận Tab vô hình; phím Shift+Tab quay lại chính xác nút menu. Viền focus (`:focus-visible`) đạt độ dày 3px màu `#111114`, viền offset 3px, đạt tỉ lệ tương phản vượt trội (>= 15:1 trên nền sáng). |
| **Q05 Cấu trúc trợ năng** | **PASS** | Thẻ `html` có `lang="en"`, chính xác 1 thẻ `h1`, thứ tự tiêu đề tuần tự không nhảy cấp (h1 → h2 → h3), đầy đủ các landmark HTML5 ngữ nghĩa (`header`, `nav`, `main`, `footer`), 0 ID trùng lặp, toàn bộ SVG trang trí đều có `aria-hidden="true"` và `focusable="false"`. Bộ kiểm tra `@axe-core/playwright` đạt 0 vi phạm trên cả 3 chuẩn: WCAG 2.0 A, WCAG 2.0 AA, WCAG 2.1 AA. |
| **Q06 Tương phản** | **PASS** | Kiểm tra tự động trên Chromium và Firefox xác nhận toàn bộ các cặp chữ và màu nền đạt ngưỡng WCAG AA (>= 4.5:1 với cỡ chữ thông thường, >= 3:1 với chữ lớn >= 24px hoặc in đậm >= 18.66px). Nút bấm chính `--primary-accessible: #b83400` trên nền trắng đạt 4.88:1. Chữ trên các banner khuyến mãi có lớp gradient bán mờ bảo vệ độ tương phản. Viền focus tương phản cao. |
| **Q07 Dự phòng** | **PASS** | Tắt JavaScript + chặn font web ở màn hình 320px: toàn bộ bố cục hiển thị hoàn chỉnh, menu hiển thị dạng danh sách tĩnh tự nhiên, không tràn ngang. Chế độ giảm chuyển động (`prefers-reduced-motion: reduce`): toàn bộ hiệu ứng chuyển về 0.01ms, 0 animation chạy lặp. Hiệu ứng nổi banner kết thúc trước 3s (tuân thủ quy định 05/10/2026: hoạt ảnh có thời hạn < 5s, không chạy vô tận). Zoom 200% (viewport tương đương 720×450, tỉ lệ 2×): không tràn ngang. Chế độ offline và giao thức `file://`: trang tải mượt mà, đầy đủ tính năng. |
| **Q08 Trình duyệt** | **PASS** (Chromium, Firefox) | Chạy thử nghiệm thành công 100% trên cả 2 nhân Chromium 153 và Firefox 155. Safari và Microsoft Edge chưa được kiểm tra riêng rẽ trong môi trường hiện tại (README ghi nhận trung thực). |
| **Q09 Kỹ thuật** | **PASS** (theo ngoại lệ) | 0 lỗi console JavaScript, 0 request mạng thất bại (4xx/5xx). Tài nguyên bên ngoài duy nhất là Google Fonts (`Inter` & `Plus Jakarta Sans`) có font fallback an toàn hệ thống (`system-ui, -apple-system, sans-serif`). Mã nguồn chuẩn cấu trúc, không minified (W08), chú thích bằng tiếng Anh chuyên nghiệp. |
| **Q10 Tài liệu & quyền** | **PASS** | `CUSTOMISE.md` gồm đúng 10 bước hướng dẫn, 12 prompt AI cụ thể, 0 sai lệch số đếm trong bảng Edit Map (khớp chính xác 100%), không còn ô trống giữ chỗ dạng bắt khách tự điền. `README.md` cung cấp đầy đủ thông tin tính năng, hướng dẫn khởi chạy, quy chuẩn và ghi chú demo. `LICENCE.txt` cấp phép bản quyền phần mềm MIT năm 2026 cho NovaTrend. |
| **Q11 Gói cuối** | **PASS** | File nén ZIP `novatrend.zip` giải nén đúng thư mục con `novatrend/`, hash SHA-256 nhất quán, mở được mượt mà trên cả máy chủ web cục bộ và giao thức `file://`. |
| **Q12 Đồng bộ demo & preview** | **PASS** | Đã tạo thư mục demo công khai tại `web/public/demos/novatrend/` đồng bộ đầy đủ từ `source/`. Đã tạo ảnh preview chất lượng cao cho danh mục sản phẩm tại `web/public/previews/novatrend.webp` (1200×750). |
| **Q13 Thẩm mỹ & thiết kế** | **PASS** | Xem chi tiết đối chiếu thiết kế (D01–D08) bên dưới. |

---

## Đối chiếu tiêu chí thiết kế (D01–D08)

- **D01 Nhận diện thương hiệu & Thông điệp**: Thương hiệu "NovaTrend" với logo hiện đại màu cam rực rỡ (`#ff5722`), khẩu hiệu "Discover Products You'll Love", giới thiệu đầy đủ phong cách thời trang trẻ trung năng động kết hợp thiết bị công nghệ tiện ích.
- **D02 Bám sát ảnh tham chiếu**:
  1. Thanh thông báo tiện ích trên cùng với ưu đãi và hỗ trợ 24/7.
  2. Header cố định tích hợp tìm kiếm, danh sách yêu thích và giỏ hàng mini có số đếm động.
  3. Hero banner người mẫu thời trang trong áo nỉ trắng, ánh hào quang cam pastel lan tỏa, cùng 4 huy hiệu sản phẩm nổi (`floating-badge`) chuyển động tinh tế.
  4. Thanh cam kết uy tín (`trust-bar`): Free Shipping over $50, 30-Day Free Returns, 100% Secure Checkout, 24/7 Dedicated Support.
  5. Lưới 6 danh mục mua sắm: Fashion, Electronics, Beauty, Fitness, Home Decor, Accessories.
  6. Khu vực sản phẩm mới (`New Arrivals`) với các bộ lọc danh mục tương tác, thẻ giảm giá phần trăm, đánh giá sao, nút thêm nhanh giỏ hàng.
  7. Mục sản phẩm bán chạy (`Best Sellers`) với thẻ ngang nổi bật.
  8. Banner Flash Sale tích hợp đồng hồ đếm ngược thời gian thực (Giờ : Phút : Giây) và Banner Summer Collection.
  9. Footer chuyên nghiệp 4 cột kèm ô đăng ký nhận tin (Demo only) và các biểu tượng thanh toán quốc tế.
- **D03 Cấu trúc & bố cục**: Mỗi phân đoạn trang web phục vụ đúng mục đích e-commerce chuẩn quốc tế, bố trí mạch lạc, khoảng cách nhịp nhàng.
- **D04 Hệ thống Design Tokens**: Bảng biến CSS toàn diện trong `:root` quản lý màu sắc, kiểu chữ, bóng đổ (`box-shadow`), bo góc (`border-radius`) và thời gian chuyển động.
- **D05 Tối ưu hóa đa thiết bị**: Trải nghiệm xem trơn tru trên cả màn hình lớn (1440px), máy tính bảng (820px) và điện thoại di động (375px, 320px).
- **D06 Nội dung thực tế**: Dữ liệu sản phẩm, giá bán, đánh giá sao, danh mục bằng tiếng Anh chuyên ngành thương mại điện tử, không sử dụng văn bản rác lorem ipsum.
- **D07 Tính minh bạch**: Minh bạch ghi rõ "Demo only" trên giỏ hàng thử nghiệm, thanh toán thử nghiệm và biểu mẫu đăng ký tin tức; không sử dụng đánh giá giả mạo hay logo đối tác trái phép.
- **D08 Tương tác JavaScript hữu dụng**: Thêm bớt giỏ hàng, cập nhật tổng tiền và thanh theo dõi freeship theo thời gian thực, quản lý danh sách yêu thích (wishlist), bộ lọc danh mục sản phẩm, đồng hồ đếm ngược Flash Sale, đóng mở ngăn kéo giỏ hàng (Drawer `<dialog>`) có hỗ trợ phím bấm.

---

## Deploy production & Đăng ký catalog — 06/10/2026

Theo yêu cầu của chủ sản phẩm: tiến hành triển khai sản phẩm lên production.
- **Production deployment**: `dpl_8R5eKAySomFA3qxCbWLtaVjQm2Z8` (READY)
- **Deployment URL**: https://web-8486r70pa-htmtslh-hubs-projects.vercel.app
- **Production Domain**: https://forgezone.store
- **Live Demo**: https://forgezone.store/demos/novatrend/index.html
- **Preview card**: https://forgezone.store/previews/novatrend.webp
- **Store Catalog**: Đã đăng ký sản phẩm NovaTrend tại slot `t12`, danh mục `shop`, phiên bản `1.0.0` trong `REAL_TEMPLATES` (`real-templates.ts`), liên kết gói `novatrend.zip`. URL trực tiếp: https://forgezone.store/?mau=t12.
- **Hướng dẫn khách hàng**: Đã thêm bản dịch trilingual (vi, en, zh) vào `TEMPLATE_GUIDES` (`template-guides.ts`).
- **Kiểm tra tự động deployment (`check-deployment.mjs`)**:
  - Toàn bộ 7 tài nguyên web online chính (HTML, CSS, JS, 4 ảnh WebP) trả HTTP 200, SHA-256 khớp 100% bản local.
  - Ảnh preview trả HTTP 200, byte khớp hoàn toàn.
  - Endpoint `/api/download?id=t12` trả HTTP 401 khi chưa xác thực bản quyền (bảo vệ file ZIP an toàn).
  - Trình duyệt Playwright chạy trực tiếp trên production live: Chromium 153.0.8010.12, Firefox 155.0, Edge 154.0.4258.62, Cốc Cốc 152.0.7977.124:
    - Tìm kiếm modal dialog: mở và đóng bằng phím Escape thành công.
    - Thêm sản phẩm: huy hiệu giỏ hàng cập nhật chính xác, mở drawer giỏ hàng hiển thị đúng sản phẩm, đóng drawer thành công.
    - Lọc danh mục: hiển thị huy hiệu active filter.
    - Độ tràn ngang: 0 overflow trên màn hình 375px và toàn bộ viewport.
    - Lỗi console / runtime: 0 lỗi.
  - Kiểm tra giao diện cửa hàng (Forge Zone Storefront) qua 4 kịch bản (vi-VN 1440, en-US 1440, zh-CN 1440, vi-VN 375):
    - Thẻ sản phẩm `t12` hiển thị sắc nét trong thư viện (`?tab=library`).
    - Bấm vào thẻ mở trang chi tiết `?mau=t12` đầy đủ thông tin tiếng Việt, tiếng Anh và tiếng Trung.
    - Nút "Xem bản demo" mở đúng trang demo popup `https://forgezone.store/demos/novatrend/index.html`.
    - Thêm vào giỏ hàng cửa hàng Forge Zone cập nhật chính xác `t12` vào localStorage.
    - Toàn bộ ảnh bằng chứng lưu tại `screenshots/deployed-*.png` và `screenshots/catalog-*.png`, báo cáo JSON lưu tại `deployment-checks.json`.

