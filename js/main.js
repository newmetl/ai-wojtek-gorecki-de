// ===== LANGUAGE MANAGEMENT =====
let currentLang = localStorage.getItem('lang') || 'de';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyTranslations();
  updateLangToggle();
}

function applyTranslations() {
  const t = translations[currentLang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key]) el.innerHTML = t[key];
  });

  document.documentElement.lang = currentLang;
}

function updateLangToggle() {
  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === currentLang);
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ===== ACTIVE NAV LINK =====
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (path.endsWith(href) || (href === 'index.html' && (path === '/' || path.endsWith('/')))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ===== PARTICLES =====
function initParticles() {
  const colors = ['var(--accent-cyan)', 'var(--accent-purple)', 'var(--accent-pink)'];
  const container = document.body;

  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (Math.random() * 20 + 15) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
}

// ===== CONTACT FORM (EmailJS) =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const statusEl = document.getElementById('form-status');
    const t = translations[currentLang];

    btn.disabled = true;
    btn.textContent = t.contactSending || 'Sending...';
    statusEl.className = 'form-status';
    statusEl.style.display = 'none';

    const formData = new FormData(form);

    try {
      const formAction = form.getAttribute('action');
      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusEl.textContent = t.contactSuccess;
        statusEl.className = 'form-status success';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      statusEl.textContent = t.contactError;
      statusEl.className = 'form-status error';
    }

    btn.disabled = false;
    btn.textContent = t.contactSubmit;
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  updateLangToggle();
  initMobileMenu();
  setActiveNav();
  initParticles();
  initContactForm();

  // Language toggle click
  document.querySelectorAll('.lang-option').forEach(el => {
    el.addEventListener('click', () => setLang(el.dataset.lang));
  });
});
