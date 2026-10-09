const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

app.disableHardwareAcceleration();

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    width: 512,
    height: 512,
    show: false,
    frame: false,
    transparent: true,
    webPreferences: {
      offscreen: false
    }
  });

  const svgPath = path.resolve(__dirname, '../lingoglass_icon.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf8');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin: 0; padding: 0; }
        html, body {
          width: 512px;
          height: 512px;
          background: transparent;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        svg {
          width: 512px;
          height: 512px;
        }
      </style>
    </head>
    <body>
      ${svgContent}
    </body>
    </html>
  `;

  await win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
  
  // Wait a moment for fonts and SVG rendering to settle
  await new Promise(resolve => setTimeout(resolve, 300));

  const image = await win.webContents.capturePage({ x: 0, y: 0, width: 512, height: 512 });
  const pngBuffer = image.toPNG();

  const buildDir = path.resolve(__dirname, '../build');
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pngPath = path.join(buildDir, 'icon.png');
  fs.writeFileSync(pngPath, pngBuffer);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), pngBuffer);
  fs.copyFileSync(svgPath, path.join(publicDir, 'lingoglass_icon.svg'));

  console.log('✅ Generated 512x512 transparent icon.png successfully:', pngPath);
  app.quit();
});
