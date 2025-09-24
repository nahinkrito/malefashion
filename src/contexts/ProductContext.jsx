import { createContext, useState, useContext, useEffect } from 'react'
import { products as initialProducts } from '../data/products'
import { categories } from '../data/categories'

const ProductContext = createContext()

export const useProducts = () => useContext(ProductContext)

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Simulated fetch of products from an API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        setProducts(initialProducts)
        setIsLoading(false)
      } catch (error) {
        setError('Failed to fetch products')
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const getProductById = (id) => {
    return products.find(product => product.id === id)
  }

  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.categoryId === categoryId)
  }

  const getRelatedProducts = (productId, categoryId, limit = 4) => {
    return products
      .filter(product => product.id !== productId && product.categoryId === categoryId)
      .slice(0, limit)
  }

  const getNewArrivals = (limit = 8) => {
    return [...products]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit)
  }

  const getTopRated = (limit = 8) => {
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  const getBestSellers = (limit = 8) => {
    return [...products]
      .sort((a, b) => b.salesCount - a.salesCount)
      .slice(0, limit)
  }
  
  const getDiscountedProducts = (limit = 8) => {
    return products
      .filter(product => product.discountPercentage > 0)
      .slice(0, limit)
  }

  const getFeaturedProducts = (limit = 4) => {
    return products
      .filter(product => product.featured)
      .slice(0, limit)
  }

  const searchProducts = (query) => {
    const searchTerm = query.toLowerCase()
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm)
    )
  }

  const value = {
    products,
    categories,
    isLoading,
    error,
    getProductById,
    getProductsByCategory,
    getRelatedProducts,
    getNewArrivals,
    getTopRated,
    getBestSellers,
    getDiscountedProducts,
    getFeaturedProducts,
    searchProducts
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}