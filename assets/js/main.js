const pageUrl = encodeURIComponent(window.location.href);
const pageTitle = encodeURIComponent(document.title);

function setModalOpen(element, isOpen) {
  if (!element) return;
  element.style.display = isOpen ? 'block' : 'none';
  element.setAttribute('aria-hidden', String(!isOpen));
  document.body.classList.toggle('no-scroll', isOpen);
}

function closeMobileNav() {
  const mobileNav = document.querySelector('.mobile-nav');
  const hamburger = document.querySelector('.hamburger');
  if (!mobileNav) return;
  mobileNav.classList.remove('active');
  if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}

// Mobile navigation.
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.setAttribute('role', 'button');
  hamburger.setAttribute('tabindex', '0');
  hamburger.setAttribute('aria-label', 'Open navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');

  const toggleMobileNav = () => {
    const isOpen = mobileNav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  };

  hamburger.addEventListener('click', toggleMobileNav);
  hamburger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMobileNav();
    }
  });

  mobileNav.querySelectorAll('.mobile-dropdown > a').forEach((dropdownLink) => {
    dropdownLink.addEventListener('click', (event) => {
      event.preventDefault();
      dropdownLink.parentElement.classList.toggle('active');
    });
  });

  mobileNav.querySelectorAll('a:not(.mobile-dropdown > a)').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('click', (event) => {
    if (
      mobileNav.classList.contains('active') &&
      !mobileNav.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      closeMobileNav();
    }
  });
}

// Smooth scroll for in-page links.
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute('href');
  if (!targetId || targetId === '#') return;

  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    event.preventDefault();
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMobileNav();
  }
});

// Hero buttons.
const joinBtn = document.getElementById('joinmovementbtn');
if (joinBtn) {
  joinBtn.addEventListener('click', () => {
    const act = document.getElementById('act');
    if (act) act.scrollIntoView({ behavior: 'smooth' });
  });
}

// Timeline popup.
const timelineBtn = document.getElementById('timelineBtn');
const timelinePopup = document.getElementById('timelinePopup');
if (timelineBtn && timelinePopup) {
  const closeTimeline = timelinePopup.querySelector('.close-timeline');

  timelineBtn.addEventListener('click', () => setModalOpen(timelinePopup, true));
  closeTimeline?.addEventListener('click', () => setModalOpen(timelinePopup, false));
  timelinePopup.addEventListener('click', (event) => {
    if (event.target === timelinePopup) setModalOpen(timelinePopup, false);
  });

  timelinePopup.querySelectorAll('.timeline-event').forEach((item) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'link');
    const openEvent = () => {
      const url = item.getAttribute('data-url');
      if (url) window.location.href = url;
    };
    item.addEventListener('click', openEvent);
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openEvent();
      }
    });
  });
}

// Donate modal.
const donateTrigger = document.getElementById('donateTrigger');
const donateMenu = document.getElementById('donateMenu');
if (donateTrigger && donateMenu) {
  const closeDonate = donateMenu.querySelector('.close');

  donateTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    setModalOpen(donateMenu, true);
  });

  closeDonate?.addEventListener('click', (event) => {
    event.preventDefault();
    setModalOpen(donateMenu, false);
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeMobileNav();
  setModalOpen(timelinePopup, false);
  setModalOpen(donateMenu, false);
});

// Share and contact shortcuts.
const shareLink = document.getElementById('sharePage');
if (shareLink) {
  shareLink.addEventListener('click', async (event) => {
    event.preventDefault();
    if (navigator.share) {
      await navigator.share({ title: document.title, url: window.location.href });
      return;
    }
    await navigator.clipboard?.writeText(window.location.href);
    shareLink.textContent = 'Link Copied';
    setTimeout(() => {
      shareLink.textContent = 'Share';
    }, 1800);
  });
}

const contactLink = document.getElementById('contactReps');
if (contactLink) {
  contactLink.setAttribute(
    'href',
    `mailto:?subject=${pageTitle}&body=${pageUrl}`
  );
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
