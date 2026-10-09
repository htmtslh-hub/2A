const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const MIME_TYPES = {
  '.mp4': 'video/mp4',
  '.m4v': 'video/mp4',
  '.mkv': 'video/x-matroska',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.avi': 'video/x-msvideo',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function handleMediaRequest(url, rangeHeader) {
  let rawPath = url.replace(/^media:\/\/+/i, '');
  if (/^\/?[a-zA-Z]:/i.test(rawPath)) {
    rawPath = rawPath.replace(/^\//, '');
  } else if (/^[a-zA-Z]\//.test(rawPath)) {
    rawPath = rawPath[0] + ':' + rawPath.slice(1);
  }
  const decoded = decodeURIComponent(rawPath);
  const normalizedPath = path.normalize(decoded);

  if (!fs.existsSync(normalizedPath)) {
    return { status: 404, headers: {} };
  }

  const stat = fs.statSync(normalizedPath);
  const fileSize = stat.size;
  const mimeType = getMimeType(normalizedPath);

  if (rangeHeader) {
    const parts = rangeHeader.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (isNaN(start) || start >= fileSize || (parts[1] && end >= fileSize) || start > end) {
      return {
        status: 416,
        headers: {
          'Content-Range': `bytes */${fileSize}`,
          'Accept-Ranges': 'bytes'
        }
      };
    }

    const chunkSize = end - start + 1;
    const stream = fs.createReadStream(normalizedPath, { start, end });
    const webStream = Readable.toWeb(stream);

    return {
      status: 206,
      statusText: 'Partial Content',
      headers: {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': String(chunkSize),
        'Content-Type': mimeType
      },
      body: webStream
    };
  }

  const stream = fs.createReadStream(normalizedPath);
  return {
    status: 200,
    headers: {
      'Accept-Ranges': 'bytes',
      'Content-Length': String(fileSize),
      'Content-Type': mimeType
    },
    body: Readable.toWeb(stream)
  };
}

async function runTests() {
  console.log('🧪 Starting Media Protocol Range Request Tests...');

  // Create temporary test file with 100 bytes
  const testFilePath = path.join(__dirname, 'test_media_sample.mp4');
  const buffer = Buffer.alloc(100, 'A');
  fs.writeFileSync(testFilePath, buffer);

  try {
    const testUrl = `media:///${testFilePath.replace(/\\/g, '/')}`;

    // Test 1: Full file request
    const res1 = handleMediaRequest(testUrl, null);
    if (res1.status === 200 && res1.headers['Content-Length'] === '100' && res1.headers['Accept-Ranges'] === 'bytes') {
      console.log('  ✅ PASS: Full file request returns 200 with Accept-Ranges');
    } else {
      throw new Error(`FAIL: Test 1 expected 200, got ${res1.status}`);
    }

    // Test 2: Range request 0-49 (first half)
    const res2 = handleMediaRequest(testUrl, 'bytes=0-49');
    if (res2.status === 206 && res2.headers['Content-Range'] === 'bytes 0-49/100' && res2.headers['Content-Length'] === '50') {
      console.log('  ✅ PASS: Partial range request (0-49) returns 206 with correct Content-Range');
    } else {
      throw new Error(`FAIL: Test 2 expected 206, got ${res2.status}`);
    }

    // Test 3: Open-ended range request (seeking to byte 50: "bytes=50-")
    const res3 = handleMediaRequest(testUrl, 'bytes=50-');
    if (res3.status === 206 && res3.headers['Content-Range'] === 'bytes 50-99/100' && res3.headers['Content-Length'] === '50') {
      console.log('  ✅ PASS: Seeking range request (50-) returns 206 with bytes 50-99/100');
    } else {
      throw new Error(`FAIL: Test 3 expected 206, got ${res3.status}`);
    }

    // Test 4: Invalid range returns 416
    const res4 = handleMediaRequest(testUrl, 'bytes=200-300');
    if (res4.status === 416) {
      console.log('  ✅ PASS: Out-of-bounds range returns 416');
    } else {
      throw new Error(`FAIL: Test 4 expected 416, got ${res4.status}`);
    }

    // Test 5: Verify MIME type detection for MKV and MP4
    const mkvMime = getMimeType('movie.mkv');
    if (mkvMime === 'video/x-matroska') {
      console.log('  ✅ PASS: MKV MIME type detected as video/x-matroska');
    } else {
      throw new Error(`FAIL: Expected video/x-matroska, got ${mkvMime}`);
    }

    console.log('🎉 ALL MEDIA PROTOCOL TESTS PASSED (5/5)!');
  } finally {
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  }
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
