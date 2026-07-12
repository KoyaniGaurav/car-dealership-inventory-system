import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { purchaseVehicle } from '../api/vehicleApi'
import AlertMessages from '../components/common/AlertMessages'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import PageLoader from '../components/common/PageLoader'
import { useMessages } from '../hooks/useMessages'
import { useVehicleById } from '../hooks/useVehicleById'
import { getErrorMessage } from '../utils/apiError'
import { formatCategory, formatPrice, formatStockStatus } from '../utils/formatters'
import { getStockClass } from '../utils/vehicleHelpers'

function VehicleDetailsPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { vehicle, setVehicle, loading, error } = useVehicleById(
    id,
    location.state?.vehicle
  )
  const { successMessage, error: actionError, setSuccessMessage, setError: setActionError, clearMessages } =
    useMessages()
  const [purchasing, setPurchasing] = useState(false)

  async function handlePurchase() {
    if (!vehicle || vehicle.quantity <= 0) return

    setPurchasing(true)
    clearMessages()

    try {
      const updated = await purchaseVehicle(vehicle.id)
      setVehicle(updated)
      setSuccessMessage(`You purchased the ${updated.make} ${updated.model}!`)
    } catch (err) {
      setActionError(getErrorMessage(err, 'Purchase failed. Please try again.'))
    } finally {
      setPurchasing(false)
    }
  }

  if (loading) {
    return <PageLoader label="Loading vehicle details..." />
  }

  if (!vehicle) {
    return (
      <div className="page">
        <EmptyState
          icon="🚗"
          title="Vehicle Not Found"
          message={error || 'This vehicle may have been removed.'}
          actionLabel="Back to Vehicles"
          onAction={() => navigate('/vehicles')}
        />
      </div>
    )
  }

  const isOutOfStock = vehicle.quantity <= 0

  return (
    <div className="page">
      <button type="button" className="link-back" onClick={() => navigate('/vehicles')}>
        ← Back to Vehicles
      </button>

      <AlertMessages
        successMessage={successMessage}
        error={actionError}
        onClearSuccess={() => setSuccessMessage('')}
        onClearError={() => setActionError(null)}
      />

      <div className="vehicle-detail">
        <div className="vehicle-detail__hero">
          <span className="vehicle-detail__icon">🚗</span>
        </div>

        <div className="vehicle-detail__content">
          <div className="vehicle-detail__badges">
            <span className="vehicle-detail__category">{formatCategory(vehicle.category)}</span>
            <span className={`vehicle-detail__stock ${getStockClass(vehicle.quantity)}`}>
              {formatStockStatus(vehicle.quantity)}
            </span>
          </div>

          <h1 className="vehicle-detail__title">
            {vehicle.make} {vehicle.model}
          </h1>

          <p className="vehicle-detail__price">{formatPrice(vehicle.price)}</p>

          <div className="vehicle-detail__specs">
            <div className="spec-item">
              <span className="spec-item__label">Make</span>
              <span className="spec-item__value">{vehicle.make}</span>
            </div>
            <div className="spec-item">
              <span className="spec-item__label">Model</span>
              <span className="spec-item__value">{vehicle.model}</span>
            </div>
            <div className="spec-item">
              <span className="spec-item__label">Category</span>
              <span className="spec-item__value">{formatCategory(vehicle.category)}</span>
            </div>
            <div className="spec-item">
              <span className="spec-item__label">Available Stock</span>
              <span className="spec-item__value">{vehicle.quantity}</span>
            </div>
          </div>

          <div className="vehicle-detail__actions">
            <Button size="large" onClick={handlePurchase} disabled={isOutOfStock || purchasing}>
              {purchasing ? 'Processing...' : isOutOfStock ? 'Out of Stock' : 'Purchase Vehicle'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleDetailsPage
