import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

function TermsConditions() {
  useEffect(() => {
    document.title = 'Terms & Conditions - MaleFashion'
  }, [])

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-5 mb-8">
        <div className="container">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-secondary-500 hover:text-primary-500">Home</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-900">Terms & Conditions</span>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-8">Terms & Conditions</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-secondary-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">1. Introduction</h2>
                <p className="text-secondary-700 mb-4">
                  Welcome to MaleFashion. These Terms and Conditions ("Terms", "Terms and Conditions") govern your use of our website located at malefashion.com (the "Service") operated by MaleFashion ("us", "we", or "our").
                </p>
                <p className="text-secondary-700">
                  Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">2. Acceptance of Terms</h2>
                <p className="text-secondary-700">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">3. Products and Services</h2>
                <p className="text-secondary-700 mb-4">
                  All products and services are subject to availability. We reserve the right to discontinue any product at any time. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store.
                </p>
                <p className="text-secondary-700">
                  We cannot guarantee that your computer monitor's display of any color will be accurate.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">4. Pricing and Payment</h2>
                <p className="text-secondary-700 mb-4">
                  All prices are subject to change without notice. We reserve the right to modify or discontinue any product without prior notice. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of any product.
                </p>
                <p className="text-secondary-700">
                  Payment must be received by us before our acceptance of an order. We accept major credit cards and other payment methods as displayed during checkout.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">5. User Accounts</h2>
                <p className="text-secondary-700 mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
                <p className="text-secondary-700">
                  You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">6. Prohibited Uses</h2>
                <p className="text-secondary-700 mb-4">You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.</p>
                <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                  <li>Transmit any worms or viruses or any code of a destructive nature</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the service for any fraudulent or unlawful purpose</li>
                  <li>Violate any applicable local, state, national or international law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">7. Limitation of Liability</h2>
                <p className="text-secondary-700">
                  In no case shall MaleFashion, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">8. Governing Law</h2>
                <p className="text-secondary-700">
                  These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">9. Changes to Terms</h2>
                <p className="text-secondary-700">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">10. Contact Information</h2>
                <p className="text-secondary-700">
                  If you have any questions about these Terms and Conditions, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-secondary-50 rounded-lg">
                  <p className="text-secondary-700">
                    <strong>Email:</strong> legal@malefashion.com<br />
                    <strong>Phone:</strong> (+91) 63052 60604<br />
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

export default TermsConditions