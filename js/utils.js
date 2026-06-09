function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function getConfig(key) {
  return window.DMITRII_CONFIG ? window.DMITRII_CONFIG[key] : "";
}

function wireConfigLinks() {
  qsa("[data-config-href]").forEach((el) => {
    const value = getConfig(el.dataset.configHref);
    if (value) el.href = value;
  });

  qsa("[data-phone-link]").forEach((el) => {
    const phone = getConfig("phone");
    if (phone) el.href = `tel:${phone.replace(/\\s/g, "")}`;
  });
}

window.DmitriiUtils = { qs, qsa, getConfig, wireConfigLinks };
