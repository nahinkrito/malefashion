import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiChevronRight, FiPackage, FiTruck, FiCheck, FiX, FiPrinter } from 'react-icons/fi'
import { useOrders } from '../../contexts/OrderContext'
import { toast } from 'react-toastify'

function OrderView() {
  const { id } = useParams()
  const { getOrderById, updateOrderStatus } = useOrders()
  const [order, setOrder] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  
  // Fetch order data
  useEffect(() => {
    const orderData = getOrderById(id)
    if (orderData) {
      setOrder(orderData)
    }
  }, [id, getOrderById])
  
  // Update document title
  useEffect(() => {
    document.title = order ? `Order ${order.id} - Admin Dashboard` : 'Order Details - Admin Dashboard'
  }, [order])
  
  // Handle status update
  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true)
    try {
      await updateOrderStatus(id, newStatus)
      setOrder(prev => ({...prev, status: newStatus}))
      toast.success(`Order status updated to ${newStatus}`)
    } catch (error) {
      toast.error('Failed to update order status')
    } finally {
      setIsUpdating(false)
    }
  }
  
  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-secondary-900 mb-2">Order not found</h2>
        <p className="text-secondary-600 mb-6">The order you're looking for doesn't exist or has been removed.</p>
        <Link to="/admin/orders" className="btn btn-primary">
          Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Order Details</h1>
          <nav className="flex items-center text-sm mt-2">
            <Link to="/admin" className="text-secondary-500 hover:text-primary-500">Dashboard</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <Link to="/admin/orders" className="text-secondary-500 hover:text-primary-500">Orders</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-800">Order {order.id}</span>
          </nav>
        </div>
        
        <button className="btn btn-secondary">
          <FiPrinter className="mr-2" />
          Print Order
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Order Header */}
            <div className="p-6 border-b border-secondary-100">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-secondary-900">Order {order.id}</h2>
                  <p className="text-secondary-600 mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                  order.status === 'delivered' ? 'bg-success-100 text-success-800' :
                  order.status === 'shipped' ? 'bg-primary-100 text-primary-800' :
                  order.status === 'processing' ? 'bg-warning-100 text-warning-800' :
                  order.status === 'cancelled' ? 'bg-error-100 text-error-800' :
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
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Order Items</h3>
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
                        to={`/admin/products/${item.productId}`}
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
          
          {/* Status Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Update Order Status</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleStatusUpdate('processing')}
                disabled={isUpdating || order.status === 'processing'}
                className={`btn ${
                  order.status === 'processing' ? 'btn-success' : 'btn-secondary'
                }`}
              >
                Mark as Processing
              </button>
              <button
                onClick={() => handleStatusUpdate('shipped')}
                disabled={isUpdating || order.status === 'shipped'}
                className={`btn ${
                  order.status === 'shipped' ? 'btn-success' : 'btn-secondary'
                }`}
              >
                Mark as Shipped
              </button>
              <button
                onClick={() => handleStatusUpdate('delivered')}
                disabled={isUpdating || order.status === 'delivered'}
                className={`btn ${
                  order.status === 'delivered' ? 'btn-success' : 'btn-secondary'
                }`}
              >
                Mark as Delivered
              </button>
              <button
                onClick={() => handleStatusUpdate('cancelled')}
                disabled={isUpdating || order.status === 'cancelled'}
                className={`btn ${
                  order.status === 'cancelled' ? 'btn-error' : 'btn-secondary'
                }`}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Order Summary</h3>
            
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
                <h4 className="font-medium text-secondary-900 mb-2">Customer Information</h4>
                <div className="text-secondary-600">
                  <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                  <p>{order.shippingAddress.email}</p>
                  <p>{order.shippingAddress.phone}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Shipping Address</h4>
                <div className="text-secondary-600">
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Payment Information</h4>
                <div className="text-secondary-600">
                  <p className="capitalize">{order.paymentMethod.replace('_', ' ')}</p>
                  {order.paymentDetails.lastFour && (
                    <p>Card ending in {order.paymentDetails.lastFour}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderView