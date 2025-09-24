import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiChevronRight, FiPackage, FiTruck, FiCheck } from 'react-icons/fi'
import { useOrders } from '../../contexts/OrderContext'

function OrderDetail() {
  const { id } = useParams()
  const { getOrderById } = useOrders()
  const [order, setOrder] = useState(null)
  
  // Update document title and fetch order
  useEffect(() => {
    document.title = `Order ${id} - MaleFashion`
    const orderData = getOrderById(id)
    setOrder(orderData)
  }, [id, getOrderById])
  
  if (!order) {
    return (
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Order not found</h2>
            <p className="text-secondary-600 mb-8">
              The order you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/orders" className="btn btn-primary">
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-5 mb-8">
        <div className="container">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-secondary-500 hover:text-primary-500">Home</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <Link to="/orders" className="text-secondary-500 hover:text-primary-500">Orders</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-900">Order {order.id}</span>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="p-6 border-b border-secondary-100">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h1 className="text-2xl font-semibold text-secondary-900">Order {order.id}</h1>
                    <p className="text-secondary-600 mt-1">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    order.status === 'delivered' ? 'bg-success-100 text-success-800' :
                    order.status === 'shipped' ? 'bg-primary-100 text-primary-800' :
                    order.status === 'processing' ? 'bg-warning-100 text-warning-800' :
                    'bg-secondary-100 text-secondary-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {/* Order Progress */}
              {order.status !== 'cancelled' && (
                <div className="p-6 border-b border-secondary-100">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        order.status !== 'pending' ? 'bg-success-500 text-white' : 'bg-secondary-200'
                      }`}>
                        <FiPackage className="w-5 h-5" />
                      </div>
                      <span className="text-sm mt-2">Processing</span>
                    </div>
                    <div className={`h-1 flex-1 mx-4 ${
                      order.status === 'shipped' || order.status === 'delivered' 
                        ? 'bg-success-500' 
                        : 'bg-secondary-200'
                    }`}></div>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        order.status === 'shipped' || order.status === 'delivered' 
                          ? 'bg-success-500 text-white' 
                          : 'bg-secondary-200'
                      }`}>
                        <FiTruck className="w-5 h-5" />
                      </div>
                      <span className="text-sm mt-2">Shipped</span>
                    </div>
                    <div className={`h-1 flex-1 mx-4 ${
                      order.status === 'delivered' ? 'bg-success-500' : 'bg-secondary-200'
                    }`}></div>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        order.status === 'delivered' ? 'bg-success-500 text-white' : 'bg-secondary-200'
                      }`}>
                        <FiCheck className="w-5 h-5" />
                      </div>
                      <span className="text-sm mt-2">Delivered</span>
                    </div>
                  </div>
                  
                  {order.trackingNumber && (
                    <div className="mt-4 p-4 bg-secondary-50 rounded-md">
                      <p className="text-secondary-700">
                        <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Order Items */}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4 flex-grow">
                        <Link 
                          to={`/product/${item.productId}`}
                          className="text-secondary-900 font-medium hover:text-primary-500"
                        >
                          {item.name}
                        </Link>
                        <div className="text-sm text-secondary-600 mt-1">
                          <span>Qty: {item.quantity}</span>
                          {item.size && <span className="ml-3">Size: {item.size}</span>}
                          {item.color && (
                            <span className="ml-3 flex items-center">
                              Color: 
                              <span 
                                className="ml-1 inline-block w-3 h-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                              ></span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-secondary-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-secondary-600">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-secondary-600">
                  <span>Shipping</span>
                  <span>${order.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-secondary-600">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-secondary-100 pt-3 flex justify-between font-semibold">
                  <span className="text-secondary-900">Total</span>
                  <span className="text-primary-500">${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-medium text-secondary-900 mb-2">Shipping Address</h3>
                  <div className="text-secondary-600">
                    <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                    <p>{order.shippingAddress.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-secondary-900 mb-2">Payment Method</h3>
                  <div className="text-secondary-600">
                    <p className="capitalize">{order.paymentMethod.replace('_', ' ')}</p>
                    {order.paymentDetails.lastFour && (
                      <p>Card ending in {order.paymentDetails.lastFour}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link to="/orders" className="btn btn-secondary w-full">
                  Back to Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail