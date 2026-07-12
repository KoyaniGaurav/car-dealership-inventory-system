import { Link, useParams } from 'react-router-dom'

function VehicleDetailsPage() {
  const { id } = useParams()

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-header__title">Vehicle Details</h1>
        <p className="page-header__subtitle">Vehicle ID: {id}</p>
      </div>
      <div className="placeholder-card">
        <h2>Coming in Milestone 2</h2>
        <p>Detailed vehicle view and purchase action will be implemented here.</p>
        <Link to="/vehicles" className="link-back">
          ← Back to Vehicles
        </Link>
      </div>
    </div>
  )
}

export default VehicleDetailsPage
