# Crimson Folio 1.0.2

Ngày 06/10/2026. WEB-STATIC-1 v1.2 và rules motion 05/10/2026.
Trạng thái: nguồn/gói PASS theo ngoại lệ ảnh và dung lượng đã duyệt;
nghiệm thu thương mại đầy đủ CHỜ KIỂM TRA Q12 tải với tài khoản có quyền.
Push/deploy thuộc yêu cầu người dùng; trạng thái online ghi sau xác minh.

## Ngoại lệ được duyệt

Ngày 06/10/2026, chủ sản phẩm chọn “Duyệt ngoại lệ riêng cho Crimson Folio”
cho gói tám file, tối đa 128 KiB; trả lời “Văn Triển” trong câu hỏi chủ sở hữu
và điều khoản ảnh. W01/W03: sáu file chính và hai WebP đã cung cấp.
W06: ngưỡng riêng <131072 byte. Không đổi quy chuẩn dùng chung.
LICENCE áp dụng điều khoản đã nêu trong câu hỏi: dùng/chỉnh sửa ảnh trong
website cá nhân/khách hàng, không bán lại ảnh như tài sản riêng.

## Gói cuối

crimson-folio.zip: 92799 byte, tám file, đọc lại khớp source.
SHA-256: 01ce707948864c432e438691b049465ce69e6067418e772e83a82a670bb59267.
mira-portrait.webp: 46942 byte; mira-avatar.webp: 22936 byte.
Giữ nguyên byte ảnh gốc. Không font mạng, API, secret hoặc thư viện JS.
Gói cũ lưu ở ../1.0.1/before-crimson-folio.zip, không giao cho khách.
Chuẩn hóa LF cho sáu file nguồn và .gitattributes riêng để Git trên Windows
không thay byte source sau khi clone, gây lệch so với ZIP đã nghiệm thu.

## Kiểm tra Q01–Q13

- Q01 PASS theo ngoại lệ W01/W03: sáu file chính và hai WebP.
- Q02 PASS: Chromium/Firefox 1440×900, 820×1180, 375×812, 320×740;
  scrollWidth bằng clientWidth, vùng chạm không có mục dưới 44px.
  Cửa hàng kiểm thêm khung ảnh/thẻ/chữ, sửa cột bị cắt ở 320px.
- Q03 PASS: liên kết có đích, menu mở/đóng, Escape, chọn link, resize.
- Q04 PASS: skip link, Tab/Shift+Tab, menu ẩn bỏ khỏi Tab, focus quay về toggle.
- Q05 PASS: một h1, landmark, heading/ID/SVG đúng; axe không có violation.
  Đã bổ sung aria-hidden trực tiếp cho 19 SVG vốn nằm trong artwork ẩn.
- Q06 PASS: chữ thường tối thiểu 6.56:1; viền focus 3px, 8.74:1.
  GN dùng màu cream với fill trong suốt và nét viền cùng màu; không đổi hình.
  Bằng chứng pixel hero từ 1.0.1 tối thiểu 5.87:1; đã nhìn ảnh bản cuối.
- Q07 PASS trong phạm vi checker: file://, HTTP, offline, không JS,
  font hệ thống, reflow 720 CSS px/mật độ 2×. Đây là giả lập 200% reflow,
  không phải thao tác nút zoom browser thật. Motion theo rules mới, hữu hạn.
- Q08 PASS tối thiểu: Chromium 151.0.7922.34, Firefox 153.0, Windows.
  Firefox 155 gặp lỗi khởi động; chuyển tooling cô lập sang Playwright 1.62.
  Edge 154.0.4258.53 và Cốc Cốc 152.0.7977.124 kiểm riêng qua HTTP.
  Không tuyên bố đã kiểm Safari hay thiết bị vật lý.
- Q09 PASS: source không lỗi console/network, không vòng lặp reveal vô hạn;
  ZIP dưới ngưỡng được duyệt, tài nguyên HTTP khớp byte nguồn public.
