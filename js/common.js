// 모든 페이지 공통: 헤더, 모바일 메뉴, 스크롤 등장, 숫자 카운트업
const header = document.querySelector('.header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });
}

function countUp(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const decimals = Number(el.dataset.decimals || 0);
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toLocaleString('ko-KR', {
      minimumFractionDigits: decimals, maximumFractionDigits: decimals,
    }) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const revealTargets = document.querySelectorAll(
  '.section__head, .about, .card, .timeline li, .review, .faq details, .apply, ' +
  '.feature, .step, .history li, .table-wrap, .cta-band, .detail__block, .split'
);
revealTargets.forEach((el) => el.classList.add('reveal'));
const counters = document.querySelectorAll('[data-count]');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  revealTargets.forEach((el) => io.observe(el));

  const statIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      statIO.unobserve(entry.target);
    });
  });
  counters.forEach((el) => statIO.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
  counters.forEach(countUp);
}
