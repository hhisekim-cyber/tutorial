import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import Reveal from '../components/Reveal.jsx';
import CountUp from '../components/CountUp.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CourseCard from '../components/CourseCard.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { courses } from '../data/courses.js';
import { reviews } from '../data/reviews.js';

const features = [
  { icon: '🗣️', title: '소수정예 6~8명', text: '정원을 제한해 매 수업 모든 수강생이 충분히 말합니다.' },
  { icon: '🎙️', title: '1:1 녹음 피드백', text: '내 발화를 녹음해 함께 듣고, 습관과 오류를 구체적으로 교정합니다.' },
  { icon: '📈', title: '전후 비교 리포트', text: '수강 전후 녹음과 평가를 비교해 성장을 눈으로 확인합니다.' },
];

export default function Home() {
  usePageMeta(
    'Speak Up English | 실전 영어 강의',
    '기초 회화부터 비즈니스 영어, 시험 대비까지. 수준별 실전 영어 강의를 소개합니다.'
  );

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="eyebrow">2027 봄학기 수강생 모집 중</p>
            <h1>머릿속 영어를<br /><em>입 밖으로</em> 꺼내는 시간</h1>
            <p className="hero__lead">
              문법은 아는데 말이 안 나온다면, 방법을 바꿀 때입니다.<br />
              12주 동안 매일 말하고, 피드백 받고, 다시 말하는 실전 영어 강의.
            </p>
            <div className="hero__actions">
              <Link to="/apply" className="btn">무료 레벨 테스트 신청</Link>
              <Link to="/courses" className="btn btn--ghost">강의 둘러보기</Link>
            </div>
            <ul className="hero__stats">
              <li><CountUp to={3200} /><span>누적 수강생</span></li>
              <li><CountUp to={96} suffix="%" /><span>수강 만족도</span></li>
              <li><CountUp to={12} suffix="년" /><span>강의 경력</span></li>
            </ul>
          </div>
          <div className="hero__card" aria-hidden="true">
            <div className="bubble bubble--en">How was your weekend?</div>
            <div className="bubble bubble--me">It was great! I went hiking with my friends.</div>
            <div className="bubble bubble--fb">
              <b>✓ 피드백</b> 자연스러워요! <i>“went hiking”</i> 표현 아주 좋습니다.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Why SpeakUp"
            title="말하는 영어가 늘 수밖에 없는 구조"
            desc="듣고 외우는 수업이 아니라, 내가 말하는 시간을 중심에 둡니다."
          />
          <div className="grid-3">
            {features.map((f) => (
              <Reveal key={f.title} className="feature">
                <span className="feature__icon">{f.icon}</span><h3>{f.title}</h3><p>{f.text}</p>
              </Reveal>
            ))}
          </div>
          <p className="more"><Link to="/about" className="link">강사와 수업 방식 더 보기 →</Link></p>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="Courses"
            title="나에게 맞는 강의를 선택하세요"
            desc="모든 강의는 레벨 테스트 후 반 배정이 이루어집니다."
          />
          <div className="cards">
            {courses.map((c) => <CourseCard key={c.slug} course={c} />)}
          </div>
          <p className="more"><Link to="/courses" className="btn btn--ghost">강의 비교하고 전체 보기</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Reviews" title="먼저 경험한 수강생들의 이야기" />
          <div className="reviews">
            {reviews.slice(0, 3).map((r) => <ReviewCard key={r.text} review={r} />)}
          </div>
          <p className="more"><Link to="/reviews" className="link">후기 더 보기 →</Link></p>
        </div>
      </section>

      <CtaBand
        title="무료 레벨 테스트로 시작해 보세요"
        text="15분 1:1 화상 테스트 후, 현재 수준과 맞춤 학습 방향을 안내해 드립니다."
      />
    </>
  );
}
