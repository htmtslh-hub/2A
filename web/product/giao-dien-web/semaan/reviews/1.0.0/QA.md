# Semaan 1.0.0 — QA

Ngày 14/10/2026, Windows. Yêu cầu: sản phẩm portfolio mới theo reference, tạo ảnh tương tự, đóng gói và đăng store. Giữ AIS Folio và mọi sản phẩm khác. Hồ sơ WEB-STATIC-1 v1.2.1 với ngoại lệ riêng W01/W03/W06 về 3 ảnh WebP/gói lớn hơn20KB, theo yêu cầu ảnh của chủ sản phẩm trong phiên này; không sửa quy chuẩn chung.

## Bằng chứng và trạng thái

| Mục | Kết quả | Phạm vi/bằng chứng |
|---|---|---|
| Q01 Cấu trúc | PASS theo ngoại lệ | 9 file = 6 file chuẩn + 3 ảnh gốc; không file tạm/phụ thuộc |
| Q02 Responsive | PASS | approved/checks.json, 1440×900/820×1180/375×812/320×740, không overflow, vùng chạm≥44px; đã xem ảnh desktop/mobile |
| Q03 Tương tác | PASS | Anchor thật, menu650px, Escape/trả focus, đóng sau click, resize; native project/service details; email chỉ mở ứng dụng |
| Q04 Bàn phím | PASS | Skip, Tab/Shift+Tab, focus, menu ẩn không nhận Tab |
| Q05 Trợ năng | PASS nội bộ | Một h1, landmark header/nav/main/footer, nhãn/alt; axe không phát hiện vi phạm |
| Q06 Tương phản | PASS | Chữ nhỏ minimum4.88:1, chữ lớn minimum3.77:1 trên Chromium; Firefox4.88/3.78; focus View Work16.37:1, 3px nằm trong nền pill trắng; đã xem chữ trên ảnh/gradient |
| Q07 Dự phòng | PASS | No-JS nav có bố cục riêng không che hero; file://, offline, fallback fonts, zoom200%; thiếu ảnh vẫn có nội dung/liên hệ; OS reduce vẫn chạy finite motion theo rules05/10 |
| Q08 Browser | PASS | Chromium153.0.8010.12, Firefox155.0; source geometry/menu/details và motion thêm Edge155.0.4283.45/Cốc Cốc152.0.7977.124; Safari/thiết bị thật NOT TESTED |
| Q09 Kỹ thuật | PASS | Console/network rỗng, không vòng lặp vô hạn; typecheck/production build PASS; 34 recording manifests/hash PASS |
| Q10 Tài liệu | PASS | 10 bước, 12 prompt, literal counts khớp, không placeholder cần khách tự điền trong prompt; system fonts không phân phối file; policy licence hiện có giữ nguyên |
| Q11 Gói | PASS | 391926 byte; ZIP đọc lại/giải nén khớp byte source; file:// và HTTP đều đã thử |
| Q12 Store | PASS local, online ghi RELEASE.md | store-local.json:36 views/0fail, vi/en/zh, detail4viewport/library/guide; guard401, directZIP404; trace route chứa ZIP; mua thật/tải sau thanh toán NOT TESTED |
| Q13 Thiết kế | PASS theo brief | D01–D08 bên dưới; không claim pixel-perfect hoặc phần trăm độ giống |

ZIP SHA-256: `a12a9a30ef301ce355bdc243ccb12e12ad049971ffb4a720f8e3da3fc05705c4`.

## Thiết kế và review thủ công

D01: CREATE, Designs/Ideas, freelance availability và View Work dẫn tới tác phẩm. D02: hero chia đôi cam/trắng và chân dung chồng vùng; condensed Impact với chữ hẹp là hai lựa chọn riêng. D03: Work, About, Services, Contact trả lời các nhu cầu thật. D04: token thống nhất, Impact/Trebuchet MS với font cài sẵn và fallback. D05: chữ không cắt; mobile xếp các khối, tạo khu trắng phía dưới chân dung; no-JS nav có hàng riêng. D06: English persona có ngành, dịch vụ và concept cụ thể. D07: SAMPLE CLIENT NOTE/Fictional client được hiển thị; không nói avatar là khách thật. D08: cùng Alexis Semaan và email .example, ba study nhất quán. D01–D08 PASS theo brief.

Đã xem hero-final-838.png so với ảnh838×634, approved/screenshots/chromium-1440.png, chromium-375.png và nojs320. Giữ split51.5%, kính vàng, tóc xoăn/áo đen, CREATE, CTA, community row và availability/client-note. Điều chỉnh có chủ đích: typography/caption lớn hơn, quote công khai là mẫu, copy không bịa khách thật, phần Work/About/Services/Contact bổ sung để nav có đích thật. Mobile xếp lại. Không tuyên bố mức giống >95%.

source-checks.json: geometry, img load, h1, menu Escape và project details trên4browser/5viewport. CSS nền được làm tối thêm sau kiểm đầu; approved/checks.json là kiểm đủ Chromium/Firefox trên ZIP cuối. motion-checks.json đo frame giữa opacity/transform và frame cuối1/none, resize/scroll ngược, saved-off+OS reduce và missing-image fallback. JS không đổi sau điều chỉnh nền cuối.

Preview: reviews/video-previews/semaan.json và contact sheet đã xem. MP4 960×600,30fps,14.966667s,520700byte, H.264 không âm thanh. Quay hero/hover/cuộn/return thật, không zoom một ảnh tĩnh. Product specs/guide/catalog đủ vi/en/zh; giữ giá theo policy hiện có.

## Asset và giới hạn

Built-in imagegen, prompt đầy đủ ở image-prompts.json. portrait.webp154826byte (1000×1500 alpha); work.webp195960byte (1440×960,3cột); people.webp25176byte (512×512,2×2). Tất cả dưới300KB; gói dưới1MiB. Source references tương đối, không hotlink/base64/CDN. Điều khoản thương mại giữ policy gốc của AIS Folio/Laila, chỉ cập nhật tên/nội dung mô tả; không thay quyền bán lại hoặc bảo hành.

Không thử Safari/thiết bị thật, prompt qua một AI khác, đơn mua thật hay tải có entitlement. Không sửa DB/tạo token/Purchase để thử. Bằng chứng online và deployment lưu RELEASE.md sau phát hành.
