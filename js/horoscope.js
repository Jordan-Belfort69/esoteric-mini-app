// ===== МОДУЛЬ: РИТУАЛЫ — ГОРОСКОП =====

window.AppHoroscope = (() => {
  let horoscopeState = {
    zodiac: null,
    scope: 'none',
  };

  function initHoroscope() {
    const tg = AppCore.tg;

    const link = document.getElementById('ritual-horoscope-link');
    const screen = document.getElementById('ritual-horoscope-settings');
    const readBtn = document.getElementById('horoscope-read-btn');

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

    link.addEventListener('click', openHoroscopeScreen);

    zodiacButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-zodiac');
        horoscopeState.zodiac = val;

        zodiacButtons.forEach(b => b.classList.remove('pill-btn-active'));
        btn.classList.add('pill-btn-active');
      });
    });

    scopeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-scope') || 'none';
        horoscopeState.scope = val;

        scopeButtons.forEach(b => b.classList.remove('pill-btn-active'));
        btn.classList.add('pill-btn-active');
      });
    });

    readBtn.addEventListener('click', () => {
      if (!horoscopeState.zodiac) {
        alert('Сначала выберите знак зодиака.');
        return;
      }

      const payload = {
        type: 'horoscope',
        zodiac: horoscopeState.zodiac,
        scope: horoscopeState.scope || 'none',
      };

      console.log('READ HOROSCOPE:', payload);

      if (tg) {
        tg.sendData(JSON.stringify(payload));
        tg.close();
      }
    });
  }

  return {
    initHoroscope,
  };
})();
