(async () => {
  const root = document.querySelector('[data-history-topic]');
  if (!root) return;

  const escapeHtml = window.SiteData?.escapeHtml || ((value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;'));

  const slug = root.dataset.historyTopic || location.pathname.split('/').pop().replace('.html', '');

  try {
    const data = window.SiteData
      ? await window.SiteData.fetchDataset('history.topics')
      : await fetch('/assets/data/history/topics.json').then((response) => response.json());
    const topic = data.topics[slug];

    if (!topic) {
      root.innerHTML = '<p class="muted">This history topic has not been added yet.</p>';
      return;
    }

    document.title = `${topic.title} | Free Palestine`;

    root.innerHTML = `
      <section class="hero">
        <div class="hero-content">
          <h1>${escapeHtml(topic.title)}</h1>
          <p>${escapeHtml(topic.summary)}</p>
          <div class="hero-buttons">
            <a class="btn" href="/pages/history_pages/history.html">History Hub</a>
            <a class="btn" href="/pages/history_pages/history.html#timeline-1900-2026">Full Timeline</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <p class="eyebrow">${escapeHtml(topic.period)}</p>
          <div class="homepage-pathways">
            ${topic.sections.map((section) => `
              <article class="pathway-card">
                <h3>${escapeHtml(section.heading)}</h3>
                <p>${escapeHtml(section.body)}</p>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <h2>What to Remember</h2>
          <div class="resources-grid">
            ${topic.takeaways.map((takeaway) => `
              <article class="resource-card">
                <p>${escapeHtml(takeaway)}</p>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>Sources for Further Study</h2>
          <ul class="source-list">
            ${data.sources.map((source) => `
              <li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a> - ${escapeHtml(source.publisher)}</li>
            `).join('')}
          </ul>
        </div>
      </section>
    `;
  } catch (error) {
    console.error('Unable to load history topic:', error);
    root.innerHTML = '<p class="muted">History topic data could not be loaded. Use a local web server for JSON-backed pages.</p>';
  }
})();
