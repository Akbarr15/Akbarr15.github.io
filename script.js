const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer:fine)').matches;
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const cursorGlow = document.querySelector('.cursor-glow');

menuBtn?.addEventListener('click', () => navMenu.classList.toggle('show'));
document.querySelectorAll('#navMenu a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('show')));

// Particles — kept subtle so the page stays clean.
const particleContainer = document.getElementById('particles');
if (particleContainer && !reduceMotion) {
  const count = innerWidth < 700 ? 22 : 38;
  for(let i=0;i<count;i++){
    const p=document.createElement('span');
    const size=1+Math.random()*2;
    p.className='particle';
    p.style.width=`${size}px`;p.style.height=`${size}px`;
    p.style.left=`${Math.random()*100}%`;
    p.style.bottom=`${-10-Math.random()*40}%`;
    p.style.opacity=`${.12+Math.random()*.55}`;
    p.style.animationDuration=`${12+Math.random()*12}s`;
    p.style.animationDelay=`${Math.random()*-20}s`;
    p.style.setProperty('--drift',`${-60+Math.random()*120}px`);
    particleContainer.appendChild(p);
  }
}

if(cursorGlow && !reduceMotion && finePointer){
  addEventListener('pointermove',e=>{cursorGlow.style.left=`${e.clientX}px`;cursorGlow.style.top=`${e.clientY}px`},{passive:true});
}

const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('#navMenu a')];
const progress=document.querySelector('.scroll-progress span');
addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  if(progress) progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;
  navbar?.classList.toggle('scrolled',scrollY>30);
  let current='home';
  sections.forEach(section=>{if(scrollY>=section.offsetTop-180) current=section.id;});
  links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current}`));
},{passive:true});

if(!reduceMotion){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${(i%3)*70}ms`;observer.observe(el);});
}

if(!reduceMotion && finePointer){
  document.querySelectorAll('.tilt-card').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(1100px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
}

const role=document.getElementById('heroRole');
if(role && !reduceMotion){
  const text=role.textContent.trim();
  role.textContent='';
  let i=0;
  const type=()=>{role.textContent=text.slice(0,i++);if(i<=text.length)setTimeout(type,24)};
  setTimeout(type,450);
}

console.log('%cAKBAR // CLEAN FUTURE UI ONLINE','color:#61e7ff;font-weight:700');
