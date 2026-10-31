import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  generateLicenseKey,
  getUserLicenseEntitlement,
  normalizeMachineId,
  verifyLicenseKeyToken,
  type LicensePlanCode,
} from '@/lib/license-key';

export const dynamic = 'force-dynamic';

/**
 * Endpoint công khai cho ứng dụng Desktop (Film Studio) kiểm tra trạng thái bản quyền
 * hoặc tự động tải Mã Kích Hoạt về máy dựa theo Mã Máy (Hardware ID).
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      action?: string;
      machineId?: string;
      licenseKey?: string;
    };

    const action = body.action || 'verify';
    const normHwid = normalizeMachineId(body.machineId || '');

    // 1. Tự động lấy Mã Kích Hoạt từ Web theo Mã Máy (Khi khách đã nhập Mã Máy trên Web trước đó)
    if (action === 'fetch_by_machine') {
      if (!normHwid) {
        return NextResponse.json({ ok: false, error: 'Mã Máy không hợp lệ.' }, { status: 400 });
      }

      const logs = await prisma.adminAuditLog.findMany({
        where: {
          targetId: normHwid,
          action: { in: ['license-activate', 'license-unbind', 'license-revoke'] },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      });

      if (logs.length === 0) {
        return NextResponse.json(
          {
            ok: false,
            error: `Mã Máy ${normHwid} chưa được đăng ký trên Web. Vui lòng đăng nhập https://forgezone.store/kich-hoat và nhập Mã Máy để tạo Mã Kích Hoạt!`,
          },
          { status: 404 }
        );
      }

      const latest = logs[0];
      if (latest.action === 'license-unbind' || latest.action === 'license-revoke') {
        return NextResponse.json(
          {
            ok: false,
            revoked: true,
            error: `Thiết bị ${normHwid} đã được gỡ bỏ hoặc thu hồi bản quyền trên Web.`,
          },
          { status: 403 }
        );
      }

      const meta = JSON.parse(latest.detail || '{}') as {
        licenseKey?: string;
        licenseId?: string;
        plan?: LicensePlanCode;
        email?: string;
        expiresAt?: number;
        issuedByAdmin?: boolean;
      };

      // Nếu key do khách tự tạo từ tài khoản, kiểm tra lại thời hạn gói mới nhất của khách (phòng khi khách vừa gia hạn!)
      if (!meta.issuedByAdmin && latest.actorId) {
        const ent = await getUserLicenseEntitlement(latest.actorId);
        if (!ent.eligible || !ent.plan) {
          return NextResponse.json(
            {
              ok: false,
              revoked: true,
              error: ent.reason || 'Gói bản quyền trên Web đã hết hạn hoặc bị hoàn tiền.',
            },
            { status: 403 }
          );
        }
        // Cấp lại key mới nhất nếu khách vừa gia hạn thêm thời gian trên Web
        const fresh = generateLicenseKey({
          machineId: normHwid,
          plan: ent.plan,
          expiresAtTs: ent.expiresAtTs,
          email: ent.email,
          licenseId: meta.licenseId,
        });
        return NextResponse.json({
          ok: true,
          machineId: normHwid,
          licenseKey: fresh.licenseKey,
          plan: ent.plan,
          expiresAt: ent.expiresAtTs,
        });
      }

      return NextResponse.json({
        ok: true,
        machineId: normHwid,
        licenseKey: meta.licenseKey || '',
        plan: meta.plan || 'PRO',
        expiresAt: meta.expiresAt || 0,
      });
    }

    // 2. Xác thực Mã Kích Hoạt đang lưu dưới máy khách
    const rawKey = (body.licenseKey || '').trim();
    const tokenCheck = verifyLicenseKeyToken(rawKey);
    if (!tokenCheck.payload) {
      return NextResponse.json({
        valid: false,
        revoked: false,
        error: tokenCheck.error || 'Mã Kích Hoạt không hợp lệ.',
      });
    }

    const payload = tokenCheck.payload;
    if (normHwid && payload.h !== normHwid) {
      return NextResponse.json({
        valid: false,
        revoked: true,
        reason: `Mã Kích Hoạt thuộc về máy ${payload.h}, không khớp với máy ${normHwid}.`,
      });
    }

    // Kiểm tra xem thiết bị có bị gỡ hoặc thu hồi trên DB không
    const latestLog = await prisma.adminAuditLog.findFirst({
      where: {
        targetId: payload.h,
        action: { in: ['license-activate', 'license-unbind', 'license-revoke'] },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (latestLog && (latestLog.action === 'license-unbind' || latestLog.action === 'license-revoke')) {
      return NextResponse.json({
        valid: false,
        revoked: true,
        reason: 'Thiết bị này đã bị gỡ hoặc thu hồi quyền kích hoạt trên hệ thống Web.',
      });
    }

    return NextResponse.json({
      valid: tokenCheck.valid,
      expired: tokenCheck.expired,
      revoked: false,
      machineId: payload.h,
      plan: payload.p,
      expiresAt: payload.x,
    });
  } catch (err) {
    console.error('[api/license/verify POST]', err);
    return NextResponse.json({ valid: true, online_checked: false });
  }
}
