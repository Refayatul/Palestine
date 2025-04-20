document.addEventListener('DOMContentLoaded', function() {
    // Add any JavaScript functionality here if needed
    // For example, animation on scroll or click events
    
    const options = document.querySelectorAll('.option');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Example: Open the link when clicking anywhere on the option
            const link = this.querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
});