import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'

function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="main-layout__body">
        <Sidebar />
        <main className="main-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
