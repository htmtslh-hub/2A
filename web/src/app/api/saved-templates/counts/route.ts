import { prisma } from '@/lib/db';
import { REAL_TEMPLATES } from '@/lib/real-templates';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rows = await prisma.savedTemplate.groupBy({
    by: ['templateId'],
    _count: { _all: true },
  });
  const counts: Record<string, number> = Object.fromEntries(
    Object.keys(REAL_TEMPLATES).map((id) => [id, 0]),
  );
  for (const row of rows) {
    if (Object.hasOwn(counts, row.templateId)) counts[row.templateId] = row._count._all;
  }
  return Response.json({ counts }, { headers: { 'Cache-Control': 'no-store' } });
}
