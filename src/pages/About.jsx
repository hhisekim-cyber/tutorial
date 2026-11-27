import usePageMeta from '../hooks/usePageMeta.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CountUp from '../components/CountUp.jsx';
import CtaBand from '../components/CtaBand.jsx';

const principles = [
  { icon: '①', title: '말하는 시간이 가장 길어야 한다', text: '강사가 설명하는 시간보다 수강생이 말하는 시간이 항상 더 길도록 수업을 설계합니다.' },
  { icon: '②', title: '틀려도 괜찮은 교실', text: '실수는 학습의 재료입니다. 부끄러움 없이 말할 수 있는 분위기를 가장 먼저 만듭니다.' },
  { icon: '③', title: '피드백은 구체적이고 즉시', text: '“좋아요”가 아니라 “이 표현을 이렇게 바꾸면 더 자연스럽다”까지 짚어 드립니다.' },
];

// TODO: 실제 약력으로 교체
const history = [
  { year: '2014', title: '영어교육 전공 졸업', text: '교육학과 응용언어학을 공부하며 말하기 교수법에 관심을 갖게 되었습니다.' },
  { year: '2015', title: '어학원 강사 시작', text: '성인 회화반을 맡으며 학습자가 말을 못 하는 진짜 이유를 연구하기 시작했습니다.' },
  { year: '2018', title: 'TESOL 자격 취득', text: '체계적인 교수법을 익혀 레벨별 커리큘럼을 설계했습니다.' },
  { year: '2020', title: '온라인 소그룹 수업 전환', text: '브레이크아웃 룸 기반의 발화 중심 온라인 수업 모델을 만들었습니다.' },
  { year: '2022', title: '기업 출강 시작', text: '비즈니스 영어·프레젠테이션 과정을 기업 대상으로 운영하고 있습니다.' },
  { year: '2026', title: '누적 수강생 3,000명 돌파', text: 'SpeakUp English로 더 많은 학습자와 함께하고 있습니다.' },
];

export default function About() {
  usePageMeta(
    '강사 소개 | Speak Up English',
    '12년간 성인 학습자와 함께해 온 Teacher Kim의 약력, 교육 철학, 수업 방식을 소개합니다.'
  );

  return (
    <>
      <PageHero
        current="강사 소개"
        title="“영어는 공부가 아니라 습관”입니다"
        lead="12년간 성인 학습자들과 함께하며 다듬은 교육 철학과 수업 방식을 소개합니다."
      />

      <section className="section">
        <Reveal className="container about">
          <div className="about__photo" aria-hidden="true"><div className="avatar">T</div></div>
          <div className="about__text">
            <p className="eyebrow">Instructor</p>
            <h2>안녕하세요, 강사 <span className="hl">Teacher Kim</span>입니다</h2>
            <p>
              “영어는 공부가 아니라 습관”이라는 믿음으로 12년간 성인 학습자들과 함께해 왔습니다.
              외워서 말하는 영어가 아니라, 상황에 맞게 <b>스스로 문장을 만들어 내는 힘</b>을 기르는 데 집중합니다.
            </p>
            <ul className="checklist">
              <li>TESOL 자격 보유 · 영어교육 전공</li>
              <li>기업 출강 (비즈니스 영어 · 프레젠테이션)</li>
              <li>온라인/오프라인 누적 수강생 3,000명 이상</li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead eyebrow="Philosophy" title="수업에서 지키는 세 가지 원칙" />
          <div className="grid-3">
            {principles.map((p) => (
              <Reveal key={p.icon} className="feature">
                <span className="feature__icon">{p.icon}</span><h3>{p.title}</h3><p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <Reveal className="container split">
          <div>
            <p className="eyebrow">Method</p>
            <h2>매 수업은 이렇게 흘러갑니다</h2>
            <div className="prose">
              <p>모든 강의는 <b>입력 → 연습 → 발화 → 피드백 → 복습</b>의 사이클로 진행됩니다. 새 표현을 배우고 곧바로 짝 대화와 롤플레이로 써 본 뒤, 내 발화를 녹음해 교정받습니다.</p>
              <p>수업이 끝나면 하루 10~15분 분량의 숙제로 표현을 다시 꺼내 쓰고, 다음 수업에서 확인합니다. 이 반복이 “아는 영어”를 “나오는 영어”로 바꿉니다.</p>
            </div>
            <ul className="checklist" style={{ marginTop: '1.2rem' }}>
              <li>주차별 목표와 수료 기준 사전 공개</li>
              <li>월 1회 학습 상담과 레벨 점검</li>
              <li>수강 전후 녹음 비교 리포트 제공</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">History</p>
            <h2>약력</h2>
            <ol className="history">
              {history.map((h) => (
                <Reveal as="li" key={h.year}>
                  <time>{h.year}</time><h3>{h.title}</h3><p>{h.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead eyebrow="Numbers" title="숫자로 보는 SpeakUp" />
          <ul className="hero__stats" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <li><CountUp to={3200} /><span>누적 수강생</span></li>
            <li><CountUp to={96} suffix="%" /><span>수강 만족도</span></li>
            <li><CountUp to={12} suffix="년" /><span>강의 경력</span></li>
            <li><CountUp to={40} suffix="+" /><span>출강 기업</span></li>
          </ul>
        </div>
      </section>

      <CtaBand
        title="강사와 직접 레벨을 확인해 보세요"
        text="15분 1:1 화상 테스트 후, 현재 수준과 맞춤 학습 방향을 안내해 드립니다."
      />
    </>
  );
}
