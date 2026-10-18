import { Prisma, OrderStatus } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { adminIdentity, adminHeaders, adminError, isAdminEmail, sameOrigin } from '@/lib/admin-access';
import { REAL_TEMPLATES } from '@/lib/real-templates';

export const dynamic = 'force-dynamic';
const fail = (error: string, status: number) => Response.json({ error }, { status, headers: adminHeaders });

export async function GET(req: Request) {
  try {
    if (!await adminIdentity()) return fail('Không có quyền quản trị.', 403);
    const params = new URL(req.url).searchParams;
    const section = params.get('section') ?? 'overview';
    const days = [7, 30, 90].includes(Number(params.get('days'))) ? Number(params.get('days')) : 30;
    const since = new Date(); since.setUTCHours(0, 0, 0, 0); since.setUTCDate(since.getUTCDate() - days + 1);
    const page = Math.min(100000, Math.max(1, Math.floor(Number(params.get('page')) || 1)));
    const q = (params.get('q') ?? '').trim().slice(0, 120);
    const skip = (page - 1) * 20;
    if (section === 'users') {
      const state = params.get('status');
      const where: Prisma.UserWhereInput = {
        ...(q ? { OR: [{ email: { contains: q, mode: 'insensitive' } }, { name: { contains: q, mode: 'insensitive' } }] } : {}),
        ...(state === 'locked' ? { suspendedAt: { not: null } } : state === 'active' ? { suspendedAt: null } : {}),
      };
      const [total, rows] = await Promise.all([
        prisma.user.count({ where }),
        prisma.user.findMany({ where, skip, take: 20, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], select: {
          id: true, name: true, email: true, createdAt: true, suspendedAt: true,
          _count: { select: { orders: true, purchases: true, savedTemplates: true } },
        } }),
      ]);
      return Response.json({ total, page, rows: rows.map(r => ({ ...r, admin: isAdminEmail(r.email) })) }, { headers: adminHeaders });
    }
    if (section === 'orders') {
      const status = params.get('status');
      const provider = params.get('provider');
      const where: Prisma.OrderWhereInput = {
        createdAt: { gte: since },
        ...(q ? { OR: [{ id: { contains: q } }, { buyerEmail: { contains: q, mode: 'insensitive' } }, { buyerName: { contains: q, mode: 'insensitive' } }] } : {}),
        ...(status && Object.values(OrderStatus).includes(status as OrderStatus) ? { status: status as OrderStatus } : {}),
        ...(provider === 'PAYOS' || provider === 'PADDLE' ? { provider } : {}),
      };
      const [total, rows] = await Promise.all([
        prisma.order.count({ where }),
        prisma.order.findMany({ where, skip, take: 20, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], select: {
          id: true, buyerEmail: true, buyerName: true, amount: true, currency: true, status: true, provider: true,
          kind: true, templateId: true, description: true, adminNote: true, createdAt: true, paidAt: true,
          payosOrderCode: true, paddleTxnId: true, items: { select: { templateId: true, amount: true } },
          _count: { select: { purchases: true } },
        } }),
      ]);
      return Response.json({ total, page, rows: rows.map(r => ({ ...r, payosOrderCode: r.payosOrderCode?.toString() ?? null })) }, { headers: adminHeaders });
    }
    if (section === 'audit') {
      const [total, rows] = await Promise.all([
        prisma.adminAuditLog.count(),
        prisma.adminAuditLog.findMany({ skip, take: 20, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] }),
      ]);
      return Response.json({ total, page, rows }, { headers: adminHeaders });
    }
    if (section !== 'overview' && section !== 'traffic') return fail('Mục không hợp lệ.', 400);
    const [
      accounts, newAccounts, orders, pending, revenue, views, sessions, chart, paths, sources, devices,
      downloadsByPeriod, downloadsAllTime, purchasesByTemplate, savedByTemplate,
    ] = await Promise.all([
      prisma.user.count(), prisma.user.count({ where: { createdAt: { gte: since } } }),
      prisma.order.count({ where: { createdAt: { gte: since } } }),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.groupBy({ by: ['currency'], where: { status: 'PAID', paidAt: { gte: since } }, _sum: { amount: true }, _count: true }),
      prisma.pageView.count({ where: { createdAt: { gte: since } } }),
      prisma.$queryRaw<{ count: number }[]>`SELECT COUNT(DISTINCT "sessionId")::int AS count FROM "PageView" WHERE "createdAt" >= ${since}`,
      prisma.$queryRaw<{ day: string; views: number; sessions: number }[]>`SELECT TO_CHAR("createdAt", 'YYYY-MM-DD') AS day, COUNT(*)::int AS views, COUNT(DISTINCT "sessionId")::int AS sessions FROM "PageView" WHERE "createdAt" >= ${since} GROUP BY day ORDER BY day`,
      prisma.pageView.groupBy({ by: ['path'], where: { createdAt: { gte: since } }, _count: true, orderBy: { _count: { path: 'desc' } }, take: 10 }),
      prisma.pageView.groupBy({ by: ['referrer'], where: { createdAt: { gte: since } }, _count: true, orderBy: { _count: { referrer: 'desc' } }, take: 10 }),
      prisma.pageView.groupBy({ by: ['device'], where: { createdAt: { gte: since } }, _count: true }),
      prisma.downloadToken.groupBy({ by: ['templateId'], where: { usedAt: { gte: since } }, _count: true }),
      prisma.downloadToken.groupBy({ by: ['templateId'], where: { usedAt: { not: null } }, _count: true }),
      prisma.purchase.groupBy({ by: ['templateId'], _count: true }),
      prisma.savedTemplate.groupBy({ by: ['templateId'], _count: true }),
    ]);
    const periodMap = new Map(downloadsByPeriod.map(d => [d.templateId, d._count]));
    const allTimeMap = new Map(downloadsAllTime.map(d => [d.templateId, d._count]));
    const purchaseMap = new Map(purchasesByTemplate.map(p => [p.templateId, p._count]));
    const savedMap = new Map(savedByTemplate.map(s => [s.templateId, s._count]));
    const catalogEntries: { templateId: string; slug: string; name: string; category: string; isFree: boolean }[] = Object.entries(REAL_TEMPLATES)
      .filter(([, t]) => !t.previewOnly)
      .map(([id, t]) => ({
        templateId: id,
        slug: t.slug,
        name: t.copy.vi.name,
        category: t.cat,
        isFree: t.access === 'free',
      }));
    if (allTimeMap.has('free-sample') || periodMap.has('free-sample')) {
      catalogEntries.push({
        templateId: 'free-sample',
        slug: 'forge-starter-sample',
        name: 'Gói mẫu miễn phí (Starter)',
        category: 'portfolio',
        isFree: true,
      });
    }
    const knownIds = new Set(catalogEntries.map(e => e.templateId));
    for (const [id] of allTimeMap) {
      if (!knownIds.has(id)) {
        catalogEntries.push({
          templateId: id,
          slug: id,
          name: id,
          category: 'portfolio',
          isFree: false,
        });
      }
    }
    const templateDownloads = catalogEntries
      .map(entry => ({
        ...entry,
        downloads: periodMap.get(entry.templateId) ?? 0,
        totalDownloads: allTimeMap.get(entry.templateId) ?? 0,
        purchases: purchaseMap.get(entry.templateId) ?? 0,
        saved: savedMap.get(entry.templateId) ?? 0,
      }))
      .sort((a, b) => (
        b.downloads - a.downloads
        || b.totalDownloads - a.totalDownloads
        || b.purchases - a.purchases
        || b.saved - a.saved
        || a.templateId.localeCompare(b.templateId, undefined, { numeric: true })
      ));
    const downloads = downloadsByPeriod.reduce((sum, d) => sum + d._count, 0);
    const totalDownloads = downloadsAllTime.reduce((sum, d) => sum + d._count, 0);
    return Response.json({ days, since, accounts, newAccounts, orders, pending, revenue, views, sessions: sessions[0]?.count ?? 0,
      downloads, totalDownloads, templateDownloads,
      chart: Array.from({ length: days }, (_, i) => {
        const date = new Date(since); date.setUTCDate(date.getUTCDate() + i);
        const day = date.toISOString().slice(0, 10);
        return chart.find(r => r.day === day) ?? { day, views: 0, sessions: 0 };
      }), paths, sources, devices, tracking: process.env.ANALYTICS_ENABLED === 'true' }, { headers: adminHeaders });
  } catch (error) { return adminError(error); }
}

const mutation = z.discriminatedUnion('action', [
  z.object({ action: z.literal('user-name'), id: z.string().min(1).max(100), name: z.string().trim().min(1).max(60).refine(v => !/[\u0000-\u001f\u007f]/.test(v)) }),
  z.object({ action: z.literal('user-lock'), id: z.string().min(1).max(100), locked: z.boolean() }),
  z.object({ action: z.literal('order-note'), id: z.string().min(1).max(100), note: z.string().trim().max(2000) }),
]);

export async function PATCH(req: Request) {
  try {
    const actor = await adminIdentity();
    if (!actor) return fail('Không có quyền quản trị.', 403);
    if (!sameOrigin(req)) return fail('Nguồn yêu cầu không hợp lệ.', 403);
    const text = await req.text();
    if (text.length > 8192) return fail('Dữ liệu quá lớn.', 413);
    const parsed = mutation.safeParse(JSON.parse(text));
    if (!parsed.success) return fail('Dữ liệu không hợp lệ.', 400);
    const input = parsed.data;
    if (input.action.startsWith('user-')) {
      const target = await prisma.user.findUnique({ where: { id: input.id }, select: { id: true, email: true } });
      if (!target) return fail('Không tìm thấy tài khoản.', 404);
      if (input.action === 'user-lock' && (target.id === actor.id || isAdminEmail(target.email))) return fail('Không thể khóa tài khoản quản trị.', 409);
    } else if (!await prisma.order.findUnique({ where: { id: input.id }, select: { id: true } })) return fail('Không tìm thấy đơn.', 404);
    await prisma.$transaction(async tx => {
      let detail: string;
      if (input.action === 'user-name') {
        await tx.user.update({ where: { id: input.id }, data: { name: input.name } });
        detail = 'Cập nhật tên tài khoản';
      } else if (input.action === 'user-lock') {
        await tx.user.update({ where: { id: input.id }, data: { suspendedAt: input.locked ? new Date() : null, ...(input.locked ? { sessionVersion: { increment: 1 } } : {}) } });
        if (input.locked) {
          await tx.session.deleteMany({ where: { userId: input.id } });
          await tx.downloadToken.updateMany({ where: { userId: input.id }, data: { expiresAt: new Date() } });
        }
        detail = input.locked ? 'Khóa tài khoản và link tải hiện tại' : 'Mở khóa tài khoản';
      } else {
        await tx.order.update({ where: { id: input.id }, data: { adminNote: input.note } });
        detail = 'Cập nhật ghi chú nội bộ';
      }
      await tx.adminAuditLog.create({ data: { actorId: actor.id, action: input.action, targetId: input.id, detail } });
    });
    return Response.json({ ok: true }, { headers: adminHeaders });
  } catch (error) {
    if (error instanceof SyntaxError) return fail('JSON không hợp lệ.', 400);
    return adminError(error);
  }
}
