function Input({
  id,
  label,
  type = 'text',
  name,
  value,
  placeholder,
  error,
  required = false,
  onChange,
  autoComplete,
}) {
  return (
    <div className={`form-field ${error ? 'form-field--error' : ''}`}>
      {label && (
        <label className="form-field__label" htmlFor={id || name}>
          {label}
          {required && <span className="form-field__required">*</span>}
        </label>
      )}
      <input
        id={id || name}
        className="form-field__input"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
      />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  )
}

export default Input
