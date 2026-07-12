import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1 className="not-found__code">404</h1>
      <h2 className="not-found__title">Page Not Found</h2>
      <p className="not-found__text">The page you are looking for does not exist or has been moved.</p>
      <Link to="/">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  )
}

export default NotFoundPage
