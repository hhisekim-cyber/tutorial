import usePageMeta from '../hooks/usePageMeta.js';
import useHashFilter from '../hooks/useHashFilter.js';
import PageHero from '../components/PageHero.jsx';
import CountUp from '../components/CountUp.jsx';
import Tabs from '../components/Tabs.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { courses } from '../data/courses.js';
import { reviews } from '../data/reviews.js';

const TABS = [
  { value: 'all', label: '전체' },
  ...courses.map((c) => ({ value: c.slug, label: c.title })),
];

export default function Reviews() {
  usePageMeta('수강 후기 | Speak Up English', '먼저 경험한 수강생들의 생생한 후기. 강의별 후기를 확인해 보세요.');
  const [filter, setFilter] = useHashFilter(TABS.map((t) => t.value));

  return (
    <>
      <PageHero
        current="수강 후기"
        title="먼저 경험한 수강생들의 이야기"
        lead="강의별로 후기를 모아 보았습니다. 나와 비슷한 목표의 수강생은 어떻게 달라졌는지 확인해 보세요."
      />

      <section className="section">
        <div className="container">
          <div className="summary">
            <div><CountUp to={4.8} decimals={1} /><span>평균 별점 (5점 만점)</span></div>
            <div><CountUp to={96} suffix="%" /><span>수강 만족도</span></div>
            <div><CountUp to={3200} suffix="+" /><span>누적 수강생</span></div>
          </div>
          <Tabs options={TABS} value={filter} onChange={setFilter} />
          <div className="reviews reviews--wide" id="reviewList">
            {reviews.map((r) => (
              <ReviewCard key={r.text} review={r} hidden={filter !== 'all' && r.course !== filter} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="다음 후기의 주인공이 되어 보세요"
        text="15분 1:1 화상 테스트 후, 현재 수준과 맞춤 학습 방향을 안내해 드립니다."
      />
    </>
  );
}
