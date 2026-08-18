(() => {
  'use strict';

  const header = document.getElementById('siteHeader');
  const year = document.getElementById('currentYear');
  const navCollapse = document.getElementById('mainNav');
  const leadForm = document.getElementById('leadForm');
  const phoneInput = document.getElementById('telefone');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('#mainNav .nav-link, #mainNav .btn').forEach((link) => {
    link.addEventListener('click', () => {
      if (!navCollapse || window.innerWidth >= 992) return;
      const instance = bootstrap.Collapse.getInstance(navCollapse);
      if (instance) instance.hide();
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', (event) => {
      const digits = event.target.value.replace(/\D/g, '').slice(0, 11);
      let formatted = digits;

      if (digits.length > 10) {
        formatted = digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      } else if (digits.length > 6) {
        formatted = digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (digits.length > 2) {
        formatted = digits.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      } else if (digits.length > 0) {
        formatted = digits.replace(/(\d{0,2})/, '($1');
      }

      event.target.value = formatted.replace(/-$/, '');
    });
  }

  if (leadForm) {
    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!leadForm.checkValidity()) {
        leadForm.classList.add('was-validated');
        return;
      }

      const formData = new FormData(leadForm);
      const nome = formData.get('nome');
      const empresa = formData.get('empresa');
      const telefone = formData.get('telefone');
      const frota = formData.get('frota');

      const message = [
        'Olá, conheci a PontoCam pela landing page e gostaria de receber uma demonstração.',
        '',
        `Nome: ${nome}`,
        `Empresa: ${empresa}`,
        `Telefone: ${telefone}`,
        `Frota: ${frota}`
      ].join('\n');

      const whatsappUrl = `https://wa.me/551141262929?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }
})();
