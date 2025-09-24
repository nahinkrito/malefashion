import { useState, useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { FiChevronRight, FiFilter, FiX } from 'react-icons/fi'
import { useProducts } from '../../contexts/ProductContext'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'
import ProductCard from '../../components/shop/ProductCard'

function Shop() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const { products, categories, isLoading } = useProducts()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  
  const [filteredProducts, setFilteredProducts] = useState([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState(category ? [category] : [])
  const [sortBy, setSortBy] = useState('newest')
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  
  // Update document title
  useEffect(() => {
    document.title = category 
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} - MaleFashion`
      : 'Shop - MaleFashion'
  }, [category])
  
  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.some(cat => product.categoryId === cat || product.categoryId.replace('category-', '') === cat)
      )
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => {
      const price = product.discountPercentage > 0 
        ? product.price * (1 - product.discountPercentage / 100)
        : product.price
      return price >= priceRange[0] && price <= priceRange[1]
    })
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.discountPercentage > 0 
            ? a.price * (1 - a.discountPercentage / 100)
            : a.price
          const priceB = b.discountPercentage > 0 
            ? b.price * (1 - b.discountPercentage / 100)
            : b.price
          return priceA - priceB
        })
        break
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.discountPercentage > 0 
            ? a.price * (1 - a.discountPercentage / 100)
            : a.price
          const priceB = b.discountPercentage > 0 
            ? b.price * (1 - b.discountPercentage / 100)
            : b.price
          return priceB - priceA
        })
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    
    setFilteredProducts(filtered)
  }, [products, selectedCategories, priceRange, sortBy, category])
  
  // Handle category toggle
  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => {
      const normalized = categoryId.includes('category-') ? categoryId.replace('category-', '') : categoryId
      if (prev.includes(normalized) || prev.includes(categoryId)) {
        return prev.filter(id => id !== normalized)
      }
      return [...prev, normalized]
    })
  }
  
  // Handle price range change
  const handlePriceChange = (index, value) => {
    setPriceRange(prev => {
      const newRange = [...prev]
      newRange[index] = value
      return newRange
    })
  }
  
  // Reset filters
  const resetFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 500])
    setSortBy('newest')
  }

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-5 mb-8">
        <div className="container">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-secondary-500 hover:text-primary-500">Home</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <Link to="/shop" className="text-secondary-500 hover:text-primary-500">Shop</Link>
            {category && (
              <>
                <FiChevronRight className="mx-2 text-secondary-400" />
                <span className="text-secondary-900 capitalize">{category}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Shop'}
          </h1>
          
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden btn btn-secondary"
          >
            <FiFilter className="mr-2" />
            Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug) || selectedCategories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                        className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded"
                      />
                      <span className="ml-2 text-secondary-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-secondary-700">Min Price</label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                      className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-secondary-700">${priceRange[0]}</span>
                  </div>
                  <div>
                    <label className="text-sm text-secondary-700">Max Price</label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                      className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-secondary-700">${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={resetFilters}
                className="w-full btn btn-secondary"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-secondary-600">
                  Showing {filteredProducts.length} products
                </p>
                
                <div className="flex items-center space-x-4">
                  <label className="text-secondary-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-input min-w-[150px]"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">No products found</h2>
                <p className="text-secondary-600 mb-8">
                  Try adjusting your filters or browse our other categories.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    addToWishlist={addToWishlist}
                    isInWishlist={isInWishlist(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filters */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isMobileFiltersOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileFiltersOpen(false)}></div>
        
        <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-secondary-500 hover:text-secondary-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug) || selectedCategories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                        className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded"
                      />
                      <span className="ml-2 text-secondary-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-secondary-700">Min Price</label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                      className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-secondary-700">${priceRange[0]}</span>
                  </div>
                  <div>
                    <label className="text-sm text-secondary-700">Max Price</label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                      className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-secondary-700">${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <button
                onClick={resetFilters}
                className="w-full btn btn-secondary mb-2"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full btn btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop