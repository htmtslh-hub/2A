import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const root = 'web/product/giao-dien-web/novatrend';
const text = readFileSync(root + '/source/CUSTOMISE.md', 'utf8');
const counts = [];
for (const match of text.matchAll(/^\| `([^`]+)` \| `([^`]+)` \| (\d+) \|/gm)) {
  const [, file, needle, expected] = match;
  const actual = readFileSync(root + '/source/' + file, 'utf8').split(needle).length - 1;
  assert.equal(actual, Number(expected), needle);
  counts.push({ file, needle, expected: Number(expected), actual });
}
const bytes = readFileSync(root + '/novatrend.zip');
writeFileSync(root + '/reviews/1.1.0/package.json', JSON.stringify({ bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), counts }, null, 2));
console.log('Final edit map PASS', counts.length, 'rows');
