import { useCallback, useState } from 'react'

export function useMessages() {
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const clearMessages = useCallback(() => {
    setError(null)
    setSuccessMessage('')
  }, [])

  return {
    error,
    successMessage,
    setError,
    setSuccessMessage,
    clearMessages,
  }
}
