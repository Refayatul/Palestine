// Theme Toggle
const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
document.documentElement.setAttribute('data-theme', theme);

const themeButtons = document.querySelectorAll('.theme-toggle button');
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const themeValue = button.dataset.themeValue;
        localStorage.setItem('theme', themeValue);
        document.documentElement.setAttribute('data-theme', themeValue);
    });
});

// Adjust body top padding to nav height so hero image isn't obscured
function setNavHeight() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const h = nav.offsetHeight;
  document.documentElement.style.setProperty('--nav-h', h + 'px');
}

window.addEventListener('load', setNavHeight);
window.addEventListener('resize', setNavHeight);

// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.hasAttribute('hidden') ? false : true;
    if (open) {
      mobileNav.setAttribute('hidden', '');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    } else {
      mobileNav.removeAttribute('hidden');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
    }
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.setAttribute('hidden', ''); 
    hamburger.setAttribute('aria-expanded','false'); 
    document.body.classList.remove('no-scroll');
  }));
}

// Smooth scroll for in-page links
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  const el = document.querySelector(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Hero buttons
const joinBtn = document.getElementById('joinmovementbtn');
if (joinBtn) joinBtn.addEventListener('click', () => {
  const act = document.getElementById('act');
  if (act) act.scrollIntoView({ behavior: 'smooth' });
});

// Timeline popup
const tlBtn = document.getElementById('timelineBtn');
const tlPopup = document.getElementById('timelinePopup');
const tlClose = tlPopup ? tlPopup.querySelector('.close-timeline') : null;

function openTimeline(){ 
  tlPopup.removeAttribute('hidden'); 
  document.body.classList.add('no-scroll'); 
}

function closeTimeline(){ 
  tlPopup.setAttribute('hidden',''); 
  document.body.classList.remove('no-scroll'); 
}

if (tlBtn && tlPopup && tlClose) {
  tlBtn.addEventListener('click', openTimeline);
  tlClose.addEventListener('click', closeTimeline);
  tlPopup.addEventListener('click', (e) => { 
    if (e.target === tlPopup) closeTimeline(); 
  });
  tlPopup.querySelectorAll('.timeline-event').forEach(item => {
    item.addEventListener('click', () => {
      const url = item.getAttribute('data-url');
      if (url) window.open(url, '_blank', 'noopener');
    });
  });
}

// Donate modal
const donateTrigger = document.getElementById('donateTrigger');
const donateMenu = document.getElementById('donateMenu');
if (donateTrigger && donateMenu) {
  const closeBtn = donateMenu.querySelector('.close');
  donateTrigger.addEventListener('click', (e) => { 
    e.preventDefault(); 
    donateMenu.removeAttribute('hidden'); 
    document.body.classList.add('no-scroll'); 
  });
  closeBtn.addEventListener('click', () => { 
    donateMenu.setAttribute('hidden',''); 
    document.body.classList.remove('no-scroll'); 
  });
  donateMenu.addEventListener('click', (e) => { 
    if (e.target === donateMenu) { 
      donateMenu.setAttribute('hidden',''); 
      document.body.classList.remove('no-scroll'); 
    } 
  });
}

// Footer year
const y = document.getElementById('year'); 
if (y) y.textContent = new Date().getFullYear();