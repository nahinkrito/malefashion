import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminRoute from './components/auth/AdminRoute'
import Loader from './components/common/Loader'

// Shop Layouts
const ShopLayout = lazy(() => import('./layouts/ShopLayout'))
const AdminLayout = lazy(() => import('./layouts/AdminLayout'))

// Shop Pages
const Home = lazy(() => import('./pages/shop/Home'))
const Shop = lazy(() => import('./pages/shop/Shop'))
const ProductDetails = lazy(() => import('./pages/shop/ProductDetails'))
const Cart = lazy(() => import('./pages/shop/Cart'))
const Checkout = lazy(() => import('./pages/shop/Checkout'))
const Wishlist = lazy(() => import('./pages/shop/Wishlist'))
const Contact = lazy(() => import('./pages/shop/Contact'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const UserProfile = lazy(() => import('./pages/shop/UserProfile'))
const OrderHistory = lazy(() => import('./pages/shop/OrderHistory'))
const OrderDetail = lazy(() => import('./pages/shop/OrderDetail'))
const Report = lazy(() => import('./pages/shop/Report'))
const NotFound = lazy(() => import('./pages/NotFound'))
const TermsConditions = lazy(() => import('./pages/shop/TermsConditions'))
const PrivacyPolicy = lazy(() => import('./pages/shop/PrivacyPolicy'))
const ShippingPolicy = lazy(() => import('./pages/shop/ShippingPolicy'))
const RefundPolicy = lazy(() => import('./pages/shop/RefundPolicy'))

// Admin Pages
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Products = lazy(() => import('./pages/admin/Products'))
const AddProduct = lazy(() => import('./pages/admin/AddProduct'))
const EditProduct = lazy(() => import('./pages/admin/EditProduct'))
const Orders = lazy(() => import('./pages/admin/Orders'))
const OrderView = lazy(() => import('./pages/admin/OrderView'))
const Customers = lazy(() => import('./pages/admin/Customers'))
const CustomerDetail = lazy(() => import('./pages/admin/CustomerDetail'))
const Inquiries = lazy(() => import('./pages/admin/Inquiries'))
const Reports = lazy(() => import('./pages/admin/Reports'))
const Shipments = lazy(() => import('./pages/admin/Shipments'))
const Support = lazy(() => import('./pages/admin/Support'))
const Settings = lazy(() => import('./pages/admin/Settings'))

function App() {
  const { isAuthenticated, isAdmin } = useAuth()

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Shop Routes */}
        <Route path="/" element={<ShopLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/category/:category" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Protected Shop Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="report" element={<Report />} />
            <Route path="terms" element={<TermsConditions />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="shipping" element={<ShippingPolicy />} />
            <Route path="refunds" element={<RefundPolicy />} />
          </Route>
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Policy Routes */}
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/shipping" element={<ShippingPolicy />} />
        <Route path="/refunds" element={<RefundPolicy />} />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderView />} />
            <Route path="shipments" element={<Shipments />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:id" element={<CustomerDetail />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="support" element={<Support />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App