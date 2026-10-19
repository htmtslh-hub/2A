# Hướng dẫn Tùy biến & Triển khai — TOONHUB (`v1.0.0`)

Tài liệu này hướng dẫn từng bước cách chỉnh sửa nội dung, hình ảnh nhân vật 3D, bảng màu nền theo từng nhân vật, kiểu chữ và cách xuất bản mẫu giao diện **TOONHUB** lên môi trường thật.

---

## 10 Bước Tùy biến & Triển khai

### Bước 1: Chọn chế độ làm việc (Chỉnh sửa mã nguồn React hoặc dùng bản dựng sẵn)
- **Cách A (Khuyên dùng khi tùy biến sâu):** Cài đặt Node.js `>= 18`, chạy `npm install` và `npm run dev` trong thư mục `source/`, sửa các file trong `src/` rồi chạy `npm run build` để xuất bản dựng mới vào `dist/`.
- **Cách B (Dùng ngay không cần Node.js):** Thư mục `built/` đã chứa sẵn bản biên dịch tĩnh hoàn chỉnh (`built/index.html` và `built/assets/*`), có thể tải thẳng lên máy chủ tĩnh.

### Bước 2: Đổi tiêu đề trang (`<title>`) và mô tả SEO (`<meta name="description">`)
Mở `index.html`, tìm thẻ `<title>` và `<meta name="description">`:
```html
<title>TOONHUB — 3D Character Figurine Carousel</title>
<meta
  name="description"
  content="TOONHUB 3D character figurine showcase featuring full-viewport depth-of-field carousel transitions and collectible craft."
/>
```

### Bước 3: Thay đổi 4 hình ảnh nhân vật 3D và bảng màu nền (`IMAGES`)
Mở `src/App.tsx`, tìm mảng hằng số `IMAGES` ở đầu file:
```ts
const IMAGES: FigurineItem[] = [
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png',
    bg: '#F4845F',
    panel: '#F79B7F',
  },
  // ...
];
```
- `src`: Đường dẫn tới ảnh PNG tách nền trong suốt của nhân vật (khuyến nghị tỷ lệ dọc khoảng `0.6 : 1`, căn sát đáy ảnh để nhân vật đứng vững ở mép dưới màn hình).
- `bg`: Màu nền toàn màn hình tương ứng với nhân vật đang ở vị trí trung tâm (`center`).
- `panel`: Màu phụ đi kèm nhân vật (lưu trên `data-panel-color` để dễ mở rộng thẻ thông tin).

### Bước 4: Đổi nhãn thương hiệu góc trên bên trái (`TOONHUB`)
Trong `src/App.tsx`, tìm khối `<header>` ở mục `3. Top-left brand label "TOONHUB"`:
```tsx
<span
  className="text-xs font-semibold uppercase text-white block"
  style={{ opacity: 0.9, letterSpacing: '0.18em' }}
>
  TOONHUB
</span>
```
Thay `TOONHUB` bằng tên studio hoặc bộ sưu tập của bạn.

### Bước 5: Đổi dòng chữ khổng lồ phía sau nhân vật (`3D SHAPE`)
Trong `src/App.tsx`, tìm khối `2. Giant ghost text "3D SHAPE"`:
```tsx
<h1
  className="m-0 uppercase"
  style={{
    fontFamily: "'Anton', sans-serif",
    fontSize: 'clamp(90px, 28vw, 380px)',
    // ...
  }}
>
  3D SHAPE
</h1>
```
Nên giữ cụm từ ngắn từ 6–10 ký tự in hoa để chữ vừa vặn trên một dòng (`whiteSpace: 'nowrap'`) phía sau mô hình.

### Bước 6: Đổi tiêu đề phụ và đoạn mô tả góc dưới bên trái (`TOONHUB FIGURINES`)
Trong `src/App.tsx`, tìm khối `5. Bottom-left text + nav buttons`:
- Dòng tiêu đề phụ: `TOONHUB FIGURINES`
- Đoạn giới thiệu hiển thị từ màn hình `sm` trở lên (`hidden sm:block`):
  `The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.`

### Bước 7: Tùy biến liên kết hành động góc dưới bên phải (`DISCOVER IT`)
Trong `src/App.tsx`, tìm khối `6. Bottom-right link "DISCOVER IT"`:
- Mặc định khi bấm vào `DISCOVER IT`, sự kiện `onClick` gọi `navigate('next')` để xoay sang nhân vật tiếp theo mượt mà.
- Để chuyển hướng sang trang đặt hàng hoặc chi tiết bộ sưu tập, hãy đổi `href="#discover"` thành URL đích (ví dụ `href="https://yourstore.com/collection"`) và bỏ phần `onClick={(e) => { e.preventDefault(); navigate('next'); }}`.

### Bước 8: Tinh chỉnh tốc độ chuyển cảnh và độ sâu trường ảnh (`blur` / `scale`)
Trong `src/App.tsx`, hàm `getRoleStyle(role)` điều khiển tỷ lệ và độ mờ của 4 vị trí:
- `center`: `scale(1.68)` trên desktop (`1.25` trên mobile), `blur(0px)`, `zIndex: 20`.
- `left` & `right`: `scale(1)`, `blur(2px)`, `opacity: 0.85`, `zIndex: 10`.
- `back`: `scale(1)`, `blur(4px)`, `opacity: 1`, `zIndex: 5`.
- Thời lượng chuyển cảnh đồng bộ là `650ms cubic-bezier(0.4,0,0.2,1)` (đồng bộ với `window.setTimeout(..., 650)` trong hàm `navigate`).

### Bước 9: Đổi cặp phông chữ (`Anton` & `Inter`)
Trong `index.html`, phông chữ được nạp từ Google Fonts:
```html
<link
  href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```
Nếu thay bằng phông chữ khác, hãy cập nhật liên kết trong `index.html`, `tailwind.config.js` và thuộc tính `fontFamily` trong `src/App.tsx`.

### Bước 10: Biên dịch kiểm tra và triển khai (`Deploy`)
Chạy lệnh kiểm tra kiểu và đóng gói sản phẩm:
```bash
npm run build
```
Sau khi lệnh báo thành công (`✓ built`), tải toàn bộ nội dung thư mục `dist/` lên Cloudflare Pages, Vercel, Netlify, GitHub Pages hoặc máy chủ Nginx/Apache.

---

## 12 Prompt AI Gợi ý cho Khách hàng

1. **Đổi bộ sưu tập sang chủ đề Mecha / Cyberpunk:**
   > "Trong `src/App.tsx`, hãy giữ nguyên cơ chế xoay 4 vị trí (`center`, `left`, `right`, `back`) nhưng đổi 4 màu nền `bg` và `panel` trong `IMAGES` sang tông Cyberpunk (cam neon, tím đậm, xanh lục bảo, xanh điện), đổi `3D SHAPE` thành `MECHA LAB` và `TOONHUB FIGURINES` thành `UNIT SERIES 01`."
2. **Hiển thị tên riêng và giá cho từng nhân vật khi xoay:**
   > "Thêm thuộc tính `name` và `price` vào từng phần tử trong mảng `IMAGES` ở `src/App.tsx`, sau đó hiển thị tên nhân vật và giá ngay phía trên cụm nút mũi tên trái/phải, tự động cập nhật theo `IMAGES[activeIndex]`."
3. **Thêm chế độ tự động xoay (Autoplay) tạm dừng khi rê chuột:**
   > "Thêm `useEffect` trong `src/App.tsx` để tự động gọi `navigate('next')` mỗi `4500ms` khi người dùng không rê chuột vào vùng nút điều khiển, và tự động dọn bộ đếm khi unmount."
4. **Thêm thao tác vuốt cảm ứng (Touch Swipe) trên điện thoại:**
   > "Bổ sung xử lý `onTouchStart` và `onTouchEnd` trên thẻ `<main>` trong `src/App.tsx`: nếu khoảng cách vuốt ngang vượt quá `48px` thì gọi `navigate('next')` (vuốt sang trái) hoặc `navigate('prev')` (vuốt sang phải)."
5. **Mở ngăn kéo (Drawer) đặt mua khi bấm `DISCOVER IT`:**
   > "Trong `src/App.tsx`, khi bấm vào liên kết `DISCOVER IT`, hãy mở một ngăn kéo trượt từ bên phải hiển thị hình ảnh `IMAGES[activeIndex].src`, nền màu `IMAGES[activeIndex].panel`, thông số kích thước mô hình và nút `Pre-order Now`, hỗ trợ đóng bằng phím `Escape`."
