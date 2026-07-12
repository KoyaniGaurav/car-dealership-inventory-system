import { Link } from 'react-router-dom'
import { formatCategory, formatPrice, formatStockStatus } from '../../utils/formatters'
import { getStockClass } from '../../utils/vehicleHelpers'
import Button from '../common/Button'

function VehicleCard({ vehicle, onPurchase, isPurchasing }) {
  const isOutOfStock = vehicle.quantity <= 0

  return (
    <article className="vehicle-card">
      <div className="vehicle-card__header">
        <span className="vehicle-card__category">{formatCategory(vehicle.category)}</span>
        <span className={`vehicle-card__stock ${getStockClass(vehicle.quantity)}`}>
          {formatStockStatus(vehicle.quantity)}
        </span>
      </div>

      <div className="vehicle-card__body">
        <h3 className="vehicle-card__title">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="vehicle-card__price">{formatPrice(vehicle.price)}</p>
        <p className="vehicle-card__quantity">
          {vehicle.quantity > 0 ? `${vehicle.quantity} available` : 'Currently unavailable'}
        </p>
      </div>

      <div className="vehicle-card__actions">
        <Link to={`/vehicles/${vehicle.id}`} state={{ vehicle }} className="vehicle-card__link">
          View Details
        </Link>
        <Button
          size="small"
          onClick={() => onPurchase(vehicle.id)}
          disabled={isOutOfStock || isPurchasing}
        >
          {isPurchasing ? 'Processing...' : isOutOfStock ? 'Out of Stock' : 'Purchase'}
        </Button>
      </div>
    </article>
  )
}

export default VehicleCard
