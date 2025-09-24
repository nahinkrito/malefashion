import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMapPin, FiPhone, FiMail, FiCreditCard, FiTruck, FiRefreshCw, FiHeadphones } from 'react-icons/fi'

function ShopFooter() {
  return (
    <footer className="bg-secondary-900 text-white">
      {/* Services section */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start space-x-4">
            <FiTruck className="w-10 h-10 text-primary-500" />
            <div>
              <h4 className="text-lg font-semibold mb-2">Free Shipping</h4>
              <p className="text-secondary-300">For all orders over $99</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <FiRefreshCw className="w-10 h-10 text-primary-500" />
            <div>
              <h4 className="text-lg font-semibold mb-2">Easy Returns</h4>
              <p className="text-secondary-300">14-day return policy</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <FiCreditCard className="w-10 h-10 text-primary-500" />
            <div>
              <h4 className="text-lg font-semibold mb-2">Secure Payment</h4>
              <p className="text-secondary-300">100% secure checkout</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <FiHeadphones className="w-10 h-10 text-primary-500" />
            <div>
              <h4 className="text-lg font-semibold mb-2">24/7 Support</h4>
              <p className="text-secondary-300">Dedicated support team</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer */}
      <div className="border-t border-secondary-800">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: About */}
            <div>
              <Link to="/" className="inline-block text-2xl font-bold mb-6">
                <span className="text-primary-500">MALE</span>
                <span className="text-white">FASHION</span>
              </Link>
              
              <p className="text-secondary-300 mb-6">
                The customer is at the heart of our unique business model, which includes design.
              </p>
              
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener" className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-800 hover:bg-primary-500 transition duration-300">
                  <FiFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener" className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-800 hover:bg-primary-500 transition duration-300">
                  <FiTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener" className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-800 hover:bg-primary-500 transition duration-300">
                  <FiInstagram />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener" className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-800 hover:bg-primary-500 transition duration-300">
                  <FiYoutube />
                </a>
              </div>
            </div>
            
            {/* Column 2: Shopping */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Shopping</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/shop" className="text-secondary-300 hover:text-white transition duration-200">
                    Shop Men's
                  </Link>
                </li>
                <li>
                  <Link to="/shop/category/tops" className="text-secondary-300 hover:text-white transition duration-200">
                    Tops
                  </Link>
                </li>
                <li>
                  <Link to="/shop/category/bottoms" className="text-secondary-300 hover:text-white transition duration-200">
                    Bottoms
                  </Link>
                </li>
                <li>
                  <Link to="/shop/category/outerwear" className="text-secondary-300 hover:text-white transition duration-200">
                    Outerwear
                  </Link>
                </li>
                <li>
                  <Link to="/shop/category/accessories" className="text-secondary-300 hover:text-white transition duration-200">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link to="/shop/category/footwear" className="text-secondary-300 hover:text-white transition duration-200">
                    Footwear
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Column 3: Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/contact" className="text-secondary-300 hover:text-white transition duration-200">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-secondary-300 hover:text-white transition duration-200">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-secondary-300 hover:text-white transition duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-secondary-300 hover:text-white transition duration-200">
                    Shipping Policy
                     </Link>
                </li>
                <li>
                  <Link to="/about" className="text-secondary-300 hover:text-white transition duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/refunds" className="text-secondary-300 hover:text-white transition duration-200">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Column 4: Contact */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <FiMapPin className="w-5 h-5 text-primary-500 mt-1" />
                  <span className="text-secondary-300">
                    Guntur,Andhra Pradesh,Inda
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <FiPhone className="w-5 h-5 text-primary-500" />
                  <span className="text-secondary-300">(+91) 63052 60604</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FiMail className="w-5 h-5 text-primary-500" />
                  <span className="text-secondary-300">nahinkhanpattan@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright section */}
      <div className="border-t border-secondary-800 py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} MaleFashion. All Rights Reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <img src="https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&h=30" 
                 alt="Payment Methods" 
                 className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  )
}


export default ShopFooter