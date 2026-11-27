export default function Badge({ label, color }) {
  return <span className={`badge badge--${color}`}>{label}</span>;
}
