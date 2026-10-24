import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runFetchPipeline } from './fetch-prompts.mjs';
import { compileAndIntegratePrompt } from './auto-compiler.mjs';
import { pushAndDeploy } from './push-and-deploy.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logsDir = resolve(__dirname, 'logs');
if (!existsSync(logsDir)) mkdirSync(logsDir, { recursive: true });

export async function runDailyOrchestrator() {
  const startTime = new Date();
  const dateStr = startTime.toISOString().slice(0, 10);
  const logFile = resolve(logsDir, `run-${dateStr}.log`);

  function log(msg) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${msg}`;
    console.log(line);
    try {
      writeFileSync(logFile, line + '\n', { flag: 'a', encoding: 'utf8' });
    } catch {}
  }

  log('========================================================');
  log('Starting MotionSites 2A Daily Agent Execution');
  log(`Local Time: ${startTime.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
  log('========================================================');

  // Step 1 & 2: Access motionsites.ai, check free templates & copy prompts (up to daily limit 3)
  log('Step 1 & 2: Checking motionsites.ai for free templates and copying prompts...');
  let fetchedList = [];
  try {
    fetchedList = await runFetchPipeline();
    log(`Successfully fetched ${fetchedList.length} new free prompts.`);
  } catch (err) {
    log(`Error fetching from motionsites: ${err.message}`);
  }

  const statePath = resolve(__dirname, 'state.json');
  const state = JSON.parse(readFileSync(statePath, 'utf8'));
  log(`Current state: todayCopiedCount = ${state.todayCopiedCount} / limit 3.`);

  // Step 3: Build web templates + 15-20% creative enhancements, package ZIP & record previews
  const builtSlugs = [];
  for (const item of fetchedList) {
    try {
      log(`Step 3: Building, enhancing (+15-20%), packaging & recording preview for ${item.slug}...`);
      const res = await compileAndIntegratePrompt(item.slug);
      builtSlugs.push(res.slug);
      log(`Completed ${res.title} (${res.catalogId} / ${res.slug}).`);
    } catch (err) {
      log(`Error building ${item.slug}: ${err.message}`);
    }
  }

  // Step 4: When daily limit is reached (or batch completed), push & deploy
  if (builtSlugs.length > 0 && state.todayCopiedCount >= 3) {
    log(`Step 4: Daily free prompt quota reached (${state.todayCopiedCount}/3). Pushing & deploying [${builtSlugs.join(', ')}]...`);
    try {
      await pushAndDeploy(builtSlugs, builtSlugs.join(', '));
      log('Push & deploy completed successfully!');
    } catch (err) {
      log(`Push & deploy error: ${err.message}`);
    }
  } else if (builtSlugs.length > 0) {
    log(`Step 4: Built ${builtSlugs.length} template(s). Pushing & deploying...`);
    try {
      await pushAndDeploy(builtSlugs, builtSlugs.join(', '));
    } catch (err) {
      log(`Push & deploy error: ${err.message}`);
    }
  } else {
    log('No new templates to build or push in this cycle.');
  }

  const durationSec = ((Date.now() - startTime.getTime()) / 1000).toFixed(1);
  log(`Finished daily agent check in ${durationSec}s.`);
  log('========================================================\n');
}

if (process.argv[1] && process.argv[1].endsWith('daily-orchestrator.mjs')) {
  runDailyOrchestrator().catch(console.error);
}
