# Hướng dẫn Tùy biến & Triển khai — Vectrus Energy (`v1.0.0`)

Tài liệu này hướng dẫn từng bước cách thay đổi video điều khiển theo cuộn, danh mục điều hướng, nội dung 3 phân cảnh tuần tự, màu sắc chủ đạo và cách xuất bản mẫu giao diện **Vectrus Energy** lên môi trường thật.

---

## 10 Bước Tùy biến & Triển khai

### Bước 1: Chọn chế độ làm việc (Chỉnh sửa mã nguồn React hoặc dùng bản dựng sẵn)
- **Cách A (Tùy biến mã nguồn React + TypeScript):** Cài đặt Node.js `>= 18`, chạy `npm install` và `npm run dev` trong thư mục `source/`, sửa các file trong `src/` rồi chạy `npm run build` để tạo bản dựng mới trong `dist/`.
- **Cách B (Chạy ngay không cần Node.js):** Thư mục `built/` đã chứa sẵn bản biên dịch tĩnh hoàn chỉnh (`built/index.html` và `built/assets/*`), có thể phục vụ trực tiếp qua máy chủ tĩnh.

### Bước 2: Đổi tiêu đề trang (`<title>`) và phông chữ (`Helvetica Neue ME`)
Mở `index.html`, tìm thẻ `<title>` và `<link>` phông chữ:
```html
<title>Scroll Tied Video Section</title>
<link
  href="https://db.onlinewebfonts.com/c/95cecf452d3208890088a5b4c19c7ecf?family=Helvetica+Neue+ME"
  rel="stylesheet"
/>
```
Nếu đổi sang phông chữ khác, hãy cập nhật liên kết trong `index.html` và thuộc tính `font-family` của `body` trong `src/index.css`.

### Bước 3: Thay đổi nguồn video điều khiển theo cuộn (`VIDEO_SRC`)
Mở `src/App.tsx`, tìm hằng số `VIDEO_SRC`:
```ts
const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4';
```
- **Lưu ý quan trọng về CORS & WebCodecs:** Để bộ giải mã khung hình `MP4Box + VideoDecoder` trong `src/useVideoScrub.ts` tải được `ArrayBuffer`, máy chủ lưu trữ video cần trả về header `Access-Control-Allow-Origin: *` (hoặc đặt file MP4 cùng domain trong thư mục `public/`). Nếu máy chủ chặn CORS hoặc trình duyệt không hỗ trợ `VideoDecoder`, hook sẽ tự động chuyển về chế độ dự phòng tua `<video>` (`video.currentTime = current`).

### Bước 4: Đổi màu chủ đạo xanh navy (`DARK`) và ngưỡng đảo màu thanh điều hướng
Mở `src/App.tsx`, tìm hằng số `DARK` và biến `isLight`:
```ts
const DARK = '#1D3045';
// ...
const isLight = p > 0.55;
```
- Khi tỷ lệ cuộn `p <= 0.55` (vùng video sáng), thanh điều hướng và chữ phân cảnh 1–2 dùng màu `DARK` (`#1D3045`).
- Khi `p > 0.55` (vùng video tối), thanh điều hướng tự động chuyển sang màu trắng `#FFFFFF` (`duration-500`).

### Bước 5: Tùy biến 5 liên kết trên thanh điều hướng (`NAV_LINKS`)
Trong `src/App.tsx`, chỉnh sửa mảng `NAV_LINKS`:
```ts
const NAV_LINKS = [
  'VECTRUS ENERGY',
  'VECTRUS UPSTREAM',
  'VECTRUS MARKETS',
  'VECTRUS SYSTEMS',
  'VECTRUS+',
] as const;
```
Mảng này đồng bộ tự động cho cả thanh điều hướng Desktop (`lg+`) và lớp phủ Menu di động (`#mobile-menu-overlay`).

### Bước 6: Tùy biến nội dung Phân cảnh 1 (`Section 1` — `p: 0.00 → 0.28`)
Trong `src/App.tsx`, tìm khối `SECTION 1 (hero, left aligned, vertically centered)`:
- Tiêu đề chính (`<h1>`): `Advancing resources for a cleaner future`
- Phụ đề (`<p>`): `Sustainable power with purpose`
- Nút tròn góc dưới phải (`#hero-next`): cuộn mượt tới phân cảnh 2 (`scrollToFraction(0.45)`).

### Bước 7: Tùy biến nội dung Phân cảnh 2 (`Section 2` — `p: 0.32 → 0.63`)
Trong `src/App.tsx`, tìm khối `SECTION 2 (center)`:
- Câu tuyên ngôn trung tâm (`<h2>`) được chia thành 3 độ đậm nhạt của màu `DARK`:
  - Cụm 1 (`100%`): `We build lasting partnerships with vision`
  - Cụm 2 (`80%`): `and precision`
  - Cụm 3 (`50%`): `across every frontier`
