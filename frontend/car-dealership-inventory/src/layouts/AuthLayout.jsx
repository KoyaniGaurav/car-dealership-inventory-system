import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

function AuthLayout() {
  return (
    <div className="auth-layout">
      <Navbar />
      <main className="auth-layout__main">
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout
