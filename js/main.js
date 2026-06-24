document.addEventListener("DOMContentLoaded", () => {
  window.DmitriiUtils?.wireConfigLinks();
  window.DmitriiLang?.initLang();
  window.DmitriiForms?.initForms();
  window.DmitriiAnimations?.initAnimations();
  initHeroSequence();
  initHeroVideo();
  initReviewCards();
  initFaqAccordion();
  initFab();
  initCtaForm();
  initGtmEvents();
  initContactPopup();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".mobile-panel");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });
  }
});

// Отправка кликов по мессенджерам в dataLayer (GTM).
// Срабатывает двумя путями:
//  1) по разметке data-gtm-event="click_telegram|click_whatsapp|click_viber" (FAB-кнопки);
//  2) по href любой ссылки на Telegram/WhatsApp/Viber — так ловятся и основные CTA-кнопки
//     "Написати Дмитру", у которых data-gtm-event нет (без правки HTML на всех страницах).
function initGtmEvents() {
  window.dataLayer = window.dataLayer || [];

  function eventFromHref(href) {
    if (!href) return "";
    if (href.indexOf("t.me/") !== -1) return "click_telegram";
    if (href.indexOf("wa.me/") !== -1 || href.indexOf("whatsapp") !== -1) return "click_whatsapp";
    if (href.indexOf("viber:") !== -1) return "click_viber";
    return "";
  }

  document.addEventListener("click", (e) => {
    const tagged = e.target.closest("[data-gtm-event]");
    const link = e.target.closest('a[href]');
    const event = tagged
      ? tagged.getAttribute("data-gtm-event")
      : eventFromHref(link && link.getAttribute("href"));
    if (!event) return;
    window.dataLayer.push({
      event: event,
      label: (tagged && tagged.getAttribute("data-gtm-label")) ||
             (link && (link.getAttribute("aria-label") || link.className)) || ""
    });
  }, true);
}

function initCtaForm() {
  const form = document.getElementById("cta-contact-form");
  const success = document.getElementById("cta-success");
  if (!form || !success) return;

  // Messenger button toggle
  const ctaMessengers = document.getElementById("cta-messengers");
  const ctaMessengerValue = document.getElementById("cta-messenger-value");
  if (ctaMessengers) {
    ctaMessengers.addEventListener("click", e => {
      const btn = e.target.closest(".popup-messenger-btn");
      if (!btn) return;
      ctaMessengers.querySelectorAll(".popup-messenger-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      ctaMessengerValue.value = btn.dataset.messenger;
      ctaMessengers.classList.remove("popup-error");
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name      = (form.elements["name"]?.value      || "").trim();
    const phone     = (form.elements["phone"]?.value     || "").trim();
    const messenger = (form.elements["messenger"]?.value || "").trim();
    const situation = (form.elements["situation"]?.value || "").trim();

    // Validation
    let ok = true;
    if (!name)  { form.elements["name"].classList.add("popup-error");  ok = false; }
    else          form.elements["name"].classList.remove("popup-error");
    if (!phone) { form.elements["phone"].classList.add("popup-error"); ok = false; }
    else          form.elements["phone"].classList.remove("popup-error");
    if (!messenger && ctaMessengers) {
      ctaMessengers.classList.add("popup-error");
      ok = false;
    }
    if (!ok) return;

    const submit = form.querySelector(".cta-submit");
    submit.disabled = true;

    try {
      const res = await fetch("/api/send-tg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, messenger, situation, page: window.location.pathname }),
      });

      if (!res.ok) throw new Error("tg_error");

      form.elements["name"].value      = "";
      form.elements["phone"].value     = "";
      form.elements["situation"].value = "";
      if (ctaMessengerValue) ctaMessengerValue.value = "";
      if (ctaMessengers) ctaMessengers.querySelectorAll(".popup-messenger-btn").forEach(b => b.classList.remove("active"));

      const span = success.querySelector("span");
      if (span) {
        span.dataset.ua = "Дякуємо! Дмитро зв'яжеться з вами найближчим часом 🙏";
        span.dataset.ru = "Спасибо! Дмитрий свяжется с вами в ближайшее время 🙏";
        window.DmitriiLang?.setLang(localStorage.getItem("dmitrii-lang") || "ua");
      }
      success.hidden = false;
      setTimeout(() => { success.hidden = true; }, 5000);

      if (window.dataLayer) window.dataLayer.push({ event: "form_submit", form_type: "cta" });

    } catch (_err) {
      const span = success.querySelector("span");
      if (span) {
        span.dataset.ua = "Щось пішло не так. Напишіть напряму: @Odrad888";
        span.dataset.ru = "Что-то пошло не так. Напишите напрямую в Telegram: @Odrad888";
        window.DmitriiLang?.setLang(localStorage.getItem("dmitrii-lang") || "ua");
      }
      success.hidden = false;
      setTimeout(() => { success.hidden = true; }, 6000);
    } finally {
      submit.disabled = false;
    }
  });
}

function initFab() {
  const wrap = document.getElementById("fab-wrap");
  const toggle = document.getElementById("fab-toggle");
  if (!wrap || !toggle) return;

  const items = Array.from(wrap.querySelectorAll(".fab-item"));

  function openFab() {
    wrap.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    items.forEach((item, i) => {
      setTimeout(() => item.classList.add("visible"), i * 60);
    });
  }

  function closeFab() {
    wrap.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    items.forEach((item) => item.classList.remove("visible"));
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    wrap.classList.contains("open") ? closeFab() : openFab();
  });

  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) closeFab();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeFab();
  });

  // GTM push on messenger link click
  wrap.querySelectorAll("a[data-gtm-event]").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: link.dataset.gtmEvent,
          gtm_label: link.dataset.gtmLabel,
        });
      }
    });
  });
}

