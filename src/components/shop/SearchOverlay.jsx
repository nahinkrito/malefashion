import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiX, FiSearch } from 'react-icons/fi'
import { useProducts } from '../../contexts/ProductContext'

function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const { searchProducts } = useProducts()
  const inputRef = useRef(null)
  
  // Focus input when overlay is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])
  
  // Handle search input change
  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    
    if (value.trim().length > 1) {
      const searchResults = searchProducts(value)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }
  
  // Handle escape key press
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }
  
  // Handle product click
  const handleProductClick = () => {
    setQuery('')
    setResults([])
    onClose()
  }

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black bg-opacity-60 flex items-start justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full max-w-4xl mt-32 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Search input */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search for products..."
              className="w-full p-6 pr-12 text-lg focus:outline-none"
            />
            {query ? (
              <button 
                onClick={() => setQuery('')} 
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-secondary-500 hover:text-secondary-700"
                aria-label="Clear search"
              >
                <FiX className="w-5 h-5" />
              </button>
            ) : (
              <FiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-secondary-500 w-5 h-5" />
            )}
          </div>
          
          {/* Search results */}
          {results.length > 0 && (
            <div className="max-h-96 overflow-y-auto border-t border-secondary-100">
              <div className="p-4">
                <p className="text-secondary-500 text-sm mb-2">{results.length} results found</p>
                <div className="space-y-4">
                  {results.map(product => (
                    <Link 
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={handleProductClick}
                      className="flex items-center p-2 hover:bg-secondary-50 rounded transition duration-200"
                    >
                      <img 
                        src={product.mainImage} 
                        alt={product.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4 flex-grow">
                        <h4 className="text-secondary-800 font-medium">{product.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-primary-500 font-semibold">
                            ${product.discountPercentage > 0 
                              ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2) 
                              : product.price.toFixed(2)
                            }
                          </span>
                          {product.discountPercentage > 0 && (
                            <span className="text-secondary-500 text-sm line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* No results message */}
          {query.trim().length > 1 && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-secondary-500">No products found matching "{query}"</p>
            </div>
          )}
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white shadow text-secondary-800 hover:text-primary-500 focus:outline-none"
            aria-label="Close search"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchOverlay