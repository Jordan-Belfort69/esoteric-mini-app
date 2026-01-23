// ===== ВРЕМЕННЫЙ MONOLITH main.js (будем разрезать на модули) =====

const API_URL = "http://127.0.0.1:8000/api/me"; // без user_id
const tg = AppCore.tg; // берем tg из ядра

document.addEventListener("DOMContentLoaded", () => {
  AppCore.initTelegram();

  AppProfile.loadProfile();
  AppNavigation.initTabs();
  AppTarot.initTarotControls();
  AppReferrals.initReferralSection(); // вместо initReferralSection()
  AppSubs.initSubsControls();         // вместо initSubsControls()
  AppSubs.initBuySubButton();         // вместо initBuySubButton()
  AppProfile.initHistorySection();
  AppProfile.initTasksSection();
  AppHelpSupport.initFeedbackLink();
  AppHelpSupport.initNewsLink();
  AppHelpSupport.initHelpSection();
  AppHelpSupport.initSupportLink();
  initRitualTip();
  initHoroscope();
});

let ritualTipState = {
  enabled: false,
  time: null,           // например "07:00–08:00"
  timezone: 'Europe/Moscow'
};

let horoscopeState = {
  zodiac: null,   // 'aries', 'taurus' ...
  scope: 'none'   // 'none', 'career', 'money', 'love', 'health'
};

function getInitData() {
  if (!tg || !tg.initData) return null;
  return tg.initData;
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ru-RU");
  } catch {
    return iso.slice(0, 10);
  }
}

function tierLabel(tier) {
  if (tier === "pro") return "🌙 PRO";
  if (tier === "mystic") return "🔮 Mystic";
  return "🆓 Free";
}

function subStatus(tier) {
  if (tier === "pro") return "Активна 🌙 PRO";
  if (tier === "mystic") return "Активна 🔮 Mystic";
  return "Бесплатный доступ";
}

async function loadProfile() {
  try {
    const initData = getInitData();
    const url = initData
      ? `${API_URL}?initData=${encodeURIComponent(initData)}`
      : `${API_URL}?user_id=1040828537`;

    const res = await fetch(url);
    const data = await res.json();

    // ... заполнение DOM, как было ...
  } catch (e) {
    console.error("loadProfile error:", e);
    // без alert, чтобы не мешать тесту sendData
  }
}

function initHistorySection() {
  const historyLink = document.getElementById('profile-history-link');
  const historyScreen = document.getElementById('profile-history');
  const tarotSection = document.getElementById('tarot-section');
  const subsSection = document.getElementById('subs-section');
  const profileHeader = document.querySelector('.profile-header');

  if (!historyLink || !historyScreen) return;

  historyLink.addEventListener('click', () => {
    // прячем шапку
    if (profileHeader) profileHeader.style.display = 'none';

    // прячем ВСЕ карточки профиля и внутренние экраны
    document.querySelectorAll(
      '#profile-subscription, #profile-limits, #profile-buy-sub, ' +
      '#profile-history-link, #profile-tasks-link, #profile-ref-link, ' +
      '#profile-feedback-link, #profile-news-link, #profile-help-link, ' +
      '#profile-support-link, ' +
      '#profile-ref, #profile-tasks, #profile-task1-card, #profile-task2-card, ' +
      '#task1-details, #task2-details, #profile-help, #profile-help-contact'
    ).forEach(c => (c.style.display = 'none'));

    if (tarotSection) tarotSection.style.display = 'none';
    if (subsSection) subsSection.style.display = 'none';

    // показываем только экран истории
    historyScreen.style.display = 'block';
  });

  // заглушка для "Прочитать полностью"
  const readButtons = historyScreen.querySelectorAll('.history-read-btn');
  readButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Здесь будет полный текст ответа из базы (заглушка).');
    });
  });
}

function initTasksSection() {
  const tasksLink = document.getElementById('profile-tasks-link');
  const tasksHeader = document.getElementById('profile-tasks');
  const task1CardSection = document.getElementById('profile-task1-card');
  const task2CardSection = document.getElementById('profile-task2-card');
  const task1Details = document.getElementById('task1-details');
  const task2Details = document.getElementById('task2-details');

  const tarotSection = document.getElementById('tarot-section');
  const subsSection = document.getElementById('subs-section');
  const profileHeader = document.querySelector('.profile-header');

  if (!tasksLink || !tasksHeader) return;

  // Переход в раздел заданий (3 блока)
  tasksLink.addEventListener('click', () => {
    console.log('Tasks clicked');

    // прячем шапку
    if (profileHeader) profileHeader.style.display = 'none';

    // прячем все карточки профиля и другие экраны
    document.querySelectorAll(
      '#profile-subscription, #profile-limits, #profile-buy-sub, ' +
      '#profile-history-link, #profile-tasks-link, #profile-ref-link, ' +
      '#profile-feedback-link, #profile-news-link, #profile-help-link, ' +
      '#profile-support-link, ' +
      '#profile-ref, #profile-history, ' +
      '#task1-details, #task2-details, #profile-help, #profile-help-contact'
    ).forEach(c => (c.style.display = 'none'));

    if (tarotSection) tarotSection.style.display = 'none';
    if (subsSection) subsSection.style.display = 'none';

    // показываем заголовок раздела и карточки заданий
    tasksHeader.style.display = 'block';
    if (task1CardSection) task1CardSection.style.display = 'block';
    if (task2CardSection) task2CardSection.style.display = 'block';
  });

  // Кнопки "Открыть задание 1/2"
  const taskButtons = document.querySelectorAll('.tasks-open-btn');
  taskButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const taskId = btn.getAttribute('data-task');

      if (tasksHeader) tasksHeader.style.display = 'none';
      if (task1CardSection) task1CardSection.style.display = 'none';
      if (task2CardSection) task2CardSection.style.display = 'none';

      if (taskId === '1' && task1Details) task1Details.style.display = 'block';
      if (taskId === '2' && task2Details) task2Details.style.display = 'block';
    });
  });

  // Заглушки "Забрать награду"
  const claimButtons = document.querySelectorAll('.tasks-claim-btn');
  claimButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const taskId = btn.getAttribute('data-task');
      alert('❌ Условие: Оставить отзыв о работе с проектом не выполнено! (task ' + taskId + ')');
    });
  });
}

function initRitualTip() {
  const tipLink = document.getElementById('ritual-tip-link');
  const tipTimeLabel = document.getElementById('ritual-tip-time-label');
  const tipSettings = document.getElementById('ritual-tip-settings');
  const tipEnabledCheckbox = document.getElementById('ritual-tip-enabled');
  const tipExtra = document.getElementById('ritual-tip-extra');
  const tipTimeBtn = document.getElementById('ritual-tip-time-btn');
  const tipTzLabel = document.getElementById('ritual-tip-tz-label');
  const tipSaveBtn = document.getElementById('ritual-tip-save-btn');

  const timeScreen = document.getElementById('ritual-tip-time-screen');
  const timeOptions = document.querySelectorAll('.ritual-time-option');

  // пробуем восстановить сохранённые настройки
  try {
    const saved = localStorage.getItem('ritualTipState');
    if (saved) {
      const parsed = JSON.parse(saved);
      ritualTipState.enabled = !!parsed.enabled;
      ritualTipState.time = parsed.time || null;
      ritualTipState.timezone = parsed.timezone || 'Europe/Moscow';
    }
  } catch (e) {
    console.warn('cannot load ritualTipState', e);
  }

  if (!tipLink || !tipSettings) return;

  function updateMainTimeLabel() {
    if (ritualTipState.enabled && ritualTipState.time) {
      tipTimeLabel.textContent = ritualTipState.time;
    } else {
      tipTimeLabel.textContent = '›';
    }
  }

  function openTipSettings() {
    const profileHeader = document.querySelector('.profile-header');
    const ritualsSection = document.getElementById('rituals-section');
    const tarotSection = document.getElementById('tarot-section');
    const subsSection = document.getElementById('subs-section');

    if (profileHeader) profileHeader.style.display = 'none';

    document.querySelectorAll(
      '#profile-subscription, #profile-limits, #profile-buy-sub, ' +
      '#profile-history-link, #profile-tasks-link, #profile-ref-link, ' +
      '#profile-feedback-link, #profile-news-link, #profile-help-link, ' +
      '#profile-support-link, #profile-ref, #profile-history, #profile-tasks, ' +
      '#profile-task1-card, #profile-task2-card, #task1-details, #task2-details, ' +
      '#profile-help, #profile-help-contact'
    ).forEach(c => (c.style.display = 'none'));

    if (tarotSection) tarotSection.style.display = 'none';
    if (subsSection) subsSection.style.display = 'none';
    if (ritualsSection) ritualsSection.style.display = 'none';
    if (timeScreen) timeScreen.style.display = 'none';

    tipEnabledCheckbox.checked = ritualTipState.enabled;
    tipExtra.style.display = ritualTipState.enabled ? 'block' : 'none';
    tipTzLabel.textContent = ritualTipState.timezone;
    tipTimeBtn.textContent = ritualTipState.time || 'Выбрать';

    tipSettings.style.display = 'block';
  }

  updateMainTimeLabel();

  // Открыть настройки из "Ритуалов"
  tipLink.addEventListener('click', openTipSettings);

  // Переключатель включения
  tipEnabledCheckbox.addEventListener('change', () => {
    ritualTipState.enabled = tipEnabledCheckbox.checked;
    tipExtra.style.display = ritualTipState.enabled ? 'block' : 'none';
    updateMainTimeLabel();
  });

  // Открыть экран выбора времени
  tipTimeBtn.addEventListener('click', () => {
    tipSettings.style.display = 'none';
    if (timeScreen) timeScreen.style.display = 'block';

    // выставляем текущий выбор
    timeOptions.forEach(opt => {
      const val = opt.getAttribute('data-time');
      opt.classList.toggle(
        'ritual-time-option-selected',
        ritualTipState.time === val
      );
    });
  });

  // Клик по временному слоту
  timeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const val = opt.getAttribute('data-time');
      ritualTipState.time = val;

      timeOptions.forEach(o => o.classList.remove('ritual-time-option-selected'));
      opt.classList.add('ritual-time-option-selected');

      // возвращаемся на экран настроек
      if (timeScreen) timeScreen.style.display = 'none';
      openTipSettings();
      updateMainTimeLabel();
    });
  });

  // Кнопка "Готово"
  if (tipSaveBtn) {
    tipSaveBtn.addEventListener('click', () => {
      const payload = {
        type: 'daily_tip_settings',
        enabled: ritualTipState.enabled,
        time: ritualTipState.time,
        timezone: ritualTipState.timezone
      };

      console.log('SAVE DAILY TIP:', payload);

      // сохраняем настройки локально
      try {
        localStorage.setItem('ritualTipState', JSON.stringify(ritualTipState));
      } catch (e) {
        console.warn('cannot save ritualTipState', e);
      }

      // if (tg) tg.sendData(JSON.stringify(payload));

      updateMainTimeLabel();            // обновляем надпись на карточке
      AppNavigation.switchTab('rituals'); // вместо switchTab('rituals')
    });
  }
}

