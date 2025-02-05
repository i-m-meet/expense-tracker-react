export default function SelectInput({
  label,
  id,
  name,
  value,
  onChange,
  options,
  error,
  defaultOption,
}) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        {defaultOption && (
          <option value="" hidden>     
            {defaultOption}
          </option>
        )}

        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className="error">{error}</p>
    </div>
  );
}
