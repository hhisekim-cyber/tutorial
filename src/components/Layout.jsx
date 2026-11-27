import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './ScrollToTop.jsx';

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollToTop />
      <Header />
      {/* 경로가 바뀌면 페이지를 새로 마운트 → 원본(페이지 새로 로드)처럼 애니메이션·폼 상태가 초기화됨 */}
      <main key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
