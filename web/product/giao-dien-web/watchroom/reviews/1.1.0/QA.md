# Watchroom 1.1.0: chuyển đồng hồ sang ảnh

06/10/2026. Yêu cầu mới: “em tạo sản phẩm đồng hồ bằng ảnh đi”. Thay đồng hồ SVG bằng ba ảnh raster tự tạo; giữ bố cục, nội dung, CTA, carousel, parallax, shortlist và pause của Watchroom.

## Phạm vi và ngoại lệ

WEB-STATIC-1 v1.2 + ngoại lệ W01/W03/W06 về ảnh theo yêu cầu rõ ràng của chủ sản phẩm. Không áp dụng hồ sơ WEB-STATIC-IMG-1 như một chuẩn đã được duyệt. Sáu file lõi + ba WebP trong assets/img/, tổng chín file. Tự giới hạn mỗi ảnh dưới300KB và ZIP dưới1MiB; đây là ngưỡng kiểm soát của phiên bản này, không sửa chuẩn dùng chung. W05/motion kế thừa yêu cầu và AGENTS.md ngày05/10/2026; motion mặc định bật, không đọc off cũ hoặc tự tắt theo prefers-reduced-motion.

Chỉ sửa source/design/tài liệu Watchroom, ZIP, demo/previews Watchroom và hồ sơ1.1.0. Không sửa catalog, sản phẩm khác, backend, cấu hình hoặc triển khai. Các thay đổi admin có sẵn giữ nguyên.

## Tài sản ảnh

Built-in image_gen, không API CLI, không hotlink. Ảnh navy gốc được chỉnh một lần để tách nền, sau đó làm hai biến thể từ chính ảnh này. Prompt đầy đủ, tên PNG nguồn và asset tiêu thụ: `../../design/IMAGE-PROMPTS.md`. PNG nguồn giữ trong Codex generated_images; WebP chọn cuối đã lưu trong workspace. FFmpeg chỉ chuyển định dạng, giữ1024×1536 và alpha; không đổi màu/cắt/vẽ ảnh bằng mã.

| File | Byte | Kích thước | Alpha |
|---|---:|---|---|
| quantum-adg.webp |165038|1024×1536|RGBA, min0/max254, góc0|
| onyx-gmt.webp |132748|1024×1536|RGBA, min0/max254, góc0|
| solaris-38.webp |159562|1024×1536|RGBA, min0/max254, góc0|

Tất cả là sản phẩm hư cấu, không dùng thương hiệu/ảnh thật từ ảnh tham chiếu. LICENCE.txt giữ nguyên các điều khoản theo rules; câu mô tả SVG thuộc phiên bản cũ được giải thích trong README. Phạm vi cấp quyền sử dụng thương mại ảnh mới cần chủ sản phẩm rà soát/cập nhật trước phát hành bán hàng; không tự thay điều khoản cấp phép. Không chặn bản dựng/preview trong phạm vi hiện tại.

## Bản giao và cơ chế ảnh

ZIP **474046byte**, SHA-256 **bf6b637cbfb72650fd5dc839704beec71926fe351df278d3e5909c6dbe22c717**. `dong-goi.mjs watchroom --ngoai-le` đọc lại chín file và so từng byte với source. `check-template.mjs watchroom --version 1.1.0 --ngoai-le` giải nén bản ZIP và kiểm tra HTTP/file.

Hero có ba img tải eager cùng frame2:3, chỉ một ảnh `.is-active` có visibility visible và aria-hidden=false. Carousel đổi ảnh đã tải sẵn ở midpoint cùng tên, giá và CTA; không còn thay SVG gradients/kim giây. Parallax và intro hữu hạn áp dụng trên wrapper ảnh; card dùng cùng WebP với object-fit contain, khung280px desktop/220px tablet/290px phone. Tắt JS giữ ảnh đầu và các card/mailto. Mất ảnh vẫn giữ tên/giá/CTA.

## Kiểm tra và bằng chứng

Windows, Node24.15.0, Playwright headless. Chromium153.0.8010.12, Firefox155.0, Edge cài thật154.0.4258.62, Cốc Cốc cài thật152.0.7977.124. Không gọi automation là kiểm tra cảm ứng vật lý.

