// 카테고리 탭. options: [{ value, label }]
export default function Tabs({ options, value, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            className={active ? 'tab is-active' : 'tab'}
            aria-selected={active}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