function initFaqAccordion() {
  const accordion = document.getElementById("faq-accordion");
  if (!accordion) return;

  const cols = Array.from(accordion.querySelectorAll(".faq-col"));

  cols.forEach((col) => {
    const items = Array.from(col.querySelectorAll(".faq-item"));

    function openItem(target) {
      items.forEach((el) => {
        const isTarget = el === target;
        el.classList.toggle("open", isTarget);
        el.querySelector(".faq-question").setAttribute("aria-expanded", String(isTarget));
      });
    }

    items.forEach((item) => {
      item.querySelector(".faq-question").addEventListener("click", () => {
        if (item.classList.contains("open")) {
          item.classList.remove("open");
          item.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        } else {
          openItem(item);
        }
      });
    });
  });
}

function initReviewCards() {
  const grid = document.getElementById("reviews-grid");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".review-card"));
  const isMobile = () => window.innerWidth <= 900;

  function goToSlide(card, index) {
    const slides = Array.from(card.querySelectorAll(".review-slide"));
    const dots = Array.from(card.querySelectorAll(".review-dot"));
    const total = slides.length;
    if (total <= 1) return;
    const next = ((index % total) + total) % total;
    card.dataset.current = String(next);
    slides.forEach((s, i) => s.classList.toggle("active", i === next));
    dots.forEach((d, i) => d.classList.toggle("active", i === next));
  }

  function expandCard(card) {
    cards.forEach((c) => {
      if (c === card) {
        c.classList.add("expanded");
        c.classList.remove("dimmed");
      } else {
        c.classList.remove("expanded");
        c.classList.add("dimmed");
      }
    });
  }

  function collapseAll() {
    cards.forEach((c) => c.classList.remove("expanded", "dimmed"));
  }

  cards.forEach((card) => {
    const slides = card.querySelectorAll(".review-slide");
    if (slides.length > 1) {
      const prev = card.querySelector(".review-prev");
      const next = card.querySelector(".review-next");
      const dots = card.querySelectorAll(".review-dot");

      prev?.addEventListener("click", (e) => {
        e.stopPropagation();
        goToSlide(card, Number(card.dataset.current) - 1);
      });
      next?.addEventListener("click", (e) => {
        e.stopPropagation();
        goToSlide(card, Number(card.dataset.current) + 1);
      });
      dots.forEach((dot, i) =>
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          goToSlide(card, i);
        })
      );

      // Swipe on mobile
      let touchStartX = 0;
      card.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });
      card.addEventListener("touchend", (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 38) goToSlide(card, Number(card.dataset.current) + (dx < 0 ? 1 : -1));
      }, { passive: true });
    }

    // Desktop hover
    card.addEventListener("mouseenter", () => { if (!isMobile()) expandCard(card); });
    card.addEventListener("mouseleave", () => { if (!isMobile()) collapseAll(); });

    // Mobile tap
    card.addEventListener("click", () => {
      if (!isMobile()) return;
      if (card.classList.contains("expanded")) collapseAll();
      else expandCard(card);
    });
  });

  // Tap outside collapses on mobile
  document.addEventListener("click", (e) => {
    if (isMobile() && !e.target.closest(".review-card")) collapseAll();
  });

  // Entrance animation via IntersectionObserver
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      cards.forEach((card, i) =>
        setTimeout(() => card.classList.add("review-visible"), i * 80)
      );
      observer.disconnect();
    },
    { threshold: 0.12 }
  );
  observer.observe(grid);
}

