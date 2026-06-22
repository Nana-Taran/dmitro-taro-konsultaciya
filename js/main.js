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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name      = (form.elements["name"]?.value      || "").trim();
    const contact   = (form.elements["contact"]?.value   || "").trim();
    const situation = (form.elements["situation"]?.value || "").trim();

    if (!name && !contact && !situation) {
      form.elements["name"].focus();
      return;
    }

    const submit = form.querySelector(".cta-submit");
    submit.disabled = true;

    try {
      const res = await fetch("/api/send-tg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, situation }),
      });

      if (!res.ok) throw new Error("tg_error");

      form.elements["name"].value      = "";
      form.elements["contact"].value   = "";
      form.elements["situation"].value = "";

      const span = success.querySelector("span");
      if (span) {
        span.dataset.ua = "Дякуємо! Дмитро зв'яжеться з вами найближчим часом 🙏";
        span.dataset.ru = "Спасибо! Дмитрий свяжется с вами в ближайшее время 🙏";
        window.DmitriiLang?.setLang(localStorage.getItem("dmitrii-lang") || "ua");
      }
      success.hidden = false;
      setTimeout(() => { success.hidden = true; }, 5000);

      if (window.dataLayer) window.dataLayer.push({ event: "cta_form_submit" });

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
