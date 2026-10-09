const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const os = require('os');
const LicenseManager = require('../electron/licenseManager.cjs');

function runLicenseTests() {
  console.log('🧪 Bắt đầu kiểm thử Hệ thống Bản quyền & Chống Crack (Anti-Piracy L3)...');
  let passed = 0;
  let failed = 0;

  function assert(condition, desc) {
    if (condition) {
      console.log(`  ✅ PASS: ${desc}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${desc}`);
      failed++;
    }
  }

  const testUserData = path.join(os.tmpdir(), `lingoglass_test_${Date.now()}`);
  const manager = new LicenseManager(testUserData);

  const privateKey = fs.readFileSync(path.join(__dirname, '../.keys/developer_private.pem'), 'utf8');

  // Test 1: Generate valid license and verify
  const validPayload = {
    licenseId: 'LG-TEST-001',
    edition: 'PRO',
    email: 'user@test.com',
    deviceId: '*',
    issuedAt: Math.floor(Date.now() / 1000),
    expiresAt: 0,
    version: '1.0'
  };

  const validSig = crypto.sign(null, Buffer.from(JSON.stringify(validPayload), 'utf8'), privateKey);
  const validCert = { payload: validPayload, sig: validSig.toString('base64') };
  const validKey = `LGLIC-${Buffer.from(JSON.stringify(validCert), 'utf8').toString('base64')}`;

  const checkValid = manager.verifyLicenseCertificate(validKey);
  assert(checkValid.valid === true, 'Giấy phép hợp lệ được xác thực chữ ký thành công 100%');
  assert(checkValid.payload.edition === 'PRO', 'Thuộc tính giấy phép được giải mã chính xác');

  // Test 2: Tampered payload (Attacker alters payload to gain PRO)
  const tamperedPayload = { ...validPayload, edition: 'ULTIMATE_HACK' };
  // Using original signature for altered payload!
  const tamperedCert = { payload: tamperedPayload, sig: validSig.toString('base64') };
  const tamperedKey = `LGLIC-${Buffer.from(JSON.stringify(tamperedCert), 'utf8').toString('base64')}`;

  const checkTampered = manager.verifyLicenseCertificate(tamperedKey);
  assert(checkTampered.valid === false, 'Phát hiện sửa đổi dữ liệu trái phép (Chữ ký số sai)');

  // Test 3: Completely fake key
  const fakeKey = 'LGLIC-YWJjZGVmZ2hpams=';
  const checkFake = manager.verifyLicenseCertificate(fakeKey);
  assert(checkFake.valid === false, 'Chặn hoàn toàn key giả mạo');

  // Test 4: Device binding check
  const boundPayload = { ...validPayload, deviceId: manager.deviceId };
  const boundSig = crypto.sign(null, Buffer.from(JSON.stringify(boundPayload), 'utf8'), privateKey);
  const boundKey = `LGLIC-${Buffer.from(JSON.stringify({ payload: boundPayload, sig: boundSig.toString('base64') }), 'utf8').toString('base64')}`;

  const checkBound = manager.verifyLicenseCertificate(boundKey);
  assert(checkBound.valid === true, 'Giấy phép khớp đúng Device ID của máy');

  const otherDevicePayload = { ...validPayload, deviceId: 'DEV-SOMEOTHERPC' };
  const otherDeviceSig = crypto.sign(null, Buffer.from(JSON.stringify(otherDevicePayload), 'utf8'), privateKey);
  const otherDeviceKey = `LGLIC-${Buffer.from(JSON.stringify({ payload: otherDevicePayload, sig: otherDeviceSig.toString('base64') }), 'utf8').toString('base64')}`;

  const checkOtherDevice = manager.verifyLicenseCertificate(otherDeviceKey);
  assert(checkOtherDevice.valid === false, 'Chặn giấy phép bị copy sang thiết bị khác (Device Lock)');

  // Test 5: Full Activation and Encrypted Persistence
  const activateRes = manager.activate(validKey);
  assert(activateRes.success === true, 'Kích hoạt giấy phép thành công');
  assert(manager.getStatus().isPro === true, 'Trạng thái chuyển thành PRO');

  // Reload from encrypted file to verify persistence
  const managerReloaded = new LicenseManager(testUserData);
  assert(managerReloaded.getStatus().isPro === true, 'Khôi phục bản quyền từ file mã hóa AES thành công sau khi khởi động lại');

  // Test 6: Deactivation
  managerReloaded.deactivate();
  assert(managerReloaded.getStatus().isPro === false, 'Hủy kích hoạt thành công');

  // Cleanup tmp dir
  try {
    fs.rmSync(testUserData, { recursive: true, force: true });
  } catch (e) {}

  console.log(`\n🎉 Kết quả: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runLicenseTests();
