import { useEffect, useRef, useState } from 'react';
import useInView from '../hooks/useInView.js';

const DURATION = 1400;

// 화면에 들어오면 0 → to 까지 숫자 카운트업 (easeOutCubic)
export default function CountUp({ to, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  const text = value === null
    ? '0'
    : value.toLocaleString('ko-KR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

  return <strong ref={ref}>{text}</strong>;
}
