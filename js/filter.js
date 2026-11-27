// 카테고리 탭 필터: <div class="tabs" data-filter-for="#목록"> ... <button data-filter="값">
// 대상 목록 안의 [data-category] 요소를 보이기/숨기기. 해시(#speaking 등)로 초기 필터 지정 가능.
document.querySelectorAll('.tabs[data-filter-for]').forEach((group) => {
  const scope = document.querySelector(group.dataset.filterFor);
  if (!scope) return;
  const tabs = group.querySelectorAll('.tab');
  const items = scope.querySelectorAll('[data-category]');
  const groups = scope.querySelectorAll('[data-group]');

  const apply = (filter) => {
    tabs.forEach((t) => {
      const on = t.dataset.filter === filter;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on);
    });
    items.forEach((item) => {
      item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter);
    });
    groups.forEach((g) => {
      g.classList.toggle('is-hidden', filter !== 'all' && g.dataset.group !== filter);
    });
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => apply(tab.dataset.filter)));

  const initial = location.hash.slice(1);
  if ([...tabs].some((t) => t.dataset.filter === initial)) apply(initial);
});
