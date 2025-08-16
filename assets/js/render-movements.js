async function renderMovement(type) {
    try {
        const response = await fetch(`../assets/data/movements/${type}.json`);
        const data = await response.json();
        
        const container = document.getElementById('movementContent');
        
        // Render introduction
        container.innerHTML = `
            <section class="movement-intro">
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                ${data.history ? `<div class="history-section"><h3>History</h3><p>${data.history}</p></div>` : ''}
            </section>
        `;
        
        // Render key figures
        if (data.keyFigures && data.keyFigures.length) {
            const figuresHTML = data.keyFigures.map(figure => `
                <div class="figure-card">
                    <h3>${figure.name}</h3>
                    ${figure.image ? `<img src="${figure.image}" alt="${figure.name}">` : ''}
                    <p><strong>${figure.role}</strong></p>
                    <p>${figure.bio}</p>
                    ${figure.achievements ? `<div class="achievements"><h4>Key Achievements:</h4><ul>${figure.achievements.map(a => `<li>${a}</li>`).join('')}</ul></div>` : ''}
                </div>
            `).join('');
            
            container.innerHTML += `
                <section class="key-figures">
                    <h3>Key Figures</h3>
                    <div class="figures-grid">${figuresHTML}</div>
                </section>
            `;
        }
        
        // Render organizations
        if (data.organizations && data.organizations.length) {
            const orgsHTML = data.organizations.map(org => `
                <div class="org-card">
                    <h3>${org.name}</h3>
                    <p><strong>Founded:</strong> ${org.founded}</p>
                    <p>${org.description}</p>
                    ${org.website ? `<p><a href="${org.website}" target="_blank" rel="noopener">Visit Website</a></p>` : ''}
                    ${org.keyInitiatives ? `<div class="initiatives"><h4>Key Initiatives:</h4><ul>${org.keyInitiatives.map(i => `<li>${i}</li>`).join('')}</ul></div>` : ''}
                </div>
            `).join('');
            
            container.innerHTML += `
                <section class="organizations">
                    <h3>Organizations</h3>
                    <div class="orgs-grid">${orgsHTML}</div>
                </section>
            `;
        }
        
        // Render actions
        if (data.actions && data.actions.length) {
            container.innerHTML += `
                <section class="actions">
                    <h3>Actions & Campaigns</h3>
                    <ul class="actions-list">
                        ${data.actions.map(action => `
                            <li>
                                <h4>${action.name}</h4>
                                <p><strong>Year:</strong> ${action.year}</p>
                                <p>${action.description}</p>
                                ${action.outcome ? `<p><strong>Outcome:</strong> ${action.outcome}</p>` : ''}
                            </li>
                        `).join('')}
                    </ul>
                </section>
            `;
        }
        
        // Render sources
        if (data.sources && data.sources.length) {
            container.innerHTML += `
                <section class="sources">
                    <h3>Sources & Further Reading</h3>
                    <ul>
                        ${data.sources.map(source => `
                            <li>
                                ${source.url ? 
                                    `<a href="${source.url}" target="_blank" rel="noopener">${source.title}</a>` : 
                                    source.title
                                }
                                ${source.author ? ` by ${source.author}` : ''}
                                ${source.publisher ? ` (${source.publisher})` : ''}
                            </li>
                        `).join('')}
                    </ul>
                </section>
            `;
        }
        
    } catch (error) {
        console.error('Error rendering movement:', error);
        document.getElementById('movementContent').innerHTML = `
            <div class="error">
                <p>Unable to load movement data. Please try again later.</p>
            </div>
        `;
    }
}