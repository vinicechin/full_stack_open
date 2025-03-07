export function Search({ value, onChange }) {
  return (
    <div>
      Search <input value={value} onChange={onChange} />
    </div>
  );
}