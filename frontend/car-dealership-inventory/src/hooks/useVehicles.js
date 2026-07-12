import { useCallback, useState } from 'react'
import { getAllVehicles, purchaseVehicle, searchVehicles } from '../api/vehicleApi'
import { getErrorMessage } from '../utils/apiError'

const EMPTY_FILTERS = {
  make: '',
  model: '',
  category: '',
  minPrice: '',
  maxPrice: '',
}

export function useVehicles() {
  const [vehicles, setVehicles] = useState([])
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [purchasingId, setPurchasingId] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const hasActiveFilters = Object.values(filters).some((value) => value !== '' && value != null)

  const fetchVehicles = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await getAllVehicles()
      setVehicles(data)
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load vehicles.'))
    } finally {
      setLoading(false)
    }
  }, [])

  const applySearch = useCallback(async (searchFilters = filters) => {
    setLoading(true)
    setError(null)

    try {
      const activeFilters = Object.values(searchFilters).some(
        (value) => value !== '' && value != null
      )

      const data = activeFilters ? await searchVehicles(searchFilters) : await getAllVehicles()
      setVehicles(data)
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to search vehicles.'))
    } finally {
      setLoading(false)
    }
  }, [filters])

  const updateFilter = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS)
    return EMPTY_FILTERS
  }, [])

  const handlePurchase = useCallback(async (id) => {
    setPurchasingId(id)
    setError(null)
    setSuccessMessage('')

    try {
      const updatedVehicle = await purchaseVehicle(id)
      setVehicles((prev) => prev.map((vehicle) => (vehicle.id === id ? updatedVehicle : vehicle)))
      setSuccessMessage(`Successfully purchased ${updatedVehicle.make} ${updatedVehicle.model}!`)
      return { success: true, vehicle: updatedVehicle }
    } catch (err) {
      const message = getErrorMessage(err, 'Purchase failed. Please try again.')
      setError(message)
      return { success: false, message }
    } finally {
      setPurchasingId(null)
    }
  }, [])

  const getVehicleById = useCallback(
    (id) => vehicles.find((vehicle) => vehicle.id === Number(id)),
    [vehicles]
  )

  const clearMessages = useCallback(() => {
    setError(null)
    setSuccessMessage('')
  }, [])

  return {
    vehicles,
    filters,
    loading,
    error,
    purchasingId,
    successMessage,
    hasActiveFilters,
    fetchVehicles,
    applySearch,
    updateFilter,
    resetFilters,
    handlePurchase,
    getVehicleById,
    setVehicles,
    clearMessages,
    setError,
    setSuccessMessage,
  }
}

export { EMPTY_FILTERS }
