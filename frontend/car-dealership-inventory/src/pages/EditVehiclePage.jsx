import { Link, useParams } from 'react-router-dom'

function EditVehiclePage() {
  const { id } = useParams()

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-header__title">Edit Vehicle</h1>
        <p className="page-header__subtitle">Editing vehicle ID: {id}</p>
      </div>
      <div className="placeholder-card">
        <h2>Coming in Milestone 3</h2>
        <p>Vehicle edit form will be implemented here.</p>
        <Link to="/admin" className="link-back">
          ← Back to Admin
        </Link>
      </div>
    </div>
  )
}

export default EditVehiclePage
