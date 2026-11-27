import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 페이지 이동 시 맨 위로 (해시가 요소 id 를 가리키면 그 위치로)
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}
