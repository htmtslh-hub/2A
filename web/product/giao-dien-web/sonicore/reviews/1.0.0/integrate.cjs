const fs = require('node:fs');
const path = require('node:path');

const wt = 'C:/Users/Lenovo/.codex/worktrees/motora-release/2A';
const main = 'd:/3. Dự án/2A';

// 1. preview-recordings.json
const mainRec = JSON.parse(fs.readFileSync(path.join(main, 'web/src/lib/preview-recordings.json'), 'utf8'));
const wtRecPath = path.join(wt, 'web/src/lib/preview-recordings.json');
const wtRec = JSON.parse(fs.readFileSync(wtRecPath, 'utf8'));
wtRec['sonicore'] = mainRec['sonicore'];
fs.writeFileSync(wtRecPath, JSON.stringify(wtRec, null, 2) + '\n');

// 2. real-templates.ts
const wtRtPath = path.join(wt, 'web/src/lib/real-templates.ts');
let wtRt = fs.readFileSync(wtRtPath, 'utf8');
const mainRt = fs.readFileSync(path.join(main, 'web/src/lib/real-templates.ts'), 'utf8');
const t40Block = mainRt.slice(mainRt.indexOf('  t40: {'), mainRt.indexOf('  t39: {'));
if (!wtRt.includes('t40: {')) {
  wtRt = wtRt.replace(
    /export const REAL_TEMPLATES: Record<string, RealTemplate> = \{\r?\n/,
    match => match + t40Block
  );
  fs.writeFileSync(wtRtPath, wtRt);
}

// 3. template-guides.ts
const wtTgPath = path.join(wt, 'web/src/lib/template-guides.ts');
let wtTg = fs.readFileSync(wtTgPath, 'utf8');
const mainTg = fs.readFileSync(path.join(main, 'web/src/lib/template-guides.ts'), 'utf8');
const sonicoreGuideBlock = mainTg.slice(mainTg.indexOf("  'sonicore': {"), mainTg.indexOf("  'firepower': {"));
if (!wtTg.includes("'sonicore': {")) {
  wtTg = wtTg.replace(
    /export const TEMPLATE_GUIDES: Record<string, Record<LangCode, TemplateGuide>> = \{\r?\n/,
    match => match + sonicoreGuideBlock
  );
  fs.writeFileSync(wtTgPath, wtTg);
}

// 4. template-categories.ts
const wtTcPath = path.join(wt, 'web/src/lib/template-categories.ts');
let wtTc = fs.readFileSync(wtTcPath, 'utf8');
if (!wtTc.includes("'sonicore'")) {
  wtTc = wtTc.replace("'dualplay': 'commerce',", "'dualplay': 'commerce', 'sonicore': 'commerce',");
  fs.writeFileSync(wtTcPath, wtTc);
}

// 5. view.ts
const wtViewPath = path.join(wt, 'web/src/lib/view.ts');
let wtView = fs.readFileSync(wtViewPath, 'utf8');
if (!wtView.includes("'sonicore'")) {
  wtView = wtView.replace("'airmax-plus', 'backbest-800']", "'airmax-plus', 'backbest-800', 'sonicore']");
  fs.writeFileSync(wtViewPath, wtView);
}

console.log('Integrated t40 (sonicore) into release worktree.');
