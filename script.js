const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn) menuBtn.addEventListener('click', () => navMenu.classList.toggle('show'));

document.querySelectorAll('#navMenu a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('show')));

// Floating particle field
const particleContainer = document.getElementById('particles');
const count = window.innerWidth < 700 ? 34 : 72;
for (let i = 0; i < count; i++) {
  const p = document.createElement('span');
  p.className = 'particle';
  const size = 1 + Math.random() * 2.8;
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.left = `${Math.random() * 100}%`;
  p.style.bottom = `${-10 - Math.random() * 30}%`;
  p.style.opacity = `${0.15 + Math.random() * 0.65}`;
  p.style.animationDuration = `${8 + Math.random() * 15}s`;
  p.style.animationDelay = `${Math.random() * -20}s`;
  p.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
  if (Math.random() > .78) p.style.background = '#a052ff';
  particleContainer.appendChild(p);
}

// Cursor glow + nav glass depth
const cursorGlow = document.querySelector('.cursor-glow');
const navbar = document.getElementById('navbar');
if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
    document.body.classList.add('cursor-active');
  }, {passive:true});
  window.addEventListener('pointerleave', () => document.body.classList.remove('cursor-active'));
}

// Scroll progress + active navigation
const sections = [...document.querySelectorAll('main section')];
const navLinks = [...document.querySelectorAll('#navMenu a')];
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const progress = max > 0 ? scrollY / max : 0;
  document.querySelector('.scroll-progress span').style.transform = `scaleX(${progress})`;
  navbar.classList.toggle('scrolled', scrollY > 24);

  let current = 'home';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}, {passive:true});

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Stagger project cards
if (!reduceMotion) {
  document.querySelectorAll('.project-card, .hobby-card, .mini-stat').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 70}ms`;
  });
}

// 3D tilt
if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      const rotateY = x * 8;
      const rotateX = -y * 8;
      card.style.transform = `perspective(950px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

// Typewriter role line
const role = document.getElementById('heroRole');
if (role && !reduceMotion) {
  const text = role.textContent;
  role.textContent = '';
  let i = 0;
  const type = () => {
    role.textContent = text.slice(0, i++);
    if (i <= text.length) setTimeout(type, 32);
  };
  setTimeout(type, 650);
}

// Subtle hero parallax
if (!reduceMotion) {
  window.addEventListener('scroll', () => {
    const hero = document.getElementById('home');
    if (!hero) return;
    const offset = Math.min(scrollY * .08, 60);
    hero.style.backgroundPosition = `center ${offset}px`;
  }, {passive:true});
}

console.log('%c AKBAR // FUTURE MODE ONLINE ', 'color:#32f5ff;font:bold 16px Orbitron');
