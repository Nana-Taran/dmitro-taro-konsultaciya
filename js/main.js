document.addEventListener("DOMContentLoaded", () => {
  window.DmitriiUtils?.wireConfigLinks();
  window.DmitriiLang?.initLang();
  window.DmitriiForms?.initForms();
  window.DmitriiAnimations?.initAnimations();
  initHeroSequence();
  initHeroVideo();

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
    { threshold: 0.55 }
  );

  observer.observe(hero);
}
