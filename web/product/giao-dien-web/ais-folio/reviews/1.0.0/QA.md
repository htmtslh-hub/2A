# AIS Folio 1.0.0 — QA

Ngày 14/10/2026, Windows. WEB-STATIC-1 v1.2.1 + ngoại lệ ảnh cục bộ W01/W03/W06 theo yêu cầu tạo ảnh giống reference và đóng gói của chủ sản phẩm. 8 file, không framework, không tracking, không backend. Nhân vật và dự án minh họa, không dùng thông tin người thật làm chứng nhận.

## Bằng chứng

- final/checks.json: bản ZIP giải nén khớp byte source, Chromium 153.0.8010.12 và Firefox 155.0, toàn bộ kiểm tra tự động PASS.
- source-checks.json: 5 viewport 1440×900, 820×1180, 720×1278, 375×812, 320×740 trên Chromium, Firefox, Edge 155.0.4283.45, Cốc Cốc 152.0.7977.124. Không tràn; một h1; menu Escape và details PASS; không lỗi JS.
- motion-checks.json: frame giữa opacity .64–.68 và translateY khoảng 12px, frame cuối opacity 1/transform none; finite RAF, cuộn ngược/resize, OS reduce và trạng thái off cũ; mất ảnh vẫn dùng được.
- store-local.json: 36 view kiểm tra, Việt/Anh/Trung trên Chromium và Firefox; chi tiết 4 viewport, library và hướng dẫn. Anonymous download 401, đường dẫn ZIP trực tiếp 404.
- Preview thật: reviews/video-previews/ais-folio.json; MP4 960×600, 30fps, 14.966667 giây, không audio, 586796 byte, quay hover/cuộn/return. Contact sheet đã xem; không trắng/missing asset. Manifest 33 sản phẩm PASS.
- Typecheck và production build PASS. Download route trace chứa đúng ais-folio.zip.

## Q01–Q13

| Mục | Kết quả | Bằng chứng/phạm vi |
|---|---|---|
| Q01 Cấu trúc | PASS theo ngoại lệ | 6 file chính + 2 WebP; không file dư trong ZIP |
| Q02 Responsive | PASS | Không overflow ở 4 khổ bắt buộc; vùng chạm ≥44px; ảnh đã xem |
| Q03 Tương tác | PASS | Anchor thật; mailto mẫu; menu Escape, resize, link đóng; details thật |
| Q04 Bàn phím | PASS | Skip, Tab/Shift+Tab, focus, menu ẩn bỏ khỏi Tab |
| Q05 Trợ năng | PASS trong kiểm tra nội bộ | Một h1, landmarks, nhãn; axe 0 vi phạm phát hiện |
| Q06 Tương phản | PASS | Minimum đo 5.47 Chromium / 5.49 Firefox; focus trắng; đã xem chữ trên nền nhân vật và panel tối |
| Q07 Dự phòng | PASS | file://, offline, no-JS, font hệ thống, zoom200%, thiếu ảnh; motion default ON theo rules 05/10 |
| Q08 Browser | PASS | Chromium/Firefox/Edge/Cốc Cốc nêu trên; Safari và thiết bị thật NOT TESTED |
| Q09 Kỹ thuật | PASS | Console/network rỗng, không vòng lặp vô hạn, byte/hash thực |
| Q10 Tài liệu | PASS | 10 bước / 12 prompt, literal count chính xác; policy thương mại từ mẫu Laila, không thay quyền bán lại; system fonts không phân phối file font |
| Q11 Gói | PASS | 515770 byte; sourceMatchesExtracted=true |
| Q12 Store | PASS local, online ghi RELEASE.md | t33/ais-folio/portfolio; vi/en/zh; poster, clip, guide, private ZIP; không thử giao dịch thật hoặc tải bằng tài khoản đã mua |
| Q13 Thiết kế | PASS theo brief tương tự | D01–D08 bên dưới; không tuyên bố sao chép pixel hoặc >95% |

ZIP SHA-256: `08edc44c423f3dc554def227f2166d150d2fdceab1ffd0cc50fc15675985f4b5`.

## D01–D08 và hình ảnh

D01: About giới thiệu visual editor, contact email có đích thật. D02: nhân vật anime phủ lên nền lưới và bố cục bảng nổi/toolbar là hai lựa chọn riêng. D03: hồ sơ, kinh nghiệm, tác phẩm, công cụ, liên hệ mỗi phần có mục đích. D04: token màu, 2 stack font, nhịp panel nhất quán. D05: đã xem desktop/mobile, không cắt nội dung; software labels có thể ngắt dòng trong cột hẹp. D06: English persona hư cấu có mô tả cụ thể. D07: không gán khách hàng/credential/claim thật. D08: cùng Ais và email mẫu xuyên suốt. Tất cả PASS trong brief portfolio tương tự.

Khác reference có chủ đích: copy tiếng Anh minh họa, ảnh AI mới cùng chủ thể/màu, cỡ chữ 16px, 6 poster có mô tả mở rộng, email contact rõ ràng và mobile xếp lại. Reference là poster 720×1278; website dài hơn để đọc và chỉnh sửa được. Đây là sản phẩm tương tự theo yêu cầu, không chứng nhận độ giống >95% của chế độ sao chép chính xác ForgeFrame. Không dùng screenshot reference làm nền web.

## Giới hạn

Không kiểm Safari, thiết bị thật, chạy prompt bằng AI khác, mua thật hoặc tải sau thanh toán. Không tạo Purchase/DownloadToken hay sửa quyền để thử. Chính sách giá hiện có giữ nguyên. Ảnh projects.webp 394608 byte vượt mục tiêu 300KB của hồ sơ ảnh đề xuất chưa áp dụng; gói tổng khoảng 504KiB. Quy chuẩn chung không thay đổi.
