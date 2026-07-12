import { Link } from 'react-router-dom'
import { formatCategory, formatPrice, formatStockStatus } from '../../utils/formatters'
import { getStockClass } from '../../utils/vehicleHelpers'

function VehicleTable({ vehicles, showActions = true }) {
  if (!vehicles.length) {
    return <p className="vehicle-table__empty">No vehicles to display.</p>
  }

  return (
    <div className="vehicle-table-wrapper">
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            {showActions && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{formatCategory(vehicle.category)}</td>
              <td>{formatPrice(vehicle.price)}</td>
              <td>{vehicle.quantity}</td>
              <td>
                <span className={`vehicle-table__badge ${getStockClass(vehicle.quantity)}`}>
                  {formatStockStatus(vehicle.quantity)}
                </span>
              </td>
              {showActions && (
                <td>
                  <Link to={`/vehicles/${vehicle.id}`} state={{ vehicle }} className="vehicle-table__link">
                    View
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VehicleTable
