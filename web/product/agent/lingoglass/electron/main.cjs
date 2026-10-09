const { app, BrowserWindow, Menu, ipcMain, dialog, shell, session, protocol, net } = require('electron');
const path = require('path');
const urlModule = require('url');
const fs = require('fs');
const { Readable } = require('stream');
const { exec } = require('child_process');
const LicenseManager = require('./licenseManager.cjs');
const StorageManager = require('./storageManager.cjs');
const AIManager = require('./aiManager.cjs');

const MIME_TYPES = {
  '.mp4': 'video/mp4',
  '.m4v': 'video/mp4',
  '.mkv': 'video/x-matroska',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.avi': 'video/x-msvideo',
  '.wmv': 'video/x-ms-wmv',
  '.flv': 'video/x-flv',
  '.ts': 'video/mp2t',
  '.mp3': 'audio/mpeg',
  '.m4a': 'audio/mp4',
  '.aac': 'audio/aac',
  '.wav': 'audio/wav',
  '.flac': 'audio/flac',
  '.ogg': 'audio/ogg',
  '.opus': 'audio/opus'
};

function getMediaMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

// Disable Electron's default native menu bar (File, Edit, View, Window, Help)
Menu.setApplicationMenu(null);

// Register privileged local media scheme for seamless file playback & range requests
protocol.registerSchemesAsPrivileged([
  { scheme: 'media', privileges: { stream: true, bypassCSP: true, supportFetchAPI: true, standard: true, secure: true } }
]);

// Prevent Chromium GPU sandbox access violations on Windows with dedicated GPUs
app.commandLine.appendSwitch('disable-gpu-sandbox');

let mainWindow = null;
let licenseManager = null;
let storageManager = null;
let aiManager = null;

function createWindow() {
  const userDataDir = app.getPath('userData');
  licenseManager = new LicenseManager(userDataDir);
  storageManager = new StorageManager(userDataDir);
  aiManager = new AIManager(userDataDir);

  const iconPath = process.platform === 'win32'
    ? path.join(__dirname, '../build/icon.ico')
    : path.join(__dirname, '../build/icon.png');

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    icon: fs.existsSync(iconPath) ? iconPath : undefined,
    frame: false, // Frameless window: removes Windows native titlebar & standard borders
    autoHideMenuBar: true, // Completely eliminates File, Edit, View, Window, Help menu
    backgroundColor: '#FAF7F2', // Clean retro canvas background
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true, // Plan v4.1 Section XXXVIII: strict SOP enforced
      sandbox: true
    }
  });

  mainWindow.setMenuBarVisibility(false);

  // Security: Deny creation of arbitrary new windows / popups
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // Security: Restrict in-app navigation to authorized app origins
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('http://localhost:5173') && !url.startsWith('file://')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  const isDev = process.env.NODE_ENV === 'development' || process.argv.includes('--dev');

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  if (process.platform === 'win32') {
    app.setAppUserModelId('com.lingoglass.player');
  }

  // Security: Only allow audio/media permission for shadowing microphone recording
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'media') {
      callback(true);
    } else {
      callback(false);
    }
  });

  // Register local media stream handler with full HTTP 206 Range seeking support
  protocol.handle('media', (request) => {
    try {
      let rawPath = request.url.replace(/^media:\/\/+/i, '');
      if (/^\/?[a-zA-Z]:/i.test(rawPath)) {
        rawPath = rawPath.replace(/^\//, '');
      } else if (/^[a-zA-Z]\//.test(rawPath)) {
        rawPath = rawPath[0] + ':' + rawPath.slice(1);
      }
      const decoded = decodeURIComponent(rawPath);
      const normalizedPath = path.normalize(decoded);

      if (!fs.existsSync(normalizedPath)) {
        console.error('[Protocol media] File not found:', normalizedPath);
        return new Response('File not found', { status: 404 });
      }

      const stat = fs.statSync(normalizedPath);
      const fileSize = stat.size;
      const mimeType = getMediaMimeType(normalizedPath);
      const rangeHeader = request.headers.get('range');

      if (rangeHeader) {
        // Range header format: "bytes=start-end" or "bytes=start-"
        const parts = rangeHeader.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (isNaN(start) || start >= fileSize || (parts[1] && end >= fileSize) || start > end) {
          return new Response('Requested Range Not Satisfiable', {
            status: 416,
            headers: {
              'Content-Range': `bytes */${fileSize}`,
              'Accept-Ranges': 'bytes'
            }
          });
        }

        const chunkSize = end - start + 1;
        const nodeStream = fs.createReadStream(normalizedPath, { start, end });
        const webStream = Readable.toWeb(nodeStream);

        return new Response(webStream, {
          status: 206,
          statusText: 'Partial Content',
          headers: {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': String(chunkSize),
            'Content-Type': mimeType
          }
        });
      }

      // No range specified: serve full file stream with Accept-Ranges
      const nodeStream = fs.createReadStream(normalizedPath);
      const webStream = Readable.toWeb(nodeStream);
      return new Response(webStream, {
        status: 200,
        headers: {
          'Accept-Ranges': 'bytes',
          'Content-Length': String(fileSize),
          'Content-Type': mimeType
        }
      });
    } catch (e) {
      console.error('[Protocol media] stream error:', e);
      return new Response('File stream error', { status: 500 });
    }
  });

  // Security: Block any embedded webviews
  app.on('web-contents-created', (event, contents) => {
    contents.on('will-attach-webview', (e) => {
      e.preventDefault();
    });
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Native File Dialog IPC Handlers
ipcMain.handle('dialog:openVideo', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'All Media Files (Video & Audio)', extensions: ['mp4', 'mkv', 'webm', 'mov', 'avi', 'mp3', 'm4a', 'aac', 'flac', 'wav', 'ogg', 'opus'] },
      { name: 'Video Files', extensions: ['mp4', 'mkv', 'webm', 'mov', 'avi', 'flv', 'wmv', 'ts'] },
      { name: 'Audio Files (Podcasts & Lessons)', extensions: ['mp3', 'm4a', 'aac', 'flac', 'wav', 'ogg', 'opus'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  return result.filePaths[0] || null;
});

ipcMain.handle('dialog:openSubtitle', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Subtitle Files', extensions: ['srt', 'vtt', 'ass', 'ssa'] }
    ]
  });
  return result.filePaths[0] || null;
});

// Media metadata duration retrieval via ffprobe
ipcMain.handle('media:getDuration', async (event, filePath) => {
  if (!filePath || typeof filePath !== 'string') return null;
  return new Promise((resolve) => {
    exec(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`, { timeout: 4000 }, (error, stdout) => {
      if (error) {
        return resolve(null);
      }
      const dur = parseFloat(stdout.trim());
      if (isFinite(dur) && dur > 0) {
        resolve(dur);
      } else {
        resolve(null);
      }
    });
  });
});

// Security & Licensing IPC Handlers (Plan v4.1 Section LII & LIII)
ipcMain.handle('license:getStatus', async () => {
  if (!licenseManager) return { isPro: false, edition: 'TRIAL' };
  return licenseManager.getStatus();
});

ipcMain.handle('license:activate', async (event, keyString) => {
  if (!licenseManager) return { success: false, error: 'License manager uninitialized' };
  return licenseManager.activate(keyString);
});

ipcMain.handle('license:deactivate', async () => {
  if (!licenseManager) return { success: false };
  return licenseManager.deactivate();
});

// Persistence & Waveform Storage IPC Handlers (Plan v4.1 Section XXV, XXVI, XXXIV, XXXV)
ipcMain.handle('storage:getVocabulary', async () => {
  if (!storageManager) return [];
  return storageManager.getVocabulary();
});

ipcMain.handle('storage:saveVocabulary', async (event, items) => {
  if (!storageManager) return false;
  return storageManager.saveVocabulary(items);
});

ipcMain.handle('storage:getWaveformCache', async (event, mediaHash) => {
  if (!storageManager) return null;
  return storageManager.getWaveformCache(mediaHash);
});

ipcMain.handle('storage:saveWaveformCache', async (event, mediaHash, peaks) => {
  if (!storageManager) return false;
  return storageManager.saveWaveformCache(mediaHash, peaks);
});

ipcMain.handle('storage:getPlaybackState', async (event, mediaKey) => {
  if (!storageManager) return null;
  return storageManager.getPlaybackState(mediaKey);
});

ipcMain.handle('storage:savePlaybackState', async (event, mediaKey, state) => {
  if (!storageManager) return false;
  return storageManager.savePlaybackState(mediaKey, state);
});

// AI Local GPU Subtitle & Translation IPC Handlers
ipcMain.handle('ai:checkGpuStatus', async () => {
  if (!aiManager) return { cudaAvailable: false, gpuName: 'N/A' };
  return aiManager.checkGpu();
});

ipcMain.handle('ai:generateSubtitles', async (event, mediaPath, options) => {
  if (!aiManager) return { success: false, error: 'AIManager chưa được khởi tạo' };
  return aiManager.generateSubtitles(mediaPath, options, (progressData) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('ai:progress', progressData);
    }
  });
});

ipcMain.handle('ai:translateCues', async (event, cues, options) => {
  if (!aiManager) return { success: false, error: 'AIManager chưa được khởi tạo' };
  return aiManager.translateCues(cues, options, (progressData) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('ai:progress', progressData);
    }
  });
});

ipcMain.handle('ai:cancel', async () => {
  if (!aiManager) return false;
  return aiManager.cancelActiveTask();
});

// Frameless Window Controls IPC Handlers
ipcMain.handle('window:minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.handle('window:maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('window:close', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.handle('window:isMaximized', () => {
  return mainWindow ? mainWindow.isMaximized() : false;
});

