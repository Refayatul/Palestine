document.addEventListener('DOMContentLoaded', () => {
    const legalDataUrl = '/assets/data/legal.json';
    const legalGrid = document.getElementById('legal-documents-grid');
    const searchInput = document.getElementById('legal-search');
    const typeFilter = document.getElementById('type-filter');
    const yearFilter = document.getElementById('year-filter');
    const resultsCountSpan = document.getElementById('results-count');

    let legalDocuments = [];

    async function fetchLegalDocuments() {
        try {
            const response = await fetch(legalDataUrl);
            legalDocuments = await response.json();
            populateYearFilter();
            renderLegalDocuments();
        } catch (error) {
            console.error('Error fetching legal documents:', error);
            legalGrid.innerHTML = '<p>Failed to load legal documents. Please try again later.</p>';
        }
    }

    function populateYearFilter() {
        const years = [...new Set(legalDocuments.map(doc => doc.year))].sort((a, b) => b - a);
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
    }

    function renderLegalDocuments() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;
        const selectedYear = yearFilter.value;

        const filteredDocuments = legalDocuments.filter(doc => {
            const matchesSearch = doc.title.toLowerCase().includes(searchTerm) ||
                                  doc.summary.toLowerCase().includes(searchTerm);
            const matchesType = selectedType === '' || doc.type === selectedType;
            const matchesYear = selectedYear === '' || doc.year.toString() === selectedYear;
            return matchesSearch && matchesType && matchesYear;
        });

        legalGrid.innerHTML = ''; // Clear previous results

        if (filteredDocuments.length === 0) {
            legalGrid.innerHTML = '<p>No legal documents found matching your criteria.</p>';
        } else {
            filteredDocuments.forEach(doc => {
                const card = document.createElement('article');
                card.className = 'legal-card';
                card.innerHTML = `
                    <h3 class="legal-card-title">${doc.title}</h3>
                    <div class="legal-card-meta">
                        <span class="legal-card-type badge type-${doc.type.toLowerCase()}">${doc.type}</span>
                        <span class="legal-card-year">${doc.year}</span>
                    </div>
                    <p class="legal-card-summary">${doc.summary}</p>
                    <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="legal-card-link">
                        Open <span class="sr-only">${doc.title} in new tab</span>
                    </a>
                `;
                legalGrid.appendChild(card);
            });
        }
        resultsCountSpan.textContent = filteredDocuments.length;
    }

    searchInput.addEventListener('input', renderLegalDocuments);
    typeFilter.addEventListener('change', renderLegalDocuments);
    yearFilter.addEventListener('change', renderLegalDocuments);

    fetchLegalDocuments();
});
