// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Change hamburger icon
    const icon = hamburger.querySelector('i');
    if (mobileNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
        
        // Reset hamburger icon
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Timeline Popup Logic
const timelineBtn = document.getElementById('timelineBtn');
const timelinePopup = document.getElementById('timelinePopup');
const closeTimelineBtn = document.querySelector('.close-timeline');

// Open popup when button is clicked
timelineBtn.addEventListener('click', () => {
    timelinePopup.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close popup when close button is clicked
closeTimelineBtn.addEventListener('click', () => {
    timelinePopup.classList.remove('active');
    document.body.style.overflow = '';
});

// Close popup when clicking outside the content area
window.addEventListener('click', (event) => {
    if (event.target === timelinePopup) {
        timelinePopup.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle timeline event clicks to open in new tabs
document.querySelectorAll('.timeline-popup .timeline-event').forEach(event => {
    event.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        if (url) {
            window.open(url, '_blank');
        }
    });
});

// Join Movement Button
document.getElementById('joinmovementbtn').addEventListener('click', function() {
    // Scroll to action section
    document.getElementById('act').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Donate Menu Toggle
const donateTrigger = document.getElementById('donateTrigger');
const donateMenu = document.getElementById('donateMenu');
const closeDonate = document.querySelector('#donateMenu .close');

donateTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    donateMenu.classList.add('active');
});

closeDonate.addEventListener('click', () => {
    donateMenu.classList.remove('active');
});

window.addEventListener('click', (event) => {
    if (event.target === donateMenu) {
        donateMenu.classList.remove('active');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-event, .method, .betrayal-item, .option, .stat-card, .resource-card, .news-card, .event-card, .highlight, .goal-card').forEach(el => {
    observer.observe(el);
});

// Initialize animations for elements already in view
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.timeline-event, .method, .betrayal-item, .option, .stat-card, .resource-card, .news-card, .event-card, .highlight, .goal-card');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.style.animation = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
        }
    });
});

// Gallery hover effect enhancement
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.gallery-overlay').style.opacity = '1';
        item.querySelector('img').style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.gallery-overlay').style.opacity = '0';
        item.querySelector('img').style.transform = 'scale(1)';
    });
});