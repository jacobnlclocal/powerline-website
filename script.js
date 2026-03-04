/* ========================================
   POWERLINE MAINTENANCE — Main Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile menu toggle ---
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Header scroll effect ---
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -60% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  // --- Animated stat counters ---
  const statNumbers = document.querySelectorAll('.stat__number[data-target]');
  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current;
          }, 30);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(n => counterObserver.observe(n));
  }

  // --- Scroll-reveal animation ---
  const reveals = document.querySelectorAll(
    '.service-card, .testimonial-card, .about__content, .about__image, .gallery__item, .area-card, .contact-form, .contact-info-card, .landing-benefit, .pricing-card'
  );
  if (reveals.length) {
    reveals.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
    });
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => revealObserver.observe(el));
  }

  // --- Contact form handling ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      // In production, replace with actual form submission (e.g. Formspree, Netlify Forms, etc.)
      const formEl = form;
      const success = document.querySelector('.form-success');
      if (success) {
        formEl.style.display = 'none';
        success.classList.add('show');
      } else {
        alert('Thank you! We\'ll be in touch within 24 hours.');
        formEl.reset();
      }
    });
  }

  // --- Landing page form ---
  const landingForm = document.getElementById('landing-form');
  if (landingForm) {
    landingForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you! We\'ll call you within 2 hours to schedule your service.');
      landingForm.reset();
    });
  }
});
