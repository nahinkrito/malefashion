import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiChevronRight, FiMail, FiPhone, FiMapPin, FiPackage, FiDollarSign, FiCalendar } from 'react-icons/fi'
import { useOrders } from '../../contexts/OrderContext'

function CustomerDetail() {
  const { id } = useParams()
  const { orders } = useOrders()
  const [customer, setCustomer] = useState(null)
  const [customerOrders, setCustomerOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        // In a real app, this would be an API call
        // For now, simulate API delay and use mock data
        await new Promise(resolve => setTimeout(resolve, 800))
        
        setCustomer({
          id,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phone: '555-987-6543',
          address: {
            street: '456 User Ave',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90001',
            country: 'USA'
          },
          createdAt: '2023-02-15T00:00:00Z',
          totalOrders: 8,
          totalSpent: 789.45,
          lastOrderDate: '2023-11-23T11:30:45Z'
        })
        
        // Filter orders for this customer
        const customerOrders = orders.filter(order => order.userId === id)
        setCustomerOrders(customerOrders)
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching customer:', error)
        setIsLoading(false)
      }
    }
    
    fetchCustomer()
  }, [id, orders])
  
  // Update document title
  useEffect(() => {
    document.title = customer 
      ? `${customer.firstName} ${customer.lastName} - Customer Details` 
      : 'Customer Details'
  }, [customer])
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }
  
  if (!customer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-secondary-900 mb-2">Customer not found</h2>
        <p className="text-secondary-600 mb-6">The customer you're looking for doesn't exist or has been removed.</p>
        <Link to="/admin/customers" className="btn btn-primary">
          Back to Customers
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Customer Details</h1>
          <nav className="flex items-center text-sm mt-2">
            <Link to="/admin" className="text-secondary-500 hover:text-primary-500">Dashboard</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <Link to="/admin/customers" className="text-secondary-500 hover:text-primary-500">Customers</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-800">{customer.firstName} {customer.lastName}</span>
          </nav>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-secondary-100">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
                  <span className="text-2xl font-semibold">
                    {customer.firstName[0]}{customer.lastName[0]}
                  </span>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-secondary-900">
                    {customer.firstName} {customer.lastName}
                  </h2>
                  <p className="text-secondary-600">Customer</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiMail className="w-5 h-5 text-secondary-500 mt-1" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-secondary-700">Email</p>
                    <p className="text-secondary-600">{customer.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiPhone className="w-5 h-5 text-secondary-500 mt-1" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-secondary-700">Phone</p>
                    <p className="text-secondary-600">{customer.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiMapPin className="w-5 h-5 text-secondary-500 mt-1" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-secondary-700">Address</p>
                    <p className="text-secondary-600">
                      {customer.address.street}<br />
                      {customer.address.city}, {customer.address.state} {customer.address.zipCode}<br />
                      {customer.address.country}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCalendar className="w-5 h-5 text-secondary-500 mt-1" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-secondary-700">Customer Since</p>
                    <p className="text-secondary-600">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Customer Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <FiPackage className="w-6 h-6 text-primary-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-secondary-600">Total Orders</p>
                  <p className="text-xl font-semibold text-secondary-900">{customer.totalOrders}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                  <FiDollarSign className="w-6 h-6 text-success-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-secondary-600">Total Spent</p>
                  <p className="text-xl font-semibold text-secondary-900">
                    ${customer.totalSpent.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-secondary-100">
              <h2 className="text-lg font-semibold text-secondary-900">Order History</h2>
            </div>
            
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
                  {customerOrders.map(order => (
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
                          to={`/admin/orders/${order.id}`}
                          className="text-primary-500 hover:text-primary-600 font-medium"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                  
                  {customerOrders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-secondary-600">
                        No orders found for this customer.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetail