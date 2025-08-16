(async function(){
  const data = await fetchJSON('/assets/data/journalists.json');
  const wrap = document.getElementById('journalists');
  wrap.innerHTML = data.map(j => `
    <article class="card" id="${j.id || slugify(j.name)}">
      <img src="${j.photo}" alt="${j.name}" loading="lazy" style="width:100%;height:auto;border-radius:8px;margin-bottom:8px">
      <h3>${j.name}</h3>
      <p class="muted">${j.region || ''}</p>
      <p>${j.bio || ''}</p>
      <p>${(j.links||[]).map(l=>`<a target="_blank" rel="noopener" href="${l.url}">${l.platform}</a>`).join(' · ')}</p>
    </article>
  `).join('');

  if(location.hash){
    const target = document.querySelector(location.hash);
    if(target){ target.scrollIntoView({behavior:'smooth'}); }
  }
})();
