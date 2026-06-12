document.addEventListener("DOMContentLoaded", () => {
  window.DmitriiUtils?.wireConfigLinks();
  window.DmitriiLang?.initLang();
  window.DmitriiForms?.initForms();
  window.DmitriiAnimations?.initAnimations();
  initHeroSequence();
  initHeroVideo();
  initReviewCards();

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
