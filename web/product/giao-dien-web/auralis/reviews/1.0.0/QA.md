# Auralis 1.0.0 — QA và bàn giao

Ngày: 04/10/2026, Asia/Bangkok. Chuẩn WEB-STATIC-1 v1.2 với ngoại lệ theo yêu cầu trực tiếp về ảnh tự tạo và scroll animation. Không gắn nhãn sáu file dưới 20 KiB.

## Gói và ngoại lệ

- ZIP `auralis.zip`: **103.316 byte**, SHA-256 `df4c00dc69ac1e08c80822652a801ff8c3e49120d7d22e5b6abaff394edbe9af`.
- Bảy file: index.html, assets/css/style.css, assets/js/main.js, assets/images/earbuds.webp, README.md, CUSTOMISE.md, LICENCE.txt. Script đóng gói đọc lại từng file so khớp source; checker chạy từ ZIP giải nén.
- W01/W03/W06: ảnh WebP cục bộ **86.356 byte**, bảy file và ZIP vượt 20.480 byte. W05: thêm story ghim, biến đổi ảnh theo cuộn và ba chặng nội dung theo yêu cầu người dùng. Không sửa quy chuẩn chung.
- Ảnh tạo bằng built-in imagegen, đã xem và chuyển WebP bằng ffmpeg; không dùng video tham chiếu hoặc ảnh thương hiệu khác. Prompt: hai tai nghe không dây pearl/violet, viền kim loại ấm, bố cục chéo nổi, hình nguyên vẹn, nền trong suốt, không logo/hộp sạc. PNG gốc ở `_design/headphone-reference/earbuds.png`.
- Dùng chính sách thương mại đã có trong LICENCE của mẫu trước, chỉ cập nhật mô tả nội dung demo cho sản phẩm mới. Không tải font ngoài.

## Q01–Q13

| Mã | Kết quả | Bằng chứng / giới hạn |
|---|---|---|
| Q01 | PASS theo ngoại lệ | Bảy file, không framework/library/CDN/backend/secret. |
| Q02 | PASS | Chromium 153.0.8010.12 và Firefox 155.0: 1440×900, 820×1180, 375×812, 320×740; scrollWidth bằng clientWidth, không vùng chạm nhỏ theo checker. |
| Q03 | PASS | Fragment đúng đích; menu mở/đóng, Escape, chọn link và resize; CTA email minh bạch. |
| Q04 | PASS | Skip link, Tab/Shift+Tab, menu ẩn không nhận Tab, Escape trả focus. |
| Q05 | PASS nội bộ | Một h1, đủ landmark, ID không trùng, heading không nhảy; axe không violations ở hai browser. Không tuyên bố chứng nhận trợ năng. |
| Q06 | PASS nội bộ | 20 cặp màu được checker đo; không lỗi thường/hover. Viền focus 3px, 8,27:1. Đã xem chữ trên nền sáng/gradient trong ảnh hero và story. |
| Q07 | PASS trong phạm vi | Reduced motion không animation và hiện nội dung; no-JS/menu visible, offline file://; reflow 720×450 với density 2, không tràn. Không thử thao tác zoom bằng UI browser riêng. |
| Q08 | PASS trong phạm vi | Chromium/Firefox Windows, HTTP và file://. Safari, Edge, điện thoại vật lý NOT TESTED. |
| Q09 | PASS | Console/network rỗng; ảnh cục bộ; không animation tự chạy sau 5s. Motion dùng transform và một requestAnimationFrame theo đợt cuộn, không vòng lặp vô hạn. |
| Q10 | PASS | CUSTOMISE có 10 bước, 12 prompt, edit map khớp literal count; README nói rõ dữ liệu giả và giới hạn. Font mạng N/A. |
| Q11 | PASS | ZIP đã giải nén, khớp byte source, file:// và offline đã chạy. |
| Q12 | PASS hiển thị; NOT TESTED mua thực | t9/auralis hiện online, demo và bảy tài sản trả 200; unauthenticated download trả 401; ZIP xuất hiện trong trace của route tải. Chưa thanh toán thật hoặc tải bằng tài khoản sở hữu. |
| Q13 | PASS | Xem hero desktop/mobile, toàn trang desktop/820/320 và các chặng story sau khi transition dừng; kiểm chứng dưới đây. |

