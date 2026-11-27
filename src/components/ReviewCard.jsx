import Reveal, { cx } from './Reveal.jsx';
import { getCourse } from '../data/courses.js';

const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

// showTag: 강의명 태그 표시 여부 (강의 상세 페이지에서는 숨김)
export default function ReviewCard({ review, showTag = true, hidden = false }) {
  return (
    <Reveal as="figure" className={cx('review', hidden && 'is-hidden')} data-category={review.course}>
      {showTag && <span className="tag">{getCourse(review.course).title}</span>}
      <div className="stars" aria-label={`별점 ${review.stars}점`}>{stars(review.stars)}</div>
      {review.result && <span className="review__result">{review.result}</span>}
      <blockquote>{review.text}</blockquote>
      <figcaption>{review.author}</figcaption>
    </Reveal>
  );
}
