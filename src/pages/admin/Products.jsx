import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiSearch, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi'
import { useProducts } from '../../contexts/ProductContext'
import { toast } from 'react-toastify'

function Products() {
  const { products, categories } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [stockFilter, setStockFilter] = useState('all')
  
  // Update document title
  useEffect(() => {
    document.title = 'Products - Admin Dashboard'
  }, [])
  
  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.categoryId === categoryFilter
    const matchesStock = stockFilter === 'all' || 
                        (stockFilter === 'inStock' && product.stockQuantity > 0) ||
                        (stockFilter === 'lowStock' && product.stockQuantity <= 10) ||
                        (stockFilter === 'outOfStock' && product.stockQuantity === 0)
    
    return matchesSearch && matchesCategory && matchesStock
  })
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price':
        return a.price - b.price
      case 'stock':
        return a.stockQuantity - b.stockQuantity
      default:
        return 0
    }
  })
  
  // Handle product deletion
  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real app, this would be an API call
      toast.success('Product deleted successfully')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Products</h1>
          <nav className="flex items-center text-sm mt-2">
            <Link to="/admin" className="text-secondary-500 hover:text-primary-500">Dashboard</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-800">Products</span>
          </nav>
        </div>
        
        <Link to="/admin/products/add" className="btn btn-primary">
          <FiPlus className="mr-2" />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </div>
          
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="form-input w-full"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="form-input w-full"
            >
              <option value="all">All Stock Status</option>
              <option value="inStock">In Stock</option>
              <option value="lowStock">Low Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>
          
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input w-full"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Product</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Category</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Price</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Stock</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-secondary-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {sortedProducts.map(product => (
                <tr key={product.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={product.mainImage} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="ml-4">
                        <div className="font-medium text-secondary-900">{product.name}</div>
                        <div className="text-sm text-secondary-500">SKU: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex rounded-full px-2 py-1 text-xs font-semibold bg-secondary-100 text-secondary-800">
                      {categories.find(cat => cat.id === product.categoryId)?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {product.discountPercentage > 0 ? (
                      <div>
                        <span className="text-primary-500 font-medium">
                          ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                        <span className="block text-sm text-secondary-500 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-secondary-900">${product.price.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-medium ${
                      product.stockQuantity > 10 ? 'text-success-600' :
                      product.stockQuantity > 0 ? 'text-warning-600' :
                      'text-error-600'
                    }`}>
                      {product.stockQuantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      product.stockQuantity > 10 ? 'bg-success-100 text-success-800' :
                      product.stockQuantity > 0 ? 'bg-warning-100 text-warning-800' :
                      'bg-error-100 text-error-800'
                    }`}>
                      {product.stockQuantity > 10 ? 'In Stock' :
                       product.stockQuantity > 0 ? 'Low Stock' :
                       'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        to={`/admin/products/edit/${product.id}`}
                        className="p-2 text-secondary-700 hover:text-primary-500 rounded-full hover:bg-secondary-100"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-secondary-700 hover:text-error-500 rounded-full hover:bg-secondary-100"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {sortedProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-secondary-600">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Products