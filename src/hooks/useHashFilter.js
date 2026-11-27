import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// 탭 필터 상태. URL 해시(#speaking 등)가 유효한 값이면 그 값으로 필터를 맞춤.
// (같은 페이지에서 해시만 바뀌는 경우에도 반영)
export default function useHashFilter(values) {
  const { hash } = useLocation();
  const fromHash = decodeURIComponent(hash.slice(1));
  const valid = values.includes(fromHash);
  const [filter, setFilter] = useState(valid ? fromHash : 'all');

  useEffect(() => {
    if (valid) setFilter(fromHash);
  }, [fromHash, valid]);

  return [filter, setFilter];
}
