(() => {
  const toggle = document.querySelector('[data-translation-toggle]');
  const article = document.querySelector('.article-shell');
  const tooltip = document.querySelector('[data-translation-tooltip]');
  const tooltipText = tooltip?.querySelector('[data-translation-text]');
  const status = document.querySelector('[data-translation-status]');
  if (!toggle || !article || !tooltip || !tooltipText || !status) return;

  const unitSelector = '.article-header h1, .article-header > p:last-child, .article-body h2, .article-body h3, .article-body h4, .article-body p, .article-body li, .article-body th, .article-body td, .article-body figcaption, .article-body summary';
  const interactiveSelector = 'a, button, input, select, textarea, [contenteditable="true"]';
  let active = false;
  let pinned = false;
  let currentUnit = null;
  let units = [];
  let translations = [];
  let loading = null;
  let statusTimer = 0;

  const collectUnits = (root) => [...root.querySelectorAll(unitSelector)]
    .filter((element) => !(element.tagName === 'LI' && element.querySelector('li')))
    .filter((element) => element.textContent.trim());

  const normalizeText = (element) => element.textContent.replace(/\s+/g, ' ').trim();

  const segmentText = (text, language) => {
    if (!Intl.Segmenter) return [text];
    return [...new Intl.Segmenter(language, { granularity: 'sentence' }).segment(text)]
      .map(({ segment }) => segment)
      .filter((segment) => segment.trim());
  };

  const showStatus = (message) => {
    window.clearTimeout(statusTimer);
    status.textContent = message;
    status.hidden = false;
    statusTimer = window.setTimeout(() => { status.hidden = true; }, 2000);
  };

  const hideTooltip = () => {
    if (currentUnit) currentUnit.removeAttribute('aria-describedby');
    tooltip.hidden = true;
    currentUnit = null;
    pinned = false;
  };

  const positionTooltip = (unit) => {
    if (window.matchMedia('(max-width: 640px)').matches) {
      Object.assign(tooltip.style, { top: 'auto', right: '1rem', bottom: '1rem', left: '1rem' });
      return;
    }

    const gap = 12;
    const edge = 16;
    const target = unit.getBoundingClientRect();
    const box = tooltip.getBoundingClientRect();
    let left = target.right - box.width;
    left = Math.max(edge, Math.min(left, window.innerWidth - box.width - edge));
    let top = target.bottom + gap;
    if (top + box.height > window.innerHeight - edge) top = target.top - box.height - gap;
    top = Math.max(edge, Math.min(top, window.innerHeight - box.height - edge));
    Object.assign(tooltip.style, { top: `${top}px`, right: 'auto', bottom: 'auto', left: `${left}px` });
  };

  const showTooltip = (unit, shouldPin = false) => {
    const index = Number(unit.dataset.translationUnit);
    if (!Number.isInteger(index) || !translations[index]) return;
    if (currentUnit && currentUnit !== unit) currentUnit.removeAttribute('aria-describedby');
    currentUnit = unit;
    pinned = shouldPin;
    tooltipText.textContent = translations[index];
    tooltip.hidden = false;
    unit.setAttribute('aria-describedby', tooltip.id);
    window.requestAnimationFrame(() => positionTooltip(unit));
  };

  const prepareTranslations = async () => {
    if (translations.length) return;
    if (loading) return loading;

    loading = fetch(toggle.dataset.translationUrl, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw new Error(`Translation page returned ${response.status}`);
        return response.text();
      })
      .then((html) => {
        const translatedDocument = new DOMParser().parseFromString(html, 'text/html');
        const sourceUnits = collectUnits(document);
        const translatedUnits = collectUnits(translatedDocument);
        const sourceTags = sourceUnits.map((element) => element.tagName);
        const translatedTags = translatedUnits.map((element) => element.tagName);
        if (sourceTags.length !== translatedTags.length || sourceTags.some((tag, index) => tag !== translatedTags[index])) {
          throw new Error('Translation page structure does not match');
        }

        const sourceLanguage = document.documentElement.lang;
        const translatedLanguage = translatedDocument.documentElement.lang;
        const interactiveUnits = [];
        const interactiveTranslations = [];

        sourceUnits.forEach((sourceUnit, index) => {
          const translatedUnit = translatedUnits[index];
          const sourceSegments = sourceUnit.children.length ? [] : segmentText(sourceUnit.textContent, sourceLanguage);
          const translatedSegments = translatedUnit.children.length ? [] : segmentText(translatedUnit.textContent, translatedLanguage);

          if (sourceSegments.length > 1 && sourceSegments.length === translatedSegments.length) {
            const fragment = document.createDocumentFragment();
            sourceSegments.forEach((segment, segmentIndex) => {
              const sentence = document.createElement('span');
              sentence.className = 'translation-sentence';
              sentence.textContent = segment;
              fragment.append(sentence);
              interactiveUnits.push(sentence);
              interactiveTranslations.push(translatedSegments[segmentIndex].trim());
            });
            sourceUnit.replaceChildren(fragment);
          } else {
            interactiveUnits.push(sourceUnit);
            interactiveTranslations.push(normalizeText(translatedUnit));
          }
        });

        units = interactiveUnits;
        translations = interactiveTranslations;
      })
      .finally(() => { loading = null; });

    return loading;
  };

  const addUnitControls = () => {
    units.forEach((unit, index) => {
      unit.dataset.translationUnit = String(index);
      unit.tabIndex = index === 0 ? 0 : -1;
    });
  };

  const removeUnitControls = () => {
    units.forEach((unit) => {
      delete unit.dataset.translationUnit;
      unit.removeAttribute('tabindex');
      unit.removeAttribute('aria-describedby');
    });
  };

  const setActive = async (nextActive) => {
    if (active === nextActive) return;
    if (!nextActive) {
      active = false;
      hideTooltip();
      removeUnitControls();
      document.body.classList.remove('translation-mode');
      toggle.setAttribute('aria-pressed', 'false');
      toggle.setAttribute('aria-label', toggle.dataset.labelEnable);
      showStatus(toggle.dataset.messageDisabled);
      return;
    }

    active = true;
    toggle.setAttribute('aria-busy', 'true');
    showStatus(toggle.dataset.messageLoading);
    try {
      await prepareTranslations();
      if (!active) return;
      addUnitControls();
      document.body.classList.add('translation-mode');
      toggle.setAttribute('aria-pressed', 'true');
      toggle.setAttribute('aria-label', toggle.dataset.labelDisable);
      showStatus(toggle.dataset.messageEnabled);
    } catch (error) {
      active = false;
      console.error('Article translation:', error);
      showStatus(toggle.dataset.messageError);
    } finally {
      toggle.removeAttribute('aria-busy');
    }
  };

  const unitFromEvent = (event) => event.target.closest?.('[data-translation-unit]');

  toggle.addEventListener('click', () => setActive(!active));

  article.addEventListener('pointerover', (event) => {
    if (!active || pinned) return;
    const unit = unitFromEvent(event);
    if (unit) showTooltip(unit);
  });

  article.addEventListener('pointerout', (event) => {
    if (!active || pinned) return;
    const unit = unitFromEvent(event);
    if (unit && !unit.contains(event.relatedTarget)) hideTooltip();
  });

  article.addEventListener('focusin', (event) => {
    if (!active || pinned) return;
    const unit = unitFromEvent(event);
    if (unit) showTooltip(unit);
  });

  article.addEventListener('focusout', (event) => {
    if (!active || pinned) return;
    const unit = unitFromEvent(event);
    if (unit && !unit.contains(event.relatedTarget)) hideTooltip();
  });

  article.addEventListener('keydown', (event) => {
    if (!active) return;
    const unit = unitFromEvent(event);
    if (!unit) return;
    const index = units.indexOf(unit);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const change = event.key === 'ArrowDown' ? 1 : -1;
      const next = units[(index + change + units.length) % units.length];
      unit.tabIndex = -1;
      next.tabIndex = 0;
      next.focus();
    } else if ((event.key === 'Enter' || event.key === ' ') && !event.target.closest(interactiveSelector)) {
      event.preventDefault();
      showTooltip(unit, true);
    }
  });

  document.addEventListener('click', (event) => {
    if (!active || event.target.closest('[data-translation-toggle], [data-translation-tooltip]')) return;
    const unit = unitFromEvent(event);
    if (unit && !event.target.closest(interactiveSelector)) {
      showTooltip(unit, true);
      return;
    }
    if (pinned) hideTooltip();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (!tooltip.hidden) hideTooltip();
      else if (active) setActive(false);
      return;
    }
    if (event.key.toLowerCase() !== 't' || event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.target.matches('input, textarea, select, [contenteditable="true"]')) return;
    event.preventDefault();
    setActive(!active);
  });

  window.addEventListener('scroll', () => {
    if (!tooltip.hidden) hideTooltip();
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!tooltip.hidden && currentUnit) positionTooltip(currentUnit);
  });
})();
