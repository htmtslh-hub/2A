# Crimson Folio 1.0.1

Ngày 05/10/2026. WEB-STATIC-1 v1.2 + rules motion 05/10/2026.
Kết quả: bản nguồn đã sửa để review hình ảnh. CHƯA ĐẠT điều kiện phát hành
gói thương mại: chưa duyệt ngoại lệ dung lượng, chưa chốt quyền ảnh/chủ sở hữu,
chưa chạy Firefox. Demo riêng được người dùng yêu cầu deploy.

## Phạm vi và hình ảnh

Sửa source/index.html, assets/css/style.css, README.md và CUSTOMISE.md.
Giữ nguyên JS menu/reveal và byte của hai WebP do người dùng cung cấp.
Hero chân dung chồng Portfolio và GN; panel vuông, khe 12px; about/process
hai cột desktop; bốn concept 2x2; contact đỏ hồng với ảnh tròn và QR.
Mobile xếp section dọc để giữ thân bài 16px; không thu cả trang thành ảnh nhỏ.
Hai nhóm ảnh dự án là concept SVG/HTML tự dựng, không phải dự án khách hàng.
Không khẳng định tỷ lệ giống mẫu bằng phần trăm. Đã nhìn ảnh desktop/mobile.
Tư thế, mái tóc và nét mặt vẫn phụ thuộc ảnh hiện có, không tái tạo nhân vật mới.

## Môi trường và bằng chứng

Windows, Node 24.18.0, Playwright runtime cục bộ; headless file://.
Chrome 154.0.8037.93, Edge 154.0.4258.53, Cốc Cốc 152.0.7977.124.
1440x900, 820x1180, 375x812, 320x740. check.cjs và checks.json ghi bằng
chứng; screenshots/ có fullpage, menu và no-JS mỗi browser/mỗi khổ.
audit.cjs/audit.json: axe WCAG 2 A/AA + 2.1 AA không báo violation ở bốn khổ.
Đây là kiểm tra tự động, không phải chứng nhận trợ năng.
Ảnh trước sửa và bản sao source/ZIP giữ trong before-source/ và
before-crimson-folio.zip; không đưa các bản sao hoặc tooling vào Git.

## Q01-Q13

- Q01 PASS theo ngoại lệ ảnh W01/W03 của yêu cầu: 6 core files + 2 WebP;
  source không có thư viện, API, secret hay phụ thuộc mạng.
- Q02 PASS: scrollWidth/clientWidth bằng 1440/820/375/320, cả menu mở và
  no-JS. Portfolio không bị cắt ở 19 khổ kiểm thêm quanh breakpoint.
- Q03 PASS: mở/đóng menu, Escape, click anchor, resize qua 650px và
  sáu click liên tiếp; không có nút mô phỏng gửi form.
- Q04 PASS trong phạm vi đã thử: Tab tới skip link, Enter đưa focus main;
  menu Tab/Shift+Tab, Escape trả focus toggle; menu ẩn không nhận Tab.
- Q05 PASS tự động và đọc cấu trúc: 1 h1, landmark đầy đủ, không ID trùng,
  anchor tồn tại, điều khiển có tên, artwork có nhãn/aria-hidden.
- Q06 PASS trong các khổ đã đo: axe không báo lỗi tương phản; pixel nền
  dưới khối chữ hero cream đạt tối thiểu 5.87:1, vượt ngưỡng chữ lớn 3:1.
  Copy dùng nền surface, headings intro có cùng nền, không đè lên cánh hoa
  sáng. Portfolio đen là artwork trang trí, không phải heading ngữ nghĩa.
- Q07 PASS có giới hạn: offline/no-JS bốn khổ trên ba browser; mất ảnh ở
  320 vẫn có menu/copy/email và không overflow; font hệ thống không tải mạng.
  200% reflow giả lập bằng viewport 720 CSS px, chưa thử nút zoom browser thật.
  Motion mặc định bật dưới reduce/no-preference và trạng thái off cũ, kết
  thúc opacity 1/transform none sau reveal hữu hạn 550ms. Không có carousel,
  nên kiểm wrap hai chiều không áp dụng.
