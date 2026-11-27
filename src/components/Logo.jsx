import { Link } from 'react-router-dom';

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" onClick={onClick}>
      Speak<span>Up</span> English
    </Link>
  );
}
