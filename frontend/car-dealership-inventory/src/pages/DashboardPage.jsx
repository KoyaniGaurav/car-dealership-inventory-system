import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function DashboardPage() {
  const { email, isAdmin } = useAuth()

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Dashboard</h1>
          <p className="page-header__subtitle">Welcome back, {email}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <span className="stat-card__label">Your Role</span>
          <span className="stat-card__value">{isAdmin ? 'Administrator' : 'Customer'}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Quick Action</span>
          <Link to="/vehicles" className="stat-card__link">
            Browse Vehicles →
          </Link>
        </div>
        {isAdmin && (
          <div className="stat-card stat-card--accent">
            <span className="stat-card__label">Admin Panel</span>
            <Link to="/admin" className="stat-card__link">
              Manage Inventory →
            </Link>
          </div>
        )}
      </div>

      <div className="placeholder-card">
        <h2>Coming in Milestone 2</h2>
        <p>Vehicle statistics, recent inventory, and quick search will appear here.</p>
      </div>
    </div>
  )
}

export default DashboardPage
