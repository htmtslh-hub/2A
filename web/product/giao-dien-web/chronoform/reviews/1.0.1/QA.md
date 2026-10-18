# Chronoform 1.0.1 — thay ảnh hero

Ngày 15/10/2026. Yêu cầu: kiểm tra các mã đồng hồ hero, tạo ảnh chân thực hơn và thay vào trang. Phạm vi: bốn mẫu Paraiba CF-3123-PABL, Jupiter CF-9343-CUBK, Cowboy CF-6725-BKGO, Opus CF-7543-BLOR; source Chronoform, demo, ZIP, poster/video và metadata phiên bản riêng. Các thay đổi có sẵn của Dualplay/Leaflit và thư mục tham chiếu được giữ nguyên. Không deploy.

## Thay đổi và nguồn ảnh

Bốn ảnh AI mới được tạo riêng từ render concept gốc, giữ nhận diện mặt số, màu vỏ/dây và hướng đặt. photo-inputs.json và photo-assets.json ghi nguồn, kích thước và byte. Ảnh WebP alpha 1400×1190, khoảng 209–250 KiB/mẫu. Đã nhìn cả bốn ảnh và ảnh chụp desktop/mobile; đầy đủ dây, tai vỏ, núm và chi tiết mặt số. Đây là artwork concept tạo bằng AI, không phải ảnh chụp sản phẩm của nhà sản xuất.

Ảnh chỉ xuất hiện trong .hero__visual-slot. Chuyển slide giữ cơ chế directional/finite hiện có. Kéo hero hoặc bấm View movement chuyển sang mô hình 3D concept cũ; đổi mẫu hoặc kết thúc movement trở lại ảnh. Detail, collection và bag giữ renderer/snapshot cũ. Không biến ảnh thành mô hình 360 độ. Nếu ảnh không tải được, renderer vẫn hiện. Không sửa watch3d.js, hình học hay dữ liệu 11 sản phẩm.

WEB-STATIC-1 v1.2.1 với ngoại lệ W01/W03/W05/W06 của mẫu đã có; yêu cầu ảnh mới bổ sung bốn tài nguyên và dung lượng. ZIP 28 file, 3,234,030 byte, SHA-256 0cb1abf849bec0112db6e271a0e0d7a4a31aeecce5e42b433ee4e5cec0bdd2aa. Official dong-goi đã đọc lại so khớp source; check-template xác nhận sourceMatchesExtracted. Runtime source/demo: 25 file khớp byte. LICENCE không đổi.

## Bằng chứng kiểm tra

- hero-check.cjs / hero-checks.json: Chromium 153.0.8010.12, Firefox 155.0, Edge 155.0.4283.45, Cốc Cốc 152.0.7977.124 trên Windows headless. Bốn ảnh đúng mã/tải đủ/hiện đúng, vòng cuối-đầu hai chiều, midframe opacity, thao tác nhanh, bật/tắt ảnh khi movement, detail front/back, trở về home, file://. Mỗi trình duyệt: bốn mẫu × 1440×900 / 820×1180 / 375×812 / 320×740 không tràn ngang; OS reduced motion vẫn bật animation. Zero page errors / HTTP errors trong bài kiểm tra hero. Chromium-family cho phép SwiftShader, không tuyên bố hiệu năng GPU thực.
- fallbacks.cjs / fallbacks.json chạy trên ZIP đã giải nén: Chromium và Firefox, file://, offline, no-JS, chặn WebGL và chặn WAAPI/CSS animation. Sau cuộn thật, collection reveal hiện đủ, mở detail được, no-JS giữ 11 cards/contact, 320px không tràn, animation JS hữu hạn có midframe.
- check-template.mjs chronoform --version 1.0.1 --ngoai-le: giữ nguyên 8 FAIL của checker generic, cùng loại như bản 1.0.0. Menu resetOnDesktop giả định nút menu desktop phải biến mất; thiết kế giữ menu desktop. Sáu allVisible đếm route ẩn và nội dung chưa cuộn, trong khi motion policy mới yêu cầu animation ON. Không sửa hoặc làm yếu checker. Fallback supplement ở trên xác minh reveal sau cuộn; không gắn nhãn toàn bộ checker PASS.
- Tài liệu: 10 bước, 12 prompt, không placeholder chưa xử lý hoặc lỗi số đếm edit map. README/CUSTOMISE mô tả đúng ảnh hero và việc chuyển sang 3D.
- quay-preview.mjs chronoform: quay demo thực, 2 clicks, 0 errors/missing; MP4 549,116 byte, 960×600, 30fps, 14.966667s, không audio. Đã xem contact sheet hero/interaction/scroll/return. Poster chụp lại bằng anh-preview.mjs.
- previews:check PASS 34 recordings; chỉ manifest Chronoform đổi. npm --prefix web run typecheck PASS; npm --prefix web run build PASS. node --check main.js PASS.

