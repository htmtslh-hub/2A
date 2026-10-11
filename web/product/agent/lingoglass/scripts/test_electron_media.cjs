const { app, protocol, net } = require('electron');
const path = require('path');
const urlModule = require('url');

protocol.registerSchemesAsPrivileged([
  { scheme: 'media', privileges: { stream: true, bypassCSP: true, supportFetchAPI: true, standard: true, secure: true } }
]);

app.whenReady().then(async () => {
  protocol.handle('media', (request) => {
    try {
      console.log('request.url:', request.url);
      let rawPath = request.url.replace(/^media:\/\/+/i, '');
      if (/^[a-zA-Z]\//.test(rawPath)) {
        rawPath = rawPath[0] + ':' + rawPath.slice(1);
      }
      const decoded = decodeURIComponent(rawPath);
      const normalizedPath = path.normalize(decoded);
      console.log('normalizedPath:', normalizedPath);
      const fileUrl = urlModule.pathToFileURL(normalizedPath).toString();
      console.log('Serving fileUrl:', fileUrl);
      return net.fetch(fileUrl, {
        method: request.method,
        headers: request.headers,
        bypassCustomProtocolHandlers: true
      });
    } catch (e) {
      console.error('protocol error:', e);
      return new Response('Error', { status: 500 });
    }
  });

  const testFile = 'D:\\3. Agent\\3-app\\1-mkv\\test.mp4';
  const testUrl = 'media:///' + testFile.replace(/\\/g, '/');
  console.log('Fetching testUrl:', testUrl);

  try {
    const res = await net.fetch(testUrl, { headers: { Range: 'bytes=0-100' } });
    console.log('Result status:', res.status, 'Content-Range:', res.headers.get('content-range'), 'Content-Length:', res.headers.get('content-length'));
    const buf = await res.arrayBuffer();
    console.log('Received bytes buffer length:', buf.byteLength);
  } catch (err) {
    console.error('Fetch testUrl error:', err);
  }

  app.quit();
});
