import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useFlashMessage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [flashMessage, setFlashMessage] = useState('')

  useEffect(() => {
    if (location.state?.message) {
      setFlashMessage(location.state.message)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, location.pathname, navigate])

  return [flashMessage, setFlashMessage]
}
