import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiShoppingBag, 
  FiUsers, 
  FiDollarSign, 
  FiPackage,
  FiArrowUp,
  FiArrowDown,
  FiEye
} from 'react-icons/fi'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { useProducts } from '../../contexts/ProductContext'
import { useOrders } from '../../contexts/OrderContext'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

function Dashboard() {
  const { products } = useProducts()
  const { orders } = useOrders()
  
  // Update document title
  useEffect(() => {
    document.title = 'Admin Dashboard - MaleFashion'
  }, [])
  
  // Sales data for chart
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [2100, 1900, 2300, 2800, 2600, 3100, 3300, 3400, 3800, 4200, 4500, 4700],
        backgroundColor: 'rgba(0, 50, 138, 0.6)',
        borderColor: 'rgba(0, 50, 138, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      }
    ]
  }
  
  // Orders data for chart
  const ordersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Orders',
        data: [42, 38, 46, 56, 52, 62, 66, 68, 76, 84, 90, 94],
        backgroundColor: 'rgba(255, 106, 0, 0.7)',
        borderRadius: 4,
      }
    ]
  }
  
  // Sales by category
  const categoryData = {
    labels: ['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          'rgba(0, 50, 138, 0.8)',
          'rgba(255, 106, 0, 0.8)',
          'rgba(68, 102, 178, 0.8)',
          'rgba(235, 86, 0, 0.8)',
          'rgba(108, 142, 218, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  }
  
  // Order status
  const orderStatusData = {
    labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [
      {
        data: [15, 25, 20, 35, 5],
        backgroundColor: [
          'rgba(255, 195, 0, 0.8)',
          'rgba(0, 176, 36, 0.8)',
          'rgba(0, 115, 230, 0.8)',
          'rgba(77, 145, 70, 0.8)',
          'rgba(225, 33, 33, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  }
  
  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }
  
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }
  
  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          boxWidth: 12,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    cutout: '70%',
  }
  
  // Calculate total revenue
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  
  // Get recent orders
  const recentOrders = [...orders].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 5)
  
  // Get low stock products
  const lowStockProducts = [...products]
    .filter(product => product.stockQuantity < 20)
    .sort((a, b) => a.stockQuantity - b.stockQuantity)
    .slice(0, 5)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-secondary-900">Dashboard</h1>
        <div>
          <button className="btn btn-primary">
            Generate Report
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full">
              <FiDollarSign className="w-6 h-6 text-primary-500" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-secondary-500">Total Revenue</h2>
              <p className="text-xl font-semibold text-secondary-900">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs font-medium text-success-600 flex items-center">
              <FiArrowUp className="w-3 h-3 mr-1" /> 12.5%
            </span>
            <span className="text-xs text-secondary-500 ml-2">vs. last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-secondary-100 p-3 rounded-full">
              <FiShoppingBag className="w-6 h-6 text-secondary-500" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-secondary-500">Products</h2>
              <p className="text-xl font-semibold text-secondary-900">{products.length}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs font-medium text-success-600 flex items-center">
              <FiArrowUp className="w-3 h-3 mr-1" /> 8.2%
            </span>
            <span className="text-xs text-secondary-500 ml-2">vs. last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-accent-100 p-3 rounded-full">
              <FiPackage className="w-6 h-6 text-accent-500" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-secondary-500">Orders</h2>
              <p className="text-xl font-semibold text-secondary-900">{orders.length}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs font-medium text-error-600 flex items-center">
              <FiArrowDown className="w-3 h-3 mr-1" /> 3.1%
            </span>
            <span className="text-xs text-secondary-500 ml-2">vs. last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-success-100 p-3 rounded-full">
              <FiUsers className="w-6 h-6 text-success-500" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-secondary-500">Customers</h2>
              <p className="text-xl font-semibold text-secondary-900">143</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs font-medium text-success-600 flex items-center">
              <FiArrowUp className="w-3 h-3 mr-1" /> 10.3%
            </span>
            <span className="text-xs text-secondary-500 ml-2">vs. last month</span>
          </div>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-secondary-900">Revenue Overview</h3>
            <div className="text-sm text-secondary-500">
              <select className="bg-transparent border-none focus:outline-none pr-8">
                <option>Last 12 Months</option>
                <option>Last 6 Months</option>
                <option>Last 30 Days</option>
              </select>
            </div>
          </div>
          <div className="h-72">
            <Line data={salesData} options={lineChartOptions} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-secondary-900">Orders Overview</h3>
            <div className="text-sm text-secondary-500">
              <select className="bg-transparent border-none focus:outline-none pr-8">
                <option>Last 12 Months</option>
                <option>Last 6 Months</option>
                <option>Last 30 Days</option>
              </select>
            </div>
          </div>
          <div className="h-72">
            <Bar data={ordersData} options={barChartOptions} />
          </div>
        </div>
      </div>
      
      {/* Additional Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-secondary-900">Sales by Category</h3>
          </div>
          <div className="h-64">
            <Doughnut data={categoryData} options={doughnutChartOptions} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-secondary-900">Order Status</h3>
          </div>
          <div className="h-64">
            <Doughnut data={orderStatusData} options={doughnutChartOptions} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-secondary-900">Low Stock Products</h3>
            <Link to="/admin/products" className="text-primary-500 hover:text-primary-600 text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {lowStockProducts.map(product => (
              <div key={product.id} className="flex items-center">
                <img 
                  src={product.mainImage} 
                  alt={product.name} 
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="ml-3 flex-grow">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-secondary-900 truncate">{product.name}</h4>
                    <span className={`text-sm font-medium ${
                      product.stockQuantity < 10 ? 'text-error-600' : 'text-warning-600'
                    }`}>
                      {product.stockQuantity} left
                    </span>
                  </div>
                  <div className="mt-1 w-full bg-secondary-100 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        product.stockQuantity < 10 ? 'bg-error-500' : 'bg-warning-500'
                      }`}
                      style={{ width: `${Math.min((product.stockQuantity / 50) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            
            {lowStockProducts.length === 0 && (
              <p className="text-secondary-500 text-sm text-center py-4">
                All products are well-stocked
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-secondary-900">Recent Orders</h3>
          <Link to="/admin/orders" className="text-primary-500 hover:text-primary-600 text-sm font-medium">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary-50">
                <th className="px-4 py-3 text-left font-semibold text-secondary-900">Order ID</th>
                <th className="px-4 py-3 text-left font-semibold text-secondary-900">Customer</th>
                <th className="px-4 py-3 text-left font-semibold text-secondary-900">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-secondary-900">Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-secondary-900">Status</th>
                <th className="px-4 py-3 text-right font-semibold text-secondary-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-secondary-50">
                  <td className="px-4 py-4">{order.id}</td>
                  <td className="px-4 py-4">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </td>
                  <td className="px-4 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      order.status === 'delivered' ? 'bg-success-100 text-success-800' :
                      order.status === 'shipped' ? 'bg-primary-100 text-primary-800' :
                      order.status === 'processing' ? 'bg-warning-100 text-warning-800' :
                      'bg-secondary-100 text-secondary-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link 
                      to={`/admin/orders/${order.id}`} 
                      className="text-primary-500 hover:text-primary-600"
                    >
                      <FiEye className="inline w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
              
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-secondary-500">
                    No orders found
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

export default Dashboard