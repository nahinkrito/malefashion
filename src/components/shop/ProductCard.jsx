import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'

function ProductCard({ product, addToCart, addToWishlist, isInWishlist }) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Calculate discounted price
  const discountedPrice = product.discountPercentage > 0 
    ? product.price * (1 - product.discountPercentage / 100) 
    : null

  return (
    <div 
      className="card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.mainImage}
            alt={product.name}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Product actions overlay */}
        <div className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-4 px-4 flex justify-center space-x-3 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <button
            onClick={() => addToCart(product, 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-secondary-800 shadow-sm hover:bg-primary-500 hover:text-white transition-colors duration-200"
            aria-label="Add to cart"
          >
            <FiShoppingCart />
          </button>
          
          <button
            onClick={() => addToWishlist(product)}
            className={`w-10 h-10 flex items-center justify-center rounded-full shadow-sm transition-colors duration-200 ${isInWishlist ? 'bg-accent-500 text-white' : 'bg-white text-secondary-800 hover:bg-accent-500 hover:text-white'}`}
            aria-label="Add to wishlist"
          >
            <FiHeart />
          </button>
          
          <Link
            to={`/product/${product.id}`}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-secondary-800 shadow-sm hover:bg-primary-500 hover:text-white transition-colors duration-200"
            aria-label="View product"
          >
            <FiEye />
          </Link>
        </div>
        
        {/* Discount badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-accent-500 text-white text-sm font-semibold py-1 px-2 rounded">
            -{product.discountPercentage}%
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-lg mb-2 hover:text-primary-500 transition duration-200">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {discountedPrice ? (
              <>
                <span className="text-primary-500 font-semibold">₹{discountedPrice.toFixed(0)}</span>
                <span className="ml-2 text-secondary-500 line-through text-sm">₹{product.price.toFixed(0)}</span>
              </>
            ) : (
              <span className="text-primary-500 font-semibold">₹{product.price.toFixed(0)}</span>
            )}
          </div>
          
          {/* Product rating */}
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-secondary-300'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-secondary-500">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard