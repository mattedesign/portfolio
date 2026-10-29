// Content rule from the design handoff: no em dashes anywhere in the pages this site authors.
// The embedded examples under dist/samples/examples are earlier work and are not checked.
import { readFileSync } from 'node:fs';

const pages = ['dist/index.html', 'dist/samples/index.html', 'dist/unlock/index.html'];
let bad = 0;
for (const page of pages) {
  const html = readFileSync(new URL('../' + page, import.meta.url), 'utf8');
  const hits = html.split('\n').map((line, i) => [i + 1, line]).filter(([, line]) => line.includes('—'));
  for (const [n, line] of hits) console.error(`${page}:${n}: em dash: ${line.trim().slice(0, 120)}`);
  bad += hits.length;
}
if (bad) process.exit(1);
console.log('copy check: no em dashes in ' + pages.join(', '));
