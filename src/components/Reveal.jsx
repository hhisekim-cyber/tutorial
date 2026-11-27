import { useRef } from 'react';
import useInView from '../hooks/useInView.js';

export const cx = (...names) => names.filter(Boolean).join(' ');

// 스크롤 등장 애니메이션 (.reveal → .reveal.is-visible)
export default function Reveal({ as: Tag = 'div', className, children, ...rest }) {
  const ref = useRef(null);
  const visible = useInView(ref, { threshold: 0.1 });
  return (
    <Tag ref={ref} className={cx(className, 'reveal', visible && 'is-visible')} {...rest}>
      {children}
    </Tag>
  );
}
