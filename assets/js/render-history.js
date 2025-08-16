document.addEventListener('DOMContentLoaded', async () => {
    const timelineContainer = document.getElementById('timeline-container');
    const introText = document.getElementById('intro-text');
    const pageTitle = document.querySelector('.history-timeline-hero h1');

    // Function to extract year from URL or filename
    function getYearFromPath() {
        const pathSegments = window.location.pathname.split('/');
        const filename = pathSegments[pathSegments.length - 1];
        const yearMatch = filename.match(/(\d{4})\.html/);
        if (yearMatch) {
            return yearMatch[1];
        }
        // Fallback for query parameter if needed, though spec implies filename
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('year');
    }

    const year = getYearFromPath();
    if (!year) {
        timelineContainer.innerHTML = '<p>Error: Year not specified in URL.</p>';
        return;
    }

    const historyDataUrl = `/assets/data/history/${year}.json`;

    async function fetchHistoryData() {
        try {
            const response = await fetch(historyDataUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            renderTimeline(data);
        } catch (error) {
            console.error(`Error fetching history data for ${year}:`, error);
            timelineContainer.innerHTML = `<p>Failed to load history for ${year}. Please try again later.</p>`;
            introText.textContent = 'Failed to load introduction.';
        }
    }

    function renderTimeline(data) {
        if (pageTitle) {
            pageTitle.textContent = data.year;
        }
        if (introText) {
            introText.textContent = data.intro;
        }

        timelineContainer.innerHTML = ''; // Clear previous results

        if (data.events && data.events.length > 0) {
            data.events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'timeline-event';
                eventElement.id = event.id; // For deep linking

                const sourcesHtml = event.sources ? event.sources.map(source => `
                    <li class="source-item">
                        <a href="${source.url}" target="_blank" rel="noopener noreferrer">
                            ${source.title} (${source.publisher || 'N/A'}, ${source.date_accessed || 'N/A'})
                        </a>
                        <button class="copy-citation-btn btn-small" aria-label="Copy citation for ${event.title}">Copy Citation</button>
                    </li>
                `).join('') : '';

                eventElement.innerHTML = `
                    <div class="event-date">${event.date}</div>
                    <div class="event-content">
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-text">${event.text}</p>
                        ${sourcesHtml ? `<div class="event-sources"><h4>Sources:</h4><ul class="source-list">${sourcesHtml}</ul></div>` : ''}
                    </div>
                `;
                timelineContainer.appendChild(eventElement);
            });

            // Add copy citation functionality
            timelineContainer.querySelectorAll('.copy-citation-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const sourceItem = e.target.closest('.source-item');
                    if (sourceItem) {
                        const citationText = sourceItem.querySelector('a').textContent.trim();
                        navigator.clipboard.writeText(citationText).then(() => {
                            const originalText = button.textContent;
                            button.textContent = 'Copied!';
                            button.setAttribute('aria-live', 'assertive');
                            setTimeout(() => {
                                button.textContent = originalText;
                                button.removeAttribute('aria-live');
                            }, 1500);
                        }).catch(err => {
                            console.error('Failed to copy citation: ', err);
                        });
                    }
                });
            });

            // Handle deep linking (hash scrolling)
            if (window.location.hash) {
                const targetElement = document.getElementById(window.location.hash.substring(1));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Optional: Add a visual highlight to the deep-linked event
                    targetElement.classList.add('highlight-event');
                    setTimeout(() => {
                        targetElement.classList.remove('highlight-event');
                    }, 3000);
                }
            }

        } else {
            timelineContainer.innerHTML = '<p>No events found for this year.</p>';
        }
    }

    fetchHistoryData();
});
