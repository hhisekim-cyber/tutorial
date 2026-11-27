import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import useHashFilter from '../hooks/useHashFilter.js';
import PageHero from '../components/PageHero.jsx';
import Tabs from '../components/Tabs.jsx';
import CourseCard from '../components/CourseCard.jsx';
import SectionHead from '../components/SectionHead.jsx';
import Reveal from '../components/Reveal.jsx';
import FaqItem from '../components/FaqItem.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { courses } from '../data/courses.js';

const TABS = [
  { value: 'all', label: '전체' },
  { value: 'speaking', label: '회화' },
  { value: 'business', label: '비즈니스' },
  { value: 'exam', label: '시험 대비' },
];

// 비교표 행: [행 제목, 강의 → 셀 내용]
const COMPARE_ROWS = [
  ['추천 대상', (c) => c.recommend[0]],
  ['레벨', (c) => c.badge.label],
  ['횟수 · 기간', (c) => c.schedule],
  ['정원', (c) => `${c.capacity}명`],
  ['방식', (c) => c.mode],
  ['수강료', (c) => <strong>{c.price}</strong>],
  ['상세', (c) => <Link className="link" to={`/courses/${c.slug}`}>보기 →</Link>],
];

const GUIDE = [
  { q: '영어 말하기가 처음이거나 오래 쉬었어요', slug: 'beginner', after: '로 시작하세요. 핵심 패턴 100개로 기초 대화를 만듭니다.' },
  { q: '대화는 되는데 길고 논리적으로 말하고 싶어요', slug: 'freetalk', after: '가 적합합니다. 토론과 1:1 녹음 피드백으로 문장을 확장합니다.' },
  { q: '업무에서 영어를 써야 해요', slug: 'business', after: '에서 이메일, 회의, 발표, 협상을 케이스로 연습합니다.' },
  { q: '시험 점수가 필요해요', slug: 'opic', after: '으로 8주 안에 나만의 스토리 답변을 준비합니다.' },
];

export default function Courses() {
  usePageMeta(
    '강의 안내 | Speak Up English',
    '왕초보 회화, 프리토킹, 비즈니스 영어, OPIc·토익스피킹. 4개 강의를 비교하고 나에게 맞는 강의를 찾아보세요.'
  );
  const [filter, setFilter] = useHashFilter(TABS.map((t) => t.value));

  return (
    <>
      <PageHero
        current="강의 안내"
        title="나에게 맞는 강의를 선택하세요"
        lead="모든 강의는 레벨 테스트 후 반 배정이 이루어집니다. 목표와 현재 수준에 맞는 강의를 비교해 보세요."
      />

      <section className="section section--tint">
        <div className="container">
          <Tabs options={TABS} value={filter} onChange={setFilter} />
          <div className="cards" id="courseList">
            {courses.map((c) => (
              <CourseCard key={c.slug} course={c} hidden={filter !== 'all' && c.category !== filter} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Compare" title="한눈에 비교하기" desc="수준과 목표, 일정을 나란히 놓고 비교해 보세요." />
          <Reveal className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  {courses.map((c) => (
                    <th key={c.slug} className={c.featured ? 'is-featured' : undefined}>{c.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(([label, render]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {courses.map((c) => (
                      <td key={c.slug} className={c.featured ? 'is-featured' : undefined}>{render(c)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container container--narrow">
          <SectionHead eyebrow="Guide" title="어떤 강의가 맞을까요?" />
          <div className="faq">
            {GUIDE.map((g, i) => {
              const course = courses.find((c) => c.slug === g.slug);
              return (
                <FaqItem
                  key={g.slug}
                  defaultOpen={i === 0}
                  q={g.q}
                  a={<><Link className="link" to={`/courses/${g.slug}`}>{course.title}</Link>{g.after}</>}
                />
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand title="아직 고민되시나요?" text="무료 레벨 테스트로 나에게 맞는 반을 추천받아 보세요." />
    </>
  );
}
