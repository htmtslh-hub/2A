# Watchroom 1.2.0 — cinematic reference update

Ngày 07/10/2026. Yêu cầu: sửa Watchroom theo Pinterest.mp4, sau đó push GitHub và deploy. Video được dùng để tham chiếu bố cục/choreography, không sao chép thương hiệu, ảnh đồng hồ, người, video hay mã nguồn của Chronoswiss. Giữ ba ảnh AI đã tạo riêng trong 1.1.0, tên/giá demo và các liên kết enquiry.

Phạm vi: Watchroom source, generator, tài liệu, ZIP, demo và preview. Không sửa catalog, admin, tài khoản, database hoặc sản phẩm khác. Nguồn có những thay đổi không liên quan của người dùng; bản Git/deploy được chuẩn bị từ origin/master trong worktree riêng để giữ các cập nhật sản phẩm mới trên remote và không đưa thay đổi admin cục bộ lên.

## Thay đổi

- Nền đen với ánh sáng blue, silver-purple và gold theo data-tone của model; bỏ orbit và rail peach, gom shortlist/enquiry trên header.
- Chữ nhẹ, sân khấu rộng, ảnh nghiêng, preview nhỏ của model kế tiếp.
- Carousel RAF hữu hạn 1250ms: outgoing và incoming cùng trượt/tilt/crossfade. Hướng lấy trước modulo; wrap đi thẳng. Thao tác nhanh lấy pose đang render, hủy RAF cũ, và chọn đích từ selected index.
- Pause giữa lượt settle model đích, đồng bộ tên/giá/ảnh/ARIA; mở lại mặc định motion on. Scroll dùng tween 260ms hữu hạn trên watch-stack riêng, không ghi đè transform ảnh con. Halo CSS có fallback pulse hữu hạn.
- Search icon được bổ sung aria-label sau khi axe phát hiện thiếu tên đọc.

## Ngoại lệ kế thừa

W01/W03/W06: sáu file lõi + ba WebP cục bộ; không còn hồ sơ sáu file SVG <20KiB. W05: carousel, search/filter, shortlist, dialog, motion đã được chủ sản phẩm yêu cầu. Motion mặc định bật cả reduced-motion và halo chạy liên tục có Pause theo quy tắc chủ sản phẩm 05/10/2026. Không tự đổi chuẩn chung hoặc LICENCE. Bản này là demo công khai; chưa thêm vào catalog bán hàng. Kiểm tra quyền thương mại ảnh và cập nhật mô tả SVG cũ trong LICENCE vẫn cần chủ sản phẩm giải quyết trước niêm yết.

## Bằng chứng

`check-cinematic.mjs` / `cinematic.json`: Chromium 153.0.8010.12, Firefox 155.0, Edge 154.0.4258.62, Cốc Cốc 152.0.7977.124 cài thật, headless trên Windows. PASS: bốn viewport 1440×900, 820×1180, 375×812, 320×740 không tràn ngang; ảnh tải đúng; sáu lượt next/previous gồm cả wrap với frame giữa hướng đúng; bấm nhanh; Pause giữa lượt; fallback khi ép CSS transition/animation none; scroll transform; shortlist/Escape; search empty; women filter; mở lại motion on; no-JS đọc được hero; console không lỗi. Reduced-motion:reduce và stored off cũ được dùng trong test. Đây là viewport/touch mô phỏng, không phải thiết bị vật lý.

`check-template.mjs watchroom --version 1.2.0 --ngoai-le` kiểm tra bản giải nén ZIP trên Chromium/Firefox: source byte khớp ZIP, tài liệu đủ 10 bước/12 prompt và số đếm đúng, responsive, keyboard, focus, pixel contrast, axe, zoom, offline/noJS. Hai trường hợp menu-toggle không áp dụng: cả ba link danh mục luôn hiện ở mọi khổ. Các báo cáo motion reduce/5 giây là kỳ vọng chuẩn cũ bị yêu cầu mới thay thế, không phải lỗi motion. Xem checks.json cuối cùng cho kết quả và ngưỡng thực đo.

Đã xem screenshot desktop/mobile và frame giữa chuyển cảnh. Desktop full-page lúc reveal chưa chạy ở vùng dưới không dùng làm bằng chứng section trắng; các section được xác nhận sau khi cuộn trong kiểm tra tổng thể. Safari/thiết bị cảm ứng thật và Q12 mua/tải sau thanh toán NOT TESTED, vì không thuộc demo này.

ZIP: 475865 byte; SHA-256 `dffae9a44644c615055f011fe4ec5e7d4faf6b247bf3c925a18952dd13b59606`. Gói đóng lại sau aria-label, đọc lại chín file và so khớp source. Demo HTML/CSS/JS và preview đồng bộ. Không deploy từ checkout chứa thay đổi admin chưa commit.
