import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiMessageSquare, FiUser, FiClock, FiTag } from 'react-icons/fi'

function Support() {
  const [tickets, setTickets] = useState([
    {
      id: 'ticket-1',
      subject: 'Order Delivery Delay',
      customer: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com'
      },
      status: 'open',
      priority: 'high',
      category: 'shipping',
      createdAt: '2024-03-15T10:00:00Z',
      lastUpdated: '2024-03-15T14:30:00Z'
    },
    {
      id: 'ticket-2',
      subject: 'Product Size Issue',
      customer: {
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com'
      },
      status: 'in_progress',
      priority: 'medium',
      category: 'product',
      createdAt: '2024-03-14T15:00:00Z',
      lastUpdated: '2024-03-15T09:20:00Z'
    }
  ])

  useEffect(() => {
    document.title = 'Support Tickets - Admin Dashboard'
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900 dark:text-white">Support Tickets</h1>
          <nav className="flex items-center text-sm mt-2">
            <Link to="/admin" className="text-secondary-500 dark:text-secondary-400 hover:text-primary-500">Dashboard</Link>
            <FiChevronRight className="mx-2 text-secondary-400 dark:text-secondary-600" />
            <span className="text-secondary-800 dark:text-secondary-200">Support Tickets</span>
          </nav>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500">
              <FiMessageSquare className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Total Tickets</h3>
              <p className="text-2xl font-semibold text-secondary-900 dark:text-white">45</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning-100 dark:bg-warning-900/20 text-warning-500">
              <FiClock className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Open</h3>
              <p className="text-2xl font-semibold text-secondary-900 dark:text-white">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500">
              <FiUser className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">In Progress</h3>
              <p className="text-2xl font-semibold text-secondary-900 dark:text-white">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100 dark:bg-success-900/20 text-success-500">
              <FiTag className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Resolved</h3>
              <p className="text-2xl font-semibold text-secondary-900 dark:text-white">25</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-secondary-100 dark:border-secondary-700">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">Recent Tickets</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Ticket ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Priority</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900 dark:text-white">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100 dark:divide-secondary-700">
              {tickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700/50">
                  <td className="px-6 py-4 text-sm text-secondary-900 dark:text-white">{ticket.id}</td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/admin/support/${ticket.id}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {ticket.subject}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-secondary-900 dark:text-white">{ticket.customer.name}</p>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">{ticket.customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      ticket.status === 'resolved' ? 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400' :
                      ticket.status === 'in_progress' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400' :
                      'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400'
                    }`}>
                      {ticket.status.replace('_', ' ').charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      ticket.priority === 'high' ? 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400' :
                      ticket.priority === 'medium' ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400' :
                      'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400'
                    }`}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-secondary-500 dark:text-secondary-400">
                      {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary-500 dark:text-secondary-400">
                    {new Date(ticket.lastUpdated).toLocaleDateString()}
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

export default Support