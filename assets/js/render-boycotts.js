(async function(){
  const file = location.pathname.includes('supportive') ? 'boycotts-supportive.json' : 'boycotts-supporting.json';
  const data = await fetchJSON(`/assets/data/${file}`);
  const body = document.querySelector('#tbl tbody');
  const q = document.getElementById('q');
  const sector = document.getElementById('sector');
  const region = document.getElementById('region');
  const lastReviewed = document.getElementById('lastReviewed');

  // Populate filters
  [...new Set(data.map(d=>d.sector).filter(Boolean))].sort().forEach(s=> sector.insertAdjacentHTML('beforeend', `<option>${s}</option>`));
  [...new Set(data.map(d=>d.region).filter(Boolean))].sort().forEach(r=> region.insertAdjacentHTML('beforeend', `<option>${r}</option>`));

  function row(d){
    const id = slugify(d.name);
    return `
      <tr id="${id}">
        <td>${d.name}</td>
        <td>${d.sector || '—'}</td>
        <td>${d.region || '—'}</td>
        <td>${d.status}</td>
        <td>${(d.sources||[]).map(s=>`<a target="_blank" rel="noopener" href="${s.url}">${s.publisher||s.title}</a>`).join(', ')||'—'}</td>
      </tr>
    `;
  }

  function render(items){
    body.innerHTML = items.map(row).join('');
    const latest = items.reduce((acc, i)=> acc > (i.last_reviewed||'') ? acc : (i.last_reviewed||''), '');
    lastReviewed.textContent = latest ? `List last reviewed: ${latest}` : '';
  }

  function apply(){
    const query = q.value.toLowerCase().trim();
    let items = data.slice();
    if(sector.value) items = items.filter(i=>i.sector===sector.value);
    if(region.value) items = items.filter(i=>i.region===region.value);
    if(query) items = items.filter(i =>
      i.name.toLowerCase().includes(query) ||
      (i.sector||'').toLowerCase().includes(query) ||
      (i.rationale||'').toLowerCase().includes(query)
    );
    render(items);
  }

  [q, sector, region].forEach(el=> el.addEventListener('input', apply));
  render(data);

  // Jump to hash if present
  if(location.hash){
    const target = document.querySelector(location.hash);
    if(target){ target.scrollIntoView({behavior:'smooth'}); }
  }
})();
