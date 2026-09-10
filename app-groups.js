document.querySelectorAll('[data-app-group]').forEach((group) => {
  const entries = [...group.querySelectorAll('.app-entry')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  group.classList.add('is-enhanced');

  function toggle(entry, open) {
    const title = entry.querySelector('.app-title');
    const label = title.querySelector('span');
    label.getAnimations().forEach((animation) => animation.cancel());
    const before = label.getBoundingClientRect();
    if (open) group.style.minHeight = `${group.getBoundingClientRect().height}px`;
    entry.open = open;
    entries.forEach((sibling) => { sibling.hidden = open && sibling !== entry; });
    if (!open) group.style.removeProperty('min-height');
    const after = label.getBoundingClientRect();
    if (!reducedMotion.matches) {
      label.animate([
        { transform: `translate(${before.x - after.x}px, ${before.y - after.y}px)` },
        { transform: 'translate(0, 0)' },
      ], { duration: 280, easing: 'cubic-bezier(.22, 1, .36, 1)' });
    }
    title.focus({ preventScroll: true });
  }

  entries.forEach((entry) => {
    entry.querySelector('.app-title').addEventListener('click', (event) => {
      event.preventDefault();
      toggle(entry, !entry.open);
    });
    entry.querySelector('.app-close').addEventListener('click', () => toggle(entry, false));
    entry.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && entry.open) {
        event.preventDefault();
        toggle(entry, false);
      }
    });
  });
});
