import { createContext, useState, useContext, useEffect } from 'react'

const WishlistContext = createContext()

export const useWishlist = () => useContext(WishlistContext)

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([])

  // Load wishlist from localStorage on initial load
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      // Check if item already exists in wishlist
      const exists = prevItems.some(item => item.id === product.id)
      
      if (!exists) {
        // Add new item to wishlist
        return [...prevItems, product]
      }
      
      return prevItems
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    )
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId)
  }

  const value = {
    wishlistItems,
    wishlistCount: wishlistItems.length,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}