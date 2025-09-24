import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ShopHeader from '../components/shop/ShopHeader'
import ShopFooter from '../components/shop/ShopFooter'
import MobileMenu from '../components/shop/MobileMenu'
import SearchOverlay from '../components/shop/SearchOverlay'
import ScrollToTop from '../components/common/ScrollToTop'
import { useAppContext } from '../contexts/AppContext'

function ShopLayout() {
  const location = useLocation()
  const { isMobileMenuOpen } = useAppContext()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  // Close mobile menu and search when changing routes
  useEffect(() => {
    setIsSearchOpen(false)
  }, [location])

  return (
    <div className="flex flex-col min-h-screen">
      <ShopHeader setIsSearchOpen={setIsSearchOpen} />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <ShopFooter />
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} />
      
      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  )
}

export default ShopLayout