import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiSave, FiGlobe, FiDollarSign, FiTruck, FiMail } from 'react-icons/fi'
import { toast } from 'react-toastify'

function Settings() {
  const [activeTab, setActiveTab] = useState('general')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [settings, setSettings] = useState({
    // General Settings
    storeName: 'MaleFashion',
    storeEmail: 'contact@malefashion.com',
    phoneNumber: '(+1) 234 5678 900',
    address: '1234 Fashion Avenue, New York, NY 10001',
    currency: 'USD',
    timezone: 'America/New_York',
    
    // Payment Settings
    enableStripe: true,
    enablePayPal: false,
    testMode: true,
    stripePublishableKey: '',
    stripeSecretKey: '',
    paypalClientId: '',
    paypalSecretKey: '',
    
    // Shipping Settings
    enableFreeShipping: true,
    freeShippingThreshold: 99,
    standardShippingRate: 9.99,
    expressShippingRate: 19.99,
    enableInternationalShipping: false,
    
    // Email Settings
    enableOrderConfirmation: true,
    enableShippingUpdates: true,
    enableMarketingEmails: true,
    senderName: 'MaleFashion Store',
    senderEmail: 'noreply@malefashion.com'
  })
  
  // Update document title
  useEffect(() => {
    document.title = 'Store Settings - Admin Dashboard'
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Settings updated successfully')
    } catch (error) {
      toast.error('Failed to update settings')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Store Settings</h1>
          <nav className="flex items-center text-sm mt-2">
            <Link to="/admin" className="text-secondary-500 hover:text-primary-500">Dashboard</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-800">Settings</span>
          </nav>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        {/* Tabs */}
        <div className="border-b border-secondary-100">
          <div className="flex">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'general'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700'
              }`}
            >
              <FiGlobe className="inline-block mr-2" />
              General
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'payment'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700'
              }`}
            >
              <FiDollarSign className="inline-block mr-2" />
              Payment
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'shipping'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700'
              }`}
            >
              <FiTruck className="inline-block mr-2" />
              Shipping
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'email'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700'
              }`}
            >
              <FiMail className="inline-block mr-2" />
              Email
            </button>
          </div>
        </div>
        
        {/* Settings Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    value={settings.storeName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Store Email
                  </label>
                  <input
                    type="email"
                    name="storeEmail"
                    value={settings.storeEmail}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={settings.phoneNumber}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={settings.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="form-input"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={settings.currency}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                      <option value="CAD">Canadian Dollar (CAD)</option>
                      <option value="AUD">Australian Dollar (AUD)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Timezone
                    </label>
                    <select
                      name="timezone"
                      value={settings.timezone}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Payment Settings */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="bg-secondary-50 p-4 rounded-md">
                  <p className="text-sm text-secondary-600">
                    Configure your payment gateway settings. Make sure to use test credentials in test mode.
                  </p>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="testMode"
                      checked={settings.testMode}
                      onChange={handleInputChange}
                      className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded"
                    />
                    <span className="ml-2 text-secondary-700">Enable Test Mode</span>
                  </label>
                </div>
                
                <div className="border-t border-secondary-100 pt-6">
                  <h3 className="text-lg font-medium text-secondary-900 mb-4">Stripe Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="enableStripe"
                          checked={settings.enableStripe}
                          onChange={handleInputChange}
                          className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded"
                        />
                        <span className="ml-2 text-secondary-700">Enable Stripe Payments</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Publishable Key
                      </label>
                      <input
                        type="text"
                        name="stripePublishableKey"
                        value={settings.stripePublishableKey}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder={settings.testMode ? 'pk_test_...' : 'pk_live_...'}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Secret Key
                      </label>
                      <input
                        type="password"
                        name="stripeSecretKey"
                        value={settings.stripeSecretKey}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder={settings.testMode ? 'sk_test_...' : 'sk_live_...'}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-secondary-100 pt-6">
                  <h3 className="text-lg font-medium text-secondary-900 mb-4">PayPal Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="enablePayPal"
                          checked={settings.enablePayPal}
                          onChange={handleInputChange}
                          className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded"
                        />
                        <span className="ml-2 text-secondary-700">Enable PayPal Payments</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Client ID
                      </label>
                      <input
                        type="text"
                        name="paypalClientId"
                        value={settings.paypalClientId}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Secret Key
                      </label>
                      <input
                        type="password"
                        name="paypalSecretKey"
                        value={settings.paypalSecretKey}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Shipping Settings */}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="enableFreeShipping"
                      checked={settings.enableFreeShipping}
                      onChange={handleInputChange}
                      className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded"
                    />
                    <span className="ml-2 text-secondary-700">Enable Free Shipping</span>
                  </label>
                </div>
                
                {settings.enableFreeShipping && (
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Free Shipping Threshold ($)
                    </label>
                    <input
                      type="number"
                      name="freeShippingThreshold"
                      value={settings.freeShippingThreshold}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="form-input"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Standard Shipping Rate ($)
                    </label>
                    <input
                      type="number"
                      name="standardShippingRate"
                      value={settings.standardShippingRate}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="form-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Express Shipping Rate ($)
                    </label>
                    <input
                      type="number"
                      name="expressShippingRate"
                      value={settings.expressShippingRate}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="enableInternationalShipping"
                      checked={settings.enableInternationalShipping}
                      onChange={handleInputChange}
                      className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded"
                    />
                    <span className="ml-2 text-secondary-700">Enable International Shipping</span>
                  </label>
                </div>
              </div>
            )}
            
            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <div className="bg-secondary-50 p-4 rounded-md">
                  <p className="text-sm text-secondary-600">
                    Configure your email notification settings and templates.
                  </p>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="enableOrderConfirmation"
                      checked={settings.enableOrderConfirmation}
                      onChange={handleInputChange}
                      className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded"
                    />
                    <span className="ml-2 text-secondary-700">Send Order Confirmation Emails</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="enableShippingUpdates"
                      checked={settings.enableShippingUpdates}
                      onChange={handleInputChange}
                      className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded"
                    />
                    <span className="ml-2 text-secondary-700">Send Shipping Update Emails</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="enableMarketingEmails"
                      checked={settings.enableMarketingEmails}
                      onChange={handleInputChange}
                      className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded"
                    />
                    <span className="ml-2 text-secondary-700">Send Marketing Emails</span>
                  </label>
                </div>
                
                <div className="border-t border-secondary-100 pt-6">
                  <h3 className="text-lg font-medium text-secondary-900 mb-4">Email Sender Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Sender Name
                      </label>
                      <input
                        type="text"
                        name="senderName"
                        value={settings.senderName}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Sender Email
                      </label>
                      <input
                        type="email"
                        name="senderEmail"
                        value={settings.senderEmail}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Form Actions */}
          <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-100">
            <div className="flex justify-end">
              <button
                type="submit"
                className={`btn btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <FiSave className="mr-2" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings