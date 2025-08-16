(async function(){
  const container = document.getElementById('myths');
  if (!container) return;

  try {
    const data = await fetchJSON('/assets/data/myths.json');
    container.innerHTML = data.map(item => `
      <details id="${item.id}">
        <summary>${item.myth}</summary>
        <div>
          <p>${item.fact}</p>
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

    // Clipboard
    container.addEventListener('click', async (e) => {
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
  } catch (e) {
    container.innerHTML = '<p class="muted">Unable to load myths.</p>';
  }
})();
