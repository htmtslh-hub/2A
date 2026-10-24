import { readdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const statePath = resolve(__dirname, 'state.json');
const productsDir = resolve(__dirname, '../../product/giao-dien-web');

const existingDirs = readdirSync(productsDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== 'tools' && d.name !== 'docs')
  .map(d => d.name);

let state = {
  lastRunDate: null,
  todayCopiedCount: 0,
  processedSlugs: existingDirs,
  processedPromptIds: [],
  history: []
};

if (existsSync(statePath)) {
  try {
    const loaded = JSON.parse(readFileSync(statePath, 'utf8'));
    state = {
      ...state,
      ...loaded,
      processedSlugs: Array.from(new Set([...state.processedSlugs, ...(loaded.processedSlugs || [])]))
    };
  } catch (err) {
    console.warn('Could not parse existing state.json, initializing clean state.');
  }
}

writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
console.log(`Initialized state.json with ${state.processedSlugs.length} existing product slugs.`);
