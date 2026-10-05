/* Keep the production storefront limited to downloadable template products.
   Retired service URLs return 410 so old links cannot expose a second product
   category on forgezone.store or its former service subdomain. */
import { NextResponse, type NextRequest } from 'next/server';

const SERVICE_HOST = 'dichvu.forgezone.store';
const SERVICE_PATHS = ['/dich-vu', '/du-an', '/api/dich-vu', '/api/notify'];

const under = (pathname: string, base: string) =>
  pathname === base || pathname.startsWith(base + '/');

export function proxy(req: NextRequest) {
  const host = (req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '')
    .split(':')[0]
    .toLowerCase();
  const { pathname } = req.nextUrl;
  const isServicePath = SERVICE_PATHS.some((p) => under(pathname, p));

  // The Paddle storefront sells downloadable templates only. Legacy service
  // URLs and the former service subdomain are deliberately retired instead of
  // redirecting reviewers or customers to a different product category.
  if (host === SERVICE_HOST || isServicePath) {
    return new NextResponse('This page is no longer available.', {
      status: 410,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-robots-tag': 'noindex, nofollow',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Bỏ qua file tĩnh (có dấu chấm trong tên) và tài nguyên build của Next.
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
};
