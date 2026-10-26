import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runPinterestFetchPipeline } from './fetch-pinterest.mjs';
import { compilePinterestTemplate } from './pinterest-compiler.mjs';
import { pushAndDeploy } from '../agent-motionsites/push-and-deploy.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../../');
const config = JSON.parse(readFileSync(resolve(__dirname, 'config.json'), 'utf8'));
const logsDir = resolve(__dirname, 'logs');
if (!existsSync(logsDir)) mkdirSync(logsDir, { recursive: true });

export function shutdownComputer(logFn = console.log) {
  logFn('Step 6: Shutting down PC completely (shutdown.exe /s /f /t 15)...');
  try {
    execSync('shutdown.exe /s /f /t 15 /c "ForgeZone 09:00 AM Pinterest Daily Agent completed all 5 templates, pushed to GitHub & deployed to Vercel. Shutting down PC."', {
      stdio: 'inherit'
    });
  } catch (err) {
    logFn(`Warning triggering shutdown: ${err.message}`);
  }
}

export async function runDailyPinterestOrchestrator(options = {}) {
  const startTime = new Date();
  const dateStr = startTime.toLocaleDateString('sv-SE', { timeZone: config.timezone || 'Asia/Ho_Chi_Minh' });
  const logFile = resolve(logsDir, `run-${dateStr}.log`);
  const shouldShutdown = false;

  function log(msg) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${msg}`;
    console.log(line);
    try {
      writeFileSync(logFile, line + '\n', { flag: 'a', encoding: 'utf8' });
    } catch {}
  }

  log('========================================================');
  log('Starting Pinterest Web Design 2A Daily Agent Execution (09:00 AM Schedule)');
  log(`Local Time: ${startTime.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
  log(`Quota Policy: ${config.dailyLimit} templates/day (${config.dailyFreeQuota ?? 2} Free + ${config.dailyPremiumQuota ?? 3} Premium)`);
  log('========================================================');

  // Step 1, 2 & 3a: Access pinterest.com/homefeed/, search web design keywords & download high-res images
  log('Steps 1-3a: Accessing pinterest.com/homefeed/, searching web design keywords & downloading 5 unique reference images...');
  let fetchedList = [];
  try {
    fetchedList = await runPinterestFetchPipeline();
    log(`Successfully discovered & downloaded ${fetchedList.length} unique Pinterest web design pins.`);
  } catch (err) {
    log(`Error fetching from Pinterest: ${err.message}`);
  }

  const statePath = resolve(__dirname, 'state.json');
  const state = JSON.parse(readFileSync(statePath, 'utf8'));
  log(`Current state: todayCreatedCount = ${state.todayCreatedCount} / limit ${config.dailyLimit} (Free: ${state.todayFreeCount || 0}, Premium: ${state.todayPremiumCount || 0}).`);

  // Step 3b & 4: Build web templates inspired by downloaded Pinterest images, add scroll/hover/3D animations, QA test & package
  const builtSlugs = [];
  const builtResults = [];
  for (let i = 0; i < fetchedList.length; i++) {
    const item = fetchedList[i];
    const tier = item.assignedTier || (i < 2 ? 'free' : 'premium');
    try {
      log(`Step 3b & 4 [${i + 1}/${fetchedList.length}]: Analyzing image palette, building template, running 4-viewport QA, packaging ZIP & recording preview for ${item.slug} (Pin ${item.pinId}, tier=${tier})...`);
      const res = await compilePinterestTemplate(item.slug, { tier });
      builtSlugs.push(res.slug);
      builtResults.push(res);
      log(`Completed ${res.title} (${res.catalogId} / ${res.slug} / tier=${res.accessTier}).`);
    } catch (err) {
      log(`Error building ${item.slug}: ${err.message}`);
    }
  }

  // Record history in state.json and cross-sync slugs with agent-motionsites/state.json
  if (builtResults.length > 0) {
    state.history = state.history || [];
    state.history.push({
      date: dateStr,
      built: builtResults.map(r => r.slug),
      catalogIds: builtResults.map(r => r.catalogId),
      pinIds: fetchedList.map(f => f.pinId),
      tiers: Object.fromEntries(builtResults.map(r => [r.slug, r.accessTier]))
    });
    writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');

    // Sync slugs to agent-motionsites/state.json so the 06:00 AM and 09:00 AM agents never collide
    const motionStatePath = resolve(root, 'web/tools/agent-motionsites/state.json');
    if (existsSync(motionStatePath)) {
      try {
        const motionState = JSON.parse(readFileSync(motionStatePath, 'utf8'));
        motionState.processedSlugs = Array.from(new Set([...(motionState.processedSlugs || []), ...builtSlugs]));
        writeFileSync(motionStatePath, JSON.stringify(motionState, null, 2), 'utf8');
      } catch {}
    }
  }

  // Step 5: Push to GitHub & deploy directly to Vercel Production
  if (builtSlugs.length > 0) {
    const summaryLabel = builtResults.map(r => `${r.title} ${r.catalogId} [${r.accessTier}]`).join(', ');
    log(`Step 5: Pushing to GitHub & deploying directly to Vercel (${summaryLabel})...`);
    try {
      await pushAndDeploy(builtSlugs, `Pinterest Batch: ${summaryLabel}`);
      log('Push & Vercel production deploy completed successfully!');
    } catch (err) {
      log(`Push & deploy error: ${err.message}`);
    }
  } else {
    log('No new Pinterest templates to build or push in this cycle.');
  }

  const durationSec = ((Date.now() - startTime.getTime()) / 1000).toFixed(1);
  log(`Finished Pinterest daily agent execution in ${durationSec}s.`);
  log('========================================================\n');

  // Step 6: Shut down PC completely when all work is done
  if (shouldShutdown) {
    shutdownComputer(log);
  }
}

if (process.argv[1] && process.argv[1].endsWith('daily-pinterest-orchestrator.mjs')) {
  runDailyPinterestOrchestrator().catch(console.error);
}
