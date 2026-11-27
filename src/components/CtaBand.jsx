import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

export default function CtaBand({ title, text }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal className="cta-band">
          <div><h2>{title}</h2><p>{text}</p></div>
          <Link to="/apply" className="btn btn--light">수강 신청하기</Link>
        </Reveal>
      </div>
    </section>
  );
}
