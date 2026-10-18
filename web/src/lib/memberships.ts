import { prisma } from '@/lib/db';
import { activeMembership } from './membership-policy';
import { REAL_TEMPLATES } from './real-templates';

export async function membershipState(userId: string, now = new Date()) {
  const rows = await prisma.membership.findMany({
    where: { userId, order: { status: 'PAID' } },
    include: { order: { select: { status: true } } },
    orderBy: { expiresAt: 'desc' },
  });
  return { active: activeMembership(rows, now), latest: rows[0] ?? null, periods: rows };
}

/** Each request rechecks expiry/refund/suspension on the server, never in the browser. */
export async function hasProductAccess(userId: string, templateId: string, now = new Date()) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { suspendedAt: true } });
  if (!user || user.suspendedAt) return false;
  const owned = await prisma.purchase.findFirst({ where: {
    userId, order: { status: 'PAID' },
    OR: [{ kind: 'TEMPLATE', templateId }, { kind: 'BUNDLE', templateId: null }],
  } });
  if (owned) return true;
  return Boolean((await membershipState(userId, now)).active);
}

/** UI hints only: the download route still revalidates every request. */
export async function accessibleProductIds(userId: string, now = new Date()): Promise<string[]> {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { suspendedAt: true } });
  if (!user || user.suspendedAt) return [];
  const [membership, purchases] = await Promise.all([
    membershipState(userId, now),
    prisma.purchase.findMany({ where: { userId, order: { status: 'PAID' } }, select: { kind: true, templateId: true } }),
  ]);
  const all = membership.active || purchases.some(p => p.kind === 'BUNDLE' && p.templateId === null);
  return Object.keys(REAL_TEMPLATES).filter(id => !REAL_TEMPLATES[id].previewOnly &&
    (all || purchases.some(p => p.kind === 'TEMPLATE' && p.templateId === id)));
}
