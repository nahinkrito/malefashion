import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FiChevronRight, FiUpload, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useProducts } from '../../contexts/ProductContext'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProductById, categories } = useProducts()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPercentage: 0,
    categoryId: '',
    stockQuantity: '',
    colors: [],
    sizes: [],
    mainImage: '',
    images: [],
    featured: false,
    tags: []
  })
  
  const [newColor, setNewColor] = useState('')
  const [newSize, setNewSize] = useState('')
  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Fetch product data
  useEffect(() => {
    const product = getProductById(id)
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        categoryId: product.categoryId,
        stockQuantity: product.stockQuantity,
        colors: product.colors,
        sizes: product.sizes,
        mainImage: product.mainImage,
        images: product.images,
        featured: product.featured,
        tags: product.tags
      })
    } else {
      navigate('/admin/products')
      toast.error('Product not found')
    }
  }, [id, getProductById, navigate])
  
  // Update document title
  useEffect(() => {
    document.title = `Edit ${formData.name} - Admin Dashboard`
  }, [formData.name])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Validate form
      if (!formData.name || !formData.description || !formData.price || !formData.categoryId || !formData.stockQuantity) {
        throw new Error('Please fill in all required fields')
      }
      
      if (formData.colors.length === 0) {
        throw new Error('Please add at least one color')
      }
      
      if (!formData.mainImage) {
        throw new Error('Please provide a main image')
      }
      
      // In a real app, this would be an API call
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Product updated successfully')
      navigate('/admin/products')
    } catch (error) {
      toast.error(error.message || 'Failed to update product')
      setIsSubmitting(false)
    }
  }
  
  const handleColorAdd = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, newColor]
      }))
      setNewColor('')
    }
  }
  
  const handleSizeAdd = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize]
      }))
      setNewSize('')
    }
  }
  
  const handleTagAdd = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.toLowerCase()]
      }))
      setNewTag('')
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Edit Product</h1>
          <nav className="flex items-center text-sm mt-2">
            <Link to="/admin" className="text-secondary-500 hover:text-primary-500">Dashboard</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <Link to="/admin/products" className="text-secondary-500 hover:text-primary-500">Products</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-800">Edit Product</span>
          </nav>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-secondary-100">
          <h2 className="text-lg font-semibold text-secondary-900">Product Information</h2>
          <p className="text-secondary-600 text-sm mt-1">Update your product details.</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="form-input"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Category *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                className="form-input"
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
              className="form-input"
              required
            ></textarea>
          </div>
          
          {/* Pricing and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500">$</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="form-input pl-8"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Discount Percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.discountPercentage}
                  onChange={(e) => setFormData({...formData, discountPercentage: e.target.value})}
                  className="form-input pr-8"
                  min="0"
                  max="100"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500">%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({...formData, stockQuantity: e.target.value})}
                className="form-input"
                min="0"
                required
              />
            </div>
          </div>
          
          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Colors *
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.colors.map((color, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100"
                >
                  <span 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: color }}
                  ></span>
                  {color}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      colors: prev.colors.filter((_, i) => i !== index)
                    }))}
                    className="ml-2 text-secondary-500 hover:text-error-500"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="form-input w-24"
              />
              <button
                type="button"
                onClick={handleColorAdd}
                className="btn btn-secondary"
              >
                Add Color
              </button>
            </div>
          </div>
          
          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Sizes
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.sizes.map((size, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100"
                >
                  {size}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      sizes: prev.sizes.filter((_, i) => i !== index)
                    }))}
                    className="ml-2 text-secondary-500 hover:text-error-500"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                placeholder="Enter size"
                className="form-input"
              />
              <button
                type="button"
                onClick={handleSizeAdd}
                className="btn btn-secondary"
              >
                Add Size
              </button>
            </div>
          </div>
          
          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Main Image URL *
            </label>
            <input
              type="url"
              value={formData.mainImage}
              onChange={(e) => setFormData({...formData, mainImage: e.target.value})}
              placeholder="https://example.com/image.jpg"
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Additional Image URLs
            </label>
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => {
                      const newImages = [...formData.images]
                      newImages[index] = e.target.value
                      setFormData({...formData, images: newImages})
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="form-input flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index)
                    }))}
                    className="btn btn-secondary"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  images: [...prev.images, '']
                }))}
                className="btn btn-secondary"
              >
                Add Image URL
              </button>
            </div>
          </div>
          
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      tags: prev.tags.filter((_, i) => i !== index)
                    }))}
                    className="ml-2 text-secondary-500 hover:text-error-500"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter tag"
                className="form-input"
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="btn btn-secondary"
              >
                Add Tag
              </button>
            </div>
          </div>
          
          {/* Featured Product */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded"
              />
              <span className="ml-2 text-secondary-700">Featured Product</span>
            </label>
          </div>
        </div>
        
        <div className="p-6 bg-secondary-50 border-t border-secondary-100 flex justify-between">
          <Link to="/admin/products" className="btn btn-secondary">
            Cancel
          </Link>
          <button
            type="submit"
            className={`btn btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Updating Product...
              </div>
            ) : (
              'Update Product'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct