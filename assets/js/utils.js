async function fetchJSON(url){
  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) throw new Error(`Fetch failed: ${url}`);
  return r.json();
}
function slugify(s=''){ return s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
function formatNumber(n){ return (n||0).toLocaleString(); }
function sourceLink(s){ return s ? ` [<a target="_blank" rel="noopener" href="${s.url}">${s.publisher || s.title}</a>]` : ''; }
