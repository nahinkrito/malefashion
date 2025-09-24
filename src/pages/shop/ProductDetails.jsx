import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiStar, FiChevronRight, FiMinus, FiPlus } from 'react-icons/fi'
import Slider from 'react-slick'
import { toast } from 'react-toastify'
import { useProducts } from '../../contexts/ProductContext'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'
import ProductCard from '../../components/shop/ProductCard'
import Loader from '../../components/common/Loader'

function ProductDetails() {
  const { id } = useParams()
  const { getProductById, getRelatedProducts, isLoading } = useProducts()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  
  // Fetch product details
  useEffect(() => {
    if (!isLoading) {
      const foundProduct = getProductById(id)
      
      if (foundProduct) {
        setProduct(foundProduct)
        setSelectedColor(foundProduct.colors[0])
        if (foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0])
        }
        
        // Get related products
        const related = getRelatedProducts(foundProduct.id, foundProduct.categoryId)
        setRelatedProducts(related)
      }
      
      window.scrollTo(0, 0)
    }
  }, [id, isLoading, getProductById, getRelatedProducts])
  
  // Update document title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - MaleFashion`
    }
  }, [product])
  
  // Handle quantity changes
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }
  
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  }
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      toast.error('Please select a size')
      return
    }
    
    if (!selectedColor) {
      toast.error('Please select a color')
      return
    }
    
    addToCart(product, quantity, selectedSize, selectedColor)
    toast.success(`${product.name} added to cart`)
  }
  
  // Handle wishlist toggle
  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.info(`${product.name} removed from wishlist`)
    } else {
      addToWishlist(product)
      toast.success(`${product.name} added to wishlist`)
    }
  }
  
  // Calculate discounted price
  const discountedPrice = product?.discountPercentage > 0 
    ? product.price * (1 - product.discountPercentage / 100) 
    : null
  
  // Slider settings
  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  }
  
  const relatedProductsSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }
  
  if (isLoading) {
    return <Loader />
  }
  
  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-5 mb-12">
        <div className="container">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-secondary-500 hover:text-primary-500">Home</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <Link to="/shop" className="text-secondary-500 hover:text-primary-500">Shop</Link>
            <FiChevronRight className="mx-2 text-secondary-400" />
            <span className="text-secondary-900">{product.name}</span>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="mb-4 overflow-hidden rounded-lg">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-secondary-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-secondary-500">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              {discountedPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-primary-500">₹{discountedPrice.toFixed(0)}</span>
                  <span className="ml-3 text-lg text-secondary-400 line-through">₹{product.price.toFixed(0)}</span>
                  <span className="ml-3 bg-accent-500 text-white text-sm font-semibold py-1 px-2 rounded">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-semibold text-primary-500">₹{product.price.toFixed(0)}</span>
              )}
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <p className="text-secondary-600">{product.description}</p>
            </div>
            
            {/* Color selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-secondary-900 mb-3">COLOR</h3>
                <div className="flex space-x-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border transition-all duration-200 ${
                        selectedColor === color ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-30' : 'border-secondary-300'
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    ></button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size selection */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-secondary-900 mb-3">SIZE</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[40px] h-10 px-3 border rounded-md font-medium transition-all duration-200 ${
                        selectedSize === size 
                          ? 'border-primary-500 bg-primary-500 text-white' 
                          : 'border-secondary-300 text-secondary-700 hover:border-primary-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <div className="flex items-center border border-secondary-300 rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 flex items-center justify-center text-secondary-500 hover:bg-secondary-100 rounded-l-md"
                  disabled={quantity <= 1}
                >
                  <FiMinus />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-none focus:outline-none text-secondary-800"
                />
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 flex items-center justify-center text-secondary-500 hover:bg-secondary-100 rounded-r-md"
                >
                  <FiPlus />
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-1 sm:flex-none"
              >
                <FiShoppingCart className="mr-2" />
                Add to Cart
              </button>
              
              <button
                onClick={toggleWishlist}
                className={`w-12 h-12 flex items-center justify-center rounded-md border transition-colors duration-200 ${
                  isInWishlist(product.id)
                    ? 'bg-accent-500 border-accent-500 text-white'
                    : 'border-secondary-300 text-secondary-500 hover:text-accent-500 hover:border-accent-500'
                }`}
                aria-label="Add to wishlist"
              >
                <FiHeart className={isInWishlist(product.id) ? 'fill-current' : ''} />
              </button>
            </div>
            
            {/* Stock status */}
            <div className="mb-6 text-sm">
              <p className="text-secondary-700">
                <span className="font-semibold">Availability:</span>{' '}
                <span className={product.stockQuantity > 0 ? 'text-success-600' : 'text-error-600'}>
                  {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
              {product.stockQuantity > 0 && product.stockQuantity < 20 && (
                <p className="text-warning-600 mt-1">
                  Only {product.stockQuantity} items left!
                </p>
              )}
            </div>
            
            {/* Additional Info */}
            <div className="border-t border-secondary-200 pt-6 space-y-3 text-sm">
              <p className="text-secondary-700">
                <span className="font-semibold">SKU:</span>{' '}
                <span>{product.id}</span>
              </p>
              <p className="text-secondary-700">
                <span className="font-semibold">Category:</span>{' '}
                <Link to={`/shop/category/${product.categoryId}`} className="text-primary-500 hover:underline">
                  {product.categoryId.replace('category-', '').charAt(0).toUpperCase() + product.categoryId.replace('category-', '').slice(1)}
                </Link>
              </p>
              <p className="text-secondary-700">
                <span className="font-semibold">Tags:</span>{' '}
                {product.tags.map((tag, index) => (
                  <span key={tag}>
                    <Link to={`/shop?tag=${tag}`} className="text-primary-500 hover:underline">
                      {tag}
                    </Link>
                    {index < product.tags.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              <div className="pt-4">
                <button className="text-primary-500 font-medium hover:underline">
                  Size Guide
                </button>
                <button className="text-primary-500 font-medium hover:underline ml-6">
                  Shipping & Returns
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-8">You Might Also Like</h2>
            
            <div className="overflow-hidden">
              <Slider {...relatedProductsSettings}>
                {relatedProducts.map(relatedProduct => (
                  <div key={relatedProduct.id} className="px-2">
                    <ProductCard 
                      product={relatedProduct} 
                      addToCart={addToCart} 
                      addToWishlist={addToWishlist}
                      isInWishlist={isInWishlist(relatedProduct.id)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails