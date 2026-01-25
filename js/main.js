// ===== ВРЕМЕННЫЙ MONOLITH main.js (будем разрезать на модули) =====

document.addEventListener("DOMContentLoaded", () => {
  AppCore.initTelegram();

  const tg = AppCore.tg;          // после initTelegram, чтобы tg уже был
  tg.BackButton.show();           // показываем кнопку [web:111][web:114]
  tg.BackButton.onClick(() => {
    AppNavigation.switchTab("profile");   // единое действие "назад"
  });

  AppProfile.loadProfile();
  AppNavigation.initTabs();
  AppTarot.initTarotControls();
  AppReferrals.initReferralSection();
  AppSubs.initSubsControls();
  AppSubs.initBuySubButton();
  AppProfile.initHistorySection();
  AppProfile.initTasksSection();
  AppProfile.initRefLinkSection();
  AppProfile.initRefBonusBlock();
  AppMore.initMore();
  AppRitualTip.initRitualTip();
  AppHoroscope.initHoroscope();
});
