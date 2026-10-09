const AIManager = require('../electron/aiManager.cjs');
const ai = new AIManager(__dirname);

async function run() {
  console.log('Testing GPU detection...');
  const gpu = await ai.checkGpu();
  console.log('GPU result:', gpu);

  console.log('Testing transcription on speech_sample.wav...');
  const res = await ai.generateSubtitles('speech_sample.wav', { model: 'base', targetLang: 'vi' }, (prog) => {
    console.log('Progress:', prog);
  });
  console.log('Final Result:', JSON.stringify(res, null, 2));
}

run();
