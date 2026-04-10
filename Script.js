// ═══════════════════════════════════════════
//  LUTFIYA FAKHIRA — PORTFOLIO SCRIPT
// ═══════════════════════════════════════════

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── MOBILE MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── SMOOTH ACTIVE NAV ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll(
  '.project-card, .timeline-item, .cert-card, .stat-card, .contact-card, .skills-group, .about-text'
);
reveals.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

/* ── CERT TABS ── */
const tabs = document.querySelectorAll('.cert-tab');
const cards = document.querySelectorAll('[data-category]');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.tab;
    cards.forEach(card => {
      const show = card.dataset.category === cat;
      card.style.display = show ? 'flex' : 'none';
      if (show) {
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      }
    });
  });
});

/* ── HERO PHOTO FALLBACK ── */
const heroPhoto = document.getElementById('heroPhoto');
heroPhoto.addEventListener('error', () => {
  heroPhoto.style.display = 'none';
  const placeholder = document.createElement('div');
  placeholder.style.cssText = `
    width: 280px; height: 280px; border-radius: 50%;
    background: linear-gradient(135deg, #e0e7ff, #fce7f3);
    display: flex; align-items: center; justify-content: center;
    font-size: 80px; border: 4px solid white;
    box-shadow: 0 12px 48px rgba(15,23,42,.14);
    position: relative; z-index: 2;
  `;
  placeholder.textContent = '👩‍💻';
  heroPhoto.parentNode.insertBefore(placeholder, heroPhoto.nextSibling);
});

/* ── TYPED GREETING ── */
const eyebrow = document.querySelector('.hero-eyebrow');
if (eyebrow) {
  const texts = ['👋 Halo, saya', '👋 Hi, I\'m', '👋 Halo, saya'];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % texts.length;
    eyebrow.style.opacity = '0';
    eyebrow.style.transform = 'translateY(-6px)';
    setTimeout(() => {
      eyebrow.textContent = texts[idx];
      eyebrow.style.transition = 'opacity .4s, transform .4s';
      eyebrow.style.opacity = '1';
      eyebrow.style.transform = 'translateY(0)';
    }, 300);
  }, 4000);
}

/* ── NAV ACTIVE STYLE ── */
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--blue) !important; background: var(--blue-lt); }`;
document.head.appendChild(style);