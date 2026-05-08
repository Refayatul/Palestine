const SITE_NAV_HTML = `
<nav>
  <div class="logo">
    <a href="/index.html"><span>Free<span>Palestine</span></span></a>
  </div>
  <ul class="nav-links">
    <li><a href="/index.html">Home</a></li>
    <li><a href="/pages/history_pages/history.html">History</a></li>
    <li><a href="/pages/resistance_pages/resistance.html">Resistance</a></li>
    <li><a href="/pages/betrayals_pages/betrayals.html">Betrayals</a></li>
    <li><a href="/pages/action_pages/action.html">Take Action</a></li>
    <li><a href="/index.html#resources">Resources</a></li>
    <li><a href="/index.html#culture">Culture</a></li>
    <li class="dropdown">
      <a href="#">More <i class="fas fa-caret-down"></i></a>
      <ul class="dropdown-menu">
        <li><a href="/myths/index.html">Myths</a></li>
        <li><a href="/legal/index.html">Legal</a></li>
        <li><a href="/diaspora/index.html">Diaspora</a></li>
        <li><a href="/education/teachers.html">Education</a></li>
        <li><a href="/movements/women.html">Movements</a></li>
        <li><a href="/boycott/supporting.html">Boycotts Supporting</a></li>
        <li><a href="/boycott/supportive.html">Boycotts Supportive</a></li>
      </ul>
    </li>
  </ul>
  <div class="hamburger">
    <i class="fas fa-bars"></i>
  </div>
</nav>`;

const SITE_MOBILE_NAV_HTML = `
<div class="mobile-nav">
  <ul>
    <li><a href="/index.html">Home</a></li>
    <li><a href="/pages/history_pages/history.html">History</a></li>
    <li><a href="/pages/resistance_pages/resistance.html">Resistance</a></li>
    <li><a href="/pages/betrayals_pages/betrayals.html">Betrayals</a></li>
    <li><a href="/pages/action_pages/action.html">Take Action</a></li>
    <li><a href="/index.html#resources">Resources</a></li>
    <li><a href="/index.html#culture">Culture</a></li>
    <li class="mobile-dropdown">
      <a href="#">More <i class="fas fa-caret-down"></i></a>
      <ul class="mobile-dropdown-menu">
        <li><a href="/myths/index.html">Myths</a></li>
        <li><a href="/legal/index.html">Legal</a></li>
        <li><a href="/diaspora/index.html">Diaspora</a></li>
        <li><a href="/education/teachers.html">Education</a></li>
        <li><a href="/movements/women.html">Movements</a></li>
        <li><a href="/boycott/supporting.html">Boycotts Supporting</a></li>
        <li><a href="/boycott/supportive.html">Boycotts Supportive</a></li>
      </ul>
    </li>
  </ul>
</div>`;

function siteFooterHtml() {
  return `
<footer>
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Free Palestine</h3>
        <p>Dedicated to sharing Palestinian history, culture, resistance, resources, and calls for justice, liberation, return, and accountability.</p>
        <div class="social-links">
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="Telegram"><i class="fab fa-telegram"></i></a>
          <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/index.html#history">History</a></li>
          <li><a href="/index.html#resistance">Resistance</a></li>
          <li><a href="/index.html#betrayal">Betrayals</a></li>
          <li><a href="/index.html#act">Take Action</a></li>
          <li><a href="/index.html#resources">Resources</a></li>
          <li><a href="/index.html#culture">Culture</a></li>
          <li><a href="/index.html#future">Future</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Resources</h3>
        <ul>
          <li><a href="/myths/index.html">Debunking Myths</a></li>
          <li><a href="/legal/index.html">Legal Resources</a></li>
          <li><a href="/diaspora/index.html">Diaspora Information</a></li>
          <li><a href="/education/teachers.html">Educational Materials</a></li>
          <li><a href="/movements/women.html">Women's Movement</a></li>
          <li><a href="/boycott/supporting.html">Boycotts Supporting</a></li>
          <li><a href="/boycott/supportive.html">Boycotts Supportive</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="year">${new Date().getFullYear()}</span> Free Palestine. All rights reserved.</p>
    </div>
  </div>
</footer>`;
}

function installSiteChrome(force = false) {
  const navContainer = document.getElementById('nav-container');
  const existingNav = navContainer || document.querySelector('body > nav') || document.querySelector('header nav') || document.querySelector('nav');

  if (force || !existingNav || !existingNav.querySelector('.nav-links') || !existingNav.querySelector('[href*="resources"]')) {
    if (existingNav) {
      existingNav.outerHTML = SITE_NAV_HTML;
    } else if (document.body) {
      document.body.insertAdjacentHTML('afterbegin', SITE_NAV_HTML);
    }
  }

  document.querySelectorAll('.mobile-nav').forEach((menu) => menu.remove());
  const nav = document.querySelector('body > nav') || document.querySelector('nav');
  nav?.insertAdjacentHTML('afterend', SITE_MOBILE_NAV_HTML);

  const footer = document.getElementById('footer-container') || document.querySelector('footer');
  if (footer) {
    footer.outerHTML = siteFooterHtml();
  } else if (document.body) {
    document.body.insertAdjacentHTML('beforeend', siteFooterHtml());
  }
}

window.includeNavFooter = () => {
  installSiteChrome(true);
  bindMobileNavigation();
};
installSiteChrome();

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

function bindMobileNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.setAttribute('role', 'button');
  hamburger.setAttribute('tabindex', '0');
  hamburger.setAttribute('aria-label', 'Open navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');

  const toggleMobileNav = () => {
    const isOpen = mobileNav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  };

  if (!hamburger.dataset.navBound) {
    hamburger.dataset.navBound = 'true';
    hamburger.addEventListener('click', toggleMobileNav);
    hamburger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMobileNav();
      }
    });
  }

  mobileNav.querySelectorAll('.mobile-dropdown > a').forEach((dropdownLink) => {
    if (dropdownLink.dataset.navBound) return;
    dropdownLink.dataset.navBound = 'true';
    dropdownLink.addEventListener('click', (event) => {
      event.preventDefault();
      dropdownLink.parentElement.classList.toggle('active');
    });
  });

  mobileNav.querySelectorAll('a:not(.mobile-dropdown > a)').forEach((link) => {
    if (link.dataset.navBound) return;
    link.dataset.navBound = 'true';
    link.addEventListener('click', closeMobileNav);
  });

  if (!window.__siteChromeOutsideClickBound) {
    window.__siteChromeOutsideClickBound = true;
    document.addEventListener('click', (event) => {
      const currentMobileNav = document.querySelector('.mobile-nav');
      const currentHamburger = document.querySelector('.hamburger');
      if (
        currentMobileNav?.classList.contains('active') &&
        !currentMobileNav.contains(event.target) &&
        !currentHamburger?.contains(event.target)
      ) {
        closeMobileNav();
      }
    });
  }
}

bindMobileNavigation();

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
