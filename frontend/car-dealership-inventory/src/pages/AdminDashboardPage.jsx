import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteVehicle, restockVehicle } from '../api/vehicleApi'
import AlertMessages from '../components/common/AlertMessages'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import PageLoader from '../components/common/PageLoader'
import StatsGrid from '../components/common/StatsGrid'
import Modal from '../components/common/Modal'
import RestockModal from '../components/vehicles/RestockModal'
import VehicleTable from '../components/vehicles/VehicleTable'
import { useFetchVehicles } from '../hooks/useFetchVehicles'
import { useFlashMessage } from '../hooks/useFlashMessage'
import { useMessages } from '../hooks/useMessages'
import { getErrorMessage } from '../utils/apiError'
import { computeVehicleStats } from '../utils/vehicleHelpers'

function AdminDashboardPage() {
  const navigate = useNavigate()
  const { vehicles, loading, setVehicles } = useFetchVehicles()
  const { error, successMessage, setError, setSuccessMessage, clearMessages } = useMessages()
  const [flashMessage, setFlashMessage] = useFlashMessage()

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [restockTarget, setRestockTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [restocking, setRestocking] = useState(false)

  const displaySuccess = successMessage || flashMessage

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
      setError(getErrorMessage(err, 'Failed to delete vehicle.'))
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
      setError(getErrorMessage(err, 'Failed to restock vehicle.'))
    } finally {
      setRestocking(false)
    }
  }

  function handleClearSuccess() {
    clearMessages()
    setFlashMessage('')
  }

  const stats = computeVehicleStats(vehicles)

  return (
    <div className="page">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage dealership inventory"
        action={
          <Link to="/admin/add">
            <Button>+ Add Vehicle</Button>
          </Link>
        }
      />

      <AlertMessages
        successMessage={displaySuccess}
        error={error}
        onClearSuccess={handleClearSuccess}
        onClearError={clearMessages}
      />

      <StatsGrid stats={stats} />

      <div className="admin-section">
        <div className="admin-section__header">
          <h2 className="admin-section__title">All Vehicles</h2>
          <span className="admin-section__count">{vehicles.length} total</span>
        </div>

        {loading ? (
          <PageLoader label="Loading inventory..." />
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
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={deleting}>
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
