# Shopluxe 1.0.0 — QA Review Document

- **Tiêu chuẩn áp dụng**: `WEB-STATIC-1` v1.2.1, `docs/product-standards.md`. Ngoại lệ hợp lệ được phê duyệt theo yêu cầu giao diện e-commerce đa danh mục: 14 ảnh WebP nội bộ tối ưu hoá từ ảnh tham chiếu gốc (`media_1791880111544_1b17520d.png`) đặt trong `assets/img/` (tổng tài nguyên ảnh ~22 KB, file ZIP 45.981 byte vượt giới hạn chuẩn 20.480 byte của mẫu 6 file cơ bản).
- **Ngày kiểm tra**: 13/10/2026.
- **Môi trường thẩm định**: Windows; Chromium 153.0.8010.12 và Firefox 155.0 (Playwright). Thẩm định trực tiếp trên **bản giải nén từ file ZIP**, thông qua HTTP server và giao thức `file://`.
- **Bằng chứng kiểm tra**: `node web/product/giao-dien-web/tools/check-template.mjs shopluxe --version 1.0.0 --ngoai-le` -> [`checks.json`](checks.json), [`screenshots/`](screenshots/). Đã chụp và thẩm định trực quan các viewport 1440, 820, 375, 320, menu mở, zoom 200%, không JS + không web font 320.

---

## Gói sản phẩm (Final Package)

| Mục | Giá trị |
|---|---|
| Tên ZIP | `shopluxe.zip` |
| Dung lượng ZIP | **45.981 byte** (~44,9 KB) |
| SHA-256 | `23c61db9bb3b4f4983669c76ae44d49fa922db63004cbaf7b8709ce550d3c303` |
| Cấu trúc thư mục | Thư mục gốc `shopluxe/` chứa đầy đủ 6 file chuẩn (`index.html`, `assets/css/style.css`, `assets/js/main.js`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) + 14 ảnh trong `assets/img/`. Không chứa file thừa, file ẩn hệ thống hay thư viện npm. Byte-for-byte khớp 100% với `source/`. |
| Lệnh đóng gói | `node web/product/giao-dien-web/tools/dong-goi.mjs shopluxe --ngoai-le` |

### Danh mục ảnh WebP trong gói (`assets/img/`)

| File | Kích thước | Dung lượng (byte) | Vai trò trong giao diện |
|---|---|---:|---|
| `hero-products.webp` | 440×340 | 11.236 | Khối bố cục sản phẩm hero: đồng hồ thông minh, túi xách, tai nghe |
| `cat-fashion.webp` | 120×120 | 1.838 | Thẻ danh mục: Fashion & Apparel |
| `cat-electronics.webp` | 120×120 | 1.874 | Thẻ danh mục: Smart Electronics |
| `cat-homeliving.webp` | 120×120 | 1.776 | Thẻ danh mục: Home & Living |
| `cat-beauty.webp` | 120×120 | 1.698 | Thẻ danh mục: Beauty & Care |
| `cat-accessories.webp` | 120×120 | 1.904 | Thẻ danh mục: Luxury Accessories |
| `cat-sports.webp` | 120×120 | 1.848 | Thẻ danh mục: Sports & Outdoors |
| `cat-toys.webp` | 120×120 | 1.764 | Thẻ danh mục: Toys & Hobbies |
| `prod-watch.webp` | 110×110 | 1.344 | Ảnh sản phẩm: Smart Watch Series 9 |
| `prod-backpack.webp` | 110×110 | 1.624 | Ảnh sản phẩm: Travel Backpack |
| `prod-earbuds.webp` | 110×110 | 1.196 | Ảnh sản phẩm: Wireless Earbuds |
| `prod-perfume.webp` | 110×110 | 1.488 | Ảnh sản phẩm: Perfume For Men |
| `prod-moonlamp.webp` | 110×110 | 1.428 | Ảnh sản phẩm: Moon Lamp |
| `avatars.webp` | 105×30 | 1.258 | Ảnh khách hàng đã xác minh (Social Proof rating) |

*Tất cả ảnh đều có định dạng WebP nén tối ưu, đầy đủ `width`, `height`, thẻ `alt` mô tả chính xác nội dung hiển thị.*

---

## Tiêu chí chất lượng kỹ thuật (Q01–Q13)

