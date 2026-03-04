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

  // --- Contact form handling (submits to Formspree) ---
  const form = document.getElementById('contact-form');
  if (form && form.action.includes('formspree.io')) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(res => {
        if (res.ok) {
          form.reset();
          const success = document.querySelector('.form-success');
          if (success) {
            form.style.display = 'none';
            success.classList.add('show');
          } else {
            form.innerHTML = '<div style="text-align:center;padding:40px 0;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2d8a4e" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><h3 style="font-family:Montserrat,sans-serif;font-size:1.3rem;margin:16px 0 8px;">Thank You!</h3><p style="color:#666;">We\'ll be in touch within 24 hours.</p></div>';
          }
        } else {
          btn.textContent = origText;
          btn.disabled = false;
          alert('Something went wrong. Please call us at (864) 883-8752.');
        }
      }).catch(() => {
        btn.textContent = origText;
        btn.disabled = false;
        alert('Something went wrong. Please call us at (864) 883-8752.');
      });
    });
  }

  // --- Landing page form (submits to Formspree) ---
  const landingForm = document.getElementById('landing-form');
  if (landingForm && landingForm.action.includes('formspree.io')) {
    landingForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(landingForm);
      const btn = landingForm.querySelector('button[type="submit"]');
      const origText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      fetch(landingForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(res => {
        if (res.ok) {
          landingForm.reset();
          landingForm.innerHTML = '<div style="text-align:center;padding:40px 0;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2d8a4e" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><h3 style="font-family:Montserrat,sans-serif;font-size:1.3rem;margin:16px 0 8px;">Thank You!</h3><p style="color:#666;">We\'ll call you within 2 hours to schedule your service.</p></div>';
        } else {
          btn.textContent = origText;
          btn.disabled = false;
          alert('Something went wrong. Please call us at (864) 883-8752.');
        }
      }).catch(() => {
        btn.textContent = origText;
        btn.disabled = false;
        alert('Something went wrong. Please call us at (864) 883-8752.');
      });
    });
  }
});
