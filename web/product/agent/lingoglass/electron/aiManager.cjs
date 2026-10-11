const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class AIManager {
  constructor(userDataDir) {
    this.userDataDir = userDataDir || process.cwd();
    this.pythonPath = this.detectPython();
    this.activeProcess = null;
    // Pre-extract script if needed
    this.getEngineScriptPath();
  }

  detectPython() {
    const custom = process.env.PYTHON_PATH;
    if (custom && fs.existsSync(custom)) return custom;

    const candidatePaths = [
      'C:\\Users\\htmts\\AppData\\Local\\Programs\\Python\\Python312\\python.exe',
      path.join(process.env.LOCALAPPDATA || '', 'Programs\\Python\\Python312\\python.exe'),
      path.join(process.env.LOCALAPPDATA || '', 'Programs\\Python\\Python311\\python.exe')
    ];

    for (const p of candidatePaths) {
      if (fs.existsSync(p)) return p;
    }
    return 'python';
  }

  getEngineScriptPath() {
    const directPath = path.join(__dirname, 'ai_subtitle_engine.py');

    // 1. If running outside asar (dev or regular folder)
    if (!directPath.includes('app.asar') && fs.existsSync(directPath)) {
      return directPath;
    }

    // 2. If packaged with asarUnpack
    const unpackedPath = directPath.replace('app.asar', 'app.asar.unpacked');
    if (fs.existsSync(unpackedPath)) {
      return unpackedPath;
    }

    // 3. Fallback: Extract from app.asar into userDataDir so Python can execute it
    try {
      if (!fs.existsSync(this.userDataDir)) {
        fs.mkdirSync(this.userDataDir, { recursive: true });
      }
      const targetPath = path.join(this.userDataDir, 'ai_subtitle_engine.py');
      // Node inside Electron can read from app.asar transparently
      const content = fs.readFileSync(directPath, 'utf-8');
      fs.writeFileSync(targetPath, content, 'utf-8');
      return targetPath;
    } catch (err) {
      console.error('[AIManager] Error extracting ai_subtitle_engine.py:', err);
      return directPath;
    }
  }

  getEnhancedEnv() {
    const env = {
      ...process.env,
      PYTHONIOENCODING: 'utf-8',
      HF_HUB_DISABLE_PROGRESS_BARS: '1',
      TOKENIZERS_PARALLELISM: 'false'
    };

    const extraPaths = [
      'C:\\Users\\htmts\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.2-full_build\\bin',
      'C:\\Users\\htmts\\AppData\\Local\\Microsoft\\WinGet\\Links',
      'C:\\Users\\htmts\\AppData\\Local\\Programs\\Python\\Python312',
      'C:\\Users\\htmts\\AppData\\Local\\Programs\\Python\\Python312\\Scripts'
    ];

    const currentPath = env.PATH || env.Path || '';
    const newPaths = extraPaths.filter(p => fs.existsSync(p));
    env.PATH = newPaths.join(path.delimiter) + path.delimiter + currentPath;
    env.Path = env.PATH;
    return env;
  }

  async checkGpu() {
    return new Promise((resolve) => {
      try {
        const script = this.getEngineScriptPath();
        const proc = spawn(this.pythonPath, [script, '--action', 'check_gpu'], {
          windowsHide: true,
          env: this.getEnhancedEnv()
        });

        let output = '';
        let errOutput = '';
        proc.stdout.on('data', (d) => { output += d.toString('utf-8'); });
        proc.stderr.on('data', (d) => { errOutput += d.toString('utf-8'); });

        proc.on('close', (code) => {
          try {
            const lines = output.trim().split('\n');
            for (const line of lines) {
              const parsed = JSON.parse(line.trim());
              if (parsed.type === 'gpu_status') {
                return resolve(parsed);
              }
            }
          } catch (e) {}
          if (errOutput) console.warn('[AIManager checkGpu stderr]:', errOutput);
          resolve({ cudaAvailable: false, gpuName: 'N/A' });
        });
        proc.on('error', (err) => {
          console.error('[AIManager checkGpu error]:', err);
          resolve({ cudaAvailable: false, gpuName: 'N/A' });
        });
      } catch (err) {
        resolve({ cudaAvailable: false, gpuName: 'N/A' });
      }
    });
  }

  async generateSubtitles(mediaPath, options = {}, onProgress = null) {
    return new Promise((resolve) => {
      if (!fs.existsSync(mediaPath)) {
        return resolve({ success: false, error: `File media không tồn tại: ${mediaPath}` });
      }

      const model = options.model || 'base';
      const targetLang = options.targetLang || 'vi';
      const sourceLang = options.sourceLang || 'auto';
      const device = options.device || 'cuda';
      const script = this.getEngineScriptPath();

      const args = [
        script,
        '--action', 'transcribe',
        '--input', mediaPath,
        '--model', model,
        '--source-lang', sourceLang,
        '--target-lang', targetLang,
        '--device', device
      ];

      const proc = spawn(this.pythonPath, args, {
        windowsHide: true,
        env: this.getEnhancedEnv()
      });

      this.activeProcess = proc;
      let resultData = null;
      let errorMsg = '';
      let stderrMsg = '';

      proc.stdout.on('data', (chunk) => {
        const lines = chunk.toString('utf-8').split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const data = JSON.parse(trimmed);
            if (data.type === 'progress' && onProgress) {
              onProgress(data);
            } else if (data.type === 'info' && onProgress) {
              onProgress(data);
            } else if (data.type === 'success') {
              resultData = data;
            } else if (data.type === 'error') {
              errorMsg = data.message;
            }
          } catch (e) {
            // Non-JSON debug output
          }
        }
      });

      proc.stderr.on('data', (d) => {
        const text = d.toString('utf-8');
        stderrMsg += text;
        console.warn('[Python AI STDERR]', text);
      });

      proc.on('close', (code) => {
        this.activeProcess = null;
        if (resultData && resultData.cues) {
          resolve({
            success: true,
            cues: resultData.cues,
            count: resultData.count,
            detectedLanguage: resultData.detectedLanguage
          });
        } else {
          const cleanErr = stderrMsg ? stderrMsg.trim().split('\n').pop() : '';
          const finalError = errorMsg || cleanErr || `Quá trình AI kết thúc với mã lỗi: ${code}`;
          console.error('[AIManager] Transcription error:', finalError);
          resolve({
            success: false,
            error: finalError
          });
        }
      });

      proc.on('error', (err) => {
        this.activeProcess = null;
        resolve({ success: false, error: `Không thể khởi động tiến trình Python: ${err.message}` });
      });
    });
  }

  async translateCues(cues, options = {}, onProgress = null) {
    return new Promise((resolve) => {
      if (!cues || cues.length === 0) {
        return resolve({ success: true, cues: [] });
      }

      const tempFile = path.join(this.userDataDir, `trans_temp_${Date.now()}.json`);
      try {
        fs.writeFileSync(tempFile, JSON.stringify(cues, null, 2), 'utf-8');
      } catch (err) {
        return resolve({ success: false, error: 'Không thể tạo file tạm để dịch' });
      }

      const targetLang = options.targetLang || 'vi';
      const sourceLang = options.sourceLang || 'en';
      const script = this.getEngineScriptPath();

      const args = [
        script,
        '--action', 'translate_only',
        '--input', tempFile,
        '--source-lang', sourceLang,
        '--target-lang', targetLang
      ];

      const proc = spawn(this.pythonPath, args, {
        windowsHide: true,
        env: this.getEnhancedEnv()
      });

      this.activeProcess = proc;
      let resultData = null;
      let stderrMsg = '';

      proc.stdout.on('data', (chunk) => {
        const lines = chunk.toString('utf-8').split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const data = JSON.parse(trimmed);
            if (data.type === 'progress' && onProgress) {
              onProgress(data);
            } else if (data.type === 'success') {
              resultData = data;
            }
          } catch (e) {}
        }
      });

      proc.stderr.on('data', (d) => {
        stderrMsg += d.toString('utf-8');
      });

      proc.on('close', (code) => {
        this.activeProcess = null;
        try { if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile); } catch (e) {}

        if (resultData && resultData.cues) {
          resolve({ success: true, cues: resultData.cues });
        } else {
          resolve({ success: false, error: stderrMsg || 'Không thể dịch phụ đề bằng GPU' });
        }
      });

      proc.on('error', (err) => {
        this.activeProcess = null;
        try { if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile); } catch (e) {}
        resolve({ success: false, error: err.message });
      });
    });
  }

  cancelActiveTask() {
    if (this.activeProcess) {
      try {
        this.activeProcess.kill();
      } catch (e) {}
      this.activeProcess = null;
      return true;
    }
    return false;
  }
}

module.exports = AIManager;
