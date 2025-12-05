// /public/js/theme.js
(function () {
  const STORAGE_KEY = "stng_theme"; // 'dark' или 'light'

  function applyTheme(name) {
    const body = document.body;
    if (name === "light") {
      body.classList.add("theme-light");
    } else {
      body.classList.remove("theme-light");
    }
  }

  // Инициализация при загрузке
  const saved = localStorage.getItem(STORAGE_KEY) || "dark";
  applyTheme(saved);

  // Экспорт в глобал
  window.STNGTheme = {
    toggle() {
      const current = localStorage.getItem(STORAGE_KEY) || "dark";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    },
    get() {
      return localStorage.getItem(STORAGE_KEY) || "dark";
    },
  };
})();
