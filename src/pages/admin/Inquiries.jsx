import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiSearch, FiMail, FiPhone, FiMessageSquare, FiCheck, FiX } from 'react-icons/fi'

function Inquiries() {
  const [inquiries, setInquiries] = useState([
    {
      id: 'inq-1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '555-123-4567',
      subject: 'Product Availability',
      message: 'I would like to know when the leather jacket in size L will be back in stock.',
      status: 'pending',
      createdAt: '2024-02-15T10:30:00Z'
    },
    {
      id: 'inq-2',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '555-987-6543',
      subject: 'Order Status',
      message: 'Could you please provide an update on my order #12345?',
      status: 'resolved',
      createdAt: '2024-02-14T15:45:00Z',
      resolvedAt: '2024-02-14T16:30:00Z'
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  // Update document title
  useEffect(() => {
    document.title = 'Customer Inquiries - Admin Dashboard'
  }, [])

  // Filter inquiries based on search term and status
  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = (
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Handle status change
  const handleStatusChange = (inquiryId, newStatus) => {
    setInquiries(prev => prev.map(inquiry => {
      if (inquiry.id === inquiryId) {
        return {
          ...inquiry,
          status: newStatus,
          resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : null
        }
      }
      return inquiry
    }))
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Customer Inquiries</h1>
          <nav className="flex items-center text-sm mt-2">
            <Link to="/admin" className="text-secondary-500 hover:text-primary-500">Dashboard</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-800">Inquiries</span>
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
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-secondary-700">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input min-w-[150px]"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.map(inquiry => (
          <div key={inquiry.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900">{inquiry.subject}</h3>
                  <p className="text-secondary-600 text-sm">
                    From: {inquiry.name}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    inquiry.status === 'resolved' 
                      ? 'bg-success-100 text-success-800'
                      : 'bg-warning-100 text-warning-800'
                  }`}>
                    {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                  </span>
                  <span className="text-sm text-secondary-500">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-secondary-600 mb-4">
                <div className="flex items-center">
                  <FiMail className="w-4 h-4 mr-2" />
                  {inquiry.email}
                </div>
                <div className="flex items-center">
                  <FiPhone className="w-4 h-4 mr-2" />
                  {inquiry.phone}
                </div>
              </div>

              <div className="bg-secondary-50 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <FiMessageSquare className="w-5 h-5 text-secondary-500 mt-1" />
                  <p className="ml-3 text-secondary-700">{inquiry.message}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-secondary-500">
                  {inquiry.resolvedAt && (
                    <span>Resolved on {new Date(inquiry.resolvedAt).toLocaleDateString()}</span>
                  )}
                </div>
                <div className="flex space-x-3">
                  {inquiry.status === 'pending' ? (
                    <button
                      onClick={() => handleStatusChange(inquiry.id, 'resolved')}
                      className="btn btn-success btn-sm"
                    >
                      <FiCheck className="w-4 h-4 mr-1" />
                      Mark as Resolved
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(inquiry.id, 'pending')}
                      className="btn btn-warning btn-sm"
                    >
                      <FiX className="w-4 h-4 mr-1" />
                      Reopen
                    </button>
                  )}
                  <button className="btn btn-primary btn-sm">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredInquiries.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <FiMessageSquare className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">No inquiries found</h3>
            <p className="text-secondary-600">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'There are no customer inquiries at the moment'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Inquiries