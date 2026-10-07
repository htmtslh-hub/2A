import { z } from 'zod';
import { prisma } from '@/lib/db';
import { trafficPath, referrerHost } from '@/lib/traffic';
import { sameOrigin } from '@/lib/admin-access';

const schema = z.object({ id: z.string().uuid(), sessionId: z.string().uuid(), path: z.string().max(500), referrer: z.string().max(2048), device: z.enum(['mobile', 'tablet', 'desktop']) });
export async function POST(req: Request) {
  const empty = () => new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  if (process.env.ANALYTICS_ENABLED !== 'true') return empty();
  if (!sameOrigin(req)) return new Response(null, { status: 403 });
  if (req.headers.get('dnt') === '1' || req.headers.get('sec-gpc') === '1' || /bot|crawler|spider|headless/i.test(req.headers.get('user-agent') ?? '')) return empty();
  try {
    const text = await req.text();
    if (text.length > 4096) return new Response(null, { status: 413 });
    const data = schema.safeParse(JSON.parse(text));
    if (!data.success) return new Response(null, { status: 400 });
    const path = trafficPath(data.data.path);
    if (!path) return new Response(null, { status: 400 });
    // Bound accidental loops; duplicate event ids are idempotent in PostgreSQL.
    const recent = await prisma.pageView.count({ where: { sessionId: data.data.sessionId, createdAt: { gte: new Date(Date.now() - 60000) } } });
    if (recent >= 30) return new Response(null, { status: 429 });
    await prisma.pageView.upsert({ where: { id: data.data.id }, update: {}, create: { ...data.data, path, referrer: referrerHost(data.data.referrer) } });
    return empty();
  } catch {
    // Analytics must never interrupt browsing or checkout.
    return new Response(null, { status: 400 });
  }
}
