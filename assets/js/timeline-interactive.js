// assets/js/timeline-interactive.js

document.addEventListener('DOMContentLoaded', () => {
    const timelinePopup = document.getElementById('timelinePopup');
    const timelineBtn = document.getElementById('timelineBtn');
    const closeTimelineBtn = document.querySelector('.close-timeline');

    if (timelineBtn) {
        timelineBtn.addEventListener('click', () => {
            timelinePopup.style.display = 'block';
        });
    }

    if (closeTimelineBtn) {
        closeTimelineBtn.addEventListener('click', () => {
            timelinePopup.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === timelinePopup) {
            timelinePopup.style.display = 'none';
        }
    });

    // Prevent default link behavior and open in new tab
    const timelineLinks = document.querySelectorAll('.timeline-container a');
    timelineLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.open(link.href, '_blank');
        });
    });

    // Optional: Add more advanced timeline interactivity here
    // For example, filtering events by category, dynamic loading, etc.
});