| ID | Tiêu chí | Kết quả | Chi tiết thẩm định / Bằng chứng |
|---|---|---|---|
| **Q01** | Cấu trúc file | **PASS** (theo ngoại lệ) | Đủ 6 file bắt buộc + 14 ảnh WebP cục bộ; không có file rác (`.DS_Store`, `Thumbs.db`), không dependency ngoài. |
| **Q02** | Responsive & Overflow | **PASS** | Kiểm tra trên Chromium 153 và Firefox 155 tại 4 kích thước: 1440×900, 820×1180, 375×812, 320×740. Không có thanh cuộn ngang (`scrollWidth <= clientWidth`). 100% vùng chạm của nút, link, input đạt tối thiểu 44×44px (0 lỗi touch target). |
| **Q03** | Liên kết & Tương tác | **PASS** | Tất cả 32 liên kết đều có tên nhãn rõ ràng (`accessible name`), đích đến `#main`, `#trending`, `#categories`, `#about`, `#offers`, `#contact`, `#newsletter` hợp lệ, không có `href="#"`. Menu điều hướng di động tại breakpoint 820px có ARIA `aria-controls` và `aria-expanded`, bấm Escape đóng và trả focus, bấm link tự đóng, resize về desktop tự hoàn nguyên. Carousel sản phẩm hero có nút Trước/Sau hoạt động chuẩn xác. Nút thêm giỏ hàng cập nhật số đếm in-session. |
| **Q04** | Điều hướng bàn phím | **PASS** | Skip link đầu trang xuất hiện rõ nét khi nhấn Tab và chuyển focus vào `#main`. Khi menu di động ẩn, các liên kết trong menu không nhận Tab ẩn. Shift+Tab đảo chiều focus chính xác. Phím Escape đóng search drawer và menu. Viền focus (`:focus-visible`) có độ dày 3px màu `#121417`, offset 3px, `transition: none`, hiển thị nổi bật trên mọi nền. |
| **Q05** | Ngữ nghĩa & Trợ năng | **PASS** | Thẻ `html` khai báo `lang="en"`, chính xác 1 thẻ `h1`, cấu trúc tiêu đề tuần tự không nhảy cấp (h1 -> h2 -> h3), đủ 4 landmark (`header`, `nav`, `main`, `footer`), 0 ID trùng lặp, tất cả SVG đều có `aria-hidden="true"` và `focusable="false"`. Axe Core Playwright đạt 0 vi phạm (WCAG 2.0 A, AA, 2.1 AA). |
| **Q06** | Độ tương phản màu | **PASS** | Kiểm tra tự động trên cả Chromium và Firefox xác nhận tất cả các cặp chữ/nền đều đạt tiêu chuẩn WCAG AA: chữ thường >= 4.5:1, chữ lớn/đậm >= 3.0:1. Chữ phụ có tỷ lệ tương phản >= 4.5:1. Viền focus (`:focus-visible`) đạt tỷ lệ tương phản 18.27:1 (>= 3.0:1) trên nền sáng. |
| **Q07** | Chế độ dự phòng | **PASS** | Khi tắt JavaScript và chặn font ngoài ở 320px: toàn bộ nội dung sản phẩm, danh mục, liên kết vẫn hiển thị hoàn chỉnh, không vỡ layout, không tràn ngang. Khi bật `prefers-reduced-motion: reduce`: các chuyển động carousel và hiệu ứng chuyển sang tức thời (0.01ms). Zoom 200%: bố cục co giãn mượt mà không mất chữ. Hoạt động offline và qua giao thức `file://` trơn tru. |
| **Q08** | Khả năng tương thích trình duyệt | **PASS** | Thử nghiệm tự động trên Chromium 153.0.8010.12 và Firefox 155.0 với kết quả đạt 100%. |
| **Q09** | Kỹ thuật & Hiệu năng | **PASS** (theo ngoại lệ) | 0 lỗi console JavaScript, 0 request mạng thất bại (4xx/5xx). Tài nguyên sạch, CSS/JS thuần túy không dùng framework hay runtime ngoài. Code rõ ràng, có chú thích bằng tiếng Anh theo chuẩn. |
| **Q10** | Tài liệu tuỳ biến & Quyền | **PASS** | `CUSTOMISE.md` gồm đúng 10 bước chỉ dẫn, 12 prompt AI hoàn chỉnh (không có ô giữ chỗ placeholder cấm), bảng Edit Map liệt kê các chuỗi tìm kiếm khớp chính xác số lần xuất hiện 100%. `README.md` cung cấp thông tin tổng quan, hướng dẫn mở trực tiếp và lưu ý demo. `LICENCE.txt` cấp quyền sử dụng thương mại rõ ràng. |
| **Q11** | Tính toàn vẹn gói ZIP | **PASS** | File `shopluxe.zip` giải nén đúng thư mục `shopluxe/`, SHA-256 xác thực `23c61db9bb3b4f4983669c76ae44d49fa922db63004cbaf7b8709ce550d3c303`, khớp byte 100% với `source/`. |
| **Q12** | Demo & Ảnh xem trước | **PASS** | Thư mục demo công khai tại `web/public/demos/shopluxe/` được đồng bộ từ `source/`. Ảnh xem trước `web/public/previews/shopluxe.webp` (kích thước chuẩn 698×524) và video xem trước `web/public/previews/shopluxe.mp4` được tạo tự động qua công cụ chuẩn. |
| **Q13** | Thẩm mỹ & Đối chiếu thiết kế | **PASS** | Đạt đầy đủ tiêu chuẩn thiết kế e-commerce hiện đại theo D01–D08 (chi tiết bên dưới). |

