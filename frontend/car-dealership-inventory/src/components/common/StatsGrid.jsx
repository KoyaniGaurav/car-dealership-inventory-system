import { formatPrice } from '../../utils/formatters'

function StatsGrid({ stats }) {
  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <span className="stat-card__icon">🚗</span>
        <span className="stat-card__label">Total Vehicles</span>
        <span className="stat-card__value">{stats.total}</span>
      </div>
      <div className="stat-card stat-card--success">
        <span className="stat-card__icon">✅</span>
        <span className="stat-card__label">In Stock</span>
        <span className="stat-card__value">{stats.inStock}</span>
      </div>
      <div className="stat-card stat-card--warning">
        <span className="stat-card__icon">⚠️</span>
        <span className="stat-card__label">Out of Stock</span>
        <span className="stat-card__value">{stats.outOfStock}</span>
      </div>
      <div className="stat-card stat-card--accent">
        <span className="stat-card__icon">💰</span>
        <span className="stat-card__label">Inventory Value</span>
        <span className="stat-card__value stat-card__value--sm">
          {formatPrice(stats.totalValue)}
        </span>
      </div>
    </div>
  )
}

export default StatsGrid
