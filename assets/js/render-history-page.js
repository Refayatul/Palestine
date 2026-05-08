(async () => {
  const root = document.querySelector('[data-history-page]');
  if (!root) return;

  const escapeHtml = window.SiteData?.escapeHtml || ((value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;'));

  const cards = (items) => items.map((item) => `
    <article class="pathway-card">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </article>
  `).join('');

  try {
    const data = window.SiteData
      ? await window.SiteData.fetchDataset('history.page')
      : await fetch('/assets/data/history/history-page.json').then((response) => response.json());

    root.innerHTML = `
      <section class="section">
        <div class="container">
          <h2>How to Read Palestinian History</h2>
          <div class="history-lede">
            ${data.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
          </div>
          <div class="homepage-pathways history-principles">
            ${cards(data.principles)}
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <h2>Recurring Structures</h2>
          <div class="resources-grid">
            ${cards(data.themes)}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>Core Sources</h2>
          <ul class="source-list">
            ${data.sources.map((source) => `
              <li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a> - ${escapeHtml(source.publisher)}</li>
            `).join('')}
          </ul>
        </div>
      </section>
    `;
  } catch (error) {
    console.error('Unable to load history page data:', error);
    root.innerHTML = '<section class="section"><div class="container"><p class="muted">History page data could not be loaded. Use a local web server for JSON-backed pages.</p></div></section>';
  }
})();
