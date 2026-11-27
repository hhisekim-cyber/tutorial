import { useEffect } from 'react';

// 페이지별 <title> 과 description / og 메타 갱신
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    const set = (selector, value) => {
      const el = document.head.querySelector(selector);
      if (el && value) el.setAttribute('content', value);
    };
    set('meta[property="og:title"]', title);
    set('meta[name="description"]', description);
    set('meta[property="og:description"]', description);
  }, [title, description]);
}
