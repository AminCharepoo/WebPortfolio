// Fade-in sections on scroll.
//
// Every .reveal section starts at opacity 0, so if this script fails to reveal
// them the page looks blank. Each path below is a guard against that:
//   - no IntersectionObserver support  -> reveal everything up front
//   - observer callback fires late     -> sweep on load and on a short timer
//   - observer never fires at all      -> sweep on scroll
const els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
const show = el => el.classList.add('visible');

if (!('IntersectionObserver' in window)) {
  els.forEach(show);
} else {
  const io = new IntersectionObserver(
    (entries, obs) => entries.forEach(e => {
      if (e.isIntersecting) { show(e.target); obs.unobserve(e.target); }
    }),
    { threshold: 0.08 }
  );
  els.forEach(el => io.observe(el));

  // Reveal anything already within the viewport without waiting on the observer.
  const sweep = () => els.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) show(el);
  });

  window.addEventListener('load', sweep);
  window.addEventListener('scroll', sweep, { passive: true });
  setTimeout(sweep, 600);
}
