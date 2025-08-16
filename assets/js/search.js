// /assets/js/search.js
(function(){
  const input = document.getElementById('siteSearch');
  const panel = document.getElementById('searchPanel');
  const list  = document.getElementById('searchResults');
  const closeBtn = panel ? panel.querySelector('.search-close') : null;
  if (!input || !panel || !list) return;

  let fuse = null;
  let data = [];
  let activeIndex = -1;
  let open = false;

  // Load index once
  fetch('/assets/data/search-index.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(json => {
      data = json;
      fuse = new Fuse(json, {
        includeScore: true,
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
        keys: ['title','summary']
      });
    })
    .catch(() => { /* index missing? Keep silent */ });

  function openPanel(){
    if (!open){ panel.removeAttribute('hidden'); open = true; activeIndex = -1; }
  }
  function closePanel(){
    if (open){ panel.setAttribute('hidden',''); open = false; activeIndex = -1; list.innerHTML = ''; }
  }

  function kickerForType(t){
    if (t === 'country') return 'Country';
    if (t === 'boycott-supporting') return 'Boycott (Target)';
    if (t === 'boycott-supportive') return 'Supportive';
    if (t === 'journalist') return 'Journalist';
    if (t === 'article') return 'Feature';
    return 'Result';
  }

  function render(results){
    if (!results.length){
      list.innerHTML = `<li class="muted" aria-selected="false"><span class="search-summary">No results.</span></li>`;
      return;
    }
    list.innerHTML = results.slice(0, 12).map((r, idx) => {
      const i = r.item || r; // Fuse returns {item,...}; fallback if raw
      return `
        <li role="option" id="sr-${idx}" data-url="${i.url}" aria-selected="${idx===activeIndex}">
          <a href="${i.url}">
            <div class="search-kicker">${kickerForType(i.type)}</div>
            <div class="search-title">${i.title}</div>
            ${i.summary ? `<div class="search-summary">${i.summary}</div>` : ''}
          </a>
        </li>
      `;
    }).join('');
  }

  // Debounce input
  let t = null;
  input.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (!q) { closePanel(); return; }
    if (!fuse){ openPanel(); render([]); return; }
    clearTimeout(t);
    t = setTimeout(() => {
      const results = fuse.search(q);
      openPanel();
      render(results);
    }, 120);
  });

  // Keyboard navigation
  input.addEventListener('keydown', (e) => {
    if (!open) return;
    const items = [...list.querySelectorAll('li[data-url]')];
    if (!items.length) return;

    if (e.key === 'ArrowDown'){
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActive(items);
    } else if (e.key === 'ArrowUp'){
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActive(items);
    } else if (e.key === 'Enter'){
      e.preventDefault();
      if (activeIndex >= 0){
        const url = items[activeIndex].dataset.url;
        if (url) window.location.href = url;
      }
    } else if (e.key === 'Escape'){
      e.preventDefault();
      closePanel();
      input.blur();
    }
  });

  function updateActive(items){
    items.forEach((li, i) => li.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false'));
    const active = items[activeIndex];
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  // Mouse interactions
  list.addEventListener('click', (e) => {
    const li = e.target.closest('li[data-url]');
    if (!li) return;
    const url = li.dataset.url;
    closePanel();
    if (url) window.location.href = url;
  });

  // Close handlers
  closeBtn?.addEventListener('click', closePanel);
  document.addEventListener('click', (e) => {
    if (e.target === input || e.target.closest('.site-search')) return;
    closePanel();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.target.matches('input,textarea')){
      // Focus search with "/" like many sites
      e.preventDefault();
      input.focus();
    }
  });
})();
