// ===== ВРЕМЕННЫЙ MONOLITH main.js (будем разрезать на модули) =====

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
  AppRitualTip.initRitualTip();
  AppHoroscope.initHoroscope();
});
