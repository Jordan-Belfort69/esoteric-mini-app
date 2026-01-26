// ===== МОДУЛЬ: ТАРО =====

window.AppTarot = (() => {
  let tarotState = {
    cards: 1,
    deck: 'rider',
  };

  function showTarotSettings() {
    const tarotSection = document.getElementById('tarot-section');
    const tarotSettings = document.getElementById('tarot-settings');
    const tarotVoiceSettings = document.getElementById('tarot-voice-settings');
    const tarotOwnSettings = document.getElementById('tarot-own-settings');

    if (tarotSection) tarotSection.style.display = 'none';
    if (tarotSettings) tarotSettings.style.display = 'block';
    if (tarotVoiceSettings) tarotVoiceSettings.style.display = 'none';
    if (tarotOwnSettings) tarotOwnSettings.style.display = 'none';
  }

  function showTarotVoiceSettings() {
    const tarotSection = document.getElementById('tarot-section');
    const tarotSettings = document.getElementById('tarot-settings');
    const tarotVoiceSettings = document.getElementById('tarot-voice-settings');
    const tarotOwnSettings = document.getElementById('tarot-own-settings');

    if (tarotSection) tarotSection.style.display = 'none';
    if (tarotSettings) tarotSettings.style.display = 'none';
    if (tarotVoiceSettings) tarotVoiceSettings.style.display = 'block';
    if (tarotOwnSettings) tarotOwnSettings.style.display = 'none';
  }

  function showTarotOwnSettings() {
    const tarotSection = document.getElementById('tarot-section');
    const tarotSettings = document.getElementById('tarot-settings');
    const tarotVoiceSettings = document.getElementById('tarot-voice-settings');
    const tarotOwnSettings = document.getElementById('tarot-own-settings');

    if (tarotSection) tarotSection.style.display = 'none';
    if (tarotSettings) tarotSettings.style.display = 'none';
    if (tarotVoiceSettings) tarotVoiceSettings.style.display = 'none';
    if (tarotOwnSettings) tarotOwnSettings.style.display = 'block';
  }

  function initTarotControls() {
    const tg = AppCore.tg;

    // кнопка "🎴 Таро" на корневом экране
    const tarotOpenLink = document.getElementById('tarot-open-link');
    if (tarotOpenLink) {
      tarotOpenLink.addEventListener('click', () => {
        AppRouter.go('tarot-inner');   // роутер переведёт во внутренний экран
        showTarotSettings();           // показываем нужный подэкран
      });
    }

    // кнопка "🎙 Таро по голосу"
    const tarotVoiceLink = document.getElementById('tarot-voice-link');
    if (tarotVoiceLink) {
      tarotVoiceLink.addEventListener('click', () => {
        AppRouter.go('tarot-inner');
        showTarotVoiceSettings();
      });
    }

    // кнопка "🧙‍♀️ Таро со своими картами"
    const tarotOwnLink = document.getElementById('tarot-own-link');
    if (tarotOwnLink) {
      tarotOwnLink.addEventListener('click', () => {
        AppRouter.go('tarot-inner');
        showTarotOwnSettings();
      });
    }

    // выбор количества карт
    const cardsButtons = document.querySelectorAll('[data-cards]');
    cardsButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tarotState.cards = parseInt(btn.getAttribute('data-cards'), 10);
        cardsButtons.forEach(b => b.classList.remove('pill-btn-active'));
        btn.classList.add('pill-btn-active');
      });
    });

    // выбор колоды
    const deckButtons = document.querySelectorAll('[data-deck]');
    deckButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tarotState.deck = btn.getAttribute('data-deck');
        deckButtons.forEach(b => b.classList.remove('pill-btn-active'));
        btn.classList.add('pill-btn-active');
      });
    });

    // текстовый вопрос
    const askBtn = document.getElementById('tarot-ask-btn');
    if (askBtn) {
      askBtn.addEventListener('click', () => {
        if (!tg) {
          alert('Эта кнопка работает только внутри Telegram Mini App');
          return;
        }

        const payload = {
          type: 'tarot_text',
          ts: Date.now(),
          cards: tarotState.cards,
          deck: tarotState.deck,
        };

        console.log('SEND DATA:', payload);
        tg.sendData(JSON.stringify(payload));
        tg.close();
      });
    }

    // голосовой вопрос
    const voiceAskBtn = document.getElementById('tarot-voice-ask-btn');
    if (voiceAskBtn) {
      voiceAskBtn.addEventListener('click', () => {
        if (!tg) {
          alert('Эта кнопка работает только внутри Telegram Mini App');
          return;
        }

        const payload = {
          type: 'tarot_voice',
          ts: Date.now(),
        };

        console.log('SEND DATA:', payload);
        tg.sendData(JSON.stringify(payload));
        tg.close();
      });
    }

    // отправка фото расклада (свои карты)
    const ownPhotoBtn = document.getElementById('tarot-own-send-photo-btn');
    if (ownPhotoBtn) {
      ownPhotoBtn.addEventListener('click', () => {
        if (!tg) {
          alert('Эта кнопка работает только внутри Telegram Mini App');
          return;
        }

        const payload = {
          type: 'tarot_own_photo',
          ts: Date.now(),
        };

        console.log('SEND DATA:', payload);
        tg.sendData(JSON.stringify(payload));
        tg.close();
      });
    }
  }

  return {
    initTarotControls,
  };
})();
