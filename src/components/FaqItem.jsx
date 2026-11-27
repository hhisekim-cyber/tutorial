import { useEffect, useRef } from 'react';
import useInView from '../hooks/useInView.js';
import { cx } from './Reveal.jsx';

// <details> 한 항목. forceOpen 이 true 가 되면 펼침 (검색 결과 노출용, 닫지는 않음)
export default function FaqItem({ q, a, defaultOpen = false, forceOpen = false, hidden = false }) {
  const ref = useRef(null);
  const visible = useInView(ref, { threshold: 0.1 });

  useEffect(() => {
    if (forceOpen && ref.current) ref.current.open = true;
  }, [forceOpen]);

  return (
    <details
      ref={ref}
      open={defaultOpen || undefined}
      className={cx('reveal', visible && 'is-visible', hidden && 'is-hidden')}
    >
      <summary>{q}</summary>
      <p>{a}</p>
    </details>
  );
}
