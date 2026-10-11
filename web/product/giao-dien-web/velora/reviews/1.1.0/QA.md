# QA Velora 1.1.0

Ngày 10/10/2026. WEB-STATIC-1, quy chuẩn 1.2 + ngoại lệ W05 được chủ sản phẩm
xác nhận khi yêu cầu chuyển sản phẩm, animation và xem thông tin như video.
Trạng thái: **ĐẠT theo ngoại lệ W05 cho gói giao diện cục bộ**.
Không phát hành cửa hàng/catalog, backend hoặc website online.

## Phạm vi và thay đổi

Chỉ sửa Velora: source/index.html, assets/css/style.css, assets/js/main.js,
README.md, CUSTOMISE.md, README hồ sơ sản phẩm và velora.zip; hồ sơ mới tại đây.
LICENCE.txt giữ nguyên byte. Các thay đổi có sẵn ngoài Velora được giữ nguyên.
Không cập nhật database, cấu hình chung, public/demos hoặc catalog.

Bản 1.0.0 chỉ trình bày tĩnh. Bản 1.1.0 có:
- Chọn Metro/Onyx/Loop bằng mũi tên, phím hoặc preview; wrap trực tiếp hai chiều.
- Slide theo hướng thao tác; frame cũ được hủy khi bấm nhanh.
- View bike chuyển chính SVG đang chọn sang chi tiết; Back/Escape trở lại.
- Overview/Specifications theo model; thông số demo có nhãn minh bạch.
- Wheels/Frame/Saddle/Handlebar dùng radio thật, thay đổi minh hoạ và summary.
- Cấu hình riêng cho mỗi model giữ trong phiên đang mở; enquiry chứa đúng setup.
- Pause hủy rAF ngay, reload bật motion mặc định; không phụ thuộc CSS/WAAPI.

Không giỏ hàng/thanh toán/đặt hàng. Enquiry mở ứng dụng email, không gửi tự động.
Giá và thông số là demo; option không cộng giá. Copyright holder còn ô cần chủ
sản phẩm điền trước khi phát hành; không tự thay nội dung licence.

## Môi trường và bằng chứng

Windows; trình duyệt thật chạy headless với context/profile test riêng:
chromium 153.0.8010.12, firefox 155.0, edge 155.0.4283.45, coccoc 152.0.7977.124.
Base QA Chromium + Firefox: HTTP và file:// từ ZIP giải nén.
Product QA cả bốn browser: file:// từ cùng ZIP giải nén, hai chế độ OS motion.
Viewport và chuỗi TouchEvent là mô phỏng, không gọi là điện thoại/tablet thật.
Không chạy Safari, thiết bị vật lý hoặc kiểm tra triển khai online.

Kiểm tra nền tảng: [final-repair/checks.json](final-repair/checks.json).
Kiểm tra sản phẩm + frame trung gian: [products/checks.json](products/checks.json).
Ảnh: final-repair/screenshots/ (gallery, menu, no-JS, offline, zoom);
products/ (detail/specs + custom setup, cả bốn browser).
Video demo.mp4 quay tương tác từ mã thật, không ghép concept.

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS | Sáu file, ZIP khớp source từng byte |
| Q02 | PASS | Gallery: 1440×900, 820×1180, 375×812, 320×740; detail thêm 414×582, 1180×820; không overflow hoặc nút enquiry đè controls |
| Q03 | PASS | Menu, links, selectors, detail/back, specs, configuration, state persistence, preview/Explore đúng model |
| Q04 | PASS | Skip link/Tab/Shift+Tab, menu Escape, arrows carousel/tab, Escape detail, focus return, vùng ẩn inert |
| Q05 | PASS | Một h1, landmarks, SVG có tên/viewBox, IDs duy nhất; axe gallery và detail không vi phạm |
| Q06 | PASS | CSS/pixel contrast + focus/hover trong base QA; axe detail; đã nhìn ảnh chữ trên panel, không chữ đè ảnh phức tạp |
| Q07 | PASS theo rule motion | No JS/offline/file:///system font/zoom; OS reduce + saved off vẫn animation; pause ngay; finite rAF cả khi CSS/WAAPI bị tắt |
| Q08 | PASS | Chromium/Firefox base QA; cả bốn browser product flows, OS settings, wrap/rapid input và fallback |
| Q09 | PASS | Không console/network errors trong base QA; không pageerror trong product flows, idle rAF = 0 |
| Q10 | PASS trong phạm vi | 10 bước, 12 prompt, literal counts đúng; licence bảy mục giữ nguyên, copyright ô chờ owner trước publish |
| Q11 | PASS | ZIP giải nén và chạy lại, size/hash dưới đây |
| Q12 | N/A | Không tích hợp hoặc triển khai cửa hàng trong nhiệm vụ |
| Q13 | PASS | D01–D08 bên dưới, ảnh gallery/detail/specs đã xem |

ZIP: `20450` byte, nhỏ hơn 20.480 byte.
SHA-256: `d882e9c33d1af401c779cf71b70da50aa425231db6cd4677a1b2b5fbe981f664`.
Base failures: `[]`; product failures: `[]`.

