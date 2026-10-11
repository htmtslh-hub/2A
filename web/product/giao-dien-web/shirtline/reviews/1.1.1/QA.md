# Shirtline 1.1.1 — thu nhỏ áo phía sau

07/10/2026. Phạm vi: công thức scale trong source/assets/js/main.js, hướng dẫn CUSTOMISE, demo/preview/ZIP Shirtline. Các quy tắc và ngoại lệ của 1.1.0 tiếp tục áp dụng; không nghiệm thu lại toàn bộ sản phẩm.

Đổi `.22 + .78 * depth³` thành `.12 + .88 * depth⁵`. Áo chính vẫn scale 1, hai áo bên cạnh scale 0.225696 (trước khoảng 0.439), hai áo phía sau 0.120007 (trước khoảng 0.221). Quỹ đạo, tốc độ, theme và preview giữ nguyên.

PASS: node --check; Edge headless qua HTTP localhost:4372 đo đủ năm transform; next sang 02; scrollWidth 320 tại viewport 320; nhìn ảnh 1396×1048 trong design/preview-orbit-small.png. Chỉ chạy lại phần bị ảnh hưởng; không tuyên bố lần sửa này đã thử lại Cốc Cốc hoặc toàn bộ checklist. Hồ sơ 1.1.0 giữ nguyên bằng chứng cũ.

Demo đã đồng bộ JS/CUSTOMISE, preview tạo từ source demo tương ứng. Đóng gói đọc lại 15 file khớp byte source. ZIP 510330 byte, SHA-256 `51337471c6108ff99014649c6612d6fdabcee2264fe90324798040df13413213`.
