import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiTruck, FiPackage, FiMapPin, FiCalendar } from 'react-icons/fi'

function Shipments() {
  const [shipments, setShipments] = useState([
    {
      id: 'ship-1',
      orderId: 'order-1',
      status: 'in_transit',
      trackingNumber: 'TRK123456789',
      carrier: 'FedEx',
      estimatedDelivery: '2024-03-20',
      customer: {
        name: 'Jane Smith',
        address: '456 User Ave, Los Angeles, CA 90001'
      },
      createdAt: '2024-03-15T10:00:00Z'
    },
    {
      id: 'ship-2',
      orderId: 'order-2',
      status: 'pending',
      trackingNumber: null,
      carrier: null,
      estimatedDelivery: null,
      customer: {
        name: 'Mike Johnson',
        address: '789 Oak St, Chicago, IL 60007'
      },
      createdAt: '2024-03-16T14:30:00Z'
    }
  ])

  useEffect(() => {
    document.title = 'Shipments - Admin Dashboard'
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900 dark:text-white">Shipments</h1>
          <nav className="flex items-center text-sm mt-2">
            <Link to="/admin" className="text-secondary-500 dark:text-secondary-400 hover:text-primary-500">Dashboard</Link>
            <FiChevronRight className="mx-2 text-secondary-400 dark:text-secondary-600" />
            <span className="text-secondary-800 dark:text-secondary-200">Shipments</span>
          </nav>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500">
              <FiTruck className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Total Shipments</h3>
              <p className="text-2xl font-semibold text-secondary-900 dark:text-white">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning-100 dark:bg-warning-900/20 text-warning-500">
              <FiPackage className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Pending</h3>
              <p className="text-2xl font-semibold text-secondary-900 dark:text-white">23</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500">
              <FiTruck className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">In Transit</h3>
              <p className="text-2xl font-semibold text-secondary-900 dark:text-white">45</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100 dark:bg-success-900/20 text-success-500">
              <FiPackage className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Delivered</h3>
              <p className="text-2xl font-semibold text-secondary-900 dark:text-white">88</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-secondary-100 dark:border-secondary-700">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">Recent Shipments</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Shipment ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Tracking</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100 dark:divide-secondary-700">
              {shipments.map(shipment => (
                <tr key={shipment.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700/50">
                  <td className="px-6 py-4 text-sm text-secondary-900 dark:text-white">{shipment.id}</td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/admin/orders/${shipment.orderId}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {shipment.orderId}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-secondary-900 dark:text-white">{shipment.customer.name}</p>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">{shipment.customer.address}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      shipment.status === 'delivered' ? 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400' :
                      shipment.status === 'in_transit' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400' :
                      'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400'
                    }`}>
                      {shipment.status === 'in_transit' ? 'In Transit' :
                       shipment.status === 'delivered' ? 'Delivered' :
                       'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {shipment.trackingNumber ? (
                      <div>
                        <p className="text-secondary-900 dark:text-white">{shipment.trackingNumber}</p>
                        <p className="text-sm text-secondary-500 dark:text-secondary-400">{shipment.carrier}</p>
                      </div>
                    ) : (
                      <span className="text-secondary-500 dark:text-secondary-400">Not available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-secondary-500 dark:text-secondary-400">
                    {new Date(shipment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Shipments