function initHoroscope() {
  const link = document.getElementById('ritual-horoscope-link');
  const screen = document.getElementById('ritual-horoscope-settings');
  const readBtn = document.getElementById('horoscope-read-btn');

  // все кнопки выбора знака/сферы по классам из index.html
  const zodiacButtons = document.querySelectorAll('.horoscope-zodiac-btn');
  const scopeButtons = document.querySelectorAll('.horoscope-scope-btn');

  if (!link || !screen || !readBtn || !zodiacButtons.length || !scopeButtons.length) {
    return;
  }

  function openHoroscopeScreen() {
    const profileHeader = document.querySelector('.profile-header');
    const ritualsSection = document.getElementById('rituals-section');
    const tarotSection = document.getElementById('tarot-section');
    const subsSection = document.getElementById('subs-section');
    const tipSettings = document.getElementById('ritual-tip-settings');
    const timeScreen = document.getElementById('ritual-tip-time-screen');

    if (profileHeader) profileHeader.style.display = 'none';

    document.querySelectorAll(
      '#profile-subscription, #profile-limits, #profile-buy-sub, ' +
      '#profile-history-link, #profile-tasks-link, #profile-ref-link, ' +
      '#profile-feedback-link, #profile-news-link, #profile-help-link, ' +
      '#profile-support-link, #profile-ref, #profile-history, #profile-tasks, ' +
      '#profile-task1-card, #profile-task2-card, #task1-details, #task2-details, ' +
      '#profile-help, #profile-help-contact'
    ).forEach(c => (c.style.display = 'none'));

    if (tarotSection) tarotSection.style.display = 'none';
    if (subsSection) subsSection.style.display = 'none';
    if (ritualsSection) ritualsSection.style.display = 'none';
    if (tipSettings) tipSettings.style.display = 'none';
    if (timeScreen) timeScreen.style.display = 'none';

    // подсветка сохранённого выбора
    zodiacButtons.forEach(btn => {
      const val = btn.getAttribute('data-zodiac');
      btn.classList.toggle('pill-btn-active', val === horoscopeState.zodiac);
    });
    scopeButtons.forEach(btn => {
      const val = btn.getAttribute('data-scope');
      btn.classList.toggle('pill-btn-active', val === horoscopeState.scope);
    });

    screen.style.display = 'block';
  }

  // открытие из раздела "Ритуалы"
  link.addEventListener('click', openHoroscopeScreen);

  // выбор знака
  zodiacButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-zodiac');
      horoscopeState.zodiac = val;

      zodiacButtons.forEach(b => b.classList.remove('pill-btn-active'));
      btn.classList.add('pill-btn-active');
    });
  });

  // выбор сферы
  scopeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-scope') || 'none';
      horoscopeState.scope = val;

      scopeButtons.forEach(b => b.classList.remove('pill-btn-active'));
      btn.classList.add('pill-btn-active');
    });
  });

  // кнопка "Прочитать гороскоп"
  readBtn.addEventListener('click', () => {
    if (!horoscopeState.zodiac) {
      alert('Сначала выберите знак зодиака.');
      return;
    }

    const payload = {
      type: 'horoscope',
      zodiac: horoscopeState.zodiac,
      scope: horoscopeState.scope || 'none'
    };

    console.log('READ HOROSCOPE:', payload);

    if (tg) {
      tg.sendData(JSON.stringify(payload));
      tg.close();
    }
  });
}
