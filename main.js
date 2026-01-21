const API_URL = "http://127.0.0.1:8000/api/me?user_id=1040828537"; // ← сюда твой ID

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
    const res = await fetch(API_URL);
    const data = await res.json();

    document.getElementById("user-name").textContent =
      data.first_name || "Гость";
    document.getElementById("user-username").textContent =
      data.username ? "@" + data.username : "—";
    document.querySelector(".avatar-circle").textContent =
      (data.first_name || "G").charAt(0);

    document.getElementById("user-tier").textContent = tierLabel(data.tier);
    document.getElementById("sub-status").textContent = subStatus(data.tier);
    document.getElementById("sub-end").textContent = formatDate(data.sub_end);
    document.getElementById("sub-days-left").textContent =
      data.sub_days_left ?? "—";

    const limits = data.limits_today || {};
    document.getElementById("limit-ritual").textContent =
      `${limits.ritual.used}/${limits.ritual.limit}`;
    document.getElementById("limit-tarot").textContent =
      `${limits.tarot.used}/${limits.tarot.limit}`;
    document.getElementById("limit-horoscope").textContent =
      `${limits.horoscope.used}/${limits.horoscope.limit}`;
    document.getElementById("limit-week").textContent =
      `${limits.mystic_week.used}/${limits.mystic_week.limit}`;

    document.getElementById("ref-code").textContent = data.ref_code;
    document.getElementById("ref-count").textContent = data.referrals_count;
  } catch (e) {
    console.error(e);
    alert("Не удалось загрузить данные профиля");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
});
