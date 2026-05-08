document.addEventListener('DOMContentLoaded', async () => {
  const containers = document.querySelectorAll('[data-timeline-overview]');
  if (!containers.length) return;

  const dataUrl = '/assets/data/history/timeline-1900-2026.json';

  function escapeHtml(value = '') {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function sourceLinks(sources = []) {
    if (!sources.length) return '';
    return `
      <details class="timeline-sources">
        <summary>Sources</summary>
        <ul>
          ${sources.map((source) => `
            <li>
              <a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a>
              <span>${escapeHtml(source.publisher || '')}</span>
            </li>
          `).join('')}
        </ul>
      </details>
    `;
  }

  function eventCard(event) {
    return `
      <article class="timeline-overview-card" id="${escapeHtml(event.id)}" data-period="${escapeHtml(event.period)}">
        <time>${escapeHtml(event.date)}</time>
        <h3>${escapeHtml(event.title)}</h3>
        <p>${escapeHtml(event.summary)}</p>
        ${event.tags?.length ? `<div class="timeline-tags">${event.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
        ${sourceLinks(event.sources)}
      </article>
    `;
  }

  function periodSummary(period) {
    return `
      <article class="pathway-card">
        <h3>${escapeHtml(period.label)}</h3>
        <p><strong>${escapeHtml(period.range)}</strong></p>
        <p>${escapeHtml(period.summary)}</p>
      </article>
    `;
  }

  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    containers.forEach((container) => {
      const mode = container.dataset.timelineOverview;
      const limit = Number(container.dataset.limit || 0);
      const periodTarget = container.dataset.periodsTarget;
      const events = limit ? data.events.slice(-limit) : data.events;

      if (mode === 'periods') {
        container.innerHTML = data.periods.map(periodSummary).join('');
      } else {
        container.innerHTML = events.map(eventCard).join('');
      }

      if (periodTarget) {
        const target = document.querySelector(periodTarget);
        if (target) target.innerHTML = data.periods.map(periodSummary).join('');
      }
    });
  } catch (error) {
    console.error('Unable to load 1900-2026 timeline:', error);
    containers.forEach((container) => {
      container.innerHTML = '<p class="muted">Timeline data could not be loaded. Use a local web server for JSON-backed pages.</p>';
    });
  }
});
