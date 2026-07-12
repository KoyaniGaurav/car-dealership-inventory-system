import { useEffect, useRef, useState } from 'react'
import Alert from '../components/common/Alert'
import Loader from '../components/common/Loader'
import FilterPanel from '../components/vehicles/FilterPanel'
import SearchBar from '../components/vehicles/SearchBar'
import VehicleCard from '../components/vehicles/VehicleCard'
import { useDebounce } from '../hooks/useDebounce'
import { useVehicles } from '../hooks/useVehicles'

function VehicleListPage() {
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
  } = useVehicles()

  const [searchQuery, setSearchQuery] = useState('')
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
    const cleared = resetFilters()
    setSearchQuery('')
    await fetchVehicles()
    return cleared
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

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Vehicles</h1>
          <p className="page-header__subtitle">
            Browse our inventory and purchase your next vehicle
          </p>
        </div>
        <span className="page-header__count">
          {loading ? '...' : `${vehicles.length} vehicle${vehicles.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {successMessage && (
        <Alert type="success" message={successMessage} onClose={clearMessages} />
      )}
      {error && <Alert type="error" message={error} onClose={clearMessages} />}

      <div className="vehicles-toolbar">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearchClick}
        />
      </div>

      <FilterPanel
        filters={filters}
        onChange={updateFilter}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {loading ? (
        <div className="page-loader">
          <Loader label="Loading vehicles..." />
        </div>
      ) : vehicles.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">🚗</span>
          <h2 className="empty-state__title">No vehicles found</h2>
          <p className="empty-state__text">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
        </div>
      ) : (
        <div className="vehicle-grid">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onPurchase={onPurchase}
              isPurchasing={purchasingId === vehicle.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default VehicleListPage
