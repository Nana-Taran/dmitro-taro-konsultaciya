function initAnimations() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = window.gsap && window.ScrollTrigger;

  document.body.classList.add("is-ready");

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  }, { passive: true });

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

window.DmitriiAnimations = { initAnimations };
