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

// Donate Menu Functionality
const donateTrigger = document.getElementById('donateTrigger');
const donateMenu = document.getElementById('donateMenu');
const closeDonate = document.querySelector('#donateMenu .close');

donateTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    donateMenu.style.display = 'block';
});

closeDonate.addEventListener('click', (e) => {
    e.preventDefault();
    donateMenu.style.display = 'none';
});

// Close donate menu when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === donateMenu) {
        donateMenu.style.display = 'none';
    }
});

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