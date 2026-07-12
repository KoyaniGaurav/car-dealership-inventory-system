import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createVehicle } from '../api/vehicleApi'
import Alert from '../components/common/Alert'
import VehicleForm from '../components/vehicles/VehicleForm'

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
      setError(err.response?.data?.message || 'Failed to add vehicle.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <button type="button" className="link-back" onClick={() => navigate('/admin')}>
        ← Back to Admin
      </button>

      <div className="page-header">
        <div>
          <h1 className="page-header__title">Add Vehicle</h1>
          <p className="page-header__subtitle">Add a new vehicle to the inventory</p>
        </div>
      </div>

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
