import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { deleteVehicle, getAllVehicles, restockVehicle } from '../api/vehicleApi'
import Alert from '../components/common/Alert'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import Modal from '../components/common/Modal'
import RestockModal from '../components/vehicles/RestockModal'
import VehicleTable from '../components/vehicles/VehicleTable'
import { formatPrice } from '../utils/formatters'
import { computeVehicleStats } from '../utils/vehicleHelpers'

function AdminDashboardPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '')

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [restockTarget, setRestockTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [restocking, setRestocking] = useState(false)

  async function loadVehicles() {
    setLoading(true)
    setError(null)

    try {
      const data = await getAllVehicles()
      setVehicles(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load vehicles.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVehicles()
  }, [])

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, location.pathname, navigate])

  function clearMessages() {
    setError(null)
    setSuccessMessage('')
  }

  function handleEdit(vehicle) {
    navigate(`/admin/edit/${vehicle.id}`, { state: { vehicle } })
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return

    setDeleting(true)
    clearMessages()

    try {
      await deleteVehicle(deleteTarget.id)
      setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== deleteTarget.id))
      setSuccessMessage(`${deleteTarget.make} ${deleteTarget.model} has been deleted.`)
      setDeleteTarget(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete vehicle.')
    } finally {
      setDeleting(false)
    }
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
      setError(err.response?.data?.message || 'Failed to restock vehicle.')
    } finally {
      setRestocking(false)
    }
  }

  const stats = computeVehicleStats(vehicles)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Admin Dashboard</h1>
          <p className="page-header__subtitle">Manage dealership inventory</p>
        </div>
        <Link to="/admin/add">
          <Button>+ Add Vehicle</Button>
        </Link>
      </div>

      {successMessage && (
        <Alert type="success" message={successMessage} onClose={clearMessages} />
      )}
      {error && <Alert type="error" message={error} onClose={clearMessages} />}

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

      <div className="admin-section">
        <div className="admin-section__header">
          <h2 className="admin-section__title">All Vehicles</h2>
          <span className="admin-section__count">{vehicles.length} total</span>
        </div>

        {loading ? (
          <div className="page-loader">
            <Loader label="Loading inventory..." />
          </div>
        ) : (
          <VehicleTable
            vehicles={vehicles}
            adminMode
            onEdit={handleEdit}
            onDelete={setDeleteTarget}
            onRestock={setRestockTarget}
          />
        )}
      </div>

      <Modal
        isOpen={Boolean(deleteTarget)}
        title="Confirm Delete"
        onClose={() => !deleting && setDeleteTarget(null)}
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete Vehicle'}
            </Button>
          </>
        }
      >
        {deleteTarget && (
          <p className="delete-modal__text">
            Are you sure you want to delete{' '}
            <strong>
              {deleteTarget.make} {deleteTarget.model}
            </strong>
            ? This action cannot be undone.
          </p>
        )}
      </Modal>

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

export default AdminDashboardPage