6. **Thêm bộ chỉ báo vị trí (Slide Counter `01 / 04`):**
   > "Thêm bộ đếm vị trí dạng `01 / 04` ở góc trên bên phải của `src/App.tsx` (cùng hàng với nhãn `TOONHUB`), tự động cập nhật theo `activeIndex + 1`."
7. **Mở rộng băng chuyền từ 4 lên 6 nhân vật:**
   > "Cập nhật hàm `navigate` và `getRole` trong `src/App.tsx` để hỗ trợ mảng `IMAGES` gồm `N` phần tử (`N >= 4`), trong đó các phần tử không thuộc `center`, `left`, `right` đều nhận vai trò `back`."
8. **Chuyển đổi tài nguyên ảnh từ CDN về thư mục nội bộ `public/images/`:**
   > "Đổi 4 đường dẫn `src` trong `IMAGES` ở `src/App.tsx` sang `./images/figurine-1.png` đến `./images/figurine-4.png` để chạy hoàn toàn ngoại tuyến."
9. **Tinh chỉnh hạt nhiễu (`Grain overlay`) đậm hoặc mịn hơn:**
   > "Trong `src/App.tsx`, điều chỉnh hằng số `GRAIN_SVG_DATA_URI` và `opacity` của lớp phủ hạt nhiễu từ `0.4` xuống `0.22` để bề mặt nền mịn hơn trên màn hình Retina."
10. **Thêm hiệu ứng nghiêng nhẹ theo con trỏ chuột (Mouse Parallax) cho nhân vật chính:**
    > "Trong `src/App.tsx`, theo dõi tọa độ chuột trên màn hình desktop và dịch chuyển nhẹ nhân vật có `role === 'center'` khoảng `±10px` theo trục X/Y mà không ảnh hưởng tới hiệu ứng chuyển cảnh `650ms`."
11. **Tôn trọng cấu hình giảm chuyển động (`prefers-reduced-motion`):**
    > "Cập nhật `src/index.css` và `src/App.tsx` để khi hệ điều hành bật `prefers-reduced-motion: reduce`, thời gian chuyển cảnh rút ngắn còn `150ms` và giảm biên độ `scale`."
12. **Thêm thanh âm phản hồi nhẹ (Web Audio API click tick) khi chuyển nhân vật:**
    > "Tạo một hàm phát xung âm thanh ngắn bằng Web Audio API (không cần file MP3 ngoài) mỗi khi người dùng nhấn nút `ArrowLeft` hoặc `ArrowRight`, kèm nút bật/tắt âm ở góc trên."

---

## Bảng Đối chiếu Chuỗi Literal (Literal Edit Map)

Mọi chuỗi dưới đây đã được kiểm tra khớp chính xác số lần xuất hiện thực tế trong mã nguồn `source/`:

| Chuỗi cần tìm (Literal String) | File chứa chuỗi | Số lần xuất hiện | Mục đích chỉnh sửa |
|---|---|---:|---|
| `TOONHUB — 3D Character Figurine Carousel` | `index.html` | `1` | Tiêu đề tab trình duyệt (`<title>`) |
| `https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png` | `src/App.tsx` | `1` | URL ảnh nhân vật 1 (Cam san hô) |
| `https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png` | `src/App.tsx` | `1` | URL ảnh nhân vật 2 (Xanh lá) |
| `https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png` | `src/App.tsx` | `1` | URL ảnh nhân vật 3 (Hồng pastel) |
| `https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png` | `src/App.tsx` | `1` | URL ảnh nhân vật 4 (Xanh dương) |
| `#F4845F` | `src/App.tsx` | `1` | Màu nền nhân vật 1 |
| `#6BBF7A` | `src/App.tsx` | `1` | Màu nền nhân vật 2 |
| `#E882B4` | `src/App.tsx` | `1` | Màu nền nhân vật 3 |
| `#6EB5FF` | `src/App.tsx` | `1` | Màu nền nhân vật 4 |
| `3D SHAPE` | `src/App.tsx` | `1` | Chữ khổng lồ phía sau nhân vật (`Anton`) |
| `TOONHUB FIGURINES` | `src/App.tsx` | `1` | Tiêu đề khối thông tin góc dưới trái |
| `The artwork is stunning, shipped fully prepared. The finish is a` | `src/App.tsx` | `1` | Dòng mở đầu đoạn mô tả góc dưới trái |
| `DISCOVER IT` | `src/App.tsx` | `1` | Nhãn liên kết hành động góc dưới phải |
