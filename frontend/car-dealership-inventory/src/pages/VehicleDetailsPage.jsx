import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getAllVehicles, purchaseVehicle } from '../api/vehicleApi'
import Alert from '../components/common/Alert'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import { formatCategory, formatPrice, formatStockStatus } from '../utils/formatters'
import { getStockClass } from '../utils/vehicleHelpers'

function VehicleDetailsPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [vehicle, setVehicle] = useState(location.state?.vehicle || null)
  const [loading, setLoading] = useState(!location.state?.vehicle)
  const [purchasing, setPurchasing] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (vehicle) return

    async function loadVehicle() {
      setLoading(true)
      setError(null)

      try {
        const vehicles = await getAllVehicles()
        const found = vehicles.find((item) => item.id === Number(id))
        if (!found) {
          setError('Vehicle not found.')
        } else {
          setVehicle(found)
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load vehicle details.')
      } finally {
        setLoading(false)
      }
    }

    loadVehicle()
  }, [id, vehicle])

  async function handlePurchase() {
    if (!vehicle || vehicle.quantity <= 0) return

    setPurchasing(true)
    setError(null)
    setSuccessMessage('')

    try {
      const updated = await purchaseVehicle(vehicle.id)
      setVehicle(updated)
      setSuccessMessage(`You purchased the ${updated.make} ${updated.model}!`)
    } catch (err) {
      setError(err.response?.data?.message || 'Purchase failed. Please try again.')
    } finally {
      setPurchasing(false)
    }
  }

  if (loading) {
    return (
      <div className="page-loader">
        <Loader label="Loading vehicle details..." />
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="page">
        <div className="empty-state">
          <span className="empty-state__icon">🚗</span>
          <h2 className="empty-state__title">Vehicle Not Found</h2>
          <p className="empty-state__text">{error || 'This vehicle may have been removed.'}</p>
          <Link to="/vehicles">
            <Button>Back to Vehicles</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isOutOfStock = vehicle.quantity <= 0

  return (
    <div className="page">
      <button type="button" className="link-back" onClick={() => navigate('/vehicles')}>
        ← Back to Vehicles
      </button>

      {successMessage && (
        <Alert type="success" message={successMessage} onClose={() => setSuccessMessage('')} />
      )}
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

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
            <Button
              size="large"
              onClick={handlePurchase}
              disabled={isOutOfStock || purchasing}
            >
              {purchasing ? 'Processing...' : isOutOfStock ? 'Out of Stock' : 'Purchase Vehicle'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleDetailsPage
