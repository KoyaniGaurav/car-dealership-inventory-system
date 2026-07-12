import { Link } from 'react-router-dom'
import AlertMessages from '../components/common/AlertMessages'
import PageHeader from '../components/common/PageHeader'
import PageLoader from '../components/common/PageLoader'
import StatsGrid from '../components/common/StatsGrid'
import VehicleTable from '../components/vehicles/VehicleTable'
import { useAuth } from '../hooks/useAuth'
import { useFetchVehicles } from '../hooks/useFetchVehicles'
import { computeVehicleStats } from '../utils/vehicleHelpers'

function DashboardPage() {
  const { email, isAdmin } = useAuth()
  const { vehicles, loading, error } = useFetchVehicles()
  const stats = computeVehicleStats(vehicles)
  const featuredVehicles = vehicles.slice(0, 5)

  if (loading) {
    return <PageLoader label="Loading dashboard..." />
  }

  return (
    <div className="page">
      <PageHeader title="Dashboard" subtitle={`Welcome back, ${email}`} />

      {error && <AlertMessages error={error} />}

      <StatsGrid stats={stats} />

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
