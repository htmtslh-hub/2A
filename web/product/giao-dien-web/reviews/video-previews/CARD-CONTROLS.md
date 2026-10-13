# Bỏ nút preview trên thẻ — 13/10/2026

Chủ sản phẩm yêu cầu bỏ nút pause trong ảnh khỏi các thẻ. VideoPreview chỉ render playback actions khi `controls=true` (preview chính trang chi tiết); thẻ trang chủ/thư viện/liên quan dùng `controls=false`, không có nút hoặc portal playback. Autoplay/loop, offscreen cleanup, nút lưu/giỏ và link thẻ giữ nguyên. Không đổi MP4, source/demo/ZIP thương mại.

Build/prebuild 27 recordings PASS. `card-controls-local.json`: Chromium/Firefox/Edge thật/Cốc Cốc thật, OS reduced-motion, kiểm thư viện không còn playback actions, nhiều thẻ tự phát, offscreen lazy/pause, trang chi tiết vẫn phát/dừng ở 1440/820/375/320px, không overflow/pageerror; loop Chromium PASS. Các báo cáo autoplay cũ có thao tác pause trên thẻ chỉ mô tả bản trước; script check-autoplay đã đổi theo yêu cầu mới.

Online: `card-controls-online.json`, Chromium 153.0.8010.12 PASS: không còn playback actions trên thẻ, autoplay nhiều thẻ/offscreen/loop, điều khiển trang chi tiết ở bốn khổ vẫn hoạt động, không overflow/pageerror. Firefox/Edge/Cốc Cốc được thử local như trên; Safari/điện thoại vật lý không thử.

Runtime commit `c889b14` đã push/deploy; Vercel READY `dpl_AmjLh8nxM9iaLGasPDpqohRMvLL4`, alias `https://forgezone.store`. Hồ sơ bổ sung sau deploy không đổi runtime.
