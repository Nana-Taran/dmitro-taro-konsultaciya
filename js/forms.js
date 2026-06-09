function initForms() {
  document.querySelectorAll("form[data-contact-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const endpoint = window.DMITRII_CONFIG?.formEndpoint || "";
      const status = form.querySelector("[data-form-status]");
      const lang = document.documentElement.lang === "ru" ? "ru" : "ua";

      if (!form.reportValidity()) return;

      if (!endpoint) {
        if (status) {
          status.textContent = lang === "ru"
            ? "Форма готова. Подключите endpoint в js/config.js."
            : "Форма готова. Підключіть endpoint у js/config.js.";
        }
        return;
      }

      const payload = Object.fromEntries(new FormData(form).entries());
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      form.reset();
      if (status) {
        status.textContent = lang === "ru"
          ? "Спасибо. Дмитрий получил сообщение и свяжется с вами."
          : "Дякую. Дмитрій отримав повідомлення і зв'яжеться з вами.";
      }
    });
  });
}

window.DmitriiForms = { initForms };
