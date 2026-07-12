import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/common/Button'

function NotFoundPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="not-found">
      <div className="not-found__content">
        <div className="not-found__illustration">
          <span className="not-found__car">🚗</span>
          <span className="not-found__code">404</span>
        </div>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__text">
          The page you are looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="not-found__actions">
          {isAuthenticated ? (
            <>
              <Link to="/">
                <Button>Go to Dashboard</Button>
              </Link>
              <Link to="/vehicles">
                <Button variant="outline">Browse Vehicles</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">Create Account</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
