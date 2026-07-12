import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateVehicle } from '../api/vehicleApi'
import Alert from '../components/common/Alert'
import EmptyState from '../components/common/EmptyState'
import PageHeader from '../components/common/PageHeader'
import PageLoader from '../components/common/PageLoader'
import VehicleForm from '../components/vehicles/VehicleForm'
import { useVehicleById } from '../hooks/useVehicleById'
import { getErrorMessage } from '../utils/apiError'

function EditVehiclePage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { vehicle, loading, error } = useVehicleById(id, location.state?.vehicle)
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  async function handleSubmit(vehicleData) {
    setSaving(true)
    setSubmitError(null)

    try {
      await updateVehicle(vehicle.id, vehicleData)
      navigate('/admin', {
        state: { message: `${vehicleData.make} ${vehicleData.model} updated successfully.` },
      })
    } catch (err) {
      setSubmitError(getErrorMessage(err, 'Failed to update vehicle.'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <PageLoader label="Loading vehicle..." />
  }

  if (!vehicle) {
    return (
      <div className="page">
        <EmptyState
          icon="🚗"
          title="Vehicle Not Found"
          message={error || 'This vehicle may have been removed.'}
          actionLabel="Back to Admin"
          onAction={() => navigate('/admin')}
        />
      </div>
    )
  }

  return (
    <div className="page">
      <button type="button" className="link-back" onClick={() => navigate('/admin')}>
        ← Back to Admin
      </button>

      <PageHeader
        title="Edit Vehicle"
        subtitle={`Update ${vehicle.make} ${vehicle.model}`}
      />

      {submitError && (
        <Alert type="error" message={submitError} onClose={() => setSubmitError(null)} />
      )}

      <div className="form-card">
        <VehicleForm
          initialData={vehicle}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin')}
          loading={saving}
          submitLabel="Update Vehicle"
        />
      </div>
    </div>
  )
}

export default EditVehiclePage
