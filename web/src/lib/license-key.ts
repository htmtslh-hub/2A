import crypto from 'node:crypto';
import { prisma } from '@/lib/db';
import { REAL_TEMPLATES } from '@/lib/real-templates';

export const LIFETIME_TIMESTAMP = 4102444800; // 2099-12-31T00:00:00Z

const MASTER_SEED =
  process.env.FORGEZONE_LICENSE_SECRET ||
  'FZ_FILM_STUDIO_2026_HWID_MASTER_SIGNING_KEY_9F8E7D6C5B4A39281706';

export type LicensePlanCode = 'PRO' | 'ULTRA' | 'LIFETIME' | 'TRIAL' | 'CUSTOM';

export const MAX_MACHINES_BY_PLAN: Record<LicensePlanCode, number> = {
  TRIAL: 1,
  PRO: 2,
  ULTRA: 3,
  LIFETIME: 5,
  CUSTOM: 3,
};

export interface LicensePayload {
  app: string;
  e: string;
  h: string;
  i: number;
  id: string;
  p: LicensePlanCode;
  v: number;
  x: number;
}

export interface ActivatedMachineRecord {
  id: string;
  machineId: string;
  licenseId: string;
  licenseKey: string;
  plan: LicensePlanCode;
  email: string;
  issuedAt: number;
  expiresAt: number;
  createdAt: string;
}

function getSigningKey(): Buffer {
  return crypto.createHash('sha256').update(`FORGEZONE_HWID_V1::${MASTER_SEED}`, 'utf8').digest();
}

function b64urlEncode(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function b64urlDecode(str: string): Buffer {
  const pad = (4 - (str.length % 4)) % 4;
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad);
  return Buffer.from(base64, 'base64');
}

/**
 * Chuẩn hóa Mã Máy (Hardware Machine ID) về định dạng FS-XXXX-XXXX-XXXX-XXXX (16 ký tự Hex viết hoa).
 * Trả về chuỗi rỗng nếu không hợp lệ.
 */
export function normalizeMachineId(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';
  let s = raw.trim().toUpperCase();
  if (s.startsWith('FS-')) s = s.slice(3);
  else if (s.startsWith('FS')) s = s.slice(2);
  const hexOnly = s.replace(/[^0-9A-F]/g, '');
  if (hexOnly.length !== 16) return '';
  return `FS-${hexOnly.slice(0, 4)}-${hexOnly.slice(4, 8)}-${hexOnly.slice(8, 12)}-${hexOnly.slice(12, 16)}`;
}

/**
 * Ký và sinh Mã Kích Hoạt (FZKEY-...) tương thích 100% byte-for-byte với license_manager.py trên Desktop.
 */
export function generateLicenseKey(params: {
  machineId: string;
  plan: LicensePlanCode;
  expiresAtTs: number;
  email: string;
  licenseId?: string;
  issuedAtTs?: number;
}): { licenseKey: string; licenseId: string; payload: LicensePayload } {
  const normHwid = normalizeMachineId(params.machineId);
  if (!normHwid) {
    throw new Error('Mã Máy không hợp lệ (Cần đúng định dạng FS-XXXX-XXXX-XXXX-XXXX gồm 16 ký tự Hex).');
  }

  const nowTs = params.issuedAtTs ? Math.floor(params.issuedAtTs) : Math.floor(Date.now() / 1000);
  const planCode: LicensePlanCode = params.plan || 'PRO';
  const expTs =
    planCode === 'LIFETIME' && !params.expiresAtTs
      ? LIFETIME_TIMESTAMP
      : Math.floor(params.expiresAtTs);

  const shortHash = crypto
    .createHash('sha256')
    .update(`${normHwid}:${planCode}:${nowTs}`, 'utf8')
    .digest('hex')
    .slice(0, 8)
    .toUpperCase();
  const licenseId = params.licenseId || `LIC-${shortHash}`;

  // Thứ tự key cố định theo bảng chữ cái giống hệt json.dumps(..., sort_keys=True) của Python
  const orderedPayload: LicensePayload = {
    app: 'film-studio',
    e: (params.email || 'customer@forgezone.store').trim().toLowerCase(),
    h: normHwid,
    i: nowTs,
    id: licenseId,
    p: planCode,
    v: 1,
    x: expTs,
  };

  const jsonStr = JSON.stringify({
    app: orderedPayload.app,
    e: orderedPayload.e,
    h: orderedPayload.h,
    i: orderedPayload.i,
    id: orderedPayload.id,
    p: orderedPayload.p,
    v: orderedPayload.v,
    x: orderedPayload.x,
  });

  const b64Payload = b64urlEncode(Buffer.from(jsonStr, 'utf8'));
  const sigBytes = crypto
    .createHmac('sha256', getSigningKey())
    .update(b64Payload, 'ascii')
    .digest()
    .subarray(0, 16);
  const b64Sig = b64urlEncode(sigBytes);

  return {
    licenseKey: `FZKEY-${b64Payload}.${b64Sig}`,
    licenseId,
    payload: orderedPayload,
  };
}

