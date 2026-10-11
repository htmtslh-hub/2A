const path = require('path');
const fs = require('fs');

async function testFetch() {
  const filePath = 'D:/3. Agent/3-app/1-mkv/speech_sample.wav';
  console.log('File exists:', fs.existsSync(filePath));

  try {
    const rawUrl = 'file:///' + filePath.replace(/\\/g, '/');
    console.log('Trying rawUrl:', rawUrl);
    // In Node 18+, fetch exists
    const res1 = await fetch(rawUrl);
    console.log('res1 status:', res1.status);
  } catch (e) {
    console.error('res1 error:', e.message);
  }

  try {
    const urlModule = require('url');
    const properFileUrl = urlModule.pathToFileURL(filePath).toString();
    console.log('Trying properFileUrl:', properFileUrl);
    const res2 = await fetch(properFileUrl);
    console.log('res2 status:', res2.status);
  } catch (e) {
    console.error('res2 error:', e.message);
  }
}

testFetch();