## Animation và đồng bộ dữ liệu

| Browser | Điều kiện | Frame giữa wrap prev / next | Frame giữa mở chi tiết | rAF còn chạy khi idle |
|---|---|---|---|---|
| chromium | no-preference + saved off | 47 / 47 | 35 | 0 |
| chromium | reduce + saved off | 46 / 46 | 36 | 0 |
| firefox | no-preference + saved off | 93 / 92 | 70 | 0 |
| firefox | reduce + saved off | 92 / 93 | 61 | 0 |
| edge | no-preference + saved off | 90 / 90 | 61 | 0 |
| edge | reduce + saved off | 92 / 91 | 70 | 0 |
| coccoc | no-preference + saved off | 83 / 89 | 62 | 0 |
| coccoc | reduce + saved off | 91 / 91 | 71 | 0 |

Hai lượt wrap kiểm: 0→2 Previous và 2→0 Next. Incoming vào đúng phía; outgoing
thoát đúng hướng; model thứ ba không đi qua tâm với opacity cao. Bấm nhanh
Next/Next/Previous/Next dừng đúng Loop; hình/tên/giá/counter/ARIA theo cùng index.
Clamp tiến độ 0..1 sửa frame đầu bị âm do timestamp RAF sớm hơn thời điểm bắt đầu.
Không còn FAIL sau sửa; mã cuối cùng được đóng ZIP và kiểm lại.

Mở chi tiết giữ identity cùng SVG (data identity proof), có frame giữa scene.
Loop: chọn Graphite/Disc/City/Rise -> SVG, summary và mailto body đều khớp.
Đổi Metro -> defaults Chalk/Three-spoke/Slim/Flat; quay Loop -> setup trước được
khôi phục. Specifications, giá và tên đúng từng model. Explore cả ba model mở
đúng model; chọn preview bên cạnh chuyển xe, chọn preview active mở chi tiết.
Swipe ngang đổi xe; swipe dọc không đổi xe và không preventDefault trong test.
Pause giữa transition settle ngay, không rAF còn chạy. Reload vẫn bật.
No CSS/WAAPI + storage bị chặn vẫn có frame giữa và kết thúc đúng model.

## Bảng hành vi

| Phần tử | Hành vi | Kết quả |
|---|---|---|
| Previous/Next | Đổi model theo hướng, direct wrap | PASS |
| Preview | Chọn model; active preview mở detail | PASS |
| View bike / Back / Escape | Gallery ↔ detail cùng SVG/model | PASS |
| Overview/Specifications | Selected data, tabs + roving keyboard | PASS |
| Wheels | Three-spoke / Classic / Disc, SVG đổi đúng | PASS |
| Frame | Chalk / Graphite / Lavender, paint stops đổi | PASS |
| Saddle / Handlebar | Slim/City, Flat/Rise và summary cập nhật | PASS |
| Explore 3 cards | Đúng model, detail + finite scroll | PASS |
| Enquire | mailto đúng model + setup; không giả gửi mail | PASS đích, gửi thực tế N/A |
| Pause / Resume | Hủy animation, reload default on | PASS |
| Menu | Toggle ARIA, click/Escape/resize/focus | PASS |

## D01–D08

D01 PASS: Folding bikes, lựa chọn model và View bike -> enquiry rõ.
D02 PASS: gallery thẻ tím có xe vượt biên; shared-object transition sang detail.
D03 PASS: hero chọn/xem/configure; collection chọn trực tiếp; details giải thích;
contact hành động thật. Không social proof giả hoặc section để lấp chỗ.
D04 PASS: token màu/font/nút nhất quán, light theme theo video.
D05 PASS: đã nhìn gallery + detail/specs ở 1440, 820, 375, 320; label và controls
không chồng, mobile xếp dọc. Viewport ngắn vẫn có thể cuộn đọc đủ nội dung.
D06 PASS: tiếng Anh cụ thể, không lorem ipsum.
D07 PASS: tên/giá/spec đều demo được công khai, không testimonial/chứng nhận giả.
D08 PASS: product data, UI labels, SVG setup và enquiry đồng bộ theo test.

## Lệnh và giới hạn

node web/product/giao-dien-web/tools/dong-goi.mjs velora
node web/product/giao-dien-web/tools/check-template.mjs velora --version 1.1.0 --out final-repair
node web/product/giao-dien-web/velora/reviews/1.1.0/check-products.mjs

Nguồn duy nhất là source/. Preview/video quay nguồn cùng byte với ZIP; source hash
khớp bản giải nén. final/ ghi lượt trước sửa timestamp; final-repair/ là bằng
chứng gói cuối. Q12 N/A, không hứa luồng tải sau thanh toán hoặc công bố online.
Skill-morge được áp dụng choreography; yêu cầu AGENTS 05/10/2026 ghi đè mặc định
motion reduced/off của skill. Ngoại lệ W05 chỉ cho tương tác Velora đã yêu cầu;
không nới ngưỡng byte, thêm library/backend hoặc đổi licence.
