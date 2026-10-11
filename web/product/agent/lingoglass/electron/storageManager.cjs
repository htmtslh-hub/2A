const fs = require('fs');
const path = require('path');
const os = require('os');

const SCHEMA_VERSION = 1;

class StorageManager {
  constructor(userDataPath) {
    this.baseDir = userDataPath || path.join(os.homedir(), '.lingoglass');
    this.dataDir = path.join(this.baseDir, 'data');
    this.backupDir = path.join(this.baseDir, 'backups');
    this.waveformsDir = path.join(this.baseDir, 'waveforms');

    [this.baseDir, this.dataDir, this.backupDir, this.waveformsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        try {
          fs.mkdirSync(dir, { recursive: true });
        } catch (e) {
          console.error(`Failed to create directory: ${dir}`, e);
        }
      }
    });

    this.vocabFile = path.join(this.dataDir, 'vocabulary.json');
    this.settingsFile = path.join(this.dataDir, 'settings.json');
    this.recentMediaFile = path.join(this.dataDir, 'recent_media.json');

    this.initializeFiles();
  }

  initializeFiles() {
    if (!fs.existsSync(this.vocabFile)) {
      this.atomicWrite(this.vocabFile, {
        schemaVersion: SCHEMA_VERSION,
        updatedAt: Date.now(),
        items: []
      });
    }

    if (!fs.existsSync(this.settingsFile)) {
      this.atomicWrite(this.settingsFile, {
        schemaVersion: SCHEMA_VERSION,
        updatedAt: Date.now(),
        settings: {}
      });
    }
  }

  /**
   * Atomic file writing: Write to .tmp first, then atomic rename
   * Prevents file corruption during unexpected power cuts or OS crashes (Mục XXXV Plan v4.1)
   */
  atomicWrite(filePath, data) {
    const tmpPath = `${filePath}.${Date.now()}.tmp`;
    const jsonString = JSON.stringify(data, null, 2);
    try {
      fs.writeFileSync(tmpPath, jsonString, 'utf8');
      fs.renameSync(tmpPath, filePath);
      return true;
    } catch (e) {
      console.error(`Atomic write failed for ${filePath}`, e);
      if (fs.existsSync(tmpPath)) {
        try { fs.unlinkSync(tmpPath); } catch (_) {}
      }
      return false;
    }
  }

  /**
   * Automatically creates an emergency backup copy of vocabulary
   */
  createBackup(fileToBackup) {
    if (!fs.existsSync(fileToBackup)) return null;
    const filename = path.basename(fileToBackup, '.json');
    const hr = process.hrtime ? process.hrtime()[1] : Math.floor(Math.random() * 10000);
    const timestamp = `${Date.now()}_${hr}`;
    const backupFile = path.join(this.backupDir, `${filename}_${timestamp}.bak`);
    try {
      fs.copyFileSync(fileToBackup, backupFile);
      // Keep only latest 10 backups to prevent disk bloat
      this.cleanOldBackups(filename);
      return backupFile;
    } catch (e) {
      console.error('Backup creation failed', e);
      return null;
    }
  }

  cleanOldBackups(prefix) {
    try {
      const files = fs.readdirSync(this.backupDir)
        .filter(f => f.startsWith(prefix) && f.endsWith('.bak'))
        .map(f => ({ name: f, time: fs.statSync(path.join(this.backupDir, f)).mtimeMs }))
        .sort((a, b) => b.time - a.time);

      if (files.length > 10) {
        files.slice(10).forEach(f => {
          try { fs.unlinkSync(path.join(this.backupDir, f.name)); } catch (_) {}
        });
      }
    } catch (_) {}
  }

  // --- Vocabulary Operations ---
  getVocabulary() {
    try {
      if (fs.existsSync(this.vocabFile)) {
        const content = fs.readFileSync(this.vocabFile, 'utf8');
        const parsed = JSON.parse(content);
        return parsed.items || [];
      }
    } catch (e) {
      console.error('Lỗi đọc vocabulary file, thử khôi phục từ backup gần nhất', e);
      // Attempt rollback to latest backup
      return this.restoreLatestBackup('vocabulary');
    }
    return [];
  }

  saveVocabulary(items) {
    const success = this.atomicWrite(this.vocabFile, {
      schemaVersion: SCHEMA_VERSION,
      updatedAt: Date.now(),
      items: Array.isArray(items) ? items : []
    });
    if (success) {
      this.createBackup(this.vocabFile);
    }
    return success;
  }

  restoreLatestBackup(prefix) {
    try {
      const files = fs.readdirSync(this.backupDir)
        .filter(f => f.startsWith(prefix) && f.endsWith('.bak'))
        .map(f => ({ path: path.join(this.backupDir, f), time: fs.statSync(path.join(this.backupDir, f)).mtimeMs }))
        .sort((a, b) => b.time - a.time);

      if (files.length > 0) {
        const latest = files[0].path;
        console.warn(`Đang khôi phục từ bản backup an toàn: ${latest}`);
        const content = fs.readFileSync(latest, 'utf8');
        const parsed = JSON.parse(content);
        return parsed.items || [];
      }
    } catch (e) {
      console.error('Khôi phục thất bại', e);
    }
    return [];
  }

  // --- Waveform Cache Operations (Mục XXVI Plan v4.1) ---
  getWaveformCache(mediaHash) {
    if (!mediaHash) return null;
    const safeHash = mediaHash.replace(/[^a-zA-Z0-9_-]/g, '_');
    const cacheFile = path.join(this.waveformsDir, `${safeHash}.wf`);
    try {
      if (fs.existsSync(cacheFile)) {
        const raw = fs.readFileSync(cacheFile, 'utf8');
        return JSON.parse(raw);
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  saveWaveformCache(mediaHash, waveformData) {
    if (!mediaHash || !waveformData) return false;
    const safeHash = mediaHash.replace(/[^a-zA-Z0-9_-]/g, '_');
    const cacheFile = path.join(this.waveformsDir, `${safeHash}.wf`);
    return this.atomicWrite(cacheFile, {
      mediaHash,
      cachedAt: Date.now(),
      peaks: waveformData
    });
  }

  // --- Recent Media & Playback State (Plan v4.1 Section XXXIV) ---
  getPlaybackState(mediaKey) {
    if (!mediaKey) return null;
    try {
      if (fs.existsSync(this.recentMediaFile)) {
        const raw = fs.readFileSync(this.recentMediaFile, 'utf8');
        const data = JSON.parse(raw);
        return (data.items && data.items[mediaKey]) ? data.items[mediaKey] : null;
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  savePlaybackState(mediaKey, state) {
    if (!mediaKey || !state) return false;
    try {
      let data = { schemaVersion: SCHEMA_VERSION, updatedAt: Date.now(), items: {} };
      if (fs.existsSync(this.recentMediaFile)) {
        try {
          const raw = fs.readFileSync(this.recentMediaFile, 'utf8');
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed.items === 'object') {
            data = parsed;
          }
        } catch (_) {}
      }
      data.items[mediaKey] = {
        ...state,
        lastWatchedAt: Date.now()
      };
      // Keep only 50 most recent media entries
      const keys = Object.keys(data.items);
      if (keys.length > 50) {
        keys.sort((a, b) => (data.items[b].lastWatchedAt || 0) - (data.items[a].lastWatchedAt || 0));
        const pruned = {};
        keys.slice(0, 50).forEach(k => { pruned[k] = data.items[k]; });
        data.items = pruned;
      }
      data.updatedAt = Date.now();
      return this.atomicWrite(this.recentMediaFile, data);
    } catch (e) {
      return false;
    }
  }
}

module.exports = StorageManager;
