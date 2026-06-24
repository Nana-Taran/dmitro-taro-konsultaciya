function initAnimations() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = window.gsap && window.ScrollTrigger;

  document.body.classList.add("is-ready");

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  }, { passive: true });

  // CountUp — works without GSAP
  initCountUp();

  if (!reduceMotion) {
    initAboutH2();
    initCertStagger();
    initSerpentineObserver();
  }

  if (reduceMotion || !hasGsap) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-kicker, .hero-title .word, .hero-copy, .hero-actions, .hero-trust", {
    opacity: 0,
    y: 18,
    filter: "blur(10px)",
    duration: 0.9,
    stagger: 0.08,
    ease: "power2.out"
  });

  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 84%" },
      opacity: 0,
      y: 28,
      filter: "blur(8px)",
      duration: 0.8,
      ease: "power2.out"
    });
  });
}

function initAboutH2() {
  const h2 = document.querySelector(".section-dmitry h2");
  if (!h2) return;

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    h2.classList.add("h2-revealed");
    observer.disconnect();
  }, { threshold: 0.5 });

  observer.observe(h2);
}

function initCountUp() {
  const panel = document.querySelector(".about-stats");
  if (!panel) return;

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateCount(el, raw, duration) {
    const hasPlus = raw.includes("+");
    const target = parseInt(raw, 10);
    const suffix = hasPlus ? "+" : "";
    const start = performance.now();
    el.textContent = "0" + suffix;

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(easeOutExpo(t) * target) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    panel.querySelectorAll(".about-stat-num[data-count]").forEach((el) => {
      animateCount(el, el.dataset.count, 1800);
    });
    observer.disconnect();
  }, { threshold: 0.5 });

  observer.observe(panel);
}

function initSerpentineObserver() {
  const section = document.querySelector('.serpentine-wrapper');
  if (!section) return;

  const starMotion = document.getElementById('starMotion');
  const rings = section.querySelectorAll('[id^="ring-"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      if (starMotion) starMotion.beginElement();

      rings.forEach(ring => {
        ring.style.animation = 'none';
        ring.offsetHeight;
        ring.style.animation = '';
      });
    });
  }, { threshold: 0.25 });

  observer.observe(section);
}

function initCertStagger() {
  const grid = document.querySelector(".cert-grid");
  if (!grid) return;

  const showAll = () => {
    grid.querySelectorAll(".cert-card").forEach(card => card.classList.add("cert-visible"));
  };

  // Safety net: show cards after 3s regardless of IntersectionObserver
  const fallback = setTimeout(showAll, 3000);

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    clearTimeout(fallback);
    Array.from(grid.querySelectorAll(".cert-card")).forEach((card, i) => {
      setTimeout(() => card.classList.add("cert-visible"), i * 150);
    });
    observer.disconnect();
  }, { threshold: 0.1 });

  observer.observe(grid);
}

window.DmitriiAnimations = { initAnimations };
