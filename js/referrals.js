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
      AppRouter.go('referral');

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

    // --- Кнопка "Копировать" ссылку ---
    const refCopyBtn = document.getElementById('ref-copy-btn');
    const refLinkInput = document.getElementById('ref-link-input');

    if (refCopyBtn && refLinkInput) {
      refCopyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(refLinkInput.value);

          const originalText = refCopyBtn.textContent;
          refCopyBtn.textContent = 'Скопировано';

          setTimeout(() => {
            refCopyBtn.textContent = originalText;
          }, 1500);
        } catch (err) {
          console.error('Не удалось скопировать ссылку', err);
        }
      });
    }
  }

  return {
    initReferralSection,
  };
})();
