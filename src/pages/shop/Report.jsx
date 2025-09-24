import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiAlertCircle } from 'react-icons/fi'
import { toast } from 'react-toastify'

function Report() {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    type: 'bug',
    priority: 'medium'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  useEffect(() => {
    document.title = 'Report Issue - MaleFashion'
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success('Report submitted successfully')
    setFormData({
      subject: '',
      description: '',
      type: 'bug',
      priority: 'medium'
    })
    setIsSubmitting(false)
  }

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 dark:bg-secondary-800 py-5 mb-8">
        <div className="container">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-secondary-500 dark:text-secondary-400 hover:text-primary-500">Home</Link>
            <FiChevronRight className="mx-2 text-secondary-400 dark:text-secondary-600" />
            <span className="text-secondary-900 dark:text-white">Report Issue</span>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-6">Report an Issue</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="form-input dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="form-input dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
                  required
                >
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="account">Account Issue</option>
                  <option value="order">Order Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Priority *
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="form-input dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="6"
                  className="form-input dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className={`btn btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Report'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report