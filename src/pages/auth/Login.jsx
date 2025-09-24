import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiUser, FiLock, FiAlertCircle } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Extract redirect URL from query parameters
  const queryParams = new URLSearchParams(location.search)
  const redirectUrl = queryParams.get('redirect') || '/'
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectUrl)
    }
  }, [isAuthenticated, navigate, redirectUrl])
  
  // Update document title
  useEffect(() => {
    document.title = 'Login - MaleFashion'
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    setIsLoading(true)
    
    try {
      await login(email, password)
      // Redirect happens automatically in the useEffect
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <Link to="/" className="inline-block text-2xl font-bold">
              <span className="text-primary-500">MALE</span>
              <span className="text-secondary-900">FASHION</span>
            </Link>
            <h1 className="mt-6 text-3xl font-semibold text-secondary-900">Welcome back</h1>
            <p className="mt-2 text-secondary-600">Sign in to your account</p>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="mb-6 p-3 bg-error-50 text-error-700 rounded-md flex items-start">
              <FiAlertCircle className="w-5 h-5 mr-2 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiUser className="w-5 h-5 text-secondary-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="form-input pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiLock className="w-5 h-5 text-secondary-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input pl-10"
                  required
                />
              </div>
              <div className="flex justify-end mt-1">
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-secondary-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
            
            {/* Demo credentials */}
            <div className="border-t border-secondary-100 pt-4 mt-6">
              <p className="text-sm text-secondary-500 text-center mb-2">Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-secondary-50 rounded">
                  <p><strong>Admin:</strong> admin@example.com</p>
                  <p><strong>Pass:</strong> admin123</p>
                </div>
                <div className="p-2 bg-secondary-50 rounded">
                  <p><strong>Customer:</strong> user@example.com</p>
                  <p><strong>Pass:</strong> user123</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login