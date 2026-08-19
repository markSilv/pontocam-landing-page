(() => {
  'use strict';

  const searchInput = document.getElementById('faqSearch');
  const clearButton = document.getElementById('faqClear');
  const resetButton = document.getElementById('faqReset');
  const searchShell = searchInput?.closest('.faq-search-shell');
  const resultLabel = document.getElementById('faqResults');
  const emptyState = document.getElementById('faqEmpty');
  const filters = [...document.querySelectorAll('.faq-filter')];
  const groups = [...document.querySelectorAll('[data-category-group]')];
  const items = [...document.querySelectorAll('.faq-item')];

  if (!searchInput || !items.length) return;

  let activeCategory = 'all';

  const normalize = (value) => value
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const itemIndex = new Map(items.map((item) => [item, normalize(item.textContent || '')]));

  const closeHiddenAnswers = () => {
    items.filter((item) => item.hidden).forEach((item) => {
      const collapseElement = item.querySelector('.accordion-collapse.show');
      if (!collapseElement) return;
      if (window.bootstrap?.Collapse) {
        bootstrap.Collapse.getOrCreateInstance(collapseElement, { toggle: false }).hide();
      } else {
        collapseElement.classList.remove('show');
        const button = item.querySelector('.faq-toggle');
        button?.classList.add('collapsed');
        button?.setAttribute('aria-expanded', 'false');
      }
    });
  };

  const update = () => {
    const query = normalize(searchInput.value);
    let visibleCount = 0;

    searchShell?.classList.toggle('has-value', query.length > 0);

    items.forEach((item) => {
      const matchesCategory = activeCategory === 'all' || item.dataset.category === activeCategory;
      const matchesSearch = !query || itemIndex.get(item)?.includes(query);
      const visible = Boolean(matchesCategory && matchesSearch);
      item.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    groups.forEach((group) => {
      const hasVisibleItem = [...group.querySelectorAll('.faq-item')].some((item) => !item.hidden);
      group.hidden = !hasVisibleItem;
    });

    const suffix = visibleCount === 1 ? 'resposta encontrada' : 'respostas encontradas';
    if (resultLabel) resultLabel.textContent = query || activeCategory !== 'all'
      ? `${visibleCount} ${suffix}`
      : '30 respostas disponíveis';

    if (emptyState) emptyState.hidden = visibleCount !== 0;
    closeHiddenAnswers();
  };

  const setCategory = (category) => {
    activeCategory = category;
    filters.forEach((button) => {
      const isActive = button.dataset.filter === category;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    update();
  };

  const reset = () => {
    searchInput.value = '';
    setCategory('all');
    searchInput.focus({ preventScroll: true });
  };

  searchInput.addEventListener('input', update);
  clearButton?.addEventListener('click', reset);
  resetButton?.addEventListener('click', reset);

  filters.forEach((button) => {
    button.addEventListener('click', () => setCategory(button.dataset.filter || 'all'));
  });

  // Atalho simples para usuários de teclado: pressione "/" para buscar.
  document.addEventListener('keydown', (event) => {
    if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
    const activeTag = document.activeElement?.tagName?.toLowerCase();
    if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;
    event.preventDefault();
    searchInput.focus();
  });

  // Permite abrir uma pergunta diretamente por URL, como faq.html#pergunta-15.
  const openHashQuestion = () => {
    if (!window.location.hash.startsWith('#pergunta-')) return;
    const item = document.querySelector(window.location.hash);
    if (!item) return;
    const category = item.dataset.category;
    if (category) setCategory(category);
    const collapseElement = item.querySelector('.accordion-collapse');
    if (collapseElement && window.bootstrap?.Collapse) {
      bootstrap.Collapse.getOrCreateInstance(collapseElement, { toggle: false }).show();
    }
    window.setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
  };

  window.addEventListener('hashchange', openHashQuestion);
  update();
  openHashQuestion();
})();
