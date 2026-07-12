import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function Sidebar() {
  const { isAdmin } = useAuth()

  if (!isAdmin) return null

  return (
    <aside className="sidebar">
      <p className="sidebar__title">Admin Panel</p>
      <nav className="sidebar__nav">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
        >
          Overview
        </NavLink>
        <NavLink
          to="/admin/add"
          className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
        >
          Add Vehicle
        </NavLink>
        <NavLink
          to="/vehicles"
          className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
        >
          All Vehicles
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
