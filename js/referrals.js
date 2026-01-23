// ===== МОДУЛЬ: РЕФЕРАЛЬНЫЙ ЭКРАН =====

window.AppReferrals = (() => {
  function initReferralSection() {
    const refLinkCard = document.getElementById('profile-ref-link');
    const refScreen = document.getElementById('profile-ref');
    const tarotSection = document.getElementById('tarot-section');
    const subsSection = document.getElementById('subs-section');
    const inviteBtn = document.getElementById('ref-invite-btn');
    const profileHeader = document.querySelector('.profile-header');

    if (!refLinkCard || !refScreen) return;

    refLinkCard.addEventListener('click', () => {
      if (profileHeader) profileHeader.style.display = 'none';

      document.querySelectorAll(
        '#profile-subscription, #profile-limits, #profile-buy-sub, ' +
        '#profile-history-link, #profile-tasks-link, #profile-ref-link, ' +
        '#profile-feedback-link, #profile-news-link, #profile-help-link, ' +
        '#profile-support-link, ' +
        '#profile-history, #profile-tasks, #profile-task1-card, #profile-task2-card, ' +
        '#task1-details, #task2-details, #profile-help, #profile-help-contact'
      ).forEach(c => (c.style.display = 'none'));

      if (tarotSection) tarotSection.style.display = 'none';
      if (subsSection) subsSection.style.display = 'none';

      refScreen.style.display = 'block';
    });

    if (inviteBtn) {
      inviteBtn.addEventListener('click', () => {
        console.log('Invite friends clicked');
      });
    }
  }

  return {
    initReferralSection,
  };
})();
