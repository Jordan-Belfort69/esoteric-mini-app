// Конфигурация заданий по категориям
window.AppTasksConfig = {
  daily: [
    {
      code: 'D_DAILY',
      title: 'Ежедневный вход',
      desc: 'Зайди в бота хотя бы один раз за день.',
      xp: 2,
      sms: 0,
      promo: null,
      check_type: 'auto',
    },
    {
      code: 'D_REQ_DAILY',
      title: 'Ежедневный запрос',
      desc: 'Сделай минимум один запрос боту в течение дня.',
      xp: 3,
      sms: 0,
      promo: null,
      check_type: 'auto',
    },
  ],
  activity: [],
  referral: [],
  usage: [],
  purchases: [],
  levels: [],
};