/**
 * Xác thực chữ ký mật mã và giải mã Mã Kích Hoạt (FZKEY-...).
 */
export function verifyLicenseKeyToken(rawKey: string): {
  valid: boolean;
  expired: boolean;
  error?: string;
  payload?: LicensePayload;
} {
  const key = (rawKey || '').trim();
  if (!key.startsWith('FZKEY-') || !key.includes('.')) {
    return { valid: false, expired: false, error: 'Định dạng Mã Kích Hoạt không hợp lệ.' };
  }
  const body = key.slice(6);
  const dotIdx = body.indexOf('.');
  if (dotIdx <= 0) {
    return { valid: false, expired: false, error: 'Thiếu chữ ký bảo mật trong Mã Kích Hoạt.' };
  }
  const b64Payload = body.slice(0, dotIdx);
  const b64Sig = body.slice(dotIdx + 1);

  const expectedSigBytes = crypto
    .createHmac('sha256', getSigningKey())
    .update(b64Payload, 'ascii')
    .digest()
    .subarray(0, 16);
  const expectedB64Sig = b64urlEncode(expectedSigBytes);

  const a = Buffer.from(b64Sig, 'ascii');
  const b = Buffer.from(expectedB64Sig, 'ascii');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { valid: false, expired: false, error: 'Chữ ký Mã Kích Hoạt không hợp lệ.' };
  }

  try {
    const decoded = JSON.parse(b64urlDecode(b64Payload).toString('utf8')) as LicensePayload;
    const nowTs = Math.floor(Date.now() / 1000);
    const isLifetime = decoded.p === 'LIFETIME' || decoded.x >= 4000000000;
    const expired = !isLifetime && nowTs >= decoded.x;
    return {
      valid: !expired,
      expired,
      payload: decoded,
      error: expired ? 'Mã Kích Hoạt đã hết hạn.' : undefined,
    };
  } catch {
    return { valid: false, expired: false, error: 'Dữ liệu Mã Kích Hoạt bị hỏng.' };
  }
}

const LICENSED_DESKTOP_TOOL_IDS = new Set([
  't189', // Film Studio Pro
  't14',  // LingoGlass Player
  'a001', 'a002', 'a003', 'a004', 'a005', 'a006', 'a007', 'a008',
  ...Object.keys(REAL_TEMPLATES).filter((id) => REAL_TEMPLATES[id]?.group === 'agent'),
]);

/**
 * Kiểm tra quyền kích hoạt Mã Máy (Hardware ID) cho sản phẩm Agent / Tool trên Web.
 * Quy tắc:
 *   - Các gói thành viên (Premium / Ultra / Ultra Lifetime) CHỈ áp dụng cho Giao diện Web, Skill và Prompt.
 *   - Các công cụ Agent / Tool (như Film Studio Pro - t189) có giá bán lẻ riêng (trả một lần, dùng vĩnh viễn).
 *   - Chỉ cấp Mã Kích Hoạt khi tài khoản đã mua trực tiếp sản phẩm Agent / Tool (đơn hàng PAID có amount > 0).
 */
export async function getUserLicenseEntitlement(userId: string): Promise<{
  eligible: boolean;
  plan: LicensePlanCode | null;
  expiresAtTs: number;
  expiresAtDate: Date | null;
  maxMachines: number;
  email: string;
  reason?: string;
}> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, suspendedAt: true },
  });

  if (!user || user.suspendedAt) {
    return {
      eligible: false,
      plan: null,
      expiresAtTs: 0,
      expiresAtDate: null,
      maxMachines: 0,
      email: user?.email || '',
      reason: 'Tài khoản không tồn tại hoặc đang bị tạm khóa.',
    };
  }

  const paidToolPurchases = await prisma.purchase.findMany({
    where: {
      userId,
      kind: 'TEMPLATE',
      templateId: { in: Array.from(LICENSED_DESKTOP_TOOL_IDS) },
      order: {
        status: 'PAID',
        amount: { gt: 0 },
      },
    },
    orderBy: { createdAt: 'desc' },
    select: { id: true, templateId: true, createdAt: true },
  });

  if (paidToolPurchases.length > 0) {
    return {
      eligible: true,
      plan: 'LIFETIME',
      expiresAtTs: LIFETIME_TIMESTAMP,
      expiresAtDate: new Date(LIFETIME_TIMESTAMP * 1000),
      maxMachines: Math.max(2, paidToolPurchases.length * 2),
      email: user.email,
    };
  }

  return {
    eligible: false,
    plan: null,
    expiresAtTs: 0,
    expiresAtDate: null,
    maxMachines: 0,
    email: user.email,
    reason:
      'Tài khoản của bạn chưa mua công cụ này. (Lưu ý: Gói thành viên Premium / Ultra chỉ áp dụng cho Giao diện Web, Skill và Prompt; các sản phẩm Agent / Tool có giá mua riêng). Vui lòng mua sản phẩm để nhận Mã Kích Hoạt theo Mã Máy.',
  };
}

/**
 * Lấy danh sách các Mã Máy (Hardware ID) đang được kích hoạt của người dùng.
 * Chỉ trả về danh sách thiết bị khi tài khoản ĐÃ MUA sản phẩm / gói bản quyền còn hiệu lực.
 */
export async function listUserActivatedMachines(userId: string): Promise<ActivatedMachineRecord[]> {
  const entitlement = await getUserLicenseEntitlement(userId);
  if (!entitlement.eligible) {
    return [];
  }

  const logs = await prisma.adminAuditLog.findMany({
    where: {
      actorId: userId,
      action: { in: ['license-activate', 'license-unbind'] },
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  const latestByMachine = new Map<string, ActivatedMachineRecord | null>();
  for (const row of logs) {
    const hwid = normalizeMachineId(row.targetId);
    if (!hwid || latestByMachine.has(hwid)) continue;
    if (row.action === 'license-unbind') {
      latestByMachine.set(hwid, null);
      continue;
    }
    try {
      const meta = JSON.parse(row.detail);
      latestByMachine.set(hwid, {
        id: row.id,
        machineId: hwid,
        licenseId: meta.licenseId || '',
        licenseKey: meta.licenseKey || '',
        plan: (meta.plan as LicensePlanCode) || 'PRO',
        email: meta.email || '',
        issuedAt: Number(meta.issuedAt || 0),
        expiresAt: Number(meta.expiresAt || 0),
        createdAt: row.createdAt.toISOString(),
      });
    } catch {
      // ignore malformed log
    }
  }

  return Array.from(latestByMachine.values()).filter((x): x is ActivatedMachineRecord => x !== null);
}
