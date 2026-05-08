(async () => {
  const root = document.querySelector('[data-land-loss]');
  if (!root) return;

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const snapshotButton = (item, index) => `
    <button type="button" class="${index === 0 ? 'active' : ''}" data-land-index="${index}">
      ${escapeHtml(item.year)}
    </button>
  `;

  const renderSnapshot = (item) => `
    <div class="land-loss-panel">
      <div class="land-loss-chart" aria-label="Visual estimate of Palestinian space and colonial or Israeli control">
        <div class="land-loss-bar">
          <span class="palestinian-space" style="width: ${item.palestinianSpace}%"></span>
          <span class="control-space" style="width: ${item.colonialOrIsraeliControl}%"></span>
        </div>
        <div class="land-loss-key">
          <span><i class="key-palestinian"></i> Palestinian space: ${escapeHtml(item.palestinianSpace)}%</span>
          <span><i class="key-control"></i> Colonial/Israeli control: ${escapeHtml(item.colonialOrIsraeliControl)}%</span>
        </div>
      </div>
      <div class="land-loss-copy">
        <p class="eyebrow">${escapeHtml(item.year)} - ${escapeHtml(item.label)}</p>
        <h3>${escapeHtml(item.headline)}</h3>
        <p>${escapeHtml(item.body)}</p>
        <ul>
          ${item.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}
        </ul>
        <p class="muted">Sources: ${item.sources.map(escapeHtml).join(', ')}</p>
      </div>
    </div>
  `;

  try {
    const response = await fetch('/assets/data/history/land-loss.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    root.innerHTML = `
      <div class="land-loss-header">
        <h2>${escapeHtml(data.title)}</h2>
        <p>${escapeHtml(data.note)}</p>
      </div>
      <div class="land-loss-controls">
        ${data.snapshots.map(snapshotButton).join('')}
      </div>
      <div data-land-loss-panel>
        ${renderSnapshot(data.snapshots[0])}
      </div>
      <details class="timeline-sources land-loss-sources">
        <summary>Sources</summary>
        <ul>
          ${data.sources.map((source) => `
            <li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a> - ${escapeHtml(source.publisher)}</li>
          `).join('')}
        </ul>
      </details>
    `;

    const panel = root.querySelector('[data-land-loss-panel]');
    root.querySelectorAll('[data-land-index]').forEach((button) => {
      button.addEventListener('click', () => {
        root.querySelectorAll('[data-land-index]').forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        panel.innerHTML = renderSnapshot(data.snapshots[Number(button.dataset.landIndex)]);
      });
    });
  } catch (error) {
    console.error('Unable to load land loss data:', error);
    root.innerHTML = '<p class="muted">Land-loss data could not be loaded. Use a local web server for JSON-backed pages.</p>';
  }
})();
