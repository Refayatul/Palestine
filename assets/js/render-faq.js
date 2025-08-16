(async function(){
  const input = document.getElementById('faqSearch');
  const panel = document.getElementById('faq');
  const tagsContainer = document.getElementById('faqTags');
  if (!input || !panel || !tagsContainer) return;

  let data = [];
  let activeTags = [];

  try {
    data = await fetchJSON('/assets/data/faq.json');
    const allTags = [...new Set(data.flatMap(item => item.tags || []))];

    tagsContainer.innerHTML = allTags.map(tag => `
      <button class="tag" data-tag="${tag}">${tag}</button>
    `).join('');

    function render(items) {
      panel.innerHTML = items.map(item => `
        <details id="${slugify(item.q)}">
          <summary>Q: ${item.q}</summary>
          <div>
            <p>A: ${item.a}</p>
            ${item.sources?.length ? `
              <p>Sources:</p>
              <ul>
                ${item.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a> — ${s.publisher}</li>`).join('')}
              </ul>
              <button class="copy-citation" data-citation="${item.sources.map(s => `${s.title} (${s.url})`).join('\\n')}">Copy citation</button>
            `:''}
          </div>
        </details>
      `).join('');
    }

    function applyFilters() {
      let filtered = data.slice();
      const query = input.value.toLowerCase().trim();

      if (query) {
        filtered = filtered.filter(item =>
          item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query)
        );
      }

      if (activeTags.length) {
        filtered = filtered.filter(item => {
          if (!item.tags) return false;
          return activeTags.every(tag => item.tags.includes(tag));
        });
      }

      render(filtered);
    }

    // Tag filtering
    tagsContainer.addEventListener('click', e => {
      if (!e.target.classList.contains('tag')) return;
      const tag = e.target.dataset.tag;
      if (activeTags.includes(tag)) {
        activeTags = activeTags.filter(t => t !== tag);
        e.target.classList.remove('selected');
      } else {
        activeTags.push(tag);
        e.target.classList.add('selected');
      }
      applyFilters();
    });

    // Text filtering
    input.addEventListener('input', applyFilters);

    // Clipboard
    panel.addEventListener('click', async (e) => {
      if (!e.target.classList.contains('copy-citation')) return;
      try {
        await navigator.clipboard.writeText(e.target.dataset.citation);
        e.target.textContent = 'Copied!';
        setTimeout(() => e.target.textContent = 'Copy citation', 1500);
      } catch (err) {
        console.error('Failed to copy citation: ', err);
        e.target.textContent = 'Copy failed!';
      }
    });

    // Deep linking
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }

    render(data);
  } catch (e) {
    panel.innerHTML = '<p class="muted">Unable to load FAQs.</p>';
  }
})();
