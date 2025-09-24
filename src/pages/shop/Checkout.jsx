import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiCheck, FiChevronRight, FiCreditCard } from 'react-icons/fi'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { useOrders } from '../../contexts/OrderContext'

// Make sure to replace this with your actual Stripe public key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

// Payment form component
function PaymentForm({ onPaymentSuccess, orderData }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState(null)
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return
    }
    
    setIsProcessing(true)
    setPaymentError(null)
    
    // In a real implementation, you would create a payment intent on your server
    // For this demo, we'll simulate a successful payment after a delay
    setTimeout(() => {
      setIsProcessing(false)
      onPaymentSuccess({
        id: 'pi_' + Math.random().toString(36).substr(2, 9),
        last4: '4242',
        brand: 'visa'
      })
    }, 1500)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Card Details
        </label>
        <div className="border border-secondary-300 rounded-md p-3 focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-500">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#dc2626',
                },
              },
            }}
          />
        </div>
        {paymentError && (
          <p className="mt-2 text-sm text-error-600">{paymentError}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full btn btn-primary ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing...
          </div>
        ) : (
          <>
            <FiCreditCard className="mr-2" />
            Pay ₹{orderData.total.toFixed(0)}
          </>
        )}
      </button>
    </form>
  )
}

// Main Checkout Component
function Checkout() {
  const navigate = useNavigate()
  const { cartItems, cartTotal, clearCart } = useCart()
  const { currentUser } = useAuth()
  const { createOrder } = useOrders()
  
  const [step, setStep] = useState(1)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    street: currentUser?.address?.street || '',
    city: currentUser?.address?.city || '',
    state: currentUser?.address?.state || '',
    zipCode: currentUser?.address?.zipCode || '',
    country: currentUser?.address?.country || 'USA',
  })
  
  const [billingAddress, setBillingAddress] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    street: currentUser?.address?.street || '',
    city: currentUser?.address?.city || '',
    state: currentUser?.address?.state || '',
    zipCode: currentUser?.address?.zipCode || '',
    country: currentUser?.address?.country || 'USA',
    phone: currentUser?.phone || '',
  })
  
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [orderNotes, setOrderNotes] = useState('')
  
  // Update document title
  useEffect(() => {
    document.title = 'Checkout - MaleFashion'
  }, [])
  
  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart')
    }
  }, [cartItems, navigate])
  
  // Calculate order summary
  const shippingCost = shippingMethod === 'express' ? 199 : (shippingMethod === 'free' || cartTotal >= 999) ? 0 : 99
  const subtotal = cartTotal
  const taxRate = 0.08
  const taxAmount = subtotal * taxRate
  const total = subtotal + taxAmount + shippingCost
  
  // Update billing address when checkbox changes
  useEffect(() => {
    if (sameAsBilling) {
      setBillingAddress(shippingAddress)
    }
  }, [sameAsBilling, shippingAddress])
  
  // Handle form submissions for each step
  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }
  
  const handleReviewSubmit = (e) => {
    e.preventDefault()
    setStep(3)
  }
  
  // Handle successful payment
  const handlePaymentSuccess = (paymentDetails) => {
    // Create order data
    const orderData = {
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.discountPercentage > 0 
          ? item.price * (1 - item.discountPercentage / 100)
          : item.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize,
        image: item.mainImage
      })),
      shippingAddress,
      billingAddress: sameAsBilling ? shippingAddress : billingAddress,
      paymentMethod: 'credit_card',
      paymentDetails: {
        lastFour: paymentDetails.last4,
        cardType: paymentDetails.brand
      },
      subtotal,
      shippingCost,
      tax: taxAmount,
      total,
      notes: orderNotes,
      shippingMethod
    }
    
    // Create order
    createOrder(orderData)
      .then(order => {
        // Clear cart
        clearCart()
        
        // Show success message
        toast.success('Order placed successfully!')
        
        // Navigate to order confirmation
        navigate(`/orders/${order.id}`)
      })
      .catch(error => {
        toast.error('Failed to create order. Please try again.')
        console.error(error)
      })
  }

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-5 mb-8">
        <div className="container">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-secondary-500 hover:text-primary-500">Home</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <Link to="/cart" className="text-secondary-500 hover:text-primary-500">Cart</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-900">Checkout</span>
          </div>
        </div>
      </div>
      
      <div className="container">
        <h1 className="text-3xl font-bold text-secondary-900 mb-8">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-10">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 1 ? 'bg-primary-500 text-white' : 'bg-secondary-200 text-secondary-600'
            }`}>
              {step > 1 ? <FiCheck className="w-5 h-5" /> : 1}
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-primary-500' : 'bg-secondary-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 2 ? 'bg-primary-500 text-white' : 'bg-secondary-200 text-secondary-600'
            }`}>
              {step > 2 ? <FiCheck className="w-5 h-5" /> : 2}
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-primary-500' : 'bg-secondary-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 3 ? 'bg-primary-500 text-white' : 'bg-secondary-200 text-secondary-600'
            }`}>
              3
            </div>
          </div>
          <div className="flex justify-between mt-2 px-2">
            <span className={`text-sm font-medium ${step >= 1 ? 'text-primary-500' : 'text-secondary-500'}`}>Shipping</span>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-primary-500' : 'text-secondary-500'}`}>Review</span>
            <span className={`text-sm font-medium ${step >= 3 ? 'text-primary-500' : 'text-secondary-500'}`}>Payment</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <form onSubmit={handleShippingSubmit}>
                  <h2 className="text-xl font-semibold text-secondary-900 mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={shippingAddress.firstName}
                        onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={shippingAddress.lastName}
                        onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="street" className="block text-sm font-medium text-secondary-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="street"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-secondary-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-secondary-700 mb-1">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-secondary-700 mb-1">
                        Zip/Postal Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-secondary-700 mb-1">
                        Country *
                      </label>
                      <select
                        id="country"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                        className="form-input"
                        required
                      >
                        <option value="USA">United States</option>
                        <option value="CAN">Canada</option>
                        <option value="GBR">United Kingdom</option>
                        <option value="AUS">Australia</option>
                        <option value="DEU">Germany</option>
                        <option value="FRA">France</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="orderNotes" className="block text-sm font-medium text-secondary-700 mb-1">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      id="orderNotes"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Notes about your order, e.g. special notes for delivery"
                      rows="3"
                      className="form-input"
                    ></textarea>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">Shipping Method</h3>
                    <div className="space-y-2">
                      <label className="flex items-start p-3 border border-secondary-200 rounded-md cursor-pointer hover:border-primary-500 transition-colors duration-200">
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="mt-1 text-primary-500 focus:ring-primary-500"
                        />
                        <div className="ml-3">
                          <span className="block font-medium text-secondary-900">Standard Shipping</span>
                          <span className="block text-sm text-secondary-500 mt-1">Estimated delivery in 3-5 business days</span>
                          <span className="block text-primary-500 font-medium mt-1">₹99</span>
                        </div>
                      </label>
                      
                      <label className="flex items-start p-3 border border-secondary-200 rounded-md cursor-pointer hover:border-primary-500 transition-colors duration-200">
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="mt-1 text-primary-500 focus:ring-primary-500"
                        />
                        <div className="ml-3">
                          <span className="block font-medium text-secondary-900">Express Shipping</span>
                          <span className="block text-sm text-secondary-500 mt-1">Estimated delivery in 1-2 business days</span>
                          <span className="block text-primary-500 font-medium mt-1">₹199</span>
                        </div>
                      </label>
                      
                      <label className={`flex items-start p-3 border border-secondary-200 rounded-md ${cartTotal >= 999 ? 'cursor-pointer hover:border-primary-500' : 'opacity-50 cursor-not-allowed'} transition-colors duration-200`}>
                        <input
                          type="radio"
                          name="shipping"
                          value="free"
                          checked={shippingMethod === 'free'}
                          onChange={() => setShippingMethod('free')}
                          disabled={cartTotal < 999}
                          className="mt-1 text-primary-500 focus:ring-primary-500"
                        />
                        <div className="ml-3">
                          <span className="block font-medium text-secondary-900">Free Shipping</span>
                          <span className="block text-sm text-secondary-500 mt-1">
                            {cartTotal >= 999 
                              ? 'Estimated delivery in 5-7 business days' 
                              : `Spend ₹${(999 - cartTotal).toFixed(0)} more to qualify for free shipping`}
                          </span>
                          <span className="block text-primary-500 font-medium mt-1">₹0</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Link to="/cart" className="btn btn-secondary">
                      Back to Cart
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      Continue to Review
                    </button>
                  </div>
                </form>
              )}
              
              {/* Step 2: Review */}
              {step === 2 && (
                <form onSubmit={handleReviewSubmit}>
                  <h2 className="text-xl font-semibold text-secondary-900 mb-6">Review Your Order</h2>
                  
                  {/* Shipping Address */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-secondary-900">Shipping Address</h3>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-primary-500 hover:text-primary-600"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="bg-secondary-50 p-4 rounded-md">
                      <p className="text-secondary-800">
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </p>
                      <p className="text-secondary-600">{shippingAddress.street}</p>
                      <p className="text-secondary-600">
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                      </p>
                      <p className="text-secondary-600">{shippingAddress.country}</p>
                      <p className="text-secondary-600">{shippingAddress.phone}</p>
                      <p className="text-secondary-600">{shippingAddress.email}</p>
                    </div>
                  </div>
                  
                  {/* Billing Address */}
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <h3 className="text-lg font-semibold text-secondary-900">Billing Address</h3>
                    </div>
                    
                    <div className="mb-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={sameAsBilling}
                          onChange={(e) => setSameAsBilling(e.target.checked)}
                          className="text-primary-500 focus:ring-primary-500 h-4 w-4"
                        />
                        <span className="ml-2 text-secondary-700">Same as shipping address</span>
                      </label>
                    </div>
                    
                    {!sameAsBilling && (
                      <div className="border border-secondary-200 rounded-md p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="billingFirstName" className="block text-sm font-medium text-secondary-700 mb-1">
                              First Name *
                            </label>
                            <input
                              type="text"
                              id="billingFirstName"
                              value={billingAddress.firstName}
                              onChange={(e) => setBillingAddress({...billingAddress, firstName: e.target.value})}
                              className="form-input"
                              required={!sameAsBilling}
                            />
                          </div>
                          <div>
                            <label htmlFor="billingLastName" className="block text-sm font-medium text-secondary-700 mb-1">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              id="billingLastName"
                              value={billingAddress.lastName}
                              onChange={(e) => setBillingAddress({...billingAddress, lastName: e.target.value})}
                              className="form-input"
                              required={!sameAsBilling}
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="billingStreet" className="block text-sm font-medium text-secondary-700 mb-1">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            id="billingStreet"
                            value={billingAddress.street}
                            onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})}
                            className="form-input"
                            required={!sameAsBilling}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="billingCity" className="block text-sm font-medium text-secondary-700 mb-1">
                              City *
                            </label>
                            <input
                              type="text"
                              id="billingCity"
                              value={billingAddress.city}
                              onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                              className="form-input"
                              required={!sameAsBilling}
                            />
                          </div>
                          <div>
                            <label htmlFor="billingState" className="block text-sm font-medium text-secondary-700 mb-1">
                              State/Province *
                            </label>
                            <input
                              type="text"
                              id="billingState"
                              value={billingAddress.state}
                              onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                              className="form-input"
                              required={!sameAsBilling}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="billingZipCode" className="block text-sm font-medium text-secondary-700 mb-1">
                              Zip/Postal Code *
                            </label>
                            <input
                              type="text"
                              id="billingZipCode"
                              value={billingAddress.zipCode}
                              onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                              className="form-input"
                              required={!sameAsBilling}
                            />
                          </div>
                          <div>
                            <label htmlFor="billingCountry" className="block text-sm font-medium text-secondary-700 mb-1">
                              Country *
                            </label>
                            <select
                              id="billingCountry"
                              value={billingAddress.country}
                              onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                              className="form-input"
                              required={!sameAsBilling}
                            >
                              <option value="USA">United States</option>
                              <option value="CAN">Canada</option>
                              <option value="GBR">United Kingdom</option>
                              <option value="AUS">Australia</option>
                              <option value="DEU">Germany</option>
                              <option value="FRA">France</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Order Items */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">Order Items</h3>
                    <div className="border border-secondary-200 rounded-md overflow-hidden">
                      <div className="divide-y divide-secondary-200">
                        {cartItems.map(item => (
                          <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex p-4 hover:bg-secondary-50">
                            <img 
                              src={item.mainImage} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="ml-4 flex-grow">
                              <h4 className="font-medium text-secondary-900">{item.name}</h4>
                              <div className="mt-1 flex flex-wrap gap-2 text-sm text-secondary-600">
                                <span>Qty: {item.quantity}</span>
                                {item.selectedSize && <span>Size: {item.selectedSize}</span>}
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
                            <div className="text-right">
                              <span className="font-medium text-secondary-900">
                                ₹{((item.discountPercentage > 0 
                                  ? item.price * (1 - item.discountPercentage / 100) 
                                  : item.price) * item.quantity).toFixed(0)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipping Method */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-secondary-900">Shipping Method</h3>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-primary-500 hover:text-primary-600"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="bg-secondary-50 p-4 rounded-md">
                      <p className="text-secondary-800 font-medium">
                        {shippingMethod === 'standard' && 'Standard Shipping'}
                        {shippingMethod === 'express' && 'Express Shipping'}
                        {shippingMethod === 'free' && 'Free Shipping'}
                      </p>
                      <p className="text-secondary-600 text-sm">
                        {shippingMethod === 'standard' && 'Estimated delivery in 3-5 business days'}
                        {shippingMethod === 'express' && 'Estimated delivery in 1-2 business days'}
                        {shippingMethod === 'free' && 'Estimated delivery in 5-7 business days'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Order Notes */}
                  {orderNotes && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-secondary-900 mb-3">Order Notes</h3>
                      <div className="bg-secondary-50 p-4 rounded-md">
                        <p className="text-secondary-600">{orderNotes}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    <button 
                      type="button" 
                      onClick={() => setStep(1)} 
                      className="btn btn-secondary"
                    >
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Proceed to Payment
                    </button>
                  </div>
                </form>
              )}
              
              {/* Step 3: Payment */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-secondary-900 mb-6">Payment</h2>
                  
                  <Elements stripe={stripePromise}>
                    <PaymentForm 
                      onPaymentSuccess={handlePaymentSuccess} 
                      orderData={{ total }}
                    />
                  </Elements>
                  
                  <div className="mt-6">
                    <button 
                      type="button" 
                      onClick={() => setStep(2)} 
                      className="btn btn-secondary"
                    >
                      Back to Review
                    </button>
                  </div>
                  
                  <div className="mt-8 p-4 bg-secondary-50 rounded-md">
                    <p className="text-sm text-secondary-600">
                      <strong>Note:</strong> This is a demo store for testing purposes. No real payments will be processed.
                      You can use the Stripe test card number 4242 4242 4242 4242 with any future expiration date, CVC, and postal code.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Subtotal ({cartItems.length} items)</span>
                  <span className="text-secondary-900 font-medium">₹{subtotal.toFixed(0)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-600">Shipping</span>
                  <span className="text-secondary-900">
                    {shippingCost === 0 
                      ? 'Free'
                      : `₹${shippingCost.toFixed(0)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-600">Tax (8%)</span>
                  <span className="text-secondary-900">₹{taxAmount.toFixed(0)}</span>
                </div>
                
                <div className="border-t border-secondary-200 pt-4 flex justify-between">
                  <span className="text-lg font-semibold text-secondary-900">Total</span>
                  <span className="text-lg font-semibold text-primary-500">₹{total.toFixed(0)}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-secondary-900 mb-3">We Accept</h3>
                <div className="flex space-x-2">
                  <img src="https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&h=30" 
                      alt="Payment Methods" 
                      className="h-8" />
                </div>
              </div>
              
              <div className="text-xs text-secondary-500">
                <p className="mb-1">
                  By completing your purchase, you agree to these 
                  <Link to="/terms" className="text-primary-500 hover:underline ml-1">
                    Terms of Service
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout