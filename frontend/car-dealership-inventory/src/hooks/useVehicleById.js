import { useEffect, useState } from 'react'
import { getAllVehicles } from '../api/vehicleApi'
import { getErrorMessage } from '../utils/apiError'

export function useVehicleById(id, initialVehicle = null) {
  const [vehicle, setVehicle] = useState(initialVehicle)
  const [loading, setLoading] = useState(!initialVehicle)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (initialVehicle) {
      setVehicle(initialVehicle)
      setLoading(false)
      return
    }

    let isMounted = true

    async function loadVehicle() {
      setLoading(true)
      setError(null)

      try {
        const vehicles = await getAllVehicles()
        const found = vehicles.find((item) => item.id === Number(id))

        if (!isMounted) return

        if (!found) {
          setError('Vehicle not found.')
          setVehicle(null)
        } else {
          setVehicle(found)
        }
      } catch (err) {
        if (!isMounted) return
        setError(getErrorMessage(err, 'Failed to load vehicle.'))
        setVehicle(null)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadVehicle()

    return () => {
      isMounted = false
    }
  }, [id, initialVehicle])

  return { vehicle, setVehicle, loading, error, setError }
}
