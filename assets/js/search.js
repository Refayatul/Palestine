// Search functionality using Fuse.js
async function loadSearchIndex() {
  try {
    const response = await fetch('/assets/data/search-index.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load search index:', error);
    return [];
  }
}

function initSearch() {
  const searchInput = document.getElementById('siteSearch');
  const searchPanel = document.getElementById('searchPanel');
  const searchResults = document.getElementById('searchResults');
  const searchClose = document.querySelector('.search-close');
  
  if (!searchInput || !searchPanel || !searchResults) return;
  
  let fuse;
  let searchIndex = [];
  
  // Initialize Fuse.js with search index
  loadSearchIndex().then(data => {
    searchIndex = data;
    fuse = new Fuse(data, {
      keys: ['title', 'summary'],
      threshold: 0.3,
      includeScore: true
    });
  });
  
  // Show search panel
  function showSearchPanel() {
    searchPanel.removeAttribute('hidden');
  }
  
  // Hide search panel
  function hideSearchPanel() {
    searchPanel.setAttribute('hidden', '');
  }
  
  // Perform search
  function performSearch(query) {
    if (!fuse || !query.trim()) {
      searchResults.innerHTML = '';
      return;
    }
    
    const results = fuse.search(query);
    displayResults(results.slice(0, 10)); // Show top 10 results
  }
  
  // Display search results
  function displayResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '<li class="no-results">No results found</li>';
      return;
    }
    
    searchResults.innerHTML = results.map(result => {
      const item = result.item;
      return `
        <li>
          <a href="${item.url}">
            <div class="search-kicker">${item.type}</div>
            <div class="search-title">${item.title}</div>
            <div class="search-summary">${item.summary}</div>
          </a>
        </li>
      `;
    }).join('');
  }
  
  // Event listeners
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      performSearch(searchInput.value);
      showSearchPanel();
    }
  });
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.trim()) {
      performSearch(query);
      showSearchPanel();
    } else {
      hideSearchPanel();
    }
  });
  
  // Close search panel
  if (searchClose) {
    searchClose.addEventListener('click', hideSearchPanel);
  }
  
  // Close search when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchPanel.contains(e.target) && e.target !== searchInput) {
      hideSearchPanel();
    }
  });
  
  // Keyboard navigation
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideSearchPanel();
      searchInput.blur();
    }
  });
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initSearch);