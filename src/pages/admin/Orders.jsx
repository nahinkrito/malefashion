import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiSearch, FiEye, FiDownload } from 'react-icons/fi'
import { useOrders } from '../../contexts/OrderContext'

function Orders() {
  const { orders } = useOrders()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })

  // Update document title
  useEffect(() => {
    document.title = 'Orders - Admin Dashboard'
  }, [])

  // Filter orders based on search, status, and date range
  const filteredOrders = orders.filter(order => {
    const matchesSearch = (
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    const matchesDateRange = (!dateRange.start || new Date(order.createdAt) >= new Date(dateRange.start)) &&
                           (!dateRange.end || new Date(order.createdAt) <= new Date(dateRange.end))
    
    return matchesSearch && matchesStatus && matchesDateRange
  })

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'total':
        return b.total - a.total
      case 'status':
        return a.status.localeCompare(b.status)
      default:
        return 0
    }
  })

  // Calculate total sales
  const totalSales = sortedOrders.reduce((sum, order) => sum + order.total, 0)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Orders</h1>
          <nav className="flex items-center text-sm mt-2">
            <Link to="/admin" className="text-secondary-500 hover:text-primary-500">Dashboard</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-800">Orders</span>
          </nav>
        </div>
        
        <button className="btn btn-primary">
          <FiDownload className="mr-2" />
          Export Orders
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-secondary-500">Total Orders</h3>
          <p className="text-2xl font-semibold text-secondary-900 mt-2">{orders.length}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-secondary-500">Total Sales</h3>
          <p className="text-2xl font-semibold text-primary-500 mt-2">${totalSales.toFixed(2)}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-secondary-500">Pending Orders</h3>
          <p className="text-2xl font-semibold text-warning-500 mt-2">
            {orders.filter(order => order.status === 'pending').length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-secondary-500">Delivered Orders</h3>
          <p className="text-2xl font-semibold text-success-500 mt-2">
            {orders.filter(order => order.status === 'delivered').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input w-full"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="form-input w-full"
              placeholder="Start Date"
            />
          </div>
          
          <div>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="form-input w-full"
              placeholder="End Date"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Customer</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Date</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-secondary-900">Total</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-secondary-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {sortedOrders.map(order => (
                <tr key={order.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4 text-secondary-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-secondary-900">
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                      </div>
                      <div className="text-sm text-secondary-500">{order.shippingAddress.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-secondary-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      order.status === 'delivered' ? 'bg-success-100 text-success-800' :
                      order.status === 'shipped' ? 'bg-primary-100 text-primary-800' :
                      order.status === 'processing' ? 'bg-warning-100 text-warning-800' :
                      order.status === 'cancelled' ? 'bg-error-100 text-error-800' :
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
                      to={`/admin/orders/${order.id}`}
                      className="text-primary-500 hover:text-primary-600"
                    >
                      <FiEye className="inline w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}

              {sortedOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-secondary-600">
                    No orders found
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

export default Orders