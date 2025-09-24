import { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  // Update localStorage and calculate totals whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
    
    // Calculate totals
    const total = cartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity), 0
    )
    
    setCartTotal(total)
    setItemCount(cartItems.reduce((count, item) => count + item.quantity, 0))
  }, [cartItems])

  const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && 
               item.selectedSize === selectedSize && 
               item.selectedColor === selectedColor
      )

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item to cart
        return [...prevItems, { 
          ...product, 
          quantity, 
          selectedSize, 
          selectedColor 
        }]
      }
    })
  }

  const updateCartItem = (productId, updates, selectedSize = null, selectedColor = null) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === productId && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor) {
          return { ...item, ...updates }
        }
        return item
      })
    )
  }

  const removeFromCart = (productId, selectedSize = null, selectedColor = null) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === productId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor)
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const value = {
    cartItems,
    cartTotal,
    itemCount,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}