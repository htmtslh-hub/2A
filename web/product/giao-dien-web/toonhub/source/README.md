# TOONHUB — 3D Character Figurine Carousel Hero (`v1.0.0`)

**TOONHUB** là mẫu giao diện hero một màn hình (`100vh`) dành cho thương hiệu đồ chơi nghệ thuật (Art Toys), bộ sưu tập mô hình nhân vật 3D (Collectible Figurines), studio thiết kế nhân vật hoặc cổng ra mắt sản phẩm giới hạn. Giao diện được xây dựng bằng **React 18 + TypeScript + Vite + Tailwind CSS** cùng **`lucide-react`**, kèm sẵn bản dựng tĩnh tại `built/` để xem ngay không cần cài đặt.

## Điểm nổi bật

- **Băng chuyền 4 vị trí có chiều sâu (`center`, `left`, `right`, `back`):** Mỗi nhân vật 3D được đặt theo tỷ lệ khung `0.6 / 1` sát đáy màn hình, đè lên dòng chữ khổng lồ **`3D SHAPE`** (`Anton`, `clamp(90px, 28vw, 380px)`) phía sau để tạo hiệu ứng thị sai và chiều sâu trường ảnh (`blur(0px)` ở giữa, `blur(2px)` hai bên, `blur(4px)` phía sau).
- **Chuyển cảnh đồng bộ `650ms cubic-bezier(0.4, 0, 0.2, 1)`:** Khi nhấn nút mũi tên trái/phải (`ArrowLeft` / `ArrowRight`), phím mũi tên bàn phím hoặc liên kết **`DISCOVER IT`**, toàn bộ màu nền (`#F4845F` → `#6BBF7A` → `#E882B4` → `#6EB5FF`), vị trí, tỷ lệ phóng đại (`1.68` trên desktop, `1.25` trên mobile), độ mờ và độ trong suốt chuyển mượt đồng thời với khóa chống bấm chồng (`isAnimating` trong `650ms`).
- **Hiệu ứng hạt phim SVG (`fractalNoise`):** Lớp phủ hạt nhiễu (`baseFrequency=0.9`, `numOctaves=4`, `200px × 200px`) tạo chất liệu studio vật lý trên nền màu rực rỡ.
- **Tương thích hoàn chỉnh Desktop & Mobile (`window.innerWidth < 640`):** Tự động điều chỉnh kích thước, vị trí (`left`, `height`, `bottom`) và tỷ lệ nhân vật khi thay đổi kích thước màn hình.

## Cấu trúc thư mục

```text
source/
├── built/                      # Bản dựng tĩnh đã biên dịch sẵn (chạy trực tiếp không cần Node.js)
├── src/
│   ├── App.tsx                 # Component chính: dữ liệu IMAGES, trạng thái vòng xoay 4 vị trí, bố cục Hero
│   ├── main.tsx                # Điểm khởi chạy React 18
│   └── index.css               # Tailwind directives + hiệu ứng hover nút điều hướng & liên kết
├── index.html                  # Khai báo Google Fonts (Anton + Inter) & #root
├── package.json                # Cấu hình dependencies (react, react-dom, lucide-react, tailwindcss, vite)
├── tsconfig.json               # Cấu hình TypeScript nghiêm ngặt
├── tailwind.config.js          # Cấu hình Tailwind CSS
├── postcss.config.js           # Cấu hình PostCSS
├── vite.config.ts              # Cấu hình Vite (base: './')
├── CUSTOMISE.md                # Hướng dẫn tùy biến chi tiết 10 bước + 12 prompt AI + bảng chuỗi literal
├── LICENCE.txt                 # Giấy phép sử dụng thương mại
└── THIRD-PARTY-LICENSES.txt    # Thông tin giấy phép bên thứ ba
```

## Cách chạy nhanh

### 1. Xem ngay bản dựng sẵn (`built/`)
Phục vụ thư mục `built/` bằng bất kỳ máy chủ tĩnh nào:
```bash
npx serve built
```

### 2. Chạy môi trường phát triển & biên dịch lại (`React + Vite`)
```bash
npm install
npm run dev      # Chạy máy chủ phát triển Vite
npm run build    # Kiểm tra TypeScript (tsc --noEmit) và xuất bản dựng vào dist/
```

Xem chi tiết cách thay đổi danh sách nhân vật, bảng màu nền, câu chữ và triển khai thực tế tại `CUSTOMISE.md`.