- `checks.json`: gói ZIP hiện tại, Chromium/Firefox, bốn khổ, focus/landmark/SVG icon, tương phản CSS/pixel, axe, zoom200%, file://, khôngJS/font/offline và lỗi console/network.
- `motion.json`: Chromium/Edge/Cốc Cốc, frame850ms, wrap hai chiều, bấm nhanh, Desired/dialog/Escape, search/empty, Women, pause/reload. Có prefers-reduced-motion và cờ motion off cũ.
- `images.json`: tải/giải mã ảnh1024×1536, active image đúng tên và một ảnh visible giữa chuyển cảnh; bốn khổ; trạng thái thiếu ảnh có tên/CTA.
- `screenshots/photos-*-*.png`: ảnh toàn trang trên các engine; đã xem trực quan desktop Chromium và bản mobile in-app. `hero-photos.png`: ảnh preview hero.
- `design/IMAGE-PROMPTS.md`: nguồn và prompt.

Lệnh: đóng gói/check-template như trên; `node --check source/assets/js/main.js`; `reviews/1.1.0/check-motion.mjs`; `reviews/1.1.0/check-images.mjs`; `anh-preview.mjs watchroom`. Script ảnh đã được sửa thứ tự đặt PLAYWRIGHT_BROWSERS_PATH trước dynamic import sau một lần lỗi đường dẫn Firefox; không cài thêm browser.

## Q01–Q13

| Mục | Trạng thái | Phạm vi |
|---|---|---|
| Q01 |PASS theo ngoại lệ|Chín file, tài sản ảnh được yêu cầu rõ; không file dư/ẩn.|
| Q02 |PASS|1440×900,820×1180,375×812,320×740; không tràn ngang ở trạng thái ổn định; card ảnh không che chữ.|
| Q03 |PASS|Carousel hai chiều/wrap, pause, filters, search, local shortlist/dialog. Hai cảnh báo thiếu nav-toggle của script là giả định không áp dụng: ba nav link luôn hiện và bấm được ở320px.|
| Q04 |PASS trong automation|Skip link vào main, focus visible; dialog Escape trả focus. Chưa thử cảmứng vật lý.|
| Q05 |PASS|Một h1, landmark, ID không trùng, ảnh có alt; icon SVG còn viewBox/focusable; axe không violation.|
| Q06 |PASS|Công cụ CSS/pixel; chữ nằm ngoài ảnh; đã xem ảnh render.|
| Q07 |PASS trong automation|file://, offline, khôngJS/font, zoom200%; chuyển động mặc định bật theo ngoại lệ.|
| Q08 |PASS|Không lỗi pageerror/tài nguyên với ảnh có đủ.|
| Q09 |PASS trong phạm vi|Frame hữu hạn và hủy thao tác cũ; ảnh <166KB; không benchmark/Lighthouse.|
| Q10 |NOT TESTED cho phát hành ảnh|Tài liệu đã cập nhật/đếm lại, 10 bước, 12 prompt; LICENCE không tự sửa. Chủ sản phẩm còn rà phạm vi quyền thương mại ảnh.|
| Q11 |PASS|ZIP giải nén/so byte, HTTP/file từ chính bản giao.|
| Q12 |N/A|Đã sync demo/preview nhưng không catalog/deploy/checkout.|
| Q13 |PASS|Đã xem bố cục/ảnh mới; lựa chọn navy–peach, orbit và rail giữ nguyên.|

D01–D04,D06–D08 giữ PASS như1.0.0: ngành/CTA rõ, layout riêng, section có mục đích, palette nhất quán, nội dung demo và giá khớp. D05 kiểm tra lại với ảnh: không cắt strap/tay hoặc che chữ ở desktop/mobile.

## Kết luận phạm vi

Bản dựng dùng ảnh và gói review hoàn thành. Chưa tuyên bố đạt phát hành bán hàng trên mọi browser. Safari/WebKit, iPhone/Android thật, gửi mail thật và tải sau thanh toán chưa thử. Hồ sơ1.0.0 và ảnh SVG QA cũ được giữ để không làm lệch lịch sử bằng chứng.

