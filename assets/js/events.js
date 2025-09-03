document.addEventListener('DOMContentLoaded', function () {
    const locationInput = document.getElementById('location-input');
    const eventTypeSelect = document.getElementById('event-type');
    const dateRangeSelect = document.getElementById('date-range');
    const searchEventsBtn = document.getElementById('search-events-btn');
    const useLocationBtn = document.getElementById('use-location-btn');
    const eventsList = document.getElementById('events-list');
    const resultsCount = document.getElementById('results-count');

    // Mock event data (in a real implementation, this would come from an API)
    const mockEvents = [
        {
            id: 1,
            title: "Palestine Solidarity March",
            type: "march",
            date: "2025-01-15",
            time: "14:00",
            location: "New York City, NY",
            description: "Join thousands in a peaceful march for Palestinian rights and an end to the occupation.",
            organizer: "NYC Palestine Coalition",
            coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        {
            id: 2,
            title: "Vigil for Gaza",
            type: "vigil",
            date: "2025-01-18",
            time: "18:00",
            location: "Los Angeles, CA",
            description: "Candlelight vigil remembering the victims of Gaza and calling for peace.",
            organizer: "LA Palestine Action Network",
            coordinates: { lat: 34.0522, lng: -118.2437 }
        },
        {
            id: 3,
            title: "Palestine Awareness Workshop",
            type: "workshop",
            date: "2025-01-20",
            time: "19:00",
            location: "Chicago, IL",
            description: "Educational workshop on Palestinian history and current events.",
            organizer: "Chicago BDS Coalition",
            coordinates: { lat: 41.8781, lng: -87.6298 }
        },
        {
            id: 4,
            title: "Student Rally for Palestine",
            type: "rally",
            date: "2025-01-22",
            time: "12:00",
            location: "Boston, MA",
            description: "Student-led rally calling for university divestment from companies supporting Israeli occupation.",
            organizer: "Harvard Palestine Solidarity",
            coordinates: { lat: 42.3601, lng: -71.0589 }
        },
        {
            id: 5,
            title: "Interfaith Prayer for Peace",
            type: "vigil",
            date: "2025-01-25",
            time: "17:00",
            location: "Seattle, WA",
            description: "Interfaith gathering praying for peace and justice in Palestine.",
            organizer: "Seattle MENA Coalition",
            coordinates: { lat: 47.6062, lng: -122.3321 }
        },
        {
            id: 6,
            title: "Palestine Film Screening",
            type: "meeting",
            date: "2025-01-28",
            time: "19:30",
            location: "Austin, TX",
            description: "Screening of documentary films about Palestinian resistance and culture.",
            organizer: "Austin Palestine Film Festival",
            coordinates: { lat: 30.2672, lng: -97.7431 }
        }
    ];

    // Event listeners
    searchEventsBtn.addEventListener('click', searchEvents);
    useLocationBtn.addEventListener('click', useCurrentLocation);
    locationInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchEvents();
        }
    });

    // Initialize with some events
    displayEvents(mockEvents);

    function searchEvents() {
        const location = locationInput.value.toLowerCase();
        const eventType = eventTypeSelect.value;
        const dateRange = dateRangeSelect.value;

        let filteredEvents = mockEvents;

        // Filter by location
        if (location) {
            filteredEvents = filteredEvents.filter(event =>
                event.location.toLowerCase().includes(location)
            );
        }

        // Filter by event type
        if (eventType !== 'all') {
            filteredEvents = filteredEvents.filter(event =>
                event.type === eventType
            );
        }

        // Filter by date range
        const now = new Date();
        if (dateRange !== 'all') {
            filteredEvents = filteredEvents.filter(event => {
                const eventDate = new Date(event.date);
                const diffTime = eventDate - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                switch (dateRange) {
                    case 'today':
                        return diffDays === 0;
                    case 'week':
                        return diffDays >= 0 && diffDays <= 7;
                    case 'month':
                        return diffDays >= 0 && diffDays <= 30;
                    default:
                        return true;
                }
            });
        }

        displayEvents(filteredEvents);
    }

    function useCurrentLocation() {
        if (navigator.geolocation) {
            useLocationBtn.textContent = 'Getting location...';
            useLocationBtn.disabled = true;

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    // In a real implementation, you would reverse geocode the coordinates
                    // For now, we'll just set a placeholder
                    locationInput.value = "Current Location";
                    useLocationBtn.textContent = 'Location found!';
                    useLocationBtn.disabled = false;

                    setTimeout(() => {
                        useLocationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Use My Location';
                        useLocationBtn.disabled = false;
                    }, 2000);

                    // Search with current location
                    searchEvents();
                },
                function (error) {
                    console.error('Error getting location:', error);
                    useLocationBtn.textContent = 'Location error';
                    useLocationBtn.disabled = false;

                    setTimeout(() => {
                        useLocationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Use My Location';
                        useLocationBtn.disabled = false;
                    }, 2000);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    function displayEvents(events) {
        resultsCount.textContent = events.length;

        if (events.length === 0) {
            eventsList.innerHTML = `
                <div class="no-events">
                    <i class="fas fa-search"></i>
                    <h4>No events found</h4>
                    <p>Try adjusting your search criteria or location</p>
                </div>
            `;
            return;
        }

        const eventsHTML = events.map(event => `
            <div class="event-card" data-event-id="${event.id}">
                <div class="event-header">
                    <h4>${event.title}</h4>
                    <span class="event-type ${event.type}">${capitalizeFirst(event.type)}</span>
                </div>
                <div class="event-details">
                    <div class="event-date-time">
                        <i class="fas fa-calendar"></i>
                        ${formatDate(event.date)} at ${formatTime(event.time)}
                    </div>
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${event.location}
                    </div>
                    <div class="event-organizer">
                        <i class="fas fa-users"></i>
                        Organized by ${event.organizer}
                    </div>
                </div>
                <div class="event-description">
                    <p>${event.description}</p>
                </div>
                <div class="event-actions">
                    <button class="btn-secondary event-share" data-event-id="${event.id}">
                        <i class="fas fa-share"></i> Share
                    </button>
                    <button class="btn-primary event-attend" data-event-id="${event.id}">
                        <i class="fas fa-plus"></i> I'm Interested
                    </button>
                </div>
            </div>
        `).join('');

        eventsList.innerHTML = eventsHTML;

        // Add event listeners to buttons
        document.querySelectorAll('.event-share').forEach(btn => {
            btn.addEventListener('click', function () {
                const eventId = this.getAttribute('data-event-id');
                shareEvent(eventId);
            });
        });

        document.querySelectorAll('.event-attend').forEach(btn => {
            btn.addEventListener('click', function () {
                const eventId = this.getAttribute('data-event-id');
                attendEvent(eventId, this);
            });
        });
    }

    function shareEvent(eventId) {
        const event = mockEvents.find(e => e.id == eventId);
        if (event) {
            const shareText = `Join us: ${event.title} on ${formatDate(event.date)} at ${event.location}. #FreePalestine`;
            const shareUrl = window.location.href;

            if (navigator.share) {
                navigator.share({
                    title: event.title,
                    text: shareText,
                    url: shareUrl
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
                    showFeedback('Event details copied to clipboard!');
                });
            }
        }
    }

    function attendEvent(eventId, button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Added to Calendar';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    function capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function showFeedback(message) {
        // Simple feedback - in a real implementation, you might use a toast notification
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
        `;
        document.body.appendChild(feedback);

        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 3000);
    }
});
