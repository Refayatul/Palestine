document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Method Card Expansion
    const methodCards = document.querySelectorAll('.method-card');
    
    methodCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link or button
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            
            const details = this.querySelector('.method-details');
            details.style.display = details.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Martyr Modal
    const martyrCards = document.querySelectorAll('.martyr-card');
    const martyrData = {
        "ghassan-kanafani": {
            name: "Ghassan Kanafani",
            bio: "Palestinian writer and PFLP spokesman assassinated by Mossad in 1972 car bombing.",
            works: "Men in the Sun, Returning to Haifa",
            quote: "The Palestinian cause is not a cause for Palestinians only, but a cause for every revolutionary."
        },
        // Add data for other martyrs
    };

    martyrCards.forEach(card => {
        card.addEventListener('click', function() {
            const martyrName = this.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');
            const martyr = martyrData[martyrName];
            
            if (martyr) {
                // Create modal HTML
                const modalHTML = `
                    <div class="martyr-modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img src="${this.querySelector('img').src}" alt="${martyr.name}">
                            <h2>${martyr.name}</h2>
                            <p>${martyr.bio}</p>
                            <h3>Notable Works:</h3>
                            <p>${martyr.works}</p>
                            <blockquote>${martyr.quote}</blockquote>
                        </div>
                    </div>
                `;
                
                // Add to DOM
                document.body.insertAdjacentHTML('beforeend', modalHTML);
                
                // Close modal
                document.querySelector('.martyr-modal .close').addEventListener('click', function() {
                    document.querySelector('.martyr-modal').remove();
                });
            }
        });
    });

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('martyr-modal')) {
            e.target.remove();
        }
    });
});