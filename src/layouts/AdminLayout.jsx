import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import AdminHeader from '../components/admin/AdminHeader'
import AdminSidebar from '../components/admin/AdminSidebar'
import { useAuth } from '../contexts/AuthContext'

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { isAdmin, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Handle admin access check
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/login?redirect=' + location.pathname)
    }
  }, [isAdmin, isLoading, navigate, location.pathname])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // If still loading or not admin, don't render the admin layout
  if (isLoading || !isAdmin) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <AdminHeader toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout