// Content rule from the design handoff: no em dashes anywhere in the built page.
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const hits = html.split('\n').map((line, i) => [i + 1, line]).filter(([, line]) => line.includes('—'));
if (hits.length) {
  for (const [n, line] of hits) console.error(`dist/index.html:${n}: em dash: ${line.trim().slice(0, 120)}`);
  process.exit(1);
}
console.log('copy check: no em dashes in dist/index.html');
