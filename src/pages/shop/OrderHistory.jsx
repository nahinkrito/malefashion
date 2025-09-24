import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiEye } from 'react-icons/fi'
import { useOrders } from '../../contexts/OrderContext'

function OrderHistory() {
  const { getUserOrders, isLoading } = useOrders()
  const orders = getUserOrders()
  
  // Update document title
  useEffect(() => {
    document.title = 'Order History - MaleFashion'
  }, [])

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-5 mb-8">
        <div className="container">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-secondary-500 hover:text-primary-500">Home</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-900">Order History</span>
          </div>
        </div>
      </div>
      
      <div className="container">
        <h1 className="text-3xl font-bold text-secondary-900 mb-8">My Orders</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
            <p className="text-secondary-600 mb-8">
              You haven't placed any orders yet.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-secondary-900">Total</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-secondary-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-secondary-50">
                      <td className="px-6 py-4 text-secondary-900">{order.id}</td>
                      <td className="px-6 py-4 text-secondary-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          order.status === 'delivered' ? 'bg-success-100 text-success-800' :
                          order.status === 'shipped' ? 'bg-primary-100 text-primary-800' :
                          order.status === 'processing' ? 'bg-warning-100 text-warning-800' :
                          'bg-secondary-100 text-secondary-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-secondary-900">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          to={`/orders/${order.id}`}
                          className="text-primary-500 hover:text-primary-600"
                        >
                          <FiEye className="inline w-5 h-5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory