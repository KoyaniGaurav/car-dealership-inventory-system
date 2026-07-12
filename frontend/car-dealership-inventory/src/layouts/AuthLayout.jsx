import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

function AuthLayout() {
  return (
    <div className="auth-layout">
      <Navbar />
      <main className="auth-layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AuthLayout
