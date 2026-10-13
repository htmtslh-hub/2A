# Autoplay preview — 13/10/2026

Yêu cầu chủ sản phẩm: “anh muốn không cần hover mà tự chạy luôn được không?”. Thay chính sách hover/single-active trước đó bằng tự phát không tiếng cho các khung đang nhìn thấy trên trang chủ/thư viện/chi tiết/liên quan, cả desktop và điện thoại. Video native lặp; có pause/play ngoài link thẻ. Không thêm vòng lặp JS/RAF. Offscreen hoặc hidden tab dừng; hover không hủy lựa chọn pause. Lần mở mới mặc định chạy. Browser chặn play vẫn có nút phát và poster.

Phạm vi thay đổi: VideoPreview, web/AGENTS và quy trình preview/instruction. Giữ nguyên 27 MP4, manifest, poster, demo, source/ZIP thương mại, giá, giỏ/lưu và dữ liệu mua. Các hồ sơ cũ mô tả bản hover, không dùng làm bằng chứng autoplay.

Local: `autoplay-checks.json`, production build localhost:4354. Chromium 153.0.8010.12, Firefox 155.0, Edge thật 155.0.4283.45, Cốc Cốc thật 152.0.7977.124, Windows/OS reduced-motion. Mỗi browser đo nhiều thẻ tự phát cùng lúc không cần hover, clip ngoài màn hình chưa có src, pause không bị hover bật lại, play thủ công, offscreen pause và detail autoplay ở 1440×900/820×1180/375×812/320×740. Không overflow/pageerror. Chromium còn kiểm loop bằng seek gần cuối và đo currentTime về đầu trong trạng thái đang phát.

Build/prebuild 27 recordings và lint VideoPreview PASS. Không quay lại video vì bản demo không đổi. Không thử Safari hoặc điện thoại vật lý; autoplay đã thử ở khổ phone trong các browser trên.

Online: `autoplay-online.json` tại forgezone.store PASS trên cả bốn browser, cùng phạm vi/viewport như local; mặc định bốn thẻ đang nhìn thấy cùng phát và 22 thẻ ngoài màn hình chưa có src. Nút pause/play, offscreen, không tràn ngang/pageerror và loop Chromium đều PASS.

Commit runtime `2d98718`, đã push/deploy. Vercel production READY `dpl_GBJnQdP1A5veVkpCAsrWxSruTKM5`, deployment `https://web-77pogb6us-htmtslh-hubs-projects.vercel.app`, alias `https://forgezone.store`. Prebuild/typecheck/build hosted PASS. Báo cáo bổ sung sau deploy không đổi runtime.

Trạng thái: local và online PASS cho autoplay. Hồ sơ/quy trình đã đổi sang tự phát theo viewport.
