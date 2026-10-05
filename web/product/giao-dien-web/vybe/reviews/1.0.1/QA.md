# VYBE 1.0.1 — sửa preference/cache
05/10/2026. Chủ sản phẩm báo Cốc Cốc đổi áo ngay không có animation.

Kiểm tra bản cũ bằng executable Cốc Cốc 152.0.7977.124 headless, hồ sơ test độc lập (không truy cập profile người dùng): animation hoạt động khi enabled. Chưa xác định cài đặt trong profile thực tế người dùng.

Đã sửa: URL motion=on/off lưu lựa chọn; OS change không ghi đè explicit choice; version CSS/JS URL 1.0.1; Cache-Control no-store và X-Vybe-Version cho demo trên hosting. Không ép chuyển động với người dùng chưa chọn và có prefers-reduced-motion.

local-motion-checks.json: default reduce = off; opt-in = on; 2 animations giữa frame; bỏ query còn enabled; OS change không tắt; pause giữa lượt = 0; reload giữ pause; wrap 01→05→01; console 0. ESLint file thay đổi và TypeScript PASS.

ZIP 747441 byte; SHA-256 `057c5b9ce115c41e0bf1f373153850660853e8f64968fdc64ba4d5f6202663ee`. Script đóng gói kiểm từng byte với source. Kế thừa QA layout và exception 1.0.0; phần hình ảnh/layout không đổi. Nguồn, chức năng giỏ demo và giới hạn quyền/production download theo hồ sơ trước.

Production dpl_E759SG4Ax5GazU1awnToVo7s4Sba READY, alias forgezone.store. online-motion-checks.json: Cốc Cốc 152 headless PASS các ca reduce/URL/saved preference/pause/wrap, console 0. Header X-Vybe-Version 1.0.1; Cache-Control no-store; JS v=1.0.1. Chưa truy cập profile Cốc Cốc thực của chủ sản phẩm.

