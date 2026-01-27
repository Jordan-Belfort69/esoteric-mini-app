window.AppTheme = (() => {
  const STORAGE_KEY = 'esoteric_theme';

  function applyTheme(theme) {
    const body = document.body;
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(theme);
  }

  function loadInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'theme-light' || saved === 'theme-dark') {
      applyTheme(saved);
    } else {
      applyTheme('theme-dark');
    }
  }

  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    loadInitialTheme();

    toggle.addEventListener('click', () => {
      const body = document.body;
      const isDark = body.classList.contains('theme-dark');
      const next = isDark ? 'theme-light' : 'theme-dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  return {
    initThemeToggle,
  };
})();