## Trạng thái theo phạm vi thay ảnh

| Mục | Trạng thái | Ghi chú |
|---|---|---|
| Q01 | PASS theo ngoại lệ | 28 file, 4 ảnh alpha mới, ZIP roundtrip |
| Q02 | PASS | Hero bốn mẫu/bốn khổ/bốn browser |
| Q03 | PASS phạm vi hero; generic còn cờ cũ | Chuyển mẫu, wrap, rapid, movement, detail; không nghiệm thu lại toàn bộ commerce |
| Q04 | PASS checker phạm vi hiện có | Không thay markup control; kiểm tra keyboard generic được lưu checks.json |
| Q05 | PASS checker | Không thêm heading/ID/control; checks.json |
| Q06 | PASS trong phạm vi | Ảnh nằm ngoài chữ/CTA, màu chữ và nền không đổi; checker contrast/axe |
| Q07 | PASS supplement | file/offline/no-JS/no-WebGL/no-WAAPI-CSS sau cuộn thật; generic còn cờ cũ |
| Q08 | PASS trong môi trường đã thử | Bốn browser headless; Safari, thiết bị thật NOT TESTED |
| Q09 | PASS phạm vi thay ảnh | Hero zero page/HTTP errors, build/typecheck, không thêm vòng lặp RAF |
| Q10 | PASS | Hướng dẫn và nguồn ảnh cập nhật, licence giữ nguyên |
| Q11 | PASS | ZIP roundtrip, nguồn bằng bản giải nén |
| Q12 | PASS local phần tài nguyên; online NOT TESTED | Demo/poster/video/version đồng bộ; không deploy, không thử mua/tải có thanh toán |
| Q13 | PASS phạm vi hình ảnh | D01–D04/D06–D08 giữ nội dung/bố cục; D05 hero bốn khổ được nhìn ảnh |

Kết quả: hoàn thành bản thay ảnh local và gói 1.0.1. Không tuyên bố nghiệm thu phát hành toàn hệ thống hoặc mọi browser/thiết bị. Các cờ generic giữ nguyên trong bằng chứng; chưa thử Safari, GPU/touchscreen thật và luồng thanh toán. Trang online giữ bản đã deploy trước đó.


## Production — 15/10/2026

Người dùng duyệt bản local và yêu cầu đưa lên store. Vercel deployment dpl_GYgQGo7dscQeLX7TTdKnn2yWGqNn READY, alias https://forgezone.store; deployment URL https://web-k6htsfo38-htmtslh-hubs-projects.vercel.app. Cloud build và manifest check PASS.

online-check.cjs / online-checks.json: 27 tài nguyên public (25 runtime, poster và MP4) khớp SHA-256 local byte-for-byte. Bốn hero ảnh mới tải/hiện đúng trên Chromium, Firefox, Edge, Cốc Cốc, không page error. Trang chi tiết store t31 hiện Chronoform và phát video revision 984baf4e10c6, muted/loop. Download ẩn danh 401, ZIP public trực tiếp 404. Không thực hiện thanh toán/mua thật. Trạng thái Q12 phần online demo/store/preview: PASS trong phạm vi trên; paid download vẫn NOT TESTED. Các giới hạn checker generic và thiết bị thật vẫn như phần trên.
