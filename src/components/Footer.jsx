import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { applyItem, navItems } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo />
        <nav className="footer__nav" aria-label="푸터 메뉴">
          {[...navItems, applyItem].map((item) => (
            <Link key={item.to} to={item.to}>{item.label}</Link>
          ))}
        </nav>
        <p>© 2026 SpeakUp English. All rights reserved.</p>
      </div>
    </footer>
  );
}
