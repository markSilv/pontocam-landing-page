(() => {
  'use strict';
  if (window.bootstrap) return;

  const triggerFor = (element) => document.querySelector(`[data-bs-target="#${element.id}"]`);

  const setState = (element, expanded) => {
    element.classList.toggle('show', expanded);
    const button = triggerFor(element);
    button?.classList.toggle('collapsed', !expanded);
    button?.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  };

  const closeSiblings = (element) => {
    const parentSelector = element.getAttribute('data-bs-parent');
    if (!parentSelector) return;
    document.querySelectorAll(`${parentSelector} .accordion-collapse.show`).forEach((open) => {
      if (open !== element) setState(open, false);
    });
  };

  const instanceFor = (element) => ({
    show() {
      closeSiblings(element);
      setState(element, true);
    },
    hide() {
      setState(element, false);
    },
    toggle() {
      if (element.classList.contains('show')) this.hide();
      else this.show();
    }
  });

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-bs-toggle="collapse"]');
    if (!trigger) return;
    const selector = trigger.getAttribute('data-bs-target') || trigger.getAttribute('href');
    if (!selector || !selector.startsWith('#')) return;
    const target = document.querySelector(selector);
    if (!target) return;
    event.preventDefault();
    instanceFor(target).toggle();
  });

  window.bootstrap = {
    Collapse: {
      getOrCreateInstance(element) {
        return instanceFor(element);
      }
    }
  };
})();
