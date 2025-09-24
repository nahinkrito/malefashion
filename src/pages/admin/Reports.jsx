import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiDownload } from 'react-icons/fi'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { useOrders } from '../../contexts/OrderContext'

function Reports() {
  const { orders } = useOrders()
  const [dateRange, setDateRange] = useState('month')
  const [reportType, setReportType] = useState('sales')

  // Update document title
  useEffect(() => {
    document.title = 'Reports - Admin Dashboard'
  }, [])

  // Sample data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [2100, 1900, 2300, 2800, 2600, 3100],
      borderColor: 'rgb(0, 50, 138)',
      backgroundColor: 'rgba(0, 50, 138, 0.1)',
      fill: true,
    }]
  }

  const categoryData = {
    labels: ['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories'],
    datasets: [{
      data: [35, 25, 15, 15, 10],
      backgroundColor: [
        'rgba(0, 50, 138, 0.8)',
        'rgba(255, 106, 0, 0.8)',
        'rgba(68, 102, 178, 0.8)',
        'rgba(235, 86, 0, 0.8)',
        'rgba(108, 142, 218, 0.8)',
      ],
    }]
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900 dark:text-white">Reports</h1>
          <nav className="flex items-center text-sm mt-2">
            <Link to="/admin" className="text-secondary-500 hover:text-primary-500">Dashboard</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-800 dark:text-secondary-200">Reports</span>
          </nav>
        </div>

        <button className="btn btn-primary">
          <FiDownload className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="form-input dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
            >
              <option value="sales">Sales Report</option>
              <option value="inventory">Inventory Report</option>
              <option value="customers">Customer Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="form-input dark:bg-secondary-700 dark:border-secondary-600 dark:text-white"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">Sales Trend</h2>
          <div className="h-80">
            <Line 
              data={salesData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)',
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">Sales by Category</h2>
          <div className="h-80">
            <Doughnut 
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Total Sales</h3>
          <p className="text-2xl font-semibold text-secondary-900 dark:text-white mt-2">$12,345.67</p>
          <p className="text-sm text-success-600 mt-2">+12.5% from last period</p>
        </div>

        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Orders</h3>
          <p className="text-2xl font-semibold text-secondary-900 dark:text-white mt-2">156</p>
          <p className="text-sm text-success-600 mt-2">+8.2% from last period</p>
        </div>

        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Average Order Value</h3>
          <p className="text-2xl font-semibold text-secondary-900 dark:text-white mt-2">$79.14</p>
          <p className="text-sm text-error-600 mt-2">-2.3% from last period</p>
        </div>

        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Conversion Rate</h3>
          <p className="text-2xl font-semibold text-secondary-900 dark:text-white mt-2">3.2%</p>
          <p className="text-sm text-success-600 mt-2">+0.8% from last period</p>
        </div>
      </div>
    </div>
  )
}

export default Reports