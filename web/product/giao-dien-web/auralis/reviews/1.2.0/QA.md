# Auralis 1.2.0 — scene transition QA

04/10/2026, Asia/Bangkok. WEB-STATIC-1 v1.2 với ngoại lệ W01/W03/W05/W06 theo yêu cầu ảnh tự tạo và animation. Không dùng footage hoặc brand assets Sandhill. Bốn WebP gốc giữ từ 1.1; không phát sinh ảnh mới.

## Nguyên nhân và thay đổi

IAB thật có viewport 414×582, reduced motion bật. Bản 1.1 không bật pinning trong hai điều kiện này. Các kiểm tra trước chỉ chứng minh normal motion ở màn hình cao; không thể suy ra trải nghiệm thực tế người dùng.

Hero 420vh giữ một stage: intro → chi tiết mẫu đang chọn → bộ tai nghe/hộp sạc → AirBuds trắng. Transform/opacity/blur của ảnh và chữ cùng phụ thuộc tiến độ scroll, chạy ngược khi cuộn lên. Background wash cùng timeline. Carousel chỉ nhận focus khi đang dùng được, không còn hiện nút đổi model vô tác dụng ở cảnh kit/AirBuds.

Nút Enable transitions xuất hiện khi reduced motion bật; chọn chủ động thì chạy motion, Pause transitions trả về static. Viewport 420–649 px cao dùng compact layout. Dưới 420 px hoặc phóng chữ lớn dùng static. No JS giữ nội dung và section links. Không timer autoplay hoặc perpetual frame loop; carousel copy dùng timeout 200ms khi thao tác.

## Gói và bằng chứng

ZIP 345.199 byte; SHA-256 `e9ad18b74109faf812e8f97ada6661a15bc612b879d5df982ff77bca045003e8`. Mười file, đủ sáu file chuẩn + bốn WebP; đóng gói đọc lại từng byte và checker chạy trên ZIP giải nén. Source/ZIP/demo/docs/guide/catalog đã đồng bộ. LICENCE giữ nguyên quyền thương mại đã có.

- `final/checks.json`: PASS tất cả kiểm tra bắt buộc, Chromium 153.0.8010.12 và Firefox 155.0.
- `scene-checks.json`, `firefox-motion.json`: PASS sáu viewport 1440×900, 820×1180, 375×812, 320×740, 414×582 với reduced motion và opt-in, 720×450.
- Sáu mốc mỗi viewport: 0 / .30 / .46 / .62 / .81 / .96. Kit opacity khoảng .50 tại .46 và 1 tại .62; AirBuds khoảng .50 tại .81 và 1 tại .96. Transform liên tục; không horizontal overflow hoặc pageerror. Reduced default off, opt-in on, pause off.
- Kiểm tra IAB thực bằng click Enable transitions → Discover → See what's inside → Meet the next sound. Cảnh detail/kit/AirBuds hiện đúng, root motion-ready và motion-opt-in dù media query reduce. Đã xem screenshot thực ở 414×582.
- Đã xem ảnh intro/detail/kit/AirBuds ở desktop, phone, short viewport; các frame đang chuyển cảnh có ảnh/chữ đang rời và đi vào khung. Video public/previews/auralis.mp4 quay từ source, 225 frame / 15fps = 15 giây, bao gồm đổi model và chuyển scene.

## Q01–Q13

| Mã | Kết quả | Phạm vi |
|---|---|---|
| Q01 | PASS theo ngoại lệ | HTML/CSS/JS thuần; bốn ảnh cục bộ, không backend/library/CDN/secret. |
| Q02 | PASS | Bốn khổ chuẩn, thêm hai khổ thấp; không tràn ngang. |
| Q03 | PASS | Navigation/menu/Escape; carousel; scene CTA và cuộn. |
| Q04 | PASS | Skip/focus/keyboard và hidden menu qua checker; panel/controls ẩn dùng inert. |
| Q05 | PASS nội bộ | Axe hai browser không violations; heading/landmark/ID đúng. |
| Q06 | PASS nội bộ | Contrast/focus/hover qua checker; đã xem text trên wash. |
| Q07 | PASS trong phạm vi | Reduced default static + explicit opt-in/pause; no-JS/offline/file/reflow qua checker. Zoom UI thực chưa thử riêng. |
| Q08 | PASS trong phạm vi | Chromium/Firefox và Codex IAB; Safari/Edge/thiết bị vật lý chưa thử. |
| Q09 | PASS | Không console/pageerror/network errors trong kiểm tra; không autoplay loop. |
| Q10 | PASS | 10 bước/12 prompt, edit counts đúng; README/CUSTOMISE 1.2.0. |
| Q11 | PASS | ZIP sourceMatchesExtracted true; hash/byte ở trên. |
| Q12 | PASS hiển thị; giao dịch chưa thử | Production t9 hiển thị Auralis; 11 demo/preview assets HTTP 200, download chưa đăng nhập trả 401, trace include ZIP. Không mua thật hoặc tải bằng quyền đã trả tiền. |
| Q13 | PASS | Xem source screenshots và IAB; preview/video từ cùng source. |

## D01–D08

D01 PASS: hero nêu earbuds/model/benefit. D02 PASS: carousel depth, persistent actor, ba chuyển cảnh nối cùng khung. D03 PASS: scene detail/kit/next có purpose rõ, sound/design/specs/enquiry đầy đủ. D04 PASS: palette/tokens/font/nút đồng bộ. D05 PASS: sáu khổ test có nội dung đọc được ở khoảng dừng. D06 PASS: copy cụ thể, English nhất quán. D07 PASS: brand/hardware/price là concept minh họa, không chứng nhận/review giả. D08 PASS: model copy/detail đồng bộ JS; scene kit/specs/collection dành EvoBuds, AirBuds scene ghi đúng tên.

## Release

`npm run typecheck` và `npm run build`: PASS. ZIP được include trong download route trace. Production deployment **READY** `dpl_DKhZjTU663WQFV39DJoLQ4yLczB6`, alias `https://forgezone.store`. `production-checks.json` không lỗi, video 644.730 byte/15 giây; `production-motion.json` PASS sáu viewport và các mốc giữa chuyển cảnh trên URL công khai. IAB thực cũng đã mở demo production và bật chuyển cảnh, chuyển từ intro sang detail thành công. URL catalog `/?mau=t9`, demo `/demos/auralis/index.html?v=1.2`.

Giới hạn: chưa kiểm tra mua/tải có quyền, Safari/Edge/thiết bị vật lý. Đây là template showcase bán trên Forge Zone; bản tai nghe có email enquiry, không checkout tai nghe.
