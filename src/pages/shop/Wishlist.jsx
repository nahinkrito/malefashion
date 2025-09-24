import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiTrash2, FiShoppingCart } from 'react-icons/fi'
import { useWishlist } from '../../contexts/WishlistContext'
import { useCart } from '../../contexts/CartContext'
import { toast } from 'react-toastify'

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  
  // Update document title
  useEffect(() => {
    document.title = 'Wishlist - MaleFashion'
  }, [])
  
  // Handle move to cart
  const handleMoveToCart = (product) => {
    addToCart(product, 1)
    removeFromWishlist(product.id)
    toast.success(`${product.name} moved to cart`)
  }

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-5 mb-8">
        <div className="container">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-secondary-500 hover:text-primary-500">Home</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-900">Wishlist</span>
          </div>
        </div>
      </div>
      
      <div className="container">
        <h1 className="text-3xl font-bold text-secondary-900 mb-8">My Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
            <p className="text-secondary-600 mb-8">
              Browse our collection and add items you love to your wishlist.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Product</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Price</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Stock Status</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-secondary-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {wishlistItems.map((item) => (
                    <tr key={item.id} className="hover:bg-secondary-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img 
                            src={item.mainImage} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="ml-4">
                            <Link 
                              to={`/product/${item.id}`} 
                              className="text-secondary-900 font-medium hover:text-primary-500"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.discountPercentage > 0 ? (
                          <div>
                            <span className="text-primary-500 font-medium">
                              ₹{(item.price * (1 - item.discountPercentage / 100)).toFixed(0)}
                            </span>
                            <span className="block text-sm text-secondary-500 line-through">
                              ₹{item.price.toFixed(0)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-secondary-700">₹{item.price.toFixed(0)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          item.stockQuantity > 0 
                            ? 'bg-success-100 text-success-800' 
                            : 'bg-error-100 text-error-800'
                        }`}>
                          {item.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleMoveToCart(item)}
                            disabled={item.stockQuantity === 0}
                            className={`p-2 rounded-full text-secondary-700 hover:bg-primary-50 hover:text-primary-500 ${
                              item.stockQuantity === 0 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            title="Add to cart"
                          >
                            <FiShoppingCart className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              removeFromWishlist(item.id)
                              toast.info(`${item.name} removed from wishlist`)
                            }}
                            className="p-2 rounded-full text-secondary-700 hover:bg-error-50 hover:text-error-500"
                            title="Remove from wishlist"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-secondary-50 flex justify-between items-center">
              <Link to="/shop" className="text-primary-500 font-medium hover:underline">
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  wishlistItems.forEach(item => {
                    if (item.stockQuantity > 0) {
                      handleMoveToCart(item)
                    }
                  })
                }}
                className="btn btn-primary"
              >
                Add All to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist