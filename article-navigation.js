(() => {
  const navigation = document.querySelector('.article-navigation');
  const start = document.getElementById('article-start');
  const end = document.getElementById('article-end');
  const header = document.querySelector('.site-header');
  if (!navigation || !start || !end || !header) return;

  const up = navigation.querySelector('[href="#article-start"]');
  const down = navigation.querySelector('[href="#article-end"]');
  let pending = false;
  const update = () => {
    const atStart = start.getBoundingClientRect().bottom > header.getBoundingClientRect().bottom;
    const atEnd = end.getBoundingClientRect().top <= window.innerHeight;
    down.hidden = !atStart;
    up.hidden = atStart || !atEnd;
    pending = false;
  };
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  new ResizeObserver(schedule).observe(document.querySelector('.article-shell'));
  update();
})();
