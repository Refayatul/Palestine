(async function(){
  const input = document.getElementById('glossarySearch');
  const container = document.getElementById('glossary');
  if (!input || !container) return;

  let data = [];

  try {
    data = await fetchJSON('/assets/data/glossary.json');

    // Group terms by first letter
    const grouped = {};
    data.forEach(item => {
      const letter = item.term.charAt(0).toUpperCase();
      if (!grouped[letter]) {
        grouped[letter] = [];
      }
      grouped[letter].push(item);
    });

    // Render glossary
    container.innerHTML = Object.keys(grouped).sort().map(letter => `
      <section>
        <h2 id="letter-${letter}">${letter}</h2>
        <ul>
          ${grouped[letter].map(item => `
            <li id="${slugify(item.term)}">
              <strong>${item.term}</strong>
              <p>${item.definition}</p>
              ${item.sources?.length ? `
                <p>Sources:</p>
                <ul>
                  ${item.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a> — ${s.publisher}</li>`).join('')}
                </ul>
              `:''}
            </li>
          `).join('')}
        </ul>
      </section>
    `).join('');

    // Live filter
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      const filtered = data.filter(item =>
        item.term.toLowerCase().includes(q) ||
        (item.aliases || []).some(alias => alias.toLowerCase().includes(q))
      );
      // Group terms by first letter
      const grouped = {};
      filtered.forEach(item => {
        const letter = item.term.charAt(0).toUpperCase();
        if (!grouped[letter]) {
          grouped[letter] = [];
        }
        grouped[letter].push(item);
      });

      // Render glossary
      container.innerHTML = Object.keys(grouped).sort().map(letter => `
        <section>
          <h2 id="letter-${letter}">${letter}</h2>
          <ul>
            ${grouped[letter].map(item => `
              <li id="${slugify(item.term)}">
                <strong>${item.term}</strong>
                <p>${item.definition}</p>
                ${item.sources?.length ? `
                  <p>Sources:</p>
                  <ul>
                    ${item.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a> — ${s.publisher}</li>`).join('')}
                </ul>
                `:''}
              </li>
            `).join('')}
          </ul>
        </section>
      `).join('');
    });

    // Deep linking
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  } catch (e) {
    container.innerHTML = '<p class="muted">Unable to load glossary.</p>';
  }
})();