function initHeroSequence() {
  const img = document.querySelector(".hero-sequence");
  if (!img) return;

  const count = Number(img.dataset.frameCount || 0);
  const base = img.dataset.frameBase || "";
  const ext = img.dataset.frameExt || "webp";
  if (!count || !base) return;

  const frameSrc = (index) => `${base}${String(index).padStart(3, "0")}.${ext}`;
  const finalSrc = frameSrc(count);
  img.src = finalSrc;
}

function initHeroVideo() {
  const hero = document.querySelector(".hero");
  const videos = Array.from(document.querySelectorAll(".hero-video"));
  if (!hero || !videos.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  let heroVisible = false;
  let lastReplayAt = 0;
  const replayGap = 900;

  const activeVideo = () =>
    videos.find((item) => window.getComputedStyle(item).display !== "none") || videos[0];

  const resetVideo = (targetVideo = null) => {
    videos.forEach((video) => {
      if (targetVideo && video !== targetVideo) return;
      video.pause();
      video.classList.remove("is-playing", "has-ended");
      try {
        video.currentTime = 0;
      } catch (_error) {
        // Some browsers can block currentTime changes until metadata is ready.
      }
    });
  };

  const resetInactiveVideos = (currentVideo) => {
    videos.forEach((video) => {
      if (video === currentVideo) return;
      video.pause();
      video.classList.remove("is-playing", "has-ended");
      try {
        video.currentTime = 0;
      } catch (_error) {}
    });
  };

  const playVideo = () => {
    const video = activeVideo();
    resetInactiveVideos(video);

    const now = Date.now();
    if (now - lastReplayAt < replayGap) return;
    if (!video.paused && !video.ended) return;

    lastReplayAt = now;
    video.classList.remove("has-ended");
    video.classList.add("is-playing");
    try {
      video.currentTime = 0;
    } catch (_error) {}

    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => resetVideo());
    }
  };

  const replayOnHeroActivity = () => {
    if (!heroVisible) return;
    const video = activeVideo();
    if (video.ended || video.paused) playVideo();
  };

  videos.forEach((video) => {
    video.addEventListener("ended", () => {
      video.classList.remove("is-playing");
      video.classList.add("has-ended");
    });
    // Mobile fix: show video as soon as it starts playing via HTML autoplay attribute
    video.addEventListener("playing", () => {
      video.classList.add("is-playing");
    });
  });

  hero.addEventListener("pointermove", replayOnHeroActivity, { passive: true });
  hero.addEventListener("touchstart", replayOnHeroActivity, { passive: true });
  window.addEventListener("scroll", replayOnHeroActivity, { passive: true });
  window.addEventListener("resize", () => resetVideo(), { passive: true });

  const observer = new IntersectionObserver(
    ([entry]) => {
      heroVisible = entry.isIntersecting;
      if (entry.isIntersecting) {
        playVideo();
      } else {
        resetVideo();
      }
    },
    { threshold: 0.15 }
  );

  observer.observe(hero);
}

