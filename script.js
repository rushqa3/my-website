// ----- Mobile menu toggle -----
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('show');
});

// ----- Smooth scrolling for internal anchors -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    // allow external anchor targets (like wa.me etc.)
    const href = this.getAttribute('href');
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // close mobile menu if open
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ----- Active nav highlighting on scroll -----
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function onScrollActive() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 80;
    const height = section.offsetHeight;
    if (pageYOffset >= top && pageYOffset < top + height) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', onScrollActive);
window.addEventListener('load', onScrollActive);

// ----- Scroll reveal animations -----
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const revealPoint = 140;
    if (rect.top < windowHeight - revealPoint) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
