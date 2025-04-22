// Mobile Menu Toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Donate Pop-up Menu Logic
document.addEventListener('DOMContentLoaded', function() {
    const donateTrigger = document.getElementById('donateTrigger');
    const donateMenu = document.getElementById('donateMenu');
    const closeButton = donateMenu ? donateMenu.querySelector('.close') : null;

    if (donateTrigger && donateMenu && closeButton) {
        // Show menu on trigger click
        donateTrigger.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            donateMenu.classList.add('active');
        });

        // Hide menu on close button click
        closeButton.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            donateMenu.classList.remove('active');
        });

        // Hide menu when clicking outside of it
        document.addEventListener('click', function(event) {
            if (donateMenu.classList.contains('active') && 
                !donateMenu.contains(event.target) && 
                event.target !== donateTrigger) {
                donateMenu.classList.remove('active');
            }
        });
    } else {
        // Log an error if elements aren't found, helps debugging
        if (!donateTrigger) console.error("Donate trigger button not found.");
        if (!donateMenu) console.error("Donate menu element not found.");
        if (!closeButton) console.error("Close button inside donate menu not found.");
    }
});
