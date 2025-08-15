// assets/js/period-navigation.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.historical-periods-grid .period-card a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Optional: Add smooth scrolling or other effects when navigating between periods
            // For now, it's a direct link, but this JS file can be expanded for more complex navigation
            console.log(`Navigating to: ${event.target.href}`);
        });
    });

    // Example of a simple back-to-history-hub button if needed on period pages
    // const backButton = document.getElementById('backToHistoryHub');
    // if (backButton) {
    //     backButton.addEventListener('click', () => {
    //         window.location.href = '../pages/history.html';
    //     });
    // }
});