## Kiểm tra motion trực tiếp

`motion-checks.json`: desktop scroll 0/0,4/0,8 đổi đúng ba tiêu đề và transform từ −8° tới 11,2°, scale 1 tới 1,096. `responsive-motion.json`: ba chặng ở 820×1180, 375×812 và 320×740 đều chỉ có **một chapter visible**, khối nội dung/ảnh nằm trong chiều cao viewport. Ảnh riêng tại `final/screenshots/motion-*`. Screenshot toàn trang có thể ghi khoảnh khắc crossfade sau cuộn tự động; dùng ảnh từng chặng đã chờ 900ms để đánh giá chữ không chồng ở trạng thái ổn định. Khoảng dài trong screenshot toàn trang là quãng cuộn của sticky story, không phải khoảng trống khi sử dụng.

## D01–D08

- D01 PASS: hero nêu wireless earbuds và CTA khám phá.
- D02 PASS: ảnh nổi trên wash tím/cyan và story giữ khung ba chặng; section thiết kế dùng close-up xoay với notes chia cột.
- D03 PASS: hero giới thiệu, sound mô tả trải nghiệm, design nói về kiểu dáng/fit, specs cung cấp chi tiết, collection có giá demo và CTA.
- D04 PASS: token thống nhất; system sans; một hệ nút 3px; tím là accent xuyên trang.
- D05 PASS trong khổ đã thử: không tràn, nội dung story không cắt ở ba khổ nhỏ đã kiểm; ảnh chuyển động có crop trang trí ở cạnh trái desktop chủ ý.
- D06 PASS: nội dung tiếng Anh cho thương hiệu audio giả định; không lorem ipsum.
- D07 PASS: không reviews/chứng nhận/logo khách thật; claims hardware ghi rõ minh họa.
- D08 PASS: tên, giá $149, 8/32 giờ, driver 11mm đồng nhất; email .example được hướng dẫn thay.

## Tương tác

| Control | Hành vi |
|---|---|
| Logo / Back to top | #top |
| The sound / Discover / Scroll | #sound |
| The design | #design |
| Tech specs / Get into details | #specs |
| Explore EvoBuds | #collection |
| Enquire about EvoBuds | Mở email ứng dụng với subject; .example phải thay trước dùng thật |
| Menu | Expand/collapse, Escape, chọn link, resize |
| Story | Cuộn đổi ảnh/chapter; reduced motion, no JS và chiều cao ngắn dùng bản mở rộng |

## Tích hợp và phát hành

- Ô **t9**, nhóm **shop**, mô tả vi/en/zh, video preview từ chính source, ảnh desktop/tablet/mobile, hướng dẫn riêng; giá mẫu dùng bảng giá chung (1.900.000₫ / $79).
- `npm run typecheck` và `npm run build`: PASS. Local store và production: tên Auralis hiện, không pageerror, demo/CSS/ảnh/previews/video đều 200; xem `store-checks.json` và `production-checks.json`.
- Production deployment **READY**: `dpl_86ETzDehf2E9qeLRmensKCfGyxMc`, alias `https://forgezone.store`, chi tiết `https://forgezone.store/?mau=t9`.
- Demo `https://forgezone.store/demos/auralis/index.html`.
- Giới hạn còn lại: Q12 mua thật/tải có quyền và Safari/Edge/thiết bị vật lý chưa thử. Không thêm backend hay checkout tai nghe.

## File đã thêm/sửa

Thêm thư mục sản phẩm auralis (source, ZIP, reviews), public/demos/auralis và bốn preview assets. Sửa src/lib/real-templates.ts, src/lib/template-guides.ts và tools/sync-demos.mjs. Tài sản tham chiếu/công cụ capture nội bộ ở _design/headphone-reference; không giao trong ZIP. Giữ nguyên các thay đổi của người dùng đã có trước lượt này.
