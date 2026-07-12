import Button from './Button'

function EmptyState({ icon = '📭', title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">{icon}</span>
      <h2 className="empty-state__title">{title}</h2>
      {message && <p className="empty-state__text">{message}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}

export default EmptyState
