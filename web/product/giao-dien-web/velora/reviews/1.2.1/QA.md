# QA Velora 1.2.1 — phát hành trên forgezone.store

Ngày 10/10/2026. WEB-STATIC-1 v1.2 + ngoại lệ W05 đã được chủ sản phẩm cho phép
khi yêu cầu carousel, animation và cấu hình. Chủ sản phẩm yêu cầu đóng gói/đưa
lên web và xác nhận copyright Forge Zone. Đã triển khai; kiểm tra kỹ thuật đạt.
Luồng thanh toán thật và tải của tài khoản đã mua: NOT TESTED, không tạo đơn,
quyền mua hoặc giao dịch để thử. Không quảng cáo nghiệm thu thanh toán đầy đủ.

## Phạm vi

Nguồn Velora sáu file, docs, ZIP; demo/preview Velora; thêm t19 và guide ba ngôn
ngữ; shared view nối mã mới sau 18 ô gốc. Không ghi đè t1-t18. Giữ các thay đổi
ngoài phạm vi trong workspace cũ. Dùng worktree từ đúng production fa5476a,
không đưa các thay đổi cửa hàng/category/admin chưa phát hành từ workspace lên.
Chỉ điền tên copyright được xác nhận; giữ bảy điều khoản thương mại.
Không đổi DB/schema/auth/payment hoặc dữ liệu sản phẩm khác.

## Gói và triển khai

ZIP 20438 byte, sáu file, đọc lại khớp byte source.
SHA-256 f90b6f5ff520867d570f3b793067b1f86634f08ed72d0394df4eb4f33d17ba61.
SHA-1 8fe91c902c88c86a0a6f9b852e40e3d7e0b20f0e khớp file Vercel source listing.
Release commit 18375466339026ae41aeff469b80aa4df8ca5012 đã push origin/master.
Deployment dpl_3o7tF3VXo3We8XE6LrhBh8vX9t3K READY, alias forgezone.store.
https://forgezone.store/?mau=t19
https://forgezone.store/demos/velora/index.html?v=1.2.1
Build local + cloud/TypeScript và scoped ESLint đạt. Download tracing chứa
product/giao-dien-web/velora/velora.zip. Paid ZIP nằm ngoài public, URL trực tiếp
trả 404. Không tạo transaction hay thay quyền tài khoản.

## Bằng chứng

checks.json + screenshots/: base Chromium 153.0.8010.12 / Firefox 155.0,
file:// và HTTP từ ZIP. Base chạy trước khi dọn một whitespace trong README;
HTML/CSS/JS không thay byte, đóng lại ZIP đọc so khớp sáu file và SHA cuối ở trên.
products/checks.json: toàn bộ product flow ở Chromium/Firefox/Edge/Cốc Cốc.
Màu bổ sung: ../1.2.0/colours/checks.json sáu màu x ba xe x bốn browser;
main.js/index.html/style.css giữ cùng byte với bản 1.2.0.
store-local/checks.json + store-online/checks.json: ba ngôn ngữ, desktop/mobile.
resources-online.json: HTML/CSS/JS/CUSTOMISE/preview 200, hash đúng byte cục bộ;
store/home/admin và demo Watchroom/Mint Atlas/Melt Muse/Apartment Flow 200.
online-products/checks.json: Edge 155.0.4283.45 và Cốc Cốc 152.0.7977.124 thật,
OS no-preference/reduce + saved off, hai chiều wrap, rapid input, scene, setup,
specs, focus/tab/swipe, idle finite RAF và fallback CSS/WAAPI/storage.
guide-online.json: hướng dẫn riêng Velora đúng ba Accept-Language vi/en/zh.
download-online.json: owner session ký ngắn hạn chỉ để đọc route, tài khoản
không có quyền mua nhận 403; anonymous 401. Không ghi dữ liệu tài khoản/order.

Windows headless, viewport và touch mô phỏng; không điện thoại/tablet/Safari
thật. Không test Google OAuth, mail gửi thực tế hoặc thanh toán thật.
Đã nhìn preview, detail cửa hàng online toàn trang, gallery/detail và màu mobile.

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS | Sáu file/ZIP đọc so khớp |
| Q02 | PASS | Gallery/detail 1440×900, 820×1180, 375×812, 320×740; thêm hai khổ detail; không tràn/chồng |
| Q03 | PASS | Product suite đủ model/specs/choices/state/summary/enquiry; store links |
| Q04 | PASS | Skip/menu/Tab/arrows/Escape/focus; radio màu ArrowRight |
| Q05 | PASS | Base IDs/landmarks/headings/names/axe + detail axe |
| Q06 | PASS | Base contrast/focus/hover; nhãn/swatches rõ; ảnh đã xem |
| Q07 | PASS theo motion rule | noJS/offline/file/zoom; motion default on, pause hữu hạn, fallback |
| Q08 | PASS phạm vi | Bốn browser local; Edge/Cốc Cốc motion online, Chromium storefront |
| Q09 | PASS | Không runtime/network errors trong phạm vi suite; idle RAF 0 |
| Q10 | PASS | Literal edit map/10 bước/12 prompt; copyright Forge Zone, licence 7 mục |
| Q11 | PASS | Size/hash/source ZIP cuối; cloud source hash và tracing |
| Q12 | PASS tích hợp; NOT TESTED thanh toán thật | t19 đúng sản phẩm, demo/guide/preview, denial 401/403; chưa thử tải có quyền sau đơn thật |
| Q13 | PASS | D01-D08 dưới đây, screenshots đã xem |

D01-D03: showroom chọn/xem/cấu hình xe → email thật, section có mục đích;
choreography cùng SVG theo video, thẻ tím/xe nổi khỏi thẻ. D04: token/chữ/nút
nhất quán, swatch và paint khớp. D05: bốn khổ responsive, bảng sáu màu không
tràn/chồng CTA. D06-D08: copy cụ thể, fictional data minh bạch; đúng model/giá/
specs/setup/email, không thêm claim kinh doanh. Store specs mô tả đúng gói.

Tất cả suite failures []; không kết luận toàn bộ browser/thiết bị đã thử.
Q12 giao dịch thật chưa thử như trên; yêu cầu đưa lên web đã được thực hiện.

Local store dùng môi trường không có DATABASE_URL/AUTH_SECRET nên log backend
báo thiếu cấu hình cho các request nền auth/counts. Store-local chỉ xác nhận
render/catalog/preview/responsive, không xác nhận backend local. Production
có cấu hình, session/download denial và ba ngôn ngữ đã kiểm tra riêng ở trên.
