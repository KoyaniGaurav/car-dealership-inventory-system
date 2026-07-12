import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'

function Navbar() {
  const { isAuthenticated, isAdmin, email, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    setMenuOpen(false)
    logout()
    navigate('/login')
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  const navLinkClass = ({ isActive }) =>
    `navbar__link ${isActive ? 'navbar__link--active' : ''}`

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <span className="navbar__brand-icon">🚗</span>
          <span className="navbar__brand-text">
            Auto<span>Dealer</span>
          </span>
        </Link>

        {isAuthenticated && (
          <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
            <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>
              Dashboard
            </NavLink>
            <NavLink to="/vehicles" className={navLinkClass} onClick={closeMenu}>
              Vehicles
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className={navLinkClass} onClick={closeMenu}>
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
              <Link to="/login" onClick={closeMenu}>
                <Button variant="ghost" size="small">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={closeMenu}>
                <Button variant="primary" size="small">
                  Register
                </Button>
              </Link>
            </>
          )}

          {isAuthenticated && (
            <button
              type="button"
              className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
