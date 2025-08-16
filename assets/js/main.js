// Adjust body top padding to nav height so hero image isn’t obscured
function setNavHeight() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  const h = nav.offsetHeight;
  document.documentElement.style.setProperty('--nav-h', h + 'px');
}
window.addEventListener('load', setNavHeight);
window.addEventListener('resize', setNavHeight);

// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.getElementById('mobileNav');
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
    mobileNav.setAttribute('hidden', ''); hamburger.setAttribute('aria-expanded','false'); document.body.classList.remove('no-scroll');
}));
}));
}

// Add Diaspora link to navigation
const navLinks = document.querySelector('nav .nav-links');
if (navLinks) {
  const diasporaLink = document.createElement('li');
  diasporaLink.innerHTML = '<a href="/diaspora/index.html">Diaspora</a>';
  navLinks.appendChild(diasporaLink);
}
}

// Add Diaspora link to navigation
const navLinks = document.querySelector('nav .nav-links');
if (navLinks) {
  const diasporaLink = document.createElement('li');
  diasporaLink.innerHTML = '<a href="/diaspora/index.html">Diaspora</a>';
  navLinks.appendChild(diasporaLink);
}
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

function openTimeline(){ tlPopup.removeAttribute('hidden'); document.body.classList.add('no-scroll'); }
function closeTimeline(){ tlPopup.setAttribute('hidden',''); document.body.classList.remove('no-scroll'); }

if (tlBtn && tlPopup && tlClose) {
  tlBtn.addEventListener('click', openTimeline);
  tlClose.addEventListener('click', closeTimeline);
  tlPopup.addEventListener('click', (e) => { if (e.target === tlPopup) closeTimeline(); });
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
  const closeBtn = donateMenu.querySelector('.modal-close');
  donateTrigger.addEventListener('click', (e) => { e.preventDefault(); donateMenu.removeAttribute('hidden'); document.body.classList.add('no-scroll'); });
  closeBtn.addEventListener('click', () => { donateMenu.setAttribute('hidden',''); document.body.classList.remove('no-scroll'); });
  donateMenu.addEventListener('click', (e) => { if (e.target === donateMenu) { donateMenu.setAttribute('hidden',''); document.body.classList.remove('no-scroll'); } });
}

// Latest updates widget
(async function initUpdates(){
  const list = document.getElementById('latestUpdates');
  if (!list) return;
  try {
    const items = await fetchJSON('/assets/data/updates.json');
    list.innerHTML = items.slice(0,6).map(u => `
      <li>
        <strong>${new Date(u.date).toLocaleString()}</strong> — ${u.headline}
        ${u.summary ? ` — <em>${u.summary}</em>`:''}
        ${u.sources?.length ? ` [<a target="_blank" rel="noopener" href="${u.sources[0].url}">${u.sources[0].publisher||u.sources[0].title}</a>]`:''}
// Footer year
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

// Add Diaspora link to navigation
const navLinks = document.querySelector('nav .nav-links');
if (navLinks) {
  const diasporaLink = document.createElement('li');
  diasporaLink.innerHTML = '<a href="/diaspora/index.html">Diaspora</a>';
  navLinks.appendChild(diasporaLink);
}
      </li>
    `).join('');
    const last = document.getElementById('lastUpdated');
    if (last && items.length) last.textContent = `Last updated: ${new Date(items[0].date).toLocaleString()}`;
  } catch(e) {
    list.innerHTML = '<li class="muted">Unable to load updates.</li>';
  }
})();

// Share button
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
  shareBtn.addEventListener('click', async () => {
    const data = { title: document.title, text: 'Learn the facts and take action for Palestinian justice.', url: location.href };
    if (navigator.share) { try { await navigator.share(data); } catch {} }
    else { navigator.clipboard?.writeText(location.href); shareBtn.textContent = 'Link Copied!'; setTimeout(()=>shareBtn.textContent='Share',1500); }
  });
}

// Footer year
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
