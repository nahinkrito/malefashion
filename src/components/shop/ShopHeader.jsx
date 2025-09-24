import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiChevronDown, FiSun, FiMoon } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'
import { useAppContext } from '../../contexts/AppContext'
import { useTheme } from '../../contexts/ThemeContext'

function ShopHeader({ setIsSearchOpen }) {
  const { isAuthenticated, currentUser, logout } = useAuth()
  const { itemCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { toggleMobileMenu } = useAppContext()
  const { isDarkMode, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close dropdown when changing routes
  useEffect(() => {
    setIsDropdownOpen(false)
  }, [location])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isHomePage = location.pathname === '/'
  const headerBg = isScrolled 
    ? 'bg-white dark:bg-secondary-900' 
    : isHomePage 
      ? 'bg-transparent' 
      : 'bg-white dark:bg-secondary-900'

  const linkColor = isScrolled || !isHomePage
    ? 'text-secondary-800 dark:text-white hover:text-primary-500 dark:hover:text-primary-400'
    : 'text-white hover:text-accent-500'

  const iconColor = isScrolled || !isHomePage
    ? 'text-secondary-800 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-800'
    : 'text-white hover:bg-white/10'

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md py-2' : 'py-4'
      } ${headerBg}`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <span className="text-primary-500">MALE</span>
          <span className={isScrolled || !isHomePage ? 'text-secondary-900 dark:text-white' : 'text-white'}>FASHION</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`font-medium transition duration-200 ${linkColor}`}>
            Home
          </Link>
          <Link to="/shop" className={`font-medium transition duration-200 ${linkColor}`}>
            Shop
          </Link>
          <Link to="/shop/category/tops" className={`font-medium transition duration-200 ${linkColor}`}>
            Tops
          </Link>
          <Link to="/shop/category/bottoms" className={`font-medium transition duration-200 ${linkColor}`}>
            Bottoms
          </Link>
          <Link to="/shop/category/accessories" className={`font-medium transition duration-200 ${linkColor}`}>
            Accessories
          </Link>
          <Link to="/contact" className={`font-medium transition duration-200 ${linkColor}`}>
            Contact
          </Link>
        </nav>

        {/* Header Icons */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className={`p-2 rounded-full transition duration-200 ${iconColor}`}
            aria-label="Search"
          >
            <FiSearch className="w-5 h-5" />
          </button>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition duration-200 ${iconColor}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
          
          {/* Wishlist */}
          <Link 
            to="/wishlist"
            className={`p-2 rounded-full transition duration-200 relative ${iconColor}`}
            aria-label="Wishlist"
          >
            <FiHeart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          
          {/* Cart */}
          <Link 
            to="/cart"
            className={`p-2 rounded-full transition duration-200 relative ${iconColor}`}
            aria-label="Cart"
          >
            <FiShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          
          {/* User Account / Login */}
          <div className="relative">
            {isAuthenticated ? (
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`p-2 rounded-full transition duration-200 flex items-center ${iconColor}`}
              >
                <FiUser className="w-5 h-5" />
                <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
            ) : (
              <Link 
                to="/login"
                className={`p-2 rounded-full transition duration-200 ${iconColor}`}
                aria-label="Login"
              >
                <FiUser className="w-5 h-5" />
              </Link>
            )}
            
            {/* User dropdown menu */}
            {isDropdownOpen && isAuthenticated && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 text-sm text-secondary-500 dark:text-secondary-400">
                  Hello, {currentUser.firstName}
                </div>
                <div className="border-t border-secondary-100 dark:border-secondary-700"></div>
                <Link to="/profile" className="block px-4 py-2 text-sm text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-700">
                  Profile
                </Link>
                <Link to="/orders" className="block px-4 py-2 text-sm text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-700">
                  Order History
                </Link>
                <Link to="/wishlist" className="block px-4 py-2 text-sm text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-700">
                  Wishlist
                </Link>
                {currentUser.role === 'admin' && (
                  <Link to="/admin" className="block px-4 py-2 text-sm text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-700">
                    Admin Dashboard
                  </Link>
                )}
                <div className="border-t border-secondary-100 dark:border-secondary-700"></div>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2 text-sm text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-700"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className={`p-2 rounded-full md:hidden transition duration-200 ${iconColor}`}
            aria-label="Menu"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default ShopHeader