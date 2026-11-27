import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import { courses } from '../data/courses.js';

const steps = [
  { title: '신청서 제출', text: '아래 양식에 연락처와 관심 강의, 학습 목표를 남겨 주세요.' },
  { title: '상담 연락', text: '24시간 내에 전화 또는 문자로 레벨 테스트 일정을 조율합니다.' },
  { title: '레벨 테스트', text: '15분 1:1 화상 테스트로 말하기 수준과 목표를 진단합니다.' },
  { title: '반 배정 · 결제', text: '추천 강의와 개강일을 안내받고, 확정 후 결제하면 수강이 시작됩니다.' },
];

// TODO: 실제 개강 일정으로 교체
const schedule = [
  ['왕초보 탈출 회화', '3월 2일(월)', '화·목 19:30'],
  ['프리토킹 마스터', '3월 3일(화)', '월·수·금 20:00'],
  ['비즈니스 영어', '3월 9일(월)', '월·수 21:00'],
  ['OPIc · 토익스피킹', '3월 7일(토)', '토·일 10:00'],
];

export default function Apply() {
  usePageMeta('수강 신청 | Speak Up English', '무료 레벨 테스트 신청부터 반 배정, 수강 시작까지의 절차와 신청서를 안내합니다.');

  return (
    <>
      <PageHero
        current="수강 신청"
        title="무료 레벨 테스트부터 시작해 보세요"
        lead="신청서를 남겨 주시면 24시간 내로 연락드립니다. 15분 1:1 화상 테스트 후 맞춤 학습 방향을 안내해 드립니다."
      />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Process" title="수강까지 4단계" desc="신청서 제출만으로는 결제되지 않습니다." />
          <div className="steps">
            {steps.map((s) => (
              <Reveal key={s.title} className="step"><h3>{s.title}</h3><p>{s.text}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark" id="apply">
        <Reveal className="container apply">
          <div className="apply__text">
            <p className="eyebrow eyebrow--light">Apply</p>
            <h2>신청서를 남겨 주세요</h2>
            <p>15분 1:1 화상 테스트 후, 현재 수준과 맞춤 학습 방향을 안내해 드립니다.</p>
            <ul className="contact">
              <li>📞 02-000-0000</li>
              <li>✉️ hello@speakup-english.example</li>
              <li>🕘 평일 10:00 – 21:00</li>
            </ul>
          </div>
          <ApplyForm />
        </Reveal>
      </section>

      <section className="section">
        <Reveal className="container split">
          <div>
            <p className="eyebrow">Level Test</p>
            <h2>레벨 테스트 안내</h2>
            <ul className="checklist">
              <li>소요 시간 15분 · 무료 · Zoom 1:1 화상</li>
              <li>준비물: 마이크가 있는 PC/스마트폰, 조용한 장소</li>
              <li>자기소개와 간단한 질의응답으로 진행됩니다</li>
              <li>결과와 추천 강의는 테스트 직후 바로 안내합니다</li>
            </ul>
            <div className="notice">시험이 아니라 현재 위치를 확인하는 시간입니다. 편한 마음으로 오세요.</div>
          </div>
          <div>
            <p className="eyebrow">Schedule</p>
            <h2>2027 봄학기 일정</h2>
            <Reveal className="table-wrap">
              <table className="table" style={{ minWidth: 0 }}>
                <thead><tr><th>강의</th><th>개강일</th><th>시간</th></tr></thead>
                <tbody>
                  {schedule.map(([name, date, time]) => (
                    <tr key={name}><td>{name}</td><td>{date}</td><td>{time}</td></tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
            <div className="prose" style={{ marginTop: '1rem' }}>
              <p>수강료와 환불 규정은 <Link className="link" to="/faq">FAQ</Link>에서 확인하세요.</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

// 수강 신청 폼: 브라우저 기본 검증(checkValidity) 사용 + ?course=slug 로 관심 강의 자동 선택
function ApplyForm() {
  const formRef = useRef(null);
  const [searchParams] = useSearchParams();
  const preset = searchParams.get('course');
  const initialCourse = courses.some((c) => c.slug === preset) ? preset : '';

  const [invalid, setInvalid] = useState(() => new Set());
  const [msg, setMsg] = useState(null); // { type: 'error' | 'success', text }

  const fieldClass = (name) => (invalid.has(name) ? 'is-invalid' : undefined);
  const clearInvalid = (e) => {
    const { name } = e.target;
    if (!invalid.has(name)) return;
    setInvalid((prev) => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const fields = [...form.querySelectorAll('[required]')];
    const bad = fields.filter((f) => !f.checkValidity());
    setInvalid(new Set(bad.map((f) => f.name)));

    if (bad.length) {
      const first = bad[0];
      setMsg({
        type: 'error',
        text: first.name === 'agree' ? '개인정보 수집 및 이용에 동의해 주세요.' : '입력 항목을 다시 확인해 주세요.',
      });
      first.focus();
      return;
    }

    // TODO: 실제 서버/폼 서비스로 전송하도록 연결하세요.
    const name = form.elements.namedItem('name').value.trim();
    setMsg({ type: 'success', text: `${name}님, 신청이 접수되었습니다! 24시간 내로 연락드릴게요.` });
    form.reset();
    form.elements.namedItem('course').value = ''; // 원본과 동일하게 '선택해 주세요'로 초기화
  };

  return (
    <form className="form" id="applyForm" noValidate ref={formRef} onSubmit={handleSubmit} onInput={clearInvalid}>
      <label>
        이름
        <input type="text" name="name" placeholder="홍길동" required className={fieldClass('name')} />
      </label>
      <label>
        연락처
        <input
          type="tel"
          name="phone"
          placeholder="010-0000-0000"
          required
          pattern="^0\d{1,2}-?\d{3,4}-?\d{4}$"
          className={fieldClass('phone')}
        />
      </label>
      <label>
        관심 강의
        <select name="course" required defaultValue={initialCourse} className={fieldClass('course')}>
          <option value="">선택해 주세요</option>
          {courses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
        </select>
      </label>
      <label>
        남기실 말씀 <small>(선택)</small>
        <textarea name="message" rows="3" placeholder="희망 시간대, 학습 목표 등"></textarea>
      </label>
      <label className="agree">
        <input type="checkbox" name="agree" required className={fieldClass('agree')} />
        개인정보 수집 및 이용에 동의합니다.
      </label>
      <button type="submit" className="btn btn--block">레벨 테스트 신청하기</button>
      <p className={msg ? `form__msg is-${msg.type}` : 'form__msg'} role="status" aria-live="polite">
        {msg?.text}
      </p>
    </form>
  );
}
