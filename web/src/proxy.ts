/* Chia một ứng dụng thành hai web theo tên miền.

   - forgezone.store        cửa hàng template (sản phẩm số, thanh toán Paddle/PayOS)
   - dichvu.forgezone.store dịch vụ làm web / AI agent và case study

   Lý do tách: Paddle từ chối duyệt forgezone.store ngày 13/09/2026 vì trên đó
   có bán dịch vụ làm web, mà Paddle chỉ nhận sản phẩm số. Tách hẳn thì cửa
   hàng không còn trang dịch vụ nào, còn dịch vụ vẫn chạy chung mã nguồn.

   Chỉ áp dụng cho đúng hai tên miền thật. Chạy máy (localhost) hay link xem
   trước của Vercel thì mọi đường dẫn vẫn mở bình thường để còn thử được.

   Hằng số viết thẳng ở đây thay vì nhập từ lib: proxy chạy tách khỏi phần dựng
   trang và tài liệu Next khuyên không dựa vào module dùng chung. */
import { NextResponse, type NextRequest } from 'next/server';

const STORE_HOSTS = ['forgezone.store', 'www.forgezone.store'];
const SERVICE_HOST = 'dichvu.forgezone.store';
const STORE_ORIGIN = 'https://forgezone.store';
const SERVICE_ORIGIN = 'https://dichvu.forgezone.store';

/** Trang thuộc web dịch vụ. `/dich-vu` là trang chủ của web đó. */
const SERVICE_PAGES = ['/dich-vu', '/du-an'];

const under = (pathname: string, base: string) =>
  pathname === base || pathname.startsWith(base + '/');

export function proxy(req: NextRequest) {
  const host = (req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '')
    .split(':')[0]
    .toLowerCase();
  const { pathname, search } = req.nextUrl;
  const isServicePage = SERVICE_PAGES.some((p) => under(pathname, p));

  if (host === SERVICE_HOST) {
    // Trang chủ của web dịch vụ chính là /dich-vu, giữ nguyên địa chỉ gọn.
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/dich-vu' + search, req.url));
    }
    // API vẫn phải chạy: form gửi yêu cầu (/api/dich-vu) và phiên đăng nhập mà
    // layout chung gọi tới. Chuyển hướng chúng sang tên miền khác sẽ lỗi CORS.
    if (isServicePage || under(pathname, '/api') || pathname === '/opengraph-image') {
      return NextResponse.next();
    }
    // Mọi trang của cửa hàng (bảng giá, thanh toán, pháp lý…) về tên miền chính.
    return NextResponse.redirect(STORE_ORIGIN + pathname + search, 308);
  }

  if (STORE_HOSTS.includes(host) && isServicePage) {
    // Link cũ /dich-vu?loai=sales vẫn dẫn đúng chỗ trên web mới.
    const target = under(pathname, '/dich-vu') ? pathname.replace(/^\/dich-vu/, '') || '/' : pathname;
    return NextResponse.redirect(SERVICE_ORIGIN + target + search, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Bỏ qua file tĩnh (có dấu chấm trong tên) và tài nguyên build của Next.
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
};
