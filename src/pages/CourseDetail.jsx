import { Link, Navigate, useParams } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CourseCard, { CourseMeta } from '../components/CourseCard.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import FaqItem from '../components/FaqItem.jsx';
import { courses, getCourse } from '../data/courses.js';
import { reviews } from '../data/reviews.js';

export default function CourseDetail() {
  const { slug } = useParams();
  const course = getCourse(slug);
  if (!course) return <Navigate to="/courses" replace />;
  return <CourseDetailView course={course} />;
}

function CourseDetailView({ course }) {
  usePageMeta(`${course.title} | Speak Up English`, `${course.title}: ${course.summary}`);

  const courseReviews = reviews.filter((r) => r.course === course.slug);
  const others = courses.filter((c) => c.slug !== course.slug);

  return (
    <>
      <PageHero
        crumbs={[{ to: '/courses', label: '강의 안내' }]}
        current={course.title}
        badge={course.badge}
        title={course.title}
        lead={course.lead}
      />

      <section className="section">
        <div className="container detail">
          <div>
            <Reveal className="detail__block">
              <h2>이런 분께 추천합니다</h2>
              <ul className="checklist">
                {course.recommend.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </Reveal>

            <Reveal className="detail__block">
              <h2>수강 목표</h2>
              <ul className="checklist">
                {course.goals.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </Reveal>

            <Reveal className="detail__block">
              <h2>{course.curriculumTitle}</h2>
              <ol className="timeline">
                {course.curriculum.map((step) => (
                  <Reveal as="li" key={step.week}>
                    <span className="timeline__week">{step.week}</span><h3>{step.title}</h3><p>{step.desc}</p>
                  </Reveal>
                ))}
              </ol>
            </Reveal>

            <Reveal className="detail__block">
              <h2>수업 한 회 미리보기</h2>
              <ul className="lesson">
                {course.lesson.map((l) => (
                  <li key={l.title}><time>{l.time}</time><div><b>{l.title}</b><span>{l.desc}</span></div></li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="detail__block">
              <h2>제공 자료</h2>
              <ul className="tags">
                {course.materials.map((m) => <li key={m}>{m}</li>)}
              </ul>
            </Reveal>

            <Reveal className="detail__block">
              <h2>수강 후기</h2>
              <div className="reviews reviews--2">
                {courseReviews.map((r) => <ReviewCard key={r.text} review={r} showTag={false} />)}
              </div>
            </Reveal>

            <Reveal className="detail__block">
              <h2>자주 묻는 질문</h2>
              <div className="faq">
                {course.faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
              </div>
              <p style={{ marginTop: '1rem' }}><Link className="link" to="/faq">전체 FAQ 보기 →</Link></p>
            </Reveal>
          </div>

          <aside className="aside" aria-label="수강 정보">
            <span className="price">{course.price}</span>
            <CourseMeta course={course} withLevel />
            <Link to={`/apply?course=${course.slug}`} className="btn btn--block">이 강의 신청하기</Link>
            <Link to="/courses" className="btn btn--ghost btn--block">다른 강의 비교</Link>
          </aside>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead eyebrow="More" title="다른 강의도 살펴보세요" />
          <div className="cards">
            {others.map((c) => <CourseCard key={c.slug} course={c} />)}
          </div>
        </div>
      </section>
    </>
  );
}
