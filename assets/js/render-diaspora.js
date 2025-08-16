document.addEventListener('DOMContentLoaded', async () => {
    const regionFilter = document.getElementById('region-filter');
    const diasporaSearchInput = document.getElementById('diaspora-search');
    const communitiesGrid = document.getElementById('communities-grid');
    const organizationsGrid = document.getElementById('organizations-grid');
    const resultsCountSpan = document.getElementById('results-count');
    const diasporaSourcesList = document.querySelector('#diaspora-sources .source-list');

    let allRegionsData = {};
    let currentRegionData = { communities: [], orgs: [], sources: [] };

    async function fetchRegions() {
        try {
            const response = await fetch('/assets/data/diaspora/regions.json');
            const regions = await response.json();
            populateRegionFilter(regions);
            // Load initial region data (e.g., first region or a default)
            if (regions.length > 0) {
                await fetchRegionData(regions[0].slug);
            }
        } catch (error) {
            console.error('Error fetching regions:', error);
            communitiesGrid.innerHTML = '<p>Failed to load regions.</p>';
            organizationsGrid.innerHTML = '';
        }
    }

    function populateRegionFilter(regions) {
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region.slug;
            option.textContent = region.name;
            regionFilter.appendChild(option);
        });
    }

    async function fetchRegionData(regionSlug) {
        try {
            const response = await fetch(`/assets/data/diaspora/${regionSlug}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            currentRegionData = await response.json();
            renderDiasporaContent();
        } catch (error) {
            console.error(`Error fetching data for region ${regionSlug}:`, error);
            currentRegionData = { communities: [], orgs: [], sources: [] }; // Clear data on error
            communitiesGrid.innerHTML = `<p>Failed to load data for ${regionSlug}.</p>`;
            organizationsGrid.innerHTML = '';
            diasporaSourcesList.innerHTML = '';
            resultsCountSpan.textContent = '0';
        }
    }

    function renderDiasporaContent() {
        const searchTerm = diasporaSearchInput.value.toLowerCase();

        const filteredCommunities = currentRegionData.communities.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            (item.city && item.city.toLowerCase().includes(searchTerm))
        );

        const filteredOrganizations = currentRegionData.orgs.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            (item.country && item.country.toLowerCase().includes(searchTerm))
        );

        communitiesGrid.innerHTML = '';
        if (filteredCommunities.length === 0) {
            communitiesGrid.innerHTML = '<p>No communities found in this region or matching your search.</p>';
        } else {
            filteredCommunities.forEach(community => {
                const card = document.createElement('article');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${community.name}</h3>
                    <p class="muted">${community.city ? community.city + ', ' : ''}${currentRegionData.region}</p>
                    <a href="${community.url}" target="_blank" rel="noopener noreferrer" class="btn-small">Visit Site</a>
                `;
                communitiesGrid.appendChild(card);
            });
        }

        organizationsGrid.innerHTML = '';
        if (filteredOrganizations.length === 0) {
            organizationsGrid.innerHTML = '<p>No organizations found in this region or matching your search.</p>';
        } else {
            filteredOrganizations.forEach(org => {
                const card = document.createElement('article');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${org.name}</h3>
                    <p class="muted">${org.country ? org.country + ', ' : ''}${currentRegionData.region}</p>
                    <a href="${org.url}" target="_blank" rel="noopener noreferrer" class="btn-small">Visit Site</a>
                `;
                organizationsGrid.appendChild(card);
            });
        }

        renderSources(currentRegionData.sources);
        resultsCountSpan.textContent = filteredCommunities.length + filteredOrganizations.length;
    }

    function renderSources(sources) {
        diasporaSourcesList.innerHTML = '';
        if (sources && sources.length > 0) {
            sources.forEach(source => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.title}</a>`;
                diasporaSourcesList.appendChild(li);
            });
        } else {
            diasporaSourcesList.innerHTML = '<li>No sources available for this region.</li>';
        }
    }

    regionFilter.addEventListener('change', async (e) => {
        const selectedRegion = e.target.value;
        if (selectedRegion) {
            await fetchRegionData(selectedRegion);
        } else {
            // If "All Regions" is selected, clear content or show a message
            currentRegionData = { communities: [], orgs: [], sources: [] };
            communitiesGrid.innerHTML = '<p>Please select a region to view communities and organizations.</p>';
            organizationsGrid.innerHTML = '';
            diasporaSourcesList.innerHTML = '';
            resultsCountSpan.textContent = '0';
        }
    });

    diasporaSearchInput.addEventListener('input', renderDiasporaContent);

    fetchRegions();
});
