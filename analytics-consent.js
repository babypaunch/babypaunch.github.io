(() => {
  const config = document.querySelector('[data-analytics-config]');
  if (!config) return;

  const storageKey = 'babypaunch-analytics-consent';
  const layer = document.querySelector('[data-consent-layer]');
  const dialog = layer.querySelector('[role="dialog"]');
  const accept = layer.querySelector('[data-consent-accept]');
  const reject = layer.querySelector('[data-consent-reject]');
  const settings = document.querySelectorAll('[data-analytics-settings]');
  const toast = document.querySelector('[data-consent-toast]');
  const language = config.dataset.analyticsLanguage;
  const messages = language === 'en'
    ? { accepted: 'Analytics enabled.', rejected: 'Analytics disabled.' }
    : { accepted: '방문 분석을 허용했습니다.', rejected: '방문 분석을 거부했습니다.' };
  let returnFocus = null;

  const loadAnalytics = () => {
    if (document.querySelector('script[data-google-analytics]')) return;
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', config.dataset.analyticsConfig, { anonymize_ip: true });
    const script = document.createElement('script');
    script.async = true;
    script.dataset.googleAnalytics = '';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.dataset.analyticsConfig)}`;
    document.head.append(script);
  };

  const showDialog = () => {
    returnFocus = document.activeElement;
    layer.hidden = false;
    document.body.classList.add('modal-open');
    dialog.focus();
  };

  const hideDialog = () => {
    layer.hidden = true;
    document.body.classList.remove('modal-open');
    if (returnFocus instanceof HTMLElement) returnFocus.focus();
  };

  const showToast = (message) => {
    toast.textContent = message;
    toast.hidden = false;
    window.setTimeout(() => { toast.hidden = true; }, 2000);
  };

  const save = (choice) => {
    localStorage.setItem(storageKey, choice);
    if (choice === 'granted') loadAnalytics();
    else window.gtag('consent', 'update', { analytics_storage: 'denied' });
    hideDialog();
    showToast(choice === 'granted' ? messages.accepted : messages.rejected);
  };

  accept.addEventListener('click', () => save('granted'));
  reject.addEventListener('click', () => save('denied'));
  settings.forEach((control) => control.addEventListener('click', showDialog));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') return;
    if (event.key !== 'Tab') return;
    const buttons = [reject, accept];
    const index = buttons.indexOf(document.activeElement);
    if (event.shiftKey && index <= 0) {
      event.preventDefault();
      buttons.at(-1).focus();
    } else if (!event.shiftKey && index === buttons.length - 1) {
      event.preventDefault();
      buttons[0].focus();
    }
  });

  const choice = localStorage.getItem(storageKey);
  if (choice === 'granted') loadAnalytics();
  else if (choice !== 'denied') showDialog();
})();
