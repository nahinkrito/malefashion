import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiSearch, FiEye, FiMail, FiPhone } from 'react-icons/fi'

function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 'user-2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'user@example.com',
      phone: '555-987-6543',
      totalOrders: 8,
      totalSpent: 789.45,
      lastOrderDate: '2023-11-23T11:30:45Z',
      status: 'active'
    },
    {
      id: 'user-3',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike@example.com',
      phone: '555-456-7890',
      totalOrders: 3,
      totalSpent: 259.71,
      lastOrderDate: '2023-11-22T09:05:11Z',
      status: 'active'
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('lastOrder')
  const [isLoading, setIsLoading] = useState(false)

  // Update document title
  useEffect(() => {
    document.title = 'Customers - Admin Dashboard'
  }, [])

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => {
    const searchString = searchTerm.toLowerCase()
    return (
      customer.firstName.toLowerCase().includes(searchString) ||
      customer.lastName.toLowerCase().includes(searchString) ||
      customer.email.toLowerCase().includes(searchString) ||
      customer.phone.includes(searchString)
    )
  })

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
      case 'orders':
        return b.totalOrders - a.totalOrders
      case 'spent':
        return b.totalSpent - a.totalSpent
      case 'lastOrder':
      default:
        return new Date(b.lastOrderDate) - new Date(a.lastOrderDate)
    }
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Customers</h1>
          <nav className="flex items-center text-sm mt-2">
            <Link to="/admin" className="text-secondary-500 hover:text-primary-500">Dashboard</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-800">Customers</span>
          </nav>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1 min-w-[200px] max-w-md">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-secondary-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input min-w-[150px]"
            >
              <option value="lastOrder">Last Order</option>
              <option value="name">Name</option>
              <option value="orders">Total Orders</option>
              <option value="spent">Total Spent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Contact</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Orders</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-secondary-900">Total Spent</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Last Order</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-secondary-900">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-secondary-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {sortedCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 font-semibold">
                        {customer.firstName[0]}{customer.lastName[0]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-secondary-900">
                          {customer.firstName} {customer.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-secondary-600">
                      <div className="flex items-center">
                        <FiMail className="w-4 h-4 mr-1" />
                        {customer.email}
                      </div>
                      <div className="flex items-center mt-1">
                        <FiPhone className="w-4 h-4 mr-1" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-secondary-900 font-medium">{customer.totalOrders}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-secondary-900">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center text-secondary-600">
                    {new Date(customer.lastOrderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      customer.status === 'active' 
                        ? 'bg-success-100 text-success-800'
                        : 'bg-secondary-100 text-secondary-800'
                    }`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      to={`/admin/customers/${customer.id}`}
                      className="text-primary-500 hover:text-primary-600"
                    >
                      <FiEye className="inline w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}

              {sortedCustomers.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-secondary-600">
                    No customers found
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

export default Customers