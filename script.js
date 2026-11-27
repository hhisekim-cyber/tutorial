// 헤더 스크롤 그림자
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
});

// 모바일 메뉴
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});
nav.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', false);
  })
);

// 강의 필터 탭
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.card');
tabs.forEach((tab) =>
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    const filter = tab.dataset.filter;
    cards.forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  })
);

// 숫자 카운트업
function countUp(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString('ko-KR') + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// 스크롤 등장 애니메이션
const revealTargets = document.querySelectorAll(
  '.section__head, .about, .card, .timeline li, .review, .faq details, .apply'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => io.observe(el));

  const statIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      statIO.unobserve(entry.target);
    });
  });
  document.querySelectorAll('[data-count]').forEach((el) => statIO.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
  document.querySelectorAll('[data-count]').forEach(countUp);
}

// 수강 신청 폼 검증
const form = document.getElementById('applyForm');
const msg = form.querySelector('.form__msg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let firstInvalid = null;
  form.querySelectorAll('[required]').forEach((field) => {
    const valid = field.checkValidity();
    field.classList.toggle('is-invalid', !valid);
    if (!valid && !firstInvalid) firstInvalid = field;
  });

  if (firstInvalid) {
    msg.className = 'form__msg is-error';
    msg.textContent = firstInvalid.name === 'agree'
      ? '개인정보 수집 및 이용에 동의해 주세요.'
      : '입력 항목을 다시 확인해 주세요.';
    firstInvalid.focus();
    return;
  }

  // TODO: 실제 서버/폼 서비스로 전송하도록 연결하세요.
  const name = form.elements.namedItem('name').value.trim();
  msg.className = 'form__msg is-success';
  msg.textContent = `${name}님, 신청이 접수되었습니다! 24시간 내로 연락드릴게요.`;
  form.reset();
});

form.querySelectorAll('input, select, textarea').forEach((field) =>
  field.addEventListener('input', () => field.classList.remove('is-invalid'))
);
