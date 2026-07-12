function Alert({ type = 'info', message, onClose }) {
  if (!message) return null

  return (
    <div className={`alert alert--${type}`} role="alert">
      <span>{message}</span>
      {onClose && (
        <button type="button" className="alert__close" onClick={onClose} aria-label="Close">
          ×
        </button>
      )}
    </div>
  )
}

export function AlertMessage({ type, message, onClose }) {
  return <Alert type={type} message={message} onClose={onClose} />
}

export default Alert
