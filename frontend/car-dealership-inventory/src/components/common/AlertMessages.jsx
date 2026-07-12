import Alert from './Alert'

function AlertMessages({ successMessage, error, onClearSuccess, onClearError }) {
  return (
    <>
      {successMessage && (
        <Alert type="success" message={successMessage} onClose={onClearSuccess} />
      )}
      {error && <Alert type="error" message={error} onClose={onClearError} />}
    </>
  )
}

export default AlertMessages