- Q10 PASS: 10 bước, 12 prompt không còn ô kỹ thuật bắt khách tự điền;
  edit map đếm literal đúng, quyền ảnh/chủ sở hữu đã điền; không font tải về.
  Chưa thử prompt với AI độc lập, không tuyên bố đã thử.
- Q11 PASS: gói giải nén khớp source; mở file:// và HTTP qua checker chuẩn.
- Q12 NOT TESTED cho luồng mua/tải với tài khoản có quyền. Các phần đã PASS:
  t13/portfolio; copy/guide vi/en/zh; 13 thẻ trang chủ/thư viện; mở bằng phím;
  demo đúng 1.0.2; preview 698×524; giỏ lưu t13; anonymous download trả 401;
  Next file trace có crimson-folio.zip. ZIP ngoài public và được upload cho
  /api/download sau khi bỏ đúng một dòng loại gói này khỏi .vercelignore.
  Không tạo giao dịch, quyền mua hoặc sửa database để giả lập PASS.
  Local thiếu AUTH_SECRET/DATABASE_URL: kiểm UI được, backend tài khoản
  local chưa cấu hình; không suy ra từ 401 rằng xác thực local đã hoàn chỉnh.
- Q13 PASS theo D01–D08 dưới đây và ảnh chụp đã xem.

Lệnh chuẩn: node web/product/giao-dien-web/tools/dong-goi.mjs crimson-folio --ngoai-le.
node web/product/giao-dien-web/tools/check-template.mjs crimson-folio --version 1.0.2 --ngoai-le --out final.
Kết quả cuối final/checks.json: failures=[], axe=[], console=[], network=[].
checks.json ở cấp này giữ lần đầu có lỗi SVG/đo màu chữ viền; không phải bản cuối.
store-local.json, demo-local.json và screenshots/ ghi kiểm riêng cửa hàng/motion.

## Thiết kế D01–D08

- D01 PASS: định vị independent designer, UX/UI/WEB, CTA selected work/email.
- D02 PASS: serif Portfolio cực lớn và chân dung chồng chữ; panel vuông,
  bốn concept riêng thay ô trống, giữ hướng ảnh tham chiếu.
- D03 PASS: hero định vị, about năng lực, process hợp tác, work concept,
  contact email; mỗi section có mục tiêu riêng.
- D04 PASS: token chung, hai stack hệ thống; body 16px, caption 14px;
  chữ nhỏ thuộc artwork tĩnh đã được ẩn khỏi cây trợ năng.
- D05 PASS: đã xem desktop/mobile; bốn khổ không tràn/cắt chữ source.
  Cột detail cửa hàng 320px sửa riêng qua CSS nhận diện preview Crimson.
- D06 PASS: nội dung tiếng Anh cụ thể, bốn concept phù hợp mô tả.
- D07 PASS: Mira Arden/dự án hư cấu công khai trong tài liệu; không lời chứng,
  URL social, số liệu hay countdown giả. Bỏ nhãn Hot kế thừa từ ô t13 cũ.
- D08 PASS: tên/email/QR/caption thống nhất; thông số detail riêng khớp gói.

## Tương tác và phạm vi

Brand/skip/back to top → #main; navigation → #work/#about/#contact;
hero CTA → #work; about CTA → #contact; email → mailto:hello@example.com.
Hai QR → cùng email với subject New project/Design brief. QR/path không đổi
so với bản đã được OpenCV quét ở 1.0.1; khách phải tái tạo QR khi đổi email.
Reveal RAF 550ms; kiểm midframe dưới reduce và trạng thái off cũ trên Edge/Cốc Cốc.

Chỉ sửa Crimson, preview/demo, catalog/guide và phần dùng chung cần tích hợp:
optional badge/specs trong real-templates/view (mẫu cũ dùng fallback cũ),
CSS khổ <360px cho grid chứa Crimson, .vercelignore cho ZIP Crimson.
Đối chiếu dữ liệu: toàn bộ 12 catalog records trước đó giữ nguyên; chỉ thêm t13.
Build/TypeScript thành công. npm ci báo 13 lỗ hổng dependency có sẵn;
không nâng dependency ứng dụng ngoài phạm vi. Không phải chứng nhận bảo mật.
