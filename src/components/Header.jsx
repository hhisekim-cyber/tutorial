import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';
import { applyItem, navItems } from '../data/site.js';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={scrolled ? 'header is-scrolled' : 'header'} id="top">
      <div className="container header__inner">
        <Logo onClick={close} />
        <button
          className="nav-toggle"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
        <nav className={open ? 'nav is-open' : 'nav'} aria-label="주요 메뉴">
          {/* className 을 함수로 넘겨 NavLink 의 기본 "active" 클래스를 끄고, 현재 페이지는 aria-current 로만 표시 */}
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={() => undefined} onClick={close}>
              {item.label}
            </NavLink>
          ))}
          <NavLink to={applyItem.to} className={() => 'btn btn--small'} onClick={close}>
            {applyItem.label}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
