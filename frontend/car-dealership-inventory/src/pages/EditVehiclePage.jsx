import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getAllVehicles, updateVehicle } from '../api/vehicleApi'
import Alert from '../components/common/Alert'
import Loader from '../components/common/Loader'
import VehicleForm from '../components/vehicles/VehicleForm'

function EditVehiclePage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [vehicle, setVehicle] = useState(location.state?.vehicle || null)
  const [loading, setLoading] = useState(!location.state?.vehicle)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (vehicle) return

    async function loadVehicle() {
      setLoading(true)
      setError(null)

      try {
        const vehicles = await getAllVehicles()
        const found = vehicles.find((item) => item.id === Number(id))
        if (!found) {
          setError('Vehicle not found.')
        } else {
          setVehicle(found)
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load vehicle.')
      } finally {
        setLoading(false)
      }
    }

    loadVehicle()
  }, [id, vehicle])

  async function handleSubmit(vehicleData) {
    setSaving(true)
    setError(null)

    try {
      await updateVehicle(vehicle.id, vehicleData)
      navigate('/admin', {
        state: { message: `${vehicleData.make} ${vehicleData.model} updated successfully.` },
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update vehicle.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="page-loader">
        <Loader label="Loading vehicle..." />
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="page">
        <div className="empty-state">
          <span className="empty-state__icon">🚗</span>
          <h2 className="empty-state__title">Vehicle Not Found</h2>
          <p className="empty-state__text">{error || 'This vehicle may have been removed.'}</p>
          <button type="button" className="link-back" onClick={() => navigate('/admin')}>
            ← Back to Admin
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <button type="button" className="link-back" onClick={() => navigate('/admin')}>
        ← Back to Admin
      </button>

      <div className="page-header">
        <div>
          <h1 className="page-header__title">Edit Vehicle</h1>
          <p className="page-header__subtitle">
            Update {vehicle.make} {vehicle.model}
          </p>
        </div>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

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
