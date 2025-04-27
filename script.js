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
