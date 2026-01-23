// ===== МОДУЛЬ: ПОДПИСКИ =====

window.AppSubs = (() => {
  function initSubsControls() {
    const proBtn = document.getElementById('subs-btn-pro');
    const mysticBtn = document.getElementById('subs-btn-mystic');

    if (proBtn) {
      proBtn.addEventListener('click', () => {
        console.log('PRO clicked');
        // TODO: сюда потом добавишь вызов оплаты/бекенда
      });
    }

    if (mysticBtn) {
      mysticBtn.addEventListener('click', () => {
        console.log('Mystic clicked');
      });
    }
  }

  function initBuySubButton() {
    const buySubCard = document.getElementById('profile-buy-sub');
    if (!buySubCard) return;

    buySubCard.addEventListener('click', () => {
      AppNavigation.switchTab('subs');
    });
  }

  return {
    initSubsControls,
    initBuySubButton,
  };
})();
