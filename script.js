/* = SCRIPT.JS = */

//  TYPING EFFECT 
const typedEl = document.getElementById('typed');
const words = [
  'Pharma Student',
  'Pharmacovigilance Learner',
  'Future Founder',
  'Healthcare Innovator',
  'Frontend Learner',
  'Business Builder'
];
let wordIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const word = words[wordIdx];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++charIdx);
    if (charIdx === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = word.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
typeLoop();

//  NAVBAR SCROLL 
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
  toggleBackTop();
});

// MOBILE HAMBURGER 
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

//  ACTIVE NAV LINKS 
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

//  SCROLL REVEAL 
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger reveals within the same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

//  SKILL BAR ANIMATION 
function animateSkillBars(panel) {
  panel.querySelectorAll('.skill-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => { bar.style.width = width + '%'; }, 100);
  });
}

//  SKILLS TABS 
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.skills-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.tab);
    target.classList.add('active');
    // Reset and reanimate bars
    target.querySelectorAll('.skill-fill').forEach(b => b.style.width = '0%');
    setTimeout(() => animateSkillBars(target), 50);
  });
});

// Animate active panel when skills section enters viewport
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;
const skillsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !skillsAnimated) {
    skillsAnimated = true;
    animateSkillBars(document.querySelector('.skills-panel.active'));
  }
}, { threshold: 0.2 });
skillsObserver.observe(skillsSection);

//  COUNTER ANIMATION 
function animateCounter(el, target, duration = 1600) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const counterEls = document.querySelectorAll('.counter-num');
let countersStarted = false;
const counterObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    counterEls.forEach(el => {
      animateCounter(el, parseInt(el.dataset.target));
    });
  }
}, { threshold: 0.3 });
const missionSection = document.getElementById('mission');
if (missionSection) counterObserver.observe(missionSection);

//  BACK TO TOP 
const backTop = document.getElementById('back-top');
function toggleBackTop() {
  backTop.classList.toggle('visible', window.scrollY > 400);
}
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

//  CONTACT FORM VALIDATION 
function sendMessage() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const feedback = document.getElementById('form-msg');

  if (!name || !email || !message) {
    feedback.textContent = '⚠️ Please fill in all fields.';
    feedback.className = 'form-feedback error';
    return;
  }
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(email)) {
    feedback.textContent = '⚠️ Please enter a valid email address.';
    feedback.className = 'form-feedback error';
    return;
  }
  feedback.textContent = '✅ Message sent! Thank you for reaching out, ' + name + '.';
  feedback.className = 'form-feedback success';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
  setTimeout(() => { feedback.textContent = ''; }, 5000);
}

//  SMOOTH SCROLL FALLBACK 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

//  INIT 
updateActiveNav();
toggleBackTop();



















