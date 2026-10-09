const u1 = new URL('media:///D:/3. Agent/file.mp4');
console.log('u1 pathname:', u1.pathname, 'host:', u1.host);

const u2 = new URL('media://D:/3. Agent/file.mp4');
console.log('u2 pathname:', u2.pathname, 'host:', u2.host);

let filePath = decodeURIComponent(u1.pathname);
if (process.platform === 'win32' && filePath.startsWith('/')) {
  filePath = filePath.slice(1);
}
console.log('filePath:', filePath);
console.log('file url:', 'file:///' + filePath.replace(/\\/g, '/'));
