import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiRefreshCw, FiClock, FiCheckCircle } from 'react-icons/fi'

function RefundPolicy() {
  useEffect(() => {
    document.title = 'Refund & Cancellation Policy - MaleFashion'
  }, [])

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-5 mb-8">
        <div className="container">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-secondary-500 hover:text-primary-500">Home</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-900">Refund & Cancellation Policy</span>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-8">Refund & Cancellation Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-secondary-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">1. Order Cancellation</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border border-secondary-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <FiClock className="w-8 h-8 text-warning-500 mr-3" />
                      <h3 className="text-lg font-semibold text-secondary-900">Before Shipping</h3>
                    </div>
                    <p className="text-secondary-700 mb-2">Free cancellation</p>
                    <p className="text-secondary-600">Orders can be cancelled within 24 hours of placement</p>
                  </div>
                  
                  <div className="border border-secondary-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <FiRefreshCw className="w-8 h-8 text-error-500 mr-3" />
                      <h3 className="text-lg font-semibold text-secondary-900">After Shipping</h3>
                    </div>
                    <p className="text-secondary-700 mb-2">Return required</p>
                    <p className="text-secondary-600">Follow our return process for refund</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-secondary-900 mb-3">How to Cancel:</h3>
                <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                  <li>Log into your account and go to "My Orders"</li>
                  <li>Find the order you want to cancel</li>
                  <li>Click "Cancel Order" if the option is available</li>
                  <li>If the option is not available, contact our customer service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">2. Return Policy</h2>
                <p className="text-secondary-700 mb-4">
                  We offer a 14-day return policy from the date of delivery. Items must be in original condition with tags attached.
                </p>
                
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Eligible for Return:</h3>
                <ul className="list-disc pl-6 text-secondary-700 space-y-2 mb-4">
                  <li>Items in original condition with tags</li>
                  <li>Unworn and unwashed items</li>
                  <li>Items in original packaging</li>
                  <li>Items purchased within the last 14 days</li>
                </ul>

                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Not Eligible for Return:</h3>
                <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                  <li>Underwear and intimate apparel</li>
                  <li>Items damaged by misuse</li>
                  <li>Items without original tags</li>
                  <li>Sale items (unless defective)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">3. Refund Process</h2>
                <p className="text-secondary-700 mb-4">
                  Refunds will be processed within 5-7 business days after we receive and inspect the returned item.
                </p>
                
                <div className="bg-secondary-50 p-6 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3">Refund Timeline:</h3>
                  <ul className="text-secondary-700 space-y-2">
                    <li><strong>Credit/Debit Cards:</strong> 5-7 business days</li>
                    <li><strong>Net Banking:</strong> 5-7 business days</li>
                    <li><strong>UPI:</strong> 1-3 business days</li>
                    <li><strong>Wallet:</strong> Instant refund</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">4. Exchange Policy</h2>
                <p className="text-secondary-700 mb-4">
                  We offer size and color exchanges within 14 days of delivery, subject to availability.
                </p>
                
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Exchange Process:</h3>
                <ol className="list-decimal pl-6 text-secondary-700 space-y-2">
                  <li>Contact our customer service team</li>
                  <li>Provide order details and reason for exchange</li>
                  <li>Pack the item in original packaging</li>
                  <li>Schedule pickup or drop at our store</li>
                  <li>Receive your exchanged item within 7-10 days</li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibent text-secondary-900 mb-4">5. Damaged or Defective Items</h2>
                <p className="text-secondary-700 mb-4">
                  If you receive a damaged or defective item, please contact us within 48 hours of delivery.
                </p>
                
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">What We Need:</h3>
                <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                  <li>Clear photos of the damaged/defective item</li>
                  <li>Order number and item details</li>
                  <li>Description of the issue</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">6. Contact Information</h2>
                <p className="text-secondary-700">
                  For any refund or cancellation queries, please contact us:
                </p>
                <div className="mt-4 p-4 bg-secondary-50 rounded-lg">
                  <p className="text-secondary-700">
                    <strong>Email:</strong> returns@malefashion.com<br />
                    <strong>Phone:</strong> (+91) 63052 60604<br />
                    <strong>Customer Service Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM IST<br />
                    <strong>Address:</strong> Guntur, Andhra Pradesh, India
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefundPolicy