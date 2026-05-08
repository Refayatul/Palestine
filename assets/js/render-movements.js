const movementPage = document.body.dataset.movement ||
  window.location.pathname.split('/').pop().replace('.html', '');

const fields = {
  profiles: document.getElementById('profiles-grid'),
  orgs: document.getElementById('organizations-grid'),
  actions: document.getElementById('actions-grid'),
  sources: document.getElementById('movement-sources'),
  title: document.getElementById('movement-title'),
  intro: document.getElementById('movement-intro'),
  context: document.getElementById('movement-context')
};

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function listItems(items = []) {
  if (!items.length) return '';
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function links(items = []) {
  if (!items.length) return '';
  return `<div class="card-links">${items.map((link) => (
    `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label || link.title || 'Source')}</a>`
  )).join('')}</div>`;
}

function renderCards(container, items, renderer, emptyText) {
  if (!container) return;
  container.innerHTML = items?.length
    ? items.map(renderer).join('')
    : `<p class="muted">${emptyText}</p>`;
}

function profileCard(profile) {
  const details = profile.achievements || profile.resistance_actions || [];
  return `
    <article class="resource-card movement-card">
      <h3>${escapeHtml(profile.name)}</h3>
      <p><strong>${escapeHtml(profile.role || 'Profile')}</strong></p>
      <p>${escapeHtml(profile.bio)}</p>
      ${listItems(details)}
      ${links(profile.links)}
    </article>
  `;
}

function orgCard(org) {
  const details = org.focus_areas || org.key_campaigns || [];
  return `
    <article class="resource-card movement-card">
      <h3>${escapeHtml(org.name)}</h3>
      <p>${escapeHtml(org.description || org.mission || '')}</p>
      ${listItems(details)}
      ${org.url ? `<a class="resource-link" href="${escapeHtml(org.url)}" target="_blank" rel="noopener noreferrer">Open organization</a>` : ''}
    </article>
  `;
}

function actionCard(action) {
  const demands = action.key_demands || [];
  return `
    <article class="resource-card movement-card">
      <h3>${escapeHtml(action.title || action.name)}</h3>
      <p>${escapeHtml(action.description || '')}</p>
      ${action.type ? `<p><strong>Type:</strong> ${escapeHtml(action.type)}</p>` : ''}
      ${action.participation_stats ? `<p><strong>Scale:</strong> ${escapeHtml(action.participation_stats)}</p>` : ''}
      ${listItems(demands)}
      ${action.url ? `<a class="resource-link" href="${escapeHtml(action.url)}" target="_blank" rel="noopener noreferrer">Open campaign</a>` : ''}
    </article>
  `;
}

function renderContext(data) {
  if (!fields.context) return;
  const stats = data.statistics || data.additional_context || {};
  const issues = data.key_issues || [];
  const statBlocks = Object.entries(stats).map(([key, value]) => `
    <div class="pathway-card">
      <h3>${escapeHtml(key.replace(/_/g, ' '))}</h3>
      <p>${escapeHtml(value)}</p>
    </div>
  `).join('');

  fields.context.innerHTML = `
    ${statBlocks}
    ${issues.length ? `
      <div class="pathway-card">
        <h3>Key Issues</h3>
        ${listItems(issues)}
      </div>
    ` : ''}
  `;
}

async function renderMovement() {
  try {
    const response = await fetch(`../assets/data/movements/${movementPage}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    const title = `Palestinian ${escapeHtml(data.section || movementPage)} Movement`;
    if (fields.title) fields.title.textContent = title;
    if (fields.intro) fields.intro.textContent = data.intro || data.description || '';

    renderCards(fields.profiles, data.profiles, profileCard, 'No profiles available yet.');
    renderCards(fields.orgs, data.orgs || data.organizations, orgCard, 'No organizations available yet.');
    renderCards(fields.actions, data.actions, actionCard, 'No campaigns available yet.');
    renderContext(data);

    if (fields.sources) {
      fields.sources.innerHTML = (data.sources || []).map((source) => `
        <li>
          <a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a>
          ${source.publisher ? `<span>${escapeHtml(source.publisher)}</span>` : ''}
        </li>
      `).join('');
    }
  } catch (error) {
    const main = document.querySelector('main .container') || document.querySelector('main');
    if (main) {
      main.insertAdjacentHTML(
        'afterbegin',
        '<div class="pathway-card"><h2>Content could not load</h2><p>Please open this page through a local web server so the JSON data can be fetched.</p></div>'
      );
    }
    console.error('Error rendering movement:', error);
  }
}

renderMovement();
