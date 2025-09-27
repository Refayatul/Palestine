document.addEventListener('DOMContentLoaded', function() {
    const countryFilter = document.getElementById('country-filter');
    const cityFilter = document.getElementById('city-filter');
    const embassiesGrid = document.getElementById('embassies-grid');
    const resultsCount = document.getElementById('results-count');

    // Embassy data
    const embassies = [
        {
            id: 1,
            country: "us",
            city: "washington-dc",
            name: "Embassy of the United States",
            address: "600 New Hampshire Avenue NW, Washington, DC 20037",
            phone: "+1-202-588-6500",
            email: "palestine@state.gov",
            website: "https://usembassy.state.gov/embassies-consulates/jerusalem/",
            type: "embassy",
            notes: "US Embassy in Jerusalem serves Palestine-related diplomatic functions"
        },
        {
            id: 2,
            country: "us",
            city: "new-york",
            name: "US Mission to the United Nations",
            address: "799 United Nations Plaza, New York, NY 10017",
            phone: "+1-212-415-4000",
            email: "usun@state.gov",
            website: "https://usun.usmission.gov/",
            type: "mission",
            notes: "UN-related diplomatic functions"
        },
        {
            id: 3,
            country: "uk",
            city: "london",
            name: "Foreign, Commonwealth & Development Office",
            address: "King Charles Street, London SW1A 2AH",
            phone: "+44-20-7008-1500",
            email: "palestine@fco.gov.uk",
            website: "https://www.gov.uk/world/organisations/british-embassy-tel-aviv",
            type: "foreign-office",
            notes: "Handles UK-Palestine diplomatic relations"
        },
        {
            id: 4,
            country: "canada",
            city: "ottawa",
            name: "Global Affairs Canada",
            address: "125 Sussex Drive, Ottawa, ON K1A 0G2",
            phone: "+1-613-944-4000",
            email: "palestine@international.gc.ca",
            website: "https://www.international.gc.ca/world-monde/canada-palestine.aspx",
            type: "foreign-affairs",
            notes: "Canadian diplomatic relations with Palestine"
        },
        {
            id: 5,
            country: "germany",
            city: "berlin",
            name: "Federal Foreign Office",
            address: "Werderscher Markt 1, 10117 Berlin",
            phone: "+49-30-5000-0",
            email: "palestine@auswaertiges-amt.de",
            website: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/palaestinensische-gebiete",
            type: "foreign-office",
            notes: "German diplomatic relations with Palestine"
        },
        {
            id: 6,
            country: "france",
            city: "paris",
            name: "Ministry of Foreign Affairs",
            address: "37 Quai d'Orsay, 75007 Paris",
            phone: "+33-1-43-17-53-53",
            email: "palestine@diplomatie.gouv.fr",
            website: "https://franceintheworld.gouv.fr/en/countries/palestine",
            type: "foreign-affairs",
            notes: "French diplomatic relations with Palestine"
        },
        {
            id: 7,
            country: "italy",
            city: "rome",
            name: "Ministry of Foreign Affairs",
            address: "Piazzale della Farnesina, 1, 00135 Rome",
            phone: "+39-06-3691-1",
            email: "palestine@esteri.it",
            website: "https://www.esteri.it/mae/en/politica_estera/aree_geografiche/medioriente/palestina.html",
            type: "foreign-affairs",
            notes: "Italian diplomatic relations with Palestine"
        },
        {
            id: 8,
            country: "spain",
            city: "madrid",
            name: "Ministry of Foreign Affairs",
            address: "Calle José Ortega y Gasset, 9, 28006 Madrid",
            phone: "+34-91-379-97-00",
            email: "palestine@exteriores.gob.es",
            website: "https://www.exteriores.gob.es/es/Paginas/index.aspx",
            type: "foreign-affairs",
            notes: "Spanish diplomatic relations with Palestine"
        },
        {
            id: 9,
            country: "netherlands",
            city: "amsterdam",
            name: "Ministry of Foreign Affairs",
            address: "Bezuidenhoutseweg 67, 2594 AC The Hague",
            phone: "+31-70-348-64-86",
            email: "palestine@minbuza.nl",
            website: "https://www.government.nl/topics/palestine",
            type: "foreign-affairs",
            notes: "Dutch diplomatic relations with Palestine"
        },
        {
            id: 10,
            country: "australia",
            city: "canberra",
            name: "Department of Foreign Affairs and Trade",
            address: "R.G. Casey Building, John McEwen Crescent, Barton ACT 0221",
            phone: "+61-2-6261-1111",
            email: "palestine@dfat.gov.au",
            website: "https://www.dfat.gov.au/geo/palestine",
            type: "foreign-affairs",
            notes: "Australian diplomatic relations with Palestine"
        },
        {
            id: 11,
            country: "germany",
            city: "berlin",
            name: "Palestinian General Delegation to Germany",
            address: "Hohenzollerndamm 18, 14199 Berlin",
            phone: "+49-30-8973-0500",
            email: "info@palestinavertretung.de",
            website: "https://www.palestinavertretung.de/",
            type: "palestinian-mission",
            notes: "Official Palestinian diplomatic mission in Germany"
        },
        {
            id: 12,
            country: "france",
            city: "paris",
            name: "Palestinian General Delegation to France",
            address: "4 Rue de l'Orillon, 75011 Paris",
            phone: "+33-1-43-70-33-00",
            email: "info@cgpalestine.fr",
            website: "https://www.cgpalestine.fr/",
            type: "palestinian-mission",
            notes: "Official Palestinian diplomatic mission in France"
        },
        {
            id: 13,
            country: "uk",
            city: "london",
            name: "Palestinian General Delegation to the UK",
            address: "The London Office, 1A Michael Road, London SW6 2ER",
            phone: "+44-20-7385-1918",
            email: "info@palestineoffice.org.uk",
            website: "https://www.palestineoffice.org.uk/",
            type: "palestinian-mission",
            notes: "Official Palestinian diplomatic mission in the UK"
        },
        {
            id: 14,
            country: "canada",
            city: "ottawa",
            name: "Palestinian General Delegation to Canada",
            address: "170 Laurier Avenue West, Suite 510, Ottawa, ON K1P 5V5",
            phone: "+1-613-230-0690",
            email: "info@palestinecanada.org",
            website: "https://www.palestinecanada.org/",
            type: "palestinian-mission",
            notes: "Official Palestinian diplomatic mission in Canada"
        },
        {
            id: 15,
            country: "us",
            city: "washington-dc",
            name: "Palestinian Liberation Organization Mission",
            address: "1320 18th Street NW, Washington, DC 20036",
            phone: "+1-202-974-6360",
            email: "info@palestineun.org",
            website: "https://palestineun.org/",
            type: "palestinian-mission",
            notes: "Official Palestinian diplomatic mission in the US"
        }
    ];

    // Render embassies
    function renderEmbassies(embassiesList) {
        embassiesGrid.innerHTML = '';

        if (embassiesList.length === 0) {
            embassiesGrid.innerHTML = '<div class="no-embassies">No embassies found matching your criteria. Try adjusting your filters.</div>';
            return;
        }

        embassiesList.forEach(embassy => {
            const embassyCard = document.createElement('div');
            embassyCard.className = 'embassy-card';
            embassyCard.innerHTML = `
                <div class="embassy-header">
                    <h3>${embassy.name}</h3>
                    <div class="embassy-meta">
                        <span class="country-tag">${embassy.country.toUpperCase()}</span>
                        <span class="city-tag">${embassy.city.replace('-', ' ').toUpperCase()}</span>
                        <span class="type-tag">${embassy.type.replace('-', ' ')}</span>
                    </div>
                </div>
                <div class="embassy-content">
                    <div class="embassy-info">
                        <p><i class="fas fa-map-marker-alt"></i> ${embassy.address}</p>
                        <p><i class="fas fa-phone"></i> ${embassy.phone}</p>
                        <p><i class="fas fa-envelope"></i> ${embassy.email}</p>
                        ${embassy.notes ? `<p class="notes"><i class="fas fa-info-circle"></i> ${embassy.notes}</p>` : ''}
                    </div>
                </div>
                <div class="embassy-actions">
                    <button class="btn copy-phone" data-phone="${embassy.phone}">Copy Phone</button>
                    <button class="btn copy-email" data-email="${embassy.email}">Copy Email</button>
                    <a href="${embassy.website}" target="_blank" class="btn visit-website">Visit Website</a>
                </div>
            `;
            embassiesGrid.appendChild(embassyCard);
        });

        // Add event listeners for copy buttons
        document.querySelectorAll('.copy-phone').forEach(button => {
            button.addEventListener('click', function() {
                const phone = this.getAttribute('data-phone');
                copyToClipboard(phone, 'Phone number copied!');
            });
        });

        document.querySelectorAll('.copy-email').forEach(button => {
            button.addEventListener('click', function() {
                const email = this.getAttribute('data-email');
                copyToClipboard(email, 'Email address copied!');
            });
        });
    }

    // Filter embassies
    function filterEmbassies() {
        const countryValue = countryFilter.value;
        const cityValue = cityFilter.value;

        const filteredEmbassies = embassies.filter(embassy => {
            const countryMatch = !countryValue || embassy.country === countryValue;
            const cityMatch = !cityValue || embassy.city === cityValue;

            return countryMatch && cityMatch;
        });

        resultsCount.textContent = filteredEmbassies.length;
        renderEmbassies(filteredEmbassies);
    }

    // Copy to clipboard function
    function copyToClipboard(text, successMessage) {
        navigator.clipboard.writeText(text).then(function() {
            showFeedback(successMessage, 'success');
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            showFeedback('Failed to copy. Please select and copy manually.', 'error');
        });
    }

    // Show feedback message
    function showFeedback(message, type) {
        const feedback = document.createElement('div');
        feedback.className = `feedback-message ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 3000);
    }

    // Add CSS animations for feedback
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Event listeners
    countryFilter.addEventListener('change', filterEmbassies);
    cityFilter.addEventListener('change', filterEmbassies);

    // Initial render
    filterEmbassies();
});
