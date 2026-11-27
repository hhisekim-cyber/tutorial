import { Link } from 'react-router-dom';
import Badge from './Badge.jsx';

// 서브 페이지 상단: 브레드크럼 + (배지) + 제목 + 리드
// crumbs: 홈과 현재 페이지 사이의 상위 경로 [{ to, label }]
export default function PageHero({ crumbs = [], current, badge, title, lead }) {
  return (
    <section className="page-hero">
      <div className="container">
        <ol className="breadcrumb" aria-label="현재 위치">
          <li><Link to="/">홈</Link></li>
          {crumbs.map((c) => (
            <li key={c.to}><Link to={c.to}>{c.label}</Link></li>
          ))}
          <li aria-current="page">{current}</li>
        </ol>
        {badge && <Badge {...badge} />}
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}