- Cụm nút bên phải gồm nút cuộn xuống (`ArrowDown` → `0.85`), 3 chấm chỉ báo và nút cuộn lên đầu trang (`ChevronUp` → `0`).

### Bước 8: Tùy biến nội dung Phân cảnh 3 (`Section 3` — `p: 0.67 → 1.00`)
Trong `src/App.tsx`, tìm khối `SECTION 3 (right aligned, white type — video is dark here)`:
- Dòng nhãn phụ (`Eyebrow`): `Halder | Nordvik`
- Tiêu đề (`<h2>`): `Fueling ambition,` / `shaping tomorrow.`
- Cụm nút hành động: `Contact Nordvik` kèm nút tròn trắng `40px` (`ArrowRight`).

### Bước 9: Tinh chỉnh độ mượt nội suy và bộ nhớ đệm khung hình (`src/useVideoScrub.ts`)
Mở `src/useVideoScrub.ts`, bạn có thể điều chỉnh các hằng số kỹ thuật ở đầu file:
- `const LERP_TAU = 8;`: Tốc độ bám của khung hình video theo vị trí cuộn (tăng lên `12` nếu muốn phản hồi tức thì hơn, giảm xuống `5` nếu muốn trôi chậm hơn).
- `const LRU_MAX = 24;`: Số lượng `ImageBitmap` tối đa giữ trong bộ nhớ đệm.
- `const LEAD = 24;`: Ngưỡng điều tiết hàng đợi giải mã WebCodecs.
- Chiều dài đường cuộn tổng thể được đặt tại thẻ ngoài cùng trong `src/App.tsx` (`className="relative h-[500vh]"`).

### Bước 10: Biên dịch kiểm tra và triển khai (`Deploy`)
Chạy lệnh kiểm tra TypeScript và đóng gói sản phẩm:
```bash
npm run build
```
Sau khi hoàn tất (`✓ built`), tải toàn bộ nội dung thư mục `dist/` lên Cloudflare Pages, Vercel, Netlify hoặc máy chủ tĩnh bất kỳ.

---

## 12 Prompt AI Gợi ý cho Khách hàng

1. **Đổi sang thương hiệu Hàng không Vũ trụ / Vệ tinh quỹ đạo:**
   > "Trong `src/App.tsx`, hãy đổi 5 mục trong `NAV_LINKS` sang các chương trình phóng vệ tinh (`ORBITAL CORE`, `PROPULSION`, `TELEMETRY`, `DEEP SPACE`, `ORBIT+`) và viết lại nội dung 3 phân cảnh tuần tự theo chủ đề công nghệ vũ trụ, giữ nguyên công thức `s1Opacity`, `s2Opacity`, `s3Opacity`."
2. **Thêm thanh tiến trình cuộn mảnh ở mép dưới màn hình:**
   > "Trong `src/App.tsx`, thêm một thanh tiến trình cao `2px` ở sát đáy khung `sticky` có chiều rộng bằng `${scrollProgress * 100}%` và tự động đổi màu theo `navColor`."
3. **Thêm hộp thoại Liên hệ (`Contact Modal`) khi bấm `Contact Nordvik` hoặc `CONTACT`:**
   > "Trong `src/App.tsx`, khi người dùng bấm nút cạnh dòng `Contact Nordvik` ở Section 3 hoặc mục `CONTACT` trong menu di động, hãy mở hộp thoại liên hệ nền `#1D3045` gồm các trường Họ tên, Email doanh nghiệp, Nội dung hợp tác và nút Gửi, hỗ trợ đóng bằng phím `Escape`."
4. **Thêm hộp thoại Bản tin (`News Drawer`) khi bấm `NEWS`:**
   > "Trong `src/App.tsx`, khi bấm vào nút `NEWS` trên thanh điều hướng, hãy mở một ngăn kéo bên phải hiển thị 3 thông cáo báo chí mới nhất của tập đoàn kèm ngày phát hành và nút đóng."
5. **Điều chỉnh trạng thái 3 chấm tròn ở Section 2 theo tiến độ cuộn:**
   > "Trong `src/App.tsx`, cập nhật cụm 3 chấm tròn để phản ánh phân cảnh hiện tại (`p < 0.3` sáng chấm 1, `0.3 <= p < 0.65` sáng chấm 2, `p >= 0.65` sáng chấm 3) và cho phép bấm vào từng chấm để gọi `scrollToFraction(0 | 0.45 | 0.85)`."
6. **Thêm phân cảnh thứ 4 (`Section 4`) bằng cách kéo dài đường cuộn lên `650vh`:**
   > "Trong `src/App.tsx`, tăng chiều cao khung cuộn từ `h-[500vh]` lên `h-[650vh]` và chia lại các mốc `s1Opacity`, `s2Opacity`, `s3Opacity`, `s4Opacity` để thêm một phân cảnh số liệu thống kê ở cuối video."
7. **Chuyển đổi nguồn video sang file nội bộ trong `public/assets/`:**
   > "Đổi hằng số `VIDEO_SRC` trong `src/App.tsx` thành `'./assets/aerial-flythrough.mp4'` để toàn bộ quá trình tải `ArrayBuffer` và giải mã `MP4Box` chạy nội bộ không phụ thuộc CDN ngoài."
8. **Hiển thị chỉ báo đang giải mã khung hình tinh tế ở góc dưới:**
   > "Trong `src/useVideoScrub.ts` và `src/App.tsx`, xuất thêm trạng thái `canvasLive` để hiển thị một chấm trạng thái nhỏ ở góc dưới trái báo hiệu khi bộ đệm khung hình WebCodecs đã sẵn sàng."
9. **Hỗ trợ điều hướng từng phân cảnh bằng phím `PageDown` / `PageUp` hoặc phím mũi tên lên/xuống:**
   > "Bổ sung sự kiện `keydown` trong `src/App.tsx` để khi nhấn phím `PageDown` hoặc `PageUp`, trang tự động cuộn mượt giữa 3 mốc `0`, `0.45` và `0.85`."
10. **Giảm độ phân giải giải mã `offscreen canvas` trên thiết bị di động để tiết kiệm RAM:**
    > "Trong `src/useVideoScrub.ts`, nếu `window.innerWidth < 768`, hãy hạ kích thước `offscreen` canvas xuống `1280×720` khi trích xuất `toBlob('image/webp', 0.78)` để tăng tốc độ khởi tạo trên điện thoại."
11. **Thêm chuyển đổi đa ngôn ngữ (`EN / NO / DE`) trên thanh điều hướng:**
    > "Thêm nút chuyển đổi ngôn ngữ `EN / NO` cạnh mục `NEWS` trên thanh điều hướng trong `src/App.tsx` và tách toàn bộ câu chữ của 3 phân cảnh vào một đối tượng từ điển."
12. **Tùy biến bảng màu sang tông Xanh Rừng Bắc Âu (`#142822`):**
    > "Trong `src/App.tsx`, đổi hằng số `DARK` từ `'#1D3045'` sang `'#142822'` và cập nhật các giá trị `rgba(29, 48, 69, ...)` tương ứng ở Section 2 sang `rgba(20, 40, 34, ...)`."

---

## Bảng Đối chiếu Chuỗi Literal (Literal Edit Map)

Mọi chuỗi dưới đây đã được kiểm tra khớp chính xác số lần xuất hiện thực tế trong mã nguồn `source/`:

| Chuỗi cần tìm (Literal String) | File chứa chuỗi | Số lần xuất hiện | Mục đích chỉnh sửa |
|---|---|---:|---|
| `Scroll Tied Video Section` | `index.html` | `1` | Tiêu đề tab trình duyệt (`<title>`) |
| `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4` | `src/App.tsx` | `1` | Đường dẫn video MP4 điều khiển theo cuộn |
| `const DARK = '#1D3045';` | `src/App.tsx` | `1` | Hằng số màu xanh navy chủ đạo |
| `'VECTRUS ENERGY'` | `src/App.tsx` | `1` | Mục điều hướng thứ 1 (đang chọn) |
| `'VECTRUS UPSTREAM'` | `src/App.tsx` | `1` | Mục điều hướng thứ 2 |
| `'VECTRUS MARKETS'` | `src/App.tsx` | `1` | Mục điều hướng thứ 3 |
| `'VECTRUS SYSTEMS'` | `src/App.tsx` | `1` | Mục điều hướng thứ 4 |
| `'VECTRUS+'` | `src/App.tsx` | `1` | Mục điều hướng thứ 5 |
| `Advancing resources for a cleaner future` | `src/App.tsx` | `1` | Tiêu đề chính Phân cảnh 1 (`<h1>`) |
| `Sustainable power with purpose` | `src/App.tsx` | `1` | Phụ đề Phân cảnh 1 |
| `We build lasting partnerships with vision` | `src/App.tsx` | `1` | Cụm mở đầu tiêu đề Phân cảnh 2 |
| `across every frontier` | `src/App.tsx` | `1` | Cụm kết thúc tiêu đề Phân cảnh 2 |
| `Halder \| Nordvik` | `src/App.tsx` | `1` | Nhãn phụ (Eyebrow) Phân cảnh 3 |
| `shaping tomorrow.` | `src/App.tsx` | `1` | Dòng thứ hai tiêu đề Phân cảnh 3 |
| `const LERP_TAU = 8;` | `src/useVideoScrub.ts` | `1` | Hằng số nội suy mượt khi cuộn video |
