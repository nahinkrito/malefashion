import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy - MaleFashion'
  }, [])

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-5 mb-8">
        <div className="container">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-secondary-500 hover:text-primary-500">Home</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-900">Privacy Policy</span>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-secondary-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">1. Introduction</h2>
                <p className="text-secondary-700 mb-4">
                  MaleFashion ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by MaleFashion.
                </p>
                <p className="text-secondary-700">
                  This Privacy Policy applies to our website, and its associated subdomains (collectively, our "Service") alongside our application, MaleFashion. By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy and our Terms of Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Information you provide to us</h3>
                <ul className="list-disc pl-6 text-secondary-700 space-y-2 mb-4">
                  <li>Account information (name, email address, password)</li>
                  <li>Profile information (phone number, address, preferences)</li>
                  <li>Payment information (credit card details, billing address)</li>
                  <li>Communication data (messages, feedback, support requests)</li>
                  <li>Order information (purchase history, shipping details)</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Information we collect automatically</h3>
                <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, click patterns)</li>
                  <li>Location information (general geographic location)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-secondary-700 mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices, updates, security alerts</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Communicate with you about products, services, offers, and events</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, investigate and prevent fraudulent transactions</li>
                  <li>Personalize and improve your experience</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-secondary-700 mb-4">We may share your information in the following situations:</p>
                <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                  <li><strong>With service providers:</strong> We share information with third-party vendors who perform services on our behalf</li>
                  <li><strong>For legal reasons:</strong> We may disclose information if required by law or to protect our rights</li>
                  <li><strong>Business transfers:</strong> Information may be transferred in connection with a merger or acquisition</li>
                  <li><strong>With your consent:</strong> We may share information with your explicit consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">5. Data Security</h2>
                <p className="text-secondary-700 mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="text-secondary-700">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">6. Data Retention</h2>
                <p className="text-secondary-700">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">7. Your Rights</h2>
                <p className="text-secondary-700 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your personal information</li>
                  <li>Object to processing of your information</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">8. Cookies</h2>
                <p className="text-secondary-700 mb-4">
                  We use cookies and similar tracking technologies to collect and use personal information about you. You can control cookies through your browser settings and other tools.
                </p>
                <p className="text-secondary-700">
                  For more detailed information about the cookies we use, please refer to our Cookie Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">9. Children's Privacy</h2>
                <p className="text-secondary-700">
                  Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-secondary-700">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">11. Contact Us</h2>
                <p className="text-secondary-700">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="mt-4 p-4 bg-secondary-50 rounded-lg">
                  <p className="text-secondary-700">
                    <strong>Email:</strong> privacy@malefashion.com<br />
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

export default PrivacyPolicy