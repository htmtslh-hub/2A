import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../../');

export async function pushAndDeploy(slugs, summaryLabel) {
  const list = Array.isArray(slugs) ? slugs : [slugs];
  console.log(`\n=== PUSH & DEPLOY: ${summaryLabel || list.join(', ')} ===`);

  // 1. Verify TypeScript & Memberships
  console.log('--> Checking membership policy & TypeScript typecheck...');
  execSync('node web/tools/check-memberships.cjs', { cwd: root, stdio: 'inherit' });
  execSync('npm.cmd run typecheck', { cwd: resolve(root, 'web'), stdio: 'inherit' });

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
    'web/product/giao-dien-web/tools/dong-goi.mjs',
    'web/product/giao-dien-web/tools/quay-preview.mjs',
    'web/tools/agent-motionsites/',
    'run-agent-now.bat'
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

  // 4. Push to remote master (triggers Vercel production deployment)
  console.log('--> Pushing to origin master...');
  execSync('git push origin master', { cwd: root, stdio: 'inherit' });
  console.log('--> Successfully pushed to GitHub master. Vercel deployment triggered automatically!');
}
