import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function AdminRoute() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()
  
  if (isLoading) {
    // Show loading spinner while authentication status is being determined
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }
  
  // If not authenticated or not admin, redirect to login
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />
  }
  
  // If authenticated and admin, render the child routes
  return <Outlet />
}

export default AdminRoute