// Simple include function
async function includeHTML(file, containerId) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error('Failed to load');
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error('Error loading', file, error);
        document.getElementById(containerId).innerHTML = '<p>Navigation loading...</p>';
    }
}

// Global include function
window.includeNavFooter = async function () {
    try {
        const response = await fetch('/assets/commons/commonNavFooter.html');
        if (!response.ok) throw new Error('Failed to load commonNavFooter.html');
        const html = await response.text();

        // Parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract navigation elements
        const navElements = doc.querySelector('nav');
        const mobileNavElements = doc.querySelector('.mobile-nav');

        // Extract footer elements
        const footerElements = doc.querySelector('footer');

        // Insert navigation at the top
        const navContainer = document.getElementById('nav-container');
        if (navContainer && navElements) {
            const navWrapper = document.createElement('div');
            navWrapper.appendChild(navElements.cloneNode(true));
            if (mobileNavElements) {
                navWrapper.appendChild(mobileNavElements.cloneNode(true));
            }
            navContainer.parentNode.replaceChild(navWrapper, navContainer);
        }

        // Insert footer at the bottom
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer && footerElements) {
            const footerWrapper = document.createElement('div');
            footerWrapper.appendChild(footerElements.cloneNode(true));
            footerContainer.parentNode.replaceChild(footerWrapper, footerContainer);
        }
    } catch (error) {
        console.error('Error loading navigation and footer:', error);
        // Fallback: show error message
        const navContainer = document.getElementById('nav-container');
        const footerContainer = document.getElementById('footer-container');
        if (navContainer) navContainer.innerHTML = '<p>Navigation loading...</p>';
        if (footerContainer) footerContainer.innerHTML = '<p>Footer loading...</p>';
    }
};

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileDropdowns = document.querySelectorAll('.mobile-dropdown > a');

hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

// Mobile dropdown toggle
mobileDropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = dropdown.parentElement;
        parent.classList.toggle('active');
    });
});

// Timeline Popup Functionality
const timelineBtn = document.getElementById('timelineBtn');
const timelinePopup = document.getElementById('timelinePopup');
const closeTimeline = document.querySelector('.close-timeline');
const timelineEvents = document.querySelectorAll('.timeline-event');

timelineBtn.addEventListener('click', () => {
    timelinePopup.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeTimeline.addEventListener('click', () => {
    timelinePopup.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close timeline popup when clicking outside content
timelinePopup.addEventListener('click', (e) => {
    if (e.target === timelinePopup) {
        timelinePopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Open timeline event pages
timelineEvents.forEach(event => {
    event.addEventListener('click', () => {
        const url = event.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }
    });
});

// Close timeline with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && timelinePopup.style.display === 'block') {
        closeTimeline.click();
    }
});

// Donate Menu Functionality - moved to DOMContentLoaded

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('active') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)) {
        mobileNav.classList.remove('active');
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        }
    });
});

// Index page specific functionality
document.addEventListener('DOMContentLoaded', function () {
    // Only run on index page
    if (!document.querySelector('.hero')) return;

    // Smooth scroll for hero scroll indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function () {
            const nextSection = document.querySelector('#history');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Add hover effects for action cards
    const actionOptions = document.querySelectorAll('.option');
    actionOptions.forEach(option => {
        option.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        option.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Donate menu functionality
    const donateTrigger = document.getElementById('donateTrigger');
    const donateMenu = document.getElementById('donateMenu');
    const closeDonate = document.querySelector('#donateMenu .close');

    if (donateTrigger && donateMenu) {
        donateTrigger.addEventListener('click', function (e) {
            e.preventDefault();
            donateMenu.style.display = donateMenu.style.display === 'block' ? 'none' : 'block';
        });

        if (closeDonate) {
            closeDonate.addEventListener('click', function (e) {
                e.preventDefault();
                donateMenu.style.display = 'none';
            });
        }

        // Close donate menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!donateTrigger.contains(e.target) && !donateMenu.contains(e.target)) {
                donateMenu.style.display = 'none';
            }
        });
    }
});
