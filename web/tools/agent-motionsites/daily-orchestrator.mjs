import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runFetchPipeline } from './fetch-prompts.mjs';
import { compileAndIntegratePrompt } from './auto-compiler.mjs';
import { pushAndDeploy } from './push-and-deploy.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(resolve(__dirname, 'config.json'), 'utf8'));
const logsDir = resolve(__dirname, 'logs');
if (!existsSync(logsDir)) mkdirSync(logsDir, { recursive: true });

export function putComputerToSleep(logFn = console.log) {
  logFn('Step 5: Putting PC back into S3 Sleep mode (preserving RTC Wake Timers for next 06:00 AM run)...');
  try {
    // Use SetSuspendState(Suspend, false, false) so Hibernate is NOT forced and Wake Events remain ENABLED
    execSync(
      'powershell -NoProfile -Command "Start-Sleep -Seconds 3; Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Application]::SetSuspendState([System.Windows.Forms.PowerState]::Suspend, $false, $false)"',
      { stdio: 'inherit' }
    );
  } catch (err) {
    logFn(`Warning triggering sleep: ${err.message}`);
  }
}

export async function runDailyOrchestrator(options = {}) {
  const startTime = new Date();
  const dateStr = startTime.toLocaleDateString('sv-SE', { timeZone: config.timezone || 'Asia/Ho_Chi_Minh' });
  const logFile = resolve(logsDir, `run-${dateStr}.log`);
  const shouldSleep = options.sleepAfterRun ?? (process.argv.includes('--sleep') || process.argv.includes('--scheduled'));

  function log(msg) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${msg}`;
    console.log(line);
    try {
      writeFileSync(logFile, line + '\n', { flag: 'a', encoding: 'utf8' });
    } catch {}
  }

  log('========================================================');
  log('Starting MotionSites 2A Daily Agent Execution (06:00 AM Schedule)');
  log(`Local Time: ${startTime.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
  log(`Quota Policy: ${config.dailyLimit} templates/day (${config.dailyFreeQuota ?? 1} Free + ${config.dailyPremiumQuota ?? 2} Premium)`);
  log('========================================================');

  // Step 1 & 2: Access motionsites.ai, check free templates & copy prompts (up to daily limit 3)
  log('Step 1 & 2: Checking motionsites.ai for free templates and copying prompts (strict 5-layer deduplication)...');
  let fetchedList = [];
  try {
    fetchedList = await runFetchPipeline();
    log(`Successfully fetched ${fetchedList.length} new unique free prompts.`);
  } catch (err) {
    log(`Error fetching from motionsites: ${err.message}`);
  }

  const statePath = resolve(__dirname, 'state.json');
  const state = JSON.parse(readFileSync(statePath, 'utf8'));
  log(`Current state: todayCopiedCount = ${state.todayCopiedCount} / limit ${config.dailyLimit} (Free: ${state.todayFreeCount || 0}, Premium: ${state.todayPremiumCount || 0}).`);

  // Step 3: Build web templates + 15-20% creative enhancements, package ZIP & record previews
  // Enforce 1 Free + 2 Premium across the daily batch
  const builtSlugs = [];
  const builtResults = [];
  for (let i = 0; i < fetchedList.length; i++) {
    const item = fetchedList[i];
    const tier = item.assignedTier || (i === 0 ? 'free' : 'premium');
    try {
      log(`Step 3 [${i + 1}/${fetchedList.length}]: Building, enhancing (+15-20%), packaging & recording preview for ${item.slug} [tier=${tier}]...`);
      const res = await compileAndIntegratePrompt(item.slug, { tier });
      builtSlugs.push(res.slug);
      builtResults.push(res);
      log(`Completed ${res.title} (${res.catalogId} / ${res.slug} / tier=${res.accessTier}).`);
    } catch (err) {
      log(`Error building ${item.slug}: ${err.message}`);
    }
  }

  // Record history in state.json before commit/push
  if (builtResults.length > 0) {
    state.history = state.history || [];
    state.history.push({
      date: dateStr,
      built: builtResults.map(r => r.slug),
      catalogIds: builtResults.map(r => r.catalogId),
      tiers: Object.fromEntries(builtResults.map(r => [r.slug, r.accessTier]))
    });
    writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
  }

  // Step 4: When daily limit is reached (or batch completed), push & deploy to Vercel
  if (builtSlugs.length > 0) {
    const summaryLabel = builtResults.map(r => `${r.title} ${r.catalogId} [${r.accessTier}]`).join(', ');
    log(`Step 4: Pushing to GitHub & deploying directly to Vercel (${summaryLabel})...`);
    try {
      await pushAndDeploy(builtSlugs, summaryLabel);
      log('Push & Vercel production deploy completed successfully!');
    } catch (err) {
      log(`Push & deploy error: ${err.message}`);
    }
  } else {
    log('No new templates to build or push in this cycle.');
  }

  const durationSec = ((Date.now() - startTime.getTime()) / 1000).toFixed(1);
  log(`Finished daily agent check in ${durationSec}s.`);
  log('========================================================\n');

  // Step 5: Put PC back to Sleep if running in scheduled/sleep mode
  if (shouldSleep) {
    putComputerToSleep(log);
  }
}

if (process.argv[1] && process.argv[1].endsWith('daily-orchestrator.mjs')) {
  runDailyOrchestrator().catch(console.error);
}
