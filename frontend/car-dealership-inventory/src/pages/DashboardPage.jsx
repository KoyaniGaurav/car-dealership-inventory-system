import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllVehicles } from '../api/vehicleApi'
import Loader from '../components/common/Loader'
import VehicleTable from '../components/vehicles/VehicleTable'
import { useAuth } from '../hooks/useAuth'
import { formatPrice } from '../utils/formatters'
import { computeVehicleStats } from '../utils/vehicleHelpers'

function DashboardPage() {
  const { email, isAdmin } = useAuth()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getAllVehicles()
        setVehicles(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const stats = computeVehicleStats(vehicles)
  const featuredVehicles = vehicles.slice(0, 5)

  if (loading) {
    return (
      <div className="page-loader">
        <Loader label="Loading dashboard..." />
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Dashboard</h1>
          <p className="page-header__subtitle">Welcome back, {email}</p>
        </div>
      </div>

      {error && <p className="dashboard-error">{error}</p>}

      <div className="dashboard-grid">
        <div className="stat-card">
          <span className="stat-card__label">Total Vehicles</span>
          <span className="stat-card__value">{stats.total}</span>
        </div>
        <div className="stat-card stat-card--success">
          <span className="stat-card__label">In Stock</span>
          <span className="stat-card__value">{stats.inStock}</span>
        </div>
        <div className="stat-card stat-card--warning">
          <span className="stat-card__label">Out of Stock</span>
          <span className="stat-card__value">{stats.outOfStock}</span>
        </div>
        <div className="stat-card stat-card--accent">
          <span className="stat-card__label">Inventory Value</span>
          <span className="stat-card__value stat-card__value--sm">
            {formatPrice(stats.totalValue)}
          </span>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/vehicles" className="dashboard-action-card">
          <span className="dashboard-action-card__icon">🔍</span>
          <div>
            <h3>Browse Inventory</h3>
            <p>View and purchase available vehicles</p>
          </div>
        </Link>
        {isAdmin && (
          <Link to="/admin" className="dashboard-action-card dashboard-action-card--admin">
            <span className="dashboard-action-card__icon">⚙️</span>
            <div>
              <h3>Manage Inventory</h3>
              <p>Add, edit, and restock vehicles</p>
            </div>
          </Link>
        )}
      </div>

      {stats.lowStock.length > 0 && (
        <div className="dashboard-section">
          <div className="dashboard-section__header">
            <h2 className="dashboard-section__title">Low Stock Alert</h2>
            <span className="dashboard-section__badge">{stats.lowStock.length} items</span>
          </div>
          <VehicleTable vehicles={stats.lowStock} />
        </div>
      )}

      <div className="dashboard-section">
        <div className="dashboard-section__header">
          <h2 className="dashboard-section__title">Recent Inventory</h2>
          <Link to="/vehicles" className="dashboard-section__link">
            View all →
          </Link>
        </div>
        {featuredVehicles.length > 0 ? (
          <VehicleTable vehicles={featuredVehicles} />
        ) : (
          <p className="dashboard-empty">No vehicles in inventory yet.</p>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
