import { createContext, useContext, useState, useEffect } from 'react'
import { orders as initialOrders } from '../data/orders'
import { useAuth } from './AuthContext'

const OrderContext = createContext()

export const useOrders = () => useContext(OrderContext)

export function OrderProvider({ children }) {
  const { currentUser } = useAuth()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        setOrders(initialOrders)
        setIsLoading(false)
      } catch (error) {
        setError('Failed to fetch orders')
        setIsLoading(false)
      }
    }

    if (currentUser) {
      fetchOrders()
    } else {
      setOrders([])
      setIsLoading(false)
    }
  }, [currentUser])

  const getUserOrders = () => {
    if (!currentUser) return []
    return orders.filter(order => order.userId === currentUser.id)
  }

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId)
  }

  const createOrder = (orderData) => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        const newOrder = {
          id: `order-${Date.now()}`,
          userId: currentUser.id,
          status: 'pending',
          createdAt: new Date().toISOString(),
          ...orderData
        }
        
        setOrders(prevOrders => [...prevOrders, newOrder])
        resolve(newOrder)
      }, 800)
    })
  }

  const updateOrderStatus = (orderId, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId 
              ? { ...order, status, updatedAt: new Date().toISOString() } 
              : order
          )
        )
        resolve({ success: true })
      }, 800)
    })
  }

  const value = {
    orders,
    isLoading,
    error,
    getUserOrders,
    getOrderById,
    createOrder,
    updateOrderStatus
  }

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}