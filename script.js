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
    '.project-card, .skill-block, .tl-card, .cinfo-card, .contact-form'
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

  // ===== SKILL BARS =====
  const bars = document.querySelectorAll('.sbar-fill');
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.w + '%';
        barObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => barObs.observe(b));

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
      btn.innerHTML = 'Open Email <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
      setTimeout(() => ok.classList.remove('show'), 4000);
    }, 250);
  };

});
