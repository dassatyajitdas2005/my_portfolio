/**
 * =========================================================
 * SATYAJIT DAS — PERSONAL PORTFOLIO INTERACTION LOGIC
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. TYPING EFFECT CAROUSEL
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const words = [
      'Pharmacy & Health-Tech',
      'BBA Scholar & Business Strategist',
      'Video Editor (CapCut) & Media Strategist',
      'Frontend & Streamlit Developer',
      'SEO Copywriting & Content Growth',
      'Aspiring Pharma IT Entrepreneur'
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;

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
      setTimeout(typeLoop, deleting ? 45 : 85);
    }
    typeLoop();
  }

  // 2. NAVBAR SCROLL & ACTIVE LINK TRACKING
  const navbar = document.getElementById('navbar');
  const navLinksList = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    const scrollPos = window.scrollY;
    
    // Navbar glass effect
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollPos > 40);
    }

    // Back to top button toggle
    toggleBackTop(scrollPos);

    // Active navigation highlight
    const scrollTrigger = scrollPos + 160;
    sections.forEach(sec => {
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!link) return;

      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollTrigger >= top && scrollTrigger < top + height) {
        navLinksList.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // 3. MOBILE HAMBURGER NAVIGATION
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking nav links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 4. SCROLL REVEAL (INTERSECTION OBSERVER)
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // 5. SKILLS TABS & BAR ANIMATION
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.skills-panel');

  function animateSkillBars(panel) {
    if (!panel) return;
    panel.querySelectorAll('.skill-fill').forEach(bar => {
      const targetWidth = bar.getAttribute('data-width') || '75';
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = `${targetWidth}%`;
      }, 60);
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(btn.dataset.tab);
      if (targetPanel) {
        targetPanel.classList.add('active');
        animateSkillBars(targetPanel);
      }
    });
  });

  // Animate skill bars when section scrolls into view
  const skillsSection = document.getElementById('skills');
  if (skillsSection && 'IntersectionObserver' in window) {
    let animated = false;
    const skillsObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        const activePanel = document.querySelector('.skills-panel.active');
        if (activePanel) animateSkillBars(activePanel);
      }
    }, { threshold: 0.18 });
    skillsObserver.observe(skillsSection);
  }

  // 6. ANIMATED IMPACT COUNTERS
  function animateCounter(el, target, duration = 1800) {
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(update);
  }

  const counterEls = document.querySelectorAll('.counter-num');
  const missionSection = document.getElementById('mission');
  if (missionSection && counterEls.length && 'IntersectionObserver' in window) {
    let countersStarted = false;
    const counterObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;
        counterEls.forEach(el => {
          const target = parseInt(el.dataset.target, 10) || 0;
          animateCounter(el, target);
        });
      }
    }, { threshold: 0.25 });
    counterObserver.observe(missionSection);
  }

  // 7. BACK TO TOP BUTTON
  const backTop = document.getElementById('back-top');
  function toggleBackTop(scrollPos) {
    if (!backTop) return;
    backTop.classList.toggle('visible', scrollPos > 400);
  }
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 8. CONTACT FORM VALIDATION & FEEDBACK
  window.sendMessage = function() {
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const messageEl = document.getElementById('message');
    const feedbackEl = document.getElementById('form-msg');
    const sendBtn = document.getElementById('send-btn');

    if (!nameEl || !emailEl || !messageEl || !feedbackEl) return;

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();

    if (!name || !email || !message) {
      feedbackEl.textContent = '⚠️ Please fill in all required fields.';
      feedbackEl.className = 'form-feedback error';
      return;
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
      feedbackEl.textContent = '⚠️ Please provide a valid email address.';
      feedbackEl.className = 'form-feedback error';
      return;
    }

    // Submit state simulation
    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.innerHTML = '<span>Sending... ⏳</span>';
    }

    setTimeout(() => {
      feedbackEl.textContent = `✅ Thank you, ${name}! Your message has been prepared. I will connect with you shortly.`;
      feedbackEl.className = 'form-feedback success';

      nameEl.value = '';
      emailEl.value = '';
      messageEl.value = '';

      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<span>Send Message ✉️</span>';
      }

      setTimeout(() => {
        feedbackEl.textContent = '';
      }, 7000);
    }, 600);
  };

  // 9. SMOOTH SCROLL FOR IN-PAGE ANCHORS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Initial trigger
  onScroll();
});
