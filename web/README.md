# Agentic — website bán giao diện web

Dự án Next.js dựng từ bản thiết kế `2A.zip` (Claude Design canvas). Landing page
ba ngôn ngữ (Việt / English / 中文) kèm thư viện giao diện, trang chi tiết từng
mẫu, đăng nhập, thanh toán PayOS và form thu email.

---

## Chạy trên máy

```bash
npm install
```

Tạo file `.env` từ mẫu rồi điền giá trị:

```bash
cp .env.example .env
```

Tối thiểu cần `DATABASE_URL` và `AUTH_SECRET` thì server mới khởi động được.
Sinh `AUTH_SECRET`:

```bash
npx auth secret
```

Tạo bảng trong cơ sở dữ liệu:

```bash
npx prisma migrate dev --name init
```

Chạy:

```bash
npm run dev
```

Mở http://localhost:3000

---

## Cấu trúc

```
_src/                        bản thiết kế gốc (chỉ để tham chiếu, không build)
web/
  tools/                     script chuyển thiết kế -> mã nguồn
    convert.mjs              markup .dc.html -> TSX + CSS
    extract-data.mjs         I18N và hằng số -> data.ts
    extract-slots.mjs        ảnh người thiết kế đã đặt -> public/previews
    media.mjs                nén video/ảnh -> public/media
  src/
    generated/               SINH TỰ ĐỘNG — đừng sửa tay
      markup.tsx             toàn bộ giao diện
      design.css             CSS gốc của thiết kế
      hover.css              các trạng thái :hover/:focus
      data.ts                nội dung ba ngôn ngữ + bảng dữ liệu
    components/
      AgenticSite.tsx        state, effect, nối API
      ImageSlot.tsx          ô ảnh preview
    lib/
      view.ts                dựng dữ liệu cho giao diện (port của renderVals)
      sync.ts                hiệu ứng: reveal, parallax, LED, video nền
      catalog.ts             bảng giá dùng để tính tiền
      db.ts / mail.ts / payos.ts
    app/
      api/                   register, lead, checkout, payos/webhook, download
      thanh-toan/            trang kết quả thanh toán
  private/templates/         file .zip giao cho khách (không commit)
```

### Sinh lại mã từ thiết kế

Sửa `_src/Agentic.dc.html` rồi chạy:

```bash
npm run convert
```

Script sẽ dừng và báo lỗi nếu không tìm thấy các nút mua cần nối vào thanh
toán — tránh việc âm thầm mất chức năng khi thiết kế thay đổi.

Nén lại media (cần ffmpeg trong PATH):

```bash
npm run media
```

---

## Những thứ cần chuẩn bị

| Việc | Nơi làm | Biến môi trường |
|---|---|---|
| Cơ sở dữ liệu | https://neon.tech | `DATABASE_URL` |
| Khoá phiên đăng nhập | `npx auth secret` | `AUTH_SECRET` |
| Đăng nhập Google (tuỳ chọn) | Google Cloud Console | `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` |
| Thanh toán | https://payos.vn | `PAYOS_CLIENT_ID`, `PAYOS_API_KEY`, `PAYOS_CHECKSUM_KEY` |
| Gửi email | https://resend.com | `RESEND_API_KEY`, `MAIL_FROM` |
| Địa chỉ site | — | `NEXT_PUBLIC_SITE_URL` |

Thiếu PayOS thì nút mua báo lỗi rõ ràng; thiếu Resend thì email chỉ ghi ra log.
Phần còn lại của trang vẫn chạy bình thường.

---

## Bảng giá

PayOS chỉ nhận VNĐ, nên tiền thu theo bảng giá tiếng Việt trong thiết kế:

- Một giao diện: **1.900.000₫**
- Trọn bộ thư viện: **9.900.000₫**
- Thiết kế riêng: liên hệ (không thanh toán tự động)

Sửa trong `src/lib/catalog.ts`. Muốn đặt giá riêng cho từng mẫu thì khai báo
trong `TEMPLATE_PRICE_OVERRIDE`.

Các mức `$59–$109` hiển thị trên thẻ ở thư viện là giá tham khảo cho khách quốc
tế, hiện chưa dùng để tính tiền.

---

## Giao file cho khách

Đặt file `.zip` vào `private/templates/` theo tên `t1.zip` … `t18.zip`,
`bundle.zip`, `free-sample.zip`. Thư mục này nằm ngoài `public/` nên không ai
tải trực tiếp được; `/api/download` kiểm tra quyền sở hữu trước khi trả file.

---

## Ảnh preview giao diện

Hiện mới có ảnh cho mẫu `t1` (lấy từ bản thiết kế). Thêm ảnh cho các mẫu khác:
bỏ file vào `public/previews/` rồi khai báo trong `PREVIEWS_EXTRA` ở
`src/lib/previews.ts` — phần này không bị `npm run convert` ghi đè.

---

## Deploy lên Vercel

```bash
npx vercel deploy          # bản xem trước
npx vercel deploy --prod   # bản chính thức
```

Khai báo biến môi trường trong **Project → Settings → Environment Variables**
trên Vercel (đúng các khoá trong `.env.example`). File `.env` cục bộ đã được
`.vercelignore` chặn nên không đi kèm mã nguồn.

Vài điểm đã xử lý sẵn, ghi lại để sau này khỏi mất công tìm:

- `postinstall: prisma generate` — Vercel chỉ chạy `npm install` rồi build, nếu
  không sinh client thì TypeScript báo `@prisma/client` thiếu `PrismaClient`.
- `prisma.config.ts` chỉ khai báo `datasource` khi có `DATABASE_URL`, vì
  `prisma generate` chạy lúc cài đặt — khi đó chưa chắc đã có biến này.
- `src/lib/db.ts` khởi tạo client trễ, nên thiếu `DATABASE_URL` chỉ làm hỏng
  route nào thật sự truy vấn, không sập cả trang.

**Link xem trước không mở công khai được**: Vercel mặc định bật Deployment
Protection, người ngoài mở sẽ bị chuyển sang trang đăng nhập. Muốn gửi link cho
người khác thì tắt ở **Settings → Deployment Protection**, hoặc deploy bản
chính thức bằng `--prod`.

---

## Sau khi deploy

1. Đặt `NEXT_PUBLIC_SITE_URL` thành tên miền thật.
2. Khai báo webhook PayOS trỏ tới `https://<tên-miền>/api/payos/webhook`.
   Webhook là nguồn xác nhận thanh toán duy nhất — trang "thanh toán thành công"
   chỉ là giao diện, không tự mở khoá file.
3. Thêm redirect URI của Google:
   `https://<tên-miền>/api/auth/callback/google`

---

## Lệnh

| Lệnh | Việc |
|---|---|
| `npm run dev` | chạy máy |
| `npm run build` | build production |
| `npm run convert` | sinh lại mã từ thiết kế |
| `npm run media` | nén lại video/ảnh |
| `npm run typecheck` | kiểm tra kiểu |
| `npm run lint` | kiểm tra lint |
