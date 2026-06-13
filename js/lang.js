const STORAGE_KEY = "dmitrii-lang";

function setLang(lang) {
  const nextLang = lang === "ru" ? "ru" : "ua";
  localStorage.setItem(STORAGE_KEY, nextLang);
  document.documentElement.lang = nextLang === "ua" ? "uk" : "ru";

  document.querySelectorAll("[data-ua]").forEach((el) => {
    const value = el.dataset[nextLang];
    if (typeof value === "string") el.innerHTML = value;
  });

  document.querySelectorAll("[data-alt-ua]").forEach((el) => {
    const value = el.dataset[`alt${nextLang === "ua" ? "Ua" : "Ru"}`];
    if (typeof value === "string") el.setAttribute("alt", value);
  });

  document.querySelectorAll("[data-placeholder-ua]").forEach((el) => {
    const value = nextLang === "ru" ? el.dataset.placeholderRu : el.dataset.placeholderUa;
    if (typeof value === "string") el.setAttribute("placeholder", value);
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.dataset.lang === nextLang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

function initLang() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
  setLang(localStorage.getItem(STORAGE_KEY) || "ua");
}

window.DmitriiLang = { setLang, initLang };
