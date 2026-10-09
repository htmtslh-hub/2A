const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const privateKeyPath = path.join(__dirname, '../.keys/developer_private.pem');

if (!fs.existsSync(privateKeyPath)) {
  console.error('❌ Không tìm thấy developer_private.pem. Chạy `node scripts/generate-keys.cjs` trước!');
  process.exit(1);
}

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

const email = process.argv[2] || 'customer@example.com';
const edition = process.argv[3] || 'PRO';
const deviceId = process.argv[4] || '*'; // '*' means not restricted to a specific machine upon generation, binds on activation
const daysValid = parseInt(process.argv[5] || '0', 10); // 0 = Lifetime / Perpetual

const issuedAt = Math.floor(Date.now() / 1000);
const expiresAt = daysValid > 0 ? issuedAt + daysValid * 86400 : 0; // 0 for lifetime
const licenseId = `LG-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

// License payload data (canonical JSON format)
const payload = {
  licenseId,
  edition,
  email,
  deviceId,
  issuedAt,
  expiresAt,
  version: '1.0'
};

const payloadString = JSON.stringify(payload);

// Sign with Ed25519
const signature = crypto.sign(null, Buffer.from(payloadString, 'utf8'), privateKey);

// Pack into an easily copy-pasteable license key token
const licenseCertificate = {
  payload,
  sig: signature.toString('base64')
};

const encodedKey = Buffer.from(JSON.stringify(licenseCertificate), 'utf8').toString('base64');
const formattedKey = `LGLIC-${encodedKey}`;

console.log('================================================================');
console.log('🎟️  LINGOGLASS COMMERCIAL LICENSE ISSUED');
console.log('================================================================');
console.log(`License ID : ${licenseId}`);
console.log(`Edition    : ${edition}`);
console.log(`Customer   : ${email}`);
console.log(`Device ID  : ${deviceId}`);
console.log(`Type       : ${expiresAt === 0 ? 'Vĩnh viễn (Lifetime / Perpetual)' : `Hết hạn sau ${daysValid} ngày`}`);
console.log('----------------------------------------------------------------');
console.log('MÃ KÍCH HOẠT (Gửi cho khách hàng):');
console.log(formattedKey);
console.log('================================================================');
