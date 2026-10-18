# Brief sản phẩm — Chain Warden (`chain-warden`)

```text
Loại sản phẩm: web-template
Hồ sơ: WEB-STATIC-1 (kèm ngoại lệ ảnh cục bộ --ngoai-le và JS tương tác kỹ năng/ngoại trang/dialog)
Phiên bản sản phẩm: 1.0.0
Tên sản phẩm: Chain Warden
Slug: chain-warden
Ngành / tình huống sử dụng: Trang giới thiệu tướng / nhân vật game giả tưởng đen tối (Dark-fantasy Champion Showcase & Interactive Kit Reveal)
Người mua mẫu: Studio game độc lập, đội ngũ phát hành game hành động/MOBA/RPG, nhà thiết kế UI/UX cần trang giới thiệu nhân vật có bộ kỹ năng và ngoại trang tương tác.
Người truy cập trang sau khi khách tuỳ chỉnh: Người chơi, cộng đồng game thủ và đối tác truyền thông muốn xem cốt truyện, chỉ số kỹ năng P/Q/W/E/R, bộ ngoại trang, vai trò chiến thuật và video tiêu điểm.
Mục tiêu chính của trang: Tái hiện trung thực >95% bố cục, ánh sáng lục lam u linh, nhân vật cai ngục xiềng xích, bộ 5 kỹ năng, 4 ngoại trang, cột thuộc tính vai trò và thẻ tiêu điểm theo ảnh tham chiếu; cung cấp luồng tra cứu kỹ năng, chuyển đổi ngoại trang hai chiều và liên hệ/tải bản chơi thử rõ ràng.
CTA chính và đích đến: Nút "PLAY NOW" ở thanh điều hướng mở khu vực "#play" (kèm liên kết mailto:press@shadowwarden-studio.example và hộp thoại thông tin bản dựng demo).
Nội dung / section bắt buộc:
  1. Header điều hướng (Logo LEAGUE OF LEGENDS hai dòng vàng kim, 5 mục GAMEPLAY / CHAMPIONS / NEWS / COLLECTION / ESPORTS, nút vát chéo PLAY NOW).
  2. Hero Showcase (Eyebrow THE CHAIN WARDEN, tiêu đề lớn Thresh, đoạn cốt truyện + Read more, cụm Abilities 5 ô P/Q/W/E/R kèm thông số Death Sentence (Q), cụm Skins 4 bệ tượng Classic / Dark Star / High Noon / FPX, sân khấu nhân vật trung tâm, cột 4 thuộc tính phải Support / Moderate / Ranged / Bottom, thẻ tiêu điểm góc dưới phải Shadow Isles: None Escape).
  3. Ability Matrix & Tactical Breakdown (#gameplay / #champions — bảng phân tích toàn bộ 5 kỹ năng P/Q/W/E/R và đồng bộ chọn kỹ năng).
  4. Chromatic Skin Archive (#collection — bộ sưu tập 4 ngoại trang kèm nút kích hoạt đổi sân khấu hero).
  5. Shadow Isles Lore & Esports Telemetry (#news / #esports / #play — biên niên sử Shadow Isles, thông số đường dưới và liên hệ studio).
Hướng thị giác: Nền đá đen ánh lục lam (#071014 -> #0c191f), chữ trắng băng (#f2f7f6), điểm nhấn lục bảo linh hồn (#4fd1b5 / #2ff5c8) và vàng cổ điển (#c8a15a), font tiêu đề hình học rộng Syne + thân bài Plus Jakarta Sans.
Điều cần tránh: Không giữ nút phóng to góc dưới phải của trình xem ảnh bên ngoài; không giả lập máy chủ tải game hoặc đăng nhập tài khoản; công khai rõ tên/nhãn hiệu trong ảnh mẫu là dữ liệu minh họa cần khách thay thế trước khi phát hành thương mại.
Tài sản / nội dung được cung cấp và quyền sử dụng: Ảnh tham chiếu do chủ sản phẩm cung cấp (`media_1792205010995_4526fbbb.png`, 838×458) và ảnh minh họa gốc tạo qua subagent `image-generator` (`design/warden-generated.jpg`), xử lý thành 3 file WebP cục bộ (`warden-classic.webp`, `warden-darkstar.webp`, `warden-highnoon.webp`).
Phạm vi giao: Gói sản phẩm `chain-warden.zip` kèm tích hợp cửa hàng Forge Zone, push GitHub và deploy Vercel production.
Nếu tích hợp: Ô catalog `t49`, phân loại `entertainment`.
Yêu cầu bổ sung / ngoại lệ được chủ sản phẩm chấp nhận:
  - Ngoại lệ W01/W03/W06 (`--ngoai-le`): Gói gồm 9 file (6 file chuẩn + 3 ảnh `.webp` trong `assets/img/`), tổng dung lượng ZIP < 300 KB.
  - Ngoại lệ W05: JavaScript điều khiển menu mobile, reveal khi cuộn, chuyển đổi 5 kỹ năng (`P/Q/W/E/R`), chuyển đổi ngoại trang (`Classic/Dark Star/High Noon/FPX`) với fallback `requestAnimationFrame` hữu hạn, hộp thoại `<dialog>` xem cốt truyện/video tiêu điểm và nút tạm dừng chuyển động trong phiên.
```
