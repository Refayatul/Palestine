document.addEventListener('DOMContentLoaded', function() {
    // Add any JavaScript functionality here if needed
    // For example, animation on scroll or click events
    
    const options = document.querySelectorAll('.option');
    
    options.forEach(option => {
        // Skip the donate option (has donateTrigger link)
        if (!option.querySelector('#donateTrigger')) {
            option.addEventListener('click', function() {
                const link = this.querySelector('a');
                if (link && link.href && !link.href.includes('#')) {
                    window.location.href = link.href;
                }
            });
        }
    });
});
