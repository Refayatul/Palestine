(async function(){
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const container = document.getElementById('country');
  if(!slug){ container.innerHTML = '<p>Missing country slug.</p>'; return; }

  let data = null;
  try { data = await fetchJSON(`/assets/data/countries/${slug}.json`); } catch(e){}
  if(!data){ container.innerHTML = '<p>Country not found.</p>'; return; }

  const list = (items, fields) => items?.length ? `<ul>${items.map(i => `<li>${fields(i)}</li>`).join('')}</ul>` : '<p class="muted">No data yet.</p>';

  container.innerHTML = `
    <header>
      <img src="${data.flag}" alt="${data.name} flag" width="64" height="42">
      <h1>${data.name}</h1>
      <p class="muted">Last updated: ${data.last_updated || '—'}</p>
      <p>${data.summary || ''}</p>
    </header>

    <section>
      <h2>Official Statements</h2>
      ${list(data.official_positions, i => `
        <strong>${i.date}</strong> — ${i.statement}
        <span class="sources">${sourceLink(i.source)}</span>
      `)}
    </section>

    <section>
      <h2>UN Voting Record</h2>
      ${list(data.un_voting_record, i => `
        <strong>${i.date}</strong> — ${i.resolution} — <em>${i.vote}</em>
        <span class="sources">${sourceLink(i.source)}</span>
      `)}
    </section>

    <section>
      <h2>Arms Trade</h2>
      ${list(data.arms_trade, i => `
        <strong>${i.year}</strong> — ${i.category || ''} ${i.notes ? '— '+i.notes : ''}
        <span class="sources">${sourceLink(i.source)}</span>
      `)}
    </section>

    <section>
      <h2>Humanitarian Aid</h2>
      ${list(data.aid_and_relief, i => `
        <strong>${i.date}</strong> — €${formatNumber(i.amount_eur)} — ${i.program}
        <span class="sources">${sourceLink(i.source)}</span>
      `)}
    </section>

    <section>
      <h2>Civil Society</h2>
      ${list(data.civil_society, i => `
        <strong>${i.date}</strong> — ${i.org}: ${i.position}
        <span class="sources">${sourceLink(i.source)}</span>
      `)}
    </section>

    <section>
      <h2>Take Action</h2>
      <ul>
        ${data.take_action?.map(a => `<li><a target="_blank" rel="noopener" href="${a.url}">${a.title}</a></li>`).join('') || '<li class="muted">No links yet.</li>'}
      </ul>
    </section>
  `;
})();