// ─── CONTACT POPUP ────────────────────────────────────────────────────────────
// Перехватывает клики по .btn-primary и .footer-cta-btn ведущим на t.me/Odrad888,
// открывает форму-заявку вместо перехода в Telegram.
// FAB кнопки (class fab-item) — исключены, работают как прежде.
function initContactPopup() {
  const lang = () => document.documentElement.lang === "ru" ? "ru" : "ua";

  // ── HTML попапа ──────────────────────────────────────────────────────────
  const popup = document.createElement("div");
  popup.id = "contact-popup-overlay";
  popup.className = "popup-overlay";
  popup.setAttribute("hidden", "");
  popup.setAttribute("role", "dialog");
  popup.setAttribute("aria-modal", "true");
  popup.innerHTML = `
    <div class="popup" id="contact-popup">
      <button class="popup-close" type="button" aria-label="Закрити">✕</button>
      <h2 class="popup-title"
          data-ua="Залишити заявку"
          data-ru="Оставить заявку">Залишити заявку</h2>
      <form id="contact-popup-form" class="popup-form" novalidate>

        <div class="popup-field">
          <input type="text" name="name" class="popup-input"
            data-placeholder-ua="Ваше ім'я"
            data-placeholder-ru="Ваше имя"
            placeholder="Ваше ім'я"
            autocomplete="name">
        </div>

        <div class="popup-field">
          <input type="tel" name="phone" class="popup-input"
            data-placeholder-ua="Ваш номер телефону"
            data-placeholder-ru="Ваш номер телефона"
            placeholder="Ваш номер телефону"
            autocomplete="tel">
        </div>

        <div class="popup-field" id="popup-messenger-field">
          <p class="popup-label"
             data-ua="Виберіть месенджер"
             data-ru="Выберите мессенджер">Виберіть месенджер</p>
          <div class="popup-messengers" id="popup-messengers">
            <button type="button" class="popup-messenger-btn" data-messenger="Telegram">Telegram</button>
            <button type="button" class="popup-messenger-btn" data-messenger="WhatsApp">WhatsApp</button>
            <button type="button" class="popup-messenger-btn" data-messenger="Viber">Viber</button>
          </div>
          <input type="hidden" name="messenger" id="popup-messenger-value">
        </div>

        <div class="popup-field">
          <textarea name="situation" class="popup-input popup-textarea"
            data-placeholder-ua="Декілька слів про ситуацію..."
            data-placeholder-ru="Несколько слов о ситуации..."
            placeholder="Декілька слів про ситуацію..."
            rows="3"></textarea>
        </div>

        <button type="submit" class="popup-submit"
          data-ua="Надіслати заявку →"
          data-ru="Отправить заявку →">Надіслати заявку →</button>

        <div id="popup-status" class="popup-status" hidden>
          <span
            data-ua="Дякуємо! Дмитро зв'яжеться з вами найближчим часом."
            data-ru="Спасибо! Дмитрий свяжется с вами в ближайшее время.">
            Дякуємо! Дмитро зв'яжеться з вами найближчим часом.
          </span>
        </div>

      </form>
    </div>`;
  document.body.appendChild(popup);

  // ── Синхронизация языка ──────────────────────────────────────────────────
  function syncLang() {
    const l = lang();
    popup.querySelectorAll("[data-ua][data-ru]").forEach(el => {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = el.dataset[l === "ua" ? "placeholderUa" : "placeholderRu"] || "";
      } else {
        el.textContent = el.dataset[l === "ua" ? "ua" : "ru"] || el.textContent;
      }
    });
  }

  // ── Открытие / закрытие ──────────────────────────────────────────────────
  function openPopup() {
    syncLang();
    popup.removeAttribute("hidden");
    requestAnimationFrame(() => popup.classList.add("popup-visible"));
    document.body.style.overflow = "hidden";
    popup.querySelector(".popup-close").focus();
  }

  function closePopup() {
    popup.classList.remove("popup-visible");
    setTimeout(() => {
      popup.setAttribute("hidden", "");
      document.body.style.overflow = "";
      resetForm();
    }, 220);
  }

  function resetForm() {
    const form = document.getElementById("contact-popup-form");
    form.reset();
    document.getElementById("popup-messenger-value").value = "";
    form.querySelectorAll(".popup-messenger-btn").forEach(b => b.classList.remove("active"));
    form.querySelectorAll(".popup-error").forEach(el => el.classList.remove("popup-error"));
    document.getElementById("popup-status").hidden = true;
    form.querySelector(".popup-submit").disabled = false;
  }

  // Закрытие по крестику и клику на оверлей
  popup.querySelector(".popup-close").addEventListener("click", closePopup);
  popup.addEventListener("click", e => { if (e.target === popup) closePopup(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !popup.hasAttribute("hidden")) closePopup();
  });

  // ── Выбор мессенджера ────────────────────────────────────────────────────
  document.getElementById("popup-messengers").addEventListener("click", e => {
    const btn = e.target.closest(".popup-messenger-btn");
    if (!btn) return;
    document.querySelectorAll(".popup-messenger-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("popup-messenger-value").value = btn.dataset.messenger;
    document.getElementById("popup-messengers").classList.remove("popup-error");
  });

  // ── Валидация ────────────────────────────────────────────────────────────
  function validate(form) {
    let ok = true;
    const name = form.elements["name"];
    const phone = form.elements["phone"];
    const messenger = form.elements["messenger"];
    [name, phone].forEach(el => {
      if (!el.value.trim()) { el.classList.add("popup-error"); ok = false; }
      else el.classList.remove("popup-error");
    });
    if (!messenger.value) {
      document.getElementById("popup-messengers").classList.add("popup-error");
      ok = false;
    }
    return ok;
  }

  // ── Отправка ─────────────────────────────────────────────────────────────
  document.getElementById("contact-popup-form").addEventListener("submit", async e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return;

    const submit = form.querySelector(".popup-submit");
    submit.disabled = true;

    const payload = {
      name:      form.elements["name"].value.trim(),
      phone:     form.elements["phone"].value.trim(),
      messenger: form.elements["messenger"].value,
      situation: form.elements["situation"].value.trim(),
      page:      window.location.href
    };

    try {
      const res = await fetch("/api/send-tg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error();
      const status = document.getElementById("popup-status");
      const span = status.querySelector("span");
      const l = lang();
      if (span) {
        span.textContent = l === "ua"
          ? "Дякуємо! Дмитро зв'яжеться з вами найближчим часом."
          : "Спасибо! Дмитрий свяжется с вами в ближайшее время.";
      }
      form.querySelector(".popup-submit").style.display = "none";
      status.hidden = false;
      if (window.dataLayer) window.dataLayer.push({ event: "form_submit", form_type: "popup", messenger: payload.messenger });
      setTimeout(closePopup, 3500);
    } catch {
      submit.disabled = false;
    }
  });

  // ── Перехват кнопок → t.me ───────────────────────────────────────────────
  // Перехватываем .btn-primary и .footer-cta-btn → t.me/Odrad888
  // Исключаем FAB (родитель с классом fab-item) и текстовые @Odrad888 ссылки
  document.addEventListener("click", e => {
    const link = e.target.closest('a[href="https://t.me/Odrad888"]');
    if (!link) return;
    const isFab = !!link.closest(".fab-item");
    const isBtn = link.classList.contains("btn-primary") || link.classList.contains("footer-cta-btn");
    if (isFab || !isBtn) return;
    e.preventDefault();
    openPopup();
  });
}
