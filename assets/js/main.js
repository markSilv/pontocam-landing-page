(() => {
  'use strict';

  const nav = document.getElementById('mainNav');
  const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 24);
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  document.querySelectorAll('.navbar .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navbarMenu');
      if (menu?.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  const money = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL', minimumFractionDigits: 2
  }).format(value);

  const fleetInput = document.getElementById('fleetSize');
  const planSelect = document.getElementById('planSelect');
  const monthlyOutput = document.getElementById('monthlyEstimate');
  const setupOutput = document.getElementById('setupEstimate');
  const updateEstimate = () => {
    const fleet = Math.max(1, Number.parseInt(fleetInput?.value || '1', 10));
    const monthly = Number.parseFloat(planSelect?.value || '167.90');
    if (monthlyOutput) monthlyOutput.textContent = `${money(fleet * monthly)}/mês`;
    if (setupOutput) setupOutput.textContent = `Implantação: ${money(fleet * 297.90)}`;
  };
  fleetInput?.addEventListener('input', updateEstimate);
  planSelect?.addEventListener('change', updateEstimate);
  updateEstimate();

  const interest = document.getElementById('interest');
  document.querySelectorAll('[data-plan]').forEach((button) => {
    button.addEventListener('click', () => {
      const plan = button.dataset.plan || '';
      if (!interest) return;
      interest.value = plan.includes('10 GB') ? 'Plano Profissional - 10 GB' : 'Plano Essencial - 5 GB';
    });
  });

  const phoneInput = document.getElementById('phone');
  phoneInput?.addEventListener('input', (event) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 11);
    let formatted = digits;
    if (digits.length > 2) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length > 7) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    event.target.value = formatted;
  });

  const form = document.getElementById('leadForm');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add('was-validated');
    if (!form.checkValidity()) return;

    const fields = {
      nome: document.getElementById('name')?.value.trim(),
      empresa: document.getElementById('company')?.value.trim(),
      email: document.getElementById('email')?.value.trim(),
      telefone: document.getElementById('phone')?.value.trim(),
      veiculos: document.getElementById('vehicles')?.value.trim(),
      interesse: document.getElementById('interest')?.value,
      mensagem: document.getElementById('message')?.value.trim()
    };
    const subject = `Contato PontoCam - ${fields.empresa || fields.nome}`;
    const body = [
      'Olá, gostaria de receber informações sobre a PontoCam.', '',
      `Nome: ${fields.nome}`,
      `Empresa: ${fields.empresa}`,
      `E-mail: ${fields.email}`,
      `Telefone: ${fields.telefone}`,
      `Quantidade de veículos: ${fields.veiculos}`,
      `Interesse: ${fields.interesse}`,
      '', 'Detalhes da operação:', fields.mensagem || 'Não informado.'
    ].join('\n');
    window.location.href = `mailto:comercial@realponto.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
