import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiTrash2, FiArrowLeft, FiPlus, FiMinus, FiChevronRight } from 'react-icons/fi'
import { useCart } from '../../contexts/CartContext'

function Cart() {
  const { cartItems, cartTotal, updateCartItem, removeFromCart } = useCart()
  const [shippingCost, setShippingCost] = useState(9.99)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  
  // Update document title
  useEffect(() => {
    document.title = 'Shopping Cart - MaleFashion'
  }, [])
  
  // Calculate subtotal
  const subtotal = cartTotal
  
  // Calculate discount amount if coupon applied
  const discountAmount = appliedCoupon ? (subtotal * (appliedCoupon.discountPercentage / 100)) : 0
  
  // Calculate tax (example: 8%)
  const taxRate = 0.08
  const taxAmount = (subtotal - discountAmount) * taxRate
  
  // Calculate final total
  const total = subtotal - discountAmount + taxAmount + shippingCost
  
  // Handle quantity updates
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) {
      updateCartItem(item.id, { quantity: newQuantity }, item.selectedSize, item.selectedColor)
    }
  }
  
  // Handle coupon application
  const applyCoupon = (e) => {
    e.preventDefault()
    setCouponError('')
    
    // In a real app, this would validate against backend
    const coupons = [
      { code: 'WELCOME10', discountPercentage: 10 },
      { code: 'SUMMER20', discountPercentage: 20 }
    ]
    
    const coupon = coupons.find(c => c.code === couponCode.toUpperCase())
    
    if (coupon) {
      setAppliedCoupon(coupon)
      setCouponCode('')
    } else {
      setCouponError('Invalid coupon code')
    }
  }
  
  // Remove applied coupon
  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-5 mb-8">
        <div className="container">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-secondary-500 hover:text-primary-500">Home</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-900">Shopping Cart</span>
          </div>
        </div>
      </div>
      
      <div className="container">
        <h1 className="text-3xl font-bold text-secondary-900 mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-secondary-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Product</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Price</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Quantity</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-secondary-900">Total</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-secondary-900"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-100">
                      {cartItems.map((item) => (
                        <tr key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="hover:bg-secondary-50">
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
                                <div className="mt-1 text-sm text-secondary-500">
                                  {item.selectedSize && (
                                    <span className="mr-3">Size: {item.selectedSize}</span>
                                  )}
                                  {item.selectedColor && (
                                    <span className="flex items-center">
                                      Color:
                                      <span 
                                        className="ml-1 inline-block w-3 h-3 rounded-full" 
                                        style={{ backgroundColor: item.selectedColor }}
                                      ></span>
                                    </span>
                                  )}
                                </div>
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
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center border border-secondary-300 rounded-md mx-auto" style={{ width: '110px' }}>
                              <button
                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-secondary-500 hover:bg-secondary-100"
                                disabled={item.quantity <= 1}
                              >
                                <FiMinus className="w-3 h-3" />
                              </button>
                              <input
                                type="text"
                                value={item.quantity}
                                readOnly
                                className="w-10 text-center border-none focus:outline-none text-secondary-800"
                              />
                              <button
                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-secondary-500 hover:bg-secondary-100"
                              >
                                <FiPlus className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-medium">
                            ₹{((item.discountPercentage > 0 
                              ? item.price * (1 - item.discountPercentage / 100)
                              : item.price) * item.quantity).toFixed(0)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                              className="text-secondary-500 hover:text-error-500"
                              aria-label="Remove item"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-6 bg-secondary-50">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <Link to="/shop" className="text-primary-500 font-medium hover:underline flex items-center">
                      <FiArrowLeft className="mr-2" />
                      Continue Shopping
                    </Link>
                    
                    {/* Coupon form */}
                    <form onSubmit={applyCoupon} className="flex items-stretch">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="rounded-l-md px-4 py-2 border-y border-l border-secondary-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary-500 text-white font-medium rounded-r-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        Apply
                      </button>
                    </form>
                  </div>
                  
                  {couponError && (
                    <p className="mt-2 text-sm text-error-600">{couponError}</p>
                  )}
                  
                  {appliedCoupon && (
                    <div className="mt-3 p-2 bg-success-100 text-success-800 rounded-md flex justify-between items-center">
                      <span>
                        <strong>Coupon {appliedCoupon.code}</strong> applied: {appliedCoupon.discountPercentage}% discount
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-secondary-700 hover:text-error-600"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Subtotal</span>
                    <span className="text-secondary-900 font-medium">₹{subtotal.toFixed(0)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-success-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-₹{discountAmount.toFixed(0)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Tax (8%)</span>
                    <span className="text-secondary-900">₹{taxAmount.toFixed(0)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Shipping</span>
                    <span className="text-secondary-900">₹{shippingCost.toFixed(0)}</span>
                  </div>
                  
                  <div className="border-t border-secondary-200 pt-4 flex justify-between">
                    <span className="text-lg font-semibold text-secondary-900">Total</span>
                    <span className="text-lg font-semibold text-primary-500">₹{total.toFixed(0)}</span>
                  </div>
                </div>
                
                {/* Shipping options */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-secondary-900 mb-3">Shipping</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingCost === 99}
                        onChange={() => setShippingCost(99)}
                        className="text-primary-500 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-secondary-700">Standard Shipping - ₹99</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingCost === 199}
                        onChange={() => setShippingCost(199)}
                        className="text-primary-500 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-secondary-700">Express Shipping - ₹199</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingCost === 0}
                        onChange={() => setShippingCost(0)}
                        className="text-primary-500 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-secondary-700">Free Shipping (orders over ₹999)</span>
                    </label>
                  </div>
                </div>
                
                <Link
                  to="/checkout"
                  className="btn btn-primary w-full mb-4"
                >
                  Proceed to Checkout
                </Link>
                
                <p className="text-xs text-secondary-500 text-center">
                  By proceeding to checkout, you agree to our{' '}
                  <Link to="/terms" className="text-primary-500 hover:underline">
                    terms and conditions
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart