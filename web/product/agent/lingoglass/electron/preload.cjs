const { contextBridge, ipcRenderer, webUtils } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openVideoDialog: () => ipcRenderer.invoke('dialog:openVideo'),
  openSubtitleDialog: () => ipcRenderer.invoke('dialog:openSubtitle'),
  getMediaDuration: (filePath) => ipcRenderer.invoke('media:getDuration', filePath),
  getPathForFile: (file) => {
    try {
      if (webUtils && webUtils.getPathForFile) {
        return webUtils.getPathForFile(file);
      }
    } catch (e) {}
    return file.path || '';
  },
  windowControls: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
    isMaximized: () => ipcRenderer.invoke('window:isMaximized')
  },
  license: {
    getStatus: () => ipcRenderer.invoke('license:getStatus'),
    activate: (keyString) => ipcRenderer.invoke('license:activate', keyString),
    deactivate: () => ipcRenderer.invoke('license:deactivate')
  },
  storage: {
    getVocabulary: () => ipcRenderer.invoke('storage:getVocabulary'),
    saveVocabulary: (items) => ipcRenderer.invoke('storage:saveVocabulary', items),
    getWaveformCache: (mediaHash) => ipcRenderer.invoke('storage:getWaveformCache', mediaHash),
    saveWaveformCache: (mediaHash, peaks) => ipcRenderer.invoke('storage:saveWaveformCache', mediaHash, peaks),
    getPlaybackState: (mediaKey) => ipcRenderer.invoke('storage:getPlaybackState', mediaKey),
    savePlaybackState: (mediaKey, state) => ipcRenderer.invoke('storage:savePlaybackState', mediaKey, state)
  },
  ai: {
    checkGpuStatus: () => ipcRenderer.invoke('ai:checkGpuStatus'),
    generateSubtitles: (mediaPath, options) => ipcRenderer.invoke('ai:generateSubtitles', mediaPath, options),
    translateCues: (cues, options) => ipcRenderer.invoke('ai:translateCues', cues, options),
    cancel: () => ipcRenderer.invoke('ai:cancel'),
    onProgress: (callback) => {
      const listener = (event, data) => callback(data);
      ipcRenderer.on('ai:progress', listener);
      return () => ipcRenderer.removeListener('ai:progress', listener);
    }
  },
  isDesktop: true
});

