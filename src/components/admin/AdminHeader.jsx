import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiBell, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'

function AdminHeader({ toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  
  return (
    <header className="bg-white shadow-sm h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 p-2 rounded-md text-secondary-500 hover:bg-secondary-100 transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          
          <Link to="/" className="text-lg font-semibold text-primary-500">
            MaleFashion Admin
          </Link>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-2 rounded-md text-secondary-500 hover:bg-secondary-100 transition-colors duration-200 relative"
              aria-label="Notifications"
            >
              <FiBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
          
          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary-100 transition-colors duration-200"
            >
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-secondary-800 font-medium hidden sm:inline-block">
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
              <FiChevronDown className="w-4 h-4 text-secondary-500" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link 
                  to="/admin/profile" 
                  className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FiUser className="inline-block mr-2" />
                  Profile
                </Link>
                <Link 
                  to="/" 
                  className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FiUser className="inline-block mr-2" />
                  Go to Shop
                </Link>
                <button 
                  onClick={() => {
                    logout()
                    setIsDropdownOpen(false)
                  }} 
                  className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                >
                  <FiLogOut className="inline-block mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader