import Reveal from './Reveal.jsx';

export default function SectionHead({ eyebrow, title, desc }) {
  return (
    <Reveal className="section__head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </Reveal>
  );
}
