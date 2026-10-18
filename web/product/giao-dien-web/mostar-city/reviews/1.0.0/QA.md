# Mostar City 1.0.0 — QA ngày 18/10/2026

Trạng thái: mẫu local hoạt động, CHƯA ĐẠT độ trung thực font theo brief vì font remote bị CORS; chưa nghiệm thu phát hành thương mại. Không push/deploy hoặc tích hợp catalog. Quy chuẩn tham chiếu WEB-STATIC-1 v1.2.1 với ngoại lệ 3 file/remote assets/scroll-slider theo prompt mới.

## Môi trường và bằng chứng
Windows, Playwright headless Chromium 153.0.8010.12 và Firefox 155.0 qua HTTP localhost:4388. `checks.json` lưu số đo, phiên bản và request lỗi. 32 ảnh chụp ở các mốc 0/1060/2320/3700 trên 1440×900, 820×1180, 375×812, 320×740. Đã nhìn trực tiếp ảnh chromium-1440-0, chromium-1440-1060, chromium-375-0, chromium-1440-3700. Chưa thử thiết bị thật/Edge/Cốc Cốc/Safari.

| Mục | Trạng thái | Kết quả |
|---|---|---|
| Q01 | PASS theo ngoại lệ | ZIP đúng index.html/styles.css/script.js; không assets cục bộ/framework/build |
| Q02 | PASS phạm vi đã thử | Cả 8 tổ hợp engine/viewport, mỗi tổ hợp 4 mốc: scrollWidth bằng innerWidth, không tràn ngang |
| Q03 | PASS phần cốt lõi | Bridge panel opacity=1 ở 1060; Bazaar=1 ở 2320 (một ảnh Firefox 0.903 do chưa hội tụ); slider visible/controls ready ở 3700; notes dialog mở thật |
| Q04 | NOT TESTED đầy đủ | Có Enter/Space listener và tabindex theo scene; chưa thử hết vòng Tab; card outline:none giữ nguyên brief nên chưa đạt chuẩn focus chung |
| Q05 | PASS phần brief | 1 h1, semantic main/header/nav/sections, nhãn nút/slider, scene alt rỗng; giữ DOM yêu cầu, không thêm footer/skip |
| Q06 | NOT TESTED | Chưa đo tương phản chữ trên ảnh ở mọi frame; mobile intro có vùng nền sáng, không tuyên bố đạt 4.5:1 |
| Q07 | PASS một phần | Reduced motion vẫn scrub, panel opacity=1 và mx=0; font lỗi có Georgia hiển thị. Chưa thử no-JS/offline lạnh/zoom 200% |
| Q08 | PASS phạm vi | Hai engine nêu trên; chưa browser/thiết bị khác |
| Q09 | FAIL font | Không pageerror; 7 scene loaded true ở cả hai engine. Ogg font ERR_FAILED / NS_ERROR_DOM_BAD_URI. Header HTTP 200 có Vary:Origin, không có Access-Control-Allow-Origin trong phản hồi kiểm tra; không sửa nguồn hay tải font về để lách brief |
| Q10 | NOT TESTED thương mại | README/CUSTOMISE có 10 bước, 12 prompt và số đếm literal; chưa xác minh licence ảnh/font. Không tự cấp LICENCE bên thứ ba |
| Q11 | PASS | 3 entry ZIP, đường dẫn /, đọc lại so khớp toàn bộ byte với source |
| Q12 | N/A | Chỉ tạo mẫu; chưa cửa hàng, preview video catalog, download thanh toán |
| Q13 | PASS một phần | Cảnh ghép parallax, serif lớn, zoom/tách cảnh/slider theo brief; font thật chưa tải được |

## Slider và hành vi
Ba bộ clone = 15 thẻ. Bấm next 6 lần trở về active index 6, prev 6 lần về 5 (đã normalize). Bấm next nhanh 35 lần ổn định tại index 5, không vượt range. Hai engine cùng kết quả. Enter/Space chọn thẻ có trong mã, chưa kiểm trực tiếp. Cấu hình CSS transition 640ms; timeout 700ms normalize dự phòng khi transitionend không phát; update scroll/pointer dùng RAF hữu hạn, không loop khi ổn định. Chưa đo frame giữa transition, không khẳng định mọi trình duyệt mượt giống nhau.

Nav map các hash #cinema/#bridge/#bazaar/#routes vào mốc 0/1060/2320/3700; notes mở dialog nội dung tĩnh thật; EN chỉ thông báo bản English, chưa có bản dịch. Dialog Escape dùng hành vi native. Chưa thử đầy đủ hash/back/refresh hoặc toàn bộ bàn phím.

## D01–D08
D01 PASS: giới thiệu điểm đến Mostar và mốc khám phá. D02 PASS: ảnh nhiều lớp/tách đối xứng + timeline scrub. D03 PASS: ba chương và slider có vai trò riêng. D04 FAIL font, CSS số đo/tokens theo brief. D05 PASS phần viewport cơ bản, chưa zoom. D06 PASS nội dung tiếng Anh do prompt cung cấp. D07 PASS không thêm chứng thực/chứng nhận ngoài brief, các dữ kiện lịch sử là nội dung user chưa xác minh độc lập. D08 PASS cùng tên địa danh và nội dung nhất quán.

## Gói và giới hạn
ZIP: mostar-city.zip; 9514 byte; SHA-256 `dc2af5ecddfcb672c3d93677c7d440dc7d83c17b25d8c6cf329ff91a3c2d3ce9`.
Tự đóng bằng zipfile vì dong-goi/check-template của WEB-STATIC-1 bắt buộc cấu trúc sáu file khác brief ba file; không sửa tooling chung. Kiểm riêng Playwright và đọc lại ZIP. Không gọi gói này đạt nguyên chuẩn WEB-STATIC-1. Cần mạng cho ảnh/font. Giữ nguyên toàn bộ URL chỉ định, không local assets.

Chỉ tạo file trong mostar-city/. Không sửa mẫu khác, catalog, DB hoặc cấu hình chung. Các thay đổi có sẵn của workspace được giữ nguyên.
