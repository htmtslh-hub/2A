const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Generate Ed25519 keypair
const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519', {
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

const keysDir = path.join(__dirname, '../.keys');
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir, { recursive: true });
}

// 1. Save developer private key (NEVER BUNDLED INTO APP)
fs.writeFileSync(path.join(keysDir, 'developer_private.pem'), privateKey);

// 2. Save public key (Embedded in app for verification)
fs.writeFileSync(path.join(keysDir, 'public.pem'), publicKey);

console.log('✅ Generated Master Ed25519 Keypair:');
console.log('   - Private Key: .keys/developer_private.pem (GIỮ BÍ MẬT - DÙNG ĐỂ TẠO KEY BÁN CHO KHÁCH)');
console.log('   - Public Key:  .keys/public.pem (Nhúng vào app để verify)');
