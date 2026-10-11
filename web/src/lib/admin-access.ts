import 'server-only';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export const adminHeaders = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' };
export function isAdminEmail(email: string) {
  return (process.env.ADMIN_EMAILS ?? '').split(',').map(v => v.trim().toLowerCase()).filter(Boolean).includes(email.toLowerCase());
}

// Never trust a client role or a stale JWT email. Every API rechecks the DB.
export async function adminIdentity() {
  const session = await auth();
  const id = (session?.user as { id?: string } | undefined)?.id;
  if (!id) return null;
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, suspendedAt: true } });
  return user && !user.suspendedAt && isAdminEmail(user.email) ? user : null;
}

export function sameOrigin(req: Request) {
  const origin = req.headers.get('origin');
  if (!origin || req.headers.get('content-type')?.split(';')[0] !== 'application/json') return false;
  try {
    const parsed = new URL(origin);
    // Next's production server can normalize req.url to localhost while the
    // browser uses 127.0.0.1. Host retains the actual requested authority.
    const host = req.headers.get('host') ?? new URL(req.url).host;
    return parsed.origin === origin && parsed.host === host && parsed.protocol === new URL(req.url).protocol;
  } catch { return false; }
}

export function adminError(error: unknown) {
  console.error('[admin] request failed', error instanceof Error ? error.name : 'Unknown');
  return Response.json({ error: 'Không thể đọc dữ liệu. Kiểm tra kết nối và migration cơ sở dữ liệu.' }, { status: 503, headers: adminHeaders });
}
