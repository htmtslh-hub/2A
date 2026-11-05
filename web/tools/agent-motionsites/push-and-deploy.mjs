import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../../');
const webRoot = resolve(root, 'web');
const codexVercelConfig = 'C:\\Users\\htmts\\AppData\\Local\\Packages\\OpenAI.Codex_2p2nqsd0c76g0\\LocalCache\\Roaming\\com.vercel.cli\\Data';

export async function pushAndDeploy(slugs, summaryLabel) {
  const list = Array.isArray(slugs) ? slugs : [slugs];
  console.log(`\n=== PUSH & DEPLOY: ${summaryLabel || list.join(', ')} ===`);

  // 1. Verify TypeScript, Memberships & Preview Recordings
  console.log('--> Checking membership policy, preview recordings & TypeScript typecheck...');
  execSync('node web/tools/check-memberships.cjs', { cwd: root, stdio: 'inherit' });
  execSync('node web/tools/check-preview-recordings.mjs', { cwd: root, stdio: 'inherit' });
  execSync('npm.cmd run typecheck', { cwd: webRoot, stdio: 'inherit' });

  // 2. Stage product files & catalog
  console.log('--> Staging files for git commit...');
  const filesToStage = [
    ...list.flatMap(slug => [
      `web/product/giao-dien-web/${slug}/`,
      `web/public/demos/${slug}/`,
      `web/public/previews/${slug}.webp`,
      `web/public/previews/${slug}-tablet.webp`,
      `web/public/previews/${slug}-mobile.webp`,
      `web/public/previews/${slug}.mp4`,
      `web/product/giao-dien-web/reviews/video-previews/${slug}.json`,
      `web/product/giao-dien-web/reviews/video-previews/screenshots/${slug}-*`
    ]),
    'web/src/lib/real-templates.ts',
    'web/src/lib/template-categories.ts',
    'web/src/lib/template-guides.ts',
    'web/src/lib/preview-recordings.json',
    'web/src/lib/drive-manifest.json',
    'web/product/giao-dien-web/tools/dong-goi.mjs',
    'web/product/giao-dien-web/tools/evaluate-forgescore.mjs',
    'web/product/giao-dien-web/tools/quay-preview.mjs',
    'web/tools/check-memberships.cjs',
    'web/tools/agent-motionsites/',
    'web/tools/agent-pinterest/',
    'run-agent-now.bat',
    'run-pinterest-agent-now.bat'
  ];

  for (const f of filesToStage) {
    try {
      execSync(`git add ${f}`, { cwd: root, stdio: 'inherit' });
    } catch (e) {
      console.warn(`Warning staging ${f}:`, e.message);
    }
  }

  // 3. Commit
  const commitMsg = `Add MotionSites daily web templates (${summaryLabel || list.join(', ')}) and 24/7 agent pipeline`;
  console.log(`--> Creating atomic commit: "${commitMsg}"...`);
  try {
    execSync(`git commit -m "${commitMsg}"`, { cwd: root, stdio: 'inherit' });
  } catch {
    console.log('Nothing to commit or already committed.');
  }

  // 4. Push to remote master
  console.log('--> Pushing to origin master...');
  execSync('git push origin master', { cwd: root, stdio: 'inherit' });

  // 5. Deploy directly to Vercel Production (https://forgezone.store)
  console.log('--> Deploying to Vercel Production (https://forgezone.store)...');
  const globalConfigFlag = existsSync(codexVercelConfig) ? ` -Q "${codexVercelConfig}"` : '';
  if (!existsSync(resolve(webRoot, '.vercel/project.json'))) {
    execSync(`npx.cmd vercel link --project web --yes${globalConfigFlag}`, { cwd: webRoot, stdio: 'inherit' });
  }
  execSync(`npx.cmd vercel deploy --prod --yes${globalConfigFlag}`, { cwd: webRoot, stdio: 'inherit' });

  // 6. Auto-prune superseded deployments on Vercel so only the latest Production deployment remains
  try {
    const authFile = resolve(codexVercelConfig, 'auth.json');
    const projFile = resolve(webRoot, '.vercel/project.json');
    if (existsSync(authFile) && existsSync(projFile)) {
      const { readFileSync } = await import('node:fs');
      const { token } = JSON.parse(readFileSync(authFile, 'utf8'));
      const { projectId, orgId } = JSON.parse(readFileSync(projFile, 'utf8'));
      const headers = { Authorization: `Bearer ${token}` };
      const r = await fetch(`https://api.vercel.com/v6/deployments?teamId=${orgId}&projectId=${projectId}&limit=50`, { headers });
      const data = await r.json();
      const readyDpls = (data.deployments || []).filter(d => d.state === 'READY');
      const latestProdUid = readyDpls[0]?.uid;
      for (const d of (data.deployments || [])) {
        if (d.uid !== latestProdUid) {
          await fetch(`https://api.vercel.com/v13/deployments/${d.uid}?teamId=${orgId}`, { method: 'DELETE', headers }).catch(() => {});
        }
      }
      console.log(`--> Auto-pruned old Vercel deployments (retained active: ${latestProdUid}).`);
    }
  } catch (e) {
    console.warn('Warning pruning old Vercel deployments:', e.message);
  }

  console.log('--> Successfully pushed to GitHub master and deployed to https://forgezone.store!');
  return true;
}

