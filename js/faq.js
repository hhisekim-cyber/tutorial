// FAQ 검색 + 모두 열기/닫기
const search = document.querySelector('.search');
const faqRoot = document.getElementById('faqList');
if (search && faqRoot) {
  const entries = [...faqRoot.querySelectorAll('details')];
  const groups = [...faqRoot.querySelectorAll('.faq__group')];
  const empty = document.querySelector('.faq__empty');

  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    entries.forEach((d) => {
      const match = !q || d.textContent.toLowerCase().includes(q);
      d.classList.toggle('is-hidden', !match);
      if (q && match) d.open = true;
      if (match) shown++;
    });
    groups.forEach((g) => {
      g.classList.toggle('is-hidden', !g.querySelector('details:not(.is-hidden)'));
    });
    if (empty) empty.classList.toggle('is-hidden', shown > 0);
  });
}
