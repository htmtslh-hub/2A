const { app, BrowserWindow, protocol, net } = require('electron');
const path = require('path');
const urlModule = require('url');

protocol.registerSchemesAsPrivileged([
  { scheme: 'media', privileges: { stream: true, bypassCSP: true, supportFetchAPI: true, standard: true, secure: true } }
]);

app.whenReady().then(async () => {
  protocol.handle('media', (request) => {
    try {
      let rawPath = request.url.replace(/^media:\/\/+/i, '');
      if (/^[a-zA-Z]\//.test(rawPath)) {
        rawPath = rawPath[0] + ':' + rawPath.slice(1);
      }
      const decoded = decodeURIComponent(rawPath);
      const normalizedPath = path.normalize(decoded);
      const fileUrl = urlModule.pathToFileURL(normalizedPath).toString();
      return net.fetch(fileUrl, {
        method: request.method,
        headers: request.headers,
        bypassCustomProtocolHandlers: true
      });
    } catch (e) {
      return new Response('File not found', { status: 404 });
    }
  });

  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      webSecurity: true
    }
  });

  const testFile = path.resolve(__dirname, '../test.mp4').replace(/\\/g, '/');
  const mediaUrl = `media:///${testFile}`;

  await win.loadURL(`data:text/html,
    <html>
      <body>
        <video id="v" src="${mediaUrl}"></video>
        <script>
          const v = document.getElementById('v');
          v.oncanplay = () => console.log('CANPLAY_SUCCESS');
          v.onerror = (e) => console.log('PLAY_ERROR:', v.error ? v.error.message || v.error.code : 'unknown');
          v.play().then(() => console.log('PLAY_STARTED')).catch(e => console.log('PLAY_PROMISE_ERROR:', e.message));
        </script>
      </body>
    </html>
  `);

  win.webContents.on('console-message', (event, level, message) => {
    console.log('[RENDERER CONSOLE]:', message);
    if (message.includes('PLAY_STARTED') || message.includes('PLAY_ERROR') || message.includes('PLAY_PROMISE_ERROR')) {
      setTimeout(() => app.quit(), 500);
    }
  });

  setTimeout(() => {
    console.log('Timeout reached');
    app.quit();
  }, 5000);
});
