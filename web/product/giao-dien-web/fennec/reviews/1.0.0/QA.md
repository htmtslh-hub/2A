# FENNEC 1.0.0 — QA 18/10/2026

Trạng thái: mẫu local, cáo 3D/menu hoạt động; CHƯA ĐẠT video playback trên engine đã thử. Chưa nghiệm thu phát hành thương mại. Quy chuẩn tham chiếu WEB-STATIC-1 v1.2.1, ngoại lệ theo brief một HTML và Three.js/GLB/video.

Bằng chứng: checks.json, narrow-checks.json, ảnh chromium/firefox ở1440×900,820×1180,375×812,320×740 và menu mở. Đã nhìn chromium-1440.png,chromium-320.png,chromium-375-menu.png. Screenshot320 là bản trước sửa narrow; narrow-checks là phép đo bản cuối. Windows; Chromium153.0.8010.12, Firefox155.0 headless qua HTTP4389. Chưa Edge/Cốc Cốc/Safari/điện thoại thật.

| Mục | Trạng thái | Bằng chứng/giới hạn |
|---|---|---|
| Q01 | PASS theo brief | Một index.html trong ZIP; import map r160, CSS/JS inline, no build |
| Q02 | PASS phần đo | Bốn viewport không tràn ngang; phát hiện brand bị cắt320, đã sửa max360. narrow-checks: right304, gap links/brand10.15px, scroll320 ở cả hai engine |
| Q03 | PASS | Menu mở/đóng Escape ở4viewport/2engine; theme aria-pressed true; menu link mở dialog thật |
| Q04 | NOT TESTED đầy đủ | TabIndex âm khi đóng, focus ring, Escape trả burger có trong mã; chưa rà toàn vòng Tab/ShiftTab |
| Q05 | PASS phần brief | 1h1; header/nav/main, nhãn canvas/burger/theme và SVG decorative; không bổ sung footer theo hero brief |
| Q06 | NOT TESTED | Chưa đo tương phản chữ trên mọi frame nền |
| Q07 | PASS một phần | Reduced motion entrance animation:none ở2engine; poster dùng khi clip lỗi. Chưa no-JS/offline/zoom200%/file:// |
| Q08 | PASS phạm vi | Hai engine và viewport như trên; chưa thiết bị/browser khác |
| Q09 | FAIL video | GLB ready ở2engine, canvas opacity1; không pageerror. Video currentTime không tăng, Chromiumready0, Firefoxready1 rồi decode lỗi. ffprobe: codec hevc, Main10,yuv420p10le,1920×1080; HEAD200,8007812byte. Giữ URL chính xác và poster theo brief |
| Q10 | NOT TESTED thương mại | README và brief đúng sản phẩm; chưa licence media/font hoặc bộ hướng dẫn bán hàng hoàn chỉnh |
| Q11 | PASS | ZIP1entry, đọc lại byte khớp source; chưa chạy browser bản giải nén riêng |
| Q12 | N/A | Không catalog/deploy, chưa preview video cửa hàng |
| Q13 | PASS một phần | Cảnh cam, cáo, serif-free Questrial, nav/menu đúng thiết kế; clip nền không phát được trên engine thử |

## D01–D08
D01 PASS theo hero brief, thông điệp automation và CTA begin today ở menu; D02 PASS môi trường3Dấm/menu pill; D03 PASS một hero; D04 PASS font/màu theo prompt; D05 PASS phần layout cơ bản sau narrow fix, chưa zoom; D06 PASS copy prompt + dialog demo rõ ràng; D07 PASS không thêm chứng thực/số liệu bịa; D08 PASS thương hiệu/thông tin demo nhất quán.

## Chuyển động
Mô hình render đã xem qua ảnh; code bob/parallax theo math prompt. Chưa đo frame giữa3Dđể khẳng định biên độ vật lý. Continuous RAF phục vụ bob theo yêu cầu rõ ràng, dừng khi hidden; không có loop scan DOM. Video nền không được báo PASS. Không quảng cáo tương thích HEVC; cần URL H.264 được chủ sản phẩm cấp/cho phép khi muốn sửa nguồn clip cho nhiều browser. Canvas lỗi giữ fallback nền; trường hợp WebGL tắt chưa thử trực tiếp.

## Phạm vi và gói
Chỉ file trong fennec/. Gói 6670byte; SHA-256 `142db3433ce0a4bc5cbae1649cce3c172bf5a8f2e7e92ba04f7c30c50c55c225`. Dùng zipfile thay dong-goi/check-template bắt buộc6file vì brief mới yêu cầu1HTML; không sửa tooling chung. Quyền tài sản chưa xác minh. Chưa push/deploy. Các ảnh screenshot kiểm đầu là bản trước bổ sung narrow fix và focus dialog-close; narrow fix được đo lại bằng test riêng không tải GLB để giảm tải kiểm tra. Chưa chạy lại toàn bộ bộ kiểm vì thay đổi sau chỉ CSS320và trả focus.
