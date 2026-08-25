(() => {
  const resolveTag = (requested, available) => available.includes(requested) ? requested : 'all';
  const formatResultCount = (template, count) => template.replace('{count}', count);
  if (typeof module !== 'undefined') module.exports = { resolveTag, formatResultCount };
  if (typeof document === 'undefined') return;

  const filter = document.querySelector('[data-tag-filter]');
  const list = document.querySelector('[data-post-list]');
  const empty = document.querySelector('[data-tag-empty]');
  const status = document.querySelector('[data-tag-status]');
  if (!filter || !list || !empty || !status) return;

  const links = [...filter.querySelectorAll('[data-tag]')];
  const posts = [...list.querySelectorAll('[data-tags]')];

  const applyFilter = () => {
    const requested = decodeURIComponent(location.hash.slice(1)) || 'all';
    const active = resolveTag(requested, links.map((link) => link.dataset.tag));
    let visible = 0;

    links.forEach((link) => {
      if (link.dataset.tag === active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    posts.forEach((post) => {
      const matches = active === 'all' || post.dataset.tags.split(' ').includes(active);
      post.hidden = !matches;
      if (matches) visible += 1;
    });
    empty.hidden = visible > 0;
    status.textContent = formatResultCount(status.dataset.resultsTemplate, visible);
  };

  addEventListener('hashchange', applyFilter);
  applyFilter();
})();
