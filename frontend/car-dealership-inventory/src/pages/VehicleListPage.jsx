import { useEffect, useRef, useState } from 'react'
import { restockVehicle } from '../api/vehicleApi'
import AlertMessages from '../components/common/AlertMessages'
import EmptyState from '../components/common/EmptyState'
import PageHeader from '../components/common/PageHeader'
import PageLoader from '../components/common/PageLoader'
import FilterPanel from '../components/vehicles/FilterPanel'
import RestockModal from '../components/vehicles/RestockModal'
import SearchBar from '../components/vehicles/SearchBar'
import VehicleCard from '../components/vehicles/VehicleCard'
import { useAuth } from '../hooks/useAuth'
import { useDebounce } from '../hooks/useDebounce'
import { useVehicles } from '../hooks/useVehicles'
import { getErrorMessage } from '../utils/apiError'

function VehicleListPage() {
  const { isAdmin } = useAuth()
  const {
    vehicles,
    filters,
    loading,
    error,
    purchasingId,
    successMessage,
    fetchVehicles,
    applySearch,
    updateFilter,
    resetFilters,
    handlePurchase,
    clearMessages,
    setVehicles,
    setSuccessMessage,
    setError,
  } = useVehicles()

  const [searchQuery, setSearchQuery] = useState('')
  const [restockTarget, setRestockTarget] = useState(null)
  const [restocking, setRestocking] = useState(false)
  const debouncedSearch = useDebounce(searchQuery)
  const isInitialMount = useRef(true)

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    async function runSearch() {
      if (debouncedSearch) {
        await applySearch({ ...filters, make: debouncedSearch })
      } else {
        const hasOtherFilters = Object.entries(filters).some(
          ([key, value]) => key !== 'make' && value !== '' && value != null
        )
        if (hasOtherFilters) {
          await applySearch({ ...filters, make: '' })
        } else {
          await fetchVehicles()
        }
      }
    }

    runSearch()
  }, [debouncedSearch])

  async function handleApplyFilters() {
    await applySearch({ ...filters, make: searchQuery || filters.make })
  }

  async function handleResetFilters() {
    resetFilters()
    setSearchQuery('')
    await fetchVehicles()
  }

  async function handleSearchClick() {
    if (searchQuery) {
      await applySearch({ ...filters, make: searchQuery })
    } else {
      await handleApplyFilters()
    }
  }

  async function onPurchase(id) {
    clearMessages()
    await handlePurchase(id)
  }

  async function handleConfirmRestock(quantity) {
    if (!restockTarget) return

    setRestocking(true)
    clearMessages()

    try {
      const updated = await restockVehicle(restockTarget.id, quantity)
      setVehicles((prev) =>
        prev.map((vehicle) => (vehicle.id === restockTarget.id ? updated : vehicle))
      )
      setSuccessMessage(
        `Restocked ${restockTarget.make} ${restockTarget.model} with ${quantity} units.`
      )
      setRestockTarget(null)
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to restock vehicle.'))
    } finally {
      setRestocking(false)
    }
  }

  const vehicleCount = loading
    ? '...'
    : `${vehicles.length} vehicle${vehicles.length !== 1 ? 's' : ''}`

  return (
    <div className="page">
      <PageHeader
        title="Vehicles"
        subtitle="Browse our inventory and purchase your next vehicle"
        badge={vehicleCount}
      />

      <AlertMessages
        successMessage={successMessage}
        error={error}
        onClearSuccess={clearMessages}
        onClearError={clearMessages}
      />

      <div className="vehicles-toolbar">
        <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearchClick} />
      </div>

      <FilterPanel
        filters={filters}
        onChange={updateFilter}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {loading ? (
        <PageLoader label="Loading vehicles..." />
      ) : vehicles.length === 0 ? (
        <EmptyState
          icon="🚗"
          title="No vehicles found"
          message="Try adjusting your search or filters to find what you're looking for."
        />
      ) : (
        <div className="vehicle-grid">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onPurchase={onPurchase}
              isPurchasing={purchasingId === vehicle.id}
              isAdmin={isAdmin}
              onRestock={setRestockTarget}
            />
          ))}
        </div>
      )}

      <RestockModal
        vehicle={restockTarget}
        isOpen={Boolean(restockTarget)}
        onClose={() => !restocking && setRestockTarget(null)}
        onConfirm={handleConfirmRestock}
        loading={restocking}
      />
    </div>
  )
}

export default VehicleListPage
