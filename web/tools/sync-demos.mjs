import { cpSync, existsSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const PRODUCT_ROOT = resolve(HERE, '../product/giao-dien-web');
const DEMO_ROOT = resolve(HERE, '../public/demos');
const DEMOS = ['auralis', 'kinetiq', 'japan-trails', 'tidal', 'keystead', 'solenne', 'aeris', 'vybe', 'astra-interior'];

mkdirSync(DEMO_ROOT, { recursive: true });

for (const slug of DEMOS) {
  const source = join(PRODUCT_ROOT, slug, 'source');
  const target = join(DEMO_ROOT, slug);

  if (!existsSync(join(source, 'index.html')) || !existsSync(join(source, 'assets'))) {
    throw new Error(`Demo source is incomplete: ${relative(PRODUCT_ROOT, source)}`);
  }
  if (!target.startsWith(DEMO_ROOT + sep)) {
    throw new Error(`Refusing to write outside public/demos: ${target}`);
  }

  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  cpSync(join(source, 'index.html'), join(target, 'index.html'));
  // Vercel removes trailing slashes; anchor demo assets to their directory.
  const demoHtml = join(target, 'index.html');
  const originalHtml = readFileSync(demoHtml, 'utf8');
  // Auralis also supports the short demo URL without making #links navigate away.
  writeFileSync(demoHtml, slug === 'auralis'
    ? originalHtml.replace(/\b(src|href)="assets\//g, '$1="/demos/auralis/assets/')
    : originalHtml.replace(/<head>/i, `<head><base href="/demos/${slug}/">`));
  cpSync(join(source, 'assets'), join(target, 'assets'), { recursive: true });
  console.log(`Synced ${slug}`);
}
