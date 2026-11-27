import { isValidElement, useState } from 'react';
import usePageMeta from '../hooks/usePageMeta.js';
import useHashFilter from '../hooks/useHashFilter.js';
import PageHero from '../components/PageHero.jsx';
import Tabs from '../components/Tabs.jsx';
import FaqItem from '../components/FaqItem.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { faqGroups } from '../data/faqs.jsx';

const TABS = [
  { value: 'all', label: '전체' },
  ...faqGroups.map((g) => ({ value: g.id, label: g.title })),
];

// JSX 답변(링크 포함)에서 검색용 순수 텍스트 추출
function textOf(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement(node)) return textOf(node.props.children);
  return '';
}

const searchable = faqGroups.map((g) => ({
  ...g,
  items: g.items.map((item) => ({ ...item, text: (item.q + ' ' + textOf(item.a)).toLowerCase() })),
}));

export default function Faq() {
  usePageMeta('자주 묻는 질문 | Speak Up English', '수강 전, 수업 진행, 결제·환불, 시험 관련 자주 묻는 질문을 모았습니다.');
  const [filter, setFilter] = useHashFilter(TABS.map((t) => t.value));
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  // 탭(분류)과 검색어를 모두 만족하는 항목만 노출
  const groups = searchable.map((g) => {
    const inTab = filter === 'all' || g.id === filter;
    const items = g.items.map((item) => ({ ...item, match: inTab && (!q || item.text.includes(q)) }));
    return { ...g, items, visible: items.some((i) => i.match) };
  });
  const shown = groups.reduce((n, g) => n + g.items.filter((i) => i.match).length, 0);

  return (
    <>
      <PageHero current="FAQ" title="자주 묻는 질문" lead="궁금한 점을 검색하거나 분류별로 찾아보세요." />

      <section className="section">
        <div className="container container--narrow">
          <input
            className="search"
            type="search"
            placeholder="질문 검색 (예: 환불, 녹화본, 레벨 테스트)"
            aria-label="FAQ 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Tabs options={TABS} value={filter} onChange={setFilter} />
          <div className="faq" id="faqList">
            {groups.map((g) => (
              <section key={g.id} className={g.visible ? 'faq__group' : 'faq__group is-hidden'} data-group={g.id}>
                <h3>{g.title}</h3>
                {g.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} hidden={!item.match} forceOpen={Boolean(q) && item.match} />
                ))}
              </section>
            ))}
            <p className={shown > 0 ? 'faq__empty is-hidden' : 'faq__empty'}>검색 결과가 없습니다. 아래 연락처로 문의해 주세요.</p>
          </div>
          <div className="notice">찾는 답변이 없나요? 📞 02-000-0000 · ✉️ hello@speakup-english.example (평일 10:00 – 21:00)</div>
        </div>
      </section>

      <CtaBand
        title="직접 상담받고 싶으신가요?"
        text="15분 1:1 화상 테스트 후, 현재 수준과 맞춤 학습 방향을 안내해 드립니다."
      />
    </>
  );
}
