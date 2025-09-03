document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const contentTypeSelect = document.getElementById('content-type');
    const dateRangeSelect = document.getElementById('date-range');
    const resultsContainer = document.getElementById('results-container');
    const resultsCount = document.getElementById('results-count');
    const searchTime = document.getElementById('search-time');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    let searchIndex = [];
    let searchTimeout;

    // Load search index
    loadSearchIndex();

    // Event listeners
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', debounceSearch);
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    contentTypeSelect.addEventListener('change', performSearch);
    dateRangeSelect.addEventListener('change', performSearch);

    // Suggestion tag clicks
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function () {
            searchInput.value = this.getAttribute('data-query');
            performSearch();
        });
    });

    async function loadSearchIndex() {
        try {
            const response = await fetch('/assets/data/search-index.json');
            if (response.ok) {
                searchIndex = await response.json();
                console.log('Search index loaded:', searchIndex.length, 'items');
            } else {
                // Fallback: create basic search index from available content
                console.log('Search index not found, using fallback');
                searchIndex = createFallbackIndex();
            }
        } catch (error) {
            console.error('Error loading search index:', error);
            searchIndex = createFallbackIndex();
        }
    }

    function createFallbackIndex() {
        // Create a basic index from the site's main pages
        return [
            {
                id: 'index',
                title: 'Home - Free Palestine',
                content: 'Palestine history resistance advocacy tools education legal diaspora movements massacres boycott BDS',
                url: '/index.html',
                type: 'page',
                category: 'home',
                date: '2025-01-01'
            },
            {
                id: 'history',
                title: 'History of Palestine',
                content: 'Palestinian history timeline events Nakba Intifada occupation resistance 1948 1967 1987 2000 2008 2014 2021 2023',
                url: '/pages/history_pages/history.html',
                type: 'page',
                category: 'history',
                date: '2025-01-01'
            },
            {
                id: 'resistance',
                title: 'Palestinian Resistance',
                content: 'resistance struggle liberation freedom justice Palestinian people armed struggle nonviolent BDS boycott',
                url: '/pages/resistance_pages/resistance.html',
                type: 'page',
                category: 'resistance',
                date: '2025-01-01'
            },
            {
                id: 'education',
                title: 'Educational Resources',
                content: 'education teachers students learning Palestinian history curriculum materials print resources',
                url: '/education/teachers.html',
                type: 'page',
                category: 'education',
                date: '2025-01-01'
            },
            {
                id: 'tools',
                title: 'Advocacy Tools',
                content: 'tools letter builder call scripts embassy directory share card generator supporter badge event finder',
                url: '/tools/letters.html',
                type: 'page',
                category: 'tools',
                date: '2025-01-01'
            },
            {
                id: 'legal',
                title: 'Legal Resources',
                content: 'legal international law UN resolutions war crimes apartheid genocide ICJ ICC',
                url: '/legal/index.html',
                type: 'page',
                category: 'legal',
                date: '2025-01-01'
            },
            {
                id: 'diaspora',
                title: 'Palestinian Diaspora',
                content: 'diaspora refugees displacement exile communities worldwide Palestinian communities',
                url: '/diaspora/index.html',
                type: 'page',
                category: 'diaspora',
                date: '2025-01-01'
            },
            {
                id: 'movements',
                title: 'Social Movements',
                content: 'women youth labor movements Palestinian feminism workers rights student activism',
                url: '/movements/women.html',
                type: 'page',
                category: 'movements',
                date: '2025-01-01'
            },
            {
                id: 'massacres',
                title: 'Massacres and Atrocities',
                content: 'massacres Deir Yassin Tantura Sabra Shatila atrocities war crimes genocide',
                url: '/massacres/deir-yassin.html',
                type: 'page',
                category: 'massacres',
                date: '2025-01-01'
            }
        ];
    }

    function debounceSearch() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (searchInput.value.length >= 2) {
                performSearch();
            }
        }, 300);
    }

    function performSearch() {
        const startTime = performance.now();
        const query = searchInput.value.trim().toLowerCase();

        if (!query) {
            showNoResults();
            return;
        }

        const contentType = contentTypeSelect.value;
        const dateRange = dateRangeSelect.value;

        // Filter results
        let results = searchIndex.filter(item => {
            // Text matching
            const titleMatch = item.title.toLowerCase().includes(query);
            const contentMatch = item.content.toLowerCase().includes(query);
            const matchesQuery = titleMatch || contentMatch;

            if (!matchesQuery) return false;

            // Content type filter
            if (contentType !== 'all' && item.category !== contentType) return false;

            // Date range filter (simplified - in real implementation would parse actual dates)
            if (dateRange !== 'all') {
                // For demo purposes, we'll just filter based on whether it's recent
                if (dateRange === 'week' && !item.content.includes('2025')) return false;
                if (dateRange === 'month' && !item.content.includes('2025')) return false;
                if (dateRange === 'year' && !item.content.includes('2024')) return false;
            }

            return true;
        });

        // Sort by relevance (title matches first, then content matches)
        results.sort((a, b) => {
            const aTitle = a.title.toLowerCase().includes(query);
            const bTitle = b.title.toLowerCase().includes(query);

            if (aTitle && !bTitle) return -1;
            if (!aTitle && bTitle) return 1;

            // If both have title matches or both don't, sort by content relevance
            return 0;
        });

        const endTime = performance.now();
        const searchDuration = (endTime - startTime).toFixed(2);

        displayResults(results, searchDuration);
    }

    function displayResults(results, duration) {
        resultsCount.textContent = results.length;
        searchTime.textContent = `(${duration}ms)`;

        if (results.length === 0) {
            showNoResults();
            return;
        }

        const resultsHTML = results.map(result => `
            <div class="search-result-item" data-result-id="${result.id}">
                <div class="result-header">
                    <h4><a href="${result.url}">${highlightQuery(result.title, searchInput.value)}</a></h4>
                    <span class="result-type ${result.category}">${capitalizeFirst(result.category)}</span>
                </div>
                <div class="result-url">${result.url}</div>
                <div class="result-content">
                    ${highlightQuery(extractSnippet(result.content, searchInput.value), searchInput.value)}
                </div>
                <div class="result-meta">
                    <span class="result-date">${formatDate(result.date)}</span>
                </div>
            </div>
        `).join('');

        resultsContainer.innerHTML = resultsHTML;
    }

    function showNoResults() {
        resultsCount.textContent = '0';
        searchTime.textContent = '';
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h4>No results found</h4>
                <p>Try different keywords or check your spelling</p>
                <div class="search-tips">
                    <strong>Tips:</strong>
                    <ul>
                        <li>Use simpler keywords</li>
                        <li>Try synonyms (e.g., "occupation" instead of "control")</li>
                        <li>Check for typos</li>
                        <li>Use the filters to narrow your search</li>
                    </ul>
                </div>
            </div>
        `;
    }

    function highlightQuery(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function extractSnippet(content, query) {
        if (!query) return content.substring(0, 200) + '...';

        const words = query.toLowerCase().split(' ');
        let bestSnippet = '';
        let bestScore = 0;

        // Find the most relevant 200-character snippet
        for (let i = 0; i < content.length - 200; i++) {
            const snippet = content.substring(i, i + 200);
            let score = 0;

            words.forEach(word => {
                if (snippet.toLowerCase().includes(word)) {
                    score += word.length; // Longer words get higher score
                }
            });

            if (score > bestScore) {
                bestScore = score;
                bestSnippet = snippet;
            }
        }

        return bestSnippet || content.substring(0, 200);
    }

    function capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    }

    // Initialize search with URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    if (initialQuery) {
        searchInput.value = initialQuery;
        performSearch();
    }
});
