// Bygger content/index.json från filerna i content/ och kontrollerar innehållet.
// Kör: node tools/bygg-index.mjs   (kräver Node 18+, inga beroenden)
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rot = join(dirname(fileURLToPath(import.meta.url)), '..', 'content');
const mappar = ['teorier', 'metoder', 'sidor'];
const index = {};
const fel = [], varningar = [];
const ids = new Set(), lankar = [];

for (const m of mappar) {
  index[m] = readdirSync(join(rot, m)).filter((f) => f.endsWith('.md')).sort();
  for (const f of index[m]) {
    const txt = readFileSync(join(rot, m, f), 'utf8');
    const fm = txt.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!fm) { fel.push(`${m}/${f}: saknar frontmatter mellan --- och ---`); continue; }
    const id = (fm[1].match(/^id:\s*(.+)$/m) || [])[1]?.trim();
    if (!id) fel.push(`${m}/${f}: saknar id`);
    else if (ids.has(id)) fel.push(`${m}/${f}: id "${id}" används redan`);
    else ids.add(id);
    if (!/^namn:/m.test(fm[1])) fel.push(`${m}/${f}: saknar namn`);
    if (m !== 'sidor') for (const n of [1, 2, 3, 4]) if (!new RegExp(`^## Nivå ${n}`, 'm').test(txt)) varningar.push(`${m}/${f}: saknar "## Nivå ${n}"`);
    for (const r of txt.matchAll(/\[\[([\w-]+)/g)) lankar.push([`${m}/${f}`, r[1]]);
    for (const r of fm[1].matchAll(/^\s+doi:\s*(\S+)/gm)) if (!/^10\.\d{4,9}\/\S+$/.test(r[1])) fel.push(`${m}/${f}: ogiltig DOI ${r[1]}`);
    for (const k of ['metoder', 'teorier', 'relaterade']) {
      const v = fm[1].match(new RegExp(`^${k}:\\s*\\[(.*)\\]`, 'm'));
      if (v) v[1].split(',').map((s) => s.trim()).filter(Boolean).forEach((x) => lankar.push([`${m}/${f} (${k})`, x]));
    }
  }
}
for (const [fil, id] of lankar) if (!ids.has(id)) varningar.push(`${fil}: hänvisar till okänt id "${id}"`);

writeFileSync(join(rot, 'index.json'), JSON.stringify(index, null, 2) + '\n');
varningar.forEach((v) => console.warn('Varning:', v));
fel.forEach((v) => console.error('Fel:', v));
console.log(`index.json uppdaterad: ${index.teorier.length} teorier, ${index.metoder.length} metoder, ${index.sidor.length} sidor.`);
if (fel.length) process.exit(1);
