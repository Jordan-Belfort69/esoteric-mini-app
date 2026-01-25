// ===== МОДУЛЬ: ТАРО =====

window.AppTarot = (() => {
  let tarotState = {
    cards: 1,
    deck: 'rider',
  };

  function openTarotSettings() {
    const tarotSection = document.getElementById('tarot-section');
    const tarotSettings = document.getElementById('tarot-settings');

    if (tarotSection) tarotSection.style.display = 'none';
    if (tarotSettings) tarotSettings.style.display = 'block';

    // внутренний экран Таро
    AppRouter.go('tarot-inner');
  }

  function initTarotControls() {
    const tg = AppCore.tg;

    // кнопка "🎴 Таро" на корневом экране
    const tarotOpenLink = document.getElementById('tarot-open-link');
    if (tarotOpenLink) {
      tarotOpenLink.addEventListener('click', () => {
        openTarotSettings();
      });
    }

    // дальше – твоя текущая логика выбора карт и колоды
    const cardsButtons = document.querySelectorAll('[data-cards]');
    cardsButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tarotState.cards = parseInt(btn.getAttribute('data-cards'), 10);
        cardsButtons.forEach(b => b.classList.remove('pill-btn-active'));
        btn.classList.add('pill-btn-active');
      });
    });

    const deckButtons = document.querySelectorAll('[data-deck]');
    deckButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tarotState.deck = btn.getAttribute('data-deck');
        deckButtons.forEach(b => b.classList.remove('pill-btn-active'));
        btn.classList.add('pill-btn-active');
      });
    });

    const askBtn = document.getElementById('tarot-ask-btn');
    if (!askBtn) return;

    askBtn.addEventListener('click', () => {
      if (!tg) {
        alert('Эта кнопка работает только внутри Telegram Mini App');
        return;
      }

      const payload = {
        type: 'debug_click',
        ts: Date.now(),
        note: 'кнопка Задать вопрос в боте нажата',
        cards: tarotState.cards,
        deck: tarotState.deck,
      };

      console.log('SEND DATA:', payload);
      tg.sendData(JSON.stringify(payload));
      tg.close();
    });
  }

  return {
    initTarotControls,
  };
})();
