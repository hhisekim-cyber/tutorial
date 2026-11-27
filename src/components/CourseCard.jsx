import { Link } from 'react-router-dom';
import Reveal, { cx } from './Reveal.jsx';
import Badge from './Badge.jsx';

export default function CourseCard({ course, hidden = false }) {
  const href = `/courses/${course.slug}`;
  return (
    <Reveal
      as="article"
      className={cx('card', course.featured && 'card--featured', hidden && 'is-hidden')}
      data-category={course.category}
    >
      {course.featured && <span className="ribbon">인기</span>}
      <Badge {...course.badge} />
      <h3><Link to={href}>{course.title}</Link></h3>
      <p>{course.summary}</p>
      <CourseMeta course={course} />
      <div className="card__foot">
        <span className="price">{course.price}</span>
        <Link to={href} className="link">자세히 보기 →</Link>
      </div>
    </Reveal>
  );
}

// withLevel: 상세 페이지 사이드바처럼 레벨(🎯)을 맨 앞에 표시
export function CourseMeta({ course, withLevel = false }) {
  return (
    <ul className="meta">
      {withLevel && <li>🎯 {course.badge.label}</li>}
      <li>📅 {course.schedule}</li>
      <li>👥 정원 {course.capacity}명</li>
      <li>💻 {course.mode}</li>
    </ul>
  );
}
