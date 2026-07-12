import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createVehicle } from '../api/vehicleApi'
import Alert from '../components/common/Alert'
import PageHeader from '../components/common/PageHeader'
import VehicleForm from '../components/vehicles/VehicleForm'
import { getErrorMessage } from '../utils/apiError'

function AddVehiclePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(vehicleData) {
    setLoading(true)
    setError(null)

    try {
      await createVehicle(vehicleData)
      navigate('/admin', {
        state: { message: `${vehicleData.make} ${vehicleData.model} added successfully.` },
      })
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to add vehicle.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <button type="button" className="link-back" onClick={() => navigate('/admin')}>
        ← Back to Admin
      </button>

      <PageHeader title="Add Vehicle" subtitle="Add a new vehicle to the inventory" />

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      <div className="form-card">
        <VehicleForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin')}
          loading={loading}
          submitLabel="Add Vehicle"
        />
      </div>
    </div>
  )
}

export default AddVehiclePage
