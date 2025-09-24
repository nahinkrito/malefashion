import { Link } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { useAppContext } from '../../contexts/AppContext'
import { useAuth } from '../../contexts/AuthContext'
import { categories } from '../../data/categories'

function MobileMenu({ isOpen }) {
  const { toggleMobileMenu } = useAppContext()
  const { isAuthenticated, currentUser, logout } = useAuth()

  return (
    <div 
      className={`fixed top-0 left-0 h-full w-full z-50 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={toggleMobileMenu}
      ></div>
      
      {/* Menu content */}
      <div className="relative bg-white h-full w-4/5 max-w-xs overflow-y-auto">
        <div className="p-6">
          {/* Close button */}
          <button 
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 p-2 text-secondary-500 hover:text-secondary-700"
            aria-label="Close menu"
          >
            <FiX className="w-6 h-6" />
          </button>
          
          {/* Logo */}
          <Link to="/" className="block text-2xl font-bold mb-6" onClick={toggleMobileMenu}>
            <span className="text-primary-500">MALE</span>
            <span className="text-secondary-900">FASHION</span>
          </Link>
          
          {/* Navigation */}
          <nav className="mb-8">
            <h3 className="text-sm font-semibold text-secondary-400 uppercase mb-2">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="block py-2 text-secondary-800 hover:text-primary-500"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop" 
                  className="block py-2 text-secondary-800 hover:text-primary-500"
                  onClick={toggleMobileMenu}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="block py-2 text-secondary-800 hover:text-primary-500"
                  onClick={toggleMobileMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-secondary-400 uppercase mb-2">Categories</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <Link 
                    to={`/shop/category/${category.slug}`} 
                    className="block py-2 text-secondary-800 hover:text-primary-500"
                    onClick={toggleMobileMenu}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* User account */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-400 uppercase mb-2">Account</h3>
            {isAuthenticated ? (
              <ul className="space-y-2">
                <li className="text-secondary-700 py-2">
                  Hello, {currentUser.firstName}
                </li>
                <li>
                  <Link 
                    to="/profile" 
                    className="block py-2 text-secondary-800 hover:text-primary-500"
                    onClick={toggleMobileMenu}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/orders" 
                    className="block py-2 text-secondary-800 hover:text-primary-500"
                    onClick={toggleMobileMenu}
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/wishlist" 
                    className="block py-2 text-secondary-800 hover:text-primary-500"
                    onClick={toggleMobileMenu}
                  >
                    Wishlist
                  </Link>
                </li>
                {currentUser.role === 'admin' && (
                  <li>
                    <Link 
                      to="/admin" 
                      className="block py-2 text-secondary-800 hover:text-primary-500"
                      onClick={toggleMobileMenu}
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button 
                    onClick={() => {
                      logout()
                      toggleMobileMenu()
                    }} 
                    className="block w-full text-left py-2 text-secondary-800 hover:text-primary-500"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/login" 
                    className="block py-2 text-secondary-800 hover:text-primary-500"
                    onClick={toggleMobileMenu}
                  >
                    Log In
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="block py-2 text-secondary-800 hover:text-primary-500"
                    onClick={toggleMobileMenu}
                  >
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu