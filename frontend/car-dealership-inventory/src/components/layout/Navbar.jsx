import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'

function Navbar() {
  const { isAuthenticated, isAdmin, email, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-icon">🚗</span>
          <span className="navbar__brand-text">
            Auto<span>Dealer</span>
          </span>
        </Link>

        {isAuthenticated && (
          <nav className="navbar__nav">
            <NavLink to="/" end className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
              Dashboard
            </NavLink>
            <NavLink
              to="/vehicles"
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
            >
              Vehicles
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              >
                Admin
              </NavLink>
            )}
          </nav>
        )}

        <div className="navbar__actions">
          {isAuthenticated ? (
            <>
              <span className="navbar__user">
                {email}
                {isAdmin && <span className="navbar__badge">Admin</span>}
              </span>
              <Button variant="outline" size="small" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="small">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="small">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
