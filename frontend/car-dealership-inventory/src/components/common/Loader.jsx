function Loader({ size = 'medium', label = 'Loading...' }) {
  return (
    <div className={`loader loader--${size}`} role="status" aria-live="polite">
      <span className="loader__spinner" />
      {label && <span className="loader__label">{label}</span>}
    </div>
  )
}

export default Loader
