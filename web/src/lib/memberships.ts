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

/** Each request rechecks expiry/refund/suspension on the server, never in the browser.
 *  Note: Membership plans (Premium/Ultra/Bundle) ONLY cover Web Templates, Skills, and Prompts.
 *  Agent/Tool products (group === 'agent') are sold individually at their own price.
 */
export async function hasProductAccess(userId: string, templateId: string, now = new Date()) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { suspendedAt: true } });
  if (!user || user.suspendedAt) return false;
  const isAgentTool = REAL_TEMPLATES[templateId]?.group === 'agent';
  if (isAgentTool) {
    const ownedTool = await prisma.purchase.findFirst({
      where: {
        userId,
        kind: 'TEMPLATE',
        templateId,
        order: { status: 'PAID', amount: { gt: 0 } },
      },
    });
    return Boolean(ownedTool);
  }
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
  const allNonAgent = membership.active || purchases.some(p => p.kind === 'BUNDLE' && p.templateId === null);
  return Object.keys(REAL_TEMPLATES).filter(id => {
    const tpl = REAL_TEMPLATES[id];
    if (!tpl || tpl.previewOnly) return false;
    if (tpl.group === 'agent') {
      return purchases.some(p => p.kind === 'TEMPLATE' && p.templateId === id);
    }
    return allNonAgent || purchases.some(p => p.kind === 'TEMPLATE' && p.templateId === id);
  });
}
