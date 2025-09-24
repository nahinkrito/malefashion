import { NavLink, Link } from 'react-router-dom'
import { 
  FiHome, 
  FiShoppingBag, 
  FiUsers, 
  FiPackage, 
  FiMessageSquare, 
  FiSettings, 
  FiBarChart2, 
  FiPlusCircle, 
  FiList,
  FiTruck,
  FiMail
} from 'react-icons/fi'

function AdminSidebar({ isOpen }) {
  // Sidebar link styles
  const linkBaseClasses = "flex items-center space-x-3 py-3 px-4 rounded-md mb-1"
  const linkActiveClasses = "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
  const linkInactiveClasses = "text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400"
  
  const getLinkClasses = ({ isActive }) => {
    return `${linkBaseClasses} ${isActive ? linkActiveClasses : linkInactiveClasses} transition-colors duration-200`
  }

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white dark:bg-secondary-900 shadow-md z-40 w-64 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Sidebar header */}
      <div className="h-16 flex items-center justify-center border-b border-secondary-100 dark:border-secondary-800">
        <Link to="/admin" className="text-xl font-bold text-primary-500">
          MaleFashion Admin
        </Link>
      </div>
      
      {/* Sidebar content */}
      <div className="py-6 px-4">
        {/* Main navigation */}
        <nav>
          <p className="text-xs font-medium text-secondary-400 uppercase tracking-wider mb-4 pl-4">
            Main
          </p>
          
          <NavLink to="/admin" end className={getLinkClasses}>
            <FiHome className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
          
          <div className="mt-6">
            <p className="text-xs font-medium text-secondary-400 uppercase tracking-wider mb-4 pl-4">
              Catalog
            </p>
            
            <NavLink to="/admin/products" className={getLinkClasses}>
              <FiShoppingBag className="w-5 h-5" />
              <span>Products</span>
            </NavLink>
            
            <NavLink to="/admin/products/add" className={getLinkClasses}>
              <FiPlusCircle className="w-5 h-5" />
              <span>Add Product</span>
            </NavLink>
          </div>
          
          <div className="mt-6">
            <p className="text-xs font-medium text-secondary-400 uppercase tracking-wider mb-4 pl-4">
              Orders & Shipping
            </p>
            
            <NavLink to="/admin/orders" className={getLinkClasses}>
              <FiPackage className="w-5 h-5" />
              <span>Orders</span>
            </NavLink>

            <NavLink to="/admin/shipments" className={getLinkClasses}>
              <FiTruck className="w-5 h-5" />
              <span>Shipments</span>
            </NavLink>
          </div>
          
          <div className="mt-6">
            <p className="text-xs font-medium text-secondary-400 uppercase tracking-wider mb-4 pl-4">
              Users
            </p>
            
            <NavLink to="/admin/customers" className={getLinkClasses}>
              <FiUsers className="w-5 h-5" />
              <span>Customers</span>
            </NavLink>
          </div>
          
          <div className="mt-6">
            <p className="text-xs font-medium text-secondary-400 uppercase tracking-wider mb-4 pl-4">
              Communication
            </p>
            
            <NavLink to="/admin/inquiries" className={getLinkClasses}>
              <FiMessageSquare className="w-5 h-5" />
              <span>Customer Inquiries</span>
            </NavLink>

            <NavLink to="/admin/support" className={getLinkClasses}>
              <FiMail className="w-5 h-5" />
              <span>Support Tickets</span>
            </NavLink>
          </div>
          
          <div className="mt-6">
            <p className="text-xs font-medium text-secondary-400 uppercase tracking-wider mb-4 pl-4">
              Reports
            </p>
            
            <NavLink to="/admin/reports" className={getLinkClasses}>
              <FiBarChart2 className="w-5 h-5" />
              <span>Sales Report</span>
            </NavLink>
          </div>
          
          <div className="mt-6">
            <p className="text-xs font-medium text-secondary-400 uppercase tracking-wider mb-4 pl-4">
              Settings
            </p>
            
            <NavLink to="/admin/settings" className={getLinkClasses}>
              <FiSettings className="w-5 h-5" />
              <span>Store Settings</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default AdminSidebar