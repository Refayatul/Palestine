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
  try { 
    await fs.stat(p); 
    return true; 
  } catch { 
    return false; 
  }
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
}

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
  items.push({
    type: 'movement',
    slug: 'women',
    title: 'Palestinian Women Movement',
    summary: 'Information and resources about the Palestinian women movement.',
    url: '/movements/women.html'
  });
  return items;
}

async function buildStaticContent() {
  // Add static content from your HTML pages
  const staticItems = [
    {
      type: 'page',
      slug: 'history',
      title: 'Palestinian History',
      summary: 'Learn about the rich history of Palestine spanning thousands of years',
      url: '/#history'
    },
    {
      type: 'page',
      slug: 'resistance',
      title: 'Palestinian Resistance',
      summary: 'Explore methods of Palestinian resistance including peaceful protests and BDS movement',
      url: '/#resistance'
    },
    {
      type: 'page',
      slug: 'betrayal',
      title: 'Who Betrayed Palestine',
      summary: 'Understand who has betrayed the Palestinian cause throughout history',
      url: '/#betrayal'
    },
    {
      type: 'page',
      slug: 'action',
      title: 'Take Action Now',
      summary: 'Learn how you can support Palestine through petitions, donations, and awareness',
      url: '/#act'
    },
    {
      type: 'page',
      slug: 'resources',
      title: 'Educational Resources',
      summary: 'Access books, documentaries, academic papers, and maps about Palestine',
      url: '/#resources'
    },
    {
      type: 'page',
      slug: 'culture',
      title: 'Palestinian Culture & Heritage',
      summary: 'Discover Palestinian traditions, music, cuisine, and arts',
      url: '/#culture'
    },
    {
      type: 'page',
      slug: 'future',
      title: 'The Future of Palestine',
      summary: 'Vision for a free Palestine with justice and coexistence',
      url: '/#future'
    },
    {
      type: 'myth',
      slug: 'myths',
      title: 'Debunking Myths About Palestine',
      summary: 'Common misconceptions about Palestine and the truth behind them',
      url: '/myths/index.html'
    },
    {
      type: 'legal',
      slug: 'legal',
      title: 'Legal Resources',
      summary: 'International law and legal frameworks related to Palestine',
      url: '/legal/index.html'
    },
    {
      type: 'diaspora',
      slug: 'diaspora',
      title: 'Palestinian Diaspora',
      summary: 'Stories and resources for the Palestinian diaspora community',
      url: '/diaspora/index.html'
    },
    {
      type: 'education',
      slug: 'education',
      title: 'Educational Resources',
      summary: 'Materials for teachers and students about Palestine',
      url: '/education/teachers.html'
    }
  ];
  return staticItems;
}

async function main() {
  const parts = [];
  
  // Add static content first
  parts.push(...await buildStaticContent());
  
  // Add dynamic content if data files exist
  if (await exists(countriesDir)) parts.push(...await buildCountries());
  parts.push(...await buildBoycotts());
  parts.push(...await buildJournalists());
  parts.push(...await buildFeatures());
  parts.push(...await buildMovements());
  
  // Remove duplicates
  const uniqueParts = parts.filter((item, index, self) =>
    index === self.findIndex(t => t.slug === item.slug && t.type === item.type)
  );
  
  const index = uniqueParts;
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, JSON.stringify(index, null, 2), 'utf8');
  console.log(`Wrote ${index.length} records -> ${path.relative(root, outFile)}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});