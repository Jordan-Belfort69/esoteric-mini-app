// ===== МОДУЛЬ: ТЕМА (ТЁМНАЯ ПО УМОЛЧАНИЮ, С ПЕРЕКЛЮЧАТЕЛЕМ) =====

window.AppTheme = (() => {
  const STORAGE_KEY = 'esoteric_theme'; // 'theme-dark' | 'theme-light'

  // Применяем класс темы к body
  function applyTheme(theme) {
    const body = document.body;
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(theme);
  }

  // Стартовая тема:
  // 1) если есть сохранённая — применяем её,
  // 2) если нет — включаем тёмную тему по умолчанию.
  function loadInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'theme-light' || saved === 'theme-dark') {
      applyTheme(saved);
    } else {
      applyTheme('theme-dark'); // новый пользователь → тёмная тема
    }
  }

  // Инициализация тумблера темы в шапке
  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // При входе в приложение:
    // ставим сохранённую тему, либо тёмную по умолчанию
    loadInitialTheme();

    // Переключение темы по клику
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