- Q08 NOT TESTED đối với điều kiện phát hành Firefox/Safari/thiết bị thật.
  Chrome/Edge/Cốc Cốc PASS theo checks.json; không suy ra mọi browser.
- Q09 PASS cho source: console/pageerror 0, ba lần sử dụng ảnh đều tải.
  Giữ byte ảnh gốc, không vòng lặp motion vô hạn, không request nền.
- Q10 FAIL điều kiện thương mại: đủ 10 bước/12 prompt và số đếm đã đồng bộ,
  hướng dẫn QR/crop/illustration phản ánh bản mới; hệ thống font không tải file.
  LICENCE chủ sở hữu và quyền ảnh còn pending, không tự sửa điều khoản.
  Chưa thử hướng dẫn với AI độc lập.
- Q11 FAIL điều kiện gói cuối: dong-goi.mjs crimson-folio từ chối 2 ảnh ngoài
  sáu file. Không dùng --ngoai-le khi ngoại lệ W06 chưa được chấp nhận.
  ZIP 1.0.0 cũ 91,273 byte/hash
  5d1e8c97aac846139f4d3d1a321f3dd85588ee4df1740a095c942703fd8f31e2;
  không phải bản 1.0.1 và không được đưa thành file tải cho bản mới.
- Q12 N/A cho luồng mua/tải: chưa đưa Crimson Folio vào catalog để bán.
  Người dùng yêu cầu demo online; kết quả deploy sẽ ghi riêng sau xác minh.
- Q13 PASS cho hướng sửa hình ảnh trong phạm vi: D01-D08 bên dưới.

Checker chuẩn check-template.mjs không chạy được vì thiếu
D:/2A/_design/.tooling/node_modules/playwright/index.mjs.
Không sửa công cụ chung hoặc tuyên bố checker chuẩn PASS.

## D01-D08

- D01 PASS: independent designer, UX/UI/WEB, web & identity, CTA selected work.
- D02 PASS: typography serif khổng lồ + portrait chồng lớp; panel vuông/khe
  hẹp và bộ concept riêng thay các ô màu trống.
- D03 PASS: hero định vị, about năng lực, process cách hợp tác, work concept,
  contact hành động email; không thêm section lặp.
- D04 PASS: token đầu CSS, hai font hệ thống, body 16/caption 14; chữ nhỏ trong
  artwork được bao trong role img/aria-hidden, không là UI để thao tác.
- D05 PASS các khổ đã xem: không overflow, font Portfolio theo breakpoint,
  mobile avatar không chồng copy, chữ hero tránh vùng da mặt sáng.
- D06 PASS: tiếng Anh cụ thể, project cinema không còn caption furniture.
- D07 PASS: README/LICENCE công khai nhân vật và project hư cấu; không testimonial,
  số liệu khách hàng, social URL giả hay countdown giả.
- D08 PASS: Mira Arden nhất quán; email demo và hai QR có cùng địa chỉ.

## Tương tác

Brand/skip/back to top -> #main; nav -> #work/#about/#contact; hero CTA -> #work;
about CTA -> #contact. Email -> mailto:hello@example.com.
Hai QR/link -> mailto:hello@example.com?subject=New%20project và
mailto:hello@example.com?subject=Design%20brief.
qrcode Python 8.2 sinh QR tại build time, OpenCV đọc được đúng đích.
Người mua phải thay mailbox và tạo lại QR, không chỉ đổi href.
Mockup website bên trong dự án là artwork tĩnh; không có thao tác giả.

## Deploy và Git

Yêu cầu mới nhất cho phép push GitHub, deploy rồi tắt máy.
Đã fast-forward master từ efee5b4 lên origin/master 0caa25e để giữ thay đổi
Soniq/Mellow Coffee. Chỉ bổ sung Crimson Folio source, report và public demo.
Không sửa catalog, config Next, backend hay sản phẩm khác.
Vercel CLI lúc đầu đăng xuất; phiên device login được yêu cầu qua trình duyệt.
Chưa xác nhận deploy trong báo cáo này; xem deployment-checks.json khi có.
