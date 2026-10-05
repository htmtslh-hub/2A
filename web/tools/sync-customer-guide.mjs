// Public customer content only. Never copy internal product standards or paid source files.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const guideSources = {
  vi: 'web/product/giao-dien-web/docs/customer-guide.md',
  en: 'web/product/giao-dien-web/docs/customer-guide.en.md',
  zh: 'web/product/giao-dien-web/docs/customer-guide.zh.md',
};

function parseGuide(lang, file) {
  const markdown = readFileSync(resolve(root, file), 'utf8').replace(/\r\n/g, '\n');
  const prompts = [];
  const ids = ['chuan-bi', ...Array.from({ length: 10 }, (_, i) => `buoc-${i + 1}`), 'xu-ly-loi', 'checklist'];
  const stepPattern = lang === 'vi' ? /^Bước (\d+)/ : lang === 'en' ? /^Step (\d+)/ : /^步骤 (\d+)/;
  const sections = markdown.split(/^## /m).slice(1).map((part, index) => {
    const newline = part.indexOf('\n');
    const rawTitle = part.slice(0, newline);
    const step = rawTitle.match(stepPattern)?.[1];
    const id = ids[index];
    if (!id) throw new Error(`${file} has an unexpected section: ${rawTitle}`);
    const title = rawTitle.replace(/ [—–-] /g, ' · ');
    const body = part.slice(newline).trim().replace(
      /\*\*Prompt (\d+) [—–-] (.*?)\*\*\n\n```text\n([\s\S]*?)\n```/g,
      (_, number, label, text) => {
        const promptId = `prompt-${number}`;
        prompts.push({
          id: promptId,
          number,
          title: label.replace(/[—–]/g, '-'),
          text: text.replace(/[—–]/g, '-'),
          section: id,
        });
        return `@@${promptId}@@`;
      },
    ).replace(/ [—–] /g, ' · ');
    return { id, title, body, step: step ? Number(step) : null };
  });
  if (sections.length !== 13 || prompts.length !== 12 || sections.filter(s => s.step).length !== 10) {
    throw new Error(`${file} must contain 13 sections, 10 steps and 12 complete prompts.`);
  }
  return { sections, prompts };
}

const locales = Object.fromEntries(
  Object.entries(guideSources).map(([lang, file]) => [lang, parseGuide(lang, file)]),
);
const templates = Object.fromEntries(['kinetiq', 'tidal', 'keystead', 'solenne', 'aeris', 'vybe'].map(slug => [slug,
  readFileSync(resolve(root, 'web/product/giao-dien-web', slug, 'source/CUSTOMISE.md'), 'utf8'),
]));
const output = resolve(root, 'web/src/content/customer-guide.json');
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, JSON.stringify({ locales, templates }, null, 2) + '\n');
console.log(`Synced 3 languages, 13 sections and 12 prompts per language, plus ${Object.keys(templates).length} template documents.`);
