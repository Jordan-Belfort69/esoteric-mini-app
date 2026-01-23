// ===== API-КЛИЕНТ BACKEND =====
// Отвечает за запросы к твоему FastAPI/Django и т.п.

window.AppApi = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api";

  async function request(path, params = {}) {
    const url = new URL(BASE_URL + path);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        url.searchParams.set(k, v);
      }
    });

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API ${path} ${res.status}`);
    }
    return res.json();
  }

  // /api/me
  function fetchMe(initData, fallbackUserId) {
    const params = initData ? { initData } : { user_id: fallbackUserId };
    return request("/me", params);
  }

  return {
    fetchMe,
  };
})();
