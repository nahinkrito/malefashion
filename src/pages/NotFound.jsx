import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

function NotFound() {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-secondary-600 dark:text-secondary-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center btn btn-primary"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound