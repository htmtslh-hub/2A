const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Embedded Ed25519 Public Key (Plan v4.1 Section XLVII & XLVIII)
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA33wQ47w6ir+0WYHybfrTs3QVT96E+UXzRzWpnJzWB3U=
-----END PUBLIC KEY-----`;

class LicenseManager {
  constructor(userDataPath) {
    this.storageDir = userDataPath || path.join(os.homedir(), '.lingoglass');
    if (!fs.existsSync(this.storageDir)) {
      try {
        fs.mkdirSync(this.storageDir, { recursive: true });
      } catch (e) {
        console.error('Failed to create license storage dir', e);
      }
    }
    this.licenseFile = path.join(this.storageDir, 'license.enc');
    this.deviceIdFile = path.join(this.storageDir, 'device.id');
    this.deviceId = this.getOrCreateDeviceId();
    this.currentStatus = {
      isPro: false,
      edition: 'TRIAL',
      email: null,
      licenseId: null,
      expiresAt: null
    };
    this.loadStoredLicense();
  }

  /**
   * Get or generate a persistent hardware-bound Device Identity (Plan v4.1 Section XLIX)
   */
  getOrCreateDeviceId() {
    try {
      if (fs.existsSync(this.deviceIdFile)) {
        const id = fs.readFileSync(this.deviceIdFile, 'utf8').trim();
        if (id) return id;
      }
      // Generate stable identifier based on hostname, platform, arch and random salt
      const seed = `${os.hostname()}-${os.platform()}-${os.arch()}-${crypto.randomBytes(8).toString('hex')}`;
      const newId = `DEV-${crypto.createHash('sha256').update(seed).digest('hex').substring(0, 16).toUpperCase()}`;
      fs.writeFileSync(this.deviceIdFile, newId, 'utf8');
      return newId;
    } catch (e) {
      return `DEV-DEFAULT-${os.platform().toUpperCase()}`;
    }
  }

  /**
   * Cryptographically verify an Ed25519 signed license token
   */
  verifyLicenseCertificate(keyString) {
    if (!keyString || !keyString.startsWith('LGLIC-')) {
      return { valid: false, error: 'Mã giấy phép không đúng định dạng LGLIC-...' };
    }

    try {
      const base64Data = keyString.replace('LGLIC-', '').trim();
      const rawCert = JSON.parse(Buffer.from(base64Data, 'base64').toString('utf8'));
      const { payload, sig } = rawCert;

      if (!payload || !sig) {
        return { valid: false, error: 'Cấu trúc giấy phép không hợp lệ.' };
      }

      // 1. Cryptographic Signature Verification
      const payloadString = JSON.stringify(payload);
      const isSignatureValid = crypto.verify(
        null,
        Buffer.from(payloadString, 'utf8'),
        PUBLIC_KEY,
        Buffer.from(sig, 'base64')
      );

      if (!isSignatureValid) {
        return { valid: false, error: 'Chữ ký điện tử không hợp lệ! Giấy phép có thể đã bị sửa đổi trái phép.' };
      }

      // 2. Check Expiration
      const now = Math.floor(Date.now() / 1000);
      if (payload.expiresAt > 0 && now > payload.expiresAt) {
        return { valid: false, error: 'Giấy phép bản quyền này đã hết hạn.' };
      }

      // 3. Check Device Binding (if bound to a specific device)
      if (payload.deviceId && payload.deviceId !== '*' && payload.deviceId !== this.deviceId) {
        return { valid: false, error: `Giấy phép này chỉ dành cho thiết bị ${payload.deviceId} (Thiết bị này: ${this.deviceId})` };
      }

      return {
        valid: true,
        payload,
        certificate: rawCert
      };
    } catch (err) {
      return { valid: false, error: 'Không thể giải mã chứng chỉ bản quyền.' };
    }
  }

  /**
   * Activate a license key and save locally with AES encryption
   */
  activate(keyString) {
    const check = this.verifyLicenseCertificate(keyString);
    if (!check.valid) {
      return { success: false, error: check.error };
    }

    try {
      // Save raw key string using cryptographically random IV + machine-specific key
      const iv = crypto.randomBytes(16);
      const key = crypto.createHash('sha256').update(this.deviceId).digest();
      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
      let encrypted = cipher.update(keyString, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      const storagePayload = `${iv.toString('hex')}:${encrypted}`;
      fs.writeFileSync(this.licenseFile, storagePayload, 'utf8');

      this.currentStatus = {
        isPro: true,
        edition: check.payload.edition || 'PRO',
        email: check.payload.email,
        licenseId: check.payload.licenseId,
        expiresAt: check.payload.expiresAt
      };

      return {
        success: true,
        license: this.currentStatus
      };
    } catch (err) {
      console.error('Lỗi khi lưu trữ license:', err);
      return { success: false, error: 'Lỗi ghi dữ liệu kích hoạt trên máy tính.' };
    }
  }

  /**
   * Load stored license from encrypted file on startup
   */
  loadStoredLicense() {
    if (!fs.existsSync(this.licenseFile)) {
      this.currentStatus = { isPro: false, edition: 'TRIAL', email: null, licenseId: null, expiresAt: null };
      return;
    }

    try {
      const storedContent = fs.readFileSync(this.licenseFile, 'utf8').trim();
      const key = crypto.createHash('sha256').update(this.deviceId).digest();
      let keyString = '';

      if (storedContent.includes(':')) {
        const [ivHex, cipherHex] = storedContent.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        keyString = decipher.update(cipherHex, 'hex', 'utf8') + decipher.final('utf8');
      } else {
        // Fallback for legacy static IV format
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.alloc(16, 0));
        keyString = decipher.update(storedContent, 'hex', 'utf8') + decipher.final('utf8');
      }

      const check = this.verifyLicenseCertificate(keyString);
      if (check.valid) {
        this.currentStatus = {
          isPro: true,
          edition: check.payload.edition || 'PRO',
          email: check.payload.email,
          licenseId: check.payload.licenseId,
          expiresAt: check.payload.expiresAt
        };
      } else {
        console.warn('Giấy phép đã lưu không còn hợp lệ:', check.error);
        this.currentStatus = { isPro: false, edition: 'TRIAL', email: null, licenseId: null, expiresAt: null };
      }
    } catch (e) {
      console.warn('Không thể đọc file bản quyền mã hóa, chuyển sang chế độ dùng thử', e);
      this.currentStatus = { isPro: false, edition: 'TRIAL', email: null, licenseId: null, expiresAt: null };
    }
  }

  deactivate() {
    try {
      if (fs.existsSync(this.licenseFile)) {
        fs.unlinkSync(this.licenseFile);
      }
    } catch (e) {
      console.error('Error removing license file', e);
    }
    this.currentStatus = { isPro: false, edition: 'TRIAL', email: null, licenseId: null, expiresAt: null };
    return { success: true };
  }

  getStatus() {
    return {
      ...this.currentStatus,
      deviceId: this.deviceId
    };
  }
}

module.exports = LicenseManager;
