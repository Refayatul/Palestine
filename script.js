// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const hamburgerIcon = document.querySelector('.hamburger-icon');
const closeIcon = document.querySelector('.close-icon');

hamburger.addEventListener('click', function() {
  mobileNav.classList.toggle('active');
  hamburgerIcon.style.display = hamburgerIcon.style.display === 'none' ? 'inline' : 'none';
  closeIcon.style.display = closeIcon.style.display === 'none' ? 'inline' : 'none';
  document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on links
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', function() {
    mobileNav.classList.remove('active');
    hamburgerIcon.style.display = 'inline';
    closeIcon.style.display = 'none';
    document.body.style.overflow = '';
  });
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

// Timeline Popup Logic
const timelineBtn = document.getElementById('timelineBtn');
const timelinePopup = document.getElementById('timelinePopup');
const closeTimelineBtn = document.querySelector('.close-timeline');

if (timelineBtn && timelinePopup && closeTimelineBtn) {
    // Open popup when button is clicked
    timelineBtn.addEventListener('click', () => {
        timelinePopup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Close popup when close button is clicked
    closeTimelineBtn.addEventListener('click', () => {
        timelinePopup.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scroll
    });

    // Close popup when clicking outside the content area
    window.addEventListener('click', (event) => {
        if (event.target == timelinePopup) {
            timelinePopup.style.display = 'none';
            document.body.style.overflow = ''; // Restore background scroll
        }
    });
} else {
    console.error("Timeline popup elements not found. Check IDs and classes.");
}
document.addEventListener('DOMContentLoaded', function() {
  // Get the button by its ID
  const joinButton = document.getElementById('joinmovementbtn');
  
  // Add click event listener
  joinButton.addEventListener('click', function() {
      // Redirect to the "Take Action" page
      window.location.href = './pages/action.html';
  });
});