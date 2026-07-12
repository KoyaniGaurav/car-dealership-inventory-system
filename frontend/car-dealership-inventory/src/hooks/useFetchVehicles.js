import { useCallback, useEffect, useState } from 'react'
import { getAllVehicles } from '../api/vehicleApi'
import { getErrorMessage } from '../utils/apiError'

export function useFetchVehicles(autoLoad = true) {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(autoLoad)
  const [error, setError] = useState(null)

  const loadVehicles = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await getAllVehicles()
      setVehicles(data)
      return data
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to load vehicles.')
      setError(message)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (autoLoad) {
      loadVehicles()
    }
  }, [autoLoad, loadVehicles])

  return {
    vehicles,
    loading,
    error,
    setVehicles,
    setError,
    loadVehicles,
  }
}
