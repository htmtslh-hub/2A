# Galaxy Edge 1.2.0 — hover và scroll

Phạm vi được yêu cầu: thêm hiệu ứng hover/scroll riêng mẫu. Ngoại lệ W05 cho parallax theo yêu cầu mới; không thay đổi chuẩn chung.

Thêm underline navigation; cyan hover/focus cho links, arrows; CTA nâng 3px; nút tròn nâng/xoay; preview zoom; border panel sáng; section và article reveal hữu hạn. Hero dịch tối đa55px/scale1.045 desktop,22px mobile. RAF chỉ chạy khi có scroll/resize; không loop idle.

Chromium153.0.8010.12/Firefox155.0 PASS kiểm phần sửa: nền từ identity → scale1.0225/translateY27.5px ở scroll450 → identity khi cuộn ngược; hover CTA translateY−3px; không pageerror; không overflow ở1440/820/375/320. Kiểm khi OS reduced motion vẫn bật theo policy. motion-checks.json có số đo. Đã xem screenshot hover.

Không chạy lại toàn bộ axe/contrast/menu/ZIP browser suite; bản1.1.0 có suite PASS, không gán kết quả đó cho1.2.0. Edge/Cốc Cốc/Safari chưa thử. Candidate ZIP184486byte, SHA-25670d359ad7c3d2f7a5acea67f3a7459519ef94621e993e12a49a1af57ec2ef34d; script đọc lại khớp byte7file. Chưa phát hành thương mại.
