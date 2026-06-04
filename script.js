document.addEventListener('DOMContentLoaded', () => {

  // ===== ACTIVE NAV ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navIcons = document.querySelectorAll('.nav-icon');

  function updateNav() {
    let current = 'home';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    navIcons.forEach(icon => {
      icon.classList.toggle('active', icon.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // ===== REVEAL ON SCROLL =====
  const revealTargets = document.querySelectorAll(
    '.project-card, .skill-category, .tl-card, .cinfo-card, .contact-form'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 80);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealTargets.forEach(el => revealObs.observe(el));

  // ===== SUBTLE POINTER DEPTH =====
  if (window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
    const tiltTargets = document.querySelectorAll('.project-card, .skill-category');
    tiltTargets.forEach(card => {
      card.addEventListener('pointermove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        card.style.setProperty('--tilt-x', `${(-y * 2).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(x * 2).toFixed(2)}deg`);
        card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
        card.classList.add('is-tilting');
      });
      card.addEventListener('pointerleave', () => {
        card.classList.remove('is-tilting');
        card.style.removeProperty('--tilt-x');
        card.style.removeProperty('--tilt-y');
        card.style.removeProperty('--spot-x');
        card.style.removeProperty('--spot-y');
      });
    });
  }

  // ===== CONTACT FORM =====
  window.handleForm = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const btn = document.getElementById('fsubmit');
    const ok  = document.getElementById('formOk');
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'a visitor'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    btn.textContent = 'Opening email...';
    btn.disabled = true;
    setTimeout(() => {
      window.location.href = `mailto:saeed.asadullah96@gmail.com?subject=${subject}&body=${body}`;
      ok.classList.add('show');
      btn.innerHTML = 'Open Email <svg class="icon"><use href="#icon-send"></use></svg>';
      btn.disabled = false;
      setTimeout(() => ok.classList.remove('show'), 4000);
    }, 250);
  };

});
