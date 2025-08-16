import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'assets', 'data');
const countriesDir = path.join(dataDir, 'countries');
const outFile = path.join(dataDir, 'search-index.json');

function slugify(s='') {
return s.toLowerCase()
.replace(/&/g, 'and')
.replace(/[^a-z0-9]+/g, '-')
.replace(/^-+|-+$/g, '');
}

async function readJSON(file, fallback=null) {
try {
const raw = await fs.readFile(file, 'utf8');
return JSON.parse(raw);
} catch {
return fallback;
}
}

async function exists(p) {
try { await fs.stat(p); return true; } catch { return false; }
}

async function buildCountries() {
const idxFile = path.join(countriesDir, '_index.json');
const list = await readJSON(idxFile, []);
return list.map(c => ({
type: 'country',
slug: c.slug,
title: `${c.name} — Country Profile`,
summary: c.summary || '',
url: `/countries/view.html?slug=${encodeURIComponent(c.slug)}`
}));
}

async function buildBoycotts() {
const files = ['boycotts-supporting.json', 'boycotts-supportive.json'];
const items = [];
for (const f of files) {
const p = path.join(dataDir, f);
const arr = await readJSON(p, []);
for (const entry of arr) {
const slug = slugify(entry.name);
items.push({
type: f.includes('supportive') ? 'boycott-supportive' : 'boycott-supporting',
slug,
title: entry.name,
summary: entry.rationale || '',
url: f.includes('supportive') ? `/boycott/supportive.html#${slug}` : `/boycott/supporting.html#${slug}`
});
}
}
return items;
}

async function buildJournalists() {
const file = path.join(dataDir, 'journalists.json');
const arr = await readJSON(file, []);
return arr.map(j => {
const slug = slugify(j.name);
return {
type: 'journalist',
slug,
title: j.name,
summary: j.bio || '',
url: `/journalists/index.html#${slug}`
};
});
74 | }
 75 | 
 76 | async function buildFeatures() {
 77 |   // Add feature articles you want searchable here:
 78 |   const items = [];
 79 |   const abductions = await readJSON(path.join(dataDir, 'abductions-2008-2023.json'), null);
 80 |   if (abductions) {
 81 |     items.push({
 82 |       type: 'article',
 83 |       slug: 'abductions-2008-2023',
 84 |       title: 'Abductions & Detentions of Children (2008–2023)',
 85 |       summary: (abductions.meta && abductions.meta.title) ? abductions.meta.title : 'Dataset and charts (2008–2023)',
 86 |       url: '/features/abductions-2008-2023.html'
 87 |     });
 88 |   }
 89 |   return items;
 90 | }
}

async function buildMovements() {
  const items = [];
  items.push({
    type: 'movement',
    slug: 'youth',
    title: 'Palestinian Youth Movement',
    summary: 'Information and resources about the Palestinian youth movement.',
    url: '/movements/youth.html'
  });
  items.push({
    type: 'movement',
    slug: 'labor',
    title: 'Palestinian Labor Movement',
    summary: 'Information and resources about the Palestinian labor movement.',
    url: '/movements/labor.html'
  });
  return items;
}

112 | });

async function buildFeatures() {
  // Add feature articles you want searchable here:
  const items = [];
  const abductions = await readJSON(path.join(dataDir, 'abductions-2008-2023.json'), null);
  if (abductions) {
    items.push({
      type: 'article',
      slug: 'abductions-2008-2023',
      title: 'Abductions & Detentions of Children (2008–2023)',
      summary: (abductions.meta && abductions.meta.title) ? abductions.meta.title : 'Dataset and charts (2008–2023)',
      url: '/features/abductions-2008-2023.html'
    });
  }
  return items;
}
async function main() {
  const parts = [];
  if (await exists(countriesDir)) parts.push(...await buildCountries());
  parts.push(...await buildBoycotts());
  parts.push(...await buildJournalists());
  parts.push(...await buildFeatures());
  parts.push(...await buildMovements());

137 | }
 138 | 
 139 | async function buildFeatures() {
 140 |   // Add feature articles you want searchable here:
 141 |   const items = [];
 142 |   const abductions = await readJSON(path.join(dataDir, 'abductions-2008-2023.json'), null);
 143 |   if (abductions) {
 144 |     items.push({
 145 |       type: 'article',
 146 |       slug: 'abductions-2008-2023',
 147 |       title: 'Abductions & Detentions of Children (2008–2023)',
 148 |       summary: (abductions.meta && abductions.meta.title) ? abductions.meta.title : 'Dataset and charts (2008–2023)',
 149 |       url: '/features/abductions-2008-2023.html'
 150 |     });
 151 |   }
 152 |   return items;
 153 | }
 154 | 
 155 | async function buildMovements() {
 156 |   const items = [];
 157 |   items.push({
 158 |     type: 'movement',
 159 |     slug: 'youth',
 160 |     title: 'Palestinian Youth Movement',
 161 |     summary: 'Information and resources about the Palestinian youth movement.',
 162 |     url: '/movements/youth.html'
 163 |   });
 164 |   items.push({
 165 |     type: 'movement',
 166 |     slug: 'labor',
 167 |     title: 'Palestinian Labor Movement',
 168 |     summary: 'Information and resources about the Palestinian labor movement.',
 169 |     url: '/movements/labor.html'
 170 |   });
 171 |   return items;
 172 | }
137 | }
 138 | 
 139 | async function buildFeatures() {
 140 |   // Add feature articles you want searchable here:
 141 |   const items = [];
 142 |   const abductions = await readJSON(path.join(dataDir, 'abductions-2008-2023.json'), null);
 143 |   if (abductions) {
 144 |     items.push({
 145 |       type: 'article',
 146 |       slug: 'abductions-2008-2023',
 147 |       title: 'Abductions & Detentions of Children (2008–2023)',
 148 |       summary: (abductions.meta && abductions.meta.title) ? abductions.meta.title : 'Dataset and charts (2008–2023)',
 149 |       url: '/features/abductions-2008-2023.html'
 150 |     });
 151 |   }
 152 |   return items;
 153 | }
137 | }
 138 | 
 139 | async function buildFeatures() {
 140 |   // Add feature articles you want searchable here:
 141 |   const items = [];
 142 |   const abductions = await readJSON(path.join(dataDir, 'abductions-2008-2023.json'), null);
 143 |   if (abductions) {
 144 |     items.push({
 145 |       type: 'article',
 146 |       slug: 'abductions-2008-2023',
 147 |       title: 'Abductions & Detentions of Children (2008–2023)',
 148 |       summary: (abductions.meta && abductions.meta.title) ? abductions.meta.title : 'Dataset and charts (2008–2023)',
 149 |       url: '/features/abductions-2008-2023.html'
 150 |     });
 151 |   }
 152 |   return items;
 153 | }
  const index = parts;
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, JSON.stringify(index, null, 2), 'utf8');
  console.log(`Wrote ${index.length} records -> ${path.relative(root, outFile)}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
