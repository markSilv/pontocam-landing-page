(() => {
  'use strict';
  if (window.bootstrap) return;

  const setExpanded = (button, expanded) => button?.setAttribute('aria-expanded', expanded ? 'true' : 'false');

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-bs-toggle="collapse"]');
    if (!trigger) return;
    const selector = trigger.getAttribute('data-bs-target') || trigger.getAttribute('href');
    if (!selector || !selector.startsWith('#')) return;
    const target = document.querySelector(selector);
    if (!target) return;
    event.preventDefault();

    const parentSelector = target.getAttribute('data-bs-parent');
    if (parentSelector) {
      document.querySelectorAll(`${parentSelector} .accordion-collapse.show`).forEach((open) => {
        if (open !== target) {
          open.classList.remove('show');
          const btn = document.querySelector(`[data-bs-target="#${open.id}"]`);
          btn?.classList.add('collapsed');
          setExpanded(btn, false);
        }
      });
    }

    const willOpen = !target.classList.contains('show');
    target.classList.toggle('show', willOpen);
    trigger.classList.toggle('collapsed', !willOpen);
    setExpanded(trigger, willOpen);
  });

  window.bootstrap = {
    Collapse: {
      getOrCreateInstance(element) {
        return {
          hide() {
            element.classList.remove('show');
            document.querySelector(`[data-bs-target="#${element.id}"]`)?.setAttribute('aria-expanded', 'false');
          }
        };
      }
    }
  };
})();