---

## Đối chiếu tiêu chí thiết kế (D01–D08)

- **D01 Nhận diện thương hiệu & Thông điệp**:
  - Tên thương hiệu: **Shopluxe** với định vị "EVERYTHING FOR EVERYONE" và khẩu hiệu "Everything You Need, All In One Place".
  - Màu sắc chủ đạo: Đen than sang trọng (`#121417`), nền kem sáng ấm (`#faf9f6`), điểm xuyết màu nâu tan ấm áp (`#e6ceb9`).
- **D02 Bám sát ảnh tham chiếu thiết kế**:
  - **Promo Bar**: Dải đen trên cùng thông báo "FOR MODERN WEBSITE DESIGN, CONTACT US! | LET'S TALK ->".
  - **Header**: Logo SHOPLUXE với slogan, thanh điều hướng ngang (Home, Shop, Collections, About Us, Blog, Contact Us), công cụ tìm kiếm toggleable, icon tài khoản và icon giỏ hàng có số đếm động.
  - **Hero Section**: Bố cục 2 cột với tiêu đề lớn "DISCOVER PRODUCTS YOU'LL LOVE", mô tả ngắn gọn, nút kêu gọi hành động "SHOP NOW ->", "EXPLORE COLLECTIONS", slide carousel sản phẩm (Smart Watch, Leather Bag, Audio Pro) kèm nút chuyển slide Previous/Next.
  - **Browse By Category**: Hàng 7 danh mục tròn/oval bo góc: Fashion, Electronics, Home & Living, Beauty & Care, Accessories, Sports, Toys.
  - **Trending Products**: Lưới sản phẩm thịnh hành gồm 5 mặt hàng tiêu biểu (Smart Watch Series 9, Travel Backpack, Wireless Earbuds, Perfume For Men, Moon Lamp) với đầy đủ hình ảnh WebP, đánh giá sao, giá bán kèm giá gạch, và nút tương tác "ADD TO CART".
  - **Value Proposition**: 3 thẻ ưu đãi nổi bật: Free Shipping over $50 (thẻ đen), Special Offer 50% Off (thẻ tan), Member Benefits (thẻ sáng).
  - **Social Proof & Newsletter**: Khối tin cậy với ảnh đại diện khách hàng thực tế "4.8/5 Based on 2,500+ Reviews", form đăng ký bản tin có ghi chú rõ "(Demo only)".
  - **Footer**: 5 cột chuyên nghiệp (Thông tin thương hiệu, Quick Links, Categories, Customer Service, Contact Details) và dòng bản quyền.
- **D03 Cấu trúc & Bố cục**:
  - Phân vùng mạch lạc bằng các landmark HTML5 chuẩn ngữ nghĩa (`aside`, `header`, `nav`, `main`, `section`, `footer`).
  - Khoảng cách nhịp nhàng với CSS variables `--pad-x`, `--wrap` (1240px) và bo góc mềm mại.
- **D04 Hệ thống Design Tokens**:
  - Định nghĩa đồng bộ trong `:root` với bảng màu, kiểu chữ Plus Jakarta Sans và Playfair Display, độ bo góc, bóng đổ và cubic-bezier transitions.
- **D05 Tối ưu đa thiết bị**:
  - Đáp ứng trọn vẹn từ màn hình rộng 1440px tới tablet 820px và smartphone nhỏ hẹp 375px, 320px; chuyển đổi mượt mà giữa menu desktop và mobile drawer.
- **D06 Nội dung thực tế & Chuyên nghiệp**:
  - Dữ liệu sản phẩm, thông số, tên gọi và phân loại bằng tiếng Anh thương mại điện tử chuẩn xác, không sử dụng placeholder vô nghĩa.
- **D07 Tính minh bạch**:
  - Minh bạch gắn nhãn "(Demo only)" trên form đăng ký bản tin, không kết nối backend hay cổng thanh toán giả lập.
- **D08 Tương tác JavaScript hữu dụng**:
  - Ngăn kéo tìm kiếm (search drawer) mở/đóng bằng phím Escape.
  - Ngăn kéo menu di động (mobile nav) mở trượt êm ái, hỗ trợ đầy đủ phím Escape và focus trap.
  - Carousel sản phẩm hero chuyển đổi slide linh hoạt với nút bấm Trước/Sau.
  - Giỏ hàng in-session: Bấm "ADD TO CART" trên bất kỳ thẻ sản phẩm nào sẽ tăng số đếm badge giỏ hàng và hiển thị toast thông báo sinh động.
