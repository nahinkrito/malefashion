import { createContext, useState, useContext } from 'react'
import { AuthProvider } from './AuthContext'
import { CartProvider } from './CartContext'
import { WishlistProvider } from './WishlistContext'
import { ProductProvider } from './ProductContext'
import { OrderProvider } from './OrderContext'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export function AppProvider({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [theme, setTheme] = useState('light')
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const appContextValue = {
    isMobileMenuOpen,
    toggleMobileMenu,
    searchQuery,
    setSearchQuery,
    theme,
    toggleTheme
  }
  
  return (
    <AppContext.Provider value={appContextValue}>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                {children}
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </AppContext.Provider>
  )
}