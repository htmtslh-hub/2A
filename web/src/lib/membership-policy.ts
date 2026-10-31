export type MembershipPlan = 'PRO' | 'ULTRA';
// PRO remains the stored identifier for existing orders; its public name is Premium.
// BUNDLE is used for Ultra Lifetime (permanent full-library access).
export const MEMBERSHIP_PRICES = { PRO: 1000, ULTRA: 7900, BUNDLE: 20000 } as const;
export const MEMBERSHIP_PRICES_VND = { PRO: 269_000, ULTRA: 1_799_000, BUNDLE: 3_999_000 } as const;

export function membershipName(plan: string): string {
  return plan === 'PRO'
    ? 'Premium'
    : plan === 'ULTRA'
      ? 'Ultra'
      : plan === 'BUNDLE'
        ? 'Ultra Lifetime'
        : plan;
}

export function isMembershipPlan(value: string): value is MembershipPlan {
  return value === 'PRO' || value === 'ULTRA';
}

/** Calendar month/year in UTC, clamping Jan 31 and leap days to the last valid day. */
export function membershipExpiry(start: Date, plan: MembershipPlan): Date {
  const end = new Date(start);
  const day = end.getUTCDate();
  end.setUTCDate(1);
  if (plan === 'PRO') end.setUTCMonth(end.getUTCMonth() + 1);
  else end.setUTCFullYear(end.getUTCFullYear() + 1);
  const lastDay = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() + 1, 0)).getUTCDate();
  end.setUTCDate(Math.min(day, lastDay));
  return end;
}

export type MembershipRecord = {
  plan: string;
  startsAt: Date;
  expiresAt: Date;
  order: { status: string };
};

export function activeMembership<T extends MembershipRecord>(rows: T[], now = new Date()): T | null {
  return (
    rows
      .filter((row) => isMembershipPlan(row.plan) && row.order.status === 'PAID' && row.startsAt <= now && row.expiresAt > now)
      .sort((a, b) => Number(b.plan === 'ULTRA') - Number(a.plan === 'ULTRA') || b.expiresAt.getTime() - a.expiresAt.getTime())[0] ?? null
  );
}
