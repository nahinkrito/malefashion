import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

function UserProfile() {
  const { currentUser, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    street: currentUser?.address?.street || '',
    city: currentUser?.address?.city || '',
    state: currentUser?.address?.state || '',
    zipCode: currentUser?.address?.zipCode || '',
    country: currentUser?.address?.country || 'USA'
  })
  const [isLoading, setIsLoading] = useState(false)
  
  // Update document title
  useEffect(() => {
    document.title = 'My Profile - MaleFashion'
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await updateProfile({
        ...formData,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        }
      })
      
      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-5 mb-8">
        <div className="container">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-secondary-500 hover:text-primary-500">Home</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-900">My Profile</span>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Profile Header */}
            <div className="p-6 bg-secondary-900 text-white">
              <div className="flex items-center">
                <div className="w-20 h-20 rounded-full bg-secondary-700 flex items-center justify-center">
                  <FiUser className="w-10 h-10" />
                </div>
                <div className="ml-6">
                  <h1 className="text-2xl font-semibold">
                    {currentUser.firstName} {currentUser.lastName}
                  </h1>
                  <p className="text-secondary-300">{currentUser.email}</p>
                </div>
              </div>
            </div>
            
            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({...formData, street: e.target.value})}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    disabled={!isEditing}
                    className="form-input"
                  >
                    <option value="USA">United States</option>
                    <option value="CAN">Canada</option>
                    <option value="GBR">United Kingdom</option>
                    <option value="AUS">Australia</option>
                    <option value="DEU">Germany</option>
                    <option value="FRA">France</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false)
                        setFormData({
                          firstName: currentUser.firstName,
                          lastName: currentUser.lastName,
                          email: currentUser.email,
                          phone: currentUser.phone,
                          street: currentUser.address?.street || '',
                          city: currentUser.address?.city || '',
                          state: currentUser.address?.state || '',
                          zipCode: currentUser.address?.zipCode || '',
                          country: currentUser.address?.country || 'USA'
                        })
                      }}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`btn btn-primary ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Saving...
                        </div>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile