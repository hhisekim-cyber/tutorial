import { useEffect, useState } from 'react';

// 요소가 한 번이라도 화면에 들어오면 true (이후 관찰 중단).
// IntersectionObserver 미지원 브라우저에서는 바로 true.
export default function useInView(ref, { threshold = 0 } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, inView]);

  return inView;
